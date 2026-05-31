# Bilingual Blog SOP — Authoring, Translating, Routing, Deploying

Operational standard for shipping SecurityLeader.ai posts as `<English source>` + `<Panjabi sibling>` pairs. Encodes the lessons from the 2026-05-28 → 2026-05-30 deploy cycle (4 commits, two production-broken intermediate deploys), the live-post audit against the Punjabi University Patiala dictionary reference, and the Vercel/Next.js 16 routing constraints that broke the first two fix attempts.

> **Why this exists.** Between commits `6aa8866` and `180030f` the bilingual blog feature went through a 4-commit fix cycle (`6aa8866` → `8314f85` → `f31fdfe` → `180030f`) before landing READY on Vercel. The root cause was structural — shipping a sibling dynamic route (`[locale]/page.tsx` next to `[slug]/page.tsx`) without running `next build` locally first. This SOP makes that failure mode unrepeatable and reconciles it with content rigor rules R1–R20 (see `content-rigor.md`).

---

## 1. Purpose & Scope

This SOP covers the **end-to-end lifecycle of a bilingual post** on SecurityLeader.ai:

- Authoring an English source under `posts/<slug>.md`.
- Producing the Panjabi (`pa-in`) sibling under `posts-i18n/pa-in/<slug>.md`.
- Frontmatter, glossary, and AI-draft attribution requirements.
- Routing (single dynamic-segment tree under `src/app/blog/[slug]/[post]`).
- Preflight checks before pushing.
- Deploy verification on Vercel.
- Resolving the recurring failure modes catalogued in the 2026-05-28→05-30 troubleshooting log.

**Audience:** the author (G.S.), future contributors (human or AI), and any agent that touches `posts/`, `posts-i18n/`, or `src/app/blog/**`.

**Out of scope:** visual design system changes (see `research-blog-visual-plan.md`), the content-rigor rule catalog itself (see `content-rigor.md`), and editorial style for English source (covered by the brand-voice skill).

---

## 2. End-to-End Workflow for a New Bilingual Post

Numbered, sequential, copy-paste-friendly. Each step has a verification gate.

### Step 1 — Concept and slug

Pick a kebab-case slug. The slug becomes the URL segment and the file basename in both corpora.

```bash
SLUG="my-new-post-slug"
echo "English file: posts/${SLUG}.md"
echo "Panjabi file: posts-i18n/pa-in/${SLUG}.md"
```

The slug is forever — once published, do not rename without redirects. Treat it as a URL.

### Step 2 — Author the English source

Create `posts/<slug>.md` with required frontmatter (R1):

```yaml
---
title: "…"
date: "YYYY-MM-DD"
excerpt: "…"
author: "Gurvinder Singh"
tags: ["fraud-awareness", "diaspora"]
translation_status: "human_reviewed"   # required by R3 if siblings will exist
---
```

`translation_status: "human_reviewed"` is mandatory on the English source as soon as any locale sibling exists. R3 fails the lint without it.

### Step 3 — Draft the Panjabi sibling

Create `posts-i18n/pa-in/<slug>.md` with frontmatter:

```yaml
---
title: "…"
date: "YYYY-MM-DD"
excerpt: "…"
author: "Gurvinder Singh (AI-assisted Panjabi translation)"
tags: ["fraud-awareness", "diaspora"]
translation_status: "ai_draft"
---
```

`ai_draft` is the only value that triggers the AI-draft banner (R2). The body must contain `gurvinder@securityleader.ai` somewhere so the banner CTA resolves (R9).

### Step 4 — Inline glossary (T/L/R/H)

Every Panjabi post terminates with an inline glossary footer. Type codes:

| Code | Meaning | Example |
|---|---|---|
| **T** | Translated to native Panjabi | `ਠੱਗੀ` for "scam" |
| **L** | Loanword (English in Gurmukhi script) | `ਫਿਸ਼ਿੰਗ` for "phishing" |
| **R** | Retained verbatim (proper noun / brand) | `OWASP`, `Microsoft` |
| **H** | Hybrid (compound of T+L) | `ਸਾਈਬਰ ਠੱਗੀ` ("cyber" loan + native `ਠੱਗੀ`) |

Glossary entries must mirror body usage (R18). If the body uses `ਮੁਹਿੰਮ` 12 times, the glossary must list it. If the glossary lists `ਕਾਲਰ ਪਛਾਣ` but the body uses `ਕਾਲਰ ID`, fix one or the other.

### Step 5 — Translation reference check

Before committing the Panjabi sibling, cross-check against the dictionary entries in **Section 3** of this SOP and against the per-post glossary in the existing live posts. The romance-fraud post (when written) should use STAR-flagged terms `ਸੁਪਨਸਾਜ਼`, `ਖਿਆਲੀ`, `ਹਵਾਈ`, `ਸਚਾਈ ਨੂੰ ਤੋੜ ਮਰੋੜ ਕੇ ਕਥਾ` as the spine, not the English loan `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` alone.

### Step 6 — Local lint

```bash
cd /Volumes/2TBSSD/Development/Git/Work/securityleaderai-blog/securityleaderai-blog
npm run lint:content
LINT_DIRECTIONAL=1 npm run lint:content     # also emit R7 notices for ਉੱਪਰ/ਹੇਠਾਂ
```

R1–R20 must pass. R7 directional-pointer notices require manual confirmation that each `above`/`below`/`ਉੱਪਰ`/`ਹੇਠਾਂ` references the correct direction.

### Step 7 — Preflight build (mandatory before push)

```bash
npx tsc --noEmit
npm run lint:content
rm -rf .next
npx next build --no-lint
```

This is the gate that would have prevented the 2026-05-28 4-commit cycle. See Section 5 for full preflight recipe.

### Step 8 — Local visual verification

```bash
npm run dev
# Open in browser:
# http://localhost:3000/blog                       (English index — card click test)
# http://localhost:3000/blog/<slug>                (English post)
# http://localhost:3000/blog/pa-in                 (Panjabi locale index)
# http://localhost:3000/blog/pa-in/<slug>          (Panjabi post)
```

Confirm:
- The whole post card is clickable, not just the corner CTA (L10).
- The AI-draft banner renders on the Panjabi post.
- The LanguageSwitcher offers EN ↔ PA toggle.
- Any inline raw HTML (badges, callouts) renders correctly (L2 — `sanitize: false`).

### Step 9 — Commit

```bash
git add posts/<slug>.md posts-i18n/pa-in/<slug>.md
git commit -m "$(cat <<'EOF'
post: <slug> — bilingual (EN + pa-in ai_draft)

EN: posts/<slug>.md (translation_status: human_reviewed)
PA: posts-i18n/pa-in/<slug>.md (translation_status: ai_draft)

Content rigor: R1–R20 pass via npm run lint:content.
Preflight: npx next build clean.
EOF
)"
```

### Step 10 — Push and watch Vercel

```bash
git push origin main
# Then in another shell:
vercel inspect <latest-deploy-url> --logs
```

If the build fails, **also** check the runtime logs on the prior READY deploy — the two surfaces report different classes of bug (L12). A successful build does not mean the live site renders the new content; verify by hitting both `/blog/<slug>` and `/blog/pa-in/<slug>` against the live URL.

### Step 11 — Live verify

```bash
curl -sI https://securityleader.ai/blog/<slug>            # expect 200
curl -sI https://securityleader.ai/blog/pa-in/<slug>      # expect 200
curl -s  https://securityleader.ai/blog/pa-in/<slug> | grep -F 'ai_draft'   # expect banner marker
```

If any of these fail, **do not push a quick-fix commit**. Read the build log AND the runtime log first (L12), and re-run the preflight gate (Step 7) against the next attempted fix.

---

## 3. Translation Reference

Source: Punjabi University Patiala, *English-Panjabi Dictionary*, 5th ed. (1998), ISBN 81-7380-095-2. Romanization follows the Punjabi University Patiala convention (modified ISO 15919) — retroflex dot-below (`ṭ ḍ ṇ`), long-vowel macron (`ā ī ū`), nasal tilde-n (`ṅ ñ`), aspirated cluster (`chh`), glottal (`ʼ`). Stated explicitly here because the reference file at `/Volumes/2TBSSD/Development/Projects/Bilingual_Blogs/panjabi-translation-reference.md` does not name the scheme it uses.

### 3.1 Romance / romantic — staged for future romance-fraud post

Star (★) terms are dictionary-flagged as the strongest scam-framing vocabulary. None of these appear in the four live posts yet — the dictionary is forward-staging for the romance-fraud article.

| EN | PA | Romanization | Type | Notes |
|---|---|---|---|---|
| romance (noun, general) | ਰੋਮਾਂਚਕ ਕਹਾਣੀ | romāñchak kahāṇī | T | IPA `/ਰਅ(ਊ)ˈਮੈਨਸ/`; thrilling/adventurous story |
| romance | ਅਦਭੁਤ ਕਥਾ | adbhut kathā | T | Sanskrit-tatsama: wondrous tale |
| romance | ਅਚੰਭੇ ਵਾਲੀ ਕਹਾਣੀ | achambhe vālī kahāṇī | T | Story of wonder/astonishment |
| romance | ਕਲਪਤ ਕਥਾ | kalpat kathā | T | Imagined/fictional tale |
| romance | ਉਪਨਿਆਸ | upniyās | T | Novel (literary form) |
| romance | ਰੁਮਾਂਸਵਾਦੀ ਸਾਹਿਤ | rumāṅsvādī sāhit | H | Romanticist literature; `rumāṅs` = English loan + Sanskrit `-vādī` |
| romance | ਪਿਆਰ ਮੁਹੱਬਤ ਦੀ ਕਹਾਣੀ | piār muhabbat dī kahāṇī | T | Love-affection story; `muhabbat` is Persian/Arabic-origin |
| romance | ਪਿਆਰ | piār | T | Love (general/affectionate) — native Panjabi |
| romance | ਇਸ਼ਕ | ishq | T | Passionate love; Persian/Arabic; strong romance-domain term |
| romance | ਅੱਧਕਾਲ ਦੀ ਵੀਰ ਕਥਾ | addhkāl dī vīr kathā | T | Medieval heroic tale |
| romance (musical) | ਸਰਲ ਗੀਤ | saral gīt | T | Simple song |
| romance (linguistic) | ਫਰਾਂਸ ਦੀ ਪੁਰਾਣੀ ਬੋਲੀ | farāṅs dī purāṇī bolī | T | Old French language — etymological sense |
| **romance (verb — to twist truth) ★** | ਸਚਾਈ ਨੂੰ ਤੋੜ ਮਰੋੜ ਕੇ ਕਥਾ | sachāī nūṅ toṛ maroṛ ke kathā | T | **Strongest scam-framing term per dictionary annotation.** Use as opening frame in romance-fraud post. Maps to BofA Six Red Flags "Deception". |
| **romance (verb — to exaggerate) ★** | ਅਤਿਅੁਕਤੀ ਬਿਆਨ ਕਰਨ | atiukti baiān karan | T | "To make exaggerated statements" — companion to the line above |
| romantic (adj) | ਰੋਮਾਂਚਕ | romāṅchak | T | IPA `/ਰਅ(ਊ)ˈਮੈਨਟਿਕ/`; adjectival form |
| romantic | ਕਲਪਤ | kalpat | T | Imagined |
| **romantic ★** | ਸੁਪਨਸਾਜ਼ | supansāz | T | **"Dream-maker" — dictionary-recommended role-noun for the scammer.** No English loan needed. |
| romantic | ਅਵਿਹਾਰਕ | avihārak | T | Impractical |
| romantic | ਕਲਪਨਾਮਈ | kalpanāmaī | T | Imagination-filled |
| romantic | ਵਚਿੱਤਰ | vachittar | T | Strange/wondrous |
| **romantic ★** | ਖਿਆਲੀ | khiālī | T | **"Imaginary" — describes the fake future scammers sell.** |
| **romantic ★** | ਹਵਾਈ | havāī | T | **"Baseless / airy" — pair with khiālī for fake-future framing.** |
| romantic | ਕਲਪਨਾ ਪਰਧਾਨ | kalpanā pardhān | T | Imagination-dominant |
| romanticism | ਰੋਮਾਂਸਵਾਦ | romāṅsvād | H | `-vād` = Sanskrit `-ism` suffix |
| romanticism | ਭਾਵ ਪਰਧਾਨਤਾ | bhāv pardhāntā | T | Emotion-dominance |
| romanticism | ਕਾਲਪਨਕਤਾ | kālpankatā | T | Imaginariness |

### 3.2 Recommended romance-fraud framing (for future post)

| Concept | Recommended PA | Notes |
|---|---|---|
| What the scammer does | `ਸਚਾਈ ਨੂੰ ਤੋੜ ਮਰੋੜ ਕੇ ਕਥਾ` | Opens the article. BofA "Deception" pillar. |
| The scammer's role | `ਸੁਪਨਸਾਜ਼` | Role-noun. Prefer over English loan "romance scammer". |
| The fake future | `ਖਿਆਲੀ / ਹਵਾਈ` (paired) | Adjectives for the promised marriage/visa/business. |
| The victim's feelings | `ਪਿਆਰ` (native) or `ਇਸ਼ਕ` (stronger) | Use `piār` for general affection, `ishq` for the manipulated infatuation. |
| The fabricated backstory | `ਉਪਨਿਆਸ` / `ਅਚੰਭੇ ਵਾਲੀ ਕਹਾਣੀ` | "Scripted novel" framing. |
| The too-good-to-be-true plans | `ਅਵਿਹਾਰਕ` | "Impractical" — name the red flag explicitly. |

### 3.3 Gaps to fill in the dictionary reference file

The audit surfaced six terms used consistently across the four live posts but missing from `panjabi-translation-reference.md`. These should be added before the romance-fraud post is written.

| EN | PA used in live posts | Romanization | Type | Where it appears |
|---|---|---|---|---|
| scam | `ਠੱਗੀ` | ṭhaggī | T | All 4 posts; etymology already noted in reporting-centers L91 (`ṭhagīā — ਪੁਰਾਣੀ ਪੰਜਾਬੀ ਜੜ੍ਹ, ਗੁਰਬਾਣੀ-ਮੂਲ`) |
| victim | `ਪੀੜਤ` | pīṛat | T | reporting-centers L24, tech-support L16 |
| trust (noun/verb) | `ਭਰੋਸਾ` / `ਭਰੋਸਾ ਕਰਨਾ` | bharosā / bharosā karnā | T | tech-support L12, L26 — Persian/Arabic-origin |
| deception | `ਧੋਖਾ` | dhokhā | T | All 3 scam posts as Red Flag #5 header |
| abuse of emotion | `ਭਾਵਨਾ ਦਾ ਫਾਇਦਾ` | bhāvnā dā fāidā | T | All 3 scam posts as Red Flag #2 header |
| fake / counterfeit | `ਨਕਲੀ` / `ਜਾਅਲੀ` | naklī / jāʼlī | T | tech-support glossary L106 |

### 3.4 Drift risk in current posts

| File:line | Issue | Action |
|---|---|---|
| `posts-i18n/pa-in/reporting-centers-onepager.md:35` | Uses `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` (English loan) where dictionary recommends `ਸੁਪਨਸਾਜ਼ ਠੱਗੀ` or `ਪਿਆਰ ਠੱਗੀ` | Decide whether `ਰੋਮਾਂਸ ਫ਼ਰਾਡ` becomes a settled hybrid (add to dictionary as H) or migrate. |
| `posts-i18n/pa-in/reporting-centers-onepager.md:116` | Same loan repeated | Same decision propagates here. |
| All 4 posts (future romance-fraud) | `ਸੁਪਨਸਾਜ਼` unused | Deploy in the romance-fraud post body. Consider retroactive use in WhatsApp post — the "new number" scammer is also a `ਸੁਪਨਸਾਜ਼`. |

---

## 4. Routing & Architecture

### 4.1 Final tree (post-fix, commit `180030f`)

```
src/app/blog/
├── page.tsx                       # /blog — English index, whole-card clickable
├── [slug]/
│   ├── page.tsx                   # Dispatches:
│   │                              #   if isLocale(slug) → LocaleBlogIndex
│   │                              #   else              → English post detail
│   └── [post]/
│       └── page.tsx               # /blog/<locale>/<post> — locale post detail
```

`isLocale(slug)` is the discriminator at the single dynamic level. Currently `["pa-in"]`. Add new locales here AND in `generateStaticParams`.

### 4.2 Why this shape

Next.js 16 forbids two **sibling directories with different dynamic-segment names at the same depth**. The first fix attempt put `[locale]/page.tsx` next to `[slug]/page.tsx` — even after deleting `[locale]/page.tsx`, the directory itself remained and Next still inferred the `[locale]` dynamic name, producing:

```
Error: Ambiguous app routes detected:
Ambiguous route pattern "/blog/[*]" matches multiple routes:
  - /blog/[locale]
  - /blog/[slug]
```

The canonical fix collapses both surfaces under a single param name (`slug`) and dispatches at runtime. The deeper segment (`[post]`) is unambiguous because it lives one level below.

### 4.3 What NOT to do

| Anti-pattern | Why it breaks |
|---|---|
| `app/blog/[locale]/page.tsx` next to `app/blog/[slug]/page.tsx` | Sibling dynamic routes with different param names — build fails |
| Renaming `[slug]` to `[locale]` without deleting the old directory | The old directory still declares a dynamic segment with the old name |
| Using `posts-i18n/<slug>-pa.md` (suffix-style) | Violates R8; breaks hreflang and locale index discoverability |
| Calling `params.slug` synchronously in Next.js 15+ | `params` is now a Promise; must `await` |
| Defining `generateStaticParams` only on the child page | Cross-product with parent lang params is lost; build produces no Panjabi pages |
| Embedding raw `<span class="badge">` without `sanitize: false` | remark-html default sanitizer silently strips the entire enclosing block |

### 4.4 Diagram

```
                    /blog
                      |
                  [slug]/page.tsx
                  /            \
            isLocale?         else
              |                 |
       LocaleBlogIndex     English post (renders posts/<slug>.md)
              |
        [post]/page.tsx
              |
        Panjabi post (renders posts-i18n/<locale>/<post>.md)
```

URLs produced:

```
/blog                          → English index
/blog/<slug>                   → English post (e.g. /blog/reporting-centers-onepager)
/blog/pa-in                    → Panjabi index (LocaleBlogIndex)
/blog/pa-in/<slug>             → Panjabi post  (e.g. /blog/pa-in/reporting-centers-onepager)
```

### 4.5 Markdown render pipeline — sanitize:false invariant

Both post pages render markdown via `remark` + `remark-html`. The default `remark-html` sanitizer strips raw HTML — so badges, callouts, and any custom `<span>` will silently disappear from the output.

```ts
// src/app/blog/[slug]/page.tsx and [slug]/[post]/page.tsx
const html = await remark()
  .use(remarkGfm)
  .use(remarkHtml, { sanitize: false })   // REQUIRED — see L2
  .process(markdownBody);
```

`sanitize: false` is safe **only because all post content is author-committed markdown in git** — no user submissions, no CMS import, no comment system. If any of those change, switch to `rehype-sanitize` with an allowlist before merging.

---

## 5. Pre-flight Checks

Mandatory before every push that touches `src/app/**`, `next.config.*`, `package.json`, `posts/**`, or `posts-i18n/**`.

### 5.1 The full recipe

```bash
cd /Volumes/2TBSSD/Development/Git/Work/securityleaderai-blog/securityleaderai-blog

# 1. TypeScript
npx tsc --noEmit

# 2. Content lint (R1–R20)
npm run lint:content

# 3. Optional directional check (R7 notices)
LINT_DIRECTIONAL=1 npm run lint:content

# 4. Clean build cache and build
rm -rf .next
npx next build --no-lint

# 5. Visual smoke (manual)
npm run dev
# Then hit:
#   http://localhost:3000/blog
#   http://localhost:3000/blog/<new-slug>
#   http://localhost:3000/blog/pa-in
#   http://localhost:3000/blog/pa-in/<new-slug>
```

If any of steps 1–4 fail, **do not push**. Fix locally, re-run the full chain, then push.

### 5.2 sanitize-survives smoke test

To catch L2 regressions, the repo should include a fixture post containing a marker that only survives when `sanitize: false` is honored:

```markdown
<!-- tests/fixtures/sanitize-marker.md -->
This sentence contains <span class="test-marker-render-survives">a marker</span>.
```

The build should grep the produced HTML for `test-marker-render-survives`. If missing, the sanitizer is on and badges will silently vanish — fail the build.

### 5.3 Sibling-dynamic-route lint

To catch L1 regressions, scan `src/app/**/` for sibling directories with conflicting dynamic-segment names at the same depth:

```bash
find src/app -type d -name '[*]' | awk -F/ '{
  parent = $0; sub(/\/\[[^]]+\]$/, "", parent);
  print parent "\t" $NF
}' | sort | awk '{
  if ($1 == prev_parent && $2 != prev_seg) print "CONFLICT:", $1, prev_seg, "vs", $2;
  prev_parent = $1; prev_seg = $2
}'
```

Output should be empty. Any `CONFLICT:` line is a guaranteed Next.js 16 build failure.

### 5.4 Vercel-target sanity (L3)

Before debugging a "my push didn't deploy" symptom, confirm the Vercel project points at the right GitHub repo:

```bash
git remote get-url origin                     # local truth
# Compare against Vercel dashboard:
# Project → Settings → Git → Connected Git Repository
```

If they differ, Vercel is watching a different repo and your pushes will look successful on GitHub but never trigger a build.

### 5.5 Pre-push hook (recommended)

Suggested `.husky/pre-push`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

CHANGED=$(git diff --name-only origin/main)
if echo "$CHANGED" | grep -qE '^(src/app/|next\.config|package\.json|posts/|posts-i18n/)'; then
  npx tsc --noEmit || exit 1
  npm run lint:content || exit 1
  rm -rf .next
  npx next build --no-lint || exit 1
fi
```

---

## 6. Common Failure Modes

Catalogued from commits `6aa8866`, `8314f85`, `f31fdfe`, `180030f`, `95238e4`, `fbb3fb8`, `696618f`, `b4b5bb0`, `d3c948b`, `1d045c4`.

| ID | Symptom | Cause | Fix | Prevention |
|---|---|---|---|---|
| **L1** | Vercel build fails: `Ambiguous route pattern "/blog/[*]"` matches both `[locale]` and `[slug]` | Sibling directories with different dynamic-param names at the same depth — restriction holds even if `[locale]/page.tsx` is deleted, because the directory itself still declares the dynamic segment | Collapse to a single dynamic param (`[slug]`) and dispatch in `page.tsx` via `isLocale(slug)` | Sibling-dynamic-route lint (Section 5.3); preflight `next build` (Section 5.1) |
| **L2** | Inline `<span class="badge">…</span>` vanishes from rendered HTML; no error | `remark-html` default sanitizer strips raw HTML | Pass `{ sanitize: false }` to `remark-html` in both `[slug]/page.tsx` and `[slug]/[post]/page.tsx` | Sanitize-survives fixture (Section 5.2); grep renderer config whenever introducing raw HTML for the first time |
| **L3** | GitHub push is green but the published article never appears on the live URL | Vercel project pointed at the wrong GitHub repo; or the markdown file contains a Cloudflare bot-challenge HTML page instead of the article body | Re-point Vercel to the canonical repo; replace HTML challenge page with actual article markdown | `git remote get-url origin` vs. Vercel project → Settings → Git, every time before debugging a missing deploy (Section 5.4) |
| **L4 (URL)** | Translations live at `/blog/<slug>-pa` — no locale index, no hreflang, no cross-locale nav | Initial bilingual experiment used filename-suffix routing; doesn't scale beyond 1–2 translations | Migrate to BCP 47 locale-prefix routing: `posts-i18n/<locale>/<slug>.md` → `/blog/<locale>/<slug>` | R8 (AUTO) — fails any `/blog/<slug>-(pa\|fr\|es\|…)` link in source |
| **L4 (Danda)** | Naive `R4` regex would flag every full-stop `।` in legitimately-written Gurmukhi | Devanagari block (U+0900–U+097F) contains shared Indic punctuation — danda U+0964 and double-danda U+0965 are canonical Gurmukhi punctuation | Refine R4 regex to `/[ऀ-ॣ०-ॿ]/` — excludes U+0964 and U+0965 | When implementing script-contamination checks for any Indic script, research the codepoint allow-list before shipping |
| **L5** | English heading `## What to do first` (a question) translated as `## ਪਹਿਲਾਂ ਕੀ ਕਰਨਾ ਹੈ` — no `?` | Translator/AI treats `?` as optional when Panjabi question word `ਕੀ` is present; punctuation parity not enforced | Append `?` to the Panjabi heading | R5 (AUTO) — heading-pair ordinal parity check |
| **L7** | Panjabi reporting-centers step 3 says `ਉੱਪਰ ਦਿੱਤੀ ਏਜੰਸੀ` ("above") but agencies are below | Translation preserved the *concept* of a directional pointer but flipped the *direction*; section ordering was edited post-translation without re-checking | Change to `ਹੇਠਾਂ ਦਿੱਤੀ ਏਜੰਸੀ` | R7 (REVIEW + opt-in AUTO notice via `LINT_DIRECTIONAL=1`); reviewer checklist for every above/below/ਉੱਪਰ/ਹੇਠਾਂ |
| **L9** | A locale sibling ships without translation-status banner; AI-draft posts have no feedback channel | Three coupled invariants weren't enforced together: R2 (status on sibling), R3 (status on EN source when siblings exist), R9 (feedback email in `ai_draft` body) | Encode all three in `scripts/lint-content.mjs` | R2 / R3 / R9 (all AUTO) |
| **L10** | Card title and excerpt non-interactive; only the corner CTA navigates | `<div>` card with a child `<Link>` only on the CTA | Wrap the whole card in `<Link>` | Lint card components: grep for `<Link>` inside card wrappers and confirm the nearest enclosing element is the Link, not a `<div>`; add a click-the-title Playwright test |
| **L11** | 4-commit fix cycle (6aa8866 → 8314f85 → f31fdfe → 180030f), two production-broken deploys, ~17h to land READY | No preflight discipline — `next build` was not run locally before pushing structural app-router changes | Adopt the preflight chain in Section 5.1; verify `.next/` artifact builds before push | `.husky/pre-push` triggers `next build` when `src/app/**` or render-pipeline deps change (Section 5.5) |
| **L12** | Build log shows route ambiguity (L1) AND runtime log on the prior READY deploy shows ENOENT on `posts/pa-in.md` — two distinct signals for the same bilingual-routing gap | Vercel separates build-time and runtime logs; build-only triage misses live user-facing 500s | Read both surfaces on every regression triage | Triage checklist: deployment build log + prior READY runtime log + `vercel inspect <deploy> --logs` |

---

## 7. Suggested Edits to Apply Now

Concrete edits surfaced by the posts audit. Each is a one-line before/after with file:line. **Apply these before authoring the next post** so the corpus is consistent when the romance-fraud article ships.

### 7.1 Reporting-centers one-pager

| File:line | Before | After | Reason |
|---|---|---|---|
| `posts-i18n/pa-in/reporting-centers-onepager.md:23` | `ਸਥਾਨਕ ਪੁਲਿਸ ਆਪਣੀ ਇਲਾਕੇ ਵਿੱਚ` | `ਸਥਾਨਕ ਪੁਲਿਸ ਆਪਣੇ ਇਲਾਕੇ ਵਿੱਚ` | Gender agreement: `ਇਲਾਕਾ` is masculine; possessive must be masculine oblique `ਆਪਣੇ`. |
| `:32` | `ਔਨਲਾਈਨ ਠੱਗੀ, ਘੋਟਾਲੇ` | `ਔਨਲਾਈਨ ਠੱਗੀ` | Glossary commits to `ਠੱਗੀ`; `ਘੋਟਾਲੇ` is Hindi-origin and not in glossary. Drop the parallel term. |
| `:35` | `ਵਿੱਤੀ ਠੱਗੀ, ਰੋਮਾਂਸ ਫ਼ਰਾਡ, ਪਛਾਣ ਦੀ ਚੋਰੀ` | `ਵਿੱਤੀ ਠੱਗੀ, ਰੋਮਾਂਸ ਠੱਗੀ, ਪਛਾਣ ਦੀ ਚੋਰੀ` | Glossary note says `ਠੱਗੀ ਅਤੇ ਫ਼ਰਾਡ ਦੋਨੋ` — use `ਠੱਗੀ` for consistency. |
| `:44` | `ਰਾਸ਼ਟਰੀ ਫ਼ਰਾਡ ਰਿਪੋਰਟਿੰਗ` | `ਰਾਸ਼ਟਰੀ ਠੱਗੀ ਰਿਪੋਰਟਿੰਗ` | Same glossary-mismatch issue. |
| `:47` | `ਸਾਈਬਰ ਜੁਰਮ + ਫ਼ਰਾਡ ਰਿਪੋਰਟਿੰਗ` | `ਸਾਈਬਰ ਜੁਰਮ + ਠੱਗੀ ਰਿਪੋਰਟਿੰਗ` | Same. |
| `:68` | `ਘੋਟਾਲਾ ਰਿਪੋਰਟਿੰਗ` | `ਠੱਗੀ ਰਿਪੋਰਟਿੰਗ` | Hindi-origin term not in glossary. |
| `:70` | `24 ਘੰਟੇ ਖੁੱਲ੍ਹੀ ਜ਼ਿੰਦਾ ਮਦਦ` | `24 ਘੰਟੇ ਉਪਲਬਧ ਹੈਲਪਲਾਈਨ` | `ਜ਼ਿੰਦਾ ਮਦਦ` reads as machine-translation calque of "live help". |
| `:72` | `ਘੋਟਾਲਿਆਂ (ਟੈਕਸਟ/ਫ਼ੋਨ/ਈਮੇਲ ਘੋਟਾਲੇ) ਲਈ Scamwatch ਵਰਤੋ` | `ਠੱਗੀਆਂ (ਟੈਕਸਟ/ਫ਼ੋਨ/ਈਮੇਲ ਠੱਗੀਆਂ) ਲਈ Scamwatch ਵਰਤੋ` | Continued `ਘੋਟਾਲਾ` drift. |
| `:80` | `ਔਰਤਾਂ ਅਤੇ ਬੱਚਿਆਂ ਅਤੇ ਵਿੱਤੀ ਠੱਗੀ ਉੱਤੇ ਖ਼ਾਸ ਧਿਆਨ` | `ਔਰਤਾਂ, ਬੱਚਿਆਂ ਅਤੇ ਵਿੱਤੀ ਠੱਗੀ ਉੱਤੇ ਖ਼ਾਸ ਧਿਆਨ` | Double `ਅਤੇ` (English-influenced serial). |
| `:91` (glossary) | `sāibar thaggī` | `sāibar ṭhaggī` | Retroflex `ṭ` is required (cross-post inconsistency — other three posts use `ṭhaggī`). |

### 7.2 Tech-support scam for elders

| File:line | Before | After | Reason |
|---|---|---|---|
| `posts-i18n/pa-in/tech-support-scam-elders.md:24` | `ਡਿਵਾਈਸ ਵਾਇਰਸ ਨਾਲ ਭਰੀ ਹੋਈ ਹੈ` | `ਡਿਵਾਈਸ ਵਾਇਰਸ ਨਾਲ ਭਰਿਆ ਹੋਇਆ ਹੈ` | Gender: `ਡਿਵਾਈਸ` is masculine (like `ਫ਼ੋਨ`, `ਕੰਪਿਊਟਰ`). |
| `:24` | `ਉੱਚੀ ਅਲਾਰਮ ਦੀ ਆਵਾਜ਼ ਵਜਦੀ ਹੈ` | `ਉੱਚੀ ਅਲਾਰਮ ਦੀ ਆਵਾਜ਼ ਵੱਜਦੀ ਹੈ` | Orthography: `ਵੱਜਣਾ` takes addak. |
| `:38` | `ਜਾਂ "Windows ਟੈੱਕਨੀਕਲ ਸਪੋਰਟ" ਤੋਂ ਹੈ` | `ਜਾਂ "Windows ਟੈੱਕ ਸਪੋਰਟ" ਤੋਂ ਹੈ` | Title/glossary use `ਟੈੱਕ ਸਪੋਰਟ`; introducing `ਟੈੱਕਨੀਕਲ` is drift. |
| `:38` | `ਅਸਲੀ Microsoft ਕਦੇ ਵੀ ਤੁਹਾਡੇ ਕੰਪਿਊਟਰ ਬਾਰੇ ਆਪ ਫ਼ੋਨ ਨਹੀਂ ਕਰਦੀ` | `ਅਸਲੀ Microsoft ਕਦੇ ਵੀ ਤੁਹਾਡੇ ਕੰਪਿਊਟਰ ਬਾਰੇ ਆਪ ਫ਼ੋਨ ਨਹੀਂ ਕਰਦਾ` | Corporate name without `ਕੰਪਨੀ` → masculine verb. |
| `:56` | `ਸਕਰੀਨ ਉੱਤੇ ਦਿਖਾਇਆ ਨੰਬਰ ਨਾ ਡਾਇਲ ਕਰੋ` | `ਸਕਰੀਨ ਉੱਤੇ ਦਿਖਾਏ ਗਏ ਨੰਬਰ ਨੂੰ ਨਾ ਡਾਇਲ ਕਰੋ` | Native passive construction. |
| `:91` | `ਉੱਪਰ ਦਿੱਤੀ ਡੱਬੇ ਵਾਲੀ ਲਾਈਨ` | `ਉੱਪਰ ਦਿੱਤੀ ਡੱਬੇ ਵਾਲੀ ਪੰਕਤੀ` | `ਲਾਈਨ` is English calque; `ਪੰਕਤੀ` is native. |
| `:100` (glossary) | `ṭaikk sapoarṭ ṭhaggī` | `ṭaikk sapoṛaṭ ṭhaggī` (or `ṭaikk sapōrṭ ṭhaggī`) | `sapoarṭ` inserts a phantom `a` that doesn't match the Gurmukhi spelling `ਸ-ਪ-ੋ-ਰ-ਟ`. |

Add these glossary entries (currently used in body but undefined):

- `Technician → ਟੈੱਕਨੀਸ਼ੀਅਨ (ṭaiknīshīʼan, L)`
- `Pop-up → ਪੌਪ-ਅੱਪ (paup-app, L)`
- `Ransomware → ਰੈਨਸਮਵੇਅਰ (rainsamveʼar, L)`
- `Wire transfer → ਵਾਇਰ ਟ੍ਰਾਂਸਫ਼ਰ (vāir ṭrāṅsfar, L)`
- `Cryptocurrency → ਕ੍ਰਿਪਟੋਕਰੰਸੀ (kripṭokarainsī, L)`
- `Freeze → ਫ਼੍ਰੀਜ਼ (frīz, L)`

Distinguish in the Spoofed entry:

- `Fake → ਨਕਲੀ (naklī, T)` — for fake identity/popup/webpage
- `Spoofed → ਜਾਅਲੀ (jāʼlī, T)` — specifically for caller-ID spoofing

### 7.3 WhatsApp family-emergency scams

| File:line | Before | After | Reason |
|---|---|---|---|
| `posts-i18n/pa-in/whatsapp-family-emergency-scams.md:28` | `"ਮੰਮਾ ਜੀ," "ਪਾਪਾਜੀ"` | `"ਮੰਮਾ ਜੀ," "ਪਾਪਾ ਜੀ"` | Spacing consistency on honorific `ਜੀ`. |
| `:65` | `ਚੰਗਾ।` (standalone confirmation) | `ਠੀਕ ਹੈ।` | `ਚੰਗਾ` reads as "good (thing)"; native confirmation is `ਠੀਕ ਹੈ`. |
| `:110` (glossary) | `tasdeeq karo` | `tasdīq karo` | Mixed romanization style within one glossary; align with `ṭhaggī` (IAST) used in same file. |
| `:106` (glossary) | `ilaikṭronik ṭrāṅsfar` | (decide: either standardize body to Gurmukhi `ਇਲੈਕਟ੍ਰੋਨਿਕ ਟ੍ਰਾਂਸਫ਼ਰ`, or accept English `e-transfer` in body and update glossary entry to reflect dual usage) | Body uses raw English `e-transfer`; glossary entry is aspirational. |

Distinguish in glossary:

- `Difficulty → ਮੁਸ਼ਕਿਲ (mushkil, T)`
- `Trouble/calamity → ਮੁਸੀਬਤ (musībat, T)`

(They are not synonyms; the post uses both interchangeably.)

### 7.4 Gurdwara-charity donation fraud

| File:line | Before | After | Reason |
|---|---|---|---|
| `posts-i18n/pa-in/gurdwara-charity-donation-fraud.md:12` | `ਵੰਡ ਛਕਣਾ — ਦੂਜਿਆਂ ਨਾਲ ਵੰਡਣਾ — ਸਿੱਖ ਜੀਵਨ ਦਾ ਮੂਲ ਸਿਧਾਂਤ ਹੈ` | `ਵੰਡ ਛਕਣਾ — ਦੂਜਿਆਂ ਨਾਲ ਮਿਲ ਕੇ ਛਕਣਾ — ਸਿੱਖ ਜੀਵਨ ਦਾ ਮੂਲ ਸਿਧਾਂਤ ਹੈ` | **Theological accuracy.** `ਛਕਣਾ` (eat/partake) is core to the term; "sharing with others" loses it. |
| `:22` | `ਵੰਡ ਛਕਣੇ ਦਾ ਸਿੱਖ ਸਿਧਾਂਤ` | `ਵੰਡ ਛਕਣ ਦਾ ਸਿੱਖ ਸਿਧਾਂਤ` | Inflection of verbal noun in oblique case. |
| `:22` | `ਪ੍ਰਤੀ-ਜੀਅ ਸਭ ਤੋਂ ਉੱਚੀਆਂ ਖ਼ੈਰਾਤ ਦਰਾਂ` | `ਪ੍ਰਤੀ ਵਿਅਕਤੀ ਸਭ ਤੋਂ ਉੱਚੀਆਂ ਖ਼ੈਰਾਤ ਦਰਾਂ` | `ਪ੍ਰਤੀ-ਜੀਅ` is Sanskrit-leaning; `ਵਿਅਕਤੀ` is accessible. |
| `:30` | `ਫੰਡਰੇਜ਼ਰ` (header) | `ਫੰਡ ਮੁਹਿੰਮ` | English calque → native. |
| `:34` | `ਫਲੂੰਟ ਪੰਜਾਬੀ` | `ਚੰਗੀ ਪੰਜਾਬੀ` (or `ਰਵਾਂ ਪੰਜਾਬੀ`) | `ਫਲੂੰਟ` is not a Panjabi word. |
| `:50` | `ਕੋਈ ਚੈਰਿਟੇਬਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ ਨਹੀਂ ਦਿੱਤਾ ਜਾਂਦਾ` | `ਕੋਈ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ ਨਹੀਂ ਦਿੱਤਾ ਜਾਂਦਾ` | `ਚੈਰਿਟੇਬਲ` is an English adjective; context already establishes charity. |
| `:79` | `ਆਪਣੀ ਮਿਹਨਤ ਅਤੇ ਸਾਧਨਾਂ ਦਾ ਕਮਾਇਆ, ਸਚੇਤ ਦੇਣ` | `ਆਪਣੀ ਮਿਹਨਤ ਅਤੇ ਸਾਧਨਾਂ ਨਾਲ ਕਮਾਇਆ, ਸਚੇਤ ਦਾਨ` | Grammar + parallelism. |
| `:101` (glossary) | English header `Parbandhi Committee` | English header `Prabandhak Committee` | Mismatch: Gurmukhi `ਪ੍ਰਬੰਧਕ` = "manager(s)", not "managerial". |
| `:101` (glossary) | `prabandhak komiṭī` | `prabandhak kameṭī` | Romanization: `ਕਮੇਟੀ` = ka-me-ṭī, not ko-mi-ṭī. |
| `:16` | `ਚੈਰਿਟੀ ਫਰਾਡ ਨਾਲ ਅਮਰੀਕੀਆਂ ਨੂੰ` | `ਦਾਨ ਠੱਗੀ ਨਾਲ ਅਮਰੀਕੀਆਂ ਨੂੰ` | Glossary lists `ਦਾਨ ਠੱਗੀ` as the native variant; prefer in a Sikh-community context. |

Add glossary entries:

- `Campaign → ਮੁਹਿੰਮ (muhinm, T)` — repeated 12+ times in body
- `Disaster relief → ਆਫ਼ਤ ਰਾਹਤ (āfat rāhat, T)`

### 7.5 Cross-post consistency edits

| Decision | Apply to all four posts |
|---|---|
| Romanize `ਠੱਗੀ` as `ṭhaggī` everywhere (retroflex) | reporting-centers L91 currently has `thaggī` — fix |
| Pick a single romanization style — IAST diacritics (`tasdīq`, `naklī`, `ṭhaggī`) — and apply uniformly | WhatsApp L110 has English-style `tasdeeq` — fix |
| Spell "fraud" as `ਫ਼ਰਾਡ` (with nukta) everywhere when used as loanword | gurdwara post uses `ਫਰਾਡ` (no nukta) — fix |
| Pick one of `ਸੰਗਤ` / `ਸਮਾਜ` / `ਭਾਈਚਾਰਾ` for "community" and document the choice in `panjabi-translation-reference.md` | Currently all three appear across the corpus with no explicit policy |

### 7.6 Add to `panjabi-translation-reference.md`

Append a new section explicitly declaring the romanization scheme:

```
## Romanization scheme
Punjabi University Patiala convention, modified ISO 15919:
- Retroflex consonants: ṭ ḍ ṇ (dot below)
- Long vowels: ā ī ū (macron)
- Nasal: ṅ (velar), ñ (palatal)
- Aspirated cluster: chh (not ch + h)
- Glottal: ʼ (apostrophe-like)
```

And add the six gap entries from Section 3.3 (scam, victim, trust, deception, abuse of emotion, fake/counterfeit).

---

## 8. Citations & References

### 8.1 Vercel / Next.js research

| Title | URL | What it gave us |
|---|---|---|
| Next.js Internationalization Guide | https://nextjs.org/docs/app/guides/internationalization | Sub-path locale routing (`/<locale>/path`) as the recommended default. Nest all `app/` routes under `app/[lang]/` for the canonical implementation. |
| Next.js Dynamic Route Segments | https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes | Runtime validation pattern for locale narrowing via `notFound()`. `params` is a Promise in Next.js 15+. |
| Next.js `generateStaticParams` | https://nextjs.org/docs/app/guides/internationalization | Cross-product semantics across nested dynamic levels. |
| Cloudflare blog reference (`/fr-fr/`) | https://blog.cloudflare.com/fr-fr/ | Reference implementation of the `/<locale>/` prefix shape. |
| Vercel Template: i18n in Edge Middleware | https://vercel.com/templates/next.js/edge-functions-i18n | Pattern for Accept-Language → locale redirect. |
| Vercel Template: Next.js i18n Dashboard | https://vercel.com/templates/next.js/next.js-i18n-dashboard | Multilingual UI patterns with Next.js + Tailwind + React Intl. |
| Next.js i18n routing example | https://github.com/vercel/next.js/tree/canary/examples/i18n-routing | Minimal canonical example from the Vercel team. |

### 8.2 Sibling-dynamic-route restriction

The restriction that two sibling directories at the same depth cannot have different dynamic-param names (`[locale]` next to `[slug]`) is documented in the Next.js dynamic-routes file-convention reference. The canonical workaround for bilingual blogs is to nest locale as the parent segment (`app/[lang]/blog/[slug]`) — or, as we do, to collapse both surfaces under a single param name and dispatch at runtime.

### 8.3 Markdown render pipeline

`remark-html` ships with `sanitize: true` by default per the unified.js security model. For a single-author blog where every post is committed to git, `sanitize: false` is the standard configuration — but document the trust assumption in code. If user submissions, comments, or CMS imports ever land in the pipeline, switch to `rehype-sanitize` with an explicit allowlist immediately.

### 8.4 hreflang and canonical guidance

- Emit `hreflang` link tags for every supported locale plus an `x-default` fallback. Generate in `app/[lang]/layout.tsx` via Metadata API (`alternates.languages`) so every page inherits them.
- For pages that exist in only one locale, omit `hreflang` for the missing locale — do not point it to a fallback. Google treats false hreflang as a soft 404.
- Canonical always points to the locale-prefixed URL of the current page (never the bare `/path`).

### 8.5 RSS and sitemap

- One RSS feed per locale at `/<locale>/rss.xml` — feed readers expect single-language feeds.
- Sitemap: single `sitemap.xml` at the root with `xhtml:link rel='alternate' hreflang` entries per URL, or a `sitemap-index.xml` referencing per-locale sitemaps for >50k URLs.

### 8.6 Companion docs in this repo

| Doc | Path | What it covers |
|---|---|---|
| Content Rigor — Rules R1–R20 | `docs/content-rigor.md` | The lint-enforced and reviewer-checked rules cited throughout this SOP |
| Research-Blog Visual Plan | `docs/research-blog-visual-plan.md` | Visual design system, badges, callouts — explains why `sanitize: false` is needed |
| Translation reference (private) | `/Volumes/2TBSSD/Development/Projects/Bilingual_Blogs/panjabi-translation-reference.md` | Dictionary entries (Punjabi University Patiala 1998, ISBN 81-7380-095-2) — needs the gap-fill entries from Section 3.3 of this SOP |
| Lint implementation | `scripts/lint-content.mjs` | Implements the AUTO rules referenced here |
| Post template (English) | `src/app/blog/[slug]/page.tsx` | Renders `posts/<slug>.md` with `sanitize: false`; dispatches locale index when `isLocale(slug)` |
| Post template (locale) | `src/app/blog/[slug]/[post]/page.tsx` | Renders `posts-i18n/<locale>/<post>.md`; same sanitize config |
| Locale index component | `src/components/locale-blog-index.tsx` | Listing of all posts in a given locale; whole-card-clickable per L10 |

### 8.7 Source commits

- `6aa8866` — initial bilingual feature (broken: L1, L10)
- `8314f85` — visual tokens / badges (broken: L2)
- `f31fdfe` — first fix attempt (broken: deleted `[locale]/page.tsx` but directory remained)
- `180030f` — landed: collapsed to single dynamic surface with `isLocale()` dispatch; `sanitize: false`
- `95238e4` — replaced Cloudflare challenge HTML with actual article markdown (L3)
- `fbb3fb8`, `696618f` — content-rigor rules R5, R7, R9, R4-with-danda-carveout
- `d3c948b`, `b4b5bb0`, `1d045c4` — SAY-291 BCP 47 locale-prefix migration

---

## Authored by

Gurvinder Singh (SecurityLeader.ai). SOP version `v1.0` — 2026-05-30. Supersedes ad-hoc decisions captured in commit messages between 2026-05-28 and 2026-05-30. Pairs with `content-rigor.md` v1.0.
