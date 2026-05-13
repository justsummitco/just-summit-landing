/**
 * @jest-environment node
 */

const mockCheckoutCreate = jest.fn();

jest.mock("stripe", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: mockCheckoutCreate,
        },
      },
    })),
  };
});

const { POST } = require("@/app/api/create-checkout-session/route");

function makeRequest(body: unknown) {
  return {
    json: async () => body,
    nextUrl: {
      origin: "https://www.justsummit.co",
    },
  } as any;
}

describe("create checkout session API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      STRIPE_SECRET_KEY: "sk_test_123",
      STRIPE_HEADPHONES_FULL_PRICE_ID: "price_full",
      STRIPE_HEADPHONES_DEPOSIT_PRICE_ID: "price_deposit",
      NEXT_PUBLIC_SITE_URL: "https://www.justsummit.co",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("creates a full-payment checkout session", async () => {
    mockCheckoutCreate.mockResolvedValueOnce({
      url: "https://checkout.stripe.com/session",
    });

    const response = await POST(
      makeRequest({ offerId: "headphones-full", source: "test" })
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.url).toBe("https://checkout.stripe.com/session");
    expect(mockCheckoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: "price_full", quantity: 1 }],
        success_url:
          "https://www.justsummit.co/headphones-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://www.justsummit.co/headphones-cancel",
        metadata: expect.objectContaining({
          product_type: "headphones",
          offer_id: "headphones-full",
          payment_type: "full",
          amount_due_now: "24900",
          source: "test",
        }),
      })
    );
  });

  test("rejects invalid offer IDs", async () => {
    const response = await POST(makeRequest({ offerId: "software" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid presale offer");
    expect(mockCheckoutCreate).not.toHaveBeenCalled();
  });

  test("returns an error when the configured Stripe price is missing", async () => {
    delete process.env.STRIPE_HEADPHONES_DEPOSIT_PRICE_ID;

    const response = await POST(makeRequest({ offerId: "headphones-deposit" }));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Stripe price is not configured");
    expect(mockCheckoutCreate).not.toHaveBeenCalled();
  });
});
