'use client';

import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { EASE, ITEM } from '@/app/lib/animations';

/* ─── Sovereign Intelligence Core (inlined to avoid Webpack module resolution) ─── */
const UI_PANELS = [
  { label: 'AGENT ORCHESTRATION', delay: 0 },
  { label: 'KNOWLEDGE INDEX', delay: 0.5 },
  { label: 'AUTOMATION ENGINE', delay: 1 },
] as const;

function CubeFace({ transform, faceBase }: { transform: string; faceBase: React.CSSProperties }) {
  return (
    <div style={{ ...faceBase, transform }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} aria-hidden>
        <defs>
          <linearGradient id="strategic-neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-link)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-trust-amber)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <line x1="20" y1="50" x2="50" y2="30" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <line x1="50" y1="30" x2="80" y2="50" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <line x1="80" y1="50" x2="50" y2="70" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <line x1="50" y1="70" x2="20" y2="50" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <line x1="50" y1="30" x2="50" y2="70" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="url(#strategic-neural-grad)" strokeWidth="0.5" className="strategic-cta-neural-line" />
        <circle cx="50" cy="50" r="4" fill="var(--color-trust-amber)" className="strategic-cta-neural-core" />
        <circle cx="20" cy="50" r="2" fill="var(--color-link)" opacity={0.8} />
        <circle cx="80" cy="50" r="2" fill="var(--color-link)" opacity={0.8} />
        <circle cx="50" cy="30" r="2" fill="var(--color-link)" opacity={0.8} />
        <circle cx="50" cy="70" r="2" fill="var(--color-link)" opacity={0.8} />
      </svg>
      <motion.div
        className="strategic-cta-core-glow"
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        animate={{ boxShadow: ['inset 0 0 20px rgba(59,91,219,0.2)', 'inset 0 0 35px rgba(59,91,219,0.3)', 'inset 0 0 20px rgba(59,91,219,0.2)'] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(59,91,219,0.4)' }} />
      </motion.div>
    </div>
  );
}

function SovereignIntelligenceCore({ inView, ctaHovered }: { inView: boolean; ctaHovered: boolean }) {
  const SIZE = 180;
  const HALF = SIZE / 2;
  const faceBase: React.CSSProperties = {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    backfaceVisibility: 'hidden',
    border: '1px solid rgba(59, 91, 219, 0.4)',
    background: 'rgba(31, 31, 31, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };
  return (
    <div className="strategic-cta-core" aria-hidden="true">
      <div className="strategic-cta-orbit" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="strategic-cta-orbit-node" />
        ))}
      </div>
      <div className="flex items-center justify-center" style={{ perspective: 900, perspectiveOrigin: '50% 40%' }}>
        <motion.div
          className="strategic-cta-cube"
          style={{ width: SIZE, height: SIZE, position: 'relative', transformStyle: 'preserve-3d' }}
          initial={{ rotateY: 0, rotateX: 10 }}
          animate={inView ? { rotateY: [0, 360], rotateX: 10 } : { rotateY: 0, rotateX: 10 }}
          transition={{ rotateY: { duration: ctaHovered ? 12 : 18, ease: 'linear', repeat: Infinity } }}
        >
          <CubeFace faceBase={faceBase} transform={`translateZ(${HALF}px)`} />
          <CubeFace faceBase={faceBase} transform={`rotateY(180deg) translateZ(${HALF}px)`} />
          <CubeFace faceBase={faceBase} transform={`rotateY(-90deg) translateZ(${HALF}px)`} />
          <CubeFace faceBase={faceBase} transform={`rotateY(90deg) translateZ(${HALF}px)`} />
          <CubeFace faceBase={faceBase} transform={`rotateX(-90deg) translateZ(${HALF}px)`} />
          <CubeFace faceBase={faceBase} transform={`rotateX(90deg) translateZ(${HALF}px)`} />
        </motion.div>
      </div>
      <div className="strategic-cta-glow" aria-hidden="true" />
      {/* Panels on top layer — z-index ensures they're never hidden behind the cube */}
      <div className="strategic-cta-panels-layer">
        {UI_PANELS.map((panel, i) => (
          <motion.div
            key={panel.label}
            className="strategic-cta-panel glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.5 + panel.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              ...(i === 0 && { top: '2%', left: '-18%' }),
              ...(i === 1 && { top: '50%', right: '-22%', transform: 'translateY(-50%)' }),
              ...(i === 2 && { bottom: '2%', left: '-15%' }),
            }}
          >
            <span className="font-mono text-[9px] sm:text-[10px]" style={{ letterSpacing: '0.12em', color: 'var(--color-text-tertiary)' }}>{panel.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const CTA_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/* ─── JSON-LD ─── */
const JSON_LD_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VRISO',
  description: 'VRISO is an enterprise AI infrastructure consulting firm that designs sovereign AI systems and agent orchestration architecture for global organizations.',
};

const JSON_LD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Enterprise AI Infrastructure Consulting',
  provider: { '@type': 'Organization', name: 'VRISO' },
  description: 'VRISO designs sovereign AI systems, agent orchestration systems, and AI automation architecture for enterprise AI transformation strategy.',
  areaServed: ['United States', 'European Union', 'India', 'Global'],
};

const JSON_LD_RESERVE = {
  '@context': 'https://schema.org',
  '@type': 'ReserveAction',
  name: 'Discuss Your AI Architecture',
  provider: { '@type': 'Organization', name: 'VRISO' },
  description: 'Discuss your AI architecture with VRISO for enterprise AI infrastructure consulting.',
  areaServed: ['United States', 'European Union', 'India', 'Global'],
};

/* ─── Trust signals ─── */
const TRUST_SIGNALS = [
  'Enterprise Engagements — Limited to 4 per Quarter',
  'VRISO Framework — Strategic Systems Architecture',
  'Compliance Ready — GDPR / SOC2 / DPDP',
] as const;

/* ─── Neural particles ─── */
const PARTICLES = [
  { x: 20, y: 15, delay: 0, duration: 9 },
  { x: 85, y: 25, delay: 1.2, duration: 10 },
  { x: 45, y: 70, delay: 2, duration: 8 },
  { x: 70, y: 55, delay: 0.8, duration: 11 },
  { x: 15, y: 50, delay: 1.5, duration: 9 },
  { x: 90, y: 40, delay: 2.5, duration: 10 },
];

function NeuralParticles({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
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
          r={0.35}
          fill="var(--color-link)"
          opacity={0.1}
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

/* ─── Main component ─── */
export default function StrategicCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [ctaHovered, setCtaHovered] = useState(false);

  const handleCtaEnter = useCallback(() => setCtaHovered(true), []);
  const handleCtaLeave = useCallback(() => setCtaHovered(false), []);

  return (
    <section
      className="relative w-full overflow-x-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(100px, 12vw, 160px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="strategic-cta-heading"
    >
      <Script id="strategic-cta-org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_ORG)}
      </Script>
      <Script id="strategic-cta-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_SERVICE)}
      </Script>
      <Script id="strategic-cta-reserve-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_RESERVE)}
      </Script>

      {/* Neural particles */}
      <NeuralParticles visible={inView} />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(59,91,219,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-grid-overlay" aria-hidden="true" />

      <div ref={sectionRef} className="section-container section-inner relative">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* ═══ LEFT COLUMN ═══ */}
          <motion.div
            className="flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left"
            variants={CTA_STAGGER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Section label */}
            <motion.div
              variants={ITEM}
              className="section-label flex items-center gap-4"
              style={{ paddingLeft: 10 }}
            >
              <p
                className="font-mono text-text-tertiary"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                [ STRATEGIC ACTIVATION ]
              </p>
              <div className="flex items-center gap-1.5">
                <span className="status-dot-sm shrink-0" aria-hidden />
                <span
                  className="font-mono text-text-tertiary"
                  style={{ fontSize: 10, letterSpacing: '0.1em' }}
                >
                  NODE READY
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="strategic-cta-heading"
              variants={ITEM}
              className="font-serif text-text-primary"
              style={{
                marginTop: 'clamp(20px, 3vw, 28px)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Build Your{' '}
              <span style={{ color: 'var(--color-trust-amber)' }}>Enterprise AI</span>{' '}
              Infrastructure
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={ITEM}
              className="font-serif text-text-secondary"
              style={{
                marginTop: 'clamp(16px, 2.5vw, 24px)',
                maxWidth: 560,
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                lineHeight: 1.7,
              }}
            >
              Competitive advantage no longer comes from simply using AI tools.
              It comes from building AI systems that integrate with your infrastructure, data, and operations.
              <br />
              <br />
              VRISO partners with leadership teams to design scalable AI architectures, automation
              platforms, and intelligent systems that create long-term operational advantage.
            </motion.p>

            {/* CTA intro + Buttons */}
            <motion.p
              variants={ITEM}
              className="font-serif text-text-secondary"
              style={{
                marginTop: 'clamp(20px, 2.5vw, 28px)',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                lineHeight: 1.6,
              }}
            >
              Discuss your AI architecture with VRISO.
            </motion.p>
            <motion.div
              variants={ITEM}
              className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
              style={{ marginTop: 'clamp(20px, 3vw, 28px)', marginBottom: 'clamp(28px, 4vw, 48px)' }}
            >
              <button
                type="button"
                className="strategic-cta-btn-primary"
                onMouseEnter={handleCtaEnter}
                onMouseLeave={handleCtaLeave}
                aria-label="Discuss your AI architecture with VRISO"
              >
                Discuss Your AI Architecture
              </button>
              <button
                type="button"
                className="strategic-cta-btn-secondary"
                aria-label="Explore the VRISO Framework"
              >
                Explore VRISO Framework
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={ITEM}
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
            >
              {TRUST_SIGNALS.map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <span className="status-dot-sm shrink-0" aria-hidden />
                  <span
                    className="font-mono text-text-tertiary"
                    style={{ fontSize: 10, letterSpacing: '0.06em' }}
                  >
                    {signal}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Sovereign Intelligence Core ═══ */}
          <motion.div
            className="relative flex shrink-0 items-center justify-center"
            style={{ width: 280, height: 280 }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <SovereignIntelligenceCore inView={inView} ctaHovered={ctaHovered} />
          </motion.div>
        </div>
      </div>

      {/* SEO — hidden semantic signals */}
      <div className="sr-only">
        VRISO is an enterprise AI infrastructure consulting firm that designs scalable AI
        architectures, automation platforms, and intelligent systems. Enterprise AI infrastructure.
        Discuss your AI architecture. Explore the VRISO Framework.
      </div>
    </section>
  );
}
