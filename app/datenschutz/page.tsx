import type { Metadata } from "next";
import LegalPageShell from "../_components/legal-page-shell";
import {
  LegalSection,
  LegalSubsection,
  LegalP,
  LegalList,
  LegalCallout,
  LegalLink,
  ContactCard,
} from "../_components/legal-content";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – MehrAuftrag",
  description: "Datenschutzerklärung der MehrAuftrag Digitalagentur gemäß DSGVO.",
  robots: "noindex, nofollow",
};

export default function DatenschutzPage() {
  return (
    <LegalPageShell
      badge="Rechtliches"
      title="Datenschutzerklärung"
      subtitle="Informationen zum Schutz Ihrer personenbezogenen Daten"
    >
      {/* 1. Datenschutz auf einen Blick */}
      <LegalSection title="1. Datenschutz auf einen Blick">
        <LegalSubsection title="Allgemeine Hinweise">
          <LegalP>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
            Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
            Datenschutzerklärung.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Datenerfassung auf unserer Website">
          <LegalP>
            <strong className="text-white/80">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          </LegalP>
          <LegalP>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </LegalP>
          <LegalP className="mt-3">
            <strong className="text-white/80">Wie erfassen wir Ihre Daten?</strong>
          </LegalP>
          <LegalP>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann
            es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </LegalP>
          <LegalP>
            Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.
            Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit
            des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere
            Website betreten.
          </LegalP>
          <LegalP className="mt-3">
            <strong className="text-white/80">Wofür nutzen wir Ihre Daten?</strong>
          </LegalP>
          <LegalP>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
            gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </LegalP>
          <LegalP className="mt-3">
            <strong className="text-white/80">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
          </LegalP>
          <LegalP>
            Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
            Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
            die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu
            weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum
            angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der
            zuständigen Aufsichtsbehörde zu.
          </LegalP>
          <LegalP>
            Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie
            der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung".
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Analyse-Tools und Tools von Drittanbietern">
          <LegalP>
            Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das
            geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres
            Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen
            zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die
            Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie
            in der folgenden Datenschutzerklärung.
          </LegalP>
          <LegalP>
            Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir
            Sie in dieser Datenschutzerklärung informieren.
          </LegalP>
        </LegalSubsection>
      </LegalSection>

      {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
      <LegalSection title="2. Allgemeine Hinweise und Pflichtinformationen">
        <LegalSubsection title="Datenschutz">
          <LegalP>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
            behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </LegalP>
          <LegalP>
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
            Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
            Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir
            sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
          </LegalP>
          <LegalP>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation
            per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem
            Zugriff durch Dritte ist nicht möglich.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Hinweis zur verantwortlichen Stelle">
          <LegalP>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</LegalP>
          <ContactCard
            name="Patrick Sauna"
            company="MehrAuftrag"
            street="Jostraße 28"
            city="63512 Hainburg"
            email="info@mehrauftrag.de"
          />
          <LegalP>
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
            gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
            Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Widerruf Ihrer Einwilligung zur Datenverarbeitung">
          <LegalP>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
            Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine
            formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
            Datenverarbeitung bleibt vom Widerruf unberührt.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)">
          <LegalCallout>
            WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
            ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN
            SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH
            EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE
            JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER
            DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
            PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE
            SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
            FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER
            VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).{" "}
            WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO
            HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER
            PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR
            DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
            WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE
            DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
          </LegalCallout>
        </LegalSubsection>

        <LegalSubsection title="Beschwerderecht bei der zuständigen Aufsichtsbehörde">
          <LegalP>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
            einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
            Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das
            Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
            gerichtlicher Rechtsbehelfe.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Recht auf Datenübertragbarkeit">
          <LegalP>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung
            eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem
            gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte
            Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
            soweit es technisch machbar ist.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="SSL- bzw. TLS-Verschlüsselung">
          <LegalP>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber
            senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an
            dem Schloss-Symbol in Ihrer Browserzeile.
          </LegalP>
          <LegalP>
            Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
            übermitteln, nicht von Dritten mitgelesen werden.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Auskunft, Sperrung, Löschung und Berichtigung">
          <LegalP>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
            unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft
            und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung,
            Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
            personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen
            Adresse an uns wenden.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Recht auf Einschränkung der Verarbeitung">
          <LegalP>
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
            zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen
            Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
            folgenden Fällen:
          </LegalP>
          <LegalList
            items={[
              "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
              "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
            ]}
          />
          <LegalP>
            Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen
            diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur
            Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der
            Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines
            wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats
            verarbeitet werden.
          </LegalP>
        </LegalSubsection>
      </LegalSection>

      {/* 3. Datenerfassung auf unserer Website */}
      <LegalSection title="3. Datenerfassung auf unserer Website">
        <LegalSubsection title="Cookies">
          <LegalP>
            Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem
            Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot
            nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien,
            die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
          </LegalP>
          <LegalP>
            Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies". Sie
            werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem
            Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren
            Browser beim nächsten Besuch wiederzuerkennen.
          </LegalP>
          <LegalP>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
            werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte
            Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim
            Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die
            Funktionalität dieser Website eingeschränkt sein.
          </LegalP>
          <LegalP>
            Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur
            Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorbfunktion)
            erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der
            Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur
            technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit andere
            Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, werden
            diese in dieser Datenschutzerklärung gesondert behandelt.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Server-Log-Dateien">
          <LegalP>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
            Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </LegalP>
          <LegalList
            items={[
              "Browsertyp und Browserversion",
              "verwendetes Betriebssystem",
              "Referrer URL",
              "Hostname des zugreifenden Rechners",
              "Uhrzeit der Serveranfrage",
              "IP-Adresse",
            ]}
          />
          <LegalP>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
          </LegalP>
          <LegalP>
            Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung
            von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Kontaktformular">
          <LegalP>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter.
          </LegalP>
          <LegalP>
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit
            ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können
            diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail
            an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge
            bleibt vom Widerruf unberührt.
          </LegalP>
          <LegalP>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
            Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
            Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
            gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
          </LegalP>
        </LegalSubsection>
      </LegalSection>

      {/* 4. Soziale Medien */}
      <LegalSection title="4. Soziale Medien">
        <LegalSubsection title="Facebook-Plugins (Like & Share-Button)">
          <LegalP>
            Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, Anbieter Facebook Inc.,
            1 Hacker Way, Menlo Park, California 94025, USA, integriert. Die Facebook-Plugins
            erkennen Sie an dem Facebook-Logo oder dem „Like-Button" („Gefällt mir") auf unserer
            Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier:{" "}
            <LegalLink href="https://developers.facebook.com/docs/plugins/">
              https://developers.facebook.com/docs/plugins/
            </LegalLink>
          </LegalP>
          <LegalP>
            Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen
            Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die
            Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den
            Facebook „Like-Button" anklicken während Sie in Ihrem Facebook-Account eingeloggt sind,
            können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann
            Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin,
            dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie
            deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der
            Datenschutzerklärung von Facebook unter:{" "}
            <LegalLink href="https://de-de.facebook.com/privacy/explanation">
              https://de-de.facebook.com/privacy/explanation
            </LegalLink>
          </LegalP>
          <LegalP>
            Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem
            Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem
            Facebook-Benutzerkonto aus.
          </LegalP>
        </LegalSubsection>

        <LegalSubsection title="Instagram">
          <LegalP>
            Auf unseren Seiten sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen
            werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA 94025, USA
            integriert.
          </LegalP>
          <LegalP>
            Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des
            Instagram-Buttons die Inhalte unserer Seiten mit Ihrem Instagram-Profil verlinken.
            Dadurch kann Instagram den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir
            weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der
            übermittelten Daten sowie deren Nutzung durch Instagram erhalten.
          </LegalP>
          <LegalP>
            Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram:{" "}
            <LegalLink href="https://instagram.com/about/legal/privacy/">
              https://instagram.com/about/legal/privacy/
            </LegalLink>
          </LegalP>
        </LegalSubsection>
      </LegalSection>

      {/* 5. Analyse-Tools und Werbung */}
      <LegalSection title="5. Analyse-Tools und Werbung">
        <LegalSubsection title="Google Analytics">
          <LegalP>
            Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
            die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
          </LegalP>
          <LegalP>
            Google Analytics verwendet so genannte „Cookies". Das sind Textdateien, die auf Ihrem
            Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie
            ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser
            Website werden in der Regel an einen Server von Google in den USA übertragen und dort
            gespeichert.
          </LegalP>
          <LegalP>
            Die Speicherung von Google-Analytics-Cookies erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des
            Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
          </LegalP>
          <LegalSubsection title="IP Anonymisierung">
            <LegalP>
              Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird
              Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder
              in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor
              der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse
              an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des
              Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung
              der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und
              um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen
              gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von
              Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google
              zusammengeführt.
            </LegalP>
          </LegalSubsection>
          <LegalSubsection title="Browser Plugin">
            <LegalP>
              Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer
              Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall
              gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen
              können. Sie können darüber hinaus die Erfassung der durch den Cookie erzeugten und
              auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie
              die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem
              folgenden Link verfügbare Browser-Plugin herunterladen und installieren:{" "}
              <LegalLink href="https://tools.google.com/dlpage/gaoptout?hl=de">
                https://tools.google.com/dlpage/gaoptout?hl=de
              </LegalLink>
            </LegalP>
          </LegalSubsection>
          <LegalSubsection title="Widerspruch gegen Datenerfassung">
            <LegalP>
              Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf
              folgenden Link klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer
              Daten bei zukünftigen Besuchen dieser Website verhindert: Google Analytics deaktivieren.
            </LegalP>
            <LegalP>
              Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der
              Datenschutzerklärung von Google:{" "}
              <LegalLink href="https://support.google.com/analytics/answer/6004245?hl=de">
                https://support.google.com/analytics/answer/6004245?hl=de
              </LegalLink>
            </LegalP>
          </LegalSubsection>
          <LegalSubsection title="Auftragsverarbeitung">
            <LegalP>
              Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen
              die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Google
              Analytics vollständig um.
            </LegalP>
          </LegalSubsection>
          <LegalSubsection title="Demografische Merkmale bei Google Analytics">
            <LegalP>
              Diese Website nutzt die Funktion „demografische Merkmale" von Google Analytics. Dadurch
              können Berichte erstellt werden, die Aussagen zu Alter, Geschlecht und Interessen der
              Seitenbesucher enthalten. Diese Daten stammen aus interessenbezogener Werbung von Google
              sowie aus Besucherdaten von Drittanbietern. Diese Daten können keiner bestimmten Person
              zugeordnet werden. Sie können diese Funktion jederzeit über die Anzeigeneinstellungen in
              Ihrem Google-Konto deaktivieren oder die Erfassung Ihrer Daten durch Google Analytics
              wie im Punkt „Widerspruch gegen Datenerfassung" dargestellt generell untersagen.
            </LegalP>
          </LegalSubsection>
        </LegalSubsection>
      </LegalSection>
    </LegalPageShell>
  );
}
