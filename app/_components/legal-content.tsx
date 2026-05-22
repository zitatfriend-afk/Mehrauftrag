import React from "react";

export function LegalSection({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-2xl p-6 sm:p-8 mb-6"
      style={{
        background: "rgba(255,255,255,0.032)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {number && (
        <span
          className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase mb-3 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          {number}
        </span>
      )}
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 leading-snug">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function LegalSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 mb-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-2">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#3b82f6" }} />
        {title}
      </h3>
      <div className="pl-4 space-y-2">{children}</div>
    </div>
  );
}

export function LegalP({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm leading-relaxed text-white/58${className ? ` ${className}` : ""}`}>{children}</p>;
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-white/58 leading-relaxed">
          <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#3b82f6", opacity: 0.7 }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl px-5 py-4 mt-4"
      style={{
        background: "rgba(59,130,246,0.07)",
        border: "1px solid rgba(59,130,246,0.18)",
      }}
    >
      <p className="text-sm leading-relaxed text-white/70">{children}</p>
    </div>
  );
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#60a5fa] underline underline-offset-2 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export function ContactCard({
  name,
  company,
  street,
  city,
  country,
  email,
  phone,
}: {
  name: string;
  company?: string;
  street: string;
  city: string;
  country?: string;
  email?: string;
  phone?: string;
}) {
  return (
    <div
      className="rounded-xl px-5 py-4 mt-3 inline-flex flex-col gap-0.5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span className="text-sm font-semibold text-white/90">{name}</span>
      {company && <span className="text-sm text-white/55">{company}</span>}
      <span className="text-sm text-white/55">{street}</span>
      <span className="text-sm text-white/55">{city}</span>
      {country && <span className="text-sm text-white/55">{country}</span>}
      {email && (
        <a href={`mailto:${email}`} className="text-sm text-[#60a5fa] hover:text-white transition-colors mt-1">
          {email}
        </a>
      )}
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-[#60a5fa] hover:text-white transition-colors">
          {phone}
        </a>
      )}
    </div>
  );
}
