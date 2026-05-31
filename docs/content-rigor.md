# Content Rigor — Rules for Translation & Editorial Accuracy

Prevention rules for the SecurityLeader.ai blog. Every rule below has a stable ID (`R1`–`R20`) so it can be cited in commits, PR reviews, and CI output. Rules marked **AUTO** are enforced by `scripts/lint-content.mjs` and gated in CI; rules marked **REVIEW** require a human eye and are documented here so reviewers know what to check.

> **Why this exists.** On 2026-05-28 a Panjabi translation shipped with `ਉੱਪਰ` (above) where the source said `below`, and with a missing `?` on an interrogative heading. Both were caught only after deploy. These rules turn that class of error into a CI failure or a checklist item.

---

## Scope

Two corpora:

| Corpus | Path | Purpose |
|---|---|---|
| English source-of-truth posts | `posts/*.md` | Canonical content |
| Locale translations | `posts-i18n/<locale>/*.md` | Sibling translations (one file per locale per slug) |

Locales follow BCP 47 (`pa-in` for Panjabi/India Gurmukhi). The locale dir-name is the URL prefix in `/blog/<locale>/<slug>`.

---

## Rule Index

| ID | Rule | Tier | Mode |
|---|---|---|---|
| R1 | Required frontmatter fields | Document | **AUTO** |
| R2 | `translation_status` required on locale siblings | Translation | **AUTO** |
| R3 | English source declares `translation_status` when siblings exist | Translation | **AUTO** |
| R4 | Devanagari contamination in Gurmukhi (`pa-in`) | Translation | **AUTO** |
| R5 | Question-mark parity on headings | Translation | **AUTO** |
| R6 | Section-count parity | Translation | **AUTO (notice)** |
| R7 | Directional pointer (above/below) consistency with layout | Document | **REVIEW** |
| R8 | No legacy `-pa` / `-fr` locale-suffix URLs | Document | **AUTO** |
| R9 | `ai_draft` posts must carry a feedback contact | Translation | **AUTO** |
| R10 | Prohibited yoga/Hindu/Sanskrit vocabulary in `pa-in` | Translation | **AUTO** |
| R11 | Frontmatter `date` is valid ISO `YYYY-MM-DD` | Document | **AUTO** |
| R12 | Heading hierarchy: no jumps past one level | Document | **AUTO (notice)** |
| R13 | Markdown table column-count parity | Document | **AUTO** |
| R14 | Code fences are closed | Document | **AUTO** |
| R15 | Numbered-list step-count parity with source | Translation | **REVIEW** |
| R16 | Verification dates cited identically across siblings | Translation | **REVIEW** |
| R17 | Brand/proper-noun spelling (SecurityLeader.ai, OWASP, RCMP, NCSC…) | Document | **AUTO** |
| R18 | T/L/R/H glossary classification present in translations | Translation | **REVIEW** |
| R19 | `posts/<slug>` H1 is stripped by template — do not duplicate title in body | Document | **REVIEW** |
| R20 | Phone numbers / URLs preserved character-for-character | Translation | **REVIEW** |
| R21 | `pa-in` standalone fraud term uses `ਠੱਗੀ` (not `ਫ਼ਰਾਡ` / `ਘੋਟਾਲਾ`); `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` is the sole hybrid exception | Translation | **AUTO** |
| R22 | `pa-in` "community" uses `ਭਾਈਚਾਰਾ` (not `ਸੰਗਤ` / `ਸਮਾਜ`) outside named Sikh religious contexts | Translation | **REVIEW** |
| R23 | `pa-in` romanization uses IAST canonical (`ṭhaggī`, `tasdīq`, `naklī`); no `thaggee` / `tasdeeq` / `naklee` style | Translation | **AUTO** |

---

## R1 — Required frontmatter fields  **AUTO**

Every `*.md` post under `posts/` and `posts-i18n/<locale>/` must declare:

```yaml
---
title: "…"
date: "YYYY-MM-DD"
excerpt: "…"
author: "…"
tags: ["…", "…"]
---
```

Missing or empty fields fail the lint. `tags` may be empty (`[]`) but must be present.

## R2 — `translation_status` on locale siblings  **AUTO**

Every file under `posts-i18n/<locale>/` must declare:

```yaml
translation_status: "ai_draft"   # or "human_reviewed" | "community_reviewed"
```

`ai_draft` is the only value that triggers the AI-draft banner. Any other value renders the post without the banner — so accuracy matters.

## R3 — English source declares `translation_status` when siblings exist  **AUTO**

If `posts-i18n/<locale>/<slug>.md` exists for any locale, then `posts/<slug>.md` **must** declare `translation_status: "human_reviewed"`. This signals to the LanguageSwitcher component that this is the canonical reference.

## R4 — Devanagari contamination in Gurmukhi (`pa-in`)  **AUTO**

Files under `posts-i18n/pa-in/` may not contain any Unicode codepoint in the Devanagari block `U+0900–U+097F`. Gurmukhi script lives at `U+0A00–U+0A7F`. Devanagari characters in a Gurmukhi document typically come from autocomplete drift on Hindi-default keyboards and look correct to monolingual reviewers — only the codepoint reveals the error.

## R5 — Question-mark parity on headings  **AUTO**

If the English source heading ends in `?`, the locale-sibling heading at the same ordinal position **must** end in `?` (or the locale's culturally-appropriate question marker — Panjabi/Gurmukhi uses `?`).

**Example failure (2026-05-28):**

```
EN:   ## What to do first
PA:   ## ਪਹਿਲਾਂ ਕੀ ਕਰਨਾ ਹੈ      ← missing ?
```

Fix: append `?` to the Panjabi heading.

> Why a heading without a `?` matters: section indexes, anchor IDs, and screen readers cue intent off punctuation. A question rendered as a statement subtly reframes the section as authoritative-fact rather than asked-and-answered.

## R6 — Section-count parity  **AUTO (notice)**

The number of `##` headings in the locale sibling should equal the English source. Mismatches emit a **notice** (not an error) — intentional restructure is allowed but should be deliberate.

## R7 — Directional pointer consistency  **REVIEW**

Words that point to layout — `above`, `below`, `next`, `previous`, and their Panjabi equivalents `ਉੱਪਰ`, `ਹੇਠਾਂ`, `ਅੱਗੇ`, `ਪਿੱਛੇ` — must match the actual document layout in *both* the source and the translation. Translation drift can flip the orientation accidentally.

**Example failure (2026-05-28):**

```
EN:   3. **Report to the agency below** for your country.       ← agencies are below ✓
PA:   3. **ਉੱਪਰ ਦਿੱਤੀ ਏਜੰਸੀ ਨੂੰ ਰਿਪੋਰਟ ਕਰੋ** — ਆਪਣੇ ਦੇਸ਼ ਦੀ ਏਜੰਸੀ।   ← says "above" ✗
```

This rule cannot be fully automated (the word may be legitimately correct). The lint can optionally emit a notice listing every match for review when run with `LINT_DIRECTIONAL=1`.

**Reviewer checklist:** for every `above`/`below`/`ਉੱਪਰ`/`ਹੇਠਾਂ`, confirm the referent is in the asserted direction. If you flip a list, search the doc.

## R8 — No legacy locale-suffix URLs  **AUTO**

Once BCP 47 locale-prefix routing landed (SAY-291), the site canonical URL pattern is:

```
/blog/<slug>                    ← English (canonical)
/blog/<locale>/<slug>           ← translation, e.g. /blog/pa-in/reporting-centers-onepager
```

Any link of the form `/blog/<slug>-pa`, `/blog/<slug>-fr`, etc., is **stale** and fails the lint. Use locale-prefix URLs.

## R9 — `ai_draft` posts must carry a feedback contact  **AUTO**

Any post with `translation_status: "ai_draft"` must contain the reviewer-feedback email address (`gurvinder@securityleader.ai`) in its body. This ensures the AI-draft banner has somewhere to point.

## R10 — Prohibited vocabulary in `pa-in`  **AUTO**

Per `docs/CLAUDE.md` (OWASP ASVS Panjabi translation rules) and the project's Gurmat-aligned voice, the following are **disallowed** in `posts-i18n/pa-in/`:

- Yoga terminology: `chakra`, `kundalini`, `pranayama`, `third eye`, `aura`
- Hindu deity names or mythology references
- Sanskrit mantras outside of Gurbani context
- The Devanagari form of Sanskrit terms (also caught by R4)

The lint includes a regex sweep. False positives can be allowlisted by adding a leading `<!-- rigor: allow R10 -->` HTML comment on the line.

## R11 — Frontmatter date format  **AUTO**

`date` must parse as ISO `YYYY-MM-DD`. Both written-out dates (`May 27, 2026`) and reversed (`27-05-2026`) fail the lint and break date-sort in the index.

## R12 — Heading hierarchy  **AUTO (notice)**

No jumps past one heading level (e.g., `##` followed directly by `####`). Heading skips break in-document table-of-contents generators and screen-reader navigation.

## R13 — Markdown table column-count  **AUTO**

Every row in a table must have the same number of `|`-delimited cells as the header row. Off-by-one errors silently rendering as misaligned data are a common translation copy-paste failure.

## R14 — Code fences closed  **AUTO**

Every opening ```` ``` ```` must have a closing ```` ``` ````. An unclosed fence swallows the rest of the post and is invisible until preview.

## R15 — Numbered-list step-count parity  **REVIEW**

If the English source has an ordered list of N steps, the locale sibling should have N steps. A skipped step in translation is a real-world error mode (especially when reviewers paste in chunks). Cannot be fully automated because lists may be intentionally restructured; reviewers should diff list counts when proofing.

## R16 — Verification dates consistency  **REVIEW**

When a post claims "verified on YYYY-MM-DD" in the body, every locale sibling must cite the same date. A divergent date implies the translation re-verified independently — which is allowed but should be explicit, not accidental.

## R17 — Brand / proper-noun spelling  **AUTO**

The following must appear verbatim wherever they appear (case-sensitive):

```
SecurityLeader.ai     (not Securityleader, security-leader, SecurityLeaderAI)
OWASP                 (not OWWASP, Owasp)
NCSC                  (UK National Cyber Security Centre)
RCMP                  (Canadian Royal Canadian Mounted Police)
CAFC                  (Canadian Anti-Fraud Centre)
ASVS                  (OWASP Application Security Verification Standard)
ic3.gov               (FBI Internet Crime Complaint Center)
Action Fraud          (UK legacy — note: now renamed "Report Fraud" per Dec 2025)
Report Fraud          (UK current — replaced Action Fraud)
```

In Panjabi posts, transliteration in parentheses is allowed *after* the English form: `OWASP (ਓ.ਡਬਲਯੂ.ਏ.ਐਸ.ਪੀ.)`.

## R18 — T/L/R/H glossary  **REVIEW**

Translation glossaries should classify each term as **T**ranslated, **L**oan, **R**etained, or **H**ybrid. Posts that introduce a new technical term in translation should add it to their inline glossary. Cannot be fully automated — reviewers check for glossary completeness on new translations.

## R19 — Do not duplicate H1 in body  **REVIEW**

The blog template (`src/app/blog/[slug]/page.tsx` and `src/app/blog/[locale]/[slug]/page.tsx`) **strips the leading `#` heading** from the markdown body and renders `post.title` in the header. Leaving the H1 in the body is harmless (it gets stripped) but writing the post H1 as `##` will produce a missing-H1 in the rendered HTML — a real a11y regression.

Convention: keep the leading H1 in the markdown. The template handles removal.

## R20 — Phone numbers / URLs character-exact  **REVIEW**

Translation never alters a phone number or URL. `1-888-495-8501` is the same in every locale; do not convert digits to Gurmukhi numerals (those are reserved for editorial use like version numbers `੫.੦`). URLs are sacred — re-typing them is the easiest way to introduce a phishing-grade typo.

## R21 — Fraud-term policy in `pa-in`  **AUTO**

Locked 2026-05-30 after corpus-wide consistency audit. The standalone word for "scam" or "fraud" in `posts-i18n/pa-in/` **must** be `ਠੱਗੀ`. The following are disallowed in standalone use:

- `ਫ਼ਰਾਡ` (with nukta) — retired except in the single hybrid term below.
- `ਫਰਾਡ` (no nukta) — was a spelling inconsistency; retire.
- `ਘੋਟਾਲਾ` — Hindi-origin; not in our glossary.

**Sole exception:** `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` is retained as a type-H hybrid loan term, anchor for the dedicated romance-fraud post. The compound is permitted; the bare `ਫ਼ਰਾਡ` token is not.

Why the policy: bilingual readers said the corpus felt inconsistent ("Is this `ਠੱਗੀ` the same as `ਫ਼ਰਾਡ`?"). Pinning to a single Gurbani-rooted term reduces cognitive load and matches the audience the Digital Seva series serves. See policy block at the bottom of `panjabi-translation-reference.md`.

## R22 — "Community" term policy in `pa-in`  **REVIEW**

`ਭਾਈਚਾਰਾ` is the standard translation of generic "community." `ਸੰਗਤ` is reserved for named Sikh religious contexts (e.g., quoting "sangat review" as a process name). `ਸਮਾਜ` is not used.

Cannot be fully automated because the legitimate `ਸੰਗਤ` usage is context-sensitive. Reviewers verify on every translation that "community" → `ਭਾਈਚਾਰਾ` unless the context is explicitly Sikh-religious.

## R23 — Romanization style in `pa-in`  **AUTO**

All Panjabi romanizations in `posts-i18n/pa-in/` use IAST canonical (Punjabi University Patiala convention, modified ISO 15919):

- Retroflex: `ṭ ḍ ṇ` (dot below) — *not* `t d n`
- Long vowels: `ā ī ū` (macron) — *not* doubled letters (`aa`, `ii`, `oo`)
- Nasal: `ṅ` (velar), `ñ` (palatal)
- Aspirated cluster: `chh`
- Glottal / apostrophe-like: `ʼ`

Lint detects English-style romanization patterns (`thaggee`, `tasdeeq`, `pachhaan`, `naklee`, `surakhya`) and flags them as errors. Allowlist with `<!-- rigor: allow R23 -->` only when the romanization is *intentionally* using a different convention (e.g., quoting a published source verbatim).

---

## Running the lint

```bash
npm run lint:content                  # all rules, error on R-failures
LINT_DIRECTIONAL=1 npm run lint:content  # also emit R7 notices
```

CI runs `npm run lint:content` on every PR and every push to `main`. Failures block deploy.

## Adding a rule

1. Add a section here with rule ID, scope, example, why-it-matters.
2. If automatable, implement in `scripts/lint-content.mjs` keyed to the rule ID.
3. If it changes the lint contract, bump rule IDs only at the end (do not renumber — IDs are referenced from commits).
4. Add a fixture under `tests/content-rigor/` if the logic is non-trivial.

## Allowlisting a known false positive

Add an HTML comment on the offending line:

```markdown
This page references the Hindu Kush mountain range. <!-- rigor: allow R10 -->
```

The lint reads inline `<!-- rigor: allow R# -->` markers and skips the matching rule on that line. Use sparingly.

---

## Authored by

Gurvinder Singh (SecurityLeader.ai). Rule catalog version `v1.0` — 2026-05-28.
