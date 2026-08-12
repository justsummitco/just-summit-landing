"use client";

import { useEffect, useRef } from "react";
import {
  capturePresaleEvent,
  getPresaleAnalyticsProperties,
} from "@/lib/presale-analytics";
import { PresaleOfferId } from "@/lib/presale";

const REQUIRED_VISIBLE_RATIO = 0.5;
const REQUIRED_VISIBLE_DURATION_MS = 750;

type PresaleOfferViewProps = {
  offerId: PresaleOfferId;
  source: string;
  className: string;
  children: React.ReactNode;
};

export default function PresaleOfferView({
  offerId,
  source,
  className,
  children,
}: PresaleOfferViewProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const capturedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || typeof IntersectionObserver === "undefined") {
      return;
    }

    let visibleTimer: ReturnType<typeof setTimeout> | undefined;
    const clearVisibleTimer = () => {
      if (visibleTimer) {
        clearTimeout(visibleTimer);
        visibleTimer = undefined;
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isSufficientlyVisible =
          entry.isIntersecting && entry.intersectionRatio >= REQUIRED_VISIBLE_RATIO;

        if (!isSufficientlyVisible || capturedRef.current) {
          clearVisibleTimer();
          return;
        }

        if (!visibleTimer) {
          visibleTimer = setTimeout(() => {
            if (capturedRef.current) {
              return;
            }

            capturedRef.current = true;
            capturePresaleEvent(
              "presale_offer_viewed",
              getPresaleAnalyticsProperties(offerId, source)
            );
            observer.disconnect();
          }, REQUIRED_VISIBLE_DURATION_MS);
        }
      },
      { threshold: REQUIRED_VISIBLE_RATIO }
    );

    observer.observe(card);

    return () => {
      clearVisibleTimer();
      observer.disconnect();
    };
  }, [offerId, source]);

  return (
    <article ref={cardRef} className={className} data-offer-id={offerId}>
      {children}
    </article>
  );
}
