import type { Metadata } from "next";
import GoogleAdsLanding from "./_landing";

export const metadata: Metadata = {
  title: "Google Ads für lokale Unternehmen | Mehr Auftrag",
  description:
    "Sichtbar ab dem ersten Tag, Budget voll steuerbar, Ergebnisse messbar. Für Handwerk, Gastronomie, Praxen und Dienstleister. Jetzt unverbindlich anfragen.",
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

// BreadcrumbList: bis 27.08.2026 war diese Seite die einzige Ausnahme ohne
// Brotkrumen-Auszeichnung. Google zeigt daraufhin den nackten Pfad statt der
// Seitenhierarchie an.
function GoogleAdsBreadcrumb() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.mehrauftrag.de/google-ads#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.mehrauftrag.de" },
      { "@type": "ListItem", position: 2, name: "Google Ads", item: "https://www.mehrauftrag.de/google-ads" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function GoogleAdsPage() {
  return (
    <>
      <GoogleAdsBreadcrumb />
      <GoogleAdsLanding />
    </>
  );
}
