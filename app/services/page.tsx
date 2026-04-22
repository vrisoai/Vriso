import type { Metadata } from 'next';
import ServicesPageClient from './services-page-client';
import Breadcrumb from '@/app/components/Breadcrumb';

const CANONICAL = 'https://invisigent.ai/services';
const OG_IMAGE = 'https://invisigent.ai/og-image.png';

export const metadata: Metadata = {
  title: 'Services — Enterprise AI Infrastructure & Agent Orchestration',
  description:
    'Enterprise AI infrastructure consulting: LangGraph agent orchestration, Pinecone RAG systems, LangSmith monitoring, AI automation with n8n & FastAPI, and compliance-ready AI for GDPR, EU AI Act, and DPDP regulated organizations.',
  keywords: [
    'Enterprise AI Infrastructure Services',
    'LangGraph Agent Orchestration',
    'Pinecone RAG Systems',
    'AI Automation Consulting',
    'LangSmith Monitoring',
    'FastAPI AI Backend',
    'Multi-Agent Systems',
    'GDPR Compliant AI',
    'EU AI Act Consulting',
    'DPDP Compliance',
    'ISO 42001 AI Management',
    'SOC2 AI Systems',
    'AI Strategy Consulting',
    'Enterprise Knowledge Retrieval',
    'AI consulting India',
    'AI consulting Europe',
    'AI consulting US',
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
    title: 'Services | Invisigent — Enterprise AI Infrastructure & Agent Orchestration',
    description:
      'LangGraph agent orchestration, Pinecone RAG pipelines, AI automation, and compliance-ready AI infrastructure. Built for production. No vendor lock-in.',
    url: CANONICAL,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: 'Invisigent Services — Enterprise AI Infrastructure', type: 'image/png' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@invisigent_ai',
    creator: '@invisigent_ai',
    title: 'Services | Invisigent — Enterprise AI Infrastructure',
    description:
      'LangGraph agent orchestration, Pinecone RAG pipelines, AI automation, and compliance-ready AI. Built for production.',
    images: [{ url: OG_IMAGE, alt: 'Invisigent Services — Enterprise AI Infrastructure' }],
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur, Rajasthan, India',
    'geo.position': '26.9124;75.7873',
    ICBM: '26.9124, 75.7873',
  },
};

/** All JSON-LD in the server component so it ships in initial HTML — visible to all crawlers */
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://invisigent.ai/services#webpage',
      url: 'https://invisigent.ai/services',
      name: 'Services — Enterprise AI Infrastructure | Invisigent',
      description:
        'Enterprise AI infrastructure consulting, LangGraph agent orchestration, Pinecone RAG systems, and compliance-ready AI for global organizations.',
      dateModified: '2026-04-18',
      inLanguage: 'en',
      isPartOf: { '@id': 'https://invisigent.ai/#website' },
      breadcrumb: { '@id': 'https://invisigent.ai/services#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://invisigent.ai/services#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://invisigent.ai' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://invisigent.ai/services' },
      ],
    },
    {
      '@type': 'OfferCatalog',
      '@id': 'https://invisigent.ai/services#catalog',
      name: 'Enterprise AI Infrastructure Services',
      provider: { '@id': 'https://invisigent.ai/#organization' },
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'Offer',
          position: 1,
          name: 'AI & Technology Strategy Consulting',
          description: 'AI roadmap design, infrastructure strategy, and architecture direction aligned with your business constraints. Identifies where multi-agent systems make sense vs. simpler pipelines.',
        },
        {
          '@type': 'Offer',
          position: 2,
          name: 'Agentic Orchestration & AI Workflows',
          description: 'Multi-agent systems using LangGraph with LangSmith observability. Supervisor agents, specialist subagents, shared memory layers, tool-calling pipelines — the full orchestration stack for production reliability.',
        },
        {
          '@type': 'Offer',
          position: 3,
          name: 'RAG & Knowledge Retrieval Systems',
          description: 'Retrieval pipelines using Pinecone vector stores, Cohere re-ranking, and chunking strategies tuned for your document types. Sub-3-second retrieval targets with hybrid search for accuracy at scale.',
        },
        {
          '@type': 'Offer',
          position: 4,
          name: 'AI Performance & Latency Optimization',
          description: 'Audit and redesign of AI system architecture to eliminate bottlenecks — inference latency, over-retrieval, redundant API calls, cold-start delays — for production-grade speed and cost efficiency.',
        },
        {
          '@type': 'Offer',
          position: 5,
          name: 'AI-Native Product Development',
          description: 'AI-first products using FastAPI or Node.js/Express backends, MongoDB for operational data, and Docker for portable deployment. AI embedded into the core product logic from day one.',
        },
        {
          '@type': 'Offer',
          position: 6,
          name: 'Compliance-Ready AI Systems',
          description: 'AI systems with governance designed into the architecture from day one — data residency controls, RBAC, audit logs, and EU AI Act risk classification. Aligned with GDPR, DPDP Act, ISO 42001, and SOC2.',
        },
        {
          '@type': 'Offer',
          position: 7,
          name: 'Technology Consulting & Advisory',
          description: 'Senior-level technical guidance — architecture reviews, build-vs-buy decisions, system design, and scaling strategy for AI infrastructure before committing to a direction.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://invisigent.ai/services#engagement',
      name: 'How Invisigent Engages With Clients',
      description: 'Three engagement models for enterprise AI infrastructure: Strategy Engagement, System Build, and Ongoing Partnership.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Strategy Engagement',
          text: 'Short-term advisory (2–4 weeks) to define your AI architecture, roadmap, and infrastructure strategy. Ends with a clear, actionable plan your team can execute.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'System Build',
          text: 'End-to-end design and development of your AI system — from architecture to production deployment. We own the build and hand over a system your team can run.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ongoing Partnership',
          text: 'Continuous optimization, scaling, and system evolution after launch — monitoring, improving, and adapting as your AI infrastructure grows.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://invisigent.ai/services#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which compliance frameworks does Invisigent support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We design systems aligned with GDPR, India\'s DPDP Act, EU AI Act risk classification requirements, ISO 42001, and SOC2. Compliance architecture is included in every system build — not offered as a separate add-on.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens after the AI system is deployed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Deployment is not the end of the engagement. Every system we deliver includes operational runbooks, LangSmith monitoring configuration, and a defined performance baseline. For organizations on ongoing partnership engagements, we provide monthly performance reviews, model updates, and architecture evolution as usage scales.',
          },
        },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Breadcrumb items={[{ label: 'Services' }]} />
      <ServicesPageClient />
    </>
  );
}
