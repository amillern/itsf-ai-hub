import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const siteUrl = process.env.PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error('❌ PUBLIC_SITE_URL must be explicitly provided at build time (e.g. PUBLIC_SITE_URL=https://ai.itsmartflex.com). Defaulting to PROD domain is disabled for safety.');
}

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  integrations: [tailwind()],
});
