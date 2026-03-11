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
      className="flex w-full items-center justify-center bg-bg-primary py-12 md:py-16"
      aria-label="VRISO brand"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <VrisoLogo size="full" />
      </motion.div>
    </section>
  );
}
