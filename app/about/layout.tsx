import type { Metadata } from 'next';

const CANONICAL = 'https://invisigent.ai/about';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';
const TITLE = 'About Invisigent — Who We Are & How We Build';
const DESCRIPTION =
  'Invisigent is an enterprise AI systems firm building sovereign, multi-agent infrastructure for organizations in India, the US, and Europe. We architect AI that is governed, observable, and production-ready.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'about Invisigent',
    'enterprise AI firm India',
    'AI systems architecture team',
    'multi-agent AI company',
    'sovereign AI infrastructure',
    'AI consulting firm Jaipur',
    'GDPR compliant AI company',
    'EU AI Act consulting',
    'DPDP AI compliance India',
    'AI governance experts',
    'production AI systems',
    'Invisigent team',
  ],
  authors: [{ name: 'Invisigent', url: 'https://invisigent.ai' }],
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
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': 'https://invisigent.ai/#website' },
      breadcrumb: { '@id': `${CANONICAL}#breadcrumb` },
      dateModified: '2026-04-23',
      about: { '@id': 'https://invisigent.ai/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'About', item: CANONICAL },
      ],
    },
  ],
};

import Breadcrumb from '@/app/components/Breadcrumb';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Breadcrumb items={[{ label: 'About' }]} />
      {children}
    </>
  );
}
