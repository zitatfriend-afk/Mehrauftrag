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
  "Wir schauen uns deinen Auftritt an und melden uns innerhalb von 24 Stunden, per WhatsApp oder Anruf, ganz ohne Verkaufsdruck.";

export const ANALYSE: Record<string, AnalyseContent> = {
  // ─── Allgemein (z.B. Ratgeber-Übersicht) ───────────────────────────────────
  allgemein: {
    slug: "allgemein",
    audience: "deinen Betrieb",
    metaTitle: "Kostenlose Website-Analyse für deinen Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose, unverbindliche Analyse deines Online-Auftritts: Wo dein größtes Potenzial für mehr Anfragen liegt, klar erklärt, ohne Verkaufsdruck.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für deinen Betrieb",
    intro:
      "Wir schauen uns deinen aktuellen Auftritt an, Website, Google und Sichtbarkeit, und zeigen dir konkret, wo dein größtes Potenzial für mehr Anfragen liegt. Unverbindlich und verständlich erklärt.",
    benefits: [
      "Ehrliche Einschätzung deines aktuellen Auftritts",
      "Konkrete Ansatzpunkte für mehr Anfragen",
      "Klarer Fahrplan statt Fachchinesisch",
      "Unverbindlich und ohne Verkaufsdruck",
    ],
    formHeadline: "Jetzt kostenlose Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Allgemein",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Branchen ───────────────────────────────────────────────────────────────
  "online-marketing-restaurant": {
    slug: "online-marketing-restaurant",
    audience: "Restaurants & Gastronomie",
    metaTitle: "Kostenlose Website-Analyse für Restaurants | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Restaurants, Pizzerien & Cafés: Wie du über Website und Google mehr Gäste und Reservierungen gewinnst. Unverbindlich.",
    eyebrow: "Für Restaurants & Gastronomie",
    h1: "Kostenlose Website-Analyse für dein Restaurant",
    intro:
      "Wir prüfen, wie gut dein Lokal online gefunden wird, Google-Profil, Bewertungen, Speisekarte und Reservierung, und zeigen dir, wo dir Gäste verloren gehen und wie du sie gewinnst.",
    benefits: [
      "Check deines Google-Profils und der Bewertungen",
      "Reservierungen und Anfragen leichter machen",
      "Auf dem Handy schnell und appetitlich wirken",
      "Unabhängiger werden von teuren Lieferplattformen",
    ],
    formHeadline: "Kostenlose Analyse für dein Restaurant",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Restaurant",
    successNote: DEFAULT_SUCCESS,
  },

  "kunden-gewinnen-handwerk": {
    slug: "kunden-gewinnen-handwerk",
    audience: "Handwerksbetriebe",
    metaTitle: "Kostenlose Website-Analyse für Handwerksbetriebe | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Handwerksbetriebe: Wie du über Website und Google in deiner Region gefunden wirst und mehr Aufträge bekommst. Unverbindlich.",
    eyebrow: "Für Handwerksbetriebe",
    h1: "Kostenlose Website-Analyse für deinen Handwerksbetrieb",
    intro:
      "Wir prüfen, wie gut dein Betrieb in deiner Region online gefunden wird und ob Anfragen zuverlässig bei dir ankommen, damit aus Interessenten echte Aufträge werden.",
    benefits: [
      "Check deiner lokalen Sichtbarkeit bei Google",
      "Anfragen per Anruf, Formular und WhatsApp abfangen",
      "Vertrauen schaffen mit echten Referenzen",
      "Keine Anfrage geht mehr verloren",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Handwerk",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-gebaeudereinigung": {
    slug: "auftraege-gebaeudereinigung",
    audience: "Gebäudereiniger",
    metaTitle: "Kostenlose Website-Analyse für Gebäudereiniger | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für die Gebäudereinigung: Wie du online neue Auftraggeber und Gewerbekunden gewinnst. Unverbindlich und ohne Verkaufsdruck.",
    eyebrow: "Für Gebäudereiniger",
    h1: "Kostenlose Website-Analyse für deine Gebäudereinigung",
    intro:
      "Wir prüfen, wie gut du für Suchbegriffe wie Büroreinigung oder Gebäudereinigung in deiner Region gefunden wirst und wie seriös dein Auftritt auf gewerbliche Auftraggeber wirkt.",
    benefits: [
      "Sichtbarkeit für die richtigen Reinigungs-Suchbegriffe",
      "Seriöser Auftritt für Gewerbekunden und Verwaltungen",
      "Leistungen klar getrennt und auffindbar",
      "Schnelle, professionelle Angebots-Strecke",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Gebaeudereinigung",
    successNote: DEFAULT_SUCCESS,
  },

  "kundinnen-gewinnen-kosmetikstudio": {
    slug: "kundinnen-gewinnen-kosmetikstudio",
    audience: "Kosmetikstudios & Kosmetikerinnen",
    metaTitle: "Kostenlose Website-Analyse für Kosmetikstudios | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Kosmetikstudios und Kosmetikerinnen: Wie du online mehr Kundinnen gewinnst und Termine einfacher buchbar machst. Unverbindlich.",
    eyebrow: "Für Kosmetikstudios & Kosmetikerinnen",
    h1: "Kostenlose Website-Analyse für dein Kosmetikstudio",
    intro:
      "Wir prüfen, wie gut dein Studio online gefunden wird, über Google-Profil, Instagram und Terminbuchung, und zeigen dir, wo dir Kundinnen verloren gehen und wie du sie gewinnst.",
    benefits: [
      "Check deines Google-Profils und der Bewertungen",
      "Terminbuchung rund um die Uhr statt Anrufe und DMs",
      "Vorher-Nachher-Bilder überzeugend präsentieren",
      "Bei Google in deiner Stadt besser gefunden werden",
    ],
    formHeadline: "Kostenlose Analyse für dein Kosmetikstudio",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Kosmetik",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-hausmeisterservice": {
    slug: "auftraege-hausmeisterservice",
    audience: "Hausmeisterservices",
    metaTitle: "Kostenlose Website-Analyse für Hausmeisterservices | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für den Hausmeisterservice: Wie du online an Daueraufträge von Hausverwaltungen, WEG und Gewerbeobjekten kommst. Unverbindlich.",
    eyebrow: "Für Hausmeisterservices",
    h1: "Kostenlose Website-Analyse für deinen Hausmeisterservice",
    intro:
      "Wir prüfen, wie dein Auftritt auf Hausverwaltungen und Objektmanager wirkt und ob deine Leistungen so auffindbar sind, dass die passenden Daueraufträge bei dir landen.",
    benefits: [
      "Auftritt, der Hausverwaltungen und WEG überzeugt",
      "Jede Leistung einzeln auffindbar statt im Sammeltext",
      "Zuverlässigkeit und Vertretung sichtbar machen",
      "Saisonale Suchen wie Winterdienst rechtzeitig abdecken",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Hausmeisterservice",
    successNote: DEFAULT_SUCCESS,
  },

  "auftraege-schweisser-metallbau": {
    slug: "auftraege-schweisser-metallbau",
    audience: "Schweißfachbetriebe & Metallbauer",
    metaTitle: "Kostenlose Website-Analyse für Schweißbetriebe | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Schweißfachbetriebe und Metallbauer: Wie du online Industrie- und Privatkunden gewinnst und deine Arbeit überzeugend zeigst. Unverbindlich.",
    eyebrow: "Für Schweißfachbetriebe & Metallbauer",
    h1: "Kostenlose Website-Analyse für deinen Schweißbetrieb",
    intro:
      "Wir prüfen, ob dein Auftritt sowohl Industriekunden als auch Privatkunden abholt und ob Verfahren, Qualifikationen und Projektfotos so sichtbar sind, dass daraus Anfragen werden.",
    benefits: [
      "Industrie- und Privatkunden getrennt richtig ansprechen",
      "Verfahren, Werkstoffe und Zertifikate sichtbar machen",
      "Projektfotos überzeugend in Szene setzen",
      "Mobile Einsätze und Einzugsgebiet klar benennen",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Schweisser",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Grundlagen & Vergleiche ────────────────────────────────────────────────
  "corporate-design-werbemittel": {
    slug: "corporate-design-werbemittel",
    audience: "deinen Marken- und Werbeauftritt",
    metaTitle: "Kostenloser Check: Corporate Design & Werbemittel | Mehr Auftrag",
    metaDescription:
      "Kostenloser Check deines Auftritts: Passen Logo, Visitenkarten, Fahrzeugbeschriftung und Firmenkleidung zusammen? Wir zeigen dir, wo dein Auftritt auseinanderläuft.",
    eyebrow: "Corporate Design & Werbemittel",
    h1: "Kostenloser Check für deinen Marken- und Werbeauftritt",
    intro:
      "Wir schauen uns an, wie einheitlich dein Auftritt heute wirkt, vom Logo über Visitenkarten und Fahrzeugbeschriftung bis zur Firmenkleidung, und zeigen dir, wo er auseinanderläuft und was sich mit wenig Aufwand zusammenführen lässt.",
    benefits: [
      "Ehrlicher Blick auf Logo, Farben und Schrift",
      "Werbemittel und Fahrzeug auf Einheitlichkeit geprüft",
      "Firmenkleidung als Werbefläche richtig nutzen",
      "Alles aus einer Hand statt Koordination über viele Anbieter",
    ],
    formHeadline: "Kostenlosen Auftritts-Check anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Corporate Design",
    successNote: DEFAULT_SUCCESS,
  },

  "ki-suche-google-2026": {
    slug: "ki-suche-google-2026",
    audience: "mehr Sichtbarkeit bei Google & KI",
    metaTitle: "Kostenlose Sichtbarkeits-Analyse: Google & KI | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Wie gut wirst du bei Google und in KI-Systemen wie ChatGPT und Perplexity gefunden? Wir zeigen dir konkret, wo du nachlegen solltest.",
    eyebrow: "Google & KI-Sichtbarkeit",
    h1: "Kostenlose Sichtbarkeits-Analyse für Google & KI",
    intro:
      "Wir prüfen, wie gut dein Betrieb heute bei Google und in KI-Systemen wie ChatGPT und Perplexity gefunden wird, und zeigen dir konkret, an welchen Stellen du sichtbarer wirst und als Empfehlung genannt werden kannst.",
    benefits: [
      "Check deiner Sichtbarkeit bei Google und KI",
      "Erkennen, ob KI-Systeme dich sauber lesen können",
      "Konkrete Schritte, um als Quelle genannt zu werden",
      "Klarer Fahrplan statt Fachchinesisch",
    ],
    formHeadline: "Kostenlose Sichtbarkeits-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - KI-Suche",
    successNote: DEFAULT_SUCCESS,
  },

  "seo-oder-google-ads": {
    slug: "seo-oder-google-ads",
    audience: "mehr Sichtbarkeit bei Google",
    metaTitle: "Kostenlose Sichtbarkeits-Analyse: SEO & Google Ads | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Lohnt sich für dich eher SEO oder Google Ads? Wir zeigen dir den schnellsten Weg zu planbaren Anfragen. Unverbindlich.",
    eyebrow: "SEO & Google Ads",
    h1: "Kostenlose Sichtbarkeits-Analyse für deinen Betrieb",
    intro:
      "Wir schauen uns an, wie gut du bei Google gefunden wirst, und sagen dir ehrlich, ob für dich SEO, Google Ads oder eine Kombination am schnellsten zu planbaren Anfragen führt.",
    benefits: [
      "Ehrliche Einschätzung: SEO, Ads oder beides",
      "Wo dein Werbebudget wirklich wirkt",
      "Schneller Start ohne verbranntes Budget",
      "Klarer Fahrplan statt Bauchgefühl",
    ],
    formHeadline: "Kostenlose Sichtbarkeits-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - SEO/Ads",
    successNote: DEFAULT_SUCCESS,
  },

  "website-selbst-oder-agentur": {
    slug: "website-selbst-oder-agentur",
    audience: "deinen Betrieb",
    metaTitle: "Kostenlose Website-Analyse für deinen Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse deiner Website: Wir zeigen ehrlich, ob sich eine Überarbeitung lohnt und was sie an zusätzlichen Anfragen bringen kann. Unverbindlich.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für deinen Betrieb",
    intro:
      "Baukasten selbst gebaut oder in die Jahre gekommen? Wir schauen uns deine Website ehrlich an und zeigen dir, ob und wo sich eine Überarbeitung wirklich lohnt, gemessen an zusätzlichen Anfragen.",
    benefits: [
      "Ehrlicher Blick auf deine aktuelle Seite",
      "Technik, Tempo und Handy-Tauglichkeit im Check",
      "Was dich zusätzliche Anfragen kostet",
      "Klare Empfehlung ohne Verkaufsdruck",
    ],
    formHeadline: "Kostenlose Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Website vs Agentur",
    successNote: DEFAULT_SUCCESS,
  },

  "professionelle-website-vorteile": {
    slug: "professionelle-website-vorteile",
    audience: "deinen Betrieb",
    metaTitle: "Kostenlose Website-Analyse für deinen Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Was eine professionelle Website deinem Betrieb an Anfragen bringen kann. Ehrlich, unverbindlich und ohne Verkaufsdruck.",
    eyebrow: "Kostenlose Analyse",
    h1: "Kostenlose Website-Analyse für deinen Betrieb",
    intro:
      "Wir schauen uns deinen Auftritt an und zeigen dir, wie aus Besuchern Anfragen werden, und was eine professionelle, schnelle Website deinem Betrieb konkret bringen kann.",
    benefits: [
      "Aus Interesse werden Anfragen",
      "Mehr Vertrauen beim ersten Eindruck",
      "Gefunden werden bei Google und KI",
      "Unabhängig von Plattformen",
    ],
    formHeadline: "Kostenlose Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Website Vorteile",
    successNote: DEFAULT_SUCCESS,
  },

  "lokale-seo-google-maps": {
    slug: "lokale-seo-google-maps",
    audience: "mehr lokale Sichtbarkeit bei Google",
    metaTitle: "Kostenlose Lokale-SEO-Analyse für deinen Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse deiner lokalen Sichtbarkeit: Wie gut wirst du in der Nähe-Suche und auf Google Maps gefunden? Wir zeigen dir, wie du nach oben kommst.",
    eyebrow: "Lokale Sichtbarkeit",
    h1: "Kostenlose Lokale-SEO-Analyse für deinen Betrieb",
    intro:
      "Wir prüfen, wie gut du in der Nähe-Suche und auf Google Maps gefunden wirst, Google-Profil, Bewertungen, Kontaktdaten und Website, und zeigen dir konkret, wo du an deinen lokalen Mitbewerbern vorbeiziehst.",
    benefits: [
      "Check deiner Position im lokalen Dreier-Paket",
      "Google-Profil und Kontaktdaten im Praxis-Check",
      "Konkrete Schritte für die Nähe-Suche",
      "Klarer Fahrplan statt Fachchinesisch",
    ],
    formHeadline: "Kostenlose Lokale-SEO-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Lokale SEO",
    successNote: DEFAULT_SUCCESS,
  },

  "google-bewertungen-mehr-kunden": {
    slug: "google-bewertungen-mehr-kunden",
    audience: "mehr Google-Bewertungen",
    metaTitle: "Kostenlose Bewertungs-Analyse für deinen Betrieb | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse: Wie stehst du bei Google-Bewertungen da und wie bekommst du systematisch mehr? Wir zeigen dir den einfachsten Weg. Unverbindlich.",
    eyebrow: "Mehr Bewertungen",
    h1: "Kostenlose Bewertungs-Analyse für deinen Betrieb",
    intro:
      "Wir schauen uns an, wie du bei Google-Bewertungen dastehst und wie du im Vergleich zu deinen Mitbewerbern wirkst, und zeigen dir einen einfachen Weg, systematisch mehr echte Bewertungen zu bekommen.",
    benefits: [
      "Ehrlicher Blick auf deine aktuellen Bewertungen",
      "Einfacher Weg zu mehr echten Bewertungen",
      "Direkter Bewertungslink richtig eingesetzt",
      "Mehr Vertrauen und bessere Platzierung",
    ],
    formHeadline: "Kostenlose Bewertungs-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Bewertungen",
    successNote: DEFAULT_SUCCESS,
  },

  // ─── Regional ───────────────────────────────────────────────────────────────
  "werbeagentur-rhein-main-finden": {
    slug: "werbeagentur-rhein-main-finden",
    audience: "Betriebe im Rhein-Main-Gebiet",
    metaTitle: "Kostenlose Website-Analyse im Rhein-Main-Gebiet | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Betriebe im Rhein-Main-Gebiet: Wo dein Auftritt im regionalen Wettbewerb steht und wie du mehr Anfragen gewinnst. Unverbindlich.",
    eyebrow: "Für das Rhein-Main-Gebiet",
    h1: "Kostenlose Website-Analyse für Betriebe im Rhein-Main-Gebiet",
    intro:
      "Wir kennen den Wettbewerb im Rhein-Main-Gebiet: die Betriebsstruktur, die Gewerke und die Suchbegriffe, mit denen dort tatsächlich nach Handwerk und Dienstleistung gesucht wird. Wir schauen uns deinen Auftritt an und zeigen dir, wo du gegenüber deinen Mitbewerbern in der Region stehst.",
    benefits: [
      "Einordnung im regionalen Wettbewerb",
      "Lokale Sichtbarkeit rund um Frankfurt",
      "Kurze Wege für den persönlichen Termin",
      "Klare Empfehlung ohne Verkaufsdruck",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Rhein-Main",
    successNote: DEFAULT_SUCCESS,
  },

  "webdesign-frankfurt": {
    slug: "webdesign-frankfurt",
    audience: "Betriebe in Frankfurt & Umgebung",
    metaTitle: "Kostenlose Website-Analyse in Frankfurt & Umgebung | Mehr Auftrag",
    metaDescription:
      "Kostenlose Analyse für Betriebe in Frankfurt und im Rhein-Main-Gebiet: Wie du lokal besser gefunden wirst und mehr Kunden gewinnst. Unverbindlich.",
    eyebrow: "Für Frankfurt & Umgebung",
    h1: "Kostenlose Website-Analyse für Betriebe in Frankfurt und Umgebung",
    intro:
      "Wir prüfen, wie gut du bei lokalen Suchen in Frankfurt und der Umgebung gefunden wirst, von der Ladezeit auf dem Handy bis zum Google-Profil, und wo dein größtes Potenzial liegt.",
    benefits: [
      "Lokale Sichtbarkeit in Frankfurt und Umgebung",
      "Schnell und einwandfrei auf dem Handy",
      "Google-Profil und Website verzahnt",
      "Bereit für Google und KI-Systeme",
    ],
    formHeadline: "Kostenlose Analyse für deinen Betrieb",
    formNote: "Wir melden uns per WhatsApp oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - Frankfurt",
    successNote: DEFAULT_SUCCESS,
  },

  "webdesign-dach-region": {
    slug: "webdesign-dach-region",
    audience: "Kunden in Deutschland, Österreich & der Schweiz",
    metaTitle: "Kostenlose Website-Analyse für die DACH-Region | Mehr Auftrag",
    metaDescription:
      "Kostenlose Website-Analyse für die DACH-Region: Wie du Kunden in Deutschland, Österreich und der Schweiz online gewinnst, aus einer Hand, komplett aus der Ferne.",
    eyebrow: "Deutschland · Österreich · Schweiz",
    h1: "Kostenlose Website-Analyse für die DACH-Region",
    intro:
      "Du willst Kunden in Deutschland, Österreich und der Schweiz erreichen? Wir schauen uns deinen Auftritt an und zeigen dir, wie du länderübergreifend gefunden wirst, alles aus einer Hand und bequem aus der Ferne betreut.",
    benefits: [
      "Kunden in ganz DE, AT und CH erreichen",
      "Komplette Betreuung aus der Ferne",
      "Länderübergreifend bei Google gefunden werden",
      "Ein Ansprechpartner für die ganze DACH-Region",
    ],
    formHeadline: "Kostenlose DACH-Website-Analyse anfordern",
    formNote: "Wir melden uns per WhatsApp, E-Mail oder Anruf, wie es dir lieber ist.",
    leadSource: "Analyse - DACH",
    successNote:
      "Wir schauen uns deinen Auftritt an und melden uns innerhalb von 24 Stunden, egal ob du in Deutschland, Österreich oder der Schweiz sitzt.",
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
