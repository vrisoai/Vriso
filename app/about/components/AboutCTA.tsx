'use client';

/**
 * AboutCTA — GSAP
 *
 * Orb: the blue radial-gradient background breathes (scale oscillates) via
 *      a custom property animated by GSAP, giving the CTA section a living glow.
 * Heading: each word sharpens from blur(10px) → blur(0) with a left→right
 *          stagger — words materialise out of a soft haze as you scroll in.
 * Body + buttons: clean fadeUp after the heading settles.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';
import { MagneticLinkButton } from './shared/MagneticLinkButton';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Split heading into words for the blur reveal
const CTA_WORDS = ['This', 'Is', 'Where', 'It', 'Starts.'];

interface AboutCTAProps {
  reducedMotion?: boolean;
}

export function AboutCTA({ reducedMotion = false }: AboutCTAProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const orbRef      = useRef<HTMLDivElement>(null);
  const wordRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const ctaRowRef   = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(wordRefs.current.filter(Boolean), { opacity: 1, filter: 'blur(0px)', y: 0 });
      gsap.set([bodyRef.current, ctaRowRef.current, badgeRef.current], { opacity: 1, y: 0 });
      return;
    }

    // ── breathing orb ─────────────────────────────────────────────────────
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        '--orb-x': '110%',   // backgroundSize X
        '--orb-y': '55%',    // backgroundSize Y
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // ── heading blur word reveal — GSAP owns opacity/filter/y from before paint
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(words, { opacity: 0, filter: 'blur(10px)', y: 12 });
    gsap.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: { each: 0.08, from: 'start' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });

    // ── body copy ─────────────────────────────────────────────────────────
    gsap.set(bodyRef.current, { opacity: 0, y: 20 });
    gsap.to(bodyRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: bodyRef.current, start: 'top 85%', once: true },
      delay: 0.3,
    });

    // ── CTA buttons + badge ───────────────────────────────────────────────
    gsap.set([ctaRowRef.current, badgeRef.current], { opacity: 0, y: 16 });
    gsap.to([ctaRowRef.current, badgeRef.current], {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: ctaRowRef.current, start: 'top 88%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-cta overflow-x-hidden"
      aria-labelledby="about-cta-heading"
      style={{ background: '#121212' }}
    >
      {/* Breathing orb — CSS custom props let us animate gradients without layout cost */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          ['--orb-x' as string]: '80%',
          ['--orb-y' as string]: '40%',
          backgroundImage:
            'radial-gradient(ellipse var(--orb-x) var(--orb-y) at 50% 0%, rgba(45,91,255,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="section-wrapper relative">
        <div className="section-inner-max section-inner">
          <div
            style={{
              maxWidth: 'clamp(320px, 55vw, 860px)',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <SectionLabel text="[ LET'S BUILD ]" reducedMotion={reducedMotion} />

            {/* Heading — words blur-reveal individually */}
            <h2
              id="about-cta-heading"
              className="about-heading font-serif font-semibold text-[var(--color-text-primary)]"
              style={{
                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                lineHeight: 1.15,
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              <span className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1">
                {CTA_WORDS.map((word, i) => (
                  <span
                    key={i}
                    ref={el => { wordRefs.current[i] = el; }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="about-description font-display text-[var(--color-text-secondary)]"
              style={{
                textAlign: 'center',
                margin: '1.5rem auto 0',
                maxWidth: '38em',
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.125rem)',
                lineHeight: 1.75,
              }}
            >
              Invisigent works with 4 organizations per quarter by design. Every engagement gets full senior-level attention from architecture through production deployment, handled directly by our founder.
              <br /><br />
              If you are ready to move from AI experiments to infrastructure your team owns and operates  book a 30-minute architecture review. No pitch. No obligation. Just an honest assessment of where your AI infrastructure stands and what it would take to build it right.
            </p>

            {/* Buttons */}
            <div
              ref={ctaRowRef}
              className="about-block-spacing flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <MagneticLinkButton
                href="/contact"
                primary
                className="btn-base btn-primary w-full sm:w-auto"
                ariaLabel="Discuss your AI architecture with Invisigent"
              >
                Discuss Your AI Architecture
              </MagneticLinkButton>
              <MagneticLinkButton
                href="/about#how-we-work"
                className="btn-base btn-secondary w-full sm:w-auto"
                ariaLabel="See how we work"
              >
                See How We Work
              </MagneticLinkButton>
            </div>

            {/* Compliance badge */}
            <p
              ref={badgeRef}
              className="about-description text-label flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[var(--color-text-micro)] sm:gap-x-4"
              style={{ letterSpacing: '0.06em' }}
            >
              <span className="text-[var(--color-trust-amber)]" aria-hidden="true">●</span>
              <span>EU AI Act · GDPR · SOC 2 · DPDP Act compliant infrastructure</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
