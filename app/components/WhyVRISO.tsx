'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo } from 'react';
import { EASE, FADE_UP, CARD_FADE } from '@/app/lib/animations';

const WhyVRisoCardScene = dynamic(() => import('./3d/WhyVRisoCardSceneWrapper'), { ssr: false });
const IntelligenceCore = dynamic(() => import('./3d/IntelligenceCoreWrapper'), { ssr: false });

/* ─── JSON-LD ─── */
const JSON_LD_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VRISO',
  description: 'VRISO builds AI systems your team owns, your security team approves, and your operations team can run at scale. Most AI projects stall because the infrastructure wasn\'t built for production.',
  url: 'https://vriso.com',
  areaServed: ['US', 'EU', 'India', 'Global'],
  serviceType: ['Enterprise AI Consulting', 'AI Infrastructure Systems', 'AI Automation Systems', 'Agent Orchestration Systems'],
};

const JSON_LD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'VRISO AI Infrastructure',
  provider: { '@type': 'Organization', name: 'VRISO' },
  description: 'AI infrastructure designed for production: you own your stack, every decision is auditable, built to pass security review, and scaled for real workloads.',
  areaServed: ['US', 'EU', 'India', 'Global'],
};

/* ─── Card data ─── */
const CARDS = [
  {
    label: '[ INDEPENDENCE ]',
    title: 'You Own Your AI Stack',
    description: 'Architectures designed to avoid vendor lock-in so your organization keeps full control of its AI infrastructure.',
  },
  {
    label: '[ TRANSPARENCY ]',
    title: 'Every Decision Is Auditable',
    description: 'AI systems designed with traceability and explainability so teams can monitor, audit, and trust automated decisions.',
  },
  {
    label: '[ SECURITY ]',
    title: 'Built to Pass Security Review',
    description: 'Infrastructure engineered with governance, access control, and enterprise security requirements built in from the start.',
  },
  {
    label: '[ SCALE ]',
    title: 'Designed for Production, Not Demos',
    description: 'AI systems built for real workloads — capable of scaling across teams, infrastructure environments, and global operations.',
  },
];

/* ─── Deterministic neural particles (hydration-safe) ─── */
const PARTICLES: { x: number; y: number; delay: number; duration: number }[] = [
  { x: 10, y: 15, delay: 0, duration: 8 },
  { x: 85, y: 20, delay: 1.2, duration: 10 },
  { x: 25, y: 70, delay: 2.5, duration: 9 },
  { x: 70, y: 65, delay: 0.8, duration: 11 },
  { x: 50, y: 40, delay: 1.8, duration: 7 },
  { x: 15, y: 50, delay: 3, duration: 12 },
  { x: 90, y: 45, delay: 2, duration: 9 },
  { x: 35, y: 25, delay: 1.5, duration: 10 },
  { x: 60, y: 80, delay: 0.5, duration: 8 },
  { x: 5, y: 85, delay: 2.2, duration: 11 },
  { x: 95, y: 10, delay: 1, duration: 9 },
];

/* ─── Beam endpoints (card center → core center) in viewBox % ─── */
const BEAM_POSITIONS = [
  { from: { x: 25, y: 22 }, to: { x: 50, y: 50 } },
  { from: { x: 75, y: 22 }, to: { x: 50, y: 50 } },
  { from: { x: 25, y: 78 }, to: { x: 50, y: 50 } },
  { from: { x: 75, y: 78 }, to: { x: 50, y: 50 } },
];

/* ─── Neural particles background ─── */
function NeuralParticles({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: EASE }}
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <circle
          key={i}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={0.4}
          fill="var(--color-link)"
          opacity={0.15}
          style={{
            animation: 'why-neural-float 8s ease-in-out infinite',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </motion.svg>
  );
}

/* ─── Component ─── */
export function WhyVRISO() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const handleEnter = useCallback((i: number) => () => setHoveredCard(i), []);
  const handleLeave = useCallback(() => setHoveredCard(null), []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-vriso-section relative w-full overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(40px, 8vw, 140px)',
        paddingBottom: 'clamp(40px, 8vw, 140px)',
        paddingLeft: 'max(clamp(0.75rem, 3vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(0.75rem, 3vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="why-vriso-heading"
    >
      <Script id="why-vriso-org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_ORG)}
      </Script>
      <Script id="why-vriso-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_SERVICE)}
      </Script>

      {/* Neural particles — desktop only for mobile performance */}
      <div className="hidden sm:block">
        <NeuralParticles visible={sectionInView} />
      </div>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(59,91,219,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div className="section-grid-overlay" aria-hidden="true" />

      <div className="section-container section-inner relative">
        {/* ── Header ── */}
        <header className="why-vriso-header">
          <motion.p
            className="font-mono text-[11px] sm:text-xs"
            style={{
              letterSpacing: '0.14em',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0}
          >
            [ WHY VRISO ]
          </motion.p>

          <motion.h2
            id="why-vriso-heading"
            className="font-serif text-2xl sm:text-4xl md:text-5xl"
            style={{
              fontWeight: 500,
              lineHeight: 1.2,
              marginTop: 'clamp(12px, 2vw, 32px)',
              color: 'var(--color-text-primary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
          >
            Why Organizations Partner With{' '}
            <span className="gradient-text">VRISO</span>
          </motion.h2>

          <motion.div
            className="font-serif text-sm sm:text-base md:text-lg why-vriso-desc"
            style={{
              lineHeight: 1.7,
              maxWidth: 680,
              marginTop: 'clamp(12px, 2vw, 28px)',
              color: 'var(--color-text-secondary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={2}
          >
            <p>
              Most AI projects stall — not because the technology fails, but because the infrastructure wasn&apos;t built for production.
            </p>
            <p style={{ marginTop: '1em' }}>
              VRISO builds AI systems your team owns, your security team approves, and your operations team can actually run at scale.
            </p>
          </motion.div>
        </header>

        {/* ── Cards: flex column on mobile, 2x2 grid with core on desktop ── */}
        <div className="relative mt-16 sm:mt-14 md:mt-20">
          {/* Mobile: simple flex column, 4 cards */}
          <motion.div
            className="flex flex-col gap-5 sm:hidden"
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
          >
            {CARDS.map((card, i) => (
              <motion.article
                key={card.title}
                className="why-vriso-card-mobile glass-card"
                variants={CARD_FADE}
                aria-label={card.title}
              >
                {card.label && (
                  <p className="font-mono text-[11px] sm:text-xs mb-2" style={{ letterSpacing: '0.12em', fontWeight: 500, color: 'var(--color-text-tertiary)' }}>
                    {card.label}
                  </p>
                )}
                <h3 className="why-vriso-card-mobile__title">{card.title}</h3>
                <p className="why-vriso-card-mobile__desc">{card.description}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* Desktop: grid with 3D core */}
          <motion.div
            className="hidden sm:grid sm:grid-cols-2 sm:gap-6"
            style={{
              gridTemplateRows: 'auto auto auto',
              position: 'relative',
              zIndex: 1,
            }}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
          >
            {[0, 1].map((i) => (
              <motion.article
                key={CARDS[i].title}
                className={`glass-card ${i === 0 ? 'sm:col-start-1' : 'sm:col-start-2'} sm:row-start-1`}
                style={{ padding: 'clamp(24px, 2.5vw, 32px)' }}
                variants={CARD_FADE}
                onMouseEnter={handleEnter(i)}
                onMouseLeave={handleLeave}
                onMouseMove={handleCardMouseMove}
                aria-label={CARDS[i].title}
              >
                {CARDS[i].label && (
                  <p className="font-mono text-[10px] sm:text-xs" style={{ letterSpacing: '0.12em', fontWeight: 500, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
                    {CARDS[i].label}
                  </p>
                )}
                <div style={{ height: 140 }}>
                  <WhyVRisoCardScene variant={i} hovered={hoveredCard === i} />
                </div>
                <h3 className="font-serif mt-4" style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {CARDS[i].title}
                </h3>
                <p className="font-serif mt-2" style={{ fontSize: 'clamp(14px, 1vw, 16px)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                  {CARDS[i].description}
                </p>
              </motion.article>
            ))}
            <motion.div
              className="relative col-span-2 flex items-center justify-center sm:row-start-2 h-70"
              variants={CARD_FADE}
            >
              <IntelligenceCore cardHovered={hoveredCard} />
            </motion.div>
            {[2, 3].map((i) => (
              <motion.article
                key={CARDS[i].title}
                className={`glass-card ${i === 2 ? 'sm:col-start-1' : 'sm:col-start-2'} sm:row-start-3`}
                style={{ padding: 'clamp(24px, 2.5vw, 32px)' }}
                variants={CARD_FADE}
                onMouseEnter={handleEnter(i)}
                onMouseLeave={handleLeave}
                onMouseMove={handleCardMouseMove}
                aria-label={CARDS[i].title}
              >
                {CARDS[i].label && (
                  <p className="font-mono text-[10px] sm:text-xs" style={{ letterSpacing: '0.12em', fontWeight: 500, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
                    {CARDS[i].label}
                  </p>
                )}
                <div style={{ height: 140 }}>
                  <WhyVRisoCardScene variant={i} hovered={hoveredCard === i} />
                </div>
                <h3 className="font-serif mt-4" style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {CARDS[i].title}
                </h3>
                <p className="font-serif mt-2" style={{ fontSize: 'clamp(14px, 1vw, 16px)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                  {CARDS[i].description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          {/* Beams overlay — from cards to center, visible on hover (desktop only) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 5 }}
            aria-hidden="true"
          >
            {BEAM_POSITIONS.map((beam, i) => (
              <motion.line
                key={i}
                x1={`${beam.from.x}%`}
                y1={`${beam.from.y}%`}
                x2={`${beam.to.x}%`}
                y2={`${beam.to.y}%`}
                stroke="var(--color-action-accent)"
                strokeWidth={0.2}
                strokeDasharray="2 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === i ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* SEO — hidden semantic signals */}
      <div className="sr-only">
        Why partner with VRISO. You own your AI stack. Vendor lock-in avoided.
        Every decision auditable. Traceability and explainability. Built to pass security review.
        Designed for production. AI systems at scale.
      </div>
    </section>
  );
}
