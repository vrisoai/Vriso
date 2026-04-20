// CoreServices.tsx
'use client';

/**
 * Section 3: Core Services.
 * Desktop: centered card with GSAP split-direction navigation (arrows + dots).
 * Mobile:  touch swipe carousel.
 */

import Script from 'next/script';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { EASE } from '@/app/lib/animations';

gsap.registerPlugin(useGSAP);

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Organization', name: 'Invisigent' },
  serviceType: 'Enterprise AI Systems',
  description: 'Invisigent helps organizations design, build, and scale enterprise AI systems — from architecture strategy and agent orchestration to knowledge retrieval and AI-native product development.',
  areaServed: ['US', 'EU', 'India'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Our Services',
    itemListElement: [
      { '@type': 'Offer', name: 'AI Systems Architecture', description: 'We design the right infrastructure before anything is built. Architecture reviews, roadmap planning, build-vs-buy decisions — senior-level technical guidance from day one.' },
      { '@type': 'Offer', name: 'Agent Orchestration & Knowledge Systems', description: 'Multi-agent pipelines that run real workflows. RAG retrieval connected to your internal data. Optimized for production latency, cost, and reliability — not demo conditions.' },
      { '@type': 'Offer', name: 'AI-Native Product & Compliance', description: 'AI-first products, copilots, and intelligent platforms — built with governance, RBAC, audit trails, and regulatory compliance designed in from the first sprint.' },
    ],
  },
};

const CARDS = [
  {
    label: '[ AI SYSTEMS ARCHITECTURE ]',
    title: 'AI Systems Architecture',
    description:
      'We design the right infrastructure before anything is built. Architecture reviews, roadmap planning, build-vs-buy decisions — senior-level technical guidance from day one.',
  },
  {
    label: '[ AGENT ORCHESTRATION & KNOWLEDGE ]',
    title: 'Agent Orchestration & Knowledge Systems',
    description:
      'Multi-agent pipelines that run real workflows. RAG retrieval connected to your internal data. Optimized for production latency, cost, and reliability — not demo conditions.',
  },
  {
    label: '[ AI-NATIVE PRODUCT & COMPLIANCE ]',
    title: 'AI-Native Product & Compliance',
    description:
      'AI-first products, copilots, and intelligent platforms — built with governance, RBAC, audit trails, and regulatory compliance designed in from the first sprint.',
  },
];

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
        result.push({ x1: NEURAL_NODES[i].x, y1: NEURAL_NODES[i].y, x2: NEURAL_NODES[j].x, y2: NEURAL_NODES[j].y });
      }
    }
  }
  return result;
})();

/* ─── Arrow SVGs ─────────────────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M14 5L8 11l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M8 5l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export function CoreServices() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Desktop card refs — GSAP updates text directly, no React re-render */
  const labelRef        = useRef<HTMLParagraphElement>(null);
  const titleRef        = useRef<HTMLHeadingElement>(null);
  const descRef         = useRef<HTMLParagraphElement>(null);
  const currentIndexRef = useRef(0);
  const animatingRef    = useRef(false);
  const dotsRef         = useRef<(HTMLButtonElement | null)[]>([]);

  /* Mobile carousel */
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /* Desktop card — 3D tilt target */
  const cardStageRef = useRef<HTMLElement>(null);

  /* ── Desktop GSAP navigation ─────────────────────────────────────────── */
  const { contextSafe } = useGSAP({ scope: sectionRef });

  /* ── 3D tilt on hover (desktop + no-reduced-motion only) ─────────────── */
  useGSAP(() => {
    const card = cardStageRef.current;
    if (!card) return;

    const MAX_TILT = 14; // degrees

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      if (!card) return;
      function onMove(e: MouseEvent) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        gsap.to(card, {
          rotateY:  x * MAX_TILT * 2,
          rotateX: -y * MAX_TILT * 2,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      function onLeave() {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto',
        });
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const doNavigate = contextSafe((nextIndex: number) => {
    if (animatingRef.current || nextIndex === currentIndexRef.current) return;
    animatingRef.current = true;

    const direction  = nextIndex > currentIndexRef.current ? 1 : -1;
    const titleEl    = titleRef.current;
    const descEl     = descRef.current;
    const labelEl    = labelRef.current;
    if (!titleEl || !descEl || !labelEl) { animatingRef.current = false; return; }

    /*
     * Right arrow (direction = 1):
     *   out  → title slides LEFT (-x),  desc slides RIGHT (+x)
     *   in   ← title from LEFT (-x),    desc from RIGHT (+x)
     * Left arrow (direction = -1): mirrored
     */
    const titleX = -380 * direction;
    const descX  =  380 * direction;

    gsap.timeline({ onComplete: () => { animatingRef.current = false; } })
      // Animate out
      .to(titleEl, { x: titleX, opacity: 0, duration: 0.45, ease: 'power2.in' })
      .to(descEl,  { x: descX,  opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
      .to(labelEl, { opacity: 0, duration: 0.3 }, 0)
      // Swap content at opacity-0 midpoint
      .call(() => {
        const card = CARDS[nextIndex];
        titleEl.textContent = card.title;
        descEl.textContent  = card.description;
        labelEl.textContent = card.label;
        currentIndexRef.current = nextIndex;
        dotsRef.current.forEach((dot, i) => {
          if (dot) dot.className = `cs-dot${i === nextIndex ? ' active' : ''}`;
        });
      })
      // Position for entry
      .set(titleEl, { x: titleX })
      .set(descEl,  { x: descX  })
      // Animate in
      .to(titleEl, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to(descEl,  { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '<')
      .to(labelEl, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '<+=0.08');
  });

  /* ── Mobile touch ────────────────────────────────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) setActiveCard(c => Math.min(CARDS.length - 1, c + 1));
      else        setActiveCard(c => Math.max(0, c - 1));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="core-services-section"
      aria-labelledby="core-services-heading"
    >
      <Script id="core-services-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD)}
      </Script>

      {/* Neural background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {NEURAL_EDGES.map((e, i) => (
          <line key={i} x1={`${e.x1}%`} y1={`${e.y1}%`} x2={`${e.x2}%`} y2={`${e.y2}%`} stroke="var(--color-action-accent)" strokeWidth={0.15} opacity={0.12} />
        ))}
        {NEURAL_NODES.map((n, i) => (
          <circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r={0.3} fill="var(--color-link)" opacity={0.2} />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(59,91,219,0.06) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="section-grid-overlay" aria-hidden="true" />

      <div className="core-services-inner">

        {/* ── Section header ──────────────────────────────────────────── */}
        <header className="core-services-header">
          <motion.p
            className="section-label font-mono"
            style={{ fontSize: 'clamp(10px, 2.5vw, 14px)', letterSpacing: '0.14em', fontWeight: 500, color: 'var(--color-text-tertiary)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: EASE }}
          >
            [ OUR SERVICES ]
          </motion.p>
          <motion.h2
            id="core-services-heading"
            className="font-serif"
            style={{ fontSize: 'clamp(28px, 3.5vw, 72px)', fontWeight: 500, lineHeight: 1.15, marginTop: 'clamp(14px, 2vw, 24px)', color: 'var(--color-text-primary)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Enterprise AI Systems &amp; Infrastructure
          </motion.h2>
          <motion.p
            className="font-serif"
            style={{ fontSize: 'clamp(14px, 1.2vw, 22px)', lineHeight: 1.7, marginTop: 'clamp(12px, 1.5vw, 20px)', color: 'var(--color-text-secondary)', maxWidth: 620 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Invisigent helps organizations design, build, and scale enterprise AI systems — from architecture strategy and agent orchestration to knowledge retrieval and AI-native product development.
          </motion.p>
        </header>

        {/* ── DESKTOP: centered card with arrow navigation ─────────────── */}
        <div className="core-services-desktop-nav" aria-label="Service navigation">
          {/* Left arrow */}
          <button
            className="cs-arrow-btn"
            onClick={() => doNavigate((currentIndexRef.current - 1 + CARDS.length) % CARDS.length)}
            aria-label="Previous service"
          >
            <ArrowLeft />
          </button>

          {/* Card + dots wrapper */}
          <div className="cs-card-with-dots">
            <article ref={cardStageRef} className="cs-card-stage glass-card" aria-live="polite" aria-atomic="true">
              <div className="cs-card-inner">
                <p
                  ref={labelRef}
                  className="font-mono"
                  style={{ fontSize: 'clamp(9px, 1vw, 12px)', letterSpacing: '0.16em', fontWeight: 500, color: 'var(--color-text-micro)' }}
                >
                  {CARDS[0].label}
                </p>
                <h3
                  ref={titleRef}
                  className="font-serif"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 42px)', fontWeight: 600, lineHeight: 1.25, color: 'var(--color-text-primary)' }}
                >
                  {CARDS[0].title}
                </h3>
                <p
                  ref={descRef}
                  className="font-serif"
                  style={{ fontSize: 'clamp(14px, 1.05vw, 20px)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}
                >
                  {CARDS[0].description}
                </p>
              </div>
            </article>

            {/* Dot indicators — outside card, below it */}
            <div className="cs-dots" role="group" aria-label="Service cards">
              {CARDS.map((card, i) => (
                <button
                  key={i}
                  ref={el => { dotsRef.current[i] = el; }}
                  className={`cs-dot${i === 0 ? ' active' : ''}`}
                  onClick={() => doNavigate(i)}
                  aria-label={`Go to: ${card.title}`}
                />
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className="cs-arrow-btn"
            onClick={() => doNavigate((currentIndexRef.current + 1) % CARDS.length)}
            aria-label="Next service"
          >
            <ArrowRight />
          </button>
        </div>

        {/* ── MOBILE / TABLET: swipe carousel ──────────────────────────── */}
        <div
          className="core-services-carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselRef}
            className="core-services-carousel"
            style={{ transform: `translateX(-${activeCard * 100}%)` }}
          >
            {CARDS.map((card) => (
              <article key={card.title} className="core-services-carousel-card glass-card">
                <p className="font-mono" style={{ fontSize: 'clamp(9px, 2.2vw, 10px)', letterSpacing: '0.14em', fontWeight: 500, color: 'var(--color-text-micro)', borderLeft: '2px solid var(--color-trust-amber)', paddingLeft: 10 }}>
                  {card.label}
                </p>
                <h3 className="font-serif" style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 600, lineHeight: 1.3, marginTop: 12, color: 'var(--color-text-primary)' }}>
                  {card.title}
                </h3>
                <p className="font-serif" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.7, marginTop: 10, color: 'var(--color-text-secondary)' }}>
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="core-services-carousel-dots">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`core-services-carousel-dot${i === activeCard ? ' active' : ''}`}
                onClick={() => setActiveCard(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <div className="sr-only">
        Enterprise AI Architecture. Agent Orchestration Systems. Retrieval-Augmented Generation. AI Infrastructure Optimization. AI Product Development. AI Technology Consulting.
      </div>
    </section>
  );
}
