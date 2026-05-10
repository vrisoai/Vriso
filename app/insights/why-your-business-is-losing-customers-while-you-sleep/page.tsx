import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL =
  'https://invisigent.ai/insights/why-your-business-is-losing-customers-while-you-sleep';
const OG_IMAGE = 'https://invisigent.ai/blog-losing-customers-while-you-sleep.png';
const PUBLISHED = '2026-04-23T08:00:00.000Z';
const TITLE =
  'Why Mid-Market Companies Lose Revenue to Slow Internal Operations And How AI Infrastructure Fixes It Permanently';
const DESCRIPTION =
  'Revenue is leaking through the gap between what your operations team can handle manually and what your business demands. Learn how AI infrastructure not AI tools closes that gap permanently.';

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'AI infrastructure for mid-market',
    'operations automation AI',
    'AI workflow automation',
    'mid-market AI systems',
    'production AI infrastructure',
    'AI operations efficiency',
    'LangGraph multi-agent systems',
    'RAG knowledge retrieval',
    'GDPR DPDP AI compliance',
    'Invisigent AI',
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
      'Revenue is leaking through the gap between what your operations team can handle and what your business demands. AI infrastructure closes it permanently.',
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'AI Infrastructure',
    tags: [
      'AI infrastructure',
      'operations automation',
      'multi-agent systems',
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
      'Revenue is leaking through the gap between what your operations team can handle and what your business demands. AI infrastructure closes it permanently.',
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
    'AI infrastructure, operations automation, multi-agent systems, mid-market AI, workflow automation',
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
          { label: 'Why Mid-Market Companies Lose Revenue to Slow Internal Operations' },
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
            src="/blog-losing-customers-while-you-sleep.png"
            alt="Mid-market operations team managing high-volume manual workflows"
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
              10 min read
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
            Why Mid-Market Companies Lose Revenue to Slow Internal Operations And How AI
            Infrastructure Fixes It Permanently
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
            The problem is not that your team is slow. It is that your operations were never designed
            to run without them.
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

          {/* ── Body copy ── */}
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
              The Revenue Leak Nobody Tracks
            </h2>

            <p>Most mid-market companies have the same invisible problem.</p>

            <p>
              Revenue is leaking not through bad products, not through weak sales, and not through
              pricing. It is leaking through the gap between what your operations team can handle
              manually and what your business actually demands from them every day.
            </p>

            <p>
              Nobody sends you an invoice for this loss. The delayed proposal just arrives too late.
              The qualified lead gets a response two days after they needed one. The internal request
              sits in a queue while three people wait for someone to action it. The customer never
              complains they just go somewhere else.
            </p>

            <p>
              This is not a people problem. Your team is not failing. They are operating exactly as
              the system was designed and the system was designed before AI infrastructure existed
              as an option.
            </p>

            {/* Section 2 */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              What Is Actually Happening Inside Your Operations
            </h2>

            <p>
              Here is the pattern we see consistently across mid-market companies: your operations
              team is spending a significant portion of their working week on workflows that follow
              predictable, repeatable logic. Request comes in. Someone reads it. Someone routes it.
              Someone retrieves information from three different systems. Someone compiles a response.
              Someone sends it.
            </p>

            <p>
              Every step in that sequence requires a human only because no infrastructure exists to
              run it without one.
            </p>

            <p>
              Meanwhile your business is generating more volume more leads, more internal requests,
              more customer queries, more data that needs to move between systems and your response
              is to hire more people to do the same repeatable work at higher cost.
            </p>

            <p>The compounding effect is significant:</p>

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
                'Response times slow as volume increases faster than headcount',
                'Error rates rise as manual processes handle more edge cases',
                'Team capacity for high-value work shrinks as operational overhead grows',
                'Competitive positioning weakens against organizations that have already automated what you are still doing manually',
              ].map((item) => (
                <li key={item} style={{ color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>

            {/* Section 3 */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Difference Between AI Tools and AI Infrastructure
            </h2>

            <p>
              Most mid-market companies have already tried to solve this. They have added AI tools
              a ChatGPT subscription here, an automation platform there, a chatbot bolted onto the
              website. The tools work in isolation. The problem persists.
            </p>

            <p>The reason is structural.</p>

            <p>
              AI tools generate outputs. AI infrastructure runs operations. These are not the same
              thing and they do not solve the same problem.
            </p>

            <p>
              An AI tool can draft an email. AI infrastructure can receive an inbound request,
              classify it, retrieve relevant context from your internal knowledge base, route it to
              the correct team member with full context attached, and log every step for audit review
              — autonomously, at any hour, under any volume.
            </p>

            <p>The difference is not the model. It is the architecture underneath it.</p>

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
                Organizations that win the next five years of operational efficiency are not the ones
                with the best AI tools. They are the ones with AI embedded deeply enough into their
                infrastructure that it runs operations not just assists them.
              </p>
            </blockquote>

            {/* Section 4 — Before / After */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              What This Looks Like in Practice
            </h2>

            <p>
              A mid-market operations team running AI infrastructure built by Invisigent looks
              structurally different from one running without it.
            </p>
          </div>

          {/* Before / After grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              margin: '2rem 0',
            }}
          >
            {/* Before */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: '2px solid rgba(255,255,255,0.15)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
              }}
            >
              <div style={monoLabelStyle}>Before</div>
              <ul
                className="font-serif"
                style={{
                  paddingLeft: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {[
                  'Manual triage of inbound requests across multiple channels',
                  'Human-dependent routing based on whoever is available',
                  'Knowledge retrieval scattered across documents, inboxes, and institutional memory',
                  'Response times measured in hours or days',
                  'Operations capacity as a hard ceiling on growth',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid rgba(251,191,36,0.12)',
                borderTop: '2px solid var(--color-trust-amber)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
              }}
            >
              <div style={monoLabelStyle}>After</div>
              <ul
                className="font-serif"
                style={{
                  paddingLeft: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {[
                  'Inbound requests classified and routed autonomously by an agent system that understands your operational logic',
                  'Internal knowledge retrieved in under three seconds from a RAG pipeline connected to your actual documents and databases',
                  'Repeatable workflows executed end-to-end without human involvement',
                  'Escalations handled with full context attached the agent passes the human everything they need to act immediately',
                  'Operations capacity that scales with volume, not headcount',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
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
              None of this requires replacing your team. It requires building the infrastructure
              layer that handles what should never have needed a human in the first place.
            </p>

            {/* Section 5 — Architecture */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Architecture Behind Reliable AI Operations
            </h2>

            <p>
              The reason most AI automation attempts fail in mid-market companies is not the AI. It
              is the absence of production-grade infrastructure underneath it.
            </p>

            <p>
              Systems built without proper architecture fail quietly. An agent misclassifies a
              request and nobody notices. A retrieval pipeline returns stale data and the response is
              wrong. A workflow runs correctly 90% of the time and breaks on the 10% that matters
              most.
            </p>

            <p>Production AI infrastructure is built differently from the start:</p>
          </div>

          {/* Architecture cards */}
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
                label: 'Orchestration layer',
                body: 'Multi-agent systems with defined supervisor logic, specialist subagents, and state management that handles complex, multi-step workflows without losing context between steps.',
              },
              {
                label: 'Knowledge layer',
                body: 'RAG pipelines connected to your actual internal documents, databases, and knowledge bases not a generic model answering from training data. Sub-three-second retrieval. Accurate, grounded responses.',
              },
              {
                label: 'Observability layer',
                body: 'Every agent decision logged and replayable. Every retrieval event traced. Every workflow step auditable. When something needs review, you have a complete record not a black box.',
              },
              {
                label: 'Compliance layer',
                body: 'RBAC access controls, audit trails, and data residency configurations built in from sprint one not reviewed at deployment when it is too late to redesign.',
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
              This is the infrastructure your operations run on. Built once. Owned by your team. No
              ongoing dependency on the agency that built it.
            </p>

            {/* Section 6 — Ownership */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Why Ownership Matters More Than the Technology
            </h2>

            <p>
              The most important question to ask any AI agency is not what they build. It is what
              you own when they leave.
            </p>

            <p>
              Most AI implementations create a new dependency. The system runs. The agency maintains
              it. If they raise prices, change their platform, or disappear — your operations stop
              working.
            </p>

            <p>
              Invisigent builds model-agnostic infrastructure your team owns and operates. Every
              system ships with full documentation, operational runbooks, monitoring access, and the
              architectural knowledge your engineering team needs to extend it. The infrastructure is
              yours permanently not held together by an external team you cannot afford to lose.
            </p>

            <p>
              This matters operationally. If your AI infrastructure is a dependency, it is a
              liability. If it is owned infrastructure, it is a competitive asset.
            </p>

            {/* Section 7 — Who this is for */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Who This Is For
            </h2>

            <p>This is not the right solution for every organization.</p>

            <p>
              AI operations infrastructure makes sense when your team is spending meaningful time on
              workflows that follow repeatable logic and when that time is limiting your capacity to
              grow. If you are still exploring whether AI is relevant to your business, this is not
              where you start.
            </p>

            <p>It makes sense when:</p>

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
                'You have defined operational workflows that are volume-constrained by human capacity',
                'You have internal data, documents, or knowledge that AI should be retrieving but currently requires a human to find',
                'You have compliance or security requirements that need to be designed into any system from the start',
                'You have a team ready to own and operate infrastructure after it is delivered',
              ].map((item) => (
                <li key={item} style={{ color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>

            <p>
              If that describes your organization, the conversation is worth having.
            </p>

            {/* Section 8 — Closing */}
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Conversation That Changes the Operation
            </h2>

            <p>
              Invisigent works with a limited number of organizations each quarter by design. Every
              engagement is handled directly at the senior level, from the first architecture review
              through production deployment.
            </p>

            <p>
              If you are ready to move from AI experiments to AI infrastructure that runs your
              operations book a 30-minute architecture review. No pitch. No obligation. An honest
              assessment of where your operations stand and what it would take to build the
              infrastructure layer your business should already have.
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
                q: 'Does AI infrastructure work for companies that are not in the technology industry?',
                a: 'Yes and some of the highest-impact deployments are in non-tech industries precisely because the operational workflows are more manual. Professional services, logistics, financial services, healthcare operations, and manufacturing all have repeatable internal workflows that AI infrastructure handles well. The technology is industry-agnostic. The architecture is designed around your specific operational environment.',
              },
              {
                q: 'We are based in India. Does this apply to our compliance requirements?',
                a: "Yes. Every system we build for Indian organizations is designed to meet India's Digital Personal Data Protection Act 2023. Consent management architecture, data fiduciary obligations, and purpose-limitation controls are built into the system from the first sprint — not reviewed after deployment. If you are an Indian mid-market company deploying AI that handles personal data, DPDP compliance is not optional and it is not an add-on.",
              },
              {
                q: 'We operate across both EU and Indian markets. Can one system cover both compliance frameworks?',
                a: 'Yes and this is increasingly common for mid-market companies with cross-border operations. We design systems that meet GDPR requirements for EU data subjects and DPDP Act requirements for Indian data simultaneously. Data residency controls, consent architecture, and audit trails are configured per jurisdiction at the infrastructure layer so one system handles both without architectural compromise.',
              },
              {
                q: 'What if our team does not have the technical capacity to run AI infrastructure after it is delivered?',
                a: 'This is addressed during discovery before a line of code is written. Every system we deliver includes full operational documentation, monitoring access, and runbooks written for the team that will actually run it not for the engineers who built it. If your team can manage a modern SaaS platform, they can operate what we build. We scope the handoff complexity during discovery so there are no surprises at deployment.',
              },
              {
                q: 'How is this different from the AI automation tools we have already tried?',
                a: 'AI tools generate outputs. AI infrastructure runs operations. The difference is architectural. Tools like off-the-shelf automation platforms connect existing software with predefined logic. What we build is a custom orchestration layer designed around your specific workflows, your internal data, and your compliance environment with full observability, failure handling, and production-grade reliability built in. If your current tools are working, we will tell you. If they are creating a ceiling on what your operations can do, that is the conversation worth having.',
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
              The Right System. Built Once. Owned Forever.
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
              30 minutes. Direct conversation. We will tell you honestly whether this is the right
              fit.
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
