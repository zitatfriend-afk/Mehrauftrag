import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RatgeberHeader, RatgeberFooter } from "../ratgeber/_shell";

const BASE = "https://www.mehrauftrag.de";

export const metadata: Metadata = {
  title: "Über uns: wer hinter Mehr Auftrag steht | Mehr Auftrag",
  description:
    "Patrick Sauna über die Arbeitsweise von Mehr Auftrag: kostenloser Entwurf vorab, fester Preis, ortsunabhängige Zusammenarbeit und was wir bewusst nicht anbieten.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: "Über uns: wer hinter Mehr Auftrag steht",
    description:
      "Wie wir arbeiten, was wir belegen können und was wir bewusst nicht anbieten.",
    url: `${BASE}/ueber-uns`,
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "profile",
  },
};

// Person-Schema fuer Patrick Sauna. Die @id wird von den Ratgeberartikeln und
// den Fallstudien als author referenziert, damit Google einen echten Autor
// sieht statt nur die Organisation.
function UeberUnsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/ueber-uns#patrick-sauna`,
        name: "Patrick Sauna",
        url: `${BASE}/ueber-uns`,
        jobTitle: "Geschäftsführer",
        worksFor: { "@id": `${BASE}/#organization` },
        knowsAbout: [
          "Webdesign",
          "Suchmaschinenoptimierung",
          "Lokale Suchmaschinenoptimierung",
          "Google Ads",
          "Google Unternehmensprofil",
          "Corporate Design",
        ],
        email: "info@mehrauftrag.de",
        telephone: "+49 152 02069625",
      },
      {
        "@type": "AboutPage",
        "@id": `${BASE}/ueber-uns#aboutpage`,
        url: `${BASE}/ueber-uns`,
        name: "Über Mehr Auftrag",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
        mainEntity: { "@id": `${BASE}/ueber-uns#patrick-sauna` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/ueber-uns#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Über uns", item: `${BASE}/ueber-uns` },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-[#04081c] text-slate-200">
      <UeberUnsSchema />
      <RatgeberHeader />

      <main className="px-5 py-12 sm:px-8 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Brotkrumen" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">Startseite</Link>
            <span className="px-1.5">/</span>
            <span className="text-slate-400">Über uns</span>
          </nav>

          <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Wer hinter Mehr Auftrag steht
          </h1>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src="/neuesprofilbild.webp"
              alt="Patrick Sauna, Geschäftsführer von Mehr Auftrag"
              width={160}
              height={160}
              className="h-32 w-32 flex-shrink-0 rounded-2xl object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-white">Patrick Sauna</p>
              <p className="text-sm text-slate-400">Geschäftsführer, Mehr Auftrag</p>
              <p className="mt-2 text-sm text-slate-400">
                <a href="mailto:info@mehrauftrag.de" className="hover:text-slate-200">info@mehrauftrag.de</a>
                {" · "}
                <a href="tel:+4915202069625" className="hover:text-slate-200">+49 152 02069625</a>
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-11">
            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                Warum es diese Agentur gibt
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-300">
                <p>
                  Ich habe selbst erlebt, wie schwer es ist, als kleiner Betrieb online gegen
                  Unternehmen mit deutlich größeren Budgets zu bestehen. Wer zwölf Leute beschäftigt
                  und gute Arbeit macht, verliert Anfragen nicht deshalb, weil er schlechter wäre,
                  sondern weil er in der Suche nicht auftaucht oder dort schlechter aussieht, als er
                  ist.
                </p>
                <p>
                  Deshalb gibt es Mehr Auftrag. Keine generischen Pakete, keine Konzeptpräsentationen,
                  für die jemand drei Wochen bezahlt. Eine Website und die Sichtbarkeit dazu, damit
                  Anfragen ankommen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                Wie wir arbeiten
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-300">
                <p>
                  Der Ablauf ist bei jedem Projekt gleich, und er beginnt nicht mit einem Angebot,
                  sondern mit einem Entwurf. Du siehst, was du bekommst, bevor du dich entscheidest.
                </p>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  ["Gespräch", "Per Telefon oder Videocall, kostenlos. Wir wollen verstehen, was du anbietest, wer deine Kunden sind und wofür du gefunden werden willst."],
                  ["Entwurf", "Du bekommst einen Entwurf als Link und schaust ihn dir an, wann es dir passt. Erst danach reden wir über Geld."],
                  ["Umsetzung", "In der Regel innerhalb von rund ein bis zwei Wochen, abhängig davon, wie viele Leistungen dargestellt werden."],
                  ["Sichtbarkeit", "Google-Unternehmensprofil, technische Grundlagen, eine eigene Seite je Leistung. Danach schauen wir in die Search Console, statt zu behaupten, es liefe."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/12 text-sm font-bold text-[#60a5fa]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{t}</p>
                      <p className="mt-1 text-base leading-relaxed text-slate-400">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                Warum wir ortsunabhängig arbeiten
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-300">
                <p>
                  Abstimmung, Entwurf und Freigabe laufen per Telefon, WhatsApp und Videocall. Das ist
                  bei uns der Normalfall und kein Notbehelf. Für jemanden, der tagsüber auf der
                  Baustelle steht, im Objekt oder in der Werkstatt, ist ein Agenturtermin am
                  Vormittag ein halber verlorener Arbeitstag. Eine Sprachnachricht um halb neun abends
                  ist kein Problem.
                </p>
                <p>
                  Für die Sichtbarkeit selbst spielt die Entfernung ohnehin keine Rolle. Ob dein
                  Betrieb bei einer Suche nach deinem Gewerk plus deinem Ort auftaucht, hängt an
                  Inhalt, Technik und Google-Profil, nicht an der Postleitzahl der Agentur. Was zählt,
                  ist Marktkenntnis: welche Betriebsgrößen in deiner Stadt üblich sind, wie stark dein
                  Gewerk dort besetzt ist und mit welchen Wörtern deine Kunden suchen. Genau das
                  recherchieren wir, bevor eine Zeile geschrieben wird.
                </p>
                <p>
                  Dass das trägt, lässt sich nachlesen. Der Auftritt für einen mobilen Schweißservice
                  im Sauerland ist über mehrere hundert Kilometer Entfernung entstanden, ohne einen
                  einzigen Termin im Betrieb. Die{" "}
                  <Link href="/referenzen/sorokin-schweissservice" className="text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]">
                    Fallstudie dazu
                  </Link>{" "}
                  beschreibt, wie das abgelaufen ist.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                Was wir bewusst nicht machen
              </h2>
              <ul className="space-y-2.5">
                {[
                  "Platz eins in vier Wochen versprechen. Wir sagen vorher, was in deinem Wettbewerb realistisch ist.",
                  "Preise nennen, bevor wir wissen, was gebaut werden soll. Der Entwurf kommt zuerst.",
                  "Lange Vertragsbindungen. Die laufende Betreuung ist monatlich kündbar.",
                  "Zahlen erfinden. Wo wir kein Ergebnis belegen können, schreiben wir, was sich verändert hat, und keine Prozentangabe.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base leading-relaxed text-slate-300">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                Was wir belegen können
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-300">
                <p>
                  Fünf Projekte sind ausführlich dokumentiert, mit Ausgangslage, Vorgehen und
                  Ergebnis: ein Renovierungsbetrieb in Frankfurt, eine Pizzeria in Norddeutschland,
                  ein mobiler Schweißservice im Sauerland und zwei Reinigungsunternehmen. Alle fünf
                  Websites sind live und öffentlich erreichbar.
                </p>
                <p>
                  Dazu kommen die Bewertungen im Google-Unternehmensprofil. Sie stehen wörtlich und
                  ungekürzt auf der Startseite, so wie sie dort veröffentlicht sind.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/referenzen"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25"
                >
                  Alle fünf Fallstudien ansehen
                </Link>
                <Link
                  href="/ratgeber"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25"
                >
                  Ratgeber lesen
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/[0.06] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Direkt sprechen</h2>
              <p className="mt-2.5 text-base leading-relaxed text-slate-300">
                Erstgespräch per Telefon oder Videocall, kostenlos und ohne Verpflichtung. Wenn wir
                der Meinung sind, dass sich der Aufwand in deinem Markt nicht lohnt, sagen wir das
                auch.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="tel:+4915202069625"
                  className="shimmer-btn rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
                >
                  +49 152 02069625
                </a>
                <a
                  href="https://wa.me/4915202069625"
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25"
                >
                  WhatsApp schreiben
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <RatgeberFooter />
    </div>
  );
}
