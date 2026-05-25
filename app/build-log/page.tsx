import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { SHIPPING_DATE } from "@/lib/presale";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Just Summit Build Log",
  description:
    "Follow Just Summit Headphones prototype progress, first-batch decisions, privacy-first design choices, and presale production updates.",
  path: "/build-log",
  keywords: [
    "Just Summit build log",
    "AI headphones prototype",
    "wearable AI hardware",
    "privacy-first headphones",
  ],
});

const milestones = [
  {
    label: "Concept defined",
    status: "Complete",
    detail:
      "Problem, user workflow, privacy-first direction, and first-batch presale model defined.",
  },
  {
    label: "Industrial design direction",
    status: "Complete",
    detail:
      "Initial headphone concept renders and target user experience mapped for the presale page.",
  },
  {
    label: "Prototype build",
    status: "Current",
    detail:
      "Hardware and app assumptions are being turned into a working prototype path.",
  },
  {
    label: "Testing and tooling",
    status: "Next",
    detail:
      "Battery, thermal, capture, connectivity, storage, and app workflows need practical validation before final production claims are locked.",
  },
  {
    label: "First batch delivery",
    status: "Estimated",
    detail: `Current estimated delivery window: ${SHIPPING_DATE}.`,
  },
];

export default function BuildLogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Build Log", path: "/build-log" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              Build log
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              The Just Summit build, stated as plainly as possible.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              This page separates what is already decided from what is still
              being tested. It will be the public home for prototype progress,
              production decisions, and meaningful first-batch updates.
            </p>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Current roadmap
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What is complete, current, and still to be proven.
              </h2>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-2">
              {milestones.map((milestone) => (
                <li
                  key={milestone.label}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-teal-50 text-teal-700">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                        {milestone.status}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-gray-950">
                        {milestone.label}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {milestone.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#fafaf9] py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Update principles
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What backers should expect from updates.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Clear distinction between planned features and confirmed specifications.",
                "Practical updates on prototype, testing, tooling, and production readiness.",
                "Plain updates on how audio, summaries, storage, and sync are handled.",
                "No unnecessary cloud dependency added for marketing convenience.",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-gray-200 bg-white p-5">
                  <p className="text-sm leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Follow the build by email.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Production updates, prototype notes, and preorder milestones go
                to the Just Summit updates list.
              </p>
            </div>
            <Link
              href="/#updates"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
            >
              Get updates <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
