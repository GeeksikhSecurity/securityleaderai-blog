# Prevention Mechanisms — Rules vs. Mechanisms

Cross-cutting reliability discipline for any agentic work in this repo. **Companion to** `content-rigor.md` (R1–R23, what to enforce on content) and `bilingual-blog-sop.md` (operational SOP, what to do step-by-step). Where those documents say *what good looks like*, this document says *what stops a failure class from recurring*.

> **The one-line principle.** Rules catch the first occurrence; mechanisms catch the rest. If a class of failure recurs after a rule exists, the rule is documentation, not prevention — upgrade it to a mechanism.

This document distills the lessons from the 2026-05-31 agentic red-team build session ("Lessons Learned & Auto-Improvement") and the 2026-05-28 → 2026-05-30 four-commit Vercel-fix cycle (L1–L12 in the bilingual-blog SOP) into five mechanisms that can be referenced by ID in commits, in chat, and in CI scaffolding.

---

## Mechanism index

| ID | Mechanism | Triggered when | Honored by |
|---|---|---|---|
| **M1** | Observe-before-generate | About to produce something that must conform to an existing format | `cat` / `head` / sample-read of the real artifact before authoring |
| **M2** | Probe-capability-before-invoke | About to call a tool or depend on a path/file/env var | `which` / `find` / `history` / `gh status` / read-only `git status` |
| **M3** | File-existence-assertion | About to act on a file presented in a panel/agent output | `ls -la` + `wc -l` + hash on actual disk path before edit |
| **M4** | Idempotent + `--check` + backup | About to write a state-mutating script (filesystem, config, remote) | Re-runnable script, dry-run flag, backup of anything not owned, end-of-run count vs expected |
| **M5** | Rule-to-mechanism upgrade loop | Same failure class observed in two or more sessions | Promote the rule to a CI gate, preflight check, embedded payload, refuse-by-default boundary |

---

## M1 — Observe-before-generate

**Failure class.** Generated an artifact (config file, frontmatter, glossary entry, route file) against an *assumed* schema. The real schema differed. Rework was required.

**Concrete examples from this codebase.**

- *2026-05-28* — initial bilingual feature shipped `src/app/blog/[locale]/page.tsx` alongside `[slug]/page.tsx`. Next.js 16 build refused: ambiguous routes (SOP L1). Reading the Next.js 16 dynamic-routes file-convention reference *before* adding the directory would have surfaced the restriction immediately.
- *2026-05-28* — Phase A added inline `<span class="badge">` markers to Megalodon post. `remark-html` silently stripped raw HTML by default (SOP L2). Reading the remark-html v16 sanitization defaults *before* adding the raw HTML would have surfaced `sanitize: false` as the required option.
- *2026-05-31 (external red-team session)* — generated `qmd/index.yml` against a list-of-`name:` schema; the real config was a keyed map with `pattern:`/`ignore:`/nested `context:`. Wrong generator written twice.

**Mechanism (not just rule).**

Before authoring any file that must fit an existing system:

1. Locate one real instance — `find . -name '<filename>' -not -path '*/node_modules/*' | head -3`
2. Read it — `cat $(...)` or `Read` tool with explicit path
3. Confirm the assumed schema matches the real one; if not, conform to the real one
4. Only then generate the new file

For markdown frontmatter: read three existing posts in the same directory before writing a fourth. For Next.js routes: read the sibling `page.tsx` files before adding a new dynamic segment. For workflow YAML: `grep -E '^[[:space:]]*uses:' .github/workflows/*` before adding a new action.

**Wire-up in this repo.** No CI gate today. Candidate future automation: a pre-commit hook that runs `node scripts/lint-content.mjs --observe-mode <file>` and reports the schema diff against the nearest sibling.

---

## M2 — Probe-capability-before-invoke

**Failure class.** Assumed a binary/path/env var was available and well-shaped. It wasn't.

**Concrete examples.**

- *2026-05-30* — `npx next build --no-lint` failed with "unknown option '--no-lint'" because Next.js 16 dropped that flag. `npx next build --help` first would have caught it.
- *2026-05-31 (external)* — assumed `qmd` was a PATH binary. It was a Bun TypeScript CLI run from a cloned fork. `which qmd; history | grep qmd` revealed it instantly.
- *2026-05-31 (external)* — assumed `GOBIN` resolved correctly; it fell back to `/bin`. Assumed `pip install` would work; PEP 668 blocked it.

**Mechanism.**

Before invoking any tool or relying on any path/file/env var:

```bash
which <bin> 2>/dev/null || command -v <bin> 2>/dev/null || echo "MISSING: <bin>"
test -f <path> && echo "OK: <path>" || echo "MISSING: <path>"
test -n "$<ENV_VAR>" && echo "OK: $<ENV_VAR>" || echo "MISSING: $<ENV_VAR>"
<bin> --help 2>&1 | head -20   # confirm the flag/subcommand shape
```

For Linear MCP / Vercel MCP / Notion MCP: run a read-only call (e.g. `list_teams`, `list_deployments`) before any write. If the read fails, the write would fail too — so gate writes on the read.

For git remotes: `git remote -v && git branch --show-current` before any push.

**Wire-up.** A preflight pattern lives in `scripts/lint-content.mjs` for the rigor lint's own dependencies (it's pure Node, zero externals — its own M2 mitigation). Future: `tools/preflight.sh` that runs the M2 chain for the most common environments (Next.js, Vercel CLI, gh, Linear MCP).

---

## M3 — File-existence-assertion

**Failure class.** A file was "presented" in a chat panel, agent output, or build script — but didn't exist at the expected disk path, or existed in a different directory than expected.

**Concrete examples.**

- *2026-05-31 (external)* — THREE times in one session, files shown in a panel weren't all downloaded, or landed in the repo root instead of the target directory: `test_wrappers.py` (never placed), framework `.md` files (1 of 4 placed), `scope_guard.py` (missed while `run_scan.py` made it). Each surfaced only when an `import` or test failed.
- *2026-05-29* — Vercel runtime logs showed `ENOENT: no such file` on `/blog/pa-in` even though the directory `posts-i18n/pa-in/` existed locally. The static file tracer hadn't bundled the dir contents (SOP L12). Reading the Vercel build log's *static-prerender list* would have surfaced "no `/blog/pa-in` route present" before the runtime 500.

**Mechanism.**

When acting on files an agent or panel claims to have produced:

1. `ls -la <path>` — assert exists
2. `wc -l <path>` — assert non-empty (and roughly the expected size)
3. `head -3 <path>` and `tail -3 <path>` — assert the file content looks structurally right (frontmatter at top, expected anchor at bottom)
4. For multi-file deliverables: embed the file contents inline in a self-extracting script (base64 + byte-verified) so the human placing them can't drop one; the script's own end-of-run counts results against an expected number

**Wire-up.** The `setup-redteam.sh` pattern from the 2026-05-31 session is the canonical M3 mitigation: scripts carry their payload, decode + write + verify in one idempotent run. Future blog-repo equivalent: `scripts/scaffold-post.sh` that writes both `posts/<slug>.md` and `posts-i18n/<locale>/<slug>.md` from a single template + verifies both with `wc -l` and content head/tail.

---

## M4 — Idempotent + `--check` + backup

**Failure class.** A one-shot script assumed a clean target and a fixed layout. When either didn't hold, the script half-worked, leaving partial state.

**Concrete examples.**

- *2026-05-31 (external)* — early index scripts assumed a clean target; when the layout drifted, the scripts half-worked. The fix: `setup-redteam.sh` was idempotent, backed up nothing it didn't own, embedded canonical docs (base64 + byte-verified), had `--check`, and ended by counting results against expected.
- *2026-05-29* — first attempt to fix the route ambiguity deleted `[locale]/page.tsx` but the directory remained, so Next.js 16 still refused. A `--check` preview would have surfaced "the directory itself still declares the dynamic segment" (SOP L1 root cause analysis).

**Mechanism.**

Any state-mutating script must:

1. **Be idempotent.** Re-running it on already-correct state is a no-op (or only re-asserts the state). No "already exists" errors.
2. **Have `--check` (dry-run).** Print every action it would take. No mutations.
3. **Back up anything it doesn't own.** Before overwriting a user-edited file, `.bak` it.
4. **End with a count.** "Wrote 5 files, expected 5. OK." If the count diverges, exit non-zero.
5. **Refuse to run partially.** If preconditions aren't met, fail before the first mutation, not halfway through.

**Wire-up.** Adopted in this repo: `scripts/lint-content.mjs` is idempotent (read-only by definition). Future: `scripts/scaffold-post.sh` and any forthcoming `scripts/setup-*.sh` follow the pattern. CI workflows in `.github/workflows/` follow the spirit (one-shot but report what they did).

---

## M5 — Rule-to-mechanism upgrade loop

**The calibration.** If the same failure class recurs after a rule exists, the rule is documentation, not prevention. Upgrade it.

**Cycle.**

```
CAPTURE  — end-of-session: what caused rework? (2-min retro)
ENCODE   — promote recurring cause to a rule (this doc, content-rigor.md, SOP)
TRACK    — Linear issue for adoption, link to the rule
APPLY    — next session, the rule fires BEFORE the failure (preflight, not post-mortem)
MEASURE  — did the rule prevent recurrence?
           if a class repeats 3×, the rule is too weak → tighten or make it MECHANICAL
```

**Concrete examples of the loop.**

- *R5 (heading question-mark parity)* — Born from one occurrence (Panjabi `## ਪਹਿਲਾਂ ਕੀ ਕਰਨਾ ਹੈ` missing `?`). Encoded as AUTO in `scripts/lint-content.mjs`. **Recurrence prevented**: CI now fails any new pa-in post that drops the `?`. Status: mechanism.
- *R4 (Devanagari contamination)* — Born from a planned check; first implementation false-positived 18× on `।` (shared danda). **Upgraded** the regex to exclude U+0964/U+0965. Status: mechanism with codepoint allowlist documented inline.
- *R21 (fraud-term policy)* — Born from corpus-wide inconsistency (`ਫ਼ਰਾਡ` vs `ਠੱਗੀ`). Encoded as AUTO with lookbehind for the `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` exception. **Recurrence prevented**: CI now fails any pa-in post that uses standalone `ਫ਼ਰਾਡ`. Status: mechanism.

**Counter-example (rule that didn't become mechanism).**

- *R22 (community word — `ਭਾਈਚਾਰਾ` over `ਸੰਗਤ`)* — Marked REVIEW because context-sensitive (`ਸੰਗਤ` is legitimate in Sikh religious contexts). If a future translation drift makes this recur, the M5 upgrade path is to embed Moqlora-via-LM-Studio context judgment (per the local-model-review proposal) and gate the lint on its verdict. Until then, R22 remains documentation.

**Wire-up.** Every commit message that touches a rule should cite the rule ID. Every retro should ask: "Did any rule fire AFTER a failure when it could have fired BEFORE?" If yes, M5 applies.

---

## Pre-flight checklist (run mentally before any build step)

Reproduced verbatim from the 2026-05-31 lessons doc; this is the actionable one-pager:

- [ ] **M1** — Am I generating something that must match an existing format? → read a real instance first
- [ ] **M2** — Am I invoking a tool / depending on a path or file? → `which`/`find`/`history` first
- [ ] **M3** — Are files I'm acting on actually on disk where I think they are? → `ls -la` + `wc -l` first
- [ ] **M4** — Am I writing a script that mutates state? → idempotent + `--check` + backup + verify
- [ ] **Mechanical boundary** — Is this a safety-relevant capability? → make the boundary mechanical, not intentional
- [ ] **Embed + self-verify** — Handing files to a human to place? → embed payload + self-verify, don't rely on manual download

---

## Cross-reference index

| External signal | Maps to |
|---|---|
| SOP L1 (ambiguous routes) | M1 (read sibling files before adding dynamic segment) |
| SOP L2 (remark-html sanitize) | M1 (read render-pipeline config before adding raw HTML) |
| SOP L3 (Vercel wrong repo) | M2 (`git remote -v` before debugging missing deploys) |
| SOP L7 (above/below directional) | R7 + M1 (read the destination layout before translating the pointer word) |
| SOP L11 (4-commit fix cycle) | M2 + M4 (`next build` locally before push) |
| SOP L12 (dual log surfaces) | M2 (read both Vercel build log AND prior runtime log) |
| R4 false-positive (danda) | M5 (research codepoint allowlist before shipping a script-contamination check) |
| R21 (ਫ਼ਰਨ migration) | M5 (upgraded from documentation to lookbehind regex with single allowed compound) |
| R23 (IAST canonical) | M5 (upgraded from convention to disallowed-pattern regex) |

---

## Authored by

Gurvinder Singh (SecurityLeader.ai). Mechanism catalog version `v1.0` — 2026-05-31. Distilled from the agentic red-team build session "Lessons Learned & Auto-Improvement" plus the bilingual-blog SOP's L1–L12 failure-mode table. Companion documents: `docs/content-rigor.md`, `docs/bilingual-blog-sop.md`, `docs/research-blog-visual-plan.md`.
