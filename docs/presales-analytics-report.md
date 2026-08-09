# Presales Analytics Report

## Where to see the numbers

The operating report is the [Just Summit Presales Command Centre](https://docs.google.com/spreadsheets/d/1zOpG-cOI8iZek6zgkUmmw4s42_H13tlkM6-O548AfEg/edit).

- `Daily Scoreboard`: daily traffic, funnel and conversion rates.
- `Checkout Starts`: one row per Stripe Checkout Session created.
- `Paid Preorders`: one upserted row per paid Stripe Checkout Session.

Stripe remains the source of truth for paid deposit and full-price preorders.
PostHog is the source for page, offer-view, click and checkout-start behaviour.

The production cron runs at 08:00 UTC and reports the preceding UTC day.

## Funnel definitions

The two offer funnels are reported separately:

1. `presale_offer_viewed`: at least 50% of the pricing card remained visible for
   750 ms; recorded once per card per page load.
2. `presale_checkout_clicked`: the visitor pressed that offer's checkout button.
3. `presale_checkout_started`: Stripe returned a valid Checkout URL.
4. Paid preorder: a Stripe Checkout Session for that offer has
   `payment_status=paid`.

`presale_purchase_completed` is also sent from the verified Stripe webhook so a
PostHog funnel can connect the anonymous browser journey to payment. It contains
offer, amount, currency and attribution properties, but no email, name, card or
payment details. The daily paid figures still come from Stripe rather than this
analytics event.

## Reading the rates

- View to click: pricing-card engagement.
- Click to checkout: whether Stripe checkout opens successfully.
- Checkout to paid: payment completion after a Checkout Session was created.
- View to paid: end-to-end pricing-card conversion.
- Checkout abandonment: checkout starts that do not have a paid Stripe Session
  in the same UTC reporting day.

Because payment can happen after midnight or after a visitor returns later,
daily checkout-to-paid and abandonment rates are directional. Use PostHog's
multi-day funnel and Stripe Checkout Session status for individual journeys.

## PostHog dashboard

Create two funnel insights with these steps:

1. `presale_offer_viewed`
2. `presale_checkout_clicked`
3. `presale_checkout_started`
4. `presale_purchase_completed`

Filter one insight to `offer_id = headphones-deposit` and the other to
`offer_id = headphones-full`. Use a 7-day conversion window. Add breakdowns for
`utm_source`, `utm_campaign`, `source` and `viewport_category` when traffic is
large enough to avoid misleading one-person percentages.

## Historical backfill

Offer views did not exist before this instrumentation was deployed. Never enter
zero for those historical days: zero would imply the event was active and no one
saw the cards. Historical offer views and view-based rates are written as
`not_tracked`.

Preview a bounded backfill first:

```powershell
$env:CRON_SECRET="<production cron secret>"
npm run report:backfill -- --from=2026-05-19 --to=2026-08-08 --offer-view-tracking-start=YYYY-MM-DD
```

Inspect every preview row. To upsert the same dates by date key:

```powershell
npm run report:backfill -- --from=2026-05-19 --to=2026-08-08 --offer-view-tracking-start=YYYY-MM-DD --apply
```

Use the actual production deployment date for `offer-view-tracking-start`.
Backfills are limited to 93 days per run and do not contain customer PII.
