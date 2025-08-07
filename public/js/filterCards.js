// public/js/filterCards.js

function updateCardCount() {
    const cards = document.querySelectorAll(".card-link");
    const visibleCount = Array.from(cards).filter(
        (card) => card.style.display !== "none"
    ).length;

    const countElement = document.getElementById("card-count");
    if (countElement) {
        countElement.textContent = `${visibleCount} card${visibleCount === 1 ? '' : 's'} shown`;
    }
}

function normalizeType(type) {
    return type
        .split(",")
        .map((t) => t.trim().toLowerCase());
}

function matchesFilter(cardType, selected) {
    if (selected === "All") return true;

    const normalized = normalizeType(cardType);
    const selectedLower = selected.toLowerCase();

    if (["treasure", "alchemy"].includes(selectedLower)) {
        return normalized.some((t) => t.includes(selectedLower));
    }

    return normalized.includes(selectedLower);
}

function initCardTypeFilter() {
    const filterForm = document.getElementById("card-filter-form");
    const select = document.getElementById("card-type");
    const cards = Array.from(document.querySelectorAll(".card-link"));

    if (!filterForm || !select || cards.length === 0) return;

    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selected = select.value;

        cards.forEach((card) => {
            const cardType = card.getAttribute("data-type") || "";
            const show = matchesFilter(cardType, selected);
            card.style.display = show ? "block" : "none";
        });

        updateCardCount();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    initCardTypeFilter();
    updateCardCount();
});

/* sorter */

function getRarityValue(rarity) {
    const order = {
        special: 4,
        rare: 3,
        uncommon: 2,
        common: 1,
    };
    return order[rarity] || 0;
}

function sortCards(cards, key, isAsc) {
    return cards.slice().sort((a, b) => {
        let aVal = a.dataset[key] || "";
        let bVal = b.dataset[key] || "";

        if (key === "name" || key === "type") {
            return isAsc
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (key === "rarity") {
            aVal = getRarityValue(aVal);
            bVal = getRarityValue(bVal);
        } else {
            aVal = parseInt(aVal) || 0;
            bVal = parseInt(bVal) || 0;
        }

        return isAsc ? aVal - bVal : bVal - aVal;
    });
}

function renderCards(cards, container) {
    container.innerHTML = "";
    cards.forEach((card) => container.appendChild(card));
}

function updateSort() {
    const sortKey = document.getElementById("sort-key").value;
    const directionBtn = document.getElementById("sort-direction");
    const isAsc = directionBtn.dataset.direction === "asc";

    const allCards = Array.from(document.querySelectorAll(".card-link"));
    const container = allCards[0]?.parentNode;
    if (!container) return;

    const sorted = sortCards(allCards, sortKey, isAsc);
    renderCards(sorted, container);
    updateCardCount();
}

function toggleDirection() {
    const directionBtn = document.getElementById("sort-direction");
    const iconAsc = document.getElementById("icon-asc");
    const iconDesc = document.getElementById("icon-desc");

    const current = directionBtn.dataset.direction;
    const next = current === "asc" ? "desc" : "asc";
    directionBtn.dataset.direction = next;

    if (iconAsc && iconDesc) {
        if (next === "asc") {
            iconAsc.style.display = "inline";
            iconDesc.style.display = "none";
        } else {
            iconAsc.style.display = "none";
            iconDesc.style.display = "inline";
        }
    }

    updateSort();
}

function initSortOnly() {
    const sortKey = document.getElementById("sort-key");
    const directionBtn = document.getElementById("sort-direction");

    if (sortKey) sortKey.addEventListener("change", updateSort);
    if (directionBtn) directionBtn.addEventListener("click", toggleDirection);

    updateSort(); // Initial sort
}

window.addEventListener("DOMContentLoaded", () => {
    initSortOnly();
    updateCardCount();
});

