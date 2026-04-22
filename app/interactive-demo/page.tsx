// app/interactive-demo/page.tsx  — server component: metadata + JSON-LD only
import type { Metadata } from 'next';
import { TOOLS } from './tools-data';
import { InteractiveDemoClient } from './InteractiveDemoClient';
import Breadcrumb from '@/app/components/Breadcrumb';

const DEMO_CANONICAL = 'https://invisigent.ai/interactive-demo';
const DEMO_OG_IMAGE = 'https://invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'Interactive AI Demos — Live Enterprise AI Tools',
  description:
    'Live AI tool demos by Invisigent — enterprise AI systems, automation workflows, and intelligent infrastructure for businesses across India, US, and Europe. Try them now.',
  keywords: [
    'interactive AI demo',
    'live AI tools',
    'enterprise AI demo',
    'AI chatbot demo',
    'AI automation demo',
    'market intelligence AI',
    'ecommerce AI assistant demo',
    'search visibility AI tool',
    'AI workflow demo',
    'Invisigent demo',
    'AI tools India',
    'AI tools US',
  ],
  authors: [{ name: 'Invisigent', url: 'https://invisigent.ai' }],
  creator: 'Invisigent',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: DEMO_CANONICAL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Invisigent',
    title: 'Interactive AI Demos | Invisigent',
    description:
      'Live AI tool demos — enterprise AI systems, automation workflows, and intelligent infrastructure.',
    url: DEMO_CANONICAL,
    images: [{ url: DEMO_OG_IMAGE, width: 1200, height: 630, alt: 'Invisigent Interactive AI Demos', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'Interactive AI Demos | Invisigent',
    description:
      'Live AI tool demos — enterprise AI systems, automation workflows, and intelligent infrastructure.',
    images: [{ url: DEMO_OG_IMAGE, alt: 'Invisigent Interactive AI Demos' }],
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
  },
};

export default function InteractiveDemoPage() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Invisigent',
    description:
      'Invisigent designs enterprise AI systems, AI workflow systems, and AI automation demos for production environments.',
    areaServed: ['India', 'United States', 'Europe'],
    url: 'https://invisigent.ai',
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Invisigent Interactive AI Tools Demo Systems',
    itemListElement: TOOLS.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: tool.ctaHref
        ? `https://invisigent.ai${tool.ctaHref}`
        : `https://invisigent.ai/interactive-demo#${tool.id}`,
    })),
  };

  const softwareAppsJsonLd = TOOLS.map((tool) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: tool.shortDescription,
    keywords: [
      'AI tools demo',
      'enterprise AI systems',
      'AI automation demos',
      'AI workflow systems',
      'AI infrastructure India, US, Europe',
    ].join(', '),
    creator: {
      '@type': 'Organization',
      name: 'Invisigent',
    },
  }));

  return (
    <>
      <Breadcrumb items={[{ label: 'Interactive Demos' }]} />
      <InteractiveDemoClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {softwareAppsJsonLd.map((schema, idx) => (
        <script
          key={`software-app-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
