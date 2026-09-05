# Repo Maintenance Scan — 2026-09-05

**Task:** Task 1 of the Content Maintenance & Visual Automation handoff
(Notion → Thinking Toolkit → "Content Curation and Automated Visual Workflow").
Standalone scan, no dependencies on Tasks 2–6.

**Method:** `npm install && npm run build` (fresh — no `node_modules`/`.next`
existed at session start), then the actual build output
(`.next/server/app/**/*.html`, 81 static pages) was used as the source of
truth for "does this route exist," rather than trusting route lists in
prose. Internal-link and stale-post checks are mechanical (scripted against
the build output and `git log`); the external-link check is bounded by an
environment constraint, described in §2.

---

## 0. Fixed during this scan (2 items — small, unambiguous, verified)

Both are one-line corrections with a single obviously-correct answer
(confirmed against the actual build output before and after), so they were
fixed rather than only reported. Everything else below is report-only.

1. **Two dead internal links** — `posts/github-supply-chain-pipeline-perimeter.md:92`
   linked to `/posts/oauth-supply-chain-salesloft-drift` and
   `/posts/mcp-sentinel-scanner`. This site's post route is `/blog/<slug>`,
   not `/posts/<slug>` — both targets exist at `/blog/oauth-supply-chain-salesloft-drift`
   and `/blog/mcp-sentinel-scanner`. Fixed the prefix; rebuilt and
   re-ran the internal-link checker — 0 broken links remain.
2. **The stray double-quote rendering bug** (named in the handoff as a known,
   unresolved issue to check) — root-caused and fixed. See §3.

## 1. Internal links (script: extract `](/...)` and `href="/..."` from
all of `posts/`, `posts-i18n/`, `src/`; check each against the 81 routes
the build actually emitted)

- **Before fix:** 2 broken links (item 1 above).
- **After fix:** 0 broken links, repo-wide, across every markdown post,
  every translation, and every `.tsx`/`.ts` source file.
- One likely false positive ruled out by hand: `src/app/page.tsx`'s
  `/research?tab=tool` — a query-string route to a real page
  (`/research`), not a broken link; the checker script now strips `?...`
  before comparing.

## 2. External links — **partial, environment-limited**

**What Task 1 asked for:** an HTTP status check on every external URL.
**What was actually possible in this session:** direct HTTP checks (`curl`)
to any external host are blocked by this environment's egress policy —
confirmed by testing `owasp.org`, `arxiv.org`, `rfc-editor.org`,
`attack.mitre.org`, `linkedin.com`, and `giac.org`, all of which returned
`403`/`EGRESS_BLOCKED` from the network proxy, both via `curl` and via the
`WebFetch` tool. Per this environment's own guidance, a blocked host is not
something to route around — it's reported, not retried.

**`github.com` is the one allowed exception** (routed through the GitHub
integration this session has). Checked the highest-value GitHub links by hand:

| URL | Result |
|---|---|
| `github.com/GeeksikhSecurity/mcp-sentinel-scanner` (CLAUDE.md's named key URL) | 200, live, active repo |
| `github.com/OWASP/ASVS/pull/3254` (the ASVS translation submission, linked from ~28 posts) | Loads. **State: Draft** (maintainer converted it to draft Sept 2025, "translation in progress") |
| `github.com/OWASP/AISVS/pull/1128` (the AISVS translation submission) | Loads. **State: Open**, unmerged, no reviewers assigned yet |
| `github.com/GeeksikhSecurity/ASVS/tree/panjabi-translation-v5` (the working fork, linked from the hub) | Loads, branch exists |

**What this means for the remaining ~616 external URLs:** extracted and
deduplicated across every post — **620 unique URLs across 93 hosts**
(`github.com` alone accounts for 315, mostly per-requirement anchor links
into the ASVS/AISVS chapters; the next-largest hosts are `owasp.org` (33),
`cheatsheetseries.owasp.org` (32), `csrc.nist.gov` (27), `datatracker.ietf.org`
(26), `pages.nist.gov` (22), `www.rfc-editor.org` (16) — full host breakdown
in `/tmp/external-links.json` from this session, not committed). **These were
not checked** — this environment cannot reach them, on any tool. Re-run this
specific check from an environment with normal outbound HTTPS (a GitHub
Action, a local machine, or a session with a broader egress allowlist) before
trusting that all 620 resolve. Do not conclude "0 dead external links" from
this report — conclude "external-link checking needs an environment that can
reach the open internet."

## 3. Stray double-quote rendering bug — root-caused and fixed

**Root cause:** `@tailwindcss/typography`'s `.prose` styles (a dependency
this site already runs; see `tailwind.config.js`) apply a decorative
typographic quote mark before/after the first and last paragraph of *every*
`<blockquote>`, via the CSS `quotes` property + `content: open-quote` /
`close-quote` — Tailwind's default "this is a pull-quote" treatment.

Every blockquote on this site is a callout (Executive Summary, the
"one rule" edict, a translation-status banner) — never an actual quotation
— and several already contain their own literal `"..."` text. The
`tech-support-scam-elders` post's translation-notice banner is one:

> 🌐 A Panjabi translation of this guide is in sangat review. Read the
> bilingual version at `/blog/pa-in/tech-support-scam-elders`. Email
> gurvinder@securityleader.ai with subject **"Digital Seva Review — Tech
> Support Scams"** to suggest corrections.

Rendered, this showed a decorative curly `"` before "🌐" and after
"corrections.", *on top of* the literal straight `"..."` already around the
email subject — four quote marks in one callout, two styles (curly vs.
straight) mismatched. Confirmed visually (Playwright + the pre-installed
Chromium) before and after the fix — screenshots not committed, available
on request.

**Scope: not tech-support-specific.** The same literal-quote-inside-blockquote
pattern (`grep -rln '^>.*"'`) appears in **52 markdown files** — most of the
ASVS/AISVS review chapters (locked-term quotes, e.g. `"errors"`, `"fix"`
inside translated callouts) plus `global-scam-alert-2026`. Every one of them
was getting the same doubled-quote treatment; `tech-support-scam-elders` is
just the one a prior review happened to notice.

**Fix (`src/app/globals.css`, ~12 lines added, nothing removed):**

```css
.prose blockquote p:first-of-type::before,
.prose blockquote p:last-of-type::after {
  content: none;
}
```

This is Tailwind Typography's own documented opt-out — no markdown content
was touched, so byte-for-byte fidelity of the (already-reviewed) bilingual
translation content is untouched.

**Verified:**
- Computed-style check (Playwright): `content` on the targeted pseudo-elements
  is `none` post-fix, confirmed against a freshly built + freshly started
  server (a stale `next start` process from mid-session rebuild gave a false
  "CSS didn't load" reading the first time — caught via `curl` on the actual
  CSS chunk path returning 500, traced to a port already bound by an old
  server process, killed and restarted clean).
- Visual: before/after screenshots of `tech-support-scam-elders`'s
  translation banner — decorative quotes gone, literal subject-line quotes
  intact and correctly paired, page styling (colors, callout backgrounds)
  otherwise unchanged.
- `npx tsc --noEmit` — clean.
- `npm run lint:content` — 0 errors, 8 pre-existing `R6` heading-parity
  notices (unrelated, unchanged from baseline).
- `npm run lint:code` — 0 errors.
- `npm run build` — 81 pages (unchanged count).
- `<h1>` count spot-checked at 1 on `tech-support-scam-elders`,
  `global-scam-alert-2026`, `asvs-panjabi-review-hub`.

## 4. Homepage stat mismatch — found, root-caused, **not fixed** (content decision)

This is the concrete version of "the front page isn't reflecting newer
content," and it isn't one bug — it's two separate, smaller things:

**4a. The ASVS review hub undercounts its own documents.**
`posts/asvs-panjabi-review-hub.md` states *"All twenty-seven bilingual
documents are ready for review"* and *"The full ASVS 5.0 translation
(27 documents) is ready for sangat review"* (added in commit `03750f5`,
Aug 27). The hub's own table currently lists **28** document rows (5
appendices + `changes-from-v4` + `assessment-certification` + `frontispiece`
+ `preface` + `what-is-the-asvs` + 17 chapters + the standalone `glossary`
page = 28; verified by extracting every `/blog/asvs-panjabi-review-*` link
from the file and counting uniques). The "27" text predates something being
added to the table, or double-counted a page — either way, it's now off by
one against the hub's own table, let alone against `CLAUDE.md`'s separately
stated "29 hidden posts" (hub + these 28).

**4b. The homepage genuinely has no way to reflect the ASVS/AISVS launch —
by design, not by bug.** The homepage's "Latest insights" section
(`src/app/page.tsx`) shows the 3 most recent posts from `getPublicPosts()`,
which — correctly, per `CLAUDE.md`'s own spec — excludes every
`hidden: true` post. All 29 ASVS posts and all 19 AISVS posts are
`hidden: true`. So the entire Aug 22–27 translation-completion effort (6
commits, `9d5e8bd` through `a736f23`) is structurally invisible to the
homepage, no matter how recent it is. The 3 posts the homepage actually
shows today are dated 2026-06-19, 2026-05-28, and 2026-05-28 — the most
recent *public* post is `global-scam-alert-2026` (June 19), and the site's
own "why I'm translating ASVS" announcement post
(`posts/owasp-asvs-panjabi-translation.md`) is dated Feb 26, 2026 and was
never updated or followed up when the translation actually finished in
August.

**Recommendation (not actioned — a content/editorial call, not a scan
finding):** (a) fix the hub's "27" → "28" (or recount deliberately, since
"the hub itself" vs. "documents to review" may or may not be meant to
include the standalone glossary page as distinct from Appendix A's
glossary — worth a human decision, not a mechanical string replace); (b)
if the homepage should reflect the ASVS/AISVS launch, that needs a new
*public* (non-`hidden`) announcement post — following up
`owasp-asvs-panjabi-translation.md` — not a change to how hidden posts are
counted, since hiding the 48 review pages from public listing is
intentional per `CLAUDE.md`.

## 5. Stale-post candidates (90+ days since last commit to that file, git-log-driven; today = 2026-09-05)

| File | Last commit | Days stale |
|---|---|---|
| `posts/security-roi-british-teenager.md` | 2026-02-26 | 191 |
| `posts/mcp-sentinel-scanner.md` | 2026-02-26 | 191 |
| `posts/enhancing-github-security-scanning.md` | 2026-02-26 | 191 |
| `posts/devops-security-paradox.md` | 2026-02-26 | 191 |
| `posts/cognitive-debt.md` | 2026-04-13 | 145 |
| `posts/oauth-supply-chain-salesloft-drift.md` | 2026-06-07 | 90 |
| `posts/megalodon-github-cicd-supply-chain-attack.md` | 2026-06-07 | 90 |
| `posts/github-supply-chain-pipeline-perimeter.md` | 2026-06-07 *(now today, from the link fix above)* | 0 |

All 8 are **public** (non-hidden) posts — none of the ASVS/AISVS hidden
review content is stale by this measure (all touched within the last 2
weeks as of this scan). Also stale by the same 200-wpm-hardcoded-date
convention: **all 6 research articles** in `src/lib/research.ts` carry
dates of February 8, 2026 or October 5, 2025 (`HARDCODED-DATE` comments;
file itself last edited 2026-06-08) — every research article on the site is
90+ days past its stated date.

None of this means the *content* is wrong — a well-researched post doesn't
expire — but per the handoff's Task 6 (stale/retire flagging), this is the
exact list a `last_reviewed`-based flag would need to surface first.

## 6. Other findings, out of Task 1's explicit checklist but worth recording

- **`npm audit` (fresh install) reports 5 high-severity vulnerabilities**
  (`sharp`, a transitive Next.js image-optimization dependency, inherits
  libvips CVEs) and 7 total including dev deps. This directly contradicts
  `CLAUDE.md`'s "Known Accepted Risks" section, which currently states
  *"None as of June 20, 2026 — `npm audit` returns 0 vulnerabilities
  (verified, not assumed)."* That claim is now stale — flagged, not fixed,
  here (matches the earlier session's flag on this same repo about GitHub
  reporting 17 Dependabot findings on `main`; the counts differ because
  Dependabot and a local `npm audit` scan different graphs, but both agree
  the "0 vulnerabilities" claim no longer holds). Recommend a dedicated
  session run the Vulnerability Management Rules in `CLAUDE.md`
  (`npm audit fix` first, `overrides` second) rather than folding a
  dependency-security pass into this content-maintenance scan.
- **`docs/asvs-review-pages-plan.md`**, referenced by `CLAUDE.md`'s
  *Current Page Count* section, does not exist in the repo (flagged in the
  2026-09-05 decision log too). `scripts/asvs/README.md` covers the same
  ground and does exist — worth deciding whether to write the missing doc
  or fix the reference.
- **Page count:** build emits **81** static pages today (62 posts + 5
  pa-in translations + 6 research articles + `/`, `/blog`, `/research`,
  `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/_global-error` = 7 —
  62+5+6+7 = 80, plus the `/blog/pa-in` locale-index page = 81). `CLAUDE.md`
  states "62 pages" (August 2026, explicitly caveated as growing) — genuinely
  stale by count but not by the mismatch this scan was looking for; it's
  the same "confirm against build output" caveat CLAUDE.md itself already
  states, restated here as evidence that caveat is doing real work.

## Environment notes for whoever runs this scan next

- `node_modules` and `.next` did not exist at session start — `npm install`
  (~15s, 196 packages) was required before any build/lint/link check could
  run.
- External HTTP access from this session is restricted to a small
  allowlist that does **not** include general web hosts — only
  `github.com` (via the GitHub integration) was reachable. A full external
  link audit needs a session/environment with broader egress.
- A `next start` server left running across a mid-scan rebuild serves stale
  HTML referencing since-deleted asset hashes (500 on the CSS chunk) —
  not a site bug, an artifact of testing methodology; kill and restart the
  server after every `npm run build` when doing this kind of visual
  verification.
