import {
  BALANCE_DUE_TIMING,
  PRESALE_OFFERS,
  PresaleOfferId,
  SHIPPING_DATE,
  formatGBP,
} from "@/lib/presale";

type EmailContent = {
  subject: string;
  htmlContent: string;
  textContent: string;
};

type BaseEmailOptions = {
  preheader: string;
  title: string;
  eyebrow?: string;
  intro: string;
  sections?: Array<{
    heading?: string;
    body: string;
  }>;
  summaryRows?: Array<{
    label: string;
    value: string;
  }>;
  cta?: {
    label: string;
    href: string;
  };
  note?: string;
  reason: string;
  marketing?: boolean;
};

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.justsummit.co").replace(/\/$/, "");
}

function getPreorderUrl(): string {
  return `${getSiteUrl()}/#pricing`;
}

function getSupportEmail(): string {
  return process.env.BREVO_REPLY_TO_EMAIL || "hello@justsummit.co";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBaseEmail({
  preheader,
  title,
  eyebrow = "Just Summit",
  intro,
  sections = [],
  summaryRows = [],
  cta,
  note,
  reason,
  marketing = false,
}: BaseEmailOptions): string {
  const safeTitle = escapeHtml(title);
  const supportEmail = getSupportEmail();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;background:#f4f7f7;color:#07111f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f7;margin:0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dce6e6;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px 18px;border-bottom:1px solid #edf2f2;">
                <p style="margin:0;color:#008a86;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">${escapeHtml(eyebrow)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 30px 12px;">
                <h1 style="margin:0;font-size:29px;line-height:1.14;letter-spacing:-0.02em;color:#07111f;">${safeTitle}</h1>
                <p style="margin:22px 0 0;font-size:17px;line-height:1.7;color:#334155;">${intro}</p>
              </td>
            </tr>
            ${
              summaryRows.length
                ? `<tr>
              <td style="padding:10px 30px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce6e6;border-radius:8px;overflow:hidden;background:#f8fbfb;">
                  ${summaryRows
                    .map(
                      (row) => `<tr>
                    <td style="padding:13px 16px;border-bottom:1px solid #e8eeee;color:#64748b;font-size:13px;line-height:1.4;">${escapeHtml(row.label)}</td>
                    <td align="right" style="padding:13px 16px;border-bottom:1px solid #e8eeee;color:#07111f;font-size:13px;line-height:1.4;font-weight:700;">${escapeHtml(row.value)}</td>
                  </tr>`
                    )
                    .join("")}
                </table>
              </td>
            </tr>`
                : ""
            }
            ${
              sections.length
                ? `<tr><td style="padding:8px 30px 8px;">${sections
                    .map(
                      (section) => `
                  <div style="padding:18px 0;border-top:1px solid #edf2f2;">
                    ${
                      section.heading
                        ? `<h2 style="margin:0 0 8px;font-size:15px;line-height:1.4;color:#07111f;">${escapeHtml(section.heading)}</h2>`
                        : ""
                    }
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#475569;">${section.body}</p>
                  </div>`
                    )
                    .join("")}</td></tr>`
                : ""
            }
            ${
              cta
                ? `<tr>
              <td style="padding:18px 30px 10px;">
                <a href="${escapeHtml(cta.href)}" style="display:inline-block;background:#07111f;color:#ffffff;text-decoration:none;border-radius:6px;padding:15px 20px;font-size:14px;font-weight:700;">${escapeHtml(cta.label)}</a>
              </td>
            </tr>`
                : ""
            }
            ${
              note
                ? `<tr>
              <td style="padding:14px 30px 24px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">${note}</p>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 30px 30px;background:#07111f;color:#ffffff;">
                <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#dbeafe;">Tom<br>Founder, Just Summit</p>
                <p style="margin:0 0 10px;font-size:12px;line-height:1.6;color:#94a3b8;">${escapeHtml(reason)}</p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">Questions come straight to us. Reply to this email or contact ${escapeHtml(supportEmail)}.${marketing ? " If you would rather not receive these updates, reply and we will remove you." : ""}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderTextEmail({
  title,
  intro,
  sections = [],
  summaryRows = [],
  cta,
  note,
  reason,
  marketing = false,
}: Omit<BaseEmailOptions, "preheader" | "eyebrow">): string {
  const sectionText = sections
    .map((section) =>
      [section.heading, section.body.replace(/<[^>]+>/g, "")].filter(Boolean).join("\n")
    )
    .join("\n\n");
  const summaryText = summaryRows
    .map((row) => `${row.label}: ${row.value}`)
    .join("\n");
  const supportEmail = getSupportEmail();

  return [
    title,
    "",
    intro.replace(/<[^>]+>/g, ""),
    summaryText ? `\n${summaryText}` : "",
    sectionText ? `\n${sectionText}` : "",
    cta ? `\n${cta.label}: ${cta.href}` : "",
    note ? `\n${note.replace(/<[^>]+>/g, "")}` : "",
    "",
    "Tom",
    "Founder, Just Summit",
    "",
    reason,
    `Questions come straight to us. Reply to this email or contact ${supportEmail}.${marketing ? " If you would rather not receive these updates, reply and we will remove you." : ""}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWaitlistWelcomeEmail(firstName: string): EmailContent {
  const name = escapeHtml(firstName || "there");
  const fullOffer = PRESALE_OFFERS["headphones-full"];
  const depositOffer = PRESALE_OFFERS["headphones-deposit"];
  const intro = `Hi ${name}, I am Tom, the founder of Just Summit. Thanks for joining the Summit Headphones list. You are on the list, and we will keep you close to the product as it moves toward production.`;
  const options: BaseEmailOptions = {
    preheader: "You are on the Summit Headphones list.",
    title: "You're on the Summit Headphones list",
    intro,
    summaryRows: [
      {
        label: "Full preorder",
        value: `${formatGBP(fullOffer.amountDueNow)} today`,
      },
      {
        label: "Deposit",
        value: `${formatGBP(depositOffer.amountDueNow)} today + ${formatGBP(depositOffer.balanceDue)} later`,
      },
      {
        label: "Estimated delivery",
        value: SHIPPING_DATE,
      },
    ],
    sections: [
      {
        heading: "Why we are building them",
        body: "Useful things are said in meetings, lectures, calls, and podcasts every day, then disappear into memory. Summit Headphones are being built to help you capture those moments and find them again later.",
      },
      {
        heading: "What happens next",
        body: "We will send practical production updates, not noisy launch hype. When there is something useful to show or explain, you will hear it from us directly.",
      },
      {
        heading: "If you are ready to reserve",
        body: `Preorders are open at ${formatGBP(fullOffer.amountDueNow)} full payment, or ${formatGBP(depositOffer.amountDueNow)} deposit with ${formatGBP(depositOffer.balanceDue)} due later. Estimated first-batch delivery window: ${SHIPPING_DATE}.`,
      },
    ],
    cta: {
      label: "View preorder options",
      href: getPreorderUrl(),
    },
    note: "Preorders are covered by a 30-day money-back guarantee. If you have a question before ordering, reply and it will come straight to us.",
    reason: "You are receiving this because you joined the Summit Headphones updates list.",
    marketing: true,
  };

  return {
    subject: "You're on the Summit Headphones list",
    htmlContent: renderBaseEmail(options),
    textContent: renderTextEmail(options),
  };
}

export function buildFullPaymentConfirmationEmail(firstName: string): EmailContent {
  const name = escapeHtml(firstName || "there");
  const offer = PRESALE_OFFERS["headphones-full"];
  const options: BaseEmailOptions = {
    preheader: "Your Summit Headphones preorder is confirmed.",
    title: "Your Summit Headphones preorder is confirmed",
    intro: `Hi ${name}, thank you for backing the first batch. Your full-payment preorder for the Just Summit AI Headphones is confirmed.`,
    summaryRows: [
      {
        label: "Paid today",
        value: formatGBP(offer.amountDueNow),
      },
      {
        label: "Estimated delivery",
        value: SHIPPING_DATE,
      },
      {
        label: "Refund window",
        value: "30 days",
      },
    ],
    sections: [
      {
        heading: "Your payment",
        body: `You paid ${formatGBP(offer.amountDueNow)} today. Stripe will send your payment receipt separately to the email used at checkout.`,
      },
      {
        heading: "What happens next",
        body: `We will send meaningful production updates as the hardware moves forward. The current estimated first-batch delivery window is ${SHIPPING_DATE}.`,
      },
      {
        heading: "Support and guarantee",
        body: "Your preorder is covered by a 30-day money-back guarantee. If anything feels unclear, reply to this email and it will come straight to us.",
      },
    ],
    cta: {
      label: "View product details",
      href: `${getSiteUrl()}/#product`,
    },
    note: "Thank you again for trusting us this early. We will treat that seriously.",
    reason: "You are receiving this because you completed a Summit Headphones preorder.",
  };

  return {
    subject: "Your Summit Headphones preorder is confirmed",
    htmlContent: renderBaseEmail(options),
    textContent: renderTextEmail(options),
  };
}

export function buildDepositConfirmationEmail(firstName: string): EmailContent {
  const name = escapeHtml(firstName || "there");
  const offer = PRESALE_OFFERS["headphones-deposit"];
  const options: BaseEmailOptions = {
    preheader: "Your Summit Headphones reservation is confirmed.",
    title: "Your Summit Headphones reservation is confirmed",
    intro: `Hi ${name}, thank you for reserving your place in the first batch. Your deposit reservation for the Just Summit AI Headphones is confirmed.`,
    summaryRows: [
      {
        label: "Paid today",
        value: formatGBP(offer.amountDueNow),
      },
      {
        label: "Balance later",
        value: formatGBP(offer.balanceDue),
      },
      {
        label: "Total",
        value: formatGBP(offer.fullPrice),
      },
      {
        label: "Estimated delivery",
        value: SHIPPING_DATE,
      },
    ],
    sections: [
      {
        heading: "Your payment",
        body: `You paid ${formatGBP(offer.amountDueNow)} today. The remaining ${formatGBP(offer.balanceDue)} is due later, making ${formatGBP(offer.fullPrice)} total. Stripe will send your payment receipt separately to the email used at checkout.`,
      },
      {
        heading: "Balance timing",
        body: `The balance is due ${BALANCE_DUE_TIMING}. We will remind you clearly before that point so the next step is not a surprise.`,
      },
      {
        heading: "What happens next",
        body: `We will send meaningful production updates as the hardware moves forward. The current estimated first-batch delivery window is ${SHIPPING_DATE}.`,
      },
      {
        heading: "Support and guarantee",
        body: "Your deposit preorder is covered by a 30-day money-back guarantee. If anything feels unclear, reply to this email and it will come straight to us.",
      },
    ],
    cta: {
      label: "View product details",
      href: `${getSiteUrl()}/#product`,
    },
    note: "Thank you again for trusting us this early. We will treat that seriously.",
    reason: "You are receiving this because you completed a Summit Headphones deposit reservation.",
  };

  return {
    subject: "Your Summit Headphones reservation is confirmed",
    htmlContent: renderBaseEmail(options),
    textContent: renderTextEmail(options),
  };
}

export function buildProductionUpdateEmail(updateBody: string): EmailContent {
  const options: BaseEmailOptions = {
    preheader: "A short Summit Headphones production update.",
    title: "Summit Headphones production update",
    intro: "Hi, here is the latest production note from Just Summit.",
    sections: [
      {
        body: escapeHtml(updateBody).replace(/\n/g, "<br>"),
      },
    ],
    cta: {
      label: "View preorder options",
      href: getPreorderUrl(),
    },
    reason: "You are receiving this because you joined or preordered Summit Headphones updates.",
    marketing: true,
  };

  return {
    subject: "Summit Headphones production update",
    htmlContent: renderBaseEmail(options),
    textContent: renderTextEmail(options),
  };
}

export function buildShippingWindowUpdateEmail(updateBody: string): EmailContent {
  const options: BaseEmailOptions = {
    preheader: "A quick update on your Summit Headphones delivery window.",
    title: "A quick update on your delivery window",
    intro: `Hi, I wanted to give you a clear update on the Summit Headphones delivery window. The current estimated first-batch delivery window is ${SHIPPING_DATE}.`,
    sections: [
      {
        body: escapeHtml(updateBody).replace(/\n/g, "<br>"),
      },
    ],
    reason: "You are receiving this because you joined or preordered Summit Headphones updates.",
  };

  return {
    subject: "A quick update on your delivery window",
    htmlContent: renderBaseEmail(options),
    textContent: renderTextEmail(options),
  };
}

export function buildPreorderConfirmationEmail(
  offerId: PresaleOfferId,
  firstName: string
): EmailContent {
  return offerId === "headphones-deposit"
    ? buildDepositConfirmationEmail(firstName)
    : buildFullPaymentConfirmationEmail(firstName);
}
