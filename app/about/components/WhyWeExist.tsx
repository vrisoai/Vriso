'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';
import { GradientDivider } from './shared/GradientDivider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PARAGRAPHS = [
  {
    editorial: true,
    text: 'We spent years building agentic AI systems in production and kept seeing the same failure organizations investing in AI models while skipping the infrastructure to run them. Pilots that looked impressive in demos and collapsed quietly on a Tuesday.',
  },
  {
    editorial: false,
    text: 'The problem was never the model. It was always the infrastructure underneath it.',
  },
  {
    editorial: false,
    text: 'Most organizations are running AI experiments, not AI systems. That gap between experimenting with AI and operating it reliably is where competitive advantage is being won and lost right now.',
  },
  {
    editorial: false,
    text: 'Invisigent exists to close that gap. We give mid-market organizations a faster, more reliable path to AI systems that run in production, survive compliance review, and are owned by your team not held together by the agency that built them.',
  },
];

interface WhyWeExistProps {
  reducedMotion?: boolean;
}

export function WhyWeExist({ reducedMotion = false }: WhyWeExistProps) {
  const sectionRef    = useRef<HTMLElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dashRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef        = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = headingRef.current;
    const paras   = paragraphRefs.current.filter(Boolean) as HTMLDivElement[];
    const dashes  = dashRefs.current.filter(Boolean) as HTMLSpanElement[];
    const cta     = ctaRef.current;

    if (reducedMotion) {
      if (heading) gsap.set(heading, { opacity: 1, y: 0 });
      gsap.set(paras,  { opacity: 1, y: 0 });
      gsap.set(dashes, { scaleX: 1 });
      if (cta) gsap.set(cta, { opacity: 1, y: 0 });
      return;
    }

    // heading
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 24 });
      gsap.to(heading, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
      });
    }

    // paragraphs — scroll-scrubbed
    paras.forEach((para, i) => {
      const dash        = dashes[i];
      const isEditorial = PARAGRAPHS[i]?.editorial ?? false;

      gsap.set(para, { opacity: 0, y: isEditorial ? 32 : 22 });

      // amber dash draws itself with scroll
      if (dash) {
        gsap.set(dash, { scaleX: 0 });
        gsap.to(dash, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: para, start: 'top 88%', end: 'top 62%', scrub: 0.6 },
        });
      }

      // text fades with scroll (editorial = wider scrub window)
      gsap.to(para, {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: para,
          start: 'top 92%',
          end: isEditorial ? 'top 55%' : 'top 65%',
          scrub: isEditorial ? 1.2 : 0.8,
        },
      });
    });

    // CTA
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.to(cta, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: cta, start: 'top 88%', once: true },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-why overflow-x-hidden"
      style={{ background: '#121212' }}
      aria-labelledby="about-why-heading"
    >
      <div className="section-wrapper" style={{ paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <div className="section-inner-max section-inner">
          <div className="mx-auto w-full max-w-[720px] 2xl:max-w-[960px] min-[2800px]:max-w-[1400px] text-left">

            <SectionLabel text="[ OUR POSITION ]" reducedMotion={reducedMotion} />

            <h2
              ref={headingRef}
              id="about-why-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
            >
             Why Invisigent Exists And What We Kept Seeing Break
            </h2>

            <GradientDivider reducedMotion={reducedMotion} className="mt-6 mb-8 sm:mt-8 sm:mb-10" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {PARAGRAPHS.map((p, i) => (
                <div
                  key={i}
                  ref={el => { paragraphRefs.current[i] = el; }}
                  className={p.editorial ? 'text-pullquote' : 'text-body'}
                  style={{ position: 'relative', paddingLeft: '3rem' }}
                >
                  <span
                    ref={el => { dashRefs.current[i] = el; }}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: `calc(${p.editorial ? '1.75' : '1.8'}em / 2 - 1px)`,
                      width: '2rem',
                      height: '2px',
                      display: 'block',
                      background: 'var(--color-trust-amber)',
                      transformOrigin: 'left',
                    }}
                  />
                  <p
                    className={
                      p.editorial
                        ? 'font-serif font-medium leading-[1.75] text-[var(--color-text-primary)]'
                        : 'font-display leading-[1.8] text-[var(--color-text-secondary)]'
                    }
                  >
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              ref={ctaRef}
              style={{ marginTop: '2.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <a
                href="/interactive-demo"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 9999, fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(0.875rem, 0.8vw, 1rem)', padding: '0.875rem 2rem',
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  background: 'var(--color-btn-bg)',
                  border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D5BFF'; e.currentTarget.style.boxShadow = '0 0 20px rgba(45,91,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                See What We Build
              </a>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 9999, fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(0.875rem, 0.8vw, 1rem)', padding: '0.875rem 2rem',
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-secondary)',
                  transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FBBF24'; e.currentTarget.style.color = '#FBBF24'; e.currentTarget.style.boxShadow = '0 0 16px rgba(251,191,36,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start a Conversation
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
