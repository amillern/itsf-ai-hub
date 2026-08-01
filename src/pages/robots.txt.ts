import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  let baseUrl = import.meta.env.PUBLIC_SITE_URL;

  if (!baseUrl) {
    const url = new URL(request.url);
    baseUrl = url.origin;
  }

  baseUrl = baseUrl.replace(/\/$/, '');
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
