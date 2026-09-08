import { NextResponse } from "next/server";

/**
 * Anmeldung fuer das Freebie "Website-Check".
 *
 * Laeuft serverseitig, damit der Brevo-Schluessel nicht im Browser landet.
 * Genutzt wird der Double-Opt-In-Weg von Brevo: der Kontakt wird NICHT sofort
 * in die Liste geschrieben, sondern bekommt zuerst die Bestaetigungsmail. Erst
 * der Klick darin traegt ihn in die Liste ein, und genau dieser Eintritt ist
 * der Ausloeser der Automation. Damit ist die Einwilligung nachweisbar.
 *
 * Drei Werte kommen aus der Umgebung, nicht aus dem Code, weil sie
 * kontospezifisch sind und sich ohne Deploy aendern koennen sollen:
 *   BREVO_API_KEY                  Schluessel des Mehr-Auftrag-Kontos
 *   BREVO_WEBSITE_CHECK_LIST_ID    ID der Liste "MA Website-Check"
 *   BREVO_DOI_TEMPLATE_ID          ID der Double-Opt-In-Vorlage
 */

const BREVO_DOI_URL = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";
const REDIRECT_NACH_BESTAETIGUNG = "https://www.mehrauftrag.de/website-check/danke";

function istMail(wert: unknown): wert is string {
  return typeof wert === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim());
}

export async function POST(request: Request) {
  let daten: { email?: unknown; vorname?: unknown; quelle?: unknown };
  try {
    daten = await request.json();
  } catch {
    return NextResponse.json({ fehler: "ungueltige Anfrage" }, { status: 400 });
  }

  if (!istMail(daten.email)) {
    return NextResponse.json({ fehler: "ungueltige E-Mail-Adresse" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_WEBSITE_CHECK_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);

  if (!apiKey || !Number.isFinite(listId) || !Number.isFinite(templateId)) {
    // Absichtlich deutlich im Log, damit ein fehlender Wert in Vercel sofort
    // auffaellt und nicht als stiller Anmeldeverlust durchgeht.
    console.error("[website-check] Brevo ist nicht vollstaendig konfiguriert");
    return NextResponse.json({ fehler: "nicht konfiguriert" }, { status: 503 });
  }

  const vorname =
    typeof daten.vorname === "string" && daten.vorname.trim() ? daten.vorname.trim() : "";
  const quelle =
    typeof daten.quelle === "string" && daten.quelle.trim() ? daten.quelle.trim() : "unbekannt";

  const heute = new Date().toISOString().slice(0, 10);

  try {
    const res = await fetch(BREVO_DOI_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: daten.email.trim(),
        attributes: {
          ...(vorname ? { VORNAME: vorname } : {}),
          QUELLE: quelle,
          FREEBIE: "website-check",
          ANMELDUNG_AM: heute,
        },
        includeListIds: [listId],
        templateId,
        redirectionUrl: REDIRECT_NACH_BESTAETIGUNG,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    const text = await res.text();

    // Wer schon bestaetigt in der Liste steht, bekommt von Brevo einen Fehler.
    // Fuer den Absender ist das kein Fehler, er hat sich ja angemeldet. Ihn
    // deshalb genauso auf die Zwischenseite schicken, statt ihm zu verraten,
    // dass diese Adresse bereits eingetragen ist.
    if (res.status === 400 && text.includes("duplicate_parameter")) {
      return NextResponse.json({ ok: true, bereitsEingetragen: true });
    }

    console.error("[website-check] Brevo antwortete", res.status, text);
    return NextResponse.json({ fehler: "Brevo-Fehler" }, { status: 502 });
  } catch (e) {
    console.error("[website-check] Brevo nicht erreichbar", e);
    return NextResponse.json({ fehler: "Brevo nicht erreichbar" }, { status: 502 });
  }
}
