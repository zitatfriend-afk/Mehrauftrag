import type { Metadata } from "next";
import LegalPageShell from "../_components/legal-page-shell";
import {
  LegalSection,
  LegalSubsection,
  LegalP,
  LegalLink,
  ContactCard,
} from "../_components/legal-content";

export const metadata: Metadata = {
  title: "Impressum – Mehr Auftrag",
  description: "Impressum der Mehr Auftrag Digitalagentur gemäß § 5 TMG.",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <LegalPageShell
      badge="Rechtliches"
      title="Impressum"
      subtitle="Angaben gemäß § 5 TMG"
    >
      <LegalSection number="§ 5 TMG" title="Angaben gemäß § 5 TMG">
        <ContactCard
          name="Patrick Sauna"
          company="Mehr Auftrag"
          street="Josefstraße 28"
          city="63512 Hainburg"
          country="Deutschland"
          email="info@mehrauftrag.de"
        />
      </LegalSection>

      <LegalSection number="§ 55 RStV" title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
        <ContactCard
          name="Patrick Sauna"
          street="Josefstraße 28"
          city="63512 Hainburg"
        />
      </LegalSection>

      <LegalSection title="Online-Streitbeilegung">
        <LegalP>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <LegalLink href="https://ec.europa.eu/consumers/odr">
            https://ec.europa.eu/consumers/odr
          </LegalLink>
        </LegalP>
        <LegalP>
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </LegalP>
      </LegalSection>

      <LegalSection title="Außergerichtliche Streitbeilegung">
        <LegalSubsection title="Verbraucherstreitbeilegung">
          <LegalP>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </LegalP>
        </LegalSubsection>
      </LegalSection>
    </LegalPageShell>
  );
}
