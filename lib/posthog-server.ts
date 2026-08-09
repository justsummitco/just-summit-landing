type ServerPostHogResult =
  | { ok: true; skipped?: false }
  | { ok: false; skipped?: boolean; error: string };

type ServerPostHogEvent = {
  event: string;
  distinctId: string;
  properties: Record<string, string | number | boolean | undefined>;
  timestamp?: string;
};

function getPostHogIngestHost() {
  const configuredHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  return configuredHost
    .replace("https://eu.posthog.com", "https://eu.i.posthog.com")
    .replace("https://us.posthog.com", "https://us.i.posthog.com")
    .replace("https://app.posthog.com", "https://us.i.posthog.com")
    .replace(/\/$/, "");
}

export async function captureServerPostHogEvent({
  event,
  distinctId,
  properties,
  timestamp,
}: ServerPostHogEvent): Promise<ServerPostHogResult> {
  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const cleanDistinctId = distinctId.trim().slice(0, 200);

  if (!projectToken || !cleanDistinctId) {
    return {
      ok: false,
      skipped: true,
      error: "PostHog server capture is not configured",
    };
  }

  try {
    const response = await fetch(`${getPostHogIngestHost()}/i/v0/e/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: projectToken,
        event,
        distinct_id: cleanDistinctId,
        properties: {
          ...properties,
          $process_person_profile: false,
        },
        ...(timestamp ? { timestamp } : {}),
      }),
    });

    if (!response.ok) {
      throw new Error((await response.text()) || `PostHog returned ${response.status}`);
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown PostHog error",
    };
  }
}
