'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

interface AmberBarProps {
  reducedMotion?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AmberBar({ reducedMotion = false, className = '', style }: AmberBarProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={reducedMotion ? false : { scaleY: 0, opacity: 0 }}
      whileInView={reducedMotion ? false : { scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={className}
      style={{
        width: 3,
        height: '100%',
        minHeight: 24,
        background: 'var(--color-trust-amber)',
        borderRadius: 2,
        transformOrigin: 'top',
        position: 'absolute',
        left: -16,
        ...style,
      }}
    />
  );
}
