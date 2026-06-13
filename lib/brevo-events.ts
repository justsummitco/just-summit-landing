type BrevoEventPrimitive = string | number | boolean;
type BrevoEventValue =
  | BrevoEventPrimitive
  | Record<string, unknown>
  | unknown[]
  | undefined;

type TrackBrevoEventInput = {
  eventName: string;
  email: string;
  contactProperties?: Record<string, BrevoEventPrimitive>;
  eventProperties?: Record<string, BrevoEventValue>;
  eventDate?: string;
};

type BrevoEventResult =
  | { ok: true }
  | { ok: false; skipped?: boolean; error: string };

export const BREVO_EVENT_NAMES = {
  waitlistJoined: "just_summit_waitlist_joined_v1",
  preorderCompleted: "just_summit_preorder_completed_v1",
} as const;

const BREVO_EVENTS_URL = "https://api.brevo.com/v3/events";

export async function trackBrevoEvent({
  eventName,
  email,
  contactProperties = {},
  eventProperties = {},
  eventDate = new Date().toISOString(),
}: TrackBrevoEventInput): Promise<BrevoEventResult> {
  if (!process.env.BREVO_API_KEY) {
    return {
      ok: false,
      skipped: true,
      error: "BREVO_API_KEY is missing",
    };
  }

  try {
    const response = await fetch(BREVO_EVENTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        event_name: eventName,
        event_date: eventDate,
        identifiers: {
          email_id: email,
        },
        contact_properties: contactProperties,
        event_properties: eventProperties,
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const errorText = await response.text();
    return {
      ok: false,
      error: errorText || `Brevo event returned ${response.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Brevo event error",
    };
  }
}
