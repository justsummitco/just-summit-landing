export type PresaleOfferId = "headphones-full" | "headphones-deposit";

export type PresaleOffer = {
  id: PresaleOfferId;
  title: string;
  shortTitle: string;
  paymentType: "full" | "deposit";
  amountDueNow: number;
  fullPrice: number;
  balanceDue: number;
  priceEnvVar: "STRIPE_HEADPHONES_FULL_PRICE_ID" | "STRIPE_HEADPHONES_DEPOSIT_PRICE_ID";
};

export const HEADPHONES_PRODUCT_NAME = "Just Summit AI Headphones";
export const SHIPPING_DATE = "Q4 2026";
export const BALANCE_DUE_TIMING = "60 days pre-ship";

export const PRESALE_OFFERS: Record<PresaleOfferId, PresaleOffer> = {
  "headphones-full": {
    id: "headphones-full",
    title: "Full Payment - Priority Shipping",
    shortTitle: "Full payment",
    paymentType: "full",
    amountDueNow: 24900,
    fullPrice: 24900,
    balanceDue: 0,
    priceEnvVar: "STRIPE_HEADPHONES_FULL_PRICE_ID",
  },
  "headphones-deposit": {
    id: "headphones-deposit",
    title: "Reserve with Deposit",
    shortTitle: "Deposit",
    paymentType: "deposit",
    amountDueNow: 4900,
    fullPrice: 29900,
    balanceDue: 25000,
    priceEnvVar: "STRIPE_HEADPHONES_DEPOSIT_PRICE_ID",
  },
};

export function isPresaleOfferId(value: unknown): value is PresaleOfferId {
  return value === "headphones-full" || value === "headphones-deposit";
}

export function formatGBP(pence: number): string {
  return `£${(pence / 100).toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
