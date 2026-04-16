'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

/**
 * Labels positioned using container-relative left/top so they sit near
 * their respective beam-endpoint nodes without overlapping each other.
 *
 * Node positions in % of root div from center:
 *   top  (0, -110 SVG)      → (50%, ~16%)
 *   left (-95.263, 55 SVG)  → (~20%, ~67%)
 *   right (95.263, 55 SVG)  → (~80%, ~67%)
 */
const LABELS = [
  {
    text: 'AUTONOMOUS_WORKFLOWS',
    // near top node — centered horizontally, above the node
    left: '50%',
    top: '7%',
    transform: 'translate(-50%, 0)',
  },
  {
    text: 'KNOWLEDGE_GRAPH',
    // near left node — flush to the left edge
    left: '2%',
    top: '67%',
    transform: 'translate(0, -50%)',
  },
  {
    text: 'REASONING_ENGINE',
    // near right node — flush to the right edge
    left: '98%',
    top: '62%',
    transform: 'translate(-100%, -50%)',
  },
] as const;

const beamPaths = [
  { from: { x: 0,       y: -110  }, color: 'var(--color-action-accent)' },
  { from: { x:  95.263, y:  55   }, color: 'var(--color-trust-amber)'   },
  { from: { x: -95.263, y:  55   }, color: 'var(--color-action-accent)' },
];

export function DecisionEngineVis() {
  return (
    <div
      className="relative"
      style={{ width: '100%', height: '100%', isolation: 'isolate' }}
      role="img"
      aria-label="AI Decision Engine visualization with reasoning core, knowledge graph, and autonomous workflow nodes"
    >
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(45,91,255,0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Glass container — 81.25% of root (mirrors 260/320) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
        style={{
          width: '81.25%',
          height: '81.25%',
          background: 'rgba(31,31,31,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--color-border)',
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* SVG — beams + orbit ring, fills glass container */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="-130 -130 260 260"
          aria-hidden="true"
        >
          {/* Orbit ring */}
          <circle
            cx={0} cy={0} r={110}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={1}
            strokeDasharray="4 6"
            opacity={0.5}
          />

          {/* Animated beams */}
          {beamPaths.map((beam, i) => (
            <line
              key={i}
              x1={beam.from.x} y1={beam.from.y}
              x2={0} y2={0}
              stroke={beam.color}
              strokeWidth={1.5}
              strokeDasharray="8 12"
              opacity={0.6}
              style={{ animation: `hero-beam-dash ${2 + i * 0.4}s linear infinite` }}
            />
          ))}

          {/* Beam endpoint nodes */}
          {beamPaths.map((beam, i) => (
            <circle
              key={`node-${i}`}
              cx={beam.from.x} cy={beam.from.y}
              r={3}
              fill={beam.color}
              opacity={0.8}
              style={{ animation: `node-ping 2s ease-in-out ${i * 0.6}s infinite` }}
            />
          ))}
        </svg>

        {/* Rotating intelligence core — 17.5% of glass = same ratio as 56/320 of root */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '21.5%',
            height: '21.5%',
            animation: 'hero-core-spin 30s linear infinite',
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 56 56" className="h-full w-full">
            <defs>
              <linearGradient id="core-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-action-accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-trust-amber)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <rect x={4} y={4} width={48} height={48} rx={12}
              fill="none" stroke="url(#core-grad)" strokeWidth={1.5} />
            <circle cx={28} cy={28} r={6} fill="var(--color-trust-amber)" opacity={0.9} />
            <circle cx={28} cy={28} r={12} fill="none"
              stroke="var(--color-action-accent)" strokeWidth={0.8} opacity={0.4} />
          </svg>
        </div>
      </div>

      {/* Floating system labels — placed near each beam-endpoint node */}
      {LABELS.map((label, i) => (
        <motion.span
          key={label.text}
          className="pointer-events-none absolute whitespace-nowrap font-mono text-text-tertiary"
          style={{
            fontSize: 'clamp(8px, 1vw, 11px)',
            left: label.left,
            top: label.top,
            transform: label.transform,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.2, ease: EASE }}
        >
          {label.text}
        </motion.span>
      ))}

      {/* Slow orbit for labels — CSS only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ animation: 'hero-label-orbit 40s linear infinite' }}
        aria-hidden="true"
      />
    </div>
  );
}
