'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo } from 'react';
import { EASE, FADE_UP, CARD_FADE } from '@/app/lib/animations';

const WhyVRisoCardScene = dynamic(
  () => import('./3d/WhyVRisoScenes').then((m) => ({ default: m.WhyVRisoCardScene })),
  { ssr: false },
);
const IntelligenceCore = dynamic(
  () => import('./3d/WhyVRisoScenes').then((m) => ({ default: m.IntelligenceCore })),
  { ssr: false },
);

/* ─── JSON-LD ─── */
const JSON_LD_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VRISO',
  description: 'VRISO designs AI infrastructure that organizations own, control, and scale globally.',
  url: 'https://vriso.com',
  areaServed: ['US', 'EU', 'India', 'Global'],
  serviceType: ['Enterprise AI Consulting', 'AI Infrastructure Systems', 'AI Automation Systems', 'Agent Orchestration Systems'],
};

const JSON_LD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'VRISO AI Infrastructure',
  provider: { '@type': 'Organization', name: 'VRISO' },
  description: 'Sovereign architecture, explainable AI systems, enterprise-grade security, and global deployment for AI infrastructure.',
  areaServed: ['US', 'EU', 'India', 'Global'],
};

/* ─── Card data ─── */
const CARDS = [
  {
    title: 'Sovereign Architecture',
    description: 'AI infrastructure designed for ownership, not vendor dependency.',
  },
  {
    title: 'Explainable AI Systems',
    description: 'Transparent reasoning layers that allow organizations to audit and trust autonomous systems.',
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Infrastructure engineered with built-in governance, security, and enterprise protection.',
  },
  {
    title: 'Global Deployment',
    description: 'AI systems designed to scale across regions, teams, and operational environments.',
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
      className="relative w-full overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="why-vriso-heading"
    >
      <Script id="why-vriso-org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_ORG)}
      </Script>
      <Script id="why-vriso-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_SERVICE)}
      </Script>

      {/* Neural particles */}
      <NeuralParticles visible={sectionInView} />

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
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 720,
            marginInline: 'auto',
          }}
        >
          <motion.p
            className="font-mono"
            style={{
              fontSize: 12,
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
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 4vw, 50px)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginTop: 'clamp(20px, 3vw, 32px)',
              color: 'var(--color-text-primary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
          >
            Why Organizations Choose{' '}
            <span className="gradient-text">VRISO</span>
          </motion.h2>

          <motion.p
            className="font-serif"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 1.7,
              maxWidth: 680,
              marginTop: 'clamp(18px, 2.5vw, 28px)',
              color: 'var(--color-text-secondary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={2}
          >
            VRISO designs AI infrastructure that organizations own, control, and scale globally.
            From sovereign architecture to agent orchestration, every system is built for durability,
            transparency, and enterprise-grade reliability.
          </motion.p>
        </header>

        {/* ── Grid: cards + 3D core ── */}
        <div className="relative" style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
          <motion.div
            className="grid gap-6 sm:grid-cols-2"
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
            {/* Row 1: Card 1, Card 2 */}
            {[0, 1].map((i) => (
            <motion.article
              key={i}
              className="glass-card"
              style={{
                gridColumn: i === 0 ? 1 : 2,
                gridRow: 1,
                padding: 'clamp(24px, 2.5vw, 32px)',
              }}
              variants={CARD_FADE}
              onMouseEnter={handleEnter(i)}
              onMouseLeave={handleLeave}
              onMouseMove={handleCardMouseMove}
              aria-label={CARDS[i].title}
            >
              <WhyVRisoCardScene variant={i} hovered={hoveredCard === i} />
              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  fontWeight: 600,
                  marginTop: 16,
                  color: 'var(--color-text-primary)',
                }}
              >
                {CARDS[i].title}
              </h3>
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  lineHeight: 1.7,
                  marginTop: 8,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {CARDS[i].description}
              </p>
            </motion.article>
          ))}

            {/* Row 2: 3D Intelligence Core */}
            <motion.div
              className="relative col-span-1 sm:col-span-2 flex items-center justify-center"
              style={{ gridRow: 2, minHeight: 280 }}
              variants={CARD_FADE}
            >
              <IntelligenceCore cardHovered={hoveredCard} />
            </motion.div>

          {/* Row 3: Card 3, Card 4 */}
          {[2, 3].map((i) => (
            <motion.article
              key={i}
              className="glass-card"
              style={{
                gridColumn: i === 2 ? 1 : 2,
                gridRow: 3,
                padding: 'clamp(24px, 2.5vw, 32px)',
              }}
              variants={CARD_FADE}
              onMouseEnter={handleEnter(i)}
              onMouseLeave={handleLeave}
              onMouseMove={handleCardMouseMove}
              aria-label={CARDS[i].title}
            >
              <WhyVRisoCardScene variant={i} hovered={hoveredCard === i} />
              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  fontWeight: 600,
                  marginTop: 16,
                  color: 'var(--color-text-primary)',
                }}
              >
                {CARDS[i].title}
              </h3>
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  lineHeight: 1.7,
                  marginTop: 8,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {CARDS[i].description}
              </p>
            </motion.article>
          ))}
          </motion.div>

          {/* Beams overlay — from cards to center, visible on hover */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
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

      {/* GEO — hidden semantic signals */}
      <div className="sr-only">
        Enterprise AI consulting. AI infrastructure systems. AI automation systems.
        Agent orchestration systems. Sovereign architecture. Explainable AI.
        Enterprise-grade security. Global deployment.
      </div>
    </section>
  );
}
