import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL =
  'https://www.invisigent.ai/insights/why-your-business-is-losing-customers-while-you-sleep';
const OG_IMAGE = 'https://www.invisigent.ai/blog-losing-customers-while-you-sleep.png';
const PUBLISHED = '2026-04-23T08:00:00.000Z';
const TITLE = 'Why Your Business Is Losing Customers While You Sleep';
const DESCRIPTION =
  "If your business can't respond after 6 PM, you're not losing deals to bad products — you're losing them to a slow reply. Learn how always-on AI agents fix this.";

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'AI chatbot for small business',
    'customer response time',
    'after hours customer support',
    'AI automation lead response',
    'lose customers slow reply',
    'always-on AI agent',
    'small business AI tools',
    'automated customer service',
    'lead conversion rate',
    'Invisigent AI',
  ],
  authors: [{ name: 'Invisigent', url: 'https://www.invisigent.ai' }],
  creator: 'Invisigent',
  category: 'AI Mistakes',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Invisigent',
    title: TITLE,
    description:
      "If your business can't respond after 6 PM, you're losing deals to slow replies — not bad products.",
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://www.invisigent.ai'],
    section: 'AI Mistakes',
    tags: [
      'AI chatbot',
      'customer response',
      'lead conversion',
      'small business automation',
      'after-hours support',
    ],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 675,
        alt: TITLE,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description:
      "If your business can't respond after 6 PM, you're losing deals to slow replies — not bad products.",
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${CANONICAL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  image: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 1200,
    height: 675,
  },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: {
    '@type': 'Organization',
    name: 'Invisigent',
    url: 'https://www.invisigent.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Invisigent',
    url: 'https://www.invisigent.ai',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.invisigent.ai/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': CANONICAL,
  },
  articleSection: 'AI Mistakes',
  keywords: 'AI chatbot, customer response time, lead conversion, small business automation',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'Blog',
    '@id': 'https://www.invisigent.ai/insights#blog',
    name: 'AI Infrastructure Insights',
    publisher: { '@type': 'Organization', name: 'Invisigent' },
  },
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumb items={[{ label: 'Insights', href: '/insights' }, { label: 'Why Your Business Is Losing Customers While You Sleep' }]} />
      <main
        style={{
          background: 'var(--color-bg-primary)',
          minHeight: '100vh',
        }}
      >
        {/* ── Hero image ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '21/9',
            maxHeight: '520px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/blog-losing-customers-while-you-sleep.png"
            alt="City skyline at night with customer icons drifting away while a businessperson sleeps"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
          />
          {/* Dark gradient over bottom of hero so text doesn't clash */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(18,18,18,0) 40%, rgba(18,18,18,0.85) 100%)',
            }}
            aria-hidden
          />
        </div>

        {/* ── Article container ── */}
        <article
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 5vw, 2rem)',
          }}
        >

          {/* Category + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-trust-amber)',
                background: 'rgba(251,191,36,0.08)',
                border: '1px solid rgba(251,191,36,0.2)',
                borderRadius: '0.25rem',
                padding: '0.2rem 0.55rem',
              }}
            >
              AI Mistakes
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
              }}
            >
              5 min read
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              marginBottom: '2rem',
            }}
          >
            Why Your Business Is Losing Customers While You Sleep
          </h1>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(251,191,36,0.3), transparent)',
              marginBottom: '2rem',
            }}
            aria-hidden
          />

          {/* Body copy */}
          <div
            className="font-serif"
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <p>
              If your business can&apos;t respond after 6 PM, you&apos;re not losing deals to bad
              products. You&apos;re losing them to a slow reply.
            </p>

            <p>
              Think about the last time you asked a question on a website and got a response 12 hours
              later. Did you wait? Or did you move on?
            </p>

            <p>
              Your customers are doing the same thing — right now, tonight, on a weekend — while
              you&apos;re offline.
            </p>

            <p>
              This is the most expensive problem most small business owners don&apos;t track. Not
              because they don&apos;t care, but because no one ever sends them an invoice for it. The
              lost deal just… disappears. The customer never replies. You assume they weren&apos;t
              serious.
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                margin: '0.5rem 0',
                padding: '1.25rem 1.5rem',
                background: 'rgba(59,130,246,0.06)',
                borderLeft: '3px solid var(--color-link)',
                borderRadius: '0 0.5rem 0.5rem 0',
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                &ldquo;Speed is the new price. Whoever replies first, wins — not whoever has the best
                product.&rdquo;
              </p>
            </blockquote>

            {/* Sub-heading */}
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginTop: '0.5rem',
                marginBottom: '-0.5rem',
              }}
            >
              The 5-minute rule that most businesses violate every day
            </h2>

            <p>
              Research consistently shows that responding to a lead within 5 minutes makes you
              significantly more likely to convert them than responding even 30 minutes later. After an
              hour, most leads have already made up their minds.
            </p>

            <p>
              For most small businesses, a 5-minute response window is impossible. You have actual work
              to do. You can&apos;t stare at a chat widget all day. So responses happen whenever someone
              checks — which is usually hours later.
            </p>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              margin: '2.5rem 0',
            }}
          >
            {[
              { stat: '78%', label: 'of customers buy from whoever responds first' },
              { stat: '60×', label: 'drop in conversion rate if you reply after 1 hour' },
              { stat: '70%', label: 'of customer questions are the same 5–7 queries every time' },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderTop: '2px solid var(--color-trust-amber)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-trust-amber)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat}
                </p>
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-tertiary)',
                    lineHeight: 1.5,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Remaining body copy */}
          <div
            className="font-serif"
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              What&apos;s actually happening when no one responds
            </h2>

            <p>
              Here&apos;s the thing: your competitor might not even have a better product. They might
              not have a better price. But if they have an AI chatbot that answers instantly at 11 PM
              and you don&apos;t, they&apos;re closing deals you never even knew you had.
            </p>

            <p>
              This isn&apos;t a hypothetical. Across service businesses — consultancies, agencies,
              coaches, e-commerce brands, logistics startups — the pattern is the same: most inquiries
              happen outside of 9-to-5 hours. And most businesses only have a 9-to-5 team.
            </p>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              The fix is simpler than you think
            </h2>

            <p>
              You don&apos;t need a complex AI system to solve this. You need one well-trained AI
              chatbot that knows:
            </p>

            {/* Bullet list */}
            <ul
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                margin: '-0.5rem 0',
              }}
            >
              {[
                'Your pricing (or how to collect the info needed to give a quote)',
                'Your services, turnaround times, and process',
                'How to qualify a lead and route them to the right person',
                'How to book a call directly into your calendar',
              ].map((item) => (
                <li key={item} style={{ color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>

            <p>
              That&apos;s it. Built right, this chatbot handles 70% of your incoming queries without
              you ever touching them — and escalates the real, nuanced ones to you with full context.
            </p>

            <p>
              You stop losing deals to slow replies. Your team wakes up to qualified leads, not a
              backlog of unanswered chats.
            </p>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              What this looks like in practice
            </h2>

            <p>
              One of our clients — a two-person digital services firm — was responding to inquiries an
              average of 4–6 hours after they came in. After deploying a custom AI chatbot, their first
              response became instant, 24/7. They closed three new clients in the first month who had
              reached out between 9 PM and midnight.
            </p>

            <p>
              None of those clients would have waited until morning.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(59,130,246,0.3), transparent)',
              margin: '3rem 0',
            }}
            aria-hidden
          />

          {/* CTA block */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
              }}
            >
              See what&apos;s possible
            </p>
            <h3
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                maxWidth: '440px',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              See what an AI chatbot built for your business looks like.
            </h3>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '400px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              We&apos;ll show you a live demo in 20 minutes — no sales pitch, no fluff. Just what&apos;s
              actually possible for a business your size.
            </p>
            <Link
              href="/contact"
              className="btn-accent"
              style={{ textDecoration: 'none', marginTop: '0.5rem' }}
            >
              Book a free demo →
            </Link>
          </div>
        </article>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
