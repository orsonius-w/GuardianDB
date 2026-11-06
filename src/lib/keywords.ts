// Keyword glossary: src/data/keywords.json (hand-maintained, written from the rules codex).
// Each entry: { name, category, short, body (markdown), confidence, note }.
import { marked } from "marked";
import data from "../data/keywords.json";
import { keywordCounts, keywordSlug } from "./cards";

export type Keyword = { name: string; category: string; short: string; body: string; confidence?: string; note?: string };
const entries = (data as Keyword[]).filter((k) => !k.name.startsWith("_"));
export const ailmentsOverview = (data as Keyword[]).find((k) => k.name === "_ailments_overview");

export const AILMENT_CATEGORY = "ailment";
export const CATEGORY_LABEL: Record<string, string> = {
  trigger: "Triggers", static: "Static abilities", condition: "Conditions", combat: "Combat skills",
  protection: "Protection", ailment: "Status ailments", movement: "Movement", celerity: "Celerity",
  trap: "Trap keywords", element: "Element keywords", other: "Other",
};

// Glossary entry by printed keyword. "Swift 1" / "Mana Regen 1" fall back to their base name.
const byName = new Map(entries.map((k) => [k.name.toLowerCase(), k]));
export function glossaryFor(printed: string): Keyword | undefined {
  return byName.get(printed.toLowerCase()) ?? byName.get(printed.replace(/\s+\d+$/, "").toLowerCase());
}

export const md = (s: string) => marked.parse(s || "", { async: false }) as string;

// Every keyword page: glossary entries plus any printed keyword without an entry yet.
export function allKeywords() {
  const map = new Map<string, { name: string; slug: string; entry?: Keyword; printed: string[]; count: number }>();
  for (const k of entries) map.set(k.name, { name: k.name, slug: keywordSlug(k.name), entry: k, printed: [], count: 0 });
  for (const [printed, n] of keywordCounts) {
    if (!/^[A-Z]/.test(printed)) continue;
    const entry = glossaryFor(printed);
    const name = entry?.name ?? printed;
    if (!map.has(name)) map.set(name, { name, slug: keywordSlug(name), entry, printed: [], count: 0 });
    const row = map.get(name)!;
    row.printed.push(printed);
    row.count += n;
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
