import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

function getMetadataBaseUrl(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const fallback = 'https://kidture.health'

  if (!rawSiteUrl) {
    return new URL(fallback)
  }

  const withProtocol = /^https?:\/\//i.test(rawSiteUrl)
    ? rawSiteUrl
    : `https://${rawSiteUrl}`

  try {
    return new URL(withProtocol)
  } catch {
    return new URL(fallback)
  }
}

const metadataBaseUrl = getMetadataBaseUrl()
const siteUrl = metadataBaseUrl.toString().replace(/\/$/, '')
const pageTitle = 'Kidture - Turn Family Observations Into Clinical Signals'
const pageDescription =
  "Kidture helps families capture daily pediatric health observations and turns them into structured insights care teams can act on."

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: siteUrl,
    siteName: 'Kidture',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kidture preview card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-kt-cream text-kt-ink">
        {/*
          THESIS: Replace purple SaaS marketing with Kidture's cream/charcoal/teal
          product world so the site and app read as one brand.
          OWN-WORLD: Cream canvas, charcoal bands, teal accent, identity chip hues
          for people; soft lift shadows; 16px radius; no purple chrome.
          STORY: Parents see that daily observations become clinical signal, then join waitlist.
          FIRST VIEWPORT: Full-bleed care image, Kidture wordmark, one headline, one line, teal CTA.
          FORM: Pinned to kido-expo constants/kidture.ts (major-ui-revamp).
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        {children}
      </body>
    </html>
  )
}
