"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Headphones,
  Lock,
  Mail,
  Menu,
  Mic,
  Shield,
  Sparkles,
  X,
  Volume2,
} from "lucide-react";
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
    title: "Capture what matters",
    body: "Turn the moments worth keeping from meetings, lectures, podcasts, and calls into notes you can actually revisit.",
  },
  {
    icon: Shield,
    title: "Privacy-first design",
    body: "Built around on-device processing principles so sensitive listening stays under your control.",
  },
  {
    icon: BatteryCharging,
    title: "Made for long sessions",
    body: "Comfort-led hardware, modern connectivity, and battery goals designed around a full working day.",
  },
];

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
  variant?: "dark" | "light";
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
  const variantClass =
    variant === "dark"
      ? "bg-gray-950 text-white hover:bg-gray-800 focus:ring-gray-950"
      : "bg-white text-gray-950 hover:bg-gray-100 focus:ring-white";

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

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 text-gray-950 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Just Summit home">
            <Image
              src="/just-summit-logo.png"
              alt=""
              width={128}
              height={32}
              className="pointer-events-none h-8 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#product" className="transition hover:text-gray-950">
              Product
            </a>
            <a href="#how-it-works" className="transition hover:text-gray-950">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-gray-950">
              Preorder
            </a>
            <a href="#faq" className="transition hover:text-gray-950">
              FAQ
            </a>
            <Link href="/blog" className="transition hover:text-gray-950">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Preorder
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:border-gray-300 hover:text-gray-950 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav
            id="mobile-site-navigation"
            aria-label="Mobile navigation"
            className="grid gap-1 border-t border-gray-200 py-3 text-sm font-medium text-gray-700 md:hidden"
          >
            <a href="#product" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950">
              Product
            </a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950">
              How it works
            </a>
            <a href="#pricing" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950">
              Preorder
            </a>
            <a href="#faq" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950">
              FAQ
            </a>
            <Link href="/blog" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-gray-100 hover:text-gray-950">
              Blog
            </Link>
          </nav>
        )}
      </div>
    </header>
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
      className={`flex h-full flex-col rounded-lg border p-6 shadow-sm ${
        featured
          ? "border-gray-950 bg-gray-950 text-white"
          : "border-gray-200 bg-white text-gray-950"
      }`}
    >
      <div className="mb-8">
        <p className={`text-sm font-semibold ${featured ? "text-white/70" : "text-teal-700"}`}>
          {isFull ? "Best value" : "Lower commitment"}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{offer.title}</h3>
        <p className={`mt-4 text-sm leading-6 ${featured ? "text-white/70" : "text-gray-600"}`}>
          {isFull
            ? "Secure your first-batch allocation and lock in the lowest full-payment price."
            : "Reserve your place with a smaller payment, then settle the balance before shipping."}
        </p>
      </div>
      <div className="mb-8">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-semibold tracking-tight">
            {formatGBP(offer.amountDueNow)}
          </span>
          <span className={`pb-2 text-sm ${featured ? "text-white/60" : "text-gray-500"}`}>
            today
          </span>
        </div>
        <p className={`mt-3 text-sm ${featured ? "text-white/70" : "text-gray-600"}`}>
          {isFull
            ? "Save £100 vs £349 retail."
            : `${formatGBP(offer.balanceDue)} later. ${formatGBP(offer.fullPrice)} total.`}
        </p>
      </div>
      <ul className="mb-8 space-y-3 text-sm">
        {(isFull
          ? ["Priority shipping allocation", "Price locked at £249", "30-day money-back guarantee"]
          : ["Reserve your place in the queue", `Balance due ${BALANCE_DUE_TIMING}`, "30-day money-back guarantee"]
        ).map((item) => (
          <li key={item} className="flex gap-3">
            <Check
              className={`mt-0.5 h-4 w-4 flex-none ${featured ? "text-emerald-300" : "text-teal-600"}`}
              aria-hidden="true"
            />
            <span className={featured ? "text-white/82" : "text-gray-700"}>{item}</span>
          </li>
        ))}
      </ul>
      <CheckoutButton
        offerId={offerId}
        source={`pricing_${offerId}`}
        testId={`checkout-${offerId}-pricing`}
        variant={featured ? "light" : "dark"}
        className="mt-auto"
      >
        {isFull ? "Preorder for £249" : "Reserve for £49"}
      </CheckoutButton>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-950">
      <SiteHeader />

      <section className="relative flex min-h-[84vh] items-end overflow-hidden bg-gray-950 pt-24 text-white">
        <Image
          src="/hero-headphones-clean.png"
          alt="Just Summit AI Headphones"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-[64%_center] opacity-90 sm:object-center"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/78 to-gray-950/18" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950 via-gray-950/52 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-14 sm:px-6 sm:pb-16 lg:grid-cols-[1fr_0.78fr] lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-sm">
              Presale now open
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              AI headphones that turn listening into recall.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Capture the ideas you hear, turn them into useful notes, and find them again when the moment matters.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton
                offerId="headphones-full"
                source="hero_primary"
                testId="checkout-headphones-full-hero"
                variant="light"
              >
                Preorder for £249
              </CheckoutButton>
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/24 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Reserve with £49
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
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
          <div className="hidden rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur-md lg:block">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-semibold">£249</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/58">Full pay</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">£49</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/58">Deposit</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">Q4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/58">Delivery</p>
              </div>
            </div>
            <p className="mt-5 border-t border-white/12 pt-4 text-sm leading-6 text-white/68">
              Full-payment savings, a lower-entry deposit path, and an estimated Q4 2026 delivery window in one presale decision.
            </p>
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-24 border-b border-gray-100 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Product
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="/headphones-gallery-angle.png"
                  alt="Three-quarter view of the Just Summit headphones"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="pointer-events-none object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="/headphones-gallery-detail.png"
                  alt="Close-up detail of the Just Summit headphones"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
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
          <div className="mt-14 overflow-hidden rounded-lg border border-white/12 bg-black">
            <video
              className="aspect-video w-full object-cover"
              controls
              playsInline
              poster="/headphones-hero.png"
            >
              <source src="/headphones-showcase.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Preorder the first Just Summit AI Headphones.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Choose the full-payment discount or reserve your place with a deposit. Both options include secure Stripe checkout and a 30-day money-back guarantee.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
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

      <section id="specs" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Clear product details. Clear preorder terms.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Before you pay, you should know exactly what you are reserving, what happens next, and what protections come with it.
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

      <section id="story" className="bg-[#eef8f7] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              A serious product for people who cannot afford to lose useful ideas.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Just Summit is for founders, students, researchers, operators, and anyone who learns through listening. The mission is practical: make the knowledge you hear useful again later.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Pricing", "Clear full-pay and deposit options, with the totals stated plainly."],
                ["Updates", "A quieter route for people who want production milestones before ordering."],
                ["Support", "Questions come straight to us. We will help with preorder support, updates, or refunds."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg bg-white p-5 shadow-sm">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-gray-950 p-8 text-white">
            <Headphones className="h-9 w-9 text-teal-300" aria-hidden="true" />
            <p className="mt-10 text-2xl font-semibold leading-snug">
              "The best learning tools should respect attention, memory, and privacy. That is the standard we are building toward."
            </p>
            <p className="mt-6 text-sm text-white/62">Tom, Just Summit founder</p>
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
                  <Sparkles className="h-4 w-4 flex-none text-teal-700 transition group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-4 text-sm leading-6 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="updates" className="bg-gray-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Not ready to preorder?
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Join the updates list for production milestones, availability, and important launch notes.
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

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Image
              src="/just-summit-logo.png"
              alt="Just Summit"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
              AI headphones for people who listen to learn. Patent pending.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-gray-950">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-950">
              Terms
            </Link>
            <Link href="/refunds" className="hover:text-gray-950">
              Refunds
            </Link>
            <a href="mailto:hello@justsummit.co" className="hover:text-gray-950">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
