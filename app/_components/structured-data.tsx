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
          "Mehr Auftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen, die online wachsen wollen. Professionelle, SEO-optimierte Websites und Marketing für KMU – in der gesamten DACH-Region (Deutschland, Österreich, Schweiz).",
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
          "Individuelle, SEO-optimierte Websites fuer Unternehmen – zum festen Preis, in rund ein bis zwei Wochen online.",
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
export function HomeFaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.mehrauftrag.de/#faq",
    isPartOf: { "@id": "https://www.mehrauftrag.de/#website" },
    about: { "@id": "https://www.mehrauftrag.de/#organization" },
    mainEntity: [
      {
        "@type": "Question",
        name: "Was kostet eine Website bei Mehr Auftrag?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mehr Auftrag ist beim Preis flexibel: schluesselfertig zum einmaligen Festpreis oder als laufende Betreuung mit einem guenstigen Monats-Abo, beides transparent und ohne versteckte Kosten. Jeder Interessent bekommt zuerst einen kostenlosen Entwurf und ein unverbindliches Angebot. Auch das Monats-Abo ist monatlich kuendbar, es gibt keine lange Vertragsbindung.",
        },
      },
      {
        "@type": "Question",
        name: "Wie lange dauert es, bis meine Website online ist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In der Regel ist die neue Website innerhalb von rund ein bis zwei Wochen online – zum festen Preis und startklar fuer Google.",
        },
      },
      {
        "@type": "Question",
        name: "Fuer welche Branchen erstellt Mehr Auftrag Websites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mehr Auftrag erstellt Websites fuer kleine und mittlere Betriebe aus Gastronomie, Handwerk und Dienstleistung – zum Beispiel Restaurant, Pizzeria, Cafe, Bar, Foodtruck, Gebaeudereinigung, Hausmeisterservice, Schweisser und Elektriker.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Leistungen bietet Mehr Auftrag?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Webdesign und Website-Erstellung, lokale Suchmaschinenoptimierung (SEO), Google-Ads-Betreuung, Grafik- und Corporate Design sowie Werbemittel und Printdesign wie Visitenkarten, Flyer und Textildruck bzw. Kleidung mit Logo – alles aus einer Hand.",
        },
      },
      {
        "@type": "Question",
        name: "Muss die Agentur in meiner Stadt sitzen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mehr Auftrag arbeitet ortsunabhaengig und betreut Betriebe in der gesamten DACH-Region, also in Deutschland, Oesterreich und der Schweiz. Abstimmung, Entwurf und Freigabe laufen per Telefon, WhatsApp und Videocall. Ein Termin im Betrieb ist dafuer nicht noetig, was gerade fuer Betriebe ein Vorteil ist, die tagsueber auf der Baustelle stehen.",
        },
      },
      {
        "@type": "Question",
        name: "Gibt es eine lange Vertragsbindung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein. Die Zusammenarbeit ist monatlich kuendbar, ohne lange Vertragsbindung.",
        },
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
