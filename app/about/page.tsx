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

export default function AboutPage() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="about-page overflow-x-hidden">
      <HeroSection reducedMotion={reducedMotion} />
      <PhilosophySection reducedMotion={reducedMotion} />
      <WhyWeExist reducedMotion={reducedMotion} />
      <HowWeBuild reducedMotion={reducedMotion} />
      <OurFocus reducedMotion={reducedMotion} />
      <GlobalContext reducedMotion={reducedMotion} />
      <AboutCTA reducedMotion={reducedMotion} />
    </main>
  );
}
