import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: "/webdesign-:slug",
        destination: "/webdesign-:slug.html",
      },
    ];
  },
};

export default nextConfig;
