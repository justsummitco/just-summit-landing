import type { Metadata } from "next";
import type { BlogPost } from "@/lib/mdx";
import {
  HEADPHONES_PRODUCT_NAME,
  PRESALE_OFFERS,
  SHIPPING_DATE,
} from "@/lib/presale";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.justsummit.co";

export const supportEmail = "hello@justsummit.co";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}

export const defaultOgImage = {
  url: "/hero-headphones-clean.png",
  width: 1672,
  height: 941,
  alt: HEADPHONES_PRODUCT_NAME,
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "Just Summit",
      images: [defaultOgImage],
      locale: "en_GB",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export function noindexMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Just Summit",
    legalName: "Just Summit Ltd",
    url: siteUrl,
    logo: absoluteUrl("/just-summit-logo.png"),
    email: supportEmail,
    identifier: "Company no. 15449136",
    description:
      "Just Summit is building privacy-first AI headphones for meeting notes, lectures, calls, podcasts, and searchable audio recall.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer support",
      email: supportEmail,
      availableLanguage: ["en-GB"],
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Just Summit",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "Just Summit Ltd",
    },
    description:
      "Privacy-first AI headphones and wearable audio recall guidance from Just Summit.",
  };
}

export function productJsonLd(): Record<string, unknown> {
  const fullOffer = PRESALE_OFFERS["headphones-full"];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: HEADPHONES_PRODUCT_NAME,
    brand: {
      "@type": "Brand",
      name: "Just Summit",
    },
    image: [
      absoluteUrl("/hero-headphones-clean.png"),
      absoluteUrl("/headphones-gallery-hero.png"),
    ],
    description:
      "Privacy-first AI headphones being built to capture, summarise, and search the useful things you hear in meetings, calls, lectures, and podcasts.",
    category: "AI headphones",
    offers: {
      "@type": "Offer",
      name: "Just Summit Headphones Preorder",
      url: absoluteUrl("/#pricing"),
      price: (fullOffer.amountDueNow / 100).toString(),
      priceCurrency: "GBP",
      availability: "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Just Summit Ltd",
      },
      description: `Full preorder payment for one Just Summit Headphones unit. Estimated first-batch delivery window: ${SHIPPING_DATE}.`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Reservation option",
        value:
          "Reserve with a £49 deposit; remaining £250 due 60 days before shipping.",
      },
      {
        "@type": "PropertyValue",
        name: "Estimated delivery",
        value: SHIPPING_DATE,
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(
  post: BlogPost,
  path: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl("/hero-headphones-clean.png"),
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: "Just Summit",
    },
    publisher: {
      "@type": "Organization",
      name: "Just Summit",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/just-summit-logo.png"),
      },
    },
  };
}
