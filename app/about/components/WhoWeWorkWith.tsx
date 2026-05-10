'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';
import { AnimatedCard } from './shared/AnimatedCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PERSONAS = [
  {
    title: 'Your Prototype Works. Now It Needs to Survive Real Users.',
    body: 'Startups and product teams who have validated their AI concept and hit the ceiling of what a prototype can do. You need production infrastructure observability, failure handling, deployment architecture built by people who have shipped AI systems at scale, not just demoed them.',
    bestFor: 'Product teams at Series A–B stage or growth-phase startups preparing for enterprise customers.',
  },
  {
    title: "You're Running AI Experiments. You Need AI Systems.",
    body: 'Established businesses embedding AI into workflows, products, and decision-making who need systems that integrate with what you already run, not a separate AI layer bolted on top and maintained by an outside vendor indefinitely.',
    bestFor: 'Operations-heavy mid-market companies with existing tech stacks and manual workflows that AI should already be running.',
  },
  {
    title: 'Your Compliance Team Has Questions. We Have Answers Ready.',
    body: 'Organizations in FinTech, HealthTech, Legal, or global markets where AI governance, security controls, and auditability are non-negotiable. We design compliance in from sprint one so by the time your security team reviews the system, there is nothing left to flag.',
    bestFor: 'Companies in regulated industries where a failed compliance review means a delayed or cancelled deployment.',
  },
];

interface WhoWeWorkWithProps {
  reducedMotion?: boolean;
}

export function WhoWeWorkWith({ reducedMotion = false }: WhoWeWorkWithProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    if (reducedMotion) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headingRef.current, { opacity: 0, y: 24 });
    gsap.to(headingRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-who overflow-x-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
      aria-labelledby="about-who-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">

          <div className="text-center">
            <SectionLabel text="[ WHO THIS IS FOR ]" reducedMotion={reducedMotion} />
            <h2
              ref={headingRef}
              id="about-who-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
            >
              Who We Work With
            </h2>
            <p
              className="about-description text-body mx-auto max-w-[560px] 2xl:max-w-[700px] min-[2800px]:max-w-[980px] font-display leading-[1.75] text-[var(--color-text-secondary)] text-center"
              style={{ textAlign: 'center' }}
            >
              Invisigent works with a specific type of organization one that has moved past AI curiosity and is ready to build infrastructure that runs the business.
            </p>
          </div>

          <div className="about-block-spacing grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6 2xl:gap-8">
            {PERSONAS.map((persona, i) => (
              <AnimatedCard
                key={persona.title}
                topBorder={i === 1 ? 'blue' : 'amber'}
                index={i}
                reducedMotion={reducedMotion}
              >
                <h3 className="text-card-title font-display font-semibold text-[var(--color-text-primary)] mb-2 sm:mb-3">
                  {persona.title}
                </h3>
                <p className="text-body font-display leading-[1.7] text-[var(--color-text-secondary)]">
                  {persona.body}
                </p>
                <p
                  className="font-mono text-[var(--color-text-tertiary)]"
                  style={{
                    marginTop: 'clamp(12px, 1.5vw, 18px)',
                    fontSize: 'clamp(11px, 0.8vw, 13px)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    lineHeight: 1.55,
                    borderLeft: '2px solid var(--color-trust-amber)',
                    paddingLeft: 10,
                  }}
                >
                  <span style={{ color: 'var(--color-text-micro)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85em' }}>Best for: </span>
                  {persona.bestFor}
                </p>
              </AnimatedCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
