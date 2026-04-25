// FooterSection.tsx
'use client';

import Script from 'next/script';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/app/lib/animations';

import invisigentLogo from '@/app/assets/Invisigent.png';

const JSON_LD_PROFESSIONAL_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Invisigent',
  serviceType: 'Enterprise AI Infrastructure Consulting',
  description:
    'Enterprise AI infrastructure and automation architecture consulting specializing in scalable AI systems and agent orchestration.',
  areaServed: 'Global',
  url: 'https://invisigent.ai',
};

const footerColumns = {
  company: [
    { label: 'Home',             href: '/'                 },
    { label: 'About',            href: '/about'            },
    { label: 'Services',         href: '/services'         },
    { label: 'Insights',         href: '/insights'         },
    { label: 'Case Studies',     href: '/case-studies'     },
    { label: 'Interactive Demo', href: '/interactive-demo' },
    { label: 'Contact',          href: '/contact'          },
  ],
} as const;

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-40px' });

  return (
    <footer
      ref={sectionRef}
      className="invisigent-footer-section relative w-full border-t border-white/5"
      aria-labelledby="invisigent-footer-heading"
    >
      <Script id="invisigent-footer-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(JSON_LD_PROFESSIONAL_SERVICE)}
      </Script>

      {/* Radial glow + subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(59,91,219,0.12) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="section-grid-overlay" aria-hidden="true" />

      <div className="section-container section-inner relative invisigent-footer-inner">
        {/* Top grid */}
        <motion.div
          className="invisigent-footer-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Brand column */}
          <div className="invisigent-footer-brand">
            <div className="invisigent-footer-brand-top flex flex-col gap-2 items-start">
              <Image
                src={invisigentLogo}
                alt="Invisigent"
                id="invisigent-footer-heading"
                className="invisigent-footer-logo-img"
                height={100}
                width={360}
                sizes="(max-width: 480px) 58vw, (max-width: 1024px) 42vw, 280px"
              />
              <p className="font-serif text-xs text-footer-muted">
                Enterprise AI Infrastructure
              </p>
            </div>

            <p className="invisigent-footer-brand-desc font-serif">
              Invisigent designs enterprise AI infrastructure and automation architecture for modern organizations.
            </p>
          </div>

          {/* Quick Links column */}
          <nav aria-label="Invisigent quick links" className="invisigent-footer-column invisigent-footer-quicklinks">
            <h3 className="invisigent-footer-heading">Quick Links</h3>
            <ul className="invisigent-footer-list">
              {footerColumns.company.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="invisigent-footer-link invisigent-footer-link--company"
                    aria-label={item.label}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact section */}
          <div className="invisigent-footer-column invisigent-footer-contact-column">
            <h3 className="invisigent-footer-heading">Contact</h3>
            <div className="invisigent-footer-contact-items">
              <a
                href="mailto:hello@invisigent.com"
                className="invisigent-footer-email invisigent-footer-contact-item"
                aria-label="Email Invisigent at hello@invisigent.com"
              >
                hello@invisigent.com
              </a>
              <div className="invisigent-footer-contact-actions">
                <a
                  href="https://www.linkedin.com/company/invisigent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Invisigent on LinkedIn"
                  className="invisigent-footer-linkedin invisigent-footer-contact-item"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 17V10" />
                    <circle cx="8" cy="8" r="1" />
                    <path d="M12 17V10M12 12.5c0-1.38 1.12-2.5 2.5-2.5S17 11.12 17 12.5V17" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/invisigent?igsh=MTdkYXoycHpjZWY1Mw=="
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Invisigent on Instagram"
                  className="invisigent-footer-instagram invisigent-footer-contact-item"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="6" />
                    <circle cx="12" cy="12" r="4.5" />
                    <path d="M17.5 6.5 h.01" strokeLinecap="round" strokeWidth="2.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://x.com/InvisigentAI"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Invisigent on X (Twitter)"
                  className="invisigent-footer-twitter invisigent-footer-contact-item"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4.5h4.5L12 9l3.5-4.5H20L14.5 12 20.5 19.5H16L12 15l-4 4.5H3.5L9.5 12 4 4.5z" />
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href="/contact"
                  className="invisigent-footer-cta-btn invisigent-footer-contact-item"
                  aria-label="Start an engagement with Invisigent"
                >
                  Start an Engagement
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System status row */}
        <div className="invisigent-footer-status-row" aria-label="Invisigent system status">
          <span className="font-mono text-[11px] tracking-[0.16em] text-footer-muted">
            SYSTEM STATUS
          </span>
          <div className="flex items-center gap-2">
            <span className="invisigent-footer-status-dot" aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.12em] text-footer-subtle">
              INVISIGENT NETWORK — ACTIVE
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="invisigent-footer-bottom">
          <p className="font-mono text-[11px] tracking-[0.16em] text-footer-muted">
            © 2026 Invisigent. All rights reserved.
          </p>
          <p className="font-serif text-xs text-footer-subtle">
            Enterprise AI Infrastructure &amp; Automation Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}

