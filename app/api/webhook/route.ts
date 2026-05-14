import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { syncBrevoWaitlistContact } from "@/lib/brevo-contacts";
import { sendPreorderConfirmationEmail } from "@/lib/brevo-email";
import { isPresaleOfferId } from "@/lib/presale";

export const runtime = "nodejs";

async function addHeadphonesBuyerToBrevo(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email;

  if (!email) {
    return;
  }

  const firstName =
    session.customer_details?.name?.split(" ")[0] || email.split("@")[0];
  const contactResult = await syncBrevoWaitlistContact({
    email,
    firstName,
    attributes: {
      PRODUCT_INTEREST: "Just Summit AI Headphones",
      PRESALE_CUSTOMER: true,
      PRESALE_OFFER_ID: session.metadata?.offer_id || "",
      PRESALE_PAYMENT_TYPE: session.metadata?.payment_type || "",
      PRESALE_PURCHASE_DATE: new Date().toISOString(),
    },
  });

  if (!contactResult.ok) {
    console.error("Failed to sync presale buyer to Brevo:", contactResult.error);
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

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

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

      if (session.metadata?.product_type === "headphones") {
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
