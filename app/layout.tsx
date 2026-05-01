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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kido.health";
const pageTitle = "Kido Health - Turn Family Observations Into Clinical Signals";
const pageDescription =
  "Kido helps families capture daily pediatric health observations and turns them into structured insights care teams can act on.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: siteUrl,
    siteName: "Kido Health",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kido Health preview card",
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
