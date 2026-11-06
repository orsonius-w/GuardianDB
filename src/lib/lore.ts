import { getCollection } from "astro:content";
export async function lorePages() {
  return (await getCollection("lore", (p) => !p.data.draft)).sort((a, b) => a.data.order - b.data.order);
}
export async function loreNav(): Promise<[string, { title: string; href: string }[]][]> {
  const pages = await lorePages();
  return [["The World of Kaimun", pages.map((p) => ({ title: p.data.title, href: `/lore/${p.id}/` }))]];
}
