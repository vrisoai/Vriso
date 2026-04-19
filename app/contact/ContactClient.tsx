'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import { LetsTalkForm } from './LetsTalkForm';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WHAT_HAPPENS = [
  {
    step: '01',
    title: 'We read every brief',
    body: 'No autoresponders. A real person at Invisigent reviews your message personally within 24 hours.',
  },
  {
    step: '02',
    title: 'Scoping call',
    body: "If there's a fit, we schedule a focused 30-minute call to understand your environment, constraints, and goals.",
  },
  {
    step: '03',
    title: 'Proposal or referral',
    body: "We either send a tailored proposal outlining scope, approach, and investment — or, if we're not the right fit, we'll point you toward someone who is. No pressure, no awkward follow-up sequences.",
  },
];

export function ContactClient() {
  const mainRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean; reduced: boolean };

          if (!motion) return;

          // ── 1. Status dot ambient pulse ───────────────────────────────
          gsap.to('.contact-status-dot', {
            opacity: 0.45, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut',
          });

          // ── 2. Hero cascade — eyebrow → words → subtext ───────────────
          gsap.set('.contact-eyebrow', { opacity: 0, x: -16 });
          gsap.set('.contact-word', { opacity: 0, filter: 'blur(8px)', y: 14 });
          gsap.set('.contact-subtext', { opacity: 0, x: -20 });

          gsap.timeline({ delay: 0.12 })
            .to('.contact-eyebrow', { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' })
            .to('.contact-word', {
              opacity: 1, filter: 'blur(0px)', y: 0,
              stagger: 0.07, duration: 0.5, ease: 'power2.out',
            }, '-=0.2')
            .to('.contact-subtext', { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, '-=0.15');

          // ── 3. Stats bento — staggered back.out reveal ────────────────
          gsap.set('.contact-stat-card', { opacity: 0, y: 24, scale: 0.96 });
          ScrollTrigger.batch('.contact-stat-card', {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.1, duration: 0.55, ease: 'back.out(1.3)',
              }),
          });

          // ── 4. Process timeline — label + staggered items + num pulse ─
          gsap.set('.contact-process-label', { opacity: 0, x: -12 });
          gsap.set('.contact-process-item', { opacity: 0, x: -20 });

          ScrollTrigger.create({
            trigger: '.contact-process',
            start: 'top 82%',
            once: true,
            onEnter: () => {
              gsap.timeline()
                .to('.contact-process-label', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
                .to('.contact-process-item', {
                  opacity: 1, x: 0, stagger: 0.18, duration: 0.5, ease: 'power2.out',
                }, '-=0.1');

              document.querySelectorAll('.contact-process-num').forEach((el, i) => {
                gsap.timeline({ delay: 0.2 + i * 0.18 })
                  .to(el, { scale: 1.12, duration: 0.2, ease: 'power2.out' })
                  .to(el, { scale: 1, duration: 0.3, ease: 'power2.in' });
              });
            },
          });

          // ── 5. Direct email — fade + slide from left ──────────────────
          gsap.set('.contact-direct', { opacity: 0, x: -16 });
          ScrollTrigger.create({
            trigger: '.contact-direct',
            start: 'top 90%',
            once: true,
            onEnter: () =>
              gsap.to('.contact-direct', { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }),
          });

          // ── 6. Form wrapper — slide up from below ─────────────────────
          gsap.set('.contact-form-wrapper', { opacity: 0, y: 32 });
          ScrollTrigger.create({
            trigger: '.contact-form-wrapper',
            start: 'top 88%',
            once: true,
            onEnter: () =>
              gsap.to('.contact-form-wrapper', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
          });

          // ── 7. Ambient orb breathing ──────────────────────────────────
          if (orbRef.current) {
            gsap.to(orbRef.current, {
              '--orb-x': '60%',
              '--orb-y': '40%',
              repeat: -1, yoyo: true, duration: 8, ease: 'sine.inOut',
            } as gsap.TweenVars);
          }
        }
      );
    },
    { scope: mainRef }
  );

  return (
    <>
      <main ref={mainRef} className="contact-page">
        <div ref={orbRef} className="contact-ambient-orb" aria-hidden="true" />
        <div className="contact-dot-grid" aria-hidden="true" />
        <div className="contact-scan-line" aria-hidden="true" />

        <div className="contact-shell">

          {/* ── Left column ──────────────────────────────────────────── */}
          <aside className="contact-left">

            <p className="contact-eyebrow">
              <span className="contact-status-dot" aria-hidden="true" />
              Invisigent · Engagement Intake
            </p>

            {/* Word-split for blur-reveal — aria-label preserves accessible text */}
            <h1
              className="contact-heading font-serif"
              aria-label="Let's Build Something Real."
            >
              <span className="contact-word" style={{ display: 'inline-block', marginRight: '0.25em' }}>Let&apos;s</span>
              <span className="contact-word" style={{ display: 'inline-block' }}>Build</span>
              <br />
              <span className="contact-word" style={{ display: 'inline-block' }}>Something</span>
              <br />
              <span className="contact-word gradient-text" style={{ display: 'inline-block' }}>Real.</span>
            </h1>

            <p className="contact-subtext font-serif">
              Tell us what you&apos;re building. We&apos;ll tell you if we can help — and exactly what it would look like if we did.
            </p>

            <div className="contact-stats-grid">
              <div className="contact-stat-card">
                <p className="contact-stat-num">
                  4<span className="contact-stat-unit">/qtr</span>
                </p>
                <p className="contact-stat-label">Engagements</p>
              </div>

              <div className="contact-stat-card">
                <p className="contact-stat-num">24h</p>
                <p className="contact-stat-label">Response time</p>
              </div>

              <div className="contact-stat-card contact-stat-card--amber">
                <p className="contact-stat-icon">◈</p>
                <p className="contact-stat-label">NDA available on request</p>
                <p className="contact-stat-label" style={{ fontSize: '0.75rem', opacity: 0.6 }}>before scoping call</p>
              </div>

              <div className="contact-stat-card">
                <p className="contact-stat-icon" style={{ color: 'var(--color-text-tertiary)' }}>✗</p>
                <p className="contact-stat-label">No cold follow-ups</p>
              </div>
            </div>

            <hr className="contact-divider" />

            <div className="contact-process">
              <p className="contact-process-label">[ WHAT HAPPENS NEXT ]</p>
              <ol className="contact-process-list">
                {WHAT_HAPPENS.map((item) => (
                  <li key={item.step} className="contact-process-item">
                    <span className="contact-process-num">{item.step}</span>
                    <div>
                      <p className="contact-process-title">{item.title}</p>
                      <p className="contact-process-body">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <hr className="contact-divider" />

            <div className="contact-direct">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                DIRECT LINE
              </p>
              <a
                href="mailto:hello@vriso.ai"
                className="contact-email"
                aria-label="Email Invisigent at hello@vriso.ai"
              >
                hello@vriso.ai
              </a>
            </div>

          </aside>

          {/* ── Right column: form ────────────────────────────────── */}
          <div className="contact-right">
            <div className="contact-form-wrapper">
              <LetsTalkForm />
            </div>
          </div>

        </div>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
