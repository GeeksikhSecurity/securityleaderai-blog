import type { Author } from '@/lib/posts';

/**
 * Multi-author byline. Renders inline in the post metadata row.
 *
 * Accepts either a structured `authors` array (preferred, Phase B) or a
 * legacy scalar `author` string for backward compatibility. If both are
 * passed, `authors` wins. If neither is present, renders nothing.
 *
 * Display rules:
 * - "By <name>, <credentials>" — joined with comma when credentials present
 * - Multiple authors separated by " · " (middle-dot)
 * - Last separator becomes " and " in two-author case for natural English
 * - Names with `url` render as a link to the author's profile
 */
export function AuthorByline({
  authors,
  author,
}: {
  authors?: Author[];
  author?: string;
}) {
  const list: Author[] = authors && authors.length > 0
    ? authors
    : author
    ? [{ name: author }]
    : [];

  if (list.length === 0) return null;

  return (
    <span className="author-byline">
      <span className="author-byline-prefix">By</span>
      {list.map((a, idx) => {
        const isLast = idx === list.length - 1;
        const sepBefore = idx > 0
          ? (list.length === 2 ? ' and ' : ' · ')
          : null;
        return (
          <span key={`${a.name}-${idx}`}>
            {sepBefore && (
              <span className="author-byline-separator" aria-hidden="true">
                {sepBefore}
              </span>
            )}
            {a.url ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="author-byline-name text-primary-700 hover:text-primary-800"
              >
                {a.name}
              </a>
            ) : (
              <span className="author-byline-name">{a.name}</span>
            )}
            {a.credentials && (
              <span className="author-byline-credentials">{a.credentials}</span>
            )}
            {!isLast && null /* separator handled by next iter */}
          </span>
        );
      })}
    </span>
  );
}
