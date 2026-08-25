// Fragen und Antworten fuer diese Seite.
// Bewusst in einer eigenen Datei OHNE "use client": so nutzen sowohl die
// sichtbare Darstellung (_landing.tsx) als auch das FAQPage-Schema (page.tsx)
// exakt dieselben Texte. Google verlangt, dass ausgezeichnete FAQs auch
// sichtbar auf der Seite stehen, deshalb darf das nie auseinanderlaufen.
// Gehoert zu /elektriker.

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
];
