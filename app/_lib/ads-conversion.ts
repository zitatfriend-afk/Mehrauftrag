/**
 * Google Ads Conversions fuer Mehr Auftrag.
 *
 * Warum diese Datei existiert:
 * Beide Landingpages (Elektriker und Handwerker) melden auf dieselben zwei
 * Conversion-Aktionen. Der Code lag doppelt in beiden Seiten. Mit den
 * erweiterten Conversions kommt Logik dazu, die auf keinen Fall auseinander
 * laufen darf. Deshalb steht sie ab jetzt nur noch hier.
 *
 * Erweiterte Conversions (Enhanced Conversions for Leads):
 * Ohne Marketing-Einwilligung setzt der Consent Mode ad_storage auf denied.
 * Die Conversion erreicht Google dann nur als cookieloser Ping und wird bei
 * kleinem Budget praktisch nie modelliert, der Lead ist fuer Google Ads also
 * unsichtbar. Schicken wir zusaetzlich die Telefonnummer mit, kann Google den
 * Nutzer ueber sein eigenes Konto zuordnen, auch ohne Cookie.
 *
 * Google normalisiert und hasht die Nummer selbst, bevor sie den Server
 * erreicht. Uebertragen wird sie nur ueber HTTPS und nur dann, wenn der
 * Besucher im Cookie-Banner "Alle akzeptieren" gewaehlt hat.
 *
 * Damit die Daten in Google Ads auch verarbeitet werden, muss im Konto
 * einmalig "Erweiterte Conversions" aktiviert und den Kundendatenbedingungen
 * zugestimmt werden. Solange das nicht passiert ist, ignoriert Google das
 * Feld einfach, die normale Conversion wird trotzdem gezaehlt.
 */

// Conversion-Labels, angelegt am 06.09.2026 im Konto 735-056-7333.
export const GA_ADS_CONVERSION_FORM = "AW-18287779811/hS5HCOznt-8cEOO_pZBE"; // Formular gesendet
export const GA_ADS_CONVERSION_PHONE = "AW-18287779811/vAYnCO_nt-8cEOO_pZBE"; // Telefonklick

const CONSENT_KEY = "ma-consent-v1";

type GtagFunktion = (...args: unknown[]) => void;

function holeGtag(): GtagFunktion | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFunktion }).gtag;
  return typeof g === "function" ? g : null;
}

/**
 * Hat der Besucher Marketing-Cookies zugestimmt?
 * Gelesen wird derselbe Schluessel, den cookie-consent.tsx schreibt.
 */
export function hatMarketingEinwilligung(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const roh = localStorage.getItem(CONSENT_KEY);
    if (!roh) return false;
    const gespeichert = JSON.parse(roh) as { marketing?: boolean };
    return gespeichert?.marketing === true;
  } catch {
    return false;
  }
}

/**
 * Bringt eine eingetippte Telefonnummer in das E.164-Format, das Google
 * verlangt: Pluszeichen, Laendervorwahl, nur Ziffern, 11 bis 15 Stellen.
 *
 * "0170 1234567"    -> "+491701234567"
 * "+49 170 1234567" -> "+491701234567"
 * "0049 170 ..."    -> "+49170..."
 * "+43 664 ..."     -> "+43664..."  (Laendervorwahl bleibt erhalten)
 *
 * Gibt null zurueck, wenn die Nummer nicht sauber verwertbar ist. Dann wird
 * einfach keine Telefonnummer mitgeschickt, die Conversion feuert trotzdem.
 */
export function normalisiereTelefon(roh: string): string | null {
  if (!roh) return null;
  const hatPlus = roh.trim().startsWith("+");
  let ziffern = roh.replace(/\D/g, "");
  if (!ziffern) return null;

  if (!hatPlus) {
    if (ziffern.startsWith("00")) {
      ziffern = ziffern.slice(2);
    } else if (ziffern.startsWith("0")) {
      ziffern = "49" + ziffern.slice(1);
    } else if (!ziffern.startsWith("49")) {
      ziffern = "49" + ziffern;
    }
  }

  if (ziffern.length < 11 || ziffern.length > 15) return null;
  return "+" + ziffern;
}

/**
 * Conversion "Formular gesendet".
 * Setzt vorher die Telefonnummer als user_data, sofern eingewilligt wurde.
 */
export function sendeFormularConversion(telefonRoh: string): void {
  const gtag = holeGtag();
  if (!gtag) return;

  if (hatMarketingEinwilligung()) {
    const telefon = normalisiereTelefon(telefonRoh);
    if (telefon) {
      gtag("set", "user_data", { phone_number: telefon });
    }
  }

  gtag("event", "conversion", { send_to: GA_ADS_CONVERSION_FORM });
}

/**
 * Conversion "Telefonklick". Bewusst an JEDEM tel:-Link verwendet, damit alle
 * Anrufwege gezaehlt werden und nicht nur der Knopf im Header.
 */
export function sendeTelefonklickConversion(): void {
  const gtag = holeGtag();
  if (!gtag) return;
  gtag("event", "conversion", { send_to: GA_ADS_CONVERSION_PHONE });
}

/**
 * Conversion "WhatsApp-Klick".
 *
 * Meldet bewusst auf dieselbe Conversion-Aktion wie der Telefonklick. Fuer den
 * Betrieb ist beides derselbe Vorgang: Jemand nimmt direkt Kontakt auf, ohne
 * den Umweg ueber das Formular. Google Ads braucht dieses Signal, sonst
 * optimiert die Kampagne nur auf Formular-Anfragen und wertet jeden Besucher,
 * der lieber schreibt oder anruft, als wertlos.
 *
 * Wenn im Konto sauber getrennt werden soll, welcher Weg wie oft genutzt wird,
 * braucht es eine eigene Conversion-Aktion. Bis dahin ist ein gezaehlter
 * Kontakt besser als ein nicht gezaehlter.
 */
export function sendeWhatsappConversion(): void {
  const gtag = holeGtag();
  if (!gtag) return;
  gtag("event", "conversion", { send_to: GA_ADS_CONVERSION_PHONE });
}
