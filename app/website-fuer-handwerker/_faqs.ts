// Fragen und Antworten fuer diese Seite.
// Bewusst in einer eigenen Datei OHNE "use client": so nutzen sowohl die
// sichtbare Darstellung (_landing.tsx) als auch das FAQPage-Schema (page.tsx)
// exakt dieselben Texte. Google verlangt, dass ausgezeichnete FAQs auch
// sichtbar auf der Seite stehen, deshalb darf das nie auseinanderlaufen.
// Gehoert zu /website-fuer-handwerker.
//
// 24.09.2026: Preismodell umgestellt. 82 Klicks aus Google Ads, null Anfragen.
// Die Mitbewerber auf demselben Suchbegriff verkaufen Festpreise zwischen 490
// und 1.490 Euro und damit Eigentum, wir haben als einzige nur vermietet. Der
// Es gibt genau zwei Wege, und der Unterschied ist die Betreuung:
// Kauf 1.290 Euro einmalig, danach keine laufenden Kosten, die Seite bleibt
// online, aber ohne laufende Betreuung und ohne spaetere Aenderungen.
// Miete 250 Euro zum Start und 75 Euro im Monat, darin ist die Betreuung
// enthalten, monatlich kuendbar, jederzeit kaufbar mit Anrechnung der halben
// Monatsbeitraege bis zu zwoelf Monate.
// 25.09.2026: Das frueher angebotene Pflegepaket fuer 49 Euro im Monat ist
// ersatzlos entfallen. Es stand quer zur Aussage "keine laufenden Kosten".
//
// Die fruehere Frage "Warum ist der Einstieg so guenstig?" ist entfallen. Sie
// hat einen Einstiegspreis verteidigt, den es so nicht mehr gibt. An ihrer
// Stelle steht die Frage, die bei zwei Modellen wirklich aufkommt: was kostet
// mich das auf Dauer. Die Antwort rechnet beide Wege ehrlich vor, auch dort,
// wo die Miete guenstiger ist.
//
// 25.09.2026: Der Zusatz "netto" steht nicht mehr an jeder Zahl. Die Preise
// sind Nettopreise, der Hinweis dazu steht einmal sichtbar im Preisbereich
// der Seite ("Alle Preise zzgl. 19 % USt.").

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Was, wenn die Website keine Anfragen bringt?",
    a: "Ehrlich: Anfragen garantieren kann Ihnen niemand, ich auch nicht. Wer das verspricht, verkauft Ihnen etwas. Was ich zusage: Sie sitzen in keiner Laufzeit fest. Sind Sie monatlich gestartet, kündigen Sie zum Monatsende und zahlen keinen Cent weiter. Haben Sie gekauft, gehört Ihnen die Seite und es läuft ohnehin nichts weiter. Vorher nehme ich sie mir noch einmal vor, Texte, Bilder, Ihr Google-Unternehmensprofil und eigene Seiten für Ihre einzelnen Leistungen. Das kostet Sie nichts extra.",
  },
  {
    q: "Wie lange dauert es wirklich?",
    a: "7 Tage nach Eingang Ihrer Infos und Fotos ist Ihre Seite online. Dauert es länger, entfällt die Erstellungsgebühr: beim Kauf die 1.290 €, beim monatlichen Start die 250 €. Den Starttermin bekommen Sie schriftlich, damit Sie mitzählen können.",
  },
  {
    q: "Was muss ich selbst tun?",
    a: "Ein 30-minütiges Gespräch mit uns und ein paar Fotos Ihrer Arbeit. Den kompletten Rest erledigen wir.",
  },
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Nein. Beim Kauf gibt es ohnehin keine, die Seite gehört Ihnen und es läuft nichts weiter. Der monatliche Einstieg ist jederzeit zum Monatsende kündbar. Kein Kleingedrucktes, keine langfristige Bindung.",
  },
  {
    q: "Geht es auch ohne monatliche Kosten?",
    a: "Ja, das ist der Kauf und inzwischen der normale Weg. Sie zahlen einmalig 1.290 €, danach gehört die Website Ihnen, sie bleibt online und es kommt nichts mehr dazu. Was in dem Preis nicht steckt, ist die laufende Betreuung: Änderungen an der Seite übernehme ich dann nicht mehr. Wer das möchte, startet monatlich, da ist die Betreuung drin.",
  },
  {
    q: "Kann ich erst mieten und später kaufen?",
    a: "Ja. Sie starten monatlich, testen die Website im echten Betrieb, und wenn sie überzeugt, kaufen Sie sie. Die Hälfte Ihrer bisher gezahlten Monatsbeiträge wird auf den Kaufpreis angerechnet, maximal zwölf Monate. Ein Beispiel: Nach einem Jahr haben Sie 900 € an Monatsbeiträgen gezahlt, davon werden 450 € angerechnet, der Kauf kostet dann noch 840 € statt 1.290 €. Es gibt keine Frist und keinen Zwang. Sie können auch einfach weiter mieten oder zum Monatsende kündigen.",
  },
  {
    q: "Ist das eine Vorlage aus dem Baukasten?",
    a: "Nein. Ihre Seite wird für Ihren Betrieb gebaut, mit Ihren Leistungen, Ihren Fotos und Ihrer Region. Sie können sich unsere bestehenden Kundenseiten ansehen und selbst vergleichen, keine davon sieht aus wie die andere.",
  },
  {
    q: "Was kostet mich das auf Dauer?",
    a: "Es gibt genau zwei Wege. Beim Kauf zahlen Sie 1.290 € einmalig und danach nichts mehr, die Seite gehört Ihnen und bleibt online. Beim monatlichen Einstieg zahlen Sie 250 € zum Start und 75 € im Monat, dafür ist die laufende Betreuung dabei. Das sind nach einem Jahr 1.150 € und nach zwei Jahren 2.050 €. Ab rund 14 Monaten haben Sie mit der Miete mehr gezahlt, als der Kauf gekostet hätte. Dafür kümmere ich mich in der Zeit um Ihre Seite, und wenn Sie später kaufen, wird die Hälfte Ihrer Monatsbeiträge angerechnet.",
  },
];
