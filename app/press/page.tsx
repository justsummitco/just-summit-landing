import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { SHIPPING_DATE } from "@/lib/presale";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Just Summit Press",
  description:
    "Press information for Just Summit Headphones, the privacy-first AI headphones project for audio recall and meeting notes.",
  path: "/press",
  keywords: [
    "Just Summit press",
    "AI headphones press",
    "privacy-first AI hardware",
  ],
});

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Press", path: "/press" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              Press
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Just Summit Headphones press information.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              Just Summit is building privacy-first AI headphones for people
              who want to keep useful audio from meetings, calls, lectures, and
              podcasts.
            </p>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              ["Company", "Just Summit Ltd, registered in England under company number 15449136."],
              ["Product status", "Just Summit Headphones are in presale and development, with first-batch delivery currently estimated for " + SHIPPING_DATE + "."],
              ["Product direction", "Privacy-first AI headphones for capture, summarisation, and searchable audio recall."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#fafaf9] py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Press contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                For questions, quotes, and product background.
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-700">
                Product photography, prototype imagery, and press materials
                will be added when the relevant assets are confirmed for public
                use.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-gray-950">
                Contact the team
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                For media enquiries, use the dedicated press address. For
                preorder support, use hello@justsummit.co.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:press@justsummit.co"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  press@justsummit.co <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/build-log"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-50"
                >
                  View build log
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
