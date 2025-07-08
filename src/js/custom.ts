// utils/parseCostToIcons.ts
export function parseCostToIcons(cost: string) {
  const matches = [...cost.matchAll(/\[(\w+)\]/g)];

  return matches.map((match, index) => {
    const element = match[1].toLowerCase();
    return {
      src: `/icons/${element}.png`, // assuming /public/icons/earth.png etc.
      alt: element.charAt(0).toUpperCase() + element.slice(1),
      key: `${element}-${index}`,
    };
  });
}
