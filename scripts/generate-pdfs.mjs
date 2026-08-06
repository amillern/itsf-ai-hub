#!/usr/bin/env node
/**
 * generate-pdfs.mjs
 *
 * Рендерить по одному PDF на кейс під час збірки.
 *
 * Чому саме так, а не window.print():
 *   window.print() віддає результат, який залежить від браузера користувача,
 *   його полів, галочки "фонова графіка" та колонтитулів. Тут PDF формується
 *   один раз на збірці одним і тим самим Chromium — усі користувачі
 *   завантажують побайтово однаковий файл.
 *
 * Потік:
 *   1. Піднімає статичний сервер над dist/ (без зовнішніх залежностей).
 *   2. Для кожного /pdf/<slug>/ рендерить A4 у dist/cases/<slug>.pdf.
 *   3. Видаляє HTML-роут /pdf/ з dist/, щоб він не потрапив у прод і в індекс.
 *
 * Запуск:  node scripts/generate-pdfs.mjs
 * Пропуск: SKIP_PDF=1 node scripts/generate-pdfs.mjs   (тільки для локальної роботи)
 *
 * Скрипт свідомо падає, якщо Chromium недоступний або якщо хоч один PDF
 * не згенерувався. Мовчазний пропуск тут неприпустимий — саме так у прод
 * потрапляють збірки з відсутніми файлами.
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, rm, stat, readFile } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(DIST, 'cases');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

/** Мінімальний статичний сервер над dist/ з підтримкою trailingSlash: 'always'. */
function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

      // Захист від виходу за межі dist/
      const candidate = resolve(join(DIST, urlPath));
      if (!candidate.startsWith(DIST)) {
        res.writeHead(403).end('Forbidden');
        return;
      }

      let filePath = candidate;
      const info = await stat(filePath).catch(() => null);
      if (!info || info.isDirectory()) {
        filePath = join(candidate, 'index.html');
      }

      const fileInfo = await stat(filePath).catch(() => null);
      if (!fileInfo || !fileInfo.isFile()) {
        res.writeHead(404).end('Not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Content-Length': fileInfo.size,
      });
      createReadStream(filePath).pipe(res);
    } catch (error) {
      res.writeHead(500).end(String(error));
    }
  });

  return new Promise((resolvePromise) => {
    server.listen(0, '127.0.0.1', () => {
      resolvePromise({ server, port: server.address().port });
    });
  });
}

/** Читає слаги напряму з зібраного sitemap-джерела — src/data/cases.ts. */
async function readSlugs() {
  const source = await readFile(join(ROOT, 'src', 'data', 'cases.ts'), 'utf8');
  const slugs = [...source.matchAll(/^\s*slug:\s*["']([^"']+)["']/gm)].map((m) => m[1]);

  if (slugs.length === 0) {
    throw new Error('Не знайдено жодного slug у src/data/cases.ts');
  }
  return slugs;
}

async function resolveChromium() {
  const { chromium } = await import('playwright-core');

  // В Docker-збірці Chromium ставиться через apk і передається сюди явно.
  const executablePath = process.env.CHROMIUM_PATH;

  const launchOptions = {
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  };
  if (executablePath) launchOptions.executablePath = executablePath;

  try {
    return await chromium.launch(launchOptions);
  } catch (error) {
    throw new Error(
      'Не вдалось запустити Chromium для генерації PDF.\n' +
        'У Docker-збірці задайте CHROMIUM_PATH=/usr/bin/chromium-browser.\n' +
        'Локально: npx playwright install chromium, або SKIP_PDF=1 щоб пропустити крок.\n' +
        `Причина: ${error.message}`
    );
  }
}

const footerTemplate = `
  <div style="width:100%;font-family:Roboto,Arial,sans-serif;font-size:8px;color:#757575;
              padding:0 14mm;display:flex;justify-content:space-between;align-items:center;">
    <span>© IT SmartFlex — AI Hub</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>
`;

async function main() {
  if (process.env.SKIP_PDF === '1') {
    console.log('⏭  SKIP_PDF=1 — генерацію PDF пропущено.');
    return;
  }

  const distInfo = await stat(DIST).catch(() => null);
  if (!distInfo) {
    throw new Error('dist/ не знайдено. Спершу виконайте astro build.');
  }

  const slugs = await readSlugs();
  const { server, port } = await startStaticServer();
  const browser = await resolveChromium();

  const baseUrl = `http://127.0.0.1:${port}`;
  const generated = [];

  try {
    await mkdir(OUT_DIR, { recursive: true });

    const context = await browser.newContext({
      // Фіксований viewport + DPR прибирають будь-яку залежність від хост-машини.
      viewport: { width: 1240, height: 1754 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const slug of slugs) {
      const target = `${baseUrl}/pdf/${slug}/`;
      const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60_000 });

      if (!response || !response.ok()) {
        throw new Error(`${target} → HTTP ${response ? response.status() : 'no response'}`);
      }

      // Шрифти й банер мають бути готові до друку, інакше поїде верстка.
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        const images = Array.from(document.images);
        await Promise.all(
          images.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.addEventListener('load', res, { once: true });
                  img.addEventListener('error', res, { once: true });
                })
          )
        );
      });

      const outFile = join(OUT_DIR, `${slug}.pdf`);
      await page.pdf({
        path: outFile,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate,
        margin: { top: '14mm', right: '14mm', bottom: '16mm', left: '14mm' },
      });

      const size = (await stat(outFile)).size;
      if (size < 5_000) {
        throw new Error(`${slug}.pdf має підозріло малий розмір (${size} B) — ймовірно порожній.`);
      }

      generated.push({ slug, size });
      console.log(`✓ cases/${slug}.pdf  (${(size / 1024).toFixed(0)} KB)`);
    }

    await context.close();
  } finally {
    await browser.close();
    server.close();
  }

  // HTML-джерело PDF не має потрапити ні в прод, ні в індекс пошуковиків.
  await rm(join(DIST, 'pdf'), { recursive: true, force: true });

  console.log(`\n✅ Згенеровано PDF: ${generated.length}/${slugs.length}`);
}

main().catch((error) => {
  console.error(`\n❌ Генерація PDF провалилась:\n${error.message}\n`);
  process.exit(1);
});
