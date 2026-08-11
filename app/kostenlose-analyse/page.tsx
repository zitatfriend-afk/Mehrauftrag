import type { Metadata } from "next";
import { FAQS } from "./_faqs";
import AnalyseLanding from "./_landing";

export const metadata: Metadata = {
  title: "Kostenlose Website-Analyse für Elektriker | Mehr Auftrag",
  description:
    "Kostenloser Potenzial-Check für Ihren Elektrobetrieb: Wir prüfen Ihre Sichtbarkeit bei Google, Performance und Mobile-Tauglichkeit – unverbindlich und in 30 Minuten.",
  alternates: { canonical: "https://www.mehrauftrag.de/kostenlose-analyse" },
  openGraph: {
    title: "Kostenlose Website-Analyse für Elektriker",
    description:
      "Potenzial-Check für Ihren Elektrobetrieb – kostenlos & unverbindlich, in 30 Minuten.",
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

export default function KostenloseAnalysePage() {
  return (
    <>
      <FaqSchema />
      <AnalyseLanding />
    </>
  );
}
