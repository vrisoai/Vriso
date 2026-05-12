import type { Metadata } from 'next';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import BlogCard from '@/app/components/BlogCard';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/insights';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'AI Infrastructure Insights ? Field Notes & Patterns',
  description:
    'Thinking, patterns, and field notes from Invisigent on enterprise AI infrastructure, agent systems, automation architecture, and AI strategy for small businesses.',
  keywords: [
    'AI infrastructure insights',
    'enterprise AI blog',
    'AI automation tips',
    'small business AI strategy',
    'AI agent systems',
    'AI field notes',
    'AI mistakes to avoid',
    'AI growth tactics',
    'Invisigent blog',
    'AI tools for business',
    'multi-agent AI patterns',
    'AI implementation guide',
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
    title: 'AI Infrastructure Insights | Invisigent',
    description:
      'Thinking, patterns, and field notes on enterprise AI infrastructure, agent systems, and automation architecture.',
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'AI Infrastructure Insights - Invisigent', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'AI Infrastructure Insights | Invisigent',
    description:
      'Thinking, patterns, and field notes on enterprise AI infrastructure, agent systems, and automation architecture.',
    images: [{ url: OG_IMAGE, alt: 'AI Infrastructure Insights - Invisigent' }],
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
  },
};

const insightsBlogSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${CANONICAL}#blog`,
      url: CANONICAL,
      name: 'AI Infrastructure Insights',
      description:
        'Field notes, patterns, and thinking from Invisigent on enterprise AI infrastructure and automation.',
      inLanguage: 'en-US',
      publisher: { '@id': 'https://invisigent.ai/#organization' },
      isPartOf: { '@id': 'https://invisigent.ai/#website' },
      blogPost: [
        {
          '@type': 'BlogPosting',
          headline: 'Why Mid-Market Companies Lose Revenue to Slow Internal Operations And How AI Infrastructure Fixes It Permanently',
          url: 'https://invisigent.ai/insights/why-your-business-is-losing-customers-while-you-sleep',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-losing-customers-while-you-sleep.png',
        },
        {
          '@type': 'BlogPosting',
          headline: 'The Real Reason AI Infrastructure Projects Fail And It Has Nothing to Do With the Technology',
          url: 'https://invisigent.ai/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-ai-tools-dont-work-small-businesses.png',
        },
        {
          '@type': 'BlogPosting',
          headline: 'How Mid-Market Companies Build Operational Leverage Against Larger Competitors Using AI Infrastructure',
          url: 'https://invisigent.ai/insights/how-a-2-person-team-can-compete-with-a-20-person-company-using-ai',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-2-person-team-compete-with-ai.png',
        },
        {
          '@type': 'BlogPosting',
          headline: '7 AI Infrastructure Mistakes That Burn Budget And How Mid-Market Organizations Avoid Them',
          url: 'https://invisigent.ai/insights/7-ai-implementation-mistakes-that-burn-budget-and-how-to-avoid-them',
          datePublished: '2026-05-04',
          image: 'https://invisigent.ai/blog-ai-implementation-mistakes.png',
        },
        {
          '@type': 'BlogPosting',
          headline: 'Why Enterprise AI Accuracy Is an Infrastructure Problem Not a Model Problem',
          url: 'https://invisigent.ai/insights/why-enterprise-ai-accuracy-is-an-infrastructure-problem',
          datePublished: '2026-05-12',
          image: 'https://invisigent.ai/blog-ai-accuracy-infrastructure.svg',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: CANONICAL },
      ],
    },
  ],
};

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsBlogSchema) }}
      />
      <Breadcrumb items={[{ label: 'Insights' }]} />
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
            maxWidth: '48rem',
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
            [ SYSTEM LOGS ]
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
            AI Infrastructure Insights
          </h1>

          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
            }}
          >
            Field notes, patterns, and thinking from the teams building real AI infrastructure.
          </p>
        </div>

        {/* Blog card grid */}
        <div
          style={{
            width: '100%',
            maxWidth: '72rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          <BlogCard
            imageSrc="/blog-losing-customers-while-you-sleep.png"
            imageAlt="Mid-market operations dashboard showing slow internal workflows and revenue leakage points across departments"
            category="AI Infrastructure"
            readTime="10 min read"
            heading="Why Mid-Market Companies Lose Revenue to Slow Internal Operations And How AI Infrastructure Fixes It Permanently"
            excerpt="Slow internal operations are a structural tax on revenue. Most mid-market companies feel it but can't locate it. AI infrastructure doesn't speed up broken processes it rebuilds the layer beneath them."
            author="Invisigent Research"
            href="/insights/why-your-business-is-losing-customers-while-you-sleep"
          />
          <BlogCard
            imageSrc="/blog-ai-tools-dont-work-small-businesses.png"
            imageAlt="Architecture diagram showing the gap between AI tool adoption and AI infrastructure processes feeding tools with no underlying system"
            category="AI Infrastructure"
            readTime="9 min read"
            heading="The Real Reason AI Infrastructure Projects Fail And It Has Nothing to Do With the Technology"
            excerpt="Most AI projects fail in the first 90 days not because the model was wrong, but because the process feeding it was never mapped. The failure is always upstream of the tool."
            author="Invisigent Research"
            href="/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses"
          />
          <BlogCard
            imageSrc="/blog-2-person-team-compete-with-ai.png"
            imageAlt="Mid-market operations team running AI-orchestrated workflows competing with enterprise headcount through structured infrastructure"
            category="AI Infrastructure"
            readTime="9 min read"
            heading="How Mid-Market Companies Build Operational Leverage Against Larger Competitors Using AI Infrastructure"
            excerpt="Larger competitors don't win because they have better people. They win because they have systems that compound. AI infrastructure gives mid-market companies the same structural advantage without the headcount."
            author="Invisigent Research"
            href="/insights/how-a-2-person-team-can-compete-with-a-20-person-company-using-ai"
          />
          <BlogCard
            imageSrc="/blog-ai-implementation-mistakes.svg"
            imageAlt="Executive reviewing AI infrastructure architecture with highlighted failure points and budget burn indicators across seven decision layers"
            category="AI Infrastructure"
            readTime="10 min read"
            heading="7 AI Infrastructure Mistakes That Burn Budget And How Mid-Market Organizations Avoid Them"
            excerpt="Most AI budget failures trace back to seven structural mistakes made before a single line of code is written. The organizations that avoid them share one thing in common: they build infrastructure before they build features."
            author="Invisigent Research"
            href="/insights/7-ai-implementation-mistakes-that-burn-budget-and-how-to-avoid-them"
          />
          <BlogCard
            imageSrc="/blog-ai-accuracy-infrastructure.svg"
            imageAlt="Four-layer AI accuracy infrastructure stack showing retrieval architecture, data quality, guardrail design, and observability side by side with a degrading accuracy panel"
            category="AI Infrastructure"
            readTime="12 min read"
            heading="Why Enterprise AI Accuracy Is an Infrastructure Problem Not a Model Problem"
            excerpt="Most organizations debugging AI accuracy problems are looking in the wrong place. They audit the model, adjust the prompt, switch providers. The accuracy problem persists because it was never a model problem."
            author="Invisigent Research"
            href="/insights/why-enterprise-ai-accuracy-is-an-infrastructure-problem"
          />
        </div>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
