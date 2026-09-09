import type { Metadata } from "next";
import Link from "next/link";
import { RatgeberHeader, RatgeberFooter } from "../../ratgeber/_shell";

// Zwischenseite direkt nach dem Absenden der Anmeldebox. Sie gehoert NICHT in
// den Index: eine Seite, die nur im Ablauf einer Anmeldung Sinn ergibt, hat in
// den Suchergebnissen nichts verloren.
export const metadata: Metadata = {
  title: "Bitte bestätige deine Anmeldung | Mehr Auftrag",
  description:
    "Fast geschafft. Bestätige deine Anmeldung zum Website-Check mit einem Klick in der E-Mail.",
  robots: { index: false, follow: true },
};

export default function BitteBestaetigenSeite() {
  return (
    <main className="min-h-screen bg-[#04081c] text-slate-200">
      <RatgeberHeader />

      <section className="relative px-5 pt-16 pb-20 sm:px-8">
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
              strokeWidth={1.8}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Fast geschafft, bitte bestätige noch kurz
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Wir haben dir eine E-Mail geschickt. Klick darin auf den Bestätigungslink, dann
            kommst du direkt zur Checkliste.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Falls die Nachricht nicht ankommt, schau bitte im Spam-Ordner nach und markiere
            sie als kein Spam, damit die folgenden E-Mails zuverlässig ankommen.
          </p>

          <div className="mt-10">
            <Link
              href="/ratgeber"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] hover:text-[#6aa8ff]"
            >
              <span aria-hidden>←</span> Zurück zu den Ratgebern
            </Link>
          </div>
        </div>
      </section>

      <RatgeberFooter />
    </main>
  );
}
