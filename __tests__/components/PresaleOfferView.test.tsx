import React from "react";
import { act, render } from "@testing-library/react";
import PresaleOfferView from "@/components/PresaleOfferView";

describe("PresaleOfferView", () => {
  let callback: IntersectionObserverCallback;
  const disconnect = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    window.posthog = { capture: jest.fn() };

    class TestIntersectionObserver {
      constructor(observerCallback: IntersectionObserverCallback) {
        callback = observerCallback;
      }

      observe = jest.fn();
      disconnect = disconnect;
      unobserve = jest.fn();
      takeRecords = jest.fn(() => []);
      root = null;
      rootMargin = "0px";
      thresholds = [0.5];
    }

    global.IntersectionObserver = TestIntersectionObserver as any;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("records an offer once after it remains at least half visible for 750ms", () => {
    const { container } = render(
      <PresaleOfferView
        offerId="headphones-deposit"
        source="pricing_headphones-deposit"
        className="card"
      >
        Deposit
      </PresaleOfferView>
    );
    const card = container.querySelector("article")!;

    act(() => {
      callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 0.5,
            target: card,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
      jest.advanceTimersByTime(749);
    });

    expect(window.posthog?.capture).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(window.posthog?.capture).toHaveBeenCalledTimes(1);
    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "presale_offer_viewed",
      expect.objectContaining({
        offer_id: "headphones-deposit",
        payment_type: "deposit",
        source: "pricing_headphones-deposit",
        placement: "pricing",
      })
    );
    expect(disconnect).toHaveBeenCalled();

    act(() => {
      callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: card,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
      jest.advanceTimersByTime(1000);
    });

    expect(window.posthog?.capture).toHaveBeenCalledTimes(1);
  });
});
