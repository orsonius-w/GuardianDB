// public/js/filterCards.js

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
    });
}

window.addEventListener("DOMContentLoaded", initCardTypeFilter);
