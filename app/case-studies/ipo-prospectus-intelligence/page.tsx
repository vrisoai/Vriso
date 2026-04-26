import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';
import CaseStudyIpoClient from './CaseStudyIpoClient';

const CANONICAL = 'https://www.invisigent.ai/case-studies/ipo-prospectus-intelligence';
const OG_IMAGE = 'https://www.invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'IPO Prospectus Intelligence: DRHP/RHP Review in Minutes, Not Days | Invisigent',
  description:
    'How an AI-powered platform cut DRHP and RHP review from days to under 10 minutes — with 90% accurate change detection across 300-page filings and plain-language Q&A for investment teams.',
  keywords: [
    'IPO prospectus AI',
    'DRHP review automation',
    'RHP analysis AI',
    'IPO document intelligence',
    'change detection DRHP RHP',
    'finance AI tools',
    'RAG document Q&A',
    'investment research AI',
    'IPO filing analysis',
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
    title: 'IPO Prospectus Intelligence: DRHP/RHP Review in Minutes, Not Days | Invisigent',
    description:
      'AI-powered platform cuts DRHP/RHP review from days to under 10 minutes — 90% change detection accuracy across 300-page filings, with plain-language Q&A for investment teams.',
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Invisigent IPO Case Study', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'IPO Prospectus Intelligence: DRHP/RHP Review in Minutes | Invisigent',
    description:
      'AI cut DRHP/RHP review from days to under 10 minutes — 90% change detection accuracy across 300-page filings.',
    images: [{ url: OG_IMAGE, alt: 'Invisigent IPO Case Study' }],
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
        'How an AI document intelligence platform cut IPO prospectus (DRHP/RHP) review from days to under 10 minutes',
      description:
        'An AI-powered IPO prospectus intelligence platform reduced DRHP and RHP review time by 70%, achieved 90% change-detection accuracy across 300-page filings, and gave investment teams plain-language Q&A on any section in under 10 minutes.',
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
        { '@type': 'ListItem', position: 3, name: 'IPO Prospectus Intelligence Platform', item: CANONICAL },
      ],
    },
  ],
};

export default function CaseStudyIpoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumb
        items={[
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'IPO Prospectus Intelligence Platform' },
        ]}
      />
      <CaseStudyIpoClient />
      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
