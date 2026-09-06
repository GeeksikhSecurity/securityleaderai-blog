#!/usr/bin/env node
/**
 * Task 6 (docs/content-maintenance-visual-automation-handoff.md) — flags
 * content that hasn't changed in a while as a retire/refresh candidate.
 *
 * Reuses exactly the git-log-driven staleness check from the 2026-09-05
 * Task 1 maintenance scan (docs/maintenance-scan-2026-09-05.md §5) rather
 * than inventing a second method — "consistent patterns" per CLAUDE.md.
 *
 * Surface decision (Task 6 asked "Notion view, auto-filed GitHub issue, or
 * appended to the maintenance report — decide"): this script always writes
 * a dated report under outputs/ (same convention as the decision-digest
 * agent's outputs/daily-summary-YYYY-MM-DD.md), because that requires no
 * external service and is git-diffable. It also emits GitHub Actions
 * step-summary-friendly output when CI=true, for the monthly workflow
 * (.github/workflows/monthly-content-review.yml) to turn into an issue —
 * see that workflow for the "why a GitHub issue, not Notion" reasoning
 * (this session has no live Notion connection to write to; a GitHub issue
 * is the repo-native mechanism that doesn't depend on one).
 *
 * Usage: node scripts/check-stale-content.mjs [--json]
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REPO_ROOT = process.cwd();
const STALE_THRESHOLD_DAYS = 90; // matches the cadence named in the handoff doc ("folds into the existing monthly review rhythm")
const POSTS_DIR = path.join(REPO_ROOT, 'posts');
const I18N_DIR = path.join(REPO_ROOT, 'posts-i18n');
const RESEARCH_FILE = path.join(REPO_ROOT, 'src/lib/research.ts');

function daysSince(dateStr) {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function lastCommitDate(relPath) {
  try {
    const out = execSync(`git log -1 --format=%ad --date=short -- "${relPath}"`, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    }).trim();
    return out || null; // empty = never committed (new/untracked file)
  } catch {
    return null;
  }
}

function readFrontmatterField(fullPath, field) {
  const raw = fs.readFileSync(fullPath, 'utf8');
  const m = new RegExp(`^${field}:\\s*(.*)$`, 'm').exec(raw);
  if (!m) return undefined;
  return m[1].trim().replace(/^["']|["']$/g, '');
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

function checkPosts() {
  const candidates = [];
  const files = listMarkdown(POSTS_DIR).map((f) => path.join('posts', f));
  for (const loc of fs.existsSync(I18N_DIR) ? fs.readdirSync(I18N_DIR) : []) {
    const locDir = path.join(I18N_DIR, loc);
    if (!fs.statSync(locDir).isDirectory()) continue;
    for (const f of listMarkdown(locDir)) files.push(path.join('posts-i18n', loc, f));
  }

  for (const relPath of files) {
    const fullPath = path.join(REPO_ROOT, relPath);
    const alreadyRetired = readFrontmatterField(fullPath, 'retired') === 'true';
    const hidden = readFrontmatterField(fullPath, 'hidden') === 'true';
    const date = lastCommitDate(relPath);
    const days = date ? daysSince(date) : null;
    if (days !== null && days >= STALE_THRESHOLD_DAYS) {
      candidates.push({
        file: relPath,
        lastCommit: date,
        daysStale: days,
        hidden,
        alreadyRetired,
      });
    }
  }
  return candidates.sort((a, b) => b.daysStale - a.daysStale);
}

/**
 * research.ts articles carry a hand-maintained, hardcoded `date:` per
 * article (see the HARDCODED-DATE convention documented at the top of that
 * file) rather than a per-article file git history — so staleness here is
 * "how old is the stated date," not "when was this file last committed."
 */
function checkResearchArticles() {
  if (!fs.existsSync(RESEARCH_FILE)) return [];
  const raw = fs.readFileSync(RESEARCH_FILE, 'utf8');
  const candidates = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  const entries = raw.split(/(?=slug:\s*')/).slice(1);
  for (const entry of entries) {
    const slugMatch = /slug:\s*'([^']+)'/.exec(entry);
    const dateMatch = /date:\s*'([^']+)'/.exec(entry);
    if (!slugMatch || !dateMatch) continue;
    const days = daysSince(dateMatch[1]);
    if (Number.isFinite(days) && days >= STALE_THRESHOLD_DAYS) {
      candidates.push({ slug: slugMatch[1], statedDate: dateMatch[1], daysStale: days });
    }
  }
  return candidates.sort((a, b) => b.daysStale - a.daysStale);
}

function buildReport(postCandidates, researchCandidates) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Stale Content Report — ${today}`);
  lines.push('');
  lines.push(
    `Retire/refresh candidates: content unchanged for ${STALE_THRESHOLD_DAYS}+ days. ` +
      `This is a candidate list for human review, not an automatic action — nothing here ` +
      `gets a \`retired: true\` flag by this script (see CLAUDE.md → "Retiring a post").`,
  );
  lines.push('');
  lines.push('## Posts / translations');
  lines.push('');
  if (postCandidates.length === 0) {
    lines.push('None — nothing crossed the threshold this run.');
  } else {
    lines.push('| File | Last commit | Days stale | Hidden | Already retired |');
    lines.push('|---|---|---|---|---|');
    for (const c of postCandidates) {
      lines.push(
        `| \`${c.file}\` | ${c.lastCommit} | ${c.daysStale} | ${c.hidden ? 'yes' : 'no'} | ${c.alreadyRetired ? 'yes' : 'no'} |`,
      );
    }
  }
  lines.push('');
  lines.push('## Research articles (src/lib/research.ts)');
  lines.push('');
  if (researchCandidates.length === 0) {
    lines.push('None — nothing crossed the threshold this run.');
  } else {
    lines.push('| Slug | Stated date | Days stale |');
    lines.push('|---|---|---|');
    for (const c of researchCandidates) {
      lines.push(`| \`${c.slug}\` | ${c.statedDate} | ${c.daysStale} |`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function main() {
  const postCandidates = checkPosts();
  const researchCandidates = checkResearchArticles();
  const report = buildReport(postCandidates, researchCandidates);

  const outDir = path.join(REPO_ROOT, 'outputs');
  fs.mkdirSync(outDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const outPath = path.join(outDir, `stale-content-report-${today}.md`);
  fs.writeFileSync(outPath, report);
  console.log(`Wrote ${path.relative(REPO_ROOT, outPath)}`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
  }

  if (process.argv.includes('--json')) {
    // Native JSON.stringify per CLAUDE.md Data Handling — no manual string building.
    console.log(JSON.stringify({ postCandidates, researchCandidates }, null, 2));
  }
}

main();
