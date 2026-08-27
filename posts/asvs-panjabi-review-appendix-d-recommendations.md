---
title: "ASVS Panjabi Review — Appendix D: Recommendations (ਅੰਤਿਕਾ D: ਸਿਫ਼ਾਰਸ਼ਾਂ)"
date: "2026-08-21"
excerpt: "Bilingual 'Appendix D: Recommendations' chapter from the OWASP ASVS 5.0 Panjabi translation, in English and Gurmukhi."
author: "Gurvinder Singh"
tags: ["owasp", "asvs", "panjabi", "translation", "review"]
hidden: true
---

# ASVS Panjabi Review — Appendix D: Recommendations (ਅੰਤਿਕਾ D: ਸਿਫ਼ਾਰਸ਼ਾਂ)

> **Reviewing this translation?** Email feedback to **gurvinder@securityleader.ai** with the subject **"ASVS Panjabi Review — Appendix D: Recommendations"**. Even a single correction is valuable. No GitHub account needed.

> **Source:** OWASP ASVS [PR #3254](https://github.com/OWASP/ASVS/pull/3254) · this is faithful to the official pull request.

---

## Introduction
## ਜਾਣ-ਪਛਾਣ

Whilst preparing version 5.0 of the Application Security Verification Standard (ASVS), it became clear that there were a number of existing and newly suggested items that shouldn't be included as requirements in 5.0. This may have been because they were not in scope for ASVS as per the definition for 5.0 or alternatively it was felt that while they were a good idea, they could not be made mandatory.

Application Security Verification Standard (ASVS) ਦਾ ਸੰਸਕਰਣ 5.0 ਤਿਆਰ ਕਰਦੇ ਸਮੇਂ ਇਹ ਸਪੱਸ਼ਟ ਹੋ ਗਿਆ ਕਿ ਕਈ ਮੌਜੂਦਾ ਅਤੇ ਨਵੇਂ ਸੁਝਾਏ ਗਏ ਨੁਕਤੇ ਅਜਿਹੇ ਸਨ ਜਿਨ੍ਹਾਂ ਨੂੰ 5.0 ਵਿੱਚ ਲੋੜਾਂ ਵਜੋਂ ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਸੀ। ਇਸ ਦਾ ਕਾਰਨ ਇਹ ਹੋ ਸਕਦਾ ਹੈ ਕਿ ਉਹ 5.0 ਦੀ ਪਰਿਭਾਸ਼ਾ ਅਨੁਸਾਰ ASVS ਦੇ ਘੇਰੇ ਵਿੱਚ ਨਹੀਂ ਸਨ, ਜਾਂ ਫਿਰ ਇਹ ਮਹਿਸੂਸ ਕੀਤਾ ਗਿਆ ਕਿ ਭਾਵੇਂ ਉਹ ਚੰਗਾ ਵਿਚਾਰ ਸਨ, ਉਹਨਾਂ ਨੂੰ ਲਾਜ਼ਮੀ ਨਹੀਂ ਬਣਾਇਆ ਜਾ ਸਕਦਾ ਸੀ।

Not wanting to lose all these items entirely, some have been captured in this appendix.

ਇਹਨਾਂ ਸਾਰੇ ਨੁਕਤਿਆਂ ਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਗੁਆਉਣਾ ਨਾ ਚਾਹੁੰਦੇ ਹੋਏ, ਇਹਨਾਂ ਵਿੱਚੋਂ ਕੁਝ ਨੂੰ ਇਸ ਅੰਤਿਕਾ ਵਿੱਚ ਦਰਜ ਕਰ ਲਿਆ ਗਿਆ ਹੈ।

## Recommended, in-scope mechanisms
## ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਗਈਆਂ, ਘੇਰੇ-ਅੰਦਰਲੀਆਂ ਪ੍ਰਣਾਲੀਆਂ

The following items are in-scope for ASVS. They should not be made mandatory but it is strongly recommended to consider them as part of a secure application.

ਹੇਠ ਲਿਖੇ ਨੁਕਤੇ ASVS ਦੇ ਘੇਰੇ ਵਿੱਚ ਹਨ। ਇਹਨਾਂ ਨੂੰ ਲਾਜ਼ਮੀ ਨਹੀਂ ਬਣਾਇਆ ਜਾਣਾ ਚਾਹੀਦਾ, ਪਰ ਇੱਕ ਸੁਰੱਖਿਅਤ ਐਪਲੀਕੇਸ਼ਨ ਦੇ ਹਿੱਸੇ ਵਜੋਂ ਇਹਨਾਂ 'ਤੇ ਵਿਚਾਰ ਕਰਨ ਦੀ ਜ਼ੋਰਦਾਰ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।

* A password strength meter should provided to help users set a stronger password.
* Create a publicly available security.txt file at the root or .well-known directory of the application that clearly defines a link or e-mail address for people to contact owners about security issues.
* Client-side input validation should be enforced in addition to validation at a trusted service layer as this provides a good opportunity to discover when someone has bypassed client-side controls in an attempt to attack the application.
* Prevent accidentally accessible and sensitive pages from appearing in search engines using a robots.txt file, the X-Robots-Tag response header or a robots html meta tag.
* When using GraphQL, implement authorization logic at the business logic layer instead of the GraphQL or resolver layer to avoid having to handle authorization on every separate interface.

* ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ ਵਧੇਰੇ ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ ਸੈੱਟ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਇੱਕ ਪਾਸਵਰਡ ਤਾਕਤ ਮੀਟਰ (password strength meter) ਦਿੱਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।
* ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਰੂਟ ਜਾਂ .well-known ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਇੱਕ ਜਨਤਕ ਤੌਰ 'ਤੇ ਉਪਲਬਧ security.txt ਫ਼ਾਈਲ ਬਣਾਓ ਜੋ ਸਪੱਸ਼ਟ ਤੌਰ 'ਤੇ ਇੱਕ ਲਿੰਕ ਜਾਂ ਈ-ਮੇਲ ਪਤਾ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੀ ਹੋਵੇ, ਤਾਂ ਜੋ ਲੋਕ ਸੁਰੱਖਿਆ ਮੁੱਦਿਆਂ ਬਾਰੇ ਮਾਲਕਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰ ਸਕਣ।
* ਕਲਾਇੰਟ-ਸਾਈਡ ਇਨਪੁੱਟ ਪ੍ਰਮਾਣਿਕਤਾ ਨੂੰ ਇੱਕ ਭਰੋਸੇਯੋਗ ਸੇਵਾ ਪਰਤ 'ਤੇ ਕੀਤੀ ਜਾਣ ਵਾਲੀ ਪ੍ਰਮਾਣਿਕਤਾ ਤੋਂ ਇਲਾਵਾ ਲਾਗੂ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ, ਕਿਉਂਕਿ ਇਹ ਇਹ ਪਤਾ ਲਗਾਉਣ ਦਾ ਵਧੀਆ ਮੌਕਾ ਦਿੰਦੀ ਹੈ ਕਿ ਕਦੋਂ ਕਿਸੇ ਨੇ ਐਪਲੀਕੇਸ਼ਨ 'ਤੇ ਹਮਲਾ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਵਿੱਚ ਕਲਾਇੰਟ-ਸਾਈਡ ਨਿਯੰਤਰਣਾਂ ਨੂੰ ਬਾਈਪਾਸ ਕੀਤਾ ਹੈ।
* robots.txt ਫ਼ਾਈਲ, X-Robots-Tag ਜਵਾਬ ਹੈਡਰ, ਜਾਂ robots html ਮੈਟਾ ਟੈਗ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਚਾਨਕ ਪਹੁੰਚਯੋਗ ਹੋ ਗਏ ਅਤੇ ਸੰਵੇਦਨਸ਼ੀਲ ਪੰਨਿਆਂ ਨੂੰ ਖੋਜ ਇੰਜਣਾਂ ਵਿੱਚ ਦਿਖਾਈ ਦੇਣ ਤੋਂ ਰੋਕੋ।
* GraphQL ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਸਮੇਂ, ਅਧਿਕਾਰੀਕਰਨ ਤਰਕ ਨੂੰ GraphQL ਜਾਂ ਰਿਜ਼ੌਲਵਰ ਪਰਤ ਦੀ ਬਜਾਏ ਕਾਰੋਬਾਰੀ ਤਰਕ ਪਰਤ 'ਤੇ ਲਾਗੂ ਕਰੋ, ਤਾਂ ਜੋ ਹਰ ਵੱਖਰੇ ਇੰਟਰਫ਼ੇਸ 'ਤੇ ਅਧਿਕਾਰੀਕਰਨ ਨੂੰ ਸੰਭਾਲਣਾ ਨਾ ਪਵੇ।

References:

ਹਵਾਲੇ:

     so the Q21 shared-list exemption does not apply — the list is dual-block. Only
     security.txt and RFC are retained (R). -->

* [More information on security.txt including a link to the RFC](https://securitytxt.org/)

* [security.txt ਬਾਰੇ ਹੋਰ ਜਾਣਕਾਰੀ, ਜਿਸ ਵਿੱਚ RFC ਦਾ ਲਿੰਕ ਵੀ ਸ਼ਾਮਲ ਹੈ](https://securitytxt.org/)

## Software Security principles
## ਸਾਫ਼ਟਵੇਅਰ ਸੁਰੱਖਿਆ ਸਿਧਾਂਤ

The following items were previously in ASVS but are not really requirements. Rather they are principles to consider when implementing security controls that when followed will lead to more robust controls. These include:

ਹੇਠ ਲਿਖੇ ਨੁਕਤੇ ਪਹਿਲਾਂ ASVS ਵਿੱਚ ਸਨ ਪਰ ਅਸਲ ਵਿੱਚ ਲੋੜਾਂ ਨਹੀਂ ਹਨ। ਸਗੋਂ ਇਹ ਉਹ ਸਿਧਾਂਤ ਹਨ ਜਿਨ੍ਹਾਂ 'ਤੇ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਲਾਗੂ ਕਰਦੇ ਸਮੇਂ ਵਿਚਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ, ਅਤੇ ਜਿਨ੍ਹਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨ ਨਾਲ ਵਧੇਰੇ ਮਜ਼ਬੂਤ ਨਿਯੰਤਰਣ ਬਣਦੇ ਹਨ। ਇਹਨਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹਨ:

* Security controls should be centralized, simple (economy of design), verifiably secure, and reusable. This should avoid duplicate, missing, or ineffective controls.
* Wherever possible, use previously written and well-vetted security control implementations rather than relying on implementing controls from scratch.
* Ideally, a single access control mechanism should be used to access protected data and resources. All requests should pass through this single mechanism to avoid copy and paste or insecure alternative paths.
* Attribute or feature-based access control is a recommended pattern whereby the code checks the user's authorization for a feature or data item rather than just their role. Permissions should still be allocated using roles.

* ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਕੇਂਦਰੀਕ੍ਰਿਤ, ਸਾਦੇ (ਡਿਜ਼ਾਈਨ ਦੀ ਕਿਫ਼ਾਇਤ, economy of design), ਤਸਦੀਕ-ਯੋਗ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ, ਅਤੇ ਮੁੜ-ਵਰਤੋਂ ਯੋਗ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ। ਇਸ ਨਾਲ ਦੁਹਰਾਏ ਗਏ, ਗ਼ੈਰ-ਹਾਜ਼ਰ, ਜਾਂ ਬੇਅਸਰ ਨਿਯੰਤਰਣਾਂ ਤੋਂ ਬਚਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।
* ਜਿੱਥੇ ਵੀ ਸੰਭਵ ਹੋਵੇ, ਨਿਯੰਤਰਣਾਂ ਨੂੰ ਸ਼ੁਰੂ ਤੋਂ ਲਾਗੂ ਕਰਨ 'ਤੇ ਨਿਰਭਰ ਰਹਿਣ ਦੀ ਬਜਾਏ ਪਹਿਲਾਂ ਤੋਂ ਲਿਖੇ ਹੋਏ ਅਤੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਪਰਖੇ ਹੋਏ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਲਾਗੂਕਰਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।
* ਆਦਰਸ਼ ਰੂਪ ਵਿੱਚ, ਸੁਰੱਖਿਅਤ ਕੀਤੇ ਡਾਟਾ ਅਤੇ ਸਰੋਤਾਂ ਤੱਕ ਪਹੁੰਚ ਲਈ ਇੱਕੋ ਇੱਕ ਪਹੁੰਚ ਨਿਯੰਤਰਣ ਪ੍ਰਣਾਲੀ ਵਰਤੀ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ। ਕਾਪੀ-ਪੇਸਟ ਜਾਂ ਅਸੁਰੱਖਿਅਤ ਬਦਲਵੇਂ ਮਾਰਗਾਂ ਤੋਂ ਬਚਣ ਲਈ ਸਾਰੀਆਂ ਬੇਨਤੀਆਂ ਇਸੇ ਇੱਕੋ ਪ੍ਰਣਾਲੀ ਵਿੱਚੋਂ ਲੰਘਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ।
* ਗੁਣ- ਜਾਂ ਫ਼ੀਚਰ-ਆਧਾਰਿਤ ਪਹੁੰਚ ਨਿਯੰਤਰਣ ਇੱਕ ਸਿਫ਼ਾਰਸ਼ ਕੀਤਾ ਪੈਟਰਨ ਹੈ, ਜਿਸ ਵਿੱਚ ਕੋਡ ਸਿਰਫ਼ ਉਪਭੋਗਤਾ ਦੀ ਭੂਮਿਕਾ ਦੀ ਬਜਾਏ ਕਿਸੇ ਫ਼ੀਚਰ ਜਾਂ ਡਾਟਾ ਆਈਟਮ ਲਈ ਉਸ ਦੇ ਅਧਿਕਾਰੀਕਰਨ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ। ਇਜਾਜ਼ਤਾਂ ਫਿਰ ਵੀ ਭੂਮਿਕਾਵਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਵੰਡੀਆਂ ਜਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ।

## Software Security processes
## ਸਾਫ਼ਟਵੇਅਰ ਸੁਰੱਖਿਆ ਪ੍ਰਕਿਰਿਆਵਾਂ

There are a number of security processes which were removed from ASVS 5.0 but are still a good idea. The OWASP SAMM project may be a good source for how to effectively implement these processes. The items which were previously in ASVS include:

ਕਈ ਸੁਰੱਖਿਆ ਪ੍ਰਕਿਰਿਆਵਾਂ ਅਜਿਹੀਆਂ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ASVS 5.0 ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਸੀ ਪਰ ਜੋ ਫਿਰ ਵੀ ਚੰਗਾ ਵਿਚਾਰ ਹਨ। OWASP SAMM ਪ੍ਰੋਜੈਕਟ ਇਹਨਾਂ ਪ੍ਰਕਿਰਿਆਵਾਂ ਨੂੰ ਅਸਰਦਾਰ ਢੰਗ ਨਾਲ ਲਾਗੂ ਕਰਨ ਦੇ ਤਰੀਕੇ ਲਈ ਇੱਕ ਚੰਗਾ ਸਰੋਤ ਹੋ ਸਕਦਾ ਹੈ। ਜਿਹੜੇ ਨੁਕਤੇ ਪਹਿਲਾਂ ASVS ਵਿੱਚ ਸਨ, ਉਹਨਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹਨ:

* Verify the use of a secure software development lifecycle that addresses security in all stages of development.
* Verify the use of threat modeling for every design change or sprint planning to identify threats, plan for countermeasures, facilitate appropriate risk responses, and guide security testing.
* Verify that all user stories and features contain functional security constraints, such as "As a user, I should be able to view and edit my profile. I should not be able to view or edit anyone else's profile"
* Verify availability of a secure coding checklist, security requirements, guideline, or policy to all developers and testers.
* Verify that an ongoing process exists to ensure that the application source code is free from backdoors, malicious code (e.g., salami attacks, logic bombs, time bombs), and undocumented or hidden features (e.g., Easter eggs, insecure debugging tools). Complying with this section is not possible without complete access to source code, including third-party libraries, and is therefore probably only suitable for applications requiring the very highest levels of security.
* Verify that mechanisms are in place to detect and respond to configuration drift in deployed environments. This may include using immutable infrastructure, automated redeployment from a secure baseline, or drift detection tools that compare current state against approved configurations.
* Verify that configuration hardening is performed on all third-party products, libraries, frameworks, and services as per their individual recommendations.

* ਇੱਕ ਸੁਰੱਖਿਅਤ ਸਾਫ਼ਟਵੇਅਰ ਵਿਕਾਸ ਜੀਵਨ-ਚੱਕਰ ਦੀ ਵਰਤੋਂ ਦੀ ਤਸਦੀਕ ਕਰੋ ਜੋ ਵਿਕਾਸ ਦੇ ਸਾਰੇ ਪੜਾਵਾਂ ਵਿੱਚ ਸੁਰੱਖਿਆ ਨੂੰ ਸੰਬੋਧਿਤ ਕਰਦਾ ਹੈ।
* ਹਰ ਡਿਜ਼ਾਈਨ ਤਬਦੀਲੀ ਜਾਂ ਸਪ੍ਰਿੰਟ ਯੋਜਨਾਬੰਦੀ ਲਈ ਖ਼ਤਰਾ ਮਾਡਲਿੰਗ (threat modeling) ਦੀ ਵਰਤੋਂ ਦੀ ਤਸਦੀਕ ਕਰੋ, ਤਾਂ ਜੋ ਖ਼ਤਰਿਆਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਜਾ ਸਕੇ, ਜਵਾਬੀ-ਉਪਾਵਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਈ ਜਾ ਸਕੇ, ਢੁਕਵੀਆਂ ਜੋਖਮ ਪ੍ਰਤੀਕਿਰਿਆਵਾਂ ਨੂੰ ਸੌਖਾ ਬਣਾਇਆ ਜਾ ਸਕੇ, ਅਤੇ ਸੁਰੱਖਿਆ ਟੈਸਟਿੰਗ ਨੂੰ ਸੇਧ ਦਿੱਤੀ ਜਾ ਸਕੇ।
* ਤਸਦੀਕ ਕਰੋ ਕਿ ਸਾਰੀਆਂ ਉਪਭੋਗਤਾ ਕਹਾਣੀਆਂ (user stories) ਅਤੇ ਫ਼ੀਚਰਾਂ ਵਿੱਚ ਕਾਰਜਾਤਮਕ ਸੁਰੱਖਿਆ ਪਾਬੰਦੀਆਂ ਸ਼ਾਮਲ ਹਨ, ਜਿਵੇਂ ਕਿ "ਇੱਕ ਉਪਭੋਗਤਾ ਵਜੋਂ, ਮੈਨੂੰ ਆਪਣੀ ਪ੍ਰੋਫ਼ਾਈਲ ਵੇਖਣ ਅਤੇ ਸੋਧਣ ਦੇ ਯੋਗ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। ਮੈਨੂੰ ਕਿਸੇ ਹੋਰ ਦੀ ਪ੍ਰੋਫ਼ਾਈਲ ਵੇਖਣ ਜਾਂ ਸੋਧਣ ਦੇ ਯੋਗ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ"।
* ਸਾਰੇ ਵਿਕਾਸਕਾਰਾਂ ਅਤੇ ਟੈਸਟਰਾਂ ਲਈ ਇੱਕ ਸੁਰੱਖਿਅਤ ਕੋਡਿੰਗ ਚੈੱਕਲਿਸਟ, ਸੁਰੱਖਿਆ ਲੋੜਾਂ, ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼, ਜਾਂ ਨੀਤੀ ਦੀ ਉਪਲਬਧਤਾ ਦੀ ਤਸਦੀਕ ਕਰੋ।
* ਤਸਦੀਕ ਕਰੋ ਕਿ ਇੱਕ ਨਿਰੰਤਰ ਪ੍ਰਕਿਰਿਆ ਮੌਜੂਦ ਹੈ ਜੋ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ ਕਿ ਐਪਲੀਕੇਸ਼ਨ ਦਾ ਸਰੋਤ ਕੋਡ ਬੈਕਡੋਰਾਂ, ਖ਼ਤਰਨਾਕ ਕੋਡ (ਜਿਵੇਂ, salami attacks, ਲਾਜਿਕ ਬੰਬ, ਟਾਈਮ ਬੰਬ), ਅਤੇ ਗ਼ੈਰ-ਦਸਤਾਵੇਜ਼ੀ ਜਾਂ ਲੁਕੇ ਹੋਏ ਫ਼ੀਚਰਾਂ (ਜਿਵੇਂ, Easter eggs, ਅਸੁਰੱਖਿਅਤ ਡੀਬੱਗਿੰਗ ਟੂਲ) ਤੋਂ ਮੁਕਤ ਹੈ। ਇਸ ਭਾਗ ਦੀ ਪਾਲਣਾ ਕਰਨਾ ਸਰੋਤ ਕੋਡ ਤੱਕ ਪੂਰੀ ਪਹੁੰਚ ਤੋਂ ਬਿਨਾਂ ਸੰਭਵ ਨਹੀਂ ਹੈ, ਜਿਸ ਵਿੱਚ ਤੀਜੀ-ਧਿਰ ਲਾਇਬ੍ਰੇਰੀਆਂ ਵੀ ਸ਼ਾਮਲ ਹਨ, ਅਤੇ ਇਸ ਲਈ ਇਹ ਸ਼ਾਇਦ ਸਿਰਫ਼ ਉਹਨਾਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਹੀ ਢੁਕਵਾਂ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸੁਰੱਖਿਆ ਦੇ ਸਭ ਤੋਂ ਉੱਚੇ ਪੱਧਰਾਂ ਦੀ ਲੋੜ ਹੈ।
* ਤਸਦੀਕ ਕਰੋ ਕਿ ਤੈਨਾਤ ਕੀਤੇ ਵਾਤਾਵਰਣਾਂ ਵਿੱਚ ਸੰਰਚਨਾ ਡ੍ਰਿਫ਼ਟ (configuration drift) ਦਾ ਪਤਾ ਲਗਾਉਣ ਅਤੇ ਉਸ ਦਾ ਜਵਾਬ ਦੇਣ ਲਈ ਪ੍ਰਣਾਲੀਆਂ ਮੌਜੂਦ ਹਨ। ਇਸ ਵਿੱਚ ਅਟੱਲ ਬੁਨਿਆਦੀ ਢਾਂਚਾ (immutable infrastructure), ਇੱਕ ਸੁਰੱਖਿਅਤ ਆਧਾਰ-ਰੇਖਾ ਤੋਂ ਸਵੈਚਾਲਿਤ ਮੁੜ-ਤੈਨਾਤੀ, ਜਾਂ ਅਜਿਹੇ ਡ੍ਰਿਫ਼ਟ ਖੋਜ ਟੂਲ ਵਰਤਣਾ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਹੈ ਜੋ ਮੌਜੂਦਾ ਅਵਸਥਾ ਦੀ ਤੁਲਨਾ ਪ੍ਰਵਾਨਿਤ ਸੰਰਚਨਾਵਾਂ ਨਾਲ ਕਰਦੇ ਹਨ।
* ਤਸਦੀਕ ਕਰੋ ਕਿ ਸਾਰੇ ਤੀਜੀ-ਧਿਰ ਉਤਪਾਦਾਂ, ਲਾਇਬ੍ਰੇਰੀਆਂ, ਫ੍ਰੇਮਵਰਕਾਂ, ਅਤੇ ਸੇਵਾਵਾਂ 'ਤੇ ਉਹਨਾਂ ਦੀਆਂ ਆਪੋ-ਆਪਣੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੇ ਅਨੁਸਾਰ ਸੰਰਚਨਾ ਸਖ਼ਤੀਕਰਨ (configuration hardening) ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

References:

ਹਵਾਲੇ:

     document name plus a URL, so a single shared list serves both the English and the
     Panjabi block. -->

* [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
* [OWASP Threat modeling](https://owasp.org/www-project-threat-modeling/)
* [OWASP Software Assurance Maturity Model Project](https://owasp.org/www-project-samm/)
* [Microsoft SDL](https://www.microsoft.com/en-us/securityengineering/sdl/)

---

[← Previous: Appendix C: Cryptography Standards (ਅੰਤਿਕਾ C: ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਮਿਆਰ)](/blog/asvs-panjabi-review-appendix-c-cryptography) | [Back to Review Hub](/blog/asvs-panjabi-review-hub) | [Next: Appendix E - Contributors (ਅੰਤਿਕਾ E - ਯੋਗਦਾਨੀ) →](/blog/asvs-panjabi-review-appendix-e-contributors)
