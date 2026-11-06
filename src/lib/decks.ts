// Starter decks: src/data/decks.json (written by `npm run sync` from the game's data/decks/).
import decksJson from "../data/decks.json";
import { cards, ELEMENTS, type Card } from "./cards";

type RawDeck = { id: string; slug: string; name: string; guardian: string; main: { id: string; count: number }[]; chest: string[] };
const byId = new Map(cards.map((c) => [c.id, c]));

export type Deck = ReturnType<typeof build>;
function build(d: RawDeck) {
  const guardian = byId.get(d.guardian) ?? null;
  const main = d.main.map((e) => ({ card: byId.get(e.id)!, count: e.count })).filter((e) => e.card);
  const chest = d.chest.map((id) => byId.get(id)!).filter(Boolean);
  const total = main.reduce((t, e) => t + e.count, 0);
  // element share, by number of cards
  const el = new Map<string, number>();
  for (const e of main) for (const x of e.card.elements) el.set(x, (el.get(x) || 0) + e.count);
  const elements = [...el.entries()].filter(([k]) => k !== "Neutral").sort((a, b) => b[1] - a[1]);
  const mainElement = ELEMENTS.find((x) => x.name === (guardian?.elements[0] ?? elements[0]?.[0])) ?? ELEMENTS[9];
  // cost curve (Workers excluded: they're free to play)
  const curve = Array.from({ length: 8 }, () => 0);
  for (const e of main) if (e.card.type !== "Worker") curve[Math.min(e.card.costTotal, 7)] += e.count;
  const byType = new Map<string, { card: Card; count: number }[]>();
  for (const e of main.sort((a, b) => a.card.costTotal - b.card.costTotal || a.card.name.localeCompare(b.card.name))) {
    if (!byType.has(e.card.type)) byType.set(e.card.type, []);
    byType.get(e.card.type)!.push(e);
  }
  return { ...d, guardian, main, chest, total, elements, mainElement, curve, byType };
}

export const decks = (decksJson as RawDeck[]).map(build).sort((a, b) => a.name.localeCompare(b.name));
