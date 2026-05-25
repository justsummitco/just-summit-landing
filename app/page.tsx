import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import JsonLd from "@/components/JsonLd";
import {
  defaultOgImage,
  faqPageJsonLd,
  organizationJsonLd,
  productJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

const pageDescription =
  "Reserve Just Summit Headphones for £49. ADHD-friendly audio recall for busy workdays, private meeting notes, and searchable action items.";

export const metadata: Metadata = {
  title: "Just Summit Headphones | ADHD-Friendly Audio Recall",
  description: pageDescription,
  keywords: [
    "ADHD meeting notes",
    "meeting notes for ADHD",
    "AI note taker for ADHD",
    "forgot meeting action items",
    "AI meeting recorder",
    "AI voice recorder",
    "AI headphones",
    "private AI transcription",
    "AI note taker for in-person meetings",
    "transcription headphones",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Just Summit Headphones | ADHD-Friendly Audio Recall",
    description: pageDescription,
    url: siteUrl,
    siteName: "Just Summit",
    images: [defaultOgImage],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Summit Headphones | ADHD-Friendly Audio Recall",
    description: pageDescription,
    images: [defaultOgImage.url],
  },
};

const homepageFaqs = [
  {
    question: "What am I paying for today?",
    answer:
      "Choose either a full Just Summit Headphones preorder or a deposit reservation. Deposit customers pay the remaining balance 60 days before shipping.",
  },
  {
    question: "When will the headphones ship?",
    answer:
      "The current estimated first-batch delivery window is Q4 2026. Just Summit will share production updates as the hardware moves through prototype, testing, tooling, and delivery milestones.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Checkout is handled by Stripe, and Just Summit does not store complete card details on its servers.",
  },
  {
    question: "Is the product finished?",
    answer:
      "No. Just Summit Headphones are in presale. The hardware, companion app, and privacy-first capture workflow are being built and final specifications may change before shipment.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          productJsonLd(),
          faqPageJsonLd(homepageFaqs),
        ]}
      />
      <HomePageClient />
    </>
  );
}
