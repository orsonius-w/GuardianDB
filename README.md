# Guardian website

The website for Guardian, the tactical-grid card game: a card gallery, the rules wiki, news and downloads.
Live at https://guardiancg.netlify.app. It's built with [Astro](https://astro.build) as a fully static site and hosted on Netlify.

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (once, or after `package.json` changes) |
| `npm run dev` | Local preview at http://localhost:4321 with live reload |
| `npm run sync` | Pull card data and card images from the game repo |
| `npm run build` | Build the site into `dist/` (Netlify runs this on deploy) |

## Updating the cards after a game build

1. Export the card database in the game as usual. This updates `docs/card_database.csv`.
2. `npm run sync`. This reads the CSV and the card PNGs, then writes `src/data/cards.json` and `public/cards/**/*.webp`. Only changed images are re-encoded. At the end it lists any card it couldn't find art for.
3. Check it with `npm run dev`, then commit and push. Netlify deploys automatically.

The sync script expects the game repo at `C:/Users/otan/Documents/guardian-cg`. Use another location with
`GUARDIAN_REPO="D:/path/to/guardian-cg" npm run sync`. The script only **reads** from the game repo.

Which cards are public is set by `PUBLIC_STATUS` in `scripts/sync-cards.mjs`. Today that's pool, starter and Guardian cards; dungeon-only and created-only cards are left out.

## Where things live

```
scripts/sync-cards.mjs        game repo -> cards.json + webp images
src/data/cards.json           generated, don't edit by hand
src/data/keywords.json        keyword glossary (hand-written; tooltips and keyword pages)
src/data/navData.ts           main navigation
src/content/wiki/*.md         wiki pages (frontmatter: title, description, section, order)
src/content/news/*.md         news posts (frontmatter: title, description, date, category)
src/components/cards/         gallery grid + filter
src/pages/                    routes: /gallery, /cards/[slug], /wiki, /news, /downloads
src/styles/style.css          global styles and design tokens
src/styles/wiki-style.css     wiki layout and article styles
public/                       static files (images, icons, downloads)
```

## Writing content

- **A wiki page:** add a `.md` file to `src/content/wiki/` with `title`, `section` and `order`. It appears in the sidebar automatically. Sections are ordered in `src/lib/wiki.ts`.
- **A news post:** add a `.md` file to `src/content/news/`. Set `draft: true` to hide it.
- **A keyword definition:** edit `src/data/keywords.json`. `short` is the hover tooltip, `body` is the markdown on the keyword's page. Every keyword printed on a card gets a page, with or without an entry.
