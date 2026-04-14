'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { EASE, fadeUp } from '@/app/lib/animations';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

const HERO_WORDS = [
  { text: 'Building', accent: false, gradient: false },
  { text: 'the', accent: false, gradient: false },
  { text: 'Infrastructure', accent: true, gradient: false },
  { text: 'Behind', accent: false, gradient: false },
  { text: 'Enterprise', accent: false, gradient: true },
  { text: 'AI', accent: false, gradient: true },
];

const wordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
  }),
};

interface HeroSectionProps {
  reducedMotion?: boolean;
}

export function HeroSection({ reducedMotion = false }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const inViewMargin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin: inViewMargin });

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
      },
    }),
    []
  );

  const headingVariants = isMobile || reducedMotion ? fadeUp : containerVariants;
  const wordAnimationVariants = isMobile || reducedMotion ? undefined : wordVariants;

  return (
    <section
      ref={ref}
      className="about-hero flex min-h-0 w-full flex-col items-center justify-center overflow-x-clip px-4 py-16 sm:px-[var(--section-px)] sm:py-24"
      style={{
        height: '100%',
        background: 'var(--color-bg-primary)',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,91,255,0.06) 0%, transparent 60%)',
      }}
      aria-labelledby="about-hero-heading"
    >
      <div className="section-container mx-auto flex w-full max-w-[1152px] 2xl:max-w-[1400px] min-[1920px]:max-w-[1680px] flex-col items-center text-center">
        <motion.p
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={inView && !reducedMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
          className="section-label"
        >
          [ ABOUT INVISIGENT ]
        </motion.p>

        <motion.h1
          id="about-hero-heading"
          className="about-heading font-serif font-semibold leading-[1.1] text-[var(--color-text-primary)] text-hero mx-auto max-w-[900px] 2xl:max-w-[1200px]"
          variants={reducedMotion ? undefined : headingVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {isMobile || reducedMotion ? (
            <span className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              {HERO_WORDS.map((w, i) => (
                <span
                  key={`${w.text}-${i}`}
                  style={{
                    color: w.accent
                      ? 'var(--color-trust-amber)'
                      : undefined,
                    background: w.gradient ? 'var(--gradient-headline)' : undefined,
                    WebkitBackgroundClip: w.gradient ? 'text' : undefined,
                    WebkitTextFillColor: w.gradient ? 'transparent' : undefined,
                    backgroundClip: w.gradient ? 'text' : undefined,
                  }}
                >
                  {w.text}
                </span>
              ))}
            </span>
          ) : (
            <span className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              {HERO_WORDS.map((w, i) => (
                <motion.span
                  key={`${w.text}-${i}`}
                  variants={wordAnimationVariants}
                  custom={i}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.25em',
                    color: w.accent
                      ? 'var(--color-trust-amber)'
                      : undefined,
                    background: w.gradient ? 'var(--gradient-headline)' : undefined,
                    WebkitBackgroundClip: w.gradient ? 'text' : undefined,
                    WebkitTextFillColor: w.gradient ? 'transparent' : undefined,
                    backgroundClip: w.gradient ? 'text' : undefined,
                  }}
                >
                  {w.text}
                </motion.span>
              ))}
            </span>
          )}
        </motion.h1>

        <motion.p
          className="about-description text-body mx-auto max-w-[600px] 2xl:max-w-[780px] font-display leading-[1.75] text-[var(--color-text-secondary)]"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView && !reducedMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          Invisigent designs scalable AI systems, automation architectures, and intelligent
          infrastructure for organizations building production AI capabilities. We work with
          leadership teams to design systems their organizations own, operate, and scale — not
          rent.
        </motion.p>

        {/* <motion.p
          className="about-description-tight text-label font-mono tracking-wider text-[var(--color-text-tertiary)]"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={inView && !reducedMotion ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
        >
          Founded in Jaipur. Built for global enterprise AI systems.
        </motion.p> */}

        <motion.div
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 flex flex-col items-center gap-1 sm:bottom-8"
          style={{ transform: 'translateX(-50%)' }}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={inView && !reducedMotion ? { opacity: 1 } : undefined}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-trust-amber)]"
            animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-[var(--color-text-tertiary)]"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
