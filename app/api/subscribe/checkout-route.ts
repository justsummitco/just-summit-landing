import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { tierName } = await request.json();

    // Define your pricing tiers
    const pricingTiers = {
      'Basic Pre-Order': {
        amount: 2500, // £25.00 in pence
        name: 'Basic Pre-Order',
        description: 'Support Summit early and get 1-month premium on launch.'
      },
      'Advanced Pre-Order': {
        amount: 4900, // £49.00 in pence
        name: 'Advanced Pre-Order',
        description: '6 months premium, lifetime upgrades, priority support.'
      },
      'Professional Pre-Order': {
        amount: 9900, // £99.00 in pence
        name: 'Professional Pre-Order',
        description: '12 months premium, team seats, product-shaping access.'
      }
    };

    const tier = pricingTiers[tierName as keyof typeof pricingTiers];
    
    if (!tier) {
      return NextResponse.json(
        { error: 'Invalid pricing tier' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/#pricing`,
      metadata: {
        tier: tierName,
        amount: tier.amount.toString(),
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

