/**
 * Shared Framer Motion variants — used across sections 1–6.
 * Easing: [0.22, 1, 0.36, 1] (cubic-bezier)
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const headlineWord = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE },
  },
};

export const subtextReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: EASE },
  },
};

export const shardTransition = {
  type: 'tween' as const,
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export const shardStagger = 0.12;

/* ──────────────────────────────────────────────────────────────────────────
 * Section variants (FragmentationRisk, OutcomeVault, AgenticOrchestration,
 * StrategicCTA, IntelligenceEcosystem)
 * ────────────────────────────────────────────────────────────────────────── */

export const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

export const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const DIVIDER_REVEAL = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: EASE },
  },
};

export const ACCENT_BAR = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const CARD_FADE = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const GRID_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const NODE_REVEAL = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const COLUMN_LEFT = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.7, ease: EASE },
      opacity: { duration: 0.5, ease: 'easeOut' },
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const COLUMN_RIGHT = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.7, delay: 0.1, ease: EASE },
      opacity: { duration: 0.5, delay: 0.1, ease: 'easeOut' },
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

export const ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/* ──────────────────────────────────────────────────────────────────────────
 * About page v2 — named variants for useMotionVariants
 * ────────────────────────────────────────────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
