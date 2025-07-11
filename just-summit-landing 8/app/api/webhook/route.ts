import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { releaseSlot } from '@/lib/slots';

async function addToGenesis50List(email: string, firstName: string, tier: string) {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_BASE_URL = 'https://api.brevo.com/v3';
    
    if (!BREVO_API_KEY) {
      console.log('⚠️ Brevo API key not configured, skipping email automation');
      return false;
    }
    
    const tierName = tier.replace(' Pre-Order', '');
    const freeMonths = tierName === 'Advanced' ? 6 : 12;
    
    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        GENESIS_50_TIER: tierName,
        GENESIS_50_MEMBER: true,
        GENESIS_50_JOIN_DATE: new Date().toISOString(),
        FREE_MONTHS: freeMonths,
        SLACK_JOINED: false,
        SURVEY_COMPLETED: false,
        ONBOARDING_SCHEDULED: false
      },
      listIds: [parseInt(process.env.BREVO_GENESIS_50_LIST_ID || '1')],
      updateEnabled: true
    };

    const response = await fetch(`${BREVO_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok) {
      console.log(`✅ Added ${email} to Genesis 50 list`);
      return true;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to add ${email} to Genesis 50 list:`, error);
      return false;
    }
  } catch (error) {
    console.error('Error adding contact to Genesis 50 list:', error);
    return false;
  }
}

async function sendGenesis50WelcomeEmail(email: string, firstName: string, tier: string) {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_BASE_URL = 'https://api.brevo.com/v3';
    
    if (!BREVO_API_KEY) {
      console.log('⚠️ Brevo API key not configured, skipping welcome email');
      return false;
    }
    
    const tierName = tier.replace(' Pre-Order', '');
    const freeMonths = tierName === 'Advanced' ? 6 : 12;
    
    // Use Brevo template or send custom email
    const emailData = {
      sender: {
        name: "Tom from Summit",
        email: "hello@justsummit.co"
      },
      to: [
        {
          email: email,
          name: firstName
        }
      ],
      subject: `🥇 Welcome to Genesis 50, ${firstName}!`,
      templateId: parseInt(process.env.BREVO_GENESIS_50_WELCOME_TEMPLATE_ID || '1'),
      params: {
        first_name: firstName,
        tier: tierName,
        free_months: freeMonths.toString(),
        member_number: "1", // This would be dynamic in production
        slack_invite_url: process.env.GENESIS_50_SLACK_INVITE_URL || "https://join.slack.com/genesis50"
      },
      tags: ["genesis_50", "welcome", tierName.toLowerCase()]
    };

    const response = await fetch(`${BREVO_BASE_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log(`✅ Welcome email sent to ${email}`);
      return true;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to send welcome email to ${email}:`, error);
      return false;
    }
  } catch (error) {
    console.error('Error sending Genesis 50 welcome email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
  });
  
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Payment successful - slot is confirmed
        console.log('Payment successful for Genesis 50:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          tier: session.metadata?.tier,
          cohort: session.metadata?.cohort,
          amount: session.amount_total
        });

        // Process Genesis 50 member
        if (session.metadata?.genesis_50 === 'true' && session.customer_details?.email) {
          const email = session.customer_details.email;
          const tier = session.metadata.tier || '';
          
          // Extract first name from email or use default
          const firstName = session.customer_details.name?.split(' ')[0] || 
                           email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);

          // Add to Genesis 50 list in Brevo
          const addedToList = await addToGenesis50List(email, firstName, tier);
          
          if (addedToList) {
            // Send welcome email
            await sendGenesis50WelcomeEmail(email, firstName, tier);
            
            console.log('Genesis 50 member processed:', {
              email: email,
              firstName: firstName,
              tier: tier,
              slotType: session.metadata?.slot_type
            });
          }
        }
        
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        
        // Session expired - release the reserved slot
        if (expiredSession.metadata?.tier) {
          await releaseSlot(expiredSession.metadata.tier);
          console.log('Released slot due to expired session:', {
            tier: expiredSession.metadata.tier,
            sessionId: expiredSession.id
          });
        }
        
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        
        // Payment failed - release slot if it was a Genesis 50 purchase
        if (failedPayment.metadata?.tier) {
          await releaseSlot(failedPayment.metadata.tier);
          console.log('Released slot due to failed payment:', {
            tier: failedPayment.metadata.tier,
            paymentIntentId: failedPayment.id
          });
        }
        
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

