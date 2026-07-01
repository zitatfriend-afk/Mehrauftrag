"use client";

import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MaMark from "./ma-mark";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── Logo ─────────────────────────────────────────────────────────────────────
function MALogo() {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <MaMark size={40} priority />
      <span className="text-[18px] font-black leading-none tracking-[-0.04em]">
        <span style={{ color: "#ffffff" }}>Mehr</span>
        <span
          style={{
            background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 55%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Auftrag
        </span>
      </span>
    </span>
  );
}

// ── Background ────────────────────────────────────────────────────────────────
function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }}
      />
      <div
        className="float-orb absolute pointer-events-none"
        style={{
          top: "-280px", right: "-220px",
          width: "920px", height: "920px",
          background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(37,99,235,0.07) 40%, transparent 68%)",
          filter: "blur(48px)", borderRadius: "50%",
        }}
      />
      <div
        className="float-orb-alt absolute pointer-events-none"
        style={{
          bottom: "-300px", left: "-180px",
          width: "760px", height: "760px",
          background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(59,130,246,0.05) 45%, transparent 68%)",
          filter: "blur(52px)", borderRadius: "50%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.038) 1.5px, transparent 1.5px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <div className="scanlines absolute inset-0 pointer-events-none" />
      <div className="noise-overlay" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }}
      />
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    title: "Webdesigner",
    suffix: "(m/w/d)",
    type: "Freelance / Festanstellung",
    desc: "Du gestaltest moderne, conversion-optimierte Websites für Unternehmen aus verschiedensten Branchen – von Handwerksbetrieben über Therapeuten bis hin zu Gastronomen und Dienstleistern.",
    tasks: [
      "Gestaltung und Umsetzung von Websites in Next.js oder WordPress",
      "Enge Zusammenarbeit mit dem Team für optimale Kundenergebnisse",
      "Umsetzung conversion-optimierter Layouts für verschiedene Branchen",
      "Qualitätssicherung: Responsiveness, Performance und Barrierefreiheit",
    ],
    requirements: [
      "Erfahrung mit modernen Web-Technologien (HTML, CSS, JS / React)",
      "Gespür für Ästhetik und nutzerfreundliches Design",
      "Selbstständige und strukturierte Arbeitsweise",
      "Portfolio mit bisherigen Projekten von Vorteil",
    ],
  },
  {
    title: "Kundenbetreuung & Terminkoordination",
    suffix: "(m/w/d)",
    type: "Teilzeit / Vollzeit",
    desc: "Du bist die erste Ansprechperson für unsere Kunden aus unterschiedlichsten Branchen und sorgst für eine reibungslose Kommunikation zwischen dem Team und den Betrieben, die wir betreuen.",
    tasks: [
      "Betreuung und Kommunikation mit Kunden per E-Mail und Telefon",
      "Koordination von Terminen und Onboarding-Gesprächen",
      "Nachverfolgung offener Kundenanfragen und Projektfortschritte",
      "Unterstützung bei der Qualitätssicherung laufender Projekte",
    ],
    requirements: [
      "Freundliches, professionelles Auftreten",
      "Sehr gute Deutschkenntnisse in Wort und Schrift",
      "Erfahrung in der Kundenbetreuung oder im Büromanagement von Vorteil",
      "Strukturierte und zuverlässige Arbeitsweise",
    ],
  },
  {
    title: "Vertriebsberatung",
    suffix: "(m/w/d)",
    type: "Freelance / Provision",
    desc: "Du identifizierst neue Kunden für Mehr Auftrag, führst Erstgespräche und begeisterst Unternehmer aus allen Branchen für unsere digitalen Lösungen.",
    tasks: [
      "Gewinnung und Qualifizierung neuer Interessenten",
      "Durchführung von Erstgesprächen und Bedarfsanalysen",
      "Präsentation der Leistungen von Mehr Auftrag",
      "Übergabe qualifizierter Leads an das interne Team",
    ],
    requirements: [
      "Erfahrung im Vertrieb oder in der Kundenakquise",
      "Kommunikationsstärke und Überzeugungskraft",
      "Eigenmotivation und unternehmerisches Denken",
      "Grundverständnis für digitale Marketing- und Web-Dienstleistungen",
    ],
  },
];

const BENEFITS = [
  {
    title: "Flexible Arbeitszeiten",
    desc: "Arbeite wann und wo du am produktivsten bist. Remote-first mit klaren Ergebnissen statt starren Stunden.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
  },
  {
    title: "Klare Prozesse",
    desc: "Keine Chaos-Agentur. Wir arbeiten mit definierten Abläufen, damit du dich auf das Wesentliche konzentrierst.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Reale Ergebnisse",
    desc: "Du siehst direkt, wie deine Arbeit Unternehmen wachsen lässt. Messbare Erfolge, die wirklich motivieren.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Kleines Team",
    desc: "Kein Konzern, kein Silodenken. Bei uns kennt jeder jeden – deine Ideen werden gehört und umgesetzt.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Wachstumsperspektiven",
    desc: "Wir wachsen schnell – und mit uns wachsen auch deine Möglichkeiten, Verantwortung und dein Gehalt.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
  {
    title: "Sinnvolle Arbeit",
    desc: "Wir helfen echten Unternehmern, ihr Geschäft aufzubauen. Deine Arbeit macht einen spürbaren Unterschied.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const POSITIONS = [
  "Webdesigner (m/w/d)",
  "Kundenbetreuung & Terminkoordination (m/w/d)",
  "Vertriebsberatung (m/w/d)",
];

// ── Shared input style ────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#e2e8f0",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 180ms ease",
};

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 px-3 py-1.5 rounded-full"
      style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}
    >
      {children}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function KarriereShell() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", motivation: "" });
  const [cvName, setCvName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvName(file.name);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Use location.href for mailto — more reliable than window.open() and
    // not blocked by popup blockers. Wrapped in try/catch so any browser
    // quirk (URL too long, CSP, etc.) never crashes the React tree.
    try {
      const subject = encodeURIComponent(
        `Bewerbung: ${form.position || "Offene Stelle"} – ${form.name}`
      );
      const body = encodeURIComponent(
        `Neue Bewerbung über mehrauftrag.de/karriere\n` +
        `${"─".repeat(40)}\n\n` +
        `Name:       ${form.name}\n` +
        `E-Mail:     ${form.email}\n` +
        `Telefon:    ${form.phone || "nicht angegeben"}\n` +
        `Position:   ${form.position || "nicht gewählt"}\n\n` +
        `Vorstellung & Motivation:\n${form.motivation}\n\n` +
        `${"─".repeat(40)}\n` +
        `Lebenslauf: ${cvName || "nicht hochgeladen"}` +
        `${cvName ? "\n→ Bitte Datei manuell als Anhang hinzufügen." : ""}`
      );
      window.location.href = `mailto:info@mehrauftrag.de?subject=${subject}&body=${body}`;
    } catch {
      // If the email client can't be opened, the success state shows
      // a manual fallback link (info@mehrauftrag.de) — no crash.
    }
    setSubmitted(true);
  };

  return (
    <>
      <Background />

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,8,24,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <Link href="/" aria-label="Mehr Auftrag Startseite">
            <MALogo />
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: "/#leistungen", label: "Leistungen" },
              { href: "/#branchen", label: "Branchen" },
              { href: "/#ueber-uns", label: "Über uns" },
              { href: "/#kontakt", label: "Kontakt" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="https://calendly.com/mehrauftrag-info/30min?month=2026-05"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.28)" }}
          >
            Gespräch buchen
          </Link>
          <Link
            href="/"
            className="md:hidden flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück
          </Link>
        </div>
      </header>

      <main className="relative z-10">

        {/* ── HERO ── */}
        <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(59,130,246,0.1), transparent 65%)" }}
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <Badge>Karriere bei Mehr Auftrag</Badge>
              <h1
                className="font-black tracking-tighter text-white mb-6 leading-[1.05]"
                style={{ fontSize: "clamp(36px, 7vw, 82px)" }}
              >
                Werde Teil eines{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 55%, #93c5fd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  wachsenden Teams.
                </span>
              </h1>
              <p
                className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: "rgba(148,163,184,0.78)" }}
              >
                Bei Mehr Auftrag helfen wir Handwerksbetrieben, Therapeuten, Gastronomen und Dienstleistern dabei, online sichtbar zu werden und messbar mehr Aufträge zu gewinnen. Wachse mit uns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#stellen"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.45)",
                  }}
                >
                  Offene Stellen ansehen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  href="#bewerbung"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base"
                  style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
                >
                  Direkt bewerben
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 50% at 20% 50%, rgba(59,130,246,0.06), transparent 60%)" }}
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="max-w-2xl"
            >
              <Badge>Unsere Mission</Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-5 leading-tight">
                Wir bauen das digitale Fundament für echte Unternehmen.
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.75)" }}>
                Mehr Auftrag ist eine Digitalagentur, die Betriebe aus allen Branchen dabei unterstützt, professionell online aufzutreten und kontinuierlich neue Kunden zu gewinnen. Ob Handwerker, Physiotherapeut, Gastronom oder Dienstleister – wir liefern individuelle Lösungen, die messbar wirken.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                Unser Team ist klein, aber wächst. Wir suchen Menschen, die mitdenken, anpacken und stolz auf das sind, was sie bauen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section id="stellen" className="py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.07), transparent 60%)" }}
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-14"
            >
              <Badge>Offene Stellen</Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Das suchen wir gerade.
              </h2>
            </motion.div>

            <div className="space-y-4">
              {JOBS.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: openJob === i ? "rgba(59,130,246,0.07)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${openJob === i ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)"}`,
                    transition: "background 200ms ease, border-color 200ms ease",
                  }}
                >
                  <button
                    onClick={() => setOpenJob(openJob === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 sm:px-8 py-6 text-left gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{job.title}</h3>
                        <span className="text-white/45 text-base font-normal">{job.suffix}</span>
                      </div>
                      <span
                        className="text-[11px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-md"
                        style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa" }}
                      >
                        {job.type}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openJob === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: openJob === i ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)" }}
                    >
                      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openJob === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-6 sm:px-8 pb-8 space-y-6">
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                            {job.desc}
                          </p>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3">Deine Aufgaben</h4>
                              <ul className="space-y-2.5">
                                {job.tasks.map((t, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(148,163,184,0.75)" }}>
                                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#3b82f6" }} />
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3">Was du mitbringst</h4>
                              <ul className="space-y-2.5">
                                {job.requirements.map((r, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(148,163,184,0.75)" }}>
                                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#3b82f6" }} />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <a
                            href="#bewerbung"
                            onClick={() => setForm((p) => ({ ...p, position: `${job.title} ${job.suffix}` }))}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                            style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", boxShadow: "0 2px 12px rgba(59,130,246,0.35)" }}
                          >
                            Jetzt bewerben
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY MEHRAUFTRAG ── */}
        <section className="py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(59,130,246,0.07), transparent 60%)" }}
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-14"
            >
              <Badge>Warum Mehr Auftrag</Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Was dich bei uns erwartet.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.07 }}
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-blue-400"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.18)" }}
                  >
                    {b.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ── */}
        <section id="bewerbung" className="py-24 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08), transparent 65%)" }}
          />
          <div className="max-w-2xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-12"
            >
              <Badge>Bewerbung</Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
                Klingt gut? Meld dich.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.65)" }}>
                Kurz, unkompliziert und direkt. Wir melden uns innerhalb von 48 Stunden.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              className="rounded-2xl p-7 sm:p-9"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}
                  >
                    <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">E-Mail-Client geöffnet</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.7)" }}>
                    Deine Bewerbungsdaten wurden vorausgefüllt. Bitte füge deinen Lebenslauf als Anhang hinzu und sende die E-Mail ab.
                  </p>
                  <p className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>
                    Kein E-Mail-Client geöffnet?{" "}
                    <a href="mailto:info@mehrauftrag.de" className="text-blue-400 hover:underline">
                      info@mehrauftrag.de
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                        Vollständiger Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Max Mustermann"
                        style={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                        E-Mail-Adresse *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="max@beispiel.de"
                        style={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                        Telefonnummer{" "}
                        <span style={{ color: "rgba(148,163,184,0.38)", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+49 123 456789"
                        style={inputBase}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                        Gewünschte Position *
                      </label>
                      <div className="relative">
                        <select
                          name="position"
                          required
                          value={form.position}
                          onChange={handleChange}
                          style={{ ...inputBase, appearance: "none", paddingRight: "36px", cursor: "pointer" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                        >
                          <option value="" style={{ background: "#040c1c" }}>Position wählen…</option>
                          {POSITIONS.map((p) => (
                            <option key={p} value={p} style={{ background: "#040c1c" }}>{p}</option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                          style={{ color: "rgba(148,163,184,0.5)" }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                      Kurze Vorstellung & Motivation *
                    </label>
                    <textarea
                      name="motivation"
                      required
                      value={form.motivation}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Wer bist du, was treibt dich an und warum möchtest du bei Mehr Auftrag arbeiten?"
                      style={{ ...inputBase, resize: "vertical", minHeight: "130px" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: "rgba(148,163,184,0.75)" }}>
                      Lebenslauf hochladen{" "}
                      <span style={{ color: "rgba(148,163,184,0.38)", fontWeight: 400 }}>(PDF / DOC)</span>
                    </label>
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-[10px] cursor-pointer"
                      style={{ border: "1px dashed rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.02)", transition: "border-color 180ms ease" }}
                      onClick={() => fileRef.current?.click()}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.4)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)")}
                    >
                      <svg className="w-5 h-5 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm" style={{ color: cvName ? "#e2e8f0" : "rgba(148,163,184,0.45)" }}>
                        {cvName || "Datei auswählen…"}
                      </span>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-base text-white"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.4)", transition: "box-shadow 200ms ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(59,130,246,0.6)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(59,130,246,0.4)")}
                  >
                    Bewerbung absenden
                  </button>
                  <p className="text-xs text-center" style={{ color: "rgba(148,163,184,0.38)" }}>
                    Öffnet deinen E-Mail-Client mit vorausgefüllten Daten.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-9 px-5 sm:px-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 gap-x-8">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <MALogo />
              <p className="text-[11px] text-white/20">Die Digitalagentur die liefert.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-8">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[
                  { href: "/#leistungen", label: "Leistungen" },
                  { href: "/#branchen", label: "Branchen" },
                  { href: "/#ueber-uns", label: "Über uns" },
                  { href: "/#kontakt", label: "Kontakt" },
                  { href: "/karriere", label: "Karriere" },
                ].map((n) => (
                  <Link key={n.href} href={n.href} className="text-[11px] font-medium tracking-wide text-white/28 hover:text-white/65 transition-colors">
                    {n.label}
                  </Link>
                ))}
              </div>
              <div className="hidden sm:block w-px h-3 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="flex items-center gap-5">
                <Link href="/impressum" className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors">Impressum</Link>
                <span className="text-[10px] text-white/10">·</span>
                <Link href="/datenschutz" className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors">Datenschutz</Link>
                <span className="text-[10px] text-white/10">·</span>
                <Link href="/agb" className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors">AGB</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
