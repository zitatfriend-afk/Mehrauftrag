import type { Metadata } from "next";
import { FAQS } from "./_faqs";
import AnalyseLanding from "./_landing";

export const metadata: Metadata = {
  title: "Kostenlose Website-Analyse für deinen Betrieb | Mehr Auftrag",
  description:
    "Kostenloser Check für deinen Betrieb: Wir prüfen Sichtbarkeit bei Google, Ladezeit und Mobilansicht. Unverbindlich, in 30 Minuten, ohne Vertrag.",
  alternates: { canonical: "https://www.mehrauftrag.de/kostenlose-analyse" },
  openGraph: {
    title: "Kostenlose Website-Analyse für deinen Betrieb",
    description:
      "Potenzial-Check für deinen Betrieb, kostenlos und unverbindlich, in 30 Minuten.",
    url: "https://www.mehrauftrag.de/kostenlose-analyse",
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

// FAQPage-Schema aus denselben Daten, die auch sichtbar auf der Seite stehen
// (siehe _faqs.ts). Vorher hatte diese Seite keine eigene FAQ-Auszeichnung und
// zeigte stattdessen die allgemeine FAQ aus dem Layout, deren Fragen hier gar
// nicht sichtbar waren. Das widersprach Googles Vorgabe und ist damit behoben.
function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.mehrauftrag.de/kostenlose-analyse#faq",
    inLanguage: "de-DE",
    isPartOf: { "@id": "https://www.mehrauftrag.de/#website" },
    about: { "@id": "https://www.mehrauftrag.de/#organization" },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// BreadcrumbList: bis 27.08.2026 hatte diese Seite als eine von vier keine
// Brotkrumen-Auszeichnung. Google zeigt dann den nackten Pfad statt der
// Seitenhierarchie an.
function AnalyseBreadcrumb() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.mehrauftrag.de/kostenlose-analyse#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.mehrauftrag.de" },
      { "@type": "ListItem", position: 2, name: "Kostenlose Analyse", item: "https://www.mehrauftrag.de/kostenlose-analyse" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function KostenloseAnalysePage() {
  return (
    <>
      <FaqSchema />
      <AnalyseBreadcrumb />
      <AnalyseLanding />
    </>
  );
}
