import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LOCALES, type Locale, isLocale } from './locales';

const WORDS_PER_MINUTE = 200;
const postsDirectory = path.join(process.cwd(), 'posts');
const postsI18nDirectory = path.join(process.cwd(), 'posts-i18n');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: number;
  author?: string;
  tags?: string[];
  hidden?: boolean;
  /** Locales for which a translation of this post exists. */
  translations?: Locale[];
  /** Editorial review status. ai_draft posts render a sangat-review banner. */
  translation_status?: 'human_reviewed' | 'ai_draft';
}

function readPostFile(fullPath: string, slug: string): Post {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
    readingTime,
    author: data.author,
    tags: data.tags,
    hidden: data.hidden === true,
    translations: Array.isArray(data.translations)
      ? (data.translations.filter(isLocale) as Locale[])
      : undefined,
    translation_status:
      data.translation_status === 'ai_draft' || data.translation_status === 'human_reviewed'
        ? data.translation_status
        : undefined,
  };
}

// ─── English (default) posts in /posts/ ─────────────────────────────────────

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      return readPostFile(fullPath, slug);
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns only public (non-hidden) posts for listing pages. */
export function getPublicPosts(): Post[] {
  return getAllPosts().filter((post) => !post.hidden);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  return readPostFile(fullPath, slug);
}

// ─── Locale-prefixed posts in /posts-i18n/<locale>/ ─────────────────────────

/** Returns all posts for a given non-default locale, sorted by date desc. */
export function getAllLocalePosts(locale: Locale): Post[] {
  const localeDir = path.join(postsI18nDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  const fileNames = fs.readdirSync(localeDir);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(localeDir, fileName);
      return readPostFile(fullPath, slug);
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Read a specific locale's translation of a post by slug.
 * Throws if the file does not exist — callers should validate the slug via
 * generateStaticParams first OR use translationExists() as a guard.
 */
export function getLocalePostBySlug(slug: string, locale: Locale): Post {
  const fullPath = path.join(postsI18nDirectory, locale, `${slug}.md`);
  return readPostFile(fullPath, slug);
}

/** Whether a given locale has a translation for the given slug. */
export function translationExists(slug: string, locale: Locale): boolean {
  const fullPath = path.join(postsI18nDirectory, locale, `${slug}.md`);
  return fs.existsSync(fullPath);
}

/**
 * Lists every (locale, slug) pair that has a translation. Used by
 * generateStaticParams in the [locale]/[slug] route to build all locale pages.
 */
export function getAllLocalePostParams(): { locale: Locale; slug: string }[] {
  const result: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    const posts = getAllLocalePosts(locale);
    for (const post of posts) {
      result.push({ locale, slug: post.slug });
    }
  }
  return result;
}

/**
 * For a given English-default slug, returns the list of locales (other than
 * English) for which a translation exists on disk. Used by the language
 * switcher to render only the languages that are actually available.
 */
export function getAvailableTranslations(slug: string): Locale[] {
  return LOCALES.filter((locale) => translationExists(slug, locale));
}
