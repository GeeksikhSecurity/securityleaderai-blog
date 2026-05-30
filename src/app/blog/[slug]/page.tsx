import { getPostBySlug, getAllPosts, getAvailableTranslations } from '@/lib/posts';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { ScrollProgress } from '@/components/scroll-progress';
import { LanguageSwitcher } from '@/components/language-switcher';
import { TranslationBanner } from '@/components/translation-banner';
import { LocaleBlogIndex } from '@/components/locale-blog-index';
import { LOCALE_META, LOCALES, isLocale, postUrl } from '@/lib/locales';

const SITE_ORIGIN = 'https://securityleader.ai';

export async function generateStaticParams() {
  // This route handles two URL shapes that share the same dynamic segment
  // because Next.js 16 forbids sibling dynamic routes with different param
  // names ([locale] vs [slug] would collide):
  //   /blog/<post-slug>   → post detail
  //   /blog/<locale>      → locale-specific index (e.g. /blog/pa-in)
  // Static params cover both shapes; the page component dispatches.
  const posts = getAllPosts();
  const postParams = posts.map((post) => ({ slug: post.slug }));
  const localeParams = LOCALES.map((locale) => ({ slug: locale }));
  return [...postParams, ...localeParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // If slug is a known locale, build metadata for the locale index page.
  if (isLocale(slug)) {
    const meta = LOCALE_META[slug];
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
        canonical: `${SITE_ORIGIN}/blog/${slug}`,
        languages,
      },
    };
  }

  const post = getPostBySlug(slug);
  const siblings = getAvailableTranslations(slug);

  // hreflang map: English canonical + every available translation + x-default.
  const languages: Record<string, string> = {
    en: `${SITE_ORIGIN}${postUrl(slug, 'en')}`,
    'x-default': `${SITE_ORIGIN}${postUrl(slug, 'en')}`,
  };
  for (const loc of siblings) {
    languages[LOCALE_META[loc].hreflang] = `${SITE_ORIGIN}${postUrl(slug, loc)}`;
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_ORIGIN}${postUrl(slug, 'en')}`,
      languages,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Dispatch: when the [slug] segment matches a known locale, this URL is
  // actually /blog/<locale> (the locale index), not /blog/<post-slug>.
  // Render the locale index UI and return early.
  if (isLocale(slug)) {
    return <LocaleBlogIndex locale={slug} />;
  }

  const post = getPostBySlug(slug);
  const siblings = getAvailableTranslations(slug);
  // Strip the leading H1 from markdown — the template already renders post.title in the header
  const contentWithoutH1 = post.content.replace(/^\s*# .+\n+/, '');
  const processedContent = await remark()
    .use(remarkGfm)
    // sanitize:false allows raw HTML (e.g. <span class="badge"> in our
    // research-tier posts) to flow through. Safe because all post content
    // lives in our git repo — no user-submitted markdown.
    .use(html, { sanitize: false })
    .process(contentWithoutH1);
  const contentHtml = processedContent.toString();

  return (
    <article className="bg-neutral-50">
      <ScrollProgress />

      <div className="article-accent-line" />

      <header className="border-b border-color bg-primary-50 pb-16 pt-12">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary-600">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="transition-colors hover:text-primary-600">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className="text-secondary line-clamp-1">{post.title}</span>
          </nav>
          <h1 className="text-4xl font-bold md:text-5xl text-primary-800">
            {post.title}
          </h1>
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
            <LanguageSwitcher slug={slug} currentLocale="en" siblings={siblings} />
          </div>
        </div>
      </header>

      <div className="container max-w-3xl py-16">
        <TranslationBanner locale="en" status={post.translation_status} />

        <div
          className="prose prose-lg max-w-none text-secondary"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-color pt-8">
            <h3 className="small font-semibold uppercase tracking-[0.3em] text-muted">
              Tags
            </h3>
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
          <p className="mb-2">
            &copy; 2026 SecurityLeader.ai. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/in/gurvindersinghb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 link-underline"
          >
            Gurvinder Singh, CISSP, CISA, GWAPT
          </a>
          {' '}— Security Researcher &amp; Advisor
        </div>
      </footer>
    </article>
  );
}
