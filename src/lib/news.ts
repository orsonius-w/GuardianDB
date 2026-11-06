import { getCollection } from "astro:content";

export async function newsPosts() {
  return (await getCollection("news", (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
}
export const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
