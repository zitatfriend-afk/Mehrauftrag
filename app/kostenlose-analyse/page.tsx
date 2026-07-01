import type { Metadata } from "next";
import AnalyseLanding from "./_landing";

export const metadata: Metadata = {
  title: "Kostenlose Website-Analyse für Elektriker | Mehr Auftrag",
  description:
    "Kostenloser Potenzial-Check für Ihren Elektrobetrieb: Wir prüfen Ihre Sichtbarkeit bei Google, Performance und Mobile-Tauglichkeit – unverbindlich und in 30 Minuten.",
  alternates: { canonical: "https://www.mehrauftrag.de/kostenlose-analyse" },
  openGraph: {
    title: "Kostenlose Website-Analyse für Elektriker",
    description:
      "Potenzial-Check für Ihren Elektrobetrieb – kostenlos & unverbindlich, in 30 Minuten.",
    url: "https://www.mehrauftrag.de/kostenlose-analyse",
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

export default function KostenloseAnalysePage() {
  return <AnalyseLanding />;
}
