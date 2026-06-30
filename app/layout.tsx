import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "./_components/cookie-consent";

// Google Analytics 4 – Measurement-ID
const GA_MEASUREMENT_ID = "G-7ZLRDEFHNB";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehrauftrag.de"),
  title: "MehrAuftrag – Die Digitalagentur die liefert",
  description:
    "Mehr Aufträge, mehr Umsatz, mehr Wachstum. MehrAuftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen die online wachsen wollen.",
  openGraph: {
    title: "MehrAuftrag – Die Digitalagentur die liefert",
    description:
      "Mehr Aufträge, mehr Umsatz, mehr Wachstum. Maßgeschneiderte Websites und Marketing für Handwerk, Gastronomie, Physiotherapie und alle Branchen.",
    url: "https://www.mehrauftrag.de",
    siteName: "MehrAuftrag",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MehrAuftrag – Die Digitalagentur die liefert",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MehrAuftrag – Die Digitalagentur die liefert",
    description:
      "Mehr Aufträge, mehr Umsatz, mehr Wachstum. Maßgeschneiderte Websites und Marketing für alle Branchen.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#04081c]">
        {/* Google Consent Mode v2 – Standard: alles "denied" (keine Cookies/kein
            Tracking ohne Einwilligung). Das Cookie-Banner schaltet bei Zustimmung
            per gtag('consent','update', …) auf "granted". */}
        <Script id="ga-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('js', new Date());
          `}
        </Script>
        <Script
          id="ga-lib"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
        </Script>

        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
