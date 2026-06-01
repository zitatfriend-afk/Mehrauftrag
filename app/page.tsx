"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Svc {
  color: string;
  title: string;
  sub: string;
  desc: string;
  features: string[];
  icon: React.ReactNode;
}

// ─── Reduce-motion safe spring config ────────────────────────────────────────
const SPRING_FAST = { stiffness: 280, damping: 28 };

// ─── Fade-up variant (shared) ─────────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(target);
  const spanRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          if (prefersReduced) { setVal(target); return; }
          setVal(0);
          const dur = 2000, t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
            else { setVal(target); rafRef.current = null; }
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, prefersReduced]);
  return <span ref={spanRef} suppressHydrationWarning>{`${val}${suffix}`}</span>;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function MALogo({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const mehrColor = variant === "dark" ? "#ffffff" : "#0a0f2a";
  return (
    <span className="text-[18px] font-black leading-none tracking-[-0.04em] select-none">
      <span style={{ color: mehrColor }}>Mehr</span>
      <span className="gradient-text-blue">Auftrag</span>
    </span>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
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

// ─── Portrait ─────────────────────────────────────────────────────────────────
function Portrait() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/neuesprofilbild.png"
        alt="Patrick Sauna – Geschäftsführer MehrAuftrag"
        fill
        sizes="(max-width: 768px) 100vw, 340px"
        priority
        className="object-cover object-top"
        style={{ filter: "contrast(1.13) brightness(1.05) saturate(0.93)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(4,8,28,0.85) 0%, rgba(4,8,28,0.1) 60%, transparent 100%)" }}
      />
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Michael Bauer",
    role: "Inhaber, Elektro Bauer GmbH",
    text: "Seit wir mit MehrAuftrag zusammenarbeiten, haben sich unsere Anfragen mehr als verdreifacht. Die Website konvertiert extrem gut beste Investition des Jahres.",
    emoji: "👷‍♂️",
  },
  {
    name: "Sarah Müller",
    role: "Inhaberin, Physiotherapie Zentrum München",
    text: "+280% mehr Neupatienten im ersten Quartal. Das Team hält immer, was es verspricht pünktlich, professionell, messbar.",
    emoji: "👩‍⚕️",
  },
  {
    name: "Thomas Hoffmann",
    role: "Geschäftsführer, Hoffmann Haustechnik",
    text: "Professionelles Team, schnelle Umsetzung, messbare Ergebnisse. Genau das, was wachsende Betriebe brauchen.",
    emoji: "🏗️",
  },
];

function TestimonialSlider() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goTo = useCallback((i: number) => {
    if (fadeRef.current) clearTimeout(fadeRef.current);
    setFading(true);
    fadeRef.current = setTimeout(() => { setCur(i); setFading(false); fadeRef.current = null; }, 240);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => goTo((cur + 1) % TESTIMONIALS.length), 6000);
    return () => { clearTimeout(t); if (fadeRef.current) { clearTimeout(fadeRef.current); fadeRef.current = null; } };
  }, [cur, goTo]);
  const t = TESTIMONIALS[cur];
  return (
    <div>
      <div style={{ transition: "opacity 0.24s ease", opacity: fading ? 0 : 1 }}>
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 4px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-[#f59e0b]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">&ldquo;{t.text}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              {t.emoji}
            </div>
            <div>
              <div className="font-semibold text-sm text-white">{t.name}</div>
              <div className="text-slate-500 text-xs mt-0.5">{t.role}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => goTo((cur - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
          aria-label="Zurück"
        >
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === cur ? "24px" : "6px", height: "6px", background: i === cur ? "#3b82f6" : "rgba(255,255,255,0.15)" }}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
        <button
          onClick={() => goTo((cur + 1) % TESTIMONIALS.length)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
          aria-label="Weiter"
        >
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Für welche Branchen arbeitet ihr?", a: "Wir arbeiten mit Handwerksbetrieben, Physiotherapeuten, Industrieunternehmen, Gastronomie, Dienstleistern und vielen weiteren Branchen. Unser System ist branchenunabhängig und auf messbares Wachstum ausgerichtet." },
  { q: "Wie schnell sehe ich erste Ergebnisse?", a: "Die meisten Kunden sehen erste messbare Ergebnisse innerhalb der ersten 30–60 Tage. Eine neue Website geht in unter 14 Tagen live." },
  { q: "Was kostet eine Zusammenarbeit?", a: "Das kommt ganz auf dein Unternehmen, deine Ziele und den aktuellen Stand an. Jeder Betrieb braucht eine individuelle Lösung. Deshalb schauen wir uns im kostenlosen Erstgespräch alles gemeinsam an und erstellen anschließend ein passendes Konzept für dich." },
  { q: "Was passiert im kostenlosen Erstgespräch?", a: "Wir analysieren deinen Online-Auftritt, identifizieren Wachstumspotenziale und zeigen dir konkret, welche Maßnahmen den größten Impact hätten. Dauer: ca. 30 Minuten." },
  { q: "Gibt es eine Mindestvertragslaufzeit?", a: (
    <>
      <p>Nein. Unsere Websites werden in erster Linie schlüsselfertig an den Kunden übergeben. Das bedeutet: Du besitzt deine Website vollständig und entscheidest selbst, wie du sie betreiben möchtest.</p>
      <p className="mt-3">Auf Wunsch übernehmen wir auch Hosting, Wartung und technische Betreuung. Da der Aufwand je nach Projekt unterschiedlich ist, besprechen wir das individuell und transparent.</p>
      <p className="mt-3 text-slate-500 text-xs tracking-wide">Keine versteckten Verpflichtungen. Keine langfristige Bindung.</p>
    </>
  ) },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {FAQS.map((faq, i) => (
        <motion.div
          key={i}
          layout
          className="rounded-xl overflow-hidden"
          style={{
            background: open === i ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${open === i ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.07)"}`,
            boxShadow: open === i ? "0 4px 24px rgba(59,130,246,0.08)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="font-medium pr-6 text-sm sm:text-base leading-snug text-slate-200">
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: open === i ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)" }}
            >
              <svg className="w-2.5 h-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
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

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ svc }: { svc: Svc }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: `0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px ${svc.color}20` }}
      transition={SPRING_FAST}
      className="relative rounded-2xl p-6 sm:p-7 h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${svc.color}55, transparent)` }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
        style={{ background: `${svc.color}14`, color: svc.color, border: `1px solid ${svc.color}22` }}
      >
        {svc.icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5" style={{ color: svc.color }}>
        {svc.sub}
      </p>
      <h3 className="text-base font-bold mb-3 text-white">{svc.title}</h3>
      <p className="text-sm leading-relaxed mb-5 flex-1 text-slate-400">{svc.desc}</p>
      <ul className="space-y-2 mt-auto">
        {svc.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-xs text-slate-500">
            <svg className="w-3 h-3 flex-shrink-0" style={{ color: svc.color }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#branchen", label: "Branchen" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#faq", label: "FAQ" },
  { href: "/karriere", label: "Karriere" },
];

function PremiumNavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-[15px] font-semibold tracking-[0.02em]"
      style={{
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(148,163,184,0.62)",
        transition: "color 220ms ease",
        padding: "6px 14px",
        borderRadius: "8px",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "8px",
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
        aria-hidden
      />
      <span className="relative z-10">{label}</span>
      <span
        className="absolute pointer-events-none"
        style={{
          bottom: "3px",
          left: "50%",
          height: "1px",
          width: "52%",
          borderRadius: "9999px",
          background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.9), transparent)",
          transformOrigin: "center",
          transform: hovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
          opacity: hovered ? 1 : 0,
          transition: "transform 260ms ease, opacity 220ms ease",
        }}
        aria-hidden
      />
    </a>
  );
}

const SERVICES: Svc[] = [
  {
    color: "#3b82f6",
    title: "Webdesign",
    sub: "Conversion Design",
    desc: "Professionelle Websites, die verkaufen. Optimiert für Geschwindigkeit, Mobile und maximale Konversionsrate.",
    features: ["Conversion-optimiert", "Mobile-first", "SEO-ready", "In unter 14 Tagen"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    color: "#8b5cf6",
    title: "Social Media",
    sub: "Organisches Wachstum",
    desc: "Content-Marketing auf Instagram, Facebook und LinkedIn. Systematischer Markenaufbau mit messbarer Reichweite.",
    features: ["Content Creation", "Community Management", "Paid Ads", "Monatliches Reporting"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    color: "#f59e0b",
    title: "Lead-Generierung",
    sub: "Planbare Neukunden",
    desc: "Systematische Leadgenerierung über Google Ads, Social Ads und SEO. Messbare Kosten pro qualifizierter Anfrage.",
    features: ["Google Ads", "SEO & Local Pack", "Landing Pages", "CRM-Integration"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    color: "#10b981",
    title: "Employer Branding",
    sub: "Recruiting & Marke",
    desc: "Positioniere dich als attraktiven Arbeitgeber. Karriereseiten, Stellenanzeigen und gezielte Recruiting-Kampagnen.",
    features: ["Karriereseite", "Meta Recruiting Ads", "Bewerbermanagement", "Employer Story"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// ─── Premium ambient star field ──────────────────────────────────────────────
// Safe zone (content area): x 15–85%, y 27–82% — NO particles placed there.
// Positions confined to edges, top strip, bottom strip.
// t: tier (0=dust/dim, 1=star/mid, 2=bright/glow)
// d: drift variant index 0–4 → pdrift-a … pdrift-e
// del: negative delay → animation starts mid-lifecycle (no blank start)
const STARS_V2: { x: number; y: number; s: number; t: 0|1|2; d: 0|1|2|3|4; dur: number; del: number }[] = [
  // ── Left edge (x 1–13%, full height) ──
  { x: 2,  y: 6,  s: 0.6, t: 0, d: 0, dur: 42, del: -5  },
  { x: 5,  y: 21, s: 1.1, t: 1, d: 2, dur: 33, del: -12 },
  { x: 8,  y: 37, s: 0.7, t: 0, d: 1, dur: 48, del: -8  },
  { x: 11, y: 54, s: 2.4, t: 2, d: 3, dur: 29, del: -3  },
  { x: 7,  y: 68, s: 1.0, t: 1, d: 4, dur: 37, del: -19 },
  { x: 3,  y: 83, s: 0.7, t: 0, d: 0, dur: 45, del: -14 },
  { x: 10, y: 93, s: 1.2, t: 1, d: 2, dur: 31, del: -7  },
  { x: 4,  y: 13, s: 2.8, t: 2, d: 1, dur: 26, del: -22 },
  { x: 9,  y: 46, s: 0.8, t: 0, d: 3, dur: 51, del: -11 },
  { x: 6,  y: 75, s: 1.0, t: 1, d: 4, dur: 36, del: -16 },
  // ── Right edge (x 87–99%, full height) ──
  { x: 89, y: 9,  s: 0.7, t: 0, d: 1, dur: 43, del: -6  },
  { x: 93, y: 26, s: 1.3, t: 1, d: 0, dur: 34, del: -18 },
  { x: 97, y: 43, s: 3.0, t: 2, d: 4, dur: 25, del: -2  },
  { x: 91, y: 61, s: 0.7, t: 0, d: 2, dur: 50, del: -13 },
  { x: 95, y: 77, s: 1.4, t: 1, d: 3, dur: 32, del: -9  },
  { x: 88, y: 91, s: 0.6, t: 0, d: 1, dur: 46, del: -21 },
  { x: 96, y: 7,  s: 1.0, t: 1, d: 0, dur: 38, del: -4  },
  { x: 92, y: 34, s: 2.6, t: 2, d: 2, dur: 28, del: -15 },
  { x: 98, y: 57, s: 0.8, t: 0, d: 4, dur: 55, del: -10 },
  { x: 90, y: 86, s: 1.1, t: 1, d: 3, dur: 36, del: -25 },
  // ── Top strip (x 16–84%, y 2–24%) ──
  { x: 18, y: 5,  s: 0.6, t: 0, d: 2, dur: 44, del: -7  },
  { x: 27, y: 12, s: 1.4, t: 1, d: 1, dur: 30, del: -22 },
  { x: 37, y: 7,  s: 3.2, t: 2, d: 0, dur: 26, del: -4  },
  { x: 47, y: 16, s: 0.7, t: 0, d: 3, dur: 49, del: -17 },
  { x: 56, y: 4,  s: 1.5, t: 1, d: 4, dur: 32, del: -11 },
  { x: 66, y: 13, s: 0.6, t: 0, d: 2, dur: 52, del: -8  },
  { x: 75, y: 9,  s: 2.2, t: 2, d: 1, dur: 24, del: -2  },
  { x: 22, y: 19, s: 1.0, t: 1, d: 0, dur: 40, del: -14 },
  { x: 35, y: 22, s: 0.8, t: 0, d: 4, dur: 47, del: -19 },
  { x: 50, y: 18, s: 1.3, t: 1, d: 3, dur: 35, del: -6  },
  { x: 64, y: 21, s: 0.7, t: 0, d: 1, dur: 54, del: -24 },
  { x: 80, y: 15, s: 2.5, t: 2, d: 0, dur: 27, del: -16 },
  // ── Bottom strip (x 16–84%, y 83–97%) ──
  { x: 20, y: 85, s: 1.1, t: 1, d: 2, dur: 36, del: -5  },
  { x: 32, y: 89, s: 0.6, t: 0, d: 4, dur: 48, del: -18 },
  { x: 45, y: 93, s: 2.8, t: 2, d: 1, dur: 28, del: -12 },
  { x: 55, y: 87, s: 1.3, t: 1, d: 3, dur: 31, del: -7  },
  { x: 68, y: 94, s: 0.8, t: 0, d: 0, dur: 46, del: -20 },
  { x: 80, y: 88, s: 1.0, t: 1, d: 2, dur: 38, del: -3  },
  { x: 25, y: 96, s: 2.4, t: 2, d: 4, dur: 25, del: -15 },
  { x: 42, y: 91, s: 0.7, t: 0, d: 1, dur: 53, del: -9  },
  { x: 60, y: 97, s: 1.2, t: 1, d: 0, dur: 33, del: -23 },
  { x: 74, y: 95, s: 0.8, t: 0, d: 3, dur: 50, del: -11 },
];

const DRIFT_NAMES = ["pdrift-a", "pdrift-b", "pdrift-c", "pdrift-d", "pdrift-e"] as const;

// ─── Hero star field — safe zones, lifecycle fade, 3-tier mouse parallax ─────
function HeroStarField({
  springX, springY, isMobile,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  isMobile: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Three depth tiers — each moves a different amount with the mouse
  const t0x = useTransform(springX, v => (v / 1440 - 0.5) * -6);
  const t0y = useTransform(springY, v => (v / 900  - 0.5) * -4);
  const t1x = useTransform(springX, v => (v / 1440 - 0.5) * -17);
  const t1y = useTransform(springY, v => (v / 900  - 0.5) * -13);
  const t2x = useTransform(springX, v => (v / 1440 - 0.5) * -36);
  const t2y = useTransform(springY, v => (v / 900  - 0.5) * -27);

  // Mouse proximity brightening — screen blend, zero re-renders
  const spotBg = useMotionTemplate`radial-gradient(360px circle at ${springX}px ${springY}px, rgba(96,165,250,0.042) 0%, transparent 65%)`;

  if (!mounted || prefersReduced || isMobile) return null;

  const tier0 = STARS_V2.filter(s => s.t === 0);
  const tier1 = STARS_V2.filter(s => s.t === 1);
  const tier2 = STARS_V2.filter(s => s.t === 2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Tier 0 — dust: tiniest, barely visible, depth-blurred wrapper */}
      <motion.div className="absolute inset-0" style={{ x: t0x, y: t0y, filter: "blur(0.45px)" }}>
        {tier0.map((star, i) => (
          <div key={i} style={{
            position: "absolute", left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.s}px`, height: `${star.s}px`, borderRadius: "50%",
            background: "rgba(210,228,255,0.85)", willChange: "transform, opacity",
            animation: `${DRIFT_NAMES[star.d]} ${star.dur}s ease-in-out ${star.del}s infinite, pfade-dim ${star.dur}s linear ${star.del}s infinite`,
          }} />
        ))}
      </motion.div>

      {/* Tier 1 — stars: sharp, some blue-tinted, occasional faint glow */}
      <motion.div className="absolute inset-0" style={{ x: t1x, y: t1y }}>
        {tier1.map((star, i) => (
          <div key={i} style={{
            position: "absolute", left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.s}px`, height: `${star.s}px`, borderRadius: "50%",
            background: i % 5 === 0 ? "rgba(96,165,250,0.95)" : "rgba(232,244,255,0.92)",
            willChange: "transform, opacity",
            animation: `${DRIFT_NAMES[star.d]} ${star.dur}s ease-in-out ${star.del}s infinite, pfade-mid ${star.dur}s linear ${star.del}s infinite`,
            boxShadow: i % 5 === 0 ? "0 0 3.5px 0.5px rgba(147,197,253,0.18)" : "none",
          }} />
        ))}
      </motion.div>

      {/* Tier 2 — bright stars: largest, prominent glow, strongest parallax */}
      <motion.div className="absolute inset-0" style={{ x: t2x, y: t2y }}>
        {tier2.map((star, i) => {
          const blue = i % 3 !== 2;
          const glow = star.s * 2.4;
          return (
            <div key={i} style={{
              position: "absolute", left: `${star.x}%`, top: `${star.y}%`,
              width: `${star.s}px`, height: `${star.s}px`, borderRadius: "50%",
              background: blue ? "rgba(96,165,250,0.97)" : "rgba(248,252,255,1.0)",
              willChange: "transform, opacity",
              animation: `${DRIFT_NAMES[star.d]} ${star.dur}s ease-in-out ${star.del}s infinite, pfade-bright ${star.dur}s linear ${star.del}s infinite`,
              boxShadow: blue
                ? `0 0 ${glow}px ${glow * 0.3}px rgba(59,130,246,0.25)`
                : `0 0 ${glow}px ${glow * 0.28}px rgba(147,197,253,0.20)`,
            }} />
          );
        })}
      </motion.div>

      {/* Mouse proximity — screen blend brightens stars near the cursor */}
      <motion.div className="absolute inset-0" style={{ background: spotBg, mixBlendMode: "screen" }} />
    </div>
  );
}

// ─── Background ambient layer — pure MotionValue, zero React re-renders ───────
function AmbientBackground({
  springX, springY, rawX, rawY, isMobile,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  rawX: MotionValue<number>;
  rawY: MotionValue<number>;
  isMobile: boolean;
}) {
  // All hooks called unconditionally (React rules)
  const innerSpot = useMotionTemplate`radial-gradient(280px circle at ${rawX}px ${rawY}px, rgba(59,130,246,0.07), transparent 70%)`;
  const outerGlow = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(59,130,246,0.042), transparent 50%)`;

  const nearX = useTransform(springX, v => (v / 1440 - 0.5) * -32);
  const nearY = useTransform(springY, v => (v / 900  - 0.5) * -24);
  const midX  = useTransform(springX, v => (v / 1440 - 0.5) * -16);
  const midY  = useTransform(springY, v => (v / 900  - 0.5) * -12);
  const farX  = useTransform(springX, v => (v / 1440 - 0.5) *  -6);
  const farY  = useTransform(springY, v => (v / 900  - 0.5) *  -4);

  const auroraAX = useTransform(springX, v => (v / 1440 - 0.5) * 60);
  const auroraAY = useTransform(springY, v => (v / 900  - 0.5) * 44);
  const auroraBX = useTransform(springX, v => (v / 1440 - 0.5) * -40);
  const auroraBY = useTransform(springY, v => (v / 900  - 0.5) * -30);
  const auroraCX = useTransform(springX, v => (v / 1440 - 0.5) * 22);
  const auroraCY = useTransform(springY, v => (v / 900  - 0.5) * -18);

  // Mobile: pure CSS static gradients — no JS-driven parallax, no blur filters
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }} />
        <div className="absolute pointer-events-none" style={{ top: "-280px", right: "-220px", width: "920px", height: "920px", background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(96,165,250,0.04) 52%, transparent 72%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "0", left: "-240px", width: "720px", height: "720px", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(2,8,24,0.18) 0%, transparent 8%, transparent 92%, rgba(2,8,24,0.22) 100%)" }} />
        <div className="noise-overlay" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ── Base deep blue ── */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }}
      />

      {/* ── Mouse spotlights ── */}
      <motion.div className="absolute inset-0" style={{ background: innerSpot }} />
      <motion.div className="absolute inset-0" style={{ background: outerGlow }} />

      {/* ── Aurora A — large primary (top right), CSS float + mouse parallax ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: auroraAX, y: auroraAY, top: "-280px", right: "-220px", willChange: "transform" }}
      >
        <div
          className="float-orb"
          style={{
            width: "920px", height: "920px",
            background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(96,165,250,0.06) 40%, transparent 68%)",
            filter: "blur(40px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* ── Aurora B — secondary (bottom left), indigo tones ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: auroraBX, y: auroraBY, bottom: "0px", left: "-240px", willChange: "transform" }}
      >
        <div
          className="float-orb-alt"
          style={{
            width: "720px", height: "720px",
            background: "radial-gradient(circle, rgba(99,102,241,0.11) 0%, rgba(139,92,246,0.05) 40%, transparent 68%)",
            filter: "blur(48px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* ── Aurora C — accent (mid right), electric blue ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: auroraCX, y: auroraCY, top: "35%", right: "8%", willChange: "transform" }}
      >
        <div
          className="float-orb-slow"
          style={{
            width: "380px", height: "380px",
            background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 68%)",
            filter: "blur(28px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* ── Aurora shimmer bands — wide, soft, cinematic ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="aurora-shimmer absolute"
          style={{
            left: "-30%", width: "160%", height: "72px",
            background: "linear-gradient(to right, transparent 4%, rgba(59,130,246,0.055) 22%, rgba(96,165,250,0.09) 50%, rgba(59,130,246,0.055) 78%, transparent 96%)",
            filter: "blur(52px)",
            borderRadius: "50%",
          }}
        />
        <div
          className="aurora-shimmer-b absolute"
          style={{
            left: "-25%", width: "150%", height: "56px",
            background: "linear-gradient(to right, transparent 6%, rgba(99,102,241,0.04) 28%, rgba(139,92,246,0.07) 50%, rgba(99,102,241,0.04) 72%, transparent 94%)",
            filter: "blur(44px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* ── 3-layer parallax dot field ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: farX, y: farY,
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.055) 1.5px, transparent 1.5px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 75% 72% at 50% 50%, black 15%, transparent 72%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          x: midX, y: midY,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.038) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 78% at 50% 45%, black 20%, transparent 76%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          x: nearX, y: nearY,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 85% 82% at 50% 42%, black 25%, transparent 80%)",
        }}
      />

      {/* ── Scanlines ── */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* ── Film grain / noise ── */}
      <div className="noise-overlay" />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }}
      />

      {/* ── Edge darkness ── */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(2,8,24,0.18) 0%, transparent 8%, transparent 92%, rgba(2,8,24,0.22) 100%)" }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Mobile detection (pointer: coarse = touch device — no mouse parallax needed)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
    );
  }, []);

  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Typewriter
  const [text, setText] = useState("");
  const [typeIdx, setTypeIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const HEADLINES = ["MEHR AUFTRÄGE.", "MEHR UMSATZ.", "MEHR WACHSTUM."];

  // Mouse motion values — never converted to state, pure MotionValue pipeline
  const mouseX = useMotionValue(760);
  const mouseY = useMotionValue(400);
  // Soft spring lag for aurora + parallax (responsive but not jittery)
  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 22, mass: 1.2 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 22, mass: 1.2 });

  // Parallax scroll
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -80]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const fn = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseX, mouseY, isMobile]);


  // Typewriter
  useEffect(() => {
    const current = HEADLINES[typeIdx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2800);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setTypeIdx((i) => (i + 1) % HEADLINES.length);
      return;
    }
    const t = setTimeout(
      () => setText((p) => (deleting ? p.slice(0, -1) : current.slice(0, p.length + 1))),
      deleting ? 45 : 85
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, typeIdx]);

  // Section background style (consistent dark)
  const sectionDark = {
    background: "transparent",
    position: "relative" as const,
  };

  return (
    <>
      {/* Fixed ambient background — zero React re-renders, pure MotionValue */}
      <AmbientBackground springX={smoothX} springY={smoothY} rawX={mouseX} rawY={mouseY} isMobile={isMobile} />

      <main style={{ color: "#e2e8f0", position: "relative", zIndex: 1 }} className="overflow-x-hidden">

        {/* ══════════════════════ NAV */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(4,8,28,0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            boxShadow: scrolled ? "0 1px 32px rgba(0,0,0,0.4)" : "none",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
            <a href="#" aria-label="MehrAuftrag" className="flex items-center">
              <MALogo variant="dark" />
            </a>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((n) => (
                <PremiumNavLink key={n.href} href={n.href} label={n.label} />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#kontakt"
                className="shimmer-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(59,130,246,0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(59,130,246,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Gespräch buchen</span>
              </a>
            </div>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 outline-none focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((_, idx) => (
                <span
                  key={idx}
                  className="block h-px transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    width: idx === 1 ? (menuOpen ? "20px" : "12px") : "20px",
                    transform: menuOpen
                      ? idx === 0 ? "rotate(45deg) translateY(7px)" : idx === 2 ? "rotate(-45deg) translateY(-7px)" : "none"
                      : "none",
                    opacity: menuOpen && idx === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
          <div className="md:hidden overflow-y-auto transition-all duration-300" style={{ maxHeight: menuOpen ? "calc(100dvh - 64px)" : "0", background: "#040c1c" }}>
            <div
              className="px-5 py-4 space-y-0.5"
              style={{ background: "#040c1c", minHeight: "calc(100dvh - 64px)" }}
            >
              {NAV_LINKS.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-3 mt-3 rounded-lg text-white text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                Gespräch buchen
              </a>
            </div>
          </div>
        </nav>

        {/* ══════════════════════ HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Hero-specific extra glows (above global bg) */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ background: "radial-gradient(ellipse 70% 55% at 65% 28%, rgba(59,130,246,0.13) 0%, transparent 100%)" }} className="absolute inset-0" />
            <div style={{ background: "radial-gradient(ellipse 50% 45% at 20% 72%, rgba(99,102,241,0.07) 0%, transparent 100%)" }} className="absolute inset-0" />
          </div>

          {/* Premium hero star field — 3 depth layers, mouse parallax */}
          <HeroStarField springX={smoothX} springY={smoothY} isMobile={isMobile} />

          <motion.div
            style={{ y: heroParallax }}
            className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto pt-32 pb-28"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <div
                className="badge-glow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>
                  Digitalagentur für alle Branchen
                </span>
              </div>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
              className="text-sm sm:text-base font-medium tracking-[0.26em] uppercase mb-6"
              style={{ color: "rgba(147,197,253,0.45)" }}
            >
              Dein Betrieb verdient
            </motion.p>

            {/* Typewriter headline — height locked to prevent CLS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease: EASE_OUT }}
            >
              <h1
                className="hero-headline font-black tracking-tighter text-white mb-8"
                style={{
                  fontSize: "clamp(44px, 8.5vw, 100px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                }}
              >
                {/* Lock height to max headline to eliminate CLS */}
                <span
                  className="typewriter-wrap relative inline-block"
                  style={{
                    minHeight: "1.0em",
                  }}
                >
                  {text || " "}
                  <span
                    className="cursor-blink inline-block align-middle"
                    style={{ width: "3px", height: "0.7em", background: "#3b82f6", marginLeft: "4px", borderRadius: "1px", verticalAlign: "middle" }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE_OUT }}
              className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light"
              style={{ color: "rgba(148,163,184,0.78)" }}
            >
              Websites, die verkaufen. Marketing, das messbar wirkt. Für{" "}
              <span style={{ color: "rgba(147,197,253,0.85)", fontWeight: 500 }}>
                Handwerker, Therapeuten, Gastronomen
              </span>{" "}
              und Dienstleister.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.a
                href="https://calendly.com/mehrauftrag-info/30min?month=2026-05"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(59,130,246,0.65), 0 0 0 1px rgba(59,130,246,0.45)" }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING_FAST}
                className="shimmer-btn group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
                }}
              >
                <span className="relative z-10">Kostenloses Erstgespräch</span>
                <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#leistungen"
                whileHover={{ borderColor: "rgba(255,255,255,0.2)", color: "#ffffff", background: "rgba(255,255,255,0.07)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              >
                Leistungen ansehen
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <svg className="w-5 h-5 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </section>

        {/* ══════════════════════ STATS */}
        <section className="py-20 sm:py-24 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.07), transparent 70%)" }}
          />
          <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { n: 50,  suf: "+",  label: "Betreute Betriebe",     desc: "Aus über 12 Branchen" },
                { n: 7,   suf: "",   label: "Tage Lieferzeit",       desc: "Schnelle Umsetzung garantiert" },
                { n: 12,  suf: "+",  label: "Branchen",              desc: "Branchenübergreifende Expertise" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                 
                  whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.28)" }}
                  transition={SPRING_FAST}
                  className="rounded-2xl px-7 py-8 text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03) inset",
                  }}
                >
                  <div className="text-5xl font-black mb-2 tracking-tighter gradient-text-blue">
                    <Counter target={s.n} suffix={s.suf} />
                  </div>
                  <div className="font-semibold text-sm mb-1 text-white">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ PROBLEM */}
        <section className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 45% at 80% 50%, rgba(99,102,241,0.06), transparent 70%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-16 max-w-xl">
              <SectionLabel>Das Problem</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                Erkennst du dich wieder?
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                Die meisten Betriebe kämpfen täglich mit denselben digitalen Problemen und verlieren dabei täglich Aufträge.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { n: "01", title: "Veraltete oder keine Website", desc: "Deine Konkurrenz gewinnt täglich Kunden online während du noch auf Weiterempfehlung wartest." },
                { n: "02", title: "Keine Anfragen aus dem Internet", desc: "Google findet dich nicht. Social Media stagniert. Dein Budget verpufft ohne messbare Ergebnisse." },
                { n: "03", title: "Kein System für Neukundengewinnung", desc: "Alles hängt an einzelnen Personen. Kein skalierbares System bedeutet keine Planbarkeit." },
                { n: "04", title: "Schlechtes Image trotz guter Arbeit", desc: "Du leistest Qualität, aber dein Online-Auftritt vermittelt das nicht. Das kostet dich täglich Aufträge." },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                 
                  whileHover={{ y: -3, background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                  transition={SPRING_FAST}
                  className="rounded-2xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block text-slate-600">{c.n}</span>
                  <h3 className="font-bold mb-2.5 leading-snug text-white">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ SOLUTION */}
        <section className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(59,130,246,0.07), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16 max-w-2xl mx-auto"
            >
              <SectionLabel center>Unsere Lösung</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                3 Schritte zum Wachstum
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                Kein Bullshit. Keine leeren Versprechen. Nur messbare Ergebnisse.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {[
                { n: "01", title: "Analyse & Strategie", desc: "Wir analysieren deinen Betrieb, deine Branche und die Konkurrenz. Daraus entsteht eine Wachstumsstrategie mit konkreten KPIs." },
                { n: "02", title: "Umsetzung & Launch", desc: "Wir bauen deine Website, richten deine Kanäle ein und starten die ersten Kampagnen in unter 14 Tagen." },
                { n: "03", title: "Wachstum & Skalierung", desc: "Kontinuierliche Optimierung auf Basis echter Daten. Mehr Anfragen, mehr Umsatz Monat für Monat." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                 
                  whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.22)", background: "rgba(255,255,255,0.04)" }}
                  transition={SPRING_FAST}
                  className="relative rounded-2xl p-8 h-full overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="absolute top-6 right-7 text-7xl font-black select-none leading-none text-white/[0.03]">
                    {s.n}
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-[#3b82f6] font-black text-sm"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)" }}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ LEISTUNGEN */}
        <section id="leistungen" className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(139,92,246,0.06), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-16 max-w-xl">
              <SectionLabel>Leistungen</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                Alles aus einer Hand.
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                Von der Website bis zur Kampagne wir liefern die komplette digitale Infrastruktur für dein Wachstum.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {SERVICES.map((svc, i) => (
                <motion.div key={i} variants={fadeUp} className="h-full">
                  <ServiceCard svc={svc} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ ÜBER UNS */}
        <section id="ueber-uns" className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 80% 45%, rgba(59,130,246,0.07), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
               
                className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(59,130,246,0.16) 0%, transparent 62%)", filter: "blur(36px)" }}
                />
                <div className="relative flex flex-col items-center" style={{ width: "min(340px, 100%)" }}>
                  <div
                    className="absolute top-3 left-3 sm:-top-3 sm:-left-5 z-10 rounded-lg px-3 py-1.5 flex items-center gap-1.5"
                    style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.22)" }}
                  >
                    <span className="text-[#f59e0b] text-xs font-bold">⭐ 5.0</span>
                    <span className="text-slate-500 text-[10px]">Bewertung</span>
                  </div>
                  <div
                    className="relative overflow-hidden w-full"
                    style={{
                      aspectRatio: "4/5",
                      borderRadius: "20px",
                      border: "1px solid rgba(59,130,246,0.16)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 24px 80px rgba(0,0,0,0.4), 0 4px 20px rgba(59,130,246,0.08)",
                    }}
                  >
                    <Portrait />
                  </div>
                  <div
                    className="mt-4 rounded-xl px-4 py-3 flex items-center gap-2.5"
                    style={{ background: "rgba(4,8,28,0.96)", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.15)" }}>
                      <svg className="w-3.5 h-3.5 text-[#60a5fa]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-[13px] leading-none mb-0.5">50+ Betriebe</div>
                      <div className="text-white/40 text-[11px]">erfolgreich betreut</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="order-1 lg:order-2"
              >
                <SectionLabel>Über uns</SectionLabel>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6 text-white">
                  Kein Dienstleister.{" "}
                  <span className="gradient-text-blue">Dein Partner.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-5 text-slate-300">
                  Ich bin Patrick Sauna, Geschäftsführer von MehrAuftrag. Ich habe selbst erlebt,
                  wie schwer es ist, als kleiner Betrieb online gegen große Unternehmen mit riesigen Budgets zu bestehen.
                </p>
                <p className="leading-relaxed mb-8 text-slate-400">
                  Deshalb haben wir MehrAuftrag gegründet eine Digitalagentur,
                  die wirklich liefert. Keine leeren Versprechen. Keine generischen
                  Pakete. Nur maßgeschneiderte Strategien, die messbar mehr Aufträge bringen.
                </p>
                <div className="space-y-2.5 mb-8">
                  {["50+ Betriebe erfolgreich betreut", "Persönlicher Ansprechpartner", "100% Ergebnisorientiert", "90-Tage-Ergebnis-Garantie"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                        <svg className="w-2.5 h-2.5 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <motion.a
                  href="#kontakt"
                  whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(59,130,246,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_FAST}
                  className="shimmer-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 16px rgba(59,130,246,0.32)", display: "inline-flex" }}
                >
                  <span>Lern uns kennen</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ BRANCHEN */}
        <section id="branchen" className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 45% 40% at 30% 70%, rgba(16,185,129,0.05), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14 max-w-xl mx-auto"
            >
              <SectionLabel center>Branchen</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                Für jede Branche.
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                Wir verstehen die Besonderheiten deiner Branche und liefern maßgeschneiderte Lösungen ohne generische Einheitspakete.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {[
                { icon: "🔧", label: "Handwerk" },
                { icon: "🏥", label: "Physiotherapie" },
                { icon: "⚙️", label: "Industrie" },
                { icon: "🍽️", label: "Gastronomie" },
                { icon: "💼", label: "Dienstleister" },
                { icon: "✦",  label: "Weitere" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                 
                  whileHover={{ y: -4, background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.22)", boxShadow: "0 10px 28px rgba(59,130,246,0.12)" }}
                  transition={SPRING_FAST}
                  className="rounded-xl p-5 sm:p-6 cursor-pointer flex flex-col items-center justify-center text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    minHeight: "96px",
                  }}
                >
                  <div className="text-3xl mb-2.5 leading-none">{item.icon}</div>
                  <div className="text-xs font-medium text-slate-300">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ TESTIMONIALS */}
        <section id="referenzen" className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.07), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14 max-w-xl mx-auto"
            >
              <SectionLabel center>Referenzen</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                Echte Ergebnisse.
              </h2>
              <p className="text-lg text-slate-400">
                Keine inszenierten Testimonials. Echte Kunden, echte Zahlen.
              </p>
            </motion.div>
            <TestimonialSlider />
          </div>
        </section>

        {/* ══════════════════════ FAQ */}
        <section id="faq" className="py-24 sm:py-32 relative" style={sectionDark}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 40% at 75% 40%, rgba(99,102,241,0.06), transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="lg:sticky lg:top-28">
                  <SectionLabel>FAQ</SectionLabel>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                    Häufige Fragen.
                  </h2>
                  <p className="text-lg leading-relaxed mb-8 text-slate-400">
                    Alles was du wissen musst, bevor wir starten. Noch Fragen? Ruf an.
                  </p>
                  <a href="#kontakt" className="inline-flex items-center gap-2 text-sm font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors">
                    Direkt ansprechen
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
               
              >
                <FAQ />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA */}
        <section id="kontakt" className="py-28 sm:py-36 relative overflow-hidden" style={sectionDark}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 60% at 50% 55%, rgba(59,130,246,0.14) 0%, transparent 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 35% at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 100%)" }} />
          <div
            className="float-orb absolute pointer-events-none"
            style={{ width: "500px", height: "500px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 68%)", borderRadius: "50%" }}
          />
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <p className="text-[11px] font-semibold tracking-[0.26em] uppercase mb-6 text-slate-600">
                Jetzt starten
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                Dein Wachstum
                <br />
                <span className="gradient-text-blue">beginnt heute.</span>
              </h2>
              <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed text-slate-400">
                Kostenloses Erstgespräch. Wir analysieren deinen Betrieb und
                zeigen dir in 30 Minuten, wie du in 90 Tagen mehr Aufträge gewinnst.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <motion.a
                  href="https://calendly.com/mehrauftrag-info/30min?month=2026-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, boxShadow: "0 14px 48px rgba(59,130,246,0.68), 0 0 0 1px rgba(59,130,246,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_FAST}
                  className="shimmer-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 24px rgba(59,130,246,0.5), 0 0 0 1px rgba(59,130,246,0.3)" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="relative z-10">Kostenloses Erstgespräch</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/4915202069625"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ background: "rgba(74,222,128,0.1)", borderColor: "rgba(74,222,128,0.38)", boxShadow: "0 4px 24px rgba(74,222,128,0.14)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base"
                  style={{ color: "#4ade80", border: "1px solid rgba(74,222,128,0.22)", background: "rgba(74,222,128,0.05)" }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp schreiben
                </motion.a>
              </div>
              <p className="text-xs tracking-wide text-white/20">
                Kostenlos &amp; unverbindlich &nbsp;·&nbsp; 30 Minuten &nbsp;·&nbsp; Sofortiger Mehrwert
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ FOOTER */}
        <footer className="py-9 px-5 sm:px-8 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 gap-x-8">
              {/* Brand */}
              <div className="flex flex-col items-center sm:items-start gap-1">
                <MALogo variant="dark" />
                <p className="text-[11px] text-white/18">Die Digitalagentur die liefert.</p>
              </div>

              {/* Right side: nav + legal */}
              <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-8">
                {/* Primary nav */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {NAV_LINKS.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      className="text-[11px] font-medium tracking-wide text-white/28 hover:text-white/65 transition-colors"
                    >
                      {n.label}
                    </a>
                  ))}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-3 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                {/* Legal links */}
                <div className="flex items-center gap-5">
                  <a
                    href="/impressum"
                    className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors"
                  >
                    Impressum
                  </a>
                  <span className="text-[10px] text-white/10">·</span>
                  <a
                    href="/datenschutz"
                    className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors"
                  >
                    Datenschutz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
