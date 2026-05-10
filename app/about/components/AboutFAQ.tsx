'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared/SectionLabel';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQ_ITEMS = [
  {
    q: 'What makes Invisigent different from other AI consulting firms?',
    a: 'Most AI consultancies advise on what to build and hand the work back to your team. We design, build, and deploy production AI systems with monitoring, documentation, compliance controls, and operational runbooks included as standard. Everything we build, you own. No platform lock-in. No ongoing dependency on us to keep it running.',
  },
  {
    q: 'How much does an engagement cost?',
    a: "Every engagement is scoped to the system being built not priced from a standard rate card. A focused architecture and strategy engagement looks very different from a full multi-agent system build with compliance requirements and third-party integrations. We scope every project during discovery and price it based on complexity, timeline, and what your team needs to own and operate at the end. If budget is a consideration, the discovery call is the right place to start we can tell you quickly whether the scope matches what you are working with.",
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'Strategy engagements run 2–4 weeks and end with a documented architecture plan. Full system builds range from 6–16 weeks depending on complexity and integration requirements. Every engagement has defined milestones so you always know what is being delivered and when.',
  },
  {
    q: 'Do we need an existing technical team to work with you?',
    a: 'No but you do need someone who can own what we build after delivery. We design every system with operational handoff in mind and include full documentation, monitoring access, and runbooks. If your team can manage a SaaS platform, they can run what we build. We scope the handoff during discovery so there are no surprises at deployment.',
  },
  {
    q: 'What if we have no existing AI infrastructure?',
    a: 'These are often our strongest engagements. Starting without legacy AI infrastructure means we design the right architecture from the beginning — rather than working around decisions made during a prototype phase. Our discovery process is specifically built for organizations at this stage.',
  },
  {
    q: 'What happens after the system is deployed?',
    a: 'You own it. We hand over full documentation, monitoring pipelines, and operational runbooks everything your team needs to run the system without us. For organizations that want ongoing optimization and scaling support, we offer quarterly partnerships with defined deliverables. But ongoing dependency on Invisigent is never a requirement.',
  },
  {
    q: 'How do you handle compliance requirements like GDPR or DPDP?',
    a: 'Compliance architecture is designed in from sprint one not reviewed at deployment. Every system includes audit trails, RBAC access controls, and data residency configurations appropriate for the jurisdictions it operates in. If your compliance team has specific requirements, we collect them during discovery and design to meet them before a single line of code is written.',
  },
  {
    q: 'How do we know if we are ready to work with Invisigent?',
    a: 'You are likely ready if you have a defined operational problem AI should be solving, a budget committed to infrastructure rather than experimentation, and a team that will own the system after delivery. If you are still exploring whether AI is the right solution, we are not the right partner yet and we will tell you that on the first call.',
  },
];

interface AboutFAQProps {
  reducedMotion?: boolean;
}

export function AboutFAQ({ reducedMotion = false }: AboutFAQProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    if (reducedMotion) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
      gsap.set(itemRefs.current.filter(Boolean), { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headingRef.current, { opacity: 0, y: 24 });
    gsap.to(headingRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
    });

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.set(item, { opacity: 0, y: 18 });
      gsap.to(item, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
        delay: i * 0.07,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-faq overflow-x-hidden"
      style={{ background: '#121212' }}
      aria-labelledby="about-faq-heading"
    >
      <div className="section-wrapper">
        <div className="section-inner-max section-inner">
          <div className="mx-auto w-full max-w-[720px] 2xl:max-w-[960px] min-[2800px]:max-w-[1400px]">

            <SectionLabel text="[ COMMON QUESTIONS ]" reducedMotion={reducedMotion} />
            <h2
              ref={headingRef}
              id="about-faq-heading"
              className="about-heading text-section-h font-serif font-medium text-[var(--color-text-primary)]"
            >
              Questions We Hear Before Every Engagement
            </h2>
            <p
              className="text-body font-display leading-[1.75] text-[var(--color-text-secondary)]"
              style={{ marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
            >
              Honest answers because the right fit matters more than the next booking.
            </p>

            <div style={{ marginTop: 'clamp(2rem, 3vw, 4rem)', display: 'flex', flexDirection: 'column' }}>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    ref={el => { itemRefs.current[i] = el; }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        width: '100%',
                        textAlign: 'left',
                        padding: 'clamp(1rem, 1.5vw, 2rem) 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <span
                        className="font-display font-semibold leading-[1.4] text-[var(--color-text-primary)]"
                        style={{ fontSize: 'clamp(0.9375rem, 1vw, 1.25rem)' }}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-trust-amber)',
                          fontSize: 18,
                          lineHeight: 1,
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          marginTop: 3,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {/*
                      Answer is ALWAYS in the DOM (SSR-visible for crawlers).
                      CSS grid-template-rows collapses it visually when closed.
                      The inner wrapper with overflow:hidden prevents content bleed.
                    */}
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      style={{
                        display: 'grid',
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.28s ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <p
                          className="font-display leading-[1.75] text-[var(--color-text-secondary)]"
                          style={{
                            fontSize: 'clamp(0.875rem, 0.95vw, 1.0625rem)',
                            paddingBottom: 'clamp(1rem, 1.5vw, 2rem)',
                            margin: 0,
                          }}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
