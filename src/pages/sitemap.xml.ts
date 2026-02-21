import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://zettersten.com';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const staticPaths = ['/', '/about/', '/work/', '/blog/'];
  const postPaths = posts.map((p) => `/blog/${p.id.replace(/\.md$/, '')}/`);

  const urls = [...staticPaths, ...postPaths]
    .map((path) => `<url><loc>${SITE}${path}</loc></url>`)
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
