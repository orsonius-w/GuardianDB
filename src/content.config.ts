// Content collections: wiki pages are markdown files in src/content/wiki/.
// Frontmatter: title, description, section (sidebar group), order (position).
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const wiki = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.string(),
    order: z.number().default(100),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().default("News"),
    image: z.string().optional(), // cover image, e.g. /images/hero.webp
    draft: z.boolean().default(false),
  }),
});

const lore = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/lore" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { wiki, news, lore };
