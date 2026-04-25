import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/contact';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';
const TITLE = "Let's Talk — Start an AI Project With Invisigent";
const DESCRIPTION =
  'Start a conversation with Invisigent about enterprise AI systems, automation workflows, and intelligent infrastructure for your business. Book a free strategy call today.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'contact Invisigent',
    'AI consulting inquiry',
    'book AI strategy call',
    'enterprise AI project',
    'AI automation consultation',
    'AI systems India',
    'AI infrastructure Europe',
    'AI consulting US',
    'free AI demo',
    'Invisigent contact',
    'AI retainer inquiry',
    'multi-agent AI project',
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

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': 'https://invisigent.ai/#website' },
      breadcrumb: { '@id': `${CANONICAL}#breadcrumb` },
      dateModified: '2026-04-23',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: CANONICAL },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://invisigent.ai/#localbusiness',
      name: 'Invisigent',
      url: 'https://invisigent.ai',
      description: 'Enterprise AI systems architecture firm serving India, US, and Europe.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.9124,
        longitude: 75.7873,
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English'],
        url: CANONICAL,
      },
      sameAs: ['https://www.linkedin.com/company/invisigent/', 'https://x.com/InvisigentAI'],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Breadcrumb items={[{ label: "Let's Talk" }]} />
      <ContactClient />
    </>
  );
}
