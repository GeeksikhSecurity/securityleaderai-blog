# Daily Decision Summary — 2026-07-05

## High-Level Overview

The bilingual audio feature went from "files stranded on a local Mac" to
**live on securityleader.ai, human-verified**. The audio was located in the
local clone's `public/audio/pa-in/` folder, reviewed file-by-file with a
licensing gate, pushed in two batches, wired into all five Panjabi posts,
merged via PR #3, and auto-deployed. The owner confirmed the players work by
listening on three production pages. One new roadmap item (printable
bilingual helpline sheets) was captured for later.

## Decisions Made

### 1. Located the audio; reviewed the folder with a licensing gate

Decision: Ship only the 4 NotebookLM `<slug>-overview.mp3` files initially;
hold back the MMS-TTS read-alouds and `samples/` (CC-BY-NC 4.0, not usable
commercially) and skip the duplicate `.m4a` exports.

Why: NotebookLM's terms permit publication; MMS-TTS's license does not.
Content review and license clearance are different gates.

Other path considered: Cloudflare R2/CDN hosting per the June 21
architecture doc. Skipped — ~27 MB in-repo is fine at this scale; revisit
if the library grows.

### 2. Two-batch staging that was never broken

Decision: Audio files first (orphans = R30 *notice*, build stays green),
frontmatter mappings second (R30 errors would catch any mismatch).

Result: Both batches verified — 4 overviews wired (`audio_kind: overview`),
then all gates green at every step.

### 3. Gurdwara read-aloud published on owner's decision

Decision: The owner reviewed `gurdwara-charity-donation-fraud.mp3` and
directed publication; wired as `audio_kind: read_aloud` (verbatim-narration
label "ਇਹ ਲੇਖ ਸੁਣੋ", not the AI-discussion label).

Caveat recorded: engine provenance not re-confirmed in-session; if it is
MMS output, swap the file for an Indic Parler-TTS regeneration — the wiring
stays identical.

### 4. Merged and deployed

PR #3 → main (`33aaa23`); Vercel production deployment READY. In-container
HTTP spot-checks were blocked by a container network failure, so final
confirmation came from the Vercel API plus the owner's listening test.

### 5. Roadmap: printable bilingual resources (needed later)

Per-post printable companion: country helplines + key facts, EN + Gurmukhi.
Captured as a comment on Linear SAY-372 because the workspace hit Linear's
free issue limit (now a "Do not retry" entry). Building blocks:
reporting-centers-onepager (helpline source of truth), existing print CSS,
`Panjabi_Elder_Safety_Manual.pdf` on the Mac as prior art.

## Paths Not Taken

- **Publishing the MMS-TTS read-aloud batch** — CC-BY-NC licensing; Parler
  regeneration is the clean path.
- **Committing the `.m4a` overviews** — duplicates at twice the MP3 size.
- **CDN hosting now** — premature at ~27 MB.
- **Creating a new Linear issue** — workspace issue limit; used a comment.

## Verification Evidence

- lint:content 0 errors (R30 5/5 mappings, 0 orphans); tsc, lint:code clean
- 43/43-page builds after each change; one `<audio>` + one `<h1>` per page,
  kind-appropriate labels
- Vercel production deployment from `33aaa23`: READY
- **Owner listening test on production: 3/5 pages confirmed**
  (global-scam-alert, whatsapp, tech-support)

## Follow-Ups

- Spot-check the remaining two pages by listening: reporting-centers
  (overview), gurdwara (read-aloud).
- Parler-TTS read-alouds for the other four posts (SAY-372); salvage the
  untracked June 22 scripts/docs from the Mac (`generate-audio-parler.py`,
  `panjabi-audio-sop.md`).
- Sangat review of the Panjabi audio labels in `src/lib/locales.ts`.
- Printable bilingual resources — design decision first (print-CSS vs PDF),
  then per-post rollout. Later.
