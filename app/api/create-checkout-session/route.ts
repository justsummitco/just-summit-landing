import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSlotData, reserveSlot, isSlotAvailable } from '@/lib/slots';

export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });

    const body = await request.json();
    
    // Handle headphones products
    if (body.productType === 'headphones') {
      const { tier, price, depositAmount, successUrl, cancelUrl } = body;
      
      const lineItems = [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'AI Headphones Pre-Order',
            description: 'Secure your AI Headphones with £49 deposit. Balance charged 30 days before shipping in Q2 2026.',
            images: ['https://justsummit.co/headphones-hero.png'],
          },
          unit_amount: depositAmount || 4900, // £49 deposit
        },
        quantity: 1,
      }];
      
      const metadata = {
        product_type: 'headphones',
        tier: tier || 'standard',
        full_price: price || 29900, // £299 full price
        deposit_amount: depositAmount || 4900,
        shipping_date: 'Q2 2026'
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/headphones-success`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/headphones-cancel`,
        metadata: metadata,
        billing_address_collection: 'required',
        expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      });

      return NextResponse.json({ url: session.url });
    }
    
    // Handle software products (existing Genesis 50 logic)
    else if (body.tierName) {
      const { tierName } = body;
      
      // Check slot availability
      const slotData = await getSlotData();
      if (!isSlotAvailable(tierName, slotData)) {
        return NextResponse.json({ error: 'This tier is currently full' }, { status: 400 });
      }

      let priceId: string;
      let productName: string;
      
      if (tierName === 'Advanced Pre-Order') {
        priceId = process.env.STRIPE_ADVANCED_PRICE_ID!;
        productName = 'Genesis 50 Advanced Pre-Order';
      } else if (tierName === 'Professional Pre-Order') {
        priceId = process.env.STRIPE_PROFESSIONAL_PRICE_ID!;
        productName = 'Genesis 50 Professional Pre-Order';
      } else {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
      }

      // Reserve slot temporarily
      await reserveSlot(tierName);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        metadata: {
          product_type: 'software',
          tier: tierName,
          product_name: productName,
        },
        billing_address_collection: 'required',
        expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      });

      return NextResponse.json({ url: session.url });
    }
    
    // Invalid request
    else {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

