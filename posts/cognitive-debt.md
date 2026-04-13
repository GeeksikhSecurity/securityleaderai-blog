---
title: "The Cognitive Debt Your Security Scanner Doesn't Detect"
date: "2026-04-12"
excerpt: "AI writes security code faster than any team can understand it. That gap between generation speed and human comprehension has a name — cognitive debt — and your SIEM will not alert on it."
author: "Gurvinder Singh"
tags: ["AI Security", "Cognitive Debt", "Supply Chain Security", "MCP Security", "TDD"]
---

*Your tests are passing. Your scans are green. Your coverage is 94%. But can anyone on your team explain why the authentication middleware works the way it does — and what breaks if you change it?*

> **Executive Summary**
> Cognitive debt is the gap between what code does and what the team understands about why it does it. AI coding assistants have turned this from a slow-burning maintenance problem into an acute security risk. When 72% of developers report reduced comprehension of AI-generated code (Storey et al., 2026) and AI agents complete tasks 19% slower than expected because they accumulate hidden complexity (METR, 2025), the implication for security teams is clear: you are defending systems that nobody fully understands. No scanner detects this. No SIEM alerts on it. This article defines the problem, maps it to real-world security failures, and proposes a practitioner framework for measuring and reducing cognitive debt before it becomes an incident.

## What Is Cognitive Debt?

Simon Willison coined the term in February 2026 to describe code that works correctly but that the developer cannot fully explain. It is distinct from technical debt, which is a known shortcut with a known cost. Cognitive debt is invisible — the developer does not know what they do not understand, because the AI-generated code passed every check they had.

Peter Naur anticipated this in 1985. His paper "Programming as Theory Building" argued that software development is fundamentally about building a mental model — a theory — of the problem domain and its solution. The code is an artifact of that theory, not a substitute for it. When the theory dies — when the people who understood the reasoning leave, or when the reasoning was never built in the first place — the code becomes unmaintainable regardless of its test coverage.

AI coding assistants have industrialized the production of code without theory. The model generates syntactically correct, functionally passing implementations that reflect statistical patterns in training data, not reasoned decisions about your specific architecture. As Addy Osmani observed in his 2026 analysis of comprehension debt, the result is code that "works for reasons nobody on the team can articulate" (Osmani, 2026).

Kent Beck, in his 2025 conversation on the Pragmatic Engineer podcast, framed the tension directly: AI assistants excel at making changes, but the value of software engineering is knowing which change to make and why. When the "why" is absent, every future modification becomes a gamble.

## Why This Is a Security Problem

Cognitive debt creates three specific security risks that traditional scanning cannot detect.

**Risk 1: Unauditable Security Logic.** When an AI assistant generates an OAuth implementation, CORS configuration, or input validation pipeline, the code may pass every automated check while embedding assumptions that are invisible to the team. I have seen this pattern repeatedly in MCP (Model Context Protocol) implementations through my work on the [MCP Sentinel Scanner](https://github.com/GeeksikhSecurity/mcp-sentinel-scanner) — the tool permission boundaries look correct in the code, but the developer cannot explain why a specific permission was granted or what attack surface it creates. The permission works. The tests pass. The reasoning is absent.

**Risk 2: Regression Without Signal.** Code you understand can be safely modified. Code you do not understand cannot. When a developer modifies AI-generated security logic without understanding its invariants, they may break a security property that no test was designed to verify. The regression is silent because the original intent was never documented — it was never *understood*. This is the scenario that static analysis tools fundamentally cannot address: the code is not wrong, the team's model of the code is wrong.

**Risk 3: Incident Response Failure.** When a breach occurs in code the team does not understand, the mean time to containment increases dramatically. You cannot triage what you cannot read. You cannot scope an incident in a system whose boundaries you do not know. Cognitive debt turns every AI-generated component into a black box during the exact moment when you need transparency most.

These risks compound. As I documented in [Enhancing GitHub Security Scanning](/blog/enhancing-github-security-scanning), 45% of AI-generated code introduces security vulnerabilities — but the deeper problem is not that the code is wrong. The deeper problem is that when it is wrong, nobody knows where to look.

## The Research: Quantifying the Gap

Storey et al. (2026) conducted the first large-scale empirical study of AI-assisted development comprehension, published as arXiv:2603.22106. Their findings are specific:

- **72% of developers** reported reduced comprehension of code produced with AI assistance compared to code they wrote manually
- **Developers who accepted AI suggestions with fewer modifications** showed the steepest comprehension decline — the ease of acceptance correlated with the depth of the gap
- **Code review effectiveness dropped measurably** when reviewers encountered AI-generated code, because the review became "does it work?" instead of "is this the right approach?"

METR's 2025 research on AI agent capabilities provides the complementary data point. AI agents completed software engineering tasks 19% slower than projected benchmarks, and the gap was attributed to accumulated complexity that the agents could not reason about across task boundaries. If the AI agents themselves lose coherence over extended tasks, expecting human developers to maintain coherence over AI-generated codebases is unrealistic.

## A Practitioner Framework: Measuring Cognitive Debt

You cannot scan for cognitive debt, but you can measure its proxies.

**Proxy 1: Explanation Test.** For any security-critical component, ask the developer who committed it to explain — without reading the code — what invariants it maintains and what breaks if they change. If they cannot, that component carries cognitive debt. This is not a skills test. It is a system health check.

**Proxy 2: Modification Confidence.** Ask: "If I asked you to change how this authentication flow handles token refresh, how confident are you that your change would not break something?" Confidence below 7/10 on security-critical paths is a leading indicator.

**Proxy 3: AI Acceptance Rate.** Track the percentage of AI-generated suggestions that are accepted without modification. Beck's framework suggests that if more than 80% of suggestions are accepted as-is, the team is likely accumulating cognitive debt. Modification is evidence of reasoning. Acceptance without modification may be evidence of trust without understanding.

**Proxy 4: Theory Decay Rate.** When a developer leaves a project, how much institutional knowledge about security decisions leaves with them? If the answer is "most of it," your documentation is not the problem — your cognitive debt is.

## What To Do About It

**This week:** Run the Explanation Test on your three most critical security components — authentication, authorization, and data validation. Document which ones fail. Those are your highest-risk cognitive debt positions.

**This month:** Implement mandatory "reasoning comments" for all AI-generated security logic. Not what the code does — any developer can read that. Why this approach was chosen, what alternatives were considered, and what security property it is intended to maintain. This is Naur's theory, made explicit.

**This quarter:** Add comprehension reviews to your security review process. Before any security-critical PR merges, the author must demonstrate they can explain the change without referencing the code. This is not bureaucracy — it is the same principle as requiring a pilot to explain their flight plan before takeoff.

**For AI-assisted development:** Apply Beck's Tidy First principle. Before asking the AI to generate new security logic, tidy the existing code so the intent is clear. Then generate. Then verify that you can explain what was generated and why. If you cannot explain it, do not ship it — regardless of what the tests say.

## Board Talking Points

- AI coding assistants increase code production velocity but decrease team comprehension. 72% of developers report reduced understanding of AI-assisted code. This creates security-relevant knowledge gaps that no scanning tool detects.
- Cognitive debt turns every AI-generated security component into an unauditable black box. When incidents occur in code the team does not understand, mean time to containment increases and scope assessment becomes unreliable.
- We are implementing comprehension gates — explanation tests and reasoning documentation — for all security-critical AI-generated code. This adds 15-20 minutes per PR but prevents the accumulation of security-relevant knowledge gaps that compound over time.

---

**Sources**

- Willison, S. (2026). "Cognitive Debt." *simonwillison.net*, February 15, 2026.
- Storey, M.-A., et al. (2026). "Comprehension in AI-Assisted Software Development." *arXiv:2603.22106*.
- Beck, K. (2025). "Tidy First and AI-Assisted Development." *Pragmatic Engineer Podcast*.
- METR (2025). "Measuring AI Agent Capabilities in Software Engineering Tasks." *metr.org/research*.
- Naur, P. (1985). "Programming as Theory Building." *Microprocessing and Microprogramming*, 15(5), 253-261.
- Osmani, A. (2026). "Comprehension Debt in AI-Assisted Codebases." *Medium*, March 2026.

---

*Gurvinder Singh, CISSP, CISA, GWAPT is the founder of SecurityLeader.ai and Information Security Manager at the American Psychological Association. He writes about AI security governance, supply chain risk, and building security programs that practitioners can actually use.*

*Previously: [The Pipeline Is the Perimeter — and GitHub Just Admitted It](/blog/github-supply-chain-pipeline-perimeter) | [Enhancing GitHub Security Scanning: AI Threat Taxonomies Into Your DevSecOps Pipeline](/blog/enhancing-github-security-scanning)*
