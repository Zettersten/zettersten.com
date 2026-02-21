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

## Blog authoring
Create posts in:
- `src/content/blog/*.md`

Required frontmatter:
```yaml
title: "Post title"
description: "Short summary"
date: 2026-02-20
tags: ["AI", "leadership"]
draft: false
```

## Pages
- `/` Hero + positioning
- `/work` Selected projects
- `/about` Brand narrative
- `/blog` Musings and thought pieces

## Deployment
Deploy the generated `dist/` folder to GitHub Pages via your existing workflow or Pages build pipeline.
