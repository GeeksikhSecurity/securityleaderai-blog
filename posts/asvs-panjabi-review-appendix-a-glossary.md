---
title: "ASVS Panjabi Review — Appendix A: Glossary (ਅੰਤਿਕਾ A: ਸ਼ਬਦਾਵਲੀ)"
date: "2026-08-21"
excerpt: "Bilingual 'Appendix A: Glossary' chapter from the OWASP ASVS 5.0 Panjabi translation, in English and Gurmukhi."
author: "Gurvinder Singh"
tags: ["owasp", "asvs", "panjabi", "translation", "review"]
hidden: true
---

# ASVS Panjabi Review — Appendix A: Glossary (ਅੰਤਿਕਾ A: ਸ਼ਬਦਾਵਲੀ)

> **Reviewing this translation?** Email feedback to **gurvinder@securityleader.ai** with the subject **"ASVS Panjabi Review — Appendix A: Glossary"**. Even a single correction is valuable. No GitHub account needed.

> **Source:** OWASP ASVS [PR #3254](https://github.com/OWASP/ASVS/pull/3254) · this is faithful to the official pull request.

---

* **Absolute Maximum Session Lifetime** – Also referred to as "Overall Timeout" by NIST, this is the maximal amount of time a session can remain active following authentication regardless of user interaction. This is a component of session expiration.
* **Allowlist** – A list of permitted data or operations, for example, a list of characters that are allowed to perform input validation.
* **Anti-forgery token** – A mechanism by which one or more tokens are passed in a request and validated by the application server to ensure that the request has come from an expected endpoint.
* **Application Security** – Application-level security focuses on the analysis of components that comprise the application layer of the Open Systems Interconnection Reference Model (OSI Model), rather than focusing on for example the underlying operating system or connected networks.
* **Application Security Verification** – The technical assessment of an application against the OWASP ASVS.
* **Application Security Verification Report** – A report that documents the overall results and supporting analysis produced by the verifier for a particular application.
* **Authentication** – The verification of the claimed identity of an application user.
* **Automated Verification** – The use of automated tools (either dynamic analysis tools, static analysis tools, or both) that use vulnerability signatures to find problems.
* **Black box testing** – A method of software testing that examines the functionality of an application without peering into its internal structures or workings.
* **Common Weakness Enumeration** (CWE) – A community-developed list of common software security weaknesses. It serves as a common language, a measuring stick for software security tools, and a baseline for weakness identification, mitigation, and prevention efforts.
* **Component** – A self-contained unit of code, with associated disk and network interfaces that communicates with other components.
* **Credential Service Provider** (CSP) – Also called an Identity Provider (IdP). A source of user data which may be used as an authentication source by other applications.
* **Cross-Site Script Inclusion** (XSSI) - A variant of Cross-Site Scripting (XSS) attack in which a web application retrieves malicious code from an external resource and includes that code as part of its own content.
* **Cross-Site Scripting** (XSS) – A security vulnerability typically found in web applications allowing the injection of client-side scripts into content.
* **Cryptographic module** – Hardware, software, and/or firmware that implements cryptographic algorithms and/or generates cryptographic keys.
* **Cryptographically secure pseudo-random number generator** (CSPRNG) - A pseudorandom number generator with properties that make it suitable for use in cryptography, also referred to as a cryptographic random number generator (CRNG).
* **Datagram Transport Layer Security** (DTLS) – A cryptographic protocol which provides communication security over a network connection. It is based on the TLS protocol but adapted for protecting datagram-oriented protocols (usually over UDP). Defined in RFC 9147 for DTLS 1.3.
* **Datagram Transport Layer Security Extension to Establish Keys for the Secure Real-time Transport Protocol** (DTLS-SRTP) – A mechanism for using a DTLS handshake for establishing key material for a SRTP session. Defined in RFC 5764.
* **Design Verification** – The technical assessment of the security architecture of an application.
* **Dynamic Application Security Testing** (DAST) – Technologies are designed to detect conditions indicative of a security vulnerability in an application in its running state.
* **Dynamic Verification** – The use of automated tools that use vulnerability signatures to find problems during the execution of an application.
* **Fast IDentity Online** (FIDO) – A set of authentication standards that allow a variety of different authentication methods to be used including biometrics, Trusted Platform Modules (TPMs), USB security tokens, etc.
* **Hardware Security Module** (HSM) – Hardware component that stores cryptographic keys and other secrets in a protected manner.
* **Hibernate Query Language** (HQL) – A query language that is similar in appearance to SQL used by the Hibernate ORM library.
* **HTTP Strict Transport Security** (HSTS) – An policy which instructs the browser to only connect to the domain returning the header via TLS and when a valid certificate is presented. It is activated using the Strict-Transport-Security response header field.
* **HyperText Transfer Protocol** (HTTP) – An application protocol for distributed, collaborative, hypermedia information systems. It is the foundation of data communication for the World Wide Web.
* **HyperText Transfer Protocol over SSL/TLS** (HTTPS) – A method of securing HTTP communication by encrypting it using Transport Layer Security (TLS).
* **Identity Provider** (IdP) – Also called a Credential Service Provider (CSP) in NIST references. An entity that provides an authentication source for other applications.
* **Inactivity Timeout** – This is the length of time a session can remain active in the absence of user interaction with the application. This is a component of session expiration.
* **Input Validation** – The canonicalization and validation of untrusted user input.
* **JSON Web Token** (JWT) – RFC 7519 defines a standard for a JSON data object made up of a header section which explains how to validate the object, a body section containing a set of claims, and a signature section which contains a digital signature which can be used to validate the contents of the body section. It is a type of self-contained token.
* **Local File Inclusion** (LFI) - An attack that exploits vulnerable file inclusion procedures in an application, leading to the inclusion of local files already present on the server.
* **Malicious Code** – Code introduced into an application during its development unbeknownst to the application owner, which circumvents the application's intended security policy. Not the same as malware such as a virus or worm!
* **Malware** – Executable code that is introduced into an application during runtime without the knowledge of the application user or administrator.
* **Message authentication code** (MAC) - A cryptographic checksum on data, computed by a MAC generation algorithm, that is used to provide assurance on its integrity and authenticity.
* **Multi-factor authentication** (MFA) – Authentication which includes two or more of the single factors.
* **Mutual TLS** (mTLS) – See TLS client authentication.
* **Object-relational Mapping** (ORM) – A system used to allow a relational/table-based database to be referenced and queried within an application program using an application-compatible object model.
* **One-time Password** (OTP) – A password that is uniquely generated to be used on a single occasion.
* **Open Worldwide Application Security Project** (OWASP) – The Open Worldwide Application Security Project (OWASP) is a worldwide free and open community focused on improving the security of application software. Our mission is to make application security "visible," so that people and organizations can make informed decisions about application security risks. See: [https://www.owasp.org/](https://www.owasp.org/).
* **Password-Based Key Derivation Function 2** (PBKDF2) – A special one-way algorithm used to create a strong cryptographic key from an input text (such as a password) and an additional random salt value and can therefore be used to make it harder to crack a password offline if the resulting value is stored instead of the original password.
* **Public Key Infrastructure** (PKI) – An arrangement that binds public keys with respective identities of entities. The binding is established through a process of registration and issuance of certificates at and by a certificate authority (CA).
* **Public Switched Telephone Network** (PSTN) – The traditional telephone network that includes both fixed-line telephones and mobile telephones.
* **Real-time Transport Protocol** (RTP) and **Real-time Transport Control Protocol** (RTCP) – Two protocols used in association for transporting multimedia streams. Used by the WebRTC stack. Defined in RFC 3550.
* **Reference Token** – A type of token that acts as a pointer or identifier to state or metadata stored on a server, sometimes referred to as random tokens or opaque tokens. Unlike self-contained tokens, which embed some of their relevant data within the token itself, reference tokens contain no intrinsic information, instead relying on the server for context. The reference token will either be or contain a session identifier.
* **Relying Party** (RP) – Generally an application which is relying on a user having authenticated against a separate authentication provider. The application relies on some sort of token or set of signed assertions provided by that authentication provider to trust that the user is who they say they are.
* **Remote File Inclusion** (RFI) - An attack that exploits vulnerable inclusion procedures in the application, resulting in the inclusion of remote files.
* **Scalable Vector Graphics** (SVG) – An XML-based markup language for describing two-dimensional based vector graphics.
* **Secure Real-time Transport Protocol** (SRTP) and **Secure Real-time Transport Control Protocol** (SRTCP) – A profile of the RTP and RTCP protocols providing support for message encryption, authentication and integrity protection. Defined in RFC 3711.
* **Security Architecture** – An abstraction of an application's design that identifies and describes where and how security controls are used, and also identifies and describes the location and sensitivity of both user and application data.
* **Security Assertion Markup Language** (SAML) – An open standard for single sign-on authentication based on passing signed assertions (usually XML objects) between the identity provider and the relying party.
* **Security Configuration** – The runtime configuration of an application that affects how security controls are used.
* **Security Control** – A function or component that performs a security check (e.g., an authorization check) or when called results in a security effect (e.g., generating an audit record).
* **Security information and event management** (SIEM) - A system for threat detection, compliance and security incident management through the collection and analysis of security-related data from various sources within an organization's IT infrastructure.
* **Self-Contained Token** – A token that encapsulates one or more attributes that do not rely on server-side state or other external storage. These tokens ensure the authenticity and integrity of their contained attributes, enabling secure, "stateless" information exchange across systems. Self-contained tokens are generally secured using cryptographic techniques, such as digital signatures or message authentication codes (MACs), to ensure the authenticity, integrity, and in some cases the confidentiality of its data. Common examples include SAML Assertions and JWTs.
* **Server-side Request Forgery** (SSRF) – An attack that abuses functionality on the server to read or update internal resources. The attacker supplies or modifies a URL, which the code running on the server will read or submit data to.
* **Session Description Protocol** (SDP) – A message format for setting up multimedia session (used for example in WebRTC). Defined in RFC 4566.
* **Session Identifier** or **Session ID** – A key which identifies a stateful session stored at the back end. Will be transferred to and from the client either as or inside a "Reference Token".
* **Session Token** – A "catch-all" phrase used in this standard to refer to the token or value used in either stateless session mechanisms (which use a self-contained token) or stateful session mechanisms (which use a reference token).
* **Session Traversal Utilities for NAT** (STUN) – A protocol used to assist NAT traversal in order to establish peer-to-peer communications. Defined in RFC 3489.
* **Single-factor authenticator** – A mechanism to check that a user is authenticated. It should either be something you know (memorized secrets, passwords, passphrases, PINs), something you are (biometrics, fingerprint, face scans), or something you have (OTP tokens, a cryptographic device such as a smart card).
* **Single Sign-on Authentication** (SSO) – This occurs when a user logs into one application and is then automatically logged into other applications without having to re-authenticate. For example, when logging into Google, the user will be automatically logged into other Google services such as YouTube, Google Docs, and Gmail.
* **Software bill of materials** (SBOM) - A structured, comprehensive list of all components, modules, libraries, frameworks and other resources required to build or assemble a software application.
* **Software Composition Analysis** (SCA) – A set of technologies designed to analyze application composition, dependencies, libraries and packages for security vulnerabilities of specific component versions in use. This is not to be confused with source-code analysis which is now commonly referred to as SAST.
* **Software development lifecycle** (SDLC) – The step-by-step process by which software is developed going from the initial requirements to deployment and maintenance.
* **SQL Injection** (SQLi) – A code injection technique used to attack data-driven applications, in which malicious SQL statements are inserted into an entry point.
* **Stateful Session Mechanism** – In a stateful session mechanism, the application retains session state at the backend which typically corresponds to a session token, generated using a cryptographically secure pseudo-random number generator (CSPRNG), which is issued to the end user.
* **Stateless Session Mechanism** – A stateless session mechanism will use a self-contained token which is passed to clients, and contains session information that is not necessarily stored within the service which then receives and validates the token. In reality, a service will need to have access to some session information (such as a JWT revocation list) in order to be able to enforce required security controls.
* **Static application security testing** (SAST) – A set of technologies designed to analyze application source code, byte code and binaries for coding and design conditions that are indicative of security vulnerabilities. SAST solutions analyze an application from the “inside out” in a non-running state.
* **Threat Modeling** – A technique consisting of developing increasingly refined security architectures to identify threat agents, security zones, security controls, and important technical and business assets.
* **Time-of-check to time-of-use** (TOCTOU) – A situation where an application checks the state of a resource before using that resource, but the resource's state can be changed between the check and the use. This can invalidate the results of the check and cause a situation where the application performs invalid actions due to this state mismatch.
* **Time based One-time Passwords** (TOTPs) - A method of generating an OTP where the current time acts as part of the algorithm to generate the password.
* **TLS client authentication**, also called **Mutual TLS** (mTLS) – In a standard TLS connection, a client can use the certificate provided by the server to validate the server's identity. Where TLS client authentication is used, the client also uses its own private key and certificate to allow the server to also validate the client's identity.
* **Transport Layer Security** (TLS) – Cryptographic protocols that provide communication security over a network connection.
* **Traversal Using Relays around NAT** (TURN) – An extension of the STUN protocol using a TURN server as a relay when direct peer-to-peer connections cannot be established. Defined in RFC 8656.
* **Trusted execution environment** (TEE) - An isolated processing environment in which applications can be securely executed irrespective of the rest of the system.
* **Trusted Platform Module** (TPM) – A type of HSM that is usually attached to a larger hardware component such as a motherboard and acts as the "root of trust" for that system.
* **Trusted Service Layer** – Any trusted control enforcement point, such as a microservice, serverless API, server-side, a trusted API on a client device that has secure boot, partner or external APIs, and so on. Trusted means that there is no concern that an untrusted user will be able to bypass or skip the layer or controls implemented at that layer.
* **Uniform Resource Identifier** (URI)- A unique string of characters that identifies a resource, such as webpage, mail address, places.
* **Uniform Resource Locator** (URL) – A string that specifies the location of resource on the Internet.
* **Universally Unique Identifier** (UUID) – A unique reference number used as an identifier in software.
* **Verifier** – The person or team that is reviewing an application against the OWASP ASVS requirements.
* **Web Real-Time Communication** (WebRTC) – A protocol stack and associated web API used for the transport of multimedia streams in web applications, usually in the context of teleconferencing. Based on SRTP, SRTCP, DTLS, SDP and STUN/TURN.
* **WebSocket over TLS** (WSS) – A practice of securing WebSocket communication by layering WebSocket over TLS protocol.
* **What You See Is What You Get** (WYSIWYG) – A type of rich content editor that shows how the content will actually look when rendered rather than showing the coding used to govern the rendering.
* **X.509 Certificate** – An X.509 certificate is a digital certificate that uses the widely accepted international X.509 public key infrastructure (PKI) standard to verify that a public key belongs to the user, computer or service identity contained within the certificate.
* **XML eXternal Entity** (XXE) – A type of XML entity that can access local or remote content via a declared system identifier. This may lead to various injection attacks.

* **ਪੂਰਨ ਵੱਧ ਤੋਂ ਵੱਧ ਸੈਸ਼ਨ ਜੀਵਨਕਾਲ** (Absolute Maximum Session Lifetime) – NIST ਦੁਆਰਾ ਇਸ ਨੂੰ "Overall Timeout" ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ; ਇਹ ਉਹ ਵੱਧ ਤੋਂ ਵੱਧ ਸਮਾਂ ਹੈ ਜਿੰਨਾ ਚਿਰ ਕੋਈ ਸੈਸ਼ਨ ਪ੍ਰਮਾਣੀਕਰਨ ਤੋਂ ਬਾਅਦ ਸਰਗਰਮ ਰਹਿ ਸਕਦਾ ਹੈ, ਭਾਵੇਂ ਉਪਭੋਗਤਾ ਦਾ ਕੋਈ ਆਪਸੀ ਤਾਲਮੇਲ ਹੋਵੇ ਜਾਂ ਨਾ। ਇਹ ਸੈਸ਼ਨ ਸਮਾਪਤੀ ਦਾ ਇੱਕ ਘਟਕ ਹੈ।
* **Allowlist** – ਇਜਾਜ਼ਤ ਪ੍ਰਾਪਤ ਡਾਟੇ ਜਾਂ ਕਾਰਵਾਈਆਂ ਦੀ ਇੱਕ ਸੂਚੀ; ਉਦਾਹਰਨ ਲਈ, ਉਹਨਾਂ ਅੱਖਰਾਂ ਦੀ ਸੂਚੀ ਜਿਨ੍ਹਾਂ ਦੀ ਇਨਪੁੱਟ ਪ੍ਰਮਾਣਿਕਤਾ (input validation) ਕਰਨ ਦੀ ਇਜਾਜ਼ਤ ਹੈ।
* **ਐਂਟੀ-ਫੋਰਜਰੀ ਟੋਕਨ** (Anti-forgery token) – ਇੱਕ ਪ੍ਰਣਾਲੀ ਜਿਸ ਰਾਹੀਂ ਇੱਕ ਜਾਂ ਵੱਧ ਟੋਕਨ ਬੇਨਤੀ ਵਿੱਚ ਭੇਜੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਐਪਲੀਕੇਸ਼ਨ ਸਰਵਰ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਇਹ ਯਕੀਨੀ ਬਣਾਇਆ ਜਾ ਸਕੇ ਕਿ ਬੇਨਤੀ ਕਿਸੇ ਅਨੁਮਾਨਿਤ ਐਂਡਪੁਆਇੰਟ ਤੋਂ ਆਈ ਹੈ।
* **ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ** (Application Security) – ਐਪਲੀਕੇਸ਼ਨ-ਪੱਧਰ ਦੀ ਸੁਰੱਖਿਆ ਉਹਨਾਂ ਘਟਕਾਂ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣ 'ਤੇ ਕੇਂਦਰਿਤ ਹੈ ਜੋ Open Systems Interconnection Reference Model (OSI Model) ਦੀ ਐਪਲੀਕੇਸ਼ਨ ਪਰਤ ਬਣਾਉਂਦੇ ਹਨ, ਨਾ ਕਿ, ਉਦਾਹਰਨ ਲਈ, ਅੰਤਰੀਵ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਜਾਂ ਜੁੜੇ ਹੋਏ ਨੈੱਟਵਰਕਾਂ 'ਤੇ।
* **ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ ਤਸਦੀਕ** (Application Security Verification) – OWASP ASVS ਦੇ ਵਿਰੁੱਧ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦਾ ਤਕਨੀਕੀ ਮੁਲਾਂਕਣ।
* **ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ ਤਸਦੀਕ ਰਿਪੋਰਟ** (Application Security Verification Report) – ਇੱਕ ਰਿਪੋਰਟ ਜੋ ਕਿਸੇ ਖ਼ਾਸ ਐਪਲੀਕੇਸ਼ਨ ਲਈ ਤਸਦੀਕਕਰਤਾ ਦੁਆਰਾ ਤਿਆਰ ਕੀਤੇ ਸਮੁੱਚੇ ਨਤੀਜਿਆਂ ਅਤੇ ਸਹਾਇਕ ਵਿਸ਼ਲੇਸ਼ਣ ਨੂੰ ਦਸਤਾਵੇਜ਼ੀ ਰੂਪ ਦਿੰਦੀ ਹੈ।
* **ਪ੍ਰਮਾਣੀਕਰਨ** (Authentication) – ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਉਪਭੋਗਤਾ ਦੀ ਦਾਅਵਾ ਕੀਤੀ ਗਈ ਪਛਾਣ ਦੀ ਤਸਦੀਕ।
* **ਸਵੈਚਾਲਿਤ ਤਸਦੀਕ** (Automated Verification) – ਅਜਿਹੇ ਸਵੈਚਾਲਿਤ ਟੂਲਾਂ (ਗਤੀਸ਼ੀਲ ਵਿਸ਼ਲੇਸ਼ਣ ਟੂਲ, ਸਥਿਰ ਵਿਸ਼ਲੇਸ਼ਣ ਟੂਲ, ਜਾਂ ਦੋਵੇਂ) ਦੀ ਵਰਤੋਂ ਜੋ ਸਮੱਸਿਆਵਾਂ ਲੱਭਣ ਲਈ ਕਮਜ਼ੋਰੀ ਸਿਗਨੇਚਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ।
* **ਬਲੈਕ ਬਾਕਸ ਟੈਸਟਿੰਗ** (Black box testing) – ਸਾਫ਼ਟਵੇਅਰ ਟੈਸਟਿੰਗ ਦਾ ਇੱਕ ਢੰਗ ਜੋ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਕਾਰਜਸ਼ੀਲਤਾ ਦੀ ਜਾਂਚ ਉਸ ਦੇ ਅੰਦਰੂਨੀ ਢਾਂਚਿਆਂ ਜਾਂ ਕਾਰਜ-ਵਿਧੀ ਵਿੱਚ ਝਾਕੇ ਬਿਨਾਂ ਕਰਦਾ ਹੈ।
* **Common Weakness Enumeration** (CWE) – ਆਮ ਸਾਫ਼ਟਵੇਅਰ ਸੁਰੱਖਿਆ ਖ਼ਾਮੀਆਂ (weaknesses) ਦੀ ਇੱਕ ਭਾਈਚਾਰਾ-ਵਿਕਸਿਤ ਸੂਚੀ। ਇਹ ਇੱਕ ਸਾਂਝੀ ਭਾਸ਼ਾ, ਸਾਫ਼ਟਵੇਅਰ ਸੁਰੱਖਿਆ ਟੂਲਾਂ ਲਈ ਇੱਕ ਮਾਪਦੰਡ, ਅਤੇ ਖ਼ਾਮੀ ਦੀ ਪਛਾਣ, ਘਟਾਉਣ ਅਤੇ ਰੋਕਥਾਮ ਦੇ ਯਤਨਾਂ ਲਈ ਇੱਕ ਆਧਾਰ-ਰੇਖਾ ਵਜੋਂ ਕੰਮ ਕਰਦੀ ਹੈ।
* **ਘਟਕ** (Component) – ਕੋਡ ਦੀ ਇੱਕ ਸਵੈ-ਨਿਰਭਰ ਇਕਾਈ, ਜਿਸ ਦੇ ਨਾਲ ਸੰਬੰਧਿਤ ਡਿਸਕ ਅਤੇ ਨੈੱਟਵਰਕ ਇੰਟਰਫ਼ੇਸ ਹੁੰਦੇ ਹਨ ਅਤੇ ਜੋ ਹੋਰ ਘਟਕਾਂ ਨਾਲ ਸੰਚਾਰ ਕਰਦੀ ਹੈ।
* **ਪ੍ਰਮਾਣ-ਪੱਤਰ ਸੇਵਾ ਪ੍ਰਦਾਤਾ** (Credential Service Provider, CSP) – ਇਸ ਨੂੰ ਪਛਾਣ ਪ੍ਰਦਾਤਾ (Identity Provider, IdP) ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਉਪਭੋਗਤਾ ਡਾਟੇ ਦਾ ਇੱਕ ਸਰੋਤ ਜਿਸ ਨੂੰ ਹੋਰ ਐਪਲੀਕੇਸ਼ਨਾਂ ਪ੍ਰਮਾਣੀਕਰਨ ਸਰੋਤ ਵਜੋਂ ਵਰਤ ਸਕਦੀਆਂ ਹਨ।
* **Cross-Site Script Inclusion** (XSSI) – Cross-Site Scripting (XSS) ਹਮਲੇ ਦਾ ਇੱਕ ਰੂਪ ਜਿਸ ਵਿੱਚ ਕੋਈ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨ ਕਿਸੇ ਬਾਹਰੀ ਸਰੋਤ ਤੋਂ ਖ਼ਤਰਨਾਕ ਕੋਡ ਲਿਆਉਂਦੀ ਹੈ ਅਤੇ ਉਸ ਕੋਡ ਨੂੰ ਆਪਣੀ ਹੀ ਸਮੱਗਰੀ ਦੇ ਹਿੱਸੇ ਵਜੋਂ ਸ਼ਾਮਲ ਕਰ ਲੈਂਦੀ ਹੈ।
* **Cross-Site Scripting** (XSS) – ਇੱਕ ਸੁਰੱਖਿਆ ਕਮਜ਼ੋਰੀ ਜੋ ਆਮ ਤੌਰ 'ਤੇ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਮਿਲਦੀ ਹੈ ਅਤੇ ਸਮੱਗਰੀ ਵਿੱਚ ਕਲਾਇੰਟ-ਸਾਈਡ ਸਕ੍ਰਿਪਟਾਂ ਦੇ ਇੰਜੈਕਸ਼ਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦੀ ਹੈ।
* **ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਮੋਡੀਊਲ** (Cryptographic module) – ਹਾਰਡਵੇਅਰ, ਸਾਫ਼ਟਵੇਅਰ, ਅਤੇ/ਜਾਂ ਫ਼ਰਮਵੇਅਰ ਜੋ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਐਲਗੋਰਿਦਮ ਲਾਗੂ ਕਰਦਾ ਹੈ ਅਤੇ/ਜਾਂ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਕੁੰਜੀਆਂ ਪੈਦਾ ਕਰਦਾ ਹੈ।
* **Cryptographically secure pseudo-random number generator** (CSPRNG) – ਇੱਕ ਛਦਮ-ਬੇਤਰਤੀਬ ਨੰਬਰ ਜਨਰੇਟਰ ਜਿਸ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਇਸ ਨੂੰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫੀ ਵਿੱਚ ਵਰਤੋਂ ਲਈ ਢੁਕਵਾਂ ਬਣਾਉਂਦੀਆਂ ਹਨ; ਇਸ ਨੂੰ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਰੈਂਡਮ ਨੰਬਰ ਜਨਰੇਟਰ (CRNG) ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ।
* **Datagram Transport Layer Security** (DTLS) – ਇੱਕ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਪ੍ਰੋਟੋਕਾਲ ਜੋ ਨੈੱਟਵਰਕ ਕਨੈਕਸ਼ਨ ਉੱਤੇ ਸੰਚਾਰ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਹ TLS ਪ੍ਰੋਟੋਕਾਲ 'ਤੇ ਆਧਾਰਿਤ ਹੈ ਪਰ datagram-ਮੁਖੀ ਪ੍ਰੋਟੋਕਾਲਾਂ (ਆਮ ਤੌਰ 'ਤੇ UDP ਉੱਤੇ) ਦੀ ਰੱਖਿਆ ਲਈ ਢਾਲਿਆ ਗਿਆ ਹੈ। DTLS 1.3 ਲਈ RFC 9147 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **Datagram Transport Layer Security Extension to Establish Keys for the Secure Real-time Transport Protocol** (DTLS-SRTP) – ਕਿਸੇ SRTP ਸੈਸ਼ਨ ਲਈ key material ਸਥਾਪਿਤ ਕਰਨ ਵਾਸਤੇ DTLS ਹੈਂਡਸ਼ੇਕ ਵਰਤਣ ਦੀ ਇੱਕ ਪ੍ਰਣਾਲੀ। RFC 5764 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਡਿਜ਼ਾਈਨ ਤਸਦੀਕ** (Design Verification) – ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੇ ਸੁਰੱਖਿਆ ਆਰਕੀਟੈਕਚਰ ਦਾ ਤਕਨੀਕੀ ਮੁਲਾਂਕਣ।
* **Dynamic Application Security Testing** (DAST) – ਇਹ ਤਕਨਾਲੋਜੀਆਂ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਉਸ ਦੀ ਚੱਲਦੀ ਹਾਲਤ ਦੌਰਾਨ ਸੁਰੱਖਿਆ ਕਮਜ਼ੋਰੀ ਦਾ ਸੰਕੇਤ ਦੇਣ ਵਾਲੀਆਂ ਹਾਲਤਾਂ ਦਾ ਪਤਾ ਲਗਾਉਣ ਲਈ ਤਿਆਰ ਕੀਤੀਆਂ ਗਈਆਂ ਹਨ।
* **ਗਤੀਸ਼ੀਲ ਤਸਦੀਕ** (Dynamic Verification) – ਅਜਿਹੇ ਸਵੈਚਾਲਿਤ ਟੂਲਾਂ ਦੀ ਵਰਤੋਂ ਜੋ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੇ ਚੱਲਣ ਦੌਰਾਨ ਸਮੱਸਿਆਵਾਂ ਲੱਭਣ ਲਈ ਕਮਜ਼ੋਰੀ ਸਿਗਨੇਚਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ।
* **Fast IDentity Online** (FIDO) – ਪ੍ਰਮਾਣੀਕਰਨ ਮਿਆਰਾਂ ਦਾ ਇੱਕ ਸਮੂਹ ਜੋ ਕਈ ਵੱਖ-ਵੱਖ ਪ੍ਰਮਾਣੀਕਰਨ ਢੰਗਾਂ ਦੀ ਵਰਤੋਂ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦਾ ਹੈ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਬਾਇਓਮੈਟ੍ਰਿਕਸ, Trusted Platform Modules (TPMs), USB ਸੁਰੱਖਿਆ ਟੋਕਨ, ਆਦਿ ਸ਼ਾਮਲ ਹਨ।
* **ਹਾਰਡਵੇਅਰ ਸੁਰੱਖਿਆ ਮੋਡੀਊਲ** (Hardware Security Module, HSM) – ਹਾਰਡਵੇਅਰ ਘਟਕ ਜੋ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਕੁੰਜੀਆਂ ਅਤੇ ਹੋਰ ਭੇਦਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸਟੋਰ ਕਰਦਾ ਹੈ।
* **Hibernate Query Language** (HQL) – ਇੱਕ ਕਿਊਰੀ ਭਾਸ਼ਾ ਜੋ ਦਿੱਖ ਵਿੱਚ SQL ਵਰਗੀ ਹੈ ਅਤੇ Hibernate ORM ਲਾਇਬ੍ਰੇਰੀ ਦੁਆਰਾ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।
* **HTTP Strict Transport Security** (HSTS) – ਇੱਕ ਨੀਤੀ ਜੋ ਬ੍ਰਾਊਜ਼ਰ ਨੂੰ ਹਦਾਇਤ ਦਿੰਦੀ ਹੈ ਕਿ ਉਹ ਹੈੱਡਰ ਵਾਪਸ ਕਰਨ ਵਾਲੇ ਡੋਮੇਨ ਨਾਲ ਸਿਰਫ਼ TLS ਰਾਹੀਂ ਅਤੇ ਸਿਰਫ਼ ਉਦੋਂ ਜੁੜੇ ਜਦੋਂ ਕੋਈ ਜਾਇਜ਼ ਸਰਟੀਫ਼ਿਕੇਟ ਪੇਸ਼ ਕੀਤਾ ਜਾਵੇ। ਇਹ Strict-Transport-Security ਜਵਾਬ ਹੈੱਡਰ ਖੇਤਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਰਗਰਮ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।
* **HyperText Transfer Protocol** (HTTP) – ਵੰਡੀਆਂ ਹੋਈਆਂ, ਸਹਿਯੋਗੀ, ਹਾਈਪਰਮੀਡੀਆ ਜਾਣਕਾਰੀ ਪ੍ਰਣਾਲੀਆਂ ਲਈ ਇੱਕ ਐਪਲੀਕੇਸ਼ਨ ਪ੍ਰੋਟੋਕਾਲ। ਇਹ World Wide Web ਲਈ ਡਾਟਾ ਸੰਚਾਰ ਦੀ ਨੀਂਹ ਹੈ।
* **HyperText Transfer Protocol over SSL/TLS** (HTTPS) – Transport Layer Security (TLS) ਦੀ ਵਰਤੋਂ ਕਰਕੇ HTTP ਸੰਚਾਰ ਨੂੰ ਏਨਕ੍ਰਿਪਟ ਕਰਕੇ ਸੁਰੱਖਿਅਤ ਕਰਨ ਦਾ ਇੱਕ ਢੰਗ।
* **ਪਛਾਣ ਪ੍ਰਦਾਤਾ** (Identity Provider, IdP) – NIST ਹਵਾਲਿਆਂ ਵਿੱਚ ਇਸ ਨੂੰ ਪ੍ਰਮਾਣ-ਪੱਤਰ ਸੇਵਾ ਪ੍ਰਦਾਤਾ (Credential Service Provider, CSP) ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਇੱਕ ਇਕਾਈ ਜੋ ਹੋਰ ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਪ੍ਰਮਾਣੀਕਰਨ ਸਰੋਤ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।
* **ਗ਼ੈਰ-ਸਰਗਰਮੀ ਸਮਾਂ-ਸੀਮਾ** (Inactivity Timeout) – ਇਹ ਉਹ ਸਮਾਂ ਹੈ ਜਿੰਨਾ ਚਿਰ ਕੋਈ ਸੈਸ਼ਨ ਐਪਲੀਕੇਸ਼ਨ ਨਾਲ ਉਪਭੋਗਤਾ ਦੇ ਆਪਸੀ ਤਾਲਮੇਲ ਦੀ ਗ਼ੈਰ-ਮੌਜੂਦਗੀ ਵਿੱਚ ਸਰਗਰਮ ਰਹਿ ਸਕਦਾ ਹੈ। ਇਹ ਸੈਸ਼ਨ ਸਮਾਪਤੀ ਦਾ ਇੱਕ ਘਟਕ ਹੈ।
* **ਇਨਪੁੱਟ ਪ੍ਰਮਾਣਿਕਤਾ** (Input Validation) – ਗ਼ੈਰ-ਭਰੋਸੇਯੋਗ ਉਪਭੋਗਤਾ ਇਨਪੁੱਟ ਦੀ ਕੈਨੋਨੀਕਲਾਈਜ਼ੇਸ਼ਨ ਅਤੇ ਪ੍ਰਮਾਣਿਕਤਾ।
* **JSON Web Token** (JWT) – RFC 7519 ਇੱਕ JSON ਡਾਟਾ ਆਬਜੈਕਟ ਲਈ ਮਿਆਰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦਾ ਹੈ ਜੋ ਇੱਕ ਹੈੱਡਰ ਭਾਗ (ਜੋ ਦੱਸਦਾ ਹੈ ਕਿ ਆਬਜੈਕਟ ਨੂੰ ਕਿਵੇਂ ਪ੍ਰਮਾਣਿਤ ਕਰਨਾ ਹੈ), ਇੱਕ ਬਾਡੀ ਭਾਗ (ਜਿਸ ਵਿੱਚ ਦਾਅਵਿਆਂ (claims) ਦਾ ਇੱਕ ਸਮੂਹ ਹੁੰਦਾ ਹੈ), ਅਤੇ ਇੱਕ ਦਸਤਖ਼ਤ ਭਾਗ (ਜਿਸ ਵਿੱਚ ਇੱਕ ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤ ਹੁੰਦਾ ਹੈ ਜਿਸ ਦੀ ਵਰਤੋਂ ਬਾਡੀ ਭਾਗ ਦੀ ਸਮੱਗਰੀ ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਲਈ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ) ਤੋਂ ਬਣਿਆ ਹੁੰਦਾ ਹੈ। ਇਹ ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨ ਦੀ ਇੱਕ ਕਿਸਮ ਹੈ।
* **Local File Inclusion** (LFI) – ਇੱਕ ਹਮਲਾ ਜੋ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਕਮਜ਼ੋਰ ਫ਼ਾਈਲ-ਇਨਕਲੂਜ਼ਨ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦਾ ਸ਼ੋਸ਼ਣ ਕਰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਸਰਵਰ 'ਤੇ ਪਹਿਲਾਂ ਤੋਂ ਮੌਜੂਦ ਸਥਾਨਕ ਫ਼ਾਈਲਾਂ ਸ਼ਾਮਲ ਹੋ ਜਾਂਦੀਆਂ ਹਨ।
* **ਖ਼ਤਰਨਾਕ ਕੋਡ** (Malicious Code) – ਉਹ ਕੋਡ ਜੋ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਉਸ ਦੇ ਵਿਕਾਸ ਦੌਰਾਨ ਐਪਲੀਕੇਸ਼ਨ ਮਾਲਕ ਦੀ ਜਾਣਕਾਰੀ ਤੋਂ ਬਿਨਾਂ ਪਾਇਆ ਜਾਂਦਾ ਹੈ ਅਤੇ ਜੋ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਇੱਛਿਤ ਸੁਰੱਖਿਆ ਨੀਤੀ ਨੂੰ ਬਾਈਪਾਸ ਕਰਦਾ ਹੈ। ਇਹ ਵਾਇਰਸ ਜਾਂ ਵਰਮ ਵਰਗੇ ਮਾਲਵੇਅਰ ਵਾਂਗ ਨਹੀਂ ਹੈ।
* **ਮਾਲਵੇਅਰ** (Malware) – ਚੱਲਣਯੋਗ ਕੋਡ ਜੋ ਰਨਟਾਈਮ ਦੌਰਾਨ ਐਪਲੀਕੇਸ਼ਨ ਉਪਭੋਗਤਾ ਜਾਂ ਪ੍ਰਸ਼ਾਸਕ ਦੀ ਜਾਣਕਾਰੀ ਤੋਂ ਬਿਨਾਂ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਪਾਇਆ ਜਾਂਦਾ ਹੈ।
* **ਸੁਨੇਹਾ ਪ੍ਰਮਾਣੀਕਰਨ ਕੋਡ** (Message authentication code, MAC) – ਡਾਟੇ 'ਤੇ ਇੱਕ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਚੈੱਕਸਮ, ਜੋ ਇੱਕ MAC ਜਨਰੇਸ਼ਨ ਐਲਗੋਰਿਦਮ ਦੁਆਰਾ ਗਿਣਿਆ ਜਾਂਦਾ ਹੈ ਅਤੇ ਜਿਸ ਦੀ ਵਰਤੋਂ ਉਸ ਡਾਟੇ ਦੀ ਅਖੰਡਤਾ (integrity) ਅਤੇ ਪ੍ਰਮਾਣਿਕਤਾ (authenticity) ਬਾਰੇ ਭਰੋਸਾ ਦੇਣ ਲਈ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।
* **ਬਹੁ-ਕਾਰਕ ਪ੍ਰਮਾਣੀਕਰਨ** (Multi-factor authentication, MFA) – ਅਜਿਹਾ ਪ੍ਰਮਾਣੀਕਰਨ ਜਿਸ ਵਿੱਚ ਇਕਹਿਰੇ ਕਾਰਕਾਂ ਵਿੱਚੋਂ ਦੋ ਜਾਂ ਵੱਧ ਸ਼ਾਮਲ ਹੁੰਦੇ ਹਨ।
* **Mutual TLS** (mTLS) – TLS ਕਲਾਇੰਟ ਪ੍ਰਮਾਣੀਕਰਨ ਵੇਖੋ।
* **Object-relational Mapping** (ORM) – ਇੱਕ ਪ੍ਰਣਾਲੀ ਜੋ ਕਿਸੇ ਰਿਲੇਸ਼ਨਲ/ਟੇਬਲ-ਆਧਾਰਿਤ ਡਾਟਾਬੇਸ ਨੂੰ ਐਪਲੀਕੇਸ਼ਨ-ਅਨੁਕੂਲ ਆਬਜੈਕਟ ਮਾਡਲ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ ਦੇ ਅੰਦਰੋਂ ਹਵਾਲਾ ਦੇਣ ਅਤੇ ਕਿਊਰੀ ਕਰਨ ਦੀ ਇਜਾਜ਼ਤ ਦੇਣ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।
* **ਇੱਕ-ਵਾਰੀ ਪਾਸਵਰਡ** (One-time Password, OTP) – ਇੱਕ ਪਾਸਵਰਡ ਜੋ ਸਿਰਫ਼ ਇੱਕ ਵਾਰ ਵਰਤੇ ਜਾਣ ਲਈ ਵਿਲੱਖਣ ਤੌਰ 'ਤੇ ਪੈਦਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
* **Open Worldwide Application Security Project** (OWASP) – Open Worldwide Application Security Project (OWASP) ਇੱਕ ਵਿਸ਼ਵ-ਵਿਆਪੀ ਮੁਫ਼ਤ ਅਤੇ ਖੁੱਲ੍ਹਾ ਭਾਈਚਾਰਾ ਹੈ ਜੋ ਐਪਲੀਕੇਸ਼ਨ ਸਾਫ਼ਟਵੇਅਰ ਦੀ ਸੁਰੱਖਿਆ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ 'ਤੇ ਕੇਂਦਰਿਤ ਹੈ। ਸਾਡਾ ਮਿਸ਼ਨ ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ ਨੂੰ "ਦਿਖਾਈ ਦੇਣ ਯੋਗ" ਬਣਾਉਣਾ ਹੈ, ਤਾਂ ਜੋ ਲੋਕ ਅਤੇ ਸੰਸਥਾਵਾਂ ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ ਜੋਖਮਾਂ ਬਾਰੇ ਸੂਚਿਤ ਫ਼ੈਸਲੇ ਲੈ ਸਕਣ। ਵੇਖੋ: [https://www.owasp.org/](https://www.owasp.org/)।
* **Password-Based Key Derivation Function 2** (PBKDF2) – ਇੱਕ ਖ਼ਾਸ ਇੱਕ-ਪਾਸੜ ਐਲਗੋਰਿਦਮ ਜੋ ਕਿਸੇ ਇਨਪੁੱਟ ਟੈਕਸਟ (ਜਿਵੇਂ ਕਿ ਪਾਸਵਰਡ) ਅਤੇ ਇੱਕ ਵਾਧੂ ਬੇਤਰਤੀਬ ਸਾਲਟ (salt) ਮੁੱਲ ਤੋਂ ਇੱਕ ਮਜ਼ਬੂਤ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਕੁੰਜੀ ਬਣਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਇਸ ਲਈ ਜੇ ਅਸਲ ਪਾਸਵਰਡ ਦੀ ਥਾਂ ਨਤੀਜਾ ਮੁੱਲ ਸਟੋਰ ਕੀਤਾ ਜਾਵੇ ਤਾਂ ਇਸ ਦੀ ਵਰਤੋਂ ਔਫ਼ਲਾਈਨ ਪਾਸਵਰਡ ਤੋੜਨਾ ਔਖਾ ਬਣਾਉਣ ਲਈ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।
* **Public Key Infrastructure** (PKI) – ਇੱਕ ਪ੍ਰਬੰਧ ਜੋ ਜਨਤਕ ਕੁੰਜੀਆਂ ਨੂੰ ਇਕਾਈਆਂ ਦੀਆਂ ਸੰਬੰਧਿਤ ਪਛਾਣਾਂ ਨਾਲ ਬੰਨ੍ਹਦਾ ਹੈ। ਇਹ ਬੰਧਨ ਕਿਸੇ ਸਰਟੀਫ਼ਿਕੇਟ ਅਥਾਰਟੀ (certificate authority, CA) ਕੋਲ ਅਤੇ ਉਸ ਦੁਆਰਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਸਰਟੀਫ਼ਿਕੇਟ ਜਾਰੀ ਕਰਨ ਦੀ ਪ੍ਰਕਿਰਿਆ ਰਾਹੀਂ ਸਥਾਪਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
* **ਜਨਤਕ ਸਵਿੱਚਡ ਟੈਲੀਫ਼ੋਨ ਨੈੱਟਵਰਕ** (Public Switched Telephone Network, PSTN) – ਰਵਾਇਤੀ ਟੈਲੀਫ਼ੋਨ ਨੈੱਟਵਰਕ ਜਿਸ ਵਿੱਚ ਲੈਂਡਲਾਈਨ ਟੈਲੀਫ਼ੋਨ ਅਤੇ ਮੋਬਾਈਲ ਟੈਲੀਫ਼ੋਨ ਦੋਵੇਂ ਸ਼ਾਮਲ ਹਨ।
* **Real-time Transport Protocol** (RTP) ਅਤੇ **Real-time Transport Control Protocol** (RTCP) – ਮਲਟੀਮੀਡੀਆ ਸਟ੍ਰੀਮਾਂ ਦੀ ਢੋਆ-ਢੁਆਈ ਲਈ ਇਕੱਠੇ ਵਰਤੇ ਜਾਣ ਵਾਲੇ ਦੋ ਪ੍ਰੋਟੋਕਾਲ। WebRTC ਸਟੈਕ ਦੁਆਰਾ ਵਰਤੇ ਜਾਂਦੇ ਹਨ। RFC 3550 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਹਵਾਲਾ ਟੋਕਨ** (Reference Token) – ਟੋਕਨ ਦੀ ਇੱਕ ਕਿਸਮ ਜੋ ਸਰਵਰ 'ਤੇ ਸਟੋਰ ਕੀਤੀ ਸਥਿਤੀ ਜਾਂ ਮੈਟਾਡਾਟਾ ਲਈ ਪੁਆਇੰਟਰ ਜਾਂ ਪਛਾਣਕਰਤਾ ਵਜੋਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਜਿਸ ਨੂੰ ਕਈ ਵਾਰ ਬੇਤਰਤੀਬ ਟੋਕਨ ਜਾਂ ਓਪੇਕ ਟੋਕਨ (opaque tokens) ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨਾਂ ਦੇ ਉਲਟ, ਜੋ ਆਪਣਾ ਕੁਝ ਸੰਬੰਧਿਤ ਡਾਟਾ ਟੋਕਨ ਦੇ ਅੰਦਰ ਹੀ ਸਮੇਟ ਲੈਂਦੇ ਹਨ, ਹਵਾਲਾ ਟੋਕਨਾਂ ਵਿੱਚ ਕੋਈ ਅੰਦਰੂਨੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਹੁੰਦੀ; ਇਸ ਦੀ ਬਜਾਏ ਉਹ ਸੰਦਰਭ ਲਈ ਸਰਵਰ 'ਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਨ। ਹਵਾਲਾ ਟੋਕਨ ਜਾਂ ਤਾਂ ਖ਼ੁਦ ਇੱਕ ਸੈਸ਼ਨ ਪਛਾਣਕਰਤਾ ਹੋਵੇਗਾ ਜਾਂ ਉਸ ਵਿੱਚ ਸੈਸ਼ਨ ਪਛਾਣਕਰਤਾ ਹੋਵੇਗਾ।
* **ਨਿਰਭਰ ਧਿਰ** (Relying Party, RP) – ਆਮ ਤੌਰ 'ਤੇ ਇੱਕ ਐਪਲੀਕੇਸ਼ਨ ਜੋ ਇਸ ਗੱਲ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ ਕਿ ਉਪਭੋਗਤਾ ਨੇ ਕਿਸੇ ਵੱਖਰੇ ਪ੍ਰਮਾਣੀਕਰਨ ਪ੍ਰਦਾਤਾ ਦੇ ਵਿਰੁੱਧ ਪ੍ਰਮਾਣੀਕਰਨ ਕੀਤਾ ਹੈ। ਐਪਲੀਕੇਸ਼ਨ ਇਹ ਭਰੋਸਾ ਕਰਨ ਲਈ ਕਿ ਉਪਭੋਗਤਾ ਉਹੀ ਹੈ ਜੋ ਉਹ ਹੋਣ ਦਾ ਦਾਅਵਾ ਕਰਦਾ ਹੈ, ਉਸ ਪ੍ਰਮਾਣੀਕਰਨ ਪ੍ਰਦਾਤਾ ਦੁਆਰਾ ਦਿੱਤੇ ਕਿਸੇ ਟੋਕਨ ਜਾਂ ਦਸਤਖ਼ਤ ਕੀਤੀਆਂ ਅਸਰਸ਼ਨਾਂ (assertions) ਦੇ ਸਮੂਹ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।
* **Remote File Inclusion** (RFI) – ਇੱਕ ਹਮਲਾ ਜੋ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਕਮਜ਼ੋਰ ਇਨਕਲੂਜ਼ਨ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦਾ ਸ਼ੋਸ਼ਣ ਕਰਦਾ ਹੈ, ਜਿਸ ਦੇ ਨਤੀਜੇ ਵਜੋਂ ਰਿਮੋਟ ਫ਼ਾਈਲਾਂ ਸ਼ਾਮਲ ਹੋ ਜਾਂਦੀਆਂ ਹਨ।
* **Scalable Vector Graphics** (SVG) – ਦੋ-ਅਯਾਮੀ ਵੈਕਟਰ ਗ੍ਰਾਫ਼ਿਕਸ ਦਾ ਵਰਣਨ ਕਰਨ ਲਈ ਇੱਕ XML-ਆਧਾਰਿਤ ਮਾਰਕਅੱਪ ਭਾਸ਼ਾ।
* **Secure Real-time Transport Protocol** (SRTP) ਅਤੇ **Secure Real-time Transport Control Protocol** (SRTCP) – RTP ਅਤੇ RTCP ਪ੍ਰੋਟੋਕਾਲਾਂ ਦੀ ਇੱਕ ਪ੍ਰੋਫ਼ਾਈਲ ਜੋ ਸੁਨੇਹਾ ਏਨਕ੍ਰਿਪਸ਼ਨ, ਪ੍ਰਮਾਣੀਕਰਨ ਅਤੇ ਅਖੰਡਤਾ ਸੁਰੱਖਿਆ ਲਈ ਸਮਰਥਨ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ। RFC 3711 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਸੁਰੱਖਿਆ ਆਰਕੀਟੈਕਚਰ** (Security Architecture) – ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੇ ਡਿਜ਼ਾਈਨ ਦਾ ਇੱਕ ਅਮੂਰਤ ਰੂਪ ਜੋ ਪਛਾਣਦਾ ਅਤੇ ਵਰਣਨ ਕਰਦਾ ਹੈ ਕਿ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਕਿੱਥੇ ਅਤੇ ਕਿਵੇਂ ਵਰਤੇ ਜਾਂਦੇ ਹਨ, ਅਤੇ ਨਾਲ ਹੀ ਉਪਭੋਗਤਾ ਅਤੇ ਐਪਲੀਕੇਸ਼ਨ ਦੋਵਾਂ ਦੇ ਡਾਟੇ ਦੀ ਥਾਂ ਅਤੇ ਸੰਵੇਦਨਸ਼ੀਲਤਾ ਦੀ ਪਛਾਣ ਅਤੇ ਵਰਣਨ ਵੀ ਕਰਦਾ ਹੈ।
* **Security Assertion Markup Language** (SAML) – ਪਛਾਣ ਪ੍ਰਦਾਤਾ ਅਤੇ ਨਿਰਭਰ ਧਿਰ ਦੇ ਵਿਚਕਾਰ ਦਸਤਖ਼ਤ ਕੀਤੀਆਂ ਅਸਰਸ਼ਨਾਂ (ਆਮ ਤੌਰ 'ਤੇ XML ਆਬਜੈਕਟ) ਭੇਜਣ 'ਤੇ ਆਧਾਰਿਤ ਸਿੰਗਲ ਸਾਈਨ-ਔਨ ਪ੍ਰਮਾਣੀਕਰਨ ਲਈ ਇੱਕ ਖੁੱਲ੍ਹਾ ਮਿਆਰ।
* **ਸੁਰੱਖਿਆ ਸੰਰਚਨਾ** (Security Configuration) – ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਰਨਟਾਈਮ ਸੰਰਚਨਾ ਜੋ ਇਸ ਗੱਲ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀ ਹੈ ਕਿ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਕਿਵੇਂ ਵਰਤੇ ਜਾਂਦੇ ਹਨ।
* **ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ** (Security Control) – ਇੱਕ ਫੰਕਸ਼ਨ ਜਾਂ ਘਟਕ ਜੋ ਕੋਈ ਸੁਰੱਖਿਆ ਜਾਂਚ ਕਰਦਾ ਹੈ (ਜਿਵੇਂ, ਅਧਿਕਾਰੀਕਰਨ ਜਾਂਚ) ਜਾਂ ਜਿਸ ਨੂੰ ਬੁਲਾਏ ਜਾਣ 'ਤੇ ਕੋਈ ਸੁਰੱਖਿਆ ਪ੍ਰਭਾਵ ਪੈਂਦਾ ਹੈ (ਜਿਵੇਂ, ਆਡਿਟ ਰਿਕਾਰਡ ਪੈਦਾ ਕਰਨਾ)।
* **Security information and event management** (SIEM) – ਕਿਸੇ ਸੰਸਥਾ ਦੇ IT ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਦੇ ਅੰਦਰ ਵੱਖ-ਵੱਖ ਸਰੋਤਾਂ ਤੋਂ ਸੁਰੱਖਿਆ-ਸੰਬੰਧੀ ਡਾਟੇ ਦੇ ਸੰਗ੍ਰਹਿ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਰਾਹੀਂ ਖ਼ਤਰਾ ਪਛਾਣ, ਪਾਲਣਾ ਅਤੇ ਸੁਰੱਖਿਆ ਘਟਨਾ ਪ੍ਰਬੰਧਨ ਲਈ ਇੱਕ ਸਿਸਟਮ।
* **ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨ** (Self-Contained Token) – ਇੱਕ ਟੋਕਨ ਜੋ ਇੱਕ ਜਾਂ ਵੱਧ ਅਜਿਹੇ ਗੁਣਾਂ ਨੂੰ ਸਮੇਟਦਾ ਹੈ ਜੋ ਸਰਵਰ-ਪਾਸੇ ਦੀ ਸਥਿਤੀ ਜਾਂ ਕਿਸੇ ਹੋਰ ਬਾਹਰੀ ਭੰਡਾਰਨ 'ਤੇ ਨਿਰਭਰ ਨਹੀਂ ਕਰਦੇ। ਇਹ ਟੋਕਨ ਆਪਣੇ ਵਿੱਚ ਸਮੇਟੇ ਗੁਣਾਂ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਖੰਡਤਾ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ, ਜਿਸ ਨਾਲ ਸਿਸਟਮਾਂ ਦੇ ਵਿਚਕਾਰ ਸੁਰੱਖਿਅਤ, "ਸਟੇਟਲੈੱਸ" ਜਾਣਕਾਰੀ ਵਟਾਂਦਰਾ ਸੰਭਵ ਹੁੰਦਾ ਹੈ। ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨ ਆਮ ਤੌਰ 'ਤੇ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਤਕਨੀਕਾਂ, ਜਿਵੇਂ ਕਿ ਡਿਜ਼ੀਟਲ ਦਸਤਖ਼ਤ ਜਾਂ message authentication codes (MACs), ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸੁਰੱਖਿਅਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਉਹਨਾਂ ਦੇ ਡਾਟੇ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ, ਅਖੰਡਤਾ, ਅਤੇ ਕੁਝ ਮਾਮਲਿਆਂ ਵਿੱਚ ਗੁਪਤਤਾ ਯਕੀਨੀ ਬਣਾਈ ਜਾ ਸਕੇ। ਆਮ ਉਦਾਹਰਨਾਂ ਵਿੱਚ SAML Assertions ਅਤੇ JWTs ਸ਼ਾਮਲ ਹਨ।
* **ਸਰਵਰ-ਪੱਖੀ ਬੇਨਤੀ ਜਾਅਲਸਾਜ਼ੀ** (Server-side Request Forgery, SSRF) – ਇੱਕ ਹਮਲਾ ਜੋ ਅੰਦਰੂਨੀ ਸਰੋਤਾਂ ਨੂੰ ਪੜ੍ਹਨ ਜਾਂ ਅੱਪਡੇਟ ਕਰਨ ਲਈ ਸਰਵਰ 'ਤੇ ਮੌਜੂਦ ਕਾਰਜਸ਼ੀਲਤਾ ਦੀ ਦੁਰਵਰਤੋਂ ਕਰਦਾ ਹੈ। ਹਮਲਾਵਰ ਇੱਕ URL ਦਿੰਦਾ ਜਾਂ ਸੋਧਦਾ ਹੈ, ਜਿਸ ਨੂੰ ਸਰਵਰ 'ਤੇ ਚੱਲ ਰਿਹਾ ਕੋਡ ਪੜ੍ਹੇਗਾ ਜਾਂ ਜਿਸ ਨੂੰ ਡਾਟਾ ਭੇਜੇਗਾ।
* **Session Description Protocol** (SDP) – ਮਲਟੀਮੀਡੀਆ ਸੈਸ਼ਨ ਸਥਾਪਿਤ ਕਰਨ ਲਈ ਇੱਕ ਸੁਨੇਹਾ ਫ਼ਾਰਮੈਟ (ਜਿਵੇਂ ਕਿ WebRTC ਵਿੱਚ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ)। RFC 4566 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਸੈਸ਼ਨ ਪਛਾਣਕਰਤਾ** ਜਾਂ **ਸੈਸ਼ਨ ID** (Session Identifier / Session ID) – ਇੱਕ ਕੁੰਜੀ ਜੋ ਬੈਕਐਂਡ 'ਤੇ ਸਟੋਰ ਕੀਤੇ ਸਟੇਟਫੁੱਲ ਸੈਸ਼ਨ ਦੀ ਪਛਾਣ ਕਰਦੀ ਹੈ। ਇਹ ਕਲਾਇੰਟ ਨੂੰ ਅਤੇ ਕਲਾਇੰਟ ਤੋਂ ਜਾਂ ਤਾਂ "ਹਵਾਲਾ ਟੋਕਨ" ਵਜੋਂ ਜਾਂ ਉਸ ਦੇ ਅੰਦਰ ਭੇਜੀ ਜਾਵੇਗੀ।
* **ਸੈਸ਼ਨ ਟੋਕਨ** (Session Token) – ਇਸ ਮਿਆਰ ਵਿੱਚ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਇੱਕ "ਸਭ-ਸਮੇਟਵਾਂ" ਵਾਕੰਸ਼ ਜੋ ਉਸ ਟੋਕਨ ਜਾਂ ਮੁੱਲ ਲਈ ਹੈ ਜੋ ਜਾਂ ਤਾਂ ਸਟੇਟਲੈੱਸ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀਆਂ (ਜੋ ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨ ਵਰਤਦੀਆਂ ਹਨ) ਵਿੱਚ ਜਾਂ ਸਟੇਟਫੁੱਲ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀਆਂ (ਜੋ ਹਵਾਲਾ ਟੋਕਨ ਵਰਤਦੀਆਂ ਹਨ) ਵਿੱਚ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।
* **Session Traversal Utilities for NAT** (STUN) – ਇੱਕ ਪ੍ਰੋਟੋਕਾਲ ਜੋ ਪੀਅਰ-ਟੂ-ਪੀਅਰ ਸੰਚਾਰ ਸਥਾਪਿਤ ਕਰਨ ਵਾਸਤੇ NAT ਟਰੈਵਰਸਲ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ। RFC 3489 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਇੱਕ-ਕਾਰਕ ਪ੍ਰਮਾਣੀਕਰਤਾ** (Single-factor authenticator) – ਇੱਕ ਪ੍ਰਣਾਲੀ ਜੋ ਇਹ ਜਾਂਚ ਕਰਦੀ ਹੈ ਕਿ ਉਪਭੋਗਤਾ ਪ੍ਰਮਾਣਿਤ ਹੈ। ਇਹ ਜਾਂ ਤਾਂ ਉਹ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਜੋ ਤੁਸੀਂ ਜਾਣਦੇ ਹੋ (ਯਾਦ ਰੱਖੇ ਭੇਦ, ਪਾਸਵਰਡ, ਪਾਸਫ਼੍ਰੇਜ਼, PIN), ਜੋ ਤੁਸੀਂ ਹੋ (ਬਾਇਓਮੈਟ੍ਰਿਕਸ, ਫ਼ਿੰਗਰਪ੍ਰਿੰਟ, ਚਿਹਰਾ ਸਕੈਨ), ਜਾਂ ਜੋ ਤੁਹਾਡੇ ਕੋਲ ਹੈ (OTP ਟੋਕਨ, ਸਮਾਰਟ ਕਾਰਡ ਵਰਗਾ ਕੋਈ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਯੰਤਰ)।
* **ਸਿੰਗਲ ਸਾਈਨ-ਔਨ ਪ੍ਰਮਾਣੀਕਰਨ** (Single Sign-on Authentication, SSO) – ਇਹ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਕੋਈ ਉਪਭੋਗਤਾ ਇੱਕ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਲੌਗਇਨ ਕਰਦਾ ਹੈ ਅਤੇ ਫਿਰ ਮੁੜ-ਪ੍ਰਮਾਣੀਕਰਨ ਕੀਤੇ ਬਿਨਾਂ ਆਪਣੇ ਆਪ ਹੋਰ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਲੌਗਇਨ ਹੋ ਜਾਂਦਾ ਹੈ। ਉਦਾਹਰਨ ਲਈ, Google ਵਿੱਚ ਲੌਗਇਨ ਕਰਨ 'ਤੇ, ਉਪਭੋਗਤਾ ਆਪਣੇ ਆਪ YouTube, Google Docs, ਅਤੇ Gmail ਵਰਗੀਆਂ ਹੋਰ Google ਸੇਵਾਵਾਂ ਵਿੱਚ ਲੌਗਇਨ ਹੋ ਜਾਵੇਗਾ।
* **ਸਾਫ਼ਟਵੇਅਰ ਸਮੱਗਰੀ ਸੂਚੀ** (Software bill of materials, SBOM) – ਕਿਸੇ ਸਾਫ਼ਟਵੇਅਰ ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਬਣਾਉਣ ਜਾਂ ਜੋੜਨ ਲਈ ਲੋੜੀਂਦੇ ਸਾਰੇ ਘਟਕਾਂ, ਮੋਡੀਊਲਾਂ, ਲਾਇਬ੍ਰੇਰੀਆਂ, ਫ੍ਰੇਮਵਰਕਾਂ ਅਤੇ ਹੋਰ ਸਰੋਤਾਂ ਦੀ ਇੱਕ ਢਾਂਚਾਗਤ, ਵਿਆਪਕ ਸੂਚੀ।
* **ਸਾਫ਼ਟਵੇਅਰ ਰਚਨਾ ਵਿਸ਼ਲੇਸ਼ਣ** (Software Composition Analysis, SCA) – ਤਕਨਾਲੋਜੀਆਂ ਦਾ ਇੱਕ ਸਮੂਹ ਜੋ ਵਰਤੋਂ ਵਿੱਚ ਖ਼ਾਸ ਘਟਕ ਸੰਸਕਰਣਾਂ ਦੀਆਂ ਸੁਰੱਖਿਆ ਕਮਜ਼ੋਰੀਆਂ ਲਈ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਰਚਨਾ, ਨਿਰਭਰਤਾਵਾਂ, ਲਾਇਬ੍ਰੇਰੀਆਂ ਅਤੇ ਪੈਕੇਜਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ। ਇਸ ਨੂੰ ਸਰੋਤ-ਕੋਡ ਵਿਸ਼ਲੇਸ਼ਣ ਨਾਲ ਭੁਲੇਖਾ ਨਹੀਂ ਖਾਣਾ ਚਾਹੀਦਾ, ਜਿਸ ਨੂੰ ਹੁਣ ਆਮ ਤੌਰ 'ਤੇ SAST ਕਿਹਾ ਜਾਂਦਾ ਹੈ।
* **ਸਾਫ਼ਟਵੇਅਰ ਵਿਕਾਸ ਜੀਵਨ-ਚੱਕਰ** (Software development lifecycle, SDLC) – ਕਦਮ-ਦਰ-ਕਦਮ ਪ੍ਰਕਿਰਿਆ ਜਿਸ ਰਾਹੀਂ ਸਾਫ਼ਟਵੇਅਰ ਸ਼ੁਰੂਆਤੀ ਲੋੜਾਂ ਤੋਂ ਲੈ ਕੇ ਤਾਇਨਾਤੀ ਅਤੇ ਸਾਂਭ-ਸੰਭਾਲ ਤੱਕ ਵਿਕਸਿਤ ਹੁੰਦਾ ਹੈ।
* **SQL Injection** (SQLi) – ਇੱਕ ਕੋਡ ਇੰਜੈਕਸ਼ਨ ਤਕਨੀਕ ਜੋ ਡਾਟਾ-ਸੰਚਾਲਿਤ ਐਪਲੀਕੇਸ਼ਨਾਂ 'ਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਖ਼ਤਰਨਾਕ SQL ਸਟੇਟਮੈਂਟ ਕਿਸੇ ਦਾਖ਼ਲਾ ਬਿੰਦੂ ਵਿੱਚ ਪਾਏ ਜਾਂਦੇ ਹਨ।
* **ਸਟੇਟਫੁੱਲ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀ** (Stateful Session Mechanism) – ਸਟੇਟਫੁੱਲ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀ ਵਿੱਚ, ਐਪਲੀਕੇਸ਼ਨ ਬੈਕਐਂਡ 'ਤੇ ਸੈਸ਼ਨ ਸਥਿਤੀ ਕਾਇਮ ਰੱਖਦੀ ਹੈ ਜੋ ਆਮ ਤੌਰ 'ਤੇ ਕਿਸੇ ਸੈਸ਼ਨ ਟੋਕਨ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ; ਇਹ ਟੋਕਨ ਇੱਕ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਛਦਮ-ਬੇਤਰਤੀਬ ਨੰਬਰ ਜਨਰੇਟਰ (CSPRNG) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪੈਦਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਅੰਤਮ ਉਪਭੋਗਤਾ ਨੂੰ ਜਾਰੀ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
* **ਸਟੇਟਲੈੱਸ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀ** (Stateless Session Mechanism) – ਇੱਕ ਸਟੇਟਲੈੱਸ ਸੈਸ਼ਨ ਪ੍ਰਣਾਲੀ ਅਜਿਹਾ ਸਵੈ-ਨਿਰਭਰ ਟੋਕਨ ਵਰਤੇਗੀ ਜੋ ਕਲਾਇੰਟਾਂ ਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ ਅਤੇ ਜਿਸ ਵਿੱਚ ਸੈਸ਼ਨ ਜਾਣਕਾਰੀ ਹੁੰਦੀ ਹੈ ਜੋ ਜ਼ਰੂਰੀ ਨਹੀਂ ਕਿ ਉਸ ਸੇਵਾ ਦੇ ਅੰਦਰ ਸਟੋਰ ਕੀਤੀ ਹੋਵੇ ਜੋ ਫਿਰ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰਦੀ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਕਰਦੀ ਹੈ। ਅਸਲੀਅਤ ਵਿੱਚ, ਲੋੜੀਂਦੇ ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣ ਲਾਗੂ ਕਰਨ ਦੇ ਯੋਗ ਹੋਣ ਲਈ ਕਿਸੇ ਸੇਵਾ ਨੂੰ ਕੁਝ ਸੈਸ਼ਨ ਜਾਣਕਾਰੀ (ਜਿਵੇਂ ਕਿ JWT ਰੱਦ ਕਰਨ ਦੀ ਸੂਚੀ) ਤੱਕ ਪਹੁੰਚ ਦੀ ਲੋੜ ਹੋਵੇਗੀ।
* **ਸਥਿਰ ਐਪਲੀਕੇਸ਼ਨ ਸੁਰੱਖਿਆ ਟੈਸਟਿੰਗ** (Static application security testing, SAST) – ਤਕਨਾਲੋਜੀਆਂ ਦਾ ਇੱਕ ਸਮੂਹ ਜੋ ਐਪਲੀਕੇਸ਼ਨ ਸਰੋਤ ਕੋਡ, ਬਾਈਟ ਕੋਡ ਅਤੇ ਬਾਈਨਰੀਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਉਹਨਾਂ ਕੋਡਿੰਗ ਅਤੇ ਡਿਜ਼ਾਈਨ ਹਾਲਤਾਂ ਲਈ ਕਰਨ ਵਾਸਤੇ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ ਜੋ ਸੁਰੱਖਿਆ ਕਮਜ਼ੋਰੀਆਂ ਦਾ ਸੰਕੇਤ ਦਿੰਦੀਆਂ ਹਨ। SAST ਹੱਲ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਨਾ-ਚੱਲਦੀ ਹਾਲਤ ਵਿੱਚ "ਅੰਦਰੋਂ ਬਾਹਰ" ਵੱਲ ਕਰਦੇ ਹਨ।
* **ਖ਼ਤਰਾ ਮਾਡਲਿੰਗ** (Threat Modeling) – ਇੱਕ ਤਕਨੀਕ ਜਿਸ ਵਿੱਚ ਖ਼ਤਰਾ ਏਜੰਟਾਂ, ਸੁਰੱਖਿਆ ਖੇਤਰਾਂ, ਸੁਰੱਖਿਆ ਨਿਯੰਤਰਣਾਂ, ਅਤੇ ਮਹੱਤਵਪੂਰਨ ਤਕਨੀਕੀ ਤੇ ਕਾਰੋਬਾਰੀ ਸੰਪਤੀਆਂ ਦੀ ਪਛਾਣ ਕਰਨ ਲਈ ਲਗਾਤਾਰ ਹੋਰ ਸੁਧਰੇ ਹੋਏ ਸੁਰੱਖਿਆ ਆਰਕੀਟੈਕਚਰ ਵਿਕਸਿਤ ਕਰਨਾ ਸ਼ਾਮਲ ਹੈ।
* **ਜਾਂਚ-ਦੇ-ਸਮੇਂ ਤੋਂ ਵਰਤੋਂ-ਦੇ-ਸਮੇਂ** (Time-of-check to time-of-use, TOCTOU) – ਇੱਕ ਸਥਿਤੀ ਜਿੱਥੇ ਕੋਈ ਐਪਲੀਕੇਸ਼ਨ ਕਿਸੇ ਸਰੋਤ ਦੀ ਵਰਤੋਂ ਤੋਂ ਪਹਿਲਾਂ ਉਸ ਦੀ ਸਥਿਤੀ ਦੀ ਜਾਂਚ ਕਰਦੀ ਹੈ, ਪਰ ਜਾਂਚ ਅਤੇ ਵਰਤੋਂ ਦੇ ਵਿਚਕਾਰ ਉਸ ਸਰੋਤ ਦੀ ਸਥਿਤੀ ਬਦਲ ਸਕਦੀ ਹੈ। ਇਹ ਜਾਂਚ ਦੇ ਨਤੀਜਿਆਂ ਨੂੰ ਅਯੋਗ ਕਰ ਸਕਦਾ ਹੈ ਅਤੇ ਅਜਿਹੀ ਸਥਿਤੀ ਪੈਦਾ ਕਰ ਸਕਦਾ ਹੈ ਜਿੱਥੇ ਐਪਲੀਕੇਸ਼ਨ ਇਸ ਸਥਿਤੀ ਦੇ ਬੇਮੇਲ ਹੋਣ ਕਾਰਨ ਅਯੋਗ ਕਾਰਵਾਈਆਂ ਕਰਦੀ ਹੈ।
* **ਸਮਾਂ-ਆਧਾਰਿਤ ਇੱਕ-ਵਾਰੀ ਪਾਸਵਰਡ** (Time based One-time Passwords, TOTPs) – OTP ਪੈਦਾ ਕਰਨ ਦਾ ਇੱਕ ਢੰਗ ਜਿੱਥੇ ਮੌਜੂਦਾ ਸਮਾਂ ਪਾਸਵਰਡ ਪੈਦਾ ਕਰਨ ਵਾਲੇ ਐਲਗੋਰਿਦਮ ਦੇ ਹਿੱਸੇ ਵਜੋਂ ਕੰਮ ਕਰਦਾ ਹੈ।
* **TLS ਕਲਾਇੰਟ ਪ੍ਰਮਾਣੀਕਰਨ**, ਜਿਸ ਨੂੰ **Mutual TLS** (mTLS) ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ – ਇੱਕ ਮਿਆਰੀ TLS ਕਨੈਕਸ਼ਨ ਵਿੱਚ, ਕਲਾਇੰਟ ਸਰਵਰ ਦੀ ਪਛਾਣ ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਲਈ ਸਰਵਰ ਦੁਆਰਾ ਦਿੱਤਾ ਸਰਟੀਫ਼ਿਕੇਟ ਵਰਤ ਸਕਦਾ ਹੈ। ਜਿੱਥੇ TLS ਕਲਾਇੰਟ ਪ੍ਰਮਾਣੀਕਰਨ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਉੱਥੇ ਕਲਾਇੰਟ ਵੀ ਆਪਣੀ ਨਿੱਜੀ ਕੁੰਜੀ ਅਤੇ ਸਰਟੀਫ਼ਿਕੇਟ ਵਰਤਦਾ ਹੈ ਤਾਂ ਜੋ ਸਰਵਰ ਵੀ ਕਲਾਇੰਟ ਦੀ ਪਛਾਣ ਪ੍ਰਮਾਣਿਤ ਕਰ ਸਕੇ।
* **Transport Layer Security** (TLS) – ਕ੍ਰਿਪਟੋਗ੍ਰਾਫ਼ਿਕ ਪ੍ਰੋਟੋਕਾਲ ਜੋ ਨੈੱਟਵਰਕ ਕਨੈਕਸ਼ਨ ਉੱਤੇ ਸੰਚਾਰ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ।
* **Traversal Using Relays around NAT** (TURN) – STUN ਪ੍ਰੋਟੋਕਾਲ ਦਾ ਇੱਕ ਵਿਸਤਾਰ ਜੋ ਸਿੱਧੇ ਪੀਅਰ-ਟੂ-ਪੀਅਰ ਕਨੈਕਸ਼ਨ ਸਥਾਪਿਤ ਨਾ ਹੋ ਸਕਣ 'ਤੇ TURN ਸਰਵਰ ਨੂੰ ਰੀਲੇਅ ਵਜੋਂ ਵਰਤਦਾ ਹੈ। RFC 8656 ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ।
* **ਭਰੋਸੇਯੋਗ ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਵਾਤਾਵਰਣ** (Trusted execution environment, TEE) – ਇੱਕ ਅਲਹਿਦਾ ਪ੍ਰੋਸੈਸਿੰਗ ਵਾਤਾਵਰਣ ਜਿਸ ਵਿੱਚ ਐਪਲੀਕੇਸ਼ਨਾਂ ਨੂੰ ਬਾਕੀ ਸਿਸਟਮ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਚਲਾਇਆ ਜਾ ਸਕਦਾ ਹੈ।
* **ਭਰੋਸੇਯੋਗ ਪਲੇਟਫ਼ਾਰਮ ਮੋਡੀਊਲ** (Trusted Platform Module, TPM) – HSM ਦੀ ਇੱਕ ਕਿਸਮ ਜੋ ਆਮ ਤੌਰ 'ਤੇ ਕਿਸੇ ਵੱਡੇ ਹਾਰਡਵੇਅਰ ਘਟਕ, ਜਿਵੇਂ ਕਿ ਮਦਰਬੋਰਡ, ਨਾਲ ਜੁੜੀ ਹੁੰਦੀ ਹੈ ਅਤੇ ਉਸ ਸਿਸਟਮ ਲਈ "ਭਰੋਸੇ ਦੀ ਜੜ੍ਹ" (root of trust) ਵਜੋਂ ਕੰਮ ਕਰਦੀ ਹੈ।
* **ਭਰੋਸੇਯੋਗ ਸੇਵਾ ਪਰਤ** (Trusted Service Layer) – ਕੋਈ ਵੀ ਭਰੋਸੇਯੋਗ ਨਿਯੰਤਰਣ ਲਾਗੂਕਰਨ ਬਿੰਦੂ, ਜਿਵੇਂ ਕਿ ਮਾਈਕ੍ਰੋਸਰਵਿਸ, ਸਰਵਰਲੈੱਸ API, ਸਰਵਰ-ਪਾਸਾ, ਸੁਰੱਖਿਅਤ ਬੂਟ ਵਾਲੇ ਕਲਾਇੰਟ ਯੰਤਰ 'ਤੇ ਕੋਈ ਭਰੋਸੇਯੋਗ API, ਭਾਈਵਾਲ ਜਾਂ ਬਾਹਰੀ API, ਆਦਿ। ਭਰੋਸੇਯੋਗ ਦਾ ਅਰਥ ਹੈ ਕਿ ਇਹ ਚਿੰਤਾ ਨਹੀਂ ਹੈ ਕਿ ਕੋਈ ਗ਼ੈਰ-ਭਰੋਸੇਯੋਗ ਉਪਭੋਗਤਾ ਉਸ ਪਰਤ ਨੂੰ ਜਾਂ ਉਸ ਪਰਤ 'ਤੇ ਲਾਗੂ ਕੀਤੇ ਨਿਯੰਤਰਣਾਂ ਨੂੰ ਬਾਈਪਾਸ ਕਰ ਸਕੇਗਾ ਜਾਂ ਛੱਡ ਸਕੇਗਾ।
* **Uniform Resource Identifier** (URI) – ਅੱਖਰਾਂ ਦੀ ਇੱਕ ਵਿਲੱਖਣ ਲੜੀ ਜੋ ਕਿਸੇ ਸਰੋਤ ਦੀ ਪਛਾਣ ਕਰਦੀ ਹੈ, ਜਿਵੇਂ ਕਿ ਵੈੱਬਪੇਜ, ਮੇਲ ਪਤਾ, ਥਾਵਾਂ।
* **Uniform Resource Locator** (URL) – ਇੱਕ ਲੜੀ ਜੋ ਇੰਟਰਨੈੱਟ 'ਤੇ ਕਿਸੇ ਸਰੋਤ ਦੀ ਥਾਂ ਨਿਰਧਾਰਤ ਕਰਦੀ ਹੈ।
* **Universally Unique Identifier** (UUID) – ਇੱਕ ਵਿਲੱਖਣ ਹਵਾਲਾ ਨੰਬਰ ਜੋ ਸਾਫ਼ਟਵੇਅਰ ਵਿੱਚ ਪਛਾਣਕਰਤਾ ਵਜੋਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।
* **ਤਸਦੀਕਕਰਤਾ** (Verifier) – ਉਹ ਵਿਅਕਤੀ ਜਾਂ ਟੀਮ ਜੋ OWASP ASVS ਲੋੜਾਂ ਦੇ ਵਿਰੁੱਧ ਕਿਸੇ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਸਮੀਖਿਆ ਕਰ ਰਹੀ ਹੈ।
* **Web Real-Time Communication** (WebRTC) – ਇੱਕ ਪ੍ਰੋਟੋਕਾਲ ਸਟੈਕ ਅਤੇ ਸੰਬੰਧਿਤ ਵੈੱਬ API ਜੋ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਮਲਟੀਮੀਡੀਆ ਸਟ੍ਰੀਮਾਂ ਦੀ ਢੋਆ-ਢੁਆਈ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਆਮ ਤੌਰ 'ਤੇ ਟੈਲੀਕਾਨਫ਼ਰੰਸਿੰਗ ਦੇ ਸੰਦਰਭ ਵਿੱਚ। SRTP, SRTCP, DTLS, SDP ਅਤੇ STUN/TURN 'ਤੇ ਆਧਾਰਿਤ।
* **WebSocket over TLS** (WSS) – TLS ਪ੍ਰੋਟੋਕਾਲ ਉੱਤੇ WebSocket ਦੀ ਪਰਤ ਲਗਾ ਕੇ WebSocket ਸੰਚਾਰ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰਨ ਦੀ ਇੱਕ ਪ੍ਰਥਾ।
* **What You See Is What You Get** (WYSIWYG) – ਇੱਕ ਕਿਸਮ ਦਾ ਰਿਚ-ਕੰਟੈਂਟ ਸੰਪਾਦਕ ਜੋ ਰੈਂਡਰਿੰਗ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਨ ਵਾਲਾ ਕੋਡ ਦਿਖਾਉਣ ਦੀ ਬਜਾਏ ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਰੈਂਡਰ ਹੋਣ 'ਤੇ ਸਮੱਗਰੀ ਅਸਲ ਵਿੱਚ ਕਿਵੇਂ ਦਿਖਾਈ ਦੇਵੇਗੀ।
* **X.509 ਸਰਟੀਫ਼ਿਕੇਟ** (X.509 Certificate) – X.509 ਸਰਟੀਫ਼ਿਕੇਟ ਇੱਕ ਡਿਜ਼ੀਟਲ ਸਰਟੀਫ਼ਿਕੇਟ ਹੈ ਜੋ ਵਿਆਪਕ ਤੌਰ 'ਤੇ ਪ੍ਰਵਾਨਿਤ ਅੰਤਰਰਾਸ਼ਟਰੀ X.509 ਜਨਤਕ ਕੁੰਜੀ ਬੁਨਿਆਦੀ ਢਾਂਚਾ (PKI) ਮਿਆਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਹ ਤਸਦੀਕ ਕਰਦਾ ਹੈ ਕਿ ਕੋਈ ਜਨਤਕ ਕੁੰਜੀ ਸਰਟੀਫ਼ਿਕੇਟ ਵਿੱਚ ਮੌਜੂਦ ਉਪਭੋਗਤਾ, ਕੰਪਿਊਟਰ ਜਾਂ ਸੇਵਾ ਪਛਾਣ ਦੀ ਹੈ।
* **XML eXternal Entity** (XXE) – ਇੱਕ ਕਿਸਮ ਦੀ XML ਐਂਟਿਟੀ ਜੋ ਕਿਸੇ ਘੋਸ਼ਿਤ ਸਿਸਟਮ ਪਛਾਣਕਰਤਾ ਰਾਹੀਂ ਸਥਾਨਕ ਜਾਂ ਰਿਮੋਟ ਸਮੱਗਰੀ ਤੱਕ ਪਹੁੰਚ ਕਰ ਸਕਦੀ ਹੈ। ਇਸ ਨਾਲ ਕਈ ਤਰ੍ਹਾਂ ਦੇ ਇੰਜੈਕਸ਼ਨ ਹਮਲੇ ਹੋ ਸਕਦੇ ਹਨ।

---

[← Previous: V17 WebRTC (ਵੈੱਬਆਰਟੀਸੀ)](/blog/asvs-panjabi-review-v17-webrtc) | [Back to Review Hub](/blog/asvs-panjabi-review-hub) | [Next: Appendix B: References (ਅੰਤਿਕਾ B: ਹਵਾਲੇ) →](/blog/asvs-panjabi-review-appendix-b-references)
