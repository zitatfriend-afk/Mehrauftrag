// Ratgeber-Inhalte für mehrauftrag.de.
// Reines Datenmodul (kein "use client") – wird von der Hub-Seite (/ratgeber)
// und der dynamischen Artikel-Route (/ratgeber/[slug]) serverseitig gelesen.
// Jeder Artikel liefert seine eigenen Metadaten + JSON-LD (Article + FAQPage).

export type FAQ = { q: string; a: string };
export type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
export type RelatedLink = { label: string; href: string };

export type Category = "Branchen" | "Grundlagen" | "Regional";

export type Article = {
  slug: string;
  category: Category;
  title: string; // H1 auf der Seite
  metaTitle: string; // <title>
  description: string; // Meta-Description
  datePublished: string; // ISO
  dateModified: string; // ISO
  readingTime: string; // z.B. "6 Min."
  intro: string[]; // Einleitung (Lead)
  sections: Section[];
  faqs: FAQ[];
  related: RelatedLink[];
};

export const CATEGORY_LABEL: Record<Category, string> = {
  Branchen: "Branchen-Ratgeber",
  Grundlagen: "Grundlagen & Vergleiche",
  Regional: "Regional",
};

export const ARTICLES: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BRANCHEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "online-marketing-restaurant",
    category: "Branchen",
    title: "Online-Marketing für Restaurants: so kommen mehr Gäste über Website und Google",
    metaTitle: "Online-Marketing für Restaurants: mehr Gäste | Ratgeber",
    description:
      "Wie Restaurants, Pizzerien und Cafés online mehr Gäste gewinnen: Website, Google-Profil, Bewertungen und Reservierungen richtig aufsetzen.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "7 Min.",
    intro: [
      "Die meisten Gäste entscheiden heute am Handy, wo sie essen gehen. Sie tippen etwas wie Pizzeria in der Nähe oder Restaurant Hainburg in Google ein und schauen sich in wenigen Sekunden an, was ihnen angezeigt wird: die Karte, die Bewertungen, die Fotos, die Öffnungszeiten. Wer hier nicht sauber auftaucht, verliert Gäste an das Lokal von nebenan, oft ohne es überhaupt zu merken.",
      "Die gute Nachricht: Für ein Restaurant ist gutes Online-Marketing kein Hexenwerk. Es kommt auf wenige Bausteine an, die zusammenspielen. Dieser Leitfaden zeigt sie der Reihe nach.",
    ],
    sections: [
      {
        heading: "Das Google-Unternehmensprofil ist wichtiger als die Website",
        paragraphs: [
          "Für die Gastronomie ist der Eintrag bei Google (das Google-Unternehmensprofil) meist der erste Kontaktpunkt mit einem neuen Gast. Er entscheidet, ob jemand anruft, den Weg heraussucht oder einfach weiterscrollt. Deshalb sollte er vollständig und aktuell sein: korrekte Öffnungszeiten inklusive Feiertagen, Telefonnummer, Adresse, Speisekarte und viele appetitliche Fotos vom Essen und vom Lokal.",
          "Ein gepflegtes Profil mit vielen guten Bewertungen taucht bei der lokalen Suche weiter oben auf und bringt spürbar mehr Anrufe und Laufkundschaft. Das ist der Hebel mit dem besten Verhältnis von Aufwand zu Wirkung.",
        ],
        bullets: [
          "Öffnungszeiten und Feiertage immer aktuell halten",
          "Regelmäßig frische Fotos hochladen, besonders vom Essen",
          "Die Speisekarte direkt im Profil hinterlegen",
          "Auf jede Bewertung freundlich antworten, auch auf kritische",
        ],
      },
      {
        heading: "Die eigene Website: der Ort, an dem der Gast bucht",
        paragraphs: [
          "Das Google-Profil bringt den Gast zu dir, die Website macht aus dem Interesse eine Buchung. Sie muss auf dem Handy blitzschnell laden und das Wichtigste sofort zeigen: Speisekarte, Öffnungszeiten, Anfahrt und eine einfache Möglichkeit, einen Tisch zu reservieren oder anzurufen. Alles, was einen hungrigen Menschen zum Suchen zwingt, kostet Reservierungen.",
          "Gerade Lieferdienste, Foodtrucks und kleinere Lokale unterschätzen oft, wie viel eine klare, schnelle Seite ausmacht. Sie ist außerdem die Basis dafür, dass Google und KI-Systeme wie ChatGPT deinen Betrieb korrekt verstehen und weiterempfehlen können.",
        ],
      },
      {
        heading: "Bewertungen sind die neue Mundpropaganda",
        paragraphs: [
          "Kaum jemand geht heute essen, ohne vorher kurz auf die Sterne zu schauen. Bewertungen wirken doppelt: Sie überzeugen unentschlossene Gäste und sie verbessern deine Position bei Google. Wichtig ist nicht nur die Menge, sondern auch, dass regelmäßig neue dazukommen und dass du darauf reagierst.",
          "Der einfachste Weg zu mehr Bewertungen ist, aktiv danach zu fragen: ein kleiner Hinweis auf dem Kassenbon, ein QR-Code am Tisch oder eine kurze Nachricht nach der Reservierung mit einem direkten Bewertungslink. Zufriedene Gäste bewerten gern, wenn man es ihnen leicht macht.",
        ],
      },
      {
        heading: "Wann sich Werbung lohnt",
        paragraphs: [
          "Wenn die Grundlagen stehen, kann bezahlte Werbung den Umschwung beschleunigen, etwa Google Ads für Suchbegriffe mit klarer Absicht oder Anzeigen auf Instagram und Facebook für ein neues Menü oder einen Brunch. Sinnvoll ist das aber erst, wenn Profil und Website überzeugen, denn Werbung verstärkt nur, was schon da ist. Auf ein schwaches Fundament Geld zu werfen, bringt selten etwas.",
        ],
      },
    ],
    faqs: [
      {
        q: "Was ist wichtiger für ein Restaurant, die Website oder Google?",
        a: "Beides zusammen. Das Google-Unternehmensprofil ist meist der erste Kontakt und entscheidet über die Sichtbarkeit in der Nähe-Suche. Die Website ist der Ort, an dem der Gast dann reserviert oder anruft. Am stärksten wirkt es, wenn beides gepflegt ist und aufeinander abgestimmt.",
      },
      {
        q: "Wie bekomme ich mehr Google-Bewertungen für mein Lokal?",
        a: "Frag aktiv danach und mach es den Gästen leicht: ein QR-Code am Tisch oder auf dem Kassenbon, der direkt zum Bewertungsformular führt, wirkt am besten. Antworte außerdem auf jede Bewertung, das erhöht die Wahrscheinlichkeit weiterer Bewertungen.",
      },
      {
        q: "Lohnt sich eine eigene Website, wenn ich schon bei Lieferdiensten gelistet bin?",
        a: "Ja. Auf Lieferplattformen zahlst du hohe Provisionen und der Gast gehört der Plattform, nicht dir. Eine eigene, schnelle Website mit Reservierung und Direktbestellung macht dich unabhängiger und ist die Basis dafür, dass Google und KI-Systeme dich korrekt anzeigen.",
      },
    ],
    related: [
      { label: "Website für Restaurants", href: "/webseite-fuer-restaurant" },
      { label: "Website für Pizzerien", href: "/webseite-fuer-pizzeria" },
      { label: "Website für Cafés", href: "/webseite-fuer-cafe" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "kunden-gewinnen-handwerk",
    category: "Branchen",
    title: "Kunden gewinnen als Handwerksbetrieb: der Praxis-Leitfaden",
    metaTitle: "Kunden gewinnen als Handwerker: der Praxis-Leitfaden | Ratgeber",
    description:
      "Wie Handwerksbetriebe online neue Kunden gewinnen: Website, lokale Google-Sichtbarkeit, Bewertungen und die richtige Anfrage-Strecke.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "7 Min.",
    intro: [
      "Viele Handwerksbetriebe leben seit Jahren von Empfehlungen und haben nie Werbung gebraucht. Trotzdem verändert sich der Markt: Auch wer eine Empfehlung bekommt, googelt heute erst einmal den Namen, bevor er anruft. Findet er dann nichts oder nur einen veralteten Auftritt, entsteht Zweifel, und der Anruf bleibt aus.",
      "Gleichzeitig suchen immer mehr Menschen direkt online nach einem Betrieb in ihrer Nähe. Dieser Leitfaden zeigt, wie ein Handwerksbetrieb diese Anfragen zuverlässig abholt, ohne dabei die Stammkundschaft aus dem Blick zu verlieren.",
    ],
    sections: [
      {
        heading: "In der Nähe gefunden werden: lokale Sichtbarkeit",
        paragraphs: [
          "Wenn jemand Elektriker Hainburg oder Gebäudereinigung Frankfurt sucht, entscheidet die lokale Suche bei Google darüber, wer den Auftrag bekommt. Zwei Dinge zahlen darauf ein: ein vollständiges Google-Unternehmensprofil und eine Website, die eindeutig sagt, was du machst und wo du tätig bist.",
          "Trage überall dieselben Kontaktdaten ein, exakt gleich geschrieben: Name, Adresse und Telefonnummer. Diese Konsistenz über Website, Google und Branchenverzeichnisse hinweg ist einer der wichtigsten Faktoren für gute lokale Platzierungen.",
        ],
      },
      {
        heading: "Die Website muss Vertrauen schaffen und den Anruf leicht machen",
        paragraphs: [
          "Ein potenzieller Kunde entscheidet in wenigen Sekunden, ob ein Betrieb seriös wirkt. Echte Fotos von der Arbeit und vom Team, klar benannte Leistungen, das Einsatzgebiet und sichtbare Bewertungen schaffen dieses Vertrauen schneller als jeder Werbespruch.",
          "Genauso wichtig ist, dass die Kontaktaufnahme kinderleicht ist. Die Telefonnummer gehört gut sichtbar nach oben, auf dem Handy als anklickbarer Button. Ein kurzes Anfrageformular und ein WhatsApp-Kontakt fangen die Interessenten ab, die lieber schreiben als anrufen.",
        ],
        bullets: [
          "Telefonnummer oben, auf dem Handy direkt anklickbar",
          "Leistungen und Einsatzgebiet klar benennen",
          "Echte Fotos statt Stockbilder",
          "Kurzes Anfrageformular, das zuverlässig ankommt",
        ],
      },
      {
        heading: "Bewertungen entscheiden den Auftrag",
        paragraphs: [
          "Beim Handwerk geht es um Vertrauen, und Bewertungen sind der schnellste Vertrauensbeweis. Ein Betrieb mit vielen aktuellen, guten Bewertungen wird deutlich häufiger angerufen als einer ohne, selbst bei gleicher Qualität der Arbeit.",
          "Mach es dir zur Gewohnheit, nach jedem erledigten Auftrag um eine kurze Bewertung zu bitten. Ein direkter Link per WhatsApp oder auf der Rechnung senkt die Hürde. So wächst deine Reputation stetig, statt zufällig.",
        ],
      },
      {
        heading: "Anfragen dürfen nicht verloren gehen",
        paragraphs: [
          "Der beste Auftritt nützt nichts, wenn Anfragen im Postfach untergehen. Eine saubere Anfrage-Strecke sorgt dafür, dass jede Anfrage sofort ankommt, idealerweise gleichzeitig per E-Mail und in einer einfachen Übersicht, damit nichts vergessen wird. Wer schnell zurückruft, gewinnt den Auftrag oft schon allein durch das Tempo.",
        ],
      },
    ],
    faqs: [
      {
        q: "Brauche ich als Handwerker überhaupt eine Website, wenn ich von Empfehlungen lebe?",
        a: "Ja, gerade dann. Wer eine Empfehlung bekommt, prüft dich heute trotzdem online, bevor er anruft. Ohne aktuellen Auftritt entsteht Zweifel. Eine Website bestätigt die Empfehlung und fängt zusätzlich die vielen Menschen ab, die direkt online nach einem Betrieb suchen.",
      },
      {
        q: "Wie werde ich bei Google in meiner Region gefunden?",
        a: "Durch ein vollständiges Google-Unternehmensprofil, eine Website, die Leistung und Einsatzgebiet klar benennt, und einheitliche Kontaktdaten über alle Plattformen hinweg. Regelmäßige, gute Bewertungen verstärken die lokale Platzierung zusätzlich.",
      },
      {
        q: "Was bringt schneller neue Aufträge, SEO oder Werbung?",
        a: "Werbung wie Google Ads bringt sofort Anfragen, kostet aber laufend Geld. Lokale Suchmaschinenoptimierung wirkt langsamer, dafür nachhaltig und ohne Klickkosten. In der Praxis ist oft eine Kombination sinnvoll: Ads für den schnellen Start, SEO für die dauerhafte Sichtbarkeit.",
      },
    ],
    related: [
      { label: "Website für Elektriker", href: "/elektriker" },
      { label: "Website für Schweißer", href: "/webseite-fuer-schweisser" },
      { label: "Website für Hausmeisterservice", href: "/webseite-fuer-hausmeisterservice" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "auftraege-gebaeudereinigung",
    category: "Branchen",
    title: "Mehr Aufträge für die Gebäudereinigung: online neue Kunden finden",
    metaTitle: "Mehr Aufträge für die Gebäudereinigung online | Ratgeber",
    description:
      "Wie Gebäudereiniger online planbar neue Auftraggeber gewinnen: lokale Sichtbarkeit, überzeugende Website, Bewertungen und der Weg zu Gewerbekunden mit Rahmenverträgen.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Die Gebäudereinigung ist ein hart umkämpfter Markt, und viele Aufträge, besonders die lukrativen mit Gewerbekunden und Rahmenverträgen, werden heute online angebahnt. Hausverwaltungen, Büros und Praxen suchen ihren Dienstleister zunehmend über Google, statt in die Zeitung zu schauen.",
      "Wer hier sichtbar ist und einen professionellen Eindruck macht, kommt an genau die Anfragen, die sich lohnen. Dieser Leitfaden zeigt, worauf es ankommt.",
    ],
    sections: [
      {
        heading: "Für die richtigen Suchbegriffe sichtbar sein",
        paragraphs: [
          "Auftraggeber suchen selten allgemein, sondern konkret: Gebäudereinigung Frankfurt, Büroreinigung in der Nähe oder Unterhaltsreinigung Rhein-Main. Deine Website und dein Google-Profil sollten genau diese Leistungen und Regionen klar benennen, damit du bei diesen Suchen erscheinst.",
          "Wichtig ist, die einzelnen Leistungen sauber zu trennen: Unterhaltsreinigung, Grundreinigung, Fensterreinigung, Bauendreinigung. Je klarer eine Seite eine bestimmte Leistung bedient, desto besser findet Google sie und desto passender ist die Anfrage.",
        ],
      },
      {
        heading: "Seriosität sichtbar machen",
        paragraphs: [
          "Gewerbliche Auftraggeber vergeben Reinigungsaufträge oft langfristig und achten deshalb genau auf Seriosität. Eine professionelle Website mit echten Referenzen, klar benannten Leistungen, Angaben zu Versicherung und Zuverlässigkeit sowie sichtbaren Bewertungen hebt dich von Anbietern ab, die nur mit dem Preis werben.",
          "Zeig, dass du auch größere Objekte zuverlässig betreust. Referenzen von Büros, Praxen oder Wohnanlagen wirken bei Entscheidern stärker als jede Selbstbeschreibung.",
        ],
      },
      {
        heading: "Bewertungen und Empfehlungen gezielt aufbauen",
        paragraphs: [
          "Auch im B2B-Geschäft schauen Entscheider auf Bewertungen. Ein Betrieb mit vielen positiven Rückmeldungen wirkt verlässlich und wird eher zur Angebotsabgabe eingeladen. Bitte zufriedene Auftraggeber aktiv um eine kurze Bewertung, am besten mit einem direkten Link, der die Sache in einer Minute erledigt.",
        ],
      },
      {
        heading: "Anfragen schnell und professionell bearbeiten",
        paragraphs: [
          "Gerade bei Gewerbeanfragen zählt Reaktionsgeschwindigkeit. Wer innerhalb weniger Stunden ein sauberes Angebot liefert, während die Konkurrenz Tage braucht, gewinnt den Auftrag oft allein dadurch. Eine zuverlässige Anfrage-Strecke, bei der jede Anfrage sofort ankommt, ist deshalb bares Geld wert.",
        ],
      },
    ],
    faqs: [
      {
        q: "Wie komme ich als Gebäudereiniger an Gewerbekunden?",
        a: "Über gezielte lokale Sichtbarkeit für Begriffe wie Büroreinigung oder Gebäudereinigung plus Ort, eine seriöse Website mit Referenzen und schnelle, professionelle Angebote. Gewerbliche Auftraggeber suchen zunehmend online und achten stark auf einen vertrauenswürdigen Auftritt.",
      },
      {
        q: "Sollte ich jede Reinigungsleistung einzeln auf der Website darstellen?",
        a: "Ja. Wenn Unterhaltsreinigung, Grundreinigung, Fenster- und Bauendreinigung jeweils klar beschrieben sind, findet Google die passende Seite zur jeweiligen Suche besser und die eingehenden Anfragen sind konkreter und passender.",
      },
      {
        q: "Wie wichtig sind Bewertungen im B2B-Geschäft?",
        a: "Sehr wichtig. Auch Entscheider in Hausverwaltungen und Unternehmen prüfen Bewertungen, bevor sie einen Dienstleister zur Angebotsabgabe einladen. Regelmäßige, gute Bewertungen erhöhen deine Chancen deutlich.",
      },
    ],
    related: [
      { label: "Website für Gebäudereinigung", href: "/webseite-fuer-gebaeudereinigung" },
      { label: "Website für Hausmeisterservice", href: "/webseite-fuer-hausmeisterservice" },
      { label: "Lokale Suchmaschinenoptimierung", href: "/kostenlose-analyse" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GRUNDLAGEN & VERGLEICHE
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "ki-suche-google-2026",
    category: "Grundlagen",
    title: "KI-Suche und Google 2026: So wird dein Betrieb jetzt gefunden",
    metaTitle: "KI-Suche & Google 2026: so wirst du gefunden | Ratgeber",
    description:
      "Wie kleine Betriebe 2026 über Google UND KI wie ChatGPT und Perplexity gefunden werden: Was sich in der Suche ändert und was du konkret tun musst.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "7 Min.",
    intro: [
      "Die Art, wie Menschen online nach Anbietern suchen, verändert sich gerade so stark wie seit Jahren nicht. Neben der klassischen Google-Liste geben immer mehr Menschen ihre Frage direkt in ChatGPT, Perplexity oder die KI-Übersicht von Google ein und bekommen eine fertige Antwort, oft mit einer konkreten Empfehlung.",
      "Für kleine Betriebe ist das Chance und Risiko zugleich: Wer von diesen KI-Systemen als Quelle genannt wird, gewinnt Kunden, die die Konkurrenz nie zu Gesicht bekommt. Wer unsichtbar bleibt, verliert sie genauso lautlos. Dieser Artikel zeigt, worauf es 2026 ankommt.",
    ],
    sections: [
      {
        heading: "Was sich in der Suche gerade ändert",
        paragraphs: [
          "Früher tippte man einen Suchbegriff bei Google ein und wählte aus einer Liste von Links. Heute beantworten KI-Systeme die Frage oft direkt: Die KI-Übersicht steht ganz oben in den Google-Ergebnissen, und Werkzeuge wie ChatGPT oder Perplexity nennen auf Wunsch gleich einen passenden Anbieter samt Begründung.",
          "Das heißt nicht, dass klassisches Google verschwindet. Aber es kommt eine zweite Ebene dazu: Es reicht nicht mehr nur, in der Linkliste zu erscheinen. Du musst auch die Quelle sein, aus der die KI ihre Antwort zieht.",
        ],
      },
      {
        heading: "Was das für kleine Betriebe bedeutet",
        paragraphs: [
          "Wenn jemand die KI fragt Welche Werbeagentur im Rhein-Main-Gebiet macht Websites für Handwerker, dann empfiehlt die KI die Betriebe, die sie versteht und für vertrauenswürdig hält. Diese Empfehlung ersetzt für viele Menschen die eigene Recherche.",
          "Der entscheidende Punkt: KI-Systeme können nur empfehlen, was sie sauber lesen und einordnen können. Ein veralteter oder technisch unklarer Auftritt taucht in diesen Antworten schlicht nicht auf, egal wie gut die eigentliche Arbeit ist.",
        ],
      },
      {
        heading: "Wie du bei Google UND KI gefunden wirst",
        paragraphs: [
          "Die gute Nachricht: Die Grundlagen für gutes Google-Ranking und für KI-Sichtbarkeit überschneiden sich stark. Wer sauber aufgestellt ist, gewinnt auf beiden Ebenen.",
        ],
        bullets: [
          "Klare, verständliche Inhalte, die echte Fragen direkt beantworten",
          "Strukturierte Daten, damit Maschinen Leistungen und Standort sicher erkennen",
          "Ein vollständiges, gepflegtes Google-Unternehmensprofil",
          "Viele aktuelle Bewertungen als Vertrauenssignal",
          "Einheitliche Kontaktdaten über Website, Google und Verzeichnisse",
          "Eine schnelle, auf dem Handy einwandfreie Website",
        ],
      },
      {
        heading: "Inhalte, die von KI zitiert werden",
        paragraphs: [
          "KI-Systeme lieben Inhalte, die eine konkrete Frage klar und vollständig beantworten. Genau deshalb sind ein Ratgeber-Bereich und ausführliche Antworten auf häufige Fragen so wertvoll: Sie sind das Material, aus dem die KI ihre Empfehlungen baut.",
          "Wichtig ist Regelmäßigkeit und thematische Tiefe. Wer zu seinem Fachgebiet immer wieder hilfreiche Inhalte veröffentlicht, wird von den Systemen mit der Zeit als Autorität für dieses Thema eingeordnet und häufiger genannt.",
        ],
      },
      {
        heading: "Der Vorsprung liegt im Handeln jetzt",
        paragraphs: [
          "KI-Suche ist noch jung, und die meisten kleinen Betriebe haben sich darauf nicht eingestellt. Genau darin liegt die Chance: Wer heute die Grundlagen sauber legt, sichert sich einen Vorsprung, den Nachzügler später nur schwer aufholen. Sichtbarkeit baut sich über Zeit auf, deshalb zahlt sich jeder frühe Schritt später doppelt aus.",
        ],
      },
    ],
    faqs: [
      {
        q: "Ersetzt die KI-Suche das klassische Google?",
        a: "Nein, sie ergänzt es. Google bleibt wichtig, aber KI-Übersichten und Werkzeuge wie ChatGPT oder Perplexity kommen als zusätzliche Ebene dazu. Wer beide bedienen will, braucht saubere Inhalte und eine technisch klare Website, denn die Grundlagen sind für beide fast identisch.",
      },
      {
        q: "Wie werde ich von ChatGPT oder Perplexity empfohlen?",
        a: "Indem deine Website leicht lesbar und vertrauenswürdig ist: klare Inhalte, die echte Fragen beantworten, strukturierte Daten, ein gepflegtes Google-Profil, gute Bewertungen und einheitliche Kontaktdaten. So kann die KI dich sicher erkennen, einordnen und als Quelle nennen.",
      },
      {
        q: "Verliere ich Besucher, wenn die KI die Antwort direkt zeigt?",
        a: "Manche Informationssuchen enden künftig ohne Klick. Aber wer als empfohlener Anbieter genannt wird, bekommt genau die Menschen mit Kaufabsicht. Entscheidend ist deshalb, nicht nur gefunden, sondern als konkrete Empfehlung genannt zu werden.",
      },
    ],
    related: [
      { label: "SEO oder Google Ads?", href: "/ratgeber/seo-oder-google-ads" },
      { label: "Was bringt eine professionelle Website?", href: "/ratgeber/professionelle-website-vorteile" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "seo-oder-google-ads",
    category: "Grundlagen",
    title: "SEO oder Google Ads: was lohnt sich für kleine Unternehmen?",
    metaTitle: "SEO oder Google Ads: was lohnt sich? Vergleich | Ratgeber",
    description:
      "SEO oder Google Ads für kleine Unternehmen? Der ehrliche Vergleich: Kosten, Geschwindigkeit, Nachhaltigkeit und wann sich welcher Weg lohnt.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Wer online mehr Kunden gewinnen will, stößt schnell auf zwei Wege: bei Google ganz oben in den bezahlten Anzeigen erscheinen (Google Ads) oder durch Suchmaschinenoptimierung (SEO) in den normalen, unbezahlten Ergebnissen nach oben kommen. Beide führen zum Ziel, funktionieren aber völlig unterschiedlich.",
      "Die Frage ist nicht, welcher Weg grundsätzlich besser ist, sondern welcher zu deiner Situation passt. Dieser Vergleich hilft bei der Entscheidung.",
    ],
    sections: [
      {
        heading: "Google Ads: schnell, aber laufende Kosten",
        paragraphs: [
          "Mit Google Ads stehst du innerhalb weniger Stunden ganz oben, für genau die Suchbegriffe, die du wählst. Das ist der große Vorteil: sofortige Sichtbarkeit und planbare Anfragen. Du zahlst pro Klick, und sobald du das Budget abschaltest, verschwindet die Sichtbarkeit wieder.",
          "Google Ads eignet sich besonders, wenn du schnell Anfragen brauchst, ein neues Angebot testen willst oder in einem umkämpften Markt kurzfristig sichtbar sein musst. Der Erfolg steht und fällt aber mit der richtigen Einrichtung, sonst verbrennt man Budget für Klicks, die nichts bringen.",
        ],
      },
      {
        heading: "SEO: langsamer, dafür nachhaltig",
        paragraphs: [
          "Suchmaschinenoptimierung bringt dich in die unbezahlten Ergebnisse. Das dauert seine Zeit, wirkt dafür aber dauerhaft und ohne Klickkosten. Eine Seite, die für einen wichtigen Suchbegriff gut platziert ist, bringt über Monate und Jahre immer wieder Anfragen, ohne dass jeder Besucher extra kostet.",
          "Gerade für lokale Betriebe ist SEO stark, weil die Konkurrenz vor Ort meist überschaubar ist. Wer sein Google-Profil und seine Website konsequent pflegt, kann in der eigenen Region dauerhaft ganz vorn stehen.",
        ],
      },
      {
        heading: "Der direkte Vergleich",
        paragraphs: [
          "Kurz zusammengefasst unterscheiden sich beide Wege vor allem in Geschwindigkeit, Kostenstruktur und Haltbarkeit der Wirkung.",
        ],
        bullets: [
          "Geschwindigkeit: Ads wirken sofort, SEO braucht Wochen bis Monate",
          "Kosten: Ads kosten pro Klick laufend, SEO vor allem einmalig plus Pflege",
          "Nachhaltigkeit: Ads-Sichtbarkeit endet mit dem Budget, SEO wirkt weiter",
          "Vertrauen: Viele Nutzer klicken lieber auf unbezahlte Ergebnisse",
        ],
      },
      {
        heading: "Die beste Antwort ist meist die Kombination",
        paragraphs: [
          "In der Praxis ist es selten ein Entweder-oder. Ein bewährter Weg ist, mit Google Ads schnell die ersten Anfragen zu holen und parallel die Grundlage für gute unbezahlte Platzierungen zu legen. Sobald SEO greift, kann das Werbebudget sinken, weil ein Teil der Anfragen dann kostenlos über die Suche kommt.",
          "Wichtig ist, beides auf ein solides Fundament zu stellen: eine schnelle, überzeugende Website. Ohne die verpufft sowohl das Werbebudget als auch die SEO-Arbeit, weil die Besucher zwar kommen, aber nicht zu Kunden werden.",
        ],
      },
    ],
    faqs: [
      {
        q: "Was ist günstiger, SEO oder Google Ads?",
        a: "Langfristig ist SEO meist günstiger, weil keine Kosten pro Klick anfallen. Google Ads verursacht laufende Kosten, liefert dafür aber sofort Ergebnisse. Kurzfristig ist Ads schneller, langfristig ist SEO wirtschaftlicher.",
      },
      {
        q: "Wie lange dauert es, bis SEO wirkt?",
        a: "Das hängt vom Wettbewerb ab. Bei lokalen Suchbegriffen sind oft schon nach einigen Wochen erste Verbesserungen sichtbar, spürbare Ergebnisse meist nach einigen Monaten. Werbung liefert dagegen sofort Anfragen und eignet sich gut, um diese Anfangszeit zu überbrücken.",
      },
      {
        q: "Kann ich mit beidem gleichzeitig starten?",
        a: "Ja, und oft ist genau das der beste Weg. Google Ads bringt die schnellen Anfragen, SEO baut parallel die dauerhafte Sichtbarkeit auf. Voraussetzung ist eine gute Website, auf der die Besucher tatsächlich zu Anfragen werden.",
      },
    ],
    related: [
      { label: "Google Ads Betreuung", href: "/google-ads" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
      { label: "Was bringt eine professionelle Website?", href: "/ratgeber/professionelle-website-vorteile" },
    ],
  },

  {
    slug: "website-selbst-oder-agentur",
    category: "Grundlagen",
    title: "Website selbst bauen oder Agentur beauftragen? Eine ehrliche Entscheidungshilfe",
    metaTitle: "Website selbst bauen oder Agentur? Entscheidungshilfe | Ratgeber",
    description:
      "Baukasten selbst nutzen oder Agentur beauftragen? Der ehrliche Vergleich für kleine Betriebe: Kosten, Zeit, Ergebnis und wann sich was lohnt.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Eine Website muss her, und sofort stellt sich die Frage: selbst machen mit einem Baukasten oder eine Agentur beauftragen? Beide Wege haben ihre Berechtigung, und die richtige Antwort hängt weniger vom Budget ab als davon, was die Website leisten soll und wie viel Zeit du hast.",
      "Dieser Beitrag vergleicht beide Wege ehrlich, inklusive der Punkte, die in Werbeversprechen gern verschwiegen werden.",
    ],
    sections: [
      {
        heading: "Der Baukasten: günstig im Preis, teuer an Zeit",
        paragraphs: [
          "Baukastensysteme werben mit einer Website in wenigen Minuten. Für einen einfachen Auftritt kann das reichen, und die monatlichen Kosten sind niedrig. Der Haken liegt woanders: Ein wirklich gutes Ergebnis kostet viele Stunden Einarbeitung, und diese Zeit fehlt im Betrieb.",
          "Dazu kommt, dass Baukasten-Seiten technisch oft nicht optimal sind: langsamere Ladezeiten, eingeschränkte Möglichkeiten bei der Suchmaschinenoptimierung und ein Design, das man vielen anderen Seiten ansieht. Für einen reinen Steckbrief ist das in Ordnung, für ein aktives Werkzeug zur Kundengewinnung selten.",
        ],
      },
      {
        heading: "Die Agentur: mehr Investition, dafür ein Werkzeug",
        paragraphs: [
          "Eine Agentur kostet mehr als ein Baukasten, liefert dafür aber ein Ergebnis, das auf Kundengewinnung ausgelegt ist: ein individuelles Design, das zu deiner Marke passt, technisch schnell und für Google optimiert, mit durchdachten Wegen zur Kontaktaufnahme. Und vor allem: Du musst dich um nichts kümmern und gewinnst deine Zeit für dein eigentliches Geschäft zurück.",
          "Der eigentliche Unterschied ist nicht die Optik, sondern das Ergebnis. Eine gut gemachte Website bringt Anfragen. Eine schnell selbstgebaute steht meist nur da. Bei einer professionellen Umsetzung sollte außerdem von Anfang an mitgedacht werden, wie die Seite bei Google und in KI-Systemen gefunden wird.",
        ],
      },
      {
        heading: "Die versteckten Kosten des Selbermachens",
        paragraphs: [
          "Selbst bauen ist selten wirklich kostenlos. Neben der Zeit kommen oft Kosten für Vorlagen, zusätzliche Funktionen, Bildlizenzen und Rechtssicherheit dazu. Und wenn die Seite am Ende keine Anfragen bringt, ist die eigentliche Rechnung der entgangene Umsatz, der viel höher liegt als jede Agenturrechnung.",
        ],
        bullets: [
          "Zeitaufwand für Einarbeitung und Pflege",
          "Zusatzkosten für Vorlagen, Funktionen und Bilder",
          "Rechtssicherheit (Impressum, Datenschutz) selbst verantworten",
          "Verlorene Anfragen, wenn die Seite nicht überzeugt",
        ],
      },
      {
        heading: "Was passt zu wem?",
        paragraphs: [
          "Ein Baukasten kann reichen, wenn du technisch fit bist, Zeit mitbringst und nur eine einfache Visitenkarte im Netz brauchst. Sobald die Website aktiv Kunden bringen soll, du deine Zeit lieber in dein Geschäft steckst oder Wert auf einen professionellen Eindruck legst, ist die Agentur meist die wirtschaftlichere Wahl, weil sie sich über die zusätzlichen Anfragen bezahlt macht.",
        ],
      },
    ],
    faqs: [
      {
        q: "Ist eine selbst gebaute Website schlechter für Google?",
        a: "Nicht zwangsläufig, aber Baukastensysteme sind technisch oft eingeschränkt, etwa bei Ladezeit und den Möglichkeiten der Suchmaschinenoptimierung. Eine professionell gebaute Seite lässt sich gezielter für gute Platzierungen und für KI-Systeme optimieren.",
      },
      {
        q: "Lohnt sich eine Agentur für einen kleinen Betrieb überhaupt?",
        a: "Wenn die Website Anfragen bringen soll, meist ja. Schon wenige zusätzliche Aufträge im Jahr decken die Kosten. Der größte Gewinn ist oft die gesparte Zeit, die du sonst in Einarbeitung und Pflege stecken würdest.",
      },
      {
        q: "Kann ich später von einem Baukasten zu einer Agentur wechseln?",
        a: "Ja, das ist jederzeit möglich. Häufig wird eine bestehende Seite dabei neu und sauber aufgebaut, weil sich Baukasten-Inhalte nicht eins zu eins übernehmen lassen. Der Umstieg lohnt sich meist genau dann, wenn die bisherige Seite zu wenig Anfragen bringt.",
      },
    ],
    related: [
      { label: "Was bringt eine professionelle Website?", href: "/ratgeber/professionelle-website-vorteile" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
      { label: "Grafik- & Corporate Design", href: "/grafikdesign" },
    ],
  },

  {
    slug: "professionelle-website-vorteile",
    category: "Grundlagen",
    title: "Was bringt eine professionelle Website wirklich?",
    metaTitle: "Was bringt eine professionelle Website wirklich? | Ratgeber",
    description:
      "Lohnt sich eine professionelle Website für kleine Betriebe? Was sie bringt: mehr Anfragen, Vertrauen, Sichtbarkeit bei Google und KI.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "5 Min.",
    intro: [
      "Braucht mein Betrieb wirklich eine gute Website, oder reicht ein Eintrag bei Google und ein bisschen Social Media? Diese Frage stellen sich viele Selbstständige, und die ehrliche Antwort lautet: Eine professionelle Website ist selten Selbstzweck, aber sie ist der Punkt, an dem aus Interesse ein Auftrag wird.",
      "Was sie konkret bringt, lässt sich an fünf Punkten festmachen.",
    ],
    sections: [
      {
        heading: "Sie verwandelt Interesse in Anfragen",
        paragraphs: [
          "Egal ob jemand über Google, eine Empfehlung oder Social Media auf dich aufmerksam wird: Am Ende landet er auf deiner Website, und dort entscheidet sich, ob er anfragt. Eine gute Seite führt den Besucher klar zum nächsten Schritt, ob Anruf, Formular oder WhatsApp. Eine schlechte oder fehlende Seite lässt genau diese Interessenten wieder abspringen.",
        ],
      },
      {
        heading: "Sie schafft Vertrauen",
        paragraphs: [
          "Ein professioneller Auftritt signalisiert in Sekunden, dass hinter dem Betrieb jemand steckt, der seine Sache ernst nimmt. Echte Fotos, klare Leistungen und sichtbare Bewertungen wirken stärker als jedes Versprechen. Gerade wenn Kunden zwischen mehreren Anbietern wählen, gibt dieser erste Eindruck oft den Ausschlag.",
        ],
      },
      {
        heading: "Sie macht dich bei Google und KI auffindbar",
        paragraphs: [
          "Eine technisch saubere Website ist die Voraussetzung dafür, dass Google und zunehmend auch KI-Systeme wie ChatGPT oder Perplexity deinen Betrieb verstehen und weiterempfehlen können. Mit strukturierten Daten und klaren Inhalten wird aus der Website eine Quelle, die diese Systeme zitieren, wenn jemand nach einem Anbieter wie dir fragt.",
        ],
      },
      {
        heading: "Sie macht dich unabhängig von Plattformen",
        paragraphs: [
          "Wer nur auf Social Media oder Lieferplattformen setzt, ist von deren Regeln und Provisionen abhängig. Deine eigene Website gehört dir. Sie ist der einzige Kanal, den dir niemand wegnehmen oder von heute auf morgen ändern kann, und damit das stabile Fundament deiner Online-Präsenz.",
        ],
      },
      {
        heading: "Sie spart dir Zeit",
        paragraphs: [
          "Eine gute Website beantwortet die immer gleichen Fragen von selbst: Was bietet ihr an, was kostet es ungefähr, wie erreiche ich euch, wann habt ihr geöffnet. Das reduziert Rückfragen und sorgt dafür, dass die Anfragen, die kommen, besser vorqualifiziert sind.",
        ],
      },
    ],
    faqs: [
      {
        q: "Reicht nicht ein Google-Eintrag und Instagram?",
        a: "Als Ergänzung sind beide wertvoll, aber sie ersetzen keine Website. Google und Social Media machen auf dich aufmerksam, die Website ist der Ort, an dem daraus eine Anfrage wird, und der einzige Kanal, der wirklich dir gehört und nicht der Plattform.",
      },
      {
        q: "Bringt eine Website auch etwas, wenn ich vor allem von Empfehlungen lebe?",
        a: "Ja. Empfohlene Kunden prüfen dich heute fast immer erst online. Eine professionelle Website bestätigt die Empfehlung und verhindert Zweifel. Ohne sie geht ein Teil der empfohlenen Interessenten wieder verloren.",
      },
      {
        q: "Was unterscheidet eine professionelle von einer einfachen Website?",
        a: "Eine professionelle Website ist auf Kundengewinnung ausgelegt: schnell, für Handy und Google optimiert, mit klarer Führung zur Kontaktaufnahme, echten Inhalten und sauberer Technik. Eine einfache Seite ist oft nur ein digitaler Steckbrief, der da ist, aber wenig bewirkt.",
      },
    ],
    related: [
      { label: "Website selbst bauen oder Agentur?", href: "/ratgeber/website-selbst-oder-agentur" },
      { label: "SEO oder Google Ads?", href: "/ratgeber/seo-oder-google-ads" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "lokale-seo-google-maps",
    category: "Grundlagen",
    title: "Lokale SEO: so kommt dein Betrieb bei Google und auf der Karte nach oben",
    metaTitle: "Lokale SEO: bei Google & auf der Karte nach oben | Ratgeber",
    description:
      "Lokale SEO für kleine Betriebe: Wie du in der Nähe-Suche und auf Google Maps ganz oben erscheinst – Google-Profil, NAP-Daten, Bewertungen und lokale Inhalte erklärt.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "7 Min.",
    intro: [
      "Wenn jemand in deiner Nähe nach einem Betrieb wie deinem sucht, entscheiden wenige Zeilen bei Google darüber, wer den Auftrag bekommt: die drei Einträge, die zusammen mit der Karte ganz oben erscheinen. Dieses sogenannte lokale Dreier-Paket bekommt mit Abstand die meisten Klicks und Anrufe. Wer dort steht, gewinnt, wer darunter landet, wird oft gar nicht mehr gesehen.",
      "Dort hinzukommen ist kein Zufall, sondern das Ergebnis von lokaler Suchmaschinenoptimierung, kurz lokale SEO. Die gute Nachricht: Die wichtigsten Hebel kann jeder Betrieb selbst in die Hand nehmen. Dieser Leitfaden zeigt sie der Reihe nach.",
    ],
    sections: [
      {
        heading: "Das Google-Unternehmensprofil ist dein wichtigster Hebel",
        paragraphs: [
          "Für die lokale Suche ist das Google-Unternehmensprofil noch wichtiger als die Website. Es entscheidet darüber, ob du im Kartenausschnitt und im Dreier-Paket auftauchst. Damit das passiert, muss es vollständig und aktiv gepflegt sein: richtige Kategorie, alle Leistungen, korrekte Öffnungszeiten, Telefonnummer, Fotos und eine aussagekräftige Beschreibung.",
          "Google bevorzugt Profile, die lebendig wirken. Wer regelmäßig Fotos hochlädt, Beiträge veröffentlicht und auf Bewertungen antwortet, sendet das Signal eines aktiven Betriebs und wird dafür mit besserer Sichtbarkeit belohnt. Ein einmal angelegtes und dann vergessenes Profil verliert dagegen mit der Zeit an Boden.",
        ],
        bullets: [
          "Die passende Hauptkategorie wählen und alle Leistungen eintragen",
          "Öffnungszeiten inklusive Feiertagen aktuell halten",
          "Regelmäßig echte Fotos vom Betrieb und der Arbeit hochladen",
          "Auf jede Bewertung antworten, freundlich und zeitnah",
        ],
      },
      {
        heading: "Einheitliche Kontaktdaten: der unterschätzte Rankingfaktor",
        paragraphs: [
          "Einer der stärksten und zugleich am häufigsten übersehenen Faktoren für lokale SEO sind einheitliche Kontaktdaten. Name, Adresse und Telefonnummer, oft mit NAP abgekürzt, müssen überall exakt gleich geschrieben sein: auf der Website, im Google-Profil und in jedem Branchenverzeichnis.",
          "Schon kleine Abweichungen wie Straße gegen Str. oder eine alte Telefonnummer verwirren Google und schwächen das Vertrauen in deine Daten. Wer hier für saubere Konsistenz sorgt, verschafft sich einen Vorteil, den viele Mitbewerber schlicht liegen lassen.",
        ],
      },
      {
        heading: "Bewertungen entscheiden über deine Position",
        paragraphs: [
          "Anzahl, Bewertung und Aktualität der Google-Rezensionen zählen zu den wichtigsten Faktoren für die lokale Platzierung. Ein Betrieb mit vielen aktuellen, guten Bewertungen erscheint weiter oben und wird gleichzeitig häufiger angeklickt, weil die Sterne sofort Vertrauen schaffen.",
          "Entscheidend ist der stetige Fluss: Lieber jeden Monat ein paar neue Bewertungen als einmal zwanzig auf einen Schlag und danach jahrelang nichts. Bitte deine Kunden aktiv und mach es ihnen mit einem direkten Link so leicht wie möglich.",
        ],
      },
      {
        heading: "Deine Website muss den Ort kennen",
        paragraphs: [
          "Auch die Website zahlt auf die lokale Sichtbarkeit ein. Sie sollte klar benennen, welche Leistungen du an welchen Orten anbietest, statt nur allgemein von deinem Fach zu sprechen. Eine eigene Seite pro wichtiger Leistung und Region hilft Google, dich der richtigen Suche zuzuordnen.",
          "Wichtig sind außerdem strukturierte Daten, mit denen Adresse, Öffnungszeiten und Leistungen maschinenlesbar hinterlegt werden. So versteht nicht nur Google, sondern auch KI-Systeme wie ChatGPT deinen Standort korrekt und können dich für Suchen in deiner Region empfehlen.",
        ],
      },
      {
        heading: "Lokale SEO ist ein Marathon, kein Sprint",
        paragraphs: [
          "Lokale Sichtbarkeit baut sich über Wochen und Monate auf und bleibt dann stabil, ohne dass jeder Besucher Geld kostet. Genau das macht sie so wertvoll: Wer sein Profil, seine Bewertungen und seine Website konsequent pflegt, steht in der eigenen Region irgendwann dauerhaft vorn und wird von Nachzüglern nur schwer eingeholt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Was ist lokale SEO einfach erklärt?",
        a: "Lokale SEO umfasst alle Maßnahmen, mit denen ein Betrieb bei Suchen mit örtlichem Bezug besser gefunden wird, etwa Elektriker in der Nähe oder Friseur Hainburg. Ziel ist es, im lokalen Dreier-Paket mit der Karte und in den Ergebnissen der Umgebung ganz oben zu erscheinen.",
      },
      {
        q: "Wie komme ich in das lokale Dreier-Paket bei Google?",
        a: "Die wichtigsten Hebel sind ein vollständiges, aktiv gepflegtes Google-Unternehmensprofil, einheitliche Kontaktdaten über alle Plattformen hinweg, viele aktuelle Bewertungen und eine Website, die deine Leistungen und Orte klar benennt. Diese Faktoren zusammen entscheiden über die Platzierung.",
      },
      {
        q: "Wie lange dauert es, bis lokale SEO wirkt?",
        a: "Erste Verbesserungen sind oft schon nach wenigen Wochen sichtbar, vor allem nach dem Optimieren des Google-Profils. Eine stabile Top-Platzierung baut sich meist über einige Monate auf. Der Aufwand lohnt sich, weil die Wirkung anschließend dauerhaft und ohne Klickkosten anhält.",
      },
    ],
    related: [
      { label: "Google-Bewertungen: mehr Kunden gewinnen", href: "/ratgeber/google-bewertungen-mehr-kunden" },
      { label: "KI-Suche & Google 2026", href: "/ratgeber/ki-suche-google-2026" },
      { label: "SEO oder Google Ads?", href: "/ratgeber/seo-oder-google-ads" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "google-bewertungen-mehr-kunden",
    category: "Grundlagen",
    title: "Google-Bewertungen: warum sie über neue Kunden entscheiden und wie du mehr bekommst",
    metaTitle: "Google-Bewertungen: mehr Kunden gewinnen | Ratgeber",
    description:
      "Warum Google-Bewertungen über neue Kunden und deine Platzierung entscheiden – und wie du als kleiner Betrieb systematisch mehr echte Bewertungen bekommst.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Kaum jemand ruft heute einen Betrieb an, beauftragt einen Handwerker oder geht essen, ohne vorher kurz auf die Sterne zu schauen. Google-Bewertungen sind zur wichtigsten Form der Mundpropaganda geworden, und sie wirken doppelt: Sie überzeugen unentschlossene Interessenten und sie verbessern gleichzeitig deine Position bei Google.",
      "Trotzdem lassen viele Betriebe dieses Potenzial liegen, weil sie nicht aktiv nach Bewertungen fragen. Dabei ist genau das der Schlüssel. Dieser Leitfaden zeigt, warum Bewertungen so stark wirken und wie du systematisch mehr davon bekommst.",
    ],
    sections: [
      {
        heading: "Warum Bewertungen doppelt wirken",
        paragraphs: [
          "Der erste Effekt ist das Vertrauen: Ein Betrieb mit vielen guten Bewertungen wirkt sofort seriös, und die Entscheidung fällt zugunsten dessen, der die meisten überzeugenden Stimmen hat. Bei ansonsten ähnlichen Anbietern geben die Sterne oft den Ausschlag.",
          "Der zweite Effekt ist die Sichtbarkeit: Anzahl, Durchschnitt und Aktualität der Bewertungen zählen zu den wichtigsten Faktoren für die lokale Platzierung bei Google. Mehr gute Bewertungen bedeuten also nicht nur mehr Vertrauen, sondern auch, dass mehr Menschen dich überhaupt erst sehen.",
        ],
      },
      {
        heading: "Der wichtigste Schritt: aktiv danach fragen",
        paragraphs: [
          "Die meisten zufriedenen Kunden bewerten nicht von allein, nicht aus Unzufriedenheit, sondern weil sie nicht daran denken. Verärgerte Kunden dagegen werden oft von selbst aktiv. Wer nicht aktiv nach Bewertungen fragt, bekommt deshalb häufig ein verzerrtes, zu negatives Bild.",
          "Die Lösung ist einfach: Frag jeden zufriedenen Kunden im richtigen Moment um eine kurze Bewertung, direkt nach dem erledigten Auftrag, beim Bezahlen oder kurz danach. Genau dann ist die Zufriedenheit am größten und die Bereitschaft am höchsten.",
        ],
      },
      {
        heading: "Mach es dem Kunden so leicht wie möglich",
        paragraphs: [
          "Jede zusätzliche Hürde kostet Bewertungen. Niemand sucht dein Profil erst umständlich bei Google. Ein direkter Bewertungslink, der mit einem Klick genau zum Bewertungsfenster führt, ist deshalb der wirksamste Hebel überhaupt.",
          "Diesen Link kannst du überall einsetzen, wo du mit Kunden in Kontakt bist. Am besten funktioniert er dort, wo der Kunde ohnehin schon sein Handy in der Hand hat.",
        ],
        bullets: [
          "Direkten Bewertungslink per WhatsApp oder SMS nach dem Auftrag senden",
          "QR-Code auf Rechnung, Kassenbon oder am Tisch platzieren",
          "Link in die E-Mail-Signatur und die Auftragsbestätigung aufnehmen",
          "Freundlich und persönlich fragen, nicht automatisiert wirken",
        ],
      },
      {
        heading: "Auf Bewertungen antworten, auch auf kritische",
        paragraphs: [
          "Antworten zeigen, dass hinter dem Betrieb echte Menschen stehen, die ihre Kunden ernst nehmen. Bei positiven Bewertungen genügt ein kurzer, ehrlicher Dank. Wichtiger ist der Umgang mit Kritik: Eine sachliche, freundliche Antwort auf eine negative Bewertung wirkt auf mitlesende Interessenten oft überzeugender als die Kritik selbst.",
          "Google wertet das Antworten zudem als Zeichen eines aktiven Profils. Wer regelmäßig reagiert, stärkt damit indirekt auch seine Platzierung.",
        ],
      },
      {
        heading: "Echt bleiben: keine gekauften Bewertungen",
        paragraphs: [
          "Gekaufte oder gefälschte Bewertungen sind nicht nur gegen die Regeln von Google und können zur Löschung des Profils führen, sie fliegen auch schnell auf und beschädigen das Vertrauen dauerhaft. Der einzige tragfähige Weg sind echte Bewertungen von echten Kunden. Der wirkt dafür langfristig und lässt sich durch nichts ersetzen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Wie bekomme ich mehr Google-Bewertungen?",
        a: "Frag jeden zufriedenen Kunden aktiv im richtigen Moment und mach es ihm mit einem direkten Bewertungslink so leicht wie möglich, etwa per WhatsApp nach dem Auftrag oder über einen QR-Code auf der Rechnung. Regelmäßiges, freundliches Fragen ist der mit Abstand wirksamste Hebel.",
      },
      {
        q: "Beeinflussen Bewertungen wirklich mein Google-Ranking?",
        a: "Ja. Anzahl, Durchschnittsnote und Aktualität der Bewertungen gehören zu den wichtigsten Faktoren für die lokale Platzierung. Mehr aktuelle, gute Bewertungen verbessern also nicht nur das Vertrauen, sondern auch deine Sichtbarkeit in der Nähe-Suche.",
      },
      {
        q: "Wie soll ich auf eine schlechte Bewertung reagieren?",
        a: "Sachlich, freundlich und lösungsorientiert, ohne dich zu rechtfertigen oder emotional zu werden. Andere Interessenten lesen mit und achten mehr auf deine Reaktion als auf die Kritik selbst. Eine gute Antwort verwandelt eine negative Bewertung oft in einen Vertrauensbeweis.",
      },
    ],
    related: [
      { label: "Lokale SEO: bei Google nach oben", href: "/ratgeber/lokale-seo-google-maps" },
      { label: "KI-Suche & Google 2026", href: "/ratgeber/ki-suche-google-2026" },
      { label: "Was bringt eine professionelle Website?", href: "/ratgeber/professionelle-website-vorteile" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // REGIONAL
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "werbeagentur-rhein-main-finden",
    category: "Regional",
    title: "Werbeagentur im Rhein-Main-Gebiet finden: worauf du achten solltest",
    metaTitle: "Werbeagentur im Rhein-Main-Gebiet finden: Checkliste | Ratgeber",
    description:
      "Die richtige Werbeagentur im Rhein-Main-Gebiet finden: worauf kleine Betriebe achten sollten und woran du eine gute von einer schlechten erkennst.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Das Rhein-Main-Gebiet rund um Frankfurt, Offenbach und Hanau hat viele Agenturen, von der großen Full-Service-Agentur bis zum Ein-Mann-Freelancer. Für einen kleinen oder mittleren Betrieb ist die Auswahl deshalb gar nicht so einfach. Groß ist nicht automatisch gut, und günstig nicht automatisch schlecht.",
      "Diese Checkliste hilft dir, eine Agentur zu finden, die wirklich zu deinem Betrieb passt und dich weiterbringt.",
    ],
    sections: [
      {
        heading: "Versteht die Agentur kleine Betriebe?",
        paragraphs: [
          "Große Agenturen sind oft auf Konzernkunden ausgerichtet, mit entsprechenden Preisen und langen Abstimmungswegen. Für einen Handwerksbetrieb, ein Restaurant oder eine Praxis ist häufig eine Agentur besser, die genau diese Zielgruppe kennt und weiß, wie man mit überschaubarem Budget echte Anfragen erzeugt.",
          "Frag nach Referenzen aus deiner Branche oder von ähnlich großen Betrieben. Wer schon für vergleichbare Kunden gearbeitet hat, versteht deine Situation schneller.",
        ],
      },
      {
        heading: "Redet die Agentur über Ergebnisse oder nur über Design?",
        paragraphs: [
          "Eine schöne Website ist kein Selbstzweck. Eine gute Agentur spricht nicht nur über Optik, sondern über das Ziel dahinter: mehr Anfragen, mehr Aufträge, bessere Sichtbarkeit bei Google. Wenn im ersten Gespräch nur von Farben und Animationen die Rede ist, aber nie von Ergebnissen, ist das ein Warnsignal.",
        ],
      },
      {
        heading: "Ist alles aus einer Hand?",
        paragraphs: [
          "Website, Google-Sichtbarkeit, Werbung, Grafik und Printmaterial hängen zusammen. Eine Agentur, die all das aus einer Hand liefert, spart dir das Koordinieren mehrerer Dienstleister und sorgt dafür, dass dein Auftritt online wie offline dieselbe Sprache spricht, von der Website über die Google-Anzeige bis zur Visitenkarte.",
        ],
        bullets: [
          "Frag nach Referenzen aus deiner Branche",
          "Achte darauf, ob über Ergebnisse gesprochen wird, nicht nur über Optik",
          "Kläre, was genau im Preis enthalten ist",
          "Prüfe, ob Vertragsbindung und Kündigungsfristen fair sind",
          "Sieh dir die eigene Online-Präsenz der Agentur an",
        ],
      },
      {
        heading: "Sind die Konditionen fair und transparent?",
        paragraphs: [
          "Achte auf klare Preise ohne versteckte Kosten und auf faire Vertragsbedingungen. Lange Knebelverträge sind für einen kleinen Betrieb ein unnötiges Risiko. Eine Agentur, die von ihrer Arbeit überzeugt ist, braucht keine jahrelange Bindung, um Kunden zu halten.",
          "Ein einfacher, oft übersehener Test: Wie sieht die Agentur selbst online aus? Wer die eigene Website und den eigenen Google-Auftritt vernachlässigt, wird sich um deinen kaum besser kümmern.",
        ],
      },
    ],
    faqs: [
      {
        q: "Muss die Agentur bei mir in der Nähe sitzen?",
        a: "Nähe ist angenehm für persönliche Termine, aber kein Muss. Viel wichtiger ist, dass die Agentur deine Branche versteht und dich zuverlässig betreut. Vieles lässt sich heute problemlos aus der Ferne klären, und im Rhein-Main-Gebiet sind die Wege für einen Termin ohnehin kurz.",
      },
      {
        q: "Woran erkenne ich eine unseriöse Agentur?",
        a: "Warnsignale sind leere Versprechen wie Platz eins bei Google garantiert, fehlende Referenzen, unklare Preise, sehr lange Vertragsbindungen und eine Agentur, die selbst online schlecht auffindbar ist. Wer nur über Design redet und nie über messbare Ergebnisse, ist ebenfalls mit Vorsicht zu genießen.",
      },
      {
        q: "Was sollte im Angebot einer Agentur enthalten sein?",
        a: "Ein transparentes Angebot benennt klar, was geliefert wird, was es kostet und welche laufenden Kosten anfallen. Achte darauf, ob Punkte wie Suchmaschinenoptimierung, Pflege und Erreichbarkeit für Rückfragen enthalten sind oder extra berechnet werden.",
      },
    ],
    related: [
      { label: "Webdesign in Frankfurt & Umgebung", href: "/ratgeber/webdesign-frankfurt" },
      { label: "Google Ads Betreuung", href: "/google-ads" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "webdesign-frankfurt",
    category: "Regional",
    title: "Webdesign in Frankfurt und Umgebung: Leitfaden für lokale Betriebe",
    metaTitle: "Webdesign Frankfurt & Umgebung: Leitfaden für Betriebe | Ratgeber",
    description:
      "Webdesign für Betriebe in Frankfurt und im Rhein-Main-Gebiet: was eine gute lokale Website ausmacht und wie du damit mehr Kunden gewinnst.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Frankfurt und das umliegende Rhein-Main-Gebiet sind wirtschaftlich stark und entsprechend hart umkämpft. Für lokale Betriebe, ob Handwerk, Gastronomie oder Dienstleistung, ist eine gute Website deshalb kein Luxus, sondern die Basis, um in diesem Umfeld sichtbar zu bleiben und neue Kunden zu gewinnen.",
      "Was gutes Webdesign für einen lokalen Betrieb in dieser Region ausmacht, zeigt dieser Leitfaden.",
    ],
    sections: [
      {
        heading: "Lokale Website heißt: in der Region gefunden werden",
        paragraphs: [
          "Für einen lokalen Betrieb ist die wichtigste Aufgabe der Website, bei Suchen mit regionalem Bezug aufzutauchen, etwa Friseur Frankfurt Bornheim oder Elektriker Offenbach. Dafür muss die Seite klar benennen, was du anbietest und in welchen Orten du tätig bist, und technisch so gebaut sein, dass Google sie versteht und der lokalen Suche zuordnet.",
          "Ein gepflegtes Google-Unternehmensprofil, das eng mit der Website verzahnt ist, verstärkt diesen Effekt zusätzlich. Beides zusammen entscheidet darüber, ob du in der Region vor deinen Mitbewerbern erscheinst.",
        ],
      },
      {
        heading: "Schnell und für das Handy gemacht",
        paragraphs: [
          "Der Großteil der lokalen Suchen passiert unterwegs am Smartphone. Eine Website, die auf dem Handy langsam lädt oder unübersichtlich ist, verliert genau diese Besucher. Gutes Webdesign heißt heute zuerst: schnell und auf dem Handy einwandfrei bedienbar. Ladezeit und mobile Darstellung sind außerdem direkte Rankingfaktoren bei Google.",
        ],
      },
      {
        heading: "Design, das zur Region und zur Zielgruppe passt",
        paragraphs: [
          "Ein Auftritt, der zu einer Anwaltskanzlei im Frankfurter Bankenviertel passt, ist ein anderer als der für einen Handwerksbetrieb im Umland. Gutes Webdesign trifft den richtigen Ton für deine Zielgruppe: seriös, aber nahbar, professionell, aber verständlich. Wichtig sind echte Inhalte und Fotos aus deinem Betrieb statt austauschbarer Stockbilder, die man auf hundert anderen Seiten sieht.",
        ],
      },
      {
        heading: "Bereit für Google und KI",
        paragraphs: [
          "Modernes Webdesign denkt von Anfang an mit, wie eine Seite gefunden wird, nicht nur bei Google, sondern auch in KI-Systemen wie ChatGPT oder Perplexity, die immer häufiger konkrete Anbieter empfehlen. Strukturierte Daten, klare Inhalte und eine saubere technische Basis sorgen dafür, dass dein Betrieb korrekt verstanden und weiterempfohlen wird. Wer das früh berücksichtigt, hat einen Vorsprung vor Mitbewerbern, deren Seiten nur schön aussehen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Was kostet eine professionelle Website in Frankfurt?",
        a: "Das hängt stark vom Umfang ab, von der einfachen Präsenz bis zur umfangreichen Seite mit vielen Funktionen. Seriös lässt sich der Preis erst nach einem kurzen Gespräch über deine Ziele nennen. Wichtiger als der reine Preis ist, was die Website an Anfragen zurückbringt.",
      },
      {
        q: "Wie werde ich mit meiner Website in Frankfurt und Umgebung besser gefunden?",
        a: "Durch eine Seite, die deine Leistungen und Einsatzorte klar benennt, technisch schnell und für das Handy gemacht ist, kombiniert mit einem gepflegten Google-Unternehmensprofil und einheitlichen Kontaktdaten über alle Plattformen hinweg. Gute Bewertungen verstärken die lokale Sichtbarkeit zusätzlich.",
      },
      {
        q: "Muss die Agentur in Frankfurt sitzen, um eine lokale Website zu bauen?",
        a: "Nein. Entscheidend ist, dass die Agentur lokale Suche versteht und deine Region und Zielgruppe kennt. Mehr Auftrag sitzt in Hainburg im Rhein-Main-Gebiet und betreut Betriebe in Frankfurt und der ganzen Umgebung, vieles davon bequem aus der Ferne.",
      },
    ],
    related: [
      { label: "Werbeagentur im Rhein-Main-Gebiet finden", href: "/ratgeber/werbeagentur-rhein-main-finden" },
      { label: "Webdesign für die DACH-Region", href: "/ratgeber/webdesign-dach-region" },
      { label: "Grafik- & Corporate Design", href: "/grafikdesign" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },

  {
    slug: "webdesign-dach-region",
    category: "Regional",
    title: "Webdesign für die DACH-Region: Kunden in Deutschland, Österreich und der Schweiz gewinnen",
    metaTitle: "Webdesign für die DACH-Region (DE · AT · CH) | Ratgeber",
    description:
      "Wie Betriebe mit einer Website Kunden in ganz Deutschland, Österreich und der Schweiz gewinnen: länderübergreifend gefunden werden, aus einer Hand betreut.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    readingTime: "6 Min.",
    intro: [
      "Die DACH-Region – Deutschland, Österreich und die Schweiz – ist ein zusammenhängender, deutschsprachiger Markt mit über 100 Millionen Menschen. Für viele Betriebe und Dienstleister endet die Kundschaft aber unnötig an der Landesgrenze, einfach weil der Online-Auftritt nur auf einen Ort ausgerichtet ist.",
      "Dabei lässt sich die ganze Region mit einer durchdachten Website und der richtigen Sichtbarkeit bequem erreichen – ohne Niederlassung in jedem Land. Dieser Leitfaden zeigt, worauf es dabei ankommt.",
    ],
    sections: [
      {
        heading: "Ein Markt, drei Länder: das Potenzial der DACH-Region",
        paragraphs: [
          "Deutschland, Österreich und die Schweiz teilen dieselbe Sprache und sehr ähnliche Kaufgewohnheiten. Wer digitale Leistungen oder ortsunabhängige Dienstleistungen anbietet, kann seinen Markt schlagartig vergrößern, indem er alle drei Länder anspricht statt nur die eigene Stadt.",
          "Der Schlüssel ist ein Auftritt, der klar macht: Wir betreuen Kunden in ganz DE, AT und CH. Schon diese eine Aussage öffnet Anfragen, die sonst gar nicht erst entstehen, weil Interessenten aus dem Nachbarland annehmen, du seist nur regional tätig.",
        ],
      },
      {
        heading: "Länderübergreifend bei Google gefunden werden",
        paragraphs: [
          "Google zeigt Ergebnisse je nach Land unterschiedlich an. Eine Website, die für die DACH-Region gefunden werden soll, benennt die bedienten Länder und Regionen klar, nutzt sauberes Deutsch für alle drei Märkte und ist technisch so aufgesetzt, dass sie in Deutschland, Österreich und der Schweiz gleichermaßen ausgespielt werden kann.",
          "Wichtig ist außerdem, kleine Unterschiede zu berücksichtigen: In der Schweiz schreibt man ss statt ß, Preise werden in Franken und Euro gedacht, und manche Begriffe unterscheiden sich. Wer das mitdenkt, wirkt in jedem Land wie ein lokaler Anbieter.",
        ],
      },
      {
        heading: "Aus der Ferne betreut, ohne Reibung",
        paragraphs: [
          "Für die Zusammenarbeit über Ländergrenzen hinweg braucht es heute kein Büro vor Ort. Website, Marketing, Grafik und laufende Betreuung lassen sich komplett aus der Ferne abwickeln – per Telefon, Video und WhatsApp. Für den Kunden fühlt es sich an, als säße die Agentur nebenan, egal ob er in Hamburg, Wien oder Zürich sitzt.",
          "Ein einziger Ansprechpartner für die ganze DACH-Region spart dabei viel Abstimmung: Alles kommt aus einer Hand, in einer Sprache, mit einem klaren Plan.",
        ],
        bullets: [
          "Ein Ansprechpartner für alle drei Länder",
          "Zusammenarbeit per Telefon, Video und WhatsApp",
          "Schweizer Schreibweise und Besonderheiten berücksichtigt",
          "Ein Auftritt, der in DE, AT und CH lokal wirkt",
        ],
      },
      {
        heading: "Vertrauen über die Grenze hinweg aufbauen",
        paragraphs: [
          "Wer in einem anderen Land anfragt, achtet besonders auf Seriosität. Ein professioneller Auftritt mit klarem Impressum, echten Referenzen aus verschiedenen Ländern und sichtbaren Bewertungen nimmt die Unsicherheit und macht aus Interessenten in Österreich oder der Schweiz genauso selbstverständlich Kunden wie im eigenen Ort.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kann ich als Betrieb wirklich Kunden in Österreich und der Schweiz gewinnen?",
        a: "Ja, besonders bei digitalen Leistungen und ortsunabhängigen Dienstleistungen. Entscheidend ist ein Auftritt, der klar macht, dass du die ganze DACH-Region betreust, und der in allen drei Ländern bei Google gefunden wird.",
      },
      {
        q: "Muss ich für jedes Land eine eigene Website haben?",
        a: "Meist nicht. Eine gut aufgesetzte Website kann Deutschland, Österreich und die Schweiz gemeinsam bedienen, solange die Länder klar benannt und kleine Unterschiede wie die Schweizer Schreibweise berücksichtigt werden.",
      },
      {
        q: "Wie läuft die Zusammenarbeit über die Ländergrenzen ab?",
        a: "Komplett aus der Ferne: per Telefon, Videocall und WhatsApp. Du hast einen festen Ansprechpartner für die ganze DACH-Region, sodass alles aus einer Hand kommt, ohne Reisen oder mehrere Dienstleister.",
      },
    ],
    related: [
      { label: "Webdesign in Frankfurt & Umgebung", href: "/ratgeber/webdesign-frankfurt" },
      { label: "Werbeagentur im Rhein-Main-Gebiet finden", href: "/ratgeber/werbeagentur-rhein-main-finden" },
      { label: "Kostenlose Analyse anfordern", href: "/kostenlose-analyse" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
