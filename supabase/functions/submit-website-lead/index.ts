// submit-website-lead  (Supabase Edge Function)
// Deployed auf Projekt ezrxxxilssmzcavdvvbe · verify_jwt = false
//
// Nimmt Form-Submits von Website-Landingpages entgegen (z. B. /elektriker)
// und schreibt sie als Lead in die Supabase-Tabelle `leads`.
//
// - verify_jwt = false: wird direkt aus dem Browser aufgerufen (kein User-JWT).
// - Insert erfolgt mit dem Service-Role-Key (automatisch injizierte Secrets
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY), umgeht RLS sauber serverseitig.
// - CORS offen (Formular liegt auf mehrauftrag.de, Funktion auf supabase.co).
//
// Hinweis: Diese Datei ist die versionierte Kopie der live deployten Function.
// Re-Deploy via Supabase MCP/CLI, wenn geändert.

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Ungültiger Request-Body" }, 400);
  }

  const name = String(payload.name ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const source =
    String(payload.source ?? "Website - Elektriker LP").trim() ||
    "Website - Elektriker LP";

  if (!name || !phone) {
    return json({ error: "name und phone sind erforderlich" }, 400);
  }
  // einfache Schutzgrenzen gegen Müll/Spam
  if (name.length > 120 || phone.length > 60) {
    return json({ error: "Eingaben zu lang" }, 400);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name,
      phone,
      email: null,
      source,
      leadgen_id: null,
      history: [
        { action: "🌐 Lead über Elektriker-Landingpage eingegangen", timestamp: nowIso },
      ],
    })
    .select("id")
    .single();

  if (error) {
    console.error("Insert-Fehler:", error.message);
    return json({ error: "Konnte Lead nicht speichern" }, 500);
  }

  return json({ ok: true, id: data?.id }, 200);
});
