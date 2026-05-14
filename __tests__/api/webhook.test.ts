/**
 * @jest-environment node
 */

const mockConstructEvent = jest.fn();

jest.mock("stripe", () => {
  const StripeMock = jest.fn().mockImplementation(() => ({
      webhooks: {
        constructEvent: mockConstructEvent,
      },
    }));

  return {
    __esModule: true,
    default: StripeMock,
    Stripe: StripeMock,
  };
});

const { POST } = require("@/app/api/webhook/route");

function makeRequest(signature = "sig_test") {
  return {
    text: async () => "{}",
    headers: {
      get: (name: string) => (name === "stripe-signature" ? signature : null),
    },
  } as any;
}

function makeCheckoutEvent(paymentType: "full" | "deposit") {
  const offerId =
    paymentType === "deposit" ? "headphones-deposit" : "headphones-full";

  return {
    type: "checkout.session.completed",
    data: {
      object: {
        customer_details: {
          email: "tom@example.com",
          name: "Tom Smith",
        },
        metadata: {
          product_type: "headphones",
          offer_id: offerId,
          payment_type: paymentType,
        },
      },
    },
  };
}

describe("Stripe webhook API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      STRIPE_SECRET_KEY: "sk_test_123",
      STRIPE_WEBHOOK_SECRET: "whsec_test",
      BREVO_API_KEY: "brevo_test",
      BREVO_WAITLIST_LIST_ID: "8",
      BREVO_SENDER_NAME: "Tom at Just Summit",
      BREVO_SENDER_EMAIL: "hello@justsummit.co",
      BREVO_REPLY_TO_EMAIL: "hello@justsummit.co",
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("sends a full-payment preorder confirmation email", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("full"));

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const emailBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(emailBody.subject).toBe("Your Summit Headphones preorder is confirmed");
    expect(emailBody.sender).toEqual({
      name: "Tom at Just Summit",
      email: "hello@justsummit.co",
    });
    expect(emailBody.replyTo).toEqual({
      name: "Tom at Just Summit",
      email: "hello@justsummit.co",
    });
    expect(emailBody.tags).toEqual(["headphones-presale", "headphones-full"]);
    expect(emailBody.textContent).toContain("You paid");
    expect(emailBody.textContent).toContain("Stripe will send your payment receipt");
  });

  test("sends a separate deposit reservation email", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("deposit"));

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const emailBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(emailBody.subject).toBe("Your Summit Headphones reservation is confirmed");
    expect(emailBody.tags).toEqual(["headphones-presale", "headphones-deposit"]);
    expect(emailBody.textContent).toContain("The remaining");
    expect(emailBody.textContent).toContain("60 days pre-ship");
  });

  test("does not fail the webhook if the transactional email fails", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("full"));
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => "",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  test("still sends the preorder email if Brevo contact sync fails", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("full"));
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
        ok: false,
        status: 400,
        text: async () => "List sync failed",
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ messageId: "message_123" }),
      });
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
      })
    );
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
