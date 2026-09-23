// submit-website-lead  (Supabase Edge Function)
// Deployed auf Projekt ezrxxxilssmzcavdvvbe · verify_jwt = false
//
// Schreibt Form-Submits als Lead in `leads` UND schickt eine E-Mail an
// info@mehrauftrag.de (via Brevo, Absender info@mehrauftrag.de) — nur wenn
// das Secret BREVO_API_KEY gesetzt ist.
//
// 31.08.2026: Notfallweg ergaenzt. Frueher galt: schlaegt der Insert fehl,
// gibt es die Anfrage nirgends. Jetzt wird in genau diesem Fall eine als
// NOTFALL gekennzeichnete Mail mit allen Daten verschickt.
//
// 06.09.2026: Nachtrag (Branche/Anmerkung nach dem Absenden) und das
// History-Format {at, by, text, type} ergaenzt.
//
// 23.09.2026: Kontaktweg geoeffnet und Zuordnung repariert.
//
//   1) E-MAIL ALS ZWEITER WEG. Bisher war `phone` Pflicht. Wer seine Nummer
//      nicht herausgeben wollte, konnte gar nicht anfragen, obwohl der Klick
//      bezahlt war. Jetzt gilt: `name` ist Pflicht, und mindestens eines von
//      `phone` oder `email` muss da sein. Aeltere Landingpages schicken
//      weiterhin nur name+phone und verhalten sich unveraendert.
//
//   2) KAMPAGNEN-ZUORDNUNG. `campaign_id` (gclid) und `campaign_name`
//      (utm_campaign) wurden vom Formular zwar mitgeschickt, aber nie
//      gespeichert. Dadurch liess sich nicht unterscheiden, ob eine Anfrage
//      aus Google Ads kam oder organisch. Beides wird jetzt geschrieben.
//
//   3) TESTANFRAGEN. Enthaelt der Name "test", wird die Quelle mit dem
//      Zusatz " (Test)" gespeichert. Auswertungen filtern darauf, damit ein
//      Funktionstest die Zahlen nicht mehr verfaelscht.

import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Testanfragen erkennen, siehe Kopfkommentar Punkt 3. */
const IST_TEST = /test/i;

/** Verlaufseintrag in beiden Formaten, siehe Kopfkommentar 06.09.2026. */
function verlaufsEintrag(text: string, typ: string, nowIso: string) {
  return { at: nowIso, by: "Website", text, type: typ, action: text, timestamp: nowIso };
}

function adminClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/**
 * Benachrichtigungsmail. Gibt true zurueck, wenn Brevo die Mail angenommen hat.
 * notfall = der Lead konnte NICHT gespeichert werden, die Mail ist dann die
 * einzige Kopie der Anfrage und muss entsprechend auffallen.
 */
async function notify(
  name: string,
  phone: string,
  source: string,
  message: string,
  id?: string,
  notfall?: string,
  industry?: string,
  email?: string,
  kanal?: string,
): Promise<boolean> {
  const key = Deno.env.get("BREVO_API_KEY");
  if (!key) {
    console.error("BREVO_API_KEY ist nicht gesetzt, es wurde keine Mail verschickt.");
    return false;
  }
  const kopf = notfall
    ? `<h2 style="color:#b91c1c">NOTFALL: Anfrage konnte nicht gespeichert werden</h2>` +
      `<p style="color:#b91c1c"><b>Diese Mail ist die einzige Kopie dieser Anfrage. Bitte sofort im CRM nachtragen und zurueckrufen.</b></p>`
    : `<h2>Neue Anfrage über die Website</h2>`;
  const wunsch = kanal === "email"
    ? "E-Mail (keine Telefonnummer angegeben)"
    : kanal === "both"
    ? "Telefon oder E-Mail, beides angegeben"
    : "Telefon";
  const html =
    kopf +
    `<p><b>Name:</b> ${esc(name)}<br>` +
    `<b>Telefon:</b> ${esc(phone || "nicht angegeben")}<br>` +
    `<b>E-Mail:</b> ${esc(email || "nicht angegeben")}<br>` +
    `<b>Gewünschter Weg:</b> ${esc(wunsch)}<br>` +
    `<b>Quelle:</b> ${esc(source)}</p>` +
    (industry ? `<p><b>Branche:</b> ${esc(industry)}</p>` : "") +
    (message ? `<p><b>Nachricht:</b><br>${esc(message)}</p>` : "") +
    (id ? `<p style="color:#888">Lead-ID: ${esc(id)}</p>` : "") +
    (notfall ? `<p style="color:#888">Technischer Grund: ${esc(notfall)}</p>` : "");
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        sender: { name: "MehrAuftrag Website", email: "info@mehrauftrag.de" },
        to: [{ email: "info@mehrauftrag.de" }],
        subject: notfall
          ? `NOTFALL, bitte nachtragen: Website-Anfrage ${name} (${source})`
          : `Neue Website-Anfrage: ${name} (${source})`,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      console.error("Brevo-Mail fehlgeschlagen:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("Brevo-Aufruf fehlgeschlagen:", e);
    return false;
  }
}

/** Kurze Mail zum Nachtrag, damit Patrick die Zusatzinfos auch im Postfach sieht. */
async function notifyNachtrag(id: string, industry: string, message: string) {
  const key = Deno.env.get("BREVO_API_KEY");
  if (!key) return;
  const html =
    `<h2>Zusatzinfos zu einer Website-Anfrage</h2>` +
    (industry ? `<p><b>Branche:</b> ${esc(industry)}</p>` : "") +
    (message ? `<p><b>Worauf es dem Betrieb ankommt:</b><br>${esc(message)}</p>` : "") +
    `<p style="color:#888">Lead-ID: ${esc(id)}</p>`;
  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        sender: { name: "MehrAuftrag Website", email: "info@mehrauftrag.de" },
        to: [{ email: "info@mehrauftrag.de" }],
        subject: `Zusatzinfos zur Anfrage${industry ? " (" + industry + ")" : ""}`,
        htmlContent: html,
      }),
    });
  } catch (e) {
    console.error("Nachtrags-Mail fehlgeschlagen:", e);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return json({ error: "Ungültiger Request-Body" }, 400); }

  const nowIso = new Date().toISOString();

  // ─── Weg 2: Nachtrag zu einem bestehenden Lead ────────────────────────────
  // Die Landingpage fragt Branche und Anmerkung erst nach dem Absenden ab.
  const nachtragId = String(payload.nachtrag_id ?? "").trim();
  if (nachtragId) {
    if (!UUID.test(nachtragId)) return json({ error: "nachtrag_id ungültig" }, 400);

    const industry = String(payload.industry ?? "").trim().slice(0, 80);
    const message = String(payload.message ?? "").trim().slice(0, 2000);
    // Telefonnummer darf nachgereicht werden. Die Landingpage fragt danach,
    // wenn die Anfrage nur mit E-Mail kam. Ohne Nummer wird aus einer Anfrage
    // ein Mailwechsel statt eines Gespraechs.
    const nachtragPhone = String(payload.phone ?? "").trim().slice(0, 60);
    if (!industry && !message && !nachtragPhone) return json({ error: "nichts zu ergänzen" }, 400);

    try {
      const supabase = adminClient();
      const { data: lead, error: leseFehler } = await supabase
        .from("leads")
        .select("id, created_at, notes, history, industry, phone, draft_channel")
        .eq("id", nachtragId)
        .single();

      if (leseFehler || !lead) return json({ error: "Lead nicht gefunden" }, 404);

      // Absicherung: die Funktion laeuft ohne JWT. Ein Nachtrag ist deshalb nur
      // kurz nach dem Absenden moeglich. Damit kann niemand spaeter fremde
      // Leads veraendern, selbst wenn er eine id kennt.
      const alterMinuten = (Date.now() - new Date(lead.created_at as string).getTime()) / 60000;
      if (!(alterMinuten >= 0) || alterMinuten > 120) {
        return json({ error: "Zeitfenster abgelaufen" }, 403);
      }

      const notizen = Array.isArray(lead.notes) ? lead.notes : [];
      const verlauf = Array.isArray(lead.history) ? lead.history : [];

      const teile: string[] = [];
      if (industry) teile.push(`Branche: ${industry}`);
      if (nachtragPhone) teile.push(`Telefonnummer nachgereicht: ${nachtragPhone}`);
      if (message) teile.push(message);
      const notizText = teile.join(" · ");

      const update: Record<string, unknown> = {
        notes: [...notizen, { at: nowIso, by: "Website", text: `📝 Angaben des Interessenten: ${notizText}` }],
        history: [...verlauf, verlaufsEintrag("📝 Interessent hat nach dem Absenden Zusatzinfos ergänzt", "edit", nowIso)],
      };
      // Branche nur setzen, wenn noch keine drinsteht. Nichts ueberschreiben.
      if (industry && !lead.industry) update.industry = industry;
      // Dasselbe fuer die Nummer: nur eintragen, wenn das Feld leer ist.
      if (nachtragPhone && !lead.phone) {
        update.phone = nachtragPhone;
        update.draft_channel = "both";
      }

      const { error: schreibFehler } = await supabase.from("leads").update(update).eq("id", nachtragId);
      if (schreibFehler) {
        console.error("Nachtrag-Update fehlgeschlagen:", schreibFehler.message);
        return json({ error: "Konnte Zusatzinfos nicht speichern" }, 500);
      }

      await notifyNachtrag(nachtragId, industry, message);
      return json({ ok: true }, 200);
    } catch (e) {
      console.error("Nachtrag fehlgeschlagen:", e);
      return json({ error: "Konnte Zusatzinfos nicht speichern" }, 500);
    }
  }

  // ─── Weg 1: Neue Anfrage ──────────────────────────────────────────────────
  const name = String(payload.name ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const industry = String(payload.industry ?? "").trim().slice(0, 80);
  const campaignId = String(payload.campaign_id ?? "").trim().slice(0, 200);
  const campaignName = String(payload.campaign ?? payload.campaign_name ?? "").trim().slice(0, 200);
  let source = String(payload.source ?? "Website - Elektriker LP").trim() || "Website - Elektriker LP";

  // Name ist Pflicht. Beim Kontaktweg genuegt einer von beiden, siehe
  // Kopfkommentar 23.09.2026 Punkt 1.
  if (!name) return json({ error: "name ist erforderlich" }, 400);
  if (!phone && !email) return json({ error: "phone oder email ist erforderlich" }, 400);
  if (name.length > 120 || phone.length > 60 || email.length > 160 || message.length > 2000) {
    return json({ error: "Eingaben zu lang" }, 400);
  }

  // Welchen Weg der Betrieb selbst gewaehlt hat. Die Landingpage schickt das
  // mit, aeltere Seiten nicht, deshalb wird es hier notfalls hergeleitet.
  const kanalRoh = String(payload.draft_channel ?? "").trim().toLowerCase();
  const kanal = ["phone", "email", "both"].includes(kanalRoh)
    ? kanalRoh
    : phone && email
    ? "both"
    : phone
    ? "phone"
    : "email";

  // Testanfragen kennzeichnen, damit Auswertungen sie sauber ausschliessen
  // koennen, siehe Kopfkommentar Punkt 3.
  const istTest = IST_TEST.test(name);
  if (istTest && !source.endsWith(" (Test)")) source = `${source} (Test)`;

  let leadId: string | undefined;
  let insertFehler: string | undefined;

  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        phone: phone || null,
        email: email || null,
        source,
        leadgen_id: null,
        industry: industry || null,
        draft_channel: kanal,
        // Ohne gclid bleibt das Feld leer, kein Platzhalter.
        campaign_id: campaignId || null,
        campaign_name: campaignName || null,
        history: [verlaufsEintrag(`🌐 Lead über Website-Landingpage eingegangen (${source})`, "create", nowIso)],
      })
      .select("id")
      .single();
    if (error) insertFehler = error.message;
    else leadId = data?.id;
  } catch (e) {
    insertFehler = String(e);
  }

  // Normalfall: Lead liegt im CRM. Mail ist der schnelle Weg, ein Fehlschlag
  // ist nicht schlimm, der Waechter findet den Lead trotzdem.
  if (!insertFehler) {
    try { await notify(name, phone, source, message, leadId, undefined, industry, email, kanal); } catch (e) { console.error("E-Mail-Versand-Fehler:", e); }
    return json({ ok: true, id: leadId }, 200);
  }

  // Notfall: Der Lead konnte nicht gespeichert werden. Die Mail ist jetzt die
  // einzige Kopie. Kommt sie durch, ist die Anfrage nicht verloren und der
  // Besucher bekommt sein Danke.
  console.error("Insert-Fehler:", insertFehler);
  const mailOk = await notify(name, phone, source, message, undefined, insertFehler, industry, email, kanal);
  if (mailOk) return json({ ok: true, gespeichert: false }, 200);

  return json({ error: "Konnte Lead nicht speichern" }, 500);
});
