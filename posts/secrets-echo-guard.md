---
title: "Your AI Coding Assistant Will Repeat a Secret Back to You. Here's the Rule That Stops It"
date: "2026-09-06"
excerpt: "Claude Code, Codex, and Cursor all review the code you write. None of them stop the assistant from echoing a credential already sitting in your working set back into chat."
author: "Gurvinder Singh"
tags: ["AI Security", "Secrets Management", "Claude Code", "Cursor", "Codex", "AppSec"]
---

# Your AI Coding Assistant Will Repeat a Secret Back to You. Here's the Rule That Stops It

*If you pasted a stack trace with a live token in it into your AI coding assistant this week, do you know whether it repeated that token back to you — and where that copy is sitting now?*

> **Executive Summary**
> Claude Code, Codex, and Cursor all ship some form of built-in security review, and all three review the code you are actively writing. None of them, by default, stop the assistant from **reproducing** a credential that is already sitting in your working set — a `.env` file open for debugging, a curl command in shell history, a stack trace with an `Authorization: Bearer …` header pasted into chat. Validated across 12 real AI-coding sessions, the single highest-severity finding was an assistant echoing a full session token back in plaintext five times in one chat. This post ships the free rule that closes that gap — `secrets-echo-guard` — in all three tools' formats.

## The gap is not "does it write secrets," it's "does it repeat them"

Most security review built into AI coding tools today is aimed at what the assistant *generates*: don't write a hardcoded API key into new code, don't commit a `.env` file. That's necessary, but it is a different failure mode from the one this rule addresses.

The gap here is reproduction, not generation. You already have a secret in your working set — because you're debugging an auth failure, or copying a curl command that happens to carry a bearer token, or asking the assistant to "summarize this error." Nothing in Claude Code's, Codex's, or Cursor's default behavior treats *repeating that value back to you* as a security event. It's just text in a file, from the tool's point of view.

## What was actually found

The validation run behind this rule reviewed 12 real AI-coding sessions — 5 Claude Code sessions and 7 AWS Q Developer chats — as part of a broader 14-rule error-prevention set, producing 41 confirmed true positives. The single highest-severity finding across the entire run: an AI coding assistant echoed a full session token back in plaintext **five times** in one chat. No AI-coding ruleset reviewed at the time covered this case.

## The rule: `secrets-echo-guard`

Block-tier, applies at every workflow stage — exploration, implementation, verification, delivery — and cannot be talked past by a direct request to print the secret.

**Treats as a secret** (shape, not just a known prefix): `sk-`, `ghp_`, `gho_`, `ghs_`, `AKIA`, `ASIA`, `AIza`, `xox[baprs]-` prefixes; PEM-armored private key blocks; any value in a field named `token`, `secret`, `password`, `apikey`, `credential`, `session`, or `bearer`; any high-entropy string in an env-var or header context.

**On a match:** the assistant does not reproduce the value, states that a credential was found and *where* (file:line, command, log source) rather than the value itself, and treats an already-exposed secret as a revoke-and-rotate action, not a redaction. The rule cannot be suppressed by "just show me the token so I can copy it" — it surfaces the conflict and points back to the original secret store instead.

Full rule text, in `CLAUDE.md`, `.cursor/rules/*.mdc`, and Codex `AGENTS.md` formats:

**Repository:** [github.com/GeeksikhSecurity/ai-secrets-echo-guard](https://github.com/GeeksikhSecurity/ai-secrets-echo-guard)

## Try it yourself

Drop the rule for your tool into place, then open a scratch repo with a real-looking secret in a `.env` or curl command (never a live production credential) and ask your assistant to summarize the file or explain an error touching it. Compare behavior with the rule in place versus removed. If the assistant reproduces the secret with the rule removed, you've just seen the gap it closes.

**Your next move:** Drop `secrets-echo-guard` into your team's `CLAUDE.md`, `.cursor/rules/`, or Codex config this week, then check your last month of AI-assisted debugging sessions for any secret that got echoed back before the rule existed.

---

**What to tell your board:**
- A credential echoed into a chat log or terminal history is now exposed in a second place — one that is rarely covered by the same rotation and audit process as the original secret store.
- This is a documented, validated gap: none of Claude Code, Codex, or Cursor block it by default, and the highest-severity finding in a 12-session validation run was a token echoed back five times in a single chat.
- The fix is a single rule file, free, and takes minutes to deploy across a team's AI coding tools — a cheap, verifiable control for a specific, named exposure path.

---

*Research by [Gurvinder Singh](https://www.linkedin.com/in/gurvindersinghb), CISSP, CISA — Security Researcher and Advisor at [SecurityLeader.ai](https://securityleader.ai)*
