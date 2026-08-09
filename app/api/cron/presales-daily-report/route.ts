import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  DailyScoreboardInput,
  getOutreachPipelineRollup,
  writeDailyScoreboardRow,
} from "@/lib/presales-sheets";
import { isPresaleOfferId, PresaleOfferId } from "@/lib/presale";

export const runtime = "nodejs";

const POSTHOG_EVENTS = [
  "$pageview",
  "presale_offer_viewed",
  "presale_checkout_clicked",
  "presale_checkout_started",
  "presale_checkout_failed",
  "presale_success_page_viewed",
  "presale_purchase_completed",
  "headphones_waitlist_signup",
] as const;

type PostHogEventName = (typeof POSTHOG_EVENTS)[number];

type EventCount = { count: number; unique: number };

type PostHogCounts = {
  totals: Record<PostHogEventName, EventCount>;
  byOffer: Record<PresaleOfferId, Record<PostHogEventName, EventCount>>;
};

type StripePreorderCounts = {
  paidPresales: number;
  depositPresales: number;
  fullPresales: number;
};

function emptyPostHogCounts(): PostHogCounts {
  const emptyEventCounts = () =>
    POSTHOG_EVENTS.reduce<Record<PostHogEventName, EventCount>>((counts, eventName) => {
      counts[eventName] = { count: 0, unique: 0 };
      return counts;
    }, {} as Record<PostHogEventName, EventCount>);

  return {
    totals: emptyEventCounts(),
    byOffer: {
      "headphones-deposit": emptyEventCounts(),
      "headphones-full": emptyEventCounts(),
    },
  };
}

function getPostHogHost() {
  const configuredHost =
    process.env.POSTHOG_API_HOST ||
    process.env.NEXT_PUBLIC_POSTHOG_HOST ||
    "https://app.posthog.com";

  return configuredHost
    .replace("https://eu.i.posthog.com", "https://eu.posthog.com")
    .replace("https://us.i.posthog.com", "https://us.posthog.com")
    .replace(/\/$/, "");
}

function getReportDate(request: NextRequest) {
  const dateParam = request.nextUrl.searchParams.get("date");

  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return dateParam;
  }

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  return yesterday.toISOString().slice(0, 10);
}

function getReportWindow(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}

async function getPostHogCounts(start: Date, end: Date): Promise<PostHogCounts> {
  if (!process.env.POSTHOG_PROJECT_ID || !process.env.POSTHOG_PERSONAL_API_KEY) {
    return emptyPostHogCounts();
  }

  const counts = emptyPostHogCounts();
  const eventList = POSTHOG_EVENTS.map((eventName) => `'${eventName}'`).join(", ");
  const query = `
    SELECT event, properties.offer_id, count(), uniq(distinct_id)
    FROM events
    WHERE timestamp >= '${start.toISOString()}'
      AND timestamp < '${end.toISOString()}'
      AND event IN (${eventList})
    GROUP BY event, properties.offer_id
  `;

  try {
    const response = await fetch(
      `${getPostHogHost()}/api/projects/${process.env.POSTHOG_PROJECT_ID}/query/`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error((await response.text()) || `PostHog returned ${response.status}`);
    }

    const data = (await response.json()) as {
      results?: Array<[string, string | null, number, number]>;
      result?: Array<[string, string | null, number, number]>;
    };
    const rows = data.results || data.result || [];

    rows.forEach(([eventName, offerId, count, unique]) => {
      if (POSTHOG_EVENTS.includes(eventName as PostHogEventName)) {
        const typedEventName = eventName as PostHogEventName;
        const eventCount = Number(count) || 0;
        const uniqueCount = Number(unique) || 0;

        counts.totals[typedEventName].count += eventCount;
        counts.totals[typedEventName].unique += uniqueCount;

        if (isPresaleOfferId(offerId)) {
          counts.byOffer[offerId][typedEventName] = {
            count: eventCount,
            unique: uniqueCount,
          };
        }
      }
    });
  } catch (error) {
    console.error("PostHog daily report query failed:", error);
  }

  return counts;
}

async function getStripePreorderCounts(
  start: Date,
  end: Date
): Promise<StripePreorderCounts> {
  const counts: StripePreorderCounts = {
    paidPresales: 0,
    depositPresales: 0,
    fullPresales: 0,
  };

  if (!process.env.STRIPE_SECRET_KEY) {
    return counts;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let startingAfter: string | undefined;

  try {
    do {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
        created: {
          gte: Math.floor(start.getTime() / 1000),
          lt: Math.floor(end.getTime() / 1000),
        },
      });

      page.data.forEach((session) => {
        const offerId = session.metadata?.offer_id;

        if (
          session.metadata?.product_type !== "headphones" ||
          !isPresaleOfferId(offerId) ||
          session.payment_status !== "paid"
        ) {
          return;
        }

        counts.paidPresales += 1;

        if (offerId === "headphones-deposit") {
          counts.depositPresales += 1;
        }

        if (offerId === "headphones-full") {
          counts.fullPresales += 1;
        }
      });

      startingAfter = page.has_more ? page.data[page.data.length - 1]?.id : undefined;
    } while (startingAfter);
  } catch (error) {
    console.error("Stripe daily preorder count failed:", error);
  }

  return counts;
}

function getNextAction(paidPresales: number) {
  if (paidPresales >= 10) {
    return "Keep buyer updates warm and prepare fulfilment comms.";
  }

  if (paidPresales >= 4) {
    return "Continue follow-ups and ask buyers/supporters for warm intros.";
  }

  return "Send founder-led outreach and follow up active replies.";
}

function percentage(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 1000) / 10;
}

function viewPercentage(
  numerator: number,
  denominator: number | "not_tracked"
) {
  return denominator === "not_tracked"
    ? "not_tracked" as const
    : percentage(numerator, denominator);
}

function checkoutAbandonmentRate(checkoutStarts: number, paid: number) {
  if (checkoutStarts <= 0) {
    return 0;
  }

  return percentage(Math.max(checkoutStarts - paid, 0), checkoutStarts);
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const date = getReportDate(request);
  const preview = request.nextUrl.searchParams.get("preview") === "true";
  const offerViewsTracked =
    request.nextUrl.searchParams.get("offer_views_tracked") !== "false";
  const { start, end } = getReportWindow(date);
  const [postHogCounts, stripeCounts, outreachRollup] = await Promise.all([
    getPostHogCounts(start, end),
    getStripePreorderCounts(start, end),
    getOutreachPipelineRollup(),
  ]);
  const row: DailyScoreboardInput = {
    date,
    visitors: postHogCounts.totals.$pageview.unique,
    checkoutClicks: postHogCounts.totals.presale_checkout_clicked.count,
    checkoutStarts: postHogCounts.totals.presale_checkout_started.count,
    checkoutFailures: postHogCounts.totals.presale_checkout_failed.count,
    successPageViews: postHogCounts.totals.presale_success_page_viewed.count,
    paidPresales: stripeCounts.paidPresales,
    depositPresales: stripeCounts.depositPresales,
    fullPresales: stripeCounts.fullPresales,
    waitlistSignups: postHogCounts.totals.headphones_waitlist_signup.count,
    outreachSent: outreachRollup.outreachSent,
    replies: outreachRollup.replies,
    topObjections: outreachRollup.topObjections,
    nextAction: getNextAction(stripeCounts.paidPresales),
    depositOfferViews: offerViewsTracked
      ? postHogCounts.byOffer["headphones-deposit"].presale_offer_viewed.count
      : "not_tracked",
    depositCheckoutClicks:
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_clicked.count,
    depositCheckoutStarts:
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_started.count,
    depositViewToClickRate: viewPercentage(
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_clicked.count,
      offerViewsTracked
        ? postHogCounts.byOffer["headphones-deposit"].presale_offer_viewed.count
        : "not_tracked"
    ),
    depositClickToCheckoutRate: percentage(
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_started.count,
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_clicked.count
    ),
    depositCheckoutToPaidRate: percentage(
      stripeCounts.depositPresales,
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_started.count
    ),
    depositViewToPaidRate: viewPercentage(
      stripeCounts.depositPresales,
      offerViewsTracked
        ? postHogCounts.byOffer["headphones-deposit"].presale_offer_viewed.count
        : "not_tracked"
    ),
    depositCheckoutAbandonmentRate: checkoutAbandonmentRate(
      postHogCounts.byOffer["headphones-deposit"].presale_checkout_started.count,
      stripeCounts.depositPresales
    ),
    fullOfferViews: offerViewsTracked
      ? postHogCounts.byOffer["headphones-full"].presale_offer_viewed.count
      : "not_tracked",
    fullCheckoutClicks:
      postHogCounts.byOffer["headphones-full"].presale_checkout_clicked.count,
    fullCheckoutStarts:
      postHogCounts.byOffer["headphones-full"].presale_checkout_started.count,
    fullViewToClickRate: viewPercentage(
      postHogCounts.byOffer["headphones-full"].presale_checkout_clicked.count,
      offerViewsTracked
        ? postHogCounts.byOffer["headphones-full"].presale_offer_viewed.count
        : "not_tracked"
    ),
    fullClickToCheckoutRate: percentage(
      postHogCounts.byOffer["headphones-full"].presale_checkout_started.count,
      postHogCounts.byOffer["headphones-full"].presale_checkout_clicked.count
    ),
    fullCheckoutToPaidRate: percentage(
      stripeCounts.fullPresales,
      postHogCounts.byOffer["headphones-full"].presale_checkout_started.count
    ),
    fullViewToPaidRate: viewPercentage(
      stripeCounts.fullPresales,
      offerViewsTracked
        ? postHogCounts.byOffer["headphones-full"].presale_offer_viewed.count
        : "not_tracked"
    ),
    fullCheckoutAbandonmentRate: checkoutAbandonmentRate(
      postHogCounts.byOffer["headphones-full"].presale_checkout_started.count,
      stripeCounts.fullPresales
    ),
  };

  if (preview) {
    return NextResponse.json({ ok: true, preview: true, row });
  }

  const sheetResult = await writeDailyScoreboardRow(row);

  if (!sheetResult.ok) {
    return NextResponse.json(
      { error: "Unable to write daily presales report", detail: sheetResult.error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    row,
  });
}
