"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MaMark from "./ma-mark";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

function MALogo() {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <MaMark size={40} priority />
      <span className="text-[18px] font-black leading-none tracking-[-0.04em]">
        <span style={{ color: "#ffffff" }}>Mehr</span>
        <span
          style={{
            background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 55%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Auftrag
        </span>
      </span>
    </span>
  );
}

function StaticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #020818 0%, #030d20 45%, #020b17 100%)" }}
      />
      {/* Aurora A */}
      <div
        className="float-orb absolute pointer-events-none"
        style={{
          top: "-280px",
          right: "-220px",
          width: "920px",
          height: "920px",
          background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(37,99,235,0.07) 40%, transparent 68%)",
          filter: "blur(48px)",
          borderRadius: "50%",
        }}
      />
      {/* Aurora B */}
      <div
        className="float-orb-alt absolute pointer-events-none"
        style={{
          bottom: "-300px",
          left: "-180px",
          width: "760px",
          height: "760px",
          background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(59,130,246,0.05) 45%, transparent 68%)",
          filter: "blur(52px)",
          borderRadius: "50%",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.038) 1.5px, transparent 1.5px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      {/* Scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none" />
      {/* Noise */}
      <div className="noise-overlay" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 48%, rgba(2,8,24,0.65) 100%)" }}
      />
    </div>
  );
}

export default function LegalPageShell({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <StaticBackground />

      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,8,24,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <Link href="/" aria-label="MehrAuftrag Startseite">
            <MALogo />
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: "/#leistungen", label: "Leistungen" },
              { href: "/#branchen", label: "Branchen" },
              { href: "/#uber-uns", label: "Über uns" },
              { href: "/#kontakt", label: "Kontakt" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#kontakt"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.28)",
            }}
          >
            Kontakt
          </Link>
          {/* Mobile back link */}
          <Link
            href="/"
            className="md:hidden flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück
          </Link>
        </div>
      </header>

      <main className="relative z-10 min-h-screen pt-24 pb-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span
              className="inline-block text-[11px] font-semibold tracking-[0.24em] uppercase mb-5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.22)",
                color: "#60a5fa",
              }}
            >
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-white/38 max-w-md mx-auto">{subtitle}</p>
            )}
          </motion.div>
          {/* Accent line */}
          <div className="mt-8 mx-auto w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />
        </div>

        {/* Content */}
        <motion.div
          className="max-w-4xl mx-auto px-5 sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-9 px-5 sm:px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 gap-x-8">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <MALogo />
              <p className="text-[11px] text-white/18">Die Digitalagentur die liefert.</p>
            </div>

            {/* Right side: nav + legal */}
            <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-8">
              {/* Primary nav */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[
                  { href: "/#leistungen", label: "Leistungen" },
                  { href: "/#branchen", label: "Branchen" },
                  { href: "/#uber-uns", label: "Über uns" },
                  { href: "/#kontakt", label: "Kontakt" },
                ].map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="text-[11px] font-medium tracking-wide text-white/28 hover:text-white/65 transition-colors"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-3 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

              {/* Legal links */}
              <div className="flex items-center gap-5">
                <Link
                  href="/impressum"
                  className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors"
                >
                  Impressum
                </Link>
                <span className="text-[10px] text-white/10">·</span>
                <Link
                  href="/datenschutz"
                  className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors"
                >
                  Datenschutz
                </Link>
                <span className="text-[10px] text-white/10">·</span>
                <Link
                  href="/agb"
                  className="text-[11px] tracking-wide text-white/18 hover:text-white/50 transition-colors"
                >
                  AGB
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
