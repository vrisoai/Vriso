// FooterSection.tsx
'use client';

import Script from 'next/script';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/app/lib/animations';

import vrisoLogo from '@/app/assets/Invisigent.png';

const JSON_LD_PROFESSIONAL_SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Invisigent',
  serviceType: 'Enterprise AI Infrastructure Consulting',
  description:
    'Enterprise AI infrastructure and automation architecture consulting specializing in scalable AI systems and agent orchestration.',
  areaServed: 'Global',
  url: 'https://vriso.ai',
};

const footerColumns = {
  company: ['Home', 'Services', 'About', 'Contact'],
} as const;

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-40px' });

  return (
    <footer
      ref={sectionRef}
      className="vriso-footer-section relative w-full border-t border-white/5"
      aria-labelledby="vriso-footer-heading"
    >
      <Script id="vriso-footer-jsonld" type="application/ld+json" strategy="afterInteractive">
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

      <div className="section-container section-inner relative vriso-footer-inner">
        {/* Top grid */}
        <motion.div
          className="vriso-footer-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Brand column */}
          <div className="vriso-footer-brand">
            <div className="vriso-footer-brand-top flex flex-col gap-2 items-start">
              <Image
                src={vrisoLogo}
                alt="Invisigent"
                id="vriso-footer-heading"
                className="vriso-footer-logo-img"
                height={100}
                width={360}
                sizes="(max-width: 480px) 58vw, (max-width: 1024px) 42vw, 280px"
              />
              <p className="font-serif text-xs text-footer-muted">
                Enterprise AI Infrastructure
              </p>
            </div>

            <p className="vriso-footer-brand-desc font-serif">
              Invisigent designs enterprise AI infrastructure and automation architecture for modern organizations.
            </p>
          </div>

          {/* Quick Links column */}
          <nav aria-label="Invisigent quick links" className="vriso-footer-column vriso-footer-quicklinks">
            <h3 className="vriso-footer-heading">Quick Links</h3>
            <ul className="vriso-footer-list">
              {footerColumns.company.map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Services' ? '/services' : '#'}
                    className="vriso-footer-link vriso-footer-link--company"
                    aria-label={item}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact section */}
          <div className="vriso-footer-column vriso-footer-contact-column">
            <h3 className="vriso-footer-heading">Contact</h3>
            <div className="vriso-footer-contact-items">
              <a
                href="mailto:hello@vriso.ai"
                className="vriso-footer-email vriso-footer-contact-item"
                aria-label="Email Invisigent at hello@vriso.ai"
              >
                hello@vriso.ai
              </a>
              <div className="vriso-footer-contact-actions">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Invisigent on LinkedIn"
                  className="vriso-footer-linkedin vriso-footer-contact-item"
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
                  href="#"
                  className="vriso-footer-cta-btn vriso-footer-contact-item"
                  aria-label="Book a call with Invisigent"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System status row */}
        <div className="vriso-footer-status-row" aria-label="Invisigent system status">
          <span className="font-mono text-[11px] tracking-[0.16em] text-footer-muted">
            SYSTEM STATUS
          </span>
          <div className="flex items-center gap-2">
            <span className="vriso-footer-status-dot" aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.12em] text-footer-subtle">
              INVISIGENT NETWORK — ACTIVE
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="vriso-footer-bottom">
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

