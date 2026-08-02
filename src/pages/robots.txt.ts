import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error('❌ PUBLIC_SITE_URL is required at build time.');
  }
  const baseUrl = siteUrl.replace(/\/$/, '');
  const isProd = import.meta.env.PUBLIC_ENV === 'production';

  const content = isProd
    ? `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
