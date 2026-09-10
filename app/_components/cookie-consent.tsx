"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * DSGVO/TDDDG-konformer Cookie-Consent für Mehr Auftrag.
 *
 * - Marketing-Cookies (Meta-Pixel) werden NUR nach aktiver Einwilligung geladen.
 * - "Alle akzeptieren" und "Nur notwendige" sind gleichwertig (kein Dark Pattern).
 * - Einwilligung ist granular und jederzeit widerrufbar (Button unten links).
 * - Die Wahl wird lokal gespeichert (localStorage), inkl. Zeitpunkt und Version
 *   als Einwilligungsnachweis.
 */

const CONSENT_KEY = "ma-consent-v1";
const META_PIXEL_ID = "1455997266296654";
const CLARITY_PROJECT_ID = "x9wcbg119c";

type Consent = {
  necessary: true;
  marketing: boolean;
  date: string;
  version: 1;
};

// ─── Meta-Pixel: wird erst bei Einwilligung geladen ──────────────────────────
let pixelLoaded = false;

// Liest window.fbq bei jedem Aufruf frisch (vermeidet TS-Narrowing-Probleme).
function callFbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(...args);
}

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  if (pixelLoaded || (window as unknown as { fbq?: unknown }).fbq) {
    callFbq("consent", "grant");
    return;
  }
  pixelLoaded = true;

  /* eslint-disable */
  // @ts-ignore, offizielles Meta-Pixel-Snippet
  !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  callFbq("consent", "grant");
  callFbq("init", META_PIXEL_ID);
  callFbq("track", "PageView");
}

function revokeMetaPixel() {
  callFbq("consent", "revoke");
}

// ─── Microsoft Clarity: wird erst bei Einwilligung geladen ───────────────────
let clarityLoaded = false;

// Liest window.clarity bei jedem Aufruf frisch.
function callClarity(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.(...args);
}

function loadClarity() {
  if (typeof window === "undefined") return;
  if (clarityLoaded || (window as unknown as { clarity?: unknown }).clarity) {
    callClarity("consent");
    return;
  }
  clarityLoaded = true;

  /* eslint-disable */
  // @ts-ignore, offizielles Microsoft-Clarity-Snippet
  !(function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  /* eslint-enable */

  callClarity("consent");
}

function revokeClarity() {
  callClarity("consent", false);
}

// ─── Google Analytics 4 (Consent Mode v2) ────────────────────────────────────
// Das gtag-Basis-Tag wird global im Layout geladen und steht standardmäßig auf
// "denied" (keine Cookies/kein Tracking ohne Einwilligung). Hier wird bei
// Zustimmung bzw. Widerruf nur der Consent-Status aktualisiert.
function callGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(...args);
}

function grantGoogleAnalytics() {
  callGtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

function revokeGoogleAnalytics() {
  callGtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const leisteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = readConsent();
    if (!stored) {
      setOpen(true);
    } else {
      setMarketing(stored.marketing);
      if (stored.marketing) {
        loadMetaPixel();
        loadClarity();
        grantGoogleAnalytics();
      }
    }
  }, []);

  // Die Leiste liegt fix am unteren Rand und wuerde sonst verdecken, was dort
  // steht. Zwei Dinge passieren deshalb, solange sie offen ist:
  //
  // 1. Die Seite bekommt genau so viel Abstand nach unten, wie die Leiste hoch
  //    ist. Sonst liegt die Leiste dauerhaft auf der Fusszeile.
  // 2. Die Hoehe wird als CSS-Variable --ma-consent-h veroeffentlicht. Alles,
  //    was sonst unten klebt (WhatsApp-Knopf, mobile Anfrage-Leiste), rueckt
  //    damit ueber die Leiste statt darunter zu verschwinden. Ohne das war der
  //    Besucher beim ersten Seitenaufruf, also bei 100 Prozent des bezahlten
  //    Traffics, von jedem Kontaktweg am unteren Rand abgeschnitten.
  //
  // showSettings steht mit in den Abhaengigkeiten, damit die Werte auch beim
  // Ausklappen der Einstellungen stimmen.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const wurzel = document.documentElement;
    if (!open) {
      document.body.style.paddingBottom = "";
      wurzel.style.removeProperty("--ma-consent-h");
      return;
    }
    const setzen = () => {
      const hoehe = leisteRef.current?.offsetHeight ?? 0;
      document.body.style.paddingBottom = hoehe > 0 ? `${hoehe}px` : "";
      wurzel.style.setProperty("--ma-consent-h", `${hoehe}px`);
    };
    setzen();
    // Die Leiste wird eingeblendet, ihre Endhoehe steht erst nach der
    // Animation fest. Ein Beobachter haelt die Werte automatisch aktuell,
    // auch beim Drehen des Geraets.
    let beobachter: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && leisteRef.current) {
      beobachter = new ResizeObserver(setzen);
      beobachter.observe(leisteRef.current);
    }
    return () => {
      if (beobachter) beobachter.disconnect();
      document.body.style.paddingBottom = "";
      wurzel.style.removeProperty("--ma-consent-h");
    };
  }, [open, showSettings]);

  const save = useCallback((acceptMarketing: boolean) => {
    const consent: Consent = {
      necessary: true,
      marketing: acceptMarketing,
      date: new Date().toISOString(),
      version: 1,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      /* localStorage nicht verfügbar, Einwilligung gilt nur für diese Sitzung */
    }
    setMarketing(acceptMarketing);
    if (acceptMarketing) {
      loadMetaPixel();
      loadClarity();
      grantGoogleAnalytics();
    } else {
      revokeMetaPixel();
      revokeClarity();
      revokeGoogleAnalytics();
    }
    setOpen(false);
    setShowSettings(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Reopen-Knopf (Widerruf / Einstellungen aendern) */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setShowSettings(true);
            setOpen(true);
          }}
          aria-label="Cookie-Einstellungen öffnen"
          className="fixed bottom-4 left-4 z-[60] rounded-full border border-white/10 bg-[#0a1024]/80 px-3 py-2 text-xs text-slate-300 shadow-lg backdrop-blur transition hover:border-blue-500/50 hover:text-white"
        >
          Cookie-Einstellungen
        </button>
      )}

      {/*
        Schmale Leiste am unteren Rand statt Modal mit Abdunklung.
        Grund: Der frühere Dialog hat auf dem Handy den kompletten ersten
        Bildschirm verdeckt, inklusive Überschrift und Formular. Jeder Besucher
        musste erst wegklicken, bevor er überhaupt sah, worum es geht.
        "Nur notwendige" und "Alle akzeptieren" stehen bewusst gleich gross
        nebeneinander, damit Ablehnen genauso leicht ist wie Zustimmen.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={leisteRef}
            role="region"
            aria-label="Cookie-Hinweis"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-[#070d20]/95 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur"
          >
            <div className="mx-auto w-full max-w-5xl px-4 py-2.5 sm:px-6 sm:py-3">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
                <p className="text-[12.5px] leading-snug text-slate-300 sm:flex-1 sm:text-[13px]">
                  Cookies: notwendige immer, Werbemessung nur mit Ihrer Einwilligung.{" "}
                  <Link
                    href="/datenschutz"
                    className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                  >
                    Datenschutz
                  </Link>
                  {" · "}
                  <button
                    type="button"
                    onClick={() => setShowSettings((v) => !v)}
                    className="text-slate-300 underline underline-offset-2 transition hover:text-white"
                  >
                    Einstellungen
                  </button>
                </p>

                <div className="flex items-center gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => save(false)}
                    className="flex-1 rounded-lg border border-white/15 px-4 py-2 text-[13px] font-medium text-slate-200 transition hover:border-white/30 hover:text-white sm:flex-none sm:px-5"
                  >
                    Nur notwendige
                  </button>
                  <button
                    type="button"
                    onClick={() => save(true)}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-500 sm:flex-none sm:px-5"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>

              {/* Granulare Einstellungen, nur auf Wunsch */}
              <AnimatePresence initial={false}>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                      <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div>
                          <p className="text-sm font-medium text-white">Notwendig</p>
                          <p className="mt-1 text-xs text-slate-400">
                            Für den Betrieb der Website erforderlich. Immer aktiv.
                          </p>
                        </div>
                        <span className="mt-1 shrink-0 rounded-md bg-white/10 px-2 py-1 text-xs text-slate-300">
                          Aktiv
                        </span>
                      </div>

                      <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            Marketing & Analyse (Meta-Pixel, Google Analytics, Microsoft Clarity)
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Hilft uns, die Wirkung unserer Werbung auf Facebook, Instagram und
                            Google zu messen und, anonymisiert, zu verstehen, wie unsere Website
                            genutzt wird, um sie zu verbessern. Bei Anfragen über das Formular wird
                            Ihre Telefonnummer zusätzlich verschlüsselt an Google übermittelt,
                            damit wir sehen, welche Anzeige die Anfrage gebracht hat. Sie können
                            Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          className="mt-1 h-5 w-5 shrink-0 accent-blue-500"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => save(marketing)}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
                      >
                        Auswahl speichern
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
