// about/page.tsx
'use client';

import { useReducedMotion } from 'framer-motion';
import {
  HeroSection,
  PhilosophySection,
  WhyWeExist,
  HowWeBuild,
  OurFocus,
  GlobalContext,
  AboutCTA,
} from '@/app/about/components';
import { VrisoLogoSection, FooterSection } from '@/app/components';

/**
 * Section 1: sticky hero inside a tall stage — stays pinned while you scroll through the stage.
 * Section 2: normal flow, pulled up with marginTop so it rises from the bottom and paints over the hero (z-index).
 * After the stage scrolls away, everything behaves as a normal document.
 */
const ABOUT_HERO_HEIGHT = '88svh';
/** One viewport of scroll while hero is stuck — time for Philosophy to move up over it */
const ABOUT_OVERLAP_SCROLL = '100svh';
const ABOUT_HERO_STAGE_HEIGHT = `calc(${ABOUT_HERO_HEIGHT} + ${ABOUT_OVERLAP_SCROLL})`;

export default function AboutPage() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="about-page" style={{ position: 'relative' }}>
      {/* Stage: tall enough that sticky hero has room to stay pinned while user scrolls */}
      <div
        style={{
          position: 'relative',
          zIndex: 0,
          height: ABOUT_HERO_STAGE_HEIGHT,
        }}
      >
        <div
          id="hero"
          style={{
            position: 'sticky',
            top: 0,
            height: ABOUT_HERO_HEIGHT,
            width: '100%',
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <HeroSection reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Philosophy: flows after the stage but pulled up by 100svh so it meets the viewport bottom, then scrolls over the stuck hero */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: `-${ABOUT_OVERLAP_SCROLL}`,
          borderRadius: '20px 20px 0 0',
          background: '#1a1a1a',
          boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.6)',
        }}
      >
        <PhilosophySection reducedMotion={reducedMotion} />
      </div>

      <WhyWeExist reducedMotion={reducedMotion} />
      <HowWeBuild reducedMotion={reducedMotion} />
      <OurFocus reducedMotion={reducedMotion} />
      <GlobalContext reducedMotion={reducedMotion} />
      <AboutCTA reducedMotion={reducedMotion} />
      <VrisoLogoSection />
      <FooterSection />
    </main>
  );
}
