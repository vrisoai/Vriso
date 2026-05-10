'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import { MagneticButton } from './components/MagneticButton';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

const SERVICES = [
  {
    label: '[ AI STRATEGY CONSULTING ]',
    name: 'AI Strategy & Architecture Roadmap',
    when: 'You have budget committed to AI but no clear picture of what to build, what to prioritize, or whether your current thinking will survive contact with production.',
    what: 'We work with your team to understand your operational environment, existing infrastructure, and actual business constraints — then design an AI architecture and delivery roadmap that maps to your specific system, not a generic AI adoption template. We scope what to build first, what to defer, and where complexity is justified vs. where a simpler approach will outperform an expensive one.',
    outcome: 'A documented architecture plan, prioritized delivery roadmap, and infrastructure strategy your team can execute — with no ambiguity about what gets built, in what order, and why.',
  },
  {
    label: '[ AGENTIC ORCHESTRATION ]',
    name: 'Agentic AI Systems & Workflow Automation',
    when: 'You need AI that runs real workflows autonomously not a chatbot that generates text and stops.',
    what: 'We design and build multi-agent systems using LangGraph state machines with full LangSmith observability. Supervisor agents coordinating specialist subagents, shared memory layers, tool-calling pipelines, and defined failure recovery the full orchestration stack built for production reliability and complete decision traceability. Every agent action is logged and replayable. Not just connected API calls.',
    outcome: 'End-to-end workflow automation where AI systems operate autonomously, handle failure gracefully, and give you full visibility into every decision the system makes.',
  },
  {
    label: '[ RAG KNOWLEDGE SYSTEMS ]',
    name: 'RAG & Enterprise Knowledge Retrieval',
    when: 'Your AI needs to work with internal data documents, databases, wikis, or proprietary knowledge and generic LLM responses are not good enough.',
    what: 'We design and build retrieval pipelines using Pinecone vector stores with hybrid search, Cohere reranking layers, and chunking strategies tuned for your specific document types PDFs, structured databases, internal wikis, or mixed-format data. Sub-3-second retrieval targets, retrieval trace logging, and accuracy validation built in. Not a chatbot wrapper over your documents.',
    outcome: 'Context-aware AI responses grounded in your internal knowledge accurate, fast, hallucination-resistant, and with retrieval you can audit.',
  },
  {
    label: '[ AI PERFORMANCE OPTIMIZATION ]',
    name: 'AI Performance & Cost Optimization',
    when: 'Your AI system works in development but is too slow, too expensive, or degrading under real production load.',
    what: 'We audit your current AI architecture end-to-end inference latency, retrieval pipeline performance, over-calling patterns, cold-start delays, caching gaps and redesign the components creating the bottleneck. We also design semantic caching layers and batching strategies that reduce redundant inference costs significantly.',
    outcome: 'AI infrastructure that performs under real load measurably faster response times, reduced operating costs, and a system that scales without degrading.',
  },
  {
    label: '[ AI-NATIVE PRODUCT DEVELOPMENT ]',
    name: 'AI-Native Product Development',
    when: 'You are building a product, copilot, or platform where AI is the core not a feature added to something that already exists.',
    what: 'We design and develop AI-first products from the ground up FastAPI or Node.js/Express backends, MongoDB for operational data, Docker for portable deployment. AI is embedded into the product\'s core logic and architecture from the first sprint not retrofitted after the product was already built without it. Internal automation workflows included as standard.',
    outcome: 'An AI-native product with embedded intelligence, production-grade infrastructure, and the internal automation that makes the product defensible not just functional.',
  },
  {
    label: '[ COMPLIANCE-READY AI SYSTEMS ]',
    name: 'Compliance-Ready AI Infrastructure',
    when: 'You are deploying AI in a regulated industry FinTech, HealthTech, Legal, or enterprise and governance, auditability, and data residency are non-negotiable.',
    what: 'We build AI systems with compliance architecture designed in from sprint one not reviewed at deployment. Data residency controls at the vector store layer, RBAC from the first infrastructure decision, append-only audit logs that satisfy enterprise security review, and system design aligned with EU AI Act risk classification requirements. GDPR, India\'s DPDP Act, and ISO 42001 alignment documented in writing before a line of code is written.',
    outcome: 'AI infrastructure that passes your compliance team\'s review aligned with EU AI Act, GDPR, DPDP Act, SOC2, and ISO 42001. No last-minute redesigns at the security gate.',
  },
  {
    label: '[ ADVISORY ]',
    name: 'Technology Advisory',
    when: 'You need senior-level technical judgment before committing to an architecture direction, vendor contract, build-vs-buy decision, or scaling strategy and the cost of getting it wrong is high.',
    what: 'We act as your technical partner for decisions that matter architecture reviews, stack evaluation, system design critique, and infrastructure scaling strategy. Direct founder-level engagement. No junior consultants running the analysis.',
    outcome: 'Decisions made with confidence and documented reasoning. Architecture chosen for the right reasons. No expensive rebuilds six months later because the wrong call was made under pressure.',
  },
];

/** Service card 3-col grid separators (inline only — avoids Tailwind override issues) */
const SERVICE_GRID_SEP = '1px solid rgba(255, 255, 255, 0.08)';

const ENGAGEMENTS = [
  {
    num: '01',
    title: 'Strategy & Architecture Engagement',
    who: 'Organizations with a defined AI problem but no clear infrastructure plan — or teams that have started building and need a senior review before going further.',
    what: 'We analyze your environment, constraints, and operational priorities. We design your AI infrastructure strategy, architecture direction, and build sequence — documented and ready to execute.',
    receive: 'A complete architecture plan, build-vs-buy recommendations, and a prioritized roadmap your team can act on immediately — with or without us.',
    timeline: 'Typically 2–4 weeks.',
    note: undefined as string | undefined,
  },
  {
    num: '02',
    title: 'End-to-End System Build',
    who: 'Organizations ready to move from plan to production with a defined problem, committed budget, and a team prepared to own what gets built.',
    what: 'We design, build, and deploy your AI system from orchestration architecture through production deployment. Every phase has defined milestones and deliverables. You are never waiting to find out what is happening or when.',
    receive: 'A fully deployed, documented production AI system — with monitoring pipelines, operational runbooks, RBAC access controls, and everything your team needs to run it without us.',
    timeline: 'Typically 6–16 weeks depending on complexity and integration requirements.',
    note: undefined as string | undefined,
  },
  {
    num: '03',
    title: 'Ongoing Optimization Partnership',
    who: 'Organizations with a production AI system that needs to scale, improve, or adapt as usage grows — who want senior-level involvement without hiring a full-time AI infrastructure team.',
    what: 'We monitor system performance against defined SLAs, identify optimization opportunities, and implement improvements on a quarterly delivery cadence. You define the scope. We deliver to it.',
    receive: 'Quarterly deliverables, performance reports, and system improvements — scoped and priced in advance. No open-ended retainer. No ambiguous "ongoing support."',
    timeline: undefined as string | undefined,
    note: 'This engagement is optional. Every system we build is fully documented and handed over for your team to operate independently. Ongoing partnership is available — never required.',
  },
];


function ColLabel({ children, amber }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(10px, 0.65vw, 14px)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: amber ? 'var(--color-trust-amber)' : 'var(--color-text-micro)',
        marginBottom: 'clamp(0.625rem, 0.65vw, 1.25rem)',
      }}
    >
      {children}
    </div>
  );
}

function ColText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.7,
        margin: 0,
        fontSize: 'clamp(0.875rem, 0.9vw, 1.75rem)',
      }}
    >
      {children}
    </p>
  );
}

const SERVICES_CORE_SECTION_ID = 'services-core';
const SERVICES_HOW_WE_ENGAGE_SECTION_ID = 'services-how-we-engage';

function ServicesHero() {
  const router     = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const scrollToCoreServices = () => {
    document.getElementById(SERVICES_CORE_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useGSAP(() => {
    const els = [badgeRef.current, labelRef.current, h1Ref.current, descRef.current, btnsRef.current];
    if (reducedMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }
      gsap.set(els, { opacity: 0, y: 20 });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(badgeRef.current,  { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
      .to(labelRef.current,  { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.15')
      .to(h1Ref.current,     { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out' }, '-=0.1')
      .to(descRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
      .to(btnsRef.current,   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25');
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-x-hidden overflow-y-visible"
      style={{ background: '#121212', minHeight: 'calc(100svh - var(--nav-h, 64px))' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)',
            animation: 'scan-line 1.2s ease-in-out 0.1s 1 forwards',
            animationFillMode: 'backwards',
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[400px] w-[600px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(45,91,255,0.12), transparent 70%)' }}
      />
      <div className="mx-auto flex w-full flex-1 justify-center py-8 sm:py-10">
        <div
          className="services-hero-content"
          style={{
            textAlign: 'center',
            paddingLeft: 'max(1.5rem, 5vw)',
            paddingRight: 'max(1.5rem, 5vw)',
          }}
        >
          <div
            ref={badgeRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-trust-amber)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
              }}
            >
              System · Services Active
            </span>
          </div>

          <div
            ref={labelRef}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: '0.75rem',
                textAlign: 'left',
              }}
            >
              [ SERVICES ]
            </div>
          </div>

          <h1
            ref={h1Ref}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              lineHeight: 1.08,
              textAlign: 'center',
              margin: '0 0 1.25rem 0',
              paddingBottom: '0.1em',
              color: 'var(--color-text-primary)',
              opacity: 0,
            }}
            className="text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem] 2xl:text-[5.5rem] min-[1920px]:text-[7rem]"
          >
            AI Services Built for Production.{' '}
            <span
              style={{
                background: 'var(--gradient-headline)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline',
                WebkitBoxDecorationBreak: 'clone',
                boxDecorationBreak: 'clone',
              }}
            >
              Not Proof of Concept.
            </span>
          </h1>

          <p
            ref={descRef}
            className="text-sm sm:text-base lg:text-[1.0625rem] 2xl:text-[1.25rem] min-[1920px]:text-[1.625rem]"
            style={{
              maxWidth: 'clamp(400px, 42vw, 960px)',
              margin: '0 auto 2.5rem',
              textAlign: 'center',
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              opacity: 0,
            }}
          >
            Most AI services hand you a tool or a strategy deck. Invisigent designs and deploys production AI systems integrated with your existing infrastructure, compliant with your security requirements, and fully owned by your team from day one. No proprietary platform. No ongoing dependency. Just infrastructure that runs your operations without us in the room.
          </p>

          <div
            ref={btnsRef}
            style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.75rem, 1.2vw, 2rem)', opacity: 0 }}
            className="flex-col sm:flex-row"
          >
            <MagneticButton primary onClick={() => router.push('/contact')}>Start the Conversation</MagneticButton>
            <MagneticButton onClick={scrollToCoreServices}>Explore Services</MagneticButton>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-divider)' }} />
    </section>
  );
}

function PositioningBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);
  const p1Ref      = useRef<HTMLParagraphElement>(null);
  const p2Ref      = useRef<HTMLParagraphElement>(null);
  const negRef     = useRef<HTMLDivElement>(null);
  const quoteRef   = useRef<HTMLParagraphElement>(null);
  const techRef    = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const negations = [
    'No fragile demos. Production systems that run under real load, every day.',
    'No vendor lock-in. Model-agnostic infrastructure you switch and scale without rebuilding.',
    'No disconnected automation. Every agent, pipeline, and workflow connected to your actual operations.',
  ];

  useGSAP(() => {
    const staticEls = [h2Ref.current, p1Ref.current, p2Ref.current, quoteRef.current, techRef.current];
    if (reducedMotion) {
      gsap.set(staticEls, { opacity: 1, x: 0, y: 0 });
      gsap.set('.neg-dash', { scaleX: 1 });
      gsap.set('.neg-item', { opacity: 1, x: 0 });
      return;
    }

    gsap.set(h2Ref.current, { opacity: 0, x: -32 });
    gsap.to(h2Ref.current, {
      opacity: 1, x: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: h2Ref.current, start: 'top 100%', once: true },
    });
    gsap.set([p1Ref.current, p2Ref.current], { opacity: 0, y: 16 });
    gsap.to([p1Ref.current, p2Ref.current], {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: p1Ref.current, start: 'top 100%', once: true },
    });

    const negItems = negRef.current?.querySelectorAll<HTMLElement>('.neg-item');
    const dashes   = negRef.current?.querySelectorAll<HTMLElement>('.neg-dash');
    if (negItems && dashes) {
      gsap.set(dashes, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(negItems, { opacity: 0, x: -24 });
      ScrollTrigger.batch(negItems, {
        start: 'top 100%',
        once: true,
        onEnter: els => {
          gsap.to(els,    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 });
          gsap.to(dashes, { scaleX: 1,         duration: 0.4, ease: 'power2.out', stagger: 0.12 });
        },
      });
    }

    gsap.set(quoteRef.current, { opacity: 0, y: 12 });
    gsap.to(quoteRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: quoteRef.current, start: 'top 100%', once: true },
    });
    gsap.set(techRef.current, { opacity: 0, y: 12 });
    gsap.to(techRef.current, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: techRef.current, start: 'top 100%', once: true },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section ref={sectionRef} className="services-positioning-section">
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: '50%',
              background: 'var(--color-trust-amber)',
              opacity: 0.05 + i * 0.008,
              left: `${(i * 9.7) % 100}%`,
              top: `${(i * 13.3) % 100}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.25}s infinite`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(4rem, 7vw, 16rem)',
          paddingBottom: 'clamp(4rem, 7vw, 16rem)',
          paddingLeft: 'max(1.5rem, 5vw)',
          paddingRight: 'max(1.5rem, 5vw)',
        }}
      >
        <div className="services-positioning-content">
          <h2
            ref={h2Ref}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              margin: '0 0 1.5rem 0',
            }}
            className="text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] 2xl:text-[4.5rem] min-[1920px]:text-[6rem]"
          >
            Not Tools. Systems.
          </h2>

          <p
            ref={p1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              margin: '0 0 2rem 0',
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Most AI vendors sell tools, dashboards, or wrappers  things your team has to operate around. Invisigent builds infrastructure: the systems that connect your models, data, and workflows into something your organization actually owns and runs.
          </p>

          {/* p2Ref kept as invisible spacer so GSAP ref stays valid */}
          <p ref={p2Ref} style={{ display: 'none' }} aria-hidden="true" />

          <div ref={negRef} style={{ marginBottom: '2rem' }}>
            {negations.map((line, i) => (
              <div
                key={i}
                className="neg-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="neg-dash"
                  style={{
                    display: 'inline-block',
                    width: 24,
                    height: 2,
                    background: 'var(--color-trust-amber)',
                    flexShrink: 0,
                    transformOrigin: 'left',
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text-secondary)',
                  }}
                  className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          <p
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: '1.25rem',
              margin: 0,
              lineHeight: 1.65,
            }}
            className="text-base sm:text-lg lg:text-[1.25rem] 2xl:text-[1.625rem] min-[1920px]:text-[2.125rem]"
          >
            Only systems designed for production. Built to be owned, not rented.
          </p>

          <p
            ref={techRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(10px, 0.65vw, 13px)',
              letterSpacing: '0.08em',
              color: 'var(--color-text-tertiary)',
              marginTop: '1.5rem',
            }}
          >
            Built on open frameworks your team can inspect, extend, and own:{' '}
            LangGraph · LangSmith · OpenAI API · Cohere · Pinecone · n8n · FastAPI · Node.js · MongoDB · Docker
          </p>
        </div>
      </div>
    </section>
  );
}

/** Detail panel shown in the right column of the two-panel layout */
function ServiceDetail({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const spotRef   = useRef<HTMLDivElement>(null);
  const hasHover  = useMediaQuery('(hover: hover)');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reducedMotion = useReducedMotion() ?? false;
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const isBorderAmber = index % 2 === 0;
  const accentHex = isBorderAmber ? '#FBBF24' : '#3B82F6';
  const accentRgb = isBorderAmber ? '251,191,36' : '59,130,246';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !spotRef.current) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect || !spotRef.current) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotRef.current.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(${accentRgb},0.07), transparent 72%)`;
      rafRef.current = undefined;
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); if (spotRef.current && !reducedMotion) spotRef.current.style.opacity = '1'; }}
      onMouseLeave={() => { setIsHovered(false); if (spotRef.current) spotRef.current.style.opacity = '0'; }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        background: 'rgba(24, 24, 24, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
        borderTop: `2px solid ${isHovered ? accentHex : `rgba(${accentRgb},0.7)`}`,
        padding: 'clamp(1.75rem, 3vw, 5rem)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? `0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(${accentRgb},0.06)`
          : '0 4px 16px rgba(0,0,0,0.3)',
        minHeight: 'clamp(300px, 38vw, 520px)',
      }}
    >
      {/* Ambient gradient */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `linear-gradient(135deg, rgba(${accentRgb},0.05) 0%, transparent 55%)`,
        opacity: isHovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Mouse spotlight */}
      {hasHover && (
        <div ref={spotRef} aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s',
        }} />
      )}

      {/* Top shimmer on hover */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        overflow: 'hidden', borderRadius: '16px 16px 0 0', zIndex: 0,
        opacity: isHovered && !reducedMotion ? 1 : 0,
        transition: 'opacity 0.3s ease', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '-60%', width: '50%', height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.9), transparent)`,
          animation: isHovered && !reducedMotion ? 'shimmer-scan 1.8s ease-in-out infinite' : 'none',
        }} />
      </div>

      {/* Watermark index */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '1rem', right: '1.5rem',
        fontFamily: "'JetBrains Mono','Courier New',monospace",
        fontWeight: 700,
        fontSize: 'clamp(6rem, 10vw, 12rem)',
        lineHeight: 1,
        color: `rgba(${accentRgb},${isHovered ? '0.06' : '0.03'})`,
        transition: 'color 0.4s ease',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1rem, 2vw, 3.5rem)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 0.6vw, 13px)', color: 'var(--color-text-micro)', letterSpacing: '0.04em' }}>
            {String(index + 1).padStart(2, '0')} —
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 0.6vw, 13px)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: '0.75rem',
          }}>
            {service.label}
          </span>
        </div>

        {/* Service name — larger, this is the focus */}
        <h3
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.15, margin: '0 0 clamp(1.5rem, 2.5vw, 5rem) 0' }}
          className="text-xl sm:text-2xl lg:text-[1.75rem] 2xl:text-[2.25rem] min-[1920px]:text-[2.75rem]"
        >
          {service.name}
        </h3>

        {/* 3-col content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr 1fr' : '1fr', gap: 0 }}>
          <div style={{
            paddingRight: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
            paddingBottom: isDesktop ? 0 : '1rem',
            borderRight: isDesktop ? SERVICE_GRID_SEP : 'none',
            borderBottom: isDesktop ? 'none' : SERVICE_GRID_SEP,
          }}>
            <ColLabel>When you need it</ColLabel>
            <ColText>{service.when}</ColText>
          </div>
          <div style={{
            paddingLeft: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
            paddingRight: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
            paddingTop: isDesktop ? 0 : '1rem',
            paddingBottom: isDesktop ? 0 : '1rem',
            borderRight: isDesktop ? SERVICE_GRID_SEP : 'none',
            borderBottom: isDesktop ? 'none' : SERVICE_GRID_SEP,
          }}>
            <ColLabel>What we do</ColLabel>
            <ColText>{service.what}</ColText>
          </div>
          <div style={{ paddingLeft: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0, paddingTop: isDesktop ? 0 : '1rem' }}>
            <ColLabel amber>Outcome</ColLabel>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              lineHeight: 1.6, margin: 0,
              fontSize: 'clamp(0.9375rem, 0.95vw, 1.875rem)',
              color: isBorderAmber ? 'var(--color-trust-amber)' : 'var(--color-link)',
            }}>
              {service.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCards() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const navWrapRef    = useRef<HTMLDivElement>(null);
  const indicatorRef  = useRef<HTMLDivElement>(null);
  const detailRef     = useRef<HTMLDivElement>(null);
  const navItemRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const isCrossfadeReady = useRef(false);
  const isIndicatorReady = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);       // desktop nav
  const [mobileOpen, setMobileOpen] = useState<number | null>(0); // mobile accordion
  const reducedMotion = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Scroll entrance
  useGSAP(() => {
    if (reducedMotion) {
      gsap.set([headerRef.current, navWrapRef.current, detailRef.current], { opacity: 1, y: 0, x: 0 });
      return;
    }
    gsap.set(headerRef.current, { opacity: 0, y: 24 });
    gsap.to(headerRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 100%', once: true },
    });
    const navItems = navWrapRef.current?.querySelectorAll<HTMLElement>('.service-nav-item');
    if (navItems?.length) {
      gsap.set(navItems, { opacity: 0, x: -16 });
      ScrollTrigger.create({
        trigger: navWrapRef.current,
        start: 'top 100%', once: true,
        onEnter: () => gsap.to(navItems, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.055 }),
      });
    }
    gsap.set(detailRef.current, { opacity: 0, x: 20 });
    gsap.to(detailRef.current, {
      opacity: 1, x: 0, duration: 0.65, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: detailRef.current, start: 'top 100%', once: true },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion, isDesktop] });

  // Slide amber indicator to active nav item (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const activeEl = navItemRefs.current[activeIndex];
    if (!activeEl || !indicatorRef.current) return;
    const dur = isIndicatorReady.current && !reducedMotion ? 0.32 : 0;
    gsap.to(indicatorRef.current, { y: activeEl.offsetTop, height: activeEl.offsetHeight, duration: dur, ease: 'power2.inOut' });
    isIndicatorReady.current = true;
  }, [activeIndex, isDesktop, reducedMotion]);

  // Crossfade detail panel when switching services (skip first mount)
  useEffect(() => {
    if (!isCrossfadeReady.current) { isCrossfadeReady.current = true; return; }
    if (!detailRef.current || reducedMotion) return;
    gsap.fromTo(detailRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
  }, [activeIndex, reducedMotion]);

  return (
    <section
      id={SERVICES_CORE_SECTION_ID}
      ref={sectionRef}
      className="section-wrapper"
      style={{
        background: '#121212',
        scrollMarginTop: 'calc(var(--nav-h, 64px) + 1rem)',
      }}
    >
      <div className="section-inner-max">
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 9rem)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(10px, 0.6vw, 13px)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: '0.75rem',
                textAlign: 'left',
              }}
            >
              [ CORE SERVICES ]
            </div>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              margin: '0 0 0.75rem 0',
            }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
          >
            Seven Ways We Help
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              maxWidth: 'clamp(420px, 32vw, 720px)',
              margin: '0.75rem auto 0',
              textAlign: 'center',
              lineHeight: 1.7,
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Each engagement starts with a specific problem.
            <br />
            Here is what we do about it.
          </p>
        </div>

        {/* ── Two-panel layout ── */}
        {isDesktop ? (
          /* Desktop: sticky left nav + right detail panel */
          <div style={{ display: 'flex', gap: 'clamp(2.5rem, 4vw, 7rem)', alignItems: 'flex-start' }}>

            {/* Left: service navigation list */}
            <div style={{ flexShrink: 0, width: 'clamp(200px, 26vw, 340px)', position: 'sticky', top: 'calc(var(--nav-h, 64px) + 2rem)' }}>
              <div ref={navWrapRef} style={{ position: 'relative' }}>

                {/* Sliding amber indicator bar */}
                <div
                  ref={indicatorRef}
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: 0, top: 0,
                    width: 2, height: 60,
                    background: 'var(--color-trust-amber)',
                    borderRadius: 1, zIndex: 0,
                  }}
                />

                {SERVICES.map((service, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={i}
                      ref={el => { navItemRefs.current[i] = el; }}
                      className="service-nav-item"
                      onClick={() => setActiveIndex(i)}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                        padding: 'clamp(0.75rem, 0.85vw, 1.375rem) clamp(1rem, 1.2vw, 1.75rem)',
                        paddingLeft: 'clamp(1.25rem, 1.5vw, 2.5rem)',
                        background: isActive ? 'rgba(251,191,36,0.05)' : 'transparent',
                        border: 'none', borderRadius: 8,
                        transition: 'background 0.22s ease',
                        position: 'relative', zIndex: 1,
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(9px, 0.5vw, 11px)',
                        letterSpacing: '0.08em',
                        color: isActive ? 'var(--color-trust-amber)' : 'var(--color-text-micro)',
                        marginBottom: '0.2rem',
                        transition: 'color 0.2s ease',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(0.8125rem, 0.85vw, 1.0625rem)',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        lineHeight: 1.3,
                        transition: 'color 0.2s ease',
                      }}>
                        {service.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: detail panel */}
            <div ref={detailRef} style={{ flex: 1, minWidth: 0 }}>
              <ServiceDetail service={SERVICES[activeIndex]} index={activeIndex} />
            </div>
          </div>
        ) : (
          /* Mobile: accordion list */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.map((service, i) => {
              const isOpen = mobileOpen === i;
              const isBorderAmber = i % 2 === 0;
              const accentColor = isBorderAmber ? '#FBBF24' : '#3B82F6';
              const accentRgb   = isBorderAmber ? '251,191,36' : '59,130,246';
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    borderTop: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  {/* Tap row */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`m-service-${i}`}
                    onClick={() => setMobileOpen(isOpen ? null : i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      width: '100%', textAlign: 'left',
                      padding: 'clamp(1rem, 3vw, 1.375rem) 0',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem', letterSpacing: '0.08em',
                      color: isOpen ? accentColor : 'var(--color-text-micro)',
                      flexShrink: 0, minWidth: '2ch',
                      transition: 'color 0.2s ease',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: isOpen ? 600 : 400,
                      fontSize: 'clamp(0.9375rem, 4vw, 1.125rem)',
                      color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      lineHeight: 1.3, flex: 1,
                      transition: 'color 0.22s ease',
                    }}>
                      {service.name}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0, width: 22, height: 22,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: accentColor, fontSize: 20, lineHeight: 1,
                        transition: 'transform 0.26s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >+</span>
                  </button>

                  {/* Expandable body — always in DOM for crawlers */}
                  <div
                    id={`m-service-${i}`}
                    role="region"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.32s ease',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        paddingBottom: 'clamp(1.25rem, 4vw, 2rem)',
                        borderLeft: `2px solid rgba(${accentRgb},0.4)`,
                        paddingLeft: '1rem',
                        marginLeft: 'calc(2ch + 0.875rem)',
                      }}>
                        {/* Label */}
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5625rem', letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-tertiary)',
                          marginBottom: '1.125rem',
                        }}>
                          {service.label}
                        </div>

                        {/* When / What / Outcome stacked */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                          <div>
                            <ColLabel>When you need it</ColLabel>
                            <ColText>{service.when}</ColText>
                          </div>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.125rem' }}>
                            <ColLabel>What we do</ColLabel>
                            <ColText>{service.what}</ColText>
                          </div>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.125rem' }}>
                            <ColLabel amber>Outcome</ColLabel>
                            <p style={{
                              fontFamily: 'var(--font-display)', fontWeight: 600,
                              fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
                              lineHeight: 1.6, margin: 0,
                              color: isBorderAmber ? 'var(--color-trust-amber)' : 'var(--color-link)',
                            }}>
                              {service.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function EngageCard({ item, index }: { item: (typeof ENGAGEMENTS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hasHover = useMediaQuery('(hover: hover)');
  const reducedMotion = useReducedMotion() ?? false;
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !spotRef.current) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect || !spotRef.current) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotRef.current.style.background = `radial-gradient(240px circle at ${x}px ${y}px, rgba(${accentRgb}, 0.07), transparent 70%)`;
      rafRef.current = undefined;
    });
  };

  const isAmber = index % 2 === 0;
  const accentColor = isAmber ? '#FBBF24' : '#2D5BFF';
  const accentRgb = isAmber ? '251,191,36' : '45,91,255';

  return (
    <div
      ref={cardRef}
      className="engage-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        if (spotRef.current && !reducedMotion) spotRef.current.style.opacity = '1';
        if (cardRef.current && !reducedMotion) gsap.to(cardRef.current, { y: -3, duration: 0.3, ease: 'power2.out' });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (spotRef.current) spotRef.current.style.opacity = '0';
        if (cardRef.current && !reducedMotion) gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-card)',
        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        borderTop: `2px solid ${isHovered ? accentColor : `rgba(${accentRgb},0.5)`}`,
        borderRadius: 12,
        padding: 'clamp(1.25rem, 2.5vw, 5rem)',
        boxShadow: isHovered
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(${accentRgb},0.08)`
          : '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isHovered && !reducedMotion ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: `linear-gradient(180deg, rgba(${accentRgb}, 0.06) 0%, rgba(${accentRgb}, 0.02) 40%, transparent 70%)`,
        }}
      />

      {hasHover && (
        <div
          ref={spotRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: '0.75rem',
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 700,
          lineHeight: 1,
          fontSize: 'clamp(3.5rem, 5vw, 5rem)',
          color: isHovered ? `rgba(${accentRgb}, 0.08)` : 'rgba(255,255,255,0.03)',
          transition: 'color 0.4s ease',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {item.num}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 'clamp(10px, 0.6vw, 13px)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-micro)',
            marginBottom: '0.875rem',
          }}
        >
          {item.num}
        </div>

        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: isHovered ? accentColor : 'var(--color-bg-primary)',
            border: `2px solid ${accentColor}`,
            marginBottom: '1.25rem',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered ? `0 0 8px rgba(${accentRgb}, 0.5)` : 'none',
          }}
        />

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            lineHeight: 1.25,
            margin: '0 0 1.25rem 0',
            color: isHovered ? '#FFFFFF' : 'var(--color-text-primary)',
            transition: 'color 0.3s ease',
          }}
          className="text-base sm:text-lg 2xl:text-[1.375rem] min-[1920px]:text-[1.875rem]"
        >
          {item.title}
        </h3>

        {/* WHO THIS IS FOR */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(9px, 0.55vw, 11px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-micro)',
            marginBottom: '0.35rem',
          }}>
            Who this is for
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            color: isHovered ? 'var(--color-text-secondary)' : '#6B7280',
            lineHeight: 1.65,
            margin: 0,
            fontSize: 'clamp(0.8125rem, 0.85vw, 1.5rem)',
            transition: 'color 0.3s ease',
          }}>
            {item.who}
          </p>
        </div>

        {/* WHAT HAPPENS */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(9px, 0.55vw, 11px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-micro)',
            marginBottom: '0.35rem',
          }}>
            What happens
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            color: isHovered ? 'var(--color-text-secondary)' : '#6B7280',
            lineHeight: 1.65,
            margin: 0,
            fontSize: 'clamp(0.8125rem, 0.85vw, 1.5rem)',
            transition: 'color 0.3s ease',
          }}>
            {item.what}
          </p>
        </div>

        {/* WHAT YOU RECEIVE */}
        <div style={{ marginBottom: item.timeline || item.note ? '1rem' : 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(9px, 0.55vw, 11px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-trust-amber)',
            marginBottom: '0.35rem',
          }}>
            What you receive
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            color: isHovered ? 'var(--color-text-secondary)' : '#6B7280',
            lineHeight: 1.65,
            margin: 0,
            fontSize: 'clamp(0.8125rem, 0.85vw, 1.5rem)',
            transition: 'color 0.3s ease',
          }}>
            {item.receive}
          </p>
        </div>

        {/* TIMELINE */}
        {item.timeline && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: item.note ? '0.75rem' : 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px, 0.55vw, 11px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-micro)',
            }}>Timeline:</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px, 0.55vw, 11px)',
              letterSpacing: '0.06em',
              color: 'var(--color-text-tertiary)',
            }}>{item.timeline}</span>
          </div>
        )}

        {/* NOTE */}
        {item.note && (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.75rem, 0.75vw, 1.25rem)',
            color: 'var(--color-text-micro)',
            lineHeight: 1.6,
            margin: 0,
            borderLeft: `2px solid rgba(${accentRgb}, 0.3)`,
            paddingLeft: '0.625rem',
          }}>
            {item.note}
          </p>
        )}
      </div>
    </div>
  );
}

function HowToEngage() {
  const ref          = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const isDesktop     = useMediaQuery('(min-width: 768px)');
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (isDesktop) gsap.set('.engage-card', { opacity: 1, y: 0 });
      else gsap.set(carouselRef.current, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(headerRef.current, { opacity: 0, y: 24 });
    gsap.to(headerRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 100%', once: true },
    });
    if (isDesktop) {
      gsap.set('.engage-card', { opacity: 0, y: 32 });
      ScrollTrigger.batch('.engage-card', {
        start: 'top 100%',
        once: true,
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.2)', stagger: 0.12,
        }),
      });
    } else {
      gsap.set(carouselRef.current, { opacity: 0, y: 32 });
      gsap.to(carouselRef.current, {
        opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: carouselRef.current, start: 'top 100%', once: true },
      });
    }
  }, { scope: ref, dependencies: [reducedMotion, isDesktop] });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) setActiveSlide(s => Math.min(ENGAGEMENTS.length - 1, s + 1));
      else        setActiveSlide(s => Math.max(0, s - 1));
    }
  };

  return (
    <section
      id={SERVICES_HOW_WE_ENGAGE_SECTION_ID}
      ref={ref}
      style={{
        background: '#121212',
        paddingTop: 'clamp(2.5rem, 7vw, 16rem)',
        paddingBottom: 'clamp(2.5rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
        scrollMarginTop: 'calc(var(--nav-h, 64px) + 1rem)',
      }}
    >
      <div className="section-inner-max" style={{ margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{ marginBottom: 'clamp(2rem, 4vw, 9rem)', textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: '0.75rem',
              marginBottom: '1.25rem',
              display: 'inline-block',
            }}
          >
            [ HOW WE ENGAGE ]
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              margin: '0 0 0.875rem 0',
            }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
          >
            Three Ways to Engage With Invisigent
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              margin: '0 auto',
              maxWidth: 'clamp(520px, 38vw, 900px)',
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Where you start depends on where you are. If you have a problem but no plan, we start with strategy. If you have a plan and need it built, we build it. If you have a system running and need it to scale, we stay involved on your terms.
          </p>
        </div>

        {/* Desktop: 3-col grid */}
        {isDesktop ? (
          <div
            className="grid grid-cols-3"
            style={{ gap: 'clamp(0.75rem, 2vw, 4.5rem)' }}
          >
            {ENGAGEMENTS.map((item, i) => (
              <EngageCard key={item.num} item={item} index={i} />
            ))}
          </div>
        ) : (
          /* Mobile: carousel */
          <div>
            {/*
              Viewport breaks out of section padding so cards swipe edge-to-edge.
              Each slide re-applies the padding internally.
            */}
            <div
              ref={carouselRef}
              style={{
                overflow: 'hidden',
                marginLeft: 'calc(-1 * max(1.5rem, 5vw))',
                marginRight: 'calc(-1 * max(1.5rem, 5vw))',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Engagement models carousel"
            >
              <div
                role="list"
                style={{
                  display: 'flex',
                  transform: `translateX(-${activeSlide * 100}%)`,
                  transition: reducedMotion ? 'none' : 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {ENGAGEMENTS.map((item, i) => (
                  <div
                    key={item.num}
                    role="listitem"
                    aria-hidden={activeSlide !== i}
                    style={{
                      flex: '0 0 100%',
                      minWidth: 0,
                      padding: '0 max(1.5rem, 5vw)',
                    }}
                  >
                    <EngageCard item={item} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators + prev/next */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <button
                type="button"
                aria-label="Previous engagement model"
                onClick={() => setActiveSlide(s => Math.max(0, s - 1))}
                style={{
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: activeSlide === 0 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-secondary)',
                  cursor: activeSlide === 0 ? 'default' : 'pointer',
                  transition: 'color 0.2s, background 0.2s',
                  fontSize: 14, lineHeight: 1,
                }}
              >
                ‹
              </button>

              <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                {ENGAGEMENTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Go to slide ${i + 1} of ${ENGAGEMENTS.length}`}
                    aria-current={activeSlide === i ? 'true' : undefined}
                    style={{
                      width: activeSlide === i ? 20 : 7,
                      height: 7,
                      borderRadius: 4,
                      background: activeSlide === i ? 'var(--color-trust-amber)' : 'rgba(255,255,255,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next engagement model"
                onClick={() => setActiveSlide(s => Math.min(ENGAGEMENTS.length - 1, s + 1))}
                style={{
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: activeSlide === ENGAGEMENTS.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--color-text-secondary)',
                  cursor: activeSlide === ENGAGEMENTS.length - 1 ? 'default' : 'pointer',
                  transition: 'color 0.2s, background 0.2s',
                  fontSize: 14, lineHeight: 1,
                }}
              >
                ›
              </button>
            </div>

            {/* Step counter */}
            <p
              style={{
                textAlign: 'center',
                marginTop: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.08em',
                color: 'var(--color-text-micro)',
              }}
            >
              {activeSlide + 1} / {ENGAGEMENTS.length}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}


function ServicesCTA() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useGSAP(() => {
    const children = contentRef.current ? Array.from(contentRef.current.children) : [];
    if (!children.length) return;
    if (reducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(children, { opacity: 0, y: 20 });
    gsap.to(children, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: contentRef.current, start: 'top 100%', once: true },
    });
  }, { scope: ref, dependencies: [reducedMotion] });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-primary)',
        position: 'relative',
        zIndex: 2,
        paddingTop: 'clamp(2.5rem, 7vw, 16rem)',
        paddingBottom: 'clamp(2.5rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[300px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,91,255,0.07), transparent 70%)',
        }}
      />

      <div ref={contentRef} className="services-cta-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: '0.75rem',
              textAlign: 'left',
            }}
          >
            [ LET&apos;S BUILD ]
          </div>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.1,
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
          }}
          className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
        >
          The Right System. Built Once. Owned Forever.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.75,
            margin: '0 auto 2.5rem',
            textAlign: 'center',
            maxWidth: 'clamp(500px, 40vw, 900px)',
          }}
          className="text-balance text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
        >
          If you have a defined operational problem and a team ready to own what gets built this is where that conversation starts. Invisigent takes on a limited number of system builds each quarter. Every engagement is handled directly by our founder, from architecture review through production deployment.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(0.875rem, 1.2vw, 2rem)',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/contact"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(0.875rem, 0.8vw, 1.375rem)',
              letterSpacing: '0.02em',
              padding: 'clamp(0.875rem, 0.8vw, 1.5rem) clamp(2rem, 2.5vw, 3.5rem)',
              borderRadius: '9999px',
              background: 'var(--color-btn-bg)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              whiteSpace: 'nowrap',
              width: 'auto',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#2D5BFF';
              el.style.boxShadow = '0 0 20px rgba(45,91,255,0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(255,255,255,0.15)';
              el.style.boxShadow = 'none';
            }}
          >
            Start the Conversation
          </a>

          <button
            type="button"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(0.875rem, 0.8vw, 1.375rem)',
              letterSpacing: '0.02em',
              padding: 'clamp(0.875rem, 0.8vw, 1.5rem) clamp(2rem, 2.5vw, 3.5rem)',
              borderRadius: '9999px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#FBBF24';
              el.style.color = '#FBBF24';
              el.style.boxShadow = '0 0 16px rgba(251,191,36,0.15)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(255,255,255,0.1)';
              el.style.color = 'var(--color-text-secondary)';
              el.style.boxShadow = 'none';
            }}
            onClick={() =>
              document
                .getElementById(SERVICES_HOW_WE_ENGAGE_SECTION_ID)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            See How We Work
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.375rem 0.75rem',
            marginTop: '1.5rem',
            marginBottom: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(10px, 0.6vw, 13px)',
            letterSpacing: '0.06em',
            color: 'var(--color-text-micro)',
          }}
        >
          <span style={{ color: 'var(--color-trust-amber)', fontSize: 6 }}>●</span>
          EU AI Act · ISO 42001 · GDPR · DPDP Act
        </div>
      </div>
    </section>
  );
}

const COMPLIANCE_ITEMS = [
  {
    code: 'GDPR',
    region: 'European Union',
    requires: 'Data residency controls, right-to-erasure architecture, and lawful processing design for AI systems handling EU personal data.',
    builds: 'Vector store data residency configuration, deletion-compliant data pipelines, and processing lawfulness documentation designed in from the first sprint so your EU deployment never hits a regulatory block at review.',
  },
  {
    code: 'DPDP Act',
    region: 'India',
    requires: 'Consent management architecture and data fiduciary obligations for AI systems processing Indian personal data under the Digital Personal Data Protection Act 2023.',
    builds: 'Consent collection and withdrawal pipelines, data fiduciary documentation, and purpose-limitation controls built for Indian enterprises operating under DPDP obligations from day one.',
  },
  {
    code: 'EU AI Act',
    region: 'European Union',
    requires: 'Risk classification assessment, transparency obligations, and prohibited or high-risk AI system design review for EU-regulated deployments.',
    builds: 'Pre-build risk classification review, Article 13 transparency documentation, and system architecture aligned with high-risk AI requirements completed before a line of code is written.',
  },
  {
    code: 'ISO 42001',
    region: 'Global',
    requires: 'An AI Management System with documented policies, operational controls, and governance frameworks aligned with international AI governance standards.',
    builds: 'Policy documentation, operational control frameworks, and system governance architecture aligned with ISO 42001 giving organizations a credible foundation for AI governance certification.',
  },
  {
    code: 'SOC2',
    region: 'United States',
    requires: 'Security, availability, and confidentiality controls designed into system architecture for US-market enterprise deployments and procurement requirements.',
    builds: 'Security control architecture, availability monitoring, and confidentiality design built to SOC2 Trust Service Criteria so enterprise procurement reviews find nothing to flag.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Which compliance frameworks do you support?',
    a: 'We design systems aligned with GDPR for EU deployments, India\'s DPDP Act for Indian operations, EU AI Act risk classification requirements, ISO 42001 for AI governance documentation, and SOC2 for US enterprise procurement. Compliance architecture is included in every system build not offered as a separate add-on or reviewed at deployment.',
  },
  {
    q: 'What does "compliance designed in" actually mean?',
    a: 'It means compliance requirements are collected during discovery and built into the system architecture before development begins. Data residency controls, RBAC, audit trails, and governance documentation are designed from sprint one so by the time your security or legal team reviews the system, there is nothing left to retrofit.',
  },
  {
    q: 'What happens after the system is deployed?',
    a: 'Every system ships with operational runbooks, monitoring configuration, defined performance baselines, and full documentation everything your team needs to run it without us. For organizations that want ongoing optimization and scaling support, we offer quarterly partnership engagements with defined deliverables. Ongoing involvement is always optional never a requirement.',
  },
  {
    q: 'Can I start with a strategy engagement and move to a full system build?',
    a: 'Yes and this is a common progression. The strategy engagement produces a documented architecture plan your team can act on immediately. If you choose to move to a full system build, the architecture work completed in the strategy phase becomes the foundation no duplication, no restart.',
  },
  {
    q: 'Do you build on our existing tech stack or replace it?',
    a: 'We design around what you already run. Our infrastructure is model-agnostic and framework-flexible we integrate with your existing CRMs, databases, and internal tools rather than replacing them with a proprietary platform. If components of your current stack are creating bottlenecks, we will tell you during discovery before development begins.',
  },
  {
    q: 'How do you handle system performance after deployment?',
    a: 'Every system ships with defined SLAs and monitoring pipelines. For ongoing partnership engagements, we conduct quarterly performance reviews, identify optimization opportunities, and implement improvements against agreed deliverables. Performance baselines are set during deployment so you always have a clear reference point for what the system should be doing.',
  },
  {
    q: 'What AI frameworks and infrastructure do you build on?',
    a: 'We build on open frameworks your team can inspect, extend, and own LangGraph for agent orchestration, LangSmith for observability, Pinecone for vector retrieval, FastAPI and Node.js for backend infrastructure, and Docker for portable deployment. No proprietary platform. No lock-in. Every component is replaceable if a better option emerges.',
  },
];

function ComplianceDeepDive() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      gsap.set('.compliance-row', { opacity: 1, x: 0 });
      return;
    }
    gsap.set(headerRef.current, { opacity: 0, y: 24 });
    gsap.to(headerRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 100%', once: true },
    });
    gsap.set('.compliance-row', { opacity: 0, x: -24 });
    ScrollTrigger.batch('.compliance-row', {
      start: 'top 100%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.09,
      }),
    });
  }, { scope: ref, dependencies: [reducedMotion] });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(2.5rem, 7vw, 16rem)',
        paddingBottom: 'clamp(2.5rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
      }}
    >
      <div className="section-inner-max" style={{ margin: '0 auto' }}>
        <div
          ref={headerRef}
          style={{ marginBottom: 'clamp(2rem, 4vw, 9rem)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: '0.75rem',
              marginBottom: '1.25rem',
              display: 'inline-block',
            }}
          >
            [ COMPLIANCE ]
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              margin: '0 0 1rem 0',
            }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
          >
            AI Compliance Architecture Built In From Sprint One
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: 'clamp(520px, 42vw, 900px)',
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Every Invisigent system is designed to meet the compliance requirements of the jurisdictions it operates in before development begins — not after your security team flags a problem at deployment review. We cover five major frameworks across global markets.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {COMPLIANCE_ITEMS.map((item) => (
            <div
              key={item.code}
              className="compliance-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(80px, 10vw, 160px) 1fr 1fr',
                gap: 'clamp(1rem, 2vw, 3rem)',
                alignItems: 'start',
                padding: 'clamp(1.25rem, 1.75vw, 2.5rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(10px, 0.65vw, 13px)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: 'var(--color-trust-amber)',
                    display: 'block',
                    marginBottom: '0.3rem',
                  }}
                >
                  {item.code}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(9px, 0.55vw, 12px)',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-micro)',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.region}
                </span>
              </div>

              {/* What it requires */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(9px, 0.5vw, 11px)',
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-micro)',
                  marginBottom: '0.35rem',
                }}>
                  What it requires
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.8125rem, 0.85vw, 1.5rem)',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}>
                  {item.requires}
                </p>
              </div>

              {/* What we build */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(9px, 0.5vw, 11px)',
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'var(--color-trust-amber)',
                  marginBottom: '0.35rem',
                }}>
                  What we build
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.8125rem, 0.85vw, 1.5rem)',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}>
                  {item.builds}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(10px, 0.65vw, 13px)',
            letterSpacing: '0.06em',
            color: 'var(--color-text-micro)',
            lineHeight: 1.65,
            marginTop: 'clamp(1.5rem, 3vw, 4rem)',
            borderLeft: '2px solid var(--color-trust-amber)',
            paddingLeft: '0.75rem',
          }}
        >
          Compliance requirements collected during discovery. Architecture designed to meet them before development begins. No surprises at deployment.
        </p>
      </div>
    </section>
  );
}

function ServicesFAQ() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      gsap.set(itemRefs.current.filter(Boolean), { opacity: 1, y: 0 });
      return;
    }
    gsap.set(headerRef.current, { opacity: 0, y: 24 });
    gsap.to(headerRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 100%', once: true },
    });
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.set(item, { opacity: 0, y: 20 });
      gsap.to(item, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.08,
        scrollTrigger: { trigger: item, start: 'top 100%', once: true },
      });
    });
  }, { scope: ref, dependencies: [reducedMotion] });

  return (
    <section
      ref={ref}
      style={{
        background: '#121212',
        paddingTop: 'clamp(2.5rem, 7vw, 16rem)',
        paddingBottom: 'clamp(2.5rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
      }}
    >
      <div className="section-inner-max" style={{ margin: '0 auto' }}>
        <div
          ref={headerRef}
          style={{ marginBottom: 'clamp(2rem, 4vw, 9rem)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderLeft: '2px solid var(--color-trust-amber)',
              paddingLeft: '0.75rem',
              marginBottom: '1.25rem',
              display: 'inline-block',
            }}
          >
            [ FAQ ]
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              margin: '0 0 1rem 0',
            }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
          >
            Technical Questions About Our Services
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: 'clamp(520px, 42vw, 900px)',
              margin: 0,
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            For questions about fit, process, and working with us visit our{' '}
            <a
              href="/about"
              style={{ color: 'var(--color-trust-amber)', textDecoration: 'none' }}
            >
              About page
            </a>
            .
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <button
                  type="button"
                  id={`sfaq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`sfaq-answer-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    width: '100%',
                    textAlign: 'left',
                    padding: 'clamp(1rem, 1.5vw, 2rem) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      fontSize: 'clamp(0.9375rem, 0.95vw, 1.875rem)',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-trust-amber)',
                      fontSize: 18,
                      lineHeight: 1,
                      transition: 'transform 0.25s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      marginTop: 2,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/*
                  Answer always in the DOM — SSR-visible for crawlers.
                  CSS grid-template-rows collapses it visually when closed.
                */}
                <div
                  id={`sfaq-answer-${i}`}
                  role="region"
                  aria-labelledby={`sfaq-btn-${i}`}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.28s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(0.875rem, 0.9vw, 1.75rem)',
                        lineHeight: 1.75,
                        color: 'var(--color-text-secondary)',
                        paddingBottom: 'clamp(1rem, 1.5vw, 2rem)',
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default function ServicesPageClient() {
  return (
    <main className="services-page" style={{ background: '#121212', overflowX: 'clip' }}>
      <ServicesHero />
      <PositioningBlock />
      <ServiceCards />
      <HowToEngage />
      <ComplianceDeepDive />
      <ServicesFAQ />
      <ServicesCTA />
      <InvisigentLogoSection />
      <FooterSection />

      {/* GEO — semantic keyword signals for AI search engines */}
      <div className="sr-only">
        Enterprise AI infrastructure services. LangGraph agent orchestration consulting.
        Pinecone RAG knowledge retrieval systems. AI automation with n8n and FastAPI.
        LangSmith AI observability. Multi-agent AI systems. AI performance optimization.
        Compliance-ready AI infrastructure. GDPR AI systems. EU AI Act risk classification.
        DPDP Act India AI compliance. ISO 42001 AI management. SOC2 AI architecture.
        AI strategy consulting. Production AI deployment. Model-agnostic AI systems.
        No vendor lock-in AI infrastructure. Enterprise AI consulting India United States Europe.
      </div>
    </main>
  );
}

