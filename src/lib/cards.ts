// src/lib/cards.ts — all card data comes from src/data/cards.json (written by `npm run sync`).
import cardsJson from "../data/cards.json";

export type Pip = { n: string; el: string };
export type Card = {
  id: string; slug: string; name: string; type: string; typeLine: string;
  treasure: boolean; token: boolean; status: string; group: string;
  elements: string[]; subtypes: string[]; cost: Pip[]; costTotal: number;
  rarity: string; limit: number | string | null;
  life: number | null; mana: number | null; attack: number | null; defense: number | null;
  magic: number | null; resistance: number | null; movement: number | null;
  combat: string; keywords: string[]; text: string; summonSpells: string;
  activationCost: Pip[]; workerCost: number | null; level: number | null; duration: number | null;
  image: string | null; imageWidth?: number; imageHeight?: number;
};

export const cards = cardsJson as Card[];

// Element pages, in display order. `cls` keeps the original badge class names.
export const ELEMENTS = [
  { name: "Light", slug: "light", cls: "light" },
  { name: "Darkness", slug: "darkness", cls: "darkness" },
  { name: "Fire", slug: "fire", cls: "fire" },
  { name: "Water", slug: "water", cls: "water" },
  { name: "Earth", slug: "earth", cls: "earth" },
  { name: "Wind", slug: "wind", cls: "wind" },
  { name: "Lightning", slug: "lightning", cls: "blitz" },
  { name: "Ice", slug: "ice", cls: "ice" },
  { name: "Nature", slug: "nature", cls: "nature" },
  { name: "Neutral", slug: "neutral", cls: "neutral" },
];

export const TYPES = ["Guardian", "Summon", "Spell", "Trap", "Item", "Worker", "Building", "Terrain", "Event", "Treasure"];
export const RARITIES = ["Common", "Uncommon", "Rare", "Special Rare"];

export const keywordSlug = (k: string) => k.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Keyword -> number of cards that carry it.
export const keywordCounts = (() => {
  const m = new Map<string, number>();
  for (const c of cards) for (const k of c.keywords) m.set(k, (m.get(k) || 0) + 1);
  return m;
})();

export const cardsWithKeyword = (k: string) => cards.filter((c) => c.keywords.includes(k) && !c.token);

export const isStat = (v: number | null) => v !== null && v !== undefined;
