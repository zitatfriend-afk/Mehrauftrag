import type { Metadata } from "next";
import GoogleAdsLanding from "./_landing";

export const metadata: Metadata = {
  title: "Google Ads für lokale Unternehmen | Mehr Auftrag",
  description:
    "Mit Google Ads erscheinen Sie genau dann, wenn Kunden nach Ihrer Leistung suchen. Sichtbar ab dem ersten Tag, Budget voll steuerbar, Ergebnisse messbar. Für Handwerk, Gastronomie, Praxen, Dienstleister und Handel.",
  alternates: { canonical: "https://www.mehrauftrag.de/google-ads" },
  openGraph: {
    title: "Google Ads für lokale Unternehmen",
    description:
      "Sichtbar genau dann, wenn Kunden nach Ihrer Leistung suchen. Budget steuerbar, Ergebnisse messbar. Für praktisch jede Branche.",
    url: "https://www.mehrauftrag.de/google-ads",
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

export default function GoogleAdsPage() {
  return <GoogleAdsLanding />;
}
