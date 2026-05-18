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
- Safety target: 200 qualified asks if the close rate is closer to 5%.
- First wave target by 2026-06-07: 4 paid preorders.
- Second wave target by 2026-06-20: 8 paid preorders total.
- Final push target by 2026-06-27: 10 paid preorders total.

## The Closest Thing To A Guarantee

We cannot guarantee 10 paid preorders because the market decides. We can guarantee the operating system:

- Ask enough qualified people that the maths is not fragile.
- Track every ask, reply, checkout start, paid preorder, and objection every day.
- Rewrite the pitch when objections repeat.
- Escalate from posts to direct messages, then to calls and voice notes if the numbers lag.

Decision rules:

- If fewer than 2 paid preorders after 30 direct asks, rewrite the pitch around the top objection.
- If fewer than 4 paid preorders by 2026-06-07, double outreach volume and ask every warm supporter for 2 intros.
- If fewer than 8 paid preorders by 2026-06-20, switch from passive posting to direct founder calls, voice notes, and referral asks.

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

## Warm Prospect Email Sequence

Use this manually for the first 40-60 warm leads. Stop if the person buys, gives a clear no, or asks not to be contacted again.

### Day 0: Personal Founder Ask

Subject: A small favour: I am looking for the first 10 Summit buyers

Hi [First name],

I am opening the first presale for Just Summit, the headphones I am building to help people save the useful things they hear in meetings, calls, lectures, podcasts, and courses.

The honest version: it is early-stage hardware. It is not sitting in a warehouse yet. The current first-batch estimate is Q4 2026, checkout is handled by Stripe, and there is a 30-day money-back guarantee.

I am looking for the first 10 people who genuinely want this enough to reserve one now.

There are two options:

- GBP 49 deposit to reserve a first-batch place
- GBP 249 full payment for the lowest total price and priority shipping

Here is the page:
https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_campaign=first_10_presales

If it is not for you, no pressure at all. But if you know someone who spends a lot of time in calls, lectures, podcasts, or meetings and hates losing useful ideas, I would really appreciate an intro.

Tom

### Day 2: Problem / Fit

Subject: Do you ever lose useful things from calls or podcasts?

Hi [First name],

A quick follow-up because I am trying to understand who Summit is most useful for.

The problem I keep coming back to is this: useful things are said once, then vanish. A good point in a meeting. A line from a podcast. Something in a lecture. A decision on a call. You know it mattered, but you cannot find it again later.

Summit is being built around that moment: headphones that help you keep the useful things you hear and find them again later.

Does that problem show up in your week?

If yes, the presale page is here:
https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_content=day2&utm_campaign=first_10_presales

If no, a blunt reply is useful too.

Tom

### Day 5: Trust / Risk

Subject: The honest version of where Summit is

Hi [First name],

The biggest thing I want to be clear about is stage.

Summit is an early-stage hardware presale. The product direction is set, the design target is clear, and the next milestone is the working prototype/build phase. The current first-batch estimate is Q4 2026, but hardware timelines can move as testing and manufacturing work reveals what needs changing.

That is why the presale is deliberately simple:

- GBP 49 deposit if you want lower commitment
- GBP 249 full payment if you want the lowest total price
- 30-day money-back guarantee
- Stripe checkout
- production updates by email

If you like the idea but want the least-risk way to back it, I would choose the GBP 49 deposit.

https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_content=day5&utm_campaign=first_10_presales

Tom

### Day 8: Referral / Social

Subject: Could you think of one person this is for?

Hi [First name],

If Summit is not something you would preorder yourself, no problem.

Could you think of one person who might genuinely care about it? The best fit is probably someone who spends a lot of time in meetings, podcasts, lectures, courses, research calls, or client conversations and wants to keep the useful bits.

If someone comes to mind, an intro would help more than a like or a share.

The page is here if useful:
https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_content=day8&utm_campaign=first_10_presales

Tom

### Day 12: Close The Loop

Subject: Should I close the loop on Summit?

Hi [First name],

Last nudge from me on this.

I am trying to find the first 10 people who want Summit enough to reserve a first-batch place while it is still early. If it is not for you, that is completely fine.

If there is one thing holding you back, is it:

- price;
- delivery timing;
- trust because it is early-stage hardware;
- not needing the product;
- something else?

A short reply would help me sharpen this.

And if you do want to reserve one, the page is here:
https://www.justsummit.co/?utm_source=email&utm_medium=founder&utm_content=day12&utm_campaign=first_10_presales

Tom

## Brevo Waitlist Sequence Plan

Keep the immediate welcome email automated. Build the remaining emails in Brevo as a founder build-diary sequence for contacts tagged as waitlist leads. Do not send these to paid buyers once they have converted.

### Immediate: Welcome

Subject: You're on the Summit Headphones list

Goal: confirm the signup, explain preorder options, and invite a reply.

CTA:
https://www.justsummit.co/?utm_source=email&utm_medium=waitlist&utm_campaign=first_10_presales#pricing

### +1 Day: Problem Story

Subject: The moment that made me build Summit

Hi [First name],

The first version of Summit came from a simple frustration: I would hear something useful, know I wanted to keep it, and then lose it the moment the audio ended.

Meetings, calls, lectures, and podcasts are full of moments like that. They are not always worth recording in full, but the useful parts should not disappear.

That is the job Summit is being built for: helping you keep the useful things you hear and find them again later.

If there is one listening situation you would want Summit to handle well, reply and tell me. Those replies help shape the build.

Tom

### +3 Days: Product Promise

Subject: What Summit is being built to do

Hi [First name],

The target experience is simple:

- listen as normal;
- capture the useful moments;
- turn them into structured notes and summaries;
- find them again later without replaying hours of audio.

We are building around a privacy-first, on-device direction, with encrypted sync planned for the companion app. Final specs may move as prototype work progresses, but the principle is fixed: useful listening should become useful memory.

If you already know you want a first-batch place, the lowest-friction option is the GBP 49 deposit:
https://www.justsummit.co/?utm_source=email&utm_medium=waitlist&utm_content=day3&utm_campaign=first_10_presales#pricing

Tom

### +6 Days: Risk / Reassurance

Subject: The honest presale terms

Hi [First name],

I do not want the presale to feel vague.

Here are the terms plainly:

- Summit is early-stage hardware.
- Estimated first-batch delivery is Q4 2026.
- GBP 49 reserves a first-batch place.
- GBP 249 pays in full and locks in the lowest total price.
- Deposit customers pay the remaining GBP 250 later.
- Every preorder has a 30-day money-back guarantee.
- Stripe handles checkout and card details.

If you like the idea but are cautious, the deposit is the sensible option:
https://www.justsummit.co/?utm_source=email&utm_medium=waitlist&utm_content=day6&utm_campaign=first_10_presales#pricing

Tom

### +10 Days: First-10 Push

Subject: I am looking for the first 10 buyers

Hi [First name],

I am trying to find the first 10 people who want Summit enough to back the first batch early.

Those first buyers matter because they prove whether this is only an interesting idea or something people care about enough to pay for. They also help shape what gets prioritised as the build moves forward.

If you want one, you can reserve a place here:
https://www.justsummit.co/?utm_source=email&utm_medium=waitlist&utm_content=day10&utm_campaign=first_10_presales#pricing

If you are not ready to buy but know someone who would get it immediately, an intro would be genuinely useful.

Tom

## Buyer Update Sequence

Send these after the Stripe/Brevo confirmation email. These are reassurance emails, not hard-sell emails.

### +2 Days: Founder Thank-You

Subject: You're one of the first Summit buyers

Hi [First name],

Thank you again for reserving Summit.

Being one of the first buyers is different from buying a finished product off a shelf. You are backing the first batch while the product is still being built, and I do not take that lightly.

What you can expect from me:

- clear production updates;
- honest language if timelines move;
- no pretending that early-stage hardware is risk-free;
- a direct reply path if you have questions.

If there is one thing you most want Summit to capture well, reply and tell me.

Tom

### Weekly / Milestone: Build Update

Subject: Summit build update: [milestone]

Hi [First name],

Here is the latest on Summit.

[Plain-English milestone update.]

What changed:

- [point 1]
- [point 2]
- [point 3]

What happens next:

- [next step]

Thanks again for backing this early. I will keep these updates useful and honest.

Tom

### After 3-5 Buyers: Momentum Update

Subject: A small first-batch update

Hi [First name],

A small update: the first few Summit buyers are now in.

That is a small number, but it matters. It means this is starting to move from an idea people say is interesting to something people are willing to back.

If one person comes to mind who would understand why Summit should exist, I would really appreciate an intro.

Tom

### Before Refund Window Ends: Reassurance

Subject: Any questions before your refund window closes?

Hi [First name],

Your 30-day money-back guarantee window is coming up.

I am not sending this to pressure you. I am sending it because early hardware should be handled clearly. If you have questions about timeline, product direction, refunds, or what happens next, reply and I will answer directly.

If you still feel good about backing Summit, there is nothing you need to do.

Tom

## Support Replies

### Refund Question

Hi [First name],

Yes. Every Just Summit preorder is covered by the 30-day money-back guarantee. If you want a refund, reply with the email address used at checkout and I will process it back to the original payment method through Stripe.

Stripe and bank timings can vary, but refunds usually appear within 5-10 business days after processing.

Tom

### Timeline Risk

Hi [First name],

Totally fair question. This is early-stage hardware, not a finished product sitting in a warehouse. The current first-batch estimate is Q4 2026, and that can move if prototype testing, tooling, or manufacturing work reveals something that needs changing.

The promise I can make is clear communication: buyers will get meaningful production updates, and the preorder is covered by the 30-day money-back guarantee.

Tom

### Is It Built Yet?

Hi [First name],

Not fully yet. Just Summit is in an early presale stage. The product direction is set, the design target is clear, and the next milestone is the working prototype/build phase.

That is why I am being upfront about the Q4 2026 first-batch estimate and the 30-day money-back guarantee. You would be backing the first batch early, not buying a finished item from stock.

Tom

### Why Pay Now?

Hi [First name],

The simple reason is to reserve an early place and help fund the first-batch build. The deposit option is GBP 49 if you want lower commitment. The full-payment option is GBP 249 if you want the lowest total price and priority shipping.

If you are unsure, the safest path is the deposit because it reserves your place while keeping the upfront commitment lower.

Tom
