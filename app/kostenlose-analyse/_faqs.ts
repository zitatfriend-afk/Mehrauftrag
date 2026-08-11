// Fragen und Antworten fuer diese Seite.
// Bewusst in einer eigenen Datei OHNE "use client": so nutzen sowohl die
// sichtbare Darstellung (_landing.tsx) als auch das FAQPage-Schema (page.tsx)
// exakt dieselben Texte. Google verlangt, dass ausgezeichnete FAQs auch
// sichtbar auf der Seite stehen, deshalb darf das nie auseinanderlaufen.
// Gehoert zu /kostenlose-analyse.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "Ist die Analyse wirklich kostenlos?", a: "Ja, komplett kostenlos und unverbindlich. Kein Kleingedrucktes, keine versteckten Kosten." },
  { q: "Was bekomme ich konkret?", a: "Eine ehrliche Einschätzung Ihres Online-Auftritts: Sichtbarkeit bei Google, Technik, Mobil-Tauglichkeit – plus konkrete Empfehlungen, was Ihnen mehr Anfragen bringt." },
  { q: "Wie lange dauert das?", a: "Die Anfrage dauert 20 Sekunden. Das Ergebnis-Gespräch dauert rund 30 Minuten." },
  { q: "Bin ich danach zu etwas verpflichtet?", a: "Nein. Sie erhalten die Analyse, entscheiden danach völlig frei. Kein Verkaufsdruck." },
];
