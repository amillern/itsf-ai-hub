import type { APIRoute } from 'astro';
import { caseStudies } from '../data/cases';

export const GET: APIRoute = async () => {
  const baseUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://ai-hub-webpage-358601432150.europe-west1.run.app').replace(/\/$/, '');

  const staticPaths = [
    '',
    '/catalog',
    '/cases',
    '/contacts',
    '/privacy'
  ];

  const casePaths = caseStudies.map(c => `/cases/${c.slug}`);
  const allPaths = [...staticPaths, ...casePaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allPaths
    .flatMap(path => {
      const ukLoc = `${baseUrl}${path}/`;
      const enLoc = path === '' ? `${baseUrl}/en/` : `${baseUrl}/en${path}/`;

      return [
        {
          loc: ukLoc,
          ukLoc,
          enLoc,
          priority: path === '' ? '1.0' : '0.8'
        },
        {
          loc: enLoc,
          ukLoc,
          enLoc,
          priority: path === '' ? '0.9' : '0.7'
        }
      ];
    })
    .map(
      (item) => `
    <url>
      <loc>${item.loc}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${item.priority}</priority>
      <xhtml:link rel="alternate" hreflang="uk" href="${item.ukLoc}" />
      <xhtml:link rel="alternate" hreflang="en" href="${item.enLoc}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${item.ukLoc}" />
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
