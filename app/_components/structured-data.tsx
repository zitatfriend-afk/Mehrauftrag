// Zentrales JSON-LD für mehrauftrag.de.
// Organization + WebSite + Service-Knoten, per @id verknüpft. Bewusst KEIN
// LocalBusiness und keine Postanschrift: die Leistung ist ortsunabhaengig.
// Wird einmal im RootLayout gerendert und gilt damit für alle Seiten.
// NAP exakt abgestimmt auf das Google-Unternehmensprofil.

// Einzugsgebiet: ganze DACH-Region (Deutschland, Oesterreich, Schweiz).
// Auf allen areaServed-Feldern unten verwendet, damit es ueberall konsistent ist.
const DACH_AREA = [
  { "@type": "Country", name: "Deutschland" },
  { "@type": "Country", name: "Österreich" },
  { "@type": "Country", name: "Schweiz" },
];

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.mehrauftrag.de/#organization",
        name: "Mehr Auftrag",
        alternateName: "MehrAuftrag",
        legalName: "Mehr Auftrag",
        url: "https://www.mehrauftrag.de",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.mehrauftrag.de/#logo",
          url: "https://www.mehrauftrag.de/icon.png",
          width: 512,
          height: 512,
          caption: "Mehr Auftrag",
        },
        image: { "@id": "https://www.mehrauftrag.de/#logo" },
        description:
          "Mehr Auftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen, die online wachsen wollen. Professionelle, SEO-optimierte Websites und Marketing für KMU in der gesamten DACH-Region (Deutschland, Österreich, Schweiz).",
        email: "info@mehrauftrag.de",
        telephone: "+49 152 02069625",
        founder: { "@type": "Person", name: "Patrick Sauna" },
        foundingDate: "2025-05",
        // Bewusst KEINE postalische Adresse und kein LocalBusiness-Typ.
        // Die Leistung ist ortsunabhaengig, und die neue Anschrift steht noch
        // nicht fest. Eine veraltete Adresse im Schema ist schaedlicher als
        // gar keine. Die Erreichbarkeit steht unten im contactPoint.
        areaServed: DACH_AREA,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+49 152 02069625",
          email: "info@mehrauftrag.de",
          contactType: "customer service",
          areaServed: ["DE", "AT", "CH"],
          availableLanguage: ["German"],
        },
        // Verbindet Website ↔ Google-Eintrag ↔ Social (wichtig fürs Knowledge Panel).
        sameAs: [
          "https://www.instagram.com/mehrauftrag",
          "https://www.facebook.com/mehrauftrag",
          "https://g.page/r/CccaeF7o_XxJEBM",
        ],
        // Kein aggregateRating hier: Google zeigt seit 2019 keine Sterne mehr an,
        // die ein Unternehmen ueber sich selbst im eigenen Schema auszeichnet
        // (self-serving review snippets). Das fruehere aggregateRating hier war
        // vermutlich die Ursache fuer die "9 gueltigen Rezensions-Snippets", die
        // die Search Console gemeldet hat - entfernt am 24.08.2026. Echte
        // Bewertungen stehen stattdessen sichtbar im Content, siehe
        // GoogleReviews-Komponente. Sie sind ueber sameAs -> g.page-Link bei
        // Google nachpruefbar.
      },
      {
        "@type": "WebSite",
        "@id": "https://www.mehrauftrag.de/#website",
        url: "https://www.mehrauftrag.de",
        name: "Mehr Auftrag",
        inLanguage: "de-DE",
        publisher: { "@id": "https://www.mehrauftrag.de/#organization" },
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-webdesign",
        name: "Webdesign & Website-Erstellung",
        serviceType: "Webdesign",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Individuelle, SEO-optimierte Websites fuer Unternehmen, zum festen Preis, in rund ein bis zwei Wochen online.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-seo",
        name: "Lokale Suchmaschinenoptimierung (SEO)",
        serviceType: "Suchmaschinenoptimierung",
        url: "https://www.mehrauftrag.de/suchmaschinenoptimierung",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Lokale SEO, damit Betriebe in ihrer Stadt bei Google gefunden werden und mehr Anfragen erhalten.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-googleads",
        name: "Google Ads Betreuung",
        serviceType: "Google Ads",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Professionelle Einrichtung und Betreuung von Google-Ads-Kampagnen fuer planbare Anfragen.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-grafikdesign",
        name: "Grafik- & Corporate Design",
        serviceType: "Grafikdesign",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Logos, Corporate Design und Grafikdesign fuer einen professionellen Markenauftritt.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-print",
        name: "Werbemittel & Printdesign",
        serviceType: "Printdesign",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Gestaltung und Druck von Werbemitteln: Visitenkarten, Flyer und Broschueren.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-textil",
        name: "Textildruck & Merchandise",
        serviceType: "Textildruck",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: DACH_AREA,
        description:
          "Arbeitskleidung und Kleidung mit Firmenlogo sowie Merchandise-Artikel.",
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

// Der allgemeine FAQ-Block gehoert NUR auf die Startseite:
// Google erlaubt pro Seite genau eine FAQPage. Frueher wurde dieser Knoten ueber
// das RootLayout auf ALLEN Seiten ausgespielt und kollidierte dort mit den
// seitenspezifischen FAQs (Ratgeber-Artikel, /grafikdesign). Ausserdem waren die
// Fragen auf Unterseiten gar nicht sichtbar, was Googles Vorgabe widerspricht,
// dass ausgezeichnete FAQs auch auf der Seite stehen muessen.
// Deshalb wird er jetzt separat aus app/page.tsx heraus gerendert.
export type HomeFaq = { q: string; schemaText: string };

// Der FAQ-Block wird aus GENAU den Fragen gebaut, die auf der Startseite auch
// sichtbar sind. Vorher standen hier sechs fest verdrahtete Fragen, von denen
// zwei auf der Seite gar nicht vorkamen und die anderen anders formuliert
// waren. Google verlangt, dass ausgezeichnete FAQ-Inhalte auf der Seite
// stehen. Jetzt kann das nicht mehr auseinanderlaufen.
export function HomeFaqSchema({ faqs }: { faqs: HomeFaq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.mehrauftrag.de/#faq",
    inLanguage: "de-DE",
    isPartOf: { "@id": "https://www.mehrauftrag.de/#website" },
    about: { "@id": "https://www.mehrauftrag.de/#organization" },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.schemaText },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
