'use client';

import Script from 'next/script';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE } from '@/app/lib/animations';
import { FooterSection, VrisoLogoSection } from '@/app/components';
import { MagneticButton } from './components/MagneticButton';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

const SERVICES = [
  {
    label: '[ STRATEGY ]',
    name: 'AI & Technology Strategy Consulting',
    when: "You don't know where AI fits in your business or what to build first.",
    what: 'We design your AI roadmap, architecture direction, and infrastructure strategy aligned with your business outcomes.',
    outcome: 'A clear, executable plan for AI adoption — not experiments, but systems.',
  },
  {
    label: '[ ORCHESTRATION ]',
    name: 'Agentic Orchestration & AI Workflows',
    when: 'You want AI systems that automate real workflows, not just generate outputs.',
    what: 'We build multi-agent systems that coordinate tasks, delegate decisions, and automate operations across departments.',
    outcome: 'End-to-end automation where AI actually runs workflows — not assists them.',
  },
  {
    label: '[ KNOWLEDGE ]',
    name: 'RAG & Knowledge Retrieval Systems',
    when: 'Your AI needs access to internal data, documents, or knowledge bases.',
    what: 'We design secure retrieval pipelines using Retrieval-Augmented Generation to connect AI systems to your enterprise knowledge sources.',
    outcome:
      'Accurate, context-aware AI responses grounded in your own data — not hallucinated from general training.',
  },
  {
    label: '[ PERFORMANCE ]',
    name: 'AI Performance & Latency Optimization',
    when: 'Your AI system is slow, expensive, or unreliable in production.',
    what: 'We optimize inference pipelines, caching layers, and system architecture to improve speed and reduce cost at scale.',
    outcome: 'Fast, scalable, and cost-efficient AI systems that perform under real production load.',
  },
  {
    label: '[ PRODUCTS ]',
    name: 'AI-Native Product Development',
    when: 'You want to build an AI-first product, copilot, or intelligent platform.',
    what: 'We design and develop AI-native applications with embedded intelligence, automated workflows, and production-grade architecture.',
    outcome: 'Products that are AI-powered at the core — not retrofitted with AI features after the fact.',
  },
  {
    label: '[ COMPLIANCE ]',
    name: 'Compliance-Ready AI Systems',
    when: 'You are deploying AI in regulated or enterprise environments where governance matters.',
    what: 'We build systems with governance, security, audit trails, and regulatory compliance designed into the architecture from day one — not retrofitted.',
    outcome:
      "AI systems ready for enterprise deployment — aligned with the EU AI Act, ISO 42001, GDPR, and India's DPDP Act.",
  },
  {
    label: '[ ADVISORY ]',
    name: 'Technology Consulting',
    when: 'You need senior-level technical guidance before committing to a direction, vendor, or build.',
    what: 'We act as your technical partner — architecture reviews, build-vs-buy decisions, system design, and scaling strategy for AI infrastructure.',
    outcome: 'Decisions made with confidence. Architecture chosen for the right reasons. No expensive rebuilds six months later.',
  },
];

/** Service card 3-col grid separators (inline only — avoids Tailwind override issues) */
const SERVICE_GRID_SEP = '1px solid rgba(255, 255, 255, 0.08)';

const ENGAGEMENTS = [
  {
    num: '01',
    title: 'Strategy Engagement',
    body: 'Short-term advisory to define your AI architecture, roadmap, and infrastructure strategy. Typically 2–4 weeks. Ends with a clear, actionable plan your team can execute.',
  },
  {
    num: '02',
    title: 'System Build',
    body: 'End-to-end design and development of your AI system — from architecture to production deployment. We own the build and hand over a system your team can run.',
  },
  {
    num: '03',
    title: 'Ongoing Partnership',
    body: 'Continuous optimization, scaling, and system evolution after launch. We stay involved as your AI infrastructure grows — monitoring, improving, and adapting.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Builders moving to production',
    body: 'Startups and product teams who have validated their AI idea and need infrastructure that can scale beyond the prototype.',
  },
  {
    title: 'Companies integrating AI into operations',
    body: 'Established businesses embedding AI into workflows, products, and decision-making — and need systems that actually integrate with what they already run.',
  },
  {
    title: 'Enterprises with compliance requirements',
    body: 'Organizations in regulated industries or global markets where AI governance, security, and auditability are non-negotiable from the start.',
  },
] as const;

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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [100, 400, 900, 1400];
    const timers = timings.map((t, i) => window.setTimeout(() => setPhase(i + 1), t));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const scrollToCoreServices = () => {
    document.getElementById(SERVICES_CORE_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
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
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              lineHeight: 1.08,
              textAlign: 'center',
              margin: '0 0 1.25rem 0',
              paddingBottom: '0.1em',
              color: 'var(--color-text-primary)',
            }}
            className="text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem] 2xl:text-[5.5rem] min-[1920px]:text-[7rem]"
          >
            Enterprise AI Services That Go{' '}
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
              Beyond Tools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 16 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-sm sm:text-base lg:text-[1.0625rem] 2xl:text-[1.25rem] min-[1920px]:text-[1.625rem]"
            style={{
              maxWidth: 'clamp(400px, 42vw, 960px)',
              margin: '0 auto 2.5rem',
              textAlign: 'center',
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
            }}
          >
            We design and build AI systems that integrate with your infrastructure, data, and operations. From
            strategy to deployment, Invisigent delivers production-ready AI architecture built for scale, performance, and
            control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 12 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.75rem, 1.2vw, 2rem)' }}
            className="flex-col sm:flex-row"
          >
            <MagneticButton primary>Start the Conversation</MagneticButton>
            <MagneticButton onClick={scrollToCoreServices}>Explore Services</MagneticButton>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-divider)' }} />
    </section>
  );
}

function PositioningBlock() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const negations = ['No fragile demos.', 'No vendor lock-in.', 'No disconnected automation.'];

  return (
    <section ref={ref} className="services-positioning-section">
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
          <motion.h2
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
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
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              margin: '0 0 0.75rem 0',
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Most AI vendors sell tools, dashboards, or wrappers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              margin: '0 0 2rem 0',
            }}
            className="text-sm sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]"
          >
            Invisigent builds infrastructure — the systems that connect models, data, and workflows into something your
            organization can actually run.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
            }}
            style={{ marginBottom: '2rem' }}
          >
            {negations.map((line, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <motion.span
                  variants={{
                    hidden: { scaleX: 0 },
                    visible: {
                      scaleX: 1,
                      transition: { duration: 0.4, ease: EASE },
                    },
                  }}
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
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
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
            Only systems designed for production.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ServiceCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
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
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.75rem, 1.5vw, 3.5rem)',
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasHover = useMediaQuery('(hover: hover)');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reducedMotion = useReducedMotion() ?? false;
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const isBorderAmber = index % 2 === 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
      rafRef.current = undefined;
    });
  };

  const spotlightTint = isBorderAmber ? 'rgba(251, 191, 36, 0.06)' : 'rgba(45, 91, 255, 0.06)';

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight((s) => ({ ...s, active: false }));
      }}
      whileHover={hasHover && !reducedMotion ? { y: -4, transition: { duration: 0.3, ease: EASE } } : {}}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        background: 'rgba(31, 31, 31, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)'}`,
        borderTop: `2px solid ${
          isHovered
            ? isBorderAmber
              ? '#FBBF24'
              : '#3B82F6'
            : isBorderAmber
              ? 'rgba(251, 191, 36, 0.7)'
              : 'rgba(45, 91, 255, 0.7)'
        }`,
        padding: 'clamp(1.25rem, 2.5vw, 5rem)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? isBorderAmber
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(251, 191, 36, 0.08)'
            : '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(45, 91, 255, 0.08)'
          : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Hover: top-down gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isHovered && hasHover && !reducedMotion ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: isBorderAmber
            ? 'linear-gradient(180deg, rgba(251,191,36,0.04) 0%, transparent 50%)'
            : 'linear-gradient(180deg, rgba(45,91,255,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Mouse spotlight */}
      {hasHover && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightTint}, transparent 72%)`,
            opacity: spotlight.active ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Top-edge shimmer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          zIndex: 0,
          opacity: isHovered && hasHover && !reducedMotion ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-60%',
            width: '50%',
            height: '100%',
            background: isBorderAmber
              ? 'linear-gradient(90deg, transparent, rgba(251,191,36,0.9), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(59,130,246,0.9), transparent)',
            animation:
              isHovered && hasHover && !reducedMotion ? 'shimmer-scan 1.8s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-[4rem] sm:text-[5rem]"
        style={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.75rem',
          maxWidth: '33%',
          overflow: 'hidden',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontWeight: 700,
          lineHeight: 1,
          color: isHovered && hasHover && !reducedMotion
            ? isBorderAmber
              ? 'rgba(251, 191, 36, 0.07)'
              : 'rgba(45, 91, 255, 0.07)'
            : 'rgba(251, 191, 36, 0.03)',
          transition: 'color 0.4s ease',
          zIndex: 0,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: 'clamp(0.75rem, 2vw, 3.5rem)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(10px, 0.6vw, 13px)',
              color: 'var(--color-text-micro)',
              letterSpacing: '0.04em',
            }}
          >
            {String(index + 1).padStart(2, '0')} —
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(10px, 0.6vw, 13px)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderLeft: '1px solid rgba(255,255,255,0.12)',
              paddingLeft: '0.75rem',
            }}
          >
            {service.label}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            margin: '0 0 clamp(1rem, 2vw, 4rem) 0',
          }}
          className="text-base sm:text-lg lg:text-xl 2xl:text-[1.75rem] min-[1920px]:text-[2.25rem]"
        >
          {service.name}
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '1fr 1fr 1fr' : '1fr',
            gap: 0,
          }}
        >
          <div
            style={{
              paddingRight: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
              paddingBottom: isDesktop ? 0 : '1rem',
              borderRight: isDesktop ? SERVICE_GRID_SEP : 'none',
              borderBottom: isDesktop ? 'none' : SERVICE_GRID_SEP,
            }}
          >
            <ColLabel>When you need it</ColLabel>
            <ColText>{service.when}</ColText>
          </div>

          <div
            style={{
              paddingLeft: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
              paddingRight: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
              paddingTop: isDesktop ? 0 : '1rem',
              paddingBottom: isDesktop ? 0 : '1rem',
              borderRight: isDesktop ? SERVICE_GRID_SEP : 'none',
              borderBottom: isDesktop ? 'none' : SERVICE_GRID_SEP,
            }}
          >
            <ColLabel>What we do</ColLabel>
            <ColText>{service.what}</ColText>
          </div>

          <div
            style={{
              paddingLeft: isDesktop ? 'clamp(1.5rem, 1.5vw, 4rem)' : 0,
              paddingTop: isDesktop ? 0 : '1rem',
            }}
          >
            <ColLabel amber>Outcome</ColLabel>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                lineHeight: 1.6,
                margin: 0,
                fontSize: 'clamp(0.9375rem, 0.95vw, 1.875rem)',
                color:
                  isHovered && hasHover
                    ? isBorderAmber
                      ? 'var(--color-trust-amber)'
                      : 'var(--color-link)'
                    : 'var(--color-text-primary)',
                transition: 'color 0.4s ease',
              }}
            >
              {service.outcome}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EngageCard({ item, index }: { item: (typeof ENGAGEMENTS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const hasHover = useMediaQuery('(hover: hover)');
  const reducedMotion = useReducedMotion() ?? false;
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !isHovered) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafRef.current = undefined;
    });
  };

  const isAmber = index % 2 === 0;
  const accentColor = isAmber ? '#FBBF24' : '#2D5BFF';
  const accentRgb = isAmber ? '251,191,36' : '45,91,255';

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 0, y: 0 });
      }}
      whileHover={hasHover && !reducedMotion ? { y: -3, transition: { duration: 0.3, ease: EASE } } : {}}
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
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: isHovered && !reducedMotion ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(240px circle at ${spotlight.x}px ${spotlight.y}px, rgba(${accentRgb}, 0.07), transparent 70%)`,
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
            margin: '0 0 0.875rem 0',
            color: isHovered ? '#FFFFFF' : 'var(--color-text-primary)',
            transition: 'color 0.3s ease',
          }}
          className="text-base sm:text-lg 2xl:text-[1.375rem] min-[1920px]:text-[1.875rem]"
        >
          {item.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            color: isHovered ? 'var(--color-text-secondary)' : '#6B7280',
            lineHeight: 1.7,
            margin: 0,
            fontSize: 'clamp(0.875rem, 0.9vw, 1.75rem)',
            transition: 'color 0.3s ease',
          }}
        >
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

function HowToEngage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section
      id={SERVICES_HOW_WE_ENGAGE_SECTION_ID}
      ref={ref}
      style={{
        background: '#121212',
        paddingTop: 'clamp(4rem, 7vw, 16rem)',
        paddingBottom: 'clamp(4rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
        scrollMarginTop: 'calc(var(--nav-h, 64px) + 1rem)',
      }}
    >
      <div className="section-inner-max" style={{ margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
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
            How We Work With You
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
            Every engagement starts with understanding your environment. From there, we work in one of three ways
            depending on where you are.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'clamp(0.75rem, 2vw, 4.5rem)' }}
        >
          {ENGAGEMENTS.map((item, i) => (
            <EngageCard key={item.num} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PersonaCard({ persona }: { persona: (typeof PERSONAS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const hasHover = useMediaQuery('(hover: hover)');
  const reducedMotion = useReducedMotion() ?? false;
  const rafRef = useRef<number | undefined>(undefined);

  const sideBorder = isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
  const leftAccent = isHovered ? '#FBBF24' : 'rgba(251,191,36,0.5)';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !isHovered) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafRef.current = undefined;
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 0, y: 0 });
      }}
      whileHover={hasHover && !reducedMotion ? { y: -3, transition: { duration: 0.3, ease: EASE } } : {}}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-card)',
        borderTop: `1px solid ${sideBorder}`,
        borderRight: `1px solid ${sideBorder}`,
        borderBottom: `1px solid ${sideBorder}`,
        borderLeft: `2px solid ${leftAccent}`,
        borderRadius: 12,
        padding: 'clamp(1.25rem, 2.5vw, 5rem)',
        boxShadow: isHovered
          ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.08)'
          : '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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
          background: 'linear-gradient(90deg, rgba(251,191,36,0.06) 0%, transparent 50%)',
        }}
      />

      {hasHover && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: isHovered && !reducedMotion ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(251,191,36,0.06), transparent 70%)`,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            lineHeight: 1.3,
            margin: '0 0 0.875rem 0',
            color: isHovered ? '#FFFFFF' : 'var(--color-text-primary)',
            transition: 'color 0.3s ease',
          }}
          className="text-base sm:text-lg 2xl:text-[1.375rem] min-[1920px]:text-[1.875rem]"
        >
          {persona.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: 1.7,
            margin: 0,
            fontSize: 'clamp(0.875rem, 0.9vw, 1.75rem)',
            color: isHovered ? 'var(--color-text-secondary)' : '#6B7280',
            transition: 'color 0.3s ease',
          }}
        >
          {persona.body}
        </p>
      </div>
    </motion.div>
  );
}

function WhoWeWorkWith() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'clamp(4rem, 7vw, 16rem)',
        paddingBottom: 'clamp(4rem, 7vw, 16rem)',
        paddingLeft: 'max(1.5rem, 5vw)',
        paddingRight: 'max(1.5rem, 5vw)',
      }}
    >
      <div className="section-inner-max" style={{ margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 9rem)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.625rem, 0.55vw, 0.8125rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: '0.75rem',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              [ WHO THIS IS FOR ]
            </div>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              margin: 0,
            }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]"
          >
            Who We Work With
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'clamp(0.75rem, 2vw, 4.5rem)' }}
        >
          {PERSONAS.map((persona) => (
            <PersonaCard key={persona.title} persona={persona} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GlobalBlock() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  return (
    <section ref={ref} className="section-wrapper relative overflow-hidden" style={{ background: '#121212' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle, rgba(251,191,36,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="section-inner-max relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} className="lg:col-span-2">
            <div className="section-label">[ GLOBAL REACH ]</div>
            <h2 className="mt-4 text-[1.75rem] font-serif font-medium leading-[1.1] text-text-primary sm:text-[2.25rem] lg:text-[2.75rem] 2xl:text-[3.75rem] min-[1920px]:text-[5rem]">Built for Global Enterprise</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: EASE, delay: 0.15 }} className="lg:col-span-3">
            <p className="text-sm leading-[1.8] text-text-secondary sm:text-base 2xl:text-[1.125rem] min-[1920px]:text-[1.375rem]">
              Invisigent provides enterprise AI infrastructure consulting, AI automation systems, and agent orchestration architecture for organizations across India, the United States, and Europe. We design scalable AI systems, knowledge retrieval pipelines, and AI-native applications for global businesses building production AI capabilities — with compliance aligned to the EU AI Act, GDPR, and India&apos;s DPDP Act.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-trust-amber" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-micro">India · United States · Europe</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-primary)',
        position: 'relative',
        zIndex: 2,
        paddingTop: 'clamp(4rem, 7vw, 16rem)',
        paddingBottom: 'clamp(4rem, 7vw, 16rem)',
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

      <div className="services-cta-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}
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
            [ LET&apos;S BUILD ]
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
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
          Ready to Build AI Systems
          <br />
          That Actually Work?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
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
          If you are moving beyond AI experiments and want production-ready systems that integrate with how your
          organization actually operates — let&apos;s talk about what you are building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(0.875rem, 1.2vw, 2rem)',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
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
          </button>

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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
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
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPageClient() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise AI Infrastructure Consulting',
    provider: { '@type': 'Organization', name: 'Invisigent' },
    description:
      'Enterprise AI infrastructure consulting, agent orchestration, RAG systems, AI-native product development, and compliance-ready AI for global organizations.',
  };

  return (
    <main className="services-page" style={{ background: '#121212', overflowX: 'clip' }}>
      <Script id="services-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <ServicesHero />
      <PositioningBlock />
      <ServiceCards />
      <HowToEngage />
      <WhoWeWorkWith />
      <GlobalBlock />
      <ServicesCTA />
      <VrisoLogoSection />
      <FooterSection />
    </main>
  );
}

