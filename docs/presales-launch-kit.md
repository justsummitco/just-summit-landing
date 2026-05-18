# Presales Launch Kit: 10 Paid Preorders By 2026-06-27

## Current State

- Public checkout is live and opens Stripe Checkout for the GBP 49 deposit and GBP 249 full-payment offers.
- Stripe production currently shows 0 paid headphone preorders.
- The next proof step is one controlled live GBP 49 purchase, then webhook, Brevo buyer sync, confirmation email, Stripe receipt, and optional refund verification.
- Do not spend on ads before the first warm outreach wave has produced real objections and at least a few buyer conversations.

## CTO Punch List

### Must Fix Before Outreach

- Run one controlled live GBP 49 purchase and verify:
  - Stripe Checkout completes in live mode.
  - `checkout.session.completed` reaches `https://www.justsummit.co/api/webhook` with HTTP 200.
  - Brevo contact sync marks the buyer as a presale customer.
  - The correct preorder confirmation email arrives.
  - Stripe sends its receipt.
  - Refund path is understood before promising fast refund handling.
- Confirm PostHog receives:
  - `presale_checkout_clicked`
  - `presale_checkout_started`
  - `presale_checkout_failed`
  - `presale_success_page_viewed`
  - `headphones_waitlist_signup`
- Use tagged outreach URLs so source attribution is visible in Stripe metadata and analytics, for example:
  - `https://www.justsummit.co/?utm_source=linkedin&utm_medium=dm&utm_campaign=first_10_presales`
  - `https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_campaign=first_10_presales`
  - `https://www.justsummit.co/?utm_source=whatsapp&utm_medium=dm&utm_campaign=first_10_presales`
- Build a 40-60 person warm list before sending the first wave.
- Prepare one support reply for refund, delivery timing, and "is this built yet?" questions.

### Nice To Have

- Add a short founder note or prototype update near the pricing section once there is a real update to share.
- Add one simple social proof block once the first buyers give permission to be referenced.
- Add a weekly founder update email template for buyers and waitlist leads.
- Use a real founder or prototype image when available; placeholders are fine until they can be honest and credible.

### Leave Alone For Now

- Do not redesign the whole site before outreach.
- Do not add more payment options before the first 10 buyers.
- Do not run paid ads until warm outreach tells us which objections actually stop people.
- Do not make stronger hardware claims than the current Q4 2026 early-stage language supports.

## Funnel Targets

- Goal: 10 paid preorders by 2026-06-27.
- Practical warm-outreach target: 40-60 qualified people if the close rate is around 15-25%.
- Conservative target: 100 qualified asks if the close rate is around 10%.
- First wave target by 2026-06-07: 4 paid preorders.
- Second wave target by 2026-06-20: 8 paid preorders total.
- Final push target by 2026-06-27: 10 paid preorders total.

## Daily Report Format

Use this once per day, even if the numbers are small.

| Date | Visitors | Checkout clicks | Checkout starts | Paid preorders | Deposit | Full | Waitlist signups | Outreach sent | Replies | Objections | Next action |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 2026-05-18 |  |  |  | 0 | 0 | 0 |  |  |  |  | Live proof purchase |

## Objection Notes

- "Is it built yet?"
  - Honest answer: the product is in an early-stage presale. The design direction is set, the first prototype/build phase is next, and buyers are reserving a first-batch place with a 30-day money-back guarantee.
- "Why pay now?"
  - The full-payment option locks in the lowest total price and priority shipping. The deposit option reserves a place with lower commitment.
- "What if it is delayed?"
  - Hardware timelines can move. Buyers will get production updates, and the current first-batch estimate is Q4 2026.
- "Can I get a refund?"
  - Yes, within the 30-day money-back guarantee, processed back to the original payment method.
- "Why should I trust this?"
  - Stripe handles checkout, card details are not stored by Just Summit, and updates come directly from the founder.

## Outreach Asset 1: Founder Email

Subject: A small favour: I am looking for the first 10 Summit buyers

Hi [First name],

I am opening the first presale for Just Summit, the headphones I am building to help people save the useful things they hear in meetings, calls, lectures, and podcasts.

It is still early-stage hardware, so I am being very direct about that. The first-batch estimate is Q4 2026, checkout is handled by Stripe, and there is a 30-day money-back guarantee.

I am looking for the first 10 people who genuinely want this enough to reserve one now. There are two options:

- GBP 49 deposit to reserve a place
- GBP 249 full payment to lock in the lowest total price and priority shipping

Here is the page:
https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_campaign=first_10_presales

If it is not for you, no pressure at all. But if you know someone who lives in calls, lectures, or podcasts and hates losing useful ideas, I would really appreciate an intro.

Tom

## Outreach Asset 2: LinkedIn/X Post

I am opening the first small presale for Just Summit.

The idea is simple: headphones for people who listen to learn, built to help save the useful things you only hear once in meetings, calls, lectures, and podcasts.

This is early-stage hardware. I am not pretending it is shipping tomorrow. First-batch delivery is estimated for Q4 2026, checkout is handled by Stripe, and there is a 30-day money-back guarantee.

I am looking for the first 10 paid preorders:

- GBP 49 deposit to reserve a first-batch place
- GBP 249 full payment for priority shipping and the lowest total price

If this is something you would actually use, I would love you to take a look:
https://www.justsummit.co/?utm_source=linkedin&utm_medium=post&utm_campaign=first_10_presales

## Outreach Asset 3: WhatsApp/DM

Hey [First name] - quick one. I have opened presales for Just Summit, the headphones I am building for people who want to save useful ideas from calls, lectures, podcasts, and meetings.

It is early-stage hardware, so I am being upfront: estimated first batch is Q4 2026 and there is a 30-day money-back guarantee.

I am trying to get the first 10 paid preorders. Would you take a look and tell me honestly if it feels compelling?

https://www.justsummit.co/?utm_source=whatsapp&utm_medium=dm&utm_campaign=first_10_presales

## Outreach Asset 4: Follow-Up Message

Hey [First name], just following up on Summit.

No pressure if it is not the right time. I am mainly trying to learn whether the presale page gives people enough confidence to reserve a first-batch place.

If you had one hesitation, was it price, delivery timing, trust, or just not needing the product?

Link again:
https://www.justsummit.co/?utm_source=followup&utm_medium=dm&utm_campaign=first_10_presales

## Outreach Asset 5: Buyer Thank-You / Update Email

Subject: Thank you for becoming one of the first Summit buyers

Hi [First name],

Thank you for reserving Just Summit. You are one of the first people backing this before it is the obvious thing to do, and that genuinely matters.

What happens next:

- Stripe will send the payment receipt.
- I will send meaningful production updates as the build progresses.
- The current first-batch delivery estimate is Q4 2026.
- Your preorder is covered by the 30-day money-back guarantee.

If you have questions or want to tell me what you most want Summit to capture well, reply to this email. Early buyer feedback will shape the build.

Tom
