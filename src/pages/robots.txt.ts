import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://ai-hub-webpage-358601432150.europe-west1.run.app').replace(/\/$/, '');
  const isDev = baseUrl.includes('358601432150') || baseUrl.includes('localhost');

  const content = isDev
    ? `User-agent: *\nDisallow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
