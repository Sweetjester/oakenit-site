'use client';

import { useEffect, useRef } from 'react';

/**
 * Light, GPU-accelerated cursor follower.
 * Hidden on touch / coarse pointers.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
    };

    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const setHover = (active: boolean) => {
      if (!ring.current) return;
      ring.current.style.width = active ? '56px' : '36px';
      ring.current.style.height = active ? '56px' : '36px';
      ring.current.style.borderColor = active
        ? '#d4a437'
        : document.documentElement.classList.contains('dark')
          ? 'rgba(245,241,234,0.35)'
          : 'rgba(15,13,12,0.35)';
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('a, button, [role="button"]')) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('a, button, [role="button"]')) setHover(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="hidden md:block fixed top-0 left-0 z-[200] w-1.5 h-1.5 rounded-full bg-oak-400 pointer-events-none mix-blend-difference"
      />
      <div
        ref={ring}
        className="hidden md:block fixed top-0 left-0 z-[199] w-9 h-9 rounded-full border border-ink-900/35 dark:border-parchment/40 pointer-events-none transition-[width,height,border-color] duration-300"
      />
    </>
  );
}
