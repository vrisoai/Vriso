'use client';

import Script from 'next/script';
import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeadline, OrbitalCards } from '@/app/components';
import { subtextReveal } from '@/app/lib/animations';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ConsultingService',
  name: 'Vriso AI',
  description:
    'Architecting enterprise AI systems for durable advantage We design production-grade AI infrastructure that turns adoption into measurable, owned outcomes.',
  serviceType: 'Enterprise AI Strategy & Infrastructure',
  areaServed: ['US', 'EU'],
  offers: {
    '@type': 'Offer',
    name: 'Strategic Audit',
    description:
      'Request a Strategic Audit to map your path from AI experimentation to Durable Advantage a Valuable, Rare, Inimitable, and Organized AI system outcome.',
  },
};

export function HeroSection() {
  const amberPulseRef = useRef<{ triggerAmberPulse: () => void } | null>(null);

  const handleCtaMouseEnter = useCallback(() => {
    amberPulseRef.current?.triggerAmberPulse();
  }, []);

  const setAmberPulseRef = useCallback((api: { triggerAmberPulse: () => void }) => {
    amberPulseRef.current = api;
  }, []);

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center justify-start bg-bg-primary pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-screen md:flex-row md:items-center md:justify-center md:pt-32 md:pb-28 lg:pt-36 lg:pb-32 xl:pb-36"
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 75% 50%, rgba(59,91,219,0.10) 0%, transparent 70%), var(--color-bg-primary)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
        overflowX: 'clip',
      }}
      aria-label="Vriso AI hero"
    >
      <Script
        id="hero-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      <div className="section-container flex flex-col items-center gap-8 text-center sm:gap-10 md:flex-row md:items-center md:gap-10 md:text-left lg:gap-12"
           style={{
             paddingLeft: 'max(1rem, clamp(1rem, 4vw, 3rem))',
             paddingRight: 'max(1rem, clamp(1rem, 4vw, 3rem))',
           }}>
        {/* Left column — copy */}
        <div className="flex w-full flex-col items-center justify-center gap-6 sm:gap-8 md:w-[60%] md:items-start">
          {/* System status badge */}
          <div className="flex items-center gap-2 font-mono">
            <span
              className="h-3 w-3 rounded-full bg-trust-amber"
              style={{ animation: 'status-pulse 2s ease-in-out infinite' }}
              aria-hidden
            />
            <span className="text-[10px] font-medium tracking-[0.1em] text-text-tertiary md:text-xs">
              SYSTEM · NODE ACTIVE
            </span>
          </div>

          <AnimatedHeadline />

          <motion.p
            className="max-w-xl text-[16px] text-text-secondary sm:text-[18px] md:text-2xl font-serif"
            variants={subtextReveal}
            initial="hidden"
            animate="visible"
          >
            From fragmented experimentation to production grade AI infrastructure, we design systems that turn
            adoption into measurable, owned outcomes.
          </motion.p>

          <button
            type="button"
            className="group relative w-full cursor-pointer rounded-full text-xs font-medium uppercase tracking-[0.08em] text-btn-text transition-all duration-200 ease-out hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-action-accent focus-visible:outline-offset-3 md:w-auto md:text-sm"
            style={{
              background: 'var(--color-btn-bg)',
              border: '1px solid var(--color-btn-border)',
              padding: '0.75rem 2.75rem',
            }}
            onClick={() => {}}
            onMouseEnter={(e) => {
              handleCtaMouseEnter();
              const el = e.currentTarget;
              el.style.background = 'var(--color-btn-hover-bg)';
              el.style.borderColor = 'var(--color-action-accent)';
              el.style.boxShadow = '0 0 24px rgba(45,91,255,0.25), 0 0 48px rgba(55,65,81,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'var(--color-btn-bg)';
              el.style.borderColor = 'var(--color-btn-border)';
              el.style.boxShadow = 'none';
            }}
            onFocus={handleCtaMouseEnter}
          >
            Request Strategic Audit
          </button>
        </div>

        {/* Right column — orbital cards, visible on all sizes.
            Negative my cancels the dead layout space left by transform:scale
            formula: -(500 * (1 - scale) / 2)
            0.48 → -130px | 0.58 → -105px | md+ → 0 (desktop row layout) */}
        <div className="relative flex w-full min-w-0 justify-center md:w-[40%] md:flex-none">
          <div
            className="orbital-scaler origin-center
              -my-[63px] scale-[0.75]
              sm:-my-[45px] sm:scale-[0.82]
              md:my-0 md:scale-[0.72]
              lg:scale-[0.82]
              xl:scale-[0.92]"
            style={{ width: 500, height: 500 }}
          >
            <OrbitalCards onAmberPulseRef={setAmberPulseRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
