import { getCollection } from "astro:content";

// Sidebar groups, in display order. A page whose section isn't listed lands at the end.
export const SECTIONS = ["Getting Started", "The Battlefield", "Summons", "Resources", "Cards", "Reference"];

export async function wikiNav() {
  const pages = (await getCollection("wiki")).sort((a, b) => a.data.order - b.data.order);
  const groups = new Map<string, { title: string; href: string }[]>();
  for (const s of SECTIONS) groups.set(s, []);
  for (const p of pages) {
    if (!groups.has(p.data.section)) groups.set(p.data.section, []);
    groups.get(p.data.section)!.push({ title: p.data.title, href: `/wiki/${p.id}/` });
  }
  const ref = groups.get("Reference")!;
  ref.push({ title: "Keywords", href: "/wiki/keywords/" }, { title: "Status Ailments & Hazards", href: "/wiki/status-ailments/" });
  return [...groups.entries()].filter(([, items]) => items.length);
}
