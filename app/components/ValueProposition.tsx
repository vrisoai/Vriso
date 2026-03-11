'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { EASE, FADE_UP } from '@/app/lib/animations';

const CardMiniScene = dynamic(
  () =>
    import('./3d/CardMiniScene').then((m) => ({
      default: m.CardMiniScene,
    })),
  { ssr: false },
);

/* ─── JSON-LD (Service) ─── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {
    '@type': 'Organization',
    name: 'VRISO',
  },
  serviceType: 'Enterprise AI Systems',
  description:
    'VRISO designs enterprise AI infrastructure, autonomous workflow systems, and AI decision intelligence platforms for organizations.',
  areaServed: 'Global',
};

/* ─── Card data ─── */
interface ValueCard {
  label: string;
  title: string;
  description: string;
}

const CARDS: ValueCard[] = [
  {
    label: '[ INFRASTRUCTURE ]',
    title: 'Enterprise AI Infrastructure',
    description:
      'We architect scalable enterprise AI infrastructure that connects models, knowledge systems, and operational workflows into a unified platform.',
  },
  {
    label: '[ AUTOMATION ]',
    title: 'Autonomous Workflow Systems',
    description:
      'VRISO builds agentic automation systems that coordinate intelligent workflows across departments, reducing operational complexity and increasing efficiency.',
  },
  {
    label: '[ INTELLIGENCE ]',
    title: 'AI Decision Engines',
    description:
      'We design AI reasoning engines that transform enterprise data into real-time strategic insights and operational intelligence.',
  },
];

/* ─── Animation variants ─── */
const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ─── Component ─── */
export function ValueProposition() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const handleCardEnter = useCallback((i: number) => () => setActiveNode(i), []);
  const handleCardLeave = useCallback(() => setActiveNode(null), []);

  return (
    <section
      className="relative w-full overflow-x-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="vriso-value-heading"
    >
      <Script
        id="vp-service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      {/* Animated AI grid overlay */}
      <div className="section-grid-overlay" aria-hidden="true" />

      <div className="section-container section-inner relative">
        {/* ── Section header ── */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 672,
            marginInline: 'auto',
          }}
        >
          {/* Label */}
          <motion.p
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.14em',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              textAlign: 'center',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0}
          >
            [ VALUE PROPOSITION ]
          </motion.p>

          {/* H2 heading */}
          <motion.h2
            id="vriso-value-heading"
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginTop: 'clamp(20px, 3vw, 32px)',
              textAlign: 'center',
              color: 'var(--color-text-primary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
          >
            <span className="gradient-text">AI Systems</span>, Not AI Experiments
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-serif"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 1.7,
              maxWidth: 680,
              marginTop: 'clamp(18px, 2.5vw, 28px)',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={2}
          >
            VRISO designs and deploys enterprise AI systems that integrate models,
            workflows, and data into unified intelligent infrastructure. Our
            platforms automate operations, orchestrate agentic workflows, and
            transform enterprise data into real-time decision intelligence.
          </motion.p>
        </header>

        {/* ── Value cards grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}
          variants={cardStagger}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {CARDS.map((card, i) => (
            <motion.article
              key={card.label}
              className="vp-card"
              variants={cardReveal}
              aria-label={card.title}
              onMouseEnter={handleCardEnter(i)}
              onMouseLeave={handleCardLeave}
            >
              {/* Signal node */}
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: 24 }}
              >
                <span className="vp-card__signal" aria-hidden="true" />
                <span className="vp-card__label">{card.label}</span>
              </div>

              {/* Title */}
              <h3 className="vp-card__title" style={{ marginBottom: 16 }}>
                {card.title}
              </h3>

              {/* Description */}
              <p className="vp-card__desc" style={{ marginBottom: 16 }}>
                {card.description}
              </p>

              {/* 3D mini scene */}
              <CardMiniScene variant={i} hovered={activeNode === i} />
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* GEO — hidden semantic keyword signals */}
      <div className="sr-only">
        Enterprise AI systems. AI infrastructure architecture. Agentic workflow
        automation. Enterprise AI consulting. AI decision intelligence platforms.
      </div>
    </section>
  );
}
