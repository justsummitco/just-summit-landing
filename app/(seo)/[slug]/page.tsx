import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getSeoPage, seoPages, type SeoPage } from "@/lib/seo-pages";
import { buildMetadata, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

type SeoLandingPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: SeoLandingPageProps): Metadata {
  const page = getSeoPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return buildMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [
      page.primaryKeyword,
      "Just Summit Headphones",
      "private AI transcription",
      "searchable audio recall",
    ],
  });
}

export default function SeoLandingPage({ params }: SeoLandingPageProps) {
  const page = getSeoPage(params.slug);

  if (!page) {
    notFound();
  }

  const relatedPages = page.relatedSlugs
    ? page.relatedSlugs
        .map((slug) => getSeoPage(slug))
        .filter((related): related is SeoPage => Boolean(related))
    : seoPages.filter((related) => related.slug !== page.slug).slice(0, 8);
  const path = `/${page.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.eyebrow, path },
          ]),
          faqPageJsonLd(page.faqs),
        ]}
      />
      <Header />
      <main className="min-h-screen bg-white text-gray-950">
        <section className="border-b border-gray-100 bg-gray-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                {page.intro}
              </p>
              {page.disclaimer && (
                <p className="mt-5 max-w-3xl rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm leading-6 text-white/68">
                  {page.disclaimer}
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#pricing"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
                >
                  Reserve for £49
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Read the audio recall guides
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-300 text-gray-950">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-5 text-base font-semibold leading-7">
                Privacy-first, local-first product direction for sensitive
                listening workflows.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/72">
                {page.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 flex-none text-teal-300"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold tracking-tight text-gray-950">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-gray-100 bg-[#fafaf9] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Frequently asked
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Common questions, answered plainly.
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-700">
                Straight answers about how Just Summit is being built, what the
                presale covers, and what buyers can expect as the first batch
                moves forward.
              </p>
            </div>
            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group p-6">
                  <summary className="cursor-pointer list-none font-semibold text-gray-950">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Explore related guides
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  More ways to think about private audio recall.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-900"
              >
                View all posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedPages.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:border-teal-200 hover:bg-teal-50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                    {related.eyebrow}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-gray-950">
                    {related.h1}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
