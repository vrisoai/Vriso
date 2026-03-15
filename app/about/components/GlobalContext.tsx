'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { fadeUp, fadeLeft, fadeRight } from '@/app/lib/animations';

interface GlobalContextProps {
  reducedMotion?: boolean;
}

export function GlobalContext({ reducedMotion = false }: GlobalContextProps) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 639px)');
  const margin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  const leftVariants = reducedMotion ? undefined : isDesktop ? fadeLeft : fadeUp;
  const rightVariants = reducedMotion ? undefined : isDesktop ? fadeRight : fadeUp;

  return (
    <section
      ref={ref}
      className="about-global relative overflow-x-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
      aria-labelledby="about-global-heading"
    >
      {/* Dot-grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(251,191,36,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="section-wrapper relative">
        <div className="section-inner-max section-inner">
          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <motion.div
              variants={leftVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <SectionLabel text="[ GLOBAL PERSPECTIVE ]" reducedMotion={reducedMotion} />
              <h2
                id="about-global-heading"
                className="about-heading text-section-h font-serif font-medium leading-tight text-[var(--color-text-primary)]"
              >
                Built for Global Organizations
              </h2>
            </motion.div>
            <motion.div
              variants={rightVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <p className="text-body font-display leading-[1.8] text-[var(--color-text-secondary)]">
                Although founded in Jaipur, VRISO works with organizations building AI systems across
                global markets. Our focus is helping companies design AI infrastructure that
                integrates with modern technology stacks and scales across teams, regions, and
                operational environments without performance or compliance constraints.
              </p>
              <p
                className="about-description flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[var(--color-text-micro)] text-label sm:text-xs"
                style={{ letterSpacing: '0.08em' }}
                aria-hidden="true"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-trust-amber)]"
                  style={{
                    animation: reducedMotion ? 'none' : 'status-pulse 2s ease-in-out infinite',
                  }}
                />
                HQ // JAIPUR, INDIA · SERVING GLOBAL ENTERPRISE
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
