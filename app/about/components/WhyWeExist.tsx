'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { GradientDivider } from './shared/GradientDivider';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { EASE, fadeUp } from '@/app/lib/animations';

const PARAGRAPHS = [
  {
    editorial: true,
    text: "The next wave of competitive advantage will not come from which AI tools an organization uses. It will come from how deeply AI is embedded into their infrastructure, operations, and decision-making.",
  },
  {
    editorial: false,
    text: "Most organizations are not there yet. They are running AI experiments, not AI systems. They are using models, not owning infrastructure.",
  },
  {
    editorial: false,
    text: "Invisigent exists to close that gap — helping organizations move from AI experimentation to AI infrastructure that operates reliably, scales globally, and creates durable operational advantage.",
  },
];

interface WhyWeExistProps {
  reducedMotion?: boolean;
}

export function WhyWeExist({ reducedMotion = false }: WhyWeExistProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const margin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  return (
    <section
      ref={ref}
      className="about-why overflow-x-hidden"
      style={{ background: '#121212' }}
      aria-labelledby="about-why-heading"
    >
      <div
        className="section-wrapper"
        style={{
          paddingTop: 'clamp(40px, 6vw, 80px)',
        }}
      >
        <div className="section-inner-max section-inner">
          <div className="mx-auto w-full max-w-[720px] 2xl:max-w-[960px] text-left">
            <SectionLabel text="[ OUR POSITION ]" reducedMotion={reducedMotion} />
            <motion.h2
              id="about-why-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
              variants={reducedMotion ? undefined : fadeUp}
              initial="hidden"
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: true, margin }}
            >
              Why We Exist
            </motion.h2>

            <GradientDivider
              reducedMotion={reducedMotion}
              className="mt-6 mb-8 sm:mt-8 sm:mb-10"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {PARAGRAPHS.map((p, i) => (
                <motion.div
                  key={i}
                  className={p.editorial ? 'text-pullquote' : 'text-body'}
                  style={{ position: 'relative', paddingLeft: '3rem' }}
                  variants={
                    reducedMotion
                      ? undefined
                      : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
                  }
                  initial="hidden"
                  whileInView={reducedMotion ? undefined : 'visible'}
                  viewport={{ once: true, margin }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                >
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: `calc(${p.editorial ? '1.75' : '1.8'}em / 2 - 1px)`,
                      width: '2rem',
                      height: '2px',
                      display: 'block',
                      background: 'var(--color-trust-amber)',
                      transformOrigin: 'left',
                    }}
                    initial={reducedMotion ? false : { scaleX: 0 }}
                    whileInView={reducedMotion ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, margin }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: EASE }}
                  />
                  <p
                    className={
                      p.editorial
                        ? 'font-serif font-medium leading-[1.75] text-[var(--color-text-primary)]'
                        : 'font-display leading-[1.8] text-[var(--color-text-secondary)]'
                    }
                  >
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
