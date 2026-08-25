import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CASES } from "./_cases";
import { RatgeberHeader, RatgeberFooter } from "../ratgeber/_shell";

const BASE = "https://www.mehrauftrag.de";

export const metadata: Metadata = {
  title: "Referenzen: fünf Projekte im Detail | Mehr Auftrag",
  description:
    "Fünf gebaute Websites aus Handwerk, Gastronomie, Metallbau und Gebäudereinigung. Ausgangslage, Vorgehen und Ergebnis, jeweils als eigene Fallstudie.",
  alternates: { canonical: "/referenzen" },
  openGraph: {
    title: "Referenzen: fünf Projekte im Detail",
    description:
      "Ausgangslage, Vorgehen und Ergebnis aus fünf echten Projekten in Handwerk, Gastronomie, Metallbau und Reinigung.",
    url: `${BASE}/referenzen`,
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

function ReferenzenSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${BASE}/referenzen#collection`,
        url: `${BASE}/referenzen`,
        name: "Referenzen",
        description:
          "Fünf Fallstudien zu gebauten Websites aus Handwerk, Gastronomie, Metallbau und Gebäudereinigung.",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${BASE}/referenzen#list`,
        itemListElement: CASES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${BASE}/referenzen/${c.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/referenzen#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Referenzen", item: `${BASE}/referenzen` },
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

export default function ReferenzenPage() {
  return (
    <div className="min-h-screen bg-[#04081c] text-slate-200">
      <ReferenzenSchema />
      <RatgeberHeader />

      <main className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Brotkrumen" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">Startseite</Link>
            <span className="px-1.5">/</span>
            <span className="text-slate-400">Referenzen</span>
          </nav>

          <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Fünf Projekte, fünf verschiedene Ausgangslagen
          </h1>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-300">
            <p>
              Auf den meisten Agenturseiten steht eine Reihe Logos, und darunter das Wort Referenzen.
              Das sagt niemandem etwas. Interessant ist nicht, für wen jemand gearbeitet hat, sondern
              was vorher das Problem war und was sich danach geändert hat. Deshalb hat hier jedes
              Projekt eine eigene Seite bekommen, mit Ausgangslage, Vorgehen und Ergebnis.
            </p>
            <p>
              Die fünf Betriebe könnten unterschiedlicher kaum sein. Ein Renovierungsbetrieb aus
              Frankfurt mit einem Dutzend Gewerken, eine Pizzeria in Norddeutschland, ein mobiler
              Schweißservice im Sauerland und zwei Reinigungsunternehmen, eines davon mit
              angeschlossenem Hausmeisterservice. Trotzdem tauchte in fast jedem Fall dieselbe
              Ausgangslage auf: Die Arbeit war gut, die Kundschaft zufrieden, und trotzdem kam online
              nichts davon an. Entweder war der Betrieb gar nicht auffindbar, oder er war auffindbar
              und wirkte dabei kleiner, als er ist.
            </p>
            <p>
              Was in diesen Projekten am meisten gebracht hat, war selten das Design. Es war die
              Sortierung. Ein Handwerksbetrieb mit zwölf Gewerken braucht zwölf klar benannte
              Leistungen und nicht einen Absatz, in dem alle vorkommen. Ein Reinigungsunternehmen
              braucht getrennte Strecken für Unterhaltsreinigung und Bauendreinigung, weil
              Auftraggeber genau so suchen. Eine Pizzeria braucht die Speisekarte als Seite und nicht
              als Datei zum Herunterladen. Das klingt banal, entscheidet aber darüber, ob eine
              Suchanfrage bei dir landet oder beim Wettbewerber.
            </p>
            <p>
              Der zweite wiederkehrende Punkt ist die Anfragestrecke. Eine Website, die schön aussieht
              und keine Anfrage auslöst, hat ihren Zweck verfehlt. In allen fünf Projekten steckt
              deshalb Arbeit darin, den Weg von der Frage bis zur Kontaktaufnahme so kurz wie möglich
              zu halten: die Telefonnummer im ersten sichtbaren Bereich, ein Formular mit wenigen
              Feldern statt einem Fragebogen, WhatsApp dort, wo die Zielgruppe ohnehin schreibt.
            </p>
            <p>
              Ein Projekt in dieser Liste ist über mehrere hundert Kilometer Entfernung entstanden,
              ohne dass wir uns je im Betrieb getroffen hätten. Das ist inzwischen unser Normalfall
              und kein Notbehelf. Abstimmung läuft per Telefon, Videocall und WhatsApp, der Entwurf
              kommt als Link. Für einen Betrieb, dessen Inhaber tagsüber auf der Baustelle steht, ist
              das der praktischere Weg. Mehr dazu steht in der Fallstudie zum{" "}
              <Link href="/referenzen/sorokin-schweissservice" className="text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]">
                mobilen Schweißservice aus dem Sauerland
              </Link>
              .
            </p>
            <p>
              Alle fünf Websites sind live und öffentlich erreichbar. Wo eine Zahl fehlt, steht hier
              keine. Wir schreiben lieber, was sich verändert hat, als eine Prozentangabe zu erfinden,
              die niemand nachprüfen kann.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {CASES.map((c) => (
              <article
                key={c.slug}
                className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr]">
                  <Link href={`/referenzen/${c.slug}`} className="block">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      width={480}
                      height={360}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </Link>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                      {c.branche} · {c.ort}
                    </p>
                    <h2 className="mt-2 text-xl font-bold leading-snug text-white">
                      <Link href={`/referenzen/${c.slug}`} className="hover:text-[#93c5fd]">
                        {c.name}
                      </Link>
                    </h2>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{c.kurz}</p>
                    <p className="mt-4">
                      <Link
                        href={`/referenzen/${c.slug}`}
                        className="text-sm font-semibold text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
                      >
                        Fallstudie {c.name} lesen
                      </Link>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-14 rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/[0.06] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Wie so ein Projekt beginnt</h2>
            <p className="mt-2.5 text-base leading-relaxed text-slate-300">
              Mit einem Gespräch per Telefon oder Videocall, in dem wir uns anschauen, wofür du heute
              gefunden wirst und wofür nicht. Danach bekommst du einen Entwurf, bevor über Geld
              gesprochen wird.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/analyse/allgemein"
                className="shimmer-btn rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
              >
                Kostenlose Analyse anfordern
              </Link>
              <Link
                href="/suchmaschinenoptimierung"
                className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25"
              >
                Suchmaschinenoptimierung ansehen
              </Link>
            </div>
          </section>
        </div>
      </main>

      <RatgeberFooter />
    </div>
  );
}
