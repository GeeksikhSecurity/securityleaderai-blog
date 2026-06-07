#!/usr/bin/env node
// content-rigor lint — enforces docs/content-rigor.md rules.
// Zero npm dependencies; pure Node ESM. Exits 1 on errors, 0 on notices-only.
//
// Run:   npm run lint:content
// Env:   LINT_DIRECTIONAL=1  → also emit R7 directional-pointer notices
//
// Rule IDs are stable. See docs/content-rigor.md for the canonical catalog.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const I18N_DIR = path.join(ROOT, 'posts-i18n');

const REQUIRED_FRONTMATTER = ['title', 'date', 'excerpt', 'author', 'tags'];
const VALID_TRANSLATION_STATUS = new Set(['ai_draft', 'human_reviewed', 'community_reviewed']);
const FEEDBACK_CONTACT = 'gurvinder@securityleader.ai';

// R8 — locale-suffix patterns we consider stale.
const LEGACY_LOCALE_SUFFIXES = ['pa', 'fr', 'es', 'de', 'pt', 'it', 'zh', 'ja', 'ko'];
const LEGACY_URL_RE = new RegExp(
  `/blog/[a-z0-9-]+-(${LEGACY_LOCALE_SUFFIXES.join('|')})(?=[^a-z]|$)`,
  'g',
);

// R4 — Devanagari Unicode block, EXCLUDING U+0964 (।) and U+0965 (॥).
// The danda and double-danda are shared Indic punctuation: Unicode allocates
// them in the Devanagari block but they are the canonical full-stop and verse
// separator in Gurmukhi as well. Gurmukhi has no separate danda codepoint.
// Devanagari digits (U+0966–U+096F) ARE flagged because Gurmukhi has its own
// digit range (U+0A66–U+0A6F) and mixing is a real contamination signal.
const DEVANAGARI_RE = /[ऀ-ॣ०-ॿ]/;

// R10 — prohibited vocabulary in pa-in.
const PROHIBITED_PA_RES = [
  { re: /\bchakras?\b/i,            label: 'chakra (yoga)' },
  { re: /\bkundalini\b/i,            label: 'kundalini (yoga)' },
  { re: /\bpranayama\b/i,            label: 'pranayama (yoga)' },
  { re: /\bthird\s+eye\b/i,          label: 'third eye (yoga metaphor)' },
  { re: /\baura\b/i,                 label: 'aura (yoga/metaphysical)' },
  { re: /ਚੱਕਰ(?![਀-੿])/,   label: 'ਚੱਕਰ (chakra in Gurmukhi)' },
];

// R17 — brand/proper-noun spellings. Each entry: forbidden form → canonical.
const BRAND_FORBIDDEN = [
  { wrong: /\bSecurityleader\b/,    right: 'SecurityLeader' },
  { wrong: /\bsecurity-leader\.ai/i,right: 'SecurityLeader.ai' },
  { wrong: /\bSecurityLeaderAI\b/,  right: 'SecurityLeader.ai' },
  { wrong: /\bOWWASP\b/,            right: 'OWASP' },
  { wrong: /\bOwasp\b/,             right: 'OWASP' },
  { wrong: /\bActionfraud\b/,       right: 'Action Fraud (legacy) / Report Fraud (current UK)' },
];

// R7 — directional-pointer detection (opt-in via env).
const DIRECTIONAL_EN = /\b(above|below|next|previous)\b/i;
const DIRECTIONAL_PA = /(ਉੱਪਰ|ਹੇਠਾਂ|ਅੱਗੇ|ਪਿੱਛੇ)/;

// R21 — fraud-term policy in pa-in (locked 2026-05-30).
// Standalone ਫ਼ਰਾਡ / ਫਰਾਡ / ਘੋਟਾਲਾ are disallowed. The single allowed compound
// is ਰੋਮਾਂਸ ਫ਼ਰਾਡ — we whitelist that exact sequence and flag any other
// occurrence of the bare token.
const FRAUD_POLICY_RES = [
  // ਘੋਟਾਲਾ family (Hindi-origin, never allowed)
  { re: /ਘੋਟਾਲ[ਾਿੇੋਯੀਆਂ]?/, label: 'ਘੋਟਾਲਾ (Hindi-origin; use ਠੱਗੀ)' },
  // standalone ਫ਼ਰਾਡ / ਫਰਾਡ — exclude when immediately preceded by ਰੋਮਾਂਸ
  // (followed by optional space) which is the one allowed hybrid.
  { re: /(?<!ਰੋਮਾਂਸ\s)ਫ਼?ਰਾਡ/, label: 'ਫ਼ਰਾਡ / ਫਰਾਡ standalone (use ਠੱਗੀ; only ਰੋਮਾਂਸ ਫ਼ਰਾਡ is allowed)' },
];

// R23 — English-style romanization patterns (disallowed; use IAST).
// We flag the doubled-vowel and trailing-ee patterns that English-style
// romanization produces, and a few specific glossary-known offenders.
const ROMANIZATION_DISALLOWED = [
  { re: /\bthaggee\b/i,    suggest: 'ṭhaggī' },
  { re: /\btasdeeq\b/i,    suggest: 'tasdīq' },
  { re: /\bpachhaan\b/i,   suggest: 'pachhāṇ' },
  { re: /\bnaklee\b/i,     suggest: 'naklī' },
  { re: /\bjaali\b/i,      suggest: 'jāʼlī' },
  { re: /\bsurakhya\b/i,   suggest: 'surakkhiā' },
  { re: /\bsarkaree\b/i,   suggest: 'sarkārī' },
  { re: /\bshakkee\b/i,    suggest: 'shakkī' },
];

const errors = [];
const notices = [];

function reportErr(rule, file, line, msg) {
  errors.push({ rule, file: path.relative(ROOT, file), line, msg });
}
function reportNotice(rule, file, line, msg) {
  notices.push({ rule, file: path.relative(ROOT, file), line, msg });
}

// Minimal YAML frontmatter parser — covers the dialect used in this repo
// (scalar strings, simple arrays, no nested maps). Avoids npm dependencies.
function parseDoc(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: raw, lines: raw.split('\n'), fmLines: 0 };

  const fm = {};
  const fmRaw = m[1];
  const fmLines = fmRaw.split('\n').length + 2; // +2 for the --- delimiters
  for (const line of fmRaw.split('\n')) {
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    // strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // simple inline array: ["a", "b"] or [a, b]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
    fm[kv[1]] = value;
  }
  return { frontmatter: fm, body: m[2], lines: m[2].split('\n'), fmLines };
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
}

function gatherDocs() {
  const en = listMarkdown(POSTS_DIR).map(f => ({
    path: path.join(POSTS_DIR, f),
    slug: f.replace(/\.md$/, ''),
    locale: 'en',
  }));
  const i18n = [];
  if (fs.existsSync(I18N_DIR)) {
    for (const loc of fs.readdirSync(I18N_DIR)) {
      const locDir = path.join(I18N_DIR, loc);
      if (!fs.statSync(locDir).isDirectory()) continue;
      for (const f of listMarkdown(locDir)) {
        i18n.push({
          path: path.join(locDir, f),
          slug: f.replace(/\.md$/, ''),
          locale: loc,
        });
      }
    }
  }
  return { en, i18n };
}

function headings(body) {
  const out = [];
  body.split('\n').forEach((line, i) => {
    const m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) out.push({ level: m[1].length, text: m[2].trim(), line: i + 1 });
  });
  return out;
}

function lineHasAllowance(line, ruleId) {
  return new RegExp(`<!--\\s*rigor:\\s*allow\\s+${ruleId}\\s*-->`).test(line);
}

function lintFrontmatter(doc, parsed) {
  // R1 — required fields. `author` and `authors` are interchangeable: posts
  // may use the scalar `author:` shorthand OR the multi-author `authors:` array
  // (Phase B). Either satisfies the byline requirement.
  for (const k of REQUIRED_FRONTMATTER) {
    if (k === 'author') {
      // `author` and `authors` are interchangeable. The minimal YAML parser
      // sets the `authors` key even when the value is a block list of maps
      // (children parsed as siblings); accept key presence as evidence.
      const author = parsed.frontmatter.author;
      const hasAuthor = (typeof author === 'string' && author !== '');
      const hasAuthors = 'authors' in parsed.frontmatter;
      if (!hasAuthor && !hasAuthors) {
        reportErr('R1', doc.path, 1, `missing required frontmatter field: author (or authors[])`);
      }
      continue;
    }
    const v = parsed.frontmatter[k];
    if (v === undefined || v === null || (typeof v === 'string' && v === '')) {
      reportErr('R1', doc.path, 1, `missing required frontmatter field: ${k}`);
    }
  }
  // R11 — date format
  const date = parsed.frontmatter.date;
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    reportErr('R11', doc.path, 1, `date "${date}" is not ISO YYYY-MM-DD`);
  }
  // R24 — SEO description length: excerpt feeds <meta description> + og:description.
  const excerpt = parsed.frontmatter.excerpt;
  if (typeof excerpt === 'string' && excerpt !== '') {
    const len = excerpt.length;
    if (len < 50 || len > 200) {
      reportNotice('R24', doc.path, 1, `excerpt is ${len} chars; aim for 50–200 for SEO/OpenGraph description quality`);
    }
  }
  // R25 — SEO tag count: tags feed keywords, og:article:tag, JSON-LD, topic counts.
  const tags = parsed.frontmatter.tags;
  if (Array.isArray(tags) && (tags.length < 2 || tags.length > 8)) {
    reportNotice('R25', doc.path, 1, `${tags.length} tag(s); aim for 2–8 for SEO keywords + topic mapping`);
  }
}

function lintBodyShared(doc, parsed) {
  const offset = parsed.fmLines;
  parsed.lines.forEach((line, i) => {
    const lineNo = i + 1 + offset;

    // R8 — legacy locale-suffix URLs
    if (!lineHasAllowance(line, 'R8')) {
      const matches = [...line.matchAll(LEGACY_URL_RE)];
      for (const m of matches) {
        reportErr('R8', doc.path, lineNo, `legacy locale-suffix URL "${m[0]}" — migrate to "/blog/<locale>/<slug>"`);
      }
    }

    // R17 — brand/proper-noun spelling
    if (!lineHasAllowance(line, 'R17')) {
      for (const { wrong, right } of BRAND_FORBIDDEN) {
        if (wrong.test(line)) {
          reportErr('R17', doc.path, lineNo, `misspelled brand/proper noun — should be "${right}"`);
        }
      }
    }
  });

  // R13 — table column-count parity
  let inTable = false;
  let headerCols = 0;
  parsed.lines.forEach((line, i) => {
    const lineNo = i + 1 + offset;
    const trimmed = line.trim();
    const isTableRow = trimmed.startsWith('|') && trimmed.endsWith('|');
    if (!isTableRow) {
      inTable = false;
      headerCols = 0;
      return;
    }
    const cols = trimmed.split('|').slice(1, -1).length;
    if (!inTable) {
      inTable = true;
      headerCols = cols;
      return;
    }
    // Skip the separator row immediately after header
    if (/^\|[\s|:-]+\|$/.test(trimmed)) return;
    if (cols !== headerCols && !lineHasAllowance(line, 'R13')) {
      reportErr('R13', doc.path, lineNo, `table row has ${cols} cells, header has ${headerCols}`);
    }
  });

  // R14 — code fences closed
  let fenceOpen = false;
  let fenceLine = 0;
  parsed.lines.forEach((line, i) => {
    if (/^```/.test(line)) {
      fenceOpen = !fenceOpen;
      if (fenceOpen) fenceLine = i + 1 + offset;
    }
  });
  if (fenceOpen) {
    reportErr('R14', doc.path, fenceLine, `unclosed code fence opened here`);
  }

  // R12 — heading hierarchy jumps (notice)
  const hs = headings(parsed.body);
  for (let i = 1; i < hs.length; i++) {
    if (hs[i].level - hs[i - 1].level > 1) {
      reportNotice('R12', doc.path, hs[i].line + offset, `heading jumps from H${hs[i - 1].level} to H${hs[i].level}`);
    }
  }
}

function lintTranslation(enDoc, sibDoc, enParsed, sibParsed) {
  const enHeadings = headings(enParsed.body);
  const sibHeadings = headings(sibParsed.body);

  // R6 — section-count parity (notice)
  if (enHeadings.length !== sibHeadings.length) {
    reportNotice(
      'R6',
      sibDoc.path,
      1,
      `heading count differs from en — en=${enHeadings.length}, ${sibDoc.locale}=${sibHeadings.length}`,
    );
  }

  // R5 — question-mark parity (paired by ordinal)
  const QMARK = /[?？]\s*$/;
  for (let i = 0; i < Math.min(enHeadings.length, sibHeadings.length); i++) {
    const enQ = QMARK.test(enHeadings[i].text);
    const sibQ = QMARK.test(sibHeadings[i].text);
    if (enQ && !sibQ) {
      reportErr(
        'R5',
        sibDoc.path,
        sibHeadings[i].line + sibParsed.fmLines,
        `en heading "${enHeadings[i].text}" is a question; ${sibDoc.locale} sibling lacks "?" — "${sibHeadings[i].text}"`,
      );
    }
  }
}

function lintLocaleSpecific(doc, parsed) {
  const offset = parsed.fmLines;

  // R4 — Devanagari in pa-in
  if (doc.locale === 'pa-in') {
    parsed.lines.forEach((line, i) => {
      const lineNo = i + 1 + offset;
      if (DEVANAGARI_RE.test(line) && !lineHasAllowance(line, 'R4')) {
        const m = line.match(DEVANAGARI_RE);
        reportErr('R4', doc.path, lineNo, `Devanagari character "${m[0]}" (U+${m[0].charCodeAt(0).toString(16).toUpperCase()}) in Gurmukhi content`);
      }
    });

    // R10 — prohibited vocabulary
    parsed.lines.forEach((line, i) => {
      const lineNo = i + 1 + offset;
      if (lineHasAllowance(line, 'R10')) return;
      for (const { re, label } of PROHIBITED_PA_RES) {
        if (re.test(line)) {
          reportErr('R10', doc.path, lineNo, `prohibited vocabulary: ${label}`);
        }
      }
    });

    // R21 — fraud-term policy (use ਠੱਗੀ; only ਰੋਮਾਂਸ ਫ਼ਰਾਡ hybrid allowed)
    parsed.lines.forEach((line, i) => {
      const lineNo = i + 1 + offset;
      if (lineHasAllowance(line, 'R21')) return;
      for (const { re, label } of FRAUD_POLICY_RES) {
        if (re.test(line)) {
          reportErr('R21', doc.path, lineNo, `fraud-term policy: ${label}`);
        }
      }
    });

    // R23 — IAST canonical romanization (no English-style)
    parsed.lines.forEach((line, i) => {
      const lineNo = i + 1 + offset;
      if (lineHasAllowance(line, 'R23')) return;
      for (const { re, suggest } of ROMANIZATION_DISALLOWED) {
        const m = line.match(re);
        if (m) {
          reportErr('R23', doc.path, lineNo, `English-style romanization "${m[0]}" — IAST canonical is "${suggest}"`);
        }
      }
    });
  }

  // R2 — translation_status on locale siblings
  if (doc.locale !== 'en') {
    const status = parsed.frontmatter.translation_status;
    if (!status) {
      reportErr('R2', doc.path, 1, `posts-i18n/${doc.locale}/ file missing translation_status`);
    } else if (!VALID_TRANSLATION_STATUS.has(status)) {
      reportErr('R2', doc.path, 1, `invalid translation_status "${status}" — must be one of: ${[...VALID_TRANSLATION_STATUS].join(', ')}`);
    }

    // R9 — ai_draft must carry feedback contact
    if (status === 'ai_draft' && !parsed.body.includes(FEEDBACK_CONTACT)) {
      reportErr('R9', doc.path, 1, `ai_draft post must reference feedback contact ${FEEDBACK_CONTACT}`);
    }
  }
}

function lintDirectional(doc, parsed) {
  if (!process.env.LINT_DIRECTIONAL) return;
  const offset = parsed.fmLines;
  const re = doc.locale === 'pa-in' ? DIRECTIONAL_PA : DIRECTIONAL_EN;
  parsed.lines.forEach((line, i) => {
    if (re.test(line) && !lineHasAllowance(line, 'R7')) {
      const m = line.match(re);
      reportNotice('R7', doc.path, i + 1 + offset, `directional pointer "${m[0]}" — verify against layout`);
    }
  });
}

function main() {
  const { en, i18n } = gatherDocs();
  const allDocs = [...en, ...i18n];

  // Index siblings by slug for R3 / R5 / R6.
  const localeBySlug = new Map();
  for (const d of i18n) {
    if (!localeBySlug.has(d.slug)) localeBySlug.set(d.slug, []);
    localeBySlug.get(d.slug).push(d);
  }

  // Per-document rules.
  const parsedCache = new Map();
  for (const doc of allDocs) {
    const parsed = parseDoc(doc.path);
    parsedCache.set(doc.path, parsed);
    lintFrontmatter(doc, parsed);
    lintBodyShared(doc, parsed);
    lintLocaleSpecific(doc, parsed);
    lintDirectional(doc, parsed);
  }

  // R3 — English source declares translation_status when siblings exist.
  for (const doc of en) {
    if (localeBySlug.has(doc.slug)) {
      const parsed = parsedCache.get(doc.path);
      if (!parsed.frontmatter.translation_status) {
        const sibs = localeBySlug.get(doc.slug).map(s => s.locale).join(', ');
        reportErr('R3', doc.path, 1, `English source has siblings (${sibs}) but is missing translation_status`);
      }
    }
  }

  // Translation cross-checks (R5, R6).
  for (const enDoc of en) {
    const sibs = localeBySlug.get(enDoc.slug);
    if (!sibs) continue;
    const enParsed = parsedCache.get(enDoc.path);
    for (const sibDoc of sibs) {
      lintTranslation(enDoc, sibDoc, enParsed, parsedCache.get(sibDoc.path));
    }
  }

  // Output.
  const banner = '═══ content-rigor lint ═══';
  console.log(`\n${banner}`);
  if (errors.length === 0 && notices.length === 0) {
    console.log('  no issues found');
  }
  if (errors.length) {
    console.log(`\n  ${errors.length} ERROR(s):`);
    for (const e of errors) console.log(`    ${e.file}:${e.line}  [${e.rule}]  ${e.msg}`);
  }
  if (notices.length) {
    console.log(`\n  ${notices.length} NOTICE(s):`);
    for (const n of notices) console.log(`    ${n.file}:${n.line}  [${n.rule}]  ${n.msg}`);
  }
  console.log(`\n  Summary: ${errors.length} errors, ${notices.length} notices`);
  console.log(`  Rules:   docs/content-rigor.md`);
  console.log('');
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
