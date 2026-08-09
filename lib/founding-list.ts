export const FOUNDING_LIST_SOURCES = [
  "home_header",
  "home_hero",
  "home_roadmap",
  "home_footer",
  "founding_list_page",
  "blog_index",
  "blog_article",
] as const;

export type FoundingListSource = (typeof FOUNDING_LIST_SOURCES)[number];

const attributionParamNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type FoundingListAttribution = Record<string, string>;

export function getFoundingListAttribution(
  source: FoundingListSource
): FoundingListAttribution {
  const attribution: FoundingListAttribution = { source };

  if (typeof window === "undefined") {
    return attribution;
  }

  const searchParams = new URLSearchParams(window.location.search);

  attribution.page_url = window.location.href;

  if (document.referrer) {
    attribution.referrer = document.referrer;
  }

  attributionParamNames.forEach((paramName) => {
    const value = searchParams.get(paramName);

    if (value) {
      attribution[paramName] = value;
    }
  });

  return attribution;
}

export function captureFoundingListEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
}

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}
