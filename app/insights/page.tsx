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
          headline: 'Why Your Business Is Losing Customers While You Sleep',
          url: 'https://invisigent.ai/insights/why-your-business-is-losing-customers-while-you-sleep',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-losing-customers-while-you-sleep.png',
        },
        {
          '@type': 'BlogPosting',
          headline: "The Real Reason AI Tools Don't Work for Most Small Businesses",
          url: 'https://invisigent.ai/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-ai-tools-dont-work-small-businesses.png',
        },
        {
          '@type': 'BlogPosting',
          headline: 'How a 2-Person Team Can Compete With a 20-Person Company Using AI',
          url: 'https://invisigent.ai/insights/how-a-2-person-team-can-compete-with-a-20-person-company-using-ai',
          datePublished: '2026-04-23',
          image: 'https://invisigent.ai/blog-2-person-team-compete-with-ai.png',
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
            imageAlt="City skyline at night with customer icons drifting away while a businessperson sleeps at their laptop"
            category="AI Mistakes"
            readTime="5 min read"
            heading="Why Your Business Is Losing Customers While You Sleep"
            excerpt="Every unanswered query after hours is a customer quietly walking to your competitor. Discover how always-on AI agents close the gap between business hours and customer demand."
            author="Invisigent Research"
            href="/insights/why-your-business-is-losing-customers-while-you-sleep"
          />
          <BlogCard
            imageSrc="/blog-ai-tools-dont-work-small-businesses.png"
            imageAlt="Frustrated business owner surrounded by broken, disconnected AI tool interfaces showing errors and loading states"
            category="Common Mistakes"
            readTime="6 min read"
            heading="The Real Reason AI Tools Don't Work for Most Small Businesses"
            excerpt="Most small businesses are buying AI tools, not AI strategy. The problem isn't the technology ? it's that no one told you how to make it actually fit your business."
            author="Invisigent Research"
            href="/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses"
          />
          <BlogCard
            imageSrc="/blog-2-person-team-compete-with-ai.png"
            imageAlt="Two-person team powered by glowing AI agent network competing with a large grey corporate floor through a glass wall"
            category="Growth"
            readTime="5 min read"
            heading="How a 2-Person Team Can Compete With a 20-Person Company Using AI"
            excerpt="Headcount used to determine capacity. AI has changed that. Here's how small teams are using intelligent automation to punch well above their weight and win."
            author="Invisigent Research"
            href="/insights/how-a-2-person-team-can-compete-with-a-20-person-company-using-ai"
          />
        </div>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
