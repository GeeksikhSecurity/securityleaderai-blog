/**
 * Centralized SEO + LLM-discoverability helpers.
 *
 * Single source of truth for the site origin, default metadata, and the
 * structured-data (JSON-LD) builders. Used by the root layout, every blog/
 * research page's `generateMetadata`, and the sitemap/robots routes.
 *
 * Goal: emit rich, machine-readable metadata (OpenGraph, Twitter cards,
 * schema.org Article + BreadcrumbList) so search engines AND answer-engine
 * LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) can
 * accurately attribute, summarize, and cite this content.
 *
 * Content rules R24–R26 (docs/content-rigor.md) enforce the frontmatter that
 * these helpers depend on (description length, tags present, ISO dates).
 */
import type { Metadata } from 'next';

export const SITE_ORIGIN = 'https://securityleader.ai';
export const SITE_NAME = 'SecurityLeader.ai';
export const SITE_TAGLINE = 'AI Security Research & Cyber Risk';
export const AUTHOR_NAME = 'Gurvinder Singh';
export const AUTHOR_CREDENTIALS = 'CISSP, CISA, GWAPT';
export const AUTHOR_URL = 'https://www.linkedin.com/in/gurvindersinghb';

/** Default keywords applied site-wide; per-page tags are merged on top. */
export const SITE_KEYWORDS = [
  'application security',
  'AI security',
  'LLM security',
  'MCP security',
  'OAuth supply chain',
  'OWASP ASVS',
  'red teaming',
  'CISO',
  'Gurvinder Singh',
];

/** Resolve a path or absolute URL to an absolute URL on this origin. */
export function absUrl(path: string): string {
  if (!path) return SITE_ORIGIN;
  if (path.startsWith('http')) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** OpenGraph locale token from our internal locale segment. */
function ogLocale(locale?: string): string {
  return locale === 'pa-in' || locale === 'pa-IN' ? 'pa_IN' : 'en_US';
}

/** Normalize ISO (YYYY-MM-DD) or human ("February 8, 2026") dates to ISO. */
export function toIsoDate(d: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
  const parsed = new Date(d);
  return Number.isNaN(parsed.getTime()) ? d : parsed.toISOString().slice(0, 10);
}

export interface ArticleMetaInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/blog/foo" or "/research/bar". */
  urlPath: string;
  /** Internal locale segment: 'en' | 'pa-in'. */
  locale?: string;
  /** ISO publish date. */
  publishedTime?: string;
  /** ISO modified date; defaults to publishedTime. */
  modifiedTime?: string;
  tags?: string[];
  authorNames?: string[];
  /** Path or absolute URL to a representative image (OG/Twitter card). */
  image?: string;
}

/**
 * Build the OpenGraph + Twitter + robots + keyword block for an article page.
 * Callers merge their own `alternates` (canonical + hreflang) on top.
 */
export function buildArticleMetadata(input: ArticleMetaInput): Metadata {
  const url = absUrl(input.urlPath);
  const authors =
    input.authorNames && input.authorNames.length ? input.authorNames : [AUTHOR_NAME];
  const images = input.image ? [absUrl(input.image)] : undefined;
  const keywords =
    input.tags && input.tags.length ? [...input.tags, ...SITE_KEYWORDS] : SITE_KEYWORDS;

  return {
    title: input.title,
    description: input.description,
    keywords,
    authors: authors.map((name) => ({ name })),
    openGraph: {
      type: 'article',
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(input.locale),
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime ?? input.publishedTime,
      authors,
      tags: input.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images,
    },
    robots: { index: true, follow: true },
  };
}

export interface ArticleLdInput extends ArticleMetaInput {
  datePublished: string;
  dateModified?: string;
  /** schema.org articleSection (e.g. the content category/type). */
  section?: string;
}

/** schema.org Article JSON-LD — the primary signal for answer-engine LLMs. */
export function articleJsonLd(a: ArticleLdInput): Record<string, unknown> {
  const url = absUrl(a.urlPath);
  const authors =
    a.authorNames && a.authorNames.length ? a.authorNames : [AUTHOR_NAME];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: a.locale === 'pa-in' ? 'pa-IN' : 'en',
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.tags && a.tags.length ? { keywords: a.tags.join(', ') } : {}),
    ...(a.image ? { image: [absUrl(a.image)] } : {}),
    author: authors.map((name) => ({ '@type': 'Person', name, url: AUTHOR_URL })),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_ORIGIN },
  };
}

/** schema.org BreadcrumbList JSON-LD — site hierarchy for crawlers. */
export function breadcrumbJsonLd(
  items: { name: string; urlPath: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.urlPath),
    })),
  };
}
