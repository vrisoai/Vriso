import type { Metadata } from 'next';
import { EcommerceAssistantChat } from '@/app/components/EcommerceAssistantChat';
import { InvisigentLogoSection } from '@/app/components/InvisigentLogoSection';
import FooterSection from '@/app/components/FooterSection';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/ecommerce-ai-assistant';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';
const TITLE = 'E-commerce AI Assistant — Personalized Shopping Support at Scale';
const DESCRIPTION =
  'Virtual shopping assistant demo for recommendations, orders, and catalog help. See how Invisigent builds brand-aligned AI customer service that handles queries 24/7 at scale.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ecommerce AI assistant',
    'AI shopping assistant',
    'AI customer service ecommerce',
    'virtual shopping assistant',
    'AI product recommendations',
    'AI order support',
    'ecommerce chatbot demo',
    'AI customer service 24/7',
    'brand-aligned AI chatbot',
    'Invisigent ecommerce demo',
    'AI retail assistant',
    'customer service automation',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'E-commerce AI Assistant - Invisigent', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: 'E-commerce AI Assistant - Invisigent' }],
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${CANONICAL}#app`,
      name: 'E-commerce AI Assistant',
      url: CANONICAL,
      description: DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'en-US',
      creator: { '@id': 'https://invisigent.ai/#organization' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free demo' },
      featureList: [
        'Personalized product recommendations',
        'Order tracking support',
        'Catalog browsing assistance',
        'Brand-aligned conversational AI',
        '24/7 automated customer service',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Interactive Demos', item: 'https://invisigent.ai/interactive-demo' },
        { '@type': 'ListItem', position: 3, name: 'E-commerce AI Assistant', item: CANONICAL },
      ],
    },
  ],
};

export default function EcommerceAiAssistantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Breadcrumb items={[{ label: 'Interactive Demos', href: '/interactive-demo' }, { label: 'E-commerce AI Assistant' }]} />
      <main className="ecommerce-assistant-page">
        <div className="section-wrapper ecommerce-assistant-page-inner">
          <div className="ecommerce-assistant-page-grid">
            <header className="ecommerce-assistant-page-intro">
              <p className="ecommerce-assistant-page-eyebrow font-mono text-label uppercase tracking-widest text-text-tertiary">
                Demo
              </p>
              <h1 className="ecommerce-assistant-page-title text-section-h font-serif font-semibold leading-tight text-text-primary">
                E-commerce AI Assistant
              </h1>
              <p className="ecommerce-assistant-page-lede text-body mt-5 max-w-xl font-serif leading-relaxed text-text-secondary">
                The E-commerce Customer Interaction Bot is a virtual extension of your customer service team, built to
                deliver personalized shopping assistance at scale. Customers can use it to get product recommendations,
                track orders, resolve issues, or explore your catalog, all aligned with your brand&apos;s offerings.
              </p>
            </header>

            <div className="ecommerce-assistant-chat-card glass-card">
              <EcommerceAssistantChat />
            </div>
          </div>
        </div>
        <InvisigentLogoSection />
        <FooterSection />
      </main>
    </>
  );
}
