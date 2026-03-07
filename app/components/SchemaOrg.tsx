/**
 * SchemaOrg.tsx — Server component. No 'use client'.
 * Injects JSON-LD for SEO and GEO (AI engine citation optimization).
 */

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://vriso.ai/#organization',
        name: 'VRISO',
        url: 'https://vriso.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://vriso.ai/logo.png',
          width: 200,
          height: 60,
        },
        description:
          'VRISO architects sovereign, multi-agent AI systems for enterprise workflow automation, governance, and execution.',
        knowsAbout: [
          'Agentic Orchestration',
          'Multi-Agent Governance',
          'Enterprise AI Systems',
          'AI Workflow Automation',
          'Sovereign AI Infrastructure',
          'GDPR Compliance',
          'DPDP Compliance',
        ],
        areaServed: ['EU', 'IN', 'US'],
        sameAs: ['https://linkedin.com/company/vriso'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://vriso.ai/#website',
        url: 'https://vriso.ai',
        name: 'VRISO',
        publisher: { '@id': 'https://vriso.ai/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://vriso.ai/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ConsultingService',
        '@id': 'https://vriso.ai/#service',
        name: 'Enterprise AI Architecture Retainer',
        provider: { '@id': 'https://vriso.ai/#organization' },
        serviceType: 'AI Systems Architecture',
        description:
          'Strategic AI retainer for enterprise organizations requiring sovereign multi-agent orchestration and governance infrastructure.',
        areaServed: ['EU', 'IN', 'US'],
        knowsAbout: [
          'Agentic Orchestration',
          'Multi-Agent Governance',
          'GDPR Compliance',
          'DPDP Compliance',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
