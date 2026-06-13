# Just Summit Email Automation Setup

This project uses a hybrid email setup:

- The website sends instant transactional emails through Brevo.
- The website upserts every lead/customer into Attio.
- The website posts Brevo events so Brevo workflows can run the delayed sequence.
- Brevo should own the delayed waitlist and buyer follow-up automation.

## Brevo Contact Attributes

Create these as normal contact attributes in Brevo before enabling the workflow. Use text unless noted.

- `PRODUCT_INTEREST`: text
- `LEAD_SOURCE`: text
- `PRESALE_INTEREST`: boolean
- `PRESALE_CUSTOMER`: boolean
- `CUSTOMER_STAGE`: text, expected values `waitlist`, `deposit_preorder`, `full_preorder`, `needs_reply`, `customer`
- `OFFER_TYPE`: text, expected values `deposit`, `full`
- `EMAIL_SEQUENCE`: text, expected value `waitlist_deposit_v1`
- `WAITLIST_JOINED_AT`: text
- `PRESALE_OFFER_ID`: text
- `PRESALE_PAYMENT_TYPE`: text
- `PRESALE_PURCHASE_DATE`: text

The website sends these attributes on signup and updates them again after Stripe checkout.

## Brevo Events

The website posts these events to Brevo:

- `just_summit_waitlist_joined_v1`: sent when someone joins the website form.
- `just_summit_preorder_completed_v1`: sent when Stripe confirms a headphones preorder.

Use these as the Brevo workflow triggers.

## Waitlist Workflow

Workflow name: `Just Summit Headphones - Waitlist Deposit Sequence v1`

Trigger:

- Event is `just_summit_waitlist_joined_v1`.
- Contact property `EMAIL_SEQUENCE` is `waitlist_deposit_v1`.
- Contact property `CUSTOMER_STAGE` is `waitlist`.
- Contact property `PRESALE_CUSTOMER` is not true.

Do not send a second immediate welcome email from Brevo. The website already sends Email 0.

Before every delayed email, add an exit/suppression condition:

- Stop if `PRESALE_CUSTOMER` is true.
- Stop if `CUSTOMER_STAGE` is not `waitlist`.

Sequence:

1. Wait 1 day, then send: `Why we are building Summit Headphones`.
2. Wait 2 more days, then send: `What is confirmed, and what is still being finalised`.
3. Wait 3 more days, then send: `Deposit or full preorder: the simple version`.
4. Wait 6 more days, then send: `A few honest answers before you decide`.

Primary CTA:

- Deposit preorder.

Secondary CTA:

- Reply to `hello@justsummit.co`.

Use the sequence subjects and workflow notes here to build the Brevo emails. The app still owns the immediate signup and preorder transactional emails.

## Buyer Workflow

Workflow name: `Just Summit Headphones - Buyer Reassurance v1`

Trigger:

- Event is `just_summit_preorder_completed_v1`.

Rules:

- Stop the waitlist workflow when this event arrives.
- Wait 2 days.
- Send: `Here is what happens next with your Just Summit Headphones preorder`.
- Keep replies pointed at `hello@justsummit.co`.

For deposit customers, do not add balance-chasing emails until the balance due date is fixed. The current copy only says the balance is due `60 days before shipping`.

## Attio

The Attio People object currently exposes name, email, and description through the connector. The website therefore writes the stage and follow-up context into the person description:

- `Stage: waitlist`
- `Stage: deposit_preorder`
- `Stage: full_preorder`
- `customer_stage`
- `email_sequence`
- `offer_id`
- `payment_type`

If custom Attio fields are added later, map these values into fields and keep the description as a readable audit note.

## Test Checklist

1. Submit a test signup through `/api/subscribe`.
2. Confirm the contact appears in Brevo with `CUSTOMER_STAGE = waitlist`.
3. Confirm the Brevo event `just_summit_waitlist_joined_v1` is visible.
4. Confirm the person appears in Attio with `Stage: waitlist`.
5. Confirm the immediate welcome email is sent once.
6. Complete a Stripe test preorder.
7. Confirm Brevo updates `PRESALE_CUSTOMER = true` and `CUSTOMER_STAGE = deposit_preorder` or `full_preorder`.
8. Confirm the Brevo event `just_summit_preorder_completed_v1` is visible.
9. Confirm Attio updates the person stage.
10. Confirm the waitlist workflow stops and the buyer workflow is queued.
