# Presales Automation Setup

This is the operating setup for the first 10 Just Summit paid preorders.

## Google Sheets command centre

Use the native Google Sheet named `Just Summit Presales Command Centre`:

https://docs.google.com/spreadsheets/d/1zOpG-cOI8iZek6zgkUmmw4s42_H13tlkM6-O548AfEg/edit

It has these tabs:

- `Contacts`
- `Checkout Starts`
- `Paid Preorders`
- `Daily Scoreboard`
- `Outreach Pipeline`

The website writes to the first four tabs automatically when the Google Sheets
environment variables are present. Keep warm founder outreach in `Outreach
Pipeline`; the daily cron reads that tab for outreach/reply totals.

Required Vercel Production env vars:

- `GOOGLE_SHEETS_ENABLED=true`
- `GOOGLE_SHEETS_SPREADSHEET_ID=1zOpG-cOI8iZek6zgkUmmw4s42_H13tlkM6-O548AfEg`
- `GCP_PROJECT_ID=just-summit-presales`
- `GCP_PROJECT_NUMBER`
- `GCP_SERVICE_ACCOUNT_EMAIL=just-summit-sheets-writer@just-summit-presales.iam.gserviceaccount.com`
- `GCP_WORKLOAD_IDENTITY_POOL_ID=vercel`
- `GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID=vercel`
- `CRON_SECRET`

The Sheet must be shared with the `GCP_SERVICE_ACCOUNT_EMAIL` service-account
email with editor access. Do not create or store a Google service-account JSON
key. Production uses Vercel OIDC and Google Workload Identity Federation to
impersonate the service account with short-lived credentials.

Google Cloud setup:

- Vercel OIDC issuer mode: `Team`
- Issuer URL: `https://oidc.vercel.com/thomas-hoods-projects`
- Allowed audience: `https://vercel.com/thomas-hoods-projects`
- Workload Identity Pool ID: `vercel`
- Workload Identity Provider ID: `vercel`
- Attribute mapping: `google.subject = assertion.sub`
- Production subject:
  `owner:thomas-hoods-projects:project:just-summit-landing:environment:production`
- Service-account impersonation principal:
  `principal://iam.googleapis.com/projects/<GCP_PROJECT_NUMBER>/locations/global/workloadIdentityPools/vercel/subject/owner:thomas-hoods-projects:project:just-summit-landing:environment:production`
- Service-account IAM role for that principal: `Workload Identity User`

## Event writes

- `/api/subscribe` upserts `Contacts` after Brevo lead sync and welcome email.
- `/api/create-checkout-session` appends `Checkout Starts` after Stripe returns a
  Checkout Session.
- `/api/webhook` upserts `Paid Preorders` on `checkout.session.completed` and
  marks the contact as a buyer.
- `/api/cron/presales-daily-report` writes one row per day to `Daily Scoreboard`.

Google Sheets writes are best-effort for signup, checkout, and webhooks. They do
not block customers. The daily cron returns an error if the daily report cannot
be written, so Vercel logs make setup problems visible.

## PostHog

Raw visitor and funnel events stay in PostHog. The cron writes daily aggregate
counts to Sheets.

Required Vercel Production env vars:

- `NEXT_PUBLIC_POSTHOG_KEY` - website project token from PostHog
- `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com`
- `POSTHOG_PROJECT_ID=48899`
- `POSTHOG_PERSONAL_API_KEY` - private personal API key for daily reporting
- `POSTHOG_API_HOST=https://eu.posthog.com`

In PostHog Web Analytics, add these authorised URLs:

- `https://www.justsummit.co`
- `https://justsummit.co`

Tracked events:

- `$pageview`
- `presale_checkout_clicked`
- `presale_checkout_started`
- `presale_checkout_failed`
- `presale_success_page_viewed`
- `headphones_waitlist_signup`

## Brevo lists and sequences

Keep the current immediate emails:

- Waitlist welcome email from `/api/subscribe`
- Preorder confirmation email from `/api/webhook`

Create these Brevo lists:

- `Summit Waitlist Leads`
- `Summit Presale Buyers`

Set `BREVO_WAITLIST_LIST_ID` to the waitlist list and optionally set
`BREVO_BUYER_LIST_ID` to the buyer list. Paid buyers are added to both lists, so
the waitlist nurture automation should exclude contacts where
`PRESALE_CUSTOMER=true`.

Recommended Brevo waitlist automation:

- +1 day: problem story
- +3 days: product promise
- +6 days: honest presale terms
- +10 days: first-10 buyer ask

Warm prospect outreach should stay manual for the first 40-60 leads and be
tracked in `Outreach Pipeline`.
