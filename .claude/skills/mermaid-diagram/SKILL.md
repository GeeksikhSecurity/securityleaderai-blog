---
name: mermaid-diagram
description: >
  Generate a styled Mermaid diagram from a finished SecurityLeader.ai blog
  post or research article, following the site's Google-Cloud-style
  aesthetic exactly and every time. Use when a post's structure (a numbered
  framework, a step-by-step attack chain, a before/after comparison, a
  decision flow) would land better as a diagram than as prose, or when the
  user asks for "a diagram," "a Mermaid chart," or "visualize this post."
---

# Mermaid Diagram Skill

Turns a published post's structure into a Mermaid flowchart, rendered with
this site's fixed visual spec — no per-post styling decisions (Task 2 of
`docs/content-maintenance-visual-automation-handoff.md`: "No manual style
decisions per post — the skill should apply the spec the same way every
time").

## When to use this

The post has a **shape**, not just prose — numbered steps, a before/state →
event → after chain, a decision point ("if X, do Y; if not, Z"), or a
side-by-side comparison. Not every post needs a diagram; a post that's
pure argument/analysis with no structural backbone doesn't.

## Procedure

1. **Read the post.** Find its structural backbone: H2/H3 step headings
   ("Step 1 — The scare."), a numbered list that IS the process, or an
   explicit decision branch in the prose. Don't invent structure the post
   doesn't have — the diagram should be a faithful compression of the post,
   not a new argument.
2. **Write Mermaid source** to `content/diagrams/<post-slug>.mmd`. Rules
   that keep the render step deterministic:
   - Plain `flowchart TD` (top-down) for a linear process; use a decision
     diamond (`X{Question?}`) only where the post itself poses a branch.
   - **Never write a literal `"` inside a node label.** Mermaid's own quote
     escaping (`#quot;`) is finicky and the render script (below) treats
     `"Syntax error in text"` as a hard failure rather than silently
     shipping a broken diagram — rephrase instead of quoting (e.g. "asks to
     fix it" not `asks to "fix" it`).
   - **Do not add your own `%%{init: ...}%%` block.** The render script
     injects the site's theme/palette itself and strips any init directive
     already in the source — a per-file init block would silently be
     discarded, so don't rely on one.
   - Keep node text short (one clause) — long labels overflow the fixed
     rounded-rect sizing.
3. **Render it:**
   ```
   node scripts/mermaid/render.mjs content/diagrams/<post-slug>.mmd public/images/diagrams/<post-slug>.svg
   ```
   This is the ONLY approved way to produce the `.svg` — it bakes in the
   theme (see `scripts/mermaid/render.mjs`'s `MERMAID_INIT` for the exact
   palette/typography/corner-radius/curve spec) so every diagram on the
   site looks like it came from the same system. If the script exits
   non-zero, the `.mmd` source has a syntax error — fix it and re-run; do
   not hand-edit the `.svg`.
4. **Reference it from the post:**
   ```markdown
   ![Diagram: <short alt text describing the flow>](/images/diagrams/<post-slug>.svg)
   ```
   Alt text must describe what the diagram shows (accessibility
   requirement, `CLAUDE.md` → Accessibility) — not just "diagram."
5. **Frontmatter traceability (Task 5):** if this post has a Notion source
   row, pass its URL so the render step also stamps the post's frontmatter:
   ```
   node scripts/mermaid/render.mjs content/diagrams/<slug>.mmd public/images/diagrams/<slug>.svg --post posts/<slug>.md --notion-url "https://notion.so/..."
   ```
   This writes/updates `notion_url:` in the post's frontmatter in the same
   step the diagram is generated — see `scripts/mermaid/render.mjs --help`
   and `docs/content-maintenance-visual-automation-handoff.md` Task 5.
6. **Log the artifact (Task 3):** the render script also appends a record
   to `docs/visual-artifacts-log.jsonl` (artifact type, render date, file
   paths, source post, Notion URL if given). This is the staged version of
   the Notion Visual Artifacts row — see that doc's Task 3 status note for
   why it's staged rather than live.

## The visual spec (why these exact choices)

Palette, typography, corner radius, and curve style are all defined once in
`scripts/mermaid/render.mjs`'s `MERMAID_INIT` constant — read that file for
the actual values, not this doc, so there is exactly one source of truth.
In short: Google Material/Cloud brand colors (blue primary, red/green/gray
accents), Google Sans/Roboto typography, 20px rounded node corners via a
`themeCSS` override (Mermaid's `themeVariables` has no corner-radius knob),
`basis`-curve connectors (Mermaid's closest built-in to a true bezier), flat
fills with drop-shadows and gradient strokes explicitly disabled (Mermaid
11's default "neo" look adds both — this site's design principles are
flat/CSS-first, no per-element shadows).

## Example

`content/diagrams/tech-support-scam-elders.mmd` /
`public/images/diagrams/tech-support-scam-elders.svg` — generated from that
post's "How the Scam Works" four-step section. Use it as the reference for
node-text style (short, present-tense, one clause per node).
