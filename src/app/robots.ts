import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/seo';

/**
 * robots.txt — explicitly welcome answer-engine LLM crawlers alongside
 * traditional search bots, so this research is eligible to be cited in
 * AI-generated answers. Points crawlers at the sitemap.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
