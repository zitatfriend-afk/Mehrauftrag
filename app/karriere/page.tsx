import type { Metadata } from "next";
import KarriereShell from "@/app/_components/karriere-shell";

export const metadata: Metadata = {
  title: "Karriere bei Mehr Auftrag: offene Stellen",
  description:
    "Werde Teil des Teams von Mehr Auftrag. Wir suchen Webdesigner, Kundenbetreuer und Vertriebsberater für unser wachsendes Digitalagentur-Team.",
  alternates: { canonical: "https://www.mehrauftrag.de/karriere" },
};

// BreadcrumbList: bis 27.08.2026 war diese Seite die einzige Ausnahme ohne
// Brotkrumen-Auszeichnung. Google zeigt daraufhin den nackten Pfad statt der
// Seitenhierarchie an.
function KarriereBreadcrumb() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.mehrauftrag.de/karriere#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.mehrauftrag.de" },
      { "@type": "ListItem", position: 2, name: "Karriere", item: "https://www.mehrauftrag.de/karriere" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function KarrierePage() {
  return (
    <>
      <KarriereBreadcrumb />
      <KarriereShell />
    </>
  );
}
