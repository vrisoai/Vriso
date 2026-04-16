import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import { LetsTalkForm } from './LetsTalkForm';

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    'Start a conversation with Invisigent about enterprise AI systems, automation workflows, and intelligent infrastructure for your business.',
  alternates: {
    canonical: 'https://vriso.ai/contact',
  },
  openGraph: {
    title: "Let's Talk | Invisigent",
    description:
      'Start a conversation with Invisigent about enterprise AI systems, automation workflows, and intelligent infrastructure.',
    url: 'https://vriso.ai/contact',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Let's Talk — Invisigent",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Let's Talk | Invisigent",
    description:
      'Start a conversation with Invisigent about enterprise AI systems and intelligent infrastructure.',
    images: ['/og-image.png'],
  },
};

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

export default function ContactPage() {
  return (
    <>
      <main className="contact-page">
        {/* Background layers */}
        <div className="contact-ambient-orb" aria-hidden="true" />
        <div className="contact-dot-grid" aria-hidden="true" />
        <div className="contact-scan-line" aria-hidden="true" />

        <div className="contact-shell">

          {/* ── Left column ────────────────────────────────────────── */}
          <aside className="contact-left">

            {/* Eyebrow */}
            <p className="contact-eyebrow">
              <span className="contact-status-dot" aria-hidden="true" />
              Invisigent · Engagement Intake
            </p>

            {/* Giant heading */}
            <h1 className="contact-heading font-serif">
              Let&apos;s Build<br />
              Something<br />
              <span className="gradient-text">Real.</span>
            </h1>

            {/* Subtext */}
            <p className="contact-subtext font-serif">
              Tell us what you&apos;re building. We&apos;ll tell you if we can help — and exactly what it would look like if we did.
            </p>

            {/* Stats bento 2×2 */}
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

            {/* Process timeline */}
            <div className="contact-process">
              <p className="contact-process-label">[ WHAT HAPPENS NEXT ]</p>
              <ol className="contact-process-list">
                {WHAT_HAPPENS.map(item => (
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

            {/* Direct line */}
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

          {/* ── Right column: form ───────────────────────────────── */}
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
