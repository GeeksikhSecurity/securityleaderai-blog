import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { LOCALE_META, type Locale } from '@/lib/locales';

/**
 * Unified card used by both "Latest research" and "Latest insights" sections
 * on the homepage and the /blog index. Replaces the divergence between the
 * heavy <ResearchCard> (cover banner) and the inline insight card markup —
 * one shape, configurable per item type.
 *
 * Locale-availability discovery is built in: pass `availableLocales` (from
 * getAvailableTranslations(slug) for blog posts) and a chip per locale
 * renders alongside the type label. Whole card is one <Link>; titles are
 * clickable by definition.
 */

export type PostCardType = 'paper' | 'insight' | 'tool';

const TYPE_LABELS: Record<PostCardType, string> = {
  paper: 'Research Paper',
  insight: 'Insight',
  tool: 'Tool / Framework',
};

const TYPE_BADGES: Record<PostCardType, string> = {
  paper: 'badge-research-paper',
  insight: 'badge-insight',
  tool: 'badge-tool',
};

export interface PostCardProps {
  /** Destination URL — entire card wraps in a <Link> to this. */
  href: string;
  /** Card title; clickable via the wrapping Link. */
  title: string;
  /** Short summary, clamped to 3 lines. */
  excerpt: string;
  /** ISO date string. */
  date: string;
  /** Reading time in minutes. Optional — omits the clock chip when absent. */
  readingTime?: number;
  /** Content type — drives the colored pill at top. */
  type?: PostCardType;
  /** Tag chips (first 3 shown). */
  tags?: string[];
  /** Locales where a sibling translation exists. Renders 🌐 ਪੰਜਾਬੀ chips. */
  availableLocales?: Locale[];
  /** CTA label override. Default: "Read article →" for posts, "Read research →" for research items. */
  ctaLabel?: string;
}

export function PostCard({
  href,
  title,
  excerpt,
  date,
  readingTime,
  type = 'insight',
  tags = [],
  availableLocales = [],
  ctaLabel,
}: PostCardProps) {
  const finalCta = ctaLabel ?? (type === 'insight' ? 'Read article →' : 'Read research →');

  return (
    <Link
      href={href}
      aria-label={`Read: ${title}`}
      className="block focus:outline-none"
    >
      <Card className="group card-clickable h-full flex flex-col gap-4">
        {/* Type pill + locale-availability chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`badge ${TYPE_BADGES[type]} !normal-case`}>
            {TYPE_LABELS[type]}
          </span>
          {availableLocales.map((locale) => (
            <span
              key={locale}
              className="badge badge-outline !normal-case inline-flex items-center gap-1"
              title={`Also available in ${LOCALE_META[locale].englishName}`}
            >
              <span aria-hidden="true">🌐</span>
              {LOCALE_META[locale].nativeName}
            </span>
          ))}
        </div>

        {/* Title + excerpt */}
        <div className="space-y-3">
          <h3 className="text-xl text-primary-800 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-muted text-sm line-clamp-3">{excerpt}</p>
        </div>

        {/* Tag chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="!normal-case">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Date + reading time */}
        <div className="flex flex-wrap items-center gap-4 small text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary-600" />
            <time dateTime={date}>{date}</time>
          </span>
          {readingTime !== undefined && (
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary-600" />
              {readingTime} min read
            </span>
          )}
        </div>

        {/* CTA — visual affordance, real navigation is the wrapping Link */}
        <span className="mt-auto text-primary-600 link-underline group-hover:text-primary-700">
          {finalCta}
        </span>
      </Card>
    </Link>
  );
}
