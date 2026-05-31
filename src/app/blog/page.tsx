import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getPublicPosts, getAvailableTranslations } from '@/lib/posts';
import { LOCALE_META, LOCALES } from '@/lib/locales';

export default function BlogPage() {
  const posts = getPublicPosts();

  return (
    <main className="bg-neutral-50">
      <div className="container pb-20 pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-primary-600">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-secondary">Blog</span>
        </nav>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1>Blog</h1>
            <p className="lead mb-0">
              Strategic insights for CISOs, AI security leads, and product teams.
            </p>
          </div>
          {/* Site-wide language switcher: links to every locale's index page. */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted" aria-hidden="true">🌐</span>
            <span className="sr-only">Languages available:</span>
            <span className="font-semibold text-primary-700">English</span>
            {LOCALES.map((locale) => (
              <span key={locale} className="inline-flex items-center gap-3">
                <span className="text-muted" aria-hidden="true">·</span>
                <Link
                  href={`/blog/${locale}`}
                  hrefLang={LOCALE_META[locale].hreflang}
                  className="text-primary-600 link-underline"
                >
                  {LOCALE_META[locale].nativeName}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readingTime}
              type="insight"
              tags={post.tags}
              availableLocales={getAvailableTranslations(post.slug)}
            />
          ))}
        </div>

        {/* Footer cross-link to each locale index. */}
        <div className="mt-16 rounded-lg border border-color bg-primary-50 px-6 py-6 text-center text-sm">
          <p className="mb-2 font-semibold text-primary-800">Read in another language</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-primary-700">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={`/blog/${locale}`}
                hrefLang={LOCALE_META[locale].hreflang}
                className="link-underline"
              >
                {LOCALE_META[locale].nativeName} ({LOCALE_META[locale].englishName})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
