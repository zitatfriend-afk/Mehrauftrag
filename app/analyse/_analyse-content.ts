// Inhalte für die individuellen Analyse-Landingpages (/analyse/[slug]).
// Reines Datenmodul (kein "use client"), serverseitig gelesen von
// /analyse/[slug]/page.tsx. Jede Variante ist auf ihre Zielgruppe zugeschnitten,
// damit z.B. ein Restaurant-Leser NICHT auf einer Elektro-Seite landet.

export type AnalyseContent = {
  slug: string;
  audience: string; // kurzer Zielgruppen-Label, z.B. "Restaurants & Gastronomie"
  metaTitle: string;
  metaDescription: string;
  eyebrow: string; // kleine Überzeile
  h1: string;
  intro: string; // Lead-Absatz
  benefits: string[]; // 3-4 zielgruppenspezifische Nutzen
  formHeadline: string; // Überschrift über dem Formular
  formNote: string; // kleiner Hinweis unter dem Button-Bereich
  leadSource: string; // Quelle fürs CRM, z.B. "Analyse - Restaurant"
  successNote: string; // individueller Erfolgstext
  // Reine Formular-/Leadseiten gehoeren nicht in den Google-Index. Ist das
  // gesetzt, liefert /analyse/[slug] robots noindex,follow und die Seite
  // wird aus der Sitemap ausgenommen. Interne Links wirken weiter (follow).
  noindex?: boolean;
};

const DEFAULT_SUCCESS =
  "Wir schauen uns Ihren Auftritt an und melden uns innerhalb von 24 Stunden, per WhatsApp oder Anruf, ganz ohne Verkaufsdruck.";

export const ANALYSE: Record<string, AnalyseContent> = {
  // ─── Allgemein (z.B. Ratgeber-Übersicht) ───────────────────────────────────
  allgemein: {
    slug: "allgemein",
    audience: "Ihren Betrieb",
    metaTitle: "Kostenlose Website-Analyse für Ihren Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose, unverbindliche Analyse Ihres Online-Auftritts: Wo Ihr größtes Potenzial für mehr Anfragen liegt, klar erklärt, ohne Verkaufsdruck.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für Ihren Betrieb",
    intro:
      "Wir schauen uns Ihren aktuellen Auftritt an, Website, Google und Sichtbarkeit, und zeigen Ihnen konkret, wo Ihr größtes Potenzial für mehr Anfragen liegt. Unverbindlich und verständlich erklärt.",
    benefits: [
      "Ehrliche Einschätzung Ihres aktuellen Auftritts",
      "Konkrete Ansatzpunkte für mehr Anfragen",
      "Klarer Fahrplan statt Fachchinesisch",
      "Unverbindlich und ohne Verkaufsdruck",
    ],
    formHeadline: "Jetzt kostenlose Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Allgemein",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Branchen ───────────────────────────────────────────────────────────────
  "online-marketing-restaurant": {
    slug: "online-marketing-restaurant",
    audience: "Restaurants & Gastronomie",
    metaTitle: "Kostenlose Website-Analyse für Restaurants | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Restaurants, Pizzerien & Cafés: Wie Sie über Website und Google mehr Gäste und Reservierungen gewinnen. Unverbindlich.",
    eyebrow: "Für Restaurants & Gastronomie",
    h1: "Kostenlose Website-Analyse für Ihr Restaurant",
    intro:
      "Wir prüfen, wie gut Ihr Lokal online gefunden wird, Google-Profil, Bewertungen, Speisekarte und Reservierung, und zeigen Ihnen, wo Ihnen Gäste verloren gehen und wie Sie diese gewinnen.",
    benefits: [
      "Check Ihres Google-Profils und der Bewertungen",
      "Reservierungen und Anfragen leichter machen",
      "Auf dem Handy schnell und appetitlich wirken",
      "Unabhängiger werden von teuren Lieferplattformen",
    ],
    formHeadline: "Kostenlose Analyse für Ihr Restaurant",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Restaurant",
    successNote: DEFAULT_SUCCESS,
  },

  "kunden-gewinnen-handwerk": {
    slug: "kunden-gewinnen-handwerk",
    audience: "Handwerksbetriebe",
    metaTitle: "Kostenlose Website-Analyse für Handwerksbetriebe | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Handwerksbetriebe: Wie Sie über Website und Google in Ihrer Region gefunden werden und mehr Aufträge bekommen. Unverbindlich.",
    eyebrow: "Für Handwerksbetriebe",
    h1: "Kostenlose Website-Analyse für Ihren Handwerksbetrieb",
    intro:
      "Wir prüfen, wie gut Ihr Betrieb in Ihrer Region online gefunden wird und ob Anfragen zuverlässig bei Ihnen ankommen, damit aus Interessenten echte Aufträge werden.",
    benefits: [
      "Check Ihrer lokalen Sichtbarkeit bei Google",
      "Anfragen per Anruf, Formular und WhatsApp abfangen",
      "Vertrauen schaffen mit echten Referenzen",
      "Keine Anfrage geht mehr verloren",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Handwerk",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-gebaeudereinigung": {
    slug: "auftraege-gebaeudereinigung",
    audience: "Gebäudereiniger",
    metaTitle: "Kostenlose Website-Analyse für Gebäudereiniger | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für die Gebäudereinigung: Wie Sie online neue Auftraggeber und Gewerbekunden gewinnen. Unverbindlich und ohne Verkaufsdruck.",
    eyebrow: "Für Gebäudereiniger",
    h1: "Kostenlose Website-Analyse für Ihre Gebäudereinigung",
    intro:
      "Wir prüfen, wie gut Sie für Suchbegriffe wie Büroreinigung oder Gebäudereinigung in Ihrer Region gefunden werden und wie seriös Ihr Auftritt auf gewerbliche Auftraggeber wirkt.",
    benefits: [
      "Sichtbarkeit für die richtigen Reinigungs-Suchbegriffe",
      "Seriöser Auftritt für Gewerbekunden und Verwaltungen",
      "Leistungen klar getrennt und auffindbar",
      "Schnelle, professionelle Angebots-Strecke",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Gebaeudereinigung",
    successNote: DEFAULT_SUCCESS,
  },

  "kundinnen-gewinnen-kosmetikstudio": {
    slug: "kundinnen-gewinnen-kosmetikstudio",
    audience: "Kosmetikstudios & Kosmetikerinnen",
    metaTitle: "Kostenlose Website-Analyse für Kosmetikstudios | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Kosmetikstudios und Kosmetikerinnen: Wie Sie online mehr Kundinnen gewinnen und Termine einfacher buchbar machen. Unverbindlich.",
    eyebrow: "Für Kosmetikstudios & Kosmetikerinnen",
    h1: "Kostenlose Website-Analyse für Ihr Kosmetikstudio",
    intro:
      "Wir prüfen, wie gut Ihr Studio online gefunden wird, über Google-Profil, Instagram und Terminbuchung, und zeigen Ihnen, wo Ihnen Kundinnen verloren gehen und wie Sie diese gewinnen.",
    benefits: [
      "Check Ihres Google-Profils und der Bewertungen",
      "Terminbuchung rund um die Uhr statt Anrufe und DMs",
      "Vorher-Nachher-Bilder überzeugend präsentieren",
      "Bei Google in Ihrer Stadt besser gefunden werden",
    ],
    formHeadline: "Kostenlose Analyse für Ihr Kosmetikstudio",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Kosmetik",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-hausmeisterservice": {
    slug: "auftraege-hausmeisterservice",
    audience: "Hausmeisterservices",
    metaTitle: "Kostenlose Website-Analyse für Hausmeisterservices | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für den Hausmeisterservice: Wie Sie online an Daueraufträge von Hausverwaltungen, WEG und Gewerbeobjekten kommen. Unverbindlich.",
    eyebrow: "Für Hausmeisterservices",
    h1: "Kostenlose Website-Analyse für Ihren Hausmeisterservice",
    intro:
      "Wir prüfen, wie Ihr Auftritt auf Hausverwaltungen und Objektmanager wirkt und ob Ihre Leistungen so auffindbar sind, dass die passenden Daueraufträge bei Ihnen landen.",
    benefits: [
      "Auftritt, der Hausverwaltungen und WEG überzeugt",
      "Jede Leistung einzeln auffindbar statt im Sammeltext",
      "Zuverlässigkeit und Vertretung sichtbar machen",
      "Saisonale Suchen wie Winterdienst rechtzeitig abdecken",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Hausmeisterservice",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-schweisser-metallbau": {
    slug: "auftraege-schweisser-metallbau",
    audience: "Schweißfachbetriebe & Metallbauer",
    metaTitle: "Kostenlose Website-Analyse für Schweißbetriebe | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Schweißfachbetriebe und Metallbauer: Wie Sie online Industrie- und Privatkunden gewinnen und Ihre Arbeit überzeugend zeigen. Unverbindlich.",
    eyebrow: "Für Schweißfachbetriebe & Metallbauer",
    h1: "Kostenlose Website-Analyse für Ihren Schweißbetrieb",
    intro:
      "Wir prüfen, ob Ihr Auftritt sowohl Industriekunden als auch Privatkunden abholt und ob Verfahren, Qualifikationen und Projektfotos so sichtbar sind, dass daraus Anfragen werden.",
    benefits: [
      "Industrie- und Privatkunden getrennt richtig ansprechen",
      "Verfahren, Werkstoffe und Zertifikate sichtbar machen",
      "Projektfotos überzeugend in Szene setzen",
      "Mobile Einsätze und Einzugsgebiet klar benennen",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Schweisser",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Grundlagen & Vergleiche ────────────────────────────────────────────────
  "corporate-design-werbemittel": {
    slug: "corporate-design-werbemittel",
    audience: "Ihren Marken- und Werbeauftritt",
    metaTitle: "Kostenloser Check: Corporate Design & Werbemittel | Mehr Auftrag",
    metaDescription:
      "Kostenloser Check Ihres Auftritts: Passen Logo, Visitenkarten, Fahrzeugbeschriftung und Firmenkleidung zusammen? Wir zeigen Ihnen, wo Ihr Auftritt auseinanderläuft.",
    eyebrow: "Corporate Design & Werbemittel",
    h1: "Kostenloser Check für Ihren Marken- und Werbeauftritt",
    intro:
      "Wir schauen uns an, wie einheitlich Ihr Auftritt heute wirkt, vom Logo über Visitenkarten und Fahrzeugbeschriftung bis zur Firmenkleidung, und zeigen Ihnen, wo er auseinanderläuft und was sich mit wenig Aufwand zusammenführen lässt.",
    benefits: [
      "Ehrlicher Blick auf Logo, Farben und Schrift",
      "Werbemittel und Fahrzeug auf Einheitlichkeit geprüft",
      "Firmenkleidung als Werbefläche richtig nutzen",
      "Alles aus einer Hand statt Koordination über viele Anbieter",
    ],
    formHeadline: "Kostenlosen Auftritts-Check anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Corporate Design",
    successNote: DEFAULT_SUCCESS,
  },

  "ki-suche-google-2026": {
    slug: "ki-suche-google-2026",
    audience: "mehr Sichtbarkeit bei Google & KI",
    metaTitle: "Kostenlose Sichtbarkeits-Analyse: Google & KI | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Wie gut werden Sie bei Google und in KI-Systemen wie ChatGPT und Perplexity gefunden? Wir zeigen Ihnen konkret, wo Sie nachlegen sollten.",
    eyebrow: "Google & KI-Sichtbarkeit",
    h1: "Kostenlose Sichtbarkeits-Analyse für Google & KI",
    intro:
      "Wir prüfen, wie gut Ihr Betrieb heute bei Google und in KI-Systemen wie ChatGPT und Perplexity gefunden wird, und zeigen Ihnen konkret, an welchen Stellen Sie sichtbarer werden und als Empfehlung genannt werden können.",
    benefits: [
      "Check Ihrer Sichtbarkeit bei Google und KI",
      "Erkennen, ob KI-Systeme Sie sauber lesen können",
      "Konkrete Schritte, um als Quelle genannt zu werden",
      "Klarer Fahrplan statt Fachchinesisch",
    ],
    formHeadline: "Kostenlose Sichtbarkeits-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - KI-Suche",
    successNote: DEFAULT_SUCCESS,
  },

  "seo-oder-google-ads": {
    slug: "seo-oder-google-ads",
    audience: "mehr Sichtbarkeit bei Google",
    metaTitle: "Kostenlose Sichtbarkeits-Analyse: SEO & Google Ads | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Lohnt sich für Sie eher SEO oder Google Ads? Wir zeigen Ihnen den schnellsten Weg zu planbaren Anfragen. Unverbindlich.",
    eyebrow: "SEO & Google Ads",
    h1: "Kostenlose Sichtbarkeits-Analyse für Ihren Betrieb",
    intro:
      "Wir schauen uns an, wie gut Sie bei Google gefunden werden, und sagen Ihnen ehrlich, ob für Sie SEO, Google Ads oder eine Kombination am schnellsten zu planbaren Anfragen führt.",
    benefits: [
      "Ehrliche Einschätzung: SEO, Ads oder beides",
      "Wo Ihr Werbebudget wirklich wirkt",
      "Schneller Start ohne verbranntes Budget",
      "Klarer Fahrplan statt Bauchgefühl",
    ],
    formHeadline: "Kostenlose Sichtbarkeits-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - SEO/Ads",
    successNote: DEFAULT_SUCCESS,
  },

  "seo-agentur-erkennen": {
    slug: "seo-agentur-erkennen",
    audience: "eine ehrliche Einschätzung Ihrer Sichtbarkeit",
    metaTitle: "Zweite Meinung zu Ihrer SEO-Betreuung | Mehr Auftrag",
    metaDescription:
      "Kostenlose zweite Meinung zu Ihrer Sichtbarkeit bei Google: Wir sagen Ihnen verständlich, was an Ihrem Auftritt wirkt und was fehlt. Unverbindlich.",
    eyebrow: "Unabhängige Einschätzung",
    h1: "Kostenlose zweite Meinung zu Ihrer Sichtbarkeit",
    intro:
      "Sie sind sich nicht sicher, ob an Ihrer Sichtbarkeit wirklich gearbeitet wird? Wir schauen uns Ihren Auftritt an und sagen Ihnen in normalen Worten, was wirkt, was fehlt und was wir an Ihrer Stelle zuerst angehen würden.",
    benefits: [
      "Ehrliche Einschätzung, auch wenn alles passt",
      "Verständlich erklärt statt Fachchinesisch",
      "Konkrete nächste Schritte statt Diagramme",
      "Unverbindlich und ohne Verkaufsdruck",
    ],
    formHeadline: "Kostenlose Einschätzung anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - SEO-Agentur-Check",
    successNote: DEFAULT_SUCCESS,
  },

  "was-seo-kostet": {
    slug: "was-seo-kostet",
    audience: "einen festen Preis statt einer Pauschale",
    metaTitle: "SEO-Angebot mit festem Preis anfordern | Mehr Auftrag",
    metaDescription:
      "Was Suchmaschinenoptimierung in Ihrem Fall kostet, sagen wir nach einem Blick auf Website, Markt und Wettbewerb. Fester Preis, klar benannter Umfang.",
    eyebrow: "Fester Preis statt Pauschale",
    h1: "Was Suchmaschinenoptimierung bei Ihnen kosten würde",
    intro:
      "Statt einer Pauschale, die auf niemanden richtig passt: Wir sehen uns Ihre Website, Ihren Markt und Ihren Wettbewerb an und sagen Ihnen, was in Ihrem Fall nötig ist und was es kostet. Der Blick darauf kostet Sie nichts.",
    benefits: [
      "Preis erst nach einem Blick auf Ihren Wettbewerb",
      "Klar benannter Umfang statt offener Rechnung",
      "Einmalige Arbeit und laufende Betreuung getrennt ausgewiesen",
      "Unverbindlich und ohne Verkaufsdruck",
    ],
    formHeadline: "Einschätzung und Preis anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - SEO-Kosten",
    successNote: DEFAULT_SUCCESS,
  },

  "website-selbst-oder-agentur": {
    slug: "website-selbst-oder-agentur",
    audience: "Ihren Betrieb",
    metaTitle: "Kostenlose Website-Analyse für Ihren Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse Ihrer Website: Wir zeigen ehrlich, ob sich eine Überarbeitung lohnt und was sie an zusätzlichen Anfragen bringen kann. Unverbindlich.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für Ihren Betrieb",
    intro:
      "Baukasten selbst gebaut oder in die Jahre gekommen? Wir schauen uns Ihre Website ehrlich an und zeigen Ihnen, ob und wo sich eine Überarbeitung wirklich lohnt, gemessen an zusätzlichen Anfragen.",
    benefits: [
      "Ehrlicher Blick auf Ihre aktuelle Seite",
      "Technik, Tempo und Handy-Tauglichkeit im Check",
      "Was Sie zusätzliche Anfragen kostet",
      "Klare Empfehlung ohne Verkaufsdruck",
    ],
    formHeadline: "Kostenlose Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Website vs Agentur",
    successNote: DEFAULT_SUCCESS,
  },

  "professionelle-website-vorteile": {
    slug: "professionelle-website-vorteile",
    audience: "Ihren Betrieb",
    metaTitle: "Kostenlose Website-Analyse für Ihren Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Was eine professionelle Website Ihrem Betrieb an Anfragen bringen kann. Ehrlich, unverbindlich und ohne Verkaufsdruck.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für Ihren Betrieb",
    intro:
      "Wir schauen uns Ihren Auftritt an und zeigen Ihnen, wie aus Besuchern Anfragen werden, und was eine professionelle, schnelle Website Ihrem Betrieb konkret bringen kann.",
    benefits: [
      "Aus Interesse werden Anfragen",
      "Mehr Vertrauen beim ersten Eindruck",
      "Gefunden werden bei Google und KI",
      "Unabhängig von Plattformen",
    ],
    formHeadline: "Kostenlose Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Website Vorteile",
    successNote: DEFAULT_SUCCESS,
  },

  "lokale-seo-google-maps": {
    slug: "lokale-seo-google-maps",
    audience: "mehr lokale Sichtbarkeit bei Google",
    metaTitle: "Kostenlose Lokale-SEO-Analyse für Ihren Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse Ihrer lokalen Sichtbarkeit: Wie gut werden Sie in der Nähe-Suche und auf Google Maps gefunden? Wir zeigen Ihnen, wie Sie nach oben kommen.",
    eyebrow: "Lokale Sichtbarkeit",
    h1: "Kostenlose Lokale-SEO-Analyse für Ihren Betrieb",
    intro:
      "Wir prüfen, wie gut Sie in der Nähe-Suche und auf Google Maps gefunden werden, Google-Profil, Bewertungen, Kontaktdaten und Website, und zeigen Ihnen konkret, wo Sie an Ihren lokalen Mitbewerbern vorbeiziehen.",
    benefits: [
      "Check Ihrer Position im lokalen Dreier-Paket",
      "Google-Profil und Kontaktdaten im Praxis-Check",
      "Konkrete Schritte für die Nähe-Suche",
      "Klarer Fahrplan statt Fachchinesisch",
    ],
    formHeadline: "Kostenlose Lokale-SEO-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Lokale SEO",
    successNote: DEFAULT_SUCCESS,
  },

  "google-bewertungen-mehr-kunden": {
    slug: "google-bewertungen-mehr-kunden",
    audience: "mehr Google-Bewertungen",
    metaTitle: "Kostenlose Bewertungs-Analyse für Ihren Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Wie stehen Sie bei Google-Bewertungen da und wie bekommen Sie systematisch mehr? Wir zeigen Ihnen den einfachsten Weg. Unverbindlich.",
    eyebrow: "Mehr Bewertungen",
    h1: "Kostenlose Bewertungs-Analyse für Ihren Betrieb",
    intro:
      "Wir schauen uns an, wie Sie bei Google-Bewertungen dastehen und wie Sie im Vergleich zu Ihren Mitbewerbern wirken, und zeigen Ihnen einen einfachen Weg, systematisch mehr echte Bewertungen zu bekommen.",
    benefits: [
      "Ehrlicher Blick auf Ihre aktuellen Bewertungen",
      "Einfacher Weg zu mehr echten Bewertungen",
      "Direkter Bewertungslink richtig eingesetzt",
      "Mehr Vertrauen und bessere Platzierung",
    ],
    formHeadline: "Kostenlose Bewertungs-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Bewertungen",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Regional ───────────────────────────────────────────────────────────────
  "werbeagentur-rhein-main-finden": {
    slug: "werbeagentur-rhein-main-finden",
    audience: "Betriebe im Rhein-Main-Gebiet",
    metaTitle: "Kostenlose Website-Analyse im Rhein-Main-Gebiet | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Betriebe im Rhein-Main-Gebiet: Wo Ihr Auftritt im regionalen Wettbewerb steht und wie Sie mehr Anfragen gewinnen. Unverbindlich.",
    eyebrow: "Für das Rhein-Main-Gebiet",
    h1: "Kostenlose Website-Analyse für Betriebe im Rhein-Main-Gebiet",
    intro:
      "Wir kennen den Wettbewerb im Rhein-Main-Gebiet: die Betriebsstruktur, die Gewerke und die Suchbegriffe, mit denen dort tatsächlich nach Handwerk und Dienstleistung gesucht wird. Wir schauen uns Ihren Auftritt an und zeigen Ihnen, wo Sie gegenüber Ihren Mitbewerbern in der Region stehen.",
    benefits: [
      "Einordnung im regionalen Wettbewerb",
      "Lokale Sichtbarkeit rund um Frankfurt",
      "Abstimmung per Telefon, Videocall und WhatsApp",
      "Klare Empfehlung ohne Verkaufsdruck",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Rhein-Main",
    successNote: DEFAULT_SUCCESS,
  },

  "webdesign-frankfurt": {
    slug: "webdesign-frankfurt",
    audience: "Betriebe in Frankfurt & Umgebung",
    metaTitle: "Kostenlose Website-Analyse in Frankfurt & Umgebung | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Betriebe in Frankfurt und im Rhein-Main-Gebiet: Wie Sie lokal besser gefunden werden und mehr Kunden gewinnen. Unverbindlich.",
    eyebrow: "Für Frankfurt & Umgebung",
    h1: "Kostenlose Website-Analyse für Betriebe in Frankfurt und Umgebung",
    intro:
      "Wir prüfen, wie gut Sie bei lokalen Suchen in Frankfurt und der Umgebung gefunden werden, von der Ladezeit auf dem Handy bis zum Google-Profil, und wo Ihr größtes Potenzial liegt.",
    benefits: [
      "Lokale Sichtbarkeit in Frankfurt und Umgebung",
      "Schnell und einwandfrei auf dem Handy",
      "Google-Profil und Website verzahnt",
      "Bereit für Google und KI-Systeme",
    ],
    formHeadline: "Kostenlose Analyse für Ihren Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - Frankfurt",
    successNote: DEFAULT_SUCCESS,
  },

  "webdesign-dach-region": {
    slug: "webdesign-dach-region",
    audience: "Kunden in Deutschland, Österreich & der Schweiz",
    metaTitle: "Kostenlose Website-Analyse für die DACH-Region | Mehr Auftrag",
    metaDescription:
      "Kostenlose Website-Analyse für die DACH-Region: Wie Sie Kunden in Deutschland, Österreich und der Schweiz online gewinnen, aus einer Hand, komplett aus der Ferne.",
    eyebrow: "Deutschland · Österreich · Schweiz",
    h1: "Kostenlose Website-Analyse für die DACH-Region",
    intro:
      "Sie wollen Kunden in Deutschland, Österreich und der Schweiz erreichen? Wir schauen uns Ihren Auftritt an und zeigen Ihnen, wie Sie länderübergreifend gefunden werden, alles aus einer Hand und bequem aus der Ferne betreut.",
    benefits: [
      "Kunden in ganz DE, AT und CH erreichen",
      "Komplette Betreuung aus der Ferne",
      "Länderübergreifend bei Google gefunden werden",
      "Ein Ansprechpartner für die ganze DACH-Region",
    ],
    formHeadline: "Kostenlose DACH-Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp, E-Mail oder Anruf, wie es Ihnen lieber ist.",
    leadSource: "Analyse - DACH",
    successNote:
      "Wir schauen uns Ihren Auftritt an und melden uns innerhalb von 24 Stunden, egal ob Sie in Deutschland, Österreich oder der Schweiz sitzen.",
  },
};

export function getAnalyse(slug: string): AnalyseContent | undefined {
  return ANALYSE[slug];
}

export function getAllAnalyseSlugs(): string[] {
  return Object.keys(ANALYSE);
}

// ---------------------------------------------------------------------------
// Entscheidung vom 20.08.2026: Die Analyse-Seiten sind reine Formular- und
// Leadseiten und gehoeren NICHT in den Google-Index.
//
// Warum: 12 der 17 Seiten hingen in der Search Console monatelang unter
// "Gefunden, zurzeit nicht indexiert", Google hat sie also gesehen und
// bewusst nicht aufgenommen. Die restlichen brachten zusammen 1 Klick und
// 3 Impressionen in drei Monaten. Als Gruppe sind sie fast identisch
// aufgebaut, und genau so ein Muster wertet Google als skalierte Inhalte,
// mit Folgen fuer die GESAMTE Domain, nicht nur fuer diese Seiten.
//
// noindex, follow heisst: Die Seiten bleiben erreichbar, funktionieren als
// Ziel der CTAs weiter und geben Linkkraft weiter. Sie stehen nur nicht mehr
// in der Sitemap und nicht mehr im Index. Die Inhalte zum Thema stehen in den
// Ratgeber-Artikeln, die indexiert bleiben und ranken sollen.
//
// Soll eine einzelne Seite doch in den Index, ihren Slug in INDEXIERBAR
// eintragen. Dann braucht sie aber eigenen Inhalt, der ueber das Formular
// hinausgeht, sonst wiederholt sich das Spiel.
// ---------------------------------------------------------------------------
const INDEXIERBAR = new Set<string>([]);

for (const [slug, inhalt] of Object.entries(ANALYSE)) {
  if (!INDEXIERBAR.has(slug)) inhalt.noindex = true;
}
