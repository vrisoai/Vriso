'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';
import { AnimatedCard } from './shared/AnimatedCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FOCUS_CARDS = [
  {
    tag: 'ORCH', number: '01',
    title: 'Multi-Agent Orchestration Systems',
    body: 'Complex task sequences coordinated across multiple AI agents with full state management, decision traceability, and production-grade failure handling. Built for workflows too complex for a single model and too critical for a black-box solution.',
    outcome: 'Your operations run autonomously. Your team sees exactly what every agent did and why.',
  },
  {
    tag: 'AUTO', number: '02',
    title: 'AI Automation That Replaces Manual Workflows',
    body: 'Automation pipelines that connect your existing systems CRMs, databases, internal tools to AI decision layers. Manual handoffs eliminated. Autonomous operations enabled. Built for scale, not just for demo conditions.',
    outcome: 'Your team stops doing work that a well-built system should be doing instead.',
  },
  {
    tag: 'KNOW', number: '03',
    title: 'Your Internal Knowledge. Finally Retrievable.',
    body: 'RAG pipelines connected to your internal documents, databases, and knowledge bases — delivering accurate, context-aware answers in under 3 seconds. Audit-ready retrieval traces included. Hallucinations engineered out, not hoped away.',
    outcome: 'Your team stops digging through tabs. Your AI starts answering with your actual data.',
  },
  {
    tag: 'PROD', number: '04',
    title: 'AI Products Built for Production From Day One',
    body: 'Copilots, intelligent assistants, and AI-first internal tools built with production infrastructure from the first sprint. Backend API design, model integration, observability pipelines, and deployment architecture included as standard, not added at the end.',
    outcome: 'Your AI product ships with infrastructure that survives real users not just internal demos.',
  },
];

interface OurFocusProps {
  reducedMotion?: boolean;
}

export function OurFocus({ reducedMotion = false }: OurFocusProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set([headingRef.current, subtitleRef.current, ctaRef.current], { opacity: 1, y: 0 });
      return;
    }

    // heading + subtitle — GSAP exclusively owns opacity/y from before paint
    gsap.set([headingRef.current, subtitleRef.current], { opacity: 0, y: 24 });
    gsap.to([headingRef.current, subtitleRef.current], {
      opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
    });

    // CTA row
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.to(ctaRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-focus overflow-x-hidden"
      style={{ background: '#121212' }}
      aria-labelledby="about-focus-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">

          <div className="text-center">
            <SectionLabel text="[ WHAT WE BUILD ]" reducedMotion={reducedMotion} />
            <h2
              ref={headingRef}
              id="about-focus-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
            >
              What We Build
            </h2>
            <p
              ref={subtitleRef}
              className="about-description text-body mx-auto max-w-[560px] 2xl:max-w-[700px] min-[2800px]:max-w-[980px] font-display leading-[1.75] text-[var(--color-text-secondary)] text-center"
              style={{ textAlign: 'center' }}
            >
              Four categories of production AI infrastructure — each designed to be owned, operated, and scaled by your team.
            </p>
          </div>

          <div className="about-block-spacing grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 min-[1920px]:gap-12">
            {FOCUS_CARDS.map((card, i) => (
              <AnimatedCard
                key={card.title}
                topBorder="blue"
                number={card.number}
                index={i}
                reducedMotion={reducedMotion}
                className="relative group"
              >
                <span
                  className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-micro)] transition-colors duration-300 group-hover:text-[var(--color-trust-amber)] sm:right-4 sm:top-4"
                  aria-hidden="true"
                >
                  {card.tag}
                </span>
                <h3 className="text-card-title font-display font-semibold text-[var(--color-text-primary)] mb-2 pr-10 sm:mb-3 sm:pr-12">
                  {card.title}
                </h3>
                <p className="text-body font-display leading-[1.7] text-[var(--color-text-secondary)]">
                  {card.body}
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
                  {card.outcome}
                </p>
              </AnimatedCard>
            ))}
          </div>

          <div
            ref={ctaRef}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            style={{ marginTop: '2.5rem' }}
          >
            <a
              href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 9999, fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(0.875rem, 0.8vw, 1rem)', padding: '0.875rem 2rem',
                whiteSpace: 'nowrap', textDecoration: 'none',
                background: 'var(--color-btn-bg)',
                border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-text-primary)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D5BFF'; e.currentTarget.style.boxShadow = '0 0 20px rgba(45,91,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Full Service Breakdown
            </a>
            <a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 9999, fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(0.875rem, 0.8vw, 1rem)', padding: '0.875rem 2rem',
                whiteSpace: 'nowrap', textDecoration: 'none',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)',
                transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FBBF24'; e.currentTarget.style.color = '#FBBF24'; e.currentTarget.style.boxShadow = '0 0 16px rgba(251,191,36,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Start a Conversation
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
