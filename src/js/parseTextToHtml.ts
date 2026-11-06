// Turns raw card text into HTML: [icons], keyword highlighting and keyword links.
import { keywordCounts, keywordSlug } from "../lib/cards";
import { glossaryFor } from "../lib/keywords";

// Colour classes from the original site (see .keyword.* in style.css).
const keywordClass: Record<string, string> = {
  Manifest: "manifest", Agility: "agility", Assault: "assault", Demise: "demise",
  Perpetual: "perpetual", Onslaught: "onslaught", Resonance: "resonance", Dominate: "dominate",
  Ward: "ward", Infiltrate: "infiltrate", "Deep Infiltration": "infiltrate", Retreat: "movement",
  "Pick up": "trap", Avert: "trap", Jinxed: "trap", Boggled: "trap",
  Sacrifice: "shrine", Blessing: "shrine",
  Solidarity: "unique", "Full Potential": "unique", Cache: "unique", Defile: "unique",
  Ignite: "unique", Preordain: "unique", Ascend: "unique", "Lay Off": "unique",
  Discharge: "unique", Delay: "unique",
};
const classFor = (k: string) => keywordClass[k] || "skill";

const ELEMENT_ICON: Record<string, string> = {
  dark: "Dark", darkness: "Dark", light: "light", fire: "fire", water: "water", earth: "earth",
  wind: "wind", lightning: "lightning", ice: "ice", nature: "nature",
};

export function iconHTML(token: string): string {
  const t = token.trim();
  const img = (file: string, alt: string) => `<img src="/images/icons/${file}.png" alt="${alt}" class="icon" />`;
  if (/^(\d|X|A)$/i.test(t)) return img(t.toUpperCase() === "A" ? "A" : t.toUpperCase() === "X" ? "X" : t, t);
  if (/^\d{2,}$/.test(t)) return `<span class="icon-chip">${t}</span>`;
  const el = ELEMENT_ICON[t.toLowerCase()];
  if (el) return img(el, t);
  const m = t.match(/^(\d+)\s+(\w+)$/);
  if (m && ELEMENT_ICON[m[2].toLowerCase()]) {
    const n = Math.min(Number(m[1]), 9);
    return Array.from({ length: n }, () => img(ELEMENT_ICON[m[2].toLowerCase()], m[2])).join("");
  }
  return `<span class="icon-chip">${t}</span>`; // [Turn], [Summon Spell], [1 Mana] ...
}

export function costHTML(pips: { n: string; el: string }[]): string {
  return pips.map((p) => (p.el === "neutral" ? iconHTML(p.n) : iconHTML(`${p.n} ${p.el}`))).join("");
}

const escapeHTML = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Longest names first so "Deep Infiltration" wins over "Infiltrate".
const KEYWORDS = [...keywordCounts.keys()].filter((k) => /^[A-Z][\w' -]+$/.test(k)).sort((a, b) => b.length - a.length);
const kwRegex = KEYWORDS.length
  ? new RegExp(`(^|[\\s(,.;:])(${KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?=$|[\\s),.;:-])`, "g")
  : null;

export function parseTextToHTML(text: string, withLinks = true): string {
  if (!text) return "";
  let html = escapeHTML(text);
  if (kwRegex) {
    html = html.replace(kwRegex, (_, pre: string, kw: string) => {
      const span = `<span class="keyword ${classFor(kw)}">${kw}</span>`;
      const entry = glossaryFor(kw);
      const tip = entry ? ` data-tip="${escapeHTML(entry.short).replace(/"/g, "&quot;")}"` : "";
      return pre + (withLinks ? `<a class="keyword-link" href="/wiki/keywords/${keywordSlug(entry?.name ?? kw)}/"${tip}>${span}</a>` : span);
    });
  }
  // legacy {Keyword N} markup from the old database
  html = html.replace(/\{([\w\s'-]+?)(?:\s+(\d+))?\}/g, (_, k: string, n: string) =>
    `<span class="keyword ${classFor(k.trim())}">${k.trim()}${n ? " " + n : ""}</span>`);
  html = html.replace(/\[([^\]]+)\]/g, (_, t: string) => iconHTML(t));
  return html.replace(/\n/g, "<br>");
}
