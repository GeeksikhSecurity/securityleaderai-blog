# SecurityLeader.ai — Content Maintenance & Visual Automation: Claude Code Handoff

**Source of truth:** Notion → Thinking Toolkit → "Content Curation and Automated Visual Workflow (No NotebookLM/Gemini)"
**Repo:** `GeeksikhSecurity/securityleaderai-blog` (Vercel-deployed, team `singhs-kaurs`, project `prj_XEHglLkPPqmYgRvVJ2OoKcCiQeEc`)
**Status date:** Sep 5, 2026

This is the punch list as given by the site owner, persisted here verbatim
so it lives in the repo (not only in a chat transcript) and the next
session can pick up Task 2 onward without re-deriving it. Progress is
tracked in the task-by-task status notes below each section, and in
`work/decision-log/2026-09-05.md`.

---

## Context (why this exists)

The blog's front page and stats are not reflecting newer published content (e.g. the Aug 27, 2026 ASVS/AISVS Panjabi review hub launch — 27 documents live at `/blog/asvs-panjabi-review-hub`), while older content has no mechanism to be flagged stale or retired. A workflow to fix this was designed in Notion. Two pieces are already done there:

- Workflow doc written and saved (6 stages: Capture → Curate → Create → Visualize → Publish → Retire/Refresh)
- Visual Artifacts database in Notion has a new Artifact Type option, **"Automated Skill Render (Mermaid)"**, set as the intended default renderer (replacing manual NotebookLM/Gemini Canvas steps, which are out of scope for automation)

Everything below is **not yet built**, except where a status note says otherwise.

---

## Task 1 — Repo maintenance scan (do this first, standalone, no dependencies)

**Status: done, 2026-09-05.** Report: `docs/maintenance-scan-2026-09-05.md`.
Fixed in-place: 2 dead internal links, the stray double-quote CSS bug.
Found, not fixed (content/editorial decisions): the hub's stale "27
documents" count vs. its actual 28-row table, and the structural reason the
homepage can't reflect the ASVS/AISVS launch (all 48 of those posts are
correctly `hidden: true` — the fix is a new public announcement post, not a
counting change). External-link status checks were only partially possible
— this session's network egress is restricted to `github.com`; the other
~90 hosts (620 URLs) need to be checked from an environment with normal
outbound HTTPS.

Run against `securityleaderai-blog`:

1. Crawl all posts/pages for internal links (routes, post-to-post links) and flag any pointing to non-existent pages.
2. Check external links for dead/redirected URLs (HTTP status check).
3. Compare the homepage's stat counters (post count, chapter count, etc.) against the actual number of live posts/chapters in the repo — flag any mismatch.
4. List posts with no content change in 90+ days (via git log / last commit per file) as retire/refresh candidates.
5. Known pre-existing issue to check while in there: a stray double-quote rendering bug on tech-support posts (open, unresolved as of last review).
6. Output: a single markdown report — file list, broken links, stat mismatches, stale-post candidates.

## Task 2 — Mermaid-generation skill

**Status: done, 2026-09-06.** Skill: `.claude/skills/mermaid-diagram/SKILL.md`.
Renderer: `scripts/mermaid/render.mjs`. Worked example (a real post, not a
synthetic test): `content/diagrams/tech-support-scam-elders.mmd` →
`public/images/diagrams/tech-support-scam-elders.svg`, embedded in
`posts/tech-support-scam-elders.md`'s "How the Scam Works" section and
verified rendering correctly on the live page (Playwright screenshot).

**Decisions made (both were left open by this task's own text):**
- **Styling mechanism: `themeVariables` + `themeCSS`, not a post-render SVG
  pass.** Baking the whole spec into the render step's init config means
  every diagram is byte-for-byte reproducible from its `.mmd` source alone
  — a post-render pass would be a second, driftable place the styling
  could get out of sync with itself.
- **Path convention:** source `content/diagrams/<slug>.mmd`, rendered
  `public/images/diagrams/<slug>.svg` (SVG only — vector, matches
  `research.ts`'s existing `/images/<slug>.svg` convention for visuals; a
  `.png` fallback wasn't built since nothing on this site needs a raster
  image and it would be a second artifact to keep in sync).
- **Zero new npm dependencies, honoring CLAUDE.md's lean-deps policy:**
  neither `mermaid` nor a headless-browser package was added to
  `package.json`. The render script fetches the mermaid UMD bundle
  straight from the npm registry into a local cache (not an installed
  dependency) and drives a locally-cached Chromium via `playwright`,
  resolved from a global toolchain location, not `node_modules` — the same
  "external tool, not a project dependency" pattern `scripts/asvs/*.py`
  already uses for Python.
- **Fail loud, not silent:** Mermaid's own failure mode for bad syntax is
  a *successfully rendered* "Syntax error in text" placeholder image, not
  a thrown error — the render script detects that string in the output SVG
  and exits non-zero instead of writing a broken-looking diagram that
  "succeeded." (Caught this the hard way: the first real attempt used an
  escaped `\"` inside a quoted node label, which Mermaid doesn't support —
  fixed by rephrasing, not by adding an escape-translation layer.)

Build a Claude Code skill: input = a finished blog post (markdown). Output = a diagram.

- Extract key concepts/structure from the post (headings, framework steps, comparison points) — whatever shape suits a diagram for that post.
- Generate valid Mermaid syntax.
- Apply the existing Google Cloud aesthetic spec exactly: color palette, typography, 16–24px rounded corners, flat fills, bezier connectors. Decide and document whether this is done via Mermaid's `themeCSS`/`themeVariables` or a post-render SVG style pass.
- Save both the `.mmd` source and rendered `.svg`/`.png`. Decide and document the repo path convention for these.
- No manual style decisions per post — the skill should apply the spec the same way every time.

## Task 3 — Visual Artifacts logging automation

**Status: staged, blocked on live Notion access.** This session's Notion
MCP connection was disconnected throughout (confirmed unavailable, not
just unused) — so the repo-side half is built and the Notion-side half is
specified but not executed, rather than faked.

- **Built:** every successful diagram render appends one record to
  `docs/visual-artifacts-log.jsonl` — `artifactType`, `synthesisDate`,
  `mmdSource`, `svgOutput`, `sourcePost`, `notionUrl`, and
  `notionSyncStatus: "pending"`. Shaped exactly like the intended Notion
  row (see `appendArtifactLog()` in `scripts/mermaid/render.mjs`).
- **Not built:** the sync step that reads this log from a Notion-connected
  session and actually creates/updates the Visual Artifacts rows (setting
  `notionSyncStatus: "synced"` once done), and the relation property to
  **Research Items** / **Knowledge Graph** (Notion schema work — that
  database doesn't exist yet per this doc's own Context section, so the
  relation can't be wired up regardless of session connectivity).
- **Next step:** from a session with live Notion access, read
  `docs/visual-artifacts-log.jsonl`, create one Visual Artifacts row per
  `pending` entry, then mark it synced (or delete the line — decide when
  you get there; both are fine, the log is a queue, not a permanent record).

## Task 4 — Curation gate enforcement

**Status: decided, not implemented — blocked on live Notion access** (same
constraint as Task 3: no Notion MCP connection this session).

**Decision: soft gate**, not hard. Reasoning: a hard gate (can't mark
"ready to draft" without the relation filled) blocks on a Notion schema
property from the moment an idea is captured — good for discipline, bad
for the "quick idea before I forget it" capture pattern the workflow's own
Stage 1 (Capture) exists to support. A soft gate (a filtered view
surfacing unlinked items) gets the same visibility without turning a
30-second capture into a form to fill out correctly. If unlinked items
pile up in that view unaddressed, that's the signal to reconsider and
tighten to a hard gate later — cheap to change once real usage data exists,
expensive to loosen once relationships are already being enforced.

**Concrete spec for whoever has Notion access next:** create a filtered
view on the source-idea database showing items where "Ready to Draft" is
true (or about to be set) AND the Knowledge-Graph/related-post relation
property is empty. Surface it prominently (pinned view, or a Notion
automation that comments/notifies) rather than a view nobody opens — a
soft gate nobody looks at isn't a gate.

## Task 5 — Frontmatter ↔ Notion traceability

**Status: done, 2026-09-06.** Field: `notion_url` (chose the URL form over
a bare `notion_id`, since the URL is directly clickable from a rendered
post's frontmatter and both round-trip to the same Notion page).

- `Post.notionUrl` in `src/lib/posts.ts` (parsed from `notion_url:`
  frontmatter, optional, not rendered anywhere — pure tooling traceability).
- **Auto-inserted by the Mermaid render step**, as this task's own text
  guessed was more likely: `scripts/mermaid/render.mjs --post <file>
  --notion-url <url>` stamps/updates the field in the same step a diagram
  is generated. `--post` and `--notion-url` must be given together or not
  at all (fails loud on a mismatched pair rather than silently no-op'ing).
- Documented in `CLAUDE.md` → Blog Post Format → "Notion traceability."

## Task 6 — Stale/retire flagging automation

**Status: done, 2026-09-06.** Script: `scripts/check-stale-content.mjs`
(`npm run check:stale`) — reuses Task 1's exact git-log-driven staleness
method (no second method invented) plus a research.ts-specific check
against each article's hardcoded `date:` field. Threshold: 90 days, a named
constant (`STALE_THRESHOLD_DAYS`) matching the cadence below.

- **Surface decision: a dated report under `outputs/`** (same convention
  as the decision-digest agent's `outputs/daily-summary-*.md`) **plus a
  monthly auto-filed GitHub issue** — not a Notion view, since Notion
  wasn't reachable this session and a GitHub issue needs no external
  service beyond the repo's own `GITHUB_TOKEN`. If Notion access exists
  later, the committed report is a ready-made input for a Notion sync,
  same pattern as Task 3.
- **Recurring cadence: built.**
  `.github/workflows/monthly-content-review.yml` — runs on the 1st of
  every month (cron) or on demand (`workflow_dispatch`), commits the
  report, and files a `Monthly Content Review — YYYY-MM` issue with the
  findings. Verified against this repo's own `vercel-security-monitor.yml`
  pin-integrity check (its exact grep logic was run locally against the
  new workflow file) — passes: `actions/github-script@v7` is tag-pinned,
  which that check explicitly allows for `actions/*` publishers.
- This script never sets `retired: true` itself — it produces *candidates*
  for a human to review, per the "Retiring a post" section of `CLAUDE.md`.
  The `retired` / `retired_date` / `retired_reason` frontmatter mechanism
  and lint rule **R31** (enforcing that a reason always accompanies the
  flag) were built alongside this so there's something to actually do with
  the candidate list.

---

## Explicitly out of scope

- NotebookLM — manual brainstorming only, not wired into any automated step
- Gemini Canvas — not used anywhere in this workflow
- No GitHub Issues-as-CMS layer, no TASKLIST.md blackboard file — not adopting a full Miessler-style ULWork setup, just the specific gap-closing pieces above

---

## Suggested build order

1. Task 1 (scan) — standalone, no dependencies, gives immediate visibility into the actual problem
2. Task 2 (Mermaid skill) — core automation gap
3. Task 5 (frontmatter field) — cheap, unblocks Task 3
4. Task 3 (Visual Artifacts logging + relation) — depends on Task 2 output existing
5. Task 6 (stale flagging) — can reuse Task 1's scan logic
6. Task 4 (curation gate) — pure Notion schema/view work, no repo dependency, can happen in parallel with anything above
