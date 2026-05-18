"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function capturePostHogEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  }
}

export default function PresaleSuccessTracker() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    capturePostHogEvent("presale_success_page_viewed", {
      has_session_id: Boolean(sessionId),
      session_id_prefix: sessionId ? sessionId.slice(0, 12) : undefined,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
    });
  }, [sessionId]);

  return null;
}
