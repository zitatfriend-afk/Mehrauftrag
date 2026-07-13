"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MaMark from "../_components/ma-mark";

/**
 * Landingpage /google-ads für Mehr Auftrag.
 *
 * Zielgruppe: Inhaber lokaler Unternehmen ALLER Branchen (Handwerk, Gastronomie,
 * Physiotherapie/Praxen, Dienstleister, Handel …), die über Google Ads schneller
 * an Anfragen kommen wollen.
 *
 * Branding 1:1 zur Startseite und zu /elektriker (dunkles Blau, Glas-Cards,
 * Shimmer-CTA, Geist). Weicher Call-to-Action: unverbindliches Erstgespräch,
 * WhatsApp oder Anruf – kein Lead-Formular.
 */

// ─── Konfiguration (öffentliche Werte) ───────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/mehrauftrag-info/30min";
const TEL_URL = "tel:+4915202069625";
const WHATSAPP_URL =
  "https://wa.me/4915202069625?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Google%20Ads%20f%C3%BCr%20mein%20Unternehmen.";

// ─── Shared Motion (identisch zu /elektriker) ─────────────────────────────────
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
      <MaMark size={40} priority />
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
const WHY_ADS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Kaufabsicht statt Zufall",
    desc: "Wer bei Google nach Ihrer Leistung sucht, hat das Problem jetzt. Sie erscheinen genau in diesem Moment, nicht irgendwann bei irgendwem.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Sofort ganz oben",
    desc: "Ihre Anzeige steht über den normalen Suchergebnissen. Kein monatelanges Warten, bis Ihre Seite bei Google nach oben rutscht.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    ),
  },
  {
    title: "Budget voll steuerbar",
    desc: "Sie legen fest, was pro Tag ausgegeben wird. Jederzeit nach oben oder unten anpassbar, ohne lange Bindung.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h4" />
      </svg>
    ),
  },
  {
    title: "Alles messbar",
    desc: "Sie sehen genau, wie viele Menschen geklickt und angefragt haben. Jeder Euro ist nachvollziehbar, statt im Nebel zu verschwinden.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l3-3 3 3 4-5" />
      </svg>
    ),
  },
  {
    title: "Schnelle Anfragen",
    desc: "Während klassisches SEO Monate braucht, bringt Google Ads oft schon in den ersten Tagen die ersten Anfragen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Nur zahlen bei Klick",
    desc: "Sie zahlen erst, wenn jemand wirklich auf Ihre Anzeige klickt. Reine Sichtbarkeit bei Google kostet Sie nichts.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
];

const BRANCHES: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Handwerk",
    desc: "Elektriker, Sanitär, Maler, Dachdecker. Wer ein akutes Problem hat, sucht sofort und ruft den an, der oben steht.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Gastronomie",
    desc: "Restaurants, Cafés, Lieferdienste. Menschen suchen Essen in der Nähe, oft kurz vor der Entscheidung.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18M3 8h6M6 3v5m0 5v8m9-21v6a3 3 0 003 3V3m-3 9v9" />
      </svg>
    ),
  },
  {
    title: "Physiotherapie & Praxen",
    desc: "Physio, Zahnarzt, Heilpraktiker. Neue Patienten suchen gezielt nach freien Terminen in ihrer Stadt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4m-2-2h4" opacity="0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3h2v3h3v2h-3v3h-2V8H8V6h3V3z" />
      </svg>
    ),
  },
  {
    title: "Dienstleister",
    desc: "Reinigung, Umzug, Beratung, Coaching. Wer Ihre Leistung braucht, tippt sie bei Google ein.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Handel & lokale Geschäfte",
    desc: "Vom Fachgeschäft bis zum Onlineshop. Sichtbar sein, sobald jemand nach Ihrem Angebot sucht.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: "Und viele mehr",
    desc: "Kurz gesagt: Überall, wo Kunden aktiv nach einer Leistung suchen, ist Google Ads ein starker Hebel.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    ),
  },
];

const HOW_WE_WORK: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Persönliche Betreuung",
    desc: "Sie bekommen einen festen Ansprechpartner, keine anonyme Hotline. Klare Ansage, ohne Fachchinesisch.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Alles aus einer Hand",
    desc: "Website und Google Ads aus einem Haus. Anzeige und Seite greifen ineinander, statt aneinander vorbeizulaufen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Wir kümmern uns",
    desc: "Einrichtung, Betreuung und laufende Optimierung übernehmen wir. Sie konzentrieren sich auf Ihr Geschäft.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26" />
      </svg>
    ),
  },
];

// ─── Hintergrund (identisch zu /elektriker) ───────────────────────────────────
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

// ─── Weicher CTA-Block (Erstgespräch / WhatsApp / Anruf) ───────────────────────
function SoftCta({ variant = "solid" }: { variant?: "solid" | "ghost" }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener"
          className="shimmer-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white transition"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
          }}
        >
          <span className="relative z-10">Kostenloses Erstgespräch buchen</span>
          <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a
          href={TEL_URL}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-slate-100 transition hover:bg-white/[0.06]"
          style={{ border: "1px solid rgba(255,255,255,0.14)", background: variant === "solid" ? "rgba(255,255,255,0.04)" : "transparent" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Anrufen</span>
        </a>
      </div>
      <p className="text-center text-sm text-slate-400">
        Lieber direkt schreiben?{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="font-semibold text-[#25D366] hover:text-white">
          Per WhatsApp anfragen
        </a>
      </p>
    </div>
  );
}

// ─── Seite ──────────────────────────────────────────────────────────────────
export default function GoogleAdsLanding() {
  return (
    <>
      <AmbientBackground />

      <main className="relative z-[1] overflow-x-hidden" style={{ color: "#e2e8f0" }}>
        {/* ─── Header ─── */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link href="/" aria-label="Mehr Auftrag Startseite" className="flex items-center">
              <MALogo />
            </Link>
            <div className="flex items-center gap-2">
              <a
                href={TEL_URL}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-100"
                style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Anrufen</span>
              </a>
              <a
                href="#erstgespraech"
                className="shimmer-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.4)",
                }}
              >
                Erstgespräch
              </a>
            </div>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <section className="relative flex items-center justify-center overflow-hidden px-5 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 60% 26%, rgba(59,130,246,0.13) 0%, transparent 100%)" }} />
          </div>
          {/* initial={false}: Hero rendert sofort sichtbar – auch bei bezahltem Traffic. */}
          <motion.div
            initial={false}
            animate="show"
            variants={stagger}
            className="relative z-10 mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp}>
              <div
                className="badge-glow mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:mb-8"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>
                  Google Ads für lokale Unternehmen
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(30px, 6.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Ganz oben bei Google. Genau dann, wenn Ihr Kunde{" "}
              <span className="gradient-text-blue">sucht</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed sm:mt-7 sm:text-xl"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              Google Ads bringt Ihnen Anfragen von Menschen, die genau Ihre Leistung suchen. Sichtbar ab dem ersten Tag, mit vollem Überblick über Ihr Budget. Für Handwerk, Gastronomie, Praxen, Dienstleister und Handel.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300 sm:mt-7">
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Sichtbar ab Tag 1</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Budget selbst steuerbar</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Ergebnisse messbar</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 sm:mt-11">
              <SoftCta />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Warum Google Ads ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Warum Google Ads</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Werbung, die genau dann erscheint, wenn jemand kaufen will
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Klassische Werbung erreicht Menschen zufällig. Google Ads erreicht die, die gerade aktiv nach Ihrer Leistung suchen. Das ist der Unterschied zwischen Streuen und Treffen.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_ADS.map((f) => (
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

        {/* ─── Für welche Branchen ─── */}
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
                <SectionLabel center>Für welche Branchen</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Google Ads lohnt sich für fast jedes lokale Unternehmen
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Ob jemand einen Handwerker braucht, einen Tisch zum Essen sucht oder einen Termin in der Praxis will: Gesucht wird bei Google. Überall, wo Menschen aktiv nach einer Leistung suchen, funktioniert Google Ads.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BRANCHES.map((b) => (
                <motion.div
                  key={b.title}
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
                    {b.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── So arbeiten wir / erste Ergebnisse ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>So arbeiten wir</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Läuft bereits. Und funktioniert.
              </motion.h2>
            </div>

            {/* Erste-Ergebnisse-Statement */}
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl rounded-2xl p-8 text-center sm:p-10"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.25)",
                boxShadow: "0 8px 50px rgba(59,130,246,0.08)",
              }}
            >
              <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                Wir betreuen Kunden aktiv mit Google Ads und sehen schon in den ersten Wochen erste Anfragen und neue Kunden. Das ist kein leeres Werbeversprechen, sondern das, was gerade real passiert.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
                Wir wissen, worauf es ankommt: die richtigen Suchbegriffe, saubere Anzeigen und eine Seite, die aus Klicks auch echte Anfragen macht.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {HOW_WE_WORK.map((h) => (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
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
                    {h.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Erstgespräch / CTA ─── */}
        <motion.section
          id="erstgespraech"
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
          <div className="relative mx-auto max-w-2xl text-center">
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
              Unverbindliches Erstgespräch
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
              In einem kurzen Gespräch schauen wir gemeinsam, ob Google Ads für Ihr Unternehmen passt und was realistisch drin ist. Kostenlos und ohne Verpflichtung.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <SoftCta />
            </motion.div>
          </div>
        </motion.section>

        {/* ─── WhatsApp Floating-Button ─── */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          aria-label="Per WhatsApp anfragen"
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
          style={{ background: "#25D366", boxShadow: "0 8px 28px rgba(37,211,102,0.5)" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.738-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
          <span>WhatsApp</span>
        </a>

        {/* ─── Footer ─── */}
        <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <MALogo />
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Mehr Auftrag ·{" "}
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
