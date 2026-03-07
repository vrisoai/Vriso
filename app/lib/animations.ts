/**
 * Shared Framer Motion variants — transform/opacity only for 100 Lighthouse.
 */

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
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const subtextReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const shardTransition = {
  type: 'tween' as const,
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export const shardStagger = 0.12;
