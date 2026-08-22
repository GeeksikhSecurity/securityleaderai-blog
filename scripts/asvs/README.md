# ASVS Panjabi review-page pipeline

Source of truth for chapter content is the translation fork
(`GeeksikhSecurity/ASVS`, branch `panjabi-translation-v5`, dir `5.0/pa-IN/`).
The hidden `/blog/asvs-panjabi-review-*` chapter posts are **generated** from it —
edit the fork file, not the post.

```
export ASVS_PA_DIR=/path/to/ASVS/5.0/pa-IN            # default: ../OpenSource/OWASP-Panjabi/5.0/pa-IN
python3 scripts/asvs/qa-pa-chapter.py <en-source.md> <pa-file.md>   # mechanical QA gate (must print QA PASS)
python3 scripts/asvs/build-review-posts.py posts                     # regenerate chapter posts + prev/next chain
python3 scripts/asvs/update-review-hub.py .                          # hub table/timeline, main-post links, CLAUDE.md count
npm run lint:content && npm run build
```

- Only fork files whose first line is `<!-- Translation Status: ✅ Complete -->` are published.
- Chapter order / slugs live in `CHAIN` (build) and `DESC` (hub); add a row in both when a new chapter lands.
- Wrapper pages (hub, title page, introduction, glossary) are hand-written; the builder only rewires their nav line.
- QA gate checks: NFC, no Devanagari, no Gurmukhi numerals, danda sentence ends, locked-term violations,
  every requirement ID exactly twice (EN + PA) with matching Level, `ਤਸਦੀਕ ਕਰੋ ਕਿ` openings, every English
  heading/paragraph present verbatim, Gurmukhi volume sanity. It is mechanical — a fresh-context fidelity review
  (EN vs PA, clause by clause) is still required before publishing.

## Translating a new chapter (agent briefs)

`briefs/TRANSLATOR-BRIEF.md` and `briefs/REVIEWER-BRIEF.md` are the prompts used for the August 2026 batch
(`$ASVS_PA_DIR` = the fork's `5.0/pa-IN`). Three stages, in order, per chapter:

1. Translator (one agent per chapter) — produces the dual-block file; must end with `QA PASS`.
2. Reviewer (a *different*, fresh-context agent) — compares EN vs PA clause by clause and fixes in place;
   must end with `QA PASS`. Every chapter in the first batch needed fidelity fixes (weakened must/must-not,
   verb conflation, risk/threat), so this stage is not optional.
3. Cross-chapter consistency pass on new terms, log them in the fork's `OPEN-QUESTIONS.md`, then
   `build-review-posts.py` → `update-review-hub.py` → lint/build → commit → push `main`.

Remaining as of 2026-08-22: V10, V11, V13–V17, Appendices A–E.
