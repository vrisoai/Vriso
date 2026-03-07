'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { shardStagger, shardTransition } from '@/app/lib/animations';

const RING_RADII = [140, 180, 220];
const RING_DURATIONS = [60, 90, 120];

export interface MonolithArtifactRef {
  triggerAmberPulse: () => void;
}

interface MonolithArtifactProps {
  className?: string;
  width?: number;
  height?: number;
  onAmberPulseRef?: (api: { triggerAmberPulse: () => void }) => void;
}

export function MonolithArtifact({
  className = '',
  width = 400,
  height = 400,
  onAmberPulseRef,
}: MonolithArtifactProps) {
  const amberControls = useAnimationControls();
  const shimmerControls = useAnimationControls();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerAmberPulse = useCallback(() => {
    amberControls.start({
      scale: [1, 1.08, 1],
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    });
  }, [amberControls]);

  useEffect(() => {
    onAmberPulseRef?.({ triggerAmberPulse });
  }, [onAmberPulseRef, triggerAmberPulse]);
  useEffect(() => {
    function runShimmer() {
      shimmerControls.set({ x: '-100%' });
      requestAnimationFrame(() => {
        shimmerControls.start({
          x: '200%',
          transition: { duration: 0.6, ease: 'easeInOut' },
        });
      });
    }
    intervalRef.current = setInterval(runShimmer, 10000);
    runShimmer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shimmerControls]);

  const cx = width / 2;
  const cy = height / 2;
  const scale = width / 400;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width, height }}
      role="img"
      aria-label="Sovereign AI Monolith representing Vriso AI's Valuable, Rare, Inimitable, and Organized framework for US/EU enterprise systems."
    >
      {/* Concentric rings — slow spin */}
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {RING_RADII.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r * scale}
            fill="none"
            stroke="#262626"
            strokeWidth={1}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `spin ${RING_DURATIONS[i]}s linear infinite`,
            }}
          />
        ))}
      </svg>

      {/* 3 slate shards + 1 amber shard */}
      <div className="relative" style={{ width: 280 * scale, height: 280 * scale }}>
        {/* Slate shard 1 — from top-left */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            left: '8%',
            top: '5%',
            width: '38%',
            height: '75%',
            background: '#1A1A1A',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            transformOrigin: 'center center',
          }}
          initial={{ opacity: 0, x: -120, y: -80 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...shardTransition, delay: 0 }}
        >
          <div
            className="absolute inset-0 rounded-sm opacity-[0.04]"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 30% 20%, #fff, transparent)',
            }}
          />
        </motion.div>

        {/* Slate shard 2 — from bottom */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            left: '32%',
            top: '18%',
            width: '36%',
            height: '70%',
            background: '#1A1A1A',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            transform: 'rotate(-4deg)',
            transformOrigin: 'center center',
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...shardTransition, delay: shardStagger }}
        >
          <div
            className="absolute inset-0 rounded-sm opacity-[0.04]"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 30%, #fff, transparent)',
            }}
          />
        </motion.div>

        {/* Slate shard 3 — from bottom-right */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            right: '10%',
            top: '12%',
            width: '34%',
            height: '72%',
            background: '#1A1A1A',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            transform: 'rotate(6deg)',
            transformOrigin: 'center center',
          }}
          initial={{ opacity: 0, x: 100, y: 60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...shardTransition, delay: shardStagger * 2 }}
        >
          <div
            className="absolute inset-0 rounded-sm opacity-[0.04]"
            style={{
              background: 'radial-gradient(ellipse 40% 60% at 70% 40%, #fff, transparent)',
            }}
          />
        </motion.div>

        {/* Amber shard — foreground, assembles last with overshoot; CTA hover triggers pulse via amberControls */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            left: '28%',
            top: '22%',
            width: '44%',
            height: '58%',
            transform: 'rotate(2deg)',
            transformOrigin: 'center center',
          }}
          initial={{ opacity: 0, scale: 0.8, x: 40, y: 40 }}
          animate={{ opacity: 0.92, scale: 1, x: 0, y: 0 }}
          transition={{
            ...shardTransition,
            delay: shardStagger * 3,
          }}
          onAnimationComplete={() => {
            amberControls.set({ scale: 1.05 });
            amberControls.start({ scale: 1, transition: { duration: 0.25 } });
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              background: '#FBBF24',
              opacity: 0.92,
              boxShadow: '0 8px 32px rgba(251,191,36,0.25)',
              transformOrigin: 'center center',
            }}
            animate={amberControls}
          >
            {/* Refraction bubbles */}
            <span
              className="absolute rounded-full bg-white opacity-25"
              style={{ width: 6, height: 6, left: '25%', top: '30%' }}
            />
            <span
              className="absolute rounded-full bg-white opacity-25"
              style={{ width: 8, height: 8, left: '55%', top: '45%' }}
            />
            <span
              className="absolute rounded-full bg-white opacity-25"
              style={{ width: 4, height: 4, left: '70%', top: '25%' }}
            />
            <span
              className="absolute rounded-full bg-white opacity-25"
              style={{ width: 5, height: 5, left: '35%', top: '65%' }}
            />
            {/* Shimmer overlay — diagonal sweep every 10s */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                background:
                  'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.2) 55%, transparent 100%)',
                width: '60%',
                left: '-20%',
                top: 0,
                bottom: 0,
              }}
              initial={{ x: '-100%' }}
              animate={shimmerControls}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
