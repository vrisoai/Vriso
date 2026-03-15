'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

interface GradientDividerProps {
  reducedMotion?: boolean;
  className?: string;
}

export function GradientDivider({ reducedMotion = false, className = '' }: GradientDividerProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={reducedMotion ? false : { scaleX: 0 }}
      whileInView={reducedMotion ? false : { scaleX: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className={className}
      style={{
        height: 1,
        background: 'var(--gradient-divider)',
        margin: '0 auto',
        width: '100%',
        maxWidth: 800,
        transformOrigin: 'center',
      }}
    />
  );
}
