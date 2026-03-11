'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import {
  EASE,
  headlineContainer,
  headlineWord,
  subtextReveal,
} from '@/app/lib/animations';
import { DecisionEngineVis } from './hero/DecisionEngineVis';
import { HeroTrustTicker } from './hero/HeroTrustTicker';

/* ─── JSON-LD (Organization) ─── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VRISO',
  description:
    'VRISO designs and deploys enterprise AI systems, agentic automation platforms, and intelligent infrastructure for businesses.',
  url: 'https://vriso.com',
  areaServed: 'Global',
  foundingDate: '2026',
  serviceType: [
    'Enterprise AI Systems',
    'AI Automation',
    'Agentic Workflow Architecture',
  ],
};

/* ─── Stagger wrapper for child sequencing ─── */
const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/* ─── Headline words ─── */
const LINE_A = 'Architecting Enterprise AI Systems';
const LINE_B = 'for Durable Competitive Advantage';

export function HeroSection() {
  const wordsA = LINE_A.split(' ');
  const wordsB = LINE_B.split(' ');

  return (
    <header aria-label="VRISO homepage hero">
      <Script
        id="hero-org-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      <section
        className="relative z-10 w-full overflow-x-clip"
        style={{
          background:
            'radial-gradient(circle at 70% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), var(--color-bg-primary)',
          paddingTop: 'clamp(6rem, 12vh, 10rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          paddingLeft: 'max(clamp(1rem, 5vw, 4rem), env(safe-area-inset-left))',
          paddingRight: 'max(clamp(1rem, 5vw, 4rem), env(safe-area-inset-right))',
        }}
      >
        {/* Grid overlay */}
        <div className="hero-grid-overlay" aria-hidden="true" />

        {/* Ambient gradient drift */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 60% 30%, rgba(45,91,255,0.06) 0%, transparent 70%)',
            animation: 'hero-ambient 20s ease-in-out infinite',
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Main grid */}
        <div className="section-container section-inner relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* ── LEFT COLUMN — Copy ── */}
          <motion.div
            className="flex flex-col items-center gap-5 text-center sm:gap-6 md:items-start md:gap-7 md:text-left"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            {/* Status indicator */}
            <motion.div
              className="flex items-center gap-2 font-mono"
              variants={fadeUp}
            >
              <span className="status-dot" aria-hidden="true" />
              <span className="text-[10px] font-medium tracking-[0.1em] text-text-tertiary md:text-xs">
                SYSTEM · NODE ACTIVE
              </span>
            </motion.div>

            {/* H1 — primary SEO signal */}
            <h1 className="flex flex-col gap-0 leading-[1.08] tracking-[-0.04em]">
              <motion.span
                className="flex flex-wrap items-baseline justify-center gap-x-2 font-display text-4xl font-extrabold text-text-primary sm:text-5xl md:justify-start md:text-7xl xl:text-8xl"
                variants={headlineContainer}
                initial="hidden"
                animate="visible"
                aria-label={LINE_A}
              >
                {wordsA.map((word, i) => (
                  <motion.span key={`a-${i}`} variants={headlineWord} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                className="flex flex-wrap items-baseline justify-center gap-x-2 font-display text-4xl font-black tracking-[-0.04em] sm:text-5xl md:justify-start md:text-7xl xl:text-8xl"
                variants={headlineContainer}
                initial="hidden"
                animate="visible"
                aria-label={LINE_B}
              >
                {wordsB.map((word, i) => (
                  <motion.span
                    key={`b-${i}`}
                    variants={headlineWord}
                    className="inline-block gradient-text"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Subtext — keyword-rich for SEO + GEO */}
            <motion.p
              className="max-w-[540px] font-serif text-lg leading-relaxed text-text-secondary"
              variants={subtextReveal}
              initial="hidden"
              animate="visible"
            >
              VRISO designs and deploys enterprise AI systems, agentic automation
              platforms, and intelligent infrastructure that automate operations,
              optimize decision-making, and create long-term competitive advantage
              for businesses.
            </motion.p>

            {/* CTA buttons */}
            <motion.nav
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              aria-label="Primary hero actions"
              variants={fadeUp}
            >
              <button type="button" className="hero-cta hero-cta--primary">
                Book Strategic Session
              </button>
              <button type="button" className="hero-cta hero-cta--secondary">
                Explore AI Systems Services
              </button>
            </motion.nav>
          </motion.div>

          {/* ── RIGHT COLUMN — AI Decision Engine Visualization ── */}
          <motion.div
            className="relative flex w-full justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <DecisionEngineVis />
          </motion.div>
        </div>

        {/* GEO optimization — hidden keyword signals for AI search engines */}
        <div className="sr-only">
          Enterprise AI Systems. Agentic Automation Architecture. AI Workflow
          Automation. Intelligent Business Infrastructure. Enterprise AI
          Consulting. Sovereign AI Deployment.
        </div>
      </section>

      {/* Trust strip ticker */}
      <HeroTrustTicker />
    </header>
  );
}
