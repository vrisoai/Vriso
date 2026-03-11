'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

/* Precomputed positions for hydration (avoid Math.cos/sin float variance) */
const LABELS = [
  { text: 'REASONING_ENGINE', x: 140, y: 0 },
  { text: 'KNOWLEDGE_GRAPH', x: -70, y: 121 },
  { text: 'AUTONOMOUS_WORKFLOWS', x: -70, y: -121 },
] as const;

const ORBIT_R = 110;

const beamPaths = [
  { from: { x: 0, y: -ORBIT_R }, color: 'var(--color-action-accent)' },
  { from: { x: ORBIT_R * 0.866, y: ORBIT_R * 0.5 }, color: 'var(--color-trust-amber)' },
  { from: { x: -ORBIT_R * 0.866, y: ORBIT_R * 0.5 }, color: 'var(--color-action-accent)' },
];

export function DecisionEngineVis() {
  return (
    <div
      className="relative"
      style={{ width: 320, height: 320, isolation: 'isolate' }}
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

      {/* Glass container */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
        style={{
          width: 260,
          height: 260,
          background: 'rgba(31,31,31,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--color-border)',
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* SVG — beams + orbit ring */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="-130 -130 260 260"
          aria-hidden="true"
        >
          {/* Orbit ring */}
          <circle
            cx={0}
            cy={0}
            r={ORBIT_R}
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
              x1={beam.from.x}
              y1={beam.from.y}
              x2={0}
              y2={0}
              stroke={beam.color}
              strokeWidth={1.5}
              strokeDasharray="8 12"
              opacity={0.6}
              style={{
                animation: `hero-beam-dash ${2 + i * 0.4}s linear infinite`,
              }}
            />
          ))}

          {/* Beam endpoint nodes */}
          {beamPaths.map((beam, i) => (
            <circle
              key={`node-${i}`}
              cx={beam.from.x}
              cy={beam.from.y}
              r={3}
              fill={beam.color}
              opacity={0.8}
              style={{ animation: `node-ping 2s ease-in-out ${i * 0.6}s infinite` }}
            />
          ))}
        </svg>

        {/* Rotating intelligence core */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 56,
            height: 56,
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
            <rect
              x={4}
              y={4}
              width={48}
              height={48}
              rx={12}
              fill="none"
              stroke="url(#core-grad)"
              strokeWidth={1.5}
            />
            <circle cx={28} cy={28} r={6} fill="var(--color-trust-amber)" opacity={0.9} />
            <circle cx={28} cy={28} r={12} fill="none" stroke="var(--color-action-accent)" strokeWidth={0.8} opacity={0.4} />
          </svg>
        </div>
      </div>

      {/* Floating system labels */}
      {LABELS.map((label, i) => (
        <motion.span
          key={label.text}
          className="pointer-events-none absolute whitespace-nowrap font-mono text-text-tertiary"
          style={{
            fontSize: 11,
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${label.x}px), calc(-50% + ${label.y}px))`,
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
