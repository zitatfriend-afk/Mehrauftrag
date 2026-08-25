// Fallstudien zu den fuenf Referenzkunden, die bisher nur als Kachel auf der
// Startseite standen. Reines Datenmodul, wird von /referenzen und
// /referenzen/[slug] serverseitig gelesen.
//
// Regeln fuer dieses Modul:
// - Nur belegte Angaben. Alle Aussagen stammen aus den Referenzdaten der
//   Startseite und aus den oeffentlich erreichbaren Kundenwebsites. Wo eine
//   Ergebniszahl fehlt, wird qualitativ formuliert statt geschaetzt.
// - Jede Fallstudie hat eine EIGENE Abschnittsreihenfolge. Keine Schablone,
//   sonst entsteht genau das skalierte Muster, das bei den Stadtseiten
//   vermieden wird.
// - Keine Gedankenstriche im sichtbaren Text.

export type Abschnitt = { heading: string; paragraphs: string[]; bullets?: string[] };
export type CaseLink = { label: string; href: string };

export type Case = {
  slug: string;
  name: string;
  branche: string;
  ort: string;
  domain: string;
  href: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  description: string;
  h1: string;
  lead: string;
  kurz: string;            // eine Zeile fuer die Uebersichtsseite
  tags: string[];
  abschnitte: Abschnitt[]; // Reihenfolge bewusst je Fall verschieden
  links: CaseLink[];
  datePublished: string;
  dateModified: string;
};

export const CASES: Case[] = [
  {
    slug: "sz-innenausbau",
    name: "SZ Innenausbau",
    branche: "Renovierung und Sanierung",
    ort: "Frankfurt am Main",
    domain: "sz-innenausbau.de",
    href: "https://sz-innenausbau.de/",
    image: "/referenzen/sz-innenausbau.jpg",
    imageAlt: "Website von SZ Innenausbau aus Frankfurt, Renovierungs- und Sanierungsbetrieb, erstellt von Mehr Auftrag",
    metaTitle: "Fallstudie SZ Innenausbau Frankfurt | Mehr Auftrag",
    description:
      "Ein Frankfurter Renovierungsbetrieb mit vielen Gewerken und wenig Sichtbarkeit. Wie aus einer unübersichtlichen Leistungsliste eine Anfrage-Strecke wurde.",
    h1: "SZ Innenausbau: viele Gewerke, eine klare Ordnung",
    lead:
      "Ein inhabergeführter Renovierungsbetrieb aus Frankfurt mit über fünfzehn Jahren Erfahrung. Das Können war da, im Netz aber kaum sichtbar.",
    kurz: "Renovierung und Sanierung in Frankfurt, viele Gewerke sortiert und mit echten Ergebnissen belegt.",
    tags: ["Vorher-nachher-Galerie", "Alle Gewerke auf einen Blick", "Anfrage mit Leistungsauswahl"],
    abschnitte: [
      {
        heading: "Das Problem war nicht das Handwerk, sondern die Sortierung",
        paragraphs: [
          "Ein Betrieb, der von Fliesen über Trockenbau bis Sandstrahlen alles anbietet, hat online ein Ordnungsproblem. Interessenten konnten die vielen Gewerke nicht auf einen Blick erfassen und wanderten deshalb schnell wieder ab. Nicht weil das Angebot zu klein war, sondern weil es zu unsortiert wirkte.",
          "Genau das ist bei Handwerksbetrieben mit breitem Leistungsspektrum der häufigste Grund für abgebrochene Besuche. Wer nach einer bestimmten Leistung sucht, will sie in wenigen Sekunden finden und nicht erst eine Liste durcharbeiten.",
        ],
      },
      {
        heading: "Was gebaut wurde",
        paragraphs: [
          "Ein Auftritt, der alle Leistungen klar ordnet, statt sie aufzuzählen. Dazu ein interaktiver Vorher-nachher-Regler, der echte Ergebnisse zeigt, Kundenstimmen, ein Projektablauf in fünf Schritten und ein Kontaktformular, in dem die passende Leistung direkt ausgewählt wird.",
        ],
        bullets: [
          "Jede Leistung mit eigener Beschreibung statt Sammelseite",
          "Vorher-nachher-Regler mit Bildern aus echten Projekten",
          "Projektablauf in fünf Schritten, damit klar ist, was passiert",
          "Anfrageformular mit Leistungsauswahl, damit Anfragen konkret ankommen",
        ],
      },
      {
        heading: "Was sich dadurch verändert hat",
        paragraphs: [
          "Der Betrieb wirkt online jetzt so verlässlich wie am Bau. Besucher sehen sofort, dass alles aus einer Hand kommt, und fragen gezielt die passende Leistung an statt allgemein nach einem Angebot. Das spart auf beiden Seiten den ersten Klärungsdurchlauf.",
        ],
      },
      {
        heading: "Was daraus für andere Handwerksbetriebe folgt",
        paragraphs: [
          "Ein breites Leistungsspektrum ist ein Verkaufsargument, aber nur, wenn es sortiert ist. Für die Suche gilt dasselbe: Google findet eine Seite besser, die eine Leistung klar bedient, als eine, die zehn Leistungen in einem Absatz nennt.",
        ],
      },
    ],
    links: [
      { label: "Webdesign Frankfurt: das Angebot für Betriebe in der Stadt", href: "/webdesign-frankfurt" },
      { label: "Kunden gewinnen als Handwerksbetrieb", href: "/ratgeber/kunden-gewinnen-handwerk" },
    ],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
  {
    slug: "pizzeria-da-salvatore",
    name: "Pizzeria Da Salvatore",
    branche: "Gastronomie",
    ort: "Rotenburg an der Wümme",
    domain: "da-salvatore-rotenburg.de",
    href: "https://da-salvatore-rotenburg.de/",
    image: "/referenzen/dasalvatore.jpg",
    imageAlt: "Website der Pizzeria Da Salvatore in Rotenburg an der Wümme, italienisches Restaurant, erstellt von Mehr Auftrag",
    metaTitle: "Fallstudie Pizzeria Da Salvatore, Rotenburg | Mehr Auftrag",
    description:
      "Eine Pizzeria mit treuer Stammkundschaft und einem Auftritt, der keinen Appetit machte. Wie Speisekarte, Bestellung und Fotos zusammenfanden.",
    h1: "Pizzeria Da Salvatore: die Qualität aus dem Holzofen endlich online",
    lead:
      "Eine beliebte Pizzeria in Rotenburg an der Wümme. Im Lokal spürbare Leidenschaft, online davon wenig zu sehen.",
    kurz: "Gastronomie in Rotenburg an der Wümme, Bestellung und Speisekarte in den Mittelpunkt gerückt.",
    tags: ["Online-Bestellung integriert", "Speisekarte und Öffnungszeiten", "Party-Service für Feiern"],
    abschnitte: [
      {
        heading: "Gäste entscheiden am Handy, und zwar in Sekunden",
        paragraphs: [
          "Wer abends Hunger hat, tippt eine Suche ein und schaut sich in wenigen Sekunden an, was angezeigt wird. Bestellung und Reservierung liefen bei Da Salvatore umständlich, der bisherige Auftritt machte wenig Appetit. Die Qualität, für die das Lokal seine guten Bewertungen bekommt, kam online schlicht nicht an.",
        ],
      },
      {
        heading: "Fotografie zuerst, Struktur direkt danach",
        paragraphs: [
          "Bei Gastronomie entscheidet das Bild, ob überhaupt weitergelesen wird. Deshalb steht großformatige Food-Fotografie im Mittelpunkt, mit der frischen Pizza als erstem Eindruck. Erst danach kommt die Struktur: Speisekarte, Öffnungszeiten und der direkte Weg zur Online-Bestellung, alles ohne Suchen erreichbar.",
        ],
        bullets: [
          "Speisekarte digital, nicht als PDF zum Herunterladen",
          "Öffnungszeiten sichtbar, ohne zu scrollen",
          "Online-Bestellung direkt eingebunden",
          "Party-Service für Feiern als eigener Bereich",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Gäste finden sofort, wonach sie suchen, und bestellen mit wenigen Klicks. Der Auftritt macht Appetit und spiegelt endlich die Qualität wider, die im Lokal ohnehin da war.",
        ],
      },
      {
        heading: "Ein Nebeneffekt, der uns selbst überrascht hat",
        paragraphs: [
          "In der Google Search Console von mehrauftrag.de taucht die Suchanfrage nach dem Namen des Lokals inzwischen regelmäßig auf. Menschen suchen den Betrieb, und die Agenturseite erscheint dazu. Das ist ein gutes Zeichen für die Sichtbarkeit des Kunden und der Grund, warum diese Fallstudie eine eigene Seite bekommen hat.",
        ],
      },
    ],
    links: [
      { label: "Website für Pizzerien mit eigener Bestellstrecke", href: "/webseite-fuer-pizzeria" },
      { label: "Websites für die Gastronomie im Überblick", href: "/webseite-fuer-gastronomie" },
      { label: "Google-Profil für Restaurants richtig pflegen", href: "/ratgeber/online-marketing-restaurant" },
    ],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
  {
    slug: "sorokin-schweissservice",
    name: "SOROKIN Mobiler Schweißservice",
    branche: "Metallbau und Schweißservice",
    ort: "Menden im Sauerland",
    domain: "sorokinschweisser.de",
    href: "https://www.sorokinschweisser.de/",
    image: "/referenzen/sorokin.jpg",
    imageAlt: "Website des mobilen Schweißservice Sorokin aus dem Sauerland, Metallbau und Schweißarbeiten, erstellt von Mehr Auftrag",
    metaTitle: "Fallstudie SOROKIN Schweißservice, Sauerland | Mehr Auftrag",
    description:
      "Ein mobiler Schweißservice, der fast nur über Empfehlung lief und online nicht auffindbar war. Komplett aus der Ferne gebaut, über 300 Kilometer Entfernung.",
    h1: "SOROKIN Schweißservice: von unsichtbar zu auffindbar",
    lead:
      "Ein mobiler Schweißservice aus Menden im Sauerland. Die Arbeit war erstklassig, ein Auftritt, der das zeigt, fehlte komplett.",
    kurz: "Mobiler Schweißservice im Sauerland, komplett aus der Ferne gebaut, ohne einen einzigen Termin vor Ort.",
    tags: ["Klare Leistungsübersicht", "Anfrage per WhatsApp", "Mobil optimiert"],
    abschnitte: [
      {
        heading: "Der Beweis, dass Entfernung nichts entscheidet",
        paragraphs: [
          "Zwischen unserem Schreibtisch und Menden im Sauerland liegen mehrere hundert Kilometer. Der komplette Auftritt ist trotzdem entstanden, ohne dass wir uns je im Betrieb getroffen hätten. Abstimmung per Telefon und Videocall, Entwurf als Link, Rückmeldungen per WhatsApp.",
          "Das ist der Grund, warum diese Referenz auf mehreren unserer Stadtseiten in Nordrhein-Westfalen auftaucht. Sie beantwortet die Frage, die dort jeder stellt: funktioniert das, wenn die Agentur nicht um die Ecke sitzt.",
        ],
      },
      {
        heading: "Ausgangslage: Aufträge nur über Empfehlung",
        paragraphs: [
          "Ein Betrieb, der fast ausschließlich über Weiterempfehlung lief. Wer den Schweißservice online suchte, fand ihn schlicht nicht. Damit fällt jede Anfrage weg, die nicht über einen persönlichen Kontakt kommt, und das ist bei Industrie- und Gewerbekunden der größere Teil.",
        ],
      },
      {
        heading: "Was auf so einer Seite stehen muss",
        paragraphs: [
          "Bei einem Schweißservice entscheiden andere Dinge als bei einem Ladengeschäft. Einkäufer und Instandhalter wollen wissen, welche Verfahren beherrscht werden, ob mobil gearbeitet wird und wie schnell jemand reagiert.",
        ],
        bullets: [
          "Leistungen einzeln benannt statt als Sammelbegriff",
          "Galerie echter Arbeiten, keine Symbolbilder",
          "Anfrage per Telefon und WhatsApp direkt aus der Seite",
          "Auf dem Handy bedienbar, weil dort gesucht wird",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Interessenten sehen sofort, was der Betrieb kann, und melden sich mit wenigen Klicks. Aus einem Auftritt, den es vorher nicht gab, kommen jetzt echte Anfragen.",
        ],
      },
    ],
    links: [
      { label: "Website für Schweißbetriebe und Metallbauer", href: "/webseite-fuer-schweisser" },
      { label: "Auftragsvergabe im Metallbau verstehen", href: "/ratgeber/auftraege-schweisser-metallbau" },
    ],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
  {
    slug: "blitzgebaeudereinigung",
    name: "Blitzgebäudereinigung",
    branche: "Gebäudereinigung",
    ort: "Hamburg",
    domain: "blitzgebaeudereinigung.com",
    href: "https://www.blitzgebaeudereinigung.com/",
    image: "/referenzen/blitz.jpg",
    imageAlt: "Website der Blitzgebäudereinigung aus Hamburg, Reinigungsunternehmen, erstellt von Mehr Auftrag",
    metaTitle: "Fallstudie Blitzgebäudereinigung Hamburg | Mehr Auftrag",
    description:
      "Ein Hamburger Reinigungsunternehmen wollte online so professionell wirken wie im täglichen Geschäft. Wie die Leistungen sortiert und die Anfrage vereinfacht wurde.",
    h1: "Blitzgebäudereinigung: online so professionell wie im Objekt",
    lead:
      "Ein Reinigungsunternehmen aus Hamburg. Die Leistung stimmte, es fehlte die Seite, die das auch zeigt.",
    kurz: "Reinigungsunternehmen in Hamburg, Leistungen sortiert und die Angebotsanfrage vereinfacht.",
    tags: ["Alle Leistungen im Blick", "Einfache Angebotsanfrage", "Voll responsiv"],
    abschnitte: [
      {
        heading: "Was Auftraggeber in der Reinigung prüfen",
        paragraphs: [
          "Reinigungsaufträge werden selten spontan vergeben. Hausverwaltungen, Büros und Praxen recherchieren vorher online und achten auf Seriosität. Fehlt eine Website, die den Betrieb so zeigt, wie er tatsächlich arbeitet, landet die Anfrage bei jemand anderem.",
        ],
      },
      {
        heading: "Struktur schlägt Aufzählung",
        paragraphs: [
          "In der Gebäudereinigung stecken mehrere sehr verschiedene Leistungen unter einem Namen. Unterhaltsreinigung, Grundreinigung, Fenster, Bauendreinigung. Wer sie in einem Absatz aufzählt, rankt für keine davon richtig und bekommt Anfragen, die nicht passen. Deshalb wurden alle Leistungen sauber strukturiert, mit klarer Trennung und eigener Beschreibung.",
        ],
      },
      {
        heading: "Die Anfrage so einfach wie möglich",
        paragraphs: [
          "Eine unkomplizierte Angebotsanfrage statt eines Formulars mit fünfzehn Pflichtfeldern. Dazu ein durchgehend responsives Design, das auf jedem Gerät funktioniert, weil ein Teil der Anfragen unterwegs entsteht.",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Interessenten finden schnell die passende Leistung und fragen direkt an, statt woanders weiterzusuchen.",
        ],
      },
    ],
    links: [
      { label: "Website für Gebäudereinigung, die Anfragen bringt", href: "/webseite-fuer-gebaeudereinigung" },
      { label: "Rahmenverträge in der Gebäudereinigung", href: "/ratgeber/auftraege-gebaeudereinigung" },
    ],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
  {
    slug: "blitz-industrie-gebaeudereinigung",
    name: "Blitz Industrie und Gebäudereinigung",
    branche: "Gebäudereinigung und Hausmeisterservice",
    ort: "Region Bebra",
    domain: "reinigungblitz.com",
    href: "https://reinigungblitz.com/",
    image: "/referenzen/reinigungblitz.jpg",
    imageAlt: "Website von Blitz Industrie und Gebäudereinigung aus der Region Bebra, Gebäudereinigung und Hausmeisterservice, erstellt von Mehr Auftrag",
    metaTitle: "Fallstudie Blitz Industrie und Gebäudereinigung | Mehr Auftrag",
    description:
      "Zwei starke Leistungsbereiche unter einem Namen, ohne dass Kunden durcheinanderkommen. Wie Reinigung und Hausmeisterservice getrennt und trotzdem verbunden wurden.",
    h1: "Blitz Industrie und Gebäudereinigung: zwei Bereiche, eine Seite, keine Verwirrung",
    lead:
      "Ein Betrieb in der Region Bebra, der Gebäudereinigung und Hausmeisterservice unter einem Dach anbietet. Beides sollte klar erkennbar sein.",
    kurz: "Reinigung und Hausmeisterservice in der Region Bebra, sauber getrennt und auf Objektverträge ausgerichtet.",
    tags: ["Zwei Bereiche klar getrennt", "Bewertungen und Galerie", "Auf Objektverträge ausgerichtet"],
    abschnitte: [
      {
        heading: "Die Aufgabe: zwei Angebote, eine Marke",
        paragraphs: [
          "Zwei starke Leistungsbereiche unter einem Namen sorgen schnell für Verwirrung, wenn die Website das nicht sauber trennt. Ein Verwalter, der einen Hausmeisterservice sucht, soll nicht erst durch Reinigungsleistungen scrollen, und umgekehrt.",
        ],
      },
      {
        heading: "Getrennt, aber nicht auseinandergerissen",
        paragraphs: [
          "Beide Bereiche haben eine eigene Strecke bekommen, mit eigener Beschreibung und eigenem Einstieg. Verbunden bleiben sie über den gemeinsamen Betrieb, weil viele Auftraggeber am Ende beides brauchen und das ein Verkaufsargument ist.",
        ],
        bullets: [
          "Reinigung und Hausmeisterservice mit getrennten Einstiegen",
          "Galerie mit Bildern aus echten Objekten",
          "Echte Bewertungen sichtbar eingebunden",
          "Auf feste Objektverträge ausgerichtet statt auf Einzelaufträge",
        ],
      },
      {
        heading: "Warum das für Objektverträge wichtig ist",
        paragraphs: [
          "Wer laufende Verträge will, muss Verlässlichkeit belegen, nicht behaupten. Bilder aus echten Objekten und sichtbare Bewertungen leisten das besser als jede Selbstbeschreibung. Deshalb stehen sie auf dieser Seite weit oben und nicht in einer Unterseite versteckt.",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Kunden erkennen sofort, welcher Bereich zu ihnen passt, und der Betrieb wirkt online so verlässlich wie im echten Geschäft.",
        ],
      },
    ],
    links: [
      { label: "Website für Hausmeisterservice und Objektbetreuung", href: "/webseite-fuer-hausmeisterservice" },
      { label: "Website für Gebäudereinigung, die Anfragen bringt", href: "/webseite-fuer-gebaeudereinigung" },
      { label: "Ausschreibungen für Hausmeisterdienste finden", href: "/ratgeber/auftraege-hausmeisterservice" },
    ],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
];

export function getCase(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return CASES.map((c) => c.slug);
}
