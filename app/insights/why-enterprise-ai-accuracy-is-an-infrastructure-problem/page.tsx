import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const SLUG = 'why-enterprise-ai-accuracy-is-an-infrastructure-problem';
const CANONICAL = `https://invisigent.ai/insights/${SLUG}`;
const OG_IMAGE = 'https://invisigent.ai/blog-ai-accuracy-infrastructure.svg';
const PUBLISHED = '2026-05-12T10:00:00.000Z';
const TITLE =
  'Why Enterprise AI Accuracy Is an Infrastructure Problem Not a Model Problem';
const DESCRIPTION =
  'Most organizations debugging AI accuracy problems are looking in the wrong place. They audit the model. They adjust the prompt. They switch providers. The accuracy problem persists because it was never a model problem.';

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'enterprise AI accuracy',
    'AI retrieval architecture',
    'RAG accuracy production',
    'AI guardrail design',
    'AI observability infrastructure',
    'AI data quality',
    'AI output accuracy',
    'EU AI Act compliance',
    'DPDP AI accuracy',
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
      'AI accuracy failures are infrastructure failures. The four layers that actually determine enterprise AI output accuracy — and why fixing the model never solves them.',
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'AI Infrastructure',
    tags: [
      'AI accuracy',
      'retrieval architecture',
      'AI guardrails',
      'AI observability',
      'enterprise AI infrastructure',
    ],
    images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: TITLE, type: 'image/svg+xml' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description:
      'AI accuracy failures are infrastructure failures. The four layers that actually determine enterprise AI output accuracy.',
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
};

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
  articleSection: 'AI Infrastructure',
  keywords:
    'enterprise AI accuracy, retrieval architecture, AI guardrails, AI observability, data quality, RAG, EU AI Act, DPDP',
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

const LAYERS = [
  {
    n: '01',
    title: 'Retrieval Architecture',
    body: 'For any AI system that operates on organizational knowledge, the accuracy of the output is determined primarily by the accuracy of the retrieval that precedes it. The model generates responses based on the context it receives. If the context is wrong, incomplete, outdated, or retrieved from the wrong source, the output will reflect those failures regardless of how capable the underlying model is. Switching from one frontier model to another does not fix a retrieval architecture problem.',
    failures: [
      'Chunking strategy mismatch — documents split at arbitrary character limits rather than semantic boundaries',
      'Absence of reranking — basic vector similarity retrieval returns semantically proximate results, not the most relevant ones for a specific query intent',
      'Missing hybrid search — pure vector search fails on exact-term queries; pure keyword search fails on conceptual queries',
      'No retrieval trace logging — without visibility into what was retrieved, accuracy failures cannot be diagnosed',
    ],
  },
  {
    n: '02',
    title: 'Data Quality',
    body: 'Retrieval architecture can only surface what exists in the data it is connected to. If that data is incomplete, inconsistent, outdated, or structured in ways the retrieval system cannot process accurately, no retrieval architecture improvement compensates for it.',
    failures: [
      'Stale knowledge bases — documents accurate at indexing that have since been superseded by updated policies, pricing, or operational decisions',
      'Inconsistent terminology across sources — the same concept described with different language in different documents, causing retrieval gaps',
      'Unstructured data without preprocessing — raw documents ingested without cleaning, normalization, or metadata tagging',
      'No data ownership or update discipline — knowledge bases treated as static deployments with no process for flagging outdated content',
    ],
  },
  {
    n: '03',
    title: 'Guardrail Design',
    body: 'Accuracy is not only about generating correct outputs. It is about detecting, containing, and managing incorrect outputs before they reach users, customers, or downstream systems. Production AI systems will encounter inputs they cannot handle reliably. Without guardrail architecture, the system generates a confident incorrect output or a vague non-answer  neither acceptable in a production operational context.',
    failures: [
      'No confidence thresholds — low-confidence responses delivered to users without escalation or fallback routing',
      'Missing input validation — queries outside operational scope passed through the pipeline rather than handled at the boundary',
      'Absent output validation — generated responses delivered without constraint checking against known ground truth or business rules',
      'Escalation pathways without context — when a query escalates, the reviewer lacks the full retrieval context needed to respond correctly',
    ],
  },
  {
    n: '04',
    title: 'Observability Infrastructure',
    body: 'Organizations cannot improve accuracy they cannot measure. Without observability infrastructure, accuracy degradation is invisible until it has already caused significant operational or reputational damage. The system that was accurate at deployment drifts silently as data becomes stale, query distributions shift, and operational conditions change.',
    failures: [
      'No retrieval trace logging — retrieval failures indistinguishable from generation failures without trace data',
      'No accuracy baseline — drift has no reference point; degradation is only visible after users notice',
      'Missing agent decision logging — in multi-agent systems, the failure point in a broken workflow is untraceable',
      'No feedback loop infrastructure — output quality signals from the operational environment are not captured or reviewed',
    ],
  },
];

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
          { label: 'Why Enterprise AI Accuracy Is an Infrastructure Problem' },
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
            src="/blog-ai-accuracy-infrastructure.svg"
            alt="Four-layer AI accuracy infrastructure stack showing retrieval architecture, data quality, guardrail design, and observability"
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
              12 min read
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
            Why Enterprise AI Accuracy Is an Infrastructure Problem Not a Model Problem
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
            Most organizations debugging AI accuracy problems are looking in the wrong place.
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
            <h2 className="font-serif" style={h2Style}>
              The Assumption That Sends Every Debugging Effort in the Wrong Direction
            </h2>

            <p>
              When an enterprise AI system produces inaccurate outputs wrong answers, hallucinated
              facts, misclassified requests, incorrect retrievals the instinctive response follows
              a predictable sequence.
            </p>

            <p>
              The prompt gets adjusted. The model gets evaluated against alternatives. The vendor
              gets a support ticket. A more expensive model tier gets approved. The outputs improve
              slightly, then regress. The cycle repeats.
            </p>

            <p>
              Months pass. Budget is spent. The accuracy problem remains structurally unsolved
              because every intervention targeted the model and the model was never the primary
              variable.
            </p>

            <p>
              Enterprise AI accuracy is determined by the infrastructure underneath the model. The
              retrieval architecture that decides what context the model has access to. The data
              quality that determines whether that context is accurate and current. The guardrail
              design that contains incorrect outputs before they reach users or downstream systems.
              The observability infrastructure that determines whether the organization can even
              detect when accuracy has degraded.
            </p>

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
                Organizations that build these four layers correctly produce AI systems whose
                accuracy improves over time. Organizations that skip them produce AI systems whose
                accuracy is unknowable, unimprovable, and eventually abandoned.
              </p>
            </blockquote>

            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Four Layers That Actually Determine Enterprise AI Output Accuracy
            </h2>
          </div>

          {/* Four Layer Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              margin: '2rem 0',
            }}
          >
            {LAYERS.map(({ n, title, body, failures }) => (
              <div
                key={n}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid rgba(255,255,255,0.07)',
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
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
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
                    {body}
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
                        marginBottom: '0.6rem',
                      }}
                    >
                      Common failure modes in production
                    </p>
                    <ul
                      className="font-serif"
                      style={{
                        paddingLeft: '1.1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                        fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {failures.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              Why Most Enterprise AI Implementations Skip These Layers
            </h2>

            <p>
              Most AI implementations are scoped as delivery projects with a defined completion
              point. Architecture is designed to get the system to launch. The launch date is the
              success metric. Post-launch performance is assumed to be the responsibility of the
              team that received the handover.
            </p>

            <p>
              This project framing is fundamentally incompatible with production AI infrastructure.
              Production AI systems are operational assets, not delivered projects. They require the
              same ongoing governance, monitoring, and iteration discipline as any other critical
              operational infrastructure.
            </p>

            <p>
              The layers described above retrieval architecture, data quality, guardrail design,
              and observability are not features that can be added after launch. They are
              architectural decisions that must be made before development begins. Retrofitting them
              into a system built without them typically costs more than building them correctly
              from the start.
            </p>

            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              What Production AI Accuracy Infrastructure Looks Like
            </h2>

            <p>
              A production AI system built with all four layers operating correctly looks
              structurally different from one built without them.
            </p>
          </div>

          {/* Architecture state cards */}
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
                label: 'At the retrieval layer',
                body: 'Documents are chunked at semantic boundaries. Hybrid search combines vector similarity with keyword precision. A reranking layer scores retrieved context against query intent before it reaches the model. Every retrieval event is logged with full trace data.',
              },
              {
                label: 'At the data layer',
                body: 'Knowledge bases have defined owners. Update processes are documented and followed. Data freshness is monitored. Preprocessing pipelines normalize documents before indexing. Metadata tagging enables filtered retrieval that surfaces the right sources for the right query types.',
              },
              {
                label: 'At the guardrail layer',
                body: 'Confidence thresholds are defined and tested against representative query distributions. Fallback behaviors are documented and validated. Output validation runs before delivery. Escalation pathways preserve full context and route to the right human reviewer.',
              },
              {
                label: 'At the observability layer',
                body: 'Accuracy baselines are established at deployment. Drift detection runs continuously. Agent decisions are logged and replayable. Feedback signals from the operational environment are captured and reviewed on a defined cadence.',
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
              This is the infrastructure that makes enterprise AI accuracy a manageable operational
              variable rather than an unknowable one.
            </p>

            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Compliance Dimension of AI Output Accuracy
            </h2>

            <p>
              For organizations operating in regulated industries or across jurisdictions with AI
              governance requirements, output accuracy is not only an operational concern. It is a
              compliance obligation.
            </p>
          </div>

          {/* Compliance cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '0.75rem',
              margin: '1.5rem 0 2rem',
            }}
          >
            {[
              {
                label: 'EU AI Act',
                body: 'High-risk AI systems are subject to accuracy, robustness, and transparency requirements. Organizations deploying AI in high-risk categories must demonstrate that accuracy has been assessed, monitored, and maintained. Observability infrastructure is a regulatory requirement, not optional.',
              },
              {
                label: 'GDPR',
                body: 'AI systems that process personal data and produce outputs that affect individuals are subject to accuracy obligations under Article 5. Inaccurate outputs that affect data subjects create compliance exposure. Demonstrating accuracy monitoring is a material consideration.',
              },
              {
                label: "India's DPDP Act 2023",
                body: 'The Digital Personal Data Protection Act establishes obligations around the accuracy of personal data processed by data fiduciaries. AI systems processing Indian personal data inherit these accuracy obligations and require monitoring architecture demonstrable on audit.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: '2px solid var(--color-trust-amber)',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                }}
              >
                <div style={monoLabelStyle}>{label}</div>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {body}
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
                q: 'Our AI system was accurate at launch and has degraded over time. What is most likely causing this?',
                a: 'The most common cause of accuracy degradation over time is data staleness combined with query distribution shift. The knowledge base that was accurate at indexing has not been updated as operational reality has changed. Simultaneously the queries the system receives have evolved as users have learned how to interact with it and edge cases that were rare at launch are now more frequent. An accuracy audit that examines retrieval trace logs against current query distributions will typically identify both patterns quickly. The fix is usually a combination of knowledge base refresh and retrieval architecture adjustment rather than model replacement.',
              },
              {
                q: 'We are an Indian mid-market organization. How does the DPDP Act affect our AI accuracy obligations?',
                a: "India's Digital Personal Data Protection Act 2023 establishes accuracy as a principle for personal data processing. If your AI system processes personal data of Indian residents and produces outputs based on that data recommendations, classifications, responses, routing decisions the accuracy of those outputs is subject to DPDP obligations. Practically this means you need monitoring infrastructure that can demonstrate outputs based on personal data are accurate and that inaccurate outputs are detected and corrected. Every system we build for Indian organizations includes this infrastructure as standard.",
              },
              {
                q: 'We operate across India and the EU. Does accuracy infrastructure need to be different for each jurisdiction?',
                a: 'The underlying accuracy infrastructure retrieval architecture, data quality, guardrails, observability is the same across jurisdictions. What differs is the compliance documentation and the specific thresholds that trigger escalation or human review. EU AI Act high-risk requirements and GDPR accuracy obligations have specific documentation requirements that DPDP does not have in the same form, and vice versa. We design the accuracy infrastructure once and configure the compliance layer per jurisdiction so one system meets both frameworks without architectural duplication.',
              },
              {
                q: 'How do we establish accuracy baselines if we have never measured AI output accuracy before?',
                a: 'Start with a representative sample of queries drawn from your actual operational environment not test queries designed to produce correct outputs. Run those queries through the system. Have subject matter experts evaluate the outputs against ground truth. Document the accuracy rate per query category. This becomes your baseline. From deployment forward, automated monitoring compares current accuracy rates against those baselines and flags statistical deviation. The specific baseline number matters less than the discipline of measuring against a consistent reference point from the beginning.',
              },
              {
                q: 'Is it possible to add these accuracy infrastructure layers to a system that was already built without them?',
                a: 'Yes but the cost and complexity depend significantly on which layers are missing and how deeply the existing architecture would need to change to accommodate them. Missing observability infrastructure is typically the most straightforward to add. Missing guardrail design can usually be implemented at the orchestration layer without rebuilding the underlying system. Missing retrieval architecture improvements hybrid search, reranking, semantic chunking typically require rebuilding the retrieval pipeline, which is a significant but contained intervention. Poor data quality requires the most fundamental remediation because it affects every layer above it. An architecture audit conducted before any remediation work begins is the fastest way to determine what is actually missing and what the correct sequence of fixes should be.',
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
              Building AI Infrastructure That Is Accurate by Design
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
              Accuracy Built In. Measured. Maintained.
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
              Every engagement begins with a structured architecture review that assesses all four
              accuracy layers before development begins. Invisigent works with a limited number of
              organizations each quarter every engagement handled directly at the senior level.
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
