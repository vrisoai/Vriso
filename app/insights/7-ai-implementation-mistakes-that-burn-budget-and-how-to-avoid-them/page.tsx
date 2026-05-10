import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FooterSection, InvisigentLogoSection } from '@/app/components';
import Breadcrumb from '@/app/components/Breadcrumb';

const SLUG = '7-ai-implementation-mistakes-that-burn-budget-and-how-to-avoid-them';
const CANONICAL = `https://invisigent.ai/insights/${SLUG}`;
const OG_IMAGE = 'https://invisigent.ai/blog-ai-implementation-mistakes.png';
const PUBLISHED = '2026-05-04T10:00:00.000Z';
const TITLE =
  '7 AI Infrastructure Mistakes That Burn Budget — And How Mid-Market Organizations Avoid Them';
const DESCRIPTION =
  'Most AI failures are not model failures — they are architecture, ownership, and execution failures. Here are the seven most expensive mistakes mid-market organizations make when implementing AI infrastructure.';

export const metadata: Metadata = {
  title: `${TITLE} | Invisigent`,
  description: DESCRIPTION,
  keywords: [
    'AI implementation mistakes',
    'AI infrastructure budget',
    'AI guardrails production',
    'AI ROI mid-market',
    'AI system design',
    'AI governance ownership',
    'AI process automation',
    'AI data quality',
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
      'AI is not failing. Execution is. Here are the 7 most expensive mistakes mid-market organizations make when building AI infrastructure.',
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['https://invisigent.ai'],
    section: 'AI Infrastructure',
    tags: ['AI implementation', 'AI infrastructure', 'AI governance', 'mid-market AI', 'AI ROI'],
    images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: TITLE, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: TITLE,
    description:
      'AI is not failing. Execution is. Here are the 7 most expensive mistakes to avoid.',
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
};

const MISTAKES = [
  {
    n: '01',
    title: 'Deploying AI Into Production Without Guardrails',
    mistake:
      'AI is connected directly to live systems CRM updates, customer communications, pricing workflows, internal databases without structured safety controls. No input validation. No permission constraints. No human escalation pathway. No rollback capability.',
    why: 'Incorrect outbound communications at scale. Pricing errors impacting revenue. Data corruption across systems. Compliance exposure that triggers regulatory review. The cost of a single guardrail failure in a production system routinely exceeds the entire cost of the implementation that created it.',
    fix: 'Implement layered AI architecture with input validation, business rule constraints, structured output enforcement, full audit logging, and defined escalation pathways for edge cases. AI systems should operate within defined operational boundaries not override them. Guardrails are architecture, not afterthought.',
  },
  {
    n: '02',
    title: 'Automating a Broken Process',
    mistake:
      'AI is applied to chaotic workflows inconsistent intake pipelines, unclear operational handoffs, undocumented decision logic. The assumption is that AI will impose order on the chaos.',
    why: 'AI does not fix broken processes. It accelerates them. Flawed logic propagates faster. Drop-offs in revenue workflows increase. Operational confusion compounds at the speed of the automation.',
    fix: 'Before any implementation begins map the workflow end-to-end, identify friction points and decision bottlenecks, define measurable success criteria, and standardize the decision logic the AI will be executing. Clarity before code. Always.',
  },
  {
    n: '03',
    title: 'No Clear ROI Model',
    mistake:
      'AI initiatives launch without defined financial targets. Leadership approves the investment on the basis that AI is strategically necessary. Nobody defines which metric improves, by how much, or within what timeframe.',
    why: 'Scope creep. Endless experimentation. No defensible results when the budget review arrives. The initiative gets cut not because it failed technically but because nobody measured it correctly.',
    fix: 'Tie every AI infrastructure investment to a measurable business outcome revenue growth, cost reduction, time savings, or error reduction. Define baseline metrics before development begins. Track performance on a defined cadence. Optimize or terminate based on data, not on sunk cost.',
  },
  {
    n: '04',
    title: 'Tool Stacking Instead of System Design',
    mistake:
      'Multiple AI tools and automation platforms are layered on top of each other without a unified architectural design. Each tool solves a visible problem. Nobody designed the system those tools are supposed to constitute.',
    why: 'Data silos between tools. Redundant workflows running in parallel. Escalating subscription costs for overlapping capabilities. Integration failures at the points where tools need to communicate. A stack of tools is not a system.',
    fix: 'Design the system first data layer, orchestration layer, automation layer, interface layer, monitoring layer. Tools should serve the architecture. The architecture should not be defined by whichever tools were evaluated first.',
  },
  {
    n: '05',
    title: 'Ignoring Data Quality',
    mistake:
      'AI infrastructure is built on unstructured, inconsistent, or incomplete operational data. The model is capable. The data it is operating on is not.',
    why: 'Inaccurate decision outputs. Biased classification and scoring. Retrieval systems that return outdated or incorrect information. Leadership loses confidence in AI results and overrides the system manually eliminating the operational benefit entirely.',
    fix: 'Data quality is infrastructure, not a cleanup task. Standardize required data fields, clean historical records before they enter the system, assign data ownership to accountable individuals, and implement validation rules at the point of entry. The quality of your AI output is determined by the quality of your data input. There is no architectural workaround for this.',
  },
  {
    n: '06',
    title: 'Treating AI Infrastructure as a One-Time Project',
    mistake:
      'AI systems are built as static deployments. Launched. Handed over. Considered complete. No iteration cycle. No performance monitoring. No version discipline.',
    why: 'Performance drift as operational conditions change. Reduced accuracy as the data the system was trained or calibrated on diverges from current reality. Increasing manual overrides as the team loses confidence in outputs. The system that worked at launch quietly stops working and nobody notices until the cost is significant.',
    fix: 'Build structured iteration cycles into the engagement from the start. Define performance baselines at deployment. Monitor against those baselines on a regular cadence. Treat AI infrastructure the way you treat any other critical operational infrastructure not as a project with a completion date but as a system with an operational lifecycle.',
  },
  {
    n: '07',
    title: 'No Clear Ownership',
    mistake:
      'No single accountable owner is assigned to the AI system after deployment. The engineering team assumes operations owns it. Operations assumes IT manages it. Leadership assumes it is working. Nobody is monitoring. Nobody is optimizing. Nobody is catching the slow decline.',
    why: 'No monitoring means no early warning. No optimization means performance drift goes unaddressed. Slow response to failures means small problems become expensive ones. The system that was built to reduce operational overhead becomes operational overhead itself.',
    fix: 'Assign a directly responsible owner before deployment not after. Define performance KPIs they are accountable for. Schedule structured monthly reviews. Establish escalation protocols for defined failure conditions. Every production AI system requires governance. The leaner the team, the more important it is that governance is explicit rather than assumed.',
  },
];

const WINNING_PATTERNS = [
  'Outcomes defined and measured before tools are selected',
  'Workflow clarity established before automation is designed',
  'System architecture designed before development begins',
  'Guardrails embedded at every layer of the orchestration stack',
  'ROI tracked against defined baselines from deployment day one',
  'Iteration cycles built into the operational model from the start',
  'Clear ownership assigned before handoff, not after failure',
];

const PRE_INVESTMENT_QUESTIONS = [
  'Which specific operational metric does this initiative improve and by how much?',
  'Is the workflow being automated documented and consistent enough for AI to execute reliably?',
  'Are architectural guardrails defined and who is responsible for maintaining them?',
  'Is there a measurable ROI model and a defined review cadence?',
  'Who owns the system after deployment by name, not by department?',
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
  articleSection: 'AI Infrastructure',
  keywords:
    'AI implementation mistakes, AI infrastructure, AI ROI, AI governance, mid-market AI strategy',
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
          { label: '7 AI Infrastructure Mistakes That Burn Budget' },
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
            alt="Operations leader reviewing failed AI infrastructure investments on a dashboard"
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
            7 AI Infrastructure Mistakes That Burn Budget And How Mid-Market Organizations Avoid
            Them
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
            AI is not failing. Execution is.
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
            <h2 className="font-serif" style={h2Style}>
              The Pattern Behind Failed AI Investments
            </h2>

            <p>
              Over the past eighteen months, mid-market organizations across B2B industries — from
              scaling operators to established enterprises moved aggressively to implement AI.
            </p>

            <p>The results have been uneven.</p>

            <ul
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              {[
                'Disconnected tools that do not integrate with existing operations',
                'Automations that work in demo conditions and fail under real load',
                'No measurable ROI to present at budget review',
                'Teams that abandon systems within ninety days',
                'Quiet budget bleed that erodes leadership confidence in AI as a strategic investment',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>
              The problem is not the models. The models are capable. The problem is architecture,
              ownership, and execution discipline and seven specific mistakes that appear
              consistently in failed implementations.
            </p>

            <p>
              If you are a COO, CTO, or operations leader investing in AI infrastructure, these are
              the mistakes worth understanding before the next build begins.
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
                      What happens:
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
                      background: 'rgba(251,191,36,0.04)',
                      border: '1px solid rgba(251,191,36,0.12)',
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
                        color: 'var(--color-trust-amber)',
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

          {/* The pattern section */}
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
              The Pattern Behind Every Failed Implementation
            </h2>

            <p>
              Most organizations treat AI like a feature addition. The organizations that generate
              durable operational value from AI treat it like infrastructure.
            </p>

            <p>
              Infrastructure is designed before it is built. It is monitored after it is deployed.
              It is owned by someone accountable. It is iterated on a schedule. It is documented so
              that the people operating it understand how it works.
            </p>

            <p>
              Feature additions are deployed and forgotten. Infrastructure is managed.
            </p>

            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              What Successful AI Infrastructure Implementation Looks Like
            </h2>

            <p>
              The mid-market organizations generating measurable, compounding value from AI
              infrastructure share a consistent pattern:
            </p>
          </div>

          {/* Winning patterns */}
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
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: '2px solid var(--color-trust-amber)',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{ color: 'var(--color-trust-amber)', flexShrink: 0, marginTop: '0.1rem' }}
                >
                  ✓
                </span>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
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
                AI infrastructure is not a shortcut. It is disciplined systems design applied to
                operational workflows. Organizations that treat it as such build compounding
                advantage. Organizations that treat it as a feature launch burn budget and conclude
                that AI does not work.
              </p>
            </blockquote>

            <h2 className="font-serif" style={{ ...h2Style, marginTop: '0.5rem' }}>
              The Questions Worth Asking Before Your Next AI Investment
            </h2>

            <p>
              Before committing budget to an AI infrastructure build, the answers to these questions
              should be clear:
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
              {PRE_INVESTMENT_QUESTIONS.map((q) => (
                <li key={q} style={{ color: 'var(--color-text-secondary)' }}>
                  {q}
                </li>
              ))}
            </ul>

            <p>
              If any of these answers are unclear, the initiative has structural exposure before it
              begins.
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
                q: 'We are an Indian mid-market company planning our first AI infrastructure build. Where do these mistakes typically appear first?',
                a: 'In our experience with Indian mid-market organizations, Mistakes 02 and 05 appear most frequently and earliest. Workflows that appear consistent often have undocumented exception handling that the AI cannot execute correctly. And data quality particularly in organizations that have grown quickly is rarely as clean as the implementation team assumes. Starting with a structured process audit and a data quality review before architecture design eliminates both risks before they become expensive.',
              },
              {
                q: 'Our operations span India and the EU. Does AI infrastructure compliance add significant complexity?',
                a: "It adds complexity that is entirely manageable when addressed at the architecture stage and significant complexity when addressed at the deployment stage. GDPR for EU data subjects and India's DPDP Act 2023 for Indian personal data have overlapping requirements around consent, data residency, and audit trails. Systems designed with jurisdiction-specific controls from sprint one meet both frameworks without architectural compromise. Systems retrofitted for compliance after deployment routinely require significant rebuilds.",
              },
              {
                q: 'We have already made some of these mistakes. Is it worth rebuilding or should we extend what we have?',
                a: 'This depends on which mistakes were made and how deeply they are embedded in the current architecture. Mistakes 01, 04, and 07 missing guardrails, tool stacking without system design, and absent ownership are often addressable through structured remediation without a full rebuild. Mistakes 02 and 05 — broken process automation and poor data quality — typically require going back to the process audit and data layer before extending the system. An architecture review conducted before a rebuild decision is almost always worth the investment.',
              },
              {
                q: 'How do we establish ROI baselines if we have never run AI infrastructure before?',
                a: 'Start with the operational metric most directly affected by the workflow being automated response time, processing volume, error rate, or team hours consumed. Document the current baseline manually before implementation begins. Define what improvement looks like at thirty, sixty, and ninety days post-deployment. The specific numbers matter less than the discipline of measuring against a defined baseline from day one. Without a baseline, you cannot demonstrate improvement and you cannot defend the investment at the next budget review.',
              },
              {
                q: 'What does clear ownership look like in a lean mid-market team without dedicated AI staff?',
                a: 'Ownership does not require an AI specialist. It requires a designated person who understands the system well enough to recognize when it is performing correctly and when it is not. Every system we deliver includes operational documentation and monitoring access designed for the team that will actually run it — not for the engineers who built it. If your team can manage a modern SaaS platform, they have the capability to own what we build. We scope the handoff during discovery so the ownership model is clear before deployment.',
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
                maxWidth: '500px',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Before Your Next AI Infrastructure Decision
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
              30 minutes. We will assess your current AI infrastructure position and identify your
              highest-risk exposure points before your next investment decision.
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
