import type { Metadata } from "next";
import GrafikdesignLanding from "./_landing";

export const metadata: Metadata = {
  title: "Grafikdesign Frankfurt | Logo, Flyer & Werbetechnik | Mehr Auftrag",
  description:
    "Grafikdesign aus Frankfurt und Rhein-Main mit eigenem Grafikteam. Visitenkarten, Flyer, Logo Design, Autoaufkleber, Fahrzeugbeschriftung und Werbetechnik, individuell gestaltet und auf Wunsch mit Druck.",
  alternates: { canonical: "https://www.mehrauftrag.de/grafikdesign" },
  openGraph: {
    title: "Grafikdesign Frankfurt | Logo, Flyer & Werbetechnik",
    description:
      "Eigenes Grafikteam für Frankfurt und Rhein-Main. Visitenkarten, Flyer, Logo Design, Autoaufkleber und Fahrzeugbeschriftung, individuell gestaltet und auf Wunsch mit Druck.",
    url: "https://www.mehrauftrag.de/grafikdesign",
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

// JSON-LD: Service + FAQPage + BreadcrumbList
function GrafikdesignSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/grafikdesign#service",
        name: "Grafikdesign & Werbetechnik",
        serviceType: "Grafikdesign",
        description:
          "Individuelles Grafikdesign aus eigenem Grafikteam: Visitenkarten, Flyer, Falzflyer, Werbeflyer, Broschüren, Plakate, Speisekarten, Briefpapier, Geschäftsausstattung, Firmenschilder, Logo Design, Corporate Design, Social Media Grafiken, Autoaufkleber, Fahrzeugbeschriftung, Schaufensterbeschriftung, Roll-ups, Banner, Aufkleber sowie Druckdaten-Erstellung und Druckservice.",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: [
          { "@type": "City", name: "Frankfurt am Main" },
          { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" },
          { "@type": "Country", name: "Deutschland" },
        ],
        url: "https://www.mehrauftrag.de/grafikdesign",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Grafikdesign Leistungen",
          itemListElement: [
            "Visitenkarten gestalten",
            "Flyer gestalten",
            "Falzflyer",
            "Werbeflyer",
            "Broschüren",
            "Plakate",
            "Speisekarten",
            "Briefpapier",
            "Geschäftsausstattung",
            "Firmenschilder",
            "Logo Design",
            "Corporate Design",
            "Social Media Grafiken",
            "Autoaufkleber",
            "Fahrzeugbeschriftung",
            "Schaufensterbeschriftung",
            "Roll-ups",
            "Banner",
            "Aufkleber",
            "Druckdaten Erstellung",
            "Druckservice",
          ].map((n) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: n },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.mehrauftrag.de/grafikdesign#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Gestaltet ihr wirklich alles selbst?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir haben ein eigenes Grafikteam und erstellen jedes Design individuell für deinen Betrieb. Du bekommst keine fertige Vorlage, sondern eine Gestaltung, die zu dir passt.",
            },
          },
          {
            "@type": "Question",
            name: "Übernehmt ihr auch den Druck?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Auf Wunsch gern. Wir erstellen druckfertige Daten und kümmern uns auf Wunsch um den kompletten Druck. Wenn du eine eigene Druckerei hast, liefern wir die Daten im passenden Format.",
            },
          },
          {
            "@type": "Question",
            name: "Arbeitet ihr auch in Frankfurt und Umgebung?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir sitzen im Rhein-Main-Gebiet und betreuen Kunden in Frankfurt und der ganzen Region. Vieles lässt sich bequem aus der Ferne klären, für den persönlichen Termin sind die Wege kurz.",
            },
          },
          {
            "@type": "Question",
            name: "Bekomme ich Grafik und Website aus einer Hand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, und genau darin liegt der Vorteil. Weil wir auch deine Website bauen, sprechen Print und Online dieselbe Sprache und deine Marke wirkt überall gleich.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet ein Design bei euch?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Das hängt davon ab, was du brauchst, von der Visitenkarte bis zur kompletten Fahrzeugbeschriftung. Im kostenlosen Erstgespräch schauen wir uns dein Vorhaben an und nennen dir einen klaren Preis.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.mehrauftrag.de/grafikdesign#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.mehrauftrag.de" },
          { "@type": "ListItem", position: 2, name: "Grafikdesign", item: "https://www.mehrauftrag.de/grafikdesign" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function GrafikdesignPage() {
  return (
    <>
      <GrafikdesignSchema />
      <GrafikdesignLanding />
    </>
  );
}
