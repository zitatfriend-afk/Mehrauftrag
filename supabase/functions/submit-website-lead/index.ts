// submit-website-lead  (Supabase Edge Function)
// Deployed auf Projekt ezrxxxilssmzcavdvvbe · verify_jwt = false
//
// Nimmt Form-Submits von Website-Landingpages entgegen, schreibt sie als Lead
// in die Tabelle `leads` UND schickt eine E-Mail-Benachrichtigung an
// info@mehrauftrag.de (via Brevo, nur wenn Secret BREVO_API_KEY gesetzt ist).
// E-Mail ist best-effort: schlägt sie fehl, wird der Lead trotzdem gespeichert.

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

async function notify(name: string, phone: string, source: string, message: string, id?: string) {
  const key = Deno.env.get("BREVO_API_KEY");
  if (!key) return;
  const html =
    `<h2>Neue Anfrage über die Website</h2>` +
    `<p><b>Name:</b> ${esc(name)}<br><b>Telefon:</b> ${esc(phone)}<br><b>Quelle:</b> ${esc(source)}</p>` +
    (message ? `<p><b>Nachricht:</b><br>${esc(message)}</p>` : "") +
    (id ? `<p style="color:#888">Lead-ID: ${esc(id)}</p>` : "");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", "accept": "application/json" },
    body: JSON.stringify({
      sender: { name: "MehrAuftrag Website", email: "Kontakt@zitatfriend.de" },
      to: [{ email: "info@mehrauftrag.de" }],
      subject: `Neue Website-Anfrage: ${name} (${source})`,
      htmlContent: html,
    }),
  });
  if (!res.ok) console.error("Brevo-Mail fehlgeschlagen:", res.status, await res.text());
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return json({ error: "Ungültiger Request-Body" }, 400); }

  const name = String(payload.name ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const source = String(payload.source ?? "Website - Elektriker LP").trim() || "Website - Elektriker LP";

  if (!name || !phone) return json({ error: "name und phone sind erforderlich" }, 400);
  if (name.length > 120 || phone.length > 60 || message.length > 2000) return json({ error: "Eingaben zu lang" }, 400);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name, phone, email: null, source, leadgen_id: null,
      history: [{ action: `🌐 Lead über Website-Landingpage eingegangen (${source})`, timestamp: nowIso }],
    })
    .select("id")
    .single();

  if (error) { console.error("Insert-Fehler:", error.message); return json({ error: "Konnte Lead nicht speichern" }, 500); }

  try { await notify(name, phone, source, message, data?.id); } catch (e) { console.error("E-Mail-Versand-Fehler:", e); }

  return json({ ok: true, id: data?.id }, 200);
});
