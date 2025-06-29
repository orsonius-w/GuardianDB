export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("de-DE", {
    timeZone: "Europe/Berlin",
  });
}
import fs from "node:fs";
import path from "node:path";

const galleryDir = path.resolve("./public/images/gallery");

export function getGalleryImages() {
  return fs
    .readdirSync(galleryDir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .map((file) => ({
      src: `/images/gallery/${file}`,
      alt: "Kundenfrisur",
    }));
}

export function parseCost(costString) {
  return costString.replace(/\[([^\]]+)\]/g, (_, symbol) => {
    const src = `/icons/${symbol}.png`;
    const alt = symbol;
    return `<img src="${src}" alt="${alt}" class="cost-icon" />`;
  });
}
