// RSS feed of the news posts, at /rss.xml. Discord bots (e.g. MonitoRSS) and feed readers pick up new posts from here.
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { newsPosts } from "../lib/news";

export async function GET(context: APIContext) {
  const posts = await newsPosts();
  const site = context.site!;
  return rss({
    title: "Guardian — News",
    description: "News, updates and announcements for Guardian, the tactical-grid card game.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/news/${post.id}/`,
      categories: [post.data.category],
      enclosure: post.data.image
        ? { url: new URL(post.data.image, site).href, length: 0, type: post.data.image.endsWith(".webp") ? "image/webp" : "image/jpeg" }
        : undefined,
    })),
    customData: "<language>en</language>",
  });
}
