// Fragen und Antworten fuer diese Seite.
// Bewusst in einer eigenen Datei OHNE "use client": so nutzen sowohl die
// sichtbare Darstellung (_landing.tsx) als auch das FAQPage-Schema (page.tsx)
// exakt dieselben Texte. Google verlangt, dass ausgezeichnete FAQs auch
// sichtbar auf der Seite stehen, deshalb darf das nie auseinanderlaufen.
// Gehoert zu /website-fuer-handwerker.
//
// Die Frage "Geht es auch ohne monatliche Kosten?" kam am 10.09.2026 dazu.
// Grund: Die Seite bot nur das Monatsmodell an und hat den Einmalkauf in der
// Antwort darunter sogar abgewertet ("nicht einmalig abkassieren"). Wer genau
// das sucht, liest daraus, dass er nicht gemeint ist, und springt ab, bevor er
// den kostenlosen Entwurf ueberhaupt anfragt. Bewusst OHNE Preis: Der Entwurf
// bleibt der einzige Einstieg, eine zweite Zahl wuerde die 250 Euro entwerten
// und zum Vergleichen einladen statt zum Anfragen.
//
// Die beiden Fragen davor kommen aus der Wettbewerbsanalyse vom 06.09.2026:
// Die Anzeigen der Mitbewerber positionieren sich fast alle gegen Baukaesten,
// und ihre Einstiegspreise liegen bei 599 bis 1.000 Euro. Bei 250 Euro
// Einstieg entsteht deshalb die Frage, wo der Haken ist. Beide Einwaende
// werden hier offen beantwortet, statt sie zu ignorieren.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Was, wenn die Website keine Anfragen bringt?",
    a: "Dann schauen wir uns gemeinsam an, was optimiert werden kann, kostenlos. Wir lassen Sie damit nicht allein.",
  },
  {
    q: "Wie lange dauert es wirklich?",
    a: "7 Tage nach Eingang Ihrer Infos und Fotos ist Ihre Seite online. Kein Hin-und-Her, keine Verzögerungen.",
  },
  {
    q: "Was muss ich selbst tun?",
    a: "Ein 30-minütiges Gespräch mit uns und ein paar Fotos Ihrer Arbeit. Den kompletten Rest erledigen wir.",
  },
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Nein. Monatlich kündbar. Kein Kleingedrucktes, keine langfristige Bindung.",
  },
  {
    q: "Geht es auch ohne monatliche Kosten?",
    a: "Ja. Sie können die Website auch einmalig kaufen, dann gehört sie Ihnen. Hosting, Pflege und spätere Änderungen können Sie danach dazubuchen, müssen Sie aber nicht. Sagen Sie im Gespräch einfach Bescheid, dann rechnen wir Ihnen beide Wege vor und Sie entscheiden in Ruhe.",
  },
  {
    q: "Ist das eine Vorlage aus dem Baukasten?",
    a: "Nein. Ihre Seite wird für Ihren Betrieb gebaut, mit Ihren Leistungen, Ihren Fotos und Ihrer Region. Sie können sich unsere bestehenden Kundenseiten ansehen und selbst vergleichen, keine davon sieht aus wie die andere.",
  },
  {
    q: "Warum ist der Einstieg so günstig?",
    a: "Weil wir langfristig mit Ihnen arbeiten wollen. Andere verlangen 600 bis 1.000 Euro auf einen Schlag und sind danach weg. Bei uns ist der Start bewusst niedrig, dafür betreuen wir die Seite jeden Monat weiter. Bleibt sie nicht gut, kündigen Sie einfach. Und wer die Seite lieber einmalig kauft, kann das ebenfalls tun.",
  },
];
