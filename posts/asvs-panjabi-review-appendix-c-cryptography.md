---
title: "ASVS Panjabi Review — Appendix C: Cryptography Standards (ਅੰਤਿਕਾ C: ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਮਿਆਰ)"
date: "2026-08-21"
excerpt: "Bilingual 'Appendix C: Cryptography Standards' chapter from the OWASP ASVS 5.0 Panjabi translation, in English and Gurmukhi."
author: "Gurvinder Singh"
tags: ["owasp", "asvs", "panjabi", "translation", "review"]
hidden: true
---

# ASVS Panjabi Review — Appendix C: Cryptography Standards (ਅੰਤਿਕਾ C: ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਮਿਆਰ)

> **Reviewing this translation?** Email feedback to **gurvinder@securityleader.ai** with the subject **"ASVS Panjabi Review — Appendix C: Cryptography Standards"**. Even a single correction is valuable. No GitHub account needed.

> **Source:** OWASP ASVS [PR #3254](https://github.com/OWASP/ASVS/pull/3254) · this is faithful to the official pull request.

---

The "Cryptography" chapter goes beyond simply defining best practices. It aims to enhance understanding of cryptography principles and encourage the adoption of more resilient, modern security methods. This appendix provides detailed technical information regarding each requirement, complementing the overarching standards outlined in the "Cryptography" chapter.

"ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ" ਅਧਿਆਇ ਸਿਰਫ਼ ਸਭ ਤੋਂ ਵਧੀਆ ਅਮਲਾਂ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਤੋਂ ਅੱਗੇ ਜਾਂਦਾ ਹੈ। ਇਸਦਾ ਉਦੇਸ਼ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਦੇ ਸਿਧਾਂਤਾਂ ਦੀ ਸਮਝ ਨੂੰ ਵਧਾਉਣਾ ਅਤੇ ਵਧੇਰੇ ਲਚਕੀਲੇ, ਆਧੁਨਿਕ ਸੁਰੱਖਿਆ ਤਰੀਕਿਆਂ ਨੂੰ ਅਪਣਾਉਣ ਲਈ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ ਹੈ। ਇਹ ਅੰਤਿਕਾ ਹਰ ਲੋੜ ਬਾਰੇ ਵਿਸਤ੍ਰਿਤ ਤਕਨੀਕੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ, ਜੋ "ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ" ਅਧਿਆਇ ਵਿੱਚ ਦਰਸਾਏ ਗਏ ਸਮੁੱਚੇ ਮਿਆਰਾਂ ਦੀ ਪੂਰਤੀ ਕਰਦੀ ਹੈ।

This appendix defines the level of approval for different cryptographic mechanisms:

* Approved (A) mechanisms can be used in applications.
* Legacy mechanisms (L) should not be used in applications but might still be used for compatibility with existing legacy applications or code only. While the usage of such these mechanisms is currently not considered to be a vulnerability in itself, they should be replaced by more secure and future-proof mechanisms as soon as possible.
* Disallowed mechanisms (D) must not be used because they are currently considered broken or do not provide sufficient security.

ਇਹ ਅੰਤਿਕਾ ਵੱਖ-ਵੱਖ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਵਿਧੀਆਂ ਲਈ ਪ੍ਰਵਾਨਗੀ ਦਾ ਪੱਧਰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੀ ਹੈ:

* ਪ੍ਰਵਾਨਿਤ (Approved, A) ਵਿਧੀਆਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਵਰਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।
* ਪੁਰਾਣੀਆਂ (legacy, L) ਵਿਧੀਆਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਨਹੀਂ ਵਰਤੀਆਂ ਜਾਣੀਆਂ ਚਾਹੀਦੀਆਂ, ਪਰ ਇਹ ਸਿਰਫ਼ ਮੌਜੂਦਾ ਪੁਰਾਣੀਆਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਜਾਂ ਕੋਡ ਨਾਲ ਅਨੁਕੂਲਤਾ ਲਈ ਅਜੇ ਵੀ ਵਰਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ। ਭਾਵੇਂ ਅਜਿਹੀਆਂ ਵਿਧੀਆਂ ਦੀ ਵਰਤੋਂ ਨੂੰ ਇਸ ਵੇਲੇ ਆਪਣੇ ਆਪ ਵਿੱਚ ਇੱਕ ਕਮਜ਼ੋਰੀ ਨਹੀਂ ਮੰਨਿਆ ਜਾਂਦਾ, ਇਹਨਾਂ ਨੂੰ ਜਿੰਨੀ ਜਲਦੀ ਸੰਭਵ ਹੋਵੇ ਵਧੇਰੇ ਸੁਰੱਖਿਅਤ ਅਤੇ ਭਵਿੱਖ-ਸੁਰੱਖਿਅਤ ਵਿਧੀਆਂ ਨਾਲ ਬਦਲਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।
* ਮਨਾਹੀ ਵਾਲੀਆਂ (disallowed, D) ਵਿਧੀਆਂ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤੀਆਂ ਜਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਕਿਉਂਕਿ ਇਹਨਾਂ ਨੂੰ ਇਸ ਵੇਲੇ ਟੁੱਟੀਆਂ ਹੋਈਆਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ ਜਾਂ ਇਹ ਲੋੜੀਂਦੀ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕਰਦੀਆਂ।

This list may be overridden in the context of a given application for various reasons including:

* new evolutions in the field of cryptography;
* compliance with regulation.

ਇਸ ਸੂਚੀ ਨੂੰ ਕਿਸੇ ਦਿੱਤੀ ਗਈ ਐਪਲੀਕੇਸ਼ਨ ਦੇ ਸੰਦਰਭ ਵਿੱਚ ਕਈ ਕਾਰਨਾਂ ਕਰਕੇ ਰੱਦ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹਨ:

* ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਦੇ ਖੇਤਰ ਵਿੱਚ ਨਵੇਂ ਵਿਕਾਸ;
* ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ।

## Cryptographic Inventory and Documentation
## ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਇਨਵੈਂਟਰੀ ਅਤੇ ਦਸਤਾਵੇਜ਼ੀਕਰਨ

This section provides additional information
for V11.1 Cryptographic Inventory and Documentation.

ਇਹ ਭਾਗ V11.1 ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਇਨਵੈਂਟਰੀ ਅਤੇ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਲਈ ਵਾਧੂ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

It is important to ensure that all cryptographic assets, such as algorithms, keys, and certificates, are regularly discovered, inventoried, and assessed. For Level 3, this should include the use of static and dynamic scanning to discover the use of cryptography in an application. Tools such as SAST and DAST may help with this but it is possible that dedicated tools would be needed to get more comprehensive coverage. Freeware examples of tools include:

ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਮਹੱਤਵਪੂਰਨ ਹੈ ਕਿ ਸਾਰੀਆਂ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਸੰਪਤੀਆਂ, ਜਿਵੇਂ ਕਿ ਐਲਗੋਰਿਦਮ, ਕੁੰਜੀਆਂ, ਅਤੇ ਸਰਟੀਫ਼ਿਕੇਟ, ਦੀ ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਖੋਜ ਕੀਤੀ ਜਾਵੇ, ਉਹਨਾਂ ਨੂੰ ਇਨਵੈਂਟਰੀ ਵਿੱਚ ਦਰਜ ਕੀਤਾ ਜਾਵੇ, ਅਤੇ ਉਹਨਾਂ ਦਾ ਮੁਲਾਂਕਣ ਕੀਤਾ ਜਾਵੇ। ਪੱਧਰ 3 ਲਈ, ਇਸ ਵਿੱਚ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਦੀ ਵਰਤੋਂ ਦਾ ਪਤਾ ਲਗਾਉਣ ਲਈ ਸਥਿਰ ਅਤੇ ਗਤੀਸ਼ੀਲ ਸਕੈਨਿੰਗ ਦੀ ਵਰਤੋਂ ਸ਼ਾਮਲ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ। SAST ਅਤੇ DAST ਵਰਗੇ ਟੂਲ ਇਸ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ, ਪਰ ਇਹ ਸੰਭਵ ਹੈ ਕਿ ਵਧੇਰੇ ਵਿਆਪਕ ਕਵਰੇਜ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਮਰਪਿਤ ਟੂਲਾਂ ਦੀ ਲੋੜ ਪਵੇ। ਮੁਫ਼ਤ (freeware) ਟੂਲਾਂ ਦੀਆਂ ਉਦਾਹਰਨਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹਨ:

* [CryptoMon - Network Cryptography Monitor - using eBPF, written in python](https://github.com/Santandersecurityresearch/CryptoMon)
* [Cryptobom Forge Tool: Generating Comprehensive CBOMs from CodeQL Outputs](https://github.com/Santandersecurityresearch/cryptobom-forge)

## Equivalent Strengths of Cryptographic Parameters
## ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਪੈਰਾਮੀਟਰਾਂ ਦੀਆਂ ਬਰਾਬਰ ਮਜ਼ਬੂਤੀਆਂ

The relative security strengths for various cryptographic systems are in this table (from [NIST SP 800-57 Part 1](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), p.71):

ਵੱਖ-ਵੱਖ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਸਿਸਟਮਾਂ ਲਈ ਸਾਪੇਖਿਕ ਸੁਰੱਖਿਆ ਮਜ਼ਬੂਤੀਆਂ ਇਸ ਸਾਰਣੀ ਵਿੱਚ ਦਿੱਤੀਆਂ ਗਈਆਂ ਹਨ ([NIST SP 800-57 Part 1](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), ਪੰਨਾ 71 ਤੋਂ):

| Security Strength | Symmetric Key Algorithms | Finite Field | Integer Factorization | Elliptic Curve |
|--|--|--|--|--|
| <= 80 | 2TDEA | L = 1024 <br> N = 160 | k = 1024 | f = 160-223 |
| 112 | 3TDEA   | L = 2048 <br> N = 224 | k = 2048 | f = 224-255 |
| 128 | AES-128 | L = 3072 <br> N = 256 | k = 3072 | f = 256-383 |
| 192 | AES-192 | L = 7680 <br> N = 384 | k = 7680 | f = 384-511 |
| 256 | AES-256 | L = 15360 <br> N = 512 | k = 15360 | f = 512+ |

| ਸੁਰੱਖਿਆ ਮਜ਼ਬੂਤੀ | ਸਮਮਿਤੀ ਕੁੰਜੀ ਐਲਗੋਰਿਦਮ | ਸੀਮਿਤ ਖੇਤਰ | ਪੂਰਨ ਅੰਕ ਗੁਣਨਖੰਡੀਕਰਨ | ਅੰਡਾਕਾਰ ਵਕਰ |
|--|--|--|--|--|
| <= 80 | 2TDEA | L = 1024 <br> N = 160 | k = 1024 | f = 160-223 |
| 112 | 3TDEA   | L = 2048 <br> N = 224 | k = 2048 | f = 224-255 |
| 128 | AES-128 | L = 3072 <br> N = 256 | k = 3072 | f = 256-383 |
| 192 | AES-192 | L = 7680 <br> N = 384 | k = 7680 | f = 384-511 |
| 256 | AES-256 | L = 15360 <br> N = 512 | k = 15360 | f = 512+ |

Example of applications:

* Finite Field Cryptography: DSA, FFDH, MQV
* Integer Factorization Cryptography: RSA
* Elliptic Curve Cryptography: ECDSA, EdDSA, ECDH, MQV

Note: that this section assumes that no quantum computer exists; if such a computer would exist, the estimates for the last 3 columns would be no longer valid.

ਵਰਤੋਂ ਦੀਆਂ ਉਦਾਹਰਨਾਂ:

* ਸੀਮਿਤ ਖੇਤਰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ: DSA, FFDH, MQV
* ਪੂਰਨ ਅੰਕ ਗੁਣਨਖੰਡੀਕਰਨ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ: RSA
* ਅੰਡਾਕਾਰ ਵਕਰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ: ECDSA, EdDSA, ECDH, MQV

ਧਿਆਨ ਦਿਓ: ਇਹ ਭਾਗ ਇਹ ਮੰਨ ਕੇ ਚੱਲਦਾ ਹੈ ਕਿ ਕੋਈ ਕੁਆਂਟਮ ਕੰਪਿਊਟਰ ਮੌਜੂਦ ਨਹੀਂ ਹੈ; ਜੇ ਅਜਿਹਾ ਕੰਪਿਊਟਰ ਮੌਜੂਦ ਹੁੰਦਾ, ਤਾਂ ਆਖ਼ਰੀ 3 ਕਾਲਮਾਂ ਦੇ ਅੰਦਾਜ਼ੇ ਹੁਣ ਜਾਇਜ਼ ਨਹੀਂ ਰਹਿਣਗੇ।

## Random Values
## ਬੇਤਰਤੀਬ ਮੁੱਲ

This section provides additional information
for V11.5 Random Values.

ਇਹ ਭਾਗ V11.5 ਬੇਤਰਤੀਬ ਮੁੱਲ ਲਈ ਵਾਧੂ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

| Name | Version/Reference | Notes | Status |
|:---|:----|:----|:-:|
| `/dev/random` | Linux 4.8+ [(Oct 2016)](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=818e607b57c94ade9824dad63a96c2ea6b21baf3), also found in iOS, Android, and other Linux-based POSIX operating systems. Based on [RFC7539](https://datatracker.ietf.org/doc/html/rfc7539) | Utilizing ChaCha20 stream. Found in iOS [`SecRandomCopyBytes`](https://developer.apple.com/documentation/security/secrandomcopybytes(_:_:_:)?language=objc) and Android [`Secure Random`](https://developer.android.com/reference/java/security/SecureRandom) with the correct settings provided to each. | A |
| `/dev/urandom` | Linux kernel's special file for providing random data | Provides high-quality, entropy sources from hardware randomness | A |
| `AES-CTR-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | As used in common implementations, such as [Windows CNG API `BCryptGenRandom`](https://learn.microsoft.com/en-us/windows/win32/api/bcrypt/nf-bcrypt-bcryptgenrandom) set by [`BCRYPT_RNG_ALGORITHM`](https://learn.microsoft.com/en-us/windows/win32/seccng/cng-algorithm-identifiers). | A |
| `HMAC-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | | A |
| `Hash-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | | A |
| `getentropy()` | [OpenBSD](https://man.openbsd.org/getentropy.2), available in [Linux glibc 2.25+](https://man7.org/linux/man-pages/man3/getentropy.3.html) and [macOS 10.12+](https://support.apple.com/en-gb/guide/security/seca0c73a75b/web) | Provides secure random bytes directly from the kernel's entropy source with a straightforward and minimal API. It’s more modern and avoids pitfalls associated with older APIs. | A |

| ਨਾਮ | ਵਰਜਨ/ਹਵਾਲਾ | ਟਿੱਪਣੀਆਂ | ਸਥਿਤੀ |
|:---|:----|:----|:-:|
| `/dev/random` | Linux 4.8+ [(ਅਕਤੂਬਰ 2016)](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=818e607b57c94ade9824dad63a96c2ea6b21baf3), iOS, Android, ਅਤੇ ਹੋਰ Linux-ਆਧਾਰਿਤ POSIX ਓਪਰੇਟਿੰਗ ਸਿਸਟਮਾਂ ਵਿੱਚ ਵੀ ਮਿਲਦਾ ਹੈ। [RFC7539](https://datatracker.ietf.org/doc/html/rfc7539) 'ਤੇ ਆਧਾਰਿਤ | ChaCha20 ਸਟ੍ਰੀਮ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। iOS [`SecRandomCopyBytes`](https://developer.apple.com/documentation/security/secrandomcopybytes(_:_:_:)?language=objc) ਅਤੇ Android [`Secure Random`](https://developer.android.com/reference/java/security/SecureRandom) ਵਿੱਚ ਮਿਲਦਾ ਹੈ, ਬਸ਼ਰਤੇ ਹਰ ਇੱਕ ਨੂੰ ਸਹੀ ਸੈਟਿੰਗਾਂ ਦਿੱਤੀਆਂ ਗਈਆਂ ਹੋਣ। | A |
| `/dev/urandom` | ਬੇਤਰਤੀਬ ਡਾਟਾ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ Linux ਕਰਨਲ ਦੀ ਖ਼ਾਸ ਫ਼ਾਈਲ | ਹਾਰਡਵੇਅਰ ਬੇਤਰਤੀਬੀ ਤੋਂ ਉੱਚ-ਗੁਣਵੱਤਾ ਵਾਲੇ ਐਂਟਰੋਪੀ ਸਰੋਤ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ | A |
| `AES-CTR-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | ਆਮ ਲਾਗੂਕਰਨਾਂ ਵਿੱਚ ਵਰਤੇ ਜਾਣ ਅਨੁਸਾਰ, ਜਿਵੇਂ ਕਿ [Windows CNG API `BCryptGenRandom`](https://learn.microsoft.com/en-us/windows/win32/api/bcrypt/nf-bcrypt-bcryptgenrandom), ਜੋ [`BCRYPT_RNG_ALGORITHM`](https://learn.microsoft.com/en-us/windows/win32/seccng/cng-algorithm-identifiers) ਦੁਆਰਾ ਸੈੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। | A |
| `HMAC-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | | A |
| `Hash-DRBG` | [NIST SP800-90A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf) | | A |
| `getentropy()` | [OpenBSD](https://man.openbsd.org/getentropy.2), [Linux glibc 2.25+](https://man7.org/linux/man-pages/man3/getentropy.3.html) ਅਤੇ [macOS 10.12+](https://support.apple.com/en-gb/guide/security/seca0c73a75b/web) ਵਿੱਚ ਉਪਲਬਧ | ਇੱਕ ਸਿੱਧੇ ਅਤੇ ਘੱਟੋ-ਘੱਟ API ਨਾਲ ਸਿੱਧਾ ਕਰਨਲ ਦੇ ਐਂਟਰੋਪੀ ਸਰੋਤ ਤੋਂ ਸੁਰੱਖਿਅਤ ਬੇਤਰਤੀਬ ਬਾਈਟ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਹ ਵਧੇਰੇ ਆਧੁਨਿਕ ਹੈ ਅਤੇ ਪੁਰਾਣੇ API ਨਾਲ ਜੁੜੀਆਂ ਸਮੱਸਿਆਵਾਂ ਤੋਂ ਬਚਦਾ ਹੈ। | A |

The underlying hash function used with HMAC-DRBG or Hash-DRBG must be approved for this usage.

HMAC-DRBG ਜਾਂ Hash-DRBG ਨਾਲ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਅੰਤਰੀਵ ਹੈਸ਼ ਫੰਕਸ਼ਨ ਇਸ ਵਰਤੋਂ ਲਈ ਪ੍ਰਵਾਨਿਤ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ।

## Cipher Algorithms
## ਸਾਈਫ਼ਰ ਐਲਗੋਰਿਦਮ

This section provides additional information
for V11.3 Encryption Algorithms.

ਇਹ ਭਾਗ V11.3 ਏਨਕ੍ਰਿਪਸ਼ਨ ਐਲਗੋਰਿਦਮ ਲਈ ਵਾਧੂ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

Approved cipher algorithms are listed in order of preference.

ਪ੍ਰਵਾਨਿਤ ਸਾਈਫ਼ਰ ਐਲਗੋਰਿਦਮ ਤਰਜੀਹ ਦੇ ਕ੍ਰਮ ਵਿੱਚ ਸੂਚੀਬੱਧ ਕੀਤੇ ਗਏ ਹਨ।

| Symmetric Key Algorithms | Reference | Status |
| ------ | ------ |:-:|
| AES-256 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | A |
| Salsa20 | [Salsa 20 specification](https://cr.yp.to/snuffle/spec.pdf) | A |
| XChaCha20 | [XChaCha20 Draft](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha-03) | A |
| XSalsa20 | [Extending the Salsa20 nonce](https://cr.yp.to/snuffle/xsalsa-20110204.pdf) | A |
| ChaCha20 | [RFC 8439](https://www.rfc-editor.org/info/rfc8439) | A |
| AES-192 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | A |
| AES-128 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | L |
| 2TDEA | | D |
| TDEA (3DES/3DEA) | | D |
| IDEA | | D |
| RC4 | | D |
| Blowfish| | D |
| ARC4 | | D |
| DES | | D |

| ਸਮਮਿਤੀ ਕੁੰਜੀ ਐਲਗੋਰਿਦਮ | ਹਵਾਲਾ | ਸਥਿਤੀ |
| ------ | ------ |:-:|
| AES-256 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | A |
| Salsa20 | [Salsa 20 specification](https://cr.yp.to/snuffle/spec.pdf) | A |
| XChaCha20 | [XChaCha20 Draft](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha-03) | A |
| XSalsa20 | [Extending the Salsa20 nonce](https://cr.yp.to/snuffle/xsalsa-20110204.pdf) | A |
| ChaCha20 | [RFC 8439](https://www.rfc-editor.org/info/rfc8439) | A |
| AES-192 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | A |
| AES-128 | [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final) | L |
| 2TDEA | | D |
| TDEA (3DES/3DEA) | | D |
| IDEA | | D |
| RC4 | | D |
| Blowfish| | D |
| ARC4 | | D |
| DES | | D |

### AES Cipher Modes
### AES ਸਾਈਫ਼ਰ ਮੋਡ

Block ciphers, such as AES, can be used with different modes of operations. Many modes of operations, such as Electronic codebook (ECB), are insecure and must not be used. The Galois/Counter Mode (GCM) and Counter with cipher block chaining message authentication code (CCM) modes of operations provide authenticated encryption and should be used in modern applications.

ਬਲਾਕ ਸਾਈਫ਼ਰ, ਜਿਵੇਂ ਕਿ AES, ਵੱਖ-ਵੱਖ ਸੰਚਾਲਨ ਮੋਡਾਂ (modes of operation) ਨਾਲ ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ। ਕਈ ਸੰਚਾਲਨ ਮੋਡ, ਜਿਵੇਂ ਕਿ Electronic codebook (ECB), ਅਸੁਰੱਖਿਅਤ ਹਨ ਅਤੇ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤੇ ਜਾਣੇ ਚਾਹੀਦੇ। Galois/Counter Mode (GCM) ਅਤੇ Counter with cipher block chaining message authentication code (CCM) ਸੰਚਾਲਨ ਮੋਡ ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ ਏਨਕ੍ਰਿਪਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ ਅਤੇ ਆਧੁਨਿਕ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਵਰਤੇ ਜਾਣੇ ਚਾਹੀਦੇ ਹਨ।

Approved modes are listed in order of preference.

ਪ੍ਰਵਾਨਿਤ ਮੋਡ ਤਰਜੀਹ ਦੇ ਕ੍ਰਮ ਵਿੱਚ ਸੂਚੀਬੱਧ ਕੀਤੇ ਗਏ ਹਨ।

| Mode | Authenticated | Reference | Status | Restriction |
|--|--|--|:-:|--|
| GCM | Yes | [NIST SP 800-38D](https://csrc.nist.gov/pubs/sp/800/38/d/final) | A | |
| CCM | Yes | [NIST SP 800-38C](https://csrc.nist.gov/pubs/sp/800/38/c/upd1/final) | A | |
| CBC | No | [NIST SP 800-38A](https://csrc.nist.gov/pubs/sp/800/38/a/final) | L | |
| CCM-8 | Yes | | D | |
| ECB | No | | D | |
| CFB | No | | D | |
| OFB | No | | D | |
| CTR | No | | D | |

| ਮੋਡ | ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ | ਹਵਾਲਾ | ਸਥਿਤੀ | ਪਾਬੰਦੀ |
|--|--|--|:-:|--|
| GCM | ਹਾਂ | [NIST SP 800-38D](https://csrc.nist.gov/pubs/sp/800/38/d/final) | A | |
| CCM | ਹਾਂ | [NIST SP 800-38C](https://csrc.nist.gov/pubs/sp/800/38/c/upd1/final) | A | |
| CBC | ਨਹੀਂ | [NIST SP 800-38A](https://csrc.nist.gov/pubs/sp/800/38/a/final) | L | |
| CCM-8 | ਹਾਂ | | D | |
| ECB | ਨਹੀਂ | | D | |
| CFB | ਨਹੀਂ | | D | |
| OFB | ਨਹੀਂ | | D | |
| CTR | ਨਹੀਂ | | D | |

Notes:

* All encrypted messages must be authenticated. For ANY use of CBC mode there MUST be an associated hashing MAC algorithm to validate the message. In general, this MUST be applied in the Encrypt-Then-Hash method (but TLS 1.2 uses Hash-Then-Encrypt instead). If this cannot be guaranteed, then CBC MUST NOT be used. The only application where encryption without a MAC algorithm is allowed is disk encryption.
* If CBC is used, it shall be guaranteed that the verification of the padding is performed in constant time.
* When using CCM-8, the MAC tag only has 64 bits of security. This does not conform to requirement 11.2.3 which requires at least 128 bits of security.
* Disk encryption is considered out of scope for the ASVS. Therefore this appendix does not list any approved method for disk encryption. For this usage, encryption without authentication is usually accepted and the XTS, XEX and LRW modes are typically used.

ਟਿੱਪਣੀਆਂ:

* ਸਾਰੇ ਏਨਕ੍ਰਿਪਟ ਕੀਤੇ ਸੁਨੇਹਿਆਂ ਦਾ ਪ੍ਰਮਾਣੀਕਰਨ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ। CBC ਮੋਡ ਦੀ ਕਿਸੇ ਵੀ ਵਰਤੋਂ ਲਈ ਸੁਨੇਹੇ ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਵਾਸਤੇ ਇੱਕ ਸੰਬੰਧਿਤ ਹੈਸ਼ਿੰਗ MAC ਐਲਗੋਰਿਦਮ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਆਮ ਤੌਰ 'ਤੇ, ਇਸਨੂੰ Encrypt-Then-Hash ਵਿਧੀ ਵਿੱਚ ਲਾਗੂ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ (ਪਰ TLS 1.2 ਇਸਦੀ ਬਜਾਏ Hash-Then-Encrypt ਵਰਤਦਾ ਹੈ)। ਜੇ ਇਸਦੀ ਗਾਰੰਟੀ ਨਹੀਂ ਦਿੱਤੀ ਜਾ ਸਕਦੀ, ਤਾਂ CBC ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤਿਆ ਜਾਣਾ ਚਾਹੀਦਾ। ਇੱਕੋ-ਇੱਕ ਵਰਤੋਂ ਜਿੱਥੇ MAC ਐਲਗੋਰਿਦਮ ਤੋਂ ਬਿਨਾਂ ਏਨਕ੍ਰਿਪਸ਼ਨ ਦੀ ਆਗਿਆ ਹੈ, ਉਹ ਡਿਸਕ ਏਨਕ੍ਰਿਪਸ਼ਨ ਹੈ।
* ਜੇ CBC ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਇਹ ਗਾਰੰਟੀ ਦਿੱਤੀ ਜਾਣੀ ਲਾਜ਼ਮੀ ਹੈ ਕਿ ਪੈਡਿੰਗ ਦੀ ਤਸਦੀਕ ਸਥਿਰ ਸਮੇਂ (constant time) ਵਿੱਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।
* CCM-8 ਵਰਤਦੇ ਸਮੇਂ, MAC ਟੈਗ ਕੋਲ ਸਿਰਫ਼ 64 ਬਿੱਟ ਸੁਰੱਖਿਆ ਹੁੰਦੀ ਹੈ। ਇਹ ਲੋੜ 11.2.3 ਦੀ ਪਾਲਣਾ ਨਹੀਂ ਕਰਦਾ, ਜਿਸ ਲਈ ਘੱਟੋ-ਘੱਟ 128 ਬਿੱਟ ਸੁਰੱਖਿਆ ਦੀ ਲੋੜ ਹੈ।
* ਡਿਸਕ ਏਨਕ੍ਰਿਪਸ਼ਨ ਨੂੰ ASVS ਦੇ ਘੇਰੇ ਤੋਂ ਬਾਹਰ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਲਈ ਇਹ ਅੰਤਿਕਾ ਡਿਸਕ ਏਨਕ੍ਰਿਪਸ਼ਨ ਲਈ ਕੋਈ ਪ੍ਰਵਾਨਿਤ ਵਿਧੀ ਸੂਚੀਬੱਧ ਨਹੀਂ ਕਰਦੀ। ਇਸ ਵਰਤੋਂ ਲਈ, ਪ੍ਰਮਾਣੀਕਰਨ ਤੋਂ ਬਿਨਾਂ ਏਨਕ੍ਰਿਪਸ਼ਨ ਆਮ ਤੌਰ 'ਤੇ ਸਵੀਕਾਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਅਤੇ ਆਮ ਤੌਰ 'ਤੇ XTS, XEX ਅਤੇ LRW ਮੋਡ ਵਰਤੇ ਜਾਂਦੇ ਹਨ।

### Key Wrapping
### ਕੁੰਜੀ ਰੈਪਿੰਗ

Cryptographic key wrap (and corresponding key unwrap) is a method of protecting an existing key by encapsulating (i.e., wrapping) it by employing an additional encryption mechanism so that the original key is not obviously exposed, e.g., during a transfer. This additional key used to protect the original key is referred to as the wrap key.

ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਕੁੰਜੀ ਰੈਪ (key wrap) — ਅਤੇ ਇਸ ਨਾਲ ਸੰਬੰਧਿਤ ਕੁੰਜੀ ਅਨਰੈਪ (key unwrap) — ਇੱਕ ਮੌਜੂਦਾ ਕੁੰਜੀ ਨੂੰ ਇੱਕ ਵਾਧੂ ਏਨਕ੍ਰਿਪਸ਼ਨ ਵਿਧੀ ਲਗਾ ਕੇ ਸਮੇਟ ਕੇ (ਭਾਵ, ਰੈਪ ਕਰਕੇ) ਸੁਰੱਖਿਅਤ ਕਰਨ ਦਾ ਇੱਕ ਤਰੀਕਾ ਹੈ, ਤਾਂ ਜੋ ਅਸਲ ਕੁੰਜੀ ਸਪੱਸ਼ਟ ਤੌਰ 'ਤੇ ਉਜਾਗਰ ਨਾ ਹੋਵੇ, ਜਿਵੇਂ ਕਿ ਕਿਸੇ ਤਬਾਦਲੇ ਦੌਰਾਨ। ਅਸਲ ਕੁੰਜੀ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਇਸ ਵਾਧੂ ਕੁੰਜੀ ਨੂੰ ਰੈਪ ਕੁੰਜੀ (wrap key) ਕਿਹਾ ਜਾਂਦਾ ਹੈ।

This operation may be performed when it is desirable to protect keys in places deemed untrustworthy, or to send sensitive keys over untrusted networks or within applications.
However, serious consideration should be given to understanding the nature (e.g., the identity and the purpose) of the original key prior to committing to a wrap/unwrap procedure as this may have repercussions for both source and target systems/applications in terms of security and especially compliance which may include audit trails of a key's function (e.g., signing) as well as appropriate key storage.

ਇਹ ਕਾਰਵਾਈ ਉਦੋਂ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ ਜਦੋਂ ਭਰੋਸੇਯੋਗ ਨਾ ਸਮਝੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਥਾਵਾਂ 'ਤੇ ਕੁੰਜੀਆਂ ਦੀ ਸੁਰੱਖਿਆ ਕਰਨੀ ਲੋੜੀਂਦੀ ਹੋਵੇ, ਜਾਂ ਸੰਵੇਦਨਸ਼ੀਲ ਕੁੰਜੀਆਂ ਨੂੰ ਗ਼ੈਰ-ਭਰੋਸੇਯੋਗ ਨੈੱਟਵਰਕਾਂ ਉੱਤੇ ਜਾਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਦੇ ਅੰਦਰ ਭੇਜਣਾ ਹੋਵੇ।
ਫਿਰ ਵੀ, ਰੈਪ/ਅਨਰੈਪ ਪ੍ਰਕਿਰਿਆ ਅਪਣਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਅਸਲ ਕੁੰਜੀ ਦੀ ਪ੍ਰਕਿਰਤੀ (ਜਿਵੇਂ, ਉਸਦੀ ਪਛਾਣ ਅਤੇ ਮੰਤਵ) ਨੂੰ ਸਮਝਣ 'ਤੇ ਗੰਭੀਰ ਵਿਚਾਰ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ, ਕਿਉਂਕਿ ਇਸਦੇ ਸੁਰੱਖਿਆ ਅਤੇ ਖ਼ਾਸ ਕਰਕੇ ਪਾਲਣਾ (compliance) ਦੇ ਪੱਖੋਂ ਸਰੋਤ ਅਤੇ ਟੀਚਾ ਦੋਵੇਂ ਸਿਸਟਮਾਂ/ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਨਤੀਜੇ ਹੋ ਸਕਦੇ ਹਨ, ਜਿਸ ਵਿੱਚ ਕੁੰਜੀ ਦੇ ਕਾਰਜ (ਜਿਵੇਂ, ਦਸਤਖ਼ਤ ਕਰਨਾ) ਦੇ ਆਡਿਟ ਟ੍ਰੇਲ ਦੇ ਨਾਲ-ਨਾਲ ਢੁਕਵੀਂ ਕੁੰਜੀ ਸਟੋਰੇਜ ਵੀ ਸ਼ਾਮਲ ਹੋ ਸਕਦੀ ਹੈ।

Specifically, AES-256 MUST be used for key wrapping, following [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) and considering forward-looking provisions against the quantum threat. Cipher modes using AES are the following, in order of preference:

ਖ਼ਾਸ ਤੌਰ 'ਤੇ, ਕੁੰਜੀ ਰੈਪਿੰਗ ਲਈ AES-256 ਵਰਤਿਆ ਜਾਣਾ ਲਾਜ਼ਮੀ ਹੈ, [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ ਅਤੇ ਕੁਆਂਟਮ ਖ਼ਤਰੇ ਵਿਰੁੱਧ ਭਵਿੱਖਮੁਖੀ ਪ੍ਰਬੰਧਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਦੇ ਹੋਏ। AES ਵਰਤਣ ਵਾਲੇ ਸਾਈਫ਼ਰ ਮੋਡ ਹੇਠ ਲਿਖੇ ਹਨ, ਤਰਜੀਹ ਦੇ ਕ੍ਰਮ ਵਿੱਚ:

| Key Wrapping | Reference | Status |
|--|--|:-:|
| KW | [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) | A |
| KWP | [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) | A |

| ਕੁੰਜੀ ਰੈਪਿੰਗ | ਹਵਾਲਾ | ਸਥਿਤੀ |
|--|--|:-:|
| KW | [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) | A |
| KWP | [NIST SP 800-38F](https://csrc.nist.gov/pubs/sp/800/38/f/final) | A |

AES-192 and AES-128 MAY be used if the use case demands it, but its motivation MUST be documented in the entity's cryptography inventory.

ਜੇ ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ ਮੰਗ ਕਰਦਾ ਹੈ ਤਾਂ AES-192 ਅਤੇ AES-128 ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ, ਪਰ ਇਸਦਾ ਕਾਰਨ ਇਕਾਈ ਦੀ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਇਨਵੈਂਟਰੀ ਵਿੱਚ ਦਸਤਾਵੇਜ਼ ਕੀਤਾ ਜਾਣਾ ਲਾਜ਼ਮੀ ਹੈ।

### Authenticated Encryption
### ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ ਏਨਕ੍ਰਿਪਸ਼ਨ

With the exception of disk encryption, encrypted data must be protected against unauthorized modification using some form of authenticated encryption (AE) scheme, usually using an authenticated encryption with associated data (AEAD) scheme.

ਡਿਸਕ ਏਨਕ੍ਰਿਪਸ਼ਨ ਨੂੰ ਛੱਡ ਕੇ, ਏਨਕ੍ਰਿਪਟ ਕੀਤੇ ਡਾਟੇ ਨੂੰ ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ ਏਨਕ੍ਰਿਪਸ਼ਨ (authenticated encryption, AE) ਸਕੀਮ ਦੇ ਕਿਸੇ ਰੂਪ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਣਅਧਿਕਾਰਤ ਸੋਧ ਤੋਂ ਸੁਰੱਖਿਅਤ ਰੱਖਿਆ ਜਾਣਾ ਲਾਜ਼ਮੀ ਹੈ, ਆਮ ਤੌਰ 'ਤੇ ਸੰਬੰਧਿਤ ਡਾਟੇ ਸਹਿਤ ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ ਏਨਕ੍ਰਿਪਸ਼ਨ (authenticated encryption with associated data, AEAD) ਸਕੀਮ ਦੀ ਵਰਤੋਂ ਕਰਕੇ।

The application should preferably use an approved AEAD scheme. It might alternatively combine an approved cipher scheme and an approved MAC algorithm with a Encrypt-then-MAC construct.

ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਤਰਜੀਹੀ ਤੌਰ 'ਤੇ ਇੱਕ ਪ੍ਰਵਾਨਿਤ AEAD ਸਕੀਮ ਵਰਤਣੀ ਚਾਹੀਦੀ ਹੈ। ਬਦਲਵੇਂ ਤੌਰ 'ਤੇ ਇਹ ਇੱਕ ਪ੍ਰਵਾਨਿਤ ਸਾਈਫ਼ਰ ਸਕੀਮ ਅਤੇ ਇੱਕ ਪ੍ਰਵਾਨਿਤ MAC ਐਲਗੋਰਿਦਮ ਨੂੰ Encrypt-then-MAC ਬਣਤਰ ਨਾਲ ਜੋੜ ਸਕਦੀ ਹੈ।

MAC-then-encrypt is still allowed for compatibility with legacy applications. It is used in TLS v1.2 with old ciphers suites.

ਪੁਰਾਣੀਆਂ (legacy) ਐਪਲੀਕੇਸ਼ਨਾਂ ਨਾਲ ਅਨੁਕੂਲਤਾ ਲਈ MAC-then-encrypt ਦੀ ਅਜੇ ਵੀ ਆਗਿਆ ਹੈ। ਇਹ TLS v1.2 ਵਿੱਚ ਪੁਰਾਣੇ ਸਾਈਫ਼ਰ ਸੂਟਾਂ ਨਾਲ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।

| AEAD mechanism | Reference | Status |
|---|---------|:-:|
|AES-GCM | [SP 800-38D](https://csrc.nist.gov/pubs/sp/800/38/d/final) | A |
|AES-CCM  | [SP 800-38C](https://csrc.nist.gov/pubs/sp/800/38/c/upd1/final) | A |
|ChaCha-Poly1305 | [RFC 7539](https://datatracker.ietf.org/doc/html/rfc7539) | A |
|AEGIS-256 | [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|AEGIS-128 | [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|AEGIS-128L| [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|Encrypt-then-MAC | | A |
|MAC-then-encrypt | | L |

| AEAD ਵਿਧੀ | ਹਵਾਲਾ | ਸਥਿਤੀ |
|---|---------|:-:|
|AES-GCM | [SP 800-38D](https://csrc.nist.gov/pubs/sp/800/38/d/final) | A |
|AES-CCM  | [SP 800-38C](https://csrc.nist.gov/pubs/sp/800/38/c/upd1/final) | A |
|ChaCha-Poly1305 | [RFC 7539](https://datatracker.ietf.org/doc/html/rfc7539) | A |
|AEGIS-256 | [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|AEGIS-128 | [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|AEGIS-128L| [AEGIS: A Fast Authenticated Encryption Algorithm (v1.1)](https://competitions.cr.yp.to/round3/aegisv11.pdf) | A |
|Encrypt-then-MAC | | A |
|MAC-then-encrypt | | L |

## Hash Functions
## ਹੈਸ਼ ਫੰਕਸ਼ਨ

This section provides additional information
for V11.4 Hashing and Hash-based Functions.

ਇਹ ਭਾਗ V11.4 ਹੈਸ਼ਿੰਗ ਅਤੇ ਹੈਸ਼-ਆਧਾਰਿਤ ਫੰਕਸ਼ਨ ਲਈ ਵਾਧੂ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

### Hash Functions for General Use Cases
### ਆਮ ਵਰਤੋਂ ਦੇ ਮਾਮਲਿਆਂ ਲਈ ਹੈਸ਼ ਫੰਕਸ਼ਨ

The following table lists hash functions approved in general cryptographic use cases such as digital signatures:

* Approved hash functions provide strong collision resistance and are suitable for high-security applications.
* Some of these algorithms offer strong resistance to attacks when used with proper cryptographic key management, and so are additionally approved for HMAC, KDF, and RBG functions.
* Hash function with less than 254 bit of output have insufficient collision resistance and must not be used for digital signature or other applications requiring collision resistance. For other usages, they might be used for compatibility and verification ONLY with legacy systems but must not be used in new designs.

ਹੇਠ ਦਿੱਤੀ ਸਾਰਣੀ ਆਮ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਵਰਤੋਂ ਦੇ ਮਾਮਲਿਆਂ, ਜਿਵੇਂ ਕਿ ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤ, ਵਿੱਚ ਪ੍ਰਵਾਨਿਤ ਹੈਸ਼ ਫੰਕਸ਼ਨ ਸੂਚੀਬੱਧ ਕਰਦੀ ਹੈ:

* ਪ੍ਰਵਾਨਿਤ ਹੈਸ਼ ਫੰਕਸ਼ਨ ਮਜ਼ਬੂਤ ਟੱਕਰ ਰੋਧਕਤਾ (collision resistance) ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ ਅਤੇ ਉੱਚ-ਸੁਰੱਖਿਆ ਵਾਲੀਆਂ ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਢੁਕਵੇਂ ਹਨ।
* ਇਹਨਾਂ ਵਿੱਚੋਂ ਕੁਝ ਐਲਗੋਰਿਦਮ ਸਹੀ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਕੁੰਜੀ ਪ੍ਰਬੰਧਨ ਨਾਲ ਵਰਤੇ ਜਾਣ 'ਤੇ ਹਮਲਿਆਂ ਪ੍ਰਤੀ ਮਜ਼ਬੂਤ ਰੋਧਕਤਾ ਦਿੰਦੇ ਹਨ, ਅਤੇ ਇਸ ਲਈ ਇਹ HMAC, KDF, ਅਤੇ RBG ਫੰਕਸ਼ਨਾਂ ਲਈ ਵੀ ਪ੍ਰਵਾਨਿਤ ਹਨ।
* 254 ਬਿੱਟ ਤੋਂ ਘੱਟ ਆਉਟਪੁੱਟ ਵਾਲੇ ਹੈਸ਼ ਫੰਕਸ਼ਨਾਂ ਵਿੱਚ ਨਾਕਾਫ਼ੀ ਟੱਕਰ ਰੋਧਕਤਾ ਹੁੰਦੀ ਹੈ ਅਤੇ ਇਹ ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤ ਜਾਂ ਟੱਕਰ ਰੋਧਕਤਾ ਦੀ ਲੋੜ ਵਾਲੇ ਹੋਰ ਕਾਰਜਾਂ ਲਈ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤੇ ਜਾਣੇ ਚਾਹੀਦੇ। ਹੋਰ ਵਰਤੋਂ ਦੇ ਮਾਮਲਿਆਂ ਲਈ, ਇਹ ਸਿਰਫ਼ ਪੁਰਾਣੇ (legacy) ਸਿਸਟਮਾਂ ਨਾਲ ਅਨੁਕੂਲਤਾ ਅਤੇ ਤਸਦੀਕ ਵਾਸਤੇ ਹੀ ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ, ਪਰ ਇਹ ਨਵੇਂ ਡਿਜ਼ਾਈਨਾਂ ਵਿੱਚ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤੇ ਜਾਣੇ ਚਾਹੀਦੇ।

| Hash function | Reference | Status | Restrictions |
| ------ | ----------- |:-:| ---------- |
| SHA3-512 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-512 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA3-384 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-384 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA3-256 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-512/256 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA-256 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHAKE256 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| BLAKE2s | [BLAKE2: simpler, smaller, fast as MD5](https://eprint.iacr.org/2013/322) | A | |
| BLAKE2b | [BLAKE2: simpler, smaller, fast as MD5](https://eprint.iacr.org/2013/322) | A | |
| BLAKE3 | [BLAKE3 one function, fast everywhere](https://github.com/BLAKE3-team/BLAKE3-specs/raw/master/blake3.pdf) | A | |
| SHA-224 | [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | L | Not suitable for HMAC, KDF, RBG, digital signatures |
| SHA-512/224 | [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | L | Not suitable for HMAC, KDF, RBG, digital signatures |
| SHA3-224 | [FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | L | Not suitable for HMAC, KDF, RBG, digital signatures |
| SHA-1 | [RFC 3174](https://www.rfc-editor.org/info/rfc3174) & [RFC 6194](https://www.rfc-editor.org/info/rfc6194) | L | Not suitable for HMAC, KDF, RBG, digital signatures |
| CRC (any length) |  | D |  |
| MD4 | [RFC 1320](https://www.rfc-editor.org/info/rfc1320) | D | |
| MD5 | [RFC 1321](https://www.rfc-editor.org/info/rfc1321) | D | |

| ਹੈਸ਼ ਫੰਕਸ਼ਨ | ਹਵਾਲਾ | ਸਥਿਤੀ | ਪਾਬੰਦੀਆਂ |
| ------ | ----------- |:-:| ---------- |
| SHA3-512 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-512 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA3-384 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-384 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA3-256 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| SHA-512/256 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHA-256 |[FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | A | |
| SHAKE256 |[FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | A | |
| BLAKE2s | [BLAKE2: simpler, smaller, fast as MD5](https://eprint.iacr.org/2013/322) | A | |
| BLAKE2b | [BLAKE2: simpler, smaller, fast as MD5](https://eprint.iacr.org/2013/322) | A | |
| BLAKE3 | [BLAKE3 one function, fast everywhere](https://github.com/BLAKE3-team/BLAKE3-specs/raw/master/blake3.pdf) | A | |
| SHA-224 | [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | L | HMAC, KDF, RBG, ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤਾਂ ਲਈ ਢੁਕਵਾਂ ਨਹੀਂ |
| SHA-512/224 | [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | L | HMAC, KDF, RBG, ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤਾਂ ਲਈ ਢੁਕਵਾਂ ਨਹੀਂ |
| SHA3-224 | [FIPS 202](https://csrc.nist.gov/pubs/fips/202/final) | L | HMAC, KDF, RBG, ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤਾਂ ਲਈ ਢੁਕਵਾਂ ਨਹੀਂ |
| SHA-1 | [RFC 3174](https://www.rfc-editor.org/info/rfc3174) & [RFC 6194](https://www.rfc-editor.org/info/rfc6194) | L | HMAC, KDF, RBG, ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤਾਂ ਲਈ ਢੁਕਵਾਂ ਨਹੀਂ |
| CRC (ਕੋਈ ਵੀ ਲੰਬਾਈ) |  | D |  |
| MD4 | [RFC 1320](https://www.rfc-editor.org/info/rfc1320) | D | |
| MD5 | [RFC 1321](https://www.rfc-editor.org/info/rfc1321) | D | |

### Hash Functions for Password Storage
### ਪਾਸਵਰਡ ਸਟੋਰੇਜ ਲਈ ਹੈਸ਼ ਫੰਕਸ਼ਨ

For secure password hashing, dedicated hash functions must be used. These slow-hashing algorithms mitigate brute-force and dictionary attacks by increasing the computational difficulty of password cracking.

ਸੁਰੱਖਿਅਤ ਪਾਸਵਰਡ ਹੈਸ਼ਿੰਗ ਲਈ, ਸਮਰਪਿਤ ਹੈਸ਼ ਫੰਕਸ਼ਨ ਵਰਤੇ ਜਾਣੇ ਲਾਜ਼ਮੀ ਹਨ। ਇਹ ਹੌਲੀ-ਹੈਸ਼ਿੰਗ ਐਲਗੋਰਿਦਮ ਪਾਸਵਰਡ ਤੋੜਨ ਦੀ ਗਣਨਾਤਮਕ ਮੁਸ਼ਕਲ ਵਧਾ ਕੇ ਬਰੂਟ ਫੋਰਸ ਅਤੇ ਸ਼ਬਦਕੋਸ਼ (dictionary) ਹਮਲਿਆਂ ਨੂੰ ਘਟਾਉਂਦੇ ਹਨ।

| KDF        | Reference | Required Parameters | Status |
| ---------- | --------- | ------------ |:-:|
| argon2id | [RFC 9106](https://www.rfc-editor.org/info/rfc9106) | t = 1: m ≥ 47104 (46 MiB), p = 1 | A |
|          |                                                     | t = 2: m ≥ 19456 (19 MiB), p = 1 | A |
|          |                                                     | t ≥ 3: m ≥ 12288 (12 MiB), p = 1 | A |
| scrypt   | [RFC 7914](https://www.rfc-editor.org/info/rfc7914) | p = 1: N ≥ 2^17 (128 MiB), r = 8 | A |
|          |                                                     | p = 2: N ≥ 2^16 (64 MiB), r = 8  | A |
|          |                                                     | p ≥ 3: N ≥ 2^15 (32 MiB), r = 8  | A |
| bcrypt | [A Future-Adaptable Password Scheme](https://www.researchgate.net/publication/2519476_A_Future-Adaptable_Password_Scheme) | cost ≥ 10 | A |
| PBKDF2-HMAC-SHA-512 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 210,000 | A |
| PBKDF2-HMAC-SHA-256 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 600,000 | A |
| PBKDF2-HMAC-SHA-1 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 1,300,000 | L |

| KDF        | ਹਵਾਲਾ | ਲੋੜੀਂਦੇ ਪੈਰਾਮੀਟਰ | ਸਥਿਤੀ |
| ---------- | --------- | ------------ |:-:|
| argon2id | [RFC 9106](https://www.rfc-editor.org/info/rfc9106) | t = 1: m ≥ 47104 (46 MiB), p = 1 | A |
|          |                                                     | t = 2: m ≥ 19456 (19 MiB), p = 1 | A |
|          |                                                     | t ≥ 3: m ≥ 12288 (12 MiB), p = 1 | A |
| scrypt   | [RFC 7914](https://www.rfc-editor.org/info/rfc7914) | p = 1: N ≥ 2^17 (128 MiB), r = 8 | A |
|          |                                                     | p = 2: N ≥ 2^16 (64 MiB), r = 8  | A |
|          |                                                     | p ≥ 3: N ≥ 2^15 (32 MiB), r = 8  | A |
| bcrypt | [A Future-Adaptable Password Scheme](https://www.researchgate.net/publication/2519476_A_Future-Adaptable_Password_Scheme) | cost ≥ 10 | A |
| PBKDF2-HMAC-SHA-512 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 210,000 | A |
| PBKDF2-HMAC-SHA-256 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 600,000 | A |
| PBKDF2-HMAC-SHA-1 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 1,300,000 | L |

Approved password-based key derivations functions can be used for password storage.

ਪ੍ਰਵਾਨਿਤ ਪਾਸਵਰਡ-ਆਧਾਰਿਤ ਕੁੰਜੀ-ਵਿਉਤਪੱਤੀ ਫੰਕਸ਼ਨ ਪਾਸਵਰਡ ਸਟੋਰੇਜ ਲਈ ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ।

## Key Derivation Functions (KDFs)
## ਕੁੰਜੀ-ਵਿਉਤਪੱਤੀ ਫੰਕਸ਼ਨ (KDF)

### General Key Derivation Functions
### ਆਮ ਕੁੰਜੀ-ਵਿਉਤਪੱਤੀ ਫੰਕਸ਼ਨ

| KDF              | Reference                                                                                     | Status |
| ---------------- | -------- |:-:|
| HKDF             | [RFC 5869](https://www.rfc-editor.org/info/rfc5869)                                           | A      |
| TLS 1.2 PRF      | [RFC 5248](https://www.rfc-editor.org/info/rfc5248)                                           | L      |
| MD5-based KDFs   | [RFC 1321](https://www.rfc-editor.org/info/rfc1321)                                           | D      |
| SHA-1-based KDFs | [RFC 3174](https://www.rfc-editor.org/info/rfc3174) & [RFC 6194](https://www.rfc-editor.org/info/rfc6194) | D      |

| KDF              | ਹਵਾਲਾ                                                                                     | ਸਥਿਤੀ |
| ---------------- | -------- |:-:|
| HKDF             | [RFC 5869](https://www.rfc-editor.org/info/rfc5869)                                           | A      |
| TLS 1.2 PRF      | [RFC 5248](https://www.rfc-editor.org/info/rfc5248)                                           | L      |
| MD5-ਆਧਾਰਿਤ KDF   | [RFC 1321](https://www.rfc-editor.org/info/rfc1321)                                           | D      |
| SHA-1-ਆਧਾਰਿਤ KDF | [RFC 3174](https://www.rfc-editor.org/info/rfc3174) & [RFC 6194](https://www.rfc-editor.org/info/rfc6194) | D      |

### Password-based Key Derivation Functions
### ਪਾਸਵਰਡ-ਆਧਾਰਿਤ ਕੁੰਜੀ-ਵਿਉਤਪੱਤੀ ਫੰਕਸ਼ਨ

| KDF        | Reference | Required Parameters | Status |
| ---------- | --------- | ------------ |:-:|
| argon2id   | [RFC 9106](https://www.rfc-editor.org/info/rfc9106) | t = 1: m ≥ 47104 (46 MiB), p = 1 | A |
|            |                                                     | t = 2: m ≥ 19456 (19 MiB), p = 1 | A |
| scrypt     | [RFC 7914](https://www.rfc-editor.org/info/rfc7914) | p = 1: N ≥ 2^17 (128 MiB), r = 8 | A |
|            |                                                     | p = 2: N ≥ 2^16 (64 MiB), r = 8  | A |
|            |                                                     | p ≥ 3: N ≥ 2^15 (32 MiB), r = 8  | A |
| PBKDF2-HMAC-SHA-512 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 210,000 | A |
| PBKDF2-HMAC-SHA-256 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 600,000 | A |
| PBKDF2-HMAC-SHA-1 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | iterations ≥ 1,300,000 | L |

| KDF        | ਹਵਾਲਾ | ਲੋੜੀਂਦੇ ਪੈਰਾਮੀਟਰ | ਸਥਿਤੀ |
| ---------- | --------- | ------------ |:-:|
| argon2id   | [RFC 9106](https://www.rfc-editor.org/info/rfc9106) | t = 1: m ≥ 47104 (46 MiB), p = 1 | A |
|            |                                                     | t = 2: m ≥ 19456 (19 MiB), p = 1 | A |
| scrypt     | [RFC 7914](https://www.rfc-editor.org/info/rfc7914) | p = 1: N ≥ 2^17 (128 MiB), r = 8 | A |
|            |                                                     | p = 2: N ≥ 2^16 (64 MiB), r = 8  | A |
|            |                                                     | p ≥ 3: N ≥ 2^15 (32 MiB), r = 8  | A |
| PBKDF2-HMAC-SHA-512 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 210,000 | A |
| PBKDF2-HMAC-SHA-256 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 600,000 | A |
| PBKDF2-HMAC-SHA-1 | [NIST SP 800-132](https://csrc.nist.gov/pubs/sp/800/132/final), [FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | ਦੁਹਰਾਓ ≥ 1,300,000 | L |

## Key Exchange Mechanisms
## ਕੁੰਜੀ ਵਟਾਂਦਰਾ ਵਿਧੀਆਂ

This section provides additional information
for V11.6 Public Key Cryptography.

ਇਹ ਭਾਗ V11.6 ਜਨਤਕ ਕੁੰਜੀ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਲਈ ਵਾਧੂ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

### KEX Schemes
### KEX ਸਕੀਮਾਂ

A security strength of 112 bits or above MUST be ensured for all Key Exchange schemes, and their implementation MUST follow the parameter choices in the following table.

ਸਾਰੀਆਂ ਕੁੰਜੀ ਵਟਾਂਦਰਾ ਸਕੀਮਾਂ ਲਈ 112 ਬਿੱਟ ਜਾਂ ਇਸ ਤੋਂ ਵੱਧ ਦੀ ਸੁਰੱਖਿਆ ਮਜ਼ਬੂਤੀ ਯਕੀਨੀ ਬਣਾਈ ਜਾਣੀ ਲਾਜ਼ਮੀ ਹੈ, ਅਤੇ ਉਹਨਾਂ ਦੇ ਲਾਗੂਕਰਨ ਲਈ ਹੇਠ ਦਿੱਤੀ ਸਾਰਣੀ ਵਿਚਲੀਆਂ ਪੈਰਾਮੀਟਰ ਚੋਣਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨੀ ਲਾਜ਼ਮੀ ਹੈ।

| Scheme | Domain Parameters | Forward Secrecy |Status |
|--|--|--|:-:|
| Finite Field Diffie-Hellman (FFDH) | L >= 3072 & N >= 256 | Yes | A |
| Elliptic Curve Diffie-Hellman (ECDH) | f >= 256-383 | Yes | A |
| Encrypted key transport with RSA-PKCS#1 v1.5 | | No | D |

| ਸਕੀਮ | ਡੋਮੇਨ ਪੈਰਾਮੀਟਰ | ਅੱਗੇ ਦੀ ਗੁਪਤਤਾ |ਸਥਿਤੀ |
|--|--|--|:-:|
| Finite Field Diffie-Hellman (FFDH) | L >= 3072 & N >= 256 | ਹਾਂ | A |
| Elliptic Curve Diffie-Hellman (ECDH) | f >= 256-383 | ਹਾਂ | A |
| RSA-PKCS#1 v1.5 ਨਾਲ ਏਨਕ੍ਰਿਪਟ ਕੀਤਾ ਕੁੰਜੀ ਟ੍ਰਾਂਸਪੋਰਟ | | ਨਹੀਂ | D |

Where the following parameters are:

* k is the key size for RSA keys.
* L is the size of the public key and N is the size of the private key for finite field cryptography.
* f is the range of key sizes for ECC.

ਜਿੱਥੇ ਹੇਠ ਲਿਖੇ ਪੈਰਾਮੀਟਰ ਹਨ:

* k, RSA ਕੁੰਜੀਆਂ ਲਈ ਕੁੰਜੀ ਆਕਾਰ ਹੈ।
* L, ਸੀਮਿਤ ਖੇਤਰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ ਲਈ ਜਨਤਕ ਕੁੰਜੀ ਦਾ ਆਕਾਰ ਹੈ ਅਤੇ N ਨਿੱਜੀ ਕੁੰਜੀ ਦਾ ਆਕਾਰ ਹੈ।
* f, ECC ਲਈ ਕੁੰਜੀ ਆਕਾਰਾਂ ਦੀ ਹੱਦ ਹੈ।

Any new implementation MUST NOT use any scheme that is NOT compliant with [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final) & [B](https://csrc.nist.gov/pubs/sp/800/56/b/r2/final) and [NIST SP 800-77](https://csrc.nist.gov/pubs/sp/800/77/r1/final). Specifically, IKEv1 MUST NOT be used in production.

ਕਿਸੇ ਵੀ ਨਵੇਂ ਲਾਗੂਕਰਨ ਵਿੱਚ ਅਜਿਹੀ ਕੋਈ ਵੀ ਸਕੀਮ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤੀ ਜਾਣੀ ਚਾਹੀਦੀ ਜੋ [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final) ਅਤੇ [B](https://csrc.nist.gov/pubs/sp/800/56/b/r2/final) ਅਤੇ [NIST SP 800-77](https://csrc.nist.gov/pubs/sp/800/77/r1/final) ਦੇ ਅਨੁਕੂਲ ਨਾ ਹੋਵੇ। ਖ਼ਾਸ ਤੌਰ 'ਤੇ, IKEv1 ਪ੍ਰੋਡਕਸ਼ਨ (production) ਵਿੱਚ ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਨਹੀਂ ਵਰਤਿਆ ਜਾਣਾ ਚਾਹੀਦਾ।

### Diffie-Hellman groups
### Diffie-Hellman ਸਮੂਹ

The following groups are approved for implementations of Diffie-Hellman key exchange. Security strengths are documented in [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final), Appendix D, and [NIST SP 800-57 Part 1 Rev.5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final).

ਹੇਠ ਲਿਖੇ ਸਮੂਹ Diffie-Hellman ਕੁੰਜੀ ਵਟਾਂਦਰੇ ਦੇ ਲਾਗੂਕਰਨਾਂ ਲਈ ਪ੍ਰਵਾਨਿਤ ਹਨ। ਸੁਰੱਖਿਆ ਮਜ਼ਬੂਤੀਆਂ [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final), ਅੰਤਿਕਾ D, ਅਤੇ [NIST SP 800-57 Part 1 Rev.5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) ਵਿੱਚ ਦਸਤਾਵੇਜ਼ੀ ਰੂਪ ਵਿੱਚ ਦਰਜ ਹਨ।

| Group            | Status |
|------------------|:------:|
| P-224, secp224r1 | A      |
| P-256, secp256r1 | A      |
| P-384, secp384r1 | A      |
| P-521, secp521r1 | A      |
| K-233, sect233k1 | A      |
| K-283, sect283k1 | A      |
| K-409, sect409k1 | A      |
| K-571, sect571k1 | A      |
| B-233, sect233r1 | A      |
| B-283, sect283r1 | A      |
| B-409, sect409r1 | A      |
| B-571, sect571r1 | A      |
| Curve448         | A      |
| Curve25519       | A      |
| MODP-2048        | A      |
| MODP-3072        | A      |
| MODP-4096        | A      |
| MODP-6144        | A      |
| MODP-8192        | A      |
| ffdhe2048        | A      |
| ffdhe3072        | A      |
| ffdhe4096        | A      |
| ffdhe6144        | A      |
| ffdhe8192        | A      |

| ਸਮੂਹ            | ਸਥਿਤੀ |
|------------------|:------:|
| P-224, secp224r1 | A      |
| P-256, secp256r1 | A      |
| P-384, secp384r1 | A      |
| P-521, secp521r1 | A      |
| K-233, sect233k1 | A      |
| K-283, sect283k1 | A      |
| K-409, sect409k1 | A      |
| K-571, sect571k1 | A      |
| B-233, sect233r1 | A      |
| B-283, sect283r1 | A      |
| B-409, sect409r1 | A      |
| B-571, sect571r1 | A      |
| Curve448         | A      |
| Curve25519       | A      |
| MODP-2048        | A      |
| MODP-3072        | A      |
| MODP-4096        | A      |
| MODP-6144        | A      |
| MODP-8192        | A      |
| ffdhe2048        | A      |
| ffdhe3072        | A      |
| ffdhe4096        | A      |
| ffdhe6144        | A      |
| ffdhe8192        | A      |

## Message Authentication Codes (MAC)
## ਸੁਨੇਹਾ ਪ੍ਰਮਾਣੀਕਰਨ ਕੋਡ (MAC)

Message Authentication Codes (MACs) are cryptographic constructs used to verify the integrity and authenticity of a message. A MAC takes a message and a secret key as inputs and produces a fixed-size tag (the MAC value). MACs are widely used in secure communication protocols (e.g., TLS/SSL) to ensure that messages exchanged between parties are authentic and intact.

ਸੁਨੇਹਾ ਪ੍ਰਮਾਣੀਕਰਨ ਕੋਡ (Message Authentication Codes, MAC) ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਬਣਤਰਾਂ ਹਨ ਜੋ ਕਿਸੇ ਸੁਨੇਹੇ ਦੀ ਅਖੰਡਤਾ (integrity) ਅਤੇ ਪ੍ਰਮਾਣਿਕਤਾ (authenticity) ਦੀ ਤਸਦੀਕ ਕਰਨ ਲਈ ਵਰਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਇੱਕ MAC ਇਨਪੁੱਟ ਵਜੋਂ ਇੱਕ ਸੁਨੇਹਾ ਅਤੇ ਇੱਕ ਗੁਪਤ ਕੁੰਜੀ ਲੈਂਦਾ ਹੈ ਅਤੇ ਇੱਕ ਸਥਿਰ-ਆਕਾਰ ਵਾਲਾ ਟੈਗ (MAC ਮੁੱਲ) ਪੈਦਾ ਕਰਦਾ ਹੈ। MAC ਸੁਰੱਖਿਅਤ ਸੰਚਾਰ ਪ੍ਰੋਟੋਕਾਲਾਂ (ਜਿਵੇਂ, TLS/SSL) ਵਿੱਚ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਵਿਆਪਕ ਤੌਰ 'ਤੇ ਵਰਤੇ ਜਾਂਦੇ ਹਨ ਕਿ ਧਿਰਾਂ ਵਿਚਕਾਰ ਵਟਾਂਦਰੇ ਗਏ ਸੁਨੇਹੇ ਪ੍ਰਮਾਣਿਕ ਅਤੇ ਅਖੰਡ ਹਨ।

| MAC Algorithm | Reference                                                                                 | Status |
| ----------    | --------------- |:-:|
| HMAC-SHA-256  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| HMAC-SHA-384  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| HMAC-SHA-512  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| KMAC128       | [NIST SP 800-185](https://csrc.nist.gov/pubs/sp/800/185/final)                             | A |
| KMAC256       | [NIST SP 800-185](https://csrc.nist.gov/pubs/sp/800/185/final)                             | A |
| BLAKE3 (keyed_hash mode) | [BLAKE3 one function, fast everywhere](https://github.com/BLAKE3-team/BLAKE3-specs/raw/master/blake3.pdf)  | A |
| AES-CMAC      | [RFC 4493](https://datatracker.ietf.org/doc/html/rfc4493) & [NIST SP 800-38B](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38b.pdf) | A |
| AES-GMAC      | [NIST SP 800-38D](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf)            | A |
| Poly1305-AES  | [The Poly1305-AES message-authentication code](https://cr.yp.to/mac/poly1305-20050329.pdf)                  | A |
| HMAC-SHA-1    | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | L |
| HMAC-MD5      | [RFC 1321](https://www.rfc-editor.org/info/rfc1321)                                | D      |

| MAC ਐਲਗੋਰਿਦਮ | ਹਵਾਲਾ                                                                                 | ਸਥਿਤੀ |
| ----------    | --------------- |:-:|
| HMAC-SHA-256  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| HMAC-SHA-384  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| HMAC-SHA-512  | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | A |
| KMAC128       | [NIST SP 800-185](https://csrc.nist.gov/pubs/sp/800/185/final)                             | A |
| KMAC256       | [NIST SP 800-185](https://csrc.nist.gov/pubs/sp/800/185/final)                             | A |
| BLAKE3 (keyed_hash ਮੋਡ) | [BLAKE3 one function, fast everywhere](https://github.com/BLAKE3-team/BLAKE3-specs/raw/master/blake3.pdf)  | A |
| AES-CMAC      | [RFC 4493](https://datatracker.ietf.org/doc/html/rfc4493) & [NIST SP 800-38B](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38b.pdf) | A |
| AES-GMAC      | [NIST SP 800-38D](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf)            | A |
| Poly1305-AES  | [The Poly1305-AES message-authentication code](https://cr.yp.to/mac/poly1305-20050329.pdf)                  | A |
| HMAC-SHA-1    | [RFC 2104](https://www.rfc-editor.org/info/rfc2104) & [FIPS 198-1](https://csrc.nist.gov/pubs/fips/198-1/final) | L |
| HMAC-MD5      | [RFC 1321](https://www.rfc-editor.org/info/rfc1321)                                | D      |

## Digital Signatures
## ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤ

Signature schemes MUST use approved key sizes and parameters per [NIST SP 800-57 Part 1](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final).

ਦਸਤਖ਼ਤ ਸਕੀਮਾਂ ਲਈ [NIST SP 800-57 Part 1](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) ਅਨੁਸਾਰ ਪ੍ਰਵਾਨਿਤ ਕੁੰਜੀ ਆਕਾਰ ਅਤੇ ਪੈਰਾਮੀਟਰ ਵਰਤਣੇ ਲਾਜ਼ਮੀ ਹਨ।

| Signature Algorithm            | Reference                                                  | Status |
| ------------------------------ | ---------------------------------------------              | :-:    |
| EdDSA (Ed25519, Ed448)         | [RFC 8032](https://www.rfc-editor.org/info/rfc8032)        | A      |
| XEdDSA (Curve25519, Curve448)  | [XEdDSA](https://signal.org/docs/specifications/xeddsa/)   | A      |
| ECDSA (P-256, P-384, P-521)    | [FIPS 186-4](https://csrc.nist.gov/pubs/fips/186-5/final)  | A      |
| RSA-RSSA-PSS                   | [RFC 8017](https://www.rfc-editor.org/info/rfc8017)        | A      |
| RSA-SSA-PKCS#1 v1.5            | [RFC 8017](https://www.rfc-editor.org/info/rfc8017)        | D      |
| DSA (any key size)             | [FIPS 186-4](https://csrc.nist.gov/pubs/fips/186-4/final)  | D      |

| ਦਸਤਖ਼ਤ ਐਲਗੋਰਿਦਮ            | ਹਵਾਲਾ                                                  | ਸਥਿਤੀ |
| ------------------------------ | ---------------------------------------------              | :-:    |
| EdDSA (Ed25519, Ed448)         | [RFC 8032](https://www.rfc-editor.org/info/rfc8032)        | A      |
| XEdDSA (Curve25519, Curve448)  | [XEdDSA](https://signal.org/docs/specifications/xeddsa/)   | A      |
| ECDSA (P-256, P-384, P-521)    | [FIPS 186-4](https://csrc.nist.gov/pubs/fips/186-5/final)  | A      |
| RSA-RSSA-PSS                   | [RFC 8017](https://www.rfc-editor.org/info/rfc8017)        | A      |
| RSA-SSA-PKCS#1 v1.5            | [RFC 8017](https://www.rfc-editor.org/info/rfc8017)        | D      |
| DSA (ਕੋਈ ਵੀ ਕੁੰਜੀ ਆਕਾਰ)      | [FIPS 186-4](https://csrc.nist.gov/pubs/fips/186-4/final)  | D      |

## Post-Quantum Encryption Standards
## ਪੋਸਟ-ਕੁਆਂਟਮ ਏਨਕ੍ਰਿਪਸ਼ਨ ਮਿਆਰ

Post-quantum cryptography (PQC) implementations should follow [FIPS-203](https://csrc.nist.gov/pubs/fips/203/ipd), [FIPS-204](https://csrc.nist.gov/pubs/fips/204/ipd), and [FIPS-205](https://csrc.nist.gov/pubs/fips/205/ipd). At this time, there are not many hardened code examples or reference implementations available for these standards. For further details, see the [NIST announcement of the first three finalized post-quantum encryption standards (August 2024)](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards).

ਪੋਸਟ-ਕੁਆਂਟਮ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ੀ (PQC) ਦੇ ਲਾਗੂਕਰਨਾਂ ਨੂੰ [FIPS-203](https://csrc.nist.gov/pubs/fips/203/ipd), [FIPS-204](https://csrc.nist.gov/pubs/fips/204/ipd), ਅਤੇ [FIPS-205](https://csrc.nist.gov/pubs/fips/205/ipd) ਦੀ ਪਾਲਣਾ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਇਸ ਵੇਲੇ, ਇਹਨਾਂ ਮਿਆਰਾਂ ਲਈ ਬਹੁਤੀਆਂ ਸਖ਼ਤ ਕੀਤੀਆਂ (hardened) ਕੋਡ ਉਦਾਹਰਨਾਂ ਜਾਂ ਹਵਾਲਾ ਲਾਗੂਕਰਨ ਉਪਲਬਧ ਨਹੀਂ ਹਨ। ਹੋਰ ਵੇਰਵਿਆਂ ਲਈ, [ਪਹਿਲੇ ਤਿੰਨ ਅੰਤਿਮ ਰੂਪ ਦਿੱਤੇ ਪੋਸਟ-ਕੁਆਂਟਮ ਏਨਕ੍ਰਿਪਸ਼ਨ ਮਿਆਰਾਂ ਬਾਰੇ NIST ਦੀ ਘੋਸ਼ਣਾ (ਅਗਸਤ 2024)](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards) ਵੇਖੋ।

The proposed [mlkem768x25519](https://datatracker.ietf.org/doc/draft-kwiatkowski-tls-ecdhe-mlkem/03/) post-quantum hybrid TLS key agreement method is supported by major browsers such as [Firefox release 132](https://www.mozilla.org/en-US/firefox/132.0/releasenotes/) and [Chrome release 131](https://security.googleblog.com/2024/09/a-new-path-for-kyber-on-web.html). It may be used in cryptographic testing environments or when available within industry- or government-approved libraries.

ਪ੍ਰਸਤਾਵਿਤ [mlkem768x25519](https://datatracker.ietf.org/doc/draft-kwiatkowski-tls-ecdhe-mlkem/03/) ਪੋਸਟ-ਕੁਆਂਟਮ ਹਾਈਬ੍ਰਿਡ TLS ਕੁੰਜੀ ਸਮਝੌਤਾ (key agreement) ਵਿਧੀ ਨੂੰ [Firefox ਰਿਲੀਜ਼ 132](https://www.mozilla.org/en-US/firefox/132.0/releasenotes/) ਅਤੇ [Chrome ਰਿਲੀਜ਼ 131](https://security.googleblog.com/2024/09/a-new-path-for-kyber-on-web.html) ਵਰਗੇ ਪ੍ਰਮੁੱਖ ਬ੍ਰਾਊਜ਼ਰਾਂ ਦਾ ਸਮਰਥਨ ਪ੍ਰਾਪਤ ਹੈ। ਇਸਨੂੰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਟੈਸਟਿੰਗ ਵਾਤਾਵਰਨਾਂ ਵਿੱਚ, ਜਾਂ ਜਦੋਂ ਇਹ ਉਦਯੋਗ- ਜਾਂ ਸਰਕਾਰ-ਪ੍ਰਵਾਨਿਤ ਲਾਇਬ੍ਰੇਰੀਆਂ ਵਿੱਚ ਉਪਲਬਧ ਹੋਵੇ, ਤਾਂ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

---

[← Previous: Appendix B: References (ਅੰਤਿਕਾ B: ਹਵਾਲੇ)](/blog/asvs-panjabi-review-appendix-b-references) | [Back to Review Hub](/blog/asvs-panjabi-review-hub) | [Next: Appendix D: Recommendations (ਅੰਤਿਕਾ D: ਸਿਫ਼ਾਰਸ਼ਾਂ) →](/blog/asvs-panjabi-review-appendix-d-recommendations)
