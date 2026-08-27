# AISVS Panjabi review-page pipeline

Source of truth for chapter content is the translation fork
(`GeeksikhSecurity/AISVS`, branch `panjabi-translation-v1`, dir `1.0/pa-IN/`,
submitted upstream as [OWASP/AISVS#1128](https://github.com/OWASP/AISVS/pull/1128)).
The hidden `/blog/aisvs-panjabi-review-*` posts are **generated** from it —
edit the fork file, not the post.

```
export AISVS_PA_DIR=/path/to/AISVS/1.0/pa-IN   # default: ../OpenSource/OWASP-AISVS-Panjabi/1.0/pa-IN
python3 scripts/aisvs/build-review-posts.py posts   # regenerate all 18 chapter posts + prev/next chain
npm run lint:content && npm run build
```

- Only fork files whose first line is `<!-- Translation Status: ✅ Complete -->` are published.
- Unlike the ASVS pipeline, no page here is "custom" (hand-authored wrapper) — every
  slug has a 1:1 fork source file, so a full run creates every page fresh. The hub
  (`posts/aisvs-panjabi-review-hub.md`) is the one hand-written page and is not part
  of `CHAIN`; there's no `update-review-hub.py` yet (unlike ASVS) because this was a
  one-shot complete publish (18/18 files at once), not an incremental rollout. Add one
  if AISVS 1.1 lands more chapters later and the hub needs repeated mechanical updates.
- Mechanical fidelity checks (requirement-ID coverage, orthography, modal-strength,
  spelling-consistency) already ran in the source repo (`OWASP-AISVS-Panjabi/1.0/pa-IN/print/verify-*.py`)
  before these files were marked Complete — this pipeline does not re-run them.
