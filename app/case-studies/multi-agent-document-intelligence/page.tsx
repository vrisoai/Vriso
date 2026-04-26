import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';
import CaseStudyDocIntelClient from './CaseStudyDocIntelClient';

const CANONICAL = 'https://www.invisigent.ai/case-studies/multi-agent-document-intelligence';
const OG_IMAGE = 'https://www.invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'AI Contract Review Case Study: 73-Second Risk Assessment on $180K SaaS Agreement | Invisigent',
  description:
    'See how a multi-agent AI document intelligence system identified 5 contract risks including 2 GDPR violations in 73 seconds — before a $180,000 SaaS vendor agreement was signed.',
  keywords: [
    'AI contract review',
    'multi-agent document intelligence',
    'GDPR compliance AI',
    'legal AI tools',
    'PDF contract analysis',
    'LangGraph contract review',
    'automated legal review',
    'SaaS vendor agreement AI',
    'contract risk assessment',
    'Invisigent',
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
    type: 'article',
    locale: 'en_US',
    siteName: 'Invisigent',
    title: 'AI Contract Review Case Study: 73-Second Risk Assessment on $180K SaaS Agreement | Invisigent',
    description:
      'See how a multi-agent AI document intelligence system identified 5 contract risks including 2 GDPR violations in 73 seconds — before a $180,000 SaaS vendor agreement was signed.',
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Invisigent Case Study', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'AI Contract Review Case Study: 73-Second Risk Assessment | Invisigent',
    description:
      'Multi-agent AI flagged 5 contract risks including 2 GDPR violations in 73 seconds — before a $180K SaaS deal was signed.',
    images: [{ url: OG_IMAGE, alt: 'Invisigent Case Study' }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${CANONICAL}#article`,
      url: CANONICAL,
      headline:
        'How an AI document intelligence system flagged GDPR violations and uncapped liability in 73 seconds — before a $180K vendor contract was signed',
      description:
        'A multi-agent AI contract review system analyzed a 12-page SaaS vendor agreement in 73 seconds, identified 5 risk flags including 2 GDPR violations, and prevented a potentially career-ending signature on a $180,000 annual contract.',
      inLanguage: 'en-US',
      author: { '@id': 'https://www.invisigent.ai/#organization' },
      publisher: { '@id': 'https://www.invisigent.ai/#organization' },
      isPartOf: { '@id': 'https://www.invisigent.ai/case-studies#collection' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.invisigent.ai/case-studies' },
        { '@type': 'ListItem', position: 3, name: 'Multi-Agent Document Intelligence', item: CANONICAL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does AI contract review take compared to manual legal review?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The multi-agent system analyzed a 12-page SaaS vendor agreement in 73 seconds. Manual legal review of the same document typically takes 2–3 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'What compliance issues can an AI contract review system detect?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The system flagged: a missing GDPR Article 28 Data Processing Agreement, uncapped indemnification clauses, unilateral pricing escalation with no cap, IP ownership ambiguity, and a non-standard 90-day auto-renewal window.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is AI-powered contract analysis suitable for enterprise procurement and legal teams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The system produces a structured risk score with clause-level references, a severity-ranked finding list, a structured executive recommendation, and a full LangSmith audit trail covering every agent decision.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is this different from using a generic AI chatbot to review contracts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A generic AI chatbot processes the entire document in a single prompt with no specialization, no structured output, and no audit trail. This system uses three independent specialized agents running sequentially with every decision logged and replayable.',
          },
        },
      ],
    },
  ],
};

export default function CaseStudyDocumentIntelligencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumb
        items={[
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Multi-Agent Document Intelligence' },
        ]}
      />
      <CaseStudyDocIntelClient />
      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
