import type { Metadata } from "next";
import Link from "next/link";
import { RatgeberHeader, RatgeberFooter } from "../../ratgeber/_shell";

// Dankesseite nach dem Klick im Bestaetigungslink. Brevo leitet nach dem
// bestaetigten Double-Opt-In hierher. Auch diese Seite bleibt bewusst aus dem
// Index: sonst laege das PDF ueber die Suche frei, und die Anmeldung waere
// wertlos.
export const metadata: Metadata = {
  title: "Deine Checkliste liegt bereit | Mehr Auftrag",
  description:
    "Danke für die Bestätigung. Hier kannst du den Website-Check direkt herunterladen.",
  robots: { index: false, follow: true },
};

const PDF = "/Website-Check-Mehr-Auftrag.pdf";
const TERMIN = "https://termine.mehrauftrag.de/";

export default function DankeSeite() {
  return (
    <main className="min-h-screen bg-[#04081c] text-slate-200">
      <RatgeberHeader />

      <section className="relative px-5 pt-16 pb-8 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(59,130,246,0.15)" }}
          >
            <svg
              className="h-7 w-7 text-[#60a5fa]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Deine Checkliste liegt bereit
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Lad sie dir hier direkt herunter. Den Link schicke ich dir gleich auch noch
            per E-Mail, damit du ihn später wiederfindest.
          </p>

          <a
            href={PDF}
            className="shimmer-btn mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#3b82f6] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#2f74e0] sm:w-auto"
          >
            Website-Check herunterladen
          </a>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-6 text-center sm:p-8">
          <h2 className="text-xl font-black tracking-[-0.02em] text-white">
            Mehr als drei Punkte offen?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            Wenn du beim Durchgehen merkst, dass mehr als drei Punkte offen sind, schauen wir
            uns deine Seite gerne einmal an und sagen dir ehrlich, was wir sehen. Kostenlos,
            unverbindlich, telefonisch oder per Videotermin.
          </p>
          <a
            href={TERMIN}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-[#3b82f6]/40 bg-white/[0.03] px-7 py-4 text-base font-semibold text-white transition hover:border-[#3b82f6] hover:bg-white/[0.06] sm:w-auto"
          >
            Termin aussuchen
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-xl text-center">
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] hover:text-[#6aa8ff]"
          >
            <span aria-hidden>←</span> Zurück zu den Ratgebern
          </Link>
        </div>
      </section>

      <RatgeberFooter />
    </main>
  );
}
