import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import astroPagefind from 'astro-pagefind';
import astroIcon from 'astro-icon';

export default defineConfig({
  site: 'https://zettersten.com',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt({
      policy: [{ userAgent: '*', allow: '/' }],
      sitemapURL: 'https://zettersten.com/sitemap-index.xml',
    }),
    astroPagefind(),
    astroIcon(),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
      XML: true,
    }),
  ],
});
