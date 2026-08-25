import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Eindeutige Projektwurzel.
// Next sucht sonst von hier aus nach oben nach package-lock.json und nimmt den
// ersten Treffer als Wurzel. Auf Patricks Mac liegt eine fremde Sperrdatei im
// Benutzerordner, dadurch waehlte der Build den falschen Ordner und warnte bei
// jedem Lauf. Fest verdrahtet ist das Verhalten auf jedem Rechner gleich.
const projektWurzel = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projektWurzel,
  },
  async rewrites() {
    return [
      {
        source: "/webseite-fuer-kosmetikstudio",
        destination: "/webseite-fuer-kosmetikstudio.html",
      },
      {
        source: "/webseite-fuer-restaurant",
        destination: "/webseite-fuer-restaurant.html",
      },
      {
        source: "/webseite-fuer-pizzeria",
        destination: "/webseite-fuer-pizzeria.html",
      },
      {
        source: "/webseite-fuer-cafe",
        destination: "/webseite-fuer-cafe.html",
      },
      {
        source: "/webseite-fuer-bar",
        destination: "/webseite-fuer-bar.html",
      },
      {
        source: "/webseite-fuer-foodtruck",
        destination: "/webseite-fuer-foodtruck.html",
      },
      {
        source: "/webseite-fuer-gastronomie",
        destination: "/webseite-fuer-gastronomie.html",
      },
      {
        source: "/webseite-fuer-hausmeisterservice",
        destination: "/webseite-fuer-hausmeisterservice.html",
      },
      {
        source: "/webseite-fuer-gebaeudereinigung",
        destination: "/webseite-fuer-gebaeudereinigung.html",
      },
      {
        source: "/webseite-fuer-schweisser",
        destination: "/webseite-fuer-schweisser.html",
      },
      {
        source: "/website-bringt-keine-anfragen",
        destination: "/website-bringt-keine-anfragen.html",
      },
      {
        source: "/website-relaunch",
        destination: "/website-relaunch.html",
      },
      {
        source: "/webseite-fuer-physiotherapie",
        destination: "/webseite-fuer-physiotherapie.html",
      },
      {
        source: "/suchmaschinenoptimierung",
        destination: "/suchmaschinenoptimierung.html",
      },
      {
        source: "/webdesign-:slug",
        destination: "/webdesign-:slug.html",
      },
    ];
  },
};

export default nextConfig;
