import { NextRequest, NextResponse } from "next/server";
import { syncAttioContact } from "@/lib/attio-contacts";
import { syncBrevoWaitlistContact } from "@/lib/brevo-contacts";
import { BREVO_EVENT_NAMES, trackBrevoEvent } from "@/lib/brevo-events";
import { sendWaitlistWelcomeEmail } from "@/lib/brevo-email";
import {
  HEADPHONES_PRODUCT_NAME,
  WAITLIST_SEQUENCE_ID,
} from "@/lib/presale";
import { PresalesAttribution, trackPresalesLead } from "@/lib/presales-sheets";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "page_url",
] as const;

function getAttribution(body: Record<string, unknown>): PresalesAttribution {
  return ATTRIBUTION_FIELDS.reduce<PresalesAttribution>((attribution, field) => {
    const value = body[field];

    if (typeof value === "string" && value.trim()) {
      attribution[field] = value.trim();
    }

    return attribution;
  }, {});
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestBody =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const email =
      typeof requestBody.email === "string"
        ? requestBody.email.trim().toLowerCase()
        : "";
    const firstName =
      typeof requestBody.name === "string" && requestBody.name.trim()
        ? requestBody.name.trim()
        : email.split("@")[0];
    const source =
      typeof requestBody.source === "string" && requestBody.source.trim()
        ? requestBody.source.trim()
        : "website";
    const attribution = getAttribution(requestBody);

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const joinedAt = new Date().toISOString();
    const customerStage = "waitlist" as const;
    const brevoAttributes = {
      PRODUCT_INTEREST: HEADPHONES_PRODUCT_NAME,
      LEAD_SOURCE: source,
      PRESALE_INTEREST: true,
      PRESALE_CUSTOMER: false,
      CUSTOMER_STAGE: customerStage,
      EMAIL_SEQUENCE: WAITLIST_SEQUENCE_ID,
      WAITLIST_JOINED_AT: joinedAt,
    };

    const contactResult = await syncBrevoWaitlistContact({
      email,
      firstName,
      attributes: brevoAttributes,
    });
    const attioResult = await syncAttioContact({
      email,
      name: firstName,
      source,
      stage: customerStage,
      details: {
        product_interest: HEADPHONES_PRODUCT_NAME,
        presale_interest: true,
        customer_stage: customerStage,
        email_sequence: WAITLIST_SEQUENCE_ID,
        primary_cta: "deposit_preorder",
        ...attribution,
      },
    });
    const eventResult = await trackBrevoEvent({
      eventName: BREVO_EVENT_NAMES.waitlistJoined,
      email,
      contactProperties: brevoAttributes,
      eventProperties: {
        source,
        product_interest: HEADPHONES_PRODUCT_NAME,
        customer_stage: customerStage,
        email_sequence: WAITLIST_SEQUENCE_ID,
        primary_cta: "deposit_preorder",
        ...attribution,
      },
      eventDate: joinedAt,
    });
    const emailResult = await sendWaitlistWelcomeEmail({
      email,
      firstName,
    });

    if (!attioResult.ok) {
      console.error("Attio contact sync failed:", attioResult.error);
    }

    if (!emailResult.ok) {
      console.error("Waitlist welcome email failed:", emailResult.error);
    }

    if (!eventResult.ok) {
      console.error("Brevo waitlist automation event failed:", eventResult.error);
    }

    const sheetResult = await trackPresalesLead({
      email,
      firstName,
      source,
      attribution,
    });

    if (!sheetResult.ok && !sheetResult.skipped) {
      console.error("Google Sheets waitlist tracking failed:", sheetResult.error);
    }

    if (!contactResult.ok) {
      console.error("Brevo waitlist contact sync failed:", contactResult.error);

      if (!emailResult.ok) {
        return NextResponse.json(
          { error: "Unable to add you to the updates list" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: contactResult.ok
        ? "You're on the Just Summit updates list."
        : "You're subscribed. We will follow up by email.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Unable to add you to the updates list" },
      { status: 500 }
    );
  }
}
