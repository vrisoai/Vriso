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

/** Mobile: sticky hero fills viewport below nav; stage adds scroll room so section 2 slides over (matches lg+ behavior). */
const NAV = 'var(--nav-h, 64px)';
const HOME_MOBILE_HERO_H = `calc(100svh - ${NAV})`;
const HOME_MOBILE_STAGE_H = `calc(200svh - ${NAV})`;
/** Pull content up so its top sits at 100svh — first paint is hero only, then scroll reveals overlap */
const HOME_MOBILE_CONTENT_MARGIN = `calc(${NAV} - 100svh)`;

export default function Home() {
  return (
    <main className="home-page" style={{ position: 'relative' }}>
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

      {/* ── MOBILE/TABLET (<lg): sticky hero + content slides over (no overflow:hidden on main — breaks sticky) ── */}
      <div className="block lg:hidden" style={{ position: 'relative' }}>
        <div
          className="home-mobile-hero-stage"
          style={{
            position: 'relative',
            zIndex: 0,
            height: HOME_MOBILE_STAGE_H,
          }}
        >
          <div
            id="home-hero-mobile"
            style={{
              position: 'sticky',
              top: NAV,
              height: HOME_MOBILE_HERO_H,
              width: '100%',
              zIndex: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <HeroSection />
            </div>
          </div>
        </div>

        <div
          className="home-mobile-content-sheet"
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: HOME_MOBILE_CONTENT_MARGIN,
            background: 'var(--color-bg-section)',
            borderRadius: '20px 20px 0 0',
            borderTop: '1px solid rgba(251, 191, 36, 0.15)',
            boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.45), 0 -1px 0 rgba(251, 191, 36, 0.08)',
            overflowX: 'clip',
          }}
        >
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <ValueProposition />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <CoreServices />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <WhyVRISO />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <HowWeWork />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <StrategicCTASection />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionReveal}
          >
            <VrisoLogoSection />
          </motion.div>
          <motion.div
            className="home-mobile-section-snap"
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
