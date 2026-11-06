// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// Fully static site: `npm run build` writes plain HTML to dist/, Netlify serves it from its CDN.
export default defineConfig({
  site: "https://guardiancg.netlify.app",
  integrations: [icon()],
  trailingSlash: "ignore",
});
