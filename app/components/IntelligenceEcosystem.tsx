'use client';

import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import { useRef, useCallback, useState, useEffect } from 'react';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://vriso.ai/#intelligence-ecosystem',
  name: 'Intelligence Ecosystem — Enterprise AI Strategy',
  serviceType: 'Enterprise AI Architecture',
  provider: { '@id': 'https://vriso.ai/#organization' },
  description:
    'Modular AI infrastructure delivering sustainable competitive advantage through outcome ownership, agentic transparency, global compliance, and machine-experience optimization.',
  areaServed: ['EU', 'IN', 'US'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Intelligence Ecosystem Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Sovereign AI Architecture',
        description:
          'Vertically integrated AI systems engineered for sustainable competitive advantage beyond imitation.',
      },
      {
        '@type': 'Offer',
        name: 'Global Compliance Infrastructure',
        description:
          'GDPR, SOC 2, and DPDP-ready governance frameworks for multi-jurisdiction AI deployments.',
      },
      {
        '@type': 'Offer',
        name: 'Agentic Orchestration & Transparency',
        description:
          'Multi-agent systems with full reasoning transparency and auditable decision chains.',
      },
    ],
  },
};

const CARD_FADE = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const GRID_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const COMPLIANCE_BADGES = ['GDPR', 'SOC 2', 'DPDP'];

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function IntelligenceEcosystem() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const splineInView = useInView(splineRef, { once: true, margin: '200px' });

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const [fontWeight, setFontWeight] = useState(500);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry ? entry.intersectionRatio : 0;
        setFontWeight(Math.round(400 + (1 - Math.min(1, ratio * 2.5)) * 300));
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full bg-bg-primary"
      style={{
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="ecosystem-heading"
    >
      <Script
        id="ecosystem-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      {/* Subtle radial glow — matches Section 2 warm gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 75% 40%, rgba(59,91,219,0.06) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div
        className="section-container relative w-full"
        style={{
          paddingLeft: 'max(1rem, clamp(1rem, 4vw, 3rem))',
          paddingRight: 'max(1rem, clamp(1rem, 4vw, 3rem))',
        }}
      >
        {/* ── Section label ── */}
        <motion.p
          className="font-mono text-text-tertiary text-center sm:text-left"
          style={{ fontSize: 12, letterSpacing: '0.14em', fontWeight: 500 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          [ THE INTELLIGENCE ECOSYSTEM ]
        </motion.p>

        {/* ── Headline with amber accent bar — matching Section 2 pattern ── */}
        <div ref={headerRef} style={{ marginTop: 32 }}>
          <motion.div
            className="flex items-stretch justify-center sm:justify-start"
            style={{ gap: 20 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div
              style={{
                width: 3,
                borderRadius: 2,
                background: '#FBBF24',
                transformOrigin: 'top',
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.h2
              id="ecosystem-heading"
              className="font-serif text-text-primary text-center sm:text-left"
              style={{
                fontSize: 'clamp(36px, 4vw, 50px)',
                lineHeight: 1.15,
                fontWeight,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              The Intelligence Ecosystem.
            </motion.h2>
          </motion.div>

          <motion.p
            className="font-serif text-text-secondary mx-auto text-center sm:text-left"
            style={{
              fontSize: 'clamp(18px, 2vw, 22px)',
              lineHeight: 1.6,
              maxWidth: 720,
              marginTop: 24,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Six pillars of sovereign AI infrastructure, each engineered to
            convert capability into durable, owned outcomes.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={GRID_STAGGER}
        >
          {/* ─── Card A — The VRISO Advantage (2×2) ─── */}
          <motion.article
            className="glass-card relative flex flex-col overflow-hidden md:col-span-2 md:row-span-2"
            style={{
              padding: 'clamp(24px, 3vw, 40px)',
              borderTop: '1px solid var(--color-trust-amber)',
              viewTransitionName: 'eco-advantage',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              CORE_THESIS
            </p>
            <h3
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(24px, 2.5vw, 32px)',
                fontWeight: 600,
                lineHeight: 1.2,
                marginTop: 16,
              }}
            >
              The VRISO Advantage.
            </h3>
            <p
              className="font-serif text-text-secondary"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                marginTop: 16,
              }}
            >
              We don&apos;t deploy tools. We architect resilience &mdash;
              vertically integrated AI systems that create sustainable
              competitive advantage beyond imitation.
            </p>

            {/* Animated network graph — sovereign AI infrastructure visualization */}
            <div
              ref={splineRef}
              className="mt-6 flex flex-1 items-center justify-center overflow-hidden rounded-md"
              style={{
                minHeight: 'clamp(100px, 20vw, 160px)',
                background:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(59,91,219,0.06) 0%, var(--color-bg-section) 70%)',
              }}
            >
              {splineInView && (
                <svg
                  viewBox="0 0 320 160"
                  fill="none"
                  className="h-full w-full"
                  style={{ maxHeight: 200 }}
                  aria-hidden
                >
                  {/* Grid lines */}
                  {[40, 80, 120].map((y) => (
                    <line key={`h-${y}`} x1="0" y1={y} x2="320" y2={y} stroke="#262626" strokeWidth={0.5} />
                  ))}
                  {[64, 128, 192, 256].map((x) => (
                    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="160" stroke="#262626" strokeWidth={0.5} />
                  ))}

                  {/* Connection lines with animated data flow */}
                  <line x1="80" y1="80" x2="160" y2="40" stroke="#3B5BDB" strokeWidth={1} strokeDasharray="4 4" style={{ animation: 'data-flow 1.5s linear infinite' }} />
                  <line x1="80" y1="80" x2="160" y2="120" stroke="#3B5BDB" strokeWidth={1} strokeDasharray="4 4" style={{ animation: 'data-flow 1.5s linear infinite 0.3s' }} />
                  <line x1="160" y1="40" x2="240" y2="60" stroke="#FBBF24" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="4 4" style={{ animation: 'data-flow 1.5s linear infinite 0.6s' }} />
                  <line x1="160" y1="120" x2="240" y2="100" stroke="#FBBF24" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="4 4" style={{ animation: 'data-flow 1.5s linear infinite 0.9s' }} />
                  <line x1="160" y1="40" x2="160" y2="120" stroke="#3B5BDB" strokeWidth={0.8} strokeOpacity={0.3} strokeDasharray="2 6" style={{ animation: 'data-flow 2s linear infinite 0.4s' }} />
                  <line x1="240" y1="60" x2="240" y2="100" stroke="#FBBF24" strokeWidth={0.8} strokeOpacity={0.3} strokeDasharray="2 6" style={{ animation: 'data-flow 2s linear infinite 0.7s' }} />

                  {/* Nodes — pulsing at staggered intervals */}
                  <circle cx="80" cy="80" r="4" fill="#FBBF24" style={{ animation: 'node-ping 3s ease-in-out infinite' }}>
                    <title>Source</title>
                  </circle>
                  <circle cx="80" cy="80" r="10" fill="none" stroke="#FBBF24" strokeWidth={0.5} strokeOpacity={0.3} style={{ animation: 'network-pulse 3s ease-in-out infinite' }} />

                  <circle cx="160" cy="40" r="3" fill="#3B5BDB" style={{ animation: 'node-ping 3s ease-in-out infinite 0.5s' }} />
                  <circle cx="160" cy="120" r="3" fill="#3B5BDB" style={{ animation: 'node-ping 3s ease-in-out infinite 1s' }} />

                  <circle cx="240" cy="60" r="3" fill="#FBBF24" style={{ animation: 'node-ping 3s ease-in-out infinite 1.5s' }} />
                  <circle cx="240" cy="100" r="3" fill="#FBBF24" style={{ animation: 'node-ping 3s ease-in-out infinite 2s' }} />
                  <circle cx="240" cy="80" r="8" fill="none" stroke="#FBBF24" strokeWidth={0.5} strokeOpacity={0.2} style={{ animation: 'network-pulse 3s ease-in-out infinite 1s' }} />

                  {/* Labels */}
                  <text x="80" y="100" textAnchor="middle" fill="#6B7280" fontSize="7" fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.08em">INPUT</text>
                  <text x="160" y="140" textAnchor="middle" fill="#6B7280" fontSize="7" fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.08em">ORCHESTRATE</text>
                  <text x="240" y="125" textAnchor="middle" fill="#FBBF24" fontSize="7" fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.08em" opacity={0.7}>OWNED_OUTPUT</text>
                </svg>
              )}
            </div>
          </motion.article>

          {/* ─── Card B — Outcome Ownership (1×1) ─── */}
          <motion.article
            className="glass-card flex flex-col"
            style={{
              padding: 'clamp(20px, 2vw, 32px)',
              borderTop: '1px solid #3B5BDB',
              viewTransitionName: 'eco-ownership',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              RARITY
            </p>
            <h3
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                lineHeight: 1.3,
                marginTop: 12,
              }}
            >
              Outcome Ownership.
            </h3>
            <p
              className="font-serif text-text-secondary"
              style={{
                fontSize: 'clamp(14px, 1vw, 16px)',
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              Focus on business results, not just tool deployment. Every
              system transfers ownership of outcomes &mdash; not dependency on
              vendors.
            </p>
          </motion.article>

          {/* ─── Card C — Agentic Transparency (1×1) ─── */}
          <motion.article
            className="glass-card flex flex-col"
            style={{
              padding: 'clamp(20px, 2vw, 32px)',
              borderTop: '1px solid #3B5BDB',
              viewTransitionName: 'eco-transparency',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              INIMITABILITY
            </p>
            <h3
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                lineHeight: 1.3,
                marginTop: 12,
              }}
            >
              Agentic Transparency.
            </h3>
            <p
              className="font-serif text-text-secondary"
              style={{
                fontSize: 'clamp(14px, 1vw, 16px)',
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              Full reasoning visibility into every autonomous decision.
            </p>

            {/* Animated "Reasoning…" status bar */}
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: 'var(--color-action-accent)',
                    animation: 'status-pulse 2s ease-in-out infinite',
                  }}
                  aria-hidden
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--color-text-tertiary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Reasoning&hellip;
                </span>
              </div>
              <div
                className="mt-2 overflow-hidden rounded-full"
                style={{
                  height: 3,
                  background: 'var(--color-border)',
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    background: 'var(--color-action-accent)',
                    animation: 'reasoning-progress 3s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </motion.article>

          {/* ─── Card D — Global Compliance (2×1) ─── */}
          <motion.article
            className="glass-card flex flex-col md:col-span-2"
            style={{
              padding: 'clamp(20px, 2vw, 32px)',
              borderTop: '1px solid var(--color-trust-amber)',
              viewTransitionName: 'eco-compliance',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              COMPLIANCE
            </p>
            <h3
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                lineHeight: 1.3,
                marginTop: 12,
              }}
            >
              Global Compliance.
            </h3>
            <p
              className="font-serif text-text-secondary"
              style={{
                fontSize: 'clamp(14px, 1vw, 16px)',
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              Multi-jurisdiction governance engineered into the architecture,
              not bolted on after deployment.
            </p>

            {/* Compliance badges — styled like .badge-trust */}
            <div className="mt-auto flex flex-wrap gap-3 pt-4">
              {COMPLIANCE_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 font-mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    padding: '4px 12px',
                    borderRadius: 4,
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid var(--color-trust-amber)',
                    color: 'var(--color-trust-amber)',
                  }}
                >
                  <ShieldIcon className="h-3 w-3" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.article>

          {/* ─── Card E — Efficiency Gains (editorial stat) ─── */}
          <motion.article
            className="glass-card flex flex-col items-start justify-center lg:col-span-2"
            style={{
              padding: 'clamp(20px, 2vw, 32px)',
              borderTop: '1px solid var(--color-trust-amber)',
              viewTransitionName: 'eco-efficiency',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              MEASURED_IMPACT
            </p>
            <p
              className="font-serif text-trust-amber"
              style={{
                fontSize: 'clamp(32px, 8vw, 56px)',
                fontWeight: 700,
                lineHeight: 1,
                marginTop: 12,
                letterSpacing: '-0.03em',
                textShadow: '0 0 24px rgba(251,191,36,0.2)',
              }}
            >
              40&ndash;60%
            </p>
            <p
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(16px, 1.3vw, 20px)',
                fontWeight: 500,
                lineHeight: 1.3,
                marginTop: 8,
              }}
            >
              Operational Upside
            </p>
            <p
              className="font-serif text-text-tertiary"
              style={{
                fontSize: 'clamp(13px, 0.9vw, 15px)',
                lineHeight: 1.5,
                marginTop: 6,
              }}
            >
              Measured, sustained, and owned.
            </p>
          </motion.article>

          {/* ─── Card F — MX-Optimized (1×1) ─── */}
          <motion.article
            className="glass-card flex flex-col lg:col-span-2"
            style={{
              padding: 'clamp(20px, 2vw, 32px)',
              borderTop: '1px solid #3B5BDB',
              viewTransitionName: 'eco-mx',
            }}
            variants={CARD_FADE}
            onMouseMove={handleCardMouseMove}
          >
            <p
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              ORGANIZATION
            </p>
            <h3
              className="font-serif text-text-primary"
              style={{
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                lineHeight: 1.3,
                marginTop: 12,
              }}
            >
              MX-Optimized.
            </h3>
            <p
              className="font-serif text-text-secondary"
              style={{
                fontSize: 'clamp(14px, 1vw, 16px)',
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              Designed for humans, indexed for AI agents. Machine Experience
              optimization for the agentic web.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
