import "./globals.css";

import Script from "next/script";
import { LocationProvider } from "@/context/LocationContext";
import { CohortProvider } from "@/context/CohortContext";

import { Inter, PT_Sans_Narrow } from "next/font/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ptsans = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ptsans",
  display: "swap",
});

export const metadata = {
  title: "AI Stakeholder Challenge | From Passive AI Awareness to AI Leader",
  description:
    "A 7-day community based engagement for leaders who want to move from passive AI awareness to active, deliberate AI leadership.",

  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/aisc_favicon.svg",
    apple: "/aisc-192.png",
  },

  openGraph: {
    title: "AISC | From Passive AI Awareness to AI Leader",
    description:
      "A 7-day community based engagement for leaders who want to move from passive AI awareness to active, deliberate AI leadership.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "AI Stakeholder Challenge",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AISC | From Passive AI Awareness to AI Leader",
    description:
      "A 7-day community based engagement for leaders who want to move from passive AI awareness to active, deliberate AI leadership",
  },
};

export const viewport = {
  themeColor: "#010579",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Michael Steve Clarity Studio",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              description:
                "A 7-day community based engagement for leaders who want to move from passive AI awareness to active, deliberate AI leadership.",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${ptsans.variable} antialiased ms-scrollbar`}
      >
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <LocationProvider>
          <CohortProvider>{children}</CohortProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
