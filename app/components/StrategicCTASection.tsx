'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE, ITEM } from '@/app/lib/animations';

const CTA_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/* ─────────────────────────── Trust signal data ─────────────────────────── */

const TRUST_SIGNALS = [
  'Enterprise Engagements — Limited to 4 per Quarter',
  'VRISO Framework — Strategic Systems Architecture',
  'Compliance Ready — GDPR / SOC2 / DPDP',
] as const;

/* ─────────────────────────── Sovereign Monolith visual ─────────────────── */

/* Shared face design — same for all 6 sides */
const FACE_STYLES = {
  background: 'linear-gradient(145deg, #1C1C1C 0%, #111111 100%)',
  grid: {
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
  },
  edgeTop: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 25%, rgba(59,130,246,0.6) 75%, transparent 100%)',
  edgeBottom: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.4) 25%, rgba(59,130,246,0.4) 75%, transparent 100%)',
  edgeLeft: 'linear-gradient(180deg, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.2) 60%, transparent 100%)',
  edgeRight: 'linear-gradient(180deg, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.2) 60%, transparent 100%)',
};

function CubeFace({
  transform,
  faceBase,
}: {
  transform: string;
  faceBase: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...faceBase,
        transform,
        background: FACE_STYLES.background,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...FACE_STYLES.grid,
        }}
        aria-hidden
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: FACE_STYLES.edgeTop }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: FACE_STYLES.edgeBottom }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: FACE_STYLES.edgeLeft }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: FACE_STYLES.edgeRight }} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          style={{
            width: 52,
            height: 52,
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{
              boxShadow: [
                  '0 0 0px rgba(59,130,246,0)',
                  '0 0 20px rgba(59,130,246,0.25)',
                  '0 0 0px rgba(59,130,246,0)',
                ],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'rgba(59,130,246,0.65)',
              boxShadow: '0 0 12px rgba(59,130,246,0.45)',
            }}
          />
        </motion.div>
      </div>

      <p
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          fontSize: 7,
          color: 'rgba(59,130,246,0.45)',
          letterSpacing: '0.14em',
        }}
      >
        VRISO.SYS
      </p>
      <p
        className="font-mono"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          fontSize: 7,
          color: 'rgba(59,130,246,0.35)',
          letterSpacing: '0.12em',
        }}
      >
        v2.4.1
      </p>
    </div>
  );
}

function SovereignMonolith({ inView }: { inView: boolean }) {
  const SIZE = 200;
  const HALF = SIZE / 2;

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    backfaceVisibility: 'hidden',
    border: '1px solid #262626',
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ perspective: 900, perspectiveOrigin: '50% 40%' }}
      aria-hidden
    >
      <motion.div
        style={{
          width: SIZE,
          height: SIZE,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: 0, rotateX: 8 }}
        animate={
          inView
            ? {
                rotateY: [0, 360],
                rotateX: 8,
              }
            : { rotateY: 0, rotateX: 8 }
        }
        transition={{
          rotateY: { duration: 16, ease: 'linear', repeat: Infinity },
        }}
      >
        <CubeFace faceBase={faceBase} transform={`translateZ(${HALF}px)`} />
        <CubeFace faceBase={faceBase} transform={`rotateY(180deg) translateZ(${HALF}px)`} />
        <CubeFace faceBase={faceBase} transform={`rotateY(-90deg) translateZ(${HALF}px)`} />
        <CubeFace faceBase={faceBase} transform={`rotateY(90deg) translateZ(${HALF}px)`} />
        <CubeFace faceBase={faceBase} transform={`rotateX(-90deg) translateZ(${HALF}px)`} />
        <CubeFace faceBase={faceBase} transform={`rotateX(90deg) translateZ(${HALF}px)`} />
      </motion.div>

      {/* Ground reflection glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 180,
          height: 40,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
    </div>
  );
}

/* ─────────────────────────── Main section component ────────────────────── */

export default function StrategicCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      className="relative w-full overflow-x-hidden"
      style={{
        background: '#121212',
        paddingTop: 'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(100px, 12vw, 160px)',
        paddingLeft: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1.5rem, 5vw, 4rem), env(safe-area-inset-right))',
      }}
      aria-labelledby="strategic-cta-heading"
    >
      {/* Amber radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* ─── Inner container ─── */}
      <div ref={sectionRef} className="section-container section-inner relative">
        {/* Two-column grid: content left, monolith right */}
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">

          {/* ════════════════ LEFT COLUMN ════════════════ */}
          <motion.div
            className="flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left"
            variants={CTA_STAGGER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >

            {/* ── System status label ── */}
            <motion.div
              variants={ITEM}
              className="section-label flex items-center gap-4"
              style={{ paddingLeft: 10 }}
            >
              <p
                className="font-mono text-text-tertiary"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Strategic Activation
              </p>
              <div className="flex items-center gap-1.5">
                <span className="status-dot-sm shrink-0" aria-hidden />
                <span
                  className="font-mono text-text-tertiary"
                  style={{ fontSize: 10, letterSpacing: '0.1em' }}
                >
                  Node Ready
                </span>
              </div>
            </motion.div>

            {/* ── Headline ── */}
            <motion.h2
              id="strategic-cta-heading"
              variants={ITEM}
              className="font-serif text-text-primary"
              style={{
                marginTop: 'clamp(20px, 3vw, 28px)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Build Your{' '}
              <span style={{ color: '#FBBF24' }}>Sovereign AI</span>{' '}
              Infrastructure
            </motion.h2>

            {/* ── Description ── */}
            <motion.p
              variants={ITEM}
              className="text-text-secondary"
              style={{
                marginTop: 'clamp(16px, 2.5vw, 24px)',
                maxWidth: 560,
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                lineHeight: 1.7,
              }}
            >
              Enterprise advantage no longer comes from adopting AI tools. It comes from
              engineering systems that competitors cannot replicate.
              <br />
              <br />
              Vriso AI partners with leadership teams to architect VRISO-compliant agentic
              infrastructure that compounds operational advantage.
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div
              variants={ITEM}
              className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
              style={{ marginTop: 'clamp(28px, 4vw, 48px)', marginBottom: 'clamp(28px, 4vw, 48px)' }}
            >
              {/* Primary */}
              <motion.button
                type="button"
                className="font-display font-medium text-text-primary"
                style={{
                  background: '#0F0F0F',
                  border: '1px solid #3B82F6',
                  padding: '14px 28px',
                  borderRadius: 999,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'background 200ms ease',
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ y: -2, boxShadow: '0 0 24px rgba(59,130,246,0.25)' }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#161616';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#0F0F0F';
                }}
                aria-label="Book a strategic AI session with Vriso"
              >
                Book Strategic Session
              </motion.button>

              {/* Secondary */}
              <motion.button
                type="button"
                className="font-display text-text-secondary"
                style={{
                  background: 'transparent',
                  border: '1px solid #262626',
                  padding: '14px 28px',
                  borderRadius: 999,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease, color 200ms ease',
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = '#FBBF24';
                  el.style.color = '#E5E7EB';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = '#262626';
                  el.style.color = '#9CA3AF';
                }}
                aria-label="Explore the VRISO Framework"
              >
                Explore VRISO Framework
              </motion.button>
            </motion.div>

            {/* ── Enterprise signal row ── */}
            <motion.div
              variants={ITEM}
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
            >
              {TRUST_SIGNALS.map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <span className="status-dot-sm shrink-0" aria-hidden />
                  <span
                    className="font-mono text-text-tertiary"
                    style={{ fontSize: 10, letterSpacing: '0.06em' }}
                  >
                    {signal}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════════ RIGHT COLUMN — Sovereign Monolith ════════════════ */}
          <motion.div
            className="relative flex shrink-0 items-center justify-center"
            style={{ width: 280, height: 280 }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }
            }
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            {/* Outer ambient halo */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <SovereignMonolith inView={inView} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
