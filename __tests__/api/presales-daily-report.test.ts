/**
 * @jest-environment node
 */

const mockSessionsList = jest.fn();
const mockGetOutreachPipelineRollup = jest.fn();
const mockWriteDailyScoreboardRow = jest.fn();

jest.mock("stripe", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          list: mockSessionsList,
        },
      },
    })),
  };
});

jest.mock("@/lib/presales-sheets", () => ({
  getOutreachPipelineRollup: mockGetOutreachPipelineRollup,
  writeDailyScoreboardRow: mockWriteDailyScoreboardRow,
}));

const { GET } = require("@/app/api/cron/presales-daily-report/route");

function makeRequest({
  authorization = "Bearer cron_test",
  date = "2026-05-18",
}: {
  authorization?: string | null;
  date?: string;
} = {}) {
  return {
    headers: {
      get: (name: string) => (name === "authorization" ? authorization : null),
    },
    nextUrl: new URL(
      `https://www.justsummit.co/api/cron/presales-daily-report?date=${date}`
    ),
  } as any;
}

describe("presales daily report cron API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      CRON_SECRET: "cron_test",
      POSTHOG_PROJECT_ID: "123",
      POSTHOG_PERSONAL_API_KEY: "ph_test",
      NEXT_PUBLIC_POSTHOG_HOST: "https://app.posthog.com",
      STRIPE_SECRET_KEY: "sk_live_test",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          ["$pageview", 8, 5],
          ["presale_checkout_clicked", 4, 3],
          ["presale_checkout_started", 2, 2],
          ["presale_checkout_failed", 1, 1],
          ["presale_success_page_viewed", 1, 1],
          ["headphones_waitlist_signup", 3, 3],
        ],
      }),
    });
    mockSessionsList.mockResolvedValue({
      has_more: false,
      data: [
        {
          id: "cs_deposit",
          payment_status: "paid",
          metadata: {
            product_type: "headphones",
            offer_id: "headphones-deposit",
          },
        },
        {
          id: "cs_other",
          payment_status: "paid",
          metadata: {
            product_type: "software",
            offer_id: "headphones-full",
          },
        },
      ],
    });
    mockGetOutreachPipelineRollup.mockResolvedValue({
      outreachSent: 12,
      replies: 4,
      topObjections: "too early (2)",
    });
    mockWriteDailyScoreboardRow.mockResolvedValue({ ok: true });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("rejects requests without the cron secret", async () => {
    const response = await GET(makeRequest({ authorization: "Bearer wrong" }));
    const json = await response.json();

    expect(response.status).toBe(401);
    expect(json.error).toBe("Unauthorized");
    expect(mockWriteDailyScoreboardRow).not.toHaveBeenCalled();
  });

  test("writes a daily presales scoreboard row", async () => {
    const response = await GET(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(mockSessionsList).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 100,
        created: expect.objectContaining({
          gte: expect.any(Number),
          lt: expect.any(Number),
        }),
      })
    );
    expect(mockWriteDailyScoreboardRow).toHaveBeenCalledWith({
      date: "2026-05-18",
      visitors: 5,
      checkoutClicks: 4,
      checkoutStarts: 2,
      checkoutFailures: 1,
      successPageViews: 1,
      paidPresales: 1,
      depositPresales: 1,
      fullPresales: 0,
      waitlistSignups: 3,
      outreachSent: 12,
      replies: 4,
      topObjections: "too early (2)",
      nextAction: "Send founder-led outreach and follow up active replies.",
    });
  });

  test("uses the private PostHog API host when the public EU ingest host is configured", async () => {
    process.env.NEXT_PUBLIC_POSTHOG_HOST = "https://eu.i.posthog.com";
    delete process.env.POSTHOG_API_HOST;

    await GET(makeRequest());

    expect(global.fetch).toHaveBeenCalledWith(
      "https://eu.posthog.com/api/projects/123/query/",
      expect.any(Object)
    );
  });

  test("returns a clear error when the daily sheet write fails", async () => {
    mockWriteDailyScoreboardRow.mockResolvedValueOnce({
      ok: false,
      error: "Google Sheets is not configured",
    });

    const response = await GET(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Unable to write daily presales report");
    expect(json.detail).toBe("Google Sheets is not configured");
  });
});
