'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FADE_UP } from '@/app/lib/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/* ─── JSON-LD (Service) ─── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {
    '@type': 'Organization',
    name: 'Invisigent',
  },
  serviceType: 'Enterprise AI Systems',
  description:
    'Invisigent designs enterprise AI infrastructure, autonomous workflow systems, and AI decision intelligence platforms for organizations.',
  areaServed: 'Global',
};

/* ─── Card data ─── */
interface ValueCard {
  label: string;
  title: string;
  description: string;
  outcome: string;
}

const CARDS: ValueCard[] = [
  {
    label: '[ INFRASTRUCTURE ]',
    title: 'Infrastructure That Holds Under Real Workloads',
    description:
      'Before a single agent is built, we architect the orchestration layer, data pipelines, and monitoring systems your AI needs to run reliably at scale — not just in a demo environment.',
    outcome: '→ Your AI runs in production on day one. Not month six.',
  },
  {
    label: '[ AUTOMATION ]',
    title: 'Autonomous Workflows You Can Actually See Inside',
    description:
      'Multi-agent systems built with full observability — every agent action logged, traceable, and auditable. You see exactly what ran, what decided, and what changed. No black boxes.',
    outcome: '→ Ops teams stop flying blind. Workflows stop breaking silently.',
  },
  {
    label: '[ INTELLIGENCE ]',
    title: 'Your Knowledge Base, Finally Useful',
    description:
      'RAG pipelines connected to your internal documents, databases, and knowledge systems — delivering context-aware answers in under 3 seconds with accuracy your compliance team can stand behind.',
    outcome: '→ Your team stops digging. Your AI starts answering.',
  },
];

/* ─── Component ─── */
export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((_ctx, contextSafe) => {
    const cards   = gsap.utils.toArray<HTMLElement>('.vp-card', sectionRef.current);
    const heading = sectionRef.current?.querySelector<HTMLElement>('#invisigent-value-heading');

    /* ── 1. ScrollTrigger.batch card entrance ── */
    // Set all cards hidden before the trigger fires
    gsap.set(cards, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

    ScrollTrigger.batch(cards, {
      once: true,
      interval: 0.1,     // collect the whole row in one batch
      batchMax: 3,
      start: 'top 88%',
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.85,
          stagger: 0.13,
          ease: 'power3.out',
          // remove clip-path after animation so CSS hover and flip keep working
          onComplete: () => { gsap.set(batch, { clearProps: 'clipPath,opacity' }); },
        });
      },
    });

    /* ── 2. SplitText H2 word reveal ── */
    if (heading) {
      const split = new SplitText(heading, { type: 'words' });

      // Hide words immediately so there's no flash before the trigger fires
      gsap.set(split.words, { clipPath: 'inset(0 0 100% 0)', yPercent: 110 });

      ScrollTrigger.create({
        trigger: heading,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            clipPath: 'inset(0 0 0% 0)',
            yPercent: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: 'power3.out',
            // restore original DOM so gradient-text span is intact afterwards
            onComplete: () => split.revert(),
          });
        },
      });
    }

    /* ── 3. GSAP spring flip — desktop only, respects reduce-motion ── */
    const mm = gsap.matchMedia();
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const cleanups: (() => void)[] = [];

        cards.forEach((card) => {
          const inner = card.querySelector<HTMLElement>('.vp-card__inner')!;

          const onEnter = contextSafe!(() => {
            gsap.to(inner, { rotateY: 180, duration: 0.65, ease: 'back.out(1.4)' });
            gsap.to(card, {
              borderColor: 'var(--color-action-accent)',
              boxShadow: '0 0 32px rgba(59,130,246,0.28)',
              duration: 0.3,
            });
          });

          const onLeave = contextSafe!(() => {
            gsap.to(inner, { rotateY: 0, duration: 0.55, ease: 'power3.out' });
            gsap.to(card, {
              borderColor: 'var(--color-border)',
              boxShadow: 'none',
              duration: 0.3,
            });
          });

          card.addEventListener('mouseenter', onEnter);
          card.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            card.removeEventListener('mouseenter', onEnter);
            card.removeEventListener('mouseleave', onLeave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      }
    );

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden"
      style={{
        background: '#121212',
        paddingTop: 'clamp(80px, 10vw, 240px)',
        paddingBottom: 'clamp(80px, 10vw, 240px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="invisigent-value-heading"
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
            maxWidth: 'clamp(672px, 52vw, 1200px)',
            marginInline: 'auto',
          }}
        >
          {/* Label — Framer FADE_UP unchanged */}
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

          {/* H2 — plain element; GSAP SplitText handles the reveal */}
          <h2
            id="invisigent-value-heading"
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 4vw, 96px)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginTop: 'clamp(20px, 3vw, 32px)',
              textAlign: 'center',
              color: 'var(--color-text-primary)',
              width: '100%',
            }}
          >
            <span className="gradient-text">AI Systems</span> Built for Production Not Proof of Concept
          </h2>

          {/* Description — Framer FADE_UP unchanged */}
          <motion.p
            className="font-serif"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 28px)',
              lineHeight: 1.7,
              maxWidth: 'clamp(680px, 52vw, 1200px)',
              marginTop: 'clamp(18px, 2.5vw, 48px)',
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
            Most AI projects never reach production — not because the technology failed, but because no one built the infrastructure to hold it together under real business conditions. That&apos;s the only problem we solve.
          </motion.p>
        </header>

        {/* ── Value cards grid — plain div; GSAP ScrollTrigger.batch handles entrance ── */}
        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-12 min-[1920px]:gap-16"
          style={{ marginTop: 'clamp(40px, 5vw, 120px)' }}
        >
          {CARDS.map((card) => (
            <article
              key={card.label}
              className="vp-card"
              aria-label={card.title}
            >
              <div className="vp-card__inner">
                {/* Front: label + title */}
                <div className="vp-card__front">
                  <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
                    <span className="vp-card__signal" aria-hidden="true" />
                    <span className="vp-card__label">{card.label}</span>
                  </div>
                  <h3 className="vp-card__title">{card.title}</h3>
                </div>

                {/* Back: blurred surface + description */}
                <div className="vp-card__back">
                  <div className="vp-card__back-blur" aria-hidden="true" />
                  <p className="vp-card__desc">{card.description}</p>
                  <p className="vp-card__outcome font-mono" style={{ marginTop: 20, fontSize: 'clamp(11px, 0.85vw, 14px)', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--color-action-accent)', lineHeight: 1.5 }}>
                    {card.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* GEO — hidden semantic keyword signals */}
      <div className="sr-only">
        Enterprise AI systems. AI infrastructure architecture. Agentic workflow
        automation. Enterprise AI consulting. AI decision intelligence platforms.
      </div>
    </section>
  );
}
