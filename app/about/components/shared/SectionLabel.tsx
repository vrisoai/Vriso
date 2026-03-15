'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/app/lib/animations';

interface SectionLabelProps {
  text: string;
  className?: string;
  reducedMotion?: boolean;
}

export function SectionLabel({
  text,
  className = '',
  reducedMotion = false,
}: SectionLabelProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, x: -12 }}
      whileInView={reducedMotion ? false : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`section-label ${className}`}
    >
      {text}
    </motion.div>
  );
}
