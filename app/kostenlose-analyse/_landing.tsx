"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Landingpage /kostenlose-analyse für MehrAuftrag.
 *
 * Zielgruppe: Elektriker-Betriebsinhaber (35–55), Region Frankfurt & Rhein-Main.
 * Angebot: KOSTENLOSE Website-/Potenzial-Analyse. KEINE Preise auf dieser Seite.
 * Branding konsistent zur Startseite (dunkles Blau, Glas-Cards, Shimmer-CTA, Geist).
 *
 * Formular → Supabase Edge Function "submit-website-lead" → leads-Tabelle.
 * Nach Erfolg: Meta-Pixel-Lead-Event (feuert nur bei erteilter Cookie-Zustimmung,
 * siehe app/_components/cookie-consent.tsx).
 */

// ─── Konfiguration (öffentliche Werte) ───────────────────────────────────────
const SUBMIT_URL =
  "https://ezrxxxilssmzcavdvvbe.supabase.co/functions/v1/submit-website-lead";
const PAGE_LABEL = "Analyse Elektriker LP";
const LEAD_SOURCE = `Website - ${PAGE_LABEL}`;
const PIXEL_CONTENT = "Analyse Elektriker LP";

/**
 * Ermittelt den Traffic-Kanal aus den URL-Parametern (Meta = fbclid, Google = gclid),
 * damit im CRM klar erkennbar ist, woher der Lead kam.
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
    <span className="text-[18px] font-black leading-none tracking-[-0.04em] select-none">
      <span className="text-white">Mehr</span>
      <span className="gradient-text-blue">Auftrag</span>
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

function Stars() {
  return (
    <span className="text-[#fbbf24] tracking-wide" aria-label="5 von 5 Sternen">
      ★★★★★
    </span>
  );
}

// ─── Analyse-Visual (nativ, SVG) ──────────────────────────────────────────────
function ScoreGauge() {
  const score = 86;
  const r = 70;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <svg viewBox="0 0 180 180" className="h-40 w-40">
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
      <motion.circle
        cx="90" cy="90" r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth="12" strokeLinecap="round"
        transform="rotate(-90 90 90)"
        strokeDasharray={`${dash} ${c}`}
        initial={{ strokeDasharray: `0 ${c}` }}
        whileInView={{ strokeDasharray: `${dash} ${c}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
      <text x="90" y="84" textAnchor="middle" className="fill-white" style={{ fontSize: 38, fontWeight: 800 }}>{score}</text>
      <text x="90" y="106" textAnchor="middle" style={{ fontSize: 12, fill: "rgba(148,163,184,0.8)" }}>von 100</text>
    </svg>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-[#93c5fd]">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#3b82f6,#93c5fd)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}

function AnalysisVisual() {
  return (
    <div
      className="relative w-full rounded-2xl p-6 sm:p-7"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(59,130,246,0.18)",
        boxShadow: "0 8px 50px rgba(59,130,246,0.10), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]" />
        <span className="text-sm font-semibold text-white">Website-Analyse</span>
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center">
          <ScoreGauge />
          <p className="mt-1 text-center text-xs text-slate-400">Ihr Betrieb hat noch<br />ungenutztes Potenzial.</p>
        </div>
        <div className="w-full flex-1 space-y-4">
          <MetricBar label="Sichtbarkeit bei Google" value={64} />
          <MetricBar label="Performance / Ladezeit" value={86} />
          <MetricBar label="Mobile-Tauglichkeit" value={78} />
          <MetricBar label="Anfragen-Conversion" value={71} />
        </div>
      </div>
      <p className="mt-5 text-center text-[11px] text-slate-500">Beispielhafte Darstellung. Ihre echten Werte erhalten Sie im Gespräch.</p>
    </div>
  );
}

// ─── Daten ──────────────────────────────────────────────────────────────────
const INCLUDES: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    title: "Gefunden bei Google?",
    desc: "Wir prüfen, ob Sie bei „Elektriker + Ihre Stadt“ auftauchen – und wo Ihre Kunden stattdessen landen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Technik & Ladezeit",
    desc: "Wie schnell und sicher lädt Ihre Seite? Langsame Seiten kosten Anfragen – das schauen wir uns an.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Mobil & überzeugend",
    desc: "Über 70 % suchen vom Handy. Wir prüfen, ob Ihre Seite mobil funktioniert und Vertrauen schafft.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: "Konkrete Empfehlungen",
    desc: "Sie bekommen klare, umsetzbare Schritte – kein Fachchinesisch, sondern was Ihnen mehr Anfragen bringt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const STEPS = [
  { n: "01", title: "Anfrage senden", desc: "Vorname und Telefonnummer eingeben – das war's. Dauert 20 Sekunden." },
  { n: "02", title: "Wir analysieren", desc: "Wir prüfen Ihren Online-Auftritt und identifizieren die größten Potenziale." },
  { n: "03", title: "30-Min-Gespräch", desc: "Wir zeigen Ihnen die Ergebnisse und was konkret zu tun ist. Unverbindlich." },
];

const TESTIMONIALS = [
  {
    text: "Komplett kostenlos und unverbindlich. Sie bekommen eine ehrliche Einschätzung Ihres Online-Auftritts – und entscheiden danach völlig frei.",
    name: "Unser Versprechen an Sie",
  },
  {
    text: "Persönlicher Ansprechpartner aus der Region, kein Fachchinesisch. Rückruf innerhalb von 24 Stunden, ganz ohne Verkaufsdruck.",
    name: "MehrAuftrag · Patrick Sauna",
  },
];
/* TODO: Sobald echte Google-Bewertungen vorliegen, hier als Kundenstimmen einsetzen. */

const FAQS: { q: string; a: string }[] = [
  { q: "Ist die Analyse wirklich kostenlos?", a: "Ja, komplett kostenlos und unverbindlich. Kein Kleingedrucktes, keine versteckten Kosten." },
  { q: "Was bekomme ich konkret?", a: "Eine ehrliche Einschätzung Ihres Online-Auftritts: Sichtbarkeit bei Google, Technik, Mobil-Tauglichkeit – plus konkrete Empfehlungen, was Ihnen mehr Anfragen bringt." },
  { q: "Wie lange dauert das?", a: "Die Anfrage dauert 20 Sekunden. Das Ergebnis-Gespräch dauert rund 30 Minuten." },
  { q: "Bin ich danach zu etwas verpflichtet?", a: "Nein. Sie erhalten die Analyse, entscheiden danach völlig frei. Kein Verkaufsdruck." },
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

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: PIXEL_CONTENT });
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
        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.3)" }}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(59,130,246,0.15)" }}>
          <svg className="h-6 w-6 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Danke! Wir melden uns bald bei Ihnen.</h3>
        <p className="mt-2 text-sm text-slate-400">Wir rufen Sie innerhalb von 24 Stunden zurück – mit Ihrer kostenlosen Analyse, ganz ohne Verkaufsdruck.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor="lead-name" className="sr-only">Vorname</label>
        <input
          id="lead-name" type="text" autoComplete="given-name" placeholder="Ihr Vorname"
          value={name}
          onChange={(e) => { setName(e.target.value); if (state === "error") setState("idle"); }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="sr-only">Telefonnummer</label>
        <input
          id="lead-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ihre Telefonnummer"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (state === "error") setState("idle"); }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">Bitte Vorname und Telefonnummer eingeben. Klappt es nicht, rufen Sie uns gern direkt an.</p>
      )}

      <button
        type="submit" disabled={state === "loading"}
        className="shimmer-btn group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white transition disabled:opacity-70"
        style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)" }}
      >
        <span className="relative z-10">{state === "loading" ? "Wird gesendet …" : "Gratis-Analyse anfordern"}</span>
        {state !== "loading" && (
          <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      <p className="text-center text-xs leading-relaxed text-slate-500">Kostenlos &amp; unverbindlich. Rückruf in 24h, keine Weitergabe Ihrer Daten.</p>
    </form>
  );
}

// ─── Hintergrund ──────────────────────────────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }} />
      <div className="absolute" style={{ top: "-280px", right: "-220px", width: "920px", height: "920px", background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(96,165,250,0.04) 52%, transparent 72%)", borderRadius: "50%" }} />
      <div className="absolute" style={{ bottom: "0", left: "-240px", width: "720px", height: "720px", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)", borderRadius: "50%" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }} />
      <div className="noise-overlay" />
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {FAQS.map((faq, i) => (
        <motion.div
          key={i} variants={fadeUp} layout className="overflow-hidden rounded-xl"
          style={{
            background: open === i ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${open === i ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
            <span className="pr-6 text-sm font-medium leading-snug text-slate-200 sm:text-base">{faq.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: open === i ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)" }}>
              <svg className="h-2.5 w-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE_OUT }} style={{ overflow: "hidden" }}>
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
export default function AnalyseLanding() {
  return (
    <>
      <AmbientBackground />

      <main className="relative z-[1] overflow-x-hidden" style={{ color: "#e2e8f0" }}>
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link href="/" aria-label="MehrAuftrag Startseite" className="flex items-center"><MALogo /></Link>
            <div className="flex items-center gap-2">
              <a href="tel:+4915202069625" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-100" style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Anrufen</span>
              </a>
              <a href="#anfrage" className="shimmer-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 2px 12px rgba(59,130,246,0.4)" }}>
                Kostenlos anfragen
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-36 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 60% 24%, rgba(59,130,246,0.13) 0%, transparent 100%)" }} />
          </div>
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* initial={false}: Hero sofort sichtbar, unabhängig von der Animation */}
            <motion.div initial={false} animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="badge-glow mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                  <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>Kostenloser Potenzial-Check für Elektriker</span>
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-black tracking-tighter text-white" style={{ fontSize: "clamp(32px, 5.5vw, 58px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                Kostenlose <span className="gradient-text-blue">Website-Analyse</span> für Ihren Elektrobetrieb
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg font-light leading-relaxed sm:text-xl" style={{ color: "rgba(148,163,184,0.85)" }}>
                Potenzial-Check für Ihr Online-Geschäft: Wir zeigen Ihnen, wo Ihnen Anfragen entgehen – und wie Sie mehr Kunden aus dem Internet gewinnen.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-200"><CheckIcon /> Kostenlos &amp; unverbindlich</div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200"><CheckIcon /> Ergebnis-Gespräch in rund 30 Minuten</div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200"><CheckIcon /> Konkrete Empfehlungen statt Fachchinesisch</div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 max-w-md">
                <div className="rounded-2xl p-6 text-left" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.28)", boxShadow: "0 12px 50px rgba(0,0,0,0.4)" }}>
                  <p className="mb-4 text-center text-[15px] font-bold text-white">Kostenlose Analyse sichern</p>
                  <LeadForm />
                </div>
                <p className="mt-4 text-center text-sm text-slate-400">
                  Lieber direkt anrufen?{" "}
                  <a href="tel:+4915202069625" className="font-semibold text-[#60a5fa] hover:text-white">+49 152 02069625</a>
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}>
              <AnalysisVisual />
            </motion.div>
          </div>
        </section>

        {/* Was wir prüfen */}
        <motion.section initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} variants={stagger} className="relative px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}><SectionLabel center>Das prüfen wir</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">Ihre kostenlose Analyse umfasst</motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-slate-400">Ehrlich, verständlich und speziell auf Elektrikerbetriebe zugeschnitten.</motion.p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {INCLUDES.map((f) => (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -5 }} transition={{ stiffness: 280, damping: 28 }} className="flex h-full flex-col rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                  <div className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>{f.icon}</div>
                  <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Ablauf */}
        <motion.section initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} variants={stagger} className="relative px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}><SectionLabel center>So einfach geht's</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">In 3 Schritten zur Analyse</motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {STEPS.map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="mb-4 text-2xl font-black gradient-text-blue">{s.n}</div>
                  <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} variants={stagger} className="relative px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}><SectionLabel center>Warum MehrAuftrag</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">Ehrlich, kostenlos, ohne Risiko</motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.15)", boxShadow: "0 4px 40px rgba(0,0,0,0.3)" }}>
                  <div className="mb-4 text-lg"><Stars /></div>
                  <p className="flex-1 text-base font-light leading-relaxed text-slate-200">„{t.text}"</p>
                  <p className="mt-6 text-sm font-medium text-slate-500">{t.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} variants={stagger} className="relative px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}><SectionLabel center>Häufige Fragen</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">Gut zu wissen</motion.h2>
            </div>
            <FaqList />
          </div>
        </motion.section>

        {/* Anfrage / Formular */}
        <motion.section id="anfrage" initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} variants={stagger} className="relative scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(59,130,246,0.1), transparent 70%)" }} />
          <div className="relative mx-auto max-w-md">
            <div className="mb-8 text-center">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">Kostenlose Analyse sichern</motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-base text-slate-400">Vorname und Telefonnummer genügen. Den Rest übernehmen wir.</motion.p>
            </div>
            <motion.div variants={fadeUp} className="rounded-2xl p-6 sm:p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 50px rgba(0,0,0,0.35)" }}>
              <LeadForm />
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <MALogo />
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} MehrAuftrag ·{" "}
              <Link href="/impressum" className="hover:text-slate-300">Impressum</Link> ·{" "}
              <Link href="/datenschutz" className="hover:text-slate-300">Datenschutz</Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
