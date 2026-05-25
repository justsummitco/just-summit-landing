import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { ComparisonPageContent } from "@/lib/seo-page-data";

function CtaBand() {
  return (
    <section className="bg-gray-950 py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
            Presale open
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Reserve Just Summit Headphones for £49.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
            The remaining £250 is due 60 days before shipping. Secure checkout
            is powered by Stripe, and the first-batch delivery estimate is Q4
            2026.
          </p>
        </div>
        <Link
          href="/#pricing"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
        >
          Reserve for £49 <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function SeoComparisonPage({
  page,
}: {
  page: ComparisonPageContent;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              Comparison guide
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {page.intro}
            </p>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Best fit
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Who should consider Just Summit?
              </h2>
            </div>
            <div className="grid gap-3">
              {page.bestFor.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-teal-700"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-[#fafaf9] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Just Summit vs {page.competitor}
            </h2>
            <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[0.7fr_1fr_1fr] bg-gray-950 text-sm font-semibold text-white">
                  <div className="p-4">Area</div>
                  <div className="p-4">Just Summit</div>
                  <div className="p-4">{page.competitor}</div>
                </div>
                {page.comparisonRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[0.7fr_1fr_1fr] border-t border-gray-200 text-sm"
                  >
                    <div className="bg-gray-50 p-4 font-semibold text-gray-950">
                      {row.label}
                    </div>
                    <div className="p-4 leading-6 text-gray-700">
                      {row.justSummit}
                    </div>
                    <div className="p-4 leading-6 text-gray-700">
                      {row.competitor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Important caveats
            </h2>
            <ul className="mt-6 grid gap-3">
              {page.caveats.map((caveat) => (
                <li
                  key={caveat}
                  className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-teal-700"
                    aria-hidden="true"
                  />
                  {caveat}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
