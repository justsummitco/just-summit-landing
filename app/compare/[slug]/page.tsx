import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoComparisonPage from "@/components/SeoComparisonPage";
import { comparisonPages } from "@/lib/seo-page-data";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";

type ComparePageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(comparisonPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ComparePageProps): Metadata {
  const page = comparisonPages[params.slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/compare/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/compare/${page.slug}`,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [defaultOgImage.url],
    },
  };
}

export default function ComparePage({ params }: ComparePageProps) {
  const page = comparisonPages[params.slug];

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: page.title, path: `/compare/${page.slug}` },
        ])}
      />
      <SeoComparisonPage page={page} />
    </>
  );
}
