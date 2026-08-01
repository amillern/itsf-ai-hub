import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ALLOWED_HEX = new Set([
  '#E60000', '#A10000', '#5C0000', '#FFEBEB', '#FCD4D4',
  '#FFFFFF', '#F6F5FA', '#E8E7EE', '#181818', '#515151',
  '#757575', '#FDF0CD', '#7A5A00', '#EAE8FA', '#4A3E85',
  '#161616', '#0C031D', '#280A54', '#0D0322', '#04000C',
  '#0D0422', '#F8F8FC', '#E5E5E5', '#FCE7FE', '#D5D4FF',
  '#002B99', '#0A115E', '#120440', '#FFC2C2', '#14082B',
  '#1A0B38'
]);

function walkDir(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else if (filePath.endsWith('.astro') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

let hasError = false;
const files = walkDir('src');

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const matches = content.match(/#[0-9A-Fa-f]{6}\b/g) || [];
  
  for (const hex of matches) {
    const upperHex = hex.toUpperCase();
    if (!ALLOWED_HEX.has(upperHex)) {
      console.error(`[Design System Error] Unapproved hex code ${hex} found in ${file}`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\n❌ Design system verification failed. Please use approved Tailwind color tokens or add hex code to design system config.');
  process.exit(1);
} else {
  console.log('✅ Design system verification passed cleanly.');
  process.exit(0);
}
