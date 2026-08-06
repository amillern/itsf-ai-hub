import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error('❌ PUBLIC_SITE_URL is required at build time.');
  }
  const baseUrl = siteUrl.replace(/\/$/, '');
  const isProd = import.meta.env.PUBLIC_ENV === 'prod' || import.meta.env.PUBLIC_ENV === 'production';

  // /pdf/ — це HTML-джерело для генерації PDF на збірці. Воно видаляється з dist/
  // скриптом generate-pdfs.mjs; заборона тут — страховка на випадок, якщо крок
  // прибирання не відпрацював.
  const content = isProd
    ? `User-agent: *\nAllow: /\nDisallow: /pdf/\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
