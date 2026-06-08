# Inclusive Language Guidance (APA-based)

Canonical inclusive-language policy for **all** Gurvinder Singh / SecurityLeader.ai web content — this blog **and the planned jasgur.com migration** (SiteGround WordPress → Vercel). Based on the APA bias-free language guidelines: <https://www.apa.org/about/apa/equity-diversity-inclusion/language-guidelines>.

Enforced as content-rigor rules **R26–R28** (see `content-rigor.md`, implemented in `scripts/lint-content.mjs`). All three are **AUTO (notice)** — they surface drift, they do not block CI.

## Scope: where APA people-first applies

| Content type | APA people-first | How identified |
|---|---|---|
| **Security-awareness / consumer** (scam awareness, Digital Seva, community) | **Enforced** (R26–R28) | post tags include `digital-seva`, `scam-awareness`, `awareness`, `elder-safety`, `family-safety`, or `charity-fraud` |
| **Security-research / technical** | **Optional** (manual pass; not linted) | everything else |

Rationale: awareness content addresses real people in vulnerable moments, where othering language does harm. Technical research has different register; fixes there are encouraged but optional.

## The rules

### R26 — Person-first for people affected
Avoid labelling people by what happened to them.

| Avoid | Prefer |
|---|---|
| "victim", "victims" | "people targeted", "those targeted", "people who were scammed" |
| "if you have been victimized" | "if you have been scammed" |
| pa-in: `ਪੀੜਤ` | `ਨਿਸ਼ਾਨਾ ਬਣੇ ਲੋਕ` / `ਉਸ ਵਿਅਕਤੀ` |

### R27 — No disability / mental-health metaphors
| Avoid | Prefer |
|---|---|
| "blind to" | "cannot detect", "does not inspect", "unaware of" |
| "deaf to" | "ignores", "does not respond to" |
| "crazy / insane / lame / dumb" | "surprising", "unreasonable", "ineffective" |
| "sanity check" | "quick check", "validation" |
| "cripple(d)" | "disable", "severely degrade" |

### R28 — Age language
| Avoid | Prefer |
|---|---|
| "the elderly", "senior citizens", "aging dependents" | "older adults" |

**Cultural carve-outs (DO keep — not flagged):**
- **"elders" / `ਬਜ਼ੁਰਗ`** — a term of *respect* in the Sikh/Panjabi community; the opposite of the othering APA warns against.
- **"adults over 60" / "adults over N"** — already specific and non-othering.

## Deliberately NOT changed
- **"Master Keys" / "master key" / skeleton-key metaphors** in technical/security content — this is the locksmithing metaphor, not the master/slave pairing; intentionally left alone. (`whitelist → allowlist` IS preferred, but as house style / R-class glossary, not under these APA rules.)

## Allowlisting a false positive
Add `<!-- rigor: allow R26 -->` (or R27/R28) on the line. Use sparingly.

## For the jasgur.com migration (WordPress → Vercel)
When jasgur.com moves to Vercel:
1. **Port the content-rigor harness** — copy `scripts/lint-content.mjs` + `docs/content-rigor.md` + this file into the new repo, and wire the same `.github/workflows/content-rigor.yml` CI gate.
2. **Tag consumer/awareness pages** with one of the `AWARENESS_TAGS` so R26–R28 apply; technical/portfolio pages are exempt by default.
3. **Run the linter over all migrated WordPress content** as a one-time sweep — legacy posts will surface R26–R28 notices to clean up.
4. **Keep the carve-outs** (elders, adults-over-N) and the master-key exclusion.
Tracked in Linear (jasgur.com migration issue).
