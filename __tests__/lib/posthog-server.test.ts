/**
 * @jest-environment node
 */

import { captureServerPostHogEvent } from "@/lib/posthog-server";

describe("PostHog server capture", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_POSTHOG_KEY: "phc_test",
      NEXT_PUBLIC_POSTHOG_HOST: "https://eu.i.posthog.com",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("sends a privacy-safe event to the configured ingest host", async () => {
    const result = await captureServerPostHogEvent({
      event: "presale_purchase_completed",
      distinctId: "anon_123",
      timestamp: "2026-08-09T10:00:00.000Z",
      properties: {
        offer_id: "headphones-deposit",
        payment_type: "deposit",
        amount_paid: 4900,
      },
    });

    expect(result).toEqual({ ok: true });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://eu.i.posthog.com/i/v0/e/",
      expect.objectContaining({ method: "POST" })
    );

    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);

    expect(body).toEqual({
      api_key: "phc_test",
      event: "presale_purchase_completed",
      distinct_id: "anon_123",
      properties: {
        offer_id: "headphones-deposit",
        payment_type: "deposit",
        amount_paid: 4900,
        $process_person_profile: false,
      },
      timestamp: "2026-08-09T10:00:00.000Z",
    });
    expect(JSON.stringify(body)).not.toContain("email");
  });

  test("skips capture when the project token is unavailable", async () => {
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;

    const result = await captureServerPostHogEvent({
      event: "presale_purchase_completed",
      distinctId: "anon_123",
      properties: {},
    });

    expect(result).toEqual({
      ok: false,
      skipped: true,
      error: "PostHog server capture is not configured",
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
