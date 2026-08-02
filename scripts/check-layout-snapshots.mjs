#!/usr/bin/env node
/**
 * check-layout-snapshots.mjs
 *
 * Головний бар'єр проти "агент тихо переписав футер/хедер".
 *
 * Бере зібраний dist/, витягає розмітку <header>, <footer>, cookie consent та аналітику з кожної сторінки,
 * нормалізує її та рахує SHA-256. Порівнює з еталонами в .snapshots/layout.json.
 * Будь-яка зміна — падіння збірки.
 *
 * Оновити еталон свідомо: node scripts/check-layout-snapshots.mjs --update
 *
 * Вимагає попереднього `npm run build`.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SNAP_FILE = join(ROOT, '.snapshots', 'layout.json');
const UPDATE = process.argv.includes('--update');

const RED = '\x1b[31m', GRN = '\x1b[32m', YEL = '\x1b[33m', DIM = '\x1b[2m', OFF = '\x1b[0m';

if (!existsSync(DIST)) {
  console.error(`${RED}✗${OFF} Немає dist/. Спочатку виконай: npm run build`);
  process.exit(1);
}

/** Регіони, які захищаємо. */
const REGIONS = {
  header: /<header[\s\S]*?<\/header>/i,
  footer: /<footer[\s\S]*?<\/footer>/i,
  cookieConsent: /<div[^>]*id=["']cookie-consent-banner["'][\s\S]*?<\/div>\s*(?=<script|<\/body)/i,
  analytics: /<script[^>]*googletagmanager[\s\S]*?<\/script>|<script[^>]*amplitude[\s\S]*?<\/script>/gi,
};

/**
 * Нормалізація: прибираємо те, що законно змінюється між збірками,
 * щоб хеш реагував лише на змістовні правки розмітки.
 */
function normalize(html) {
  return html
    .replace(/\/_astro\/[\w.-]+\.(?:css|js)/g, '/_astro/HASH')   // хеші бандлів
    .replace(/<!--[\s\S]*?-->/g, '')                              // коментарі
    .replace(/\s+/g, ' ')                                         // пробіли
    .replace(/>\s+</g, '><')
    .trim();
}

function sha(s) {
  return createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 16);
}

function walkHtml(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walkHtml(full, out);
    else if (e.endsWith('.html')) out.push(full);
  }
  return out;
}

// ── Збираємо поточні хеші ────────────────────────────────────────────────────

const pages = walkHtml(DIST).sort();
const current = {};

for (const page of pages) {
  const url = '/' + relative(DIST, page).split('\\').join('/').replace(/index\.html$/, '');
  const html = readFileSync(page, 'utf8');
  const entry = {};

  for (const [name, re] of Object.entries(REGIONS)) {
    const matches = re.global ? html.match(re) : [html.match(re)?.[0]].filter(Boolean);
    if (!matches || !matches.length) {
      entry[name] = null;
      continue;
    }
    entry[name] = sha(normalize(matches.join('')));
  }
  current[url] = entry;
}

// ── Режим оновлення ──────────────────────────────────────────────────────────

if (UPDATE) {
  mkdirSync(dirname(SNAP_FILE), { recursive: true });
  writeFileSync(SNAP_FILE, JSON.stringify(current, null, 2) + '\n', 'utf8');
  console.log(`${YEL}⟳${OFF} Еталон оновлено: ${relative(ROOT, SNAP_FILE)}`);
  console.log(`${DIM}  Цей коміт має рев'юїти людина — див. CODEOWNERS.${OFF}`);
  process.exit(0);
}

// ── Порівняння ───────────────────────────────────────────────────────────────

if (!existsSync(SNAP_FILE)) {
  console.error(`${RED}✗${OFF} Немає еталона ${relative(ROOT, SNAP_FILE)}.`);
  console.error(`  Створи один раз, коли розмітка вивірена: node scripts/check-layout-snapshots.mjs --update`);
  process.exit(1);
}

const expected = JSON.parse(readFileSync(SNAP_FILE, 'utf8'));
const problems = [];

// нові / зниклі сторінки
for (const url of Object.keys(current)) {
  if (!(url in expected)) problems.push({ url, region: '—', kind: 'нова сторінка (не в еталоні)' });
}
for (const url of Object.keys(expected)) {
  if (!(url in current)) problems.push({ url, region: '—', kind: 'сторінка зникла' });
}

// зміни в захищених регіонах
for (const [url, regions] of Object.entries(current)) {
  if (!expected[url]) continue;
  for (const [region, hash] of Object.entries(regions)) {
    const want = expected[url][region];
    if (want === undefined) continue;
    if (want !== hash) {
      problems.push({
        url,
        region,
        kind: want === null ? 'регіон з\'явився' : hash === null ? 'регіон зник' : `розмітку змінено (${want} → ${hash})`,
      });
    }
  }
}

if (problems.length) {
  console.log(`\n${RED}Захищену розмітку змінено (${problems.length}):${OFF}\n`);
  for (const p of problems) {
    console.log(`  ${RED}✗${OFF} ${p.url}  [${p.region}]  ${p.kind}`);
  }
  console.log(`
${RED}Перевірку не пройдено.${OFF}

Хедер, футер, банер згоди та блок аналітики захищені від неузгоджених змін
(див. AGENTS.md §1). Якщо зміна СВІДОМА і затверджена:

  node scripts/check-layout-snapshots.mjs --update
  git add .snapshots/layout.json

і опиши в PR, що саме та навіщо змінилось.

Якщо зміна НЕ була навмисною — відкоти правки у відповідних компонентах.
`);
  process.exit(1);
}

console.log(`${GRN}✓${OFF} Захищена розмітка без змін (${pages.length} сторінок, ${Object.keys(REGIONS).length} регіони).`);
