import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  BALANCE_DUE_TIMING,
  HEADPHONES_PRODUCT_NAME,
  PRESALE_OFFERS,
  SHIPPING_DATE,
  isPresaleOfferId,
} from "@/lib/presale";

export const runtime = "nodejs";

function getSiteUrl(request: NextRequest): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      // Fall through to the request origin.
    }
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const offerId = body?.offerId;

    if (!isPresaleOfferId(offerId)) {
      return NextResponse.json(
        { error: "Invalid presale offer" },
        { status: 400 }
      );
    }

    const offer = PRESALE_OFFERS[offerId];
    const priceId = process.env[offer.priceEnvVar];

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price is not configured" },
        { status: 500 }
      );
    }

    const siteUrl = getSiteUrl(request);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/headphones-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/headphones-cancel`,
      billing_address_collection: "required",
      customer_creation: "if_required",
      metadata: {
        product_type: "headphones",
        product_name: HEADPHONES_PRODUCT_NAME,
        offer_id: offer.id,
        payment_type: offer.paymentType,
        amount_due_now: String(offer.amountDueNow),
        full_price: String(offer.fullPrice),
        balance_due: String(offer.balanceDue),
        balance_due_timing: BALANCE_DUE_TIMING,
        shipping_date: SHIPPING_DATE,
        source: typeof body.source === "string" ? body.source : "website",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout session did not return a URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500 }
    );
  }
}
