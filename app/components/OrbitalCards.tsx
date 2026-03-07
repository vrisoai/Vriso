'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { MonolithArtifact } from './MonolithArtifact';
import { EconomicSlab, PerformancePillar, VelocitySlab } from '@/app/components/cards';

const CARD_WIDTH = 180;
const CARD_HEIGHT = 110;
const ORBIT_RADIUS = 160;
const CONTAINER_SIZE = 500;
const CENTER = CONTAINER_SIZE / 2;

const CARD_ANGLES = [0, 120, 240].map((deg) => (deg * Math.PI) / 180);

const CARD_POSITIONS: { left: string; top: string }[] = CARD_ANGLES.map((angle) => ({
  left: `${Math.round(CENTER + ORBIT_RADIUS * Math.cos(angle) - CARD_WIDTH / 2)}px`,
  top: `${Math.round(CENTER + ORBIT_RADIUS * Math.sin(angle) - CARD_HEIGHT / 2)}px`,
}));

const cards = [
  { Component: VelocitySlab },
  { Component: EconomicSlab },
  { Component: PerformancePillar },
];

export interface OrbitalCardsRef {
  triggerAmberPulse?: () => void;
}

interface OrbitalCardsProps {
  className?: string;
  onAmberPulseRef?: (api: { triggerAmberPulse: () => void }) => void;
}

export function OrbitalCards({ className = '', onAmberPulseRef }: OrbitalCardsProps) {
  const [orbitHovered, setOrbitHovered] = useState(false);
  const duration = orbitHovered ? 18 : 9;

  const handleMouseEnter = useCallback(() => setOrbitHovered(true), []);
  const handleMouseLeave = useCallback(() => setOrbitHovered(false), []);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        minWidth: CONTAINER_SIZE,
        minHeight: CONTAINER_SIZE,
        isolation: 'isolate',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Orbital metric cards around Sovereign AI Monolith"
    >
      {/* Background glow — lowest layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 80px at ${CENTER}px ${CENTER}px, rgba(59,91,219,0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Static orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-border"
        style={{
          width: 320,
          height: 320,
          left: (CONTAINER_SIZE - 320) / 2,
          top: (CONTAINER_SIZE - 320) / 2,
          opacity: 0.5,
        }}
      />

      {/* Monolith — rendered BEFORE cards so cards always paint on top via DOM order + z-index */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: 200,
          height: 200,
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          isolation: 'isolate',
        }}
      >
        <MonolithArtifact
          width={200}
          height={200}
          onAmberPulseRef={onAmberPulseRef}
        />
      </div>

      {/* Cards orbit — LAST in DOM + z-index 10: always paints above monolith */}
      <motion.div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
          transformOrigin: `${CENTER}px ${CENTER}px`,
          zIndex: 10,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {cards.map(({ Component }, i) => {
          const pos = CARD_POSITIONS[i];
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top,
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                transformOrigin: 'center center',
                zIndex: 10,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration,
                ease: 'linear',
                repeat: Infinity,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(59,130,246,0.2)',
              }}
            >
              <Component />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
