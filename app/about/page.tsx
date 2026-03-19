'use client';

import { useEffect, useRef } from 'react';
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

export default function AboutPage() {
  const reducedMotion = useReducedMotion() ?? false;
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = stickyRef.current;
    const hero = document.getElementById('hero');
    if (!wrapper || !hero) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const rect = wrapper.getBoundingClientRect();
        const vh = Math.max(1, window.visualViewport?.height ?? window.innerHeight);
        // progress: 0 at top of wrapper, 1 after scrolling 1 viewport height
        const p = Math.min(1, Math.max(0, -rect.top / vh));
        wrapper.style.setProperty('--about-sheet-progress', String(p));
        hero.style.transform = `scale(${(1 - 0.05 * p).toFixed(4)})`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="about-page overflow-x-hidden">
      <div id="sticky-wrapper" ref={stickyRef}>
        <HeroSection reducedMotion={reducedMotion} />
        <PhilosophySection reducedMotion={reducedMotion} />
      </div>
      <WhyWeExist reducedMotion={reducedMotion} />
      <HowWeBuild reducedMotion={reducedMotion} />
      <OurFocus reducedMotion={reducedMotion} />
      <GlobalContext reducedMotion={reducedMotion} />
      <AboutCTA reducedMotion={reducedMotion} />
    </main>
  );
}
