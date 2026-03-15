'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useCallback, type ReactNode } from 'react';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

type TopBorder = 'amber' | 'blue';

interface AnimatedCardProps {
  children: ReactNode;
  topBorder?: TopBorder;
  className?: string;
  number?: string;
  variants?: { hidden: object; visible: object };
}

export function AnimatedCard({
  children,
  topBorder = 'amber',
  className = '',
  number,
  variants,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasHover = useMediaQuery('(hover: hover)');
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasHover) return;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        });
        rafRef.current = null;
      });
    },
    [hasHover]
  );

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, active: false }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hasHover ? { y: -2 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`card-base card-${topBorder} about-card ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {hasHover && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(45,91,255,0.08), transparent 70%)`,
            opacity: spotlight.active ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}
      {number !== undefined && (
        <span className="about-card-number" aria-hidden="true">
          {number}
        </span>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}
