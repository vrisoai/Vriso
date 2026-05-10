import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL =
  'https://invisigent.ai/insights/the-real-reason-ai-tools-dont-work-for-most-small-businesses';
const OG_IMAGE = 'https://invisigent.ai/blog-ai-tools-dont-work-small-businesses.png';
const PUBLISHED = '2026-04-23T09:00:00.000Z';
const TITLE =
  'The Real Reason AI Infrastructure Projects Fail And It Has Nothing to Do With the Technology';
const DESCRIPTION =
  'Most organizations that struggle with AI are not using the wrong model. They are automating the wrong process. Here is what a correct process audit looks like before an AI infrastructure build.';

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'why AI projects fail',
    'AI implementation mistakes',
    'process audit before AI',
    'AI infrastructure mid-market',
    'custom AI vs generic AI tools',
    'AI workflow automation',
    'automate the right process',
    'AI operations strategy',
    'GDPR DPDP AI compliance',
    'Invisigent AI consulting',
  ],
  authors: [{ name: 'Invisigent', url: 'https://invisigent.ai' }],
  creator: 'Invisigent',
  category: 'AI Infrastructure',
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
      'Most organizations struggling with AI are not using the wrong model. They are automating the wrong process. Here is what correct AI infrastructure looks like.',
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'AI Infrastructure',
    tags: [
      'AI infrastructure',
      'process audit',
      'AI implementation',
      'mid-market AI',
      'workflow automation',
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
      'Most organizations struggling with AI are not using the wrong model. They are automating the wrong process.',
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
  articleSection: 'AI Infrastructure',
  keywords:
    'AI infrastructure, process audit, AI implementation, mid-market AI, workflow automation',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'Blog',
    '@id': 'https://invisigent.ai/insights#blog',
    name: 'AI Infrastructure Insights',
    publisher: { '@type': 'Organization', name: 'Invisigent' },
  },
};

const h2Style = {
  fontSize: 'clamp(1.125rem, 2.5vw, 1.4rem)',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  marginBottom: '-0.25rem',
} as const;

const monoLabelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.625rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-trust-amber)',
  marginBottom: '0.3rem',
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
          { label: 'The Real Reason AI Infrastructure Projects Fail' },
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
            src="/blog-ai-tools-dont-work-small-businesses.png"
            alt="Operations team reviewing AI implementation failures in a mid-market company"
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
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}
          >
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
              AI Infrastructure
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
              }}
            >
              9 min read
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
              marginBottom: '1rem',
            }}
          >
            The Real Reason AI Infrastructure Projects Fail And It Has Nothing to Do With the
            Technology
          </h1>

          {/* Lead */}
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
              marginBottom: '2rem',
            }}
          >
            Most organizations that struggle with AI are not using the wrong model. They are
            automating the wrong process.
          </p>

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

            {/* Section 1 */}
            <h2 className="font-serif" style={h2Style}>
              The Pattern We See Before Every Failed AI Engagement
            </h2>

            <p>
              Before an organization contacts Invisigent, they have usually already tried something.
            </p>

            <p>
              A pilot project. An automation platform. An AI layer bolted onto an existing workflow.
              Sometimes multiple attempts across different tools and different teams. The technology
              worked technically. The business outcome did not materialize.
            </p>

            <p>
              When we audit these failed implementations, the cause is almost never the model, the
              vendor, or the budget. It is almost always the same structural mistake made before the
              first line of code was written.
            </p>

            <p className="font-serif" style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              They automated the wrong process.
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                margin: '0.5rem 0',
                padding: '1.25rem 1.5rem',
                background: 'rgba(251,191,36,0.04)',
                borderLeft: '3px solid var(--color-trust-amber)',
                borderRadius: '0 0.5rem 0.5rem 0',
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.175rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Deploying AI on a broken or misidentified process does not fix the process. It
                accelerates the failure and makes it harder to diagnose.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              How the Wrong Process Gets Automated
            </h2>

            <p>The sequence usually looks like this.</p>

            <p>
              Leadership identifies AI as a strategic priority. A tool or vendor is selected based
              on capability demonstrations. The implementation team connects the AI to the most
              visible or most requested workflow. Results disappoint. The conclusion drawn is that AI
              is not ready, the vendor was wrong, or the technology does not fit the business.
            </p>

            <p>
              What actually happened is that the process selected for automation was chosen based on
              visibility, not on operational fit. The AI was deployed before anyone asked the three
              questions that determine whether an automation will create value or create complexity.
            </p>

            {/* Section 3 — Three Questions */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Three Questions That Determine Whether an AI Implementation Will Succeed
            </h2>
          </div>

          {/* Three questions */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              margin: '1.5rem 0 2rem',
            }}
          >
            {[
              {
                num: '01',
                q: 'Does this process follow consistent, definable logic or does it depend on judgment that cannot be documented?',
                a: 'AI infrastructure handles repeatable, logic-driven workflows with high reliability. It handles ambiguous, judgment-intensive workflows poorly not because the technology is limited, but because no system can execute logic that has not been defined. If your team cannot write down exactly what they do and why in a given workflow, AI cannot replicate it. Process audit comes before architecture. Always.',
              },
              {
                num: '02',
                q: 'Where is the largest gap between when something happens and when your organization responds and what does that gap cost?',
                a: 'The highest-value automation targets are not the most visible workflows. They are the workflows where delay has a direct, measurable cost. An inbound enterprise lead sitting unrouted for four hours. An internal approval request waiting two days for a human to action it. A compliance document requiring manual retrieval from three systems. These gaps cost revenue, time, and competitive position and they are exactly the workflows AI infrastructure handles well.',
              },
              {
                num: '03',
                q: 'What happens to this problem if nothing changes for the next twelve months?',
                a: "If the answer is manageable, the automation priority is low. If the answer involves compounding operational cost, increasing team overhead, or growing competitive disadvantage that is the process worth building infrastructure around.",
              },
            ].map(({ num, q, a }) => (
              <div
                key={num}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: '3px solid var(--color-trust-amber)',
                  borderRadius: '0 0.5rem 0.5rem 0',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <div style={monoLabelStyle}>Question {num}</div>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.7vw, 1rem)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.45,
                    marginBottom: '0.625rem',
                  }}
                >
                  {q}
                </p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {a}
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
            <p>
              Organizations that skip these three questions before selecting a vendor or building a
              system consistently produce the same outcome a technically functional AI
              implementation that solves the wrong problem.
            </p>

            {/* Section 4 — Generic vs custom */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Why Generic AI Tools Produce Generic Results for Mid-Market Operations
            </h2>

            <p>
              Off-the-shelf AI tools are built to serve the broadest possible market. They cannot
              know your operational logic, your internal data, your compliance environment, or what a
              correct output looks like for your specific workflows.
            </p>

            <p>
              The result is AI that performs in demos and disappoints in production. Outputs that
              require manual review and correction. Automation that reduces some friction while
              introducing new failure points. A team that spends time managing the AI tool instead of
              benefiting from it.
            </p>

            <p>
              The mid-market organizations that see measurable operational improvement from AI are
              not using generic tools differently. They are using custom-built infrastructure
              designed specifically around their workflows, their data, and their operational
              environment.
            </p>
          </div>

          {/* Comparison table */}
          <div style={{ margin: '2rem 0', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
              }}
            >
              <thead>
                <tr>
                  {['Generic AI Tool', 'Custom AI Infrastructure'].map((heading, i) => (
                    <th
                      key={heading}
                      className="font-mono"
                      style={{
                        fontSize: '0.625rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: i === 0 ? 'var(--color-text-micro)' : 'var(--color-trust-amber)',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        background: 'var(--color-bg-card)',
                        fontWeight: 500,
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Built for millions of use cases', 'Built for your specific workflows'],
                  ['Trained on public data', 'Connected to your internal data and knowledge base'],
                  ['Outputs require human review', 'Workflows execute end-to-end autonomously'],
                  ['Maintained by the vendor', 'Owned and operated by your team'],
                  ['Replaced when the vendor pivots', 'Extended as your operations evolve'],
                ].map(([left, right], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td
                      className="font-serif"
                      style={{
                        padding: '0.75rem 1rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                        verticalAlign: 'top',
                      }}
                    >
                      {left}
                    </td>
                    <td
                      className="font-serif"
                      style={{
                        padding: '0.75rem 1rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                        verticalAlign: 'top',
                      }}
                    >
                      {right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

            {/* Section 5 — Process audit */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              What a Process Audit Looks Like Before an AI Infrastructure Build
            </h2>

            <p>
              Every Invisigent engagement begins with a discovery phase that functions as a
              structured process audit. Before any architecture is designed, we identify:
            </p>

            <ul
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                margin: '-0.5rem 0',
              }}
            >
              {[
                'Which workflows are genuine automation candidates repeatable logic, definable rules, measurable output quality, and a clear cost of failure if the automation produces incorrect results.',
                'Which workflows require human judgment that cannot yet be systematized and should remain with your team rather than being forced into an AI implementation prematurely.',
                'Where your internal data and knowledge assets are — documents, databases, past decisions, institutional knowledge and what retrieval infrastructure is needed to make them accessible to an AI system accurately and quickly.',
                'What your compliance environment requires GDPR, DPDP Act, EU AI Act, SOC2 so that governance architecture is built into the system from sprint one rather than retrofitted after a security review flags a problem.',
              ].map((item) => (
                <li key={item} style={{ color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>

            <p>
              The output of this phase is a documented architecture plan a clear build sequence,
              prioritized by operational impact, with defined success criteria for each component.
              This plan is delivered whether or not you proceed to a full system build.
            </p>

            {/* Section 6 — What works */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Infrastructure That Makes AI Actually Work in Operations
            </h2>

            <p>
              When the right processes are identified and the architecture is designed correctly, AI
              infrastructure produces outcomes that compound over time.
            </p>
          </div>

          {/* Infrastructure cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              margin: '1.5rem 0 2rem',
            }}
          >
            {[
              {
                label: 'Agentic workflow systems',
                body: 'Handle multi-step operational sequences autonomously receiving requests, classifying them, retrieving relevant context, executing defined logic, and escalating to humans only when judgment is genuinely required.',
              },
              {
                label: 'Knowledge retrieval systems',
                body: 'Connected to your actual internal documents, databases, and institutional knowledge delivering accurate, context-grounded responses in under three seconds rather than requiring a human to search across three systems manually.',
              },
              {
                label: 'Observability infrastructure',
                body: 'Logs every agent decision, every retrieval event, and every workflow execution so when a process needs review, you have a complete audit trail rather than a black box.',
              },
              {
                label: 'Compliance architecture',
                body: 'Designed into the system from the first sprint data residency controls, RBAC access management, and audit trail configuration aligned with the regulatory frameworks your operations are subject to.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: '3px solid var(--color-trust-amber)',
                  borderRadius: '0 0.5rem 0.5rem 0',
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={monoLabelStyle}>{label}</div>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {body}
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
            <p>
              This is not a larger version of an AI tool. It is a different category of system
              entirely one that runs operations rather than assisting individuals.
            </p>

            {/* Section 7 — Who gets value */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Who Gets Value From This — And Who Does Not
            </h2>

            <p>
              AI operations infrastructure is not the right solution for every organization at every
              stage.
            </p>

            <p>
              It produces the highest value for mid-market organizations where:
            </p>

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
                'Defined operational workflows are consuming team capacity that should be directed toward higher-value work',
                'Internal knowledge and data exist but are not accessible to the people and systems that need them',
                'Response time gaps between incoming requests and human action have a measurable cost to revenue or customer retention',
                'Compliance requirements mean that any AI system deployed must meet specific governance standards from the start',
              ].map((item) => (
                <li key={item} style={{ color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>

            <p>
              If your organization is still determining whether AI is relevant to your operations,
              the process audit is the right starting point not an infrastructure build.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(251,191,36,0.3), transparent)',
              margin: '3rem 0',
            }}
            aria-hidden
          />

          {/* ── FAQ ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                marginBottom: '1.5rem',
              }}
            >
              Frequently Asked Questions
            </div>

            {[
              {
                q: 'How do we know which processes in our organization are ready for AI infrastructure?',
                a: 'This is exactly what the discovery phase determines. The signals we look for are: workflows that follow consistent logic, workflows where delay has a measurable cost, and workflows where the volume is growing faster than your team can scale. If you have processes that meet those criteria, the discovery conversation will identify them and prioritize them by impact.',
              },
              {
                q: 'We are an Indian mid-market company. Are there specific compliance considerations we need to address?',
                a: "Yes. India's Digital Personal Data Protection Act 2023 applies to any AI system that processes personal data of Indian residents. This includes internal operational systems that handle employee data, customer records, or vendor information. Every system we build for Indian organizations includes DPDP-compliant architecture consent management, data fiduciary documentation, and purpose-limitation controls from sprint one.",
              },
              {
                q: 'We operate across India and the EU. Can one AI infrastructure system meet both DPDP and GDPR requirements?',
                a: 'Yes. We design systems with jurisdiction-specific data residency controls and consent architecture that meet both frameworks simultaneously. Cross-border mid-market organizations with Indian and EU operations are an increasingly common engagement for us and the architecture handles both without compromise.',
              },
              {
                q: 'Our previous AI implementation failed. Does that affect what we can build now?',
                a: 'Not negatively and often positively. A failed implementation tells us exactly where the process audit was skipped or where the wrong workflow was selected. We audit the previous implementation during discovery, identify what went wrong structurally, and design the new architecture to avoid the same failure points. Organizations that have already tried and failed often have the clearest picture of what they actually need.',
              },
              {
                q: 'How long does a process audit and architecture design engagement take?',
                a: 'Typically two to four weeks. The output is a documented architecture plan prioritized by operational impact, with defined build sequence and success criteria that your team can act on immediately with or without proceeding to a full system build with Invisigent.',
              },
            ].map(({ q, a }, i) => (
              <div
                key={i}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  padding: '1.25rem 0',
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.8vw, 1rem)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.45,
                    marginBottom: '0.625rem',
                  }}
                >
                  {q}
                </p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                    lineHeight: 1.75,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {a}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(251,191,36,0.3), transparent)',
              margin: '3rem 0',
            }}
            aria-hidden
          />

          {/* ── CTA block ── */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid rgba(251,191,36,0.15)',
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
              Book Your Architecture Review
            </p>
            <h3
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                maxWidth: '480px',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              The Conversation Worth Having
            </h3>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '440px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              30 minutes. We will identify your highest-impact automation opportunity and tell you
              honestly what it would take to build it correctly.
            </p>
            <Link
              href="/contact"
              className="btn-accent"
              style={{ textDecoration: 'none', marginTop: '0.5rem' }}
            >
              Book Your Architecture Review →
            </Link>
          </div>
        </article>
      </main>

      <InvisigentLogoSection />
      <FooterSection />
    </>
  );
}
