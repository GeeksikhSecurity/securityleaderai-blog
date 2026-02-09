# SecurityLeader.ai — Project Defaults

These are the canonical standards for all content and code changes on this site. Every new blog post, research article, UX update, and deployment must follow these rules.

---

## Site Architecture

- **Framework:** Next.js 14 App Router / TypeScript / Tailwind CSS
- **Hosting:** Vercel Pro (`prj_XEHglLkPPqmYgRvVJ2OoKcCiQeEc`, team `team_YLxnYBWvoiSIwseaAAFuf9Kd`)
- **Blog posts:** Markdown files in `/posts/` with gray-matter frontmatter
- **Research articles:** Hardcoded in `src/lib/research.ts` (not markdown)
- **Blog listing:** `/blog` (src/app/blog/page.tsx)
- **Research hub:** `/research` with tabbed filtering (client component)
- **Author:** Gurvinder Singh, CISSP, CISA — Security Researcher & Advisor
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

1. **H1 title** — matches frontmatter title
2. **Italic hook question** — CSO-level, challenges the reader directly. Format: `*Question that makes the executive stop scrolling?*`
3. **Executive Summary blockquote** — `> **Executive Summary**` followed by 2-3 sentences with key data points
4. **Body sections** — H2 headings, scan-friendly, data-driven
5. **"Your next move:" takeaway** — Bold, actionable, specific. Format: `**Your next move:** Do X within Y timeframe.`
6. **Board talking points** — Horizontal rule, then `**What to tell your board:**` with 3 bullet points
7. **Author attribution** — Horizontal rule, then `*Research by [Gurvinder Singh](LinkedIn URL), CISSP, CISA — ...*`

### Reading Time

Blog post reading time is **automatically calculated** at 200 words/minute in `src/lib/posts.ts`. Do NOT hardcode it.

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
- Run `npm run build` to confirm all static pages generate (currently 17 pages)

---

## Deployment Checklist

1. `npm run build` — must succeed with zero errors
2. Verify page count matches expected (currently 17)
3. `git add` specific files (never `git add -A`)
4. Commit with descriptive message
5. `git push origin main`
6. `npx vercel --prod --yes` or wait for Vercel auto-deploy
7. Spot-check live site for new/changed pages

---

## Content Tone

- **Audience:** CSOs, CISOs, security leaders, board advisors
- **Voice:** Authoritative, data-driven, direct. No filler, no hedging.
- **Hook questions:** Challenge the reader's assumptions. Use "your" — make it personal.
- **Takeaways:** Specific, actionable, time-bound. "Do X within Y days."
- **Board talking points:** 3 bullets max, lead with data, end with urgency.
- **No emojis** in content unless explicitly requested.

---

## What NOT to Do

- Do NOT add hero/banner images to article pages (removed by design — REDUCE principle)
- Do NOT use the `video` research type (removed — no video content exists)
- Do NOT inflate read times or topic counts
- Do NOT add npm dependencies for UI animations (CSS-first)
- Do NOT create links to pages that don't exist
- Do NOT skip `prefers-reduced-motion` wrapping on animations
- Do NOT commit `.env` files or credentials
