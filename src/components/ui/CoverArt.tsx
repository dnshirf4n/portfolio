import { useMemo } from 'react';
import type { Project } from '../../data/types';
import styles from './CoverArt.module.css';

/** Deterministic PRNG so every project always gets the same artwork. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 640;
const H = 400;

function Motif({ motif, rand, c1, c2 }: { motif: Project['motif']; rand: () => number; c1: string; c2: string }) {
  switch (motif) {
    case 'wave': {
      const lines = Array.from({ length: 14 }, (_, i) => {
        const amp = 18 + i * 3;
        const off = rand() * Math.PI * 2;
        const y0 = 90 + i * 17;
        let d = `M0 ${y0}`;
        for (let x = 0; x <= W; x += 16) {
          const spike = rand() > 0.94 ? (rand() - 0.5) * 70 : 0;
          d += ` L${x} ${(y0 + Math.sin(x / 70 + off) * amp * 0.4 + spike).toFixed(1)}`;
        }
        return <path key={i} d={d} stroke={i % 5 === 2 ? c2 : c1} strokeOpacity={0.2 + (i / 14) * 0.6} strokeWidth={1.2} fill="none" />;
      });
      return <>{lines}</>;
    }
    case 'nodes': {
      const pts = Array.from({ length: 26 }, () => [40 + rand() * (W - 80), 40 + rand() * (H - 80)] as const);
      const edges: [number, number][] = [];
      pts.forEach((p, i) =>
        pts.forEach((q, j) => {
          if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 125) edges.push([i, j]);
        }),
      );
      const flagged = new Set([Math.floor(rand() * 26), Math.floor(rand() * 26), Math.floor(rand() * 26)]);
      return (
        <>
          {edges.map(([a, b], k) => (
            <line key={k} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={c1} strokeOpacity={0.22} />
          ))}
          {pts.map((p, i) => (
            <g key={i}>
              {flagged.has(i) && <circle cx={p[0]} cy={p[1]} r={14} fill="none" stroke={c2} strokeOpacity={0.6} />}
              <circle cx={p[0]} cy={p[1]} r={flagged.has(i) ? 4.5 : 3} fill={flagged.has(i) ? c2 : c1} fillOpacity={0.9} />
            </g>
          ))}
        </>
      );
    }
    case 'bars': {
      const n = 32;
      const bw = (W - 80) / n;
      return (
        <>
          {Array.from({ length: n }, (_, i) => {
            const h = 30 + rand() * 210;
            const hot = rand() > 0.8;
            return (
              <rect key={i} x={40 + i * bw + 2} y={H - 50 - h} width={bw - 5} height={h} rx={2} fill={hot ? c2 : c1} fillOpacity={hot ? 0.85 : 0.28} />
            );
          })}
          <line x1={40} x2={W - 40} y1={H - 50} y2={H - 50} stroke={c1} strokeOpacity={0.4} />
        </>
      );
    }
    case 'rings': {
      const cx = W * 0.62;
      const cy = H * 0.52;
      return (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={cx} cy={cy} r={22 + i * 26} fill="none" stroke={i === 2 ? c2 : c1} strokeOpacity={0.55 - i * 0.05} strokeDasharray={i % 2 ? '2 6' : undefined} />
          ))}
          <circle cx={cx} cy={cy} r={7} fill={c2} />
          {Array.from({ length: 10 }, (_, i) => {
            const a = rand() * Math.PI * 2;
            const r = 50 + rand() * 180;
            return <circle key={`d${i}`} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={2.5} fill={c1} fillOpacity={0.8} />;
          })}
        </>
      );
    }
    case 'grid': {
      const cols = 16;
      const rows = 9;
      const cw = (W - 80) / cols;
      const rh = (H - 80) / rows;
      return (
        <>
          {Array.from({ length: cols * rows }, (_, k) => {
            const i = k % cols;
            const j = Math.floor(k / cols);
            const v = rand();
            const hot = v > 0.88;
            return (
              <rect key={k} x={40 + i * cw + 2} y={40 + j * rh + 2} width={cw - 4} height={rh - 4} rx={3} fill={hot ? c2 : c1} fillOpacity={hot ? 0.75 : v * 0.28} />
            );
          })}
        </>
      );
    }
    case 'scatter': {
      return (
        <>
          {Array.from({ length: 4 }, (_, c) => {
            const cx = 120 + rand() * (W - 240);
            const cy = 90 + rand() * (H - 180);
            return Array.from({ length: 34 }, (_, i) => {
              const a = rand() * Math.PI * 2;
              const r = Math.sqrt(rand()) * 62;
              return <circle key={`${c}-${i}`} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={2.6} fill={c === 0 ? c2 : c1} fillOpacity={c === 0 ? 0.9 : 0.5} />;
            });
          })}
        </>
      );
    }
    case 'contour': {
      const cx = W * 0.45 + rand() * 80;
      const cy = H * 0.5;
      const paths = Array.from({ length: 11 }, (_, i) => {
        const r = 24 + i * 24;
        let d = '';
        for (let a = 0; a <= 64; a++) {
          const t = (a / 64) * Math.PI * 2;
          const wob = 1 + Math.sin(t * 3 + i * 0.4) * 0.12 + Math.cos(t * 2) * 0.08;
          const x = cx + Math.cos(t) * r * 1.5 * wob;
          const y = cy + Math.sin(t) * r * wob;
          d += `${a === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
        }
        return <path key={i} d={`${d}Z`} fill="none" stroke={i < 3 ? c2 : c1} strokeOpacity={0.65 - i * 0.045} strokeWidth={1.2} />;
      });
      // Production-forecast style curve
      let curve = `M40 ${H - 60}`;
      for (let x = 40; x <= W - 40; x += 12) {
        const p = (x - 40) / (W - 80);
        curve += ` L${x} ${(H - 60 - Math.sin(p * Math.PI * 0.9) * 120 * Math.exp(-p * 1.2)).toFixed(1)}`;
      }
      return (
        <>
          {paths}
          <path d={curve} stroke={c2} strokeWidth={2} fill="none" strokeDasharray="6 5" strokeOpacity={0.8} />
        </>
      );
    }
  }
}

interface Props {
  project: Pick<Project, 'slug' | 'hue' | 'motif' | 'name'>;
  className?: string;
}

/** Generated, project-specific cover art used until real screenshots are added. */
export function CoverArt({ project, className = '' }: Props) {
  const { slug, hue, motif } = project;
  const c1 = `hsl(${hue} 85% 66%)`;
  const c2 = `hsl(${(hue + 40) % 360} 90% 70%)`;
  const art = useMemo(() => <Motif motif={motif} rand={rng(slug)} c1={c1} c2={c2} />, [motif, slug, c1, c2]);
  const gid = `g-${slug}`;
  return (
    <div className={`${styles.cover} ${className}`} style={{ ['--hue' as string]: hue }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${project.name} cover illustration`}>
        <defs>
          <radialGradient id={gid} cx="70%" cy="30%" r="80%">
            <stop offset="0%" stopColor={`hsl(${hue} 80% 55%)`} stopOpacity="0.28" />
            <stop offset="100%" stopColor={`hsl(${hue} 80% 30%)`} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${gid})`} />
        {art}
      </svg>
    </div>
  );
}
