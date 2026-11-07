/**
 * Schmale Leiste ganz unten auf JEDER Seite, mit genau einem Link auf den
 * Standort-Hub /webdesign-standorte, dazu seit 07.11.2026 das YouTube-Symbol mit Link zum Kanal.
 *
 * Warum in app/layout.tsx und nicht im Footer der Startseite:
 * Vorher stand der Link nur im Footer von app/page.tsx. Damit war der Hub von
 * genau EINER Seite aus erreichbar - von /elektriker, /grafikdesign,
 * /google-ads, /karriere, /kostenlose-analyse, /ratgeber und den
 * Analyse-Seiten gar nicht. Eine Uebersichtsseite, die 16 Unterseiten traegt,
 * braucht mehr als einen einzigen eingehenden Link.
 *
 * Es bleibt bei EINEM Link. Die einzelnen Staedte kommen NICHT hier rein
 * (Ansage von Patrick, 12.08.2026): bei 50 bis 80 Staedten waere ein
 * sitewide Linkblock ein Spam-Signal.
 */
export default function StandorteLeiste() {
  return (
    <div
      className="px-5 py-4 sm:px-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-2">
        <a
          href="/webdesign-standorte"
          className="text-[11px] tracking-wide text-white/40 transition-colors hover:text-white/70"
        >
          Webdesign in Ihrer Stadt
        </a>
        <a
          href="https://www.youtube.com/@MehrAuftrag"
          target="_blank"
          rel="noopener"
          aria-label="Mehr Auftrag auf YouTube"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-wide text-white/40 transition-colors hover:text-white/70"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="5" width="20" height="14" rx="4" />
            <path d="m10 9 5 3-5 3z" />
          </svg>
          YouTube
        </a>
      </div>
    </div>
  );
}
