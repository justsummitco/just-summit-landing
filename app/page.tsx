"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
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
    title: "Private by default",
    body: "We're building around on-device processing principles, so sensitive listening stays under your control.",
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
  { label: "First batch ships", detail: `Estimated first-batch delivery: ${SHIPPING_DATE}.`, status: "future" },
] as const;

const proofPoints = [
  "30-day money-back guarantee",
  "Secure checkout via Stripe",
  `Estimated delivery ${SHIPPING_DATE}`,
];

const specs = [
  ["AI workflow", "Planned capture, transcription, and structured summaries"],
  ["Privacy", "On-device-first architecture with encrypted app sync planned"],
  ["Connectivity", "Targeting Bluetooth 5.3, USB-C, and 3.5mm compatibility"],
  ["Audio", "Targeting premium drivers and active noise cancellation"],
  ["Companion app", "Planned iOS and Android experience for summaries, search, and recall"],
  ["Delivery", `Estimated first-batch delivery window: ${SHIPPING_DATE}`],
];

const faqs = [
  {
    question: "What am I paying for today?",
    answer:
      "Choose either the full £249 preorder or a £49 deposit. Deposit customers pay the remaining £250 later, with the balance due 60 days before shipping.",
  },
  {
    question: "What happens if the hardware timeline changes?",
    answer:
      "Hardware projects can move as prototypes, tooling, and testing reveal what needs to change. We will share meaningful updates by email, and the current first-batch delivery estimate is Q4 2026.",
  },
  {
    question: "When will the headphones ship?",
    answer:
      `Estimated first-batch delivery window: ${SHIPPING_DATE}. We will share clear updates as the hardware moves through production milestones.`,
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes. The presale is covered by a 30-day money-back guarantee. Refunds are processed back to the original payment method.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. Checkout is handled by Stripe, and Just Summit does not store your card details on its servers.",
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

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offerId, source }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout is unavailable");
      }

      if (typeof window !== "undefined" && (window as any).posthog) {
        (window as any).posthog.capture("presale_checkout_started", {
          offer_id: offerId,
          source,
        });
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("Checkout failed:", error);
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
          Checkout is not available right now. Please try again or join the updates list.
        </p>
      )}
    </div>
  );
}

function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          source: "homepage_waitlist",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to join the updates list");
      }

      if (typeof window !== "undefined" && (window as any).posthog) {
        (window as any).posthog.capture("headphones_waitlist_signup", {
          source: "homepage_waitlist",
        });
      }

      setStatus("success");
      setMessage(data.message || "You're on the Just Summit updates list.");
      setName("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to join the updates list"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="waitlist-form">
      <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr_auto]">
        <label className="sr-only" htmlFor="waitlist-name">
          First name
        </label>
        <input
          id="waitlist-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="First name"
          className="min-h-12 rounded-md border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/60 outline-none transition focus:border-white focus:bg-white/15"
          disabled={status === "loading"}
        />
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="min-h-12 rounded-md border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/60 outline-none transition focus:border-white focus:bg-white/15"
          required
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "loading"}
          data-testid="waitlist-submit"
        >
          {status === "loading" ? "Joining..." : "Get updates"}
          <Mail className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {status !== "idle" && (
        <p
          className={`text-sm ${status === "error" ? "text-red-200" : "text-emerald-200"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </form>
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

  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-white p-6 ${
        featured
          ? "border-2 border-gray-950 shadow-lg"
          : "border-gray-200 shadow-sm"
      }`}
    >
      {featured && isFull && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gray-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          Best value for first batch
        </span>
      )}

      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-700">
          {isFull ? "Save £100 vs retail" : "Reserve with deposit"}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">
          {offer.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {isFull
            ? "Secure your first-batch allocation and lock in the lowest full-payment price."
            : "Reserve your place with a smaller payment, then settle the balance before shipping."}
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
          <span className="pb-2 text-sm text-gray-500">today</span>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {isFull
            ? "One payment. Saves £50 vs the deposit path, £100 vs retail."
            : "£250 balance due 60 days before shipping. £299 total."}
        </p>
      </div>

      <ul className="mb-8 space-y-3 text-sm">
        {(isFull
          ? ["Priority shipping allocation", "Price locked at £249", "30-day money-back guarantee"]
          : ["Reserve your place in the queue", `Balance due ${BALANCE_DUE_TIMING}`, "30-day money-back guarantee"]
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
        {isFull ? "Preorder for £249" : "Reserve for £49"}
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
            Estimated first-batch delivery · {SHIPPING_DATE}
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
                  We are sharing the build as it happens, with the prototype work and first-batch decisions out in the open.
                </p>
                <p className="mt-5 text-sm leading-6 text-white/70">
                  Prototype progress, production calls, and first-batch decisions will be shared plainly as we move.
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
              Just Summit started with a frustration Tom kept running into on long calls, lectures, and site meetings: useful information vanished the moment the audio ended. We are turning that frustration into a pair of headphones designed to hold on to the bits worth keeping, whether that is an entire meeting or a single one-line idea.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                About the project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#updates"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white"
              >
                Follow the build
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGalleryPlaceholder({
  type,
}: {
  type: "founder" | "app";
}) {
  const isFounder = type === "founder";

  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-dashed p-5 ${
        isFounder
          ? "border-teal-200 bg-teal-50"
          : "border-sky-200 bg-sky-50"
      }`}
    >
      <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        <span>{isFounder ? "Founder sketch" : "App sketch"}</span>
        <span>soon</span>
      </div>

      {isFounder ? (
        <svg
          viewBox="0 0 220 150"
          className="h-36 w-full max-w-[220px] text-gray-950"
          aria-hidden="true"
        >
          <path d="M44 118c18-18 42-26 66-26s48 8 66 26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="110" cy="55" r="25" fill="white" stroke="currentColor" strokeWidth="4" />
          <path d="M92 51h.1M128 51h.1" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M98 66c8 8 17 8 25 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M82 55c0-26 56-26 56 0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M76 58v18M144 58v18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M110 82v31M86 101l-28 20M134 101l28 20M98 113l-8 24M122 113l8 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M55 25c12-11 27-16 43-16" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
          <path d="M159 28c-11-9-24-14-39-15" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 220 150"
          className="h-36 w-full max-w-[220px] text-gray-950"
          aria-hidden="true"
        >
          <rect x="70" y="14" width="80" height="122" rx="16" fill="white" stroke="currentColor" strokeWidth="4" />
          <path d="M94 29h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="86" y="44" width="48" height="10" rx="5" fill="#ccfbf1" />
          <rect x="86" y="64" width="48" height="10" rx="5" fill="#e0f2fe" />
          <rect x="86" y="84" width="36" height="10" rx="5" fill="#fef3c7" />
          <path d="M90 111h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M41 39c9-10 20-15 34-15M179 112c-9 10-20 15-34 15" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 55h18M151 95h18" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      <p className="absolute inset-x-5 bottom-4 text-center text-xs font-semibold text-gray-600">
        {isFounder ? "Real photo coming soon." : "Real app preview coming soon."}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-950">
      <Header active="home" variant="fixed" />

      <section className="relative flex min-h-[84vh] items-end overflow-hidden bg-gray-950 pt-24 text-white">
        <Image
          src="/hero-headphones-clean.png"
          alt="Just Summit AI Headphones concept render"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-[64%_center] opacity-90 sm:object-center"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/78 to-gray-950/18" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950 via-gray-950/52 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-14 sm:px-6 sm:pb-16 lg:grid-cols-[1fr_0.78fr] lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Founding edition · Presale open
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              Don't lose the best things you only hear once.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Just Summit is a pair of headphones being built to help you save the ideas worth keeping — from meetings, calls, lectures, podcasts — and find them again later.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton
                offerId="headphones-deposit"
                source="hero_primary"
                testId="checkout-headphones-deposit-hero"
                variant="light"
              >
                Reserve your place — £49 deposit
              </CheckoutButton>
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center gap-2 text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                Or pay £249 in full and save £100
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
              An early-stage presale. The hardware is being built. You are reserving a place in the first batch.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
              {[
                "30-day money-back guarantee",
                "No card details held by Just Summit",
                "Updates as production progresses",
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

      <RoadmapSection />
      <HowThisWorksSection />

      <section id="product" className="scroll-mt-24 border-b border-gray-100 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              The idea
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for people who listen to learn.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meetings, podcasts, lectures, and calls are full of ideas worth keeping. Just Summit is designed to turn those fragments into searchable memory.
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
                alt="Studio product view of the Just Summit headphones"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="pointer-events-none object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProductGalleryPlaceholder type="founder" />
              <ProductGalleryPlaceholder type="app" />
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
                alt="Just Summit AI Headphones concept render"
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

      <section id="pricing" className="scroll-mt-24 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Reserve your place in the first batch.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Pay in full to secure priority shipping and lock in the lowest total price. The lower-commitment deposit is still available if you prefer to reserve your place first.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
            <PriceCard offerId="headphones-full" featured />
            <PriceCard offerId="headphones-deposit" />
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

      <FounderSection />

      <section id="updates" className="bg-gray-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Follow the build.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Production milestones, prototype updates, and launch dates — straight to your inbox. Useful even if you never preorder.
              </p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/[0.05] p-6">
              <WaitlistForm />
              <p className="mt-4 text-xs leading-5 text-white/46">
                We will only use your email for Just Summit updates. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
