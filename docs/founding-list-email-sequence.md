# Founding List email sequence

Status: copy and configuration handoff prepared for review. No campaign has been activated and no test or live emails were sent as part of this change.

## Current implementation audit

- `/api/subscribe` creates or updates a Brevo contact, records the signup source and UTM attribution, emits the existing Brevo waitlist event, syncs the lead to Attio and the presales sheet, and sends one transactional welcome email.
- The repository does not currently configure a timed multi-email Brevo automation. The sequence below must therefore be built and activated in Brevo after the copy, timing and suppression rules are approved.
- The existing event name and `waitlist_deposit_v1` contact value are retained for compatibility with any current Brevo workflow. The public experience now calls the audience the Founding List.
- A signup can still succeed when an optional CRM or sheet integration is unavailable. Brevo contact creation remains the primary list operation.

## Reviewable seven-email sequence

All timings are relative to a successful Founding List signup. Use the recipient's local time where Brevo supports it. Every email must include the standard unsubscribe control and postal/company information configured in Brevo.

### 1. Immediately — Welcome to the Founding List

- Subject: You're on the Just Summit Founding List
- Purpose: confirm signup, set an honest expectation and explain the prototype stage.
- Core message: Just Summit is moving from concept renders towards a working prototype. Subscribers will receive meaningful milestones, testing lessons and launch news rather than daily hype.
- CTA: See what we are building.
- Implementation: repository-owned transactional email, updated in `lib/email-templates.ts`.

### 2. Day 2 — The problem we are trying to solve

- Subject: The useful sentence that disappears after a meeting
- Purpose: establish the ADHD and busy-workday recall problem without making medical or performance claims.
- Core message: notes often fail because the useful moment has passed before someone knows it matters. Explain the aim of making selected audio easier to capture, summarise and find later.
- CTA: Read how the idea started.

### 3. Day 5 — What local-first means here

- Subject: Why local-first is a design priority
- Purpose: explain the privacy direction in clear, qualified language.
- Core message: the target architecture prioritises on-device processing, encrypted storage and controlled app synchronisation. Clearly state that final implementation is still subject to prototype validation.
- CTA: Read the privacy approach.

### 4. Day 9 — Prototype checkpoint

- Subject: What exists today — and what does not yet
- Purpose: build trust by separating current work from planned capabilities.
- Core message: label concept renders, describe the current prototype milestone and list the questions still being tested around comfort, battery, thermal behaviour and the capture workflow.
- CTA: View the public roadmap.

### 5. Day 14 — Ask for one useful answer

- Subject: Where does useful audio disappear for you?
- Purpose: collect qualitative research without presenting an unavailable testing programme as guaranteed.
- Core message: ask recipients to reply with the meeting, call, lecture or listening situation where recall breaks down most often.
- CTA: Reply to this email.

### 6. Day 21 — How the reservation works

- Subject: A plain-English look at the £49 reservation
- Purpose: introduce the paid option only after trust and context have been established.
- Core message: explain £49 today, £250 later, the 30-day refund policy and secure Stripe checkout. State that the target is Q4 2026, subject to prototype validation, testing and manufacturing.
- CTA: Review reservation options.

### 7. Day 30 — Continue on the right path

- Subject: Choose the Just Summit updates you want
- Purpose: reduce fatigue and move people into an appropriate ongoing cadence.
- Core message: offer continued monthly build updates, preorder news or unsubscribe. Do not create artificial urgency or claim limited places without evidence.
- CTA: Update preferences.

## Brevo configuration still required

1. Create a Founding List segment using the current contact list plus the signup event `just_summit_waitlist_joined_v1`.
2. Build emails 2–7 as Brevo templates, add approved company footer details and use Brevo's native unsubscribe/preferences controls.
3. Add delays and a goal/suppression rule that removes a contact from promotional reservation messages after `just_summit_preorder_completed_v1`.
4. Preserve the contact's `LEAD_SOURCE`, UTM fields and page URL for reporting. Do not overwrite first-touch attribution when later emails are clicked.
5. QA every template in desktop and mobile previews, send only to an internal review list, and obtain approval before activation.
6. Confirm SPF, DKIM and DMARC for the sending domain, the reply-to inbox owner, and the lawful-basis wording in the privacy policy.
7. After activation, monitor delivery, bounce, complaint, unsubscribe, reply, Founding List join and preorder conversion rates. Adjust cadence based on evidence rather than volume.
