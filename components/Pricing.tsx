"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getSlotData, SlotData } from "@/lib/slots";

// Use a generic CheckIcon for testing purposes, as @heroicons/react might not resolve correctly in Jest
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Generic Image component to mock actual image imports in tests
const MockImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => (
  <img src={src} alt={alt} className={className} />
);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PricingTier {
  name: string;
  price: number;
  value: number;
  discount: number;
  bnplPrice: number;
  features: string[];
  isBestValue?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Genesis 50 Advanced",
    price: 49,
    value: 77.94,
    discount: 37,
    bnplPrice: 12.25,
    features: [
      "6 Months Premium Subscription (£77.94 value)",
      "20% lifetime software discount after free period",
      "🥇 Genesis 50 badge & recognition",
      "Private Slack community access",
      "Direct roadmap influence",
      "Priority beta access",
      "Exclusive Genesis 50 perks",
    ],
  },
  {
    name: "Genesis 50 Pro",
    price: 99,
    value: 155.88,
    discount: 36,
    bnplPrice: 24.75,
    features: [
      "12 Months Premium Subscription (£155.88 value)",
      "20% lifetime software discount after free period",
      "🥇 Genesis 50 badge & recognition",
      "Private Slack community access",
      "Direct roadmap influence",
      "Team collaboration features",
      "Priority support & onboarding",
      "Exclusive Genesis 50 perks",
    ],
    isBestValue: true,
  },
];

const Pricing: React.FC = () => {
  const [slots, setSlots] = useState<SlotData | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      const data = await getSlotData();
      setSlots(data);
    };
    fetchSlots();
  }, []);

  const handleCheckout = async (tierName: string) => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tierName }),
    });

    const session = await response.json();

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    }
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Genesis 50 Early Access Program
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 border-t-4 ${tier.isBestValue ? "border-blue-600" : "border-gray-200"}`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {tier.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {tier.name === "Genesis 50 Advanced"
                  ? "6 months free + 20% lifetime software discount"
                  : "12 months free + 20% lifetime software discount"}
              </p>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">
                    £{tier.price}
                  </span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="line-through">£{tier.value} value</span>
                  <span className="text-green-600 font-semibold ml-2">
                    Save {tier.discount}%
                  </span>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800 font-medium">
                    Or 4 payments of £{tier.bnplPrice}
                  </div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs text-blue-600">with</span>
                    <MockImage
                      src="/klarna-logo.svg"
                      alt="Klarna"
                      className="h-4"
                    />
                    <span className="text-xs text-blue-600">or</span>
                    <MockImage
                      src="/clearpay-logo.svg"
                      alt="Clearpay"
                      className="h-4"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-2">
                  Slots remaining:
                  {tier.name === "Genesis 50 Advanced"
                    ? slots?.advancedRemaining !== undefined
                      ? `${slots.advancedRemaining}/${slots.advancedTotal}`
                      : `0/${slots?.advancedTotal || 25}`
                    : slots?.proRemaining !== undefined
                    ? `${slots.proRemaining}/${slots.proTotal}`
                    : `0/${slots?.proTotal || 25}`}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full transition-all duration-300 bg-red-500"
                    style={{
                      width:
                        tier.name === "Genesis 50 Advanced"
                          ? `${(slots?.advancedRemaining || 0) / (slots?.advancedTotal || 25) * 100}%`
                          : `${(slots?.proRemaining || 0) / (slots?.proTotal || 25) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => {
                  const isKeyFeature =
                    feature.includes("lifetime software discount") ||
                    feature.includes("Genesis 50 badge") ||
                    feature.includes("Private Slack community");

                  let icon = (
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  );

                  if (feature.includes("lifetime software discount")) {
                    icon = (
                      <svg
                        className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    );
                  } else if (feature.includes("Genesis 50 badge")) {
                    icon = (
                      <svg
                        className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    );
                  } else if (feature.includes("Slack community")) {
                    icon = (
                      <svg
                        className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                    );
                  }

                  return (
                    <li key={featureIndex} className="flex items-start">
                      {icon}
                      <span
                        className={`text-gray-700 font-semibold ${isKeyFeature ? "text-blue-800" : ""}`}
                      >
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={() => handleCheckout(tier.name)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Pre-Order Genesis 50
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p className="flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 mr-1 text-green-500" />
                  30-day money-back guarantee
                </p>
                <p className="flex items-center justify-center mt-1">
                  <CheckIcon className="w-4 h-4 mr-1 text-green-500" />
                  Secure payment via Stripe
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

