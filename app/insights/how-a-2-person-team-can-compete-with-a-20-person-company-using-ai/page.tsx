import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL =
  'https://invisigent.ai/insights/how-a-2-person-team-can-compete-with-a-20-person-company-using-ai';
const OG_IMAGE = 'https://invisigent.ai/blog-2-person-team-compete-with-ai.png';
const PUBLISHED = '2026-04-23T10:00:00.000Z';
const TITLE = 'How a 2-Person Team Can Compete With a 20-Person Company Using AI';
const DESCRIPTION =
  "The gap between a small business and a well-funded competitor used to be headcount. In 2025, it's automation. And the good news: it's closeable.";

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'small team AI automation',
    'compete with larger companies using AI',
    'AI for small business growth',
    'workflow automation small business',
    'lead qualification automation',
    'proposal generation AI',
    'AI business efficiency',
    'startup AI tools',
    'AI competitive advantage',
    'Invisigent AI strategy',
  ],
  authors: [{ name: 'Invisigent', url: 'https://invisigent.ai' }],
  creator: 'Invisigent',
  category: 'Growth',
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
      "The gap used to be headcount. In 2025, it's automation — and it's closeable.",
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'Growth',
    tags: [
      'AI automation',
      'small business growth',
      'workflow automation',
      'lead qualification',
      'AI competitive advantage',
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
      "The gap used to be headcount. In 2025, it's automation — and it's closeable.",
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
};

const WORKFLOWS = [
  {
    n: '01',
    title: 'Lead intake and qualification',
    body: "An AI chatbot or form collects context, asks the right questions, scores the lead, and routes it to the right person. No more wasting an hour on a discovery call with someone who was never going to buy.",
  },
  {
    n: '02',
    title: 'Follow-up automation',
    body: "Proposals sent, no reply? A structured automation sequence follows up at day 2, day 5, and day 10 — personalised, on-brand, without a single manual email.",
  },
  {
    n: '03',
    title: 'Proposal and document generation',
    body: "Feed client intake data into a template. AI assembles a first-draft proposal in minutes, ready for human review. Cuts proposal time from 3 hours to 20 minutes.",
  },
  {
    n: '04',
    title: 'Customer support on repeat questions',
    body: "70% of support queries are the same questions. Train an AI on your knowledge base. It handles those. You handle the 30% that actually need you.",
  },
  {
    n: '05',
    title: 'Internal operations and reporting',
    body: "Weekly status summaries, data entry across tools, CRM updates. All things that eat 30–60 minutes daily and produce nothing new.",
  },
];

const STATS = [
  { stat: '12 hrs', label: 'average time saved per week per team member with targeted automation' },
  { stat: '3.1×', label: 'faster proposal turnaround with AI-assisted document generation' },
  { stat: '40%', label: 'of operational work in a 5-person business is automatable today' },
];

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
    url: 'https://invisigent.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Invisigent',
    url: 'https://invisigent.ai',
    logo: {
      '@type': 'ImageObject',
      url: 'https://invisigent.ai/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': CANONICAL,
  },
  articleSection: 'Growth',
  keywords: 'AI automation, small business growth, workflow automation, lead qualification, AI competitive advantage',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'Blog',
    '@id': 'https://invisigent.ai/insights#blog',
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
      <Breadcrumb items={[{ label: 'Insights', href: '/insights' }, { label: 'How a 2-Person Team Can Compete With a 20-Person Company Using AI' }]} />
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
            src="/blog-2-person-team-compete-with-ai.png"
            alt="Two-person team powered by glowing AI agent network competing with a large grey corporate floor"
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

        {/* ── Article ── */}
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
              Growth
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
            How a 2-Person Team Can Compete With a 20-Person Company Using AI
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

          {/* Body */}
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
              The gap between a small business and a well-funded competitor used to be headcount. In
              2025, it&apos;s automation. And the good news: it&apos;s closeable.
            </p>

            <p>
              There&apos;s a myth that AI is for big companies — the ones with tech teams, data
              scientists, and million-dollar budgets. It&apos;s a myth that larger competitors are very
              happy to let you believe.
            </p>

            <p>
              The truth is more interesting. Small businesses that move first on AI automation are
              compressing what used to be a 20-person workload into a team of two or three — and
              they&apos;re doing it at a fraction of the cost of hiring.
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
              What your competitor is actually doing
            </h2>

            <p>
              When a fast-growing competitor seems to handle everything — fast replies, consistent
              follow-ups, polished proposals, smooth onboarding — it&apos;s not always because they
              have a bigger team.
            </p>

            <p>
              Increasingly, it&apos;s because they&apos;ve automated the operational layer of their
              business. The parts that aren&apos;t creative or strategic — but that still eat 40% of
              working hours.
            </p>

            <p>
              Lead qualification. Follow-up sequences. Proposal generation. Client status updates.
              Invoice reminders. Meeting summaries. These things don&apos;t require judgment — they
              require consistency. And that&apos;s exactly what AI does well.
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
                &ldquo;Your competitor doesn&apos;t have more hours. They&apos;ve just stopped doing
                the things that don&apos;t require a human.&rdquo;
              </p>
            </blockquote>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '-0.5rem',
              }}
            >
              The 5 workflows where a small team wins back 10+ hours a week
            </h2>
          </div>

          {/* Workflow cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: '1.75rem 0',
            }}
          >
            {WORKFLOWS.map(({ n, title, body }) => (
              <div
                key={n}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.12em',
                    color: 'var(--color-trust-amber)',
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    borderRadius: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    flexShrink: 0,
                    marginTop: '0.2rem',
                  }}
                >
                  {n}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {title}
                  </p>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              margin: '2rem 0',
            }}
          >
            {STATS.map(({ stat, label }) => (
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
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
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
              Why small businesses actually have an advantage here
            </h2>

            <p>
              Large companies move slowly. They have legacy systems, procurement cycles, and 6-month
              implementation timelines. A two-person business can go from &ldquo;we want to automate
              X&rdquo; to &ldquo;it&apos;s live and working&rdquo; in two weeks.
            </p>

            <p>
              That&apos;s a compounding advantage. Every month you&apos;re running AI-assisted
              workflows, you&apos;re accumulating data, refining the system, and freeing up capacity
              to grow. Your 20-person competitor is still in committee approvals.
            </p>

            <p>
              The window to move first doesn&apos;t stay open forever. But right now, for a small
              business willing to make one or two smart automation decisions, the leverage is
              extraordinary.
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
              Where to start
            </h2>

            <p>
              Don&apos;t try to automate everything. Pick the single most repetitive, time-consuming
              thing your team does that doesn&apos;t require creative judgment. Build one clean
              automation around that. Get comfortable with the feedback loop. Then expand.
            </p>

            <p>
              The biggest mistake is waiting until you have &ldquo;more resources&rdquo; to start. The
              automation is what creates the resources.
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
              Ready to reclaim 10 hours a week for your team?
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
              Tell us how your business works.
            </h3>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '420px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              We&apos;ll show you exactly where automation fits — and build it for you in weeks, not
              months.
            </p>
            <Link
              href="/contact"
              className="btn-accent"
              style={{ textDecoration: 'none', marginTop: '0.5rem' }}
            >
              Start the conversation →
            </Link>
          </div>
        </article>
      </main>

      <FooterSection />
    </>
  );
}
