'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';
import { AnimatedCard } from './shared/AnimatedCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PILLARS = [
  {
    number: '01',
    topBorder: 'amber' as const,
    title: 'Architecture First. Always.',
    body: 'Before any agent is built, we define the orchestration logic, data access patterns, failure handling, and monitoring architecture. Infrastructure decisions made late cost weeks of rework and thousands in wasted compute. Made early, they become the competitive advantage your operations team actually feels.',
    contrast: 'Most agencies start with the agent. We start with what the agent needs to survive production.',
  },
  {
    number: '02',
    topBorder: 'blue' as const,
    title: 'Your Infrastructure. Not Ours. Not OpenAI\'s.',
    body: 'We build model-agnostic orchestration layers — OpenAI today, Claude or Llama tomorrow, on-prem next quarter if your security team requires it. No provider dependency means you control your AI costs, your data, and your negotiating position. Permanently.',
    contrast: 'Most AI systems are built around a vendor. Ours are built around your business.',
  },
  {
    number: '03',
    topBorder: 'amber' as const,
    title: 'Every Delivery Is Production-Ready. Not Demo-Ready.',
    body: 'Every system ships with defined SLAs, operational runbooks, monitoring pipelines, and RBAC access controls — fully documented for your operations team to run, your security team to audit, and your engineering team to extend. We do not hand over black boxes. We hand over infrastructure you own outright.',
    contrast: 'A demo that cannot survive Monday morning is not a system. It is a liability.',
  },
];

interface PhilosophySectionProps {
  reducedMotion?: boolean;
}

export function PhilosophySection({ reducedMotion = false }: PhilosophySectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading  = headingRef.current;
    const subtitle = subtitleRef.current;
    if (!heading || !subtitle) return;

    if (reducedMotion) {
      gsap.set([heading, subtitle], { opacity: 1, y: 0 });
      return;
    }

    // gsap.set owns the initial state — runs in useLayoutEffect, before browser paint
    gsap.set([heading, subtitle], { opacity: 0, y: 24 });

    gsap.to([heading, subtitle], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
    });

    // perspective on card grid for future 3-D effects
    if (gridRef.current) gsap.set(gridRef.current, { perspective: 900 });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="section-2"
      className="about-philosophy overflow-x-hidden"
      aria-labelledby="about-philosophy-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">
          <div className="text-center">
            <SectionLabel text="[ HOW WE THINK ]" reducedMotion={reducedMotion} />

            <h2
              ref={headingRef}
              id="about-philosophy-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
            >
              Three Principles Behind Every System We Ship
            </h2>

            <p
              ref={subtitleRef}
              className="about-description text-body mx-auto max-w-[480px] 2xl:max-w-[640px] min-[2800px]:max-w-[900px] font-display leading-[1.75] text-[var(--color-text-secondary)] text-center"
              style={{ textAlign: 'center' }}
            >
              Most AI agencies build fast and fix later. We do the opposite. Three principles shape every system we design — and each one exists because we have seen what happens when it is ignored.
            </p>
          </div>

          <div
            ref={gridRef}
            className="about-philosophy-cards grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 2xl:gap-8 min-[1920px]:gap-10"
          >
            {PILLARS.map((pillar, i) => (
              <AnimatedCard
                key={pillar.title}
                topBorder={pillar.topBorder}
                number={pillar.number}
                index={i}
                reducedMotion={reducedMotion}
              >
                <h3 className="text-card-title font-display font-semibold text-[var(--color-text-primary)] mb-2 sm:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-body font-display leading-[1.7] text-[var(--color-text-secondary)]">
                  {pillar.body}
                </p>
                <p
                  className="font-mono text-[var(--color-text-tertiary)]"
                  style={{
                    marginTop: 'clamp(12px, 1.5vw, 20px)',
                    fontSize: 'clamp(11px, 0.85vw, 13px)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    lineHeight: 1.55,
                    borderLeft: '2px solid var(--color-trust-amber)',
                    paddingLeft: 10,
                  }}
                >
                  {pillar.contrast}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
