import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';

export const metadata: Metadata = {
  title: 'AI Infrastructure Insights',
  description:
    'Thinking, patterns, and field notes from Invisigent on enterprise AI infrastructure, agent systems, and automation architecture.',
  alternates: {
    canonical: 'https://vriso.ai/insights',
  },
  openGraph: {
    title: 'AI Infrastructure Insights | Invisigent',
    description:
      'Thinking, patterns, and field notes on enterprise AI infrastructure, agent systems, and automation architecture.',
    url: 'https://vriso.ai/insights',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Infrastructure Insights — Invisigent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Infrastructure Insights | Invisigent',
    description:
      'Thinking, patterns, and field notes on enterprise AI infrastructure, agent systems, and automation architecture.',
    images: ['/og-image.png'],
  },
};

export default function InsightsPage() {
  return (
    <>
      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
        }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '1.5rem',
          }}
        >
          [ SYSTEM LOGS ]
        </p>

        <h1
          className="font-serif gradient-text"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          AI Infrastructure Insights
        </h1>

        <p
          className="font-serif"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: '36rem',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          Field notes, patterns, and thinking from the teams building real AI infrastructure.
          Coming soon.
        </p>

        <a
          href="/contact"
          className="btn-accent"
          style={{ textDecoration: 'none' }}
        >
          Get notified →
        </a>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
