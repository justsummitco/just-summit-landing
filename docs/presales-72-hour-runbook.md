# Presales 72-Hour Runbook

## Goal

Move from technically live checkout to confident founder-led selling, then begin the first outreach wave toward 10 paid preorders by 2026-06-27.

## Day 1: 2026-05-19

- Tom completes one real GBP 49 live purchase.
- Codex verifies:
  - Stripe payment is live and paid.
  - Stripe Customer exists.
  - Metadata includes `offer_id=headphones-deposit`, `payment_type=deposit`, `amount_due_now=4900`, and outreach/source fields when present.
  - Vercel webhook logs show HTTP 200 for `/api/webhook`.
  - Brevo contact is marked as a presale buyer.
  - Confirmation email and Stripe receipt arrive.
  - Refund path is understood before promising fast refund handling.
- Tom provides the PostHog project key.
- Codex adds PostHog production env vars, redeploys, and verifies checkout tracking events.

## Day 2: 2026-05-20

- Build the first 40-60 lead list in `docs/presales-lead-tracker.csv`.
- Prioritise people with:
  - high meeting/call volume;
  - podcast, lecture, or course usage;
  - founder/operator/consultant workflows;
  - prior interest in AI, productivity, or audio tools;
  - enough trust in Tom to consider an early-stage preorder.
- Send the first 10-15 direct founder messages.
- Log every send, reply, objection, checkout start, and payment.

## Day 3: 2026-05-21

- Follow up with non-responders from Day 2.
- Send another 15-20 direct messages.
- Post the LinkedIn/X founder update.
- Rewrite the pitch if the same objection appears 3 or more times.
- Ask each positive responder for 2 introductions if they do not buy.

## Daily Scoreboard

Record these numbers once per day:

- paid preorders;
- deposit vs full-payment split;
- checkout starts;
- waitlist signups;
- outreach sent;
- replies;
- top objections;
- next action.

## Escalation Rules

- Fewer than 2 paid preorders after 30 direct asks: rewrite the pitch around the top objection.
- Fewer than 4 paid preorders by 2026-06-07: expand to 100-150 qualified asks and request intros from every warm supporter.
- Fewer than 8 paid preorders by 2026-06-20: use founder calls, short voice notes, and direct objection handling instead of passive posts.
