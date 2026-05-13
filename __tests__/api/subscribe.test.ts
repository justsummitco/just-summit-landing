/**
 * @jest-environment node
 */

import { POST } from "@/app/api/subscribe/route";

function makeRequest(body: unknown) {
  return {
    json: async () => body,
  } as any;
}

describe("subscribe API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = {
      ...originalEnv,
      BREVO_API_KEY: "brevo_test",
      BREVO_WAITLIST_LIST_ID: "12",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ id: 123 }),
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("validates email addresses", async () => {
    const response = await POST(makeRequest({ email: "not-an-email" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Enter a valid email address");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("sends headphone lead attributes to Brevo", async () => {
    const response = await POST(
      makeRequest({
        email: "Tom@Example.com",
        name: "Tom",
        source: "test_source",
      })
    );

    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "https://api.brevo.com/v3/contacts",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "tom@example.com",
          attributes: {
            FIRSTNAME: "Tom",
            PRODUCT_INTEREST: "Just Summit AI Headphones",
            LEAD_SOURCE: "test_source",
            PRESALE_INTEREST: true,
          },
          listIds: [12],
          updateEnabled: true,
        }),
      })
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
      })
    );

    const emailBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(emailBody.subject).toBe("You're on the Summit Headphones list");
    expect(emailBody.to).toEqual([
      {
        email: "tom@example.com",
        name: "Tom",
      },
    ]);
    expect(emailBody.sender).toEqual({
      name: "Tom at Just Summit",
      email: "hello@justsummit.co",
    });
    expect(emailBody.replyTo).toEqual({
      name: "Tom at Just Summit",
      email: "hello@justsummit.co",
    });
    expect(emailBody.tags).toEqual(["headphones-waitlist", "welcome"]);
    expect(emailBody.textContent).toContain("Preorders are open");
    expect(emailBody.textContent).toContain(
      "If you would rather not receive these updates"
    );
  });

  test("still captures the lead if the welcome email fails", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ id: 123 }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest({ email: "tom@example.com" }));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  test("fails clearly when Brevo is not configured", async () => {
    delete process.env.BREVO_API_KEY;

    const response = await POST(makeRequest({ email: "tom@example.com" }));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Email service is not configured");
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
