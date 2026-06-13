import type { Metadata } from "next";
import ElektrikerLanding from "./_landing";

export const metadata: Metadata = {
  title: "Websites für Elektriker in Frankfurt & Rhein-Main | MehrAuftrag",
  description:
    "In 7 Tagen online. Mehr Anfragen. Fester Preis. Professionelle Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main – mit Click-to-Call, Google Maps und Bewertungen.",
  alternates: { canonical: "https://www.mehrauftrag.de/elektriker" },
  openGraph: {
    title: "Websites für Elektriker in Frankfurt & Rhein-Main",
    description:
      "In 7 Tagen online. Mehr Anfragen. Fester Preis. Websites speziell für Elektrikerbetriebe in Frankfurt und Rhein-Main.",
    url: "https://www.mehrauftrag.de/elektriker",
    siteName: "MehrAuftrag",
    locale: "de_DE",
    type: "website",
  },
};

export default function ElektrikerPage() {
  return <ElektrikerLanding />;
}
