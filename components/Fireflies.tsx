'use client';

import { useEffect, useRef } from 'react';

/**
 * Points of life around the canopy, themed to the time of day.
 *
 * Dark: fireflies. Additive glow, and a blink that is mostly *off* — they read
 * as fireflies precisely because they are dark more often than lit; a steady
 * twinkle reads as fairy lights.
 *
 * Light: motes drifting in sun. A glow is *invisible* on cream — additive
 * blending against a near-white page just makes white — so daylight draws
 * them the other way up: small warm specks painted over the page in leaf green
 * and gold, never blinking out, only breathing in brightness as they catch the
 * light. Same positions, same drift, opposite physics.
 */
const COUNT = 16;

type Fly = {
  /** home position, 0-1 of the container */
  hx: number;
  hy: number;
  /** wander radius, 0-1 */
  rx: number;
  ry: number;
  fx: number;
  fy: number;
  phase: number;
  /** blink cycle, seconds */
  period: number;
  offset: number;
  size: number;
  /** which daylight colour this one takes */
  moteIdx: number;
};

function seed(): Fly[] {
  // Deterministic-ish spread across the canopy, biased to the upper two
  // thirds where the branches are, with a couple drifting off to the side.
  const spots: [number, number][] = [
    [0.22, 0.34], [0.36, 0.22], [0.5, 0.3], [0.63, 0.2], [0.76, 0.31],
    [0.86, 0.42], [0.16, 0.5], [0.3, 0.55], [0.45, 0.45], [0.58, 0.52],
    [0.72, 0.46], [0.9, 0.6], [0.24, 0.68], [0.52, 0.66], [0.68, 0.72],
    [0.4, 0.8],
  ];
  return spots.slice(0, COUNT).map(([hx, hy], i) => ({
    hx,
    hy,
    rx: 0.035 + ((i * 7) % 5) * 0.012,
    ry: 0.028 + ((i * 5) % 4) * 0.01,
    fx: 0.00007 + ((i * 3) % 7) * 0.000016,
    fy: 0.00009 + ((i * 11) % 6) * 0.000014,
    phase: (i * 2.399) % (Math.PI * 2),
    period: 5200 + ((i * 977) % 4200),
    offset: (i * 1310) % 5200,
    size: 1.1 + ((i * 13) % 4) * 0.28,
    moteIdx: i % 4,
  }));
}

/** Daylight specks: the leaf greens and the lantern golds, on cream. */
const MOTE_COLOURS = [
  [54, 86, 15],
  [74, 118, 29],
  [143, 77, 0],
  [10, 46, 18],
];

export function Fireflies({ className = '' }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const flies = seed();

    // the theme toggle swaps a class on <html>; watch it rather than reading
    // the DOM every frame
    const root = document.documentElement;
    let dark = root.classList.contains('dark');
    const mo = new MutationObserver(() => {
      dark = root.classList.contains('dark');
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });

    let w = 0, h = 0, raf = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      if (!w || !h) return;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // hidden in light mode: nothing laid out, nothing to do
      if (!el.offsetParent || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

      for (const f of flies) {
        const x = (f.hx + Math.sin(now * f.fx + f.phase) * f.rx) * w;
        const y = (f.hy + Math.cos(now * f.fy + f.phase * 1.7) * f.ry) * h;

        const t = ((now + f.offset) % f.period) / f.period;

        if (dark) {
          // mostly dark, with a soft swell — pow sharpens the off period
          const lit = reduced ? 0.35 : Math.pow(Math.sin(t * Math.PI), 6);
          if (lit < 0.01) continue;

          const glow = f.size * 9;
          const g = ctx.createRadialGradient(x, y, 0, x, y, glow);
          g.addColorStop(0, `rgba(255,236,170,${0.5 * lit})`);
          g.addColorStop(0.4, `rgba(247,192,74,${0.16 * lit})`);
          g.addColorStop(1, 'rgba(247,192,74,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, glow, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,247,214,${0.85 * lit})`;
          ctx.beginPath();
          ctx.arc(x, y, f.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // daylight: never out, just breathing as it catches the sun
          const lit = reduced ? 0.7 : 0.62 + 0.38 * Math.sin(t * Math.PI * 2);
          const [r, g2, b2] = MOTE_COLOURS[f.moteIdx];
          const halo = f.size * 6.5;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, halo);
          grad.addColorStop(0, `rgba(${r},${g2},${b2},${0.24 * lit})`);
          grad.addColorStop(1, `rgba(${r},${g2},${b2},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, halo, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${r},${g2},${b2},${0.58 * lit})`;
          ctx.beginPath();
          ctx.arc(x, y, f.size * 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
