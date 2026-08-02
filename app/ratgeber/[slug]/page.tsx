import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs, CATEGORY_LABEL } from "../_articles";
import { RatgeberHeader, RatgeberFooter } from "../_shell";

const BASE = "https://www.mehrauftrag.de";

// Nur bekannte Slugs erzeugen, alles andere ergibt 404.
export const dynamicParams = false;

// Alle Artikel zur Build-Zeit statisch erzeugen.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Ratgeber | Mehr Auftrag" };
  }
  const url = `${BASE}/ratgeber/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.description,
    alternates: { canonical: `/ratgeber/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      url,
      siteName: "Mehr Auftrag",
      locale: "de_DE",
      type: "article",
    },
  };
}

function ArticleSchema({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) return null;
  const url = `${BASE}/ratgeber/${article.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: "de-DE",
        mainEntityOfPage: url,
        author: { "@id": `${BASE}/#organization` },
        publisher: { "@id": `${BASE}/#organization` },
        image: `${BASE}/icon.png`,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: article.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${BASE}/ratgeber` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <ArticleSchema slug={slug} />
      <main className="min-h-screen bg-[#04081c] text-slate-200">
        <RatgeberHeader />

        <article className="relative px-5 pt-12 pb-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-300">
                Start
              </Link>
              <span className="mx-2">/</span>
              <Link href="/ratgeber" className="hover:text-slate-300">
                Ratgeber
              </Link>
            </nav>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3b82f6]">
              {CATEGORY_LABEL[article.category]} · {article.readingTime} Lesezeit
            </p>
            <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              {article.title}
            </h1>

            {/* Intro */}
            <div className="mt-6 space-y-4">
              {article.intro.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>

            {/* Sections */}
            <div className="mt-10 space-y-10">
              {article.sections.map((s, i) => (
                <section key={i}>
                  <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                    {s.heading}
                  </h2>
                  <div className="space-y-4">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-slate-300">
                        {p}
                      </p>
                    ))}
                  </div>
                  {s.bullets && s.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {s.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-base text-slate-300">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* FAQ */}
            {article.faqs.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-6 text-2xl font-bold tracking-[-0.02em] text-white">
                  Häufige Fragen
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((f, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] p-6"
                    >
                      <h3 className="text-lg font-semibold text-white">{f.q}</h3>
                      <p className="mt-2.5 text-base leading-relaxed text-slate-400">
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-14 rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-8 text-center">
              <h2 className="text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                Mehr Anfragen für deinen Betrieb?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-400">
                Wir schauen uns deinen Auftritt an und zeigen dir kostenlos, wo dein
                größtes Potenzial liegt, ganz unverbindlich.
              </p>
              <Link
                href={`/analyse/${article.slug}`}
                className="shimmer-btn mt-6 inline-flex rounded-full bg-[#3b82f6] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
              >
                Kostenlose Analyse anfordern
              </Link>
            </section>

            {/* Related */}
            {article.related.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-5 text-lg font-bold tracking-[-0.02em] text-white">
                  Das könnte dich auch interessieren
                </h2>
                <div className="flex flex-wrap gap-3">
                  {article.related.filter((r) => r.href !== "/kostenlose-analyse").map((r, i) => (
                    <Link
                      key={i}
                      href={r.href}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-[#3b82f6]/40 hover:text-white"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Zurück */}
            <div className="mt-12">
              <Link
                href="/ratgeber"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] hover:text-[#6aa8ff]"
              >
                <span aria-hidden>←</span> Alle Ratgeber-Artikel
              </Link>
            </div>
          </div>
        </article>

        <RatgeberFooter />
      </main>
    </>
  );
}
