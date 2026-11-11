import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs, CATEGORY_LABEL } from "../_articles";
import { getAnalyse } from "../../analyse/_analyse-content";
import { RatgeberHeader, RatgeberFooter } from "../_shell";
import WebsiteCheckBox from "../../_components/website-check-box";
import RatgeberMessung from "../../_components/ratgeber-messung";

const TELEFON_ANZEIGE = "01520 2069625";
const TELEFON_LINK = "tel:+4915202069625";
const WHATSAPP_LINK = "https://wa.me/4915202069625";

const BASE = "https://www.mehrauftrag.de";

// Der CTA-Button zeigt normalerweise auf die passende Analyse-Seite /analyse/<slug>.
// Die Route /analyse/[slug] baut aber nur bekannte Slugs (dynamicParams = false).
// Fehlt zu einem neuen Ratgeber-Artikel der Eintrag in _analyse-content.ts, liefe
// der Button also in einen 404. Deshalb hier absichern: gibt es keinen passenden
// Eintrag, wird auf die allgemeine Analyse-Seite zurückgefallen.
function analyseHrefFor(slug: string): string {
  return getAnalyse(slug) ? `/analyse/${slug}` : "/analyse/allgemein";
}

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
        // Autor als Person, nicht als Organisation. Google wertet einen echten,
        // benannten Autor mit eigener Seite als Erfahrungssignal (E-E-A-T).
        author: { "@id": `${BASE}/ueber-uns#patrick-sauna` },
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

            {/* Sichtbare Autorenangabe und Daten. Bis August 2026 standen
                datePublished und dateModified nur im Schema, auf der Seite
                selbst war weder Autor noch Datum zu sehen. */}
            <p className="mt-4 text-sm text-slate-500">
              Von{" "}
              <Link href="/ueber-uns" className="text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]">
                Patrick Sauna
              </Link>
              {" · veröffentlicht am "}
              <time dateTime={article.datePublished}>
                {new Date(article.datePublished).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {article.dateModified !== article.datePublished && (
                <>
                  {" · aktualisiert am "}
                  <time dateTime={article.dateModified}>
                    {new Date(article.dateModified).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                  </time>
                </>
              )}
            </p>

            {/* Intro */}
            <div className="mt-6 space-y-4">
              {article.intro.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>

            {/* Angebotsblock: nur bei Artikeln, deren Leser selbst Zielgruppe sind */}
            {article.angebot && (
              <aside className="mt-8 rounded-2xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-6 sm:p-7">
                <p className="text-lg font-bold leading-snug text-white">{article.angebot.titel}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-300">{article.angebot.text}</p>
                {article.angebot.punkte && article.angebot.punkte.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {article.angebot.punkte.map((pk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span aria-hidden className="mt-0.5 text-[#3b82f6]">✓</span>
                        <span>{pk}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                  {article.angebot.pruefung ? (
                    <>
                      <Link
                        href={article.angebot.pruefung.href}
                        data-messung="ratgeber_klick_pruefung"
                        className="inline-flex justify-center rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
                      >
                        {article.angebot.pruefung.label}
                      </Link>
                      <Link
                        href={article.angebot.cta.href}
                        data-messung="ratgeber_klick_entwurf"
                        className="text-sm font-semibold text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
                      >
                        {article.angebot.cta.label}
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={article.angebot.cta.href}
                      data-messung="ratgeber_klick_entwurf"
                      className="inline-flex justify-center rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
                    >
                      {article.angebot.cta.label}
                    </Link>
                  )}
                  {article.angebot.referenz && (
                    <Link
                      href={article.angebot.referenz.href}
                      className="text-sm font-semibold text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
                    >
                      {article.angebot.referenz.label}
                    </Link>
                  )}
                </div>
                {article.angebot.telefon && (
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-300">
                    Lieber kurz sprechen? Rufen Sie an unter{" "}
                    <a href={TELEFON_LINK} className="font-semibold text-white underline underline-offset-4 hover:text-[#6aa8ff]">
                      {TELEFON_ANZEIGE}
                    </a>{" "}
                    oder schreiben Sie uns per{" "}
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white underline underline-offset-4 hover:text-[#6aa8ff]"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                )}
              </aside>
            )}

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
                  {s.tabelle && (
                    <div className="mt-6">
                      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                          <thead>
                            <tr>
                              {s.tabelle.kopf.map((k, kk) => (
                                <th
                                  key={kk}
                                  scope="col"
                                  className={`border-b border-white/15 px-3 py-3 font-semibold text-white ${kk === s.tabelle!.kopf.length - 1 ? "bg-[#3b82f6]/10" : ""}`}
                                >
                                  {k}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {s.tabelle.zeilen.map((z, zz) => (
                              <tr key={zz} className="border-b border-white/8 align-top">
                                {z.map((zelle, cc) =>
                                  cc === 0 ? (
                                    <th key={cc} scope="row" className="px-3 py-3 font-semibold text-slate-200">
                                      {zelle}
                                    </th>
                                  ) : (
                                    <td
                                      key={cc}
                                      className={`px-3 py-3 text-slate-300 ${cc === z.length - 1 ? "bg-[#3b82f6]/[0.06]" : ""}`}
                                    >
                                      {zelle}
                                    </td>
                                  ),
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {s.tabelle.hinweis && (
                        <p className="mt-3 text-xs leading-relaxed text-slate-500">{s.tabelle.hinweis}</p>
                      )}
                    </div>
                  )}
                  {[...(s.link ? [s.link] : []), ...(s.links ?? [])].map((l, m) => (
                    <p key={m} className="mt-4 text-base leading-relaxed">
                      <Link
                        href={l.href}
                        className="font-semibold text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
                      >
                        {l.label}
                      </Link>
                    </p>
                  ))}
                  {s.hinweis && (
                    <div
                      data-messung-sicht="ratgeber_hinweis_gesehen"
                      className="mt-6 rounded-2xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-5 sm:p-6"
                    >
                      <p className="text-base leading-relaxed text-slate-200">{s.hinweis.text}</p>
                      <Link
                        href={s.hinweis.cta.href}
                        data-messung="ratgeber_klick_pruefung"
                        className="mt-4 inline-flex justify-center rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
                      >
                        {s.hinweis.cta.label}
                      </Link>
                    </div>
                  )}
                  {s.quellen && s.quellen.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-l border-white/10 pl-4">
                      {s.quellen.map((q, qq) => (
                        <li key={qq} className="text-xs leading-relaxed text-slate-500">
                          <a
                            href={q.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-slate-600 underline-offset-2 hover:text-slate-300"
                          >
                            {q.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Anmeldebox fuer das Freebie. Platzierung bewusst nach dem
                Fliesstext und vor den haeufigen Fragen: wer bis hierhin
                gelesen hat, ist im Thema, und die FAQ halten den Leser
                danach noch auf der Seite. */}
            {!article.ohneWebsiteCheck && <WebsiteCheckBox />}

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
            <section data-messung-sicht="ratgeber_ende_erreicht" className="mt-14 rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-8 text-center">
              <h2 className="text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                {article.abschluss ? article.abschluss.titel : "Mehr Anfragen für Ihren Betrieb?"}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-400">
                {article.abschluss
                  ? article.abschluss.text
                  : "Wir schauen uns Ihren Auftritt an und zeigen Ihnen kostenlos, wo Ihr größtes Potenzial liegt, ganz unverbindlich."}
              </p>
              <Link
                href={article.abschluss ? article.abschluss.cta.href : analyseHrefFor(article.slug)}
                data-messung={article.abschluss ? "ratgeber_klick_auftragsfilter" : "ratgeber_klick_pruefung"}
                className="shimmer-btn mt-6 inline-flex rounded-full bg-[#3b82f6] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
              >
                {article.abschluss ? article.abschluss.cta.label : "Kostenlose Analyse anfordern"}
              </Link>
            </section>

            {/* Related */}
            {article.related.length > 0 && (
              <section className="mt-14">
                <h2 className="mb-5 text-lg font-bold tracking-[-0.02em] text-white">
                  Das könnte Sie auch interessieren
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
        <RatgeberMessung />
      </main>
    </>
  );
}
