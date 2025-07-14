// utils/parseTextToHtml.ts

const keywordGroups: Record<string, string | string[]> = {
  manifest: "Manifest -",
  agility: "Agility -",
  assault: "Assault -",
  demise: "Demise -",
  perpetual: "Perpetual -",
  onslaught: "Onslaught -",
  resonance: "Resonance -",
  dominate: "Dominate -",
  infiltrate: ["Infiltrate -", "Deep Infiltration -"],
  movement: ["Retreat"],
  shrine: ["Sacrifice -", "Blessing -"],
  skill: [
    "Flying",
    "Zealing",
    "Gashing",
    "Guardprotect",
    "Goad",
    "Anticipate",
    "Devotion",
    "Venemous",
    "Battlelash",
  ],
  unique: [
    "Solidarity",
    "Full Potential",
    "Cache",
    "Defile",
    "Ignite",
    "Preordain",
    "Ascend",
    "Lay Off",
    "Discharge",
    "Delay",
  ],
};

const keywordCategories: Record<string, string> = {};

for (const [category, keywords] of Object.entries(keywordGroups)) {
  if (typeof keywords === "string") {
    keywordCategories[keywords] = category;
  } else {
    for (const keyword of keywords) {
      keywordCategories[keyword] = category;
    }
  }
}

// Optional: Helper to get class for a keyword
function getKeywordClass(keyword: string): string {
  const category = keywordCategories[keyword];
  if (category) return category;
  return keyword.toLowerCase().replace(/\s+/g, "-");
}

export function parseTextToHTML(text: string) {
  if (!text) return "";

  let parsed = text.replace(/\n/g, "<br>");

  parsed = parsed.replace(
    /\{([\w\s\-\']+?)(?:\s+(\d+))?\}/g,
    (_, keywordRaw: string, number: string) => {
      const keyword = keywordRaw.trim();
      const cssClass = getKeywordClass(keyword);
      return `<span class="keyword ${cssClass}">${keyword}${
        number ? " " + number : ""
      }</span>`;
    }
  );

  parsed = parsed.replace(/\[([^\]]+)\]/g, (_, icon: string) => {
    return `<img src="/images/icons/${icon}.png" alt="${icon}" class="icon" />`;
  });

  return parsed;
}
