'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/* ─────────────────────────── Animation variants ─────────────────────────── */

const SCAN_DURATION = 1.4;
const AMBER_GLOW_DURATION = 0.8;
const PULSE_DOT_DURATION = 0.5;
const CYCLE_DURATION = 6;

interface VrisoLogoProps {
  /** 'sm' for navbar, 'lg' for hero/display, 'full' for section 7 */
  size?: 'sm' | 'lg' | 'full';
}

const SCAN_END = { sm: 32, lg: 122, full: 360 } as const;

export function VrisoLogo({ size = 'sm' }: VrisoLogoProps) {
  const scanControls = useAnimation();
  const amberGlowControls = useAnimation();
  const pulseDotControls = useAnimation();

  useEffect(() => {
    const end = SCAN_END[size === 'full' ? 'full' : size === 'lg' ? 'lg' : 'sm'];
    const runCycle = async () => {
      while (true) {
        // 1. Scan beam: left → right
        await scanControls.start({
          x: ['-2px', `${end}px`],
          transition: { duration: SCAN_DURATION, ease: 'easeInOut' },
        });
        scanControls.set({ x: '-2px' });

        // 2. Amber core glow + pulse dot (parallel)
        amberGlowControls.start({
          opacity: [0, 0.4, 0],
          transition: { duration: AMBER_GLOW_DURATION, ease: 'easeOut' },
        });
        pulseDotControls.start({
          opacity: [0, 1, 0],
          transition: { duration: PULSE_DOT_DURATION, ease: 'easeOut' },
        });

        // 3. Wait for cycle to complete
        const remaining = CYCLE_DURATION - SCAN_DURATION - AMBER_GLOW_DURATION;
        await new Promise((r) => setTimeout(r, remaining * 1000));
      }
    };
    runCycle();
  }, [size, scanControls, amberGlowControls, pulseDotControls]);

  return (
    <div className="flex items-center gap-3">
      {/* VRIS text */}
      <span
        className="font-display font-medium tracking-[0.08em]"
        style={{
          fontSize:
            size === 'full'
              ? 'clamp(72px, 12vw, 160px)'
              : size === 'lg'
                ? 'clamp(42px, 6vw, 72px)'
                : 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        VRIS
      </span>

      {/* Pill "O" */}
      <motion.div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full backdrop-blur-[20px] ${
          size === 'full'
            ? 'h-16 w-[200px] sm:h-20 sm:w-[280px] md:h-24 md:w-[360px]'
            : size === 'lg'
              ? 'w-[90px] h-9 sm:w-[120px] sm:h-11'
              : 'w-7 h-2.5 sm:w-8 sm:h-3'
        }`}
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 0 18px rgba(255,255,255,0.06)',
        }}
        initial={false}
        animate={{
          scaleX: [1, 1.12, 1],
        }}
        transition={{
          scaleX: {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.18)',
          boxShadow: '0 0 20px rgba(251,191,36,0.2)',
        }}
      >
        {/* Inner radial highlight (left side) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 0% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        {/* Top reflection */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-1/2"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
            borderRadius: '999px 999px 0 0',
          }}
          aria-hidden
        />

        {/* Blue scan beam — 2px wide, 8px blur glow, travels left→right */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            left: 0,
            background: '#3B82F6',
            boxShadow: '0 0 8px #3B82F6',
            width: 2,
          }}
          animate={scanControls}
        />

        {/* Amber core glow (after scan) */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(251,191,36,0.4) 0%, transparent 70%)',
            opacity: 0,
          }}
          animate={amberGlowControls}
          aria-hidden
        />

        {/* Amber pulse dot (0.5s after scan) */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust-amber"
          style={{
            boxShadow: '0 0 8px rgba(251,191,36,0.6)',
            opacity: 0,
          }}
          animate={pulseDotControls}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
