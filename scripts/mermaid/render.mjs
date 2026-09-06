#!/usr/bin/env node
/**
 * Render a .mmd (Mermaid source) file to an .svg using a headless browser.
 *
 * Why this exists outside package.json: this is a content-authoring tool,
 * not a runtime dependency of the Next.js app (same reasoning as
 * scripts/asvs/*.py being Python, external to the site build). Per
 * CLAUDE.md's lean-deps policy ("zero new npm dependencies... check
 * dependency count / maintenance before adding"), this script does NOT add
 * `mermaid` or a headless-browser package to package.json. Instead it:
 *   1. Downloads the mermaid UMD bundle straight from the npm registry into
 *      a local cache dir (default /tmp/mermaid-cache, override with
 *      MERMAID_CACHE_DIR) — a plain file fetch, not an installed dependency.
 *   2. Uses `playwright` + the pre-installed Chromium from this machine's
 *      content-authoring toolchain (not the repo's node_modules) to load a
 *      throwaway local HTML page that references the cached bundle via
 *      file://, renders the diagram client-side, and reads the resulting
 *      <svg> back out of the DOM.
 *
 * Requires (on the machine running this script, NOT in package.json):
 *   - `playwright`, resolved via loadPlaywright() below against a small list
 *     of common global-install locations (this repo's dev container has it
 *     at /opt/node22/lib/node_modules) — extend the search with
 *     MERMAID_PLAYWRIGHT_DIRS (colon-separated) if yours lives elsewhere.
 *   - A Chromium executable Playwright can launch (its own managed browser
 *     is used by default).
 *   - Network access to registry.npmjs.org on first run only (to fetch the
 *     mermaid bundle into the cache); fully offline on every run after that.
 *
 * Usage:
 *   node scripts/mermaid/render.mjs <input.mmd> <output.svg>
 *     [--post <path/to/post.md>] [--notion-url <url>]
 *
 * --post + --notion-url (Task 5, frontmatter <-> Notion traceability):
 *   stamps `notion_url: "<url>"` into that post's frontmatter in the same
 *   step the diagram renders — inserted or updated in place, nothing else
 *   in the file is touched. --notion-url without --post (or vice versa) is
 *   a usage error, not a silent no-op.
 *
 * Every successful render also appends one line to
 * docs/visual-artifacts-log.jsonl (Task 3, Visual Artifacts logging) —
 * see appendArtifactLog() below for why this is a local staged log rather
 * than a live Notion write.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const MERMAID_VERSION = '11.17.2'; // pinned — bump deliberately, re-verify theme output after
const CACHE_DIR = process.env.MERMAID_CACHE_DIR || '/tmp/mermaid-cache';
const BUNDLE_PATH = path.join(CACHE_DIR, `mermaid-${MERMAID_VERSION}.min.js`);

/**
 * Google-Cloud-style diagram theme, applied identically to every rendered
 * diagram — the whole point of baking this into the render step is that no
 * post gets its own one-off styling decision (CLAUDE.md: "no manual style
 * decisions per post; the skill should apply the spec the same way every
 * time"). Palette pulled from Google's own Material/Cloud brand colors.
 * Rounded corners are enforced via themeCSS overriding node rx/ry directly,
 * since Mermaid's themeVariables don't expose a corner-radius knob — this
 * guarantees 16-24px rounding regardless of which node-shape syntax
 * (`A[...]`, `A(...)`, etc.) a given diagram's source uses.
 */
const MERMAID_INIT = {
  theme: 'base',
  themeVariables: {
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    fontSize: '15px',
    primaryColor: '#E8F0FE', // Google blue tint — default node fill
    primaryBorderColor: '#1A73E8', // Google blue — default node border
    primaryTextColor: '#202124', // Google neutral-900 — body text
    lineColor: '#5F6368', // Google neutral-600 — connectors
    secondaryColor: '#FCE8E6', // Google red tint — alt node fill
    secondaryBorderColor: '#EA4335', // Google red
    tertiaryColor: '#E6F4EA', // Google green tint — alt node fill
    tertiaryBorderColor: '#34A853', // Google green
    background: '#FFFFFF',
    mainBkg: '#E8F0FE',
    nodeBorder: '#1A73E8',
    clusterBkg: '#F1F3F4', // Google neutral-100 — subgraph background
    clusterBorder: '#DADCE0',
    edgeLabelBackground: '#FFFFFF',
    tertiaryTextColor: '#202124',
  },
  themeCSS: `
    .node rect, .node polygon, .node circle { rx: 20px; ry: 20px; filter: none !important; }
    .node.cluster rect { rx: 16px; ry: 16px; }
    .edgePath .path { stroke-width: 2px; }
    g.node * { filter: none !important; }
  `.trim(),
  flowchart: { curve: 'basis', htmlLabels: true, padding: 24 },
  fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
};

function ensureBundle() {
  if (fs.existsSync(BUNDLE_PATH)) return;
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const url = `https://registry.npmjs.org/mermaid/-/mermaid-${MERMAID_VERSION}.tgz`;
  const tgzPath = path.join(CACHE_DIR, 'mermaid.tgz');
  console.error(`Fetching mermaid ${MERMAID_VERSION} bundle (first run only)...`);
  execSync(`curl -sS -L -o "${tgzPath}" "${url}"`, { stdio: 'inherit' });
  execSync(`tar -xzf "${tgzPath}" -C "${CACHE_DIR}" package/dist/mermaid.min.js`, { stdio: 'inherit' });
  fs.renameSync(path.join(CACHE_DIR, 'package/dist/mermaid.min.js'), BUNDLE_PATH);
  fs.rmSync(path.join(CACHE_DIR, 'package'), { recursive: true, force: true });
  fs.rmSync(tgzPath, { force: true });
}

/**
 * Node's ESM `import()` does not honor NODE_PATH (only CommonJS `require`
 * does), and `playwright` is deliberately NOT a project devDependency (see
 * file header) — so it usually lives in a global/toolchain location outside
 * this repo's node_modules. Resolve it explicitly against a small list of
 * common global-install locations (override/extend with
 * MERMAID_PLAYWRIGHT_DIRS, colon-separated) instead of requiring every
 * environment to export NODE_PATH correctly.
 */
function loadPlaywright() {
  const candidateDirs = [
    ...(process.env.MERMAID_PLAYWRIGHT_DIRS?.split(':') ?? []),
    '/opt/node22/lib/node_modules',
    '/usr/lib/node_modules',
    '/usr/local/lib/node_modules',
  ].filter(Boolean);
  const require = createRequire(import.meta.url);
  try {
    return require('playwright'); // already resolvable normally (e.g. installed as a devDependency)
  } catch {
    const resolved = require.resolve('playwright', { paths: candidateDirs });
    return require(resolved);
  }
}

/**
 * Task 5 — stamp `notion_url:` into a post's frontmatter, in place.
 * Targeted line-level edit rather than a full YAML parse/re-serialize: this
 * script only ever touches this one key, so it can guarantee it leaves
 * every other line — quoting style, array formatting, comments — byte-for-
 * byte identical, which a round-trip through a YAML serializer cannot
 * promise for already-reviewed, already-published post files.
 */
function stampNotionUrl(postPath, notionUrl) {
  const raw = fs.readFileSync(postPath, 'utf8');
  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(raw);
  if (!fmMatch) {
    throw new Error(`${postPath} has no --- frontmatter block to stamp notion_url into.`);
  }
  const line = `notion_url: "${notionUrl}"`;
  const fmBody = fmMatch[1];
  const hasField = /^notion_url:/m.test(fmBody);
  const newFmBody = hasField
    ? fmBody.replace(/^notion_url:.*$/m, line)
    : `${fmBody}\n${line}`;
  const newRaw =
    raw.slice(0, fmMatch.index) +
    `---\n${newFmBody}\n---\n` +
    raw.slice(fmMatch.index + fmMatch[0].length);
  fs.writeFileSync(postPath, newRaw);
  console.error(`Stamped notion_url into ${postPath}`);
}

/**
 * Task 3 — Visual Artifacts logging, staged locally.
 *
 * The real target is a Notion "Visual Artifacts" database row (Artifact
 * Type = "Automated Skill Render (Mermaid)", Synthesis Date, Screenshot,
 * plus a relation back to the Research Item / Knowledge Graph entry that
 * spawned it). This script cannot write that row directly: it runs as a
 * plain content-authoring script, not inside a session with a live Notion
 * connection, and CLAUDE.md's "verify before operating" rule says don't
 * assume an integration is reachable — check, don't guess. So instead it
 * appends one JSON line (native JSON.stringify, per CLAUDE.md Data
 * Handling) to docs/visual-artifacts-log.jsonl, shaped exactly like the
 * intended Notion row. A follow-up sync step (run from a session that DOES
 * have Notion access) reads this file and creates/updates the real rows —
 * see docs/content-maintenance-visual-automation-handoff.md Task 3.
 */
function appendArtifactLog({ mmdPath, svgPath, postPath, notionUrl }) {
  const logPath = path.join(process.cwd(), 'docs', 'visual-artifacts-log.jsonl');
  const record = {
    artifactType: 'Automated Skill Render (Mermaid)',
    synthesisDate: new Date().toISOString().slice(0, 10),
    mmdSource: path.relative(process.cwd(), mmdPath),
    svgOutput: path.relative(process.cwd(), svgPath),
    sourcePost: postPath ? path.relative(process.cwd(), postPath) : null,
    notionUrl: notionUrl || null,
    notionSyncStatus: 'pending', // flips to 'synced' once a Notion-connected session creates the row
  };
  fs.appendFileSync(logPath, `${JSON.stringify(record)}\n`);
  console.error(`Logged artifact to ${logPath} (notionSyncStatus: pending)`);
}

async function render(inputPath, outputPath, { postPath, notionUrl } = {}) {
  const { chromium } = loadPlaywright();
  ensureBundle();

  const mmdSource = fs.readFileSync(inputPath, 'utf8');
  // Strip any %%{init: ...}%% the source already has — this script is the
  // single source of truth for styling, so a per-post init block would
  // silently override the shared spec and reintroduce the "manual style
  // decision per post" problem this skill exists to remove.
  const cleanSource = mmdSource.replace(/^%%\{init:[\s\S]*?\}%%\s*\n/, '');

  const html = `<!doctype html><html><head><meta charset="utf-8"></head>
<body>
<pre class="mermaid">${cleanSource.replace(/</g, '&lt;')}</pre>
<script src="file://${BUNDLE_PATH}"></script>
<script>
  mermaid.initialize({ startOnLoad: true, securityLevel: 'loose', ...${JSON.stringify(MERMAID_INIT)} });
</script>
</body></html>`;

  const tmpHtml = path.join(CACHE_DIR, `render-${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, html);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${tmpHtml}`);
    await page.waitForSelector('.mermaid svg', { timeout: 15000 });
    const svg = await page.$eval('.mermaid svg', (el) => el.outerHTML);
    // Mermaid's own failure mode is NOT a thrown error — a bad diagram
    // renders successfully as a "Syntax error in text" placeholder SVG
    // (the bomb icon), so waitForSelector above sees it as done. Fail
    // loud here rather than silently committing a broken-looking diagram
    // that "renders fine" as far as this script's exit code says (CLAUDE.md:
    // fail fast / no silent continuation on a wrong result).
    if (/Syntax error in text/i.test(svg)) {
      throw new Error(
        `Mermaid reported a syntax error rendering ${inputPath} — fix the .mmd source (common cause: a literal '"' inside a quoted node label; Mermaid needs HTML-entity #quot; there, not a backslash escape).`,
      );
    }
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
      outputPath,
      `<?xml version="1.0" encoding="UTF-8"?>\n${svg}\n`,
    );
    console.error(`Wrote ${outputPath}`);

    if (postPath && notionUrl) stampNotionUrl(postPath, notionUrl);
    appendArtifactLog({ mmdPath: inputPath, svgPath: outputPath, postPath, notionUrl });
  } finally {
    await browser.close();
    fs.rmSync(tmpHtml, { force: true });
  }
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--post') flags.postPath = argv[++i];
    else if (arg === '--notion-url') flags.notionUrl = argv[++i];
    else positional.push(arg);
  }
  return { positional, flags };
}

const { positional, flags } = parseArgs(process.argv.slice(2));
const [inFile, outFile] = positional;
if (!inFile || !outFile) {
  console.error(
    'Usage: node scripts/mermaid/render.mjs <input.mmd> <output.svg> [--post <post.md>] [--notion-url <url>]',
  );
  process.exit(1);
}
if (Boolean(flags.postPath) !== Boolean(flags.notionUrl)) {
  // Fail loud (CLAUDE.md: no silent partial state) rather than silently
  // skipping the frontmatter stamp because only one of the pair was given.
  console.error('--post and --notion-url must be given together, or not at all.');
  process.exit(1);
}
render(inFile, outFile, flags).catch((err) => {
  console.error('Render failed:', err);
  process.exit(1);
});
