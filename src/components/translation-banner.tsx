import { LOCALE_META, type Locale } from '@/lib/locales';

/**
 * Banner rendered above the article body on AI-assisted draft translations.
 *
 * Renders ONLY when translation_status === 'ai_draft'. For human-reviewed
 * translations no banner appears (per Sayva editorial decision: trust the
 * reader's eye on reviewed content).
 *
 * Text is in the locale's own script (from LOCALE_META.aiDraftBanner) so the
 * reader of the Panjabi page sees Panjabi text. The English version of the
 * banner appears only if/when an English post is also marked ai_draft (rare).
 */
export function TranslationBanner({
  locale,
  status,
}: {
  locale: Locale | 'en';
  status?: 'human_reviewed' | 'ai_draft';
}) {
  if (status !== 'ai_draft') return null;

  // English banner only fires if an English post is itself marked ai_draft.
  if (locale === 'en') {
    return (
      <aside
        role="note"
        className="my-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
      >
        This article is an AI-assisted draft pending human review. Send feedback to{' '}
        <a href="mailto:gurvinder@securityleader.ai" className="link-underline">
          gurvinder@securityleader.ai
        </a>
        .
      </aside>
    );
  }

  return (
    <aside
      role="note"
      lang={LOCALE_META[locale].hreflang}
      className="my-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      {LOCALE_META[locale].aiDraftBanner}
    </aside>
  );
}
