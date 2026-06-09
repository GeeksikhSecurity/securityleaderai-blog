#!/usr/bin/env node
// code-invariants lint — enforces CLAUDE.md application-code rules that were
// previously stated only in prose (and therefore silently violated).
// Zero npm dependencies; pure Node ESM. Exits 1 on errors, 0 when clean.
//
// Run:   npm run lint:code
//
// WHY THIS EXISTS
// ---------------
// Three defects (ISO dates, topic counts excluding blog posts, robots host)
// shipped in one 480-line commit (a4b0792) because the constraints that made
// them wrong lived in CLAUDE.md as English, not as executable checks. Each
// rule below converts one such prose rule into a gate that blocks deploy.
// See RULES.md §8 (Completion Integrity) for the root-cause analysis.
//
// Rule IDs are stable. C-prefix = code invariant (distinct from content R-rules).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const errors = [];
function reportErr(rule, file, line, msg) {
  errors.push({ rule, file, line, msg });
}

/** Read a repo-relative file, or return null if absent (check is skipped). */
function read(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, 'utf8');
}

/** 1-based line number of the first regex match in `src`, or 1. */
function lineOf(src, re) {
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) return i + 1;
  return 1;
}

// ── C1 — research article dates must be human-readable "Month Day, Year" ──────
// CLAUDE.md (Research Article Format): date: 'Month Day, Year'. The detail page
// renders article.date raw; ISO ("2026-02-08") leaks to CSO readers. toIsoDate()
// in seo.ts already normalizes human dates for metadata, so human storage is safe.
const HUMAN_DATE_RE = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;
function checkResearchDates() {
  const FILE = 'src/lib/research.ts';
  const src = read(FILE);
  if (src === null) return;
  src.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*date:\s*'([^']*)'/);
    if (m && !HUMAN_DATE_RE.test(m[1])) {
      reportErr('C1', FILE, i + 1,
        `research date '${m[1]}' is not "Month Day, Year" (e.g. "February 8, 2026"). ISO dates render raw to readers.`);
    }
  });
}

// ── C2 — getResearchTopics must count blog posts, not only research articles ──
// CLAUDE.md (Topic Counts): "must reflect the actual number of research
// articles + blog posts matching each topic." research.ts cannot import posts.ts
// (client-imported), so posts MUST be passed in by the (server) caller.
function checkTopicCountsIncludePosts() {
  const RFILE = 'src/lib/research.ts';
  const rsrc = read(RFILE);
  if (rsrc !== null) {
    // The function must accept content from the caller (non-empty param list).
    const sig = rsrc.match(/export function getResearchTopics\s*\(([^)]*)\)/);
    if (!sig || sig[1].trim() === '') {
      reportErr('C2', RFILE, lineOf(rsrc, /getResearchTopics/),
        'getResearchTopics() takes no parameter — it cannot include blog posts in topic counts. Accept caller-supplied content.');
    }
  }
  const PFILE = 'src/app/page.tsx';
  const psrc = read(PFILE);
  if (psrc !== null && /getResearchTopics\(\s*\)/.test(psrc)) {
    reportErr('C2', PFILE, lineOf(psrc, /getResearchTopics\(\s*\)/),
      'homepage calls getResearchTopics() with no posts — topic counts will exclude blog posts.');
  }
}

// ── C3 — the removed 'video' type must not reappear in card/research unions ────
// CLAUDE.md: "Do NOT use the `video` research type (removed — no video content)."
function checkNoVideoType() {
  const TARGETS = [
    { file: 'src/components/post-card.tsx', re: /export type PostCardType\s*=\s*([^;]+);/ },
    { file: 'src/lib/research.ts', re: /export type ResearchType\s*=\s*([^;]+);/ },
  ];
  for (const { file, re } of TARGETS) {
    const src = read(file);
    if (src === null) continue;
    const m = src.match(re);
    if (m && /['"]video['"]/.test(m[1])) {
      reportErr('C3', file, lineOf(src, re),
        "type union includes 'video' — a removed type. Delete it and any TYPE_LABELS / TYPE_BADGES entries.");
    }
  }
}

// ── C4 — JSON-LD must escape '<' before dangerouslySetInnerHTML ────────────────
// CLAUDE.md (XSS prevention): sanitize before dangerouslySetInnerHTML.
// JSON.stringify does NOT escape '<', so "</script>" in content breaks out.
function checkJsonLdEscaping() {
  const FILE = 'src/components/json-ld.tsx';
  const src = read(FILE);
  if (src === null) return;
  if (!/dangerouslySetInnerHTML/.test(src)) return; // nothing to guard
  const escapesLt = /u003c/i.test(src) && /\.replace\(/.test(src);
  if (!escapesLt) {
    reportErr('C4', FILE, lineOf(src, /dangerouslySetInnerHTML/),
      "JSON-LD payload is not escaped — replace '<' with \\u003c before injecting (JSON.stringify alone allows </script> break-out).");
  }
}

// ── C5 — robots.txt host directive must be a bare hostname (no scheme) ─────────
// The host directive expects a hostname, not a full origin. Using SITE_ORIGIN
// ("https://…") directly emits a scheme many crawlers reject.
function checkRobotsHost() {
  const FILE = 'src/app/robots.ts';
  const src = read(FILE);
  if (src === null) return;
  src.split('\n').forEach((line, i) => {
    const m = line.match(/host:\s*(.+?),?\s*$/);
    if (!m) return;
    const val = m[1];
    if (/:\/\//.test(val) || /^SITE_ORIGIN\b/.test(val)) {
      reportErr('C5', FILE, i + 1,
        `robots host '${val}' includes a scheme/origin — use a bare hostname (e.g. new URL(SITE_ORIGIN).hostname).`);
    }
  });
}

function main() {
  checkResearchDates();
  checkTopicCountsIncludePosts();
  checkNoVideoType();
  checkJsonLdEscaping();
  checkRobotsHost();

  const banner = '═══ code-invariants lint ═══';
  console.log(`\n${banner}`);
  if (errors.length === 0) {
    console.log('  no issues found');
  } else {
    console.log(`\n  ${errors.length} ERROR(s):`);
    for (const e of errors) console.log(`    ${e.file}:${e.line}  [${e.rule}]  ${e.msg}`);
  }
  console.log(`\n  Summary: ${errors.length} errors`);
  console.log('  Rules:   CLAUDE.md + RULES.md §8');
  console.log('');
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
