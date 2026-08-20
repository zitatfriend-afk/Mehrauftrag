/**
 * Schmale Leiste ganz unten auf JEDER Seite, mit genau einem Link auf den
 * Standort-Hub /webdesign-standorte.
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
          Webdesign in deiner Stadt
        </a>
      </div>
    </div>
  );
}
