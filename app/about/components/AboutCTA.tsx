'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionLabel } from './shared/SectionLabel';
import { MagneticLinkButton } from './shared/MagneticLinkButton';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { EASE, fadeUp, fadeLeft, fadeRight } from '@/app/lib/animations';

interface AboutCTAProps {
  reducedMotion?: boolean;
}

export function AboutCTA({ reducedMotion = false }: AboutCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const margin = isMobile ? '-40px 0px' : '-80px 0px';
  const inView = useInView(ref, { once: true, margin });

  return (
    <section
      ref={ref}
      className="about-cta overflow-x-hidden"
      style={{
        background: '#121212',
        backgroundImage:
          'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(45,91,255,0.05) 0%, transparent 60%)',
      }}
      aria-labelledby="about-cta-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner flex flex-col items-center text-center">
          <motion.div
            className="mx-auto w-full max-w-[640px] 2xl:max-w-[860px] text-center"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={inView && !reducedMotion ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel text="[ LET'S BUILD ]" reducedMotion={reducedMotion} />
            <h2
              id="about-cta-heading"
              className="about-heading text-section-h font-serif font-semibold leading-[1.15] text-[var(--color-text-primary)]"
            >
              {isMobile || reducedMotion ? (
                <motion.span
                  className="block"
                  variants={reducedMotion ? undefined : fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  Ready to Build Your AI Infrastructure?
                </motion.span>
              ) : (
                <>
                  <motion.span
                    className="block"
                    variants={reducedMotion ? undefined : fadeLeft}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.6 }}
                  >
                    Ready to Build Your
                  </motion.span>
                  <motion.span
                    className="block"
                    variants={reducedMotion ? undefined : fadeRight}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.6, delay: 0.05 }}
                  >
                    AI Infrastructure?
                  </motion.span>
                </>
              )}
            </h2>
            <p className="about-description text-body mx-auto max-w-[480px] 2xl:max-w-[640px] font-display leading-[1.75] text-[var(--color-text-secondary)]">
              If your organization is ready to move from AI experimentation to production-ready AI
              systems, we would like to hear about what you are building.
            </p>
            <div className="about-block-spacing flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <MagneticLinkButton
                href="/contact"
                primary
                className="btn-base btn-primary w-full sm:w-auto"
                ariaLabel="Discuss your AI architecture with Invisigent"
              >
                Discuss Your AI Architecture
              </MagneticLinkButton>
              <MagneticLinkButton
                href="/#how-we-work"
                className="btn-base btn-secondary w-full sm:w-auto"
                ariaLabel="See how we work"
              >
                See How We Work
              </MagneticLinkButton>
            </div>
            <p
              className="about-description text-label flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[var(--color-text-micro)] sm:gap-x-4"
              style={{ letterSpacing: '0.06em' }}
              aria-hidden="true"
            >
              <span className="text-[var(--color-trust-amber)]">●</span>
              EU AI Act · GDPR · SOC2 · DPDP
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
