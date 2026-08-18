import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnalyse, getAllAnalyseSlugs } from "../_analyse-content";
import { RatgeberHeader, RatgeberFooter } from "../../ratgeber/_shell";
import AnalyseForm from "../_analyse-landing";

const BASE = "https://www.mehrauftrag.de";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAnalyseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getAnalyse(slug);
  if (!c) return { title: "Kostenlose Analyse | Mehr Auftrag" };
  const url = `${BASE}/analyse/${c.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/analyse/${c.slug}` },
    // Formularseiten mit noindex-Flag bleiben erreichbar und vererben Linkkraft
    // weiter (follow), tauchen aber nicht mehr im Index auf.
    ...(c.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      siteName: "Mehr Auftrag",
      locale: "de_DE",
      type: "website",
    },
  };
}

function AnalyseSchema({ slug }: { slug: string }) {
  const c = getAnalyse(slug);
  if (!c) return null;
  const url = `${BASE}/analyse/${c.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.h1,
        description: c.metaDescription,
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
        inLanguage: "de-DE",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Kostenlose Analyse", item: url },
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

export default async function AnalysePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getAnalyse(slug);
  if (!c) notFound();

  return (
    <>
      <AnalyseSchema slug={slug} />
      <main className="min-h-screen bg-[#04081c] text-slate-200">
        <RatgeberHeader />

        <section className="relative px-5 pt-14 pb-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
            {/* Links: Inhalt */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#3b82f6]">
                  {c.eyebrow}
                </p>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                {c.h1}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{c.intro}</p>

              <ul className="mt-8 space-y-3.5">
                {c.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-slate-200">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/15"
                    >
                      <svg
                        className="h-4 w-4 text-[#60a5fa]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-slate-500">
                Fester, transparenter Preis · monatlich kündbar · zuerst ein kostenloser Entwurf.
              </p>
            </div>

            {/* Rechts: Formular */}
            <div className="lg:sticky lg:top-8">
              <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-7 sm:p-8">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-white">
                  {c.formHeadline}
                </h2>
                <p className="mt-2 mb-5 text-sm leading-relaxed text-slate-400">
                  Trag dich kurz ein – wir schauen uns deinen Auftritt an und melden uns
                  unverbindlich. Kein Verkaufsdruck.
                </p>
                <AnalyseForm leadSource={c.leadSource} successNote={c.successNote} />
                <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                  {c.formNote}
                </p>
              </div>
            </div>
          </div>

          {/* zurück */}
          <div className="mx-auto mt-12 max-w-6xl">
            <Link
              href="/ratgeber"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] hover:text-[#6aa8ff]"
            >
              <span aria-hidden>←</span> Zurück zum Ratgeber
            </Link>
          </div>
        </section>

        <RatgeberFooter />
      </main>
    </>
  );
}
