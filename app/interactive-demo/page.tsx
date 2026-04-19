// app/interactive-demo/page.tsx  — server component: metadata + JSON-LD only
import type { Metadata } from 'next';
import { TOOLS } from './tools-data';
import { InteractiveDemoClient } from './InteractiveDemoClient';

export const metadata: Metadata = {
  title: 'Interactive Demos',
  description:
    'Live AI tool demos by Invisigent — enterprise AI systems, automation workflows, and intelligent infrastructure for businesses across India, US, and Europe.',
  alternates: {
    canonical: 'https://vriso.ai/interactive-demo',
  },
  openGraph: {
    title: 'Interactive Demos | Invisigent',
    description:
      'Live AI tool demos — enterprise AI systems, automation workflows, and intelligent infrastructure.',
    url: 'https://vriso.ai/interactive-demo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Invisigent Interactive AI Demos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Demos | Invisigent',
    description:
      'Live AI tool demos — enterprise AI systems, automation workflows, and intelligent infrastructure.',
    images: ['/og-image.png'],
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
    url: 'https://vriso.ai',
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
        ? `https://vriso.ai${tool.ctaHref}`
        : `https://vriso.ai/interactive-demo#${tool.id}`,
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
