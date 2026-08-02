import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CATEGORY_LABEL, type Category } from "./_articles";
import { RatgeberHeader, RatgeberFooter } from "./_shell";

const BASE = "https://www.mehrauftrag.de";

export const metadata: Metadata = {
  title: "Ratgeber – Online-Marketing, Webdesign & mehr Anfragen | Mehr Auftrag",
  description:
    "Der Mehr-Auftrag-Ratgeber: praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für Handwerk, Gastronomie und Dienstleister im Rhein-Main-Gebiet. Verständlich und ohne Fachchinesisch.",
  alternates: { canonical: "/ratgeber" },
  openGraph: {
    title: "Ratgeber – Online-Marketing, Webdesign & mehr Anfragen",
    description:
      "Praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für kleine und mittlere Betriebe im Rhein-Main-Gebiet.",
    url: `${BASE}/ratgeber`,
    siteName: "Mehr Auftrag",
    locale: "de_DE",
    type: "website",
  },
};

// ─── JSON-LD: CollectionPage + ItemList + BreadcrumbList ──────────────────────
function RatgeberSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${BASE}/ratgeber#collection`,
        url: `${BASE}/ratgeber`,
        name: "Ratgeber",
        description:
          "Praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für kleine und mittlere Betriebe.",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${BASE}/ratgeber#list`,
        itemListElement: ARTICLES.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${BASE}/ratgeber/${a.slug}`,
          name: a.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/ratgeber#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${BASE}/ratgeber` },
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

const CATEGORY_ORDER: Category[] = ["Branchen", "Grundlagen", "Regional"];

export default function RatgeberPage() {
  return (
    <>
      <RatgeberSchema />
      <main className="min-h-screen bg-[#04081c] text-slate-200">
        <RatgeberHeader />

        {/* Hero */}
        <section className="relative px-5 pt-16 pb-10 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#3b82f6]">
                Ratgeber
              </p>
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Mehr Anfragen, verständlich erklärt
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
              Praxisnahe Tipps zu Webdesign, Google, SEO und Online-Marketing für
              Handwerk, Gastronomie und Dienstleister, ohne Fachchinesisch und mit
              konkreten Schritten, die du sofort umsetzen kannst.
            </p>
          </div>
        </section>

        {/* Artikel nach Kategorie */}
        <section className="relative px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-14">
            {CATEGORY_ORDER.map((cat) => {
              const items = ARTICLES.filter((a) => a.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="mb-6 text-xl font-bold tracking-[-0.02em] text-white">
                    {CATEGORY_LABEL[cat]}
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/ratgeber/${a.slug}`}
                        className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.04]"
                      >
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3b82f6]">
                          {CATEGORY_LABEL[a.category]}
                        </p>
                        <h3 className="text-lg font-bold leading-snug text-white transition group-hover:text-[#a5cdff]">
                          {a.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                          {a.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6]">
                          Weiterlesen
                          <span aria-hidden className="transition group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-8 text-center sm:p-12">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
              Bereit für mehr Anfragen?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-400">
              Wir schauen uns deinen aktuellen Auftritt an und zeigen dir kostenlos,
              wo dein größtes Potenzial für mehr Kunden liegt.
            </p>
            <Link
              href="/analyse/allgemein"
              className="shimmer-btn mt-6 inline-flex rounded-full bg-[#3b82f6] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
            >
              Kostenlose Analyse anfordern
            </Link>
          </div>
        </section>

        <RatgeberFooter />
      </main>
    </>
  );
}
