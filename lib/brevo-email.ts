import { PresaleOfferId } from "@/lib/presale";
import {
  buildPreorderConfirmationEmail,
  buildWaitlistWelcomeEmail,
} from "@/lib/email-templates";

type SendEmailInput = {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  tags?: string[];
};

type SendEmailResult =
  | { ok: true }
  | { ok: false; skipped?: boolean; error: string };

const BREVO_TRANSACTIONAL_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

function getSender() {
  return {
    name: process.env.BREVO_SENDER_NAME || "Tom at Just Summit",
    email: process.env.BREVO_SENDER_EMAIL || "hello@justsummit.co",
  };
}

function getReplyTo() {
  return {
    name: process.env.BREVO_SENDER_NAME || "Tom at Just Summit",
    email:
      process.env.BREVO_REPLY_TO_EMAIL ||
      process.env.BREVO_SENDER_EMAIL ||
      "hello@justsummit.co",
  };
}

async function sendTransactionalEmail({
  toEmail,
  toName,
  subject,
  htmlContent,
  textContent,
  tags = [],
}: SendEmailInput): Promise<SendEmailResult> {
  if (!process.env.BREVO_API_KEY) {
    console.warn("Skipping Brevo transactional email: BREVO_API_KEY is missing");
    return {
      ok: false,
      skipped: true,
      error: "BREVO_API_KEY is missing",
    };
  }

  try {
    const response = await fetch(BREVO_TRANSACTIONAL_EMAIL_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: getSender(),
        to: [
          {
            email: toEmail,
            ...(toName ? { name: toName } : {}),
          },
        ],
        replyTo: getReplyTo(),
        subject,
        htmlContent,
        textContent,
        tags,
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const errorText = await response.text();
    console.error("Brevo transactional email error:", errorText);
    return {
      ok: false,
      error: errorText || `Brevo returned ${response.status}`,
    };
  } catch (error) {
    console.error("Brevo transactional email request failed:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Brevo error",
    };
  }
}

export async function sendWaitlistWelcomeEmail({
  email,
  firstName,
}: {
  email: string;
  firstName: string;
}) {
  const emailContent = buildWaitlistWelcomeEmail(firstName);

  return sendTransactionalEmail({
    toEmail: email,
    toName: firstName,
    ...emailContent,
    tags: ["headphones-waitlist", "welcome"],
  });
}

export async function sendPreorderConfirmationEmail({
  email,
  firstName,
  offerId,
}: {
  email: string;
  firstName: string;
  offerId: PresaleOfferId;
}) {
  const emailContent = buildPreorderConfirmationEmail(offerId, firstName);

  return sendTransactionalEmail({
    toEmail: email,
    toName: firstName,
    ...emailContent,
    tags: ["headphones-presale", offerId],
  });
}
