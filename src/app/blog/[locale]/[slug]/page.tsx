import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getLocalePostBySlug,
  getAllLocalePostParams,
  translationExists,
} from '@/lib/posts';
import { LOCALE_META, isLocale, postUrl, type Locale } from '@/lib/locales';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { ScrollProgress } from '@/components/scroll-progress';
import { LanguageSwitcher } from '@/components/language-switcher';
import { TranslationBanner } from '@/components/translation-banner';

const SITE_ORIGIN = 'https://securityleader.ai';

export async function generateStaticParams() {
  return getAllLocalePostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  if (!translationExists(slug, locale)) return {};

  const post = getLocalePostBySlug(slug, locale);

  // Hreflang map: this locale + English + x-default.
  const alternates: Record<string, string> = {
    en: `${SITE_ORIGIN}${postUrl(slug, 'en')}`,
    'x-default': `${SITE_ORIGIN}${postUrl(slug, 'en')}`,
  };
  alternates[LOCALE_META[locale].hreflang] = `${SITE_ORIGIN}${postUrl(slug, locale)}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_ORIGIN}${postUrl(slug, locale)}`,
      languages: alternates,
    },
  };
}

export default async function LocaleBlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Validate locale against the allow-list. Any other value 404s.
  if (!isLocale(locale)) notFound();
  const validLocale: Locale = locale;

  if (!translationExists(slug, validLocale)) notFound();
  const post = getLocalePostBySlug(slug, validLocale);

  // Strip the leading H1 from markdown — the template already renders post.title.
  const contentWithoutH1 = post.content.replace(/^\s*# .+\n+/, '');
  const processedContent = await remark()
    .use(remarkGfm)
    // sanitize:false matches the English-route behavior — allows raw HTML
    // in markdown (badges, figures, chat-excerpt callouts). Safe because
    // all post content is in our git repo.
    .use(html, { sanitize: false })
    .process(contentWithoutH1);
  const contentHtml = processedContent.toString();

  const meta = LOCALE_META[validLocale];

  // Available sibling locales for the language switcher — exclude current.
  // English is always offered back from a non-English page.
  // Other non-English locales offered if a translation exists for this slug.
  const otherLocaleSiblings = (Object.keys(LOCALE_META) as Locale[]).filter(
    (l) => l !== validLocale && translationExists(slug, l),
  );

  return (
    <article className="bg-neutral-50" lang={meta.hreflang}>
      <ScrollProgress />

      <div className="article-accent-line" />

      <header className="border-b border-color bg-primary-50 pb-16 pt-12">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary-600">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="transition-colors hover:text-primary-600">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-secondary line-clamp-1">{post.title}</span>
          </nav>
          <h1 className="text-4xl font-bold md:text-5xl text-primary-800">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 small text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary-600" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary-600" />
              {post.readingTime} min read
            </span>
            {post.author && <span>By {post.author}</span>}
            <LanguageSwitcher
              slug={slug}
              currentLocale={validLocale}
              siblings={otherLocaleSiblings}
            />
          </div>
        </div>
      </header>

      <div className="container max-w-3xl py-16">
        <TranslationBanner locale={validLocale} status={post.translation_status} />

        <div
          className="prose prose-lg max-w-none text-secondary"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-color pt-8">
            <h3 className="small font-semibold uppercase tracking-[0.3em] text-muted">Tags</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="!normal-case">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-color bg-neutral-50 py-10">
        <div className="container text-center small text-secondary">
          <p className="mb-2">&copy; 2026 SecurityLeader.ai. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/in/gurvindersinghb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 link-underline"
          >
            Gurvinder Singh, CISSP, CISA, GWAPT
          </a>{' '}
          — Security Researcher &amp; Advisor
        </div>
      </footer>
    </article>
  );
}
