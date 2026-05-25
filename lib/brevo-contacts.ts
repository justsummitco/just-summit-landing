type BrevoAttributeValue = string | number | boolean | string[] | number[];

type BrevoContactAttributes = Record<string, BrevoAttributeValue>;

type SyncBrevoContactInput = {
  email: string;
  firstName: string;
  attributes?: BrevoContactAttributes;
  listIds?: number[];
};

type BrevoApiError = {
  code?: string;
  message?: string;
};

type BrevoContactResult =
  | { ok: true; duplicate?: boolean; usedFallback?: boolean }
  | { ok: false; skipped?: boolean; error: string };

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function getWaitlistId(): number | null {
  const configuredId = process.env.BREVO_WAITLIST_LIST_ID;

  if (!configuredId) {
    return null;
  }

  const waitlistId = Number.parseInt(configuredId, 10);

  return Number.isInteger(waitlistId) ? waitlistId : null;
}

function getUniqueListIds(listIds: number[]) {
  return Array.from(new Set(listIds.filter((listId) => Number.isInteger(listId))));
}

async function readBrevoResponse(response: Response): Promise<BrevoApiError | string> {
  const responseText = await response.text();

  if (!responseText) {
    return "";
  }

  try {
    return JSON.parse(responseText) as BrevoApiError;
  } catch {
    return responseText;
  }
}

function isDuplicateContactError(error: BrevoApiError | string): boolean {
  return typeof error !== "string" && error.code === "duplicate_parameter";
}

async function postContact({
  email,
  attributes,
  listIds,
}: {
  email: string;
  attributes: BrevoContactAttributes;
  listIds: number[];
}) {
  return fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds,
      updateEnabled: true,
    }),
  });
}

export async function syncBrevoWaitlistContact({
  email,
  firstName,
  attributes = {},
  listIds = [],
}: SyncBrevoContactInput): Promise<BrevoContactResult> {
  if (!process.env.BREVO_API_KEY) {
    return {
      ok: false,
      skipped: true,
      error: "BREVO_API_KEY is missing",
    };
  }

  const waitlistId = getWaitlistId();

  if (!waitlistId) {
    return {
      ok: false,
      skipped: true,
      error: "BREVO_WAITLIST_LIST_ID is missing or invalid",
    };
  }
  const contactListIds = getUniqueListIds([waitlistId, ...listIds]);

  const baseAttributes: BrevoContactAttributes = {
    FIRSTNAME: firstName,
  };
  const fullAttributes = {
    ...baseAttributes,
    ...attributes,
  };

  const response = await postContact({
    email,
    attributes: fullAttributes,
    listIds: contactListIds,
  });

  if (response.ok) {
    return { ok: true };
  }

  const error = await readBrevoResponse(response);

  if (isDuplicateContactError(error)) {
    return { ok: true, duplicate: true };
  }

  if (response.status === 400 && Object.keys(attributes).length > 0) {
    console.warn(
      "Brevo rejected extended contact attributes; retrying with minimal attributes:",
      error
    );

    const fallbackResponse = await postContact({
      email,
      attributes: baseAttributes,
      listIds: contactListIds,
    });

    if (fallbackResponse.ok) {
      return { ok: true, usedFallback: true };
    }

    const fallbackError = await readBrevoResponse(fallbackResponse);

    if (isDuplicateContactError(fallbackError)) {
      return { ok: true, duplicate: true, usedFallback: true };
    }

    console.error("Brevo minimal contact sync failed:", fallbackError);

    return {
      ok: false,
      error:
        typeof fallbackError === "string"
          ? fallbackError
          : fallbackError.message || "Brevo contact sync failed",
    };
  }

  console.error("Brevo contact sync failed:", error);

  return {
    ok: false,
    error:
      typeof error === "string"
        ? error
        : error.message || "Brevo contact sync failed",
  };
}
