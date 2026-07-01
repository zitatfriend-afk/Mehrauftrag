import type { Metadata } from "next";
import KarriereShell from "@/app/_components/karriere-shell";

export const metadata: Metadata = {
  title: "Karriere – Mehr Auftrag",
  description:
    "Werde Teil des Teams von Mehr Auftrag. Wir suchen Webdesigner, Kundenbetreuer und Vertriebsberater für unser wachsendes Digitalagentur-Team.",
};

export default function KarrierePage() {
  return <KarriereShell />;
}
