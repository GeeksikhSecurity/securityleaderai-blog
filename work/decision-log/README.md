# Decision Log

Lightweight, in-flight capture of decisions made during work sessions. One file
per day: `YYYY-MM-DD.md`. Notes are appended while the work is fresh; the
end-of-day summarizer (`/daily-decision-digest`) rolls them up into
`outputs/daily-summary-YYYY-MM-DD.md`.

Design choice: **end-of-day rollup with lightweight capture during work**, not
real-time logging. Real-time logging sounds ideal but becomes noisy and
fragile. Keep the live notes small and automatic; the digest is the real
artifact.

## Note format

Append one note per meaningful task. Plain English, no jargon, a few lines
each — this is capture, not prose:

```markdown
## HH:MM — Short task title

- **Working on:** what the task was
- **Options considered:** the realistic alternatives
- **Chose:** the path taken
- **Skipped:** the path(s) not taken
- **Why (plain English):** the reason for the choice
- **Changed:** files or systems touched
- **Verified:** lint/build/test results
- **Follow-up:** anything left open (or "none")
```

## Rules

- Create the day's file on the first note; append after that. Never rewrite
  earlier notes.
- If a task made no decision worth recording (pure mechanical change), a
  one-line note is enough.
- The summarizer only summarizes — it never makes or revisits decisions, and
  it must not invent rationale that isn't in these notes or the git history.
