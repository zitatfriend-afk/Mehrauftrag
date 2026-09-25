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
// Kauf ist jetzt das Hauptangebot (1.290 Euro), die Miete bleibt als
// Einstieg mit Kaufoption (250 Euro Start, 75 Euro im Monat).
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
    a: "Ehrlich: Anfragen garantieren kann Ihnen niemand, ich auch nicht. Wer das verspricht, verkauft Ihnen etwas. Was ich zusage: Sie sitzen in keiner Laufzeit fest. Sind Sie monatlich gestartet, kündigen Sie zum Monatsende und zahlen keinen Cent weiter. Haben Sie gekauft, gehört Ihnen die Seite und Sie können die Pflege jederzeit beenden. Vorher nehme ich sie mir noch einmal vor, Texte, Bilder, Ihr Google-Unternehmensprofil und eigene Seiten für Ihre einzelnen Leistungen. Das kostet Sie nichts extra.",
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
    a: "Nein. Beim Kauf gibt es ohnehin keine, die Seite gehört Ihnen. Das optionale Pflegepaket für 49 € im Monat und der monatliche Einstieg sind zum Monatsende kündbar. Kein Kleingedrucktes, keine langfristige Bindung.",
  },
  {
    q: "Geht es auch ohne monatliche Kosten?",
    a: "Ja, das ist inzwischen der normale Weg. Sie kaufen die Website einmalig für 1.290 €, danach gehört sie Ihnen und es läuft nichts weiter. Pflege, Hosting und Updates können Sie für 49 € im Monat dazubuchen, müssen Sie aber nicht. Wer lieber klein anfängt, startet monatlich und kauft später.",
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
    a: "Beim Kauf zahlen Sie 1.290 € einmalig. Pflege, Hosting und Updates kosten optional 49 € im Monat, jederzeit kündbar. Beim monatlichen Einstieg zahlen Sie 250 € zum Start und danach 75 € im Monat. Nach einem Jahr sind das beim Kauf mit Pflege 1.878 €, bei der Miete 1.150 €. Am Anfang ist die Miete also günstiger. Ohne Pflegepaket holt der Kauf das nach rund 14 Monaten auf, mit Pflegepaket nach gut drei Jahren. Dafür gehört Ihnen die Seite vom ersten Tag an, und wenn Sie später doch kaufen, wird die Hälfte Ihrer Monatsbeiträge angerechnet.",
  },
];
