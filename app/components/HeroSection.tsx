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
      className="relative z-10 flex min-h-screen w-full items-center justify-center bg-bg-primary pt-12 pb-24 sm:pb-28 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36 xl:pb-40"
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 75% 50%, rgba(59,91,219,0.10) 0%, transparent 70%), var(--color-bg-primary)',
        paddingLeft: 'max(1.5rem, 5vw, env(safe-area-inset-left))',
        paddingRight: 'max(1.5rem, 5vw, env(safe-area-inset-right))',
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

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 pb-24 md:flex-row md:gap-10 md:pb-28 lg:gap-12 lg:pb-32"
           style={{
             paddingLeft: 'max(1rem, 4vw)',
             paddingRight: 'max(1rem, 4vw)',
           }}>
        {/* Left column — copy */}
        <div className="flex w-full flex-col items-start justify-center gap-8 md:w-[60%]">
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
            className="max-w-xl text-[18px] text-text-secondary md:text-2xl font-serif"
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

        {/* Right column — orbital cards around central monolith */}
        <div className="relative flex w-full justify-center md:w-[40%] md:flex-none">
          <div
            className="origin-center scale-[0.65] md:scale-[0.72] lg:scale-[0.82] xl:scale-[0.92] 2xl:scale-100"
            style={{ width: 500, height: 500, minWidth: 500, minHeight: 500 }}
          >
            <OrbitalCards onAmberPulseRef={setAmberPulseRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
