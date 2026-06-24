import type { Metadata } from "next";
import LegalPageShell from "../_components/legal-page-shell";
import {
  LegalSection,
  LegalSubsection,
  LegalP,
  LegalList,
  LegalCallout,
} from "../_components/legal-content";

export const metadata: Metadata = {
  title: "AGB – MehrAuftrag",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) der MehrAuftrag Digitalagentur für Webentwicklung, Webseiten-Betreuung, SEO, Google Ads und Meta Ads.",
  robots: "noindex, follow",
};

export default function AGBPage() {
  return (
    <LegalPageShell
      badge="Rechtliches"
      title="Allgemeine Geschäftsbedingungen"
      subtitle="AGB der MehrAuftrag Digitalagentur · Stand: Juni 2026"
    >
      {/* Hinweis */}
      <LegalSection title="Hinweis vorab">
        <LegalP>
          Diese Allgemeinen Geschäftsbedingungen regeln die Zusammenarbeit zwischen MehrAuftrag und
          unseren Kunden. Sie sind bewusst praxisnah, klar und verständlich formuliert. Maßgeblich ist
          stets die zum Zeitpunkt des Vertragsschlusses gültige Fassung.
        </LegalP>
        <LegalCallout>
          Diese AGB wurden mit größtmöglicher Sorgfalt erstellt und decken die typischen Leistungen
          unserer Branche ab. Sie ersetzen jedoch keine individuelle Rechtsberatung. Wir empfehlen,
          die AGB vor dem produktiven Einsatz durch einen Rechtsanwalt prüfen und auf die konkrete
          Unternehmenssituation abstimmen zu lassen.
        </LegalCallout>
      </LegalSection>

      {/* § 1 Geltungsbereich */}
      <LegalSection number="§ 1" title="Geltungsbereich">
        <LegalP>
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle Verträge,
          Leistungen, Angebote und Lieferungen zwischen Patrick Sauna, handelnd unter der
          Geschäftsbezeichnung MehrAuftrag, Josefstraße 28, 63512 Hainburg (nachfolgend „Agentur“ oder
          „wir“) und dem Auftraggeber (nachfolgend „Kunde“).
        </LegalP>
        <LegalP>
          Unsere Leistungen richten sich grundsätzlich an Unternehmer im Sinne des § 14 BGB,
          juristische Personen des öffentlichen Rechts sowie öffentlich-rechtliche Sondervermögen.
          Sofern im Einzelfall mit Verbrauchern (§ 13 BGB) Verträge geschlossen werden, gelten die
          zwingenden verbraucherschützenden Vorschriften vorrangig.
        </LegalP>
        <LegalP>
          Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden
          werden nur dann und insoweit Vertragsbestandteil, als wir ihrer Geltung ausdrücklich
          schriftlich zugestimmt haben. Dieses Zustimmungserfordernis gilt auch dann, wenn wir in
          Kenntnis entgegenstehender Bedingungen die Leistung vorbehaltlos erbringen.
        </LegalP>
      </LegalSection>

      {/* § 2 Vertragsschluss */}
      <LegalSection number="§ 2" title="Vertragsschluss">
        <LegalP>
          Unsere Angebote sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als
          verbindlich gekennzeichnet sind. Ein Angebot ist – soweit nicht anders angegeben – 14 Tage
          ab Angebotsdatum gültig.
        </LegalP>
        <LegalP>
          Der Vertrag kommt durch die Annahme unseres Angebots durch den Kunden zustande. Die Annahme
          kann schriftlich, per E-Mail, durch Unterzeichnung des Angebots oder durch eine eindeutige
          Bestätigung in Textform erfolgen. Ebenso kommt ein Vertrag zustande, wenn wir eine Bestellung
          des Kunden in Textform bestätigen oder mit der Ausführung der Leistung beginnen.
        </LegalP>
        <LegalP>
          Mündliche Nebenabreden bestehen nicht. Änderungen und Ergänzungen des Vertrags bedürfen zu
          ihrer Wirksamkeit der Textform (z. B. E-Mail).
        </LegalP>
      </LegalSection>

      {/* § 3 Leistungsumfang */}
      <LegalSection number="§ 3" title="Leistungsumfang">
        <LegalP>
          Gegenstand des Vertrags sind die im jeweiligen Angebot bzw. in der Auftragsbestätigung
          konkret beschriebenen Leistungen. Zu unserem Leistungsspektrum gehören insbesondere:
        </LegalP>
        <LegalList
          items={[
            "Erstellung schlüsselfertiger Webseiten",
            "Webseiten-Relaunches und Überarbeitungen bestehender Auftritte",
            "Individuelle Webentwicklung",
            "Laufende Website-Betreuung und Wartung",
            "Hosting und technische Betreuung (sofern gesondert vereinbart)",
            "Suchmaschinenoptimierung (SEO)",
            "Einrichtung, Verwaltung und Betreuung von Google Ads Kampagnen",
            "Meta Ads Betreuung (zukünftig)",
            "Conversion-Optimierung und Landingpages",
            "Beratung sowie weitere digitale Dienstleistungen",
            "Optionale laufende Support- und Wartungsverträge",
          ]}
        />
        <LegalP>
          Maßgeblich für Art und Umfang der Leistung ist ausschließlich die im Angebot bzw. in der
          Auftragsbestätigung enthaltene Leistungsbeschreibung. Leistungen, die dort nicht
          ausdrücklich aufgeführt sind, sind nicht geschuldet und werden gesondert beauftragt und
          vergütet.
        </LegalP>
        <LegalP>
          Wir sind berechtigt, zur Leistungserbringung geeignete Subunternehmer und Dritte
          einzusetzen. Die Verantwortung für die vertragsgemäße Leistung gegenüber dem Kunden bleibt
          hiervon unberührt.
        </LegalP>
        <LegalP>
          Soweit nichts anderes vereinbart ist, schulden wir die Erbringung der vereinbarten Leistung,
          nicht jedoch einen bestimmten wirtschaftlichen Erfolg (z. B. Umsatzsteigerungen, konkrete
          Platzierungen oder Reichweiten). Bei der Erstellung von Webseiten gelten die werkvertraglichen
          Regelungen; bei laufender Betreuung, Beratung und Kampagnenmanagement gelten regelmäßig die
          Regelungen über Dienstverträge.
        </LegalP>
      </LegalSection>

      {/* § 4 Mitwirkungspflichten */}
      <LegalSection number="§ 4" title="Mitwirkungspflichten des Kunden">
        <LegalP>
          Der Kunde unterstützt uns bei der Leistungserbringung in zumutbarem Umfang und stellt alle
          hierfür erforderlichen Informationen, Inhalte und Zugänge rechtzeitig und vollständig zur
          Verfügung. Dazu gehören insbesondere:
        </LegalP>
        <LegalList
          items={[
            "Texte, Bilder, Logos, Videos und sonstige Inhalte in verwendbarer Form und Qualität",
            "Zugangsdaten zu erforderlichen Systemen, Domains, Hosting-Konten und Werbekonten",
            "Freigaben, Feedback und Entscheidungen innerhalb angemessener Fristen",
            "Benennung eines verantwortlichen Ansprechpartners mit Entscheidungsbefugnis",
          ]}
        />
        <LegalP>
          Der Kunde sichert zu, dass er an allen von ihm bereitgestellten Inhalten (insbesondere Texte,
          Bilder, Grafiken, Marken und Logos) über die erforderlichen Rechte verfügt und dass deren
          Nutzung keine Rechte Dritter verletzt. Der Kunde stellt uns insoweit von sämtlichen Ansprüchen
          Dritter frei, die aufgrund der von ihm bereitgestellten Inhalte geltend gemacht werden,
          einschließlich angemessener Kosten der Rechtsverteidigung.
        </LegalP>
        <LegalP>
          Kommt der Kunde seinen Mitwirkungspflichten nicht, nicht rechtzeitig oder nicht ordnungsgemäß
          nach, verlängern sich vereinbarte Fristen angemessen. Hierdurch entstehende Mehraufwände und
          Verzögerungen gehen nicht zu unseren Lasten und können gesondert in Rechnung gestellt werden.
        </LegalP>
      </LegalSection>

      {/* § 5 Vergütung und Zahlungsbedingungen */}
      <LegalSection number="§ 5" title="Vergütung und Zahlungsbedingungen">
        <LegalP>
          Es gilt die im Angebot bzw. in der Auftragsbestätigung vereinbarte Vergütung. Alle Preise
          verstehen sich zzgl. der jeweils gesetzlichen Umsatzsteuer, sofern nicht ausdrücklich anders
          ausgewiesen.
        </LegalP>
        <LegalSubsection title="Abschlagszahlungen">
          <LegalP>
            Bei Projekten – insbesondere bei der Erstellung von Webseiten – sind wir berechtigt,
            Abschlagszahlungen zu verlangen. Sofern nicht abweichend vereinbart, gilt folgende Regelung:
            50 % der vereinbarten Vergütung sind als Anzahlung bei Auftragserteilung fällig, der
            verbleibende Anteil mit Abnahme bzw. Fertigstellung. Mit der Leistungserbringung beginnen
            wir regelmäßig nach Eingang der Anzahlung.
          </LegalP>
        </LegalSubsection>
        <LegalSubsection title="Zahlungsfristen und Verzug">
          <LegalP>
            Rechnungen sind, sofern nicht anders angegeben, innerhalb von 14 Tagen ab Rechnungsdatum
            ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug sind wir berechtigt, Verzugszinsen in
            gesetzlicher Höhe zu berechnen. Die Geltendmachung eines weitergehenden Schadens bleibt
            vorbehalten.
          </LegalP>
          <LegalP>
            Befindet sich der Kunde mit fälligen Zahlungen in Verzug, sind wir berechtigt, laufende
            Leistungen (z. B. Betreuung, Hosting, Kampagnen) nach vorheriger Ankündigung bis zum
            vollständigen Zahlungseingang auszusetzen. Hieraus entstehende Nachteile trägt der Kunde.
          </LegalP>
        </LegalSubsection>
        <LegalP>
          Wiederkehrende Leistungen (z. B. Wartung, Hosting, laufende Betreuung) werden – sofern nicht
          anders vereinbart – monatlich oder im vereinbarten Abrechnungszeitraum im Voraus in Rechnung
          gestellt. Mediabudgets für Werbeanzeigen (z. B. Google Ads, Meta Ads) sind nicht Bestandteil
          unserer Vergütung und werden vom Kunden direkt an die jeweilige Plattform gezahlt, sofern
          nichts anderes vereinbart ist.
        </LegalP>
      </LegalSection>

      {/* § 6 Lieferzeiten */}
      <LegalSection number="§ 6" title="Lieferzeiten und Termine">
        <LegalP>
          Genannte Liefer- und Fertigstellungstermine sind grundsätzlich unverbindliche Richtwerte,
          es sei denn, ein Termin wurde ausdrücklich als verbindlich vereinbart. Die Einhaltung von
          Terminen setzt die rechtzeitige und vollständige Erfüllung der Mitwirkungspflichten des
          Kunden voraus.
        </LegalP>
        <LegalP>
          Verzögerungen aufgrund von Umständen, die wir nicht zu vertreten haben (z. B. höhere Gewalt,
          ausstehende Zulieferungen des Kunden, Ausfälle von Drittanbietern), verlängern vereinbarte
          Fristen angemessen. Wir informieren den Kunden über absehbare Verzögerungen.
        </LegalP>
      </LegalSection>

      {/* § 7 Korrekturschleifen */}
      <LegalSection number="§ 7" title="Korrekturschleifen und Änderungen">
        <LegalP>
          Soweit nicht anders vereinbart, sind im Rahmen eines Webprojekts zwei Korrekturschleifen auf
          Basis eines vorgelegten Entwurfs enthalten. Eine Korrekturschleife umfasst die gesammelte,
          eindeutige Rückmeldung des Kunden zu dem jeweiligen Stand.
        </LegalP>
        <LegalP>
          Darüber hinausgehende Änderungswünsche sowie Änderungen, die nach erteilter Freigabe oder
          nach Abnahme geäußert werden oder den ursprünglich vereinbarten Leistungsumfang erweitern,
          werden nach Aufwand zu unseren jeweils gültigen Stundensätzen oder nach gesonderter
          Vereinbarung berechnet.
        </LegalP>
      </LegalSection>

      {/* § 8 Abnahme */}
      <LegalSection number="§ 8" title="Abnahme von Webseiten und Werkleistungen">
        <LegalP>
          Nach Fertigstellung stellen wir dem Kunden die Leistung zur Abnahme bereit und teilen ihm
          dies mit. Der Kunde ist verpflichtet, die Leistung innerhalb von 10 Werktagen zu prüfen und
          abzunehmen, sofern keine wesentlichen Mängel vorliegen. Unwesentliche Mängel berechtigen
          nicht zur Verweigerung der Abnahme.
        </LegalP>
        <LegalP>
          Die Abnahme gilt als erfolgt, wenn der Kunde die Leistung ausdrücklich abnimmt, die
          gesetzte angemessene Abnahmefrist ohne Mitteilung wesentlicher Mängel verstreichen lässt
          oder die Leistung produktiv nutzt (z. B. Veröffentlichung bzw. Livestellung der Website).
        </LegalP>
        <LegalP>
          Teilabnahmen sind bei abgrenzbaren, in sich abgeschlossenen Teilleistungen zulässig.
        </LegalP>
      </LegalSection>

      {/* § 9 Nutzungsrechte und Urheberrechte */}
      <LegalSection number="§ 9" title="Nutzungsrechte und Urheberrechte">
        <LegalP>
          An den von uns erstellten Arbeitsergebnissen (insbesondere Webseiten, Designs, Grafiken,
          Texten und individuell entwickeltem Code) stehen uns die urheberrechtlichen Verwertungs-
          und Nutzungsrechte zu, soweit gesetzlich übertragbar.
        </LegalP>
        <LegalP>
          Mit vollständiger Bezahlung der vereinbarten Vergütung räumen wir dem Kunden die für den
          vertraglich vorgesehenen Zweck erforderlichen, einfachen und zeitlich unbeschränkten
          Nutzungsrechte an den für ihn erstellten Arbeitsergebnissen ein. Bis zur vollständigen
          Zahlung erfolgt die Nutzung lediglich aufschiebend bedingt bzw. widerruflich.
        </LegalP>
        <LegalP>
          Eine Übertragung der Nutzungsrechte auf Dritte, eine Bearbeitung über den vereinbarten Zweck
          hinaus oder eine Weiterveräußerung bedarf unserer vorherigen Zustimmung in Textform, soweit
          nicht ausdrücklich etwas anderes vereinbart wurde.
        </LegalP>
        <LegalP>
          An eingesetzten Standardkomponenten, Frameworks, Bibliotheken, Schriftarten, Stockmaterial
          und Drittanbieter-Software bestehen die jeweiligen Lizenzbedingungen der Rechteinhaber, die
          der Kunde zu beachten hat. Wir behalten uns vor, von uns entwickelte allgemeine Konzepte,
          Methoden, Techniken und wiederverwendbares Know-how auch für andere Projekte zu nutzen.
        </LegalP>
      </LegalSection>

      {/* § 10 Hosting und Drittanbieter */}
      <LegalSection number="§ 10" title="Hosting und Drittanbieter">
        <LegalP>
          Sofern Hosting- und technische Betreuungsleistungen vereinbart sind, erbringen wir diese in
          der Regel über externe Dienstleister (z. B. Hosting-, Server- und Infrastrukturanbieter).
          Für die Verfügbarkeit und Leistungen dieser Drittanbieter gelten deren jeweilige Bedingungen.
        </LegalP>
        <LegalP>
          Eine ununterbrochene Verfügbarkeit kann technisch nicht garantiert werden. Wir bemühen uns
          um eine möglichst hohe Verfügbarkeit, übernehmen jedoch – soweit gesetzlich zulässig – keine
          Gewähr für Ausfallzeiten, die auf Wartungsarbeiten, höhere Gewalt oder Störungen bei
          Drittanbietern zurückzuführen sind.
        </LegalP>
        <LegalP>
          Setzen wir im Auftrag des Kunden Leistungen Dritter ein (z. B. Domains, Plugins, Schnittstellen,
          Werbeplattformen), handelt der Kunde, sofern nicht anders vereinbart, im Verhältnis zu diesen
          Anbietern als Vertragspartner. Wir weisen den Kunden auf relevante Drittanbieterbedingungen hin,
          soweit dies für die Leistungserbringung erforderlich ist.
        </LegalP>
      </LegalSection>

      {/* § 11 SEO */}
      <LegalSection number="§ 11" title="Suchmaschinenoptimierung (SEO)">
        <LegalP>
          Bei der Suchmaschinenoptimierung schulden wir die sorgfältige Durchführung der vereinbarten
          Maßnahmen nach dem anerkannten Stand der Technik, nicht jedoch einen bestimmten Erfolg.
          Konkrete Rankings, Positionen oder Besucherzahlen können nicht garantiert werden, da sie
          maßgeblich von Faktoren außerhalb unseres Einflussbereichs abhängen.
        </LegalP>
        <LegalP>
          Suchmaschinenbetreiber (insbesondere Google) ändern ihre Algorithmen und Richtlinien
          fortlaufend und eigenständig. Hieraus resultierende Schwankungen oder Verschlechterungen von
          Platzierungen haben wir nicht zu vertreten.
        </LegalP>
      </LegalSection>

      {/* § 12 Google Ads und Meta Ads */}
      <LegalSection number="§ 12" title="Google Ads und Meta Ads">
        <LegalP>
          Im Rahmen der Betreuung von Werbekampagnen (insbesondere Google Ads und – zukünftig – Meta Ads)
          übernehmen wir die Einrichtung, Verwaltung, Optimierung und Auswertung von Kampagnen nach den
          vereinbarten Zielsetzungen.
        </LegalP>
        <LegalList
          items={[
            "Das Mediabudget (die an Google bzw. Meta zu zahlenden Werbekosten) ist nicht Bestandteil unserer Betreuungsvergütung und wird, sofern nicht anders vereinbart, vom Kunden über sein eigenes Werbekonto direkt an die Plattform gezahlt.",
            "Es gelten zusätzlich die jeweiligen Nutzungs-, Werbe- und Programmrichtlinien der Plattformbetreiber, deren Einhaltung der Kunde mit verantwortet.",
            "Ein bestimmter Werbeerfolg (z. B. Klickzahlen, Conversions, Umsatz, Cost-per-Lead) wird nicht geschuldet und nicht garantiert; Ergebnisse hängen von Markt, Wettbewerb, Angebot und Plattformfaktoren ab.",
            "Plattformbetreiber können Konten, Anzeigen oder Kampagnen nach eigenen Richtlinien einschränken, ablehnen oder sperren. Hierfür übernehmen wir keine Haftung, soweit uns kein Verschulden trifft.",
          ]}
        />
        <LegalP>
          Der Kunde stellt uns die für die Kampagnensteuerung erforderlichen Zugänge und Freigaben zur
          Verfügung und ist für die inhaltliche und rechtliche Zulässigkeit der beworbenen Angebote
          selbst verantwortlich.
        </LegalP>
      </LegalSection>

      {/* § 13 Laufzeiten, Betreuung, Kündigung */}
      <LegalSection number="§ 13" title="Laufende Leistungen, Laufzeiten und Kündigung">
        <LegalP>
          Für laufende Leistungen wie Website-Betreuung, Wartung, Hosting, SEO sowie Support- und
          Betreuungsverträge gilt die im Einzelvertrag vereinbarte Laufzeit. Ist keine Laufzeit
          vereinbart, gilt eine Mindestlaufzeit von einem Monat mit anschließender unbestimmter
          Verlängerung.
        </LegalP>
        <LegalP>
          Sofern nicht abweichend vereinbart, können laufende Verträge mit einer Frist von 14 Tagen
          zum Ende des jeweiligen Abrechnungszeitraums (Laufzeitmonats) in Textform gekündigt werden.
          Bei Verträgen mit fester Mindestlaufzeit ist eine ordentliche Kündigung erstmals zum Ablauf
          der Mindestlaufzeit möglich.
        </LegalP>
        <LegalP>
          Das Recht beider Parteien zur außerordentlichen Kündigung aus wichtigem Grund bleibt
          unberührt. Ein wichtiger Grund liegt für uns insbesondere vor, wenn der Kunde mit fälligen
          Zahlungen trotz Mahnung erheblich in Verzug gerät oder wiederholt gegen wesentliche
          Vertragspflichten verstößt.
        </LegalP>
        <LegalP>
          Kündigungen bedürfen der Textform (z. B. E-Mail). Bereits erbrachte Leistungen sind bis zum
          Wirksamwerden der Kündigung zu vergüten.
        </LegalP>
      </LegalSection>

      {/* § 14 Gewährleistung */}
      <LegalSection number="§ 14" title="Gewährleistung">
        <LegalP>
          Bei werkvertraglichen Leistungen leisten wir Gewähr dafür, dass die erbrachte Leistung die
          vereinbarte Beschaffenheit aufweist und nicht mit Mängeln behaftet ist, die ihren Wert oder
          ihre Tauglichkeit zum vertraglich vorausgesetzten Gebrauch aufheben oder mindern.
        </LegalP>
        <LegalP>
          Im Falle eines berechtigten Mangels haben wir das Recht zur Nacherfüllung, das heißt nach
          unserer Wahl zur Mängelbeseitigung oder Neuherstellung. Schlägt die Nacherfüllung nach
          angemessener Frist fehl, kann der Kunde die gesetzlichen Rechte (Minderung oder Rücktritt)
          geltend machen.
        </LegalP>
        <LegalP>
          Mängel sind in nachvollziehbarer Form zu rügen. Keine Mängel sind Beeinträchtigungen, die auf
          nachträglichen Änderungen durch den Kunden oder Dritte, unsachgemäßer Nutzung, fehlenden
          Updates, Eingriffen in den Code oder auf Änderungen der technischen Rahmenbedingungen
          (z. B. Browser, Endgeräte, Drittanbieter) beruhen. Die gesetzlichen Verjährungsfristen gelten,
          soweit nicht anders vereinbart.
        </LegalP>
      </LegalSection>

      {/* § 15 Haftung */}
      <LegalSection number="§ 15" title="Haftungsbeschränkung">
        <LegalP>
          Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der
          Gesundheit sowie bei Vorsatz und grober Fahrlässigkeit und nach den Vorschriften des
          Produkthaftungsgesetzes.
        </LegalP>
        <LegalP>
          Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht
          (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst
          ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf. In diesem Fall ist die
          Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
        </LegalP>
        <LegalP>
          Im Übrigen ist die Haftung – soweit gesetzlich zulässig – ausgeschlossen. Dies gilt
          insbesondere für mittelbare Schäden, entgangenen Gewinn, ausgebliebene Werbe- oder
          Vertriebserfolge sowie für Datenverluste, sofern der Kunde keine angemessene und regelmäßige
          Datensicherung vorgenommen hat. Eine verschuldensunabhängige Haftung für anfängliche Mängel
          ist ausgeschlossen.
        </LegalP>
        <LegalP>
          Für Leistungen und Ausfälle von Drittanbietern sowie für vom Kunden bereitgestellte Inhalte
          übernehmen wir keine Haftung, soweit uns insoweit kein eigenes Verschulden trifft.
        </LegalP>
      </LegalSection>

      {/* § 16 Vertraulichkeit */}
      <LegalSection number="§ 16" title="Vertraulichkeit">
        <LegalP>
          Beide Parteien verpflichten sich, alle ihnen im Rahmen der Zusammenarbeit bekannt gewordenen
          vertraulichen Informationen und Betriebsgeheimnisse der jeweils anderen Partei vertraulich zu
          behandeln und nicht unbefugt gegenüber Dritten offenzulegen oder zu verwerten. Diese
          Verpflichtung besteht auch nach Beendigung des Vertragsverhältnisses fort.
        </LegalP>
        <LegalP>
          Ausgenommen sind Informationen, die öffentlich bekannt sind, rechtmäßig von Dritten erlangt
          wurden oder aufgrund gesetzlicher Verpflichtung oder behördlicher bzw. gerichtlicher Anordnung
          offengelegt werden müssen.
        </LegalP>
      </LegalSection>

      {/* § 17 Datenschutz */}
      <LegalSection number="§ 17" title="Datenschutz">
        <LegalP>
          Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden gesetzlichen
          Bestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO) und des
          Bundesdatenschutzgesetzes (BDSG). Einzelheiten zur Verarbeitung im Zusammenhang mit unserer
          Website finden sich in unserer Datenschutzerklärung.
        </LegalP>
        <LegalP>
          Soweit wir im Auftrag des Kunden personenbezogene Daten verarbeiten, schließen die Parteien –
          sofern gesetzlich erforderlich – einen gesonderten Vertrag zur Auftragsverarbeitung gemäß
          Art. 28 DSGVO. Der Kunde bleibt für die datenschutzrechtliche Zulässigkeit der von ihm
          veranlassten Verarbeitungen verantwortlich.
        </LegalP>
      </LegalSection>

      {/* § 18 Referenznennung */}
      <LegalSection number="§ 18" title="Referenznennung">
        <LegalP>
          Wir sind berechtigt, die für den Kunden erbrachten Leistungen unter Nennung des Kunden und
          Verwendung seines Logos sowie in Form von Screenshots oder Verlinkungen als Referenz auf
          unserer Website und in unseren Kommunikationsmedien zu nennen. Der Kunde kann dieser Nutzung
          jederzeit in Textform mit Wirkung für die Zukunft widersprechen.
        </LegalP>
      </LegalSection>

      {/* § 19 Schlussbestimmungen */}
      <LegalSection number="§ 19" title="Schlussbestimmungen">
        <LegalP>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
        </LegalP>
        <LegalP>
          Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
          Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus dem
          Vertragsverhältnis der Geschäftssitz der Agentur. Wir sind berechtigt, auch am allgemeinen
          Gerichtsstand des Kunden zu klagen.
        </LegalP>
        <LegalP>
          Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchführbar
          sein oder werden, so wird hierdurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An
          die Stelle der unwirksamen oder undurchführbaren Bestimmung tritt die gesetzliche Regelung.
        </LegalP>
        <LegalP>
          Änderungen und Ergänzungen dieser AGB sowie alle vertragsrelevanten Erklärungen bedürfen der
          Textform.
        </LegalP>
        <LegalCallout>
          Stand dieser AGB: Juni 2026. Diese Bedingungen wurden sorgfältig ausgearbeitet, stellen jedoch
          keine Rechtsberatung dar. Vor dem produktiven Einsatz empfehlen wir eine anwaltliche Prüfung und
          Anpassung an Ihre individuelle Geschäftssituation.
        </LegalCallout>
      </LegalSection>
    </LegalPageShell>
  );
}
