import type { MetadataRoute } from 'next';
import { getAllPosts, getAllLocalePostParams } from '@/lib/posts';
import { getResearchItems } from '@/lib/research';
import { SITE_ORIGIN, toIsoDate } from '@/lib/seo';

/**
 * Enumerate every indexable URL for search engines + LLM crawlers.
 * Includes hidden review pages: `hidden: true` keeps them out of the on-site
 * index/nav, but they are public, shareable, and intended to be discoverable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_ORIGIN}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_ORIGIN}/research`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_ORIGIN}/blog/${p.slug}`,
    lastModified: toIsoDate(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const localePosts: MetadataRoute.Sitemap = getAllLocalePostParams().map(
    ({ locale, slug }) => ({
      url: `${SITE_ORIGIN}/blog/${locale}/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  );

  const research: MetadataRoute.Sitemap = getResearchItems().map((r) => ({
    url: `${SITE_ORIGIN}/research/${r.slug}`,
    lastModified: toIsoDate(r.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts, ...localePosts, ...research];
}
