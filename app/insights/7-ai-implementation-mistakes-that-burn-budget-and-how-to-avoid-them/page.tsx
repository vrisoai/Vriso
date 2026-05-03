import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const SLUG = '7-ai-implementation-mistakes-that-burn-budget-and-how-to-avoid-them';
const CANONICAL = `https://invisigent.ai/insights/${SLUG}`;
const OG_IMAGE = 'https://invisigent.ai/blog-ai-implementation-mistakes.png';
const PUBLISHED = '2026-05-04T10:00:00.000Z';
const TITLE = '7 AI Implementation Mistakes That Burn Budget (And How to Avoid Them)';
const DESCRIPTION =
  'Most AI failures are not model failuresthey are architecture, ownership, and execution failures. Here are the seven most expensive mistakes B2B companies make when implementing AI.';

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'AI implementation mistakes',
    'AI budget waste',
    'AI guardrails',
    'AI ROI',
    'B2B AI strategy',
    'AI system design',
    'AI governance',
    'AI process automation',
    'AI data quality',
    'Invisigent AI consulting',
  ],
  authors: [{ name: 'Invisigent', url: 'https://invisigent.ai' }],
  creator: 'Invisigent',
  category: 'AI Strategy',
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
    description: "AI isn't failing. Execution is. Here are the 7 most expensive mistakes to avoid.",
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'AI Strategy',
    tags: ['AI implementation', 'AI ROI', 'AI guardrails', 'B2B AI', 'AI governance'],
    images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: TITLE, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description: "AI isn't failing. Execution is. Here are the 7 most expensive mistakes to avoid.",
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
};

const MISTAKES = [
  {
    n: '01',
    title: 'Deploying AI Into Production Without Guardrails',
    mistake:
      'Connecting AI directly to live systemsCRM updates, customer communication, pricing workflows, internal databaseswithout structured safety controls. No validation. No permission constraints. No human escalation. No rollback.',
    why: 'Incorrect outbound messages at scale. Pricing errors impacting revenue. Data corruption across systems. Compliance exposure.',
    fix: 'Implement layered AI architecture: input validation, business rule constraints, structured output enforcement, full audit logging, and escalation pathways for edge cases. AI should operate within defined boundariesnot override them.',
  },
  {
    n: '02',
    title: 'Automating a Broken Process',
    mistake:
      'Applying AI to chaotic workflowsinconsistent sales pipelines, unclear operational handoffs, undocumented decision logic. AI does not fix broken systems. It amplifies them.',
    why: 'Faster propagation of flawed logic. Increased drop-offs in revenue funnels. Compounded operational confusion.',
    fix: 'Before implementation: map the workflow end-to-end, identify friction points and bottlenecks, define measurable outcomes, and standardize decision rules. Clarity before code.',
  },
  {
    n: '03',
    title: 'No Clear ROI Model',
    mistake:
      'Launching AI initiatives without defined financial targets. "We need AI." But no clarity on which metric improves, by how much, or within what timeframe.',
    why: 'Scope creep. Endless experimentation. No defensible results during budget reviews.',
    fix: 'Tie every AI initiative to measurable business impact: revenue growth, cost reduction, time savings, or error reduction. Define baseline metrics before implementation. Track performance weekly. Kill or optimize based on datanot optimism.',
  },
  {
    n: '04',
    title: 'Tool Stacking Instead of System Design',
    mistake:
      'Layering multiple AI tools and automations without unified architecture. Fragmented tools create fragmented outcomes. Experimentation is not strategy.',
    why: 'Data silos. Redundant workflows. Escalating subscription costs. Integration failures.',
    fix: 'Design the system firstdata layer, logic layer, automation layer, interface layer, monitoring layer. Tools should support the architecture, not define it.',
  },
  {
    n: '05',
    title: 'Ignoring Data Quality',
    mistake:
      'Feeding AI unstructured, inconsistent, or incomplete operational data. AI performance directly reflects input quality.',
    why: 'Inaccurate decision outputs. Biased scoring. Executive distrust in AI results.',
    fix: 'Standardize required data fields, clean historical records, assign data ownership, and implement validation rules. Clean data is infrastructurenot a cleanup task.',
  },
  {
    n: '06',
    title: 'Treating AI as a One-Time Project',
    mistake:
      'Building AI systems as static deployments. AI models evolve. Business needs evolve. Workflows evolve. Static implementations decay quickly.',
    why: 'Performance drift. Reduced accuracy. Increasing manual overrides.',
    fix: 'Build structured iteration cycles, ongoing performance monitoring, continuous optimization, and version control discipline. AI must be managed like core operational infrastructurenot a side initiative.',
  },
  {
    n: '07',
    title: 'No Clear Ownership',
    mistake:
      'No single accountable owner. IT assumes business owns it. Business assumes IT manages it. Leadership assumes it works. Without ownership, performance declines silently.',
    why: 'No monitoring. No optimization. Slow response to failures.',
    fix: 'Assign a directly responsible operator, define performance KPIs, conduct structured monthly reviews, and establish escalation protocols. AI requires governanceeven in lean teams.',
  },
];

const WINNING_PATTERNS = [
  'Outcomes defined before tools',
  'Workflow clarity before automation',
  'Structured system architecture',
  'Guardrails embedded at every layer',
  'ROI measured continuously',
  'Ongoing iteration and refinement',
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${CANONICAL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  image: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 675 },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Invisigent', url: 'https://invisigent.ai' },
  publisher: {
    '@type': 'Organization',
    name: 'Invisigent',
    url: 'https://invisigent.ai',
    logo: { '@type': 'ImageObject', url: 'https://invisigent.ai/logo.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  articleSection: 'AI Strategy',
  keywords: 'AI implementation mistakes, AI ROI, AI guardrails, B2B AI strategy, AI governance',
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
      <Breadcrumb
        items={[
          { label: 'Insights', href: '/insights' },
          { label: '7 AI Implementation Mistakes That Burn Budget' },
        ]}
      />
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
            src="/blog-ai-implementation-mistakes.svg"
            alt="Executive reviewing a dashboard showing failed AI initiatives, broken automations, and budget overruns"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
            unoptimized
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
              AI Strategy
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
              }}
            >
              8 min read
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
            {TITLE}
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
            {/* Pull quote */}
            <blockquote
              style={{
                margin: '0',
                padding: '1.25rem 1.5rem',
                background: 'rgba(239,68,68,0.05)',
                borderLeft: '3px solid rgba(239,68,68,0.5)',
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
                AI isn&apos;t failing. Execution is.
              </p>
            </blockquote>

            <p>
              Over the past 18 months, B2B companiesfrom fast-growing startups to mid-market
              operatorsrushed to &ldquo;implement AI.&rdquo;
            </p>

            <p>The result?</p>

            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                "Disconnected tools that don't integrate",
                'Fragile automations breaking under real load',
                'No measurable ROI to justify the spend',
                'Frustrated teams abandoning the systems',
                'Silent budget bleed eroding leadership confidence',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>
              The issue isn&apos;t the models. It&apos;s architecture, ownership, and execution.
            </p>

            <p>
              If you&apos;re a founder, COO, or revenue leader investing in AI, these are the seven
              most expensive mistakes to avoid.
            </p>
          </div>

          {/* Mistake cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              margin: '2.5rem 0',
            }}
          >
            {MISTAKES.map(({ n, title, mistake, why, fix }) => (
              <div
                key={n}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)',
                    borderBottom: '1px solid var(--color-border)',
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
                    }}
                  >
                    {n}
                  </span>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {title}
                  </p>
                </div>

                {/* Card body */}
                <div
                  style={{
                    padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(239,68,68,0.7)',
                        marginRight: '0.5rem',
                      }}
                    >
                      The mistake:
                    </span>
                    {mistake}
                  </p>

                  <div
                    style={{
                      background: 'rgba(239,68,68,0.04)',
                      border: '1px solid rgba(239,68,68,0.12)',
                      borderRadius: '0.5rem',
                      padding: '0.875rem 1rem',
                    }}
                  >
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(239,68,68,0.6)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Why it burns budget
                    </p>
                    <p
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        lineHeight: 1.7,
                      }}
                    >
                      {why}
                    </p>
                  </div>

                  <div
                    style={{
                      background: 'rgba(59,130,246,0.04)',
                      border: '1px solid rgba(59,130,246,0.12)',
                      borderRadius: '0.5rem',
                      padding: '0.875rem 1rem',
                    }}
                  >
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-link)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      The fix
                    </p>
                    <p
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        lineHeight: 1.7,
                      }}
                    >
                      {fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core problem + winning pattern */}
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
              The Core Problem
            </h2>

            <p>
              Most companies treat AI like a feature. It&apos;s infrastructure.
            </p>

            <p>
              Implemented correctly, AI can reduce repetitive operational load, accelerate revenue
              workflows, improve response speed, reduce hiring pressure, and increase margins.
              Implemented poorly, it quietly drains capital while increasing operational risk.
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
              What Winning AI Implementation Looks Like
            </h2>

            <p>High-performing B2B companies follow a clear pattern:</p>
          </div>

          {/* Winning patterns grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
              gap: '0.75rem',
              margin: '1.5rem 0 2rem',
            }}
          >
            {WINNING_PATTERNS.map((pattern) => (
              <div
                key={pattern}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderTop: '2px solid var(--color-trust-amber)',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--color-trust-amber)', flexShrink: 0 }}>✓</span>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {pattern}
                </p>
              </div>
            ))}
          </div>

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
            <blockquote
              style={{
                margin: '0',
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
                AI is not magic. It&apos;s disciplined systems design.
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
              Before Your Next AI Investment
            </h2>

            <p>Ask internally:</p>

            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                'Is this initiative tied directly to revenue or cost efficiency?',
                'Are architectural guardrails clearly defined?',
                'Is ROI measurable and tracked consistently?',
                'Is there a clearly accountable owner?',
              ].map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>

            <p>
              If the answers are unclear, the initiative is exposed.
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

          {/* About + CTA */}
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
              About Invisigent
            </p>
            <h3
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                maxWidth: '500px',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              AI Systems Audit
            </h3>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '480px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Invisigent designs and implements structured AI systems for revenue-critical and
              operations-critical workflows in growing B2B companies. In a focused strategy session,
              we identify architectural weaknesses, risk exposure points, missed ROI opportunities,
              and high-impact optimization paths.
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
                maxWidth: '420px',
                lineHeight: 1.6,
              }}
            >
              No hype. No tool demos. Just systems clarity.
            </p>
            <Link
              href="/contact"
              className="btn-accent"
              style={{ textDecoration: 'none', marginTop: '0.5rem' }}
            >
              Schedule Your AI Systems Audit →
            </Link>
          </div>
        </article>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
