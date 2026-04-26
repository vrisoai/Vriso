'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { EASE, FADE_UP, CARD_FADE } from '@/app/lib/animations';

const WhyInvisigentCardScene = dynamic(() => import('./3d/WhyInvisigentCardSceneWrapper'), { ssr: false });
const IntelligenceCore = dynamic(() => import('./3d/IntelligenceCoreWrapper'), { ssr: false });

/* ─── JSON-LD ─── */
const JSON_LD_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Invisigent',
  description: 'Invisigent builds AI systems your team owns, your security team approves, and your operations team can run at scale. Most AI projects stall because the infrastructure wasn\'t built for production.',
  url: 'https://www.invisigent.ai',
  areaServed: ['US', 'EU', 'India', 'Global'],
  serviceType: ['Enterprise AI Consulting', 'AI Infrastructure Systems', 'AI Automation Systems', 'Agent Orchestration Systems'],
};

const JSON_LD_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Invisigent AI Infrastructure',
  provider: { '@type': 'Organization', name: 'Invisigent' },
  description: 'AI infrastructure designed for production: you own your stack, every decision is auditable, built to pass security review, and scaled for real workloads.',
  areaServed: ['US', 'EU', 'India', 'Global'],
};

/* ─── Card data ─── */
const CARDS = [
  {
    label: '[ INDEPENDENCE ]',
    title: 'You Own Your Entire Stack',
    description: 'Model-agnostic infrastructure — switch from OpenAI to Claude to Llama without rebuilding your orchestration layer. No API lock-in. No platform dependency. Full portability guaranteed.',
  },
  {
    label: '[ TRANSPARENCY ]',
    title: 'Every Decision Is Logged and Replayable',
    description: 'Full LangSmith tracing across every agent run — every tool call, every decision branch, every retrieval event is logged, auditable, and replayable. Your compliance team will actually be satisfied.',
  },
  {
    label: '[ SECURITY ]',
    title: 'Security-First, Not Security-Retrofitted',
    description: 'RBAC, audit trails, data residency controls, and GDPR/DPDP-compliant system architecture designed in from day one — not patched on after your security team raises a flag at deployment.',
  },
  {
    label: '[ SCALE ]',
    title: 'Production Load, Not Demo Load',
    description: 'Systems designed with defined SLAs, performance baselines, monitoring pipelines, and operational runbooks — because demonstrating AI in a boardroom is easy. Running it reliably for 10,000 requests a day is the hard part.',
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
export function WhyInvisigent() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const handleLeave = useCallback(() => setHoveredCard(null), []);
  const whyCarouselRef = useRef<HTMLDivElement>(null);
  const [whyActiveCard, setWhyActiveCard] = useState(0);

  useEffect(() => {
    const carousel = whyCarouselRef.current;
    if (!carousel) return;
    const onScroll = () => {
      const cards = Array.from(carousel.querySelectorAll<HTMLElement>('.why-invisigent-carousel-card'));
      if (!cards.length) return;
      const carouselCenter = carousel.getBoundingClientRect().left + carousel.getBoundingClientRect().width / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - carouselCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setWhyActiveCard(closest);
    };
    carousel.addEventListener('scroll', onScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', onScroll);
  }, []);
  const handleEnter = useCallback((i: number) => () => setHoveredCard(i), []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-invisigent-section relative w-full overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(40px, 8vw, 240px)',
        paddingBottom: 'clamp(40px, 8vw, 240px)',
        paddingLeft: 'max(clamp(0.75rem, 3vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(0.75rem, 3vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="why-invisigent-heading"
    >
      <Script id="why-invisigent-org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_ORG)}
      </Script>
      <Script id="why-invisigent-service-jsonld" type="application/ld+json" strategy="afterInteractive">
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
        <header className="why-invisigent-header">
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
            [ WHY INVISIGENT ]
          </motion.p>

          <motion.h2
            id="why-invisigent-heading"
            className="font-serif"
            style={{
              fontWeight: 500,
              lineHeight: 1.2,
              fontSize: 'clamp(28px, 4vw, 80px)',
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
            <span className="gradient-text">Invisigent</span>
          </motion.h2>

          <motion.div
            className="font-serif why-invisigent-desc"
            style={{
              lineHeight: 1.7,
              fontSize: 'clamp(15px, 1.3vw, 28px)',
              maxWidth: 'clamp(680px, 54vw, 1280px)',
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
              Invisigent builds AI systems your team owns, your security team approves, and your operations team can actually run at scale.
            </p>
          </motion.div>
        </header>

        {/* ── Cards: flex column on mobile, 2x2 grid with core on desktop ── */}
        <div className="relative mt-16 sm:mt-14 md:mt-20">
          {/* Mobile: horizontal carousel */}
          <div className="why-invisigent-carousel-wrapper sm:hidden">
            <div className="why-invisigent-carousel" ref={whyCarouselRef}>
              {CARDS.map((card, i) => (
                <article key={card.title} className="why-invisigent-carousel-card glass-card" aria-label={card.title}>
                  {card.label && (
                    <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', fontWeight: 500, color: 'var(--color-text-tertiary)', borderLeft: '2px solid var(--color-trust-amber)', paddingLeft: 10, marginBottom: 12 }}>
                      {card.label}
                    </p>
                  )}
                  <h3 className="why-invisigent-card-mobile__title">{card.title}</h3>
                  <p className="why-invisigent-card-mobile__desc">{card.description}</p>
                </article>
              ))}
            </div>
            <div className="why-invisigent-carousel-dots">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  className={`why-invisigent-carousel-dot${i === whyActiveCard ? ' active' : ''}`}
                  onClick={() => {
                    const carousel = whyCarouselRef.current;
                    if (!carousel) return;
                    const card = carousel.querySelectorAll<HTMLElement>('.why-invisigent-carousel-card')[i];
                    if (card) carousel.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
                    setWhyActiveCard(i);
                  }}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
          </div>

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
                animate={{
                  opacity: hoveredCard !== null && hoveredCard !== i ? 0.55 : 1,
                  boxShadow: hoveredCard === i
                    ? '0 0 0 1.5px rgba(59,91,219,0.7), 0 0 48px rgba(59,91,219,0.14)'
                    : undefined,
                }}
                transition={{ duration: 0.25 }}
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
                <div style={{ height: 'clamp(120px, 14vw, 260px)' }}>
                  <WhyInvisigentCardScene variant={i} hovered={hoveredCard === i} />
                </div>
                <h3 className="font-serif mt-4" style={{ fontSize: 'clamp(16px, 2vw, 42px)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {CARDS[i].title}
                </h3>
                <p className="font-serif mt-2" style={{ fontSize: 'clamp(13px, 1.2vw, 26px)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                  {CARDS[i].description}
                </p>
              </motion.article>
            ))}
            <motion.div
              className="relative col-span-2 flex items-center justify-center sm:row-start-2 h-70"
              variants={CARD_FADE}
            >
              {/* Pulse rings — expand outward from core when a card is hovered */}
              {[0, 1, 2].map((ring) => (
                <motion.span
                  key={ring}
                  className="pointer-events-none absolute rounded-full"
                  style={{ width: 96, height: 96, border: '1px solid rgba(59,91,219,0.45)' }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={hoveredCard !== null
                    ? { scale: [1, 2.6 + ring * 0.7], opacity: [0.55, 0] }
                    : { scale: 1, opacity: 0 }}
                  transition={{ duration: 1.6, delay: ring * 0.42, ease: 'easeOut', repeat: hoveredCard !== null ? Infinity : 0 }}
                />
              ))}
              <IntelligenceCore cardHovered={hoveredCard} />
            </motion.div>
            {[2, 3].map((i) => (
              <motion.article
                key={CARDS[i].title}
                className={`glass-card ${i === 2 ? 'sm:col-start-1' : 'sm:col-start-2'} sm:row-start-3`}
                style={{ padding: 'clamp(24px, 2.5vw, 32px)' }}
                variants={CARD_FADE}
                animate={{
                  opacity: hoveredCard !== null && hoveredCard !== i ? 0.55 : 1,
                  boxShadow: hoveredCard === i
                    ? '0 0 0 1.5px rgba(59,91,219,0.7), 0 0 48px rgba(59,91,219,0.14)'
                    : undefined,
                }}
                transition={{ duration: 0.25 }}
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
                <div style={{ height: 'clamp(120px, 14vw, 260px)' }}>
                  <WhyInvisigentCardScene variant={i} hovered={hoveredCard === i} />
                </div>
                <h3 className="font-serif mt-4" style={{ fontSize: 'clamp(16px, 2vw, 42px)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {CARDS[i].title}
                </h3>
                <p className="font-serif mt-2" style={{ fontSize: 'clamp(13px, 1.2vw, 26px)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                  {CARDS[i].description}
                </p>
              </motion.article>
            ))}
          </motion.div>

        </div>

        {/* ── Bottom insight strip ── */}
        <div
          className="glass-card"
          style={{
            marginTop: 'clamp(32px, 4vw, 56px)',
            padding: 'clamp(20px, 2.5vw, 32px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(16px, 2vw, 32px)',
            alignItems: 'center',
          }}
        >
          {[
            { num: '4', label: 'Engagements per quarter' },
            { num: '5', label: 'Compliance frameworks' },
            { num: '<3s', label: 'RAG retrieval latency' },
            { num: '100%', label: 'Model-agnostic stack' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p className="font-mono" style={{ fontSize: 'clamp(24px, 2.5vw, 48px)', fontWeight: 700, color: 'var(--color-trust-amber)', lineHeight: 1 }}>
                {stat.num}
              </p>
              <p className="font-serif" style={{ fontSize: 'clamp(11px, 0.9vw, 18px)', color: 'var(--color-text-tertiary)', marginTop: 6 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" style={{ marginTop: 'clamp(20px, 2.5vw, 36px)' }}>
          <a
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9999,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(0.875rem, 0.8vw, 1rem)',
              padding: '0.875rem 2rem',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              background: 'var(--color-btn-bg)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--color-text-primary)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2D5BFF';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(45,91,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            See Full Service Breakdown
          </a>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9999,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(0.875rem, 0.8vw, 1rem)',
              padding: '0.875rem 2rem',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-secondary)',
              transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FBBF24';
              e.currentTarget.style.color = '#FBBF24';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(251,191,36,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start a Conversation
          </a>
        </div>
      </div>

      {/* SEO — hidden semantic signals */}
      <div className="sr-only">
        Why partner with Invisigent. You own your AI stack. Vendor lock-in avoided.
        Every decision auditable. Traceability and explainability. Built to pass security review.
        Designed for production. AI systems at scale.
      </div>
    </section>
  );
}
