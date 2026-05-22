import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MehrAuftrag – Die Digitalagentur die liefert",
  description:
    "Mehr Aufträge, mehr Umsatz, mehr Wachstum. MehrAuftrag ist die Digitalagentur für Handwerk, Gastronomie, Physiotherapie und alle Branchen die online wachsen wollen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#04081c]">{children}</body>
    </html>
  );
}
