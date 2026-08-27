#!/usr/bin/env python3
"""Update hub table/timeline, main post link list, and CLAUDE.md hidden-post count from the fork's completed chapters."""
import re, os, sys
sys.argv = [sys.argv[0], sys.argv[1]]
W = sys.argv[1]; FORK = os.environ.get('ASVS_PA_DIR', '/Volumes/2TBSSD/Development/Git/OpenSource/OWASP-Panjabi/5.0/pa-IN')
G = re.compile(r'[਀-੿]')
DESC = {
 'what-is-the-asvs': ('0x03-What-is-the-ASVS.md', 'What the ASVS covers, its three levels, and how to use it'),
 'assessment-certification': ('0x04-Assessment_and_Certification.md', 'How ASVS is assessed and certified'),
 'changes-from-v4': ('0x05-For-Users-Of-4.0.md', 'What changed for users of ASVS 4.0'),
 'v1-encoding-and-sanitization': ('0x10-V1-Encoding-and-Sanitization.md', 'Output encoding and input sanitization requirements (injection defence)'),
 'v2-validation-and-business-logic': ('0x11-V2-Validation-and-Business-Logic.md', 'Input validation and business logic requirements'),
 'v3-web-frontend-security': ('0x12-V3-Web-Frontend-Security.md', 'Browser security headers, cookies, and frontend protections'),
 'v4-api-and-web-service': ('0x13-V4-API-and-Web-Service.md', 'REST, GraphQL, and WebSocket API security requirements'),
 'v5-file-handling': ('0x14-V5-File-Handling.md', 'File upload, storage, and download requirements'),
 'v6-authentication': ('0x15-V6-Authentication.md', 'Passwords, multi-factor, and credential lifecycle requirements'),
 'v7-session-management': ('0x16-V7-Session-Management.md', 'Session creation, timeout, and termination requirements'),
 'v8-authorization': ('0x17-V8-Authorization.md', 'Access control and authorization requirements'),
 'v9-self-contained-tokens': ('0x18-V9-Self-contained-Tokens.md', 'JWT / self-contained token validation requirements'),
 'v10-oauth-and-oidc': ('0x19-V10-OAuth-and-OIDC.md', 'OAuth 2.0 and OpenID Connect client, server, and token requirements'),
 'v11-cryptography': ('0x20-V11-Cryptography.md', 'Algorithms, key management, and randomness requirements'),
 'v12-secure-communication': ('0x21-V12-Secure-Communication.md', 'TLS and secure communication requirements'),
 'v13-configuration': ('0x22-V13-Configuration.md', 'Secure configuration, secrets, and dependency requirements'),
 'v14-data-protection': ('0x23-V14-Data-Protection.md', 'Sensitive-data classification, storage, and caching requirements'),
 'v15-secure-coding-and-architecture': ('0x24-V15-Secure-Coding-and-Architecture.md', 'Architecture, safe coding, and defensive-design requirements'),
 'v16-security-logging-and-error-handling': ('0x25-V16-Security-Logging-and-Error-Handling.md', 'Security logging, log protection, and error-handling requirements'),
 'v17-webrtc': ('0x26-V17-WebRTC.md', 'WebRTC signaling, TURN, and media-security requirements'),
 'appendix-a-glossary': ('0x90-Appendix-A_Glossary.md', 'Glossary of ASVS terms in English and Gurmukhi'),
 'appendix-b-references': ('0x91-Appendix-B_References.md', 'Related OWASP projects and external references'),
 'appendix-c-cryptography': ('0x92-Appendix-C_Cryptography.md', 'Cryptographic algorithm and key-strength recommendations'),
 'appendix-d-recommendations': ('0x93-Appendix-D_Recommendations.md', 'Further recommendations for verifiers and implementers'),
 'appendix-e-contributors': ('0x94-Appendix-E_Contributors.md', 'Contributors since the ASVS 4.0.0 release'),
}
ORDER = list(DESC)
ALL_REQ = ['V1 Encoding and Sanitization','V2 Validation and Business Logic','V3 Web Frontend Security','V4 API and Web Service','V5 File Handling','V6 Authentication','V7 Session Management','V8 Authorization','V9 Self-contained Tokens','V10 OAuth and OIDC','V11 Cryptography','V12 Secure Communication','V13 Configuration','V14 Data Protection','V15 Secure Coding and Architecture','V16 Security Logging and Error Handling','V17 WebRTC']
def title_of(slug):
    p = os.path.join(W, 'posts', f'asvs-panjabi-review-{slug}.md')
    if not os.path.exists(p): return None
    m = re.search(r'^title: "ASVS Panjabi Review — (.*)"$', open(p, encoding='utf-8').read(), re.M)
    return m.group(1)
avail = [(s, title_of(s)) for s in ORDER if title_of(s)]
def hub_label(label):  # "V5 File Handling (V5 ਫ਼ਾਈਲ ਪ੍ਰਬੰਧਨ)" -> "**V5 File Handling** (V5 ਫ਼ਾਈਲ ਪ੍ਰਬੰਧਨ)"
    m = re.match(r'(.*?) \((.*)\)$', label); return f'**{m.group(1)}** ({m.group(2)})'
NUM = {8:'Eight',9:'Nine',10:'Ten',11:'Eleven',12:'Twelve',13:'Thirteen',14:'Fourteen',15:'Fifteen',16:'Sixteen',17:'Seventeen',18:'Eighteen',19:'Nineteen',20:'Twenty',21:'Twenty-one',22:'Twenty-two',23:'Twenty-three',24:'Twenty-four',25:'Twenty-five',26:'Twenty-six',27:'Twenty-seven',28:'Twenty-eight',29:'Twenty-nine'}
n = len(avail) + 2  # + title page + introduction
# --- hub
hp = os.path.join(W, 'posts', 'asvs-panjabi-review-hub.md'); h = open(hp, encoding='utf-8').read()
h = re.sub(r'\*\*\w+ bilingual chapters are ready for review\*\*', f'**{NUM[n]} bilingual chapters are ready for review**', h)
rows = ''.join(f'| {hub_label(t)} | {DESC[s][1]} | [Read](/blog/asvs-panjabi-review-{s}) |\n' for s, t in avail)
h = re.sub(r'(\| \*\*Introduction\*\* .*\n)(?:\| .*\n)*?(\| \*\*Glossary\*\*)', lambda m: m.group(1) + rows + m.group(2), h)
done_req = [t.split(' (')[0] for s, t in avail if s.startswith('v')]
remaining = [c for c in ALL_REQ if c not in done_req]
if remaining:
    phase_c = ('| **C** (In Progress) | Now bilingual: *What is the ASVS?*, ' + ', '.join(f'*{c}*' for c in done_req if c not in ('V5 File Handling','V8 Authorization','V9 Self-contained Tokens','V12 Secure Communication'))
               + ' (August 2026). Remaining: ' + ', '.join(remaining) + ' | 2026 |')
else:
    phase_c = '| **C** (Complete) | All 17 security-requirement chapters (V1–V17) and *What is the ASVS?* are bilingual | August 2026 |'
h = re.sub(r'^\| \*\*C\*\* .*$', phase_c, h, flags=re.M)
open(hp, 'w', encoding='utf-8').write(h)
# --- main post
mp = os.path.join(W, 'posts', 'owasp-asvs-panjabi-translation.md'); m_ = open(mp, encoding='utf-8').read()
links = ''.join(f'- [{t}](/blog/asvs-panjabi-review-{s})\n' for s, t in avail)
m_ = re.sub(r'(- \[Introduction \(ਮੁਖਬੰਧ\)\]\(/blog/asvs-panjabi-review-preface\)\n)(?:- .*\n)*?(- \[Glossary)', lambda x: x.group(1) + links + x.group(2), m_)
import re as _re
if not remaining: m_ = _re.sub(r'(leave inline comments\. )[^\n]*?(\n)', lambda x: x.group(1) + (f'All seventeen security-requirement chapters (V1–V17) plus the introductory chapters are now bilingual and ready for review; the appendices are next.' if not remaining else f'{len(done_req)} security-requirement chapters are now bilingual and ready for review; {", ".join(remaining)} are next.') + x.group(2), m_, count=1)
open(mp, 'w', encoding='utf-8').write(m_)
# --- CLAUDE.md count
cp = os.path.join(W, 'CLAUDE.md'); c = open(cp, encoding='utf-8').read()
c = re.sub(r'the ASVS Panjabi review series alone is now \*\*\d+ hidden posts\*\* \(.*?\)\.',
           f'the ASVS Panjabi review series alone is now **{n+2} hidden posts** (hub, glossary, title page, introduction, plus {n-2} chapter pages regenerated from the fork by the converter — see docs/asvs-review-pages-plan.md).', c)
open(cp, 'w', encoding='utf-8').write(c)
print(f'hub: {n} chapters listed; remaining: {remaining}')
