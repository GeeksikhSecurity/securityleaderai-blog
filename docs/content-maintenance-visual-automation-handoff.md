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

**Status: not started.**

Build a Claude Code skill: input = a finished blog post (markdown). Output = a diagram.

- Extract key concepts/structure from the post (headings, framework steps, comparison points) — whatever shape suits a diagram for that post.
- Generate valid Mermaid syntax.
- Apply the existing Google Cloud aesthetic spec exactly: color palette, typography, 16–24px rounded corners, flat fills, bezier connectors. Decide and document whether this is done via Mermaid's `themeCSS`/`themeVariables` or a post-render SVG style pass.
- Save both the `.mmd` source and rendered `.svg`/`.png`. Decide and document the repo path convention for these.
- No manual style decisions per post — the skill should apply the spec the same way every time.

## Task 3 — Visual Artifacts logging automation

**Status: not started.** Depends on Task 2's output existing.

- After a diagram renders, auto-create the corresponding row in the Notion **Visual Artifacts** database (Artifact Type = `Automated Skill Render (Mermaid)`, Synthesis Date = render date, Screenshot = rendered file).
- Add a relation property on Visual Artifacts pointing to **Research Items** / **Knowledge Graph** (doesn't exist yet) so each artifact links back to the idea/post that spawned it.

## Task 4 — Curation gate enforcement

**Status: not started.** Pure Notion schema/view work — no repo dependency.

Currently a written rule only ("before a draft is written, the source idea must be linked to a related Knowledge Graph note or an existing post it extends/supersedes") — not enforced by any schema or view.

Decide and implement one of:
- **Hard gate:** item can't be marked "ready to draft" in Notion without that relation filled.
- **Soft gate:** a filtered Notion view surfacing unlinked items for manual review.

## Task 5 — Frontmatter ↔ Notion traceability

**Status: not started.** Cheap; unblocks Task 3.

- Define a frontmatter key (e.g. `notion_id:` or `notion_url:`) that every post carries, pointing back to its Notion row.
- Decide whether this is added manually or auto-inserted by the same skill that generates the Mermaid diagram (likely the latter, same pipeline step).

## Task 6 — Stale/retire flagging automation

**Status: not started.** Can reuse Task 1's scan logic and its stale-post
list (`docs/maintenance-scan-2026-09-05.md` §5) as a starting input.

- Script that reads `last_reviewed` / publish dates across the repo and flags anything 90+ days old.
- Decide where the flag surfaces: a Notion view, an auto-filed GitHub issue, or as output appended to the Task 1 maintenance report.
- This should eventually run on a recurring cadence (folds into the existing monthly review rhythm), not just once.

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
