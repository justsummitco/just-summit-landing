import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Just Summit | Auto‑Tagged Notes for Instant Knowledge Recall',
  description: 'Capture every insight. Just Summit auto‑tags your notes by interest so you can recall knowledge in seconds. Join the Genesis 50 early‑access program.',
  keywords: 'AI, note taking, knowledge management, auto-tagging, instant recall, Genesis 50, early access',
  authors: [{ name: 'Just Summit' }],
  creator: 'Just Summit',
  publisher: 'Just Summit',
  icons: {
    icon: [
      { url: '/Summit-Icon.svg', type: 'image/svg+xml' },
      { url: '/Summit-800.png', sizes: '800x800', type: 'image/png' },
    ],
    apple: [
      { url: '/Summit-800.png', sizes: '800x800', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Just Summit | Auto‑Tagged Notes for Instant Knowledge Recall',
    description: 'Capture every insight. Just Summit auto‑tags your notes by interest so you can recall knowledge in seconds. Join the Genesis 50 early‑access program.',
    url: 'https://justsummit.co',
    siteName: 'Just Summit',
    images: [
      {
        url: '/Summit-1920.png',
        width: 1920,
        height: 1080,
        alt: 'Just Summit - Auto‑Tagged Notes for Instant Knowledge Recall',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Just Summit | Auto‑Tagged Notes for Instant Knowledge Recall',
    description: 'Capture every insight. Just Summit auto‑tags your notes by interest so you can recall knowledge in seconds. Join the Genesis 50 early‑access program.',
    images: ['/Summit-1920.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* PostHog Analytics - Add your PostHog snippet here */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);var n=t;if("undefined"!=typeof e)try{n=t[e]}catch(t){}return n}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'}'} )
              `,
            }}
          />
        )}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
