import { LOCALE_META, type Locale, type AudioKind, type AudioLabels } from '@/lib/locales';

/**
 * Audio block rendered above the article body when a post declares
 * `audio_url` frontmatter.
 *
 * Deliberately wraps the browser-native `<audio controls>` element instead of
 * a custom player: native controls provide keyboard access, screen-reader
 * support, and media-session integration with zero client JS (CSS-first /
 * lean-dependency rule). A download link covers browsers that can't play the
 * format inline. The "transcript" is the article itself, on the same page.
 *
 * Labeling is honest by kind (see AudioKind in lib/locales.ts): a NotebookLM
 * `overview` is announced as an AI-made discussion about the article; only a
 * verbatim `read_aloud` is announced as the article itself.
 */

// NotebookLM exports .m4a (AAC in an MP4 container); TTS pipelines emit .mp3.
// Keep in sync with lint rule R30 (scripts/lint-content.mjs).
const MIME_BY_EXT: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
};

/** English strings; non-en locales carry theirs in LOCALE_META.audioLabels. */
const EN_AUDIO_LABELS: AudioLabels = {
  overview: {
    heading: 'Audio overview',
    note: 'An AI-generated discussion about this article — not a word-for-word reading. The full article is on this page.',
  },
  read_aloud: {
    heading: 'Listen to this article',
    note: 'A narration of the full article.',
  },
  download: 'Download the audio file',
  unsupported: 'Your browser cannot play this audio.',
};

export function AudioOverview({
  url,
  kind = 'overview',
  locale,
}: {
  url: string;
  kind?: AudioKind;
  locale: Locale | 'en';
}) {
  const labels = locale === 'en' ? EN_AUDIO_LABELS : LOCALE_META[locale].audioLabels;
  const { heading, note } = labels[kind];
  const ext = url.slice(url.lastIndexOf('.')).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  const lang = locale === 'en' ? undefined : LOCALE_META[locale].hreflang;

  return (
    <section
      aria-labelledby="post-audio-heading"
      lang={lang}
      className="my-6 rounded-lg border border-color bg-primary-50 p-4"
    >
      <h2 id="post-audio-heading" className="text-base font-semibold text-primary-800">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-muted">{note}</p>
      <audio controls preload="none" className="mt-3 w-full">
        <source src={url} type={mime} />
        {/* Fallback content renders only in browsers without <audio> support. */}
        {labels.unsupported}{' '}
        <a href={url} download className="link-underline text-primary-600">
          {labels.download}
        </a>
      </audio>
      <a
        href={url}
        download
        className="mt-2 inline-block text-sm text-primary-600 link-underline"
      >
        {labels.download}
      </a>
    </section>
  );
}
