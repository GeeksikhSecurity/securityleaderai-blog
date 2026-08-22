#!/usr/bin/env python3
"""Regenerate ASVS Panjabi review chapter posts from the fork's 5.0/pa-IN files + rewire nav chain."""
import re, os, sys, datetime
FORK = os.environ.get('ASVS_PA_DIR', '/Volumes/2TBSSD/Development/Git/OpenSource/OWASP-Panjabi/5.0/pa-IN')
POSTS = os.path.join(os.path.dirname(os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else '.')), 'posts') if False else sys.argv[1]
TODAY = '2026-08-21'
# (slug, fork file or None for custom wrapper pages)
CHAIN = [
    ('frontispiece', None), ('preface', None),
    ('what-is-the-asvs', '0x03-What-is-the-ASVS.md'),
    ('assessment-certification', '0x04-Assessment_and_Certification.md'),
    ('changes-from-v4', '0x05-For-Users-Of-4.0.md'),
    ('v1-encoding-and-sanitization', '0x10-V1-Encoding-and-Sanitization.md'),
    ('v2-validation-and-business-logic', '0x11-V2-Validation-and-Business-Logic.md'),
    ('v3-web-frontend-security', '0x12-V3-Web-Frontend-Security.md'),
    ('v4-api-and-web-service', '0x13-V4-API-and-Web-Service.md'),
    ('v5-file-handling', '0x14-V5-File-Handling.md'),
    ('v6-authentication', '0x15-V6-Authentication.md'),
    ('v7-session-management', '0x16-V7-Session-Management.md'),
    ('v8-authorization', '0x17-V8-Authorization.md'),
    ('v9-self-contained-tokens', '0x18-V9-Self-contained-Tokens.md'),
    ('v12-secure-communication', '0x21-V12-Secure-Communication.md'),
    ('glossary', None),
]
CUSTOM_LABELS = {'frontispiece': 'Title Page (ਮੁੱਖ ਪੰਨਾ)', 'preface': 'Introduction (ਮੁਖਬੰਧ)', 'glossary': 'Glossary (ਸ਼ਬਦਾਵਲੀ)'}
G = re.compile(r'[਀-੿]')
def post_path(slug): return os.path.join(POSTS, f'asvs-panjabi-review-{slug}.md')
def fm(path):
    s = open(path, encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---\n', s, re.S)
    d = dict(re.findall(r'^(\w+): "(.*)"$', m.group(1), re.M)) if m else {}
    return d
def fork_status(fname):
    p = os.path.join(FORK, fname)
    if not os.path.exists(p): return None
    s = open(p, encoding='utf-8').read()
    if '✅ Complete' not in s.split('\n', 1)[0]: return None
    return s
def h1s(body):
    hs = re.findall(r'^# (.+)$', body, re.M)
    en = next((h for h in hs if not G.search(h)), None); pa = next((h for h in hs if G.search(h)), None)
    return en, pa
# resolve labels + availability
items = []
for slug, fname in CHAIN:
    if fname is None:
        items.append(dict(slug=slug, custom=True, label=CUSTOM_LABELS[slug], avail=os.path.exists(post_path(slug)))); continue
    s = fork_status(fname)
    if s is None:
        print(f'SKIP {slug}: fork file missing or not marked Complete'); items.append(dict(slug=slug, avail=False)); continue
    en, pa = h1s(s)
    existing = fm(post_path(slug)) if os.path.exists(post_path(slug)) else {}
    label = existing.get('title', '').replace('ASVS Panjabi Review — ', '') or f'{en} ({pa})'
    items.append(dict(slug=slug, custom=False, body=s, en=en, pa=pa, label=label, existing=existing, avail=True))
avail = [it for it in items if it['avail']]
def nav(i):
    parts = []
    if i > 0: parts.append(f'[← Previous: {avail[i-1]["label"]}](/blog/asvs-panjabi-review-{avail[i-1]["slug"]})')
    parts.append('[Back to Review Hub](/blog/asvs-panjabi-review-hub)')
    if i < len(avail) - 1: parts.append(f'[Next: {avail[i+1]["label"]} →](/blog/asvs-panjabi-review-{avail[i+1]["slug"]})')
    return ' | '.join(parts)
NAV_RE = re.compile(r'^\[(← Previous|Back to Review Hub).*$', re.M)
for i, it in enumerate(avail):
    p = post_path(it['slug'])
    if it['custom']:
        s = open(p, encoding='utf-8').read()
        assert len(NAV_RE.findall(s)) == 1, f'{p}: expected exactly one nav line'
        open(p, 'w', encoding='utf-8').write(NAV_RE.sub(nav(i), s)); print(f'nav   {it["slug"]}'); continue
    body = '\n'.join(l for l in it['body'].splitlines() if not l.startswith('<!--') and not l.startswith('# ')).strip('\n')
    en_label = re.sub(r'\s*\(.*\)$', '', it['label'])
    ex = it['existing']
    is_req = bool(re.search(r'^\| \*\*\d+\.\d+\.\d+\*\*', it['body'], re.M))
    excerpt = ex.get('excerpt') or (f'Bilingual {en_label} requirements from the OWASP ASVS 5.0 Panjabi translation, in English and Gurmukhi.' if is_req
               else f"Bilingual '{en_label}' chapter from the OWASP ASVS 5.0 Panjabi translation, in English and Gurmukhi.")
    out = f'''---
title: "ASVS Panjabi Review — {it['label']}"
date: "{ex.get('date', TODAY)}"
excerpt: "{excerpt}"
author: "Gurvinder Singh"
tags: ["owasp", "asvs", "panjabi", "translation", "review"]
hidden: true
---

# ASVS Panjabi Review — {it['label']}

> **Reviewing this translation?** Email feedback to **gurvinder@securityleader.ai** with the subject **"ASVS Panjabi Review — {en_label}"**. Even a single correction is valuable. No GitHub account needed.

> **Source:** OWASP ASVS [PR #3254](https://github.com/OWASP/ASVS/pull/3254) · this is faithful to the official pull request.

---

{body}

---

{nav(i)}
'''
    open(p, 'w', encoding='utf-8').write(out); print(f'{"write" if ex else "NEW  "} {it["slug"]}')
print('chain:', ' > '.join(it['slug'] for it in avail))
