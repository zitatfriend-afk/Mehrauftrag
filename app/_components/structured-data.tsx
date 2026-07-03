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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
