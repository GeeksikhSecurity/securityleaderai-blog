# Portable uvx Toolkit for Claude Code Sessions

A copy-paste kit for giving **any** repo the same session-cost accounting and
uvx-based tooling this repo uses. Origin: Simon Willison's pattern of running
AgentsView *inside* a Claude Code session to price it; adapted 2026-07-06.

`uvx` runs a Python CLI in an isolated, cached environment with zero
project-dependency footprint — nothing lands in package.json / requirements,
which keeps the lean-dependency policy intact everywhere.

## Verified tool matrix

Probed in a Claude Code **remote container** (proxied network) on 2026-07-06;
"local" = a normal developer machine.

| Tool | What it's for in a session | Remote container | Local |
|---|---|---|---|
| `uvx agentsview` | Session browser, health signals, **token usage + cost estimate** | ✅ works | ✅ |
| `uvx files-to-prompt` | Flatten a directory of files into one LLM-ready prompt (docs review, cross-file analysis) | ✅ works | ✅ |
| `uvx strip-tags` | Strip HTML to text (feeding fetched pages into analysis) | ✅ works | ✅ |
| `uvx sqlite-utils` | Query/transform SQLite (incl. agentsview's own DB) | ✅ works | ✅ |
| `uvx ttok` | Count tokens in text/files (CLI cousin of the Token Counter web tool) | ❌ tokenizer download proxy-blocked | ✅ |
| `uvx llm` | Run prompts against models from the CLI | needs API key config | ✅ with keys |
| `uvx shot-scraper` | Screenshot/scrape rendered pages via headless Chromium | ✅ launches with the shim below; needs egress to the target | ✅ (`shot-scraper install` once) |

Caveats that cost time to learn — don't rediscover them:
- `ttok` fails in remote containers: it fetches its tokenizer from
  `openaipublic.blob.core.windows.net`, which the proxy blocks. Local only.
  It also counts OpenAI tokens — treat as an approximation for Claude.
- PyPI is reachable through the container proxy; HuggingFace is not. uvx
  tools install fine; model-downloading tools don't.
- AgentsView cost is an **API-equivalent estimate** — exact for API billing,
  indicative on subscription plans.
- **shot-scraper in the remote container** needs a one-time shim: its
  Playwright wants a newer headless-shell revision/layout than the
  preinstalled one. Bridge it (adjust `1228` to whatever the error names):

  ```bash
  mkdir -p /opt/pw-browsers/chromium_headless_shell-1228/chrome-headless-shell-linux64
  ln -s /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell \
        /opt/pw-browsers/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell
  touch /opt/pw-browsers/chromium_headless_shell-1228/{INSTALLATION_COMPLETE,DEPENDENCIES_VALIDATED}
  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers uvx shot-scraper shot <url> -o out.png
  ```

## Curated for THIS body of work (blog + translation + outreach)

Beyond the matrix above, the Simon Willison tools that map onto real tasks
here, with the pipeline each one unlocks:

- **`shot-scraper`** — three concrete uses: (1) visual verification of
  deployed pages (does the audio player render on all 5 pa-in posts?
  `shot-scraper multi shots.yml` batches them); (2) **WhatsApp-shareable
  images** — screenshot a post's header/key-facts region (`-s` CSS selector)
  to pair with the share message; feeds the printable-resources roadmap item
  (SAY-372 comment); (3) `shot-scraper javascript` to extract rendered-page
  facts in link/anchor audits.
- **`llm` + `llm-anthropic`** (local, needs API key) — batch content
  operations over the corpus:
  `uvx files-to-prompt posts-i18n/pa-in -c | uvx llm -m claude-sonnet-5 "..."`
  for glossary-consistency sweeps, R-rule pre-screening of new drafts, or
  ASVS chapter QA questions. `llm` templates play the role skills play in
  Claude Code — the prompt written down once. Its embeddings
  (`llm embed-multi`) could power related-post suggestions later.
- **`github-to-sqlite`** — pull the ASVS translation submission's review
  comments (PR #3254 on the OWASP repo) and this repo's PRs/issues into
  SQLite; query per-chapter review status with `sqlite-utils`. Turns
  community review from scroll-and-remember into a table.
- **`markdown-to-sqlite`** — load `posts/` + `posts-i18n/` frontmatter into
  SQLite: audit tag distributions and topic counts (CLAUDE.md requires
  `getResearchTopics()` counts to match reality), word counts vs read time,
  translation-status coverage.
- **`git-history`** — SQLite of how a file's contents changed over time.
  Provenance for the helpline numbers: prove when `1930` or a UK number
  last changed, backing the "verified YYYY-MM-DD" claims in posts.
- **`datasette`** — local browser UI over any of the above databases
  (local machine only; remote containers can't expose ports).
- **Not recommended:** `s3-credentials` for the future Cloudflare R2 audio
  hosting — it's AWS-IAM-specific; use Cloudflare's `wrangler` when that
  decision comes.

## Adopting in another repo (3 files, ~2 minutes)

From a checkout of THIS repo:

```bash
OTHER=/path/to/other-repo
mkdir -p $OTHER/.claude/skills/session-cost $OTHER/.claude/agents \
         $OTHER/work/decision-log $OTHER/outputs
cp .claude/skills/session-cost/SKILL.md $OTHER/.claude/skills/session-cost/
cp .claude/agents/decision-digest.md   $OTHER/.claude/agents/
```

Then append to the other repo's CLAUDE.md (create the section if the repo
has no decision-log workflow yet):

```markdown
## Decision Capture & Daily Digest

- During work: append short plain-English decision notes to
  `work/decision-log/YYYY-MM-DD.md` (what changed, why, alternatives,
  skipped-and-why, verification, follow-ups, and a "Do not retry" section).
- End of day: the `decision-digest` sub-agent summarizes the day's log into
  `outputs/daily-summary-YYYY-MM-DD.md`. It only summarizes.
- Session cost: before closing a session, record its API-equivalent cost in
  the day's note — `/session-cost`, or directly:
  `uvx agentsview session usage <session-id> --json`.
- uvx policy: prefer `uvx <tool>` for one-off CLI tooling — zero project
  dependency footprint. Anything a session must not rediscover goes in the
  decision log's "Do not retry".
```

That's the whole adoption. `/session-cost` becomes available as a skill,
the digest agent knows to include a Cost line, and CLAUDE.md makes the
recording a habit rather than a favor.

## Where this is already deployed

| Repo | Status |
|---|---|
| securityleaderai-blog | ✅ reference implementation (this repo) |
| cloudscapecentral / mindweave / f1-tracker | retired — do not adopt |
| (add rows as repos adopt) | |

First worked example: the 2026-07-04→06 audio-overview session measured
**~$56.90** (169k output tokens, 328k peak context, claude-fable-5) for a
shipped production feature + integrity lint + workflow scaffolding — see
`work/decision-log/2026-07-06.md`.
