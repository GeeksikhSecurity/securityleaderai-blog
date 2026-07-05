# Daily Decision Summary — 2026-07-04

## High-Level Overview

Today's work fixed the bilingual (Panjabi) audio overview feature that "did not
work" after the June 22 session. The investigation showed the feature never
failed in production — it was **never committed or pushed**: the player code,
frontmatter plumbing, lint guard, and NotebookLM `.m4a` files described in
Linear SAY-372 exist only on the author's local machine. The full integration
was rebuilt from scratch on branch `claude/bilingual-audio-overview-fix-ljszif`,
designed so a half-wired state (mapping without file, or file without mapping)
now fails or warns at build time instead of shipping silently broken. The
Daily Decision Digest workflow (this document) was also set up today.

## Decisions Made

### 1. Root cause: the June 22 audio work never reached the repository

Decision: Treat "the last changes did not work" as a lost-work problem, not a
bug, and rebuild rather than debug.

Why: GitHub has only three branches (`main`, the merged PR #1 branch, the open
PR #2 branch) and none contain any audio code, components, lint rules, or
`public/audio/` files. Nothing existed to fix in place.

Other path considered: Recovering the June 22 code.

Why skipped: It lives only on the author's local machine, unreachable from
this environment.

Changed: Nothing (diagnosis step).

Result: Clear scope for the rebuild.

### 2. Rebuilt the audio integration with a native player

Decision: `<AudioOverview />` wraps the browser-native `<audio controls>`
element — no custom play/pause/scrubber UI, no client JavaScript.

Why: Native controls give keyboard access, screen-reader support, and
media-session integration for free, matching the project's CSS-first and
lean-dependency rules. The custom player was the most fragile part of the
lost work.

Other path considered: Rebuilding the custom CSS-first player from the Linear
description.

Why skipped: More surface to break, no accessibility gain over native
controls.

Changed:
- `src/components/audio-overview.tsx` (new component)
- `src/lib/posts.ts` (`audio_url` / `audio_kind` frontmatter → `Post` type)
- `src/lib/locales.ts` (`AudioKind` type + Panjabi label strings)
- Both post pages (`/blog/[slug]` and `/blog/[slug]/[post]`) render the block
  above the article body when a post declares `audio_url`.

Result: Type check, both linters, and the 43-page build all pass. A
temporary-fixture build proved the player renders in the generated Panjabi
page HTML with the correct MIME type and exactly one `<h1>`.

### 3. Honest labeling: "overview" is not "read-aloud"

Decision: Frontmatter carries `audio_kind: overview | read_aloud` (default
`overview`), and each kind gets different bilingual labels. The overview label
says explicitly it is an AI-made discussion about the article, not the article
word-for-word.

Why: The key SAY-372 finding — NotebookLM's two-host overview is an engagement
layer, not the accessibility read-aloud. Mislabeling AI-generated content
would mislead the exact audience (elders, non-technical readers) the Digital
Seva series protects.

Result: Panjabi strings live in `LOCALE_META.audioLabels`, flagged for sangat
review like all pa-in copy.

### 4. New lint rule R30 guards the mapping in both directions

Decision: `scripts/lint-content.mjs` now fails the build when `audio_url`
points at a missing file, a wrong path prefix, or an unsupported format, and
warns when a file under `public/audio/` is referenced by no post.

Why: The failure mode being fixed is silence. Every half-wired state is now
loud at build time. The reverse-direction check implements today's follow-up
suggestion (every audio file must have a matching `audio_url`).

Result: Self-tested live — all five error cases fire, the orphan notice
fires, and a correct file+mapping passes clean. Documented as R30 in
`docs/content-rigor.md` (catalog v1.4); R29 stays reserved for the open PR #2.

### 5. Adopted the Daily Decision Digest workflow

Decision: Decision notes append to `work/decision-log/YYYY-MM-DD.md` during
work; the read-only `decision-digest` sub-agent
(`.claude/agents/decision-digest.md`) rolls them into
`outputs/daily-summary-YYYY-MM-DD.md`. Core instruction added to CLAUDE.md.

Why: End-of-day rollup with lightweight capture, chosen over real-time
logging (noisy, fragile). The log is the loop's on-disk memory — including a
"Do not retry" section so dead ends are never rediscovered.

## Paths Not Taken

### Adding audio_url mappings to the five Panjabi posts today
Skipped because the audio files are not in this repository — a mapping without
its file is exactly the broken state R30 now blocks. Once the `.m4a` files are
added, each mapping is one frontmatter line and R30 verifies it.

### Regenerating audio in this session
Skipped: NotebookLM export is a manual browser step, and the two TTS paths are
blocked (Gemini TTS needs an AI Studio key; MMS-TTS is CC-BY-NC, unusable
commercially — recorded under "Do not retry").

### Rebuilding the custom audio player component
Skipped: native `<audio>` controls do the job with less risk (see Decision 2).

## Follow-Ups

- Add the NotebookLM `.m4a` overviews (on the author's machine) to
  `public/audio/pa-in/` and set `audio_url` + `audio_kind: overview` in each
  pa-in post — SOP Step 12 in `docs/bilingual-blog-sop.md` walks through it.
- Verbatim read-aloud track via Indic Parler-TTS (Apache-2.0, proven in
  SAY-376), then `audio_kind: read_aloud`.
- Sangat review of the new Panjabi audio labels in `src/lib/locales.ts`.
- Decide long-term audio hosting (in-repo vs CDN) once file sizes are known.
- Update Linear SAY-372 with this branch once pushed.
