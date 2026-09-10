import type { Metadata } from "next";
import GrafikdesignLanding from "./_landing";

export const metadata: Metadata = {
  title: "Grafikdesign, Textildruck und Werbetechnik | Mehr Auftrag",
  description:
    "Logo, Visitenkarten, Flyer, Fahrzeugbeschriftung und Firmenkleidung aus eigenem Grafikteam. Individuell gestaltet, auf Wunsch bis zum fertigen Druck.",
  alternates: { canonical: "https://www.mehrauftrag.de/grafikdesign" },
  openGraph: {
    title: "Grafikdesign & Textildruck Frankfurt | Logo, Flyer & Firmenkleidung",
    description:
      "Eigenes Grafikteam für Frankfurt und Rhein-Main. Visitenkarten, Flyer, Logo Design, Autoaufkleber, Fahrzeugbeschriftung sowie Firmenkleidung und Firmenshirts mit Logo, individuell gestaltet und auf Wunsch mit Druck.",
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
          "Individuelles Grafikdesign aus eigenem Grafikteam: Visitenkarten, Flyer, Falzflyer, Werbeflyer, Broschüren, Plakate, Speisekarten, Briefpapier, Geschäftsausstattung, Firmenschilder, Logo Design, Corporate Design, Social Media Grafiken, Autoaufkleber, Fahrzeugbeschriftung, Schaufensterbeschriftung, Roll-ups, Banner, Aufkleber, Textildruck und Firmenkleidung mit Logo (T-Shirts, Poloshirts, Hoodies, Arbeitskleidung), bedruckte Werbeartikel und Kugelschreiber sowie Druckdaten-Erstellung und Druckservice.",
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
            "Textildruck",
            "Firmenkleidung mit Logo",
            "T-Shirts bedrucken",
            "Poloshirts mit Logo",
            "Hoodies bedrucken",
            "Arbeitskleidung mit Logo",
            "Kugelschreiber bedrucken",
            "Werbeartikel",
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
            name: "Gestalten Sie wirklich alles selbst?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir haben ein eigenes Grafikteam und erstellen jedes Design individuell für Ihren Betrieb. Sie bekommen keine fertige Vorlage, sondern eine Gestaltung, die zu Ihnen passt.",
            },
          },
          {
            "@type": "Question",
            name: "Übernehmen Sie auch den Druck?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Auf Wunsch gern. Wir erstellen druckfertige Daten und kümmern uns auf Wunsch um den kompletten Druck. Wenn Sie eine eigene Druckerei haben, liefern wir die Daten im passenden Format.",
            },
          },
          {
            "@type": "Question",
            name: "Bedrucken Sie auch Kleidung mit unserem Logo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir bedrucken Firmenkleidung mit Ihrem Logo, von einzelnen T-Shirts, Poloshirts und Hoodies bis zur kompletten Arbeitskleidung fürs Team. Auf Wunsch gibt es passende Werbeartikel wie bedruckte Kugelschreiber gleich dazu.",
            },
          },
          {
            "@type": "Question",
            name: "Arbeiten Sie auch in Frankfurt und Umgebung?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir sitzen im Rhein-Main-Gebiet und betreuen Kunden in Frankfurt und der ganzen Region. Alles lässt sich bequem aus der Ferne klären, per Telefon, Videocall und WhatsApp.",
            },
          },
          {
            "@type": "Question",
            name: "Bekomme ich Grafik und Website aus einer Hand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, und genau darin liegt der Vorteil. Weil wir auch Ihre Website bauen, sprechen Print und Online dieselbe Sprache und Ihre Marke wirkt überall gleich.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet ein Design bei Ihnen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Das hängt davon ab, was Sie brauchen, von der Visitenkarte bis zur kompletten Fahrzeugbeschriftung. Im kostenlosen Erstgespräch schauen wir uns Ihr Vorhaben an und nennen Ihnen einen klaren Preis.",
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
