"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * DSGVO/TDDDG-konformer Cookie-Consent für MehrAuftrag.
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
  // @ts-ignore – offizielles Meta-Pixel-Snippet
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
  // @ts-ignore – offizielles Microsoft-Clarity-Snippet
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
      /* localStorage nicht verfügbar – Einwilligung gilt nur für diese Sitzung */
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
      {/* Reopen-Button (Widerruf / Einstellungen ändern) */}
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

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Cookie-Einstellungen"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-[80] mx-auto w-full max-w-2xl rounded-t-2xl border border-white/10 bg-[#070d20] p-6 shadow-2xl sm:bottom-4 sm:rounded-2xl"
            >
              <h2 className="text-lg font-semibold text-white">
                Wir respektieren Ihre Privatsphäre
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Wir verwenden Cookies, um unsere Website bereitzustellen und – mit Ihrer
                Einwilligung – die Reichweite unserer Werbung zu messen und die Nutzung unserer
                Website zu analysieren (Meta-Pixel, Google Analytics, Microsoft Clarity). Notwendige Cookies sind
                für den Betrieb erforderlich. Marketing- und Analyse-Cookies werden nur gesetzt,
                wenn Sie zustimmen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die
                Zukunft widerrufen. Mehr dazu in unserer{" "}
                <Link href="/datenschutz" className="text-blue-400 underline hover:text-blue-300">
                  Datenschutzerklärung
                </Link>
                .
              </p>

              {/* Granulare Einstellungen */}
              <AnimatePresence initial={false}>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3">
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
                            Hilft uns, die Wirkung unserer Werbung auf Facebook, Instagram & Google
                            zu messen und – anonymisiert – zu verstehen, wie unsere Website genutzt
                            wird, um sie zu verbessern.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          className="mt-1 h-5 w-5 shrink-0 accent-blue-500"
                        />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {showSettings ? (
                  <button
                    type="button"
                    onClick={() => save(marketing)}
                    className="order-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:order-none"
                  >
                    Auswahl speichern
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="order-3 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white sm:order-none"
                  >
                    Einstellungen
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => save(false)}
                  className="order-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white sm:order-none"
                >
                  Nur notwendige
                </button>
                <button
                  type="button"
                  onClick={() => save(true)}
                  className="order-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:order-none sm:ml-auto"
                >
                  Alle akzeptieren
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
