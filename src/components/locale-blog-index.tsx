import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { LOCALES, LOCALE_META, type Locale } from '@/lib/locales';
import { getPublicLocalePosts } from '@/lib/posts';

/**
 * Listing page for all posts in a given locale (e.g. /blog/pa-in).
 *
 * Renders as a "Blog" index but in the locale's native script:
 *   - Hero title is the native locale name
 *   - Cards link to /blog/<locale>/<slug>
 *   - Language switcher cross-links to /blog (English) and other locales
 *
 * This component is invoked from src/app/blog/[slug]/page.tsx via dispatch:
 * when the [slug] segment matches a known locale, we render this instead of
 * the post-detail page. Necessary because Next.js 16 forbids two sibling
 * dynamic route segments ([locale] and [slug]) at the same level.
 */
export function LocaleBlogIndex({ locale }: { locale: Locale }) {
  const meta = LOCALE_META[locale];
  const posts = getPublicLocalePosts(locale);

  return (
    <main className="bg-neutral-50" lang={meta.hreflang}>
      <div className="container pb-20 pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-primary-600">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="transition-colors hover:text-primary-600">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="text-secondary">{meta.nativeName}</span>
        </nav>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 lang={meta.hreflang}>{meta.nativeName}</h1>
            <p className="lead mb-0">
              {meta.englishName} translations of SecurityLeader.ai posts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted" aria-hidden="true">🌐</span>
            <span className="sr-only">Languages available:</span>
            <Link href="/blog" hrefLang="en" className="text-primary-600 link-underline">
              English
            </Link>
            {LOCALES.map((l) => {
              // Hoist lookup outside conditional so TS doesn't narrow l to never.
              const otherMeta = LOCALE_META[l];
              const isCurrent = l === locale;
              return (
                <span key={l} className="inline-flex items-center gap-3">
                  <span className="text-muted" aria-hidden="true">·</span>
                  {isCurrent ? (
                    <span className="font-semibold text-primary-700">
                      {otherMeta.nativeName}
                    </span>
                  ) : (
                    <Link
                      href={`/blog/${l}`}
                      hrefLang={otherMeta.hreflang}
                      className="text-primary-600 link-underline"
                    >
                      {otherMeta.nativeName}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted">No posts available in this language yet.</p>
        ) : (
          <div className="grid grid-3">
            {posts.map((post) => {
              const href = `/blog/${locale}/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  href={href}
                  aria-label={post.title}
                  className="block focus:outline-none"
                >
                  <Card className="group card-clickable h-full flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-primary !normal-case">
                        {meta.nativeName}
                      </span>
                      {post.translation_status === 'ai_draft' && (
                        <span
                          className="badge badge-warning !normal-case"
                          title="AI-assisted draft pending sangat review"
                        >
                          AI draft
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3
                        className="text-xl text-primary-800 group-hover:text-primary-600 transition-colors"
                        lang={meta.hreflang}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm line-clamp-3" lang={meta.hreflang}>
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 small text-muted">
                      <span className="inline-flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-primary-600" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-primary-600" />
                        {post.readingTime} min
                      </span>
                    </div>
                    <span
                      className="mt-auto text-primary-600 link-underline group-hover:text-primary-700"
                      lang={meta.hreflang}
                    >
                      ਪੜ੍ਹੋ →
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-16 rounded-lg border border-color bg-primary-50 px-6 py-6 text-center text-sm">
          <p className="mb-2 font-semibold text-primary-800">Read in another language</p>
          <Link href="/blog" hrefLang="en" className="link-underline text-primary-700">
            English (canonical)
          </Link>
        </div>
      </div>
    </main>
  );
}
