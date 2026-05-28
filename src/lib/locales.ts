/**
 * Locale configuration for the bilingual blog.
 *
 * Pattern: BCP 47 locale-region prefix routing
 * (matches blog.cloudflare.com/fr-fr/<slug>/ style).
 *
 * English is the default — no URL prefix.
 * Other locales get a lowercased BCP 47 prefix (e.g. `/blog/pa-in/<slug>`).
 *
 * To add a new locale:
 *   1. Add it to LOCALES below (the URL prefix segment)
 *   2. Add display metadata to LOCALE_META (title, native name, ISO tag for hreflang)
 *   3. Create posts-i18n/<locale>/<slug>.md alongside posts/<slug>.md
 *   4. Set `translations: [<locale>]` in the English post frontmatter
 */

/** URL prefix segments for non-default locales. English is implicit. */
export const LOCALES = ['pa-in'] as const;
export type Locale = (typeof LOCALES)[number];

/** Display metadata for each supported locale. */
export interface LocaleMeta {
  /** Lowercased URL prefix segment (matches LOCALES entry). */
  urlPrefix: Locale;
  /** Canonical BCP 47 tag for HTML `lang` attr and `hreflang` link (mixed case). */
  hreflang: string;
  /** Display name in English. */
  englishName: string;
  /** Display name in the locale's own script. */
  nativeName: string;
  /** Banner text for ai_draft posts, rendered in the locale's own script. */
  aiDraftBanner: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  'pa-in': {
    urlPrefix: 'pa-in',
    hreflang: 'pa-IN',
    englishName: 'Panjabi (India, Gurmukhi)',
    nativeName: 'ਪੰਜਾਬੀ',
    aiDraftBanner:
      'ਇਹ ਅਨੁਵਾਦ AI ਦੀ ਮਦਦ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ; ਸੰਗਤ ਸਮੀਖਿਆ ਬਾਕੀ ਹੈ। ਫੀਡਬੈਕ ਲਈ ਈਮੇਲ ਕਰੋ: gurvinder@securityleader.ai',
  },
} as const;

/** Validate an unknown string against LOCALES at request boundaries. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Build the blog post URL for a given slug + locale. English has no prefix. */
export function postUrl(slug: string, locale?: Locale | 'en'): string {
  if (!locale || locale === 'en') return `/blog/${slug}`;
  return `/blog/${locale}/${slug}`;
}
