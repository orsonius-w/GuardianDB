// utils/parseTextToHtml.ts

const keywordGroups: Record<string, string | string[]> = {
  manifest: "Manifest -",
  skill: ["Flying", "Zealing", "Charge"],
  unique: ["Solidarity", "Full Potential"],
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

export function parseTextToHTML(text: string) {
  if (!text) return "";

  let parsed = text.replace(/\n/g, "<br>");

  parsed = parsed.replace(/\{([\w\s\-\']+)\}/g, (match, keywordRaw) => {
    const keyword = keywordRaw.trim();
    const category = keywordCategories[keyword];

    if (category) {
      return `<span class="keyword ${category}">${keyword}</span>`;
    } else {
      const fallbackClass = keyword.toLowerCase().replace(/\s+/g, "-");
      return `<span class="keyword ${fallbackClass}">${keyword}</span>`;
    }
  });

  return parsed;
}
