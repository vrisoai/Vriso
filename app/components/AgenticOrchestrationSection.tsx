'use client';

import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

/* ────────────────────────────── JSON-LD ────────────────────────────── */

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://vriso.ai/#orchestration',
  name: 'Agentic Orchestration — Multi-Agent AI Systems',
  serviceType: 'Multi-Agent AI Orchestration',
  provider: { '@id': 'https://vriso.ai/#organization' },
  description:
    'Enterprise-grade multi-agent orchestration with supervisor reasoning, task distribution, and operational control across legal, finance, and operations domains.',
  areaServed: ['EU', 'IN', 'US'],
};

/* ────────────────────────────── Animation variants ─────────────────── */

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const NODE_REVEAL = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const DIVIDER_REVEAL = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ────────────────────────────── Rotating status labels ─────────────── */

const STATUS_LABELS = [
  'Scanning knowledge base…',
  'Evaluating constraints…',
  'Delegating task…',
  'Aggregating outputs…',
  'Reasoning…',
];

function useRotatingLabel(interval = 2500) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATUS_LABELS.length), interval);
    return () => clearInterval(t);
  }, [interval]);
  return STATUS_LABELS[idx];
}

/* ────────────────────────────── Agent node data ───────────────────── */

interface AgentDef {
  id: string;
  label: string;
  title: string;
  desc: string;
}

const AGENTS: AgentDef[] = [
  { id: 'legal', label: 'LEGAL_AGENT', title: 'Legal Agent', desc: 'Contract review · policy interpretation · regulatory checks' },
  { id: 'finance', label: 'FINANCE_AGENT', title: 'Finance Agent', desc: 'Forecast modeling · margin analysis · financial reasoning' },
  { id: 'ops', label: 'OPS_AGENT', title: 'Operations Agent', desc: 'Workflow monitoring · automation triggers · system coordination' },
];

const METADATA = [
  { key: 'SYSTEM_STATE', value: 'ACTIVE' },
  { key: 'TASK_QUEUE', value: 'DISTRIBUTED' },
  { key: 'KNOWLEDGE_INDEX', value: 'SYNCED' },
  { key: 'REASONING_TRACE', value: 'LOGGED' },
];

/* ────────────────────────────── AgentNode sub-component ────────────── */

function AgentNode({ agent, delay }: { agent: AgentDef; delay: number }) {
  const statusLabel = useRotatingLabel(2500 + delay * 400);

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      variants={NODE_REVEAL}
      custom={delay}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative rounded-lg backdrop-blur-[12px]"
        style={{
          background: 'rgba(31,31,31,0.80)',
          border: '1px solid #262626',
          padding: 'clamp(16px, 2vw, 24px)',
          width: '100%',
          maxWidth: 220,
          transition: 'box-shadow 300ms ease, border-color 300ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3B5BDB';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(59,91,219,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#262626';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <p
          className="font-mono text-text-micro"
          style={{ fontSize: 9, letterSpacing: '0.14em', fontWeight: 500 }}
        >
          {agent.label}
        </p>
        <p
          className="mt-1 font-serif text-text-primary"
          style={{ fontSize: 15, fontWeight: 600 }}
        >
          {agent.title}
        </p>
        <p
          className="mt-1.5 text-text-tertiary"
          style={{ fontSize: 12, lineHeight: 1.5 }}
        >
          {agent.desc}
        </p>
        <p
          className="mt-3 font-mono"
          style={{
            fontSize: 10,
            color: '#3B82F6',
            letterSpacing: '0.04em',
            minHeight: 14,
          }}
        >
          {statusLabel}
        </p>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────── Connection beams (SVG) ─────────────── */

function ConnectionBeams() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="dot-glow" filterUnits="userSpaceOnUse" x="-5" y="-5" width="110" height="110">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left agent → Supervisor (14% to 42%) */}
      <line x1="14" y1="65" x2="42" y2="65" stroke="#3B82F6" strokeWidth={0.3} strokeOpacity={0.5} strokeDasharray="1.5 2.5" style={{ animation: 'beam-travel 4s linear infinite' }} />
      {/* Finance (top center) → Supervisor (50%, 25% down to 50%) */}
      <line x1="50" y1="25" x2="50" y2="48" stroke="#3B82F6" strokeWidth={0.3} strokeOpacity={0.5} strokeDasharray="1.5 2.5" style={{ animation: 'beam-travel 4.5s linear infinite 0.5s' }} />
      {/* Right agent → Supervisor (58% to 86%) */}
      <line x1="58" y1="65" x2="86" y2="65" stroke="#3B82F6" strokeWidth={0.3} strokeOpacity={0.5} strokeDasharray="1.5 2.5" style={{ animation: 'beam-travel 5s linear infinite 1s' }} />

      {/* Glowing dots traveling along beams */}
      <circle r="0.8" fill="#3B82F6" filter="url(#dot-glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M14,65 L42,65" />
      </circle>
      <circle r="0.8" fill="#3B82F6" filter="url(#dot-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M50,25 L50,48" />
      </circle>
      <circle r="0.8" fill="#3B82F6" filter="url(#dot-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M58,65 L86,65" />
      </circle>

      {/* Return dots (dimmer, traveling back) */}
      <circle r="0.5" fill="#3B82F6" opacity={0.4} filter="url(#dot-glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M42,65 L14,65" />
      </circle>
      <circle r="0.5" fill="#3B82F6" opacity={0.4} filter="url(#dot-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M50,48 L50,25" />
      </circle>
      <circle r="0.5" fill="#3B82F6" opacity={0.4} filter="url(#dot-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M86,65 L58,65" />
      </circle>
    </svg>
  );
}

/* ────────────────────────────── Main section ──────────────────────── */

export function AgenticOrchestrationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' });
  const metaInView = useInView(metaRef, { once: true, margin: '-40px' });

  const supervisorLabel = useRotatingLabel(3000);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      className="relative w-full bg-bg-primary"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        paddingLeft: 'max(1.5rem, 5vw, env(safe-area-inset-left))',
        paddingRight: 'max(1.5rem, 5vw, env(safe-area-inset-right))',
      }}
      aria-labelledby="orchestration-heading"
    >
      <Script
        id="orchestration-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(JSON_LD)}
      </Script>

      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-6xl"
        style={{
          paddingLeft: 'max(1rem, 4vw)',
          paddingRight: 'max(1rem, 4vw)',
        }}
      >
        {/* ── Section label ── */}
        <motion.p
          className="font-mono text-text-tertiary"
          style={{
            fontSize: 12,
            letterSpacing: '0.14em',
            fontWeight: 500,
            borderLeft: '2px solid var(--color-trust-amber)',
            paddingLeft: 12,
          }}
          variants={FADE_UP}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          custom={0}
        >
          [ SYSTEM ORCHESTRATION ]
        </motion.p>

        {/* ── Headline with amber accent bar ── */}
        <motion.div
          className="flex items-stretch"
          style={{ marginTop: 32, gap: 20 }}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
        >
          <motion.div
            style={{
              width: 3,
              borderRadius: 2,
              background: '#FBBF24',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={sectionInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.h2
            id="orchestration-heading"
            className="font-serif text-text-primary"
            style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 500,
              lineHeight: 1.15,
            }}
            variants={FADE_UP}
            custom={1}
          >
            Agentic Orchestration
          </motion.h2>
        </motion.div>

        {/* ── Supporting paragraph ── */}
        <motion.div
          className="font-serif text-text-secondary"
          style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            lineHeight: 1.8,
            maxWidth: 640,
            marginTop: 24,
          }}
          variants={STAGGER}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
        >
          <motion.p variants={STAGGER_CHILD}>
            Enterprise AI systems are not single models.
            They are coordinated networks of specialized agents.
          </motion.p>
          <motion.p variants={STAGGER_CHILD} style={{ marginTop: 16 }}>
            Vriso designs orchestration layers that supervise reasoning,
            distribute tasks, and maintain operational control across the
            enterprise.
          </motion.p>
        </motion.div>

        {/* ═══════════════════ WORKFLOW VISUALIZER CARD ═══════════════════ */}
        <motion.div
          ref={cardRef}
          className="glass-card relative mt-16 overflow-hidden"
          style={{
            padding: 'clamp(16px, 3vw, 28px)',
            borderTop: '3px solid #3B82F6',
            borderRadius: 16,
            transition: 'transform 400ms ease, box-shadow 400ms ease',
          }}
          onMouseMove={handleCardMouseMove}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Faint grid pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />

          {/* Mouse spotlight overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.05), transparent 40%)',
            }}
            aria-hidden
          />

          {/* ── Hub-and-spoke layout ── */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            variants={STAGGER}
            initial="hidden"
            animate={cardInView ? 'visible' : 'hidden'}
          >
            {/* Connection beams — desktop only */}
            <ConnectionBeams />

            {/* ── Row 1: Finance agent (top center) ── */}
            <div className="relative z-10 flex w-full justify-center">
              <AgentNode agent={AGENTS[1]} delay={0} />
            </div>

            {/* ── Row 2: Legal — Supervisor — Operations ── */}
            <div className="relative z-10 flex w-full flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left agent (Legal) */}
              <div className="w-full md:w-[28%]">
                <AgentNode agent={AGENTS[0]} delay={1} />
              </div>

              {/* ── SUPERVISOR NODE (center) ── */}
              <motion.div
                className="flex flex-col items-center"
                variants={NODE_REVEAL}
                custom={2}
              >
                <div
                  className="relative rounded-lg"
                  style={{
                    background: '#1F1F1F',
                    border: '1px solid #262626',
                    padding: 'clamp(20px, 3vw, 32px)',
                    minWidth: 200,
                    textAlign: 'center',
                    boxShadow: '0 0 30px rgba(251,191,36,0.08)',
                  }}
                >
                  <p
                    className="font-mono text-text-micro"
                    style={{ fontSize: 9, letterSpacing: '0.14em', fontWeight: 500 }}
                  >
                    SUPERVISOR_AGENT
                  </p>

                  {/* Amber status pulse */}
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background: '#FBBF24',
                        animation: 'status-pulse 2s ease-in-out infinite',
                      }}
                      aria-hidden
                    />
                    <span
                      className="font-mono"
                      style={{ fontSize: 10, color: '#FBBF24', letterSpacing: '0.06em' }}
                    >
                      ACTIVE
                    </span>
                  </div>

                  <p
                    className="mt-3 font-serif text-text-primary"
                    style={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Supervisor Agent
                  </p>
                  <p
                    className="mt-1 text-text-tertiary"
                    style={{ fontSize: 12, lineHeight: 1.5 }}
                  >
                    Task orchestration · reasoning supervision
                  </p>

                  {/* Rotating status label */}
                  <p
                    className="mt-3 font-mono"
                    style={{
                      fontSize: 10,
                      color: '#FBBF24',
                      letterSpacing: '0.04em',
                      minHeight: 14,
                    }}
                  >
                    {supervisorLabel}
                  </p>
                </div>
              </motion.div>

              {/* Right agent (Operations) */}
              <div className="w-full md:w-[28%]">
                <AgentNode agent={AGENTS[2]} delay={3} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ═══════════════ DIVIDER ═══════════════ */}
        <div style={{ marginTop: 'clamp(48px, 6vw, 80px)', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <motion.div
            style={{
              height: 1,
              width: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.25) 30%, rgba(251,191,36,0.25) 70%, transparent 100%)',
              transformOrigin: 'left center',
            }}
            variants={DIVIDER_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            role="separator"
          />
        </div>

        {/* ═══════════════ SYSTEM METADATA ROW ═══════════════ */}
        <motion.div
          ref={metaRef}
          className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-lg lg:grid-cols-4"
          style={{
            background: 'rgba(31,31,31,0.50)',
            border: '1px solid var(--color-border)',
            padding: 'clamp(16px, 2vw, 24px)',
          }}
          variants={STAGGER}
          initial="hidden"
          animate={metaInView ? 'visible' : 'hidden'}
        >
          {METADATA.map((item) => (
            <motion.div key={item.key} variants={STAGGER_CHILD} className="flex flex-col gap-1.5">
              <span
                className="font-mono text-text-micro"
                style={{ fontSize: 10, letterSpacing: '0.12em', fontWeight: 500 }}
              >
                {item.key}
              </span>
              <span
                className="font-mono text-text-primary"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══════════════ CLOSING STATEMENT ═══════════════ */}
        <motion.p
          className="mx-auto text-center font-serif text-text-secondary"
          style={{
            marginTop: 'clamp(48px, 6vw, 80px)',
            fontSize: 'clamp(17px, 1.6vw, 22px)',
            lineHeight: 1.7,
            maxWidth: 680,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          When AI systems are orchestrated properly, intelligence becomes{' '}
          <span className="text-trust-amber" style={{ fontWeight: 600 }}>
            operational infrastructure
          </span>
          .
        </motion.p>
      </div>
    </section>
  );
}
