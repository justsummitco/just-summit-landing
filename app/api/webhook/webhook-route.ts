import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Payment successful:', {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        tier: session.metadata?.tier,
        amount: session.metadata?.amount,
      });

      // Here you can:
      // 1. Add customer to Brevo list
      // 2. Send confirmation email
      // 3. Update your database
      // 4. Grant access to early adopter benefits

      // Example: Add to Brevo (you can integrate this)
      if (session.customer_details?.email) {
        // Add customer to "Summit Early Adopters" list in Brevo
        // This would trigger your welcome email automation
        console.log(`Adding ${session.customer_details.email} to early adopters list`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

