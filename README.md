# Hello Friend for Eleventy
[hello.000000076.xyz](https://hello.000000076.xyz/)

A port of `hugo-theme-hello-friend` to **Eleventy 3.1.2** with:

- ESM configuration
- Nunjucks templates
- Luxon date handling
- Pagefind search
- Feed + sitemap + robots + humans endpoints

## License

This project keeps the original **MIT** license. See `LICENSE.md`.

## Requirements

- Node.js 18.18+
- npm 9+

## Quick Start

```bash
npm install
npm run dev
```

Build production site + Pagefind index:

```bash
npm run build
```

Output directory: `_site/`

## Stack

- `@11ty/eleventy@3.1.2`
- `luxon`
- `@11ty/eleventy-plugin-rss`
- `pagefind`
- `sass`

## Content + Data

- Site metadata lives in `_data/metadata.yml`
- Templates use Nunjucks in `_includes/`
- Content lives in `content/`
- Posts live in `content/posts/`

`published: false` in front matter excludes posts from collections and feeds.

## Included Endpoints

- `/feed/feed.xml` (Atom, styled by `/feed/pretty-atom-feed.xsl`)
- `/feed/feed.rss`
- `/feed/feed.json`
- `/feed/twtxt.txt`
- `/sitemap.xml` (styled by `/sitemap.xsl`)
- `/robots.txt`
- `/humans.txt`
- `/search/` (Pagefind UI)

## Search (Pagefind)

- Search UI page source: `content/search.njk`
- Search index is generated during `npm run build` via:
  - `pagefind --site _site --glob "**/*.html"`

## Accessibility + Performance Defaults

The port includes:

- semantic landmarks (`header`, `nav`, `main`, `footer`)
- skip link for keyboard users
- descriptive metadata + canonical links
- deferred JavaScript
- compressed CSS build
- static output optimized for CDN hosting

To validate Lighthouse scores, run `npm run build` and test the built site in a production-like host.
