'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { EASE, fadeUp } from '@/app/lib/animations';

const STEPS = [
  {
    num: '01',
    label: 'DISCOVERY_PHASE',
    title: 'Discovery & AI Strategy',
    body: "We analyze your existing infrastructure, data environment, and operational priorities to identify where AI systems can deliver real business impact — and where they won't.",
  },
  {
    num: '02',
    label: 'ARCHITECTURE_DESIGN',
    title: 'Architecture Design',
    body: 'Our team designs the full system architecture — orchestration layers, knowledge retrieval pipelines, automation frameworks, and infrastructure required for production AI systems.',
  },
  {
    num: '03',
    label: 'DEPLOYMENT_INTEGRATION',
    title: 'Deployment & Integration',
    body: 'Systems are deployed directly into production environments with security controls, monitoring infrastructure, and operational safeguards implemented from the start — not retrofitted after launch.',
  },
  {
    num: '04',
    label: 'OPTIMIZATION_SCALING',
    title: 'Optimization & Scaling',
    body: 'After deployment, systems are continuously monitored, optimized for performance, and scaled as usage grows — ensuring long-term reliability and operational stability with defined SLAs.',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

interface HowWeBuildProps {
  reducedMotion?: boolean;
}

export function HowWeBuild({ reducedMotion = false }: HowWeBuildProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const margin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  return (
    <section
      ref={ref}
      className="about-how overflow-x-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
      aria-labelledby="about-how-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">
          {/* Grid: 2 columns from md (768px). Left: heading. Right: steps. No third column. */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12 lg:gap-16 2xl:gap-20 min-[1920px]:gap-28">
            {/* LEFT COLUMN: heading + intro */}
            <motion.div
              className="mb-10 md:col-span-2 md:mb-0 md:sticky md:top-24 md:self-start xl:top-32"
              variants={reducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <SectionLabel text="[ OUR PROCESS ]" reducedMotion={reducedMotion} />
              <h2
                id="about-how-heading"
                className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
              >
                How We Build
              </h2>
              <p className="about-description text-body font-display text-[var(--color-text-secondary)]" style={{ lineHeight: 1.75 }}>
                Every engagement follows a four-phase process — from understanding your environment
                to optimizing systems already running in production.
              </p>
            </motion.div>

            {/* RIGHT COLUMN: steps — position relative so connecting line is positioned here */}
            <div className="relative md:col-span-3">
              {/* Connecting line: runs through center of dots. left = half dot width (7px for 15px, 9px for 18px). zIndex 0 so dots sit on top. */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[7px] sm:left-[9px] w-px z-0"
                style={{
                  borderLeft: '1px dashed rgba(251, 191, 36, 0.3)',
                }}
              />

              <motion.div
                className="flex flex-col gap-8 sm:gap-10"
                variants={reducedMotion ? undefined : stagger}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    className="relative flex gap-4 sm:gap-6"
                    variants={
                      reducedMotion
                        ? undefined
                        : { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }
                    }
                    transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                  >
                    {/* Dot: on top of line, background #121212 punches through dashed line, zIndex 2 */}
                    <div
                      className="flex-shrink-0 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] rounded-full mt-[3px]"
                      style={{
                        background: '#121212',
                        border: '1.5px solid var(--color-trust-amber)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                      aria-hidden="true"
                    />

                    {/* Step content */}
                    <div className="flex-1 min-w-0 pb-2">
                      <p
                        className="text-label font-mono uppercase tracking-wider text-[var(--color-text-micro)] mb-1"
                        style={{ letterSpacing: '0.08em' }}
                      >
                        <span aria-hidden="true">{step.num} — </span>
                        {step.label}
                      </p>
                      <h3 className="text-card-title font-display font-semibold text-[var(--color-text-primary)] mb-2 sm:mb-3" style={{ lineHeight: 1.25 }}>
                        {step.title}
                      </h3>
                      <p
                        className="text-body font-display text-sm sm:text-base text-[var(--color-text-secondary)]"
                        style={{ lineHeight: 1.75, margin: 0 }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
