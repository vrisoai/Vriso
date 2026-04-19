export type Tool = {
  id: string;
  name: string;
  shortDescription: string;
  capabilities: string[];
  cta: string;
  ctaHref?: string;
  featured?: boolean;
};

/** Standard tool cards with no preview mock (copy + CTA only) */
export const STANDARD_TOOL_IDS_WITHOUT_MOCK = new Set<string>([
  'ecommerce-ai-assistant',
  'market-intelligence-engine',
  'seo-article-generator',
]);

export const TOOLS: Tool[] = [
  {
    id: 'search-visibility-analyzer',
    name: 'Search Visibility Analyzer',
    shortDescription:
      'Analyze your Google rankings, local business visibility, and SEO performance with AI-powered insights.',
    capabilities: [
      'Organic keyword ranking analysis',
      'Google Business Profile (GMB) visibility insights',
      'AI-generated SEO recommendations',
    ],
    cta: 'Generate Report',
    ctaHref: '/search-visibility-analyzer',
    featured: true,
  },
  {
    id: 'ecommerce-ai-assistant',
    name: 'E-commerce AI Assistant',
    shortDescription:
      'AI-powered product discovery using semantic search and user intent.',
    capabilities: [
      'Intent-based product search',
      'Personalized recommendations',
      'Improved conversion flow',
    ],
    cta: 'Try Demo',
    ctaHref: '/ecommerce-ai-assistant',
  },
  {
    id: 'market-intelligence-engine',
    name: 'Market Intelligence Engine',
    shortDescription:
      'AI system that aggregates and analyzes market data to generate actionable insights.',
    capabilities: [
      'News aggregation and analysis',
      'Trend detection',
      'Insight generation',
    ],
    cta: 'Try Demo',
    ctaHref: '/market-intelligence-engine',
  },
  {
    id: 'seo-article-generator',
    name: 'SEO Article Generator',
    shortDescription:
      'Generate high-quality, keyword-rich articles tailored to your audience. Scale your content production while maintaining consistency and SEO value.',
    capabilities: [
      'Audience-tailored, keyword-rich long-form content',
      'Scaled workflows with consistent tone and structure',
      'Suitable for bloggers and content teams',
    ],
    cta: 'Try Demo',
    ctaHref: '/seo-article-generator',
  },
];
