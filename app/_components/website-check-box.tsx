"use client";

/**
 * Anmeldebox fuer das Freebie "Der Website-Check fuer Betriebe".
 *
 * Steht auf allen Ratgeber-Seiten zwischen Fliesstext und den haeufigen Fragen.
 * Bewusst NICHT auf /website-fuer-handwerker: dort laeuft bezahlter Traffic auf
 * den kostenlosen Entwurf, eine zweite Conversion wuerde die primaere
 * kannibalisieren.
 *
 * Absendeweg: POST auf die eigene Route /api/website-check. Die spricht
 * serverseitig mit Brevo (Double-Opt-In), damit der API-Schluessel nicht im
 * Browser landet. Nach dem Absenden geht es auf die Zwischenseite, die um die
 * Bestaetigung der Mail bittet. Erst nach dem Klick im Postfach traegt Brevo
 * den Kontakt in die Liste ein und startet die Strecke.
 *
 * Vorname ist freiwillig, nur die E-Mail ist Pflicht. Das ist datensparsam und
 * rechtlich unangreifbar, eine fehlende Anrede faengt die Mailvorlage ab.
 */

import { useState, useRef, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

type SubmitState = "idle" | "loading" | "error";

const FELD_KLASSE =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]";

export default function WebsiteCheckBox() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [meldung, setMeldung] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  function istMail(wert: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim());
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!istMail(email)) {
      setState("error");
      setMeldung("Bitte tragen Sie eine gültige E-Mail-Adresse ein.");
      emailRef.current?.focus();
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/website-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          vorname: vorname.trim(),
          // Aus welchem Ratgeber die Anmeldung kam, landet als Merkmal QUELLE
          // im Kontakt. Ohne das weiss niemand, welcher Text das Freebie traegt.
          quelle: (pathname || "").replace(/^\/ratgeber\//, "ratgeber-") || "unbekannt",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/website-check/bitte-bestaetigen");
    } catch {
      setState("error");
      setMeldung(
        "Das hat gerade nicht geklappt. Versuchen Sie es bitte gleich noch einmal oder schreiben Sie uns an info@mehrauftrag.de.",
      );
    }
  }

  return (
    <section
      className="mt-14 rounded-3xl border border-[#3b82f6]/25 bg-gradient-to-br from-[#0a1230] to-[#04081c] p-6 sm:p-8"
      aria-labelledby="website-check-titel"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3b82f6]">
        Kostenlose Checkliste
      </p>
      <h2
        id="website-check-titel"
        className="mt-3 text-xl font-black leading-tight tracking-[-0.02em] text-white sm:text-2xl"
      >
        Prüfen Sie Ihre Website in einer Viertelstunde selbst
      </h2>
      <p className="mt-3 text-base leading-relaxed text-slate-400">
        Zwölf Punkte, an denen sich entscheidet, ob aus Besuchern Anfragen werden. Als PDF
        zum Abhaken, kostenlos und ohne Verpflichtung.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
        <div>
          <label htmlFor="wc-vorname" className="sr-only">
            Vorname, freiwillig
          </label>
          <input
            id="wc-vorname"
            type="text"
            autoComplete="given-name"
            placeholder="Vorname (freiwillig)"
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
            className={`${FELD_KLASSE} border-white/10`}
          />
        </div>

        <div>
          <label htmlFor="wc-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <input
            id="wc-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Ihre E-Mail-Adresse"
            ref={emailRef}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            required
            aria-invalid={state === "error"}
            className={`${FELD_KLASSE} ${state === "error" ? "border-red-500/70" : "border-white/10"}`}
          />
        </div>

        {state === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-300"
          >
            {meldung}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="shimmer-btn inline-flex w-full items-center justify-center rounded-xl bg-[#3b82f6] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#2f74e0] disabled:opacity-70"
        >
          {state === "loading" ? "Wird gesendet …" : "Checkliste anfordern"}
        </button>

        <p className="text-xs leading-relaxed text-slate-500">
          Ich möchte die Checkliste erhalten und künftig E-Mails von Mehr Auftrag mit Tipps
          rund um Website, Sichtbarkeit und Kundengewinnung bekommen. Die Einwilligung kann
          ich jederzeit widerrufen, ein Abmeldelink steht in jeder E-Mail. Es gilt unsere{" "}
          <a href="/datenschutz" className="underline hover:text-slate-300">
            Datenschutzerklärung
          </a>
          .
        </p>
      </form>
    </section>
  );
}
