const cardTypes = [
  "All",
  "Guardian",
  "Summon",
  "Spell",
  "Trap",
  "Item",
  "Treasure",
  "Terrain",
  "Building",
  "Event",
  "Alchemy",
];

// Normalize a string like "Treasure Summon, Spell" to ["treasure summon", "spell"]
function normalizeType(type: string): string[] {
  return type.split(",").map((t) => t.trim().toLowerCase());
}

function matchesFilter(cardType: string, selected: string): boolean {
  if (selected === "All") return true;

  const normalized = normalizeType(cardType);
  const selectedLower = selected.toLowerCase();

  // Match partials for Treasure and Alchemy
  if (["treasure", "alchemy"].includes(selectedLower)) {
    return normalized.some((t) => t.includes(selectedLower));
  }

  return normalized.includes(selectedLower);
}

export function initCardTypeFilter() {
  const filterForm = document.getElementById("card-filter-form");
  const select = document.getElementById("card-type") as HTMLSelectElement;
  const cards = Array.from(
    document.querySelectorAll(".card-link")
  ) as HTMLElement[];

  if (!filterForm || !select || cards.length === 0) return;

  select.addEventListener("change", () => {
    const selected = select.value;

    cards.forEach((card) => {
      const cardType = card.getAttribute("data-type") || "";
      const show = matchesFilter(cardType, selected);
      card.style.display = show ? "block" : "none";
    });
  });
}
