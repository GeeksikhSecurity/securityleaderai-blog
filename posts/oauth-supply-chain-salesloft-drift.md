---
title: "Master Keys & Shadow Trust: The $1B OAuth Supply-Chain Heist"
date: "2026-02-08"
excerpt: "Analysis of the UNC6395 campaign that weaponized OAuth tokens from Salesloft/Drift to access 700+ Salesforce environments, bypassing MFA entirely. A forensic deconstruction with GWAPT-aligned penetration testing methodology."
author: "Gurvinder Singh"
tags: ["OAuth Security", "Supply Chain", "Identity Security", "MITRE ATT&CK", "Penetration Testing"]
---

# Master Keys & Shadow Trust: The $1B OAuth Supply-Chain Heist

## Executive Summary

Between August 8-18, 2025, the cybersecurity landscape shifted from "breaking the perimeter" to "inheriting the trust." The UNC6395 campaign did not exploit a software vulnerability in the victim organizations. It weaponized legitimate OAuth 2.0 tokens to access Salesforce environments across Google, Cisco, Disney, and major security vendors, compromising more than 700 organizations.

This "Identity Supply Chain" attack rendered traditional defenses obsolete. Firewalls and standard MFA are blind to valid bearer tokens issued to whitelisted applications. No passwords were stolen. Multi-Factor Authentication was bypassed by design.

Subsequent campaigns, notably the Gainsight incident (November 2025) and the n8n ecosystem attack (January 2026), confirm that this is a systemic failure in how the industry manages Non-Human Identities. The "Shadow Trust" layer must be treated as a Tier-0 attack surface.

## The Threat Landscape: 2025-2026

### UNC6395: The Drift Campaign

**Vector:** UNC6395 compromised the AWS infrastructure of Drift (a Salesloft subsidiary). Rather than attacking Drift's customers directly, they exfiltrated the database housing valid OAuth `access_token` and `refresh_token` pairs for the Drift-Salesforce integration.

**MITRE ATT&CK Mapping:**

- **Initial Access:** Trusted Relationship (T1199)
- **Credential Access:** Steal Application Access Token (T1528)
- **Defense Evasion:** Use Alternate Authentication Material (T1550.001)

**Operational Pattern:**

1. **Reconnaissance:** Utilized the web scope to query `/services/data/v63.0/sobjects/` and map the schema
2. **Staging:** Executed `SELECT COUNT() FROM Case` to identify high-volume targets indicating rich support data
3. **Exfiltration:** Validated tokens were used to pull Case and EmailMessage objects containing unstructured secrets (AWS keys, passwords)

### The Rise of the Meta-Supply Chain (January 2026)

The n8n ecosystem attack introduced a recursive threat: attacking the automation tools that hold the tokens. By injecting malicious nodes into the n8n community library, attackers accessed a centralized vault of tokens for Slack, Google Workspace, and Salesforce simultaneously.

**Key Insight:** Automation platforms (n8n, Zapier, Workato) are effectively unmonitored password vaults. If an attacker gains access to an automation instance, they have gained access to every connected SaaS platform.

## The Mechanics of Shadow Trust

"Shadow Trust" is the accumulation of delegated permissions (OAuth Scopes) that persist beyond the initial user interaction.

### The God Mode Scope Anti-Pattern

Developers often request over-privileged scopes to avoid permission errors during development. In Salesforce, this manifests as:

| Scope | Description | Risk Assessment |
|-------|-------------|-----------------|
| `full` | Full access to all data/metadata | **Critical.** Effectively System Admin access via API |
| `refresh_token` | Offline access (indefinite) | **High.** Allows access after the user logs out or changes passwords |
| `web` | Web visual/interface access | **High.** Allows the token to be used in a browser context, bypassing API-only IP restrictions |

### The Persistence Mechanism: Refresh Tokens

The core failure in 2025 was the Infinite Refresh Token:

- **Standard Behavior:** `access_token` expires in 1-2 hours
- **Vulnerability:** The `refresh_token` often had no expiry (valid until explicitly revoked)
- **Impact:** Attackers who stole the Drift database in August 2025 could use the tokens weeks later without triggering a new login event or MFA challenge

## Penetration Testing Methodology: Auditing OAuth Integrations

This methodology adapts standard web application testing to the OAuth layer, aligned with GIAC GWAPT assessment techniques.

### Phase 1: Reconnaissance & Enumeration

**Objective:** Identify the attack surface of connected apps.

**SOQL Enumeration:** Standard UI audits miss critical details. Use SOQL via the Salesforce CLI to query the OauthToken and SetupAuditTrail tables to identify active tokens with over-privileged scopes.

**Forensic Insight:** Cross-reference `LastUsedDate` with `SetupAuditTrail`. If a token is being used but there is no corresponding login in `LoginHistory`, it confirms the use of a Refresh Token flow (T1550.001).

**Traffic Analysis (Burp Suite):** For active assessments, proxy the application authorization flow. Intercept the OAuth handshake, analyze the `scope` parameter for over-privileged access, and verify the `state` parameter to test for CSRF vulnerabilities.

### Phase 2: Token Analysis & Scope Fuzzing

**Objective:** Verify whether the token respects the Principle of Least Privilege.

For JWT-based tokens, decode the payload to verify claims: `aud` (is it too broad?), `exp` (is it greater than 24 hours?), and `alg` (is it set to `none`?).

**The Secondary Heist Simulation:** The critical value-add for a penetration test. Demonstrate not just that access exists, but what that access yields. Use the token to mine unstructured secrets: AWS keys, hardcoded Bearer tokens, and other credentials embedded in Case comments and EmailMessage objects that enable lateral movement to cloud infrastructure.

### Phase 3: Detection Evasion Testing

**Objective:** Test whether the SOC can detect the ghost.

- **Impossible Travel via API:** Use the token from IP A (US-East), wait 2 minutes, use the token from IP B (EU-West) via VPN. Did Salesforce Shield or the SIEM trigger? Most configurations fail this because they only check login IP, not API IP.
- **Volume Anomaly:** Script a burst of 500 describe calls in 60 seconds. Check for API Limit warnings versus Security Alerts.

## Risk Scoring

Findings scored using CVSS v4.0:

| Vulnerability | Vector | Impact | Severity |
|---------------|--------|--------|----------|
| Over-scoped OAuth Token | Network / Low Complexity / High Privileges | High Confidentiality / High Integrity | **Critical (9.1)** |
| Indefinite Refresh Token | Network / Low Complexity / Low Privileges | High Confidentiality (Persistence) | **High (7.5)** |
| Missing IP Restrictions | Network / Low Complexity / None | Low Confidentiality | **Medium (5.3)** |

**Business Impact:** The identified configurations mirror the specific vulnerability exploited in the UNC6395 (Salesloft) campaign. An attacker compromising the vendor could inherit these permissions, bypassing all MFA controls and persisting in the environment for months.

## Remediation: The Zero Trust OAuth Framework

### Governance

- **Kill the Forever Token:** Enforce a strict 24-hour expiry on Refresh Tokens for all third-party connected apps
- **The No-Full Policy:** Block the `full` scope at the org level. Require specific justifications for any scope beyond `id` and `profile`

### Technical Controls

- **IP Enforcement:** Change Connected App policies from "Relax IP restrictions" to "Enforce IP restrictions," ensuring tokens only work from whitelisted ranges
- **Session Introspection:** Implement RFC 7662 (Token Introspection) at the gateway level to validate token status on every request, not just at creation

### Monitoring

- **Ingest OauthToken Events:** Monitor for `OauthTokenRevoked` (could indicate attacker cleanup) or `OauthTokenGenerated` by unexpected User IDs

## Conclusion

The Identity Supply Chain is the new perimeter. As demonstrated by the token heists of 2025 and 2026, static credentials are dying, but delegated authority is growing unchecked. For the security practitioner, the focus must shift from cracking passwords to auditing trust.

By applying GWAPT methodologies of enumeration, analysis, and exploitation to OAuth tokens, we can illuminate the Shadow Trust network and close the doors that legitimate vendors inadvertently left open.

---

**Research by Gurvinder Singh, CISSP, CISA, GWAPT**

*This analysis is part of ongoing independent research into OAuth supply-chain vulnerabilities and AI agent identity security. See also: [MCP Sentinel Scanner](/blog/mcp-sentinel-scanner) for related work on securing AI agent-to-agent communication frameworks.*
