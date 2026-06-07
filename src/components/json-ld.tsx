/**
 * Renders one or more schema.org JSON-LD blocks as <script> tags.
 *
 * Next.js recommends embedding structured data directly in the rendered tree
 * (not via the Metadata API). Content is from our own build, so the
 * JSON.stringify payload is trusted.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
