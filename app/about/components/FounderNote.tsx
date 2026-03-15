'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { fadeUp, fadeLeft, fadeRight } from '@/app/lib/animations';

interface FounderNoteProps {
  reducedMotion?: boolean;
  founderName?: string;
}

export function FounderNote({
  reducedMotion = false,
  founderName = 'Founder',
}: FounderNoteProps) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const margin = useMediaQuery('(max-width: 639px)') ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  const leftVariants = reducedMotion ? undefined : isDesktop ? fadeLeft : fadeUp;
  const rightVariants = reducedMotion ? undefined : isDesktop ? fadeRight : fadeUp;

  return (
    <section
      ref={ref}
      className="about-founder overflow-x-hidden"
      style={{ background: 'var(--color-bg-section)' }}
      aria-labelledby="about-founder-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-16">
            <motion.div
              className="md:col-span-2 md:sticky md:top-24 md:self-start xl:top-32"
              variants={leftVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <SectionLabel text="[ WHY WE STARTED ]" reducedMotion={reducedMotion} />
              <h2
                id="about-founder-heading"
                className="about-heading font-serif font-medium leading-tight text-[var(--color-text-primary)] text-section-h"
              >
                A Note from the Founder
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 md:col-span-3 sm:space-y-7"
              variants={rightVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <p className="text-body font-display leading-[1.8] text-[var(--color-text-secondary)]">
                Most organizations we spoke to had the same problem: they had access to powerful AI
                tools, but no infrastructure to run them reliably in production. Models were deployed
                into demos. Agents ran in staging environments. Knowledge systems existed in
                disconnected spreadsheets.
              </p>
              <p className="text-body font-display leading-[1.8] text-[var(--color-text-secondary)]">
                We started VRISO to fix that — to build the layer underneath the models. The
                architecture, pipelines, and orchestration systems that make AI work inside real
                organizations.
              </p>
              <blockquote
                className="text-pullquote mt-6 border-l-2 border-[var(--color-trust-amber)] pl-4 font-serif italic leading-[1.65] text-[var(--color-text-primary)] sm:mt-8 sm:pl-6"
                style={{ borderLeftWidth: 2 }}
              >
                That is still the only thing we do.
              </blockquote>
              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <hr
                  className="h-px w-10 shrink-0 border-none bg-[var(--color-trust-amber)]"
                  aria-hidden="true"
                />
                <p
                  className="text-label font-mono text-[var(--color-text-tertiary)]"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {founderName} — Founder, VRISO
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
