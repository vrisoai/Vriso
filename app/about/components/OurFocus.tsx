'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { AnimatedCard } from './shared/AnimatedCard';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { fadeUp, fadeLeft, fadeRight, CARD_FADE } from '@/app/lib/animations';

const FOCUS_CARDS = [
  { tag: 'ORCH', number: '01', title: 'Agent Orchestration', body: 'Multi-agent systems that coordinate tasks, automate workflows, and enable complex AI-driven operations at enterprise scale.' },
  { tag: 'AUTO', number: '02', title: 'AI Automation Infrastructure', body: 'End-to-end automation pipelines designed for reliability, performance, and production deployment.' },
  { tag: 'KNOW', number: '03', title: 'Enterprise Knowledge Systems', body: 'AI retrieval pipelines and knowledge architectures that allow systems to access internal data and deliver accurate, context-aware answers.' },
  { tag: 'PROD', number: '04', title: 'AI-Native Product Architecture', body: 'Infrastructure for AI-first products, copilots, and intelligent platforms designed for scalable deployment.' },
];

interface OurFocusProps {
  reducedMotion?: boolean;
}

export function OurFocus({ reducedMotion = false }: OurFocusProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const margin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  const cardVariants = (i: number) => {
    if (reducedMotion) return undefined;
    if (isMobile) return CARD_FADE;
    const delay = i >= 2 ? 0.15 : 0;
    if (i === 0 || i === 2) return { ...fadeLeft, visible: { ...fadeLeft.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } } };
    return { ...fadeRight, visible: { ...fadeRight.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } } };
  };

  return (
    <section
      ref={ref}
      className="about-focus overflow-x-hidden"
      style={{ background: 'var(--color-bg-section)' }}
      aria-labelledby="about-focus-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">
          <div className="text-center">
            <SectionLabel text="[ WHAT WE BUILD ]" reducedMotion={reducedMotion} />
            <motion.h2
              id="about-focus-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
              variants={reducedMotion ? undefined : fadeUp}
              initial="hidden"
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: true, margin }}
            >
              Our Focus Areas
            </motion.h2>
            <motion.p
              className="about-description text-body mx-auto max-w-[560px] font-display leading-[1.75] text-[var(--color-text-secondary)]"
              variants={reducedMotion ? undefined : fadeUp}
              initial="hidden"
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: true, margin }}
              custom={1}
            >
              VRISO specialises in four categories of enterprise AI infrastructure.
            </motion.p>
          </div>

          <motion.div
            className="about-block-spacing grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:gap-8"
            variants={
              reducedMotion
                ? undefined
                : { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }
            }
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {FOCUS_CARDS.map((card, i) => (
              <AnimatedCard
                key={card.title}
                topBorder="blue"
                number={card.number}
                variants={cardVariants(i)}
                className="relative group"
              >
                <span
                  className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-micro)] transition-colors duration-300 group-hover:text-[var(--color-trust-amber)] sm:right-4 sm:top-4"
                  aria-hidden="true"
                >
                  {card.tag}
                </span>
                <h3 className="text-card-title font-display font-semibold text-[var(--color-text-primary)] mb-2 pr-10 sm:mb-3 sm:pr-12">
                  {card.title}
                </h3>
                <p className="text-body font-display leading-[1.7] text-[var(--color-text-secondary)]">
                  {card.body}
                </p>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
