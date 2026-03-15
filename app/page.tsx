'use client';

import { motion } from 'framer-motion';
import {
  HeroSection,
  ValueProposition,
  CoreServices,
  WhyVRISO,
  HowWeWork,
  StrategicCTASection,
  VrisoLogoSection,
  FooterSection,
} from '@/app/components';
import { EASE } from '@/app/lib/animations';

const sectionReveal = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <ValueProposition />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <CoreServices />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <WhyVRISO />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <HowWeWork />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <StrategicCTASection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <VrisoLogoSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
      >
        <FooterSection />
      </motion.div>
    </main>
  );
}
