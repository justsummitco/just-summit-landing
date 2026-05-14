import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Newspaper } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "About Just Summit",
  description:
    "Learn about the Just Summit project, the founder, and the principles behind the AI headphones presale.",
};

const principles = [
  {
    title: "Listening should be active.",
    body: "The best ideas are often spoken once and then gone. Just Summit is being designed to make audio easier to capture, revisit, and use.",
  },
  {
    title: "Privacy is a feature.",
    body: "Sensitive listening should stay under your control. The product direction is built around on-device-first processing principles and careful data handling.",
  },
  {
    title: "Build in public.",
    body: "This is an early hardware project. Backers should know what is finished, what is planned, and what still needs to be proven as the build develops.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header active="about" />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              About Just Summit
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              A small project trying to fix a small frustration that adds up to a big one.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              Just Summit is being built for people who rely on listening to learn, work, and make decisions. The goal is simple: help you keep the valuable things you hear once, then find them again when they matter.
            </p>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:items-start lg:px-8">
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-teal-600" aria-hidden="true" />
              <div className="flex min-h-[320px] flex-col justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Founder's note
                </p>
                <div>
                  <p className="text-2xl font-semibold leading-snug text-gray-950">
                    The aim is not to capture more noise. It is to make the useful parts of what you hear easier to keep.
                  </p>
                  <p className="mt-5 text-sm font-semibold text-gray-600">
                    Tom, founder
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                The story
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                We are building Just Summit because too much useful audio gets lost.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-7 text-gray-700">
                <p>
                  The project started with a simple problem Tom kept running into: useful things disappear from calls, lectures, podcasts, and site meetings the moment the audio ends. Notes help, but only if you already know which parts matter while you are listening.
                </p>
                <p>
                  We are still early, and that matters. The first goal is to prove the hardware and companion app can make capture feel natural, private, and useful before asking the first batch to become a finished product.
                </p>
                <p>
                  Backers can expect a straightforward build from us: clear preorder terms, meaningful production updates, and honest language about what is designed, what is being built, and what still needs to be confirmed.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:hello@justsummit.co"
                  className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Email the team <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Reserve for £49 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-[#fafaf9] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                What we believe
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A few small principles.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.title} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-950">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
                Press & contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Writing about Just Summit?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
                For questions about the presale, company details, or the build timeline, email the team directly. A press kit will be added once product photography and confirmed prototype materials are ready.
              </p>
            </div>
            <a
              href="mailto:press@justsummit.co"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
            >
              press@justsummit.co <Newspaper className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
