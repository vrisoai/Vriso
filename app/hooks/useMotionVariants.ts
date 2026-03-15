'use client';

import { useReducedMotion } from 'framer-motion';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerSlow,
} from '@/app/lib/animations';

const instant = { hidden: {}, visible: {} };

/**
 * Returns animation variants that respect prefers-reduced-motion.
 * When reduced motion is requested, returns no-op variants so content shows in final state.
 */
export function useMotionVariants() {
  const prefersReduced = useReducedMotion();
  return prefersReduced
    ? {
        fadeUp: instant,
        fadeLeft: instant,
        fadeRight: instant,
        scaleIn: instant,
        staggerContainer: instant,
        staggerSlow: instant,
      }
    : {
        fadeUp,
        fadeLeft,
        fadeRight,
        scaleIn,
        staggerContainer,
        staggerSlow,
      };
}
