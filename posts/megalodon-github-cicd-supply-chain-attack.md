---
title: "Megalodon — What 5,718 Backdoored GitHub Repositories Reveal About CI/CD as Attack Surface"
date: "2026-05-28"
excerpt: "On 18 May 2026, Megalodon pushed 5,718 malicious commits to 5,561 GitHub repos in six hours, abusing GitHub Actions to steal cloud credentials, OIDC tokens, and secrets. No exploit — just trust in CI."
category: "Supply Chain Research"
authors:
  - name: "Gurvinder Singh"
    credentials: "CISSP, CISA, GWAPT"
    url: "https://www.linkedin.com/in/gurvindersinghb"
tags: ["supply-chain", "github-actions", "cicd-security", "secrets-exfiltration", "incident-research", "appsec"]
translation_status: "human_reviewed"
---

# Megalodon — What 5,718 Backdoored GitHub Repositories Reveal About CI/CD as Attack Surface

*Your CI pipeline has root-equivalent access to everything your developers care about. Megalodon proved attackers know this better than most security teams do.*

---

> **Executive Summary.** Between 11:36 and 17:48 UTC on May 18, 2026, the campaign designated Megalodon by SafeDep researchers pushed 5,718 malicious commits across 5,561 distinct GitHub repositories (SafeDep Team, 2026). The injected GitHub Actions workflows exfiltrated CI environment variables, AWS/GCP/Azure cloud credentials, instance-role tokens via IMDSv2, SSH private keys, Docker auth configs, `.npmrc` and `.netrc` files, Kubernetes configs, HashiCorp Vault tokens, Terraform credentials, GitHub Actions OIDC tokens, the `GITHUB_TOKEN` secret, and GitLab/Bitbucket CI/CD tokens to a command-and-control server at `216.126.225.129:8443`. The npm package `@tiledesk/tiledesk-server` versions 2.18.6 through 2.18.12 carry the targeted variant of the payload — the legitimate maintainer published from the backdoored repository without realizing the source had been compromised. No software vulnerability was exploited. The campaign succeeded by impersonating routine CI maintenance commit messages and leveraging the implicit trust that CI workflows already hold the credentials worth stealing.

---

## The Attack in Precise Terms

The campaign operated in a six-hour automated window. SafeDep's reconstruction of the commit log identifies two attacker-controlled email addresses that together account for the entire 5,718-commit push: one address generated 2,878 commits, the other 2,841 (SafeDep Team, 2026). The commits were authored by throwaway GitHub accounts following a consistent pattern of eight-character lowercase usernames (e.g., `rkb8el9r`, `bhlru9nr`), and the commit `author` field was forged across four rotating identities: `build-bot`, `auto-ci`, `ci-bot`, and `pipeline-bot` — names chosen to render as routine automation in `git log` output and pull-request review queues.

The attack used two payload variants, deployed against different repository classes:

**The mass variant (workflow name: `SysDiag`)** added a *new* `.github/workflows/ci.yml` file. It triggered on `push` to all branches and on `pull_request_target` — the latter being the well-documented dangerous trigger that runs workflows with secrets in the context of the target repository before maintainer review. The workflow requested permissions `id-token: write` and `actions: read`, which together permit OIDC token issuance for cloud federation and enumeration of repository workflow state.

**The targeted variant (workflow name: `Optimize-Build`)** replaced existing workflows rather than adding new ones. It triggered on `workflow_dispatch` — the manual-invocation trigger callable via the GitHub API. This is the key behavioral difference: the targeted variant installs a *dormant* backdoor that activates only when the attacker chooses to fire it, allowing reconnaissance and timing control across a fleet of compromised repositories.

Both variants embedded the same payload — a base64-encoded bash blob invoked as `set +e; echo "..." | base64 -d | bash` — a single-line pattern that is trivially obvious in retrospect but blends into legitimate CI scripts that already use heredocs, jq invocations, and inline shell.

### Six-hour automated window

<ol class="research-timeline">
  <li class="timeline-item" data-severity="info">
    <time class="timeline-date">2026-05-18<br/>11:36 UTC</time>
    <div class="timeline-content">
      <div class="timeline-title">First malicious commit lands</div>
      <div class="timeline-detail">Throwaway account <code>rkb8el9r</code> opens the campaign. Workflow file <code>.github/workflows/ci.yml</code> added; mass-variant `SysDiag` payload deployed.</div>
    </div>
  </li>
  <li class="timeline-item" data-severity="high">
    <time class="timeline-date">2026-05-18<br/>~13:00 UTC</time>
    <div class="timeline-content">
      <div class="timeline-title">Targeted variant deployed to high-value repos</div>
      <div class="timeline-detail">Second author identity (<code>auto-ci</code>) appears. Targeted-variant <code>Optimize-Build</code> workflow replaces existing files in Black-Iron-Project (8 repos), WISE-Community, and Tiledesk subsidiary repositories. Dormant — fires on <code>workflow_dispatch</code>.</div>
    </div>
  </li>
  <li class="timeline-item" data-severity="critical">
    <time class="timeline-date">2026-05-18<br/>~14:30 UTC</time>
    <div class="timeline-content">
      <div class="timeline-title">tiledesk-server compromised</div>
      <div class="timeline-detail">Commit <code>acac5a9</code> modifies <code>.github/workflows/docker-community-worker-push-latest.yml</code> in the primary tiledesk-server repository. Maintainer team unaware. This is the commit that propagates to npm.</div>
    </div>
  </li>
  <li class="timeline-item" data-severity="high">
    <time class="timeline-date">2026-05-18<br/>17:48 UTC</time>
    <div class="timeline-content">
      <div class="timeline-title">Push activity ceases — 5,718 commits total</div>
      <div class="timeline-detail">Across 5,561 distinct repositories. Two attacker emails account for the full set: 2,878 + 2,841 commits.</div>
    </div>
  </li>
  <li class="timeline-item" data-severity="medium">
    <time class="timeline-date">2026-05-18<br/>through 2026-05-21</time>
    <div class="timeline-content">
      <div class="timeline-title">npm publishes pull the backdoor downstream</div>
      <div class="timeline-detail"><code>@tiledesk/tiledesk-server</code> versions 2.18.6 → 2.18.12 published from the backdoored repository state. npm registry sees a normal authenticated publish; nothing flags.</div>
    </div>
  </li>
  <li class="timeline-item" data-severity="info">
    <time class="timeline-date">2026-05-21</time>
    <div class="timeline-content">
      <div class="timeline-title">SafeDep Malysis engine flags the contaminated package</div>
      <div class="timeline-detail">Detection on <code>@tiledesk/tiledesk-server@2.18.12</code> triggers backwards investigation. Campaign attributed and published as <em>Megalodon</em>.</div>
    </div>
  </li>
</ol>

---

## What the Payload Steals

The decoded payload performs a comprehensive credential harvest. SafeDep's analysis enumerates the following collection targets, which together cover the canonical set of secrets a modern CI pipeline holds (SafeDep Team, 2026):

- **All CI-context environment variables** plus a read of `/proc/*/environ` for any sibling processes
- **AWS credentials** via the `aws` CLI (access keys, secret keys, session tokens) and the instance metadata service (IMDSv2)
- **GCP access tokens** via `gcloud auth print-access-token` and the GCP metadata server
- **Azure managed-identity tokens** via the Azure IMDS endpoint
- **SSH private keys** from `~/.ssh/`, **Docker auth configs** from `~/.docker/config.json`, **npm tokens** from `.npmrc`, **machine credentials** from `.netrc`
- **Kubernetes configurations** from `~/.kube/config`
- **HashiCorp Vault tokens** and **Terraform credentials**
- **Shell history files** — frequently a long tail of accidentally pasted secrets
- **GitHub Actions OIDC tokens, the `GITHUB_TOKEN`, and any equivalent GitLab CI / Bitbucket Pipelines tokens**
- **Source-code scanning** with a stated "30+ secret regex patterns" — API keys, database connection strings, JWTs, PEM-encoded private keys, cloud-provider tokens
- **`.env` files, `credentials.json`, and `service-account.json`** wherever they appear in the workspace

Every collected artifact was exfiltrated over HTTPS to `216.126.225.129:8443`. SafeDep does not publish the decoded payload, which limits independent verification — a notable gap in an otherwise detailed report.

---

## How One Compromise Reached npm

The most consequential downstream effect of the campaign was the contamination of `@tiledesk/tiledesk-server` — a chatbot platform with a six-maintainer team and a publishing history dating to 2019. SafeDep traces the compromise to a single malicious commit, `acac5a9`, dated May 18, 2026, which modified `.github/workflows/docker-community-worker-push-latest.yml` in the project's primary GitHub repository (SafeDep Team, 2026). Versions 2.18.6 through 2.18.12 of the npm package carry the targeted-variant backdoor.

The compromise chain is worth stating explicitly because it is the chain every modern open-source maintainer should understand:

<ol class="attack-chain">
  <li class="chain-step" data-status="critical">
    <div class="chain-step-title">PAT or deploy-key compromise</div>
    <p>The attacker compromised a Personal Access Token (PAT) or deploy key with <strong>write access to the repository</strong> — not the maintainer's npm account, not the maintainer's GitHub login. The entry point was upstream of every credential the registry-side defenses know how to check.</p>
  </li>
  <li class="chain-step">
    <div class="chain-step-title">Workflow file modified with a routine-looking message</div>
    <p>The malicious commit edited <code>.github/workflows/docker-community-worker-push-latest.yml</code> with a message indistinguishable from routine CI maintenance (<code>ci: add build optimization step</code>, etc.). On code review, a workflow-only diff with a maintenance-shaped subject reads as low-risk noise.</p>
  </li>
  <li class="chain-step">
    <div class="chain-step-title">Legitimate release runs from backdoored state</div>
    <p>The maintainer subsequently cut a release — normally authenticated, normally signed, normally published. The npm registry observed nothing anomalous: same maintainer, same package, same release cadence. The contamination was already inside the source tree.</p>
  </li>
  <li class="chain-step" data-status="critical">
    <div class="chain-step-title">Downstream consumers receive the contaminated package</div>
    <p>Versions 2.18.6 through 2.18.12 of <code>@tiledesk/tiledesk-server</code> were thereby contaminated despite <em>no compromise of the npm registry, no compromise of the maintainer's npm credentials, and no anomaly in the maintainer's local development workflow</em>. Every npm-side mitigation in the field correctly classified the resulting package as legitimate.</p>
  </li>
</ol>

This is the model. The npm registry sees a normally authenticated, normally signed publish from a maintainer with normal release history. The contamination is upstream of the publish event — and upstream of every npm-side mitigation that has been built over the last decade.

---

## Why CI/CD Is the New Attack Surface

Three structural facts make CI/CD pipelines a uniquely high-value target:

1. **CI workflows hold every credential needed to do real damage.** They authenticate to cloud providers via OIDC federation, push to container registries, deploy to production Kubernetes clusters, sign release artifacts, and write to monitoring backends. The credential set in a modern CI environment is larger and more privileged than the credential set on any individual developer's laptop.
2. **CI workflow runs are unattended and difficult to audit in real time.** Workflow logs are rarely reviewed unless a build fails. The exfiltration step in Megalodon ran in roughly the same wall-clock time as a typical `npm install` step — well within the noise floor of a normal CI run.
3. **Workflow files are code that runs with secrets present.** A `.github/workflows/*.yml` change is, operationally, a change to a privileged production deployment script. But because it lives in the same `git diff` as application changes, it is often reviewed with the same level of scrutiny as a README edit. Megalodon exploited this asymmetry precisely.

The implication is not "we need better Actions runners" or "GitHub should add another permission scope." The implication is that the threat model for repository write access must equal the threat model for production credential issuance — because they are now operationally the same thing.

---

## Indicators of Compromise

<p>
  <span class="badge badge-severity-critical">Critical</span>
  <span class="badge badge-conf-high">High confidence</span>
  <span class="badge badge-severity-info">Source: SafeDep Team (2026)</span>
</p>

The campaign's IoCs are unusually clean — by design, since the attacker prioritized speed over stealth in the mass-variant phase. Organizations should grep their repository histories for the following (SafeDep Team, 2026):

| Indicator | Value |
|---|---|
| Workflow file names | `.github/workflows/ci.yml` (mass), or any new file matching `Optimize-Build` (targeted) |
| Workflow `name:` field | `SysDiag` or `Optimize-Build` |
| Commit author names | `build-bot`, `auto-ci`, `ci-bot`, `pipeline-bot` |
| Commit author emails | `build-bot@noreply.github.com`, `pipeline-bot@noreply.github.com` and rotations |
| Suspect commit messages | `ci: add build optimization step`, `build: improve ci performance`, `chore: optimize pipeline runtime` |
| Account-name pattern | Eight-character lowercase alphanumeric (e.g., `rkb8el9r`, `bhlru9nr`) |
| Command-and-control | `216.126.225.129:8443` (block in egress) |
| Compromised package | `@tiledesk/tiledesk-server` 2.18.6 through 2.18.12 |
| Compromised workflow commit | `acac5a9` (May 18, 2026) in the tiledesk-server repository |

A `grep -rE 'set \+e;.*base64 -d.*\| ?bash'` across `.github/workflows/` will surface the encoding pattern itself, including potential variants that do not match the above commit names exactly.

---

## Mitigation — Filling the Gap

The SafeDep advisory does not provide actionable remediation steps. The following is a synthesis grounded in NIST's Secure Software Development Framework (NIST SP 800-218; Souppaya et al., 2022), GitHub's own hardening guidance (GitHub, Inc., 2024), and the OpenSSF Supply-chain Levels for Software Artifacts (SLSA) framework (Open Source Security Foundation, 2024):

**Immediate response (today):**

1. **Revoke and rotate every credential a workflow has touched** in the past 60 days. Treat OIDC federation issuers as compromised; rotate the federated principal trust relationships.
2. **Audit workflow file history** — `git log --diff-filter=A -- '.github/workflows/'` will list every workflow ever added; check for the IoC patterns above.
3. **Block `216.126.225.129` at egress** from CI runners and developer endpoints. Consider all outbound traffic from a CI runner to a non-allowlisted IP as a compromise signal worth investigating.
4. **Audit PAT inventory.** GitHub Settings → Personal access tokens → revoke anything with workflow scope that does not have a documented, current operational purpose.

**Structural changes (this quarter):**

1. **Require code-owner review on workflow changes.** A `CODEOWNERS` entry for `.github/workflows/*` is a single-line change that gates every future modification behind explicit security-team review.
2. **Eliminate `pull_request_target` unless you fully understand its threat model.** The trigger runs with target-repo secrets in the context of the PR author's code — a documented foot-gun that has been responsible for multiple prior supply-chain incidents.
3. **Pin Actions by commit SHA, not by tag.** This blog's own CI (`vercel-security-monitor.yml`, `content-rigor.yml`) follows the pattern: `uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2`. SHA pins make a published-but-then-rewritten tag (a recognized supply-chain attack pattern) into a no-op.
4. **Adopt least-privilege workflow permissions.** Every workflow should declare `permissions:` explicitly. The default should be `contents: read`; any write permission should be justified in a comment in the file.
5. **Federate to cloud providers via short-lived OIDC tokens, not long-lived secrets.** Long-lived secrets, when stolen, remain valid until rotation; OIDC tokens expire within minutes and dramatically reduce the value of exfiltrated artifacts.
6. **Use a registry-level scanner that inspects published artifacts**, not just source repositories — because Megalodon proved that source-clean and published-clean can be different states.

**Architectural changes (next 12 months):**

1. **Treat CI as production.** Apply the same change-management, monitoring, and least-privilege rigor to CI infrastructure that you apply to production deployments. The privilege level is identical; the discipline rarely is.
2. **Adopt SLSA Build Level 3** or equivalent (Open Source Security Foundation, 2024). The framework was explicitly designed for the threat model Megalodon exemplifies, and Level 3 makes the source-to-artifact provenance auditable.
3. **Maintain a software bill of materials** (SBOM) that records the actual workflow YAML files used at build time, not only the runtime dependencies. The provenance gap Megalodon exploited lives upstream of every SBOM that records only runtime modules.

---

## What This Changes for Security Leaders

The takeaway is not technical. It is allocative.

For roughly a decade, the supply-chain security investment center of gravity has been the registry: signature verification, malware scanning of published artifacts, dependency-pinning tooling, package-lock integrity. Megalodon ran upstream of all of that. The compromise lived in the repository, the publish was clean, and every registry-side defense in the field correctly classified the resulting package as legitimate.

If your supply-chain security spend is currently 90% registry-side and 10% CI-side, the ratio is inverted relative to the demonstrated threat. The repository plus its CI workflows is the new attack surface. The registry is downstream of it.

For Sayva clients and SecurityLeader.ai readers running engagement-driven assessments, this is the recommended phrasing for the next quarterly risk review: *"We are inverting the supply-chain investment ratio. Repository plus CI is the perimeter now. The registry is downstream of the perimeter."*

---

## References

- GitHub, Inc. (2024). *Security hardening for GitHub Actions*. GitHub Docs. https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions
- Open Source Security Foundation. (2024). *SLSA: Supply-chain Levels for Software Artifacts* (Version 1.0). https://slsa.dev/spec/v1.0/
- SafeDep Team. (2026, May 21). *Megalodon: Mass GitHub repo backdooring through CI workflows*. SafeDep Research. https://safedep.io/megalodon-mass-github-repo-backdooring-ci-workflows/
- Souppaya, M., Scarfone, K., & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST Special Publication 800-218). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-218

---

## Disclaimer

*This post is original analysis of publicly reported research and does not contain confidential client information. The mitigation guidance above is synthesized from public frameworks (NIST SP 800-218, GitHub's documented hardening recommendations, and OpenSSF SLSA) and represents the author's professional judgment as a CISSP, CISA, and GWAPT-credentialed practitioner — not a substitute for an engagement-specific assessment.*

---

*Gurvinder Singh, CISSP, CISA, GWAPT — SecurityLeader.ai · Principal Security Researcher*
