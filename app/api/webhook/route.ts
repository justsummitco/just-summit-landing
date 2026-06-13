import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { syncAttioContact } from "@/lib/attio-contacts";
import { syncBrevoWaitlistContact } from "@/lib/brevo-contacts";
import { BREVO_EVENT_NAMES, trackBrevoEvent } from "@/lib/brevo-events";
import { sendPreorderConfirmationEmail } from "@/lib/brevo-email";
import {
  HEADPHONES_PRODUCT_NAME,
  WAITLIST_SEQUENCE_ID,
  getCustomerStageForOffer,
  isPresaleOfferId,
} from "@/lib/presale";
import { trackPaidPreorder } from "@/lib/presales-sheets";

export const runtime = "nodejs";

function getBrevoBuyerListId() {
  const configuredId = process.env.BREVO_BUYER_LIST_ID;

  if (!configuredId) {
    return null;
  }

  const buyerListId = Number.parseInt(configuredId, 10);

  return Number.isInteger(buyerListId) ? buyerListId : null;
}

async function addHeadphonesBuyerToBrevo(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email;

  if (!email) {
    return;
  }

  const firstName =
    session.customer_details?.name?.split(" ")[0] || email.split("@")[0];
  const offerId = session.metadata?.offer_id;

  if (!isPresaleOfferId(offerId)) {
    return;
  }

  const paymentType = session.metadata?.payment_type || "";
  const customerStage = getCustomerStageForOffer(offerId);
  const purchasedAt = new Date().toISOString();
  const brevoAttributes = {
    PRODUCT_INTEREST: HEADPHONES_PRODUCT_NAME,
    PRESALE_INTEREST: true,
    PRESALE_CUSTOMER: true,
    CUSTOMER_STAGE: customerStage,
    OFFER_TYPE: paymentType,
    EMAIL_SEQUENCE: WAITLIST_SEQUENCE_ID,
    PRESALE_OFFER_ID: offerId,
    PRESALE_PAYMENT_TYPE: paymentType,
    PRESALE_PURCHASE_DATE: purchasedAt,
  };
  const buyerListId = getBrevoBuyerListId();
  const contactResult = await syncBrevoWaitlistContact({
    email,
    firstName,
    listIds: buyerListId ? [buyerListId] : [],
    attributes: brevoAttributes,
  });

  if (!contactResult.ok) {
    console.error("Failed to sync presale buyer to Brevo:", contactResult.error);
  }

  const attioResult = await syncAttioContact({
    email,
    name: session.customer_details?.name || firstName,
    source: "stripe_checkout",
    stage: customerStage,
    details: {
      product_interest: HEADPHONES_PRODUCT_NAME,
      offer_id: offerId,
      payment_type: paymentType,
      customer_stage: customerStage,
      email_sequence: WAITLIST_SEQUENCE_ID,
    },
  });

  if (!attioResult.ok) {
    console.error("Failed to sync presale buyer to Attio:", attioResult.error);
  }

  const eventResult = await trackBrevoEvent({
    eventName: BREVO_EVENT_NAMES.preorderCompleted,
    email,
    contactProperties: brevoAttributes,
    eventProperties: {
      source: "stripe_checkout",
      product_interest: HEADPHONES_PRODUCT_NAME,
      offer_id: offerId,
      payment_type: paymentType,
      customer_stage: customerStage,
      email_sequence: WAITLIST_SEQUENCE_ID,
    },
    eventDate: purchasedAt,
  });

  if (!eventResult.ok) {
    console.error("Brevo preorder automation event failed:", eventResult.error);
  }
}

async function sendHeadphonesBuyerEmail(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email;
  const offerId = session.metadata?.offer_id;

  if (!email || !isPresaleOfferId(offerId)) {
    return;
  }

  const firstName =
    session.customer_details?.name?.split(" ")[0] || email.split("@")[0];

  const emailResult = await sendPreorderConfirmationEmail({
    email,
    firstName,
    offerId,
  });

  if (!emailResult.ok) {
    console.error("Preorder confirmation email failed:", emailResult.error);
  }
}

function isHeadphonesPresaleSession(session: Stripe.Checkout.Session) {
  return (
    session.metadata?.product_type === "headphones" &&
    isPresaleOfferId(session.metadata.offer_id)
  );
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (isHeadphonesPresaleSession(session)) {
        const sheetResult = await trackPaidPreorder({ session });

        if (!sheetResult.ok && !sheetResult.skipped) {
          console.error("Google Sheets paid-preorder tracking failed:", sheetResult.error);
        }

        await addHeadphonesBuyerToBrevo(session);
        await sendHeadphonesBuyerEmail(session);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
