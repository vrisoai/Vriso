'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo } from 'react';
import { EASE, FADE_UP, GRID_STAGGER, CARD_FADE } from '@/app/lib/animations';

const CoreServiceScene = dynamic(
  () =>
    import('./3d/CoreServiceScenes').then((m) => ({
      default: m.CoreServiceScene,
    })),
  { ssr: false },
);

/* ─── JSON-LD ─── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Organization', name: 'VRISO' },
  serviceType: 'Enterprise AI Systems',
  description:
    'VRISO builds the infrastructure layer for enterprise AI — from sovereign architecture and agent orchestration to global compliance and machine-indexed systems.',
  areaServed: ['US', 'EU', 'India'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Core Services',
    itemListElement: [
      { '@type': 'Offer', name: 'Sovereign AI Architecture', description: 'Design private AI infrastructure that organizations fully own, control, and scale without vendor dependency.' },
      { '@type': 'Offer', name: 'Agentic Orchestration', description: 'Deploy intelligent agents that autonomously execute business workflows across operations, finance, and compliance.' },
      { '@type': 'Offer', name: 'Enterprise Automation Systems', description: 'Automate mission-critical workflows with intelligent decision systems and adaptive automation.' },
      { '@type': 'Offer', name: 'AI Technology Consulting', description: 'Strategic consulting for organizations adopting AI infrastructure, automation systems, and intelligent enterprise platforms.' },
      { '@type': 'Offer', name: 'Enterprise Knowledge Intelligence', description: 'Convert fragmented organizational knowledge into AI-ready intelligence layers for decision systems.' },
      { '@type': 'Offer', name: 'Machine Experience Optimization', description: 'Structure digital infrastructure for discoverability by AI agents, search models, and autonomous systems.' },
    ],
  },
};

/* ─── Card data ─── */
const CARDS = [
  {
    label: '[ SOVEREIGNTY ]',
    title: 'Sovereign AI Architecture',
    description:
      'Design private AI infrastructure that organizations fully own, control, and scale without vendor dependency.',
  },
  {
    label: '[ ORCHESTRATION ]',
    title: 'Agentic Orchestration',
    description:
      'Deploy intelligent agents that autonomously execute business workflows across operations, finance, and compliance.',
  },
  {
    label: '[ AUTOMATION ]',
    title: 'Enterprise Automation Systems',
    description:
      'Automate mission-critical workflows with intelligent decision systems and adaptive automation.',
  },
  {
    label: '[ CONSULTING ]',
    title: 'AI Technology Consulting',
    description:
      'Strategic consulting for organizations adopting AI infrastructure, automation systems, and intelligent enterprise platforms.',
  },
  {
    label: '[ KNOWLEDGE ]',
    title: 'Enterprise Knowledge Intelligence',
    description:
      'Convert fragmented organizational knowledge into AI-ready intelligence layers for decision systems.',
  },
  {
    label: '[ MX-OPTIMIZATION ]',
    title: 'Machine Experience Optimization',
    description:
      'Structure digital infrastructure for discoverability by AI agents, search models, and autonomous systems.',
  },
];

/* ─── Neural network background SVG (deterministic for hydration) ─── */
const NEURAL_NODES: { x: number; y: number }[] = [
  { x: 12, y: 18 }, { x: 28, y: 8 }, { x: 45, y: 22 }, { x: 62, y: 12 }, { x: 78, y: 28 },
  { x: 18, y: 42 }, { x: 35, y: 55 }, { x: 52, y: 48 }, { x: 68, y: 58 }, { x: 85, y: 45 },
  { x: 8, y: 72 }, { x: 25, y: 85 }, { x: 42, y: 78 }, { x: 58, y: 88 }, { x: 75, y: 72 },
  { x: 92, y: 55 }, { x: 15, y: 35 }, { x: 88, y: 18 },
];

const NEURAL_EDGES = (() => {
  const result: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NEURAL_NODES.length; i++) {
    for (let j = i + 1; j < NEURAL_NODES.length; j++) {
      const dx = NEURAL_NODES[i].x - NEURAL_NODES[j].x;
      const dy = NEURAL_NODES[i].y - NEURAL_NODES[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 35) {
        result.push({
          x1: NEURAL_NODES[i].x, y1: NEURAL_NODES[i].y,
          x2: NEURAL_NODES[j].x, y2: NEURAL_NODES[j].y,
        });
      }
    }
  }
  return result;
})();

function NeuralNetworkBg({ visible }: { visible: boolean }) {

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
      {NEURAL_EDGES.map((e, i) => (
        <line
          key={i}
          x1={`${e.x1}%`}
          y1={`${e.y1}%`}
          x2={`${e.x2}%`}
          y2={`${e.y2}%`}
          stroke="var(--color-action-accent)"
          strokeWidth={0.15}
          opacity={0.12}
        />
      ))}
      {NEURAL_NODES.map((n, i) => (
        <circle
          key={i}
          cx={`${n.x}%`}
          cy={`${n.y}%`}
          r={0.3}
          fill="var(--color-link)"
          opacity={0.2}
        />
      ))}
    </motion.svg>
  );
}

/* ─── Component ─── */
export function CoreServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
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
      aria-labelledby="core-services-heading"
    >
      <Script
        id="core-services-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      {/* Neural network background */}
      <NeuralNetworkBg visible={sectionInView} />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(59,91,219,0.06) 0%, transparent 70%)',
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
            [ CORE SERVICES ]
          </motion.p>

          <motion.h2
            id="core-services-heading"
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
            Infrastructure for{' '}
            <span className="gradient-text">Sovereign AI Systems</span>
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
            VRISO builds the infrastructure layer for enterprise AI — from
            sovereign architecture and agent orchestration to global compliance
            and machine-indexed systems.
          </motion.p>
        </header>

        {/* ── Cards grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={GRID_STAGGER}
        >
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              className="glass-card flex flex-col"
              style={{
                padding: 'clamp(24px, 2.5vw, 32px)',
                borderTop: `1px solid ${i % 2 === 0 ? 'var(--color-trust-amber)' : '#3B5BDB'}`,
              }}
              variants={CARD_FADE}
              onMouseEnter={handleEnter(i)}
              onMouseLeave={handleLeave}
              onMouseMove={handleCardMouseMove}
              aria-label={card.title}
            >
              {/* 3D scene */}
              <CoreServiceScene variant={i} hovered={hoveredCard === i} />

              {/* Label */}
              <p
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                  color: 'var(--color-text-micro)',
                  borderLeft: '2px solid var(--color-trust-amber)',
                  paddingLeft: 10,
                  marginTop: 20,
                }}
              >
                {card.label}
              </p>

              {/* Title */}
              <h3
                className="font-serif cs-card-title"
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginTop: 12,
                  color: 'var(--color-text-primary)',
                  transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  lineHeight: 1.7,
                  marginTop: 10,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {card.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* GEO — hidden semantic signals */}
      <div className="sr-only">
        Sovereign AI Architecture. Agentic Orchestration. Enterprise Automation
        Systems. AI Technology Consulting. Enterprise Knowledge Intelligence.
        Machine Experience Optimization. Enterprise AI consulting.
      </div>
    </section>
  );
}
