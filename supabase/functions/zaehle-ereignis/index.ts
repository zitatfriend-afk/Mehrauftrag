// zaehle-ereignis  (Supabase Edge Function)
// Projekt ezrxxxilssmzcavdvvbe · verify_jwt = false
//
// 26.09.2026: Warum es diese Funktion gibt.
//
// Telefon- und WhatsApp-Klicks auf den Landingpages wurden bisher nur als
// Google-Ads-Conversion gemeldet. Die feuert aber erst, wenn der Besucher im
// Cookie-Banner zugestimmt hat, denn ohne Zustimmung wird gtag gar nicht
// geladen. Wer ablehnt und trotzdem anruft, war damit unsichtbar. Nach 72
// bezahlten Klicks stand deshalb ueberall eine Null, ohne dass sich sagen
// liess, ob wirklich niemand Kontakt aufgenommen hat.
//
// Diese Funktion zaehlt denselben Klick ein zweites Mal, und zwar bewusst
// OHNE jeden Personenbezug:
//   · keine IP, kein User-Agent, keine Kennung, kein Cookie
//   · kein Zugriff auf Speicher im Geraet des Besuchers
//   · gespeichert wird nur: Art des Klicks, Pfad der Seite, und ob ein
//     Google-Ads-Klick im Spiel war (nur als Wort "google", nie die gclid)
// Damit ist es eine reine Zaehlung und keine Nachverfolgung, deshalb laeuft
// sie unabhaengig von der Cookie-Entscheidung.

import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/** Nur diese Arten werden gespeichert, alles andere wird verworfen. */
const ERLAUBTE_TYPEN = [
  "telefonklick",
  "whatsappklick",
  "formular_abgeschickt",
  "formular_fehler",
];

/** Nur diese Worte, nie die gclid selbst. */
const ERLAUBTE_QUELLEN = ["google", "meta", "ohne"];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    // sendBeacon schickt unter Umstaenden einen leeren Body. Kein Grund zu meckern.
  }

  const typ = String(payload.typ ?? "").trim().toLowerCase();
  if (!ERLAUBTE_TYPEN.includes(typ)) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Pfad ohne Fragezeichen-Teil, damit keine Parameter mitwandern.
  const seite = String(payload.seite ?? "").split("?")[0].slice(0, 120) || null;
  const quelleRoh = String(payload.quelle ?? "").trim().toLowerCase();
  const quelle = ERLAUBTE_QUELLEN.includes(quelleRoh) ? quelleRoh : "ohne";

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error } = await supabase
      .from("seiten_ereignisse")
      .insert({ typ, seite, quelle });
    if (error) console.error("Zaehlung fehlgeschlagen:", error.message);
  } catch (e) {
    console.error("Zaehlung fehlgeschlagen:", e);
  }

  // Immer 204. Der Besucher soll von dieser Zaehlung nichts merken, und ein
  // Fehler hier darf niemals den Anruf oder das Formular stoeren.
  return new Response(null, { status: 204, headers: corsHeaders });
});
