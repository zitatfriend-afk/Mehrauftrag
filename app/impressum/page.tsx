import type { Metadata } from "next";
import LegalPageShell from "../_components/legal-page-shell";
import {
  LegalSection,
  LegalSubsection,
  LegalP,
  ContactCard,
} from "../_components/legal-content";

export const metadata: Metadata = {
  title: "Impressum – Mehr Auftrag",
  description: "Impressum der Mehr Auftrag Digitalagentur gemäß § 5 DDG.",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <LegalPageShell
      badge="Rechtliches"
      title="Impressum"
      subtitle="Angaben gemäß § 5 DDG"
    >
      <LegalSection number="§ 5 DDG" title="Angaben gemäß § 5 DDG">
        <ContactCard
          name="Patrick Sauna"
          company="Mehr Auftrag"
          street="Josefstraße 28"
          city="63512 Hainburg"
          country="Deutschland"
          email="info@mehrauftrag.de"
          vatId="DE454534138"
        />
      </LegalSection>

      <LegalSection number="§ 18 MStV" title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <ContactCard
          name="Patrick Sauna"
          street="Josefstraße 28"
          city="63512 Hainburg"
        />
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
