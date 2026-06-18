"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MaMark from "../_components/ma-mark";

/**
 * Landingpage /elektriker für MehrAuftrag.
 *
 * Zielgruppe: Elektriker-Betriebsinhaber (35–55), Region Frankfurt & Rhein-Main.
 * Branding konsistent zur Startseite (dunkles Blau, Glas-Cards, Shimmer-CTA, Geist).
 *
 * Formular → Supabase Edge Function "submit-website-lead" → leads-Tabelle.
 * Nach Erfolg: Meta-Pixel-Lead-Event (feuert nur, wenn Cookie-Consent erteilt wurde
 * und das Pixel dadurch geladen ist – siehe app/_components/cookie-consent.tsx).
 */

// ─── Konfiguration (öffentliche Werte) ───────────────────────────────────────
const SUBMIT_URL =
  "https://ezrxxxilssmzcavdvvbe.supabase.co/functions/v1/submit-website-lead";
const PAGE_LABEL = "Elektriker LP";
const LEAD_SOURCE = `Website - ${PAGE_LABEL}`;

/**
 * Ermittelt den Traffic-Kanal aus den URL-Parametern, damit im CRM klar erkennbar
 * ist, woher der Lead kam (Meta / Google / Social / direkt). Meta hängt bei Ad-Klicks
 * automatisch `fbclid` an, Google `gclid`. utm_source/utm_campaign werden zusätzlich genutzt.
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

// fbq global (Pixel wird consent-gated von cookie-consent.tsx geladen)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── Shared Motion ────────────────────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const SECTION_VIEWPORT = { once: true, amount: 0.25 };

// ─── Kleine Bausteine ─────────────────────────────────────────────────────────
function MALogo() {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <MaMark size={32} />
      <span className="text-[18px] font-black leading-none tracking-[-0.04em]">
        <span className="text-white">Mehr</span>
        <span className="gradient-text-blue">Auftrag</span>
      </span>
    </span>
  );
}

function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${center ? "justify-center" : ""}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
      <p className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#3b82f6]">
        {children}
      </p>
    </div>
  );
}

function Stars() {
  return (
    <span className="text-[#fbbf24] tracking-wide" aria-label="5 von 5 Sternen">
      ★★★★★
    </span>
  );
}

function CheckIcon({ color = "#3b82f6" }: { color?: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Daten ──────────────────────────────────────────────────────────────────
const BUILD_FEATURES: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    title: "Leistungsübersicht",
    desc: "Alle Ihre Elektro-Leistungen klar strukturiert – von der Installation über E-Check bis zur PV- und Wallbox-Montage. Kunden sehen sofort, was Sie können.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Click-to-Call",
    desc: "Ein prominenter Anruf-Button auf jedem Bildschirm. Interessenten erreichen Sie mit einem Fingertipp – ohne Nummer abtippen, ohne Umwege.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Google Maps",
    desc: "Ihr Betrieb auf der Karte eingebunden, damit Kunden in der Region Sie sofort finden und den Weg zu Ihnen kennen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Kundenbewertungen",
    desc: "Echte Bewertungen direkt eingebunden. Vertrauen entsteht, bevor der Kunde überhaupt anruft.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Mobile-first",
    desc: "Über 70 % suchen vom Smartphone. Ihre Seite lädt schnell und sieht auf jedem Handy perfekt aus – dort, wo Ihre Kunden suchen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: "Fertig in 7 Tagen",
    desc: "Nach Eingang Ihrer Infos und Fotos ist Ihre Website in 7 Tagen online. Kein monatelanges Hin und Her.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const PRICE_INCLUDES = [
  "Individuelle Website für Ihren Elektrobetrieb",
  "Hosting & sichere SSL-Verschlüsselung",
  "Laufende Pflege, Updates & Sicherheit",
  "Inhaltliche Anpassungen jederzeit",
  "Click-to-Call, Google Maps & Bewertungen",
  "Persönlicher Ansprechpartner",
];

const TESTIMONIALS = [
  {
    text: "Fester Preis, kein Kleingedrucktes. Sie wissen vorab genau, was Sie bekommen – und was es kostet. Monatlich kündbar, keine lange Bindung.",
    name: "Unser Versprechen an Sie",
  },
  {
    text: "Persönlicher Ansprechpartner aus der Region – Sie reden mit einem Menschen, nicht mit einer Hotline. Rückruf innerhalb von 24 Stunden, ohne Verkaufsdruck.",
    name: "MehrAuftrag · Patrick Sauna",
  },
];
/* TODO: Sobald echte Google-Bewertungen vorliegen, hier als Kundenstimmen einsetzen. */

const FAQS: { q: string; a: string }[] = [
  {
    q: "Was, wenn die Website keine Anfragen bringt?",
    a: "Dann schauen wir uns gemeinsam an, was optimiert werden kann – kostenlos. Wir lassen Sie damit nicht allein.",
  },
  {
    q: "Wie lange dauert es wirklich?",
    a: "7 Tage nach Eingang Ihrer Infos und Fotos ist Ihre Seite online. Kein Hin-und-Her, keine Verzögerungen.",
  },
  {
    q: "Was muss ich selbst tun?",
    a: "Ein 30-minütiges Gespräch mit uns und ein paar Fotos Ihrer Arbeit. Den kompletten Rest erledigen wir.",
  },
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Nein. Monatlich kündbar. Kein Kleingedrucktes, keine langfristige Bindung.",
  },
];

// ─── Formular ─────────────────────────────────────────────────────────────────
type SubmitState = "idle" | "loading" | "success" | "error";

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!name.trim() || !phone.trim()) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const attr = getLeadAttribution();
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), source: attr.source, campaign: attr.campaign }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Meta-Pixel Conversion-Event – feuert nur, wenn das Pixel geladen ist
      // (d. h. Marketing-Cookies wurden zugestimmt). Bestehende Implementierung
      // wird nicht verändert.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: "Elektriker LP" });
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
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="rounded-2xl p-8 text-center"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.3)",
        }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(59,130,246,0.15)" }}
        >
          <svg className="h-6 w-6 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Danke! Wir melden uns bald bei Ihnen.</h3>
        <p className="mt-2 text-sm text-slate-400">
          Wir rufen Sie innerhalb von 24 Stunden zurück – ganz ohne Verkaufsdruck.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor="lead-name" className="sr-only">Vorname</label>
        <input
          id="lead-name"
          type="text"
          autoComplete="given-name"
          placeholder="Ihr Vorname"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (state === "error") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="sr-only">Telefonnummer</label>
        <input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Ihre Telefonnummer"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (state === "error") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">
          Bitte Vorname und Telefonnummer eingeben. Klappt es nicht, rufen Sie uns gern direkt an.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="shimmer-btn group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white transition disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
        }}
      >
        <span className="relative z-10">{state === "loading" ? "Wird gesendet …" : "Kostenloses Erstgespräch sichern"}</span>
        {state !== "loading" && (
          <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      <p className="text-center text-xs leading-relaxed text-slate-500">
        Rückruf innerhalb von 24h. Kein Verkaufsdruck, keine Weitergabe Ihrer Daten.
      </p>
    </form>
  );
}

// ─── Hintergrund (leicht, mobile-first) ───────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }} />
      <div
        className="absolute"
        style={{
          top: "-280px", right: "-220px", width: "920px", height: "920px",
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(96,165,250,0.04) 52%, transparent 72%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "0", left: "-240px", width: "720px", height: "720px",
          background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }} />
      <div className="noise-overlay" />
    </div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {FAQS.map((faq, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          layout
          className="overflow-hidden rounded-xl"
          style={{
            background: open === i ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${open === i ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="pr-6 text-sm font-medium leading-snug text-slate-200 sm:text-base">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: open === i ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)" }}
            >
              <svg className="h-2.5 w-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="a"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{faq.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Seite ──────────────────────────────────────────────────────────────────
export default function ElektrikerLanding() {
  return (
    <>
      <AmbientBackground />

      <main className="relative z-[1] overflow-x-hidden" style={{ color: "#e2e8f0" }}>
        {/* ─── Header ─── */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link href="/" aria-label="MehrAuftrag Startseite" className="flex items-center">
              <MALogo />
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="tel:+4915202069625"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-100"
                style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Anrufen</span>
              </a>
              <a
                href="#anfrage"
                className="shimmer-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.4)",
                }}
              >
                Kostenlos anfragen
              </a>
            </div>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <section className="relative flex items-center justify-center overflow-hidden px-5 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 60% 26%, rgba(59,130,246,0.13) 0%, transparent 100%)" }} />
          </div>
          {/* initial={false}: Hero rendert sofort sichtbar (auch ohne JS/Animation).
              Oberhalb der Falz für bezahlten Traffic darf Sichtbarkeit NIE von einer
              Einblende-Animation abhängen. */}
          <motion.div
            initial={false}
            animate="show"
            variants={stagger}
            className="relative z-10 mx-auto max-w-2xl pt-6 pb-4 text-center"
          >
            <motion.div variants={fadeUp}>
              <div
                className="badge-glow mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>
                  Speziell für Elektrikerbetriebe
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(34px, 6.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Mehr Anfragen für Ihren{" "}
              <span className="gradient-text-blue">Elektrobetrieb</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed sm:text-xl"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              Eine Website, die bei Google gefunden wird — in 7 Tagen online, zum festen Preis. Für Elektriker in Frankfurt &amp; Rhein-Main.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Fester Preis</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> In 7 Tagen online</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Monatlich kündbar</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-md">
              <div
                className="rounded-2xl p-6 text-left"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.28)", boxShadow: "0 12px 50px rgba(0,0,0,0.4)" }}
              >
                <p className="mb-4 text-center text-[15px] font-bold text-white">Kostenloses Erstgespräch sichern</p>
                <LeadForm />
              </div>
              <p className="mt-4 text-center text-sm text-slate-400">
                Lieber direkt anrufen?{" "}
                <a href="tel:+4915202069625" className="font-semibold text-[#60a5fa] hover:text-white">+49 152 02069625</a>
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Problem ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp}>
              <SectionLabel center>Das Problem</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-bold leading-snug text-white sm:text-3xl"
            >
              Ihre Kunden suchen „Elektriker Frankfurt" auf Google — finden sie Sie?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Wer heute einen Elektriker braucht, googelt zuerst. Tauchen Sie dort nicht auf – oder mit einer
              veralteten Seite – ruft der Kunde beim Nächsten an. Jeden Tag gehen so Aufträge an Betriebe,
              die online einfach besser zu finden sind. Nicht, weil sie besser arbeiten, sondern weil man sie
              überhaupt findet.
            </motion.p>
          </div>
        </motion.section>

        {/* ─── Was wir bauen ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Was wir bauen</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Eine Website, die zu Ihrem Betrieb passt
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                Kein Baukasten von der Stange. Alles speziell auf das ausgerichtet, wonach Ihre Kunden suchen.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BUILD_FEATURES.map((f) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ stiffness: 280, damping: 28 }}
                  className="relative flex h-full flex-col rounded-2xl p-6 sm:p-7"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Preisbox ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Preis</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Ein fairer Festpreis. Klar kalkulierbar.
              </motion.h2>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(59,130,246,0.25)",
                boxShadow: "0 8px 50px rgba(59,130,246,0.1), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <div
                className="absolute inset-x-10 top-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.6), transparent)" }}
              />
              <div className="flex flex-col items-center text-center">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-black text-white">250 €</span>
                  <span className="mb-1.5 text-sm text-slate-400">einmalig</span>
                </div>
                <div className="mt-2 flex items-end justify-center gap-2">
                  <span className="text-3xl font-bold gradient-text-blue">+ 100 €</span>
                  <span className="mb-1 text-sm text-slate-400">pro Monat</span>
                </div>
              </div>

              <ul className="mx-auto mt-8 max-w-md space-y-3">
                {PRICE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-center text-sm font-medium text-slate-300">
                Kein Kleingedrucktes. Kein „kostet dann doch mehr".
              </p>

              <div className="mt-7 flex justify-center">
                <a
                  href="#anfrage"
                  className="shimmer-btn group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
                  }}
                >
                  <span className="relative z-10">Jetzt anfragen</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── Testimonials ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Warum MehrAuftrag</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Fair, transparent, persönlich
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col rounded-2xl p-8"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(59,130,246,0.15)",
                    boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="mb-4 text-lg"><Stars /></div>
                  <p className="flex-1 text-base font-light leading-relaxed text-slate-200">„{t.text}"</p>
                  <p className="mt-6 text-sm font-medium text-slate-500">{t.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── FAQ ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Häufige Fragen</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Was Sie noch wissen sollten
              </motion.h2>
            </div>
            <FaqList />
          </div>
        </motion.section>

        {/* ─── Anfrage / Formular ─── */}
        <motion.section
          id="anfrage"
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(59,130,246,0.1), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-md">
            <div className="mb-8 text-center">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Kostenloses Erstgespräch sichern
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-base text-slate-400">
                Vorname und Telefonnummer genügen. Wir kümmern uns um den Rest.
              </motion.p>
            </div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 sm:p-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 50px rgba(0,0,0,0.35)",
              }}
            >
              <LeadForm />
            </motion.div>
          </div>
        </motion.section>

        {/* ─── Footer ─── */}
        <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <MALogo />
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} MehrAuftrag ·{" "}
              <Link href="/impressum" className="hover:text-slate-300">Impressum</Link> ·{" "}
              <Link href="/datenschutz" className="hover:text-slate-300">Datenschutz</Link> ·{" "}
              <Link href="/agb" className="hover:text-slate-300">AGB</Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
