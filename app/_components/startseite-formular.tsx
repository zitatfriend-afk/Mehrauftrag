"use client";

/**
 * Anfrageformular für die Startseite.
 *
 * Bis zum 31.08.2026 war die Startseite die einzige wichtige Seite ohne Formular:
 * Besucher konnten nur über Calendly oder WhatsApp Kontakt aufnehmen, also nur mit
 * einer zusätzlichen Hürde. Laut Search Console entfallen rund zwei Drittel aller
 * Impressionen auf die Startseite, damit ist das der größte Conversion-Hebel.
 *
 * Absendeweg identisch zu allen anderen Landingpages: POST auf die Supabase-Edge-
 * Function `submit-website-lead`, die den Lead ins CRM schreibt und eine
 * Benachrichtigungsmail auslöst.
 */

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";

const SUBMIT_URL =
  "https://ezrxxxilssmzcavdvvbe.supabase.co/functions/v1/submit-website-lead";
const PAGE_LABEL = "Startseite";
const LEAD_SOURCE = `Website - ${PAGE_LABEL}`;

/**
 * Traffic-Kanal aus den URL-Parametern ableiten, damit im CRM sichtbar ist, woher
 * der Lead kam. Meta hängt bei Anzeigenklicks `fbclid` an, Google `gclid`.
 * Gleiche Logik wie auf /elektriker und /kostenlose-analyse.
 */
function getLeadAttribution(): { source: string; campaign: string | null } {
  if (typeof window === "undefined") return { source: LEAD_SOURCE, campaign: null };
  const p = new URLSearchParams(window.location.search);
  const us = (p.get("utm_source") || "").toLowerCase();
  let channel = "Website";
  if (p.get("gclid") || us.includes("google")) channel = "Google Ad";
  else if (p.get("fbclid") || us.includes("facebook") || us.includes("instagram") || us.includes("meta")) channel = "Meta Ad";
  else if (us.includes("tiktok") || us.includes("linkedin") || us.includes("youtube") || us.includes("social")) channel = "Social";
  return { source: `${channel} - ${PAGE_LABEL}`, campaign: p.get("utm_campaign") };
}

type SubmitState = "idle" | "loading" | "success" | "error";

const FELD_KLASSE =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]";

export default function StartseiteFormular() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!name.trim() || !phone.trim()) {
      setState("error");
      // Fokus aufs erste leere Feld: auf dem Handy öffnet sich die Tastatur,
      // statt dass scheinbar nichts passiert.
      if (!name.trim()) nameRef.current?.focus();
      else phoneRef.current?.focus();
      return;
    }
    setState("loading");
    try {
      const attr = getLeadAttribution();
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          source: attr.source,
          campaign: attr.campaign,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Meta-Pixel feuert nur, wenn es geladen ist, also nach Zustimmung zu
      // Marketing-Cookies. Bestehende Implementierung bleibt unangetastet.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: "Startseite" });
      }
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-md rounded-2xl p-8 text-center"
        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.3)" }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(59,130,246,0.15)" }}
        >
          <svg className="h-6 w-6 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Danke, wir melden uns bei dir.</h3>
        <p className="mt-2 text-sm text-slate-400">
          Wir rufen dich innerhalb von 24 Stunden zurück. Kostenlos, unverbindlich und ohne Verkaufsdruck.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3 text-left" noValidate>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pb-1 text-[13px] text-slate-300">
        <span>Kostenlos</span>
        <span className="text-slate-600">•</span>
        <span>Unverbindlich</span>
        <span className="text-slate-600">•</span>
        <span>Rückruf in 24 h</span>
      </div>

      <div>
        <label htmlFor="start-name" className="sr-only">Dein Name</label>
        <input
          id="start-name"
          type="text"
          autoComplete="name"
          placeholder="Dein Name"
          ref={nameRef}
          value={name}
          onChange={(e) => { setName(e.target.value); if (state === "error") setState("idle"); }}
          required
          aria-invalid={state === "error" && !name.trim()}
          className={`${FELD_KLASSE} ${state === "error" && !name.trim() ? "border-red-500/70" : "border-white/10"}`}
        />
      </div>

      <div>
        <label htmlFor="start-phone" className="sr-only">Telefonnummer</label>
        <input
          id="start-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Deine Telefonnummer"
          ref={phoneRef}
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (state === "error") setState("idle"); }}
          required
          aria-invalid={state === "error" && !phone.trim()}
          className={`${FELD_KLASSE} ${state === "error" && !phone.trim() ? "border-red-500/70" : "border-white/10"}`}
        />
      </div>

      {state === "error" && (
        <p className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-left text-sm font-medium text-red-300">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.57l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
          </svg>
          <span>
            Bitte Name und Telefonnummer eintragen. Klappt es weiterhin nicht, ruf uns gern direkt an unter{" "}
            <a href="tel:+4915202069625" className="underline">+49 152 02069625</a>.
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="shimmer-btn group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white transition disabled:opacity-70"
        style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)" }}
      >
        <span className="relative z-10">{state === "loading" ? "Wird gesendet …" : "Rückruf anfordern"}</span>
        {state !== "loading" && (
          <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Mit dem Absenden stimmst du der{" "}
        <a href="/datenschutz" className="underline hover:text-slate-300">Datenschutzerklärung</a> zu.
      </p>
    </form>
  );
}
