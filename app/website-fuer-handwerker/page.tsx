import type { Metadata } from "next";
import { FAQS } from "./_faqs";
import HandwerkerLanding from "./_landing";

export const metadata: Metadata = {
  title: "Website für Handwerker erstellen lassen | Mehr Auftrag",
  description:
    "Website für Handwerksbetriebe mit Click-to-Call, Leistungsseiten und echten Bewertungen. In 7 Tagen online, Entwurf vorab kostenlos, danach fester Preis.",
  alternates: { canonical: "https://www.mehrauftrag.de/website-fuer-handwerker" },
  openGraph: {
    title: "Website für Handwerker, die Aufträge bringt",
    description:
      "In 7 Tagen online. Fester Preis ab 250 Euro plus 99 Euro im Monat, monatlich kündbar. Websites für Handwerksbetriebe in ganz Deutschland.",
    url: "https://www.mehrauftrag.de/website-fuer-handwerker",
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

// FAQPage-Schema aus denselben Daten, die auch sichtbar auf der Seite stehen
// (siehe _faqs.ts).
function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.mehrauftrag.de/website-fuer-handwerker#faq",
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

function HandwerkerBreadcrumb() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.mehrauftrag.de/website-fuer-handwerker#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.mehrauftrag.de" },
      { "@type": "ListItem", position: 2, name: "Website für Handwerker", item: "https://www.mehrauftrag.de/website-fuer-handwerker" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HandwerkerPage() {
  return (
    <>
      <FaqSchema />
      <HandwerkerBreadcrumb />
      <HandwerkerLanding />
    </>
  );
}
