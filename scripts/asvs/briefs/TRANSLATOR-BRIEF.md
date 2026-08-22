# Translator brief — OWASP ASVS 5.0 → Panjabi (pa-IN), bilingual dual-block

You are producing an AI-assisted DRAFT (v0.1) of one ASVS 5.0 chapter in Panjabi (Gurmukhi).
Accuracy and rule-compliance matter more than speed. Read these files FIRST, in full:

1. $ASVS_PA_DIR/TRANSLATION-RULES.md  (canonical rules — binding)
2. $ASVS_PA_DIR/CLAUDE.md              (Gurmat constraints, danda rule)
3. $ASVS_PA_DIR/README.md              (project glossary — reuse these exact terms)
4. $ASVS_PA_DIR/OPEN-QUESTIONS.md      (term decisions already taken: Q1–Q11 current picks are binding for consistency)
5. $ASVS_PA_DIR/0x21-V12-Secure-Communication.md  (FORMAT EXEMPLAR — match this structure exactly)
6. $ASVS_PA_DIR/0x17-V8-Authorization.md         (second exemplar, for prose-heavy sections)

## Output format (dual-block, corpus-wide — Q12 decision)

- File header (3 HTML comment lines), then `# <English H1>` then `# <Panjabi H1>` on the next line.
  Header:
  ```
  <!-- Translation Status: ✅ Complete -->
  <!-- Original: 5.0/en/<source-filename> -->
  <!-- Translator: GeeksikhSecurity -->
  ```
- Every heading: English heading line, then the Panjabi heading line immediately below at the same level
  (e.g. `## V6.2 Password Security` newline `## V6.2 ਪਾਸਵਰਡ ਸੁਰੱਖਿਆ`). Keep section numbers (V6.2) in Latin.
- Every paragraph: the English paragraph VERBATIM (do not edit the English), blank line, then the Panjabi paragraph.
- Every bullet list: the full English list, blank line, then the full Panjabi list.
- Every requirements table: the full English table VERBATIM, blank line, then the full Panjabi table with header
  `| # | ਵੇਰਵਾ | ਪੱਧਰ |` and the same alignment row `| :---: | :--- | :---: |`. Same number of rows, same IDs in bold, same Level digits.
- References section: `## References` / `## ਹਵਾਲੇ`, then `For more information, see also:` / `ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ, ਇਹ ਵੀ ਵੇਖੋ:`,
  then the link list ONCE (English, verbatim — do not translate link text or URLs).
- Preserve all markdown links, inline code, and bold exactly. In Panjabi blocks keep the same links (URL unchanged;
  link text may be translated only if it is a plain English phrase, never for titles of external documents).

## Non-negotiable language rules (summary — the rules files win if anything here conflicts)

- Gurmukhi only (U+0A00–U+0A7F) for Panjabi text; NFC-normalised; no Devanagari; no Latin transliteration of Panjabi.
- Every full Panjabi sentence ends with danda `।` — never a Western period. Headings, short labels, and table-cell fragments
  that are not full sentences get no danda. A sentence ending in a parenthetical: `(…)।`
- Western digits everywhere (5.0, 2026, 6.2.1). Requirement IDs unchanged.
- Requirement rows open "Verify that…" → **ਤਸਦੀਕ ਕਰੋ ਕਿ…** (NOT ਪੁਸ਼ਟੀ ਕਰੋ). verify=ਤਸਦੀਕ ਕਰੋ, validate=ਪ੍ਰਮਾਣਿਤ ਕਰਨਾ, check=ਜਾਂਚ — keep distinct.
- Retained (R) in Latin, never transliterated: OWASP, ASVS, CWE, NIST, SQL, XSS, CSRF, SSRF, API, URL, URI, TLS, JWT, JWS, JWK,
  MAC, HMAC, OAuth, OIDC, SAML, JSON, PIN, OTP, TOTP, HOTP, FIDO, WebAuthn, CSP, HSTS, CORS, DOM, HTTP(S), SMS, LFI/RFI, IDOR/BOLA/BOPLA,
  audience, key material, allowlist/denylist, algorithm names, header/claim/field names, RFC numbers, code in backticks.
- Locked terms: authentication=ਪ੍ਰਮਾਣੀਕਰਨ · authorization=ਅਧਿਕਾਰੀਕਰਨ · integrity=ਅਖੰਡਤਾ · context=ਸੰਦਰਭ · issuer=ਜਾਰੀਕਰਤਾ ·
  tampering=ਛੇੜਛਾੜ · self-contained=ਸਵੈ-ਨਿਰਭਰ · validity period=ਜਾਇਜ਼ਤਾ ਮਿਆਦ · fraud/scam=ਠੱਗੀ · community=ਭਾਈਚਾਰਾ ·
  posture/state=ਸਥਿਤੀ (never ਮੁਦਰਾ) · entitlements=ਹੱਕ · multi-tenant=ਬਹੁ-ਕਿਰਾਏਦਾਰ · step-up authentication=ਸਟੈਪ-ਅੱਪ ਪ੍ਰਮਾਣੀਕਰਨ ·
  vulnerability=ਕਮਜ਼ੋਰੀ · requirement=ਲੋੜ · level=ਪੱਧਰ · control=ਨਿਯੰਤਰਣ · scope=ਘੇਰਾ · documentation=ਦਸਤਾਵੇਜ਼ · application=ਐਪਲੀਕੇਸ਼ਨ ·
  Control Objective=ਨਿਯੰਤਰਣ ਉਦੇਸ਼ · References=ਹਵਾਲੇ. Reuse glossary terms from README.md for everything else.
- First use of a translated technical concept: ਪੰਜਾਬੀ (English) gloss once, then Panjabi alone.
- No yoga/Hindu/Sanskrit-devotional vocabulary. Formal academic Panjabi register (Punjabi University, Patiala style).
- Never soften, omit, or add a security obligation; "must" → ਲਾਜ਼ਮੀ/ਚਾਹੀਦਾ ਹੈ with the same force; "should"/"may" keep their force.
- Spell "Panjabi" (not "Punjabi") in any English you write.

## Work method

1. Read the English source file in full. Count its requirement IDs (`| **x.y.z** |`) — your output must contain each ID exactly twice (EN row + PA row).
2. Write the complete file in one go with the Write tool (or in ordered chunks with Write then Edit/append). Do not leave placeholders or "…" — every paragraph, list and table row must be translated.
3. Self-check before finishing: run
   `python3 scripts/asvs/qa-pa-chapter.py <english-source> <your-output>`
   and fix every reported issue until it prints `QA PASS`.
4. Return (as your final text) a short report: requirement count, QA result, and any terminology choices you had to invent
   (term → pick → alternatives considered) so they can be logged as open questions. Do not paste the translation into the report.
