# zettersten.com (v2)

Modern static personal brand site for Erik Zettersten.

## Stack

- Astro (static output)
- Content Collections for blog posts
- Pure CSS (no runtime framework)
- GitHub Pages compatible (no backend)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Linting, formatting, and git hooks

This repo enforces code quality on every commit and push via Husky:

- **pre-commit** → `lint-staged` (Prettier + ESLint on staged files)
- **pre-push** → `npm run validate` (`lint` + `format:check` + `build`)

Useful commands:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run check
npm run validate
```

## Blog authoring

See `EDITORIAL.md` for AI-friendly authoring rules, supported components, and OG image pipeline behavior.

Create posts in:

- `src/content/blog/*.mdx`

Required frontmatter:

```yaml
title: 'Post title'
description: 'Short summary'
date: 2026-02-20
tags: ['AI', 'leadership']
draft: false
```

### Branded social/OG images for blog posts

This repo includes a Python image pipeline that creates branded 1200×630 share thumbnails for every blog post.

- Source image stays preserved in frontmatter as `sourceImage`
- `coverImage` is rewritten to the generated branded social image in `/public/images/blog/og/*`

Run manually:

```bash
npm run og:generate
```

It also runs automatically:

- before build (`prebuild`), and
- in the pre-commit hook.

If Python deps are missing, generation is skipped safely (to avoid blocking static GitHub Pages builds).

To enable generation locally:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-editorial.txt
```

### Embedding tweets/X posts in articles

You can embed real tweet cards in blog posts.

For Markdown (`.md`) or MDX (`.mdx`), paste standard embed markup:

```html
<blockquote class="twitter-tweet">
  <a href="https://x.com/username/status/1234567890123456789">View post</a>
</blockquote>
```

For MDX, you can also use the helper component:

```mdx
import TweetEmbed from '../../components/TweetEmbed.astro';

<TweetEmbed url="https://x.com/username/status/1234567890123456789" />
```

## Pages

- `/` Hero + positioning
- `/work` Selected projects + case-study outcomes
- `/about` Brand narrative
- `/blog` Musings and thought pieces
- `/rss.xml` RSS feed
- `/sitemap.xml` XML sitemap

## Deployment

Deploy the generated `dist/` folder to GitHub Pages via your existing workflow or Pages build pipeline.
