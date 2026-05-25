import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justsummit.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Just Summit Headphones | ADHD-Friendly Audio Recall",
    template: "%s | Just Summit",
  },
  description:
    "Reserve Just Summit Headphones for £49. ADHD-friendly audio recall for busy workdays, private meeting notes, and searchable action items.",
  keywords:
    "ADHD meeting notes, meeting notes for ADHD, AI note taker for ADHD, AI meeting recorder, AI headphones, private AI transcription, Just Summit Headphones",
  authors: [{ name: "Just Summit" }],
  creator: "Just Summit",
  publisher: "Just Summit",
  icons: {
    icon: [
      { url: "/Summit-Icon.svg", type: "image/svg+xml" },
      { url: "/Summit-800.png", sizes: "800x800", type: "image/png" },
    ],
    apple: [{ url: "/Summit-800.png", sizes: "800x800", type: "image/png" }],
  },
  openGraph: {
    title: "Just Summit Headphones | ADHD-Friendly Audio Recall",
    description:
      "ADHD-friendly audio recall for busy workdays, meeting notes, voice recall, and searchable action items.",
    url: siteUrl,
    siteName: "Just Summit",
    images: [
      {
        url: "/hero-headphones-clean.png",
        width: 1672,
        height: 941,
        alt: "Just Summit Headphones",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Summit Headphones | ADHD-Friendly Audio Recall",
    description:
      "Reserve for £49 with secure Stripe checkout. Estimated first-batch delivery Q4 2026.",
    images: ["/hero-headphones-clean.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
        {posthogKey && (
          <Script id="posthog" strategy="afterInteractive">
            {`
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);var n=t;if("undefined"!=typeof e)try{n=t[e]}catch(t){}return n}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${posthogKey}', { api_host: '${posthogHost}', capture_pageview: true });
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
