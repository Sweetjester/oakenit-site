'use client';

/**
 * The lantern from the logo mark, redrawn as SVG so it can be scaled, tinted
 * and animated. Two exports:
 *   <Lantern />      full hanging lantern with cord — decorative
 *   <LanternGlyph /> the lit body only, ~1em — used as a list bullet
 */

type LanternProps = {
  /** Height of the cord above the lantern, in viewBox units. */
  cord?: number;
  className?: string;
  /** Seconds for one sway cycle. 0 disables the sway. */
  sway?: number;
  delay?: number;
};

export function Lantern({ cord = 26, className = '', sway = 6, delay = 0 }: LanternProps) {
  const top = cord;
  return (
    <svg
      viewBox={`0 0 24 ${cord + 34}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={
        sway
          ? {
              transformOrigin: '12px 0px',
              animation: `sway ${sway}s ease-in-out ${delay}s infinite`,
            }
          : undefined
      }
    >
      {/* cord */}
      <line x1="12" y1="0" x2="12" y2={top - 3} stroke="currentColor" strokeWidth="1" opacity="0.55" />
      {/* hanging ring */}
      <circle cx="12" cy={top - 1.5} r="1.9" stroke="currentColor" strokeWidth="1" opacity="0.8" />

      {/* halo */}
      <ellipse cx="12" cy={top + 12} rx="11" ry="12" fill="url(#lanternHalo)" />

      {/* cap */}
      <path d={`M6 ${top + 5} H18 L16 ${top + 2} H8 Z`} fill="currentColor" opacity="0.9" />
      {/* body */}
      <rect x="6.4" y={top + 5} width="11.2" height="16" rx="1" fill="url(#lanternGlass)" />
      <rect
        x="6.4"
        y={top + 5}
        width="11.2"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      {/* panes */}
      <line x1="10" y1={top + 7} x2="10" y2={top + 19} stroke="currentColor" strokeWidth="0.9" opacity="0.75" />
      <line x1="14" y1={top + 7} x2="14" y2={top + 19} stroke="currentColor" strokeWidth="0.9" opacity="0.75" />
      {/* finial */}
      <path d={`M6.4 ${top + 21} H17.6 L12 ${top + 29} Z`} fill="currentColor" opacity="0.9" />

      <defs>
        <radialGradient id="lanternHalo">
          <stop offset="0%" stopColor="#ffdb8a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffdb8a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lanternGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8e6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f7c04a" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LanternGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 4 H9 L8 2 H4 Z" fill="currentColor" />
      <rect x="3.2" y="4" width="5.6" height="7.5" rx="0.6" fill="currentColor" opacity="0.28" />
      <rect x="3.2" y="4" width="5.6" height="7.5" rx="0.6" stroke="currentColor" strokeWidth="1" />
      <path d="M3.2 11.5 H8.8 L6 15 Z" fill="currentColor" />
      <circle cx="6" cy="1" r="1" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}
