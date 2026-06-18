import React from "react";

/**
 * MaMark — the MehrAuftrag brand symbol.
 *
 * A self-contained, transparent SVG monogram badge (rounded-square "MA" on a
 * blue gradient). Resolution-independent, works cleanly on light and dark
 * backgrounds, and matches the favicon / app icon exactly.
 *
 * The letterforms are real Poppins-Bold outlines converted to vector paths,
 * so the mark renders identically everywhere without any font dependency.
 */
export default function MaMark({
  size = 30,
  className,
  ariaHidden = true,
}: {
  size?: number;
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="maGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b9cff" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="99" height="99" rx="23.5" fill="url(#maGrad)" />
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="19"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <g fill="#ffffff">
        <path
          transform="translate(8.625,67.5) scale(0.05,-0.05)"
          d="M857 702V0H686V421L529 0H391L233 422V0H62V702H264L461 216L656 702Z"
        />
        <path
          transform="translate(54.525,67.5) scale(0.05,-0.05)"
          d="M499 124H237L195 0H16L270 702H468L722 0H541ZM455 256 368 513 282 256Z"
        />
      </g>
    </svg>
  );
}
