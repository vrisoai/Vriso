'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FADE_UP,
  STAGGER_CONTAINER,
  STAGGER_CHILD,
  DIVIDER_REVEAL,
  ACCENT_BAR,
  COLUMN_LEFT,
  COLUMN_RIGHT,
} from '@/app/lib/animations';

const LEFT_PARAGRAPHS = [
  'Enterprises did not fail to adopt AI.',
  'They adopted it everywhere.',
  <>Copilots in one department.{'\n'}Automation scripts in another.{'\n'}External LLM wrappers stitched across internal workflows.</>,
  <>Data pipelines forked.{'\n'}Governance drifted.{'\n'}Institutional memory fragmented.</>,
];

const LEFT_EMPHASIS = 'What looked like innovation became infrastructure entropy.';

const RIGHT_PARAGRAPHS = [
  'When AI is layered as tooling instead of architecture, the organization accumulates invisible strategic debt.',
  <>Capabilities remain portable.{'\n'}Interfaces remain imitable.{'\n'}Margins remain exposed.</>,
  'Competitors can license the same models.',
];

const RIGHT_EMPHASIS = 'They cannot replicate your integrated system.';

const POSITIONING = [
  'Vriso AI does not deploy wrappers',
  'We design sovereign AI infrastructures vertically integrated systems that convert experimentation into owned economic leverage.',
];

const POSITIONING_EMPHASIS = 'We build assets that compound beyond imitation';

export function FragmentationRisk() {
  const columnsRef = useRef(null);
  const columnsInView = useInView(columnsRef, { once: true, margin: '-40px' });

  return (
    <section
      className="relative w-full overflow-x-hidden bg-bg-primary"
      style={{
        paddingTop: 'clamp(60px, 10vw, 140px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
    >
      {/* F. Subtle warm radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 25% 40%, rgba(251,191,36,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="section-container section-inner relative w-full">

        {/* ── Label ── */}
        <motion.p
          className="section-label text-center sm:text-left"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
        >
          [ STRATEGIC DIAGNOSIS · 2026 ]
        </motion.p>

        {/* ── Headline — Animated amber accent bar ── */}
        <motion.div
          className="flex items-stretch justify-center sm:justify-start"
          style={{ marginTop: 'clamp(20px, 3vw, 32px)', gap: 20 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div
            style={{
              width: 3,
              borderRadius: 2,
              background: 'var(--color-trust-amber)',
              transformOrigin: 'top',
            }}
            variants={ACCENT_BAR}
            animate={{ boxShadow: ['0 0 0px rgba(251,191,36,0)', '0 0 20px rgba(251,191,36,0.5)', '0 0 0px rgba(251,191,36,0)'] }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          />
          <motion.h2
            className="font-serif text-text-primary text-center sm:text-left"
            style={{
              fontSize: 'clamp(36px, 4vw, 50px)',
              fontWeight: 500,
              lineHeight: 1.15,
            }}
            variants={FADE_UP}
            custom={1}
          >
            The Fragmentation Risk.
          </motion.h2>
        </motion.div>

        {/* ── Subhead ── */}
        <motion.p
          className="section-subtext mx-auto text-center sm:text-left"
          style={{ maxWidth: 720, marginTop: 'clamp(16px, 2.5vw, 24px)' }}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
        >
          AI capability is no longer the constraint.
          <br />
          Architectural coherence is.
        </motion.p>

        {/* ── Two-Column Body — columns slide in from left/right ── */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr]"
          style={{ marginTop: 'clamp(40px, 8vw, 80px)', columnGap: 'clamp(32px, 6vw, 80px)', rowGap: 'clamp(24px, 5vw, 48px)' }}
        >
          {/* Left — Diagnosis (slides in from left) */}
          <motion.div
            className="font-serif text-text-secondary md:border-r md:pr-10"
            style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              lineHeight: 1.8,
              borderColor: 'rgba(251,191,36,0.35)',
            }}
            initial="hidden"
            animate={columnsInView ? 'visible' : 'hidden'}
            variants={COLUMN_LEFT}
          >
            {/* A. Column label */}
            <motion.p
              variants={STAGGER_CHILD}
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                marginBottom: 32,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              THE_PROBLEM
            </motion.p>

            {LEFT_PARAGRAPHS.map((text, i) => (
              <motion.p key={i} variants={STAGGER_CHILD} style={{ marginBottom: 28 }}>
                {text}
              </motion.p>
            ))}

            {/* C. Emphasis — amber pull-quote border */}
            <motion.p
              variants={STAGGER_CHILD}
              className="text-text-primary"
              style={{
                fontSize: 'clamp(18px, 1.5vw, 21px)',
                fontWeight: 500,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 16,
                marginTop: 8,
              }}
            >
              {LEFT_EMPHASIS}
            </motion.p>
          </motion.div>

          {/* Right — Strategic Liability (slides in from right, 100ms stagger) */}
          <motion.div
            className="font-serif text-text-secondary"
            style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              lineHeight: 1.8,
            }}
            initial="hidden"
            animate={columnsInView ? 'visible' : 'hidden'}
            variants={COLUMN_RIGHT}
          >
            {/* A. Column label */}
            <motion.p
              variants={STAGGER_CHILD}
              className="font-mono text-text-micro"
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                fontWeight: 500,
                marginBottom: 32,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 10,
              }}
            >
              STRATEGIC_LIABILITY
            </motion.p>

            {RIGHT_PARAGRAPHS.map((text, i) => (
              <motion.p key={i} variants={STAGGER_CHILD} style={{ marginBottom: 28 }}>
                {text}
              </motion.p>
            ))}

            {/* C. Emphasis — amber border + amber text */}
            <motion.p
              variants={STAGGER_CHILD}
              className="text-trust-amber"
              style={{
                fontSize: 'clamp(19px, 1.6vw, 23px)',
                fontWeight: 600,
                borderLeft: '2px solid var(--color-trust-amber)',
                paddingLeft: 16,
                marginTop: 8,
              }}
            >
              {RIGHT_EMPHASIS}
            </motion.p>
          </motion.div>
        </div>

        {/* ── Divider — D. Animated amber gradient reveal ── */}
        <div
          style={{
            marginTop: 'clamp(60px, 8vw, 100px)',
            marginBottom: 'clamp(60px, 8vw, 100px)',
          }}
        >
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

        {/* ── Positioning Block ── */}
        <motion.div
          className="mx-auto font-serif text-center text-text-secondary"
          style={{ maxWidth: 760, fontSize: 'clamp(17px, 1.4vw, 20px)', lineHeight: 1.8 }}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {POSITIONING.map((text, i) => (
            <motion.p key={i} variants={STAGGER_CHILD} style={{ marginBottom: 28 }}>
              {text}
            </motion.p>
          ))}

          {/* G. Final line — amber colored, larger */}
          <motion.p
            variants={STAGGER_CHILD}
            className="text-trust-amber"
            style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 600 }}
          >
            {POSITIONING_EMPHASIS}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
