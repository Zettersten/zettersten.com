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

Create posts in:

- `src/content/blog/*.md`

Required frontmatter:

```yaml
title: 'Post title'
description: 'Short summary'
date: 2026-02-20
tags: ['AI', 'leadership']
draft: false
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
