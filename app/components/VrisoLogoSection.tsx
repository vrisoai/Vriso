'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VrisoLogo } from './VrisoLogo';

export function VrisoLogoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="vriso-logo-section overflow-hidden bg-bg-primary py-12 md:py-16"
      aria-label="VRISO brand"
    >
      <div className="section-container section-inner flex w-full items-center justify-center">
        <motion.div
          className="vriso-logo-section__inner max-w-full min-w-0"
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VrisoLogo size="full" />
        </motion.div>
      </div>
    </section>
  );
}
