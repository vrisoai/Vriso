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
        '@id': 'https://invisigent.ai/#organization',
        name: 'Invisigent',
        url: 'https://invisigent.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://invisigent.ai/logo.png',
          width: 200,
          height: 60,
        },
        description:
          'Invisigent architects sovereign, multi-agent AI systems for enterprise workflow automation, governance, and execution. Compliance-ready AI infrastructure for EU AI Act, GDPR, DPDP, and SOC2 regulated environments.',
        foundingLocation: {
          '@type': 'Place',
          name: 'Jaipur, India',
        },
        knowsAbout: [
          'Agentic Orchestration',
          'Multi-Agent Governance',
          'Enterprise AI Systems',
          'AI Workflow Automation',
          'Sovereign AI Infrastructure',
          'GDPR Compliance',
          'DPDP Compliance',
          'EU AI Act Compliance',
          'SOC2 Compliance',
          'ISO 42001 AI Management',
          'RAG Knowledge Systems',
          'AI Automation Architecture',
        ],
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'AdministrativeArea', name: 'European Union' },
        ],
        hasCredential: [
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'GDPR Compliant' },
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'EU AI Act Ready' },
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'DPDP Compliant' },
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'SOC2' },
        ],
        sameAs: [
          'https://www.linkedin.com/company/invisigent/',
          'https://x.com/InvisigentAI',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://invisigent.ai/#website',
        url: 'https://invisigent.ai',
        name: 'Invisigent',
        publisher: { '@id': 'https://invisigent.ai/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://invisigent.ai/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ConsultingService',
        '@id': 'https://invisigent.ai/#service',
        name: 'Enterprise AI Architecture Retainer',
        provider: { '@id': 'https://invisigent.ai/#organization' },
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
