import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const snapshotPath = join(process.cwd(), '.snapshots', 'layout.json');
const isUpdate = process.argv.includes('--update');

let htmlContent = '';
const indexPath = join(process.cwd(), 'dist', 'index.html');

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Please run `npm run build` before checking layout snapshots.');
  process.exit(1);
}

htmlContent = readFileSync(indexPath, 'utf8');

const headerMatch = htmlContent.match(/<header[\s\S]*?<\/header>/i);
const footerMatch = htmlContent.match(/<footer[\s\S]*?<\/footer>/i);

if (!headerMatch || !footerMatch) {
  console.error('❌ Failed to extract <header> or <footer> markup from dist/index.html.');
  process.exit(1);
}

const headerHtml = headerMatch[0].trim();
const footerHtml = footerMatch[0].trim();

const headerHash = createHash('md5').update(headerHtml).digest('hex');
const footerHash = createHash('md5').update(footerHtml).digest('hex');

const currentSnapshots = {
  headerHash,
  footerHash,
  updatedAt: new Date().toISOString()
};

if (isUpdate || !existsSync(snapshotPath)) {
  writeFileSync(snapshotPath, JSON.stringify(currentSnapshots, null, 2), 'utf8');
  console.log(`✅ Layout snapshots updated in ${snapshotPath}`);
  process.exit(0);
}

const savedSnapshots = JSON.parse(readFileSync(snapshotPath, 'utf8'));

let hasMismatch = false;

if (savedSnapshots.headerHash !== headerHash) {
  console.error('❌ [Snapshot Mismatch] <header> markup has changed unexpectedly!');
  hasMismatch = true;
}

if (savedSnapshots.footerHash !== footerHash) {
  console.error('❌ [Snapshot Mismatch] <footer> markup has changed unexpectedly!');
  hasMismatch = true;
}

if (hasMismatch) {
  console.error('\nIf this layout change was intentional, run `npm run snapshot:update` to update the baseline snapshot.');
  process.exit(1);
} else {
  console.log('✅ Header and Footer layout snapshot verification passed cleanly.');
  process.exit(0);
}
