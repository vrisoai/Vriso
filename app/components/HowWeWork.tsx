// How we work 
'use client';

import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';

/* Runs as useLayoutEffect on client (before paint) and useEffect on server (SSR-safe) */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import { EASE, FADE_UP, CARD_FADE } from '@/app/lib/animations';

/* ─── JSON-LD ─── */
const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Invisigent Builds Production-Ready AI Systems',
  description: 'Building AI in a lab is easy. Making it work reliably in production is the hard part. Invisigent analyzes business goals and infrastructure, designs scalable AI architectures, then deploys and optimizes for long-term reliability.',
  step: [
    { '@type': 'HowToStep', name: 'Understand the Problem', text: 'We analyze your business goals, existing infrastructure, and data environment to identify where AI systems can deliver real operational impact.' },
    { '@type': 'HowToStep', name: 'Design the AI Architecture', text: 'Our team designs scalable AI architectures, orchestration layers, and knowledge systems using modern patterns like Retrieval-Augmented Generation and intelligent automation frameworks.' },
    { '@type': 'HowToStep', name: 'Deploy, Monitor, and Optimize', text: 'AI systems are deployed into production environments with monitoring, performance tuning, and continuous optimization to ensure long-term reliability and scalability.' },
  ],
};

const JSON_LD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Enterprise AI Infrastructure Consulting',
  provider: { '@type': 'Organization', name: 'Invisigent' },
  description: 'Invisigent is an enterprise AI infrastructure consulting firm that designs intelligent automation systems and agent orchestration architecture.',
  areaServed: ['United States', 'European Union', 'India', 'Global'],
};

/* ─── Process steps data ─── */
const STEPS = [
  {
    label: 'DISCOVERY_PHASE',
    title: 'Understand the Problem',
    description:
      'We analyze your business goals, existing infrastructure, and data environment to identify where AI systems can deliver real operational impact.',
  },
  {
    label: 'ARCHITECTURE_DESIGN',
    title: 'Design the AI Architecture',
    description:
      'Our team designs scalable AI architectures, orchestration layers, and knowledge systems using modern patterns like Retrieval-Augmented Generation and intelligent automation frameworks.',
  },
  {
    label: 'DEPLOYMENT_OPTIMIZATION',
    title: 'Deploy, Monitor, and Optimize',
    description:
      'AI systems are deployed into production environments with monitoring, performance tuning, and continuous optimization to ensure long-term reliability and scalability.',
  },
];

/* ─── Deterministic neural particles (hydration-safe) ─── */
const PARTICLES: { x: number; y: number; delay: number; duration: number }[] = [
  { x: 15, y: 20, delay: 0, duration: 8 },
  { x: 80, y: 25, delay: 1.5, duration: 10 },
  { x: 45, y: 60, delay: 2, duration: 9 },
  { x: 25, y: 75, delay: 0.8, duration: 11 },
  { x: 70, y: 55, delay: 1.2, duration: 10 },
  { x: 90, y: 40, delay: 2.5, duration: 8 },
  { x: 10, y: 50, delay: 1.8, duration: 12 },
  { x: 55, y: 15, delay: 0.5, duration: 9 },
];

/* ─── Neural particles background ─── */
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
          opacity={0.12}
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
export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const gridRef = useRef<HTMLDivElement>(null);
  const carouselGridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  /* useIsomorphicLayoutEffect fires before paint on client — sets hasHover synchronously
     so mobile never sees the heading→description flash that useEffect caused */
  const [hasHover, setHasHover] = useState(true);
  useIsomorphicLayoutEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [tappedCard, setTappedCard] = useState<number | null>(null);
  const handleEnter = useCallback((i: number) => () => setHoveredCard(i), []);
  const handleLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setHoveredCard(null);
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  }, []);
  const handleTap = useCallback((i: number) => () => setTappedCard((prev) => (prev === i ? null : i)), []);

  /** Phones / touch: all cards stay in “hover” (description visible); desktop: hover or tap */
  const isRevealed = useCallback(
    (i: number) => !hasHover || hoveredCard === i || tappedCard === i,
    [hasHover, hoveredCard, tappedCard]
  );

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    // Tilt toward cursor: left=+rotateY, right=-rotateY, top=+rotateX, bottom=-rotateX
    const tiltY = (0.5 - x) * 18;
    const tiltX = (y - 0.5) * 18;
    e.currentTarget.style.setProperty('--tilt-x', `${tiltX}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY}deg`);
  }, []);

  // Scroll to second card by default on mobile carousel (ARCHITECTURE_DESIGN centered)
  useEffect(() => {
    const grid = carouselGridRef.current;
    if (!grid) return;
    if (window.innerWidth > 767) return;

    const scrollToSecond = () => {
      const cards = Array.from(grid.children) as HTMLElement[];
      if (cards.length < 2) return;
      // Scroll so second card (index 1) is the snapped card
      const secondCard = cards[1];
      grid.scrollLeft = secondCard.offsetLeft - grid.offsetWidth * 0.08;
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSecond();
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-we-work-section relative w-full overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(80px, 10vw, 240px)',
        paddingBottom: 'clamp(80px, 10vw, 240px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="how-we-work-heading"
    >
      <Script id="how-we-work-howto-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_HOWTO)}
      </Script>
      <Script id="how-we-work-service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_SERVICE)}
      </Script>

      {/* Neural particles — desktop only */}
      <NeuralParticles visible={sectionInView} />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 40%, rgba(59,91,219,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-grid-overlay" aria-hidden="true" />

      <div className="section-container section-inner relative">
        {/* ── Header ── */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 'clamp(720px, 54vw, 1280px)',
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
              textTransform: 'uppercase',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: 12,
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0}
          >
            [ HOW WE WORK ]
          </motion.p>

          <motion.div style={{ marginTop: 'clamp(20px, 3vw, 32px)' }}>
            <motion.h2
              id="how-we-work-heading"
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 4vw, 80px)',
                fontWeight: 500,
                lineHeight: 1.15,
                color: 'var(--color-text-primary)',
                width: '100%',
              }}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
            >
              How Invisigent Builds Production-Ready AI Systems
            </motion.h2>
          </motion.div>

          <motion.p
            className="font-serif"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 28px)',
              lineHeight: 1.7,
              maxWidth: 'clamp(680px, 54vw, 1280px)',
              marginTop: 'clamp(18px, 2.5vw, 48px)',
              color: 'var(--color-text-secondary)',
              width: '100%',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={2}
          >
            Building AI in a lab is easy. Making it work reliably in production is the hard part.
            Here&apos;s how Invisigent does it.
          </motion.p>
        </header>

        {/* ── Process steps grid ── */}
        <motion.div
          ref={(el: HTMLDivElement | null) => {
            (gridRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            carouselGridRef.current = el;
          }}
          className="how-we-work-grid grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3"
          style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
          role="list"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="how-we-work-card-wrapper"
              variants={CARD_FADE}
              role="listitem"
              onMouseEnter={handleEnter(i)}
              onMouseLeave={handleLeave}
              onMouseMove={handleCardMouseMove}
              onClick={hasHover ? handleTap(i) : undefined}
              aria-label={step.title}
            >
              {/* Entire card tilts — glass styling + transform on same element */}
              <div
                className={`how-we-work-card-tilt glass-card how-we-work-card ${hasHover ? 'cursor-pointer' : ''}`}
              >
              {/* Label */}
              <p className="how-we-work-card__label">{step.label}</p>

              {/* Content: heading by default, description on hover */}
              <div className="how-we-work-card__content relative pointer-events-none">
                <motion.h3
                  className="font-serif absolute inset-0 flex items-center"
                  style={{
                    fontSize: 'clamp(20px, 1.8vw, 44px)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: 'var(--color-text-primary)',
                  }}
                  initial={false}
                  animate={{ opacity: isRevealed(i) ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="font-serif absolute inset-0 flex items-start pt-1"
                  style={{
                    fontSize: 'clamp(14px, 1.1vw, 26px)',
                    lineHeight: 1.65,
                    color: 'var(--color-text-secondary)',
                  }}
                  initial={false}
                  animate={{ opacity: isRevealed(i) ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {step.description}
                </motion.p>
              </div>

              {/* Hint — only when hover is available (touch shows details by default) */}
              {hasHover && (
                <p
                  className="font-mono mt-4 text-[10px] transition-opacity duration-300 sm:block"
                  style={{
                    color: 'var(--color-text-micro)',
                    letterSpacing: '0.08em',
                    opacity: isRevealed(i) ? 0 : 0.6,
                  }}
                  aria-hidden="true"
                >
                  <span className="hidden sm:inline">Hover</span>
                  <span className="sm:hidden">Tap</span> for details
                </p>
              )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom insight strip ── */}
        <motion.div
          className="how-we-work-insight glass-card"
          style={{
            marginTop: 'clamp(32px, 4vw, 56px)',
            padding: 'clamp(20px, 2.5vw, 32px)',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-center font-serif text-text-secondary" style={{ fontSize: 'clamp(14px, 1.6vw, 32px)', lineHeight: 1.7, maxWidth: 900, marginInline: 'auto' }}>
            AI transformation is not a single deployment. It is an{' '}
            <span className="text-trust-amber" style={{ fontWeight: 700 }}>
              evolving infrastructure
            </span>{' '}
            that continuously learns, adapts, and optimizes.
          </p>
        </motion.div>
      </div>

      {/* GEO — hidden semantic signals */}
      <div className="sr-only">
        Invisigent is an enterprise AI infrastructure consulting firm that designs intelligent
        automation systems and agent orchestration architecture. Enterprise AI consulting. AI
        infrastructure development. AI automation strategy. Agent orchestration architecture. AI
        transformation consulting.
      </div>
    </section>
  );
}
