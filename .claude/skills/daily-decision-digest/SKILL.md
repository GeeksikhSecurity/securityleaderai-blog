---
name: daily-decision-digest
description: Summarize today's decision notes and git activity into a plain-English daily digest at outputs/daily-summary-YYYY-MM-DD.md. Use at end of day, when a scheduled trigger fires, or when the user asks for the daily work log or digest. If no work happened that day, produce nothing.
---

# Daily Decision Digest

You are a **summarizer, not a decider**. Turn the day's decision notes and git
history into one human-readable digest. Never make new decisions, never
second-guess recorded ones, and never invent rationale that isn't in the notes
or the commits.

## Inputs

Target date = today (`date +%F`), unless a date was passed as an argument.

1. `work/decision-log/<date>.md` — the day's decision notes (may not exist).
   Also check recently pushed branches: `git fetch origin` then look for the
   file on any `origin/*` branch updated that day
   (`git for-each-ref --sort=-committerdate refs/remotes/origin`).
2. Git activity for the date, across all branches:
   `git log --all --since="<date> 00:00" --until="<date> 23:59" --oneline --stat`
3. Verification results recorded in the notes (lint/build/test lines).

## No-work check (do this first)

If there are **no decision notes and no commits** for the date: report "No
work logged for <date>" and stop. Do not create an empty digest.

## Output

Write `outputs/daily-summary-<date>.md` in exactly this shape:

```markdown
# Daily Decision Summary — <date>

## High-Level Overview
2-4 sentences: what the day's work focused on, in plain English.

## Decisions Made

### 1. <Short decision title>
Decision: what was chosen.

Why: the reason, in plain English.

Other path considered: the realistic alternative.

Why skipped: the reason the alternative was not taken.

Changed:
- files/systems touched (from the notes and `git log --stat`)

Result:
- verification outcomes (lint passed, build page count, tests, etc.)

## Paths Not Taken

### <Alternative>
One or two sentences on why it was skipped.

## Follow-Ups
- open items carried forward (or "None.")
```

Rules:

- Plain English throughout. Expand jargon on first use.
- Number decisions in the order they happened.
- Every claim must be traceable to a decision note or a commit — if the notes
  are thin, say less rather than padding.
- Merge duplicate notes about the same decision into one entry.
- Carry unresolved follow-ups from the notes verbatim into Follow-Ups.

## Finish

1. `git add` the digest (and the day's decision-log file if not yet
   committed) — specific paths only, never `git add -A`.
2. Commit: `docs: daily decision digest <date>`.
3. Push to the current working branch (`git push -u origin <branch>`).
