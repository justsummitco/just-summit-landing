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

  test("still sends the welcome email when Brevo reports an existing contact", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () =>
          JSON.stringify({
            code: "duplicate_parameter",
            message: "Contact already exists",
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ messageId: "message_123" }),
      });

    const response = await POST(makeRequest({ email: "tom@example.com" }));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  test("retries contact capture with minimal attributes before sending email", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () =>
          JSON.stringify({
            code: "invalid_parameter",
            message: "Unknown contact attribute",
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ id: 123 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ messageId: "message_123" }),
      });
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const response = await POST(
      makeRequest({
        email: "tom@example.com",
        name: "Tom",
        source: "test_source",
      })
    );

    const retryBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(retryBody.attributes).toEqual({
      FIRSTNAME: "Tom",
    });
    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
      })
    );
    consoleSpy.mockRestore();
  });

  test("can send the welcome email even when list sync is not configured", async () => {
    delete process.env.BREVO_WAITLIST_LIST_ID;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify({ messageId: "message_123" }),
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest({ email: "tom@example.com" }));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
      })
    );
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
