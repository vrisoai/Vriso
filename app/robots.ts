import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: '*',
        allow: '/',
      },
      // OpenAI — ChatGPT browsing + GPT training
      { userAgent: 'GPTBot',        allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User',  allow: '/' },
      // Anthropic — Claude
      { userAgent: 'anthropic-ai',  allow: '/' },
      { userAgent: 'ClaudeBot',     allow: '/' },
      { userAgent: 'Claude-Web',    allow: '/' },
      // Google — Search + Gemini AI
      { userAgent: 'Googlebot',     allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Microsoft — Bing + Copilot
      { userAgent: 'Bingbot',       allow: '/' },
      { userAgent: 'msnbot',        allow: '/' },
      // Perplexity AI
      { userAgent: 'PerplexityBot', allow: '/' },
      // Meta AI
      { userAgent: 'meta-externalagent', allow: '/' },
      // Apple
      { userAgent: 'Applebot',      allow: '/' },
      // Amazon / Alexa
      { userAgent: 'Amazonbot',     allow: '/' },
      // Common Crawl (used by many AI training pipelines)
      { userAgent: 'CCBot',         allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai',     allow: '/' },
      // You.com
      { userAgent: 'YouBot',        allow: '/' },
      // DuckDuckGo AI
      { userAgent: 'DuckAssistBot', allow: '/' },
      // ByteDance / TikTok
      { userAgent: 'Bytespider',    allow: '/' },
    ],
    sitemap: 'https://invisigent.ai/sitemap.xml',
    host: 'https://invisigent.ai',
  };
}
