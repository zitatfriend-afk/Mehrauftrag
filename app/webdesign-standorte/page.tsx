import type { Metadata } from "next";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: "Webdesign in deiner Stadt | Alle Standorte | Mehr Auftrag",
  description:
    "Alle Städte, in denen wir Websites für lokale Betriebe bauen, von Hanau und Offenbach bis Frankfurt, Köln und Leipzig. Ein Standort je Seite.",
  alternates: { canonical: "https://www.mehrauftrag.de/webdesign-standorte" },
  openGraph: {
    title: "Webdesign in deiner Stadt",
    description:
      "Alle Standorte von Mehr Auftrag im Überblick. Websites, die lokal gefunden werden.",
    url: "https://www.mehrauftrag.de/webdesign-standorte",
    images: ["https://www.mehrauftrag.de/og-image.jpg"],
  },
};

type Stadt = { slug: string; name: string; beschreibung: string };

/**
 * Liest die Stadt-Landingpages zur Buildzeit direkt aus /public.
 * Dadurch erscheint jede neue Welle automatisch hier, ohne dass jemand
 * diese Datei anfassen muss. Der Stadtname kommt aus dem geo.placename-Tag.
 */
function ladeStaedte(): Stadt[] {
  const dir = join(process.cwd(), "public");
  return readdirSync(dir)
    .filter((f) => f.startsWith("webdesign-") && f.endsWith(".html"))
    .map((f) => {
      const html = readFileSync(join(dir, f), "utf8");
      const name =
        html.match(/<meta name="geo\.placename" content="([^"]+)"/)?.[1] ??
        f.replace("webdesign-", "").replace(".html", "");
      const beschreibung =
        html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
      return {
        slug: f.replace(".html", ""),
        name,
        beschreibung: beschreibung.split(".")[0] + ".",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

/** Zuordnung Stadt zu Region. Unbekannte Städte landen unter "Weitere Städte". */
const REGIONEN: { titel: string; hinweis: string; staedte: string[] }[] = [
  {
    titel: "Rhein-Main und Untermain",
    hinweis:
      "Unser Kerngebiet rund um Hainburg. Hier kommen wir für das Erstgespräch persönlich vorbei.",
    staedte: [
      "Hanau",
      "Offenbach",
      "Seligenstadt",
      "Rodgau",
      "Obertshausen",
      "Mühlheim am Main",
      "Dietzenbach",
      "Aschaffenburg",
      "Frankfurt",
    ],
  },
  {
    titel: "Weitere Großstädte",
    hinweis:
      "Bundesweit betreut, mit Abstimmung per Telefon und Videocall. Gleiche Arbeit, gleicher Preis.",
    staedte: [
      "Berlin",
      "Hamburg",
      "München",
      "Köln",
      "Stuttgart",
      "Düsseldorf",
      "Leipzig",
      "Dortmund",
      "Essen",
      "Bremen",
      "Dresden",
      "Hannover",
      "Nürnberg",
      "Duisburg",
      "Bochum",
      "Wuppertal",
      "Bielefeld",
      "Bonn",
      "Münster",
      "Mannheim",
      "Karlsruhe",
      "Augsburg",
      "Wiesbaden",
      "Mönchengladbach",
    ],
  },
];

export default function StandortePage() {
  const alle = ladeStaedte();

  const gruppen = REGIONEN.map((r) => ({
    ...r,
    treffer: alle.filter((s) => r.staedte.includes(s.name)),
  })).filter((g) => g.treffer.length > 0);

  const zugeordnet = new Set(gruppen.flatMap((g) => g.treffer.map((s) => s.slug)));
  const rest = alle.filter((s) => !zugeordnet.has(s.slug));
  if (rest.length > 0) {
    gruppen.push({
      titel: "Weitere Städte",
      hinweis: "Auch hier bauen wir Websites für lokale Betriebe.",
      staedte: [],
      treffer: rest,
    });
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Standorte von Mehr Auftrag",
    numberOfItems: alle.length,
    itemListElement: alle.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Webdesign ${s.name}`,
      url: `https://www.mehrauftrag.de/${s.slug}`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://www.mehrauftrag.de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Standorte",
        item: "https://www.mehrauftrag.de/webdesign-standorte",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="min-h-screen px-5 sm:px-8 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          {/* Brotkrumen */}
          <nav
            aria-label="Brotkrumennavigation"
            className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-white/40"
          >
            <a href="/" className="underline underline-offset-4 hover:text-white/80 transition-colors">
              Startseite
            </a>
            <span className="opacity-50">›</span>
            <span className="text-white/55">Standorte</span>
          </nav>

          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cyan-400">
            Einsatzgebiet
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Webdesign in deiner Stadt
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Für jede Stadt haben wir eine eigene Seite gebaut, mit den Zahlen und
            Branchen, die dort tatsächlich zählen. Such dir deine Stadt heraus,
            oder ruf einfach an: wir arbeiten auch dort, wo noch keine Seite
            steht.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:+4915202069625"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-cyan-400/40"
            >
              📞 +49 152 02069625
            </a>
            <a
              href="https://wa.me/4915202069625"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-cyan-400/40"
            >
              💬 WhatsApp
            </a>
          </div>

          {gruppen.map((g) => (
            <section key={g.titel} className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {g.titel}
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/45">
                {g.hinweis}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.treffer.map((s) => (
                  <li key={s.slug} className="flex">
                    <a
                      href={`/${s.slug}`}
                      className="group flex h-full w-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/[0.055]"
                    >
                      <span className="block text-[17px] font-semibold text-white">
                        Webdesign {s.name}
                      </span>
                      <span className="mt-1.5 block text-[13.5px] leading-relaxed text-white/40">
                        {s.beschreibung}
                      </span>
                      <span className="mt-auto pt-3 inline-block text-[13px] font-semibold text-cyan-400/70 transition-colors group-hover:text-cyan-400">
                        Ansehen →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="mt-16 rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/[0.13] to-cyan-600/[0.04] p-8 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Deine Stadt ist nicht dabei?
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-white/60">
              Kein Problem, wir bauen bundesweit. Die Seiten hier entstehen nach
              und nach, das Einsatzgebiet ist längst größer. Ruf an oder schreib
              uns, dann klären wir in fünf Minuten, ob wir zueinander passen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:-translate-y-0.5"
              >
                Zur Startseite
              </a>
              <a
                href="/kostenlose-analyse"
                className="inline-flex items-center rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-[15px] font-semibold text-white/85 transition-colors hover:border-cyan-400/40"
              >
                Kostenlose Analyse
              </a>
            </div>
          </section>

          <p className="mt-12 text-[13px] text-white/30">
            Mehr Auftrag · Josefstraße 28 · 63512 Hainburg ·{" "}
            <a href="/impressum" className="underline underline-offset-4 hover:text-white/60">
              Impressum
            </a>{" "}
            ·{" "}
            <a href="/datenschutz" className="underline underline-offset-4 hover:text-white/60">
              Datenschutz
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
