import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";
import FoundingListForm from "@/components/FoundingListForm";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Join the Founding List",
  description:
    "Follow the Just Summit Headphones build from prototype to first batch, with honest progress updates and first access to launch news.",
  alternates: {
    canonical: "/founding-list",
  },
};

const benefits = [
  "Honest prototype and testing updates",
  "Invitations to suitable early feedback opportunities",
  "First access to meaningful preorder and launch news",
];

export default function FoundingListPage() {
  return (
    <>
      <Header
        foundingListHref="#founding-list-form"
        foundingListSource="founding_list_page"
      />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-gray-950 py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
                Prototype stage · Founding List open
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                See Just Summit take shape.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
                We are building headphones to make useful spoken ideas, decisions and action items easier to keep. Join the Founding List to follow the meaningful milestones from prototype to first batch.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-teal-300" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="founding-list-form"
              className="scroll-mt-24 rounded-xl border border-white/15 bg-white/[0.06] p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold">Join the Founding List</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Occasional, useful updates from the team. No daily launch noise.
              </p>
              <div className="mt-7">
                <FoundingListForm source="founding_list_page" tone="dark" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Prefer to reserve now?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              The £49 reservation is still available.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              The hardware is at prototype stage. If you are comfortable backing it early, you can review the deposit and full-payment options before checkout.
            </p>
            <Link
              href="/#pricing"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
            >
              View reservation options
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
