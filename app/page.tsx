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
      {/* ── DESKTOP (lg+): sticky hero cover ── */}
      <div className="hidden lg:block">
        <div className="sticky-hero-wrapper">
          <HeroSection />
        </div>

        <div className="content-over-hero">
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
        </div>
      </div>

      {/* ── MOBILE/TABLET (<lg): simple stack (no sticky) ── */}
      <div className="block lg:hidden">
        <HeroSection />
        <div
          style={{
            background: 'var(--color-bg-section)',
            borderRadius: '20px 20px 0 0',
            borderTop: '1px solid rgba(251, 191, 36, 0.15)',
            marginTop: '-20px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
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
        </div>
      </div>
    </main>
  );
}
