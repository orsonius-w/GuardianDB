// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Fully static site: `npm run build` writes plain HTML to dist/, Netlify serves it from its CDN.
export default defineConfig({
  site: "https://guardiancg.netlify.app",
  integrations: [icon(), mdx(), sitemap()],
  trailingSlash: "ignore",
});
