#!/usr/bin/env python3
"""Generate AISVS Panjabi review chapter posts from the fork's 1.0/pa-IN files + build nav chain.

Mirrors scripts/asvs/build-review-posts.py's structure, adapted for AISVS:
- No fork file is 'custom' (unlike ASVS, whose frontispiece/preface/glossary wrapper
  pages predate this script and are hand-authored) -- every AISVS slug below has a
  1:1 source file, so this run creates all pages fresh in one pass.
- Source PR: OWASP/AISVS#1128 (GeeksikhSecurity/AISVS, branch panjabi-translation-v1),
  mirroring the ASVS translation's PR #3254.
"""
import re, os, sys
FORK = os.environ.get('AISVS_PA_DIR', '/Volumes/2TBSSD/Development/Git/OpenSource/OWASP-AISVS-Panjabi/1.0/pa-IN')
POSTS = sys.argv[1]
TODAY = '2026-08-27'
# (slug, fork file)
CHAIN = [
    ('frontispiece', '0x01-Frontispiece.md'),
    ('preface', '0x02-Preface.md'),
    ('using-aisvs', '0x03-Using-AISVS.md'),
    ('c1-training-data-integrity', '0x10-C01-Training-Data-Integrity-and-Traceability.md'),
    ('c2-input-validation', '0x10-C02-Input-Validation.md'),
    ('c3-model-lifecycle-management', '0x10-C03-Model-Lifecycle-Management.md'),
    ('c4-infrastructure', '0x10-C04-Infrastructure.md'),
    ('c5-access-control-and-identity', '0x10-C05-Access-Control-and-Identity.md'),
    ('c6-supply-chain', '0x10-C06-Supply-Chain.md'),
    ('c7-model-behavior', '0x10-C07-Model-Behavior.md'),
    ('c8-memory-embeddings-and-vector-database', '0x10-C08-Memory-Embeddings-and-Vector-Database.md'),
    ('c9-orchestration-and-agentic-action', '0x10-C09-Orchestration-and-Agentic-Action.md'),
    ('c10-mcp-security', '0x10-C10-MCP-Security.md'),
    ('c11-adversarial-robustness', '0x10-C11-Adversarial-Robustness.md'),
    ('c12-monitoring-and-logging', '0x10-C12-Monitoring-and-Logging.md'),
    ('appendix-a-glossary', '0x90-Appendix-A_Glossary.md'),
    ('appendix-b-controls-inventory', '0x91-Appendix-B_AI_Security_Controls_Inventory.md'),
    ('appendix-c-ai-code-generation', '0x92-Appendix-C_AI_for_Code_Generation.md'),
]
G = re.compile(r'[਀-੿]')
def post_path(slug): return os.path.join(POSTS, f'aisvs-panjabi-review-{slug}.md')
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
items = []
for slug, fname in CHAIN:
    s = fork_status(fname)
    if s is None:
        print(f'SKIP {slug}: fork file missing or not marked Complete'); items.append(dict(slug=slug, avail=False)); continue
    en, pa = h1s(s)
    existing = fm(post_path(slug)) if os.path.exists(post_path(slug)) else {}
    pa_disp = pa[len(en):].strip() if pa.startswith(en) else pa
    if pa_disp.startswith('(') and pa_disp.endswith(')'): pa_disp = pa_disp[1:-1]
    label = existing.get('title', '').replace('AISVS Panjabi Review — ', '') or f'{en} ({pa_disp})'
    items.append(dict(slug=slug, body=s, en=en, pa=pa, label=label, existing=existing, avail=True))
avail = [it for it in items if it['avail']]
def nav(i):
    parts = []
    if i > 0: parts.append(f'[← Previous: {avail[i-1]["label"]}](/blog/aisvs-panjabi-review-{avail[i-1]["slug"]})')
    parts.append('[Back to Review Hub](/blog/aisvs-panjabi-review-hub)')
    if i < len(avail) - 1: parts.append(f'[Next: {avail[i+1]["label"]} →](/blog/aisvs-panjabi-review-{avail[i+1]["slug"]})')
    return ' | '.join(parts)
for i, it in enumerate(avail):
    p = post_path(it['slug'])
    body = '\n'.join(l for l in it['body'].splitlines() if not l.startswith('<!--') and not l.startswith('# ')).strip('\n')
    en_label = re.sub(r'\s*\(.*\)$', '', it['label'])
    ex = it['existing']
    is_req = bool(re.search(r'^\| \*\*C\d+\.\d+\.\d+\*\*', it['body'], re.M))
    excerpt = ex.get('excerpt') or (f'Bilingual {en_label} requirements from the OWASP AISVS 1.0 Panjabi translation, in English and Gurmukhi.' if is_req
               else f"Bilingual '{en_label}' chapter from the OWASP AISVS 1.0 Panjabi translation, in English and Gurmukhi.")
    out = f'''---
title: "AISVS Panjabi Review — {it['label']}"
date: "{ex.get('date', TODAY)}"
excerpt: "{excerpt}"
author: "Gurvinder Singh"
tags: ["owasp", "aisvs", "panjabi", "translation", "review"]
hidden: true
---

# AISVS Panjabi Review — {it['label']}

> **Reviewing this translation?** Email feedback to **gurvinder@securityleader.ai** with the subject **"AISVS Panjabi Review — {en_label}"**. Even a single correction is valuable. No GitHub account needed.

> **Source:** OWASP AISVS [PR #1128](https://github.com/OWASP/AISVS/pull/1128) · this is faithful to the submitted pull request. It has not yet had a Panjabi-speaking sangat review pass — that's what this page is for.

---

{body}

---

{nav(i)}
'''
    open(p, 'w', encoding='utf-8').write(out); print(f'{"write" if ex else "NEW  "} {it["slug"]}')
print('chain:', ' > '.join(it['slug'] for it in avail))
