# Handoff — local working-tree reconciliation + cubic verdicts (2026-07-05)

For the local Claude Code session on the Mac
(`/Volumes/2TBSSD/Development/Git/Work/securityleaderai-blog/securityleaderai-blog`,
currently on `content/pa-in-uk-consistency` with ~11 modified + ~25 untracked
files). Written by the remote session that shipped PR #3.

## The one big thing first

The local tree predates the audio system that is now **merged and live on
main** (PR #3). Two parallel audio designs exist:

| | main (shipped, live) | local tree (June 22, unshipped) |
|---|---|---|
| Player | `<AudioOverview />` — native `<audio>`, zero client JS | `src/components/audio-player.tsx` — custom client player |
| Frontmatter | `audio_url` + `audio_kind: overview\|read_aloud` | `audio_url` + `audio_overview_url` |
| Lint | R30 (both directions, in catalog v1.4) | R30/R31/R32 variants, not in catalog |

**Recommendation: keep main's design; do not merge the local player.** It
shipped, it's verified by listening, it has no client JS to break, and
cubic's own finding #6 (404 fallback link) is a bug in the local player that
main's design cannot have. Port only what main lacks: `infographic`
frontmatter, the R29 brand allowlist (fixed per below), `share-row.tsx`
if wanted, and the docs/scripts worth keeping. Start with
`git stash` or a WIP commit of the local tree, then rebase the keepers onto
main piece by piece — never as one blob.

## Cubic verdicts (all 7 checked)

1. **R29 brand allowlist unanchored — VALID (P2).** Root cause: brand
   regexes compiled without the `(?<![\w])…(?![\w])` edges that
   `countryVariantRe` uses, plus scrubbing with `''` splices adjacent
   tokens ("Repair India" → "Rep"). Fix exactly as cubic says: same
   lookaround edges as the country variants, replace with a single space.
   Then re-run the R29 self-test (a body "Air India" must stay silent, a
   body "India" must fire).
2. **R30/R31/R32 missing from content-rigor.md — VALID locally, already
   FIXED on main for R30.** Main's catalog is at v1.4 with R30 documented
   and **R29 reserved for PR #2**. Root cause: local rules were added
   without the catalog step ("Adding a rule" checklist in that doc). After
   rebasing onto main: local R31 → renumber to avoid future collisions,
   and if the design consolidates on main's `audio_url`/`audio_kind`,
   R31 (audio_overview_url) and R32 (fallback format) likely disappear
   entirely — main's R30 covers both directions.
3. **`infographic` existence check missing — VALID (P2).** Same failure
   class R30 was built for: frontmatter pointing at a missing asset =
   broken `<img>` + broken og:image preview, silently. Add the symmetric
   rule (next free ID after main's R30; document it in the catalog in the
   same commit): must start with `/images/`, file exists under `public/`,
   plus the reverse orphan notice if desired. The two unreferenced Gurmukhi
   PNGs prove drift is live, not theoretical.
4. **JSON-LD omits infographic while og:image has it — VALID (P3).** One
   line: pass `image: post.infographic` to `articleJsonLd` too. The whole
   point of seo.ts is that these never disagree.
5. **Inert eslint-disable — VALID (P3).** This repo removed eslint by
   policy (`npm run lint` = `tsc --noEmit`), so the directive suppresses
   nothing, and it wasn't even on the `<img>` line. Delete the directive,
   keep the plain-English "why a plain img" comment.
6. **Auto-derived .m4a fallback link can 404 — VALID (P3), and an argument
   for dropping the component.** Root cause: `buildSources` invents an
   `.m4a` sibling that read-alouds don't have, and the failure UI links
   every source. If the custom player is kept anyway: only link sources
   that were explicitly provided. Preferred: adopt main's `<AudioOverview />`
   and delete `audio-player.tsx` — the bug class vanishes.
7. **Unreferenced binaries about to ship — VALID (P3).** The four
   Gurmukhi-named `.m4a` are byte-duplicates of the renamed overview files
   already live on main (remote session verified sizes/timestamps); the two
   PNGs and the PDF are referenced nowhere. Don't commit: delete the
   duplicate `.m4a`s, move the PDF/PNGs out of `public/` (or reference them
   intentionally — the PDF is prior art for the printable-resources roadmap
   item on SAY-372). Note main's R30 already emits orphan notices for
   unreferenced files under `public/audio/` once tracked.

## Also on this branch, ready for the local session

- `scripts/generate-audio-parler.py` — committed replacement for the
  untracked local script. Read its docstring: deps, one command per post,
  outputs `public/audio/pa-in/<slug>.mp3` (intentionally overwrites the
  licensing-blocked MMS files), then two frontmatter lines + `npm run
  lint:content`.
- `outputs/whatsapp-share-pa-2026-07-05.md` — sangat share message
  (ai_draft; one human read before mass sharing).
- `docs/executive-overview-audio-and-asvs-resume.md` — plain-language
  overview + the ASVS resumption playbook.

## Suggested local session order

1. WIP-commit or stash the local tree (nothing gets lost — Lesson 1).
2. Fetch main; rebase keepers onto it per the table above.
3. Apply cubic fixes 1, 3, 4, 5 (+ 6 only if the custom player survives).
4. Delete/relocate the item-7 binaries.
5. Run the full gate (lint:content, lint:code, tsc, build, h1=1) and push.
6. Then the fun part: run `generate-audio-parler.py` for the four remaining
   read-alouds, listen, wire frontmatter, push.
