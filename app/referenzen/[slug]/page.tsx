import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCase, getAllCaseSlugs } from "../_cases";
import { RatgeberHeader, RatgeberFooter } from "../../ratgeber/_shell";

const BASE = "https://www.mehrauftrag.de";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Referenzen | Mehr Auftrag" };
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: `/referenzen/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.description,
      url: `${BASE}/referenzen/${c.slug}`,
      siteName: "Mehr Auftrag",
      locale: "de_DE",
      type: "article",
      images: [`${BASE}${c.image}`],
    },
  };
}

// Article mit Person als Autor, dazu BreadcrumbList. Bewusst kein Review- oder
// AggregateRating-Schema, siehe CLAUDE.md.
function CaseSchema({ slug }: { slug: string }) {
  const c = getCase(slug);
  if (!c) return null;
  const url = `${BASE}/referenzen/${c.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: c.h1,
        description: c.description,
        image: `${BASE}${c.image}`,
        datePublished: c.datePublished,
        dateModified: c.dateModified,
        inLanguage: "de-DE",
        isPartOf: { "@id": `${BASE}/#website` },
        mainEntityOfPage: url,
        author: { "@id": `${BASE}/ueber-uns#patrick-sauna` },
        publisher: { "@id": `${BASE}/#organization` },
        about: { "@type": "Organization", name: c.name, url: c.href },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: BASE },
          { "@type": "ListItem", position: 2, name: "Referenzen", item: `${BASE}/referenzen` },
          { "@type": "ListItem", position: 3, name: c.name, item: url },
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

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <div className="min-h-screen bg-[#04081c] text-slate-200">
      <CaseSchema slug={slug} />
      <RatgeberHeader />

      <main className="px-5 py-12 sm:px-8 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Brotkrumen" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">Startseite</Link>
            <span className="px-1.5">/</span>
            <Link href="/referenzen" className="hover:text-slate-300">Referenzen</Link>
            <span className="px-1.5">/</span>
            <span className="text-slate-400">{c.name}</span>
          </nav>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60a5fa]">
            {c.branche} · {c.ort}
          </p>
          <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            {c.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{c.lead}</p>

          <p className="mt-4 text-sm text-slate-500">
            Von{" "}
            <Link href="/ueber-uns" className="text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]">
              Patrick Sauna
            </Link>
            {" · "}
            <time dateTime={c.datePublished}>
              {new Date(c.datePublished).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
            </time>
            {c.dateModified !== c.datePublished && (
              <>
                {" · aktualisiert am "}
                <time dateTime={c.dateModified}>
                  {new Date(c.dateModified).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                </time>
              </>
            )}
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/8">
            <Image
              src={c.image}
              alt={c.imageAlt}
              width={1200}
              height={750}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[12px] text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-12 space-y-12">
            {c.abschnitte.map((a, i) => (
              <section key={i}>
                <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">{a.heading}</h2>
                <div className="space-y-4">
                  {a.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-slate-300">{p}</p>
                  ))}
                </div>
                {a.bullets && a.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {a.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-base text-slate-300">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <h2 className="text-lg font-semibold text-white">Die Website ansehen</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-400">
              Der Auftritt ist live unter{" "}
              <a
                href={c.href}
                target="_blank"
                rel="noopener"
                className="font-semibold text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
              >
                {c.domain}
              </a>
              .
            </p>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-white">Passend dazu</h2>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-base text-[#3b82f6] underline underline-offset-4 hover:text-[#6aa8ff]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-2xl border border-[#3b82f6]/25 bg-[#3b82f6]/[0.06] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Soll dein Betrieb der nächste sein?</h2>
            <p className="mt-2.5 text-base leading-relaxed text-slate-300">
              Erstgespräch per Telefon oder Videocall, danach ein Entwurf zum Anschauen. Kostenlos,
              ohne Termin im Betrieb und ohne Verpflichtung.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/analyse/allgemein"
                className="shimmer-btn rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
              >
                Kostenlose Analyse anfordern
              </Link>
              <Link
                href="/referenzen"
                className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/25"
              >
                Alle Referenzen ansehen
              </Link>
            </div>
          </section>
        </article>
      </main>

      <RatgeberFooter />
    </div>
  );
}
