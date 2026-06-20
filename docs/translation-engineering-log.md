# Translation & Bilingual-Blog Engineering Log

Append-only log of concrete issues hit and fixed while authoring, translating, and shipping the bilingual (`en` + `pa-in`) blog. **Purpose:** (1) reference when the same symptom recurs, (2) raw material for process improvement — each entry that recurs should graduate to a mechanism in [`prevention-mechanisms.md`](prevention-mechanisms.md) (M-series) or a check in [`content-rigor.md`](content-rigor.md) (R-series), and (3) a citable record when explaining the translation work later (how decisions were made, what went wrong, how it was caught).

Companion to: `content-rigor.md` (R1–R29, what to enforce), `bilingual-blog-sop.md` (L1–L12 operational SOP), `prevention-mechanisms.md` (M1–M5, rule→mechanism). Entry IDs are `E<n>`, stable.

> **One-line principle (inherited):** rules catch the first occurrence; mechanisms catch the rest. A fix that lives only in one commit is not prevention.

---

## Session 2026-06-19 → 2026-06-20 — Global Scam Alert post, dependency remediation, UK script consistency

### E1 — Gurmukhi mangled to mojibake by a `perl -e` one-liner  **(tooling)**

- **Symptom.** A bulk replace `perl -CSD -i -pe 's/\bUK\b/ਯੂ.ਕੇ./g'` wrote `à¨¯à©.à¨à©.` instead of `ਯੂ.ਕੇ.`. Tell-tale: the file's *existing* Gurmukhi rendered correctly in `git diff`; only the *inserted* literal was corrupt.
- **Root cause.** `-CSD` decodes/encodes STDIN/STDOUT and `@ARGV` as UTF-8, **but the program source (the `-e` string) is still read as bytes** unless you also pass `-Mutf8`. So the Gurmukhi literal's UTF-8 bytes were treated as individual Latin-1 characters, then re-encoded to UTF-8 on write → classic double-encoding.
- **Fix.** Reverted (`git checkout -- posts-i18n/pa-in/`) and redid the replacement in **Node** — `readFileSync(p, 'utf8')` → `String.replace` → `writeFileSync` — where both source literals and file I/O are UTF-8 by default. The diff then showed real `ਯੂ.ਕੇ.`.
- **Lesson / prevention.** For any transform that **inserts non-ASCII text**, use a UTF-8-native runtime (Node), not `perl -e` / `sed` one-liners. Always confirm the diff renders the *script*, not mojibake, before committing. Cheap preflight: `grep -lE 'Ã|Â|à¨|â€' <changed files>` — any hit means an encoding fault. *(Candidate M6: "encode-safe text transforms".)*

### E2 — `rm -rf .next` "Directory not empty" mistaken for a build failure  **(tooling/signal)**

- **Symptom.** `rm: .next/standalone/node_modules/next: Directory not empty` printed during a clean-then-build, alarming-looking — but the build then emitted `✓ Generating static pages (43/43)`.
- **Root cause.** A stale `.next/standalone` tree from a prior build raced the `rm`; non-fatal.
- **Lesson / prevention.** Read the **authoritative** signal (the `✓ … (43/43)` line and the route table), not a warning from a pre-build cleanup step. Don't conflate a teardown warning with a compile/build error. (M3-adjacent: assert on the real output, not an incidental message.)

### E3 — AI-review finding (cubic) was inverted for the installed Next.js version  **(review discipline)**

- **Symptom.** cubic flagged `tsconfig.json` `"jsx": "react-jsx"` as wrong: "App Router requires `preserve`; Next detects non-`preserve`, warns, and resets it."
- **Root cause.** That is **pre-Next-16** behavior. Next 16's `node_modules/next/dist/lib/typescript/writeConfigurationDefaults.js` sets `jsx: react-jsx` and **rewrites `preserve` → `react-jsx`** on every `next build`. Verified both by reading the installed source and by observing the build revert a forced `preserve`. The committed `preserve` was the stale Next-14/15-era value.
- **Fix.** Kept `react-jsx`; committed Next-16's managed `tsconfig.json` to stop the perpetual working-tree churn.
- **Lesson / prevention.** AI-review findings are **version-specific hypotheses** — verify against the *installed dependency's source* and observed behavior, never received wisdom (see `content-rigor`/CLAUDE.md "Using AI Code Review": findings are hypotheses, not verdicts).

### E4 — Docs claimed "0 vulnerabilities" while `npm audit` reported 5  **(integrity)**

- **Symptom.** CLAUDE.md / RULES.md "Known Accepted Risks: **None** — `npm audit` returns 0" while `npm audit` actually showed **5 (2 high, 3 moderate)**.
- **Root cause.** A prose claim with **no mechanical re-verification**; it silently drifted from true as dependencies aged.
- **Fix.** Corrected the docs to the real state first, then *actually* remediated to 0 (see E5).
- **Lesson / prevention.** Never restate a security-posture claim without re-running the check ("no claim without evidence"). **Candidate guard:** a CI lint that fails if a doc asserts "0 vulnerabilities" while `npm audit --json` is non-zero — mechanizing the exact drift that happened here.

### E5 — Vulnerable transitive `js-yaml` had no clean version bump  **(dependencies)**

- **Symptom.** `npm audit fix` proposed installing `gray-matter@2.0.1` — a **major downgrade** from 4.0.3 — to dodge the `js-yaml` DoS (GHSA-h67p-54hq-rp68).
- **Root cause.** The only patched `js-yaml` (4.2.0) **removed `safeLoad`/`safeDump`**, which `gray-matter@4.0.3` (latest) calls in `lib/engines.js`. No `js-yaml` version both has the API gray-matter needs *and* is patched, so a global `js-yaml` override would break gray-matter at load time.
- **Fix.** Per "remove over upgrade": removed `gray-matter` entirely and replaced its single call site with a ~15-line `parseFrontmatter()` in `src/lib/posts.ts` backed by `js-yaml@4.2.0`'s `load` — a net dependency *reduction*. Preserved gray-matter's leading-`\n` `content` contract so the H1-strip invariant held. `npm audit` → 0.
- **Lesson / prevention.** Before forcing a transitive fix via `overrides`, check the consumer's **API compatibility** with the patched version. For an unmaintained dep, replacing a small surface beats carrying a CVE or forcing a downgrade.

### E6 — First R29 rule was a one-off (single spelling), not corpus-wide  **(methodology)**

- **Symptom.** The initial `R29` country-name check matched only `UK`; `United Kingdom`, `U.K.`, `United States`, `America` in `pa-in` body would have passed.
- **Root cause.** Single-spelling glossary.
- **Fix.** Made `COUNTRY_GLOSSARY` **variant-aware** — every common Latin form maps to one Gurmukhi form — and matched with lookarounds (not `\b`) so dotted/multi-word variants (`U.K.`, `United States`) match before a following space. Self-tested that the new variants fire and that citations/References stay silent.
- **Lesson / prevention.** **Strengthen corpus-wide rules over one-off fixes** (standing preference, 2026-06-20). A new rule must enumerate variants and be **self-tested to actually fire** — a gate that never triggers is worse than none (silent no-op).

### E7 — UK was the lone Latin country name across the whole `pa-in` corpus  **(translation substance)**

- **Symptom.** USA/Canada/Australia/India always in Gurmukhi (ਅਮਰੀਕਾ/ਕੈਨੇਡਾ/ਆਸਟ੍ਰੇਲੀਆ/ਭਾਰਤ); UK left as Latin `UK` in all 5 posts.
- **Decision.** Rendered `ਯੂ.ਕੇ.` (transliteration, matching the ASVS loan-word style `API → ਏ.ਪੀ.ਆਈ.`). **Deliberately not** `ਇੰਗਲੈਂਡ`/England: the £1.28B / Report Fraud / Take Five figures are **UK-wide** (England, Scotland, Wales, N. Ireland), so "England" would misattribute the data and exclude Scottish/Welsh Panjabi families. Kept English only for agency citations (`National Fraud Database (UK)`, `Charity Commission for England and Wales`) and `.uk` URLs.
- **Lesson / prevention.** Geopolitical proper nouns carry **accuracy + political-neutrality** weight, not just script consistency. Encoded in `COUNTRY_GLOSSARY` so a future editorial decision (see Open Questions) is a **one-line change + re-lint**, never a per-post sweep.

---

## Open editorial questions / pending research

Tracked here so incoming research integrates cleanly into the *single* glossary + rule, not scattered edits.

- **UK rendering — `ਯੂ.ਕੇ.` vs `ਬਰਤਾਨੀਆ` (Britain) vs `ਇੰਗਲੈਂਡ`.** Current choice is `ਯੂ.ਕੇ.` for administrative accuracy. **Pending Gemini deep-research** on professional Panjabi newsroom consensus (BBC News Punjabi, Ajit, PTC News) for stylistic + political neutrality of `ਬਰਤਾਨੀਆ` vs `ਯੂ.ਕੇ.`, and correct handling of UK / Great Britain / England as distinct administrative entities. **When it lands:** update `COUNTRY_GLOSSARY` in `scripts/lint-content.mjs` (single source) + the R29 table in `content-rigor.md`; no per-post edits.
- **Journalism-grade proper-noun glossary + automated style enforcement.** Adapt multilingual-newsroom practice (style-guide linting, script consistency, dialect standardization) into the R-series. Likely extends R29 from countries to a broader vetted proper-noun set — kept deliberately scoped today to avoid colliding with R-class *Retained* terms (OWASP/SQL/XSS).

## Roadmap (tracked in Linear)

- **Spoken-Panjabi TTS for bilingual posts** (Gemini natural spoken Panjabi via NotebookLM) — embed a single-voice read-aloud of the *translated* post instead of NotebookLM's default two-speaker "audio overview." Tracked in Linear: **SAY-372** (*SecurityLeader.ai Research & Standards*).
