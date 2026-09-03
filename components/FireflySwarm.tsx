'use client';

import { useEffect, useRef } from 'react';

/**
 * Swarms of fireflies that orbit as a loose ball and drift across the band.
 *
 * These replaced the strung lanterns at the top of the hero (2026-09-03). The
 * drawn tree now carries the lanterns, so hanging vector ones above it read as
 * two illustrations sharing a page.
 *
 * Each swarm is a centre that wanders on a slow Lissajous path, with its flies
 * placed on a *sphere* around it — two angles, and the depth term drives size
 * and brightness. That is what makes it read as a ball with volume rather than
 * a flat ring: the ones at the back are small and dim, the ones at the front
 * near and bright, and they trade places as the ball turns.
 *
 * Physics is inverted by theme for the same reason as `Fireflies`: additive
 * glow is invisible against cream, so daylight paints dark specks instead.
 */
type Swarm = {
  /** home centre, 0-1 of the container */
  hx: number;
  hy: number;
  /** drift amplitude, 0-1 */
  dx: number;
  dy: number;
  /** drift speed */
  sx: number;
  sy: number;
  /** ball radius in px, and how many flies in it */
  r: number;
  n: number;
  phase: number;
};

const SWARMS: Swarm[] = [
  { hx: 0.10, hy: 0.30, dx: 0.035, dy: 0.10, sx: 0.000062, sy: 0.000048, r: 40, n: 18, phase: 0.0 },
  { hx: 0.25, hy: 0.17, dx: 0.028, dy: 0.085, sx: 0.000049, sy: 0.000067, r: 30, n: 14, phase: 1.7 },
  { hx: 0.44, hy: 0.36, dx: 0.04, dy: 0.11, sx: 0.000071, sy: 0.000041, r: 26, n: 12, phase: 3.1 },
  { hx: 0.63, hy: 0.19, dx: 0.03, dy: 0.09, sx: 0.000044, sy: 0.000059, r: 34, n: 16, phase: 4.4 },
  { hx: 0.79, hy: 0.40, dx: 0.037, dy: 0.075, sx: 0.000058, sy: 0.000052, r: 28, n: 13, phase: 2.3 },
];

const MOTE = [
  [54, 86, 15],
  [74, 118, 29],
  [143, 77, 0],
  [10, 46, 18],
];

export function FireflySwarm({ className = '' }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // flatten the swarms into flies once, so the frame loop allocates nothing
    const flies = SWARMS.flatMap((s, si) =>
      Array.from({ length: s.n }, (_, i) => ({
        s,
        // two orbit speeds that are not simple multiples of each other, or the
        // ball pulses in step instead of churning
        ta: 0.00042 + ((i * 17 + si * 5) % 9) * 0.00006,
        tb: 0.00029 + ((i * 11 + si * 3) % 7) * 0.00005,
        pa: ((i * 2.399 + si) % (Math.PI * 2)),
        pb: ((i * 1.111 + si * 2.2) % (Math.PI * 2)),
        rj: 0.68 + ((i * 13) % 5) * 0.09,
        size: 0.9 + ((i * 7) % 4) * 0.22,
        period: 3600 + ((i * 811 + si * 397) % 3400),
        offset: (i * 1231 + si * 733) % 3600,
        moteIdx: (i + si) % 4,
      }))
    );

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
      if (!el.offsetParent || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

      for (const f of flies) {
        const s = f.s;
        const cx = (s.hx + Math.sin(now * s.sx + s.phase) * s.dx) * w;
        const cy = (s.hy + Math.cos(now * s.sy + s.phase * 1.3) * s.dy) * h;

        const th = now * f.ta + f.pa;
        const ph = now * f.tb + f.pb;
        const rr = s.r * f.rj;
        const x = cx + rr * Math.sin(ph) * Math.cos(th);
        // squashed vertically so a ball reads as a ball in a wide band
        const y = cy + rr * Math.sin(ph) * Math.sin(th) * 0.72;
        // depth: -1 at the back, +1 at the front
        const depth = (Math.cos(ph) + 1) / 2;
        const near = 0.45 + depth * 0.55;

        const t = ((now + f.offset) % f.period) / f.period;

        if (dark) {
          // Gentler than a lone firefly's blink on purpose: a swarm has to
          // read as a *ball*, and if most of them are dark at any instant the
          // shape never resolves. So they stay dimly lit and swell, rather
          // than winking fully out.
          const lit = (reduced ? 0.45 : 0.3 + 0.7 * Math.pow(Math.sin(t * Math.PI), 2)) * near;
          if (lit < 0.012) continue;
          const size = f.size * near;
          const glow = size * 8;
          const g = ctx.createRadialGradient(x, y, 0, x, y, glow);
          g.addColorStop(0, `rgba(255,236,170,${0.46 * lit})`);
          g.addColorStop(0.4, `rgba(247,192,74,${0.14 * lit})`);
          g.addColorStop(1, 'rgba(247,192,74,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, glow, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(255,247,214,${0.8 * lit})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const lit = (reduced ? 0.7 : 0.6 + 0.4 * Math.sin(t * Math.PI * 2)) * near;
          const [r, g2, b2] = MOTE[f.moteIdx];
          const size = f.size * 1.25 * near;
          const halo = size * 5.5;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, halo);
          grad.addColorStop(0, `rgba(${r},${g2},${b2},${0.2 * lit})`);
          grad.addColorStop(1, `rgba(${r},${g2},${b2},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, halo, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${r},${g2},${b2},${0.5 * lit})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
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
