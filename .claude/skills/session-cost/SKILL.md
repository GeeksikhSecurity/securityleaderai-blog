---
name: session-cost
description: >
  Report this Claude Code session's token usage and API-equivalent cost via
  AgentsView (uvx), and record it in the day's decision log. Use at the end
  of a working session, or whenever the user asks what a session cost.
---

# Session cost report

1. Sync and identify the current session:

   ```bash
   uvx agentsview sync
   uvx agentsview session list --include-children --resume --json
   ```

   If `--resume` returns nothing (session idle >15 min), fall back to
   `--date <today> --json` and match on `cwd`/`git_branch`.

2. Get the cost estimate for the session id:

   ```bash
   uvx agentsview session usage <session-id> --json
   ```

3. Report to the user: cost USD, output tokens, peak context, model,
   message/user-turn counts, health grade (from step 1's entry). One short
   table, no jargon.

4. If the repo keeps decision logs (`work/decision-log/`), append a
   one-line cost record to today's file (create it if missing):

   ```
   Session cost (<session-id-prefix>, <model>): ~$X.XX — Yk output tokens, Zk peak context.
   ```

   Commit it with the session's other close-out changes — do not make a
   dedicated commit just for the cost line.

Notes:
- `uvx` must be on PATH (it is in Claude Code remote containers; locally
  install uv once: `curl -LsSf https://astral.sh/uv/install.sh | sh`).
- Cost is an API-equivalent estimate — informative for subscription plans,
  exact only for API billing.
- Subagent/child sessions are included via `--include-children`; mention in
  the report if children contributed.
