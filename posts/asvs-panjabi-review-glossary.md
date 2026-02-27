---
title: "ASVS Panjabi Review — Glossary (ਸ਼ਬਦਾਵਲੀ)"
date: "2026-02-26"
excerpt: "100+ security terms translated into Panjabi (Gurmukhi) for the OWASP ASVS 5.0 translation. Includes pronunciation guide, translation approach classification, and open terminology questions for community review."
author: "Gurvinder Singh"
tags: ["owasp", "asvs", "panjabi", "translation", "review", "glossary"]
hidden: true
---

# ASVS Panjabi Review — Glossary (ਸ਼ਬਦਾਵਲੀ)

> **Reviewing this glossary?** Email feedback to **gurvinder@securityleader.ai** with the subject **"ASVS Panjabi Review — Glossary"**. Even a one-line note like *"I think ਕਮਜ਼ੋਰੀ works better as ਖ਼ਾਮੀ for Vulnerability"* is valuable. No GitHub account needed.

## How to Read This Glossary

Every translated term is classified by its **translation approach** (T/L/R/H):

| Category | When Used | Example |
|----------|-----------|---------|
| **T — Translated** | Concept has a natural Panjabi equivalent | Authentication → ਪ੍ਰਮਾਣੀਕਰਨ |
| **L — Loan Word** | Term is universally used in English | API → ਏ.ਪੀ.ਆਈ. |
| **R — Retained** | Acronym or proper noun, kept as-is | OWASP, SQL, XSS |
| **H — Hybrid** | Part translates, part stays in English | SQL Injection → SQL ਇੰਜੈਕਸ਼ਨ |

The practical question behind every classification: **if a Panjabi-speaking developer reads this term in a code review, which version will they actually recognize?**

---

## Core ASVS Terms

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Application | ਐਪਲੀਕੇਸ਼ਨ | aiplicaishan | L | Software application |
| Security | ਸੁਰੱਖਿਆ | surakkhiā | T | Protection, safety |
| Verification | ਤਸਦੀਕ | tasdeeq | T | Validation, confirmation |
| Standard | ਮਿਆਰ | miyār | T | Benchmark, criterion |
| Requirement | ਲੋੜ | loṛ | T | Need, specification |
| Architecture | ਆਰਕੀਟੈਕਚਰ | ārkīṭaikchar | L | System design |
| Framework | ਫਰੇਮਵਰਕ | pharaimvarak | L | Structural foundation |
| Compliance | ਪਾਲਣਾ | pālṇā | T | Adherence to rules |
| Assessment | ਮੁਲਾਂਕਣ | mulāṅkaṇ | T | Evaluation |
| Implementation | ਲਾਗੂਕਰਨ / ਅਮਲ | lāgūkaraṇ / amal | T | Putting into practice (under review) |

## Authentication & Authorization

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Authentication | ਪ੍ਰਮਾਣੀਕਰਨ | pramāṇīkaraṇ | T | Identity verification |
| Authorization | ਅਧਿਕਾਰੀਕਰਨ | adhikārīkaraṇ | T | Permission granting |
| Session Management | ਸੈਸ਼ਨ ਪ੍ਰਬੰਧਨ | saishan prabandhan | H | Session handling |
| Access Control | ਪਹੁੰਚ ਨਿਯੰਤਰਣ | pahuṅch niyaṅtraṇ | T | Permission management |
| Credential | ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ | kraiḍainsheeal | L | Login information |
| Password | ਪਾਸਵਰਡ | pāsvaraḍ | L | Secret passphrase |
| Multi-Factor Authentication | ਬਹੁ-ਕਾਰਕ ਪ੍ਰਮਾਣੀਕਰਨ | bahu-kārak pramāṇīkaraṇ | H | MFA |
| Token | ਟੋਕਨ | ṭokan | L | Authentication token |
| OAuth | OAuth | — | R | Authorization protocol |
| Single Sign-On | ਸਿੰਗਲ ਸਾਈਨ-ਆਨ | siṅgal sāīn-ān | L | SSO |

## Vulnerabilities & Threats

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Vulnerability | ਕਮਜ਼ੋਰੀ | kamzorī | T | Security weakness |
| Threat | ਖ਼ਤਰਾ | khatrā | T | Potential danger |
| Risk | ਖ਼ਤਰਾ/ਜੋਖ਼ਮ | khatrā/jokham | T | Probability of harm |
| Exploit | ਐਕਸਪਲੋਇਟ | aiksploiṭ | L | Attack technique |
| Attack Surface | ਹਮਲੇ ਦੀ ਸਤ੍ਹਾ | hamlai dī sathā | T | Exposure area |
| Threat Modeling | ਖ਼ਤਰਾ ਮਾਡਲਿੰਗ | khatrā māḍliṅg | H | Threat analysis |
| Injection | ਇੰਜੈਕਸ਼ਨ | iṅjaikshan | L | Code injection class |
| SQL Injection | SQL ਇੰਜੈਕਸ਼ਨ | SQL iṅjaikshan | H | Database attack |
| Cross-Site Scripting (XSS) | XSS | — | R | Client-side injection |
| Cross-Site Request Forgery (CSRF) | CSRF | — | R | Request forgery |
| Path Traversal | ਪਾਥ ਟਰੈਵਰਸਲ | pāth ṭraivarsaḷ | L | Directory traversal |
| Command Injection | ਕਮਾਂਡ ਇੰਜੈਕਸ਼ਨ | kamāṅḍ iṅjaikshan | H | OS command attack |
| XML External Entity (XXE) | XML ਬਾਹਰੀ ਇਕਾਈ | XML bāhrī ikāī | H | XML parser attack |
| Server-Side Request Forgery (SSRF) | SSRF | — | R | Server request attack |
| Template Injection | ਟੈਂਪਲੇਟ ਇੰਜੈਕਸ਼ਨ | ṭaimpḷaiṭ iṅjaikshan | H | Template engine attack |

## Cryptography & Data Protection

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Encryption | ਇਨਕ੍ਰਿਪਸ਼ਨ | inkripashan | L | Data encoding |
| Decryption | ਡੀਕ੍ਰਿਪਸ਼ਨ | ḍīkripashan | L | Data decoding |
| Hashing | ਹੈਸ਼ਿੰਗ | haishiṅg | L | One-way function |
| Certificate | ਸਰਟੀਫਿਕੇਟ | sarṭīphikaiṭ | L | Digital certificate |
| Key Management | ਕੁੰਜੀ ਪ੍ਰਬੰਧਨ | kuṅjī prabandhhan | H | Crypto key handling |
| Data Protection | ਡੇਟਾ ਸੁਰੱਖਿਆ | ḍaiṭā surakkhiā | H | Information security |
| Sensitive Data | ਸੰਵੇਦਨਸ਼ੀਲ ਡੇਟਾ | saṅvaidanshaīl ḍaiṭā | H | Protected information |

## Development & Testing

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Secure Development | ਸੁਰੱਖਿਅਤ ਵਿਕਾਸ | surakhiat vikās | T | Secure SDLC |
| Code Review | ਕੋਡ ਸਮੀਖਿਆ | koḍ samīkhiā | H | Code inspection |
| Penetration Testing | ਪੈਨੀਟ੍ਰੇਸ਼ਨ ਟੈਸਟਿੰਗ | painīṭraishan ṭaisṭiṅg | L | Security testing |
| Static Analysis | ਸਥਿਰ ਵਿਸ਼ਲੇਸ਼ਣ | sthir vishlaishaṇ | T | SAST |
| Dynamic Analysis | ਗਤੀਸ਼ੀਲ ਵਿਸ਼ਲੇਸ਼ਣ | gatīshīl vishlaishaṇ | T | DAST |
| Input Validation | ਇਨਪੁੱਟ ਪ੍ਰਮਾਣਿਕਤਾ | inpuṭṭ pramāṇiktā | H | Data validation |
| Output Encoding | ਆਊਟਪੁੱਟ ਇੰਕੋਡਿੰਗ | āūṭpuṭṭ iṅkoḍiṅg | H | Data encoding |
| Sanitization | ਸੈਨੀਟਾਈਜ਼ੇਸ਼ਨ | sainīṭāīzaishan | L | Data cleaning |
| Error Handling | ਗਲਤੀ ਸੰਭਾਲ | galtī saṅbhāl | T | Exception management |
| Logging | ਲਾਗਿੰਗ | lāgiṅg | L | Event recording |

## Infrastructure & Configuration

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Configuration | ਸੰਰਚਨਾ | saṅrachnā | T | System settings |
| API | ਏ.ਪੀ.ਆਈ. | ai.pī.āī. | L | Application interface |
| Web Service | ਵੈੱਬ ਸੇਵਾ | vaib saivā | H | Network service |
| Firewall | ਫਾਇਰਵਾਲ | phāiarvāl | L | Network barrier |
| Malicious Code | ਖ਼ਤਰਨਾਕ ਕੋਡ | khatarnāk koḍ | H | Malware |
| File Upload | ਫਾਈਲ ਅੱਪਲੋਡ | phāīl apploḍ | L | File handling |
| Business Logic | ਕਾਰੋਬਾਰੀ ਤਰਕ | kārobārī tarak | T | Application logic |

## Governance & Process

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Type | Context |
|---------|-------------------|--------------|------|---------|
| Policy | ਨੀਤੀ | nītī | T | Governance rule |
| Audit | ਆਡਿਟ | āḍiṭ | L | Formal examination |
| Incident Response | ਘਟਨਾ ਜਵਾਬ | ghaṭnā javāb | T | Security response |
| Documentation | ਦਸਤਾਵੇਜ਼ੀਕਰਨ | dastavaikzīkaraṇ | T | Written records |
| Traceability | ਟਰੇਸੇਬਿਲਟੀ | ṭraisaibilṭī | L | Audit trail |
| Remediation | ਸੁਧਾਰ | sudhār | T | Fixing issues |

## ASVS Levels

| English | Panjabi (ਪੰਜਾਬੀ) | Pronunciation | Context |
|---------|-------------------|--------------|---------|
| Level 1 | ਪੱਧਰ ੧ | paddhar 1 | Initial defense layer |
| Level 2 | ਪੱਧਰ ੨ | paddhar 2 | Standard security practices |
| Level 3 | ਪੱਧਰ ੩ | paddhar 3 | High-assurance requirements |

---

## Open Terminology Questions

These specific terms need community input. If you have a preference, include it in your feedback email:

| English | Current Choice | Alternative | Your Preference? |
|---------|---------------|-------------|-----------------|
| Verification | ਤਸਦੀਕ (tasdeeq) | ਪੜਤਾਲ (paṛtāl) | ? |
| Requirement | ਲੋੜ (loṛ) | ਸ਼ਰਤ (shart) | ? |
| Vulnerability | ਕਮਜ਼ੋਰੀ (kamzorī) | ਖ਼ਾਮੀ (khāmī) | ? |
| Threat Modeling | ਖ਼ਤਰਾ ਮਾਡਲਿੰਗ | ਖ਼ਤਰਾ ਨਮੂਨਾਕਰਨ | ? |
| Compliance | ਪਾਲਣਾ (pālṇā) | ਅਨੁਪਾਲਣ (anupālaṇ) | ? |
| Implementation | ਲਾਗੂਕਰਨ (lāgūkaraṇ) | ਅਮਲ (amal) / ਕਾਰਜ ਰੂਪ ਦੇਣਾ | ? |

---

[← Previous: Introduction (ਮੁਖਬੰਧ)](/blog/asvs-panjabi-review-preface) | [Back to Review Hub](/blog/asvs-panjabi-review-hub)
