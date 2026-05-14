import { NextRequest, NextResponse } from "next/server";
import { syncBrevoWaitlistContact } from "@/lib/brevo-contacts";
import { sendWaitlistWelcomeEmail } from "@/lib/brevo-email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const firstName =
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim()
        : email.split("@")[0];
    const source =
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim()
        : "website";

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const contactResult = await syncBrevoWaitlistContact({
      email,
      firstName,
      attributes: {
        PRODUCT_INTEREST: "Just Summit AI Headphones",
        LEAD_SOURCE: source,
        PRESALE_INTEREST: true,
      },
    });
    const emailResult = await sendWaitlistWelcomeEmail({
      email,
      firstName,
    });

    if (!emailResult.ok) {
      console.error("Waitlist welcome email failed:", emailResult.error);
    }

    if (!contactResult.ok) {
      console.error("Brevo waitlist contact sync failed:", contactResult.error);

      if (!emailResult.ok) {
        return NextResponse.json(
          { error: "Unable to add you to the updates list" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: contactResult.ok
        ? "You're on the Just Summit updates list."
        : "You're subscribed. We will follow up by email.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Unable to add you to the updates list" },
      { status: 500 }
    );
  }
}
