// CoreServices.tsx
'use client';

/**
 * Section 3: Core Services (Services section).
 * To change this section, edit:
 *   - app/components/CoreServices.tsx  (layout, cards data, scroll logic)
 *   - app/styles/components.css         (search: "CORE SERVICES" or ".core-services-")
 */

import Script from 'next/script';
import { motion } from 'framer-motion';
import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/app/lib/animations';

gsap.registerPlugin(ScrollTrigger);

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
      { '@type': 'Offer', name: 'AI & Technology Strategy Consulting', description: 'Design the right AI architecture for your organization. We help teams plan AI adoption, infrastructure strategy, and scalable automation roadmaps.' },
      { '@type': 'Offer', name: 'Agent Orchestration & AI Workflows', description: 'Build intelligent multi-agent systems that coordinate tasks, automate complex workflows, and power scalable AI-driven operations.' },
      { '@type': 'Offer', name: 'RAG & Knowledge Retrieval Systems', description: 'Develop enterprise knowledge systems using Retrieval-Augmented Generation to deliver accurate, context-aware answers from internal data.' },
      { '@type': 'Offer', name: 'AI Performance & Latency Optimization', description: 'Optimize AI systems for speed, reliability, and cost efficiency by improving inference performance, latency, and infrastructure scalability.' },
      { '@type': 'Offer', name: 'AI-Native Product Development', description: 'Design and build AI-first applications, copilots, and intelligent platforms that integrate AI directly into user workflows.' },
      { '@type': 'Offer', name: 'Compliance-Ready AI Systems', description: 'Build AI systems with governance, security, and regulatory compliance aligned with standards like General Data Protection Regulation.' },
    ],
  },
};

const CARDS = [
  {
    label: '[ AI STRATEGY CONSULTING ]',
    title: 'AI & Technology Strategy Consulting',
    description:
      'Design the right AI architecture for your organization. We help teams plan AI adoption, infrastructure strategy, and scalable automation roadmaps.',
  },
  {
    label: '[ AGENTIC ORCHESTRATION ]',
    title: 'Agent Orchestration & AI Workflows',
    description:
      'Build intelligent multi-agent systems that coordinate tasks, automate complex workflows, and power scalable AI-driven operations.',
  },
  {
    label: '[ RAG KNOWLEDGE SYSTEMS ]',
    title: 'RAG & Knowledge Retrieval Systems',
    description:
      'Develop enterprise knowledge systems using Retrieval-Augmented Generation to deliver accurate, context-aware answers from internal data.',
  },
  {
    label: '[ AI PERFORMANCE OPTIMIZATION ]',
    title: 'AI Performance & Latency Optimization',
    description:
      'Optimize AI systems for speed, reliability, and cost efficiency by improving inference performance, latency, and infrastructure scalability.',
  },
  {
    label: '[ AI-NATIVE PRODUCT DEVELOPMENT ]',
    title: 'AI-Native Product Development',
    description:
      'Design and build AI-first applications, copilots, and intelligent platforms that integrate AI directly into user workflows.',
  },
  {
    label: '[ COMPLIANCE-READY AI SYSTEMS ]',
    title: 'Compliance-Ready AI Systems',
    description:
      'Build AI systems with governance, security, and regulatory compliance aligned with standards like General Data Protection Regulation.',
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

export function CoreServices() {
  const sectionRef    = useRef<HTMLElement>(null);
  const carouselRef   = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const touchStartX   = useRef(0);
  const touchStartY   = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 1280;

    // Kill stale pins BEFORE context so ctx.revert() doesn't undo the cleanup
    ScrollTrigger.getAll()
      .filter(st => st.trigger === section || st.pin === section)
      .forEach(st => st.kill());

    // On mobile: strip any GSAP inline styles the pin may have left on the section
    if (isMobile) {
      (['position', 'top', 'left', 'width', 'height', 'transform', 'will-change'] as const)
        .forEach(p => section.style.removeProperty(p));
      // Also clear the pin spacer if it still wraps the section
      const spacer = section.parentElement;
      if (spacer?.classList.contains('gsap-pin-spacer')) {
        spacer.replaceWith(section);
      }
    }

    let pinTrigger: ScrollTrigger | null = null;
    let onWheel: (e: WheelEvent) => void = () => {};

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.core-services-stack-card', section);
      const total = cards.length;
      if (total === 0) return;

      // Setup all cards hidden below, first card visible
      gsap.set(cards, {
        position: 'absolute', top: '50%', yPercent: -50,
        left: 0, right: 0, force3D: true, y: 120, opacity: 0,
      });
      gsap.set(cards[0], { y: 0, opacity: 1 });

      let current = 0;
      let animating = false;
      let cooldown = false;          // blocks next scroll until cooldown expires
      let entryLock = true;   // blocks wheel until section is fully pinned
      let accDelta = 0;              // accumulates trackpad delta
      let accTimer: ReturnType<typeof setTimeout> | null = null;

      const goTo = (index: number) => {
        if (index < 0 || index >= total || animating) return;
        animating = true;

        const outgoing = cards[current];
        const incoming = cards[index];
        const direction = index > current ? 1 : -1;

        const tl = gsap.timeline({
          onComplete: () => {
            current = index;
            animating = false;
          },
        });

        tl.to(outgoing, {
          y: -120 * direction,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
        });
        tl.fromTo(
          incoming,
          { y: 120 * direction, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.inOut' },
          '-=0.3'
        );
      };

      // Pin section and intercept scroll only on desktop; mobile uses carousel (no pin)
      if (!isMobile) {
        pinTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${(total - 1) * 100}vh`,
          pin: true,
          onEnter: () => {
            // Section pinned — release entry lock after short delay
            entryLock = true;
            setTimeout(() => { entryLock = false; }, 400);
          },
          onLeave: () => {
            cooldown = false;
            animating = false;
            entryLock = true; // re-lock for next entry
          },
          onEnterBack: () => {
            // Re-entering from below — reset to last card state
            entryLock = true;
            cooldown = false;
            setTimeout(() => { entryLock = false; }, 400);
          },
          onLeaveBack: () => {
            entryLock = true; // leaving upward — re-lock
            cooldown = false;
            animating = false;
          },
        });
      }

      onWheel = (e: WheelEvent) => {
        const rect = section.getBoundingClientRect();
        const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
        if (!inView) return;
        if (entryLock) return;

        const atStart = current === 0 && e.deltaY < 0;
        const atEnd = current === total - 1 && e.deltaY > 0;

        // At boundaries — release scroll naturally, no preventDefault
        if (atStart || atEnd) {
          // Force unpin: nudge scroll position so ScrollTrigger releases
          if (atEnd && e.deltaY > 0) {
            // Temporarily disable the wheel listener so page can scroll freely
            window.removeEventListener('wheel', onWheel);
            setTimeout(() => {
              window.addEventListener('wheel', onWheel, { passive: false });
            }, 800);
          }
          return;
        }

        e.preventDefault();
        if (animating || cooldown) return;

        accDelta += e.deltaY;

        if (accTimer) clearTimeout(accTimer);
        accTimer = setTimeout(() => {
          accDelta = 0;
        }, 150);

        const THRESHOLD = 30;
        if (Math.abs(accDelta) < THRESHOLD) return;

        const direction = accDelta > 0 ? 1 : -1;
        accDelta = 0;
        if (accTimer) clearTimeout(accTimer);
        accTimer = null;

        goTo(current + direction);

        cooldown = true;
        setTimeout(() => {
          cooldown = false;
        }, 900);
      };

      if (!isMobile) {
        window.addEventListener('wheel', onWheel, { passive: false });
      }
    }, sectionRef);

    return () => {
      if (!isMobile) {
        window.removeEventListener('wheel', onWheel);
        pinTrigger?.kill();
      }
      ctx.revert();
    };
  }, []);

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
      className="core-services-section core-services-section--sticky-scroll relative w-full"
      aria-labelledby="core-services-heading"
    >
      <Script id="core-services-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD)}
      </Script>

      <div className="core-services-pin">
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

        <div className="core-services-layout">
        <div className="core-services-left">
          <motion.p className="section-label font-mono" style={{ fontSize: 'clamp(10px, 2.5vw, 14px)', letterSpacing: '0.14em', fontWeight: 500, color: 'var(--color-text-tertiary)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: EASE }}>
            [ OUR SERVICES ]
          </motion.p>
          <motion.h2 id="core-services-heading" className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 80px)', fontWeight: 500, lineHeight: 1.15, marginTop: 'clamp(20px, 3vw, 28px)', color: 'var(--color-text-primary)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
            Enterprise AI Systems &amp; Infrastructure
          </motion.h2>
          <motion.p className="font-serif" style={{ fontSize: 'clamp(15px, 1.3vw, 28px)', lineHeight: 1.7, marginTop: 'clamp(18px, 2.5vw, 28px)', color: 'var(--color-text-secondary)', maxWidth: 680 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}>
            Invisigent helps organizations design, build, and scale enterprise AI systems — from architecture strategy and agent orchestration to knowledge retrieval and AI-native product development.
          </motion.p>
        </div>

        {/* DESKTOP: existing sticky scroll cards — unchanged */}
        <div className="core-services-cards-column core-services-cards-desktop">
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              className="core-services-stack-card glass-card"
              style={{ zIndex: i + 1 }}
            >
              <p className="font-mono" style={{ fontSize: 'clamp(9px, 2.2vw, 13px)', letterSpacing: '0.14em', fontWeight: 500, color: 'var(--color-text-micro)', borderLeft: '2px solid var(--color-trust-amber)', paddingLeft: 10 }}>
                {card.label}
              </p>
              <h3 className="font-serif" style={{ fontSize: 'clamp(18px, 1.5vw, 42px)', fontWeight: 600, lineHeight: 1.3, marginTop: 12, color: 'var(--color-text-primary)' }}>
                {card.title}
              </h3>
              <p className="font-serif" style={{ fontSize: 'clamp(14px, 1vw, 28px)', lineHeight: 1.7, marginTop: 10, color: 'var(--color-text-secondary)' }}>
                {card.description}
              </p>
            </article>
          ))}
        </div>

        {/* MOBILE/TABLET: swipe carousel (translateX — no native scroll, no iOS sticking) */}
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

          {/* Dot indicators */}
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

        {/* MOBILE: vertical stacked cards list (replaces the swipe carousel) */}
        <div className="core-services-mobile-stack" aria-label="Core services list">
          {CARDS.map((card) => (
            <article key={card.title} className="core-services-mobile-stack-card glass-card" aria-label={card.title}>
              <p
                className="font-mono"
                style={{
                  fontSize: 'clamp(9px, 2.2vw, 10px)',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                  color: 'var(--color-text-micro)',
                  borderLeft: '2px solid var(--color-trust-amber)',
                  paddingLeft: 10,
                }}
              >
                {card.label}
              </p>
              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(18px, 5vw, 22px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginTop: 12,
                  color: 'var(--color-text-primary)',
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  lineHeight: 1.7,
                  marginTop: 10,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {card.description}
              </p>
            </article>
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