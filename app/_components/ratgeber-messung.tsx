"use client";

/**
 * Anonyme Zaehlung auf den Ratgeber-Seiten (07.11.2026).
 *
 * Warum: Die Schweisser-Ratgeber bringen die meisten Klicks aus Google, aber
 * keine Anfragen. Ohne Zahlen laesst sich nicht sagen, ob die Leser gar nicht
 * bis zum Angebot kommen oder dort abspringen. Gezaehlt wird deshalb:
 *   · ratgeber_aufruf           einmal je Seitenaufruf
 *   · ratgeber_hinweis_gesehen  der Hinweis im Text kam ins Bild
 *   · ratgeber_ende_erreicht    der Abschlusskasten kam ins Bild
 *   · ratgeber_klick_pruefung   Klick auf "kostenlos pruefen" / Analyse
 *   · ratgeber_klick_entwurf    Klick auf "Entwurf anfordern"
 *   · telefonklick, whatsappklick
 *
 * Es laeuft ueber dieselbe Zaehlung wie auf den Landingpages
 * (meldeKontaktversuch -> Supabase zaehle-ereignis): keine IP, keine Kennung,
 * kein Cookie, nichts im Speicher des Geraets. Nur Art, Pfad, Quelle.
 * Zusaetzlich geht ein GA4-Ereignis raus, aber nur wenn gtag geladen ist,
 * also nach Einwilligung im Cookie-Banner.
 */

import { useEffect } from "react";
import { meldeKontaktversuch, type Kontaktart } from "../_lib/ads-conversion";

function gaEreignis(typ: string) {
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof g === "function") {
    try {
      g("event", typ, { seite: window.location.pathname });
    } catch {
      // bewusst still
    }
  }
}

function melde(typ: Kontaktart) {
  meldeKontaktversuch(typ);
  gaEreignis(typ);
}

export default function RatgeberMessung() {
  useEffect(() => {
    melde("ratgeber_aufruf");

    const beiKlick = (e: MouseEvent) => {
      const ziel = (e.target as Element | null)?.closest?.("a");
      if (!ziel) return;
      const eigen = ziel.getAttribute("data-messung");
      const href = ziel.getAttribute("href") ?? "";
      if (eigen) melde(eigen as Kontaktart);
      else if (href.startsWith("tel:")) melde("telefonklick");
      else if (href.includes("wa.me/")) melde("whatsappklick");
    };
    document.addEventListener("click", beiKlick, { capture: true });

    let beobachter: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      const schonGemeldet = new Set<string>();
      beobachter = new IntersectionObserver(
        (eintraege) => {
          for (const e of eintraege) {
            if (!e.isIntersecting) continue;
            const typ = e.target.getAttribute("data-messung-sicht");
            if (!typ || schonGemeldet.has(typ)) continue;
            schonGemeldet.add(typ);
            melde(typ as Kontaktart);
            beobachter?.unobserve(e.target);
          }
        },
        { threshold: 0.5 },
      );
      document.querySelectorAll("[data-messung-sicht]").forEach((el) => beobachter?.observe(el));
    }

    return () => {
      document.removeEventListener("click", beiKlick, { capture: true });
      beobachter?.disconnect();
    };
  }, []);

  return null;
}
