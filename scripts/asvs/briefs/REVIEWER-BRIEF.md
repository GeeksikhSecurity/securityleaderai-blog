# Reviewer brief — fidelity + rule review of one ASVS pa-IN chapter (fresh context; you are NOT the author)

Goal: find and FIX every place where the Panjabi block does not faithfully carry the English meaning, or breaks the
canonical rules. You edit the file in place. Accuracy of the security obligation is the top priority.

Read first, in full:
1. $ASVS_PA_DIR/TRANSLATION-RULES.md  (binding)
2. $ASVS_PA_DIR/README.md  (glossary — locked terms)
3. $ASVS_PA_DIR/OPEN-QUESTIONS.md  (Q1–Q11 current picks are binding)
4. $ASVS_PA_DIR/0x21-V12-Secure-Communication.md  (format exemplar)

Then review the target file block-by-block against the English source (paths given in your task):

A. Fidelity (most important). For EVERY paragraph, bullet, and requirement row, compare EN vs PA and fix:
   - omitted clauses, conditions, exceptions, examples, or list items
   - added content that is not in the English
   - changed modality: must/should/may/"L3 applications must…" must keep the same force
   - inverted or weakened negations ("must not", "only", "unless", "before", "at least")
   - wrong numbers, Levels, IDs, RFC/NIST references, header/claim names, or algorithm names
   - "verify / validate / check" conflation (verify=ਤਸਦੀਕ, validate=ਪ੍ਰਮਾਣਿਤ, check=ਜਾਂਚ)
   - mistranslated security terms (e.g. authentication vs authorization, encryption vs encoding vs hashing)
B. Rules: Gurmukhi-only, danda sentence ends, Western digits, locked glossary terms, retained acronyms in Latin,
   first-use gloss once, no Gurmat-prohibited vocabulary, formal academic register, "Panjabi" spelling, dual-block
   structure with English verbatim. Do NOT restyle sentences that are already correct — minimal, surgical edits only.
C. Structure: every English heading/paragraph/list/table has its Panjabi counterpart directly below; tables have the
   same rows/IDs/Levels; References block present once.

Finish by running
  python3 scripts/asvs/qa-pa-chapter.py <en-source> <target>
until it prints QA PASS. Do not edit any other file; do not run git commands.

Return ONLY a short report: number of fidelity fixes (with 3–5 representative before→after examples, EN ref included),
number of rule fixes, any residual concerns you could not resolve, and the final QA line.
