#!/usr/bin/env node
/**
 * check-case-links.mjs
 *
 * Validates all internal /cases/<slug> links in src/ against valid caseStudy slugs in src/data/cases.ts.
 * Fails (exit code 1) if any broken case link is detected.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const CASES_DATA_FILE = join(ROOT, 'src/data/cases.ts');
const SRC_DIR = join(ROOT, 'src');

// 1. Extract valid slugs from src/data/cases.ts
const casesContent = readFileSync(CASES_DATA_FILE, 'utf-8');
const slugRegex = /slug:\s*["']([^"']+)["']/g;
const validSlugs = new Set();

let match;
while ((match = slugRegex.exec(casesContent)) !== null) {
  validSlugs.add(match[1]);
}

if (validSlugs.size === 0) {
  console.error('❌ Failed to parse valid case study slugs from src/data/cases.ts');
  process.exit(1);
}

// 2. Scan src/ files for /cases/<slug> links
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const files = walk(SRC_DIR).filter(f => /\.(astro|html|jsx|tsx|ts|js|mjs)$/.test(f));

const errors = [];

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((lineText, lineIdx) => {
    const lineRegex = /\/cases\/([a-zA-Z0-9_-]+)\/?/g;
    let lineMatch;
    while ((lineMatch = lineRegex.exec(lineText)) !== null) {
      const targetSlug = lineMatch[1];
      // Ignore catalog root or reserved names
      if (targetSlug === 'cases' || targetSlug === 'catalog') continue;

      if (!validSlugs.has(targetSlug)) {
        errors.push({
          file: relative(ROOT, file),
          line: lineIdx + 1,
          slug: targetSlug,
          snippet: lineText.trim()
        });
      }
    }
  });
}

// 3. Report results
if (errors.length > 0) {
  console.error('\n❌ ЗНАЙДЕНО ЗЛАМАНІ ПОСИЛАННЯ НА КЕЙСИ:\n');
  errors.forEach(e => {
    console.error(`  - ${e.file}:${e.line} -> /cases/${e.slug}/ (не існує в src/data/cases.ts)`);
    console.error(`    Фрагмент: "${e.snippet}"\n`);
  });
  process.exit(1);
} else {
  console.log(`✓ Перевірка посилань на кейси пройшла успішно: усі посилання вказують на існуючі ${validSlugs.size} кейсів.`);
}
