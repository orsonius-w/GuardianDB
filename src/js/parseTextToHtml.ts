export function parseTextToHTML(text: string): string {
  if (!text) return "";

  // Replace [element] with <img> tags
  const withIcons = text.replace(/\[(\w+)\]/g, (_, element) => {
    const lower = element.toLowerCase();
    const alt = element.charAt(0).toUpperCase() + element.slice(1);
    return `<img src="/images/icons/${lower}.png" alt="${alt}" class="icon" />`;
  });

  return withIcons;
}
// Converts markdown + icons into HTML
