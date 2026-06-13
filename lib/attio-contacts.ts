type AttioContactResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; skipped?: boolean; error: string };

type SyncAttioContactInput = {
  email: string;
  name: string;
  source: string;
  stage: "waitlist" | "presale_customer";
  details?: Record<string, string | boolean | undefined>;
};

const ATTIO_PEOPLE_UPSERT_URL =
  "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: parts.join(" "),
  };
}

function buildDescription({ source, stage, details = {} }: SyncAttioContactInput) {
  const lines = [
    "Captured from Just Summit website.",
    `Source: ${source}`,
    `Stage: ${stage}`,
  ];

  Object.entries(details).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      lines.push(`${key}: ${value}`);
    }
  });

  return lines.join("\n");
}

export async function syncAttioContact(
  input: SyncAttioContactInput
): Promise<AttioContactResult> {
  if (!process.env.ATTIO_API_KEY) {
    return {
      ok: true,
      skipped: true,
    };
  }

  const name = splitName(input.name || input.email.split("@")[0]);

  try {
    const response = await fetch(ATTIO_PEOPLE_UPSERT_URL, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [input.email],
            name: [name],
            description: buildDescription(input),
          },
        },
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const errorText = await response.text();

    return {
      ok: false,
      error: errorText || `Attio returned ${response.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Attio error",
    };
  }
}
