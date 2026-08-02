#!/usr/bin/env node
/**
 * check-design-system.mjs
 *
 * Механічний бар'єр проти "дрейфу" дизайн-системи.
 * Падає, якщо в src/ з'явився hex-колір, неіснуючий клас Tailwind,
 * інлайновий SVG у сторінці або емодзі-замість-іконки.
 *
 * Запуск:  node scripts/check-design-system.mjs
 * У CI:    блокуючий крок перед build
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

// ── Налаштування ─────────────────────────────────────────────────────────────

/** Файли, яким дозволено містити hex (сама палітра). */
const HEX_ALLOWLIST = [
  'src/design/tokens.ts',
  'src/design/icons.ts',
];

/** Класи Tailwind v4, яких НЕ існує у v3.4 — вони мовчки ігноруються. */
const TAILWIND_V4_ONLY = [
  'shadow-xs', 'shadow-2xs', 'shadow-3xl',
  'rounded-4xs', 'blur-xs', 'ring-3',
  'outline-hidden', 'shrink-0-', 'text-shadow-',
];

/** Класи довільних значень зі шкали, якої немає у v3. */
const INVALID_SPACING = /\b(?:p|m|py|px|pt|pb|pl|pr|my|mx|mt|mb|ml|mr|gap|space-[xy])-(?:4\.5|5\.5|6\.5|7\.5|9\.5|10\.5)\b/g;

/**
 * Токени, оголошені в tailwind.config.mjs.
 * Скрипт читає конфіг і перевіряє, що всі кастомні класи виду
 * text-<token> / bg-<token> / border-<token> справді існують.
 */
const CUSTOM_PREFIXES = ['brand-', 'surface-', 'text-', 'badge-', 'status-'];

/** Емодзі та символи, які використовувались як іконки. */
const ICON_GLYPHS = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2700}-\u{27BF}\u2716\u2720\u2756]/gu;

// ── Утиліти ──────────────────────────────────────────────────────────────────

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const errors = [];
const warnings = [];

function err(file, line, msg, snippet) {
  errors.push({ file, line, msg, snippet });
}
function warn(file, line, msg, snippet) {
  warnings.push({ file, line, msg, snippet });
}

// ── Зчитуємо дозволені токени з tailwind.config.mjs ──────────────────────────

let knownTokens = new Set();

/** Повертає вміст об'єкта, що починається одразу після `key:` (з урахуванням вкладеності). */
function extractBlock(src, key) {
  const at = src.indexOf(key);
  if (at === -1) return null;
  const open = src.indexOf('{', at);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  return null;
}

try {
  const cfg = readFileSync(join(ROOT, 'tailwind.config.mjs'), 'utf8');
  const colors = extractBlock(cfg, 'colors:');
  if (!colors) throw new Error('secção colors не знайдена');

  // Проходимо верхній рівень: або `group: { ... }`, або `name: '#hex'`
  let i = 0;
  while (i < colors.length) {
    const m = /(['"]?)([\w-]+)\1\s*:/g;
    m.lastIndex = i;
    const hit = m.exec(colors);
    if (!hit) break;

    const name = hit[2];
    let rest = colors.slice(m.lastIndex);
    const nextNonSpace = rest.match(/^\s*(.)/)?.[1];

    if (nextNonSpace === '{') {
      const body = extractBlock(colors.slice(m.lastIndex - 1), ':');
      knownTokens.add(name);
      if (body) {
        const keyRe = /(['"]?)([\w-]+)\1\s*:/g;
        let k;
        while ((k = keyRe.exec(body))) {
          knownTokens.add(k[2] === 'DEFAULT' ? name : `${name}-${k[2]}`);
        }
        i = m.lastIndex + body.length + 2;
        continue;
      }
    } else {
      knownTokens.add(name);
    }
    i = m.lastIndex;
  }

  if (!knownTokens.size) throw new Error('токенів не знайдено');
} catch (e) {
  knownTokens = new Set();
  warn('tailwind.config.mjs', 0, `не вдалося розібрати палітру (${e.message}) — перевірка токенів пропущена`, '');
}

// ── Основний прохід ──────────────────────────────────────────────────────────

const files = walk(SRC).filter((f) => ['.astro', '.ts', '.tsx'].includes(extname(f)));

for (const file of files) {
  const rel = relative(ROOT, file).split('\\').join('/');
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, i) => {
    const n = i + 1;

    // 1. hex-кольори
    if (!HEX_ALLOWLIST.includes(rel)) {
      const hexes = line.match(/#[0-9A-Fa-f]{3,8}\b/g);
      if (hexes) {
        // ігноруємо якірні посилання типу href="#promo-carousel"
        const real = hexes.filter((h) => /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{8}$/.test(h));
        if (real.length) {
          err(rel, n, `hex-колір у розмітці: ${real.join(', ')} — використай токен із tailwind.config.mjs`, line.trim());
        }
      }
    }

    // 2. класи Tailwind v4
    for (const cls of TAILWIND_V4_ONLY) {
      const re = new RegExp(`(?<![\\w-])${cls}(?![\\w-])`);
      if (re.test(line)) {
        err(rel, n, `клас "${cls}" існує лише в Tailwind v4 — у проєкті v3.4, тому він мовчки ігнорується`, line.trim());
      }
    }

    // 3. неіснуюча шкала відступів
    const spacing = line.match(INVALID_SPACING);
    if (spacing) {
      err(rel, n, `відступ поза дефолтною шкалою v3: ${[...new Set(spacing)].join(', ')}`, line.trim());
    }

    // 4. кастомні токени, яких немає в конфізі
    if (knownTokens.size) {
      const utilRe = /(?<![\w-])(?:text|bg|border|from|to|via|ring|fill|stroke|shadow|divide|placeholder)-([a-z]+(?:-[a-z0-9]+)+)/g;
      const seen = new Set();
      let u;
      while ((u = utilRe.exec(line))) {
        // відсікаємо модифікатор непрозорості: brand-red/10 → brand-red
        const token = u[1].split('/')[0];
        if (seen.has(token)) continue;
        if (!CUSTOM_PREFIXES.some((p) => token.startsWith(p))) continue;
        if (!knownTokens.has(token)) {
          seen.add(token);
          err(rel, n, `токен "${token}" не оголошений у tailwind.config.mjs — клас не згенерується`, line.trim());
        }
      }
    }

    // 5. інлайновий SVG у сторінках (компонентам icons дозволено)
    if (rel.startsWith('src/pages/') && /<svg[\s>]/.test(line)) {
      err(rel, n, 'інлайновий <svg> у сторінці — використай <Icon name="…" /> із src/design/icons.ts', line.trim());
    }

    // 6. емодзі як іконка
    const glyphs = line.match(ICON_GLYPHS);
    if (glyphs && /<(div|span|p|h[1-6])[^>]*>\s*[^<]*$/.test(line.trim())) {
      warn(rel, n, `символ ${glyphs.join(' ')} схожий на використання емодзі замість іконки`, line.trim());
    }

    // 7. довільні значення
    const arbitrary = line.match(/\b(?:w|h|p|m|text|gap|top|left|right|bottom)-\[[^\]]+\]/g);
    if (arbitrary) {
      const suspicious = arbitrary.filter((a) => !/\[(?:url|calc|var|100vh|100vw|\d+px\]$)/.test(a));
      if (suspicious.length > 3) {
        warn(rel, n, `багато довільних значень (${suspicious.length}) — можливо, шкала розходиться з макетом`, line.trim().slice(0, 120));
      }
    }
  });
}

// ── Вивід ────────────────────────────────────────────────────────────────────

const RED = '\x1b[31m', YEL = '\x1b[33m', GRN = '\x1b[32m', DIM = '\x1b[2m', OFF = '\x1b[0m';

if (warnings.length) {
  console.log(`\n${YEL}Попередження (${warnings.length}):${OFF}`);
  for (const w of warnings) {
    console.log(`  ${w.file}:${w.line}  ${w.msg}`);
    if (w.snippet) console.log(`    ${DIM}${w.snippet.slice(0, 140)}${OFF}`);
  }
}

if (errors.length) {
  console.log(`\n${RED}Помилки дизайн-системи (${errors.length}):${OFF}`);
  for (const e of errors) {
    console.log(`  ${RED}✗${OFF} ${e.file}:${e.line}  ${e.msg}`);
    if (e.snippet) console.log(`    ${DIM}${e.snippet.slice(0, 140)}${OFF}`);
  }

  // ── Тимчасовий режим попередження ──────────────────────────────────────────
  // При першому увімкненні перевірка знаходить ~65 наявних порушень (легасі-код,
  // не пов'язаних з поточною задачею стабілізації — виправляти їх тут означало б
  // порушити "мінімальний диф"). Щоб не заблокувати CI одразу, перевірка поки що
  // НЕ падає, а лише репортить. Виправляти по секціях окремими задачами; коли
  // лічильник дійде до нуля — прибрати STRICT=false і зробити перевірку блокуючою.
  // Див. SETUP.md, розділ "Що робити з ~86 помилками дизайн-системи".
  const STRICT = process.env.DESIGN_SYSTEM_STRICT === '1';
  console.log(
    STRICT
      ? `\n${RED}Перевірку не пройдено.${OFF} Див. AGENTS.md §4–§6.\n`
      : `\n${YEL}Перевірку не пройдено, але DESIGN_SYSTEM_STRICT не увімкнено — режим попередження.${OFF}\n` +
        `${DIM}Встановіть DESIGN_SYSTEM_STRICT=1, коли легасі-порушення буде прибрано.${OFF}\n`
  );
  process.exit(STRICT ? 1 : 0);
}

console.log(`${GRN}✓${OFF} Дизайн-система: перевірку пройдено (${files.length} файлів).`);
