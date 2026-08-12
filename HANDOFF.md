# Just Summit presales analytics handoff

Updated: 11 August 2026 (Europe/London)

This document is the continuation point for moving the work to the Mac. Treat
product, prototype, customer and presale information as confidential. Never
commit credentials, local environment files, recordings or customer data.

## Start here on the Mac

Repository: `https://github.com/justsummitco/just-summit-landing.git`

Working branch: `codex/founding-list-funnel`

Draft pull request:
[Add Founding List and presale conversion funnel](https://github.com/justsummitco/just-summit-landing/pull/1)

Functional implementation tip before this handoff: `282ad84`

For an existing checkout:

```bash
git fetch --prune origin
git switch codex/founding-list-funnel
git pull --ff-only origin codex/founding-list-funnel
npm ci
```

For a new checkout:

```bash
git clone https://github.com/justsummitco/just-summit-landing.git
cd just-summit-landing
git switch codex/founding-list-funnel
npm ci
```

Before changing anything, confirm:

```bash
git status -sb
git log --oneline -5
gh pr view 1 --repo justsummitco/just-summit-landing
```

## Current verified state

- The branch was clean and tracking
  `origin/codex/founding-list-funnel` before this handoff was added.
- Pull request 1 is open as a draft, targets `main`, is mergeable and has green
  Vercel checks.
- The changes have not been merged or deployed to Production.
- The latest full verification passed 64 Jest tests across 14 suites.
- `npm run build` passed, including the public-copy audit, type checking and
  generation of all 55 pages.
- Desktop and 390 px mobile browser checks passed for the pricing cards and
  checkout calls to action.
- Known non-blocking build warnings are three existing raw `<img>` warnings in
  `components/HeadphonesSection.jsx` and outdated Browserslist data.

## What is implemented on the branch

- Founding List acquisition flow and supporting Brevo/Google Sheets automation.
- Separate deposit and full-price offer tracking.
- `presale_offer_viewed` after at least 50% of a pricing card remains visible
  for 750 ms, once per offer per page load.
- Consistent offer, payment type, placement, referrer and UTM attribution on
  view, click and checkout-start events.
- Anonymous PostHog distinct ID carried into Stripe metadata.
- Privacy-safe `presale_purchase_completed` emitted by the verified Stripe
  webhook without customer PII.
- Separate deposit/full-price views, clicks, checkout starts, paid totals and
  conversion/abandonment rates in the daily report.
- Preview-first historical backfill. Offer views from before deployment are
  recorded as `not_tracked`, never zero.
- Source-health guardrails: missing or failed PostHog/Stripe reporting returns
  HTTP 503 and does not write a false-zero Sheet row.

Primary implementation notes:

- `docs/presales-analytics-report.md`
- `docs/presales-automation-setup.md`
- `docs/presales-72-hour-runbook.md`

## Read-only live audit findings

The audit did not expose or commit any secret or customer data. Temporary
environment files were deleted afterwards.

- The
  [Just Summit Presales Command Centre](https://docs.google.com/spreadsheets/d/1zOpG-cOI8iZek6zgkUmmw4s42_H13tlkM6-O548AfEg/edit)
  is accessible and contains `Contacts`, `Checkout Starts`, `Paid Preorders`,
  `Daily Scoreboard` and `Outreach Pipeline`.
- At the time of inspection, those tabs had their expected headers but no data
  rows.
- Stripe sessions created from 19 May through 9 August 2026 showed:
  - deposit: 7 sessions, 0 paid, 7 unpaid, 6 expired and 1 open;
  - full price: 0 sessions.
- That Stripe result is a historical snapshot, not a live total after 9 August.
- Vercel has names for the PostHog Production and Preview variables, but the
  pulled values were empty. A public project token was still present in the old
  deployed site, but a public token cannot query historical data.
- The documented PostHog project is EU-hosted with project ID `48899`:
  - ingest host: `https://eu.i.posthog.com`;
  - private API host: `https://eu.posthog.com`.
- `GCP_PROJECT_NUMBER` is missing from Vercel and was not found in the working
  tree, repository history or wider Summit workspace.
- The Google account inspected on Windows was
  `thomashoodpr@gmail.com`; it lacked `resourcemanager.projects.get` for
  `just-summit-presales`.

## External configuration still required

Do not paste private API keys into chat or commit them. Add them directly to the
Vercel Production environment.

PostHog:

- `NEXT_PUBLIC_POSTHOG_KEY` - the EU project token;
- `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com`;
- `POSTHOG_PROJECT_ID=48899`;
- `POSTHOG_PERSONAL_API_KEY` - a private key allowed to query the project;
- `POSTHOG_API_HOST=https://eu.posthog.com`.

Google Cloud:

- sign in with an account that can read project `just-summit-presales`;
- retrieve the numeric project number:

```bash
gcloud projects describe just-summit-presales --format='value(projectNumber)'
```

- add that value to Vercel Production as `GCP_PROJECT_NUMBER`;
- confirm the Sheet is shared as Editor with
  `just-summit-sheets-writer@just-summit-presales.iam.gserviceaccount.com`;
- keep the existing keyless Vercel OIDC/Google Workload Identity Federation
  design; do not create a service-account JSON key.

If the Mac checkout is not linked to Vercel:

```bash
npx vercel link --yes --project just-summit-landing --scope thomas-hoods-projects
```

## Safe completion sequence

1. Populate and verify the Production variables above without printing their
   values.
2. Confirm the Sheet service-account permission and Google Workload Identity
   principal from `docs/presales-automation-setup.md`.
3. Review pull request 1, then mark it ready and merge only with explicit
   approval.
4. Wait for the Production deployment and verify the live site contains both
   `article[data-offer-id]` pricing-card markers.
5. Generate one real test journey for each offer: view, click and successful
   Checkout creation. Do not complete a paid purchase unless explicitly
   authorised.
6. Confirm PostHog receives the view/click/start events with the correct
   `offer_id`, and confirm Stripe metadata contains the offer and anonymous
   PostHog distinct ID.
7. Call the daily report in preview mode for a bounded date and confirm the
   deposit/full-price row is accurate before allowing a Sheet write.
8. Preview the historical backfill. Use the actual Production deployment date
   as `offer-view-tracking-start`; use the day before that deployment as the
   historical `--to` date.
9. Inspect every preview row, then rerun the exact range with `--apply`.
10. Confirm the next 08:00 UTC cron produces one accurate `Daily Scoreboard`
    row and that source failures cannot create false zeroes.

On macOS zsh, load the cron secret without placing it directly in shell
history:

```zsh
read -s "CRON_SECRET?CRON_SECRET: "
echo
export CRON_SECRET
npm run report:backfill -- \
  --from=2026-05-19 \
  --to=YYYY-MM-DD \
  --offer-view-tracking-start=YYYY-MM-DD
```

Only after reviewing the preview:

```bash
npm run report:backfill -- \
  --from=2026-05-19 \
  --to=YYYY-MM-DD \
  --offer-view-tracking-start=YYYY-MM-DD \
  --apply
unset CRON_SECRET
```

The script limits each run to 93 days and upserts by date. Never substitute
zero for historical offer views that were not tracked.

## Verification commands

Run these after any Mac-side change and before merging:

```bash
npm test -- --runInBand
npm run test:e2e
npm run build
git diff --check
git status -sb
```

Definition of done:

- Production has non-empty, correct PostHog and Google configuration.
- Pull request 1 is reviewed, merged and deployed successfully.
- Both offer funnels emit live events and create correctly attributed Stripe
  sessions.
- The daily report preview matches PostHog and Stripe source data.
- The reviewed historical range is applied with pre-deployment views marked
  `not_tracked`.
- The scheduled cron writes a verified daily Sheet row.
