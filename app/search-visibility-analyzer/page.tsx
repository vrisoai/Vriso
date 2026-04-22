import type { Metadata } from 'next';
import { SearchVisibilityAnalyzerForm } from '@/app/components/SearchVisibilityAnalyzerForm';
import { InvisigentLogoSection } from '@/app/components/InvisigentLogoSection';
import FooterSection from '@/app/components/FooterSection';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/search-visibility-analyzer';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';
const TITLE = 'Search Visibility Analyzer — Free SEO Audit Tool by Invisigent';
const DESCRIPTION =
  'Submit your keyword, location, and website for a tailored search visibility snapshot. Analyze Google rankings, Google Business Profile visibility, and on-page SEO — receive a structured PDF report.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'search visibility analyzer',
    'free SEO audit tool',
    'Google ranking analysis',
    'local SEO analyzer',
    'website visibility tool',
    'Google Business Profile audit',
    'on-page SEO checker',
    'SEO report PDF',
    'AI SEO tool',
    'Invisigent SEO tool',
    'keyword visibility analysis',
    'search ranking audit',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Search Visibility Analyzer - Invisigent', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: 'Search Visibility Analyzer - Invisigent' }],
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
      name: 'Search Visibility Analyzer',
      url: CANONICAL,
      description: DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'en-US',
      creator: { '@id': 'https://invisigent.ai/#organization' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free tool' },
      featureList: [
        'Google ranking analysis',
        'Google Business Profile visibility audit',
        'On-page SEO check',
        'PDF report delivery',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Interactive Demos', item: 'https://invisigent.ai/interactive-demo' },
        { '@type': 'ListItem', position: 3, name: 'Search Visibility Analyzer', item: CANONICAL },
      ],
    },
  ],
};

export default function SearchVisibilityAnalyzerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Breadcrumb items={[{ label: 'Interactive Demos', href: '/interactive-demo' }, { label: 'Search Visibility Analyzer' }]} />
      <main className="search-visibility-page">
        <div className="section-wrapper search-visibility-page-inner">
          <div className="search-visibility-page-grid">
            <header className="search-visibility-page-intro">
              <p className="search-visibility-page-eyebrow font-mono text-label uppercase tracking-widest text-text-tertiary">
                Tool
              </p>
              <h1 className="search-visibility-page-title text-section-h font-serif font-semibold leading-tight text-text-primary">
                Search Visibility Analyzer
              </h1>
              <p className="search-visibility-page-lede text-body mt-5 max-w-xl font-serif leading-relaxed text-text-secondary">
                Enter your website and location. We&apos;ll analyze your Google rankings, Google Business Profile
                visibility, and on-page SEO — then email you a structured PDF report.
              </p>
            </header>

            <div className="search-visibility-card glass-card">
              <h2 className="text-card-title font-serif font-semibold text-text-primary">Request an analysis</h2>
              <p className="text-body mt-2 text-text-secondary">
                All fields are required. We treat your URL and keyword data as confidential.
              </p>
              <div className="mt-8">
                <SearchVisibilityAnalyzerForm />
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
