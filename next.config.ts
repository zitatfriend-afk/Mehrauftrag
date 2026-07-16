import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
