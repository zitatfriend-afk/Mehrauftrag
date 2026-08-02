import Link from "next/link";
import MaMark from "../_components/ma-mark";

// Gemeinsamer Header/Footer für den Ratgeber-Bereich (Marken-Design).

export function RatgeberHeader() {
  return (
    <header className="relative z-10 border-b border-white/5 px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 select-none">
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
            href="/analyse/allgemein"
            className="shimmer-btn rounded-full bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f74e0]"
          >
            Kostenlose Analyse
          </Link>
        </div>
      </div>
    </header>
  );
}

export function RatgeberFooter() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
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
