// Zentrales JSON-LD für mehrauftrag.de.
// Organization + LocalBusiness (ProfessionalService) + WebSite, per @id verknüpft.
// Wird einmal im RootLayout gerendert und gilt damit für alle Seiten.
// NAP exakt abgestimmt auf das Google-Unternehmensprofil.

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
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
          "Mehr Auftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen, die online wachsen wollen. Professionelle, SEO-optimierte Websites und Marketing für KMU – deutschlandweit.",
        email: "info@mehrauftrag.de",
        telephone: "+49 152 02069625",
        founder: { "@type": "Person", name: "Patrick Sauna" },
        foundingDate: "2025-05",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Josefstraße 28",
          postalCode: "63512",
          addressLocality: "Hainburg",
          addressRegion: "Hessen",
          addressCountry: "DE",
        },
        areaServed: { "@type": "Country", name: "Deutschland" },
        priceRange: "€€",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+49 152 02069625",
          email: "info@mehrauftrag.de",
          contactType: "customer service",
          areaServed: "DE",
          availableLanguage: ["German"],
        },
        // Verbindet Website ↔ Google-Eintrag ↔ Social (wichtig fürs Knowledge Panel).
        sameAs: [
          "https://www.instagram.com/mehrauftrag",
          "https://www.facebook.com/mehrauftrag",
          "https://g.page/r/CccaeF7o_XxJEBM",
        ],
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
        "@type": "FAQPage",
        "@id": "https://www.mehrauftrag.de/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Was kostet eine Website bei Mehr Auftrag?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mehr Auftrag arbeitet mit einem festen, transparenten Preis ohne versteckte Kosten. Jeder Interessent bekommt zuerst einen kostenlosen Entwurf und ein unverbindliches Angebot. Die Betreuung ist monatlich kuendbar, es gibt keine lange Vertragsbindung.",
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
              text: "Webdesign und Website-Erstellung, lokale Suchmaschinenoptimierung (SEO), Google-Ads-Betreuung sowie Grafik- und Corporate Design.",
            },
          },
          {
            "@type": "Question",
            name: "Wo ist Mehr Auftrag ansaessig?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet bei Frankfurt am Main und betreut Kunden deutschlandweit.",
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
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-webdesign",
        name: "Webdesign & Website-Erstellung",
        serviceType: "Webdesign",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: { "@type": "Country", name: "Deutschland" },
        description:
          "Individuelle, SEO-optimierte Websites fuer Unternehmen – zum festen Preis, in rund ein bis zwei Wochen online.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-seo",
        name: "Lokale Suchmaschinenoptimierung (SEO)",
        serviceType: "Suchmaschinenoptimierung",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: { "@type": "Country", name: "Deutschland" },
        description:
          "Lokale SEO, damit Betriebe in ihrer Stadt bei Google gefunden werden und mehr Anfragen erhalten.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-googleads",
        name: "Google Ads Betreuung",
        serviceType: "Google Ads",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: { "@type": "Country", name: "Deutschland" },
        description:
          "Professionelle Einrichtung und Betreuung von Google-Ads-Kampagnen fuer planbare Anfragen.",
      },
      {
        "@type": "Service",
        "@id": "https://www.mehrauftrag.de/#service-grafikdesign",
        name: "Grafik- & Corporate Design",
        serviceType: "Grafikdesign",
        provider: { "@id": "https://www.mehrauftrag.de/#organization" },
        areaServed: { "@type": "Country", name: "Deutschland" },
        description:
          "Logos, Corporate Design und Grafikdesign fuer einen professionellen Markenauftritt.",
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
