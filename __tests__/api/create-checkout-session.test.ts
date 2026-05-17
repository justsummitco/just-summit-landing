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

const StripeMock = require("stripe").default;
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
    expect(StripeMock).toHaveBeenCalledWith("sk_test_123");
    expect(mockCheckoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [{ price: "price_full", quantity: 1 }],
        success_url:
          "https://www.justsummit.co/headphones-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://www.justsummit.co/headphones-cancel",
        billing_address_collection: "required",
        customer_creation: "always",
        metadata: expect.objectContaining({
          product_type: "headphones",
          product_name: "Just Summit AI Headphones",
          offer_id: "headphones-full",
          payment_type: "full",
          amount_due_now: "24900",
          full_price: "24900",
          balance_due: "0",
          balance_due_timing: "60 days pre-ship",
          shipping_date: "Q4 2026",
          source: "test",
        }),
        payment_intent_data: {
          metadata: expect.objectContaining({
            product_type: "headphones",
            offer_id: "headphones-full",
            payment_type: "full",
            amount_due_now: "24900",
            full_price: "24900",
            balance_due: "0",
          }),
        },
      })
    );
  });

  test("creates a deposit checkout session with balance metadata", async () => {
    mockCheckoutCreate.mockResolvedValueOnce({
      url: "https://checkout.stripe.com/deposit-session",
    });

    const response = await POST(makeRequest({ offerId: "headphones-deposit" }));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.url).toBe("https://checkout.stripe.com/deposit-session");
    expect(mockCheckoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: "price_deposit", quantity: 1 }],
        customer_creation: "always",
        metadata: expect.objectContaining({
          product_type: "headphones",
          offer_id: "headphones-deposit",
          payment_type: "deposit",
          amount_due_now: "4900",
          full_price: "29900",
          balance_due: "25000",
          balance_due_timing: "60 days pre-ship",
          shipping_date: "Q4 2026",
          source: "website",
        }),
        payment_intent_data: {
          metadata: expect.objectContaining({
            offer_id: "headphones-deposit",
            payment_type: "deposit",
            amount_due_now: "4900",
            full_price: "29900",
            balance_due: "25000",
          }),
        },
      })
    );
  });

  test("returns an error when Stripe is not configured", async () => {
    delete process.env.STRIPE_SECRET_KEY;

    const response = await POST(makeRequest({ offerId: "headphones-full" }));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Stripe is not configured");
    expect(mockCheckoutCreate).not.toHaveBeenCalled();
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

  test("returns an error when the configured Stripe price is invalid", async () => {
    process.env.STRIPE_HEADPHONES_FULL_PRICE_ID = "prod_123";

    const response = await POST(makeRequest({ offerId: "headphones-full" }));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Stripe price is invalid");
    expect(mockCheckoutCreate).not.toHaveBeenCalled();
  });

  test("returns an error when Stripe does not return a Checkout URL", async () => {
    mockCheckoutCreate.mockResolvedValueOnce({});

    const response = await POST(makeRequest({ offerId: "headphones-full" }));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Checkout session did not return a URL");
  });
});
