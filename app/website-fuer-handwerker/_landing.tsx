"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  sendeFormularConversion,
  sendeTelefonklickConversion,
  sendeWhatsappConversion,
} from "../_lib/ads-conversion";
import MaMark from "../_components/ma-mark";
import GoogleReviews from "../_components/google-reviews";
import { FAQS } from "./_faqs";

/**
 * Landingpage /website-fuer-handwerker für Mehr Auftrag.
 *
 * Zielgruppe: Inhaber von Handwerks- und handwerksnahen Betrieben, bundesweit.
 * Zielseite der Google-Ads-Anzeigengruppe "Handwerker Website" (siehe Vault,
 * "Mehr Auftrag - Google Ads Kampagne Website-Verkauf"). Bewusst als Next.js
 * Route gebaut und nicht als statische Datei in public/, weil nur so das
 * Conversion-Tracking und der Consent Mode aus app/layout.tsx greifen.
 * Branding konsistent zur Startseite (dunkles Blau, Glas-Cards, Shimmer-CTA, Geist).
 *
 * Formular → Supabase Edge Function "submit-website-lead" → leads-Tabelle.
 * Nach Erfolg: Meta-Pixel-Lead-Event (feuert nur, wenn Cookie-Consent erteilt wurde
 * und das Pixel dadurch geladen ist, siehe app/_components/cookie-consent.tsx).
 */

// ─── Konfiguration (öffentliche Werte) ───────────────────────────────────────
const SUBMIT_URL =
  "https://ezrxxxilssmzcavdvvbe.supabase.co/functions/v1/submit-website-lead";
const PAGE_LABEL = "Handwerker LP";
const TELEFON = "+4915202069625";
const TELEFON_ANZEIGE = "0152 02069625";
const WHATSAPP_URL =
  "https://wa.me/4915202069625?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Website%20f%C3%BCr%20meinen%20Handwerksbetrieb.";
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

// fbq + gtag global (Pixel/Ads werden consent-gated von cookie-consent.tsx geladen)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads Conversions liegen zentral in app/_lib/ads-conversion.ts.
// Dort steckt auch die Logik fuer die erweiterten Conversions: Liegt eine
// Marketing-Einwilligung vor, wird die Telefonnummer als user_data mitgesendet,
// damit Google den Lead auch ohne Cookie dem Anzeigenklick zuordnen kann.
const trackPhoneClick = sendeTelefonklickConversion;
const trackWhatsappClick = sendeWhatsappConversion;

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
      <MaMark size={40} priority />
      {/* Unter 360 Pixel weicht der Schriftzug, damit der Anfrage-Knopf
          rechts vollstaendig sichtbar bleibt. Fuer Vorlesewerkzeuge und
          Suchmaschinen bleibt der Name ueber sr-only erhalten. */}
      <span className="sr-only font-black leading-none tracking-[-0.04em] min-[360px]:not-sr-only min-[360px]:text-[14px] min-[420px]:text-[18px]">
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
const BUILD_FEATURES: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    title: "Leistungsübersicht",
    desc: "Alle Ihre Gewerke klar strukturiert, damit Kunden sofort sehen, was Sie machen und was nicht. Genau danach wird gesucht.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Click-to-Call",
    desc: "Ein prominenter Anruf-Button auf jedem Bildschirm. Interessenten erreichen Sie mit einem Fingertipp, ohne Nummer abtippen, ohne Umwege.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Google Maps",
    desc: "Ihr Betrieb auf der Karte, damit Kunden in Ihrem Einzugsgebiet sofort sehen, dass Sie aus der Nähe kommen.",
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
    desc: "Über 70 % suchen vom Smartphone. Ihre Seite lädt schnell und sieht auf jedem Handy perfekt aus, dort, wo Ihre Kunden suchen.",
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
  "Individuelle Website für Ihren Betrieb",
  "Hosting & sichere SSL-Verschlüsselung",
  "Laufende Pflege, Updates & Sicherheit",
  "Inhaltliche Anpassungen jederzeit",
  "Click-to-Call, Google Maps & Bewertungen",
  "Persönlicher Ansprechpartner",
];

// Kundenstimmen kommen aus app/_components/google-reviews.tsx, also woertlich aus
// dem oeffentlichen Google-Profil. Die frueher hier stehenden Eigenzitate mit
// fuenf Sternen sahen aus wie Kundenbewertungen, waren aber Versprechen von Mehr
// Auftrag selbst. Das ist auf einer Anzeigen-Zielseite ein Vertrauens- und ein
// Richtlinienrisiko und deshalb bewusst ersetzt.

const REFERENCES = [
  {
    name: "SZ Innenausbau",
    branche: "Renovierung & Sanierung · Frankfurt am Main",
    text: "Alle Gewerke von Fliesen bis Sandstrahlen auf einen Blick, mit Vorher-nachher-Regler und Anfrage mit direkter Leistungsauswahl.",
    href: "https://sz-innenausbau.de/",
    domain: "sz-innenausbau.de",
    image: "/referenzen/sz-innenausbau.jpg",
    emoji: "🛠️",
  },
  {
    name: "SOROKIN Mobiler Schweißservice",
    branche: "Metallbau & Schweißservice · Sauerland",
    text: "Conversion-orientierter Auftritt für einen mobilen Schweißservice, klare Leistungen, Galerie, direkte Anfrage per Anruf & WhatsApp.",
    href: "https://www.sorokinschweisser.de/",
    domain: "sorokinschweisser.de",
    image: "/referenzen/sorokin.jpg",
    emoji: "🔧",
  },
  {
    name: "Blitzgebäudereinigung",
    branche: "Gebäudereinigung · Hamburg",
    text: "Professionelle Website für ein Hamburger Reinigungsunternehmen, Leistungen klar strukturiert, unkomplizierte Angebotsanfrage.",
    href: "https://www.blitzgebaeudereinigung.com/",
    domain: "blitzgebaeudereinigung.com",
    image: "/referenzen/blitz.png",
    emoji: "🧽",
  },
  {
    name: "Blitz Industrie & Gebäudereinigung",
    branche: "Gebäudereinigung & Hausmeisterservice · Region Bebra",
    text: "Zwei Leistungsbereiche unter einem Namen, sauber getrennt und trotzdem übersichtlich, mit Galerie und echten Bewertungen.",
    href: "https://reinigungblitz.com/",
    domain: "reinigungblitz.com",
    image: "/referenzen/reinigungblitz.jpg",
    emoji: "🧹",
  },
];


// ─── Formular ─────────────────────────────────────────────────────────────────
type SubmitState = "idle" | "loading" | "success" | "invalid" | "failed";

// Branchen fuer die Rueckfrage NACH dem Absenden. Bewusst nicht im Formular:
// jedes zusaetzliche Feld vor dem Absenden kostet Anfragen, und zwar genau
// dann, wenn der Klick schon bezahlt ist. Hier ist der Lead bereits gesichert
// und die Conversion gezaehlt, jede Antwort ist reiner Zugewinn.
const BRANCHEN = [
  "Elektro",
  "Sanitär & Heizung",
  "Dachdecker",
  "Maler & Stuck",
  "Metallbau & Schweißen",
  "Garten & Landschaft",
  "Gebäudereinigung",
  "Bau & Renovierung",
  "Anderes Gewerk",
];

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  // Fuer die Rueckfrage nach dem Absenden: die Lead-ID aus der ersten Antwort,
  // die gewaehlte Branche und die freiwillige Anmerkung.
  const [leadId, setLeadId] = useState<string | null>(null);
  const [branche, setBranche] = useState<string | null>(null);
  const [notiz, setNotiz] = useState("");
  const [notizGesendet, setNotizGesendet] = useState(false);

  /**
   * Ergaenzt den bereits gespeicherten Lead. Bewusst ohne await im Aufrufer
   * und ohne Fehleranzeige: der Lead ist zu diesem Zeitpunkt laengst sicher.
   * Klappt der Nachtrag nicht, fehlt Patrick nur eine Zusatzinfo, der
   * Interessent soll davon nichts merken.
   */
  function sendeNachtrag(daten: { industry?: string; message?: string }) {
    if (!leadId) return;
    void fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nachtrag_id: leadId, ...daten }),
    }).catch(() => {});
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!name.trim() || !phone.trim()) {
      setState("invalid");
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

      // Die Antwort enthaelt die Lead-ID. Die brauchen wir gleich, um die
      // Rueckfrage nach der Branche demselben Lead zuzuordnen.
      try {
        const daten = await res.json();
        if (daten && typeof daten.id === "string") setLeadId(daten.id);
      } catch {
        // Ohne ID entfaellt die Rueckfrage einfach. Der Lead ist trotzdem da.
      }

      // Meta-Pixel Conversion-Event, feuert nur, wenn das Pixel geladen ist
      // (d. h. Marketing-Cookies wurden zugestimmt). Bestehende Implementierung
      // wird nicht verändert.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: PAGE_LABEL });
      }

      // Google Ads Conversion "Formular gesendet". Feuert nur, wenn gtag
      // geladen ist. Bei vorliegender Einwilligung geht die Telefonnummer als
      // erweiterte Conversion mit, sonst nur das reine Ereignis.
      sendeFormularConversion(phone.trim());

      setState("success");
    } catch {
      setState("failed");
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
        <h3 className="text-lg font-bold text-white">Danke! Ihr Entwurf ist unterwegs.</h3>
        <p className="mt-2 text-sm text-slate-400">
          Wir melden uns innerhalb von 24 Stunden, klären kurz ein paar Fragen zu Ihrem Betrieb
          und bauen danach Ihren Entwurf. Kostenlos und unverbindlich.
        </p>
        <a
          href="tel:+4915202069625"
          onClick={trackPhoneClick}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
          style={{ border: "1px solid rgba(96,165,250,0.4)", background: "rgba(59,130,246,0.12)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Lieber sofort sprechen? Jetzt anrufen
        </a>

        {/* ─── Rueckfrage NACH dem Absenden ───────────────────────────────
            Der Lead ist an dieser Stelle gespeichert und die Conversion
            gezaehlt. Deshalb kann diese Frage nichts mehr kosten, waehrend
            dasselbe Feld im Formular Anfragen gekostet haette. Antwortet
            niemand, bleibt es beim Anruf. Ohne Lead-ID (etwa wenn der
            Notfallweg der Edge Function gegriffen hat) faellt der Block
            ersatzlos weg. */}
        {leadId && (
          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold text-white">
              Eine Sache noch, dann passt Ihr Entwurf beim ersten Mal
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              In welcher Branche sind Sie? Ein Tipp genügt, freiwillig.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {BRANCHEN.map((b) => {
                const aktiv = branche === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setBranche(b);
                      sendeNachtrag({ industry: b });
                    }}
                    className="rounded-full px-3.5 py-2 text-[13px] font-medium transition"
                    style={{
                      border: aktiv ? "1px solid rgba(96,165,250,0.7)" : "1px solid rgba(255,255,255,0.14)",
                      background: aktiv ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.04)",
                      color: aktiv ? "#ffffff" : "#cbd5e1",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>

            {branche && !notizGesendet && (
              <div className="mt-5 text-left">
                <label htmlFor="lead-notiz" className="text-xs text-slate-400">
                  Worauf kommt es Ihnen an? Freiwillig, hilft uns aber sehr.
                </label>
                <textarea
                  id="lead-notiz"
                  rows={3}
                  value={notiz}
                  onChange={(e) => setNotiz(e.target.value)}
                  placeholder="Zum Beispiel: viele Notdienst-Anfragen, Karriereseite für Azubis, bestimmte Leistungen im Vordergrund."
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
                />
                <button
                  type="button"
                  disabled={!notiz.trim()}
                  onClick={() => {
                    sendeNachtrag({ message: notiz.trim() });
                    setNotizGesendet(true);
                  }}
                  className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-40"
                  style={{ border: "1px solid rgba(96,165,250,0.4)", background: "rgba(59,130,246,0.16)" }}
                >
                  Dazuschreiben
                </button>
              </div>
            )}

            {notizGesendet && (
              <p className="mt-5 text-sm font-medium text-[#60a5fa]">
                Notiert, danke. Damit können wir gleich passend vorbereiten.
              </p>
            )}
          </div>
        )}
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
            if (state === "invalid" || state === "failed") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06] sm:py-3"
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
            if (state === "invalid" || state === "failed") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06] sm:py-3"
        />
      </div>

      {state === "invalid" && (
        <p className="text-sm text-red-400">
          Bitte Vorname und Telefonnummer eingeben.
        </p>
      )}

      {state === "failed" && (
        <p className="text-sm text-red-400">
          Das hat gerade nicht geklappt, das liegt an uns. Bitte noch einmal senden oder direkt{" "}
          <a href="tel:+4915202069625" onClick={trackPhoneClick} className="font-semibold underline underline-offset-2">
            anrufen unter 0152 02069625
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="shimmer-btn group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-4 text-base font-semibold text-white transition disabled:opacity-70 sm:px-7"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
        }}
      >
        <span className="relative z-10">{state === "loading" ? "Wird gesendet …" : "Kostenlosen Entwurf sichern"}</span>
        {state !== "loading" && (
          <svg className="relative z-10 hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
        {/* WhatsApp und Anruf stehen bewusst gleichwertig neben dem
            Formular und nicht mehr als Nebensatz in Kleinschrift.
            Grund: Das Formular verlangt eine Telefonnummer, bevor der
            Besucher irgendetwas bekommen hat. Wer die nicht hergeben
            will, hatte bisher keinen sichtbaren zweiten Weg und ist
            abgesprungen. Ein Handwerker auf der Baustelle tippt
            ausserdem lieber zwei Zeilen in WhatsApp, als ein Formular
            auszufuellen. Beide Wege zaehlen im Konto als Conversion. */}
        <div className="mt-4">
          <div className="flex items-center gap-3" aria-hidden="true">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              oder direkt
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              onClick={trackWhatsappClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:brightness-125"
              style={{ background: "rgba(37,211,102,0.14)", border: "1px solid rgba(37,211,102,0.5)" }}
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.738-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${TELEFON}`}
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:brightness-125"
              style={{ background: "rgba(59,130,246,0.14)", border: "1px solid rgba(59,130,246,0.5)" }}
            >
              <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="#60a5fa" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Anrufen
            </a>
          </div>
          <p className="mt-2.5 text-center text-xs text-slate-500">
            Kein Formular nötig: {TELEFON_ANZEIGE}
          </p>
        </div>
      <p className="text-center text-xs leading-relaxed text-slate-500">
        Wir melden uns innerhalb von 24 Stunden. Ihr Entwurf ist kostenlos und unverbindlich, Ihre
        Daten nutzen wir nur für Ihre Anfrage, mehr dazu in der{" "}
        <Link href="/datenschutz" className="underline underline-offset-2 hover:text-slate-300">
          Datenschutzerklärung
        </Link>
        .
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

// ─── Dauerhafter Anfrage-Knopf auf dem Handy ─────────────────────────────────
// Auf dem Handy ist der Knopf aus dem Kopfbereich nach dem ersten Scrollen weg.
// Bis zum Formular ganz unten gibt es dann keinen sichtbaren Weg zur Anfrage.
// Diese Leiste erscheint nach dem Heldenbereich und verschwindet wieder, sobald
// das Formular selbst im Bild ist, damit sie den Absenden-Knopf nicht verdeckt.
// Nur unter sm sichtbar, am Rechner gibt es das Problem nicht.
function AnfrageLeiste() {
  const [gescrollt, setGescrollt] = useState(false);
  const [formularImBild, setFormularImBild] = useState(false);

  useEffect(() => {
    function beiScroll() {
      setGescrollt(window.scrollY > 700);
    }
    beiScroll();
    window.addEventListener("scroll", beiScroll, { passive: true });

    let beobachter: IntersectionObserver | null = null;
    const ziel = document.getElementById("anfrage");
    if (ziel && typeof IntersectionObserver !== "undefined") {
      beobachter = new IntersectionObserver(
        (eintraege) => setFormularImBild(eintraege.some((e) => e.isIntersecting)),
        { rootMargin: "0px 0px -25% 0px" },
      );
      beobachter.observe(ziel);
    }

    return () => {
      window.removeEventListener("scroll", beiScroll);
      if (beobachter) beobachter.disconnect();
    };
  }, []);

  const zeigen = gescrollt && !formularImBild;

  return (
    <AnimatePresence>
      {zeigen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="fixed inset-x-0 z-[55] border-t border-white/10 bg-[#050b1c]/95 py-3 pl-4 pr-[76px] backdrop-blur sm:hidden"
          // Solange die Cookie-Leiste offen ist, sitzt diese Leiste darueber
          // statt dahinter. --ma-consent-h kommt aus cookie-consent.tsx.
          style={{ bottom: "var(--ma-consent-h, 0px)" }}
        >
          <a
            href="#anfrage"
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
          >
            Kostenlosen Entwurf sichern
          </a>
        </motion.div>
      )}
    </AnimatePresence>
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
export default function HandwerkerLanding() {
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
                href="tel:+4915202069625"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px] font-semibold text-slate-100 min-[420px]:px-3 min-[420px]:text-[13px]"
                style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
                onClick={trackPhoneClick}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Anrufen</span>
              </a>
              <a
                href="#anfrage"
                className="shimmer-btn inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-semibold text-white min-[420px]:px-4 min-[420px]:text-[13px]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.4)",
                }}
              >
                {/* Unter 420 Pixel die kurze Beschriftung, sonst passt der
                    Knopf nicht neben den Schriftzug und wird beschnitten. */}
                <span className="min-[420px]:hidden">Anfragen</span>
                <span className="hidden min-[420px]:inline">Entwurf sichern</span>
              </a>
            </div>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <section className="relative flex items-center justify-center overflow-hidden px-5 pt-20 pb-10 sm:px-8 sm:pt-16 sm:pb-16">
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
            // max-w-4xl statt 2xl: bei 672 px brach die Ueberschrift auf drei Zeilen und
            // "Ihren" stand allein in der Mitte. Mit 896 px passt sie in zwei Zeilen,
            // dadurch rutscht auch der Absende-Button ueber die Sichtkante. Auf dem Handy
            // aendert sich nichts, dort ist der Bildschirm ohnehin schmaler. Die Absaetze
            // darunter haben ihre eigene, engere Breite und bleiben davon unberuehrt.
            className="relative z-10 mx-auto max-w-4xl pt-2 pb-4 text-center sm:pt-1"
          >
            {/* Bei flachen Fenstern faellt das Abzeichen weg. Es ist Schmuck,
                der Absende-Knopf ist es nicht: Unter etwa 720 Pixel Fensterhoehe
                entscheiden diese 50 Pixel darueber, ob der Knopf ueber oder
                hinter der Cookie-Leiste liegt. Die Aussage steht ohnehin in der
                Ueberschrift. Bewusst als eigene Huelle, damit sich die Regeln
                fuer Breite und Hoehe nicht gegenseitig ueberschreiben. */}
            <div className="[@media(max-height:720px)]:hidden">
            <motion.div variants={fadeUp} className="hidden sm:block">
              <div
                className="badge-glow mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:mb-5"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.26)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.06em]" style={{ color: "#93c5fd" }}>
                  Für Handwerk und handwerksnahe Betriebe
                </span>
              </div>
            </motion.div>
            </div>

            <motion.h1
              variants={fadeUp}
              className="font-black tracking-tighter text-white"
              // hyphens: "none", weil die Seite global auf hyphens: auto steht. In einer
              // Ueberschrift dieser Groesse trennt der Browser sonst mitten im Wort und es
              // stand dort "Mehr Anfragen fuer Ih-ren Handwerksbe-trieb".
              style={{ fontSize: "clamp(28px, 6.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", hyphens: "none" }}
            >
              Mehr Anfragen für Ihren{" "}
              <span className="gradient-text-blue">Handwerksbetrieb</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed sm:mt-5 sm:text-xl"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              Sie sehen zuerst einen kostenlosen Entwurf. Erst wenn er überzeugt, geht es weiter.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300 sm:mt-5">
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Entwurf vorab kostenlos</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> In 7 Tagen online</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Monatlich kündbar</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-5 max-w-md sm:mt-6">
              <div
                className="rounded-2xl p-6 text-left sm:p-5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.28)", boxShadow: "0 12px 50px rgba(0,0,0,0.4)" }}
              >
                <LeadForm />
              </div>
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
              Ihre Kunden suchen Ihr Gewerk auf Google. Finden sie dabei Sie?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Wer heute einen Handwerker braucht, googelt zuerst. Tauchen Sie dort nicht auf, oder mit einer
              veralteten Seite, ruft der Kunde beim Nächsten an. Jeden Tag gehen so Aufträge an Betriebe,
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
            <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400">
              Eine Website allein bringt noch keine Anrufe. Gefunden wird sie erst, wenn Inhalt, Technik und
              Google-Profil zusammenspielen. Was dazugehört, wenn ein Handwerksbetrieb bei der Suche nach seinem Gewerk
              auftauchen soll, steht auf unserer Seite zur{" "}
              <Link
                href="/suchmaschinenoptimierung"
                className="font-semibold text-[#60a5fa] underline decoration-[#60a5fa]/40 underline-offset-4 hover:text-white"
              >
                lokalen Suchmaschinenoptimierung
              </Link>
              .
            </motion.p>
          </div>
        </motion.section>

        {/* ─── Referenzen / Echte Kundenprojekte ─── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Echte Projekte</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Websites, die wir für echte Betriebe gebaut haben
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                Keine Musterbeispiele, echte Kunden aus Handwerk &amp; Dienstleistung. Schauen Sie selbst rein.
              </motion.p>
              {/* Wir haben noch keine Referenz aus jedem Gewerk. Das offen
                  anzusprechen ist besser, als den Besucher selbst merken zu
                  lassen, dass sein Gewerk fehlt, und dann wegzuklicken. */}
              <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
                Ihr Gewerk ist nicht dabei? Der Aufbau bleibt derselbe, es wechseln nur Leistungen,
                Bilder und Ansprache. Genau das sehen Sie im kostenlosen Entwurf, bevor Sie sich
                entscheiden.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {REFERENCES.map((r) => (
                <motion.a
                  key={r.domain}
                  href={r.href}
                  target="_blank"
                  rel="noopener"
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col overflow-hidden rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10", background: "rgba(255,255,255,0.03)" }}>
                    <Image src={r.image} alt={`Website von ${r.name}`} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60a5fa]">{r.branche}</p>
                    <h3 className="mt-1.5 text-base font-bold text-white">{r.emoji} {r.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{r.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#60a5fa] group-hover:text-white">
                      Live ansehen
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Reihenfolge bewusst so: Beweis vor Preis. Vorher standen die
            Bewertungen hinter der Preisbox. Wer beim Preis abspringt, sah sie
            nie, und das sind die staerksten Vertrauenssignale der Seite. */}
        {/* ─── Echte Google-Bewertungen ─── */}
        {/* Container bewusst breiter als der Rest (6xl statt 4xl): die
            Bewertungs-Komponente stellt ab lg drei Spalten nebeneinander,
            die brauchen die Breite. Auf dem Handy bleibt es einspaltig. */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="relative px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <motion.div variants={fadeUp}>
                <SectionLabel center>Echte Bewertungen</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white sm:text-3xl">
                Das sagen Kunden über die Zusammenarbeit
              </motion.h2>
            </div>

            <motion.div variants={fadeUp}>
              <GoogleReviews
                variant="dark"
                max={3}
                auswahl={["Alpay Gün", "Julian Dielichtenergie", "Bilal Özdemir"]}
              />
            </motion.div>
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
                  <span className="text-3xl font-bold gradient-text-blue">+ 99 €</span>
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

              {/* Einordnung statt bloßer Zahl. Die Spanne stammt aus den Anzeigen
                  der Mitbewerber auf "website für handwerker" (Stand 06.09.2026),
                  bewusst ohne Namen und als Spanne, weil sich Preise ändern. */}
              <p className="mt-5 text-center text-sm leading-relaxed text-slate-400">
                Andere Anbieter verlangen für den Einstieg 600 bis 1.000 Euro. Wir nehmen 250,
                weil wir langfristig mit Ihnen arbeiten wollen und nicht einmalig abrechnen.
                Bleibt die Seite nicht gut, kündigen Sie zum Monatsende.
              </p>

              <div className="mt-7 flex justify-center">
                <a
                  href="#anfrage"
                  className="shimmer-btn group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-4 text-base font-semibold text-white sm:px-8"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
                  }}
                >
                  <span className="relative z-10">Kostenlosen Entwurf sichern</span>
                  <svg className="relative z-10 hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
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
                Kostenlosen Entwurf sichern
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-base text-slate-400">
                Vorname und Telefonnummer genügen. Den Rest machen wir, und Sie entscheiden erst,
                wenn Sie Ihren Entwurf gesehen haben.
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

        <AnfrageLeiste />

        {/* ─── WhatsApp Floating-Button ─── */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsappClick}
          aria-label="Per WhatsApp anfragen"
          className="fixed right-4 z-[60] inline-flex items-center gap-2 rounded-full p-3.5 text-sm font-semibold text-white shadow-xl transition hover:scale-105 sm:right-5 sm:px-4 sm:py-3.5"
          // Der Abstand nach unten waechst um die Hoehe der Cookie-Leiste.
          // Vorher lag der Knopf beim ersten Besuch komplett dahinter, also
          // genau bei den Besuchern, fuer die wir bezahlt haben.
          style={{
            bottom: "calc(1rem + var(--ma-consent-h, 0px))",
            background: "#25D366",
            boxShadow: "0 8px 28px rgba(37,211,102,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.738-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
          {/* Auf dem Handy nur das Symbol. Die Pille mit Schrift war rund 150 px
              breit und legte sich ueber den Hinweistext unter dem Formular, ueber
              die Abschnittsmarke der FAQ und ueber die Fusszeile. Als runder Knopf
              ist sie rund 52 px breit und verdeckt nichts mehr. */}
          <span className="hidden sm:inline">WhatsApp</span>
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
