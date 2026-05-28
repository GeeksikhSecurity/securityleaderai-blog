import Link from 'next/link';
import { LOCALE_META, type Locale, postUrl } from '@/lib/locales';

/**
 * Language switcher rendered in the post metadata row.
 *
 * Shows links to OTHER locale versions of the current post — never a link
 * back to itself. If no translations exist (siblings = []), renders nothing.
 *
 * Placement: inside the post header's metadata row, alongside date and
 * reading-time. Subtle but discoverable.
 */
export function LanguageSwitcher({
  slug,
  currentLocale = 'en',
  siblings,
}: {
  slug: string;
  currentLocale?: Locale | 'en';
  siblings: Locale[];
}) {
  // Build the list of all destinations: English (if not current) + any other locales.
  // For each sibling, also include English if the current page is a non-English locale.
  const destinations: Array<{ url: string; label: string; hreflang: string }> = [];

  // If we're on a non-English locale, offer English back.
  if (currentLocale !== 'en') {
    destinations.push({
      url: postUrl(slug, 'en'),
      label: 'English',
      hreflang: 'en',
    });
  }

  // Add every locale sibling except the current one.
  for (const locale of siblings) {
    if (locale === currentLocale) continue;
    destinations.push({
      url: postUrl(slug, locale),
      label: LOCALE_META[locale].nativeName,
      hreflang: LOCALE_META[locale].hreflang,
    });
  }

  if (destinations.length === 0) return null;

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">Available languages:</span>
      {destinations.map((dest, idx) => (
        <span key={dest.url}>
          {idx > 0 && <span className="mx-1 text-muted" aria-hidden="true">·</span>}
          <Link
            href={dest.url}
            hrefLang={dest.hreflang}
            className="text-primary-600 link-underline"
          >
            {dest.label}
          </Link>
        </span>
      ))}
    </span>
  );
}
