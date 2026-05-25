import { getVercelOidcToken } from "@vercel/oidc";
import { ExternalAccountClient } from "google-auth-library";
import Stripe from "stripe";

type CellValue = string | number | boolean;

type SheetWriteResult =
  | { ok: true; skipped?: false }
  | { ok: false; skipped?: boolean; error: string };

export type PresalesAttribution = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  page_url: string;
}>;

type SheetsConfig = {
  spreadsheetId: string;
  projectNumber: string;
  serviceAccountEmail: string;
  workloadIdentityPoolId: string;
  workloadIdentityPoolProviderId: string;
};

type ExternalAccountClientOptions = Parameters<typeof ExternalAccountClient.fromJSON>[0];
type GoogleExternalAuthClient = NonNullable<ReturnType<typeof ExternalAccountClient.fromJSON>>;

type GoogleValuesResponse = {
  values?: string[][];
};

type LeadTrackingInput = {
  email: string;
  firstName: string;
  source: string;
  status?: "waitlist" | "buyer";
  attribution?: PresalesAttribution;
  lastEvent?: string;
  timestamp?: string;
};

type CheckoutStartInput = {
  session: Stripe.Checkout.Session;
  metadata: Record<string, string>;
};

type PaidPreorderInput = {
  session: Stripe.Checkout.Session;
};

export type DailyScoreboardInput = {
  date: string;
  visitors: number;
  checkoutClicks: number;
  checkoutStarts: number;
  checkoutFailures: number;
  successPageViews: number;
  paidPresales: number;
  depositPresales: number;
  fullPresales: number;
  waitlistSignups: number;
  outreachSent: number;
  replies: number;
  topObjections: string;
  nextAction: string;
};

export type OutreachPipelineRollup = {
  outreachSent: number;
  replies: number;
  topObjections: string;
};

const GOOGLE_SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_STS_TOKEN_URL = "https://sts.googleapis.com/v1/token";
const GOOGLE_IAM_CREDENTIALS_BASE =
  "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts";
const VERCEL_OIDC_EXPIRATION_BUFFER_MS = 5 * 60 * 1000;

const CONTACTS_HEADERS = [
  "timestamp",
  "email",
  "first_name",
  "status",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "page_url",
  "last_event",
  "last_event_at",
  "next_follow_up",
  "notes",
];

const CHECKOUT_START_HEADERS = [
  "timestamp",
  "session_id",
  "offer_id",
  "payment_type",
  "amount_due_now",
  "balance_due",
  "currency",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "page_url",
  "checkout_url",
];

const PAID_PREORDER_HEADERS = [
  "timestamp",
  "session_id",
  "payment_intent_id",
  "customer_id",
  "email",
  "name",
  "offer_id",
  "payment_type",
  "amount_paid",
  "balance_due",
  "currency",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "page_url",
  "livemode",
];

const DAILY_SCOREBOARD_HEADERS = [
  "date",
  "visitors",
  "checkout_clicks",
  "checkout_starts",
  "checkout_failures",
  "success_page_views",
  "paid_presales",
  "deposit_presales",
  "full_presales",
  "waitlist_signups",
  "outreach_sent",
  "replies",
  "top_objections",
  "next_action",
];

const OUTREACH_PIPELINE_HEADERS = [
  "name",
  "company_or_context",
  "relationship",
  "channel",
  "fit_reason",
  "priority",
  "status",
  "current_email_step",
  "day0_sent",
  "day2_sent",
  "day5_sent",
  "day8_sent",
  "day12_sent",
  "last_contacted",
  "next_follow_up",
  "reply",
  "objection",
  "checkout_started",
  "paid_preorder",
  "offer",
  "intro_requested",
  "intro_received",
  "notes",
];

export const PRESALES_SHEET_HEADERS = {
  contacts: CONTACTS_HEADERS,
  checkoutStarts: CHECKOUT_START_HEADERS,
  paidPreorders: PAID_PREORDER_HEADERS,
  dailyScoreboard: DAILY_SCOREBOARD_HEADERS,
  outreachPipeline: OUTREACH_PIPELINE_HEADERS,
};

let authClientCache: GoogleExternalAuthClient | null = null;
let authClientCacheKey: string | null = null;

function getSheetsConfig(): SheetsConfig | null {
  if (process.env.GOOGLE_SHEETS_ENABLED === "false") {
    return null;
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const projectNumber = process.env.GCP_PROJECT_NUMBER;
  const serviceAccountEmail = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
  const workloadIdentityPoolId = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
  const workloadIdentityPoolProviderId = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

  if (
    !spreadsheetId ||
    !projectNumber ||
    !serviceAccountEmail ||
    !workloadIdentityPoolId ||
    !workloadIdentityPoolProviderId
  ) {
    return null;
  }

  return {
    spreadsheetId,
    projectNumber,
    serviceAccountEmail,
    workloadIdentityPoolId,
    workloadIdentityPoolProviderId,
  };
}

function getAuthClientCacheKey(config: SheetsConfig) {
  return [
    config.projectNumber,
    config.serviceAccountEmail,
    config.workloadIdentityPoolId,
    config.workloadIdentityPoolProviderId,
  ].join("|");
}

export function createGoogleSheetsExternalAccountOptions(
  config: Pick<
    SheetsConfig,
    | "projectNumber"
    | "serviceAccountEmail"
    | "workloadIdentityPoolId"
    | "workloadIdentityPoolProviderId"
  >
): ExternalAccountClientOptions {
  return {
    type: "external_account",
    audience: `//iam.googleapis.com/projects/${config.projectNumber}/locations/global/workloadIdentityPools/${config.workloadIdentityPoolId}/providers/${config.workloadIdentityPoolProviderId}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: GOOGLE_STS_TOKEN_URL,
    service_account_impersonation_url: `${GOOGLE_IAM_CREDENTIALS_BASE}/${config.serviceAccountEmail}:generateAccessToken`,
    service_account_impersonation: {
      token_lifetime_seconds: 3600,
    },
    scopes: [GOOGLE_SHEETS_SCOPE],
    subject_token_supplier: {
      getSubjectToken: async () =>
        getVercelOidcToken({
          expirationBufferMs: VERCEL_OIDC_EXPIRATION_BUFFER_MS,
        }),
    },
  };
}

function getGoogleAuthClient(config: SheetsConfig) {
  const cacheKey = getAuthClientCacheKey(config);

  if (authClientCache && authClientCacheKey === cacheKey) {
    return authClientCache;
  }

  const authClient = ExternalAccountClient.fromJSON(
    createGoogleSheetsExternalAccountOptions(config)
  );

  if (!authClient) {
    throw new Error("Google Sheets OIDC authentication could not be initialised");
  }

  authClientCache = authClient;
  authClientCacheKey = cacheKey;

  return authClientCache;
}

async function getAccessToken(config: SheetsConfig) {
  const tokenResponse = await getGoogleAuthClient(config).getAccessToken();

  if (!tokenResponse.token) {
    throw new Error("Google Sheets OIDC authentication did not return an access token");
  }

  return tokenResponse.token;
}

function quoteSheetName(sheetName: string) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(sheetName)
    ? sheetName
    : `'${sheetName.replace(/'/g, "''")}'`;
}

function getRange(sheetName: string, range: string) {
  return `${quoteSheetName(sheetName)}!${range}`;
}

async function sheetsFetch(
  config: SheetsConfig,
  path: string,
  init: RequestInit = {}
) {
  const accessToken = await getAccessToken(config);
  const response = await fetch(`${GOOGLE_SHEETS_API_BASE}/${config.spreadsheetId}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Google Sheets returned ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function readRows(
  config: SheetsConfig,
  sheetName: string,
  range = "A:Z"
): Promise<string[][]> {
  const a1Range = encodeURIComponent(getRange(sheetName, range));
  const response = (await sheetsFetch(config, `/values/${a1Range}`)) as GoogleValuesResponse;

  return response.values || [];
}

async function appendRow(
  config: SheetsConfig,
  sheetName: string,
  row: CellValue[]
) {
  const a1Range = encodeURIComponent(getRange(sheetName, "A1"));
  await sheetsFetch(
    config,
    `/values/${a1Range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({
        values: [row],
      }),
    }
  );
}

async function updateRow(
  config: SheetsConfig,
  sheetName: string,
  rowNumber: number,
  row: CellValue[]
) {
  const endColumn = columnLetter(row.length);
  const a1Range = encodeURIComponent(getRange(sheetName, `A${rowNumber}:${endColumn}${rowNumber}`));

  await sheetsFetch(config, `/values/${a1Range}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({
      values: [row],
    }),
  });
}

function columnLetter(columnCount: number) {
  let dividend = columnCount;
  let columnName = "";

  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}

function clean(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function getMetadata(session: Stripe.Checkout.Session) {
  return session.metadata || {};
}

function getSessionId(session: Stripe.Checkout.Session) {
  return clean(session.id || session.payment_intent || `missing-session-${Date.now()}`);
}

async function runSheetWrite(
  label: string,
  operation: (config: SheetsConfig) => Promise<void>
): Promise<SheetWriteResult> {
  const config = getSheetsConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      error: "Google Sheets is not configured",
    };
  }

  try {
    await operation(config);
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Google Sheets error";
    console.error(`${label} failed:`, error);

    return {
      ok: false,
      error: message,
    };
  }
}

function contactRow(input: LeadTrackingInput, existing: string[] = []): CellValue[] {
  const timestamp = input.timestamp || new Date().toISOString();
  const existingStatus = existing[3] || "";
  const status = input.status || existingStatus || "waitlist";

  return [
    existing[0] || timestamp,
    input.email,
    input.firstName || existing[2] || "",
    status === "buyer" || existingStatus !== "buyer" ? status : existingStatus,
    input.source || existing[4] || "website",
    input.attribution?.utm_source || existing[5] || "",
    input.attribution?.utm_medium || existing[6] || "",
    input.attribution?.utm_campaign || existing[7] || "",
    input.attribution?.utm_content || existing[8] || "",
    input.attribution?.utm_term || existing[9] || "",
    input.attribution?.referrer || existing[10] || "",
    input.attribution?.page_url || existing[11] || "",
    input.lastEvent || existing[12] || "waitlist_signup",
    timestamp,
    existing[14] || "",
    existing[15] || "",
  ];
}

async function upsertContact(config: SheetsConfig, input: LeadTrackingInput) {
  const rows = await readRows(config, "Contacts", `A:${columnLetter(CONTACTS_HEADERS.length)}`);
  const targetEmail = input.email.toLowerCase();
  const rowIndex = rows.findIndex(
    (row, index) => index > 0 && clean(row[1]).toLowerCase() === targetEmail
  );

  if (rowIndex >= 0) {
    await updateRow(config, "Contacts", rowIndex + 1, contactRow(input, rows[rowIndex]));
    return;
  }

  await appendRow(config, "Contacts", contactRow(input));
}

export async function trackPresalesLead(input: LeadTrackingInput) {
  return runSheetWrite("Google Sheets lead tracking", async (config) => {
    await upsertContact(config, {
      ...input,
      email: input.email.trim().toLowerCase(),
      lastEvent: input.lastEvent || "waitlist_signup",
      status: input.status || "waitlist",
    });
  });
}

export async function trackCheckoutStart({ session, metadata }: CheckoutStartInput) {
  return runSheetWrite("Google Sheets checkout-start tracking", async (config) => {
    await appendRow(config, "Checkout Starts", [
      new Date().toISOString(),
      getSessionId(session),
      metadata.offer_id || "",
      metadata.payment_type || "",
      metadata.amount_due_now || "",
      metadata.balance_due || "",
      clean(session.currency || "gbp").toLowerCase(),
      metadata.source || "website",
      metadata.utm_source || "",
      metadata.utm_medium || "",
      metadata.utm_campaign || "",
      metadata.utm_content || "",
      metadata.utm_term || "",
      metadata.referrer || "",
      metadata.page_url || "",
      session.url || "",
    ]);
  });
}

function paidPreorderRow(session: Stripe.Checkout.Session): CellValue[] {
  const metadata = getMetadata(session);
  const email = clean(session.customer_details?.email).toLowerCase();
  const name = clean(session.customer_details?.name);

  return [
    new Date().toISOString(),
    getSessionId(session),
    clean(session.payment_intent),
    clean(session.customer),
    email,
    name,
    metadata.offer_id || "",
    metadata.payment_type || "",
    clean(session.amount_total || metadata.amount_due_now || ""),
    metadata.balance_due || "",
    clean(session.currency || "gbp").toLowerCase(),
    metadata.source || "website",
    metadata.utm_source || "",
    metadata.utm_medium || "",
    metadata.utm_campaign || "",
    metadata.utm_content || "",
    metadata.utm_term || "",
    metadata.referrer || "",
    metadata.page_url || "",
    session.livemode ? "true" : "false",
  ];
}

export async function trackPaidPreorder({ session }: PaidPreorderInput) {
  return runSheetWrite("Google Sheets paid-preorder tracking", async (config) => {
    const rows = await readRows(
      config,
      "Paid Preorders",
      `A:${columnLetter(PAID_PREORDER_HEADERS.length)}`
    );
    const sessionId = getSessionId(session);
    const rowIndex = rows.findIndex((row, index) => index > 0 && row[1] === sessionId);
    const row = paidPreorderRow(session);

    if (rowIndex >= 0) {
      await updateRow(config, "Paid Preorders", rowIndex + 1, row);
    } else {
      await appendRow(config, "Paid Preorders", row);
    }

    const email = clean(session.customer_details?.email).toLowerCase();

    if (email) {
      const metadata = getMetadata(session);
      await upsertContact(config, {
        email,
        firstName: clean(session.customer_details?.name).split(" ")[0] || email.split("@")[0],
        source: metadata.source || "stripe_checkout",
        status: "buyer",
        attribution: {
          utm_source: metadata.utm_source,
          utm_medium: metadata.utm_medium,
          utm_campaign: metadata.utm_campaign,
          utm_content: metadata.utm_content,
          utm_term: metadata.utm_term,
          referrer: metadata.referrer,
          page_url: metadata.page_url,
        },
        lastEvent: "paid_preorder",
      });
    }
  });
}

function dailyScoreboardRow(input: DailyScoreboardInput): CellValue[] {
  return [
    input.date,
    input.visitors,
    input.checkoutClicks,
    input.checkoutStarts,
    input.checkoutFailures,
    input.successPageViews,
    input.paidPresales,
    input.depositPresales,
    input.fullPresales,
    input.waitlistSignups,
    input.outreachSent,
    input.replies,
    input.topObjections,
    input.nextAction,
  ];
}

export async function writeDailyScoreboardRow(input: DailyScoreboardInput) {
  return runSheetWrite("Google Sheets daily scoreboard write", async (config) => {
    const rows = await readRows(
      config,
      "Daily Scoreboard",
      `A:${columnLetter(DAILY_SCOREBOARD_HEADERS.length)}`
    );
    const rowIndex = rows.findIndex((row, index) => index > 0 && row[0] === input.date);
    const row = dailyScoreboardRow(input);

    if (rowIndex >= 0) {
      await updateRow(config, "Daily Scoreboard", rowIndex + 1, row);
    } else {
      await appendRow(config, "Daily Scoreboard", row);
    }
  });
}

export async function getOutreachPipelineRollup(): Promise<OutreachPipelineRollup> {
  const config = getSheetsConfig();

  if (!config) {
    return { outreachSent: 0, replies: 0, topObjections: "" };
  }

  try {
    const rows = await readRows(
      config,
      "Outreach Pipeline",
      `A:${columnLetter(OUTREACH_PIPELINE_HEADERS.length)}`
    );
    const dataRows = rows.slice(1);
    const sentColumns = [8, 9, 10, 11, 12];
    const objectionCounts = new Map<string, number>();
    let outreachSent = 0;
    let replies = 0;

    dataRows.forEach((row) => {
      if (sentColumns.some((index) => clean(row[index]).trim())) {
        outreachSent += 1;
      }

      if (clean(row[15]).trim()) {
        replies += 1;
      }

      const objection = clean(row[16]).trim();

      if (objection) {
        objectionCounts.set(objection, (objectionCounts.get(objection) || 0) + 1);
      }
    });

    const topObjections = Array.from(objectionCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([objection, count]) => `${objection} (${count})`)
      .join("; ");

    return {
      outreachSent,
      replies,
      topObjections,
    };
  } catch (error) {
    console.error("Google Sheets outreach rollup failed:", error);
    return { outreachSent: 0, replies: 0, topObjections: "" };
  }
}
