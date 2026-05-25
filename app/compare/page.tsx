import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { comparisonPages } from "@/lib/seo-page-data";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Meeting Note Taker Comparisons",
  description:
    "Careful Just Summit comparison guides for Plaud, Otter.ai, Limitless, and Fireflies.ai alternatives.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "AI Meeting Note Taker Comparisons",
    description:
      "Careful Just Summit comparison guides for AI meeting recorders, wearables, and note-taking software.",
    url: "/compare",
    images: [defaultOgImage],
  },
};

export default function CompareIndexPage() {
  const pages = Object.values(comparisonPages);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              Comparison guides
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Compare Just Summit with AI recorders, meeting assistants, and wearable note takers.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              These pages are written for careful buyers. They state where Just Summit is different, where it is still pre-production, and when an available software tool may be the better fit.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {pages.map((page) => (
              <article key={page.slug} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-teal-700">
                  {page.competitor} alternative
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">
                  <Link href={`/compare/${page.slug}`} className="transition hover:text-teal-700">
                    {page.title}
                  </Link>
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">{page.description}</p>
                <Link
                  href={`/compare/${page.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-900"
                >
                  Read comparison
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
