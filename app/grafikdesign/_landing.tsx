"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaMark from "../_components/ma-mark";

/**
 * Landingpage /grafikdesign für Mehr Auftrag.
 *
 * Zielgruppe: Unternehmen aus Frankfurt und dem Rhein-Main-Gebiet, die
 * Grafikdesign, Printprodukte und Werbetechnik aus einer Hand suchen.
 * Eigenes Grafikteam, individuelle Gestaltung, kein Baukasten.
 *
 * Branding 1:1 zur Startseite und zu /google-ads (dunkles Blau, Glas-Cards,
 * Shimmer-CTA, Geist). Weicher Call-to-Action ohne Lead-Formular.
 */

// ─── Konfiguration (öffentliche Werte) ───────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/mehrauftrag-info/30min";
const TEL_URL = "tel:+4915202069625";
const WHATSAPP_URL =
  "https://wa.me/4915202069625?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Grafikdesign%20und%20Werbetechnik.";

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
const SECTION_VIEWPORT = { once: true, amount: 0.2 };

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
      <p className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#3b82f6]">{children}</p>
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

// Story-Baustein für den Referenz-Block: Ausgangssituation / Umsetzung / Ergebnis
function StoryRow({ label, text, highlight = false }: { label: string; text: string; highlight?: boolean }) {
  return (
    <div
      className="relative pl-4 py-0.5"
      style={{ borderLeft: `2px solid ${highlight ? "rgba(59,130,246,0.65)" : "rgba(255,255,255,0.1)"}` }}
    >
      <div
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: highlight ? "#60a5fa" : "rgba(148,163,184,0.7)" }}
      >
        {label}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: highlight ? "#dbeafe" : "#94a3b8" }}>
        {text}
      </p>
    </div>
  );
}

// ─── Leistungen (alle 21 Leistungen, in fünf Karten geordnet) ─────────────────
const LEISTUNGEN: { title: string; desc: string; items: string[]; icon: React.ReactNode }[] = [
  {
    title: "Flyer & Printdesign",
    desc: "Vom ersten Entwurf bis zur fertigen Druckdatei gestalten wir Werbemittel, die im Briefkasten und auf dem Tisch auffallen und im Kopf bleiben.",
    items: ["Flyer gestalten", "Falzflyer", "Werbeflyer", "Plakate", "Broschüren", "Speisekarten"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Geschäftsausstattung",
    desc: "Ein stimmiger Auftritt beginnt bei den Dingen, die täglich in Kundenhand gehen. Wir gestalten deine gesamte Ausstattung aus einem Guss.",
    items: ["Visitenkarten gestalten", "Briefpapier", "Geschäftsausstattung", "Firmenschilder"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h4M7 13h2M15 6V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1" />
      </svg>
    ),
  },
  {
    title: "Textildruck & Firmenkleidung",
    desc: "Deine Marke zum Anziehen. Wir bedrucken und besticken Kleidung mit deinem Logo, vom einzelnen Shirt bis zur kompletten Team-Ausstattung, sauber verarbeitet und langlebig.",
    items: ["T-Shirts bedrucken", "Poloshirts", "Hoodies & Pullover", "Arbeitskleidung", "Kugelschreiber & Kulis", "Werbeartikel"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 2.5-2 4-2-1v10.5H8V9.5l-2 1-2-4L8 4c0 1.657 1.79 3 4 3s4-1.343 4-3z" />
      </svg>
    ),
  },
  {
    title: "Werbetechnik & Fahrzeug",
    desc: "Große Flächen wollen sauber gedacht sein. Wir gestalten Werbetechnik, die aus Entfernung wirkt und deine Marke sichtbar durch die Stadt trägt.",
    items: ["Autoaufkleber", "Fahrzeugbeschriftung", "Schaufensterbeschriftung", "Roll-ups", "Banner", "Aufkleber"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 16h.01M17.5 16h.01" />
      </svg>
    ),
  },
  {
    title: "Marke & Corporate Design",
    desc: "Eine Marke ist mehr als ein Logo. Wir entwickeln einen einheitlichen Auftritt, an dem Kunden dich sofort wiedererkennen, online wie offline.",
    items: ["Logo Design", "Corporate Design", "Social Media Grafiken"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 17h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5l4.586 4.586a2 2 0 010 2.828L12 16M9 5h10a2 2 0 012 2v10" opacity="0.9" />
      </svg>
    ),
  },
  {
    title: "Druck & Datenservice",
    desc: "Auf Wunsch bleibt es nicht beim Entwurf. Wir bereiten druckfertige Daten vor und übernehmen den kompletten Druck, damit du dich um nichts kümmern musst.",
    items: ["Druckdaten Erstellung", "Druckservice"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-12h6v4H9V5zm0 8h6v6H9v-6z" />
      </svg>
    ),
  },
];

// ─── Vorteile ─────────────────────────────────────────────────────────────────
const VORTEILE: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Eigenes Grafikteam",
    desc: "Deine Gestaltung entsteht bei uns im Haus. Kein anonymer Baukasten und keine Vorlage von der Stange, sondern ein festes Team, das deine Marke kennt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Individuell gestaltet",
    desc: "Jedes Design entsteht neu und passt zu deinem Betrieb. So hebt sich dein Auftritt von der Konkurrenz ab, statt austauschbar zu wirken.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: "Alles aus einer Hand",
    desc: "Grafik, Werbetechnik und Druck laufen bei uns zusammen. Du hast einen Ansprechpartner statt drei und alles greift sauber ineinander.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Zum Auftritt passend",
    desc: "Deine Printprodukte und deine Website sprechen dieselbe Sprache. Weil wir beides machen, wirkt deine Marke überall wie aus einem Guss.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-5v5" />
      </svg>
    ),
  },
  {
    title: "Druckfertig geliefert",
    desc: "Du bekommst saubere Druckdaten im richtigen Format. Kein Ärger mit der Druckerei und keine bösen Überraschungen beim fertigen Produkt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Fest im Rhein-Main-Gebiet",
    desc: "Wir sitzen in der Nähe von Frankfurt und kennen die Region. Termine und Abstimmung sind unkompliziert, oft geht sogar der persönliche Weg.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// ─── Ablauf ───────────────────────────────────────────────────────────────────
const ABLAUF: { n: string; title: string; desc: string }[] = [
  {
    n: "01",
    title: "Gespräch & Idee",
    desc: "Wir hören zu, schauen uns deinen Betrieb an und klären, was du brauchst und wie dein Auftritt bisher wirkt. Daraus wird eine klare Richtung.",
  },
  {
    n: "02",
    title: "Entwurf",
    desc: "Unser Grafikteam gestaltet die ersten Vorschläge, passend zu deiner Marke. Du siehst früh etwas Konkretes und gibst uns dein Feedback.",
  },
  {
    n: "03",
    title: "Feinschliff",
    desc: "Wir arbeiten deine Anmerkungen ein, bis das Ergebnis wirklich sitzt. Farben, Schrift und Aufbau stimmen wir sorgfältig aufeinander ab.",
  },
  {
    n: "04",
    title: "Druck & Übergabe",
    desc: "Auf Wunsch übernehmen wir Druckdaten und Druck. Du bekommst das fertige Produkt in die Hand oder die sauberen Daten für deine eigene Druckerei.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS: { q: string; a: string }[] = [
  {
    q: "Gestaltet ihr wirklich alles selbst?",
    a: "Ja. Wir haben ein eigenes Grafikteam und erstellen jedes Design individuell für deinen Betrieb. Du bekommst keine fertige Vorlage, sondern eine Gestaltung, die zu dir passt.",
  },
  {
    q: "Übernehmt ihr auch den Druck?",
    a: "Auf Wunsch gern. Wir erstellen druckfertige Daten und kümmern uns auf Wunsch um den kompletten Druck. Wenn du eine eigene Druckerei hast, liefern wir die Daten im passenden Format.",
  },
  {
    q: "Bedruckt ihr auch Kleidung mit unserem Logo?",
    a: "Ja. Wir bedrucken Firmenkleidung mit deinem Logo, von einzelnen T-Shirts, Poloshirts und Hoodies bis zur kompletten Arbeitskleidung fürs Team. Auf Wunsch gibt es passende Werbeartikel wie bedruckte Kugelschreiber gleich dazu.",
  },
  {
    q: "Arbeitet ihr auch in Frankfurt und Umgebung?",
    a: "Ja. Wir sitzen im Rhein-Main-Gebiet und betreuen Kunden in Frankfurt und der ganzen Region. Vieles lässt sich bequem aus der Ferne klären, für den persönlichen Termin sind die Wege kurz.",
  },
  {
    q: "Bekomme ich Grafik und Website aus einer Hand?",
    a: "Ja, und genau darin liegt der Vorteil. Weil wir auch deine Website bauen, sprechen Print und Online dieselbe Sprache und deine Marke wirkt überall gleich.",
  },
  {
    q: "Was kostet ein Design bei euch?",
    a: "Das hängt davon ab, was du brauchst, von der Visitenkarte bis zur kompletten Fahrzeugbeschriftung. Im kostenlosen Erstgespräch schauen wir uns dein Vorhaben an und nennen dir einen klaren Preis.",
  },
];

// ─── Verwandte Leistungen (interne Verlinkung) ────────────────────────────────
const VERWANDT: { label: string; href: string; external?: boolean }[] = [
  { label: "Webdesign", href: "/#leistungen" },
  { label: "SEO", href: "/kostenlose-analyse" },
  { label: "Google Ads", href: "/google-ads" },
  { label: "Social Media", href: "/#leistungen" },
  { label: "Branding", href: "/#leistungen" },
  { label: "Referenzen", href: "/#referenzen" },
  { label: "Kontakt", href: "/#kontakt" },
];

// ─── Hintergrund (identisch zu /google-ads) ───────────────────────────────────
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

// ─── Weicher CTA-Block ────────────────────────────────────────────────────────
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

// ─── FAQ-Akkordeon ────────────────────────────────────────────────────────────
function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl"
          style={{
            background: open === i ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${open === i ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
            aria-expanded={open === i}
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
        </div>
      ))}
    </div>
  );
}

// ─── Seite ──────────────────────────────────────────────────────────────────
export default function GrafikdesignLanding() {
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
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 2px 12px rgba(59,130,246,0.4)" }}
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
          <motion.div initial={false} animate="show" variants={stagger} className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp}>
              <div
                className="badge-glow mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:mb-8"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>
                  Grafikdesign & Werbetechnik aus Frankfurt und Rhein-Main
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(30px, 6.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Grafikdesign, das deine Marke{" "}
              <span className="gradient-text-blue">unverwechselbar</span> macht
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed sm:mt-7 sm:text-xl"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              Von der Visitenkarte über den Flyer und bedruckte Firmenkleidung bis zur Fahrzeugbeschriftung gestalten wir alles, was deinen Betrieb sichtbar macht. Jedes Design entsteht bei uns im eigenen Grafikteam und wird individuell für dich erstellt.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300 sm:mt-7">
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Eigenes Grafikteam</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Individuell gestaltet</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Auf Wunsch mit Druck</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 sm:mt-11">
              <SoftCta />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Einleitung ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Ein guter Auftritt entscheidet sich in Sekunden. Wer deinen Flyer in der Hand hält oder dein Fahrzeug im Vorbeifahren sieht, bildet sich sofort ein Urteil. Genau hier setzen wir an. Wir gestalten Werbemittel und Werbetechnik, die zu deinem Betrieb passen und einen bleibenden Eindruck hinterlassen. Alles kommt aus einer Hand und greift sauber ineinander, von der ersten Skizze bis zum fertigen Druck.
            </motion.p>
          </div>
        </motion.section>

        {/* ─── Leistungen ─── */}
        <motion.section
          id="leistungen"
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Unsere Leistungen</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
                Alles rund um Grafikdesign und Werbemittel
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Ob einzelnes Werbemittel oder kompletter Markenauftritt, wir gestalten die passenden Produkte für deinen Betrieb. Jede Leistung entsteht individuell und lässt sich auf Wunsch bis zum fertigen Druck begleiten.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LEISTUNGEN.map((l) => (
                <motion.div
                  key={l.title}
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
                    {l.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{l.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">{l.desc}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {l.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-lg px-2.5 py-1 text-[12px] font-medium text-slate-300"
                        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.16)" }}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Abschluss-Karte mit CTA */}
              <motion.div
                variants={fadeUp}
                className="relative flex h-full flex-col justify-center rounded-2xl p-7 text-center sm:p-8"
                style={{
                  background: "rgba(59,130,246,0.07)",
                  border: "1px solid rgba(59,130,246,0.28)",
                  boxShadow: "0 8px 40px rgba(59,130,246,0.08)",
                }}
              >
                <h3 className="mb-2 text-lg font-bold text-white">Etwas anderes im Kopf?</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">
                  Du brauchst ein Werbemittel, das hier nicht steht? Sag uns einfach, was du vorhast. Wir setzen es um.
                </p>
                <a
                  href="#erstgespraech"
                  className="shimmer-btn mx-auto inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 16px rgba(59,130,246,0.32)" }}
                >
                  Idee besprechen
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ─── Referenz: Textildruck / Firmenkleidung ─── */}
        <motion.section
          id="referenz-textildruck"
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Referenz aus der Praxis</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
                Firmenkleidung mit Logo für ein Reinigungsteam
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Ein Beispiel dafür, wie aus einem Logo ein einheitlicher Auftritt fürs ganze Team wird, den man auf jeder Baustelle sieht.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(59,130,246,0.15)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src="/referenzen/textildruck-firmenkleidung.jpg"
                  alt="Bedruckte Firmenkleidung von Mehr Auftrag: dunkelblaue Shirts mit Logo Industrie und Gebäudereinigung Hausmeisterservice, Textildruck für ein Reinigungsteam"
                  width={1000}
                  height={1249}
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="h-auto w-full object-cover"
                />
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    🧹
                  </div>
                  <div>
                    <div className="text-lg font-bold leading-tight text-white">Blitz Industrie &amp; Gebäudereinigung</div>
                    <div className="mt-0.5 text-xs font-medium tracking-wide text-[#60a5fa]">Textildruck &amp; Firmenkleidung</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <StoryRow
                    label="Ausgangssituation"
                    text="Das Team war im Einsatz gut, trat vor Ort aber uneinheitlich auf. Für einen professionellen Eindruck beim Kunden fehlte einheitliche Firmenkleidung mit dem eigenen Logo."
                  />
                  <StoryRow
                    label="Unsere Umsetzung"
                    text="Wir haben das Logo für den Textildruck aufbereitet und die Shirts damit bedruckt. Farbe, Platzierung und Größe des Drucks haben wir so abgestimmt, dass das Ergebnis sauber und langlebig ist."
                  />
                  <StoryRow
                    label="Ergebnis"
                    text="Das ganze Team tritt jetzt einheitlich auf und trägt die Marke auf jede Baustelle. Bedruckte Firmenkleidung ist Werbung, die den ganzen Tag mitläuft, und hat dem Kunden so gut gefallen, dass gleich nachbestellt wurde."
                    highlight
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Firmenshirts bedrucken", "Poloshirts mit Logo", "Arbeitskleidung", "Team-Ausstattung"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-slate-300"
                      style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)" }}
                    >
                      <svg className="h-2.5 w-2.5 flex-shrink-0 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-400">
                  Ob einzelnes T-Shirt, Poloshirt, Hoodie oder komplette Arbeitskleidung fürs Team: Wir bedrucken Kleidung mit deinem Logo und liefern auf Wunsch passende Werbeartikel wie bedruckte Kugelschreiber gleich mit dazu.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── Vorteile ─── */}
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
                <SectionLabel center>Deine Vorteile</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
                Warum sich professionelles Design auszahlt
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Gutes Design ist kein Luxus, sondern der Unterschied zwischen übersehen werden und in Erinnerung bleiben. Diese Punkte bekommst du bei uns.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VORTEILE.map((v) => (
                <motion.div
                  key={v.title}
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
                    {v.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Warum Mehr Auftrag ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              className="rounded-3xl p-8 sm:p-12"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(59,130,246,0.18)",
                boxShadow: "0 8px 50px rgba(0,0,0,0.3)",
              }}
            >
              <SectionLabel>Warum Mehr Auftrag</SectionLabel>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ein eigenes Grafikteam, das deine Marke ernst nimmt
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-300">
                <p>
                  Bei uns landet deine Gestaltung nicht in einem anonymen Baukasten und nicht bei wechselnden Freelancern. Wir haben ein festes Grafikteam im Haus, das sich in deinen Betrieb hineindenkt und jedes Design von Grund auf für dich entwickelt. So entsteht ein Auftritt, den es genau einmal gibt, nämlich deinen.
                </p>
                <p>
                  Der zweite Vorteil liegt darin, dass wir nicht nur gestalten, sondern auch deine Website bauen und dein Marketing betreuen. Deine Visitenkarte, dein Flyer und deine Seite sprechen deshalb dieselbe Sprache. Wenn ein Kunde dich sieht, erkennt er dich sofort wieder, egal ob im Briefkasten, auf der Straße oder im Netz.
                </p>
                <p>
                  Und wir bleiben nicht beim Entwurf stehen. Auf Wunsch bereiten wir druckfertige Daten vor und übernehmen den kompletten Druck. Du hast einen Ansprechpartner für alles und bekommst am Ende ein Ergebnis, das du in die Hand nehmen kannst.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── Ablauf ─── */}
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
                <SectionLabel center>Ablauf</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
                In vier Schritten zum fertigen Design
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
                Vom ersten Gespräch bis zum fertigen Produkt begleiten wir dich Schritt für Schritt. Du weißt immer, woran wir gerade arbeiten.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              {ABLAUF.map((s) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="absolute right-5 top-4 select-none text-6xl font-black leading-none text-white/[0.03]">{s.n}</div>
                  <div
                    className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black text-[#3b82f6]"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)" }}
                  >
                    {s.n}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Lokal: Frankfurt & Rhein-Main + interne Verlinkung ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <motion.div variants={fadeUp}>
              <SectionLabel>Region</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
              Dein Grafikdesigner für Frankfurt und das Rhein-Main-Gebiet
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 space-y-5 text-base leading-relaxed text-slate-300">
              <p>
                Wenn du in Frankfurt nach einem Grafikdesigner suchst, der Visitenkarten gestalten, Flyer gestalten und die komplette Werbetechnik aus einer Hand liefert, bist du bei uns richtig. Wir sitzen im Rhein-Main-Gebiet und arbeiten für Betriebe in Frankfurt und der ganzen Region. Ob du ein Logo erstellen lassen willst, neue Autoaufkleber brauchst oder deinen ganzen Markenauftritt neu aufstellst, wir kümmern uns darum.
              </p>
              <p>
                Grafikdesign ist bei uns Teil eines größeren Ganzen. Neben Werbemitteln und Werbetechnik in Frankfurt bekommst du bei uns auch Webdesign, den Aufbau einer Website, Google Werbung und Unterstützung als Marketingagentur und SEO Agentur für die Region. So passt am Ende alles zusammen und du hast nur einen Ansprechpartner.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Passende Leistungen</p>
              <div className="flex flex-wrap gap-2.5">
                {VERWANDT.map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.18)" }}
                  >
                    {v.label}
                    <svg className="h-3 w-3 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── FAQ ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>FAQ</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
                Häufige Fragen zum Grafikdesign
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <FaqList />
            </motion.div>
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
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(59,130,246,0.1), transparent 70%)" }} />
          <div className="relative mx-auto max-w-2xl text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
              Lass uns über dein Design sprechen
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
              Erzähl uns kurz, was du vorhast. Im kostenlosen Erstgespräch schauen wir gemeinsam, was zu deinem Betrieb passt, und du bekommst einen klaren Preis. Ohne Verpflichtung und ohne Druck.
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
