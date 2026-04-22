import type { Metadata } from 'next';
import { MarketIntelligenceStockSearch } from '@/app/components/MarketIntelligenceStockSearch';
import { InvisigentLogoSection } from '@/app/components/InvisigentLogoSection';
import FooterSection from '@/app/components/FooterSection';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/market-intelligence-engine';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';
const TITLE = 'Market Intelligence Engine — AI-Powered Stock & Market Analysis';
const DESCRIPTION =
  'Search a stock by name or symbol for AI-assisted market context — news aggregation, trend detection, and insight workflows. A live demo by Invisigent.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'market intelligence AI',
    'AI stock analysis tool',
    'AI market data aggregation',
    'enterprise market intelligence',
    'AI trend detection',
    'stock insight AI',
    'AI financial analysis demo',
    'market context AI',
    'investment intelligence AI',
    'Invisigent market demo',
    'AI data workflows',
    'real-time market AI',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Market Intelligence Engine - Invisigent', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: 'Market Intelligence Engine - Invisigent' }],
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
      name: 'Market Intelligence Engine',
      url: CANONICAL,
      description: DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'en-US',
      creator: { '@id': 'https://invisigent.ai/#organization' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free demo' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Interactive Demos', item: 'https://invisigent.ai/interactive-demo' },
        { '@type': 'ListItem', position: 3, name: 'Market Intelligence Engine', item: CANONICAL },
      ],
    },
  ],
};

export default function MarketIntelligenceEnginePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Breadcrumb items={[{ label: 'Interactive Demos', href: '/interactive-demo' }, { label: 'Market Intelligence Engine' }]} />
      <main className="market-intelligence-page">
        <div className="section-wrapper market-intelligence-page-inner">
          <div className="market-intelligence-page-grid">
            <header className="market-intelligence-page-intro">
              <p className="market-intelligence-page-eyebrow font-mono text-label uppercase tracking-widest text-text-tertiary">
                Demo
              </p>
              <h1 className="market-intelligence-page-title text-section-h font-serif font-semibold leading-tight text-text-primary">
                Market Intelligence Engine
              </h1>
              <p className="market-intelligence-page-lede text-body mt-5 max-w-xl font-serif leading-relaxed text-text-secondary">
                An AI layer that aggregates market data, surfaces trends, and helps teams act faster. Start by looking up
                a public company — name or ticker — to simulate how the engine would focus its analysis.
              </p>
            </header>

            <div className="market-intelligence-card glass-card">
              <h2 className="text-card-title font-serif font-semibold text-text-primary">Stock lookup</h2>
              <p className="text-body mt-2 text-text-secondary">
                Enter one security to scope the demo. Production deployments connect to licensed data and your policies.
              </p>
              <div className="mt-8">
                <MarketIntelligenceStockSearch />
              </div>
            </div>
          </div>
        </div>
        <InvisigentLogoSection />
        <FooterSection />
      </main>
    </>
  );
}
