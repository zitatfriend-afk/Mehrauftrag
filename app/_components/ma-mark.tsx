import React from "react";
import Image from "next/image";

/**
 * MaMark — das offizielle Mehr Auftrag-Logo (Bildmarke).
 *
 * Rendert die echte Logo-Datei als transparentes PNG (/logo-mark.png), das aus
 * "Mehrauftrag logo.jpg" erzeugt wurde (schwarzer Hintergrund entfernt).
 * Quadratische, verzerrungsfreie, gestochen scharfe Darstellung über next/image.
 * Sitzt sauber auf dunklen Flächen (Header/Footer der Seite sind durchgehend dunkel).
 */
export default function MaMark({
  size = 34,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Mehr Auftrag Logo"
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={className}
      style={{ display: "block", flexShrink: 0, width: size, height: size }}
    />
  );
}
