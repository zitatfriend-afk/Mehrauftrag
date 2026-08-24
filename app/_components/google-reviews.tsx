// Sichtbare Google-Bewertungen fuer die Startseite (und bei Bedarf weitere
// Leistungsseiten). Bewusst OHNE Review-/AggregateRating-Schema: Google zeigt
// seit 2019 keine Sterne mehr an, die ein Unternehmen ueber sich selbst im
// eigenen strukturierten Datenblock auszeichnet (self-serving review
// snippets). Die Sterne hier sind reines Layout (SVG), kein JSON-LD.
//
// Texte sind woertlich aus dem oeffentlichen Google-Unternehmensprofil
// uebernommen (Rezensionen-Tab, abgerufen 24.08.2026), nicht umformuliert
// oder gekuerzt. Nur der Anzeigename der Rezensent:innen steht hier, so wie
// Google ihn zeigt (teils voller Name, teils Initiale/Kuerzel je nach
// Privatsphaere-Einstellung der Person selbst).
//
// Datenstruktur so gebaut, dass eine zweite Quelle (z.B. ProvenExpert,
// Trustpilot) spaeter ergaenzt werden kann, ohne die Seite umzubauen: dazu
// einfach weitere Eintraege mit anderem "source" in REVIEWS aufnehmen und in
// SOURCES eine passende Zeile ergaenzen.
//
// Bei neuen/weiteren Bewertungen: Text 1:1 aus Google kopieren, hier
// eintragen. Nie selbst formulieren oder verdichten (siehe CLAUDE.md).

export interface GoogleReview {
  name: string;
  relativeTime: string; // z.B. "vor 2 Monaten" -- so wie Google es anzeigt, kein erfundenes Datum
  text: string;
  source: "google";
}

// Stand 24.08.2026: 10 von 14 oeffentlichen Google-Bewertungen konnten aus
// dem Rezensionen-Tab gelesen werden (Google laedt den Rest erst bei
// weiterem Interagieren nach). Die uebrigen 4 bei Gelegenheit ergaenzen.
export const REVIEWS: GoogleReview[] = [
  {
    name: "Rosa Kifel",
    relativeTime: "vor 2 Wochen",
    text: "Top Webdesign aus Hainburg. Patrick hat genau verstanden, was wir brauchen, und unsere neue Website pünktlich umgesetzt. Absolut toller Service! Sehr freundlich, kompetent und zuverlässig. Man merkt sofort, dass hier jemand weiß, was er tut und großen Wert auf Qualität und Kundenzufriedenheit legt. Immer zuvorkommend, hilfsbereit und professionell. Ich habe mich bestens aufgehoben gefühlt und kann den Service zu 100% weiterempfehlen. Sehr dankbar für die große Unterstützung Jederzeit gerne wieder! 😊",
    source: "google",
  },
  {
    name: "Mohamed Saleh",
    relativeTime: "vor 2 Monaten",
    text: "Sehr nett, ehrlich und zuverlässig. Die Arbeit wurde sauber und professionell ausgeführt. Ich bin sehr zufrieden und kann den Service uneingeschränkt weiterempfehlen.",
    source: "google",
  },
  {
    name: "Alpay Gün",
    relativeTime: "vor 2 Monaten",
    text: "Ich wurde von der Agentur von Beginn an gut beraten. Es wurde vorerst ein umfangreiches Gespräch darüber geführt, welche Bedürfnisse ich hatte. Darauf folgend wurde mir ein maßgeschneidertes Angebot gemacht. Bis heute habe ich eine super und moderne Website. Klare Empfehlungen gehen raus.",
    source: "google",
  },
  {
    name: "Bilal Özdemir",
    relativeTime: "vor einem Monat",
    text: "Sehr professionelle Zusammenarbeit von Anfang bis Ende. Das Team arbeitet zuverlässig, transparent und auf Augenhöhe. Fragen werden schnell beantwortet und man fühlt sich jederzeit gut betreut. Klare Empfehlung für alle, die Wert auf kompetente Beratung und eine vertrauensvolle Zusammenarbeit legen.",
    source: "google",
  },
  {
    name: "Julian Dielichtenergie",
    relativeTime: "vor einem Monat",
    text: "Endlich eine Agentur, die hält, was sie verspricht. Tolle Website, ehrliche Beratung und spürbare Ergebnisse mit Google Ads. Wir sind begeistert und freuen uns auf die weitere Zusammenarbeit!",
    source: "google",
  },
  {
    name: "Diluxan S.",
    relativeTime: "vor 2 Monaten",
    text: "Ich bin durch einen Bekannten auf mehrauftrag gestoßen und ich bin begeistert, hier steht Kundenzufriedenheit an erster Stelle, kann man nur weiterempfehlen.",
    source: "google",
  },
  {
    name: "Hdecebs",
    relativeTime: "vor 2 Monaten",
    text: "Sympatisches und junges Team, Patrick war immer gut zu erreichen. Jederzeit wieder!",
    source: "google",
  },
  {
    name: "Alfons Zimbrich",
    relativeTime: "vor 2 Monaten",
    text: "Durch Empfehlung auf das Unternehmen gestoßen und bin wirklich begeistert. Danke für den super Service.",
    source: "google",
  },
  {
    name: "Modjieb Na",
    relativeTime: "vor 2 Monaten",
    text: "Danke nochmal, sehr empfehlenswert!",
    source: "google",
  },
];

export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJWa4pOMinCQ0Rxxp4Xuj9fEk";

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={i < count ? "#f5b400" : "#3a4260"}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e7e9f2";
  const textColor = isDark ? "#e6e9f5" : "#1a2140";
  const nameColor = isDark ? "#ffffff" : "#0a0f2a";
  const metaColor = isDark ? "#8b93b8" : "#6b7290";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <StarRow count={5} />
        <span
          className="text-sm font-semibold"
          style={{ color: isDark ? "#fff" : "#0a0f2a" }}
        >
          5,0 von 5 · 14 Google-Bewertungen
        </span>
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline underline-offset-2"
          style={{ color: "#3b82f6" }}
        >
          Alle Bewertungen bei Google ansehen
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure
            key={r.name + r.relativeTime}
            className="rounded-2xl p-6 flex flex-col gap-3"
            style={{ background: cardBg, border: cardBorder }}
          >
            <StarRow count={5} />
            <blockquote
              className="text-[15px] leading-relaxed flex-1"
              style={{ color: textColor }}
            >
              „{r.text}“
            </blockquote>
            <figcaption className="flex items-center justify-between pt-2 text-sm">
              <span className="font-semibold" style={{ color: nameColor }}>
                {r.name}
              </span>
              <span style={{ color: metaColor }}>
                Google-Bewertung · {r.relativeTime}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
