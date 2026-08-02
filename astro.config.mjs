import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://ai.itsmartflex.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [tailwind()],
});
