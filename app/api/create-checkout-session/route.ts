import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSlotData, reserveSlot, isSlotAvailable } from '@/lib/slots';

// Add this logic to your existing route.ts
export async function POST(request: Request) {
  try {
    const { productType, tier, price, depositAmount, successUrl, cancelUrl } = await request.json()

    let lineItems = []
    let metadata = {}

    // Handle headphones products
    if (productType === 'headphones') {
      lineItems = [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'AI Headphones Pre-Order',
            description: 'Secure your AI Headphones with £49 deposit. Balance charged 30 days before shipping.',
            images: ['https://justsummit.co/headphones-hero.png'],
          },
          unit_amount: depositAmount || 4900, // £49 deposit
        },
        quantity: 1,
      }]
      
      metadata = {
        product_type: 'headphones',
        full_price: price || 29900, // £299 full price
        deposit_amount: depositAmount || 4900,
        shipping_date: 'Q2 2026'
      }
    }
    
    // Handle software products (your existing logic)
    else if (productType === 'software') {
      // Your existing Genesis 50 logic here
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });
    
    const { tierName } = await request.json();

    // Check slot availability first
    const slots = await getSlotData();
    
    if (!isSlotAvailable(tierName, slots)) {
      return NextResponse.json(
        { error: 'No slots available for this tier' },
        { status: 400 }
      );
    }

    // Define your pricing tiers
    const pricingTiers = {
      'Advanced Pre-Order': {
        amount: 4900, // £49.00 in pence
        name: 'Genesis 50 Advanced',
        description: '6 months free + 20% lifetime software discount'
      },
      'Professional Pre-Order': {
        amount: 9900, // £99.00 in pence
        name: 'Genesis 50 Pro',
        description: '12 months free + 20% lifetime software discount'
      }
    };

    const tier = pricingTiers[tierName as keyof typeof pricingTiers];
    
    if (!tier) {
      return NextResponse.json(
        { error: 'Invalid pricing tier' },
        { status: 400 }
      );
    }

    // Reserve the slot temporarily (will be confirmed on successful payment)
    const slotReserved = await reserveSlot(tierName);
    
    if (!slotReserved) {
      return NextResponse.json(
        { error: 'Failed to reserve slot - may have been taken by another user' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'afterpay_clearpay'],
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
        genesis_50: 'true', // Tag for Genesis 50 cohort
        cohort: 'genesis_50',
        slot_type: tierName === 'Advanced Pre-Order' ? 'advanced' : 'pro'
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      // Set session to expire in 15 minutes to prevent slot hoarding
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

    return NextResponse.json({ 
      sessionId: session.id,
      slotReserved: true 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    // If there was an error, try to release the slot
    try {
      const { tierName } = await request.json();
      // Note: In production, you'd want more sophisticated slot management
      // to handle race conditions and ensure data consistency
    } catch (releaseError) {
      console.error('Error releasing slot after checkout failure:', releaseError);
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

