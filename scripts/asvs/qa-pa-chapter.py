#!/usr/bin/env python3
"""Mechanical QA for ASVS pa-IN bilingual chapter files. Usage: qa_pa.py <en-source> <pa-file>"""
import re, sys, unicodedata
en_path, pa_path = sys.argv[1], sys.argv[2]
en = open(en_path, encoding='utf-8').read()
pa = open(pa_path, encoding='utf-8').read()
issues = []
G = re.compile(r'[਀-੿]')
def has_g(s): return bool(G.search(s))
# 1 NFC
if unicodedata.normalize('NFC', pa) != pa: issues.append('NOT NFC-normalised')
# 2 Devanagari leak (exclude danda U+0964/U+0965)
dev = [(i+1, l) for i, l in enumerate(pa.splitlines()) if re.search(r'[ऀ-ॣ०-ॿ]', l)]
for ln, l in dev: issues.append(f'L{ln}: Devanagari codepoint: {l[:80]}')
# 3 Gurmukhi numerals
for i, l in enumerate(pa.splitlines()):
    if re.search(r'[੦-੯]', l): issues.append(f'L{i+1}: Gurmukhi numeral (use Western digits)')
# 4 Western period ending a Gurmukhi sentence (line or cell ends with '.' after Gurmukhi text)
for i, l in enumerate(pa.splitlines()):
    if not has_g(l): continue
    if l.startswith('#'): continue
    cells = [c.strip() for c in l.strip().strip('|').split('|')] if l.strip().startswith('|') else [l.strip()]
    for c in cells:
        c2 = c.rstrip('*').rstrip()
        if has_g(c2) and re.search(r'[਀-੿\)\]»”"\'’]\s*\.$', c2) and not re.search(r'\d\.$', c2):
            issues.append(f'L{i+1}: Western period ends Panjabi sentence: …{c2[-40:]}')
# 5 prohibited terms
for pat, why in [(r'ਮੁਦਰਾ', 'mudra (Gurmat rule) -> ਸਥਿਤੀ'), (r'ਫ਼ਰਾਡ(?!\b)|(?<!ਰੋਮਾਂਸ )ਫ਼ਰਾਡ', 'fraud -> ਠੱਗੀ'), (r'\bPunjab', 'spell Panjab/Panjabi'),
                 (r'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ', 'Verify that -> ਤਸਦੀਕ ਕਰੋ ਕਿ'), (r'ਓਵਾਸਪ|ਏਐਸਵੀਐਸ|ਐਸਵੀਐਸ', 'retained acronym transliterated')]:
    for i, l in enumerate(pa.splitlines()):
        if re.search(pat, l): issues.append(f'L{i+1}: {why}: {l[:80]}')
# 6 requirement ID coverage: each EN id must appear exactly twice in PA (EN row + PA row)
ids = re.findall(r'^\| \*\*(\d+\.\d+\.\d+)\*\*', en, re.M)
for rid in ids:
    n = len(re.findall(r'^\| \*\*' + re.escape(rid) + r'\*\*', pa, re.M))
    if n != 2: issues.append(f'requirement {rid}: found {n} rows (expected 2: EN + PA)')
extra = set(re.findall(r'^\| \*\*(\d+\.\d+\.\d+)\*\*', pa, re.M)) - set(ids)
for rid in sorted(extra): issues.append(f'requirement {rid}: not in English source')
# 6b PA requirement rows must contain Gurmukhi and begin with ਤਸਦੀਕ ਕਰੋ ਕਿ when EN starts with "Verify that"
en_rows = dict(re.findall(r'^\| \*\*(\d+\.\d+\.\d+)\*\* \| (.*?) \|', en, re.M))
pa_rows = {}
for m in re.finditer(r'^\| \*\*(\d+\.\d+\.\d+)\*\* \| (.*?) \| (\d) \|', pa, re.M):
    pa_rows.setdefault(m.group(1), []).append((m.group(2), m.group(3)))
for rid, rows in pa_rows.items():
    g = [r for r in rows if has_g(r[0])]
    if len(rows) == 2 and not g: issues.append(f'requirement {rid}: no Gurmukhi row')
    for desc, lvl in g:
        if en_rows.get(rid, '').startswith('Verify that') and not desc.startswith('ਤਸਦੀਕ ਕਰੋ ਕਿ'):
            issues.append(f'requirement {rid}: PA row must start ਤਸਦੀਕ ਕਰੋ ਕਿ')
        en_lvl = re.search(r'^\| \*\*' + re.escape(rid) + r'\*\* \| .*? \| (\d) \|', en, re.M)
        if en_lvl and en_lvl.group(1) != lvl: issues.append(f'requirement {rid}: level {lvl} != EN {en_lvl.group(1)}')
# 7 headings: every EN heading (## / ###) must be followed by a Gurmukhi heading of same level
lines = pa.splitlines()
en_heads = [h for h in re.findall(r'^(#{1,3} .+)$', en, re.M)]
for i, l in enumerate(lines):
    m = re.match(r'^(#{1,3}) (.+)$', l)
    if m and not has_g(l):
        nxt = lines[i+1] if i+1 < len(lines) else ''
        if not (nxt.startswith(m.group(1) + ' ') and has_g(nxt)):
            issues.append(f'L{i+1}: English heading without Panjabi heading below: {l}')
for h in en_heads:
    if h not in pa: issues.append(f'English heading missing verbatim: {h}')
# 8 English paragraphs verbatim: every non-empty, non-table, non-heading EN line must appear in PA
for l in en.splitlines():
    s = l.strip()
    if not s or s.startswith('|') or s.startswith('#') or s.startswith('<!--'): continue
    if s not in pa: issues.append(f'English line missing verbatim: {s[:70]}')
# 9 Gurmukhi volume sanity
g_chars = len(G.findall(pa)); en_words = len(en.split())
if g_chars < en_words * 2.5: issues.append(f'Gurmukhi volume low: {g_chars} Gurmukhi chars for {en_words} EN words (expect >= {int(en_words*2.5)}) — untranslated blocks?')
# 10 header
if not pa.startswith('<!-- Translation Status: ✅ Complete -->'): issues.append('missing/incorrect status header')
if 'TODO' in pa or '…]' in pa or '[translation' in pa.lower(): issues.append('placeholder text present')
print('\n'.join(issues) if issues else 'QA PASS')
print(f'-- {len(ids)} requirement IDs in EN; {g_chars} Gurmukhi chars; {len(issues)} issue(s)')
sys.exit(1 if issues else 0)
