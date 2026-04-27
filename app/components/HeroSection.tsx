'use client';

import { useRef } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import {
  EASE,
  subtextReveal,
} from '@/app/lib/animations';
import { DecisionEngineVis } from './hero/DecisionEngineVis';
import { HeroTrustTicker } from './hero/HeroTrustTicker';
import MagneticButton from './MagneticButton';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, ScrollTrigger);

/* ─── JSON-LD (Organization) ─── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Invisigent',
  description:
    'Invisigent designs and deploys enterprise AI systems, agentic automation platforms, and intelligent infrastructure for businesses.',
  url: 'https://invisigent.ai',
  areaServed: 'Global',
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
const LINE_A = 'Architecting Production AI Systems';
const LINE_B = "for Enterprises That Can't Afford to Fail";

export function HeroSection({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'div' }) {
  const HeadingTag    = headingLevel;
  const wordsB        = LINE_B.split(' ');
  const heroRef       = useRef<HTMLElement>(null);
  const statusRef     = useRef<HTMLSpanElement>(null);
  const leftParaRef   = useRef<HTMLDivElement>(null);
  const rightParaRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── ScrambleText: status badge ── */
    gsap.to(statusRef.current, {
      duration: 1.8,
      scrambleText: {
        text: 'SYSTEM · NODE ACTIVE',
        chars: '01!@#XYZ▓▒░',
        revealDelay: 0.35,
        speed: 0.45,
      },
      delay: 0.3,
      ease: 'none',
    });

    /* ── ScrollTrigger parallax: desktop only (lg = 1024px+) ── */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Scroll distance that covers the hero (until content slides fully over it)
      const scrollEnd = () => window.innerHeight * 0.85;

      // Left column — copy exits upward faster than the page scroll
      gsap.to(leftParaRef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: scrollEnd,
          scrub: 0.7,
        },
      });

      // Right column — visualization drifts up slower, fades and shrinks
      gsap.to(rightParaRef.current, {
        yPercent: -10,
        scale: 0.9,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: scrollEnd,
          scrub: 1.1,
        },
      });
    });

    return () => mm.revert();
  }, { scope: heroRef });

  return (
    <header aria-label="Invisigent homepage hero">
      <Script
        id="hero-org-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      <section
        ref={heroRef}
        className="home-hero relative z-10 flex w-full items-center overflow-x-clip"
        style={{
          background:
            'radial-gradient(circle at 70% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), var(--color-bg-primary)',
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
        <div className="section-container section-inner relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[55fr_45fr] lg:gap-16">
          {/* ── LEFT COLUMN — Copy ── */}
          {/* Outer div: owned by GSAP (parallax scroll-out) */}
          {/* Inner motion.div: owned by Framer Motion (entrance stagger) */}
          {/* Separate layers avoids transform conflicts between the two libraries */}
          <div ref={leftParaRef} style={{ willChange: 'transform' }}>
          <motion.div
            className="flex flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:gap-7 lg:text-left"
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
              <span
                ref={statusRef}
                className="text-[10px] font-medium tracking-[0.1em] text-text-tertiary md:text-xs"
              >
                SYSTEM · NODE ACTIVE
              </span>
            </motion.div>

            {/* H1 — primary SEO signal + LCP element.
                Rendered as static HTML (no opacity:0 initial state) so the
                browser counts it as LCP at FCP time (~1.8 s) instead of
                waiting for JS hydration + Framer Motion animation (~5 s).
                headingLevel="div" used for the duplicate mobile render to
                avoid two <h1> tags in the HTML source. */}
            <HeadingTag
              className="hero-headline flex flex-col gap-0 tracking-[-0.04em]"
              style={{ lineHeight: 1.05 }}
              {...(headingLevel === 'div' ? { 'aria-hidden': true } : {})}
            >
              <span
                className="flex flex-wrap items-baseline justify-center gap-x-2 font-display font-extrabold text-text-primary md:justify-start"
                style={{ fontSize: 'clamp(2rem, min(5vw, 6.8svh), 4.25rem)' }}
              >
                {LINE_A}
              </span>
              <span
                className="flex flex-wrap items-baseline justify-center gap-x-2 font-display font-black md:justify-start"
                style={{ fontSize: 'clamp(2rem, min(5vw, 6.8svh), 4.25rem)' }}
              >
                {wordsB.map((word, i) => (
                  <span key={`b-${i}`} className="inline-block gradient-text">
                    {word}
                  </span>
                ))}
              </span>
            </HeadingTag>

            {/* Subtext — keyword-rich for SEO + GEO */}
            <motion.p
              className="max-w-[540px] xl:max-w-[700px] 2xl:max-w-[900px] font-serif text-base leading-relaxed text-text-primary/75 md:text-lg"
              variants={subtextReveal}
              initial="hidden"
              animate="visible"
            >
              Invisigent is a founder-led AI infrastructure practice. We design multi-agent orchestration systems, RAG knowledge pipelines,
              and compliance ready AI architecture  and hand you infrastructure your team owns and operates, not a black box you depend on us to maintain.
            </motion.p>

            {/* CTA buttons */}
            <motion.nav
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
              aria-label="Primary hero actions"
              variants={fadeUp}
            >
              <MagneticButton
                type="button"
                primary
                className="hero-cta hero-cta--primary w-full sm:w-auto"
              >
                Book Strategic Session
              </MagneticButton>
              <MagneticButton
                type="button"
                className="hero-cta hero-cta--secondary w-full sm:w-auto"
              >
                Explore AI Systems
              </MagneticButton>
            </motion.nav>
          </motion.div>
          </div>{/* /leftParaRef */}

          {/* ── RIGHT COLUMN — AI Decision Engine Visualization ── */}
          <div ref={rightParaRef} className="hidden lg:block" style={{ willChange: 'transform, opacity' }}>
          <motion.div
            className="relative flex w-full items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 'min(100%, clamp(280px, 34vw, 460px))',
                aspectRatio: '1',
              }}
            >
              <DecisionEngineVis />
            </div>
          </motion.div>
          </div>{/* /rightParaRef */}
        </div>

        {/* GEO optimization — hidden keyword signals for AI search engines */}
        <div className="sr-only">
          Enterprise AI Systems. Agentic Automation Architecture. AI Workflow
          Automation. Intelligent Business Infrastructure. Enterprise AI
          Consulting. Sovereign AI Deployment.
        </div>

        {/* Trust strip ticker (absolute so it doesn't add extra scroll height) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <HeroTrustTicker />
        </div>
      </section>
    </header>
  );
}
