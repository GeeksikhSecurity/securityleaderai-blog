# SecurityLeader.ai — Project Defaults

These are the canonical standards for all content and code changes on this site. Every new blog post, research article, UX update, and deployment must follow these rules.

---

## Site Architecture

- **Framework:** Next.js 16.2.x App Router / TypeScript / Tailwind CSS
- **Hosting:** Vercel Pro (`prj_XEHglLkPPqmYgRvVJ2OoKcCiQeEc`, team `team_YLxnYBWvoiSIwseaAAFuf9Kd`)
- **Blog posts:** Markdown files in `/posts/` with YAML frontmatter (parsed by the in-house `parseFrontmatter` in `src/lib/posts.ts`)
- **Research articles:** Hardcoded in `src/lib/research.ts` (not markdown)
- **Blog listing:** `/blog` (src/app/blog/page.tsx)
- **Research hub:** `/research` with tabbed filtering (client component)
- **Author:** Gurvinder Singh, CISSP, CISA, GWAPT — Security Researcher & Advisor
- **GitHub:** GeeksikhSecurity

---

## Blog Post Format (Markdown)

Every blog post in `/posts/` **must** include:

### Frontmatter (required fields)

```yaml
---
title: "Descriptive Title in Title Case"
date: "YYYY-MM-DD"
excerpt: "1-2 sentence executive summary for cards and SEO."
author: "Gurvinder Singh"
tags: ["Tag1", "Tag2", "Tag3"]
---
```

### Content Structure (in order)

1. **H1 title** — matches frontmatter title. The H1 **must** remain in the markdown for standalone readability (e.g., on GitHub), but the blog template (`src/app/blog/[slug]/page.tsx`) strips it before rendering to avoid duplication with the template-rendered `<h1>`. The strip uses `post.content.replace(/^\s*# .+\n+/, '')` — the `\s*` is required because the frontmatter parser (`parseFrontmatter` in `src/lib/posts.ts`) returns content with a leading newline. Do NOT remove the H1 from markdown files. Do NOT render it twice in the template. After any build, verify with `grep -c '<h1' .next/server/app/blog/<slug>.html` — the count must be **1**.
2. **Italic hook question** — CSO-level, challenges the reader directly. Format: `*Question that makes the executive stop scrolling?*`
3. **Executive Summary blockquote** — `> **Executive Summary**` followed by 2-3 sentences with key data points
4. **Body sections** — H2 headings, scan-friendly, data-driven
5. **"Your next move:" takeaway** — Bold, actionable, specific. Format: `**Your next move:** Do X within Y timeframe.`
6. **Board talking points** — Horizontal rule, then `**What to tell your board:**` with 3 bullet points
7. **Author attribution** — Horizontal rule, then `*Research by [Gurvinder Singh](LinkedIn URL), CISSP, CISA — ...*`

### Reading Time

Blog post reading time is **automatically calculated** at 200 words/minute in `src/lib/posts.ts`. Do NOT hardcode it.

### Audio (optional frontmatter)

Posts may carry an audio track, rendered by `<AudioOverview />` (native browser
`<audio>` controls — no custom player, no client JS) above the article body:

```yaml
audio_url: "/audio/pa-in/whatsapp-family-emergency-scams.m4a"  # must exist under /public
audio_kind: "overview"   # 'overview' (NotebookLM-style AI discussion ABOUT the post)
                         # | 'read_aloud' (verbatim narration of the post)
```

- `audio_kind` defaults to `overview`. The two kinds get different labels because
  they are different things: an overview is an AI-generated two-host discussion and
  is labeled as such; only a verbatim narration may be labeled "listen to this article."
- Lint rule **R30** fails the build if `audio_url` points at a missing file or an
  unsupported format (.mp3/.m4a only), and warns about orphaned files under
  `public/audio/`. Never ship a mapping without its file, or vice versa.

---

## Research Article Format (TypeScript)

Every research article in `src/lib/research.ts` **must** include:

### Required Fields

```typescript
{
  slug: 'kebab-case-slug',
  title: 'Full Title',
  summary: 'Executive-level 1-2 sentence summary.',
  type: 'paper' | 'tool' | 'insight',  // No 'video' type (removed)
  visual: '/images/slug-name.svg',
  heroImage: '/images/slug-name.svg',
  date: 'Month Day, Year',
  readTime: 'N',  // Must reflect actual content length (~200 wpm)
  hookQuestion: 'CSO-level question that challenges the reader?',
  takeaway: 'Specific, actionable next step with timeframe.',
  tags: ['Tag1', 'Tag2'],
  sections: [{ id: 'anchor-id', title: 'Section Title' }],
  content: ['Paragraph 1...', 'Paragraph 2...'],
}
```

### Read Time Accuracy

Research article `readTime` is **hardcoded** — it must be validated against actual word count (200 wpm). Do NOT inflate. Typical ranges: 3-5 min for current content depth.

### Topic Counts

Topic counts in `getResearchTopics()` must reflect the **actual** number of research articles + blog posts matching each topic. Audit when adding/removing content.

---

## UX Standards

### Design Principles (CSO-Level, from Maeda's Laws of Simplicity)

| Principle | Implementation |
|-----------|----------------|
| **REDUCE** — Headlines carry the message | No hero images on article pages. Lead with typography: title + summary |
| **ORGANIZE** — Scan-friendly hierarchy | F-pattern layout, clear H2 sections, metadata row (type + date + read time) |
| **TRUST** — Exits everywhere | Breadcrumb navigation on all inner pages (`Home / Section / Title`) |
| **TIME** — Reading progress feedback | `<ScrollProgress />` on all article/blog pages (3px fixed bar, top of viewport) |
| **CONTEXT** — Breathing room | Generous whitespace (`pt-16 pb-12` headers, `mt-14` between sections) |
| **EMOTION** — Professional polish | Smooth scroll, `cubic-bezier(0.4, 0, 0.2, 1)` card hover transitions, `fadeSlideUp` card entrance animations |

### Page Components (required on article pages)

1. `<ScrollProgress />` — reading progress indicator
2. `<div className="article-accent-line" />` — 4px gradient bar at top
3. Breadcrumb nav — `Home / Research / {title}` or `Home / Blog / {title}`
4. hookQuestion rendered as italic text above content
5. takeaway rendered in styled callout box ("Your next move") after content

### CSS-First Approach

- **Zero new npm dependencies** for animations or UI polish
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`
- Card entrance: `fadeSlideUp` with staggered delays
- Print styles: hide scroll progress, accent line, nav, buttons

---

## Accessibility Requirements

### Mandatory on Every Change

- All `<nav>` elements must have `aria-label` (e.g., `aria-label="Breadcrumb"`)
- Breadcrumb separators use `aria-hidden="true"`
- `<ScrollProgress />` includes `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- All interactive elements must have visible `:focus-visible` outlines (`2px solid var(--border-focus)`, `outline-offset: 2px`)
- External links must have `target="_blank" rel="noopener noreferrer"`
- Images must have `alt` text (descriptive, not decorative)
- All animations respect `prefers-reduced-motion: reduce` (hidden or disabled)
- Semantic HTML: `<article>`, `<header>`, `<footer>`, `<nav>`, `<main>`, `<section>`
- Color contrast: all text meets WCAG 2.1 AA (4.5:1 body text, 3:1 large text)
- Tabs use `aria-selected` attribute for active state

---

## Code Quality and Cognitive Debt

### Cognitive Debt

Cognitive debt is the cost of lost understanding — why decisions were made, how components connect, what the system is supposed to do. With AI-assisted development, cognitive debt accumulates faster than technical debt if features are added without retaining a clear mental model.

### Practices

- **Document "why," not just "what."** When logic is non-obvious, add a short comment explaining the constraint, tradeoff, or business rule — not a restatement of the code.
- **Named constants over magic numbers.** Replace unexplained literals with named constants (e.g., `WORDS_PER_MINUTE = 200`). State where the value comes from.
- **Small, focused functions.** Each function does one thing. If a function needs a comment explaining what it does, it should probably be two functions.
- **TypeScript strict mode.** Use strict type checking. Prefer explicit types at module boundaries; infer types internally. No `any` without a comment explaining why.
- **Consistent patterns.** Follow existing patterns in the codebase. If research articles use a specific data shape, new articles use the same shape — don't invent a parallel structure.
- **Theory of the system.** This CLAUDE.md is the single source of truth for how this project works. Update it when architecture or conventions change.

### Copy-Paste and Borrowed Code

- Do not paste code (from AI, Stack Overflow, or another module) without understanding what it does and why it's correct in this context.
- When refactoring, preserve "why" comments. If you remove a comment that explained a business rule, add that explanation elsewhere.

---

## Security Practices

### Web Security (OWASP-Aligned)

- **XSS prevention.** Any use of `dangerouslySetInnerHTML` must sanitize input first. The remark-html output for blog posts is the only accepted case — no raw user input should ever be rendered unsanitized.
- **No secrets in code.** Never hardcode API keys, tokens, or credentials. Use environment variables. Do not commit `.env`, `.env.local`, or any file containing secrets.
- **Security headers.** Vercel handles most headers, but if `next.config.js` defines custom headers, include: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **External links.** Always use `target="_blank" rel="noopener noreferrer"` on external links (prevents reverse tabnapping).
- **Dependency supply chain.** Run `npm audit` before every deployment. Do not install packages from unknown or unmaintained sources. Check download counts, last publish date, and maintainer reputation.

### Input Validation

- Validate at system boundaries: URL parameters, query strings, any data from external sources.
- Blog slugs from `[slug]` routes must be validated against `generateStaticParams()` output — Next.js SSG handles this, but any future dynamic routes must validate explicitly.

### Next.js 16 / React 19 Patterns

- **Async params:** In Next.js 15+, dynamic route `params` are `Promise` objects. Always use `const { slug } = await params;` — never access `params.slug` directly.
- **React 19 `cloneElement` typing:** `cloneElement` requires explicit generic type parameters for props. Use `isValidElement<{ className?: string }>(child)` and cast spread props as `Record<string, unknown>` when needed.

---

## Decision Capture & Daily Digest

Working memory for AI-assisted sessions lives on disk, not in the chat context.

- **During work:** after each meaningful task, append a short decision note to
  `work/decision-log/YYYY-MM-DD.md`. Plain English, no jargon. Include: what
  changed, why, what alternatives were considered, what was skipped and why,
  verification results, and follow-ups. Keep a **"Do not retry"** section for
  approaches that failed with a known root cause (licensing, auth, API limits)
  so no future session rediscovers the same dead end.
- **End of day:** the `decision-digest` sub-agent (`.claude/agents/decision-digest.md`)
  summarizes that file into `outputs/daily-summary-YYYY-MM-DD.md`. The sub-agent
  only summarizes — the main session makes the decisions.
- Both directories are committed: the log is the loop's on-disk memory; the next
  session picks up from it instead of re-deriving state.

---

## AI-Assisted Development

### Mandatory Human Review

- **All AI-generated code must be reviewed for understanding** before merge — not just correctness, but whether you can explain what it does, how it fits the system, and why it's implemented that way.
- **No "vibe coding."** Do not prompt large features into existence and merge without reading the result. The mental model of the project erodes and later changes become risky.

### Attribution

- Annotate significant AI-assisted contributions in commit messages (e.g., `Co-Authored-By: Claude`).
- For non-trivial AI-generated logic, add a brief inline comment noting the intent so future readers have context.

### Prohibited AI Generation

- **Do not use AI to generate** authentication logic, cryptographic functions, or input sanitization routines — these require expert human implementation.
- AI-generated code must pass `tsc --noEmit` (type check) and `npm audit` (dependency check) before deployment.

### Incremental Changes

- Prefer small, reviewable changes over large AI-generated rewrites.
- Each commit should be understandable on its own — a reviewer should be able to read the diff and understand the intent.

### Troubleshooting Discipline (Lessons from Q Developer)

These patterns were identified from recurring AI-assisted debugging failures across multiple projects:

- **No retry loops.** If an approach fails twice, stop and rethink. Do not repeat the same command, configuration, or code change hoping for a different result. Diagnose the root cause first.
- **Verify before operating.** Before writing to a service, file, or API, confirm access and format. Check that the target exists, that permissions are correct, and that the data shape matches expectations. Silent failures (no error, but wrong result) are harder to debug than loud failures.
- **Fresh exploration mandate.** When investigating an unfamiliar area of the codebase or a new error, start by reading the actual code — do not rely on memory, cached assumptions, or prior context about what the code "should" look like. The code may have changed.
- **Fail fast, fail loud.** Prefer explicit errors over silent continuation. If a required value is missing, throw immediately with a descriptive message — do not substitute a default and continue.
- **Breaking change awareness.** When upgrading dependencies, read the migration guide before changing code. Check for API changes, removed features, and new requirements. Document any breaking changes encountered and their fixes (e.g., Next.js 15 async params, React 19 `cloneElement` typing).
- **One variable at a time.** When debugging, change one thing and test. Do not change multiple things simultaneously — if the problem resolves, you won't know which change fixed it.

---

## Data Handling

### JSON and Structured Data

- Use native `JSON.stringify()` / `JSON.parse()` for all serialization. Never build JSON with template literals or string concatenation.
- Handle parse errors explicitly — wrap `JSON.parse()` in try/catch with a clear error message.
- Research article data in `src/lib/research.ts` uses TypeScript objects (not JSON files). Maintain the existing type shape; do not introduce parallel data formats.

### Frontmatter (in-house YAML parser)

- Blog post frontmatter is parsed by the small `parseFrontmatter()` helper in `src/lib/posts.ts` (backed by `js-yaml`'s `load`), **not** by `gray-matter` — which was removed in June 2026 to drop its vulnerable bundled js-yaml 3.x (GHSA-h67p-54hq-rp68; gray-matter 4.0.3 can't use the patched js-yaml 4.x because it calls the removed `safeLoad`). Required fields are validated downstream — missing fields cause build failures (intentional; fail fast).
- **Known behavior (preserved from gray-matter — do not regress):** the parser returns `content` with a leading `\n` before the first line of markdown. Any regex that anchors on `^` (e.g., stripping the H1) must account for this with `^\s*`. This caused a duplicate H1 bug in production. The parser intentionally mirrors gray-matter's split so the `/^\s*# .+\n+/` H1-strip stays correct.
- Date format in frontmatter: `YYYY-MM-DD` (ISO 8601). No other formats.

---

## Link Validation

### Before Every Commit

Run a link audit on any changed content. Check:

1. **Internal links** — all `href` paths resolve to actual pages (`/blog`, `/research`, `/blog/[slug]`, `/research/[slug]`)
2. **External links** — all URLs return 200 (not 404, 403, or redirect loops). Key URLs to validate:
   - GitHub repos: `https://github.com/GeeksikhSecurity/mcp-sentinel-scanner`
   - LinkedIn: `https://www.linkedin.com/in/gurvindersinghb`
   - MITRE ATT&CK technique links
   - arXiv paper links
   - OWASP, GIAC, RFC links
3. **Anchor links** — ToC `#section-id` anchors match actual `id` attributes in rendered HTML
4. **No dead breadcrumb targets** — `/blog` and `/research` index pages must exist

### After Adding/Removing Content

- Update topic counts in `getResearchTopics()` if content changes affect tag distributions
- Verify `generateStaticParams()` returns all valid slugs
- Run `npm run build` to confirm all static pages generate (currently 43 pages)

---

## Dependency Security Policy

### Core Principle: Lean and Secure

This project maintains a **minimal dependency footprint**. Fewer packages = smaller attack surface = easier maintenance. Every dependency must earn its place.

### Allowed Dependencies (production)

| Package | Purpose | Upgrade policy |
|---------|---------|----------------|
| `next` | Framework | Stay on latest **16.x** patch. Monitor for critical CVEs. |
| `react` / `react-dom` | UI runtime | Stay on **^19.x** |
| `js-yaml` | YAML frontmatter parsing (via in-house `parseFrontmatter`) | Stay on **^4.2.0+** (4.2.0 fixes GHSA-h67p-54hq-rp68; do not drop to 3.x) |
| `remark` / `remark-html` | Markdown → HTML rendering | Patch updates only |

### Allowed Dependencies (dev)

| Package | Purpose | Upgrade policy |
|---------|---------|----------------|
| `typescript` | Type checking | Stay on **^5.x** |
| `tailwindcss` | Utility CSS | Stay on **^3.4.x** |
| `postcss` / `autoprefixer` | CSS processing (Tailwind requirement) | Patch updates only |
| `@tailwindcss/typography` | Prose styling | Match Tailwind major version |
| `@types/node`, `@types/react`, `@types/react-dom` | TypeScript definitions | Match runtime versions (React 19, Node 20) |

### Linting

- **No eslint.** Removed due to deep vulnerable dependency tree (glob, minimatch, rimraf, flat-cache) that cannot be patched on eslint v8.
- **`npm run lint`** runs `tsc --noEmit` for type checking instead.
- If eslint is reintroduced, it must be **eslint v9+** with flat config — never eslint v8.

### npm Overrides

The `overrides` field in `package.json` pins safe versions of transitive dependencies:
- `glob` → `^11.0.0` (fixes command injection CVE)
- `minimatch` → `^10.2.1` (fixes ReDoS CVE)

Do NOT remove these overrides unless the parent packages (e.g., sucrase via Tailwind) update their own dependency ranges.

### Vulnerability Management Rules

1. **Run `npm audit` before every deployment.** Zero critical/high vulnerabilities in production dependencies is the target.
2. **Patch first.** Always try `npm audit fix` (non-breaking) before any manual intervention.
3. **Remove over upgrade.** If a dependency has vulnerabilities that require a breaking major version change and no straightforward migration path exists, **remove it** rather than carrying known CVEs. Find a leaner alternative or eliminate the need.
4. **Dev dependencies are lower priority** but should still be addressed. Vulnerable dev deps don't ship to production but can compromise CI/CD and developer machines.
5. **npm overrides for transitive deps.** When a direct dependency pins a vulnerable transitive dep, use `overrides` in `package.json` to force the safe version. Test the build after applying.
6. **No new dependencies without justification.** Before adding any package, check:
   - Does it have known vulnerabilities? (`npm audit` after install)
   - How many transitive dependencies does it pull in? (fewer is better)
   - Is there a CSS-first or built-in alternative?
   - Is it actively maintained? (last publish < 6 months)
7. **Document exceptions.** If a vulnerability cannot be fixed (e.g., Next.js 14 CVEs requiring v15+), document it here with the CVE IDs and mitigation status.

### Known Accepted Risks

**None as of June 20, 2026 — `npm audit` returns 0 vulnerabilities (verified, not assumed). Re-run `npm audit` before restating this; it was falsely "0" once while actually 5.**

This was reached by remediating the June 19 finding of 5 vulnerabilities (2 high, 3 moderate) in two phases:

- **Phase A (non-breaking):** `npm audit fix` cleared the high-severity `next` and `picomatch` advisories; a `postcss: ^8.5.10` entry in `overrides` (plus bumping the direct `postcss` devDependency) forced Next's nested copy off the vulnerable `<8.5.10` XSS range (GHSA-qx2v-qp2m-jg93).
- **Phase B (the gray-matter → js-yaml DoS, GHSA-h67p-54hq-rp68):** not a version bump — the only patched `js-yaml` (4.2.0) removed the `safeLoad`/`safeDump` that `gray-matter@4.0.3` (latest) calls, and npm's "fix" was a major **downgrade** to gray-matter 2.0.1. Resolved instead by **removing gray-matter entirely** and replacing it with a ~15-line `parseFrontmatter()` in `src/lib/posts.ts` backed by `js-yaml@4.2.0`'s `load` (per the "Remove over upgrade" rule + lean-deps policy — net dependency *reduction*). The parser preserves gray-matter's `content` leading-`\n` contract so the H1-strip invariant holds.

Verified after each phase: `tsc --noEmit` clean, 43-page build, `<h1>` count = 1 on both new posts, hidden-post exclusion + tag/array parsing intact, `npm audit` = 0.

### Quarterly Review

Every 3 months, review:
1. Are there new Next.js 16.x patches? Apply them.
2. Run `npm audit` and `npm outdated` — address any new findings.
3. Check if `overrides` can be removed (parent packages may have updated).

---

## Deployment Checklist

1. `npm audit` — zero critical/high in production deps (dev dep warnings are acceptable)
2. `npm run lint` (`tsc --noEmit`) — zero type errors
3. `npm run build` — must succeed with zero errors
4. Verify page count matches expected (43 pages as of June 2026; grows as content is added — confirm against the build output, not a fixed number)
5. Review AI-generated changes for understanding — can you explain every diff?
6. `git add` specific files (never `git add -A`)
7. Commit with descriptive message (conventional style: `feat:`, `fix:`, `docs:`, `security:`)
8. `git push origin main`
9. `npx vercel --prod --yes` or wait for Vercel auto-deploy
10. Spot-check live site for new/changed pages

---

## Content Tone

- **Audience:** CSOs, CISOs, security leaders, board advisors
- **Voice:** Authoritative, data-driven, direct. No filler, no hedging.
- **Hook questions:** Challenge the reader's assumptions. Use "your" — make it personal.
- **Takeaways:** Specific, actionable, time-bound. "Do X within Y days."
- **Board talking points:** 3 bullets max, lead with data, end with urgency.
- **No emojis** in content unless explicitly requested.

---

## ASVS Panjabi Review Pages — Plain Language Standards

### Translation Resources & Validation (all bilingual content)

Applies to every `posts-i18n/pa-in/` translation and glossary — the Digital Seva
scam-awareness series as well as the ASVS review pages.

- **Authoritative dictionary:** RCPLT, Punjabi University Patiala — Gurmukhi/
  Shahmukhi → English dictionary with fuzzy search: <https://dic.learnpunjabi.org>.
  This is the academic reference for Punjabi computational linguistics. Use it to
  validate Gurmukhi spelling, confirm a term exists (vs. an AI-invented coinage),
  and choose between near-synonyms before committing a glossary row.
- **Workflow for the T/L/R/H glossary tables:** for each security term, look it up
  at the source above. If a faithful Gurmukhi term exists, mark it `T` (Translated);
  if only a loan word is in real use, mark it `L` and say so in Notes; never present
  an unverified coinage as established usage. The Notes column should cite the basis
  (e.g., Persian/Arabic origin, common loan) so a human reviewer can check it.
- **AI drafts stay `ai_draft`.** A dictionary lookup raises confidence but does not
  replace sangat review — keep `translation_status: ai_draft` until a Panjabi
  speaker confirms. The dictionary validates *words*; only a human validates *tone*
  and whether an elder would actually understand the sentence.

### Context

The 4 hidden review pages (`asvs-panjabi-review-hub`, `asvs-panjabi-review-frontispiece`, `asvs-panjabi-review-preface`, `asvs-panjabi-review-glossary`) target Panjabi speakers who may never use GitHub, may not work in tech, and may be reached via LinkedIn, WhatsApp, or Sikh community channels. The wrapper/navigation/instructional text must use plain language. The ASVS source content (bilingual frontispiece, preface body) is verbatim from OWASP and must not be simplified.

### Hidden Post Mechanism

- Posts with `hidden: true` in frontmatter are excluded from `/blog` listing and home page "Latest insights" via `getPublicPosts()` in `src/lib/posts.ts`
- `getAllPosts()` still returns hidden posts — `generateStaticParams` depends on this so SSG builds pages for direct URL access
- Hidden review pages are exempt from standard blog content structure (no hook question, no board talking points, no "Your next move", no author attribution block)

### Jargon Reduction Rules

When writing or editing the ASVS review page wrapper text, apply these substitutions:

| Jargon | Plain Alternative | Notes |
|--------|-------------------|-------|
| Frontispiece | Title Page | OWASP's section name; use plain label in our navigation and titles |
| Preface | Introduction | Use in our titles/links; keep "Preface / ਮੁਖਬੰਧ" inside the OWASP content |
| Romanization | Pronunciation | In glossary table headers |
| T/L/R/H classification | Translation approach | Expand shorthand on first use; keep T/L/R/H in table Type column |
| Transliteration | Word-for-word conversion | In reviewer instructions |
| PR #3254 | The translation submission (PR #3254 on GitHub) | Explain on first reference; short form OK after |
| Fork | Working copy | In source material links |
| QA | Quality checks | In timeline descriptions |

**Keep as-is** (correctly scoped or widely understood):
- "Bilingual" — clear and descriptive
- "Gurmukhi" — necessary script name, explained on first use
- "Unicode" — only in linguist-specific reviewer bullet
- "Inline comments" — only in Git-specific reviewer section
- "Devanagari script contamination" — only in linguist-specific reviewer bullet
- "Matra (ਮਾਤਰਾ)" — only in linguist-specific reviewer bullet
- "Digital Seva" — explained in context in the main blog post

### What NOT to simplify

- The ASVS source content itself (bilingual sections in frontispiece and preface pages) — this is verbatim from the OWASP repository and must remain faithful to the original
- Security terminology in the glossary tables — these are the actual translation choices under review
- The T/L/R/H codes in the glossary Type column — these are compact labels explained in the legend table above

### Current Page Count

As of June 2026 the build generates **43 pages**. This grows as content is added — the ASVS Panjabi review series alone is now **10 hidden posts** (the original 4 wrapper pages plus v5, v8, v9, v12, assessment-certification, and changes-from-v4). Do not treat any fixed number as authoritative; confirm against `npm run build` output after content changes.

---

## What NOT to Do

### Content and UX

- Do NOT add hero/banner images to article pages (removed by design — REDUCE principle)
- Do NOT use the `video` research type (removed — no video content exists)
- Do NOT inflate read times or topic counts
- Do NOT create links to pages that don't exist
- Do NOT render the blog post title twice — the template `<h1>` handles it; the markdown H1 is stripped at render time. Verify `<h1>` count = 1 after build.
- Do NOT skip `prefers-reduced-motion` wrapping on animations

### Dependencies and Security

- Do NOT add npm dependencies for UI animations (CSS-first)
- Do NOT add npm dependencies without checking `npm audit` post-install
- Do NOT reintroduce eslint v8 or eslint-config-next (vulnerable dependency tree)
- Do NOT remove `overrides` from package.json without verifying transitive deps are patched upstream
- Do NOT carry known critical/high CVEs in production deps — remove the package or find an alternative
- Do NOT commit `.env` files, credentials, API keys, or tokens
- Do NOT use `dangerouslySetInnerHTML` without sanitizing input first
- Do NOT build JSON with template literals or string concatenation — use `JSON.stringify()`

### Code Quality and AI

- Do NOT use `any` in TypeScript without a comment explaining why
- Do NOT merge AI-generated code without reading and understanding every line
- Do NOT use AI to generate auth, crypto, or input sanitization logic
- Do NOT copy-paste code without understanding what it does and why it's correct here
- Do NOT leave magic numbers in code — use named constants with source documented
- Do NOT delete "why" comments during refactors without preserving the context elsewhere
- Do NOT retry failed approaches without diagnosing root cause first (troubleshooting loop prevention)
- Do NOT operate on services/files without verifying access and format first (silent failure prevention)

---

## Retired Projects (February 2026)

The following sibling projects have been patched and retired. They are no longer actively developed. Vulnerabilities were resolved to the extent possible within their current major versions before archival.

| Project | Location | Final state | Notes |
|---------|----------|------------|-------|
| cloudscapecentral | `/Volumes/2TBSSD/Development/Git/Work/cloudscapecentral/` | 1 vuln (Next.js 14.x CVE) | Removed eslint v8, aws-sdk v2. Added overrides. |
| mindweave | `/Volumes/2TBSSD/Development/Archive/mindweave/` | 0 vulns | Upgraded to Next.js 15.5.12. Removed eslint. |
| f1-tracker | `/Volumes/2TBSSD/iCloud/AI-assited-Coding/vercel-monorepo-baseline_starter-pack/apps/f1-tracker/` | 1 vuln (Next.js 14.x CVE) | Updated to Next.js 14.2.35. Removed eslint. |

**Vercel projects deleted** on February 21, 2026 via `vercel project remove` to clear CVE-2025-55184 alerts. Local source code remains archived at the paths above.

These projects should not receive new features. If reactivated, create a new Vercel project and run `npm audit` first.
