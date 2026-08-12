import { PRESALE_OFFERS, PresaleOfferId } from "@/lib/presale";

const attributionParamNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type PresaleAnalyticsProperties = Record<string, string>;

export function getPresaleAnalyticsProperties(
  offerId: PresaleOfferId,
  source: string
): PresaleAnalyticsProperties {
  const properties: PresaleAnalyticsProperties = {
    offer_id: offerId,
    payment_type: PRESALE_OFFERS[offerId].paymentType,
    source,
    placement: "pricing",
  };

  if (typeof window === "undefined") {
    return properties;
  }

  const searchParams = new URLSearchParams(window.location.search);

  properties.page_url = window.location.href;
  properties.page_path = window.location.pathname;
  properties.viewport_category =
    window.innerWidth < 640
      ? "mobile"
      : window.innerWidth < 1024
        ? "tablet"
        : "desktop";

  if (document.referrer) {
    properties.referrer = document.referrer;
  }

  attributionParamNames.forEach((paramName) => {
    const value = searchParams.get(paramName);

    if (value) {
      properties[paramName] = value;
    }
  });

  return properties;
}

export function capturePresaleEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
}

export function getPostHogDistinctId() {
  if (
    typeof window === "undefined" ||
    typeof window.posthog?.get_distinct_id !== "function"
  ) {
    return undefined;
  }

  const distinctId = window.posthog.get_distinct_id();

  return typeof distinctId === "string" && distinctId.trim()
    ? distinctId.trim().slice(0, 200)
    : undefined;
}
