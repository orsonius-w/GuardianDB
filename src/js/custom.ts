// utils/parseCostToIcons.ts
export function parseCostToIcons(cost: string) {
  const matches = [...cost.matchAll(/\[(\w+)\]/g)];

  return matches.map((match, index) => {
    const element = match[1].toLowerCase();
    return {
      src: `/images/icons/${element}.png`, // assuming /public/icons/earth.png etc.
      alt: element.charAt(0).toUpperCase() + element.slice(1),
      key: `${element}-${index}`,
    };
  });
}

export function parseRichText(text: string): string {
  const withIcons = parseCostToIcons(text);
  return marked(withIcons); // Converts markdown + icons into HTML
}
