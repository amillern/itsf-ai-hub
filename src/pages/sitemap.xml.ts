import type { APIRoute } from 'astro';
import { caseStudies } from '../data/cases';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://ai-hub-webpage-358601432150.europe-west1.run.app';

  const staticPages = [
    '',
    '/catalog',
    '/cases',
    '/contacts',
    '/privacy'
  ];

  const casePagesUkr = caseStudies.map(c => `/cases/${c.slug}`);

  const allUrls = [...staticPages, ...casePagesUkr];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}/</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
