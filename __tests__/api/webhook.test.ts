/**
 * @jest-environment node
 */

const mockConstructEvent = jest.fn();
const mockTrackPaidPreorder = jest.fn();

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

jest.mock("@/lib/presales-sheets", () => ({
  trackPaidPreorder: mockTrackPaidPreorder,
}));

const { POST } = require("@/app/api/webhook/route");

function makeRequest(signature: string | null = "sig_test") {
  return {
    text: async () => "{}",
    headers: {
      get: (name: string) => (name === "stripe-signature" ? signature : null),
    },
  } as any;
}

function makeCheckoutSession({
  productType = "headphones",
  offerId = "headphones-full",
  paymentType = "full",
}: {
  productType?: string;
  offerId?: string;
  paymentType?: string;
} = {}) {
  return {
    customer_details: {
      email: "tom@example.com",
      name: "Tom Smith",
    },
    metadata: {
      product_type: productType,
      offer_id: offerId,
      payment_type: paymentType,
    },
  };
}

function makeCheckoutEvent(paymentType: "full" | "deposit") {
  const offerId =
    paymentType === "deposit" ? "headphones-deposit" : "headphones-full";

  return {
    type: "checkout.session.completed",
    data: {
      object: makeCheckoutSession({ offerId, paymentType }),
    },
  };
}

describe("Stripe webhook API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTrackPaidPreorder.mockResolvedValue({
      ok: false,
      skipped: true,
      error: "Google Sheets is not configured",
    });
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

    const contactBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    const emailBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(contactBody).toEqual(
      expect.objectContaining({
        email: "tom@example.com",
        listIds: [8],
        updateEnabled: true,
      })
    );
    expect(contactBody.attributes).toEqual(
      expect.objectContaining({
        FIRSTNAME: "Tom",
        PRODUCT_INTEREST: "Just Summit Headphones",
        PRESALE_CUSTOMER: true,
        PRESALE_OFFER_ID: "headphones-full",
        PRESALE_PAYMENT_TYPE: "full",
        PRESALE_PURCHASE_DATE: expect.any(String),
      })
    );
    expect(emailBody.subject).toBe("Your Just Summit Headphones preorder is confirmed");
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
    expect(mockTrackPaidPreorder).toHaveBeenCalledWith({
      session: expect.objectContaining({
        metadata: expect.objectContaining({
          offer_id: "headphones-full",
          payment_type: "full",
        }),
      }),
    });
  });

  test("sends a separate deposit reservation email", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("deposit"));

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const emailBody = JSON.parse((global.fetch as jest.Mock).mock.calls[1][1].body);

    expect(emailBody.subject).toBe("Your Just Summit Headphones reservation is confirmed");
    expect(emailBody.tags).toEqual(["headphones-presale", "headphones-deposit"]);
    expect(emailBody.textContent).toContain("The remaining");
    expect(emailBody.textContent).toContain("60 days before shipping");
  });

  test("adds preorder buyers to the optional Brevo buyer list", async () => {
    process.env.BREVO_BUYER_LIST_ID = "14";
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("deposit"));

    const response = await POST(makeRequest());

    expect(response.status).toBe(200);

    const contactBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);

    expect(contactBody.listIds).toEqual([8, 14]);
  });

  test("rejects invalid Stripe webhook signatures", async () => {
    mockConstructEvent.mockImplementationOnce(() => {
      throw new Error("Invalid signature");
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest("bad_sig"));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Webhook signature verification failed");
    expect(global.fetch).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test("rejects requests without a Stripe signature", async () => {
    const response = await POST(makeRequest(null));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Missing Stripe signature");
    expect(mockConstructEvent).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("ignores non-checkout webhook events", async () => {
    mockConstructEvent.mockReturnValueOnce({
      type: "payment_intent.succeeded",
      data: { object: {} },
    });

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("ignores checkout sessions that are not for headphones", async () => {
    mockConstructEvent.mockReturnValueOnce({
      type: "checkout.session.completed",
      data: {
        object: makeCheckoutSession({
          productType: "software",
          offerId: "headphones-full",
          paymentType: "full",
        }),
      },
    });

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("ignores headphones sessions with unknown offer IDs", async () => {
    mockConstructEvent.mockReturnValueOnce({
      type: "checkout.session.completed",
      data: {
        object: makeCheckoutSession({
          offerId: "headphones-pro",
          paymentType: "full",
        }),
      },
    });

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
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

  test("does not fail the webhook when presales sheet tracking fails", async () => {
    mockConstructEvent.mockReturnValueOnce(makeCheckoutEvent("full"));
    mockTrackPaidPreorder.mockResolvedValueOnce({
      ok: false,
      error: "Sheets API failed",
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.received).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Google Sheets paid-preorder tracking failed:",
      "Sheets API failed"
    );
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
