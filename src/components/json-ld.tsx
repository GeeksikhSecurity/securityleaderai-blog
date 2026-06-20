/**
 * Renders one or more schema.org JSON-LD blocks as <script> tags.
 *
 * Next.js recommends embedding structured data directly in the rendered tree
 * (not via the Metadata API). Content is from our own build, but we still
 * escape defensively: JSON.stringify does NOT escape '<', so a title or
 * excerpt containing "</script>" would break out of the script element.
 * Replacing '<' with its < escape keeps the payload inside the script.
 * (See CLAUDE.md XSS prevention; RULES.md §8 C4.)
 */
function escapeJsonLd(json: string): string {
  return json.replace(/</g, '\\u003c');
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(d)) }}
        />
      ))}
    </>
  );
}
