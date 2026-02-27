# Custom Development Rules — SecurityLeader.ai

Reference documentation for the rules defined in `CLAUDE.md`. These rules are informed by patterns from [cursor-rules-enhanced](../../../Projects/Templates/cursor-rules-enhanced/) (Cursor + AWS Q Developer rules), adapted for this Next.js/TypeScript project.

---

## Rules Index

| # | Rule | Source | Scope |
|---|------|--------|-------|
| 1 | [Code Quality and Cognitive Debt](#1-code-quality-and-cognitive-debt) | `cognitive-debt-reduction.mdc`, `consolidated-development-practices.mdc` | All code changes |
| 2 | [Security Practices](#2-security-practices) | `consolidated-development-practices.mdc`, `ai-assist-responsible-use.mdc` | All code changes |
| 3 | [AI-Assisted Development](#3-ai-assisted-development) | `ai-assist-responsible-use.mdc`, `cognitive-debt-reduction.mdc` | All AI-generated code |
| 4 | [Data Handling](#4-data-handling) | `json-serialization.mdc` | Serialization, frontmatter |
| 5 | [Dependency Security Policy](#5-dependency-security-policy) | Project-specific | Dependencies, deployment |
| 6 | [Vulnerability Management](#6-vulnerability-management) | Project-specific | Dependencies, CI/CD |
| 7 | [Troubleshooting Discipline](#7-troubleshooting-discipline) | Q Developer chats, `.amazonq` rules | All debugging/investigation |

---

## 1. Code Quality and Cognitive Debt

**Origin:** `cognitive-debt-reduction.mdc` + `consolidated-development-practices.mdc`

Cognitive debt is the cost of lost understanding — why decisions were made, how components connect, what the system is supposed to do. It accumulates faster than technical debt when AI-assisted features are added without retaining a clear mental model.

### Rules

| Rule | Rationale |
|------|-----------|
| Document "why," not "what" | Future readers need constraints, tradeoffs, and business rules — not restatements of code |
| Named constants over magic numbers | `WORDS_PER_MINUTE = 200` is self-documenting; `200` is not |
| Small, focused functions | One function, one responsibility. If it needs a "what" comment, split it |
| TypeScript strict mode | Explicit types at boundaries, inferred internally. No `any` without a comment |
| Consistent patterns | Follow existing data shapes. Don't invent parallel structures |
| Theory of the system | `CLAUDE.md` is the single source of truth. Update it when architecture changes |
| Understand before reusing | No copy-paste from AI, Stack Overflow, or other modules without understanding |
| Preserve "why" in refactors | If you remove a "why" comment, add the explanation elsewhere |

### Checklist

- [ ] Non-obvious logic has a "why" comment
- [ ] No unexplained literals — constants have names and source documented
- [ ] Functions are single-purpose
- [ ] No `any` without justification
- [ ] CLAUDE.md reflects current architecture

---

## 2. Security Practices

**Origin:** `consolidated-development-practices.mdc` + `ai-assist-responsible-use.mdc`

### Web Security (OWASP-Aligned)

| Rule | Detail |
|------|--------|
| XSS prevention | `dangerouslySetInnerHTML` only for remark-html output. No raw user input rendered unsanitized |
| No secrets in code | Use environment variables. Never commit `.env`, `.env.local`, credentials |
| Security headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` |
| External link safety | Always `target="_blank" rel="noopener noreferrer"` |
| Supply chain security | `npm audit` before every deploy. Check maintainer reputation, download counts, last publish date |

### Input Validation

| Boundary | Validation |
|----------|-----------|
| URL params / query strings | Validate type, range, and format |
| Blog `[slug]` routes | Validated by SSG via `generateStaticParams()` |
| Future dynamic routes | Must validate explicitly — no implicit trust |

### Checklist

- [ ] No secrets in code, config, or logs
- [ ] All `dangerouslySetInnerHTML` uses sanitized input
- [ ] External links use `noopener noreferrer`
- [ ] `npm audit` clean (zero critical/high in production deps)

---

## 3. AI-Assisted Development

**Origin:** `ai-assist-responsible-use.mdc` + `cognitive-debt-reduction.mdc`

### Rules

| Rule | Detail |
|------|--------|
| Mandatory human review | Review for *understanding*, not just correctness. Can you explain every line? |
| No vibe coding | Don't prompt large features and merge without reading the result |
| Attribution | `Co-Authored-By: Claude` in commits. Inline comments for non-trivial AI logic |
| Prohibited AI generation | No AI for auth logic, crypto, or input sanitization — human-expert only |
| Quality gates | AI code must pass `tsc --noEmit` and `npm audit` before deploy |
| Incremental changes | Small, reviewable steps. Each commit understandable on its own |

### Checklist

- [ ] Every AI-generated diff reviewed line-by-line
- [ ] AI contributions attributed in commit message
- [ ] No AI-generated auth, crypto, or sanitization logic
- [ ] Changes pass type check and audit

---

## 4. Data Handling

**Origin:** `json-serialization.mdc`

### JSON and Structured Data

| Rule | Detail |
|------|--------|
| Native APIs only | `JSON.stringify()` / `JSON.parse()`. Never template literals or string concatenation |
| Explicit error handling | Wrap `JSON.parse()` in try/catch with clear error messages |
| Existing type shapes | Research data in `src/lib/research.ts` uses TypeScript objects. No parallel formats |

### Frontmatter (gray-matter)

| Rule | Detail |
|------|--------|
| Required fields enforced | Missing fields cause build failures (intentional — fail fast) |
| Date format | `YYYY-MM-DD` (ISO 8601) only |
| Reading time | Auto-calculated at 200 wpm in `src/lib/posts.ts`. Never hardcoded in blog posts |

### Checklist

- [ ] All JSON produced by `JSON.stringify()`, not string building
- [ ] Parse errors handled explicitly
- [ ] Frontmatter dates in ISO 8601
- [ ] Research articles match existing TypeScript type shape

---

## 5. Dependency Security Policy

**Origin:** Project-specific (informed by `consolidated-development-practices.mdc` supply chain rules)

### Core Principle

Minimal dependency footprint. Fewer packages = smaller attack surface = easier maintenance. Every dependency must earn its place.

### Allowed Production Dependencies

| Package | Purpose | Policy |
|---------|---------|--------|
| `next` | Framework | Latest **15.x** patch |
| `react` / `react-dom` | UI runtime | **^19.x** |
| `gray-matter` | Frontmatter parsing | Patch only |
| `remark` / `remark-html` | Markdown rendering | Patch only |

### Allowed Dev Dependencies

| Package | Purpose | Policy |
|---------|---------|--------|
| `typescript` | Type checking | **^5.x** |
| `tailwindcss` | Utility CSS | **^3.4.x** |
| `postcss` / `autoprefixer` | CSS processing | Patch only |
| `@tailwindcss/typography` | Prose styling | Match Tailwind major |
| `@types/*` | TypeScript defs | Match runtime |

### Removed Dependencies

| Package | Why removed | Replacement |
|---------|-------------|-------------|
| `eslint` v8 | Deep vulnerable tree: glob, minimatch, rimraf, flat-cache | `tsc --noEmit` |
| `eslint-config-next` | Tied to eslint v8 on Next.js 14 | None needed |

### npm Overrides

```json
"overrides": {
  "glob": "^11.0.0",
  "minimatch": "^10.2.1"
}
```

Do NOT remove unless parent packages (sucrase via Tailwind) update their own ranges.

---

## 6. Vulnerability Management

**Origin:** Project-specific

### Decision Tree

```
New vulnerability found
├── Is it in a production dependency?
│   ├── YES → Fix immediately
│   │   ├── npm audit fix (non-breaking) → Done
│   │   ├── Manual patch version bump → Done
│   │   ├── npm overrides for transitive dep → Test build → Done
│   │   └── No fix available → Remove dep or find alternative
│   └── NO (dev dependency only)
│       ├── npm audit fix → Done
│       ├── Remove if non-essential (e.g., eslint v8)
│       └── Document as accepted risk if low-impact
└── Document exception in CLAUDE.md Known Accepted Risks table
```

### Rules (ordered)

1. Run `npm audit` before every deployment
2. Patch first (`npm audit fix` non-breaking)
3. Remove over upgrade — if a breaking major version is needed with no migration path, remove the package
4. npm overrides for transitive deps when direct deps pin vulnerable versions
5. No new dependencies without audit check, transitive dep count review, and active maintenance verification
6. Document all accepted risks with CVE IDs and mitigations

### Known Accepted Risks (current)

None. All CVEs resolved as of Next.js 15.5.12 upgrade (February 2026). `npm audit` returns 0 vulnerabilities.

### Quarterly Review

1. Check for new Next.js 15.x patches
2. Run `npm audit` + `npm outdated`
3. Check if overrides can be removed

---

## 7. Troubleshooting Discipline

**Origin:** Q Developer chat analysis (`/Volumes/2TBSSD/Development/AI_Debugging_Vibe/q-dev-chats/`) + `.amazonq` rules

These patterns were identified from recurring AI-assisted debugging failures across security analysis toolkit, SBOM pipeline, and infrastructure projects.

### Rules

| Rule | Rationale |
|------|-----------|
| No retry loops | If the same approach fails twice, stop and diagnose root cause. Do not repeat hoping for a different result |
| Verify before operating | Before writing to a service/file/API, confirm access, permissions, and data format. Silent failures (no error, wrong result) are harder to debug than loud ones |
| Fresh exploration mandate | When investigating unfamiliar code or a new error, read the actual code first. Do not rely on cached assumptions or prior context — the code may have changed |
| Fail fast, fail loud | Prefer explicit errors over silent continuation. If a required value is missing, throw immediately with a descriptive message |
| Breaking change awareness | When upgrading dependencies, read the migration guide before changing code. Document breaking changes and their fixes |
| One variable at a time | When debugging, change one thing and test. Multiple simultaneous changes obscure which one fixed (or broke) the system |

### Anti-Patterns (from Q Developer chats)

| Anti-pattern | Example | Fix |
|-------------|---------|-----|
| JSON via string building | `f'{{"key": "{value}"}}'` | Use `json.dumps()` / `JSON.stringify()` |
| Silent credential failure | AWS token retrieval fails, code continues | Validate response before using value |
| Stale mental model | Assuming code structure from prior session | Re-read actual files before operating |
| Retry without diagnosis | Running same pipeline 3x expecting different result | Diagnose failure, then fix, then retry once |
| Multi-variable debugging | Changing config + code + deps simultaneously | Isolate: one change, one test |

### Checklist

- [ ] If an approach failed, did you diagnose the root cause before retrying?
- [ ] Did you verify access/permissions/format before operating?
- [ ] Did you read the actual current code (not memory of what it was)?
- [ ] Are errors explicit and descriptive (not swallowed or defaulted)?
- [ ] For dependency upgrades, did you read the migration guide?

---

## Provenance

These rules are adapted from:

- **Cursor rules (enhanced):** `/Volumes/2TBSSD/Development/Projects/Templates/cursor-rules-enhanced/.cursor/rules/`
  - `cognitive-debt-reduction.mdc` — cognitive debt, documentation, magic numbers
  - `ai-assist-responsible-use.mdc` — human review, attribution, prohibited AI generation
  - `consolidated-development-practices.mdc` — security, code quality, error handling, git
  - `json-serialization.mdc` — native JSON APIs, round-trip validation
- **AWS Q Developer rules (`.amazonq`):** Production script standards, TDD/mutation testing, memory bank methodology (Python-specific patterns dropped; principles retained)
- **Q Developer chat analysis:** 19 chat files from `/Volumes/2TBSSD/Development/AI_Debugging_Vibe/q-dev-chats/` — troubleshooting loops, silent failures, JSON serialization, breaking change discovery, fresh exploration mandate
- **Project-specific:** Dependency policy, vulnerability management, deployment checklist

All rules are self-contained. No external policy documents, APA references, or org-specific tooling required.
