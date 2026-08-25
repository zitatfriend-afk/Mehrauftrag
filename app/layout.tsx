import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "./_components/cookie-consent";
import StructuredData from "./_components/structured-data";
import StandorteLeiste from "./_components/standorte-leiste";

// Google Analytics 4 – Measurement-ID
const GA_MEASUREMENT_ID = "G-7ZLRDEFHNB";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehrauftrag.de"),
  alternates: { canonical: "/" },
  title: "Webdesign & SEO Agentur für kleine Betriebe | Mehr Auftrag",
  description:
    "Websites und lokale Suchmaschinenoptimierung für Handwerk, Gastronomie und Dienstleister. Entwurf vorab kostenlos, danach fester Preis. Jetzt anfragen.",
  openGraph: {
    title: "Webdesign & SEO Agentur für kleine Betriebe",
    description:
      "Websites und lokale Suchmaschinenoptimierung für Handwerk, Gastronomie und Dienstleister. Vorab ein kostenloser Entwurf, danach ein fester Preis.",
    url: "https://www.mehrauftrag.de",
    siteName: "Mehr Auftrag",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mehr Auftrag, Webdesign und SEO für kleine Betriebe",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webdesign & SEO Agentur für kleine Betriebe",
    description:
      "Websites und lokale Suchmaschinenoptimierung für kleine Betriebe. Entwurf vorab kostenlos.",
    images: ["/og-image.jpg"],
  },
  verification: {
    other: {
      "msvalidate.01": "A1839E1E4F43C847DC5B392E11117774",
    },
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#04081c]">
        <StructuredData />
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
        {/* Ein einziger Link auf den Standort-Hub, dafuer auf jeder Seite.
            Siehe Kommentar in _components/standorte-leiste.tsx. */}
        <StandorteLeiste />
        <CookieConsent />
      </body>
    </html>
  );
}
