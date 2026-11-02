import { useEffect, useRef } from 'react';

/**
 * Ambient hero background: a quiet field of data points that ripples gently
 * and brightens near the cursor. Pauses off-screen and respects reduced motion.
 */
export function DataField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };
    const GAP = 28;

    const color = () => {
      const s = getComputedStyle(document.documentElement);
      return { accent: s.getPropertyValue('--accent').trim() || '#5b8cff', base: s.getPropertyValue('--text-muted').trim() || '#6b6b76' };
    };
    let colors = color();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const wave = Math.sin(x * 0.012 + time * 0.6) * Math.cos(y * 0.014 - time * 0.4);
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 180);
          const r = 0.8 + (wave + 1) * 0.45 + near * 1.6;
          ctx.globalAlpha = 0.18 + (wave + 1) * 0.12 + near * 0.6;
          ctx.fillStyle = near > 0.05 ? colors.accent : colors.base;
          ctx.beginPath();
          ctx.arc(x, y + wave * 3, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduce) draw(0);
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const vis = entry.isIntersecting;
      if (vis && !running && !reduce) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!vis) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      colors = color();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    if (reduce) {
      running = false;
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
