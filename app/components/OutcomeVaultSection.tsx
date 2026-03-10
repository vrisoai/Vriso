'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

/* ─────────────────────────── Animation variants ─────────────────────────── */

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

const DIVIDER_REVEAL = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const ACCENT_BAR = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────── Outcome cards data ─────────────────────────── */

interface OutcomeCardDef {
  id: string;
  label: string;
  metric: string;
  description: string;
  footnote: string;
}

const OUTCOME_CARDS: OutcomeCardDef[] = [
  {
    id: 'procurement',
    label: 'PROCUREMENT_AUTONOMY',
    metric: '34% Cost Optimization Potential',
    description:
      'Agent-driven procurement systems analyze supplier pricing, forecast demand shifts, and autonomously optimize sourcing decisions.',
    footnote: 'Projected enterprise procurement automation impact.',
  },
  {
    id: 'compliance',
    label: 'REGULATORY_COMPLIANCE',
    metric: '60% Risk Reduction Potential',
    description:
      'AI agents continuously monitor regulatory changes, interpret policy shifts, and flag operational exposure across jurisdictions.',
    footnote: 'Modeled using multi-jurisdiction compliance datasets.',
  },
  {
    id: 'operations',
    label: 'OPERATIONS_AUTOMATION',
    metric: '3× Workflow Velocity',
    description:
      'Supervisor agents coordinate specialized AI agents across departments, eliminating manual orchestration and accelerating decision cycles.',
    footnote: 'Based on enterprise process automation modeling.',
  },
];

/* ─────────────────────────── Hooks ─────────────────────────────────────── */

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return count;
}

/** Detects pointer-coarse / hover:none devices after hydration. */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);
  return isTouch;
}

/* ─────────────────────────── OutcomeCard sub-component ─────────────────── */

function OutcomeCard({ card, isTouch }: { card: OutcomeCardDef; isTouch: boolean }) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    },
    [isTouch],
  );

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 40px rgba(59,130,246,0.15)';
    },
    [isTouch],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    },
    [isTouch],
  );

  return (
    <motion.div
      variants={STAGGER_CHILD}
      className="relative overflow-hidden rounded-xl backdrop-blur-[20px]"
      style={{
        background: 'rgba(31,31,31,0.8)',
        border: '1px solid #262626',
        borderTop: '2px solid #3B82F6',
        padding: 'clamp(16px, 3.5vw, 28px)',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Mouse-tracking spotlight — pointer devices only */}
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(min(280px, 60vw) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.08) 0%, transparent 70%)',
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-col gap-3">
        {/* Label */}
        <p
          className="font-mono text-text-micro"
          style={{
            fontSize: 10,
            letterSpacing: '0.14em',
            fontWeight: 500,
            overflowWrap: 'anywhere',
          }}
        >
          {card.label}
        </p>

        {/* Impact metric */}
        <p
          className="font-display text-text-primary"
          style={{
            fontSize: 'clamp(16px, 2vw, 21px)',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {card.metric}
        </p>

        {/* Description */}
        <p
          className="text-text-secondary"
          style={{ fontSize: 'clamp(13px, 1.6vw, 14px)', lineHeight: 1.65 }}
        >
          {card.description}
        </p>

        {/* Footnote */}
        <p
          className="font-mono text-text-tertiary"
          style={{ fontSize: 10, letterSpacing: '0.06em', marginTop: 4 }}
        >
          {card.footnote}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Main section component ────────────────────── */

export default function OutcomeVaultSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const tickerInView = useInView(tickerRef, { once: true, margin: '-40px' });
  const count = useCountUp(54, tickerInView);

  return (
    <section
      className="relative w-full overflow-x-hidden bg-bg-primary"
      style={{
        marginTop: '-1px',
        paddingTop: 'clamp(60px, 10vw, 140px)',
        paddingBottom: 'clamp(60px, 10vw, 140px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="outcome-vault-heading"
    >
      {/* Ambient glow — identical to section 4 so both sections share the same atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* ─── Inner container — mirrors .section-container pattern ─── */}
      <div
        ref={sectionRef}
        className="section-container relative"
        style={{
          paddingLeft: 'max(1rem, clamp(1rem, 4vw, 3rem))',
          paddingRight: 'max(1rem, clamp(1rem, 4vw, 3rem))',
        }}
      >

        {/* ══ SECTION LABEL ══ */}
        <motion.p
          className="font-mono text-text-tertiary text-center sm:text-left"
          style={{
            fontSize: 12,
            letterSpacing: '0.16em',
            fontWeight: 500,
            textTransform: 'uppercase',
            borderLeft: '2px solid #FBBF24',
            paddingLeft: 12,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Outcome Intelligence
        </motion.p>

        {/* ══ HEADLINE ══
            Mobile: accent-bar + heading centered as a unit
            sm+:    left-aligned
        */}
        <motion.div
          className="flex items-stretch justify-center sm:justify-start"
          style={{ marginTop: 'clamp(20px, 3vw, 32px)', gap: 20 }}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
        >
          <motion.div
            style={{
              width: 3,
              borderRadius: 2,
              background: '#FBBF24',
              transformOrigin: 'top',
              flexShrink: 0,
            }}
            variants={ACCENT_BAR}
          />
          <motion.h2
            id="outcome-vault-heading"
            className="font-serif text-text-primary text-center sm:text-left"
            style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
            variants={FADE_UP}
            custom={1}
          >
            Measured Outcomes, Not Promises
          </motion.h2>
        </motion.div>

        {/* ══ SUBTEXT ══
            maxWidth keeps it readable on wide screens.
            mx-auto centers it on mobile; sm:mx-0 removes that at sm+.
        */}
        <motion.p
          className="mx-auto text-center text-text-secondary sm:mx-0 sm:text-left"
          style={{
            marginTop: 'clamp(16px, 2.5vw, 24px)',
            maxWidth: 640,
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            lineHeight: 1.6,
          }}
          variants={FADE_UP}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          custom={2}
        >
          Vriso AI systems are engineered to produce measurable economic impact. From
          procurement intelligence to compliance automation, our architectures convert
          fragmented AI adoption into durable operational advantage.
        </motion.p>

        {/* ══ ANIMATED DIVIDER ══ */}
        <div
          style={{
            marginTop: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(32px, 5vw, 56px)',
          }}
        >
          <motion.div
            role="separator"
            style={{
              height: 1,
              width: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.25) 50%, transparent 100%)',
              transformOrigin: 'left center',
            }}
            variants={DIVIDER_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          />
        </div>

        {/* ══ SUCCESS TICKER CARD ══ */}
        <motion.div
          ref={tickerRef}
          className="rounded-xl backdrop-blur-[20px]"
          style={{
            background: 'rgba(31,31,31,0.8)',
            border: '1px solid #262626',
            borderTop: '2px solid #FBBF24',
            padding: 'clamp(16px, 3.5vw, 28px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={tickerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
           * Mobile: column, counter on top & centered. sm+: row, label left / counter right.
           */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Counter — appears first (top) on mobile */}
            <p
              className="font-display order-first sm:order-last"
              style={{
                fontSize: 'clamp(40px, 6vw, 56px)',
                fontWeight: 600,
                lineHeight: 1,
                color: '#FBBF24',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              aria-label={`$${count}M+ Value Generated`}
            >
              ${count}M+
            </p>

            {/* Label + description */}
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: '#FBBF24',
                    animation: 'status-pulse 2s ease-in-out infinite',
                  }}
                  aria-hidden
                />
                <p
                  className="font-mono text-text-tertiary"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Value Generated for Partners
                </p>
              </div>
              <p
                className="text-center text-text-secondary sm:text-left"
                style={{
                  fontSize: 'clamp(12px, 1.5vw, 13px)',
                  lineHeight: 1.55,
                  maxWidth: 420,
                }}
              >
                Cumulative economic value from AI systems deployed across enterprise partners
                globally.
              </p>
            </div>

          </div>
        </motion.div>

        {/* ══ OUTCOME GRID ══ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            marginTop: 'clamp(32px, 4vw, 56px)',
            gap: 'clamp(20px, 3vw, 32px)',
          }}
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {OUTCOME_CARDS.map((card) => (
            <OutcomeCard key={card.id} card={card} isTouch={isTouch} />
          ))}
        </motion.div>

        {/* ══ BOTTOM INSIGHT STRIP ══ */}
        <motion.div
          className="rounded-xl backdrop-blur-[20px]"
          style={{
            marginTop: 'clamp(32px, 4vw, 56px)',
            background: 'rgba(31,31,31,0.8)',
            border: '1px solid #262626',
            padding: 'clamp(16px, 3.5vw, 28px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-center font-serif text-text-secondary sm:text-left"
              style={{
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              AI advantage does not come from tools. It comes from the{' '}
              <span style={{ color: '#FBBF24', fontWeight: 700 }}>
                systems that orchestrate them
              </span>
              .
            </p>

            {/* Badge — sm+ only to avoid crowding on narrow phones */}
            <p
              className="hidden shrink-0 font-mono text-text-micro sm:block"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              VRISO SYSTEM ARCHITECTURE
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
