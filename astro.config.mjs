import netlify from "@astrojs/netlify/functions";

export default {
  output: "server",
  adapter: netlify(),
};
