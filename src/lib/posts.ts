import fs from 'fs';
import path from 'path';
import { load as parseYaml } from 'js-yaml';
import { LOCALES, type Locale, type AudioKind, isLocale } from './locales';

const WORDS_PER_MINUTE = 200;

/**
 * Minimal YAML frontmatter parser — replaces `gray-matter`.
 *
 * Why hand-rolled: gray-matter's latest release (4.0.3) bundles js-yaml ^3.x
 * via `lib/engines.js`, which calls `yaml.safeLoad`/`safeDump`. The only
 * patched js-yaml line — 4.2.0 — REMOVED those methods (GHSA-h67p-54hq-rp68,
 * quadratic-complexity DoS in merge-key handling), so gray-matter cannot
 * consume a fixed js-yaml, and npm's suggested "fix" is a major downgrade.
 * Parsing the `---` block ourselves with js-yaml@4.2.0's `load` (equivalent to
 * the old `safeLoad`: default schema, no arbitrary JS type construction)
 * removes the vulnerable transitive dependency entirely.
 *
 * Contract preserved from gray-matter so the rest of the pipeline is
 * unchanged: `content` is everything after the closing `---` delimiter,
 * KEEPING the leading newline that the blog template's H1-strip regex
 * (`/^\s*# .+\n+/`, see CLAUDE.md gray-matter note) relies on.
 */
function parseFrontmatter(input: string): {
  // `data` is intentionally loosely typed (`any`) to mirror gray-matter's prior
  // data contract; field shapes are validated by scripts/lint-content.mjs and
  // coerced at the call sites below.
  data: Record<string, any>;
  content: string;
} {
  const str = input.replace(/^\uFEFF/, ''); // strip UTF-8 BOM, as gray-matter does
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(str);
  if (!match) return { data: {}, content: str };
  const parsed = parseYaml(match[1]);
  const data = parsed && typeof parsed === 'object' ? (parsed as Record<string, any>) : {};
  return { data, content: str.slice(match[0].length) };
}
const postsDirectory = path.join(process.cwd(), 'posts');
const postsI18nDirectory = path.join(process.cwd(), 'posts-i18n');

/** Single author entry, used by multi-author posts (Phase B). */
export interface Author {
  name: string;
  credentials?: string;
  url?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: number;
  /** Legacy single-author scalar. Use `authors` for new posts. */
  author?: string;
  /** Multi-author byline. Overrides `author` when present. */
  authors?: Author[];
  /** Category chip shown in the post header (e.g., "Supply Chain Research"). */
  category?: string;
  tags?: string[];
  hidden?: boolean;
  /** Locales for which a translation of this post exists. */
  translations?: Locale[];
  /** Editorial review status. ai_draft posts render a sangat-review banner. */
  translation_status?: 'human_reviewed' | 'ai_draft';
  /**
   * Site-relative audio file under /public (e.g. /audio/pa-in/<slug>.m4a).
   * Existence and format are enforced at build time by lint rule R30 —
   * a mapping without its file fails the build, never ships a broken player.
   */
  audioUrl?: string;
  /** Defaults to 'overview' in <AudioOverview /> when audioUrl is set. */
  audioKind?: AudioKind;
}

function parseAuthors(data: Record<string, unknown>): Author[] | undefined {
  // Accept frontmatter shapes:
  //   authors:
  //     - name: "Gurvinder Singh"
  //       credentials: "CISSP, CISA, GWAPT"
  //       url: "https://…"
  //     - "Co-Author Name"   ← string shorthand
  const raw = data.authors;
  if (!Array.isArray(raw)) return undefined;

  const result: Author[] = [];
  for (const entry of raw) {
    if (typeof entry === 'string') {
      result.push({ name: entry });
    } else if (entry && typeof entry === 'object') {
      const obj = entry as Record<string, unknown>;
      const name = typeof obj.name === 'string' ? obj.name : null;
      if (!name) continue;
      result.push({
        name,
        credentials: typeof obj.credentials === 'string' ? obj.credentials : undefined,
        url: typeof obj.url === 'string' ? obj.url : undefined,
      });
    }
  }
  return result.length > 0 ? result : undefined;
}

function readPostFile(fullPath: string, slug: string): Post {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);

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
    authors: parseAuthors(data),
    category: typeof data.category === 'string' ? data.category : undefined,
    tags: data.tags,
    hidden: data.hidden === true,
    translations: Array.isArray(data.translations)
      ? (data.translations.filter(isLocale) as Locale[])
      : undefined,
    translation_status:
      data.translation_status === 'ai_draft' || data.translation_status === 'human_reviewed'
        ? data.translation_status
        : undefined,
    audioUrl:
      typeof data.audio_url === 'string' && data.audio_url !== '' ? data.audio_url : undefined,
    audioKind:
      data.audio_kind === 'overview' || data.audio_kind === 'read_aloud'
        ? data.audio_kind
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

/** Returns only public (non-hidden) posts for a locale's listing page. */
export function getPublicLocalePosts(locale: Locale): Post[] {
  return getAllLocalePosts(locale).filter((post) => !post.hidden);
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
