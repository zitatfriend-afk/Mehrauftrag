import Link from "next/link";
import MaMark from "../_components/ma-mark";

// Gemeinsamer Header/Footer für den Ratgeber-Bereich (Marken-Design).

export function RatgeberHeader() {
  return (
    <header className="relative z-10 border-b border-white/5 px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link href="/" className="inline-flex min-w-0 items-center gap-2.5 select-none">
          <MaMark size={38} priority />
          <span className="text-[18px] font-black leading-none tracking-[-0.04em]">
            <span className="text-white">Mehr</span>
            <span className="gradient-text-blue">Auftrag</span>
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/ratgeber"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            Ratgeber
          </Link>
          <Link
            href="/referenzen"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            Referenzen
          </Link>
          <Link
            href="/suchmaschinenoptimierung"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            SEO
          </Link>
          <Link
            href="/analyse/allgemein"
            className="shimmer-btn shrink-0 whitespace-nowrap rounded-full bg-[#3b82f6] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2f74e0] min-[420px]:px-5 min-[420px]:text-sm"
          >
            {/* Unter 420 Pixel passt die lange Beschriftung nicht neben den
                Schriftzug, sie wurde bisher am rechten Rand abgeschnitten. */}
            <span className="min-[420px]:hidden">Analyse</span>
            <span className="hidden min-[420px]:inline">Kostenlose Analyse</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Leistungs- und Branchenseiten, die Anfragen bringen sollen. Stehen hier, damit
// jede Ratgeber-, Referenz- und Analyse-Seite sie verlinkt. Bis Oktober 2026
// verlinkte keine dieser Seiten eine einzige Branchenseite, waehrend die
// Stadtseiten ueber den Standort-Hub sitewide Links bekamen.
const BRANCHEN_LINKS = [
  { label: "Website für Schweißbetriebe", href: "/webseite-fuer-schweisser" },
  { label: "Website für Trockenbau", href: "/webseite-fuer-trockenbau" },
  { label: "Website für Hausmeisterservice", href: "/webseite-fuer-hausmeisterservice" },
  { label: "Website für Gebäudereinigung", href: "/webseite-fuer-gebaeudereinigung" },
  { label: "Website für Kosmetikstudio", href: "/webseite-fuer-kosmetikstudio" },
  { label: "Website für Physiotherapie", href: "/webseite-fuer-physiotherapie" },
  { label: "Website für Gastronomie", href: "/webseite-fuer-gastronomie" },
  { label: "Website für Handwerker", href: "/website-fuer-handwerker" },
];
const LEISTUNG_LINKS = [
  { label: "Website bringt keine Anfragen", href: "/website-bringt-keine-anfragen" },
  { label: "Website relaunchen lassen", href: "/website-relaunch" },
  { label: "Suchmaschinenoptimierung", href: "/suchmaschinenoptimierung" },
  { label: "Referenzen", href: "/referenzen" },
];

export function RatgeberFooter() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
      <nav aria-label="Branchen und Leistungen" className="mx-auto mb-10 grid max-w-6xl gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Websites nach Branche</p>
          <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {BRANCHEN_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Leistungen</p>
          <ul className="grid grid-cols-1 gap-2 text-sm">
            {LEISTUNG_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <Link href="/" className="inline-flex items-center gap-2.5 select-none">
          <MaMark size={34} />
          <span className="text-[17px] font-black leading-none tracking-[-0.04em]">
            <span className="text-white">Mehr</span>
            <span className="gradient-text-blue">Auftrag</span>
          </span>
        </Link>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Mehr Auftrag ·{" "}
          <Link href="/impressum" className="hover:text-slate-300">Impressum</Link> ·{" "}
          <Link href="/datenschutz" className="hover:text-slate-300">Datenschutz</Link> ·{" "}
          <Link href="/agb" className="hover:text-slate-300">AGB</Link>
        </p>
      </div>
    </footer>
  );
}
