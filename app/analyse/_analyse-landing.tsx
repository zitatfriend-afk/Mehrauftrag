"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

/**
 * Interaktives Lead-Formular für die Analyse-Landingpages.
 * Sendet an dieselbe Supabase Edge Function wie die übrigen Landingpages
 * (Lead -> leads-Tabelle -> Brevo-Mail an info@mehrauftrag.de).
 * Meta-Pixel-Lead-Event feuert nur bei erteiltem Cookie-Consent.
 */

const SUBMIT_URL =
  "https://ezrxxxilssmzcavdvvbe.supabase.co/functions/v1/submit-website-lead";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

function getLeadAttribution(fallback: string): {
  source: string;
  campaign: string | null;
} {
  if (typeof window === "undefined") return { source: fallback, campaign: null };
  const p = new URLSearchParams(window.location.search);
  const us = (p.get("utm_source") || "").toLowerCase();
  let channel = "Website";
  if (p.get("gclid") || us.includes("google")) channel = "Google Ad";
  else if (
    p.get("fbclid") ||
    us.includes("facebook") ||
    us.includes("instagram") ||
    us.includes("meta")
  )
    channel = "Meta Ad";
  else if (
    us.includes("tiktok") ||
    us.includes("linkedin") ||
    us.includes("youtube") ||
    us.includes("social")
  )
    channel = "Social";
  return { source: `${channel} - ${fallback}`, campaign: p.get("utm_campaign") };
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function AnalyseForm({
  leadSource,
  successNote,
}: {
  leadSource: string;
  successNote: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (!name.trim() || !phone.trim()) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const attr = getLeadAttribution(leadSource);
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          source: attr.source,
          campaign: attr.campaign,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: leadSource });
      }
      setState("success");
    } catch {
      setState("error");
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
          <svg
            className="h-6 w-6 text-[#60a5fa]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Danke! Wir melden uns bald bei dir.</h3>
        <p className="mt-2 text-sm text-slate-400">{successNote}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor="lead-name" className="sr-only">
          Vorname
        </label>
        <input
          id="lead-name"
          type="text"
          autoComplete="given-name"
          placeholder="Dein Vorname"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (state === "error") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="sr-only">
          Telefonnummer
        </label>
        <input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Deine Telefonnummer"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (state === "error") setState("idle");
          }}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.06]"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">
          Bitte Vorname und Telefonnummer eingeben. Klappt es nicht, ruf uns gern direkt an.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="shimmer-btn group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold text-white transition disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
        }}
      >
        <span className="relative z-10">
          {state === "loading" ? "Wird gesendet …" : "Kostenlose Analyse sichern"}
        </span>
        {state !== "loading" && (
          <svg
            className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
