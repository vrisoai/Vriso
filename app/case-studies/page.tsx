import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import CaseStudyCard from '@/app/components/CaseStudyCard';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://www.invisigent.ai/case-studies';
const OG_IMAGE = 'https://www.invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'Case Studies — AI Builds & Solutions | Invisigent',
  description:
    'Real-world AI applications built by Invisigent — multi-agent systems, document intelligence pipelines, and enterprise automation in production.',
  keywords: [
    'AI case studies',
    'multi-agent AI applications',
    'document intelligence',
    'enterprise AI builds',
    'AI automation examples',
    'Invisigent projects',
    'AI pipeline examples',
    'legal AI tools',
    'PDF contract analysis AI',
  ],
  authors: [{ name: 'Invisigent', url: 'https://www.invisigent.ai' }],
  creator: 'Invisigent',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Invisigent',
    title: 'Case Studies | Invisigent',
    description:
      'Real-world AI applications built by Invisigent — multi-agent pipelines, document intelligence, and enterprise automation.',
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Invisigent Case Studies', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'Case Studies | Invisigent',
    description:
      'Real-world AI applications built by Invisigent — multi-agent pipelines, document intelligence, and enterprise automation.',
    images: [{ url: OG_IMAGE, alt: 'Invisigent Case Studies' }],
  },
};

const caseStudiesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL}#collection`,
      url: CANONICAL,
      name: 'Case Studies — Invisigent',
      description: 'Real-world AI applications and builds by Invisigent.',
      inLanguage: 'en-US',
      publisher: { '@id': 'https://www.invisigent.ai/#organization' },
      isPartOf: { '@id': 'https://www.invisigent.ai/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: CANONICAL },
      ],
    },
  ],
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      <Breadcrumb items={[{ label: 'Case Studies' }]} />

      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
        }}
      >
        {/* Page header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '52rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
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
            [ PRODUCTION BUILDS ]
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
            Case Studies
          </h1>

          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
            }}
          >
            Real AI applications shipped to production — architectures, pipelines, and
            outcomes from the systems we build.
          </p>
        </div>

        {/* Case study card grid */}
        <div
          style={{
            width: '100%',
            maxWidth: '72rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          <CaseStudyCard
            category="Multi-Agent System"
            title="Multi-Agent Document Intelligence Platform"
            description="Multi-Agent Document Intelligence is a full-stack AI application that analyzes PDF contracts in real time using a sequential three-agent pipeline. It is designed to assist legal teams, business analysts, and C-suite executives by automatically extracting contract entities, flagging compliance risks, and generating an executive briefing — all with live token-by-token streaming visible in the browser."
            tags={[
              { label: 'Legal AI' },
              { label: 'PDF Analysis' },
              { label: 'Real-time Streaming' },
              { label: 'Multi-Agent' },
              { label: 'Compliance' },
              { label: 'Full-Stack' },
            ]}
            accentColor="#3B82F6"
            href="/case-studies/multi-agent-document-intelligence"
          />
          <CaseStudyCard
            category="Document Intelligence"
            title="IPO Prospectus Intelligence Platform"
            description="Cut DRHP/RHP review from days to minutes — AI-powered summarization, plain-language Q&A, and 90% accurate change detection across 300-page filings."
            tags={[
              { label: 'IPO Analysis' },
              { label: 'DRHP / RHP' },
              { label: 'Change Detection' },
              { label: 'Document Q&A' },
              { label: 'Finance AI' },
              { label: 'RAG' },
            ]}
            accentColor="#3B82F6"
            href="/case-studies/ipo-prospectus-intelligence"
          />
        </div>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
