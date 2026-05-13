import { NextRequest, NextResponse } from "next/server";
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

    if (!process.env.BREVO_API_KEY || !process.env.BREVO_WAITLIST_LIST_ID) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const waitlistId = Number.parseInt(process.env.BREVO_WAITLIST_LIST_ID, 10);

    if (!Number.isInteger(waitlistId)) {
      return NextResponse.json(
        { error: "Email list is not configured" },
        { status: 500 }
      );
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          PRODUCT_INTEREST: "Just Summit AI Headphones",
          LEAD_SOURCE: source,
          PRESALE_INTEREST: true,
        },
        listIds: [waitlistId],
        updateEnabled: true,
      }),
    });

    const responseText = await brevoResponse.text();
    let parsedResponse: { code?: string; message?: string } | null = null;

    try {
      parsedResponse = responseText ? JSON.parse(responseText) : null;
    } catch {
      console.warn("Failed to parse Brevo response as JSON:", responseText);
    }

    if (brevoResponse.ok) {
      await sendWaitlistWelcomeEmail({
        email,
        firstName,
      });

      return NextResponse.json({
        success: true,
        message: "You're on the Just Summit updates list.",
      });
    }

    if (
      brevoResponse.status === 400 &&
      parsedResponse?.code === "duplicate_parameter"
    ) {
      return NextResponse.json({
        success: true,
        message: "You're already on the Just Summit updates list.",
      });
    }

    console.error("Brevo API error:", parsedResponse || responseText);
    return NextResponse.json(
      { error: "Unable to add you to the updates list" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Unable to add you to the updates list" },
      { status: 500 }
    );
  }
}
