"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Info,
  Lock,
  Mail,
  Mic,
  Shield,
  ShieldCheck,
  Star,
} from "lucide-react";
import Footer from "@/components/Footer";
import FoundingListLink from "@/components/FoundingListLink";
import FoundingListPanel from "@/components/FoundingListPanel";
import Header from "@/components/Header";
import {
  BALANCE_DUE_TIMING,
  PRESALE_OFFERS,
  PresaleOfferId,
  SHIPPING_DATE,
  formatGBP,
} from "@/lib/presale";

const productFeatures = [
  {
    icon: Mic,
    title: "Record a full meeting — or just the moments",
    body: "Capture an entire call, lecture, or podcast when you need the whole thing — or tap to mark a single moment as you listen. Summit is being designed to turn either into searchable notes.",
  },
  {
    icon: Shield,
    title: "Designed for local-first control",
    body: "The target architecture prioritises on-device processing and encrypted app synchronisation so sensitive audio can stay under your control.",
  },
  {
    icon: BatteryCharging,
    title: "Made for a full working day",
    body: "Comfort-led hardware and modern connectivity, designed around how long people actually keep them on.",
  },
];

const roadmapSteps = [
  { label: "Concept", detail: "Problem and product direction defined.", status: "done" },
  { label: "Design", detail: "Industrial design and target experience mapped.", status: "done" },
  { label: "Prototype build", detail: "We are here: turning the design into working hardware.", status: "current" },
  { label: "Testing & tooling", detail: "Refine the hardware, test the experience, and prepare manufacturing.", status: "future" },
  { label: "Target first-batch delivery", detail: `Targeting ${SHIPPING_DATE}, subject to prototype validation, testing and manufacturing.`, status: "future" },
] as const;

const proofPoints = [
  "Prototype-stage hardware",
  "Honest build updates",
  "Unsubscribe at any time",
];

const SUPPORT_EMAIL = "hello@justsummit.co";

const checkoutTrustPoints = [
  {
    icon: Lock,
    title: "Secure checkout powered by Stripe",
    body: "Payment is handled by Stripe. Just Summit does not store card details.",
  },
  {
    icon: CreditCard,
    title: "Apple Pay, Link, or card where available",
    body: "Use the fastest eligible Stripe payment method for your device.",
  },
  {
    icon: Mail,
    title: "Preorder updates sent by email",
    body: "Production milestones, balance reminders, and delivery updates go to your checkout email.",
  },
];

const useCaseLinks = [
  {
    href: "/adhd-meeting-notes",
    label: "ADHD meeting notes",
    body: "ADHD-friendly audio recall for young professionals who need decisions and action items later.",
  },
  {
    href: "/forgot-meeting-action-items",
    label: "Forgot action items?",
    body: "A practical workflow for the meeting details that disappear once the next call starts.",
  },
  {
    href: "/ai-note-taker-for-adhd",
    label: "AI note taker for ADHD",
    body: "What to look for when notes need to support busy brains, privacy, and recall.",
  },
  {
    href: "/ai-headphones",
    label: "AI headphones",
    body: "How Just Summit turns listening hardware into searchable audio recall.",
  },
  {
    href: "/ai-meeting-recorder",
    label: "AI meeting recorder",
    body: "A wearable direction for meeting notes, calls, and useful spoken decisions.",
  },
  {
    href: "/privacy-first-ai-notetaker",
    label: "Privacy-first AI notetaker",
    body: "Why local-first control matters when audio contains sensitive context.",
  },
  {
    href: "/on-device-transcription",
    label: "On-device transcription",
    body: "The battery, thermal, and privacy tradeoffs behind wearable transcription.",
  },
  {
    href: "/ai-headphones-for-meetings",
    label: "AI headphones for meetings",
    body: "Capture the moments worth keeping without leaving the conversation.",
  },
  {
    href: "/neurodivergent-meeting-notes",
    label: "Neurodivergent meeting notes",
    body: "Lower-friction meeting notes for different working styles and sensitive audio.",
  },
];

const attributionParamNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type CheckoutAttribution = Record<string, string>;

function getCheckoutAttribution(source: string): CheckoutAttribution {
  const attribution: CheckoutAttribution = { source };

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

function capturePresaleEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  }
}

const specs = [
  ["AI workflow", "Planned capture, transcription, and structured summaries"],
  ["Privacy", "On-device-first architecture with encrypted app sync planned"],
  ["Connectivity", "Targeting Bluetooth 5.3, USB-C, and 3.5mm compatibility"],
  ["Audio", "Targeting premium drivers and active noise cancellation"],
  ["Companion app", "Planned iOS and Android experience for summaries, search, and recall"],
  ["Delivery", `Targeting first-batch delivery in ${SHIPPING_DATE}, subject to prototype validation, testing and manufacturing`],
];

const faqs = [
  {
    question: "What am I paying for today?",
    answer:
      "Choose either a £49 deposit reservation or a £249 full preorder for Just Summit Headphones. Deposit customers pay the remaining £250 later, with the balance due 60 days before shipping.",
  },
  {
    question: "When will the headphones ship?",
    answer:
      `We are targeting first-batch delivery in ${SHIPPING_DATE}, subject to prototype validation, testing and manufacturing. We will share clear updates as the hardware moves through each milestone.`,
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes. The presale is covered by a 30-day money-back guarantee. Refunds are processed back to the original payment method.",
  },
  {
    question: "When do I pay the remaining balance?",
    answer:
      "Deposit customers pay the remaining £250 60 days before shipping. We will send a clear reminder by email before that payment is requested.",
  },
  {
    question: "What happens after I preorder?",
    answer:
      "Stripe sends your payment receipt, and Just Summit sends preorder updates by email as the hardware moves through prototype, production, and delivery milestones.",
  },
  {
    question: "Can I update my delivery address later?",
    answer:
      `Yes. Email ${SUPPORT_EMAIL} before dispatch if your delivery address changes. We will confirm delivery details before the first batch ships.`,
  },
  {
    question: "Is shipping included?",
    answer:
      "Shipping and any applicable taxes will be confirmed before dispatch. We are not claiming shipping is included at this stage.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. Checkout is handled by Stripe, and Just Summit does not store your card details on its servers.",
  },
  {
    question: "Who do I contact with questions?",
    answer: `Email ${SUPPORT_EMAIL}. Questions about preorder terms, refunds, address changes, or the build timeline come straight to the Just Summit team.`,
  },
  {
    question: "What happens if the hardware timeline changes?",
    answer:
      `Hardware projects can move as prototypes, tooling and testing reveal what needs to change. We are targeting ${SHIPPING_DATE}, subject to validation and manufacturing, and will share meaningful updates by email.`,
  },
];

type CheckoutButtonProps = {
  offerId: PresaleOfferId;
  children: React.ReactNode;
  source: string;
  testId?: string;
  variant?: "dark" | "light" | "outline";
  className?: string;
};

function CheckoutButton({
  offerId,
  children,
  source,
  testId,
  variant = "dark",
  className = "",
}: CheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const startCheckout = async () => {
    setStatus("loading");
    const attribution = getCheckoutAttribution(source);

    capturePresaleEvent("presale_checkout_clicked", {
      offer_id: offerId,
      ...attribution,
    });

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offerId, ...attribution }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout is unavailable");
      }

      capturePresaleEvent("presale_checkout_started", {
        offer_id: offerId,
        ...attribution,
      });

      window.location.assign(data.url);
    } catch (error) {
      console.error("Checkout failed:", error);
      capturePresaleEvent("presale_checkout_failed", {
        offer_id: offerId,
        error_message:
          error instanceof Error ? error.message : "Unknown checkout error",
        ...attribution,
      });
      setStatus("error");
    }
  };

  const baseClass =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70";
  const variantClass = {
    dark: "bg-gray-950 text-white hover:bg-gray-800 focus:ring-gray-950",
    light: "bg-white text-gray-950 hover:bg-gray-100 focus:ring-white",
    outline:
      "border border-gray-300 bg-white text-gray-950 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-950",
  }[variant];

  return (
    <div className={className}>
      <button
        type="button"
        onClick={startCheckout}
        disabled={status === "loading"}
        className={`${baseClass} ${variantClass}`}
        data-testid={testId ?? `checkout-${offerId}`}
      >
        {status === "loading" ? "Opening checkout..." : children}
        {status !== "loading" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
      {status === "error" && (
        <p className="mt-3 max-w-sm text-sm text-red-700" role="alert">
          Checkout is not available right now. Please try again or join the Founding List.
        </p>
      )}
    </div>
  );
}

function CheckoutTrustBlock() {
  return (
    <div className="mt-10 grid gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm sm:grid-cols-3">
      {checkoutTrustPoints.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex gap-3 rounded-md bg-gray-50 p-4">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-teal-50 text-teal-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-5 text-gray-950">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-gray-600">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PriceCard({
  offerId,
  featured = false,
}: {
  offerId: PresaleOfferId;
  featured?: boolean;
}) {
  const offer = PRESALE_OFFERS[offerId];
  const isFull = offerId === "headphones-full";
  const badgeText = isFull ? "Pay once option" : "Recommended reservation";

  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-white p-6 ${
        featured
          ? "border-2 border-gray-950 shadow-lg"
          : "border-gray-200 shadow-sm"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gray-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          {badgeText}
        </span>
      )}

      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-700">
          {isFull ? "Pay in full" : "Reserve with deposit"}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">
          {offer.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {isFull
            ? "Full preorder payment for one Just Summit Headphones unit."
            : `Reserve your early unit with ${formatGBP(offer.amountDueNow)} today. The remaining ${formatGBP(offer.balanceDue)} is due ${BALANCE_DUE_TIMING}.`}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-end gap-2">
          {isFull && (
            <span className="pb-2 text-xl font-semibold text-gray-400 line-through">
              £349
            </span>
          )}
          <span className="text-5xl font-semibold tracking-tight text-gray-950">
            {formatGBP(offer.amountDueNow)}
          </span>
          <span className="pb-2 text-sm text-gray-500">
            {isFull ? "today" : "deposit"}
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {isFull
            ? "One payment. Saves £50 vs the deposit path, £100 vs retail."
            : `${formatGBP(offer.balanceDue)} balance due 60 days before shipping. ${formatGBP(offer.fullPrice)} total.`}
        </p>
      </div>

      <ul className="mb-8 space-y-3 text-sm">
        {(isFull
          ? ["Priority shipping allocation", "Price locked at £249", "30-day money-back guarantee"]
          : ["Reserve your place in the queue", `${formatGBP(offer.balanceDue)} balance due ${BALANCE_DUE_TIMING}`, "30-day money-back guarantee"]
        ).map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 flex-none text-teal-600" aria-hidden="true" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>

      <CheckoutButton
        offerId={offerId}
        source={`pricing_${offerId}`}
        testId={`checkout-${offerId}-pricing`}
        variant={featured ? "dark" : "outline"}
        className="mt-auto"
      >
        {isFull ? "Pay in full £249" : "Reserve for £49"}
      </CheckoutButton>
    </article>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-24 border-b border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
            Where we are
          </h2>
          <p className="hidden text-sm text-gray-500 sm:block">
            Targeting first-batch delivery · {SHIPPING_DATE}
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-5 sm:gap-0">
          {roadmapSteps.map((step, index) => {
            const isDone = step.status === "done";
            const isCurrent = step.status === "current";

            return (
              <li key={step.label} className="relative">
                {index > 0 && (
                  <div
                    className={`absolute left-0 top-5 hidden h-px w-full -translate-x-1/2 sm:block ${
                      isDone || isCurrent ? "bg-gray-950" : "bg-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:block sm:border-0 sm:p-0">
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border text-sm font-semibold ${
                      isDone
                        ? "border-gray-950 bg-gray-950 text-white"
                        : isCurrent
                          ? "border-gray-950 bg-white text-gray-950 ring-4 ring-gray-100"
                          : "border-gray-200 bg-white text-gray-400"
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
                  </div>
                  <div className="sm:mt-4 sm:pr-4">
                    <h3 className="text-sm font-semibold text-gray-950">{step.label}</h3>
                    {isCurrent && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
                        We are here
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-6 text-gray-600">{step.detail}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function SearchIntentSection() {
  return (
    <section className="border-b border-gray-100 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              ADHD-friendly audio recall
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Built for the moment after the meeting ends.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              For young professionals with crowded calendars, missed action
              items and half-remembered decisions are not a character flaw.
              Just Summit is being designed to reduce note-taking friction,
              help you stay present, and make useful spoken context easier to
              find later.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCaseLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:border-teal-200 hover:bg-teal-50"
              >
                <h3 className="font-semibold text-gray-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowThisWorksSection() {
  return (
    <section id="how-this-works" className="scroll-mt-24 border-b border-gray-100 bg-[#fafaf9] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start gap-4">
          <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-amber-100 text-amber-700">
            <Info className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              How this works
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              An honest note about the funding model.
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            [
              "1",
              "This is a crowdfunded build",
              "Just Summit is not a finished product sitting in a warehouse. Your deposit or full payment helps fund the first prototype run and the manufacturing tooling that follows.",
            ],
            [
              "2",
              "Hardware takes time",
              "Building physical products is harder than software. Timelines can move, designs get refined, and we will share honest updates as the project develops.",
            ],
            [
              "3",
              "You can change your mind",
              "Every preorder is covered by the current 30-day money-back guarantee. Checkout is handled by Stripe, and Just Summit does not store card details.",
            ],
          ].map(([step, title, body]) => (
            <div key={step} className="rounded-lg border border-gray-200 bg-white p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                {step}
              </span>
              <h3 className="mt-5 text-base font-semibold text-gray-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm italic leading-6 text-gray-500">
          If you've backed a Kickstarter-style hardware project before, this is the same kind of early support model — run from our own site so we can keep a direct relationship with you as the build progresses.
        </p>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          30 days to change your mind.
        </h2>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Every preorder is processed by Stripe and covered by a 30-day money-back guarantee. Just Summit does not store card details, and approved refunds return to the original payment method.
        </p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          {[
            ["30-day guarantee", "Refund requests are available within 30 days of purchase."],
            ["Secure checkout", "Stripe handles the payment flow and sends the payment receipt."],
            ["Clear updates", "We will share meaningful production and delivery updates by email."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-950">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Presale questions, answered plainly.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The practical questions should be answered before checkout, not after it.
          </p>
        </div>
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {faqs.map((item) => (
            <details key={item.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold">
                {item.question}
                <ChevronDown className="h-4 w-4 flex-none text-teal-700 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-sm leading-6 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section id="team" className="scroll-mt-24 border-y border-gray-100 bg-[#fafaf9] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-[280px_1fr] sm:items-center">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-950 p-6 text-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-teal-500" aria-hidden="true" />
            <div className="flex min-h-[280px] flex-col justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
                Founder's note
              </p>
              <div>
                <p className="text-2xl font-semibold leading-snug">
                  We are building Just Summit from the prototype stage, one careful decision at a time.
                </p>
                <p className="mt-5 text-sm leading-6 text-white/70">
                  We have not shared much yet. The Founding List is where we will start sharing meaningful prototype progress, testing lessons and first-batch decisions.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Behind Just Summit
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              We are building the tool we wanted when useful audio kept disappearing.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-700">
              Just Summit started with a frustration Tom kept running into with audiobooks: he kept replaying the same useful ideas because they disappeared the moment the audio moved on. The same problem showed up in calls, lectures, podcasts, and site meetings. We are turning that frustration into a pair of headphones designed to hold on to the bits worth keeping, whether that is an entire meeting or a single line from something you are listening to.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                About the project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <FoundingListLink
                href="#updates"
                source="home_footer"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white"
              >
                Join the Founding List
              </FoundingListLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-950">
      <Header active="home" variant="fixed" />

      <section className="relative flex min-h-[76vh] items-end overflow-hidden bg-gray-950 pt-24 text-white sm:min-h-[84vh]">
        <Image
          src="/hero-headphones-clean.png"
          alt="Just Summit Headphones concept render"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-[64%_center] opacity-90 sm:object-center"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/78 to-gray-950/18" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950 via-gray-950/52 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-10 sm:px-6 sm:pb-16 lg:grid-cols-[1fr_0.78fr] lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Prototype stage · Founding List open
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Don't lose the best things you only hear once.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Just Summit is building headphones to help busy and ADHD minds keep the ideas, decisions and action items worth remembering. Join the Founding List for honest prototype updates and first access to preorder news.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <FoundingListLink
                href="#founding-list-roadmap"
                source="home_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Join the Founding List <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </FoundingListLink>
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center gap-2 text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                Reserve a pair for £49
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {proofPoints.map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Where we are
            </p>
            <p className="mt-3 text-base font-semibold leading-snug">
               Prototype-stage hardware. Join the Founding List to see the meaningful milestones before launch.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
              {[
                "Working prototype is the next milestone",
                "Local-first privacy is a design priority",
                "Preorders remain available below",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SearchIntentSection />
      <RoadmapSection />
      <section id="founding-list-roadmap" className="scroll-mt-24 border-b border-gray-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FoundingListPanel source="home_roadmap" />
        </div>
      </section>
      <HowThisWorksSection />

      <section id="product" className="scroll-mt-24 border-b border-gray-100 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              The idea
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for busy brains who listen to work.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meetings, podcasts, lectures, and calls are full of details worth keeping. Just Summit is designed to turn spoken fragments into searchable recall, so the useful parts of your workday do not depend on perfect notes in the moment.
            </p>
            <div className="mt-8 grid gap-4">
              {productFeatures.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-50 text-teal-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="/headphones-gallery-hero.png"
                alt="Studio concept render of the Just Summit headphones"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="pointer-events-none object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="/headphones-gallery-angle.png"
                  alt="Angled concept render of the Just Summit headphones"
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  className="pointer-events-none object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="/headphones-gallery-detail.png"
                  alt="Detailed concept render of the Just Summit headphones"
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  className="pointer-events-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-gray-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                From audio to action in three steps.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/70">
                The hardware and companion app are built around one simple promise: make your best listening moments easier to keep, search, and reuse.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Listen", "Use the headphones for focused audio, calls, or learning sessions."],
                ["2", "Capture", "Mark moments and let Summit shape them into structured summaries."],
                ["3", "Recall", "Search your saved insights instead of replaying hours of audio."],
              ].map(([step, title, body]) => (
                <div key={step} className="rounded-lg border border-white/12 bg-white/[0.04] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-semibold text-gray-950">
                    {step}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-lg border border-white/15 bg-black">
            <div className="relative aspect-video w-full">
              <Image
                src="/headphones-gallery-hero.png"
                alt="Just Summit Headphones concept render"
                fill
                sizes="100vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Concept render
                    </p>
                    <p className="mt-4 text-xl font-semibold leading-snug text-white sm:text-2xl">
                      This is what we're designing. The first working prototype is the next milestone, funded by this campaign.
                    </p>
                  </div>
                  <p className="text-sm text-white/60">
                    Subscribe below to be there when it drops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <section id="pricing" className="scroll-mt-24 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Reserve your place in the first batch.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Reserve your early unit with a £49 deposit. The remaining £250 is due 60 days before shipping, or you can pay £249 in full today.
            </p>
          </div>
          <CheckoutTrustBlock />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
            <PriceCard offerId="headphones-deposit" featured />
            <PriceCard offerId="headphones-full" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-teal-700" aria-hidden="true" />
              Secured by Stripe
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal-700" aria-hidden="true" />
              Balance due {BALANCE_DUE_TIMING}
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-teal-700" aria-hidden="true" />
              No card details stored by Just Summit
            </span>
          </div>
        </div>
      </section>

      <GuaranteeSection />

      <section id="specs" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              What we're building
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              The target spec, stated plainly.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These are the goals the first batch is being designed against. Final specifications may move slightly during production — we'll share confirmed numbers as they're locked in.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {specs.map(([label, value]) => (
              <div key={label} className="border-t border-gray-200 pt-5">
                <dt className="text-sm font-semibold text-gray-950">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-gray-600">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <section id="updates" className="bg-gray-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FoundingListPanel
            source="home_footer"
            tone="dark"
            title="Follow the build from here."
            description="Get honest prototype milestones, testing lessons and launch news without pretending the product is further along than it is."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
