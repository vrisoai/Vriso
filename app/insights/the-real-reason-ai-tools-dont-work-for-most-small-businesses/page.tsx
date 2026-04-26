import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL =
  'https://www.invisigent.ai/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses';
const OG_IMAGE = 'https://www.invisigent.ai/blog-ai-tools-dont-work-small-businesses.png';
const PUBLISHED = '2026-04-23T09:00:00.000Z';
const TITLE = "The Real Reason AI Tools Don't Work for Most Small Businesses";
const DESCRIPTION =
  "It's not the technology. It's not the budget. It's one mistake that almost every founder makes before they even get started.";

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'why AI tools fail small businesses',
    'AI implementation mistakes',
    'AI automation ROI',
    'process audit before AI',
    'custom AI vs generic AI tools',
    'small business AI strategy',
    'AI chatbot ROI',
    'automate the right process',
    'AI workflow automation',
    'Invisigent AI consulting',
  ],
  authors: [{ name: 'Invisigent', url: 'https://www.invisigent.ai' }],
  creator: 'Invisigent',
  category: 'Common Mistakes',
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
      "It's not the technology. It's not the budget. It's one mistake almost every founder makes before they even get started.",
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://www.invisigent.ai'],
    section: 'Common Mistakes',
    tags: [
      'AI tools',
      'small business automation',
      'process audit',
      'AI strategy',
      'AI ROI',
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
      "It's not the technology. It's not the budget. It's one mistake almost every founder makes before they even get started.",
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
  articleSection: 'Common Mistakes',
  keywords: 'AI tools, small business automation, process audit, AI strategy, AI ROI',
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
      <Breadcrumb items={[{ label: 'Insights', href: '/insights' }, { label: 'The Real Reason AI Tools Don\'t Work for Most Small Businesses' }]} />
      <main style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>

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
            src="/blog-ai-tools-dont-work-small-businesses.png"
            alt="Frustrated business owner surrounded by broken disconnected AI tool interfaces"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
          />
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
              Common Mistakes
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
              }}
            >
              6 min read
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
            The Real Reason AI Tools Don&apos;t Work for Most Small Businesses
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

          {/* Intro */}
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
              It&apos;s not the technology. It&apos;s not the budget. It&apos;s one mistake that
              almost every founder makes before they even get started.
            </p>

            <p>
              Every week, someone asks us some version of the same question: &ldquo;We tried ChatGPT /
              an AI tool / an automation — it didn&apos;t really work. Why?&rdquo;
            </p>

            <p>And almost every time, the answer is the same thing.</p>

            <p
              className="font-serif"
              style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}
            >
              They automated the wrong process.
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
                &ldquo;Putting AI on a broken process doesn&apos;t fix the process. It just breaks it
                faster.&rdquo;
              </p>
            </blockquote>

            {/* Section: Tool-first trap */}
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              The tool-first trap
            </h2>

            <p>
              Here&apos;s how it usually goes. A founder hears about an AI tool — maybe a chatbot
              builder, a content generator, or an automation platform. They sign up, connect it to
              their business, and expect things to improve.
            </p>

            <p>
              But the tool was built for a generic use case. It doesn&apos;t know your customers. It
              doesn&apos;t know how you work. It doesn&apos;t know what &ldquo;a good lead&rdquo; means
              for your business. So it performs — technically — but produces nothing of value.
            </p>

            <p>
              The founder concludes: &ldquo;AI doesn&apos;t work for us.&rdquo;
            </p>

            <p>
              What actually happened: they picked the tool before understanding the problem.
            </p>

            {/* Section: Three questions */}
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              The three questions you need to answer before buying anything
            </h2>

            <p>
              Before any AI tool, automation, or chatbot can help your business, you need to be clear
              on three things:
            </p>
          </div>

          {/* Three questions list */}
          <ol
            style={{
              paddingLeft: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              margin: '1.5rem 0',
            }}
          >
            {[
              {
                q: 'What is the most repetitive task your team does that produces no insight?',
                detail:
                  'Data entry, copy-pasting information between tools, answering the same 10 questions every day, manually following up with leads. These are the right candidates.',
              },
              {
                q: 'Where is the biggest gap between when something happens and when someone responds?',
                detail:
                  'A new inquiry sitting for 4 hours. An invoice not sent until Friday. A customer complaint not seen until it\'s a 1-star review. These gaps cost money.',
              },
              {
                q: 'What would happen if you did nothing and this problem continued for 12 months?',
                detail:
                  'If the answer is "nothing much," don\'t automate it. If the answer involves lost revenue, staff burnout, or customer churn, that\'s your starting point.',
              },
            ].map(({ q, detail }) => (
              <li key={q}>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                    marginBottom: '0.4rem',
                  }}
                >
                  {q}
                </p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {detail}
                </p>
              </li>
            ))}
          </ol>

          {/* Remaining body */}
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
              Why cheap AI tools feel disappointing
            </h2>

            <p>
              Generic AI tools are built to be sold to millions of businesses. They can&apos;t know
              your context, your tone, your customers, or your process. So they give generic outputs —
              which require heavy editing — which means you end up doing nearly as much work as before,
              except now you&apos;re also paying a subscription.
            </p>

            <p>
              The businesses that actually benefit from AI aren&apos;t using off-the-shelf tools the
              way the packaging suggests. They&apos;re using custom-built systems trained on their own
              data, connected to their own tools, designed around their specific workflows.
            </p>

            <p>
              That&apos;s a different thing entirely. And it&apos;s not as expensive or complicated as
              it sounds — when built correctly.
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
              { stat: '63%', label: "of small businesses say AI tools 'didn't deliver expected results'" },
              { stat: '81%', label: 'of those cases involved no process audit before implementation' },
              { stat: '4.2×', label: 'ROI improvement when AI is matched to a specific, defined problem' },
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

          {/* Final body */}
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
              What &ldquo;built correctly&rdquo; actually means
            </h2>

            <p>
              It means starting with a process audit — understanding what your team does, where the
              friction is, and what can realistically be handed to an AI without producing garbage.
            </p>

            <p>
              It means building a system that is trained on your data: your past conversations, your
              product knowledge, your customer language. Not a system that starts from zero every time
              someone asks it a question.
            </p>

            <p>
              And it means connecting that system to the tools you already use — your CRM, your
              calendar, your inbox — so the AI actually completes tasks, not just generates text you
              have to manually act on.
            </p>

            <p>
              This is what we build at Invisigent. Not another generic tool — a system shaped around
              how your business actually works.
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
              Not sure which process to automate first?
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
              Let&apos;s figure it out together.
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
              A free 20-minute strategy call. We&apos;ll map your highest-impact automation
              opportunity — no commitment required.
            </p>
            <Link
              href="/contact"
              className="btn-accent"
              style={{ textDecoration: 'none', marginTop: '0.5rem' }}
            >
              Get a free process audit →
            </Link>
          </div>
        </article>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
