'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type React from 'react';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import { InteractiveDemoDeploymentCarousel } from '@/app/components/InteractiveDemoDeploymentCarousel';
import { InteractiveDemoDeploymentTiltCard } from '@/app/components/InteractiveDemoDeploymentTiltCard';
import { TOOLS, STANDARD_TOOL_IDS_WITHOUT_MOCK } from './tools-data';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const standardToolCount = TOOLS.filter((t) => !t.featured).length;
/** On xl (3 columns), last row has a single orphan — span full width */
const lastStandardCardFullWidthXl = standardToolCount % 3 === 1;

function getToolVisual(id: string) {
  if (id === 'search-visibility-analyzer') {
    return (
      <div className="flex w-full flex-col shrink-0">
        <div className="interactive-demo-analyzer-panel flex w-full max-w-full flex-col gap-1.5 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <div className="min-w-0">
            <span className="block font-mono text-[11px] tracking-[0.12em] text-text-tertiary">
              ANALYZING VISIBILITY
            </span>
          </div>
          <div className="w-full min-w-0">
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-link transition-[opacity] duration-700 ease-out motion-safe:animate-pulse"
                style={{ width: '84%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function InteractiveDemoClient() {
  const mainRef = useRef<HTMLElement>(null);

  // ── Hero refs ───────────────────────────────────────────────────────────
  const heroLabelRef  = useRef<HTMLParagraphElement>(null);
  const heroH1Ref     = useRef<HTMLHeadingElement>(null);
  const heroDek1Ref   = useRef<HTMLParagraphElement>(null);
  const heroDek2Ref   = useRef<HTMLParagraphElement>(null);
  const heroCtaRef    = useRef<HTMLAnchorElement>(null);
  const heroStatusRef = useRef<HTMLDivElement>(null);

  // ── Tools grid refs ─────────────────────────────────────────────────────
  const gridH2Ref       = useRef<HTMLHeadingElement>(null);
  const gridDescRef     = useRef<HTMLParagraphElement>(null);
  const featuredCardRef = useRef<HTMLElement>(null);

  // ── Built for Real Businesses refs ──────────────────────────────────────
  const builtH2Ref  = useRef<HTMLHeadingElement>(null);
  const builtP1Ref  = useRef<HTMLParagraphElement>(null);
  const builtP2Ref  = useRef<HTMLParagraphElement>(null);
  const builtKeyRef = useRef<HTMLParagraphElement>(null);

  // ── From Demo to Deployment refs ────────────────────────────────────────
  const deployH2Ref = useRef<HTMLHeadingElement>(null);

  // ── CTA refs ────────────────────────────────────────────────────────────
  const ctaOrbRef  = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  // ── Global Infrastructure refs ──────────────────────────────────────────
  const infraH2Ref = useRef<HTMLHeadingElement>(null);
  const infraP1Ref = useRef<HTMLParagraphElement>(null);
  const infraP2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion:  '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { reduced } = ctx.conditions!;

        // ── Reduced motion: reveal everything instantly ───────────────────
        if (reduced) {
          gsap.set(
            [
              heroLabelRef.current, heroH1Ref.current, heroDek1Ref.current,
              heroDek2Ref.current, heroCtaRef.current, heroStatusRef.current,
              gridH2Ref.current, gridDescRef.current, featuredCardRef.current,
              builtH2Ref.current, builtP1Ref.current, builtP2Ref.current,
              builtKeyRef.current, deployH2Ref.current,
              ctaCardRef.current,
              infraH2Ref.current, infraP1Ref.current, infraP2Ref.current,
            ].filter(Boolean),
            { opacity: 1, y: 0, x: 0, scale: 1 }
          );
          gsap.set('.interactive-demo-tool-card',       { opacity: 1, y: 0 });
          gsap.set('.interactive-demo-deployment-card', { opacity: 1, y: 0 });
          return;
        }

        // ── 1. HERO — gsap.timeline() cascade ────────────────────────────
        // Set initial state before paint (useLayoutEffect timing)
        gsap.set(
          [
            heroLabelRef.current, heroH1Ref.current, heroDek1Ref.current,
            heroDek2Ref.current, heroCtaRef.current, heroStatusRef.current,
          ],
          { opacity: 0, y: 20 }
        );

        // delay: 0.15s — lets the CSS scan-line (0.1s start) begin first
        const heroTl = gsap.timeline({ delay: 0.15 });
        heroTl
          .to(heroLabelRef.current,  { opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' })
          .to(heroH1Ref.current,     { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out'   }, '-=0.1')
          .to(heroDek1Ref.current,   { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3')
          .to(heroDek2Ref.current,   { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.38')
          .to(heroCtaRef.current,    { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.28')
          .to(heroStatusRef.current, { opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' }, '-=0.2');

        // ── 2. TOOLS GRID — header + featured card + batch stagger ────────
        gsap.set([gridH2Ref.current, gridDescRef.current], { opacity: 0, y: 24 });
        gsap.to([gridH2Ref.current, gridDescRef.current], {
          opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: gridH2Ref.current, start: 'top 85%', once: true },
        });

        gsap.set(featuredCardRef.current, { opacity: 0, y: 28, scale: 0.97 });
        gsap.to(featuredCardRef.current, {
          opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'expo.out',
          scrollTrigger: { trigger: featuredCardRef.current, start: 'top 85%', once: true },
        });

        // Standard cards: batch so all cards entering together stagger as one group
        gsap.set('.interactive-demo-tool-card', { opacity: 0, y: 24 });
        ScrollTrigger.batch('.interactive-demo-tool-card', {
          start: 'top 88%',
          once: true,
          onEnter: batch => gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.3)', stagger: 0.1,
          }),
        });

        // ── 3. BUILT FOR REAL BUSINESSES ──────────────────────────────────
        // h2 slides from the left — contrasts with the right-biased page layout
        gsap.set(builtH2Ref.current, { opacity: 0, x: -28 });
        gsap.to(builtH2Ref.current, {
          opacity: 1, x: 0, duration: 0.75, ease: 'expo.out',
          scrollTrigger: { trigger: builtH2Ref.current, start: 'top 85%', once: true },
        });

        gsap.set([builtP1Ref.current, builtP2Ref.current], { opacity: 0, y: 20 });
        gsap.to([builtP1Ref.current, builtP2Ref.current], {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: builtP1Ref.current, start: 'top 88%', once: true },
        });

        // Key sentence: fade up then amber highlight pulse — draws eye to the core claim
        gsap.set(builtKeyRef.current, { opacity: 0, y: 16 });
        gsap.to(builtKeyRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: builtKeyRef.current, start: 'top 88%', once: true },
          onComplete() {
            gsap.to(builtKeyRef.current, {
              color: '#FBBF24', duration: 0.45, ease: 'power2.out', delay: 0.15,
            });
          },
        });

        // ── 4. FROM DEMO TO DEPLOYMENT ────────────────────────────────────
        gsap.set(deployH2Ref.current, { opacity: 0, y: 24 });
        gsap.to(deployH2Ref.current, {
          opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
          scrollTrigger: { trigger: deployH2Ref.current, start: 'top 85%', once: true },
        });

        // Tilt cards snap into place with a bounce — "production deployment" feel
        gsap.set('.interactive-demo-deployment-card', { opacity: 0, y: 36 });
        ScrollTrigger.batch('.interactive-demo-deployment-card', {
          start: 'top 88%',
          once: true,
          onEnter: batch => gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.15,
          }),
        });

        // ── 5. CTA — breathing orb + children stagger ─────────────────────
        // Orb breathes via CSS custom property (no layout/reflow cost)
        if (ctaOrbRef.current) {
          gsap.set(ctaOrbRef.current, { '--orb-x': '80%', '--orb-y': '40%' } as gsap.TweenVars);
          gsap.to(ctaOrbRef.current, {
            '--orb-x': '110%',
            '--orb-y': '55%',
            duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
          } as gsap.TweenVars);
        }

        const ctaChildren = ctaCardRef.current
          ? Array.from(ctaCardRef.current.children)
          : [];
        if (ctaChildren.length) {
          gsap.set(ctaChildren, { opacity: 0, y: 18 });
          gsap.to(ctaChildren, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: ctaCardRef.current, start: 'top 80%', once: true },
          });
        }

        // ── 6. GLOBAL INFRASTRUCTURE ──────────────────────────────────────
        gsap.set([infraH2Ref.current, infraP1Ref.current, infraP2Ref.current], { opacity: 0, y: 20 });
        gsap.to([infraH2Ref.current, infraP1Ref.current, infraP2Ref.current], {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: infraH2Ref.current, start: 'top 85%', once: true },
        });
      },
      mainRef
    );
  }, { scope: mainRef });

  return (
    <main
      ref={mainRef}
      className="interactive-demo-page relative overflow-x-hidden bg-bg-primary text-text-primary"
    >

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="interactive-demo-hero relative overflow-hidden border-b border-white/5 bg-bg-primary"
        aria-labelledby="interactive-demos-hero-heading"
      >
        {/* CSS scan-line sweep — syncs with the hero timeline delay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          <div
            style={{
              position: 'absolute',
              left: 0, right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)',
              animation: 'scan-line 1.2s ease-in-out 0.1s 1 forwards',
              animationFillMode: 'backwards',
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-70 max-[380px]:opacity-60"
          aria-hidden="true"
        >
          <div className="hero-grid-overlay" />
        </div>

        <div className="interactive-demo-hero-inner section-wrapper w-full min-h-0">
          <div className="interactive-demo-hero-content w-full min-w-0">
            <header className="interactive-demo-hero-head">
              <p ref={heroLabelRef} className="interactive-demo-hero-label">
                [ INTERACTIVE SYSTEMS ]
              </p>
              <h1
                ref={heroH1Ref}
                id="interactive-demos-hero-heading"
                className="interactive-demo-hero-title text-hero break-words font-serif font-semibold leading-[1.06] text-text-primary sm:leading-tight"
              >
                Real AI Systems. Not Demos.
              </h1>
            </header>
            <div className="interactive-demo-hero-copy">
              <p ref={heroDek1Ref} className="interactive-demo-hero-dek text-body text-pretty break-words font-serif leading-relaxed text-text-secondary">
                Explore how AI systems operate in real business environments.
              </p>
              <p ref={heroDek2Ref} className="interactive-demo-hero-dek text-body text-pretty break-words font-serif leading-relaxed text-text-secondary">
                These interactive demos represent production-grade systems designed for enterprise workflows,
                automation, and decision-making.
              </p>
            </div>
            <a
              ref={heroCtaRef}
              href="#interactive-tools-grid"
              className="btn-primary interactive-demo-hero-cta inline-flex min-h-11 min-w-[12rem] items-center justify-center px-6 sm:min-h-0 sm:min-w-0 sm:px-5"
              aria-label="Explore interactive AI systems"
            >
              Explore Systems ↓
            </a>
            <div
              ref={heroStatusRef}
              className="interactive-demo-hero-status flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
              aria-hidden="true"
            >
              <span className="status-dot shrink-0" />
              <span className="max-w-[min(100%,20rem)] font-mono text-[9px] tracking-[0.1em] text-text-tertiary min-[360px]:text-[10px] min-[360px]:tracking-[0.12em]">
                LIVE SYSTEM PREVIEWS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ───────────────────────────────────────────────────── */}
      <section
        id="interactive-tools-grid"
        className="interactive-demo-tools relative bg-bg-primary"
        aria-labelledby="tools-grid-heading"
      >
        <div className="section-wrapper">
          <div className="interactive-demo-tools-inner text-center">
            <h2
              ref={gridH2Ref}
              id="tools-grid-heading"
              className="text-section-h shrink-0 break-words font-serif font-semibold leading-[1.1]"
            >
              Interactive AI Tools Demo Systems
            </h2>
            <p
              ref={gridDescRef}
              className="text-body mt-5 shrink-0 break-words font-serif text-[clamp(1rem,1.1vw+0.6rem,1.2rem)] leading-relaxed text-text-secondary"
            >
              A premium showcase of enterprise AI systems, AI automation demos, and AI workflow systems
              designed to reflect real production environments.
            </p>

            <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />

            <div className="interactive-demo-tools-grid grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 xl:gap-9 2xl:grid-cols-4">
              {TOOLS.map((tool, index) => (
                <article
                  id={tool.id}
                  key={tool.id}
                  ref={tool.featured ? (featuredCardRef as React.RefObject<HTMLElement>) : undefined}
                  className={`${
                    tool.featured
                      ? 'interactive-demo-featured-card glass-card flex h-full w-full max-w-full flex-col gap-1.5 overflow-hidden break-words text-left sm:gap-2 lg:gap-3'
                      : `interactive-demo-tool-card glass-card min-h-0 h-full w-full overflow-hidden break-words text-left${
                          STANDARD_TOOL_IDS_WITHOUT_MOCK.has(tool.id)
                            ? ' interactive-demo-tool-card--no-mock'
                            : ''
                        }`
                  } ${
                    tool.featured
                      ? 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4'
                      : index === TOOLS.length - 1
                        ? lastStandardCardFullWidthXl
                          ? 'sm:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-1'
                          : 'sm:col-span-2 lg:col-span-2 xl:col-span-1'
                        : ''
                  }`}
                  aria-label={tool.name}
                >
                  {tool.featured ? (
                    <>
                      <span className="interactive-demo-featured-badge inline-flex w-fit items-center justify-center rounded-full border border-trust-amber/40 bg-trust-amber/10 font-mono text-[10px] tracking-[0.12em] text-trust-amber">
                        FEATURED SYSTEM
                      </span>
                      <h3 className="text-card-title break-words font-serif text-lg font-semibold leading-[1.15] text-text-primary sm:text-xl lg:text-2xl xl:text-3xl">
                        {tool.name}
                      </h3>
                      <p className="max-w-prose break-words font-serif text-[0.9375rem] leading-snug text-text-secondary sm:text-base sm:leading-[1.55]">
                        {tool.shortDescription}
                      </p>
                      <ul className="interactive-demo-capability-list space-y-1.5 text-[0.875rem] leading-[1.5] text-text-secondary sm:space-y-1.5 sm:text-[0.9375rem] sm:leading-[1.55]">
                        {tool.capabilities.map((capability) => (
                          <li key={capability} className="interactive-demo-capability-li">
                            <span className="interactive-demo-capability-dot" aria-hidden />
                            <span className="min-w-0 flex-1">{capability}</span>
                          </li>
                        ))}
                      </ul>
                      {getToolVisual(tool.id)}
                      {tool.ctaHref ? (
                        <Link
                          href={tool.ctaHref}
                          className="btn-primary interactive-demo-featured-cta mt-auto w-auto self-center px-6 py-2 text-[0.875rem] whitespace-nowrap"
                          aria-label={`${tool.cta} for ${tool.name}`}
                        >
                          {tool.cta}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary interactive-demo-featured-cta mt-auto w-auto self-center px-6 py-2 text-[0.875rem] whitespace-nowrap"
                          aria-label={`${tool.cta} for ${tool.name}`}
                        >
                          {tool.cta}
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="interactive-demo-tool-copy flex shrink-0 flex-col gap-3 sm:gap-4">
                        <h3 className="text-card-title break-words font-serif text-lg font-semibold leading-[1.15] text-text-primary sm:text-xl lg:text-2xl xl:text-3xl">
                          {tool.name}
                        </h3>
                        <p className="text-body max-w-prose break-words font-serif leading-[1.65] text-text-secondary sm:leading-[1.7]">
                          {tool.shortDescription}
                        </p>
                        <ul className="interactive-demo-capability-list space-y-3 text-base leading-[1.65] text-text-secondary sm:space-y-3.5 sm:text-[1.0625rem] sm:leading-[1.7]">
                          {tool.capabilities.map((capability) => (
                            <li key={capability} className="interactive-demo-capability-li">
                              <span className="interactive-demo-capability-dot" aria-hidden />
                              <span className="min-w-0 flex-1 text-left">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {!STANDARD_TOOL_IDS_WITHOUT_MOCK.has(tool.id) ? (
                        <div className="interactive-demo-tool-visual min-h-0 w-full">
                          {getToolVisual(tool.id)}
                        </div>
                      ) : null}
                      {tool.ctaHref ? (
                        <Link
                          href={tool.ctaHref}
                          className="btn-primary mt-0 w-auto shrink-0 justify-self-center whitespace-nowrap"
                          aria-label={`${tool.cta} for ${tool.name}`}
                        >
                          {tool.cta}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary mt-0 w-auto shrink-0 justify-self-center whitespace-nowrap"
                          aria-label={`${tool.cta} for ${tool.name}`}
                        >
                          {tool.cta}
                        </button>
                      )}
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BUILT FOR REAL BUSINESSES ─────────────────────────────────────── */}
      <section
        className="interactive-demo-built-for-business relative overflow-hidden bg-bg-primary"
        aria-labelledby="built-for-business-heading"
      >
        <div className="section-grid-overlay" aria-hidden="true" />
        <div className="section-wrapper interactive-demo-built-for-business-inner">
          <div className="built-for-business-text w-full text-center">
            <h2
              ref={builtH2Ref}
              id="built-for-business-heading"
              className="text-section-h text-center font-serif font-semibold leading-tight"
            >
              Built for Real Businesses
            </h2>
            <p ref={builtP1Ref} className="text-body mt-6 text-center font-serif leading-relaxed text-text-secondary">
              These are simplified versions of the systems Invisigent designs and deploys for organizations.
            </p>
            <p ref={builtP2Ref} className="text-body mt-4 text-center font-serif leading-relaxed text-text-secondary">
              Every implementation is customized — built around your workflows, data infrastructure, and operational scale.
            </p>
            {/* Amber pulse targets this paragraph on scroll entry */}
            <p ref={builtKeyRef} className="text-body mt-6 text-center font-serif leading-relaxed text-text-primary">
              We don&apos;t build demos. <br />
              We build systems that run inside real businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ── FROM DEMO TO DEPLOYMENT ───────────────────────────────────────── */}
      <section
        className="interactive-demo-deployment relative overflow-hidden bg-bg-primary"
        aria-labelledby="demo-to-deployment-heading"
      >
        <div className="section-wrapper">
          <div className="mx-auto w-full max-w-7xl 2xl:max-w-[min(100%,110rem)]">
            <h2
              ref={deployH2Ref}
              id="demo-to-deployment-heading"
              className="text-section-h font-serif font-semibold leading-tight text-center"
            >
              From Demo to Deployment
            </h2>
            <InteractiveDemoDeploymentCarousel>
              <InteractiveDemoDeploymentTiltCard>
                <h3 className="text-card-title font-serif font-semibold leading-tight break-words text-text-primary">
                  Demo → Prototype → Production
                </h3>
                <p className="text-body mt-5 leading-relaxed text-text-secondary sm:mt-6">
                  We validate core behavior fast, then harden the architecture for reliability, observability, and enterprise uptime.
                </p>
              </InteractiveDemoDeploymentTiltCard>
              <InteractiveDemoDeploymentTiltCard>
                <h3 className="text-card-title font-serif font-semibold leading-tight break-words text-text-primary">
                  AI Models → Integrated Systems
                </h3>
                <p className="text-body mt-5 leading-relaxed text-text-secondary sm:mt-6">
                  Models are only one layer. We integrate orchestration, retrieval, monitoring, and governance into one operational system.
                </p>
              </InteractiveDemoDeploymentTiltCard>
              <InteractiveDemoDeploymentTiltCard>
                <h3 className="text-card-title font-serif font-semibold leading-tight break-words text-text-primary">
                  Tools → Infrastructure
                </h3>
                <p className="text-body mt-5 leading-relaxed text-text-secondary sm:mt-6">
                  We turn disconnected AI tools into production-grade AI infrastructure aligned with your teams, workflows, and scale.
                </p>
              </InteractiveDemoDeploymentTiltCard>
            </InteractiveDemoDeploymentCarousel>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="interactive-demo-conversion relative overflow-hidden bg-bg-primary"
        aria-labelledby="conversion-heading"
      >
        <div className="section-wrapper">
          <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
            <div className="interactive-demo-conversion-card glass-card relative flex flex-col items-center gap-5 text-center sm:gap-8 md:gap-9 overflow-hidden">
              {/* Breathing orb — radial gradient animated via CSS custom properties */}
              <div
                ref={ctaOrbRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  ['--orb-x' as string]: '80%',
                  ['--orb-y' as string]: '40%',
                  backgroundImage:
                    'radial-gradient(ellipse var(--orb-x) var(--orb-y) at 50% 0%, rgba(45,91,255,0.07) 0%, transparent 65%)',
                }}
              />

              {/* Card content — children stagger in on scroll */}
              <div
                ref={ctaCardRef}
                className="relative z-10 flex flex-col items-center gap-5 sm:gap-8 md:gap-9 w-full"
              >
                <h2
                  id="conversion-heading"
                  className="text-section-h font-serif font-semibold leading-snug text-text-primary"
                >
                  Want This for Your Business?
                </h2>
                <p className="text-body max-w-3xl font-serif leading-[1.7] text-text-secondary">
                  We design and build custom AI systems tailored to your workflows, infrastructure, and scale.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                  <a
                    href="/contact"
                    className="btn-accent w-auto whitespace-nowrap"
                    aria-label="Request a custom AI solution"
                  >
                    Request Custom Solution
                  </a>
                </div>
                <ul className="flex list-none flex-col gap-3.5 text-xs leading-relaxed text-text-tertiary sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:text-sm">
                  <li className="font-mono pl-0 sm:whitespace-nowrap">• Limited engagements per quarter</li>
                  <li className="font-mono pl-0 sm:whitespace-nowrap">• Built for enterprise environments</li>
                  <li className="font-mono pl-0 sm:whitespace-nowrap">• Compliance-ready systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL INFRASTRUCTURE ─────────────────────────────────────────── */}
      <section
        className="interactive-demo-global-infra relative overflow-hidden border-t border-white/5 bg-bg-primary"
        aria-labelledby="global-ai-infrastructure-heading"
      >
        <div className="section-wrapper interactive-demo-global-infra-inner">
          <div className="mx-auto flex w-full max-w-6xl 2xl:max-w-7xl flex-col items-center text-center">
            <h2
              ref={infraH2Ref}
              id="global-ai-infrastructure-heading"
              className="text-section-h font-serif font-semibold leading-tight text-text-primary"
            >
              AI Infrastructure for Global Organizations
            </h2>
            <div className="mt-10 flex w-full max-w-3xl flex-col gap-5 sm:mt-12 sm:gap-6 md:mt-14">
              <p ref={infraP1Ref} className="text-body font-serif leading-relaxed text-text-secondary">
                Invisigent designs enterprise AI systems, automation workflows, and scalable infrastructure
                for organizations operating across regions, teams, and complex environments.
              </p>
              <p ref={infraP2Ref} className="text-body font-serif leading-relaxed text-text-secondary">
                From search intelligence to automation systems, we build AI that runs in production — not just in demos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InvisigentLogoSection />
      <FooterSection />

      {/* GEO — semantic keyword signals for AI search engines */}
      <div className="sr-only">
        Enterprise AI systems demo. LangGraph agent orchestration. Pinecone RAG knowledge retrieval.
        AI automation workflows. n8n FastAPI AI pipelines. AI infrastructure India United States Europe.
        Production AI deployment. Multi-agent AI systems. Compliance-ready AI infrastructure.
      </div>
    </main>
  );
}
