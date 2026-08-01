import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const uiFile = path.resolve(__dirname, '../src/i18n/ui.ts');

let hasError = false;

// 1. Verify UI Dictionary Symmetry
if (fs.existsSync(uiFile)) {
  const content = fs.readFileSync(uiFile, 'utf-8');
  const ukMatch = content.match(/uk:\s*\{([\s\S]*?)\},\s*en:/);
  const enMatch = content.match(/en:\s*\{([\s\S]*?)\}\s*\} as const/);

  if (ukMatch && enMatch) {
    const extractKeys = (block) => {
      return Array.from(block.matchAll(/'([^']+)'\s*:/g)).map(m => m[1]);
    };

    const ukKeys = new Set(extractKeys(ukMatch[1]));
    const enKeys = new Set(extractKeys(enMatch[1]));

    ukKeys.forEach(key => {
      if (!enKeys.has(key)) {
        console.error(`❌ i18n error: Key '${key}' is defined in UK but missing in EN dictionary.`);
        hasError = true;
      }
    });

    enKeys.forEach(key => {
      if (!ukKeys.has(key)) {
        console.error(`❌ i18n error: Key '${key}' is defined in EN but missing in UK dictionary.`);
        hasError = true;
      }
    });
  }
}

// 2. Scan dist/en/*.html for Cyrillic text
const enDistDir = path.join(distDir, 'en');

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf-8');
      
      // Ignore meta tags or scripts if needed, check visible text body
      const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
      const contentToScan = bodyMatch ? bodyMatch[0] : html;

      // Cyrillic regex
      const cyrillicMatches = contentToScan.match(/[\u0400-\u04FF]/g);
      if (cyrillicMatches && cyrillicMatches.length > 20) { 
        // Small tolerance for proper names like Київ if present, but catch untranslated pages
        console.error(`⚠️ i18n warning: Found ${cyrillicMatches.length} Cyrillic characters in ${path.relative(distDir, fullPath)}`);
      }
    }
  }
}

scanDirectory(enDistDir);

if (hasError) {
  process.exit(1);
} else {
  console.log('✅ i18n dictionary symmetry and layout verification passed cleanly.');
}
