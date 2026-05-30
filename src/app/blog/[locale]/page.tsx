import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { getPublicLocalePosts } from '@/lib/posts';
import { LOCALES, LOCALE_META, isLocale, type Locale } from '@/lib/locales';

const SITE_ORIGIN = 'https://securityleader.ai';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = LOCALE_META[locale];

  // Hreflang: this locale + English root + every other configured locale.
  const languages: Record<string, string> = {
    en: `${SITE_ORIGIN}/blog`,
    'x-default': `${SITE_ORIGIN}/blog`,
  };
  for (const l of LOCALES) {
    languages[LOCALE_META[l].hreflang] = `${SITE_ORIGIN}/blog/${l}`;
  }

  return {
    title: `${meta.nativeName} — Blog`,
    description: `${meta.englishName} translations of SecurityLeader.ai posts.`,
    alternates: {
      canonical: `${SITE_ORIGIN}/blog/${locale}`,
      languages,
    },
  };
}

export default async function LocaleBlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const validLocale: Locale = locale;
  const meta = LOCALE_META[validLocale];
  const posts = getPublicLocalePosts(validLocale);

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
          {/* Switcher: shows current locale highlighted; links to English and other locales. */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted" aria-hidden="true">🌐</span>
            <span className="sr-only">Languages available:</span>
            <Link href="/blog" hrefLang="en" className="text-primary-600 link-underline">
              English
            </Link>
            {LOCALES.map((l) => {
              // Hoist the lookup so TS doesn't narrow `l` to `never` in the
              // else branch when LOCALES has only one entry.
              const otherMeta = LOCALE_META[l];
              const isCurrent = l === validLocale;
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
              const href = `/blog/${validLocale}/${post.slug}`;
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

        {/* Footer cross-link back to English index. */}
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
