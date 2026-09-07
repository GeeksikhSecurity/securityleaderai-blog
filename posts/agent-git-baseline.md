---
title: "A CLAUDE.md File Will Not Stop an Agent From Pushing a Bad Commit"
date: "2026-09-06"
excerpt: "Client-side rules files are advisory. API-driven agents bypass local git hooks entirely, and a 40-PR overnight credential leak shows exactly how that gap gets exploited."
author: "Gurvinder Singh"
tags: ["AI Security", "Supply Chain", "Git Security", "Claude Code", "SLSA", "AppSec"]
---

# A CLAUDE.md File Will Not Stop an Agent From Pushing a Bad Commit

*If an AI agent opened 40 pull requests against your repository overnight, what would actually stop the ones carrying plaintext credentials from merging?*

> **Executive Summary**
> Claude Code, Codex, and Cursor all let you write a rules file that tells an agent what you meant. None of that is enforcement — a rules file lives client-side, and an AI agent pushing commits through a platform's API does not run local git hooks at all. Traditional client-side controls live exclusively in `.git/hooks`, are never copied by `git clone`, and are bypassed entirely by API-driven agents. This post ships the free rule and the three-layer model — intent, server-side enforcement, attribution — that closes the gap a `CLAUDE.md` file alone leaves open.

## The gap: a rules file is advisory, not enforcement

An agent-authored-git policy that lives only in a `CLAUDE.md`, `.cursor/rules`, or `AGENTS.md` file is a dead policy the moment an agent — yours, or a contributor's — decides not to follow it. The documented failure shape: an agent hallucinating from a malformed prompt has opened 40 PRs overnight containing plaintext credentials, sailing past local secret scanners seamlessly. Worse, when the platform creates those commits server-side via an API mutation, they can be marked **"Verified"** automatically — manufacturing a false sense of provenance for a diff no human reviewed.

## Why three layers, not one file

### Layer 1 — Intent (the rule file)
What you meant. Advisory. Assume it can be ignored.

### Layer 2 — Enforcement (server-side, non-bypassable)
Branch rulesets and required status checks set at the repository server layer — never a client-side hook. Secret-scanning push protection, which intercepts a credential in transit before it lands in history. Separation of duties, so the PR author cannot approve their own change and approval is invalidated on new commits. Signed commits required (GPG, SSH, or Sigstore Gitsign). Short-lived, repo-scoped installation tokens (roughly one-hour expiry) replacing long-lived human PATs for anything pushing as an agent.

### Layer 3 — Attribution and volume governance
The layer most teams skip, and the one that fails first. SLSA v1.2 distinguishes a "trusted person" from a "trusted robot" in its Source Track — use that vocabulary rather than letting agent commits hide inside human-authored provenance language. Tag every agent-authored merge in deploy metadata so incident response can query for a given agent's blast radius after the fact. Pre-filter agent-opened PRs with a review agent so a human's attention goes to architectural judgment, not diff-reading volume. Write down, explicitly, that AI-assisted code gets specialized security review — "we trust the AI" is not a compliance policy.

## The datapoint that motivates this

Early 2026, AI-generated submissions on at least one major bug bounty program reached roughly 20% of total volume. The confirmed-vulnerability rate collapsed from over 15% to under 5%. Human triage became impossible, and the program was terminated. The same dynamic nullifies branch protection internally: overwhelmed reviewers rubber-stamp, and subtle hallucinations flow into `main`. When generation capacity explodes, judgment becomes the scarce resource — exactly what layer 3 exists to protect.

## The rule: `agent-git-baseline`

Full text for the intent layer, plus the layer-2 GitHub setup checklist and layer-3 attribution guidance, in `CLAUDE.md`, `.cursor/rules/*.mdc`, and Codex `AGENTS.md` formats:

**Repository:** [github.com/GeeksikhSecurity/ai-agent-git-baseline](https://github.com/GeeksikhSecurity/ai-agent-git-baseline)

## Try it yourself

Drop the intent-layer rule into place, then check whether your repository currently has *any* of the layer-2 controls configured (`gh api repos/{owner}/{repo} --jq .security_and_analysis`, and Settings → Rules → Rulesets). If layer 2 is empty, the intent-layer rule is the only thing standing between an agent and a bad push — and by design, it can be ignored.

**Your next move:** Audit your repository's branch ruleset and secret-scanning push protection settings this week — before an agent, not a human, is the one opening your next 40 PRs.

---

**What to tell your board:**
- "We have a CLAUDE.md rule for this" is not a compliance answer if nothing server-side enforces it — a client-side file is bypassed entirely by any API-driven agent, and a "Verified" badge on a commit does not prove a human reviewed it.
- A documented incident shows the shape of the risk directly: AI-generated submission volume on one major program drove confirmed-vulnerability rate from over 15% down to under 5%, and the program was terminated when human triage became impossible.
- The fix is a three-layer model — intent, server-side enforcement, attribution — not a bigger rules file. Layers 2 and 3 are GitHub settings and process, not code, and can be audited this week.

---

*Research by [Gurvinder Singh](https://www.linkedin.com/in/gurvindersinghb), CISSP, CISA — Security Researcher and Advisor at [SecurityLeader.ai](https://securityleader.ai)*
