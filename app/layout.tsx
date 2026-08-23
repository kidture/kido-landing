import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getMetadataBaseUrl(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = "https://kidture.health";

  if (!rawSiteUrl) {
    return new URL(fallback);
  }

  // Vercel env values are sometimes set as bare domains; normalize them.
  const withProtocol = /^https?:\/\//i.test(rawSiteUrl)
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;

  try {
    return new URL(withProtocol);
  } catch {
    return new URL(fallback);
  }
}

const metadataBaseUrl = getMetadataBaseUrl();
const siteUrl = metadataBaseUrl.toString().replace(/\/$/, "");
const pageTitle = "Kidture - Turn Family Observations Into Clinical Signals";
const pageDescription =
  "Kidture helps families capture daily pediatric health observations and turns them into structured insights care teams can act on.";

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: [
      { url: "/kido-logo.png?v=2", type: "image/png" },
      { url: "/kido-logo.png?v=2", rel: "shortcut icon", type: "image/png" },
    ],
    apple: [{ url: "/kido-logo.png?v=2", type: "image/png" }],
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: siteUrl,
    siteName: "Kidture",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kidture preview card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
