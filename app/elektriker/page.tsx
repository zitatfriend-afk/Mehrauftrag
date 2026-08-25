import type { Metadata } from "next";
import { FAQS } from "./_faqs";
import ElektrikerLanding from "./_landing";

export const metadata: Metadata = {
  title: "Website für Elektriker erstellen lassen | Mehr Auftrag",
  description:
    "Website für Elektrobetriebe mit Click-to-Call, Leistungsseiten und Bewertungen. Entwurf vorab kostenlos, danach ein fester Preis. Jetzt anfragen.",
  alternates: { canonical: "https://www.mehrauftrag.de/elektriker" },
  openGraph: {
    title: "Websites für Elektriker in Frankfurt & Rhein-Main",
    description:
      "In 7 Tagen online. Mehr Anfragen. Fester Preis. Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main.",
    url: "https://www.mehrauftrag.de/elektriker",
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
    "@id": "https://www.mehrauftrag.de/elektriker#faq",
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

export default function ElektrikerPage() {
  return (
    <>
      <FaqSchema />
      <ElektrikerLanding />
    </>
  );
}
