'use client';

/**
 * HeroSection — GSAP "Masked Word Curtain" reveal
 *
 * Each word sits inside an overflow:hidden clip container. GSAP (via
 * useLayoutEffect) immediately sets the inner spans to yPercent:108 before
 * the browser paints — so there is no SSR flash — then the timeline rises
 * each word up through the clip boundary with expo.out stagger.
 *
 * Key pattern: gsap.set() for initial state, gsap.to() for animation.
 * Never rely on CSS transforms for the initial hidden state in Next.js;
 * GSAP owns the property end-to-end.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const HERO_WORDS = [
  { text: 'Building',       accent: false, gradient: false },
  { text: 'the',            accent: false, gradient: false },
  { text: 'Infrastructure', accent: true,  gradient: false },
  { text: 'Behind',         accent: false, gradient: false },
  { text: 'Enterprise',     accent: false, gradient: true  },
  { text: 'AI',             accent: false, gradient: true  },
];

interface HeroSectionProps {
  reducedMotion?: boolean;
}

export function HeroSection({ reducedMotion = false }: HeroSectionProps) {
  const sectionRef   = useRef<HTMLElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const wordRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const dotRef       = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    // ── reduced motion: show everything immediately ───────────────────────
    if (reducedMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      gsap.set(
        [labelRef.current, descRef.current, indicatorRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }

    // ── set initial hidden states (runs in useLayoutEffect → before paint) ─
    // GSAP owns the transform/opacity — no CSS initial-state needed.
    gsap.set(words,               { yPercent: 108 });
    gsap.set(labelRef.current,    { opacity: 0, y: 10 });
    gsap.set(descRef.current,     { opacity: 0, y: 22 });
    gsap.set(indicatorRef.current,{ opacity: 0 });

    // ── animation timeline ────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.15 });

    // Section label slides in
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

    // Words curtain up — each word rises from below its clip boundary
    tl.to(
      words,
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { each: 0.075, from: 'start' },
      },
      '-=0.25'
    );

    // Description fades up
    tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.45');

    // Scroll indicator appears
    tl.to(indicatorRef.current, { opacity: 1, duration: 0.5 }, '-=0.3');

    // Dot bounces infinitely
    gsap.to(dotRef.current, {
      y: 6,
      duration: 1.0,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-hero flex min-h-0 w-full flex-col items-center justify-center overflow-x-clip px-4 sm:px-[var(--section-px)]"
      style={{
        height: '100%',
        /* svh-based padding shrinks on short laptop screens instead of
           overflowing the fixed 88svh sticky container */
        paddingTop:    'clamp(1.25rem, 4svh, 4rem)',
        paddingBottom: 'clamp(1.25rem, 4svh, 4rem)',
        background: 'var(--color-bg-primary)',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,91,255,0.06) 0%, transparent 60%)',
      }}
      aria-labelledby="about-hero-heading"
    >
      <div className="section-container mx-auto flex w-full max-w-[1152px] 2xl:max-w-[1400px] min-[1920px]:max-w-[1680px] min-[2800px]:max-w-[2600px] flex-col items-center text-center">

        {/* Section label */}
        <p
          ref={labelRef}
          aria-hidden="true"
          className="section-label"
        >
          [ ABOUT INVISIGENT ]
        </p>

        {/* Heading — each word: outer span clips, inner span is the animated target */}
        <h1
          id="about-hero-heading"
          className="about-heading font-serif font-semibold leading-[1.1] text-[var(--color-text-primary)] text-hero mx-auto max-w-[900px] 2xl:max-w-[1200px] min-[2800px]:max-w-[1800px]"
        >
          <span className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {HERO_WORDS.map((w, i) => (
              // Outer span = the overflow:hidden clip wall
              // Inner span = the element that GSAP slides upward
              <span
                key={`${w.text}-${i}`}
                style={{ overflow: 'hidden', display: 'inline-block' }}
              >
                <span
                  ref={el => { wordRefs.current[i] = el; }}
                  style={{
                    display: 'inline-block',
                    // Gradient / accent colours live on the inner animated span
                    color: w.accent ? 'var(--color-trust-amber)' : undefined,
                    background: w.gradient ? 'var(--gradient-headline)' : undefined,
                    WebkitBackgroundClip: w.gradient ? 'text' : undefined,
                    WebkitTextFillColor: w.gradient ? 'transparent' : undefined,
                    backgroundClip: w.gradient ? 'text' : undefined,
                  }}
                >
                  {w.text}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <div
          ref={descRef}
          className="about-description text-body mx-auto max-w-[600px] 2xl:max-w-[780px] min-[2800px]:max-w-[1100px] font-display text-[var(--color-text-secondary)] text-left"
          style={{ lineHeight: 'clamp(1.55, 2.5svh, 1.75)' }}
        >
          <p>
            Most AI systems look great in demos. Then they hit production — and collapse under real
            data, real load, or a real security review.
          </p>
          <p style={{ marginTop: 'clamp(0.5em, 1.5svh, 1em)' }}>
            Invisigent exists to skip that cycle. We design the infrastructure that survives
            production before a single agent is built — so that when you deploy, it actually runs.
          </p>
          <p style={{ marginTop: 'clamp(0.5em, 1.5svh, 1em)' }}>
            Founder-led. Every engagement handled directly, not delegated — by design.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 flex flex-col items-center gap-1 sm:bottom-8"
          style={{ transform: 'translateX(-50%)' }}
        >
          <span
            ref={dotRef}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-trust-amber)]"
            style={{ display: 'block' }}
          />
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-[var(--color-text-tertiary)]"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

      </div>
    </section>
  );
}
