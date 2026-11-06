// scripts/sync-cards.mjs
// Pulls card data and card images from the Guardian game repo into the website.
//
//   npm run sync                      (uses the default game repo path below)
//   GUARDIAN_REPO="D:/somewhere" npm run sync
//
// Reads (never writes):  <repo>/docs/card_database.csv
//                        <repo>/assets/images/cards/<folder>/<id>.png
//                        <repo>/engine/card/card_art.gd   (art filename overrides)
//                        <repo>/engine/version.gd, <repo>/docs/changelog.md (game client info)
// Writes:                src/data/cards.json
//                        src/data/client.json  (current version + latest patch notes)
//                        public/cards/<folder>/<slug>.webp  (only when the PNG changed)

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REPO = process.env.GUARDIAN_REPO || "C:/Users/otan/Documents/guardian-cg";
const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT_JSON = path.join(SITE, "src/data/cards.json");
const OUT_IMG = path.join(SITE, "public/cards");
const IMG_BOX = { width: 500, height: 709 }; // portrait cards: 500px wide, landscape (Terrain/Event): 709px wide

// Which CSV statuses are shown publicly. dungeon / created stay off the site.
const PUBLIC_STATUS = new Set(["pool", "starter", "guardian"]);

// ---------- CSV ----------
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.length > 1);
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

// ---------- normalising ----------
const ELEMENT_NAME = { Dark: "Darkness" };
const elementName = (e) => ELEMENT_NAME[e] || e;
const folderFor = (e) => (e ? elementName(e).toLowerCase() : "neutral");
const title = (s) => (s ? s.charAt(0) + s.slice(1).toLowerCase() : "");
const num = (v) => (v === "" || v == null ? null : Number(v));
const split = (v, sep = /[;,/]/) => (v ? v.split(sep).map((s) => s.trim()).filter(Boolean) : []);

const RARITY = { COMMON: "Common", UNCOMMON: "Uncommon", RARE: "Rare", SUPER_RARE: "Special Rare" };

function combatName(raw) {
  if (!raw) return "";
  const m = raw.match(/^(Close|Magic|Ranged|Bi|Dual)(?:\s+R)?\s*([\d-]+)?$/i);
  if (m) return `${title(m[1])} Combat${m[2] ? " R" + m[2] : ""}`;
  return title(raw); // PHYSICAL / MAGICAL / DUAL (Guardians), Peaceful
}

// "2 Neutral; 1 Light" -> [{n:2, el:"neutral"}, {n:1, el:"light"}]
function parseCost(raw) {
  if (!raw) return [];
  return raw.split(";").map((p) => p.trim()).filter(Boolean).map((p) => {
    const m = p.match(/^(\w+)\s+(\w+)$/);
    if (!m) return { n: p, el: "neutral" };
    return { n: m[1], el: m[2].toLowerCase() === "dark" ? "darkness" : m[2].toLowerCase() };
  });
}
const costTotal = (pips) => pips.reduce((t, p) => t + (Number(p.n) || 0), 0);

function cleanText(t) {
  return (t || "")
    .replace(/\bGabl:\s*/g, "Guardian Ability: ")
    .replace(/\bAbl:\s*/g, "Ability: ")
    .replace(/\s*\|\|\s*/g, "\n")
    .trim();
}

function typeLine(r, type) {
  const parts = [];
  const sub = [];
  if (r.spell_subtype) sub.push(title(r.spell_subtype));
  if (r.trap_subtype) sub.push(title(r.trap_subtype));
  if (r.is_permanent_trap === "yes") sub.push("Permanent");
  if (r.is_multi === "yes") sub.push("Multi");
  if (r.item_subtype && !split(r.subtypes).some((s) => s.toUpperCase() === r.item_subtype)) sub.push(title(r.item_subtype));
  sub.push(...split(r.subtypes));
  const t = r.treasure === "yes" && type !== "Treasure" ? `Treasure ${type}` : type;
  parts.push(t);
  if (sub.length) parts.push(sub.join(", "));
  return parts.join(" - ");
}

const slugify = (id) => id.toLowerCase().replace(/_/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");

// ---------- art lookup (mirrors engine/card/card_art.gd) ----------
function readOverrides() {
  const file = path.join(REPO, "engine/card/card_art.gd");
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, "utf8").split("const BOARD_OVERRIDE")[0];
  return Object.fromEntries([...src.matchAll(/^\s*"([^"]+)":\s*"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
}

function buildArtIndex() {
  const base = path.join(REPO, "assets/images/cards");
  const idx = new Map(); // filename (no ext) -> [folder,...]
  for (const d of fs.readdirSync(base, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(base, d.name))) {
      if (!f.endsWith(".png")) continue;
      const k = f.slice(0, -4);
      if (!idx.has(k)) idx.set(k, []);
      idx.get(k).push(d.name);
    }
  }
  return { base, idx };
}

function findArt(card, art, overrides, preferFolder) {
  for (const name of [card.id, overrides[card.id]].filter(Boolean)) {
    const folders = art.idx.get(name);
    if (!folders) continue;
    const folder = folders.includes(preferFolder) ? preferFolder : folders[0];
    return path.join(art.base, folder, name + ".png");
  }
  return null;
}

// ---------- main ----------
async function main() {
  const csvPath = path.join(REPO, "docs/card_database.csv");
  if (!fs.existsSync(csvPath)) {
    console.error(`Card database not found at ${csvPath}\nSet GUARDIAN_REPO to your guardian-cg folder.`);
    process.exit(1);
  }
  const rows = parseCSV(fs.readFileSync(csvPath, "utf8"));
  const overrides = readOverrides();
  const art = buildArtIndex();

  const cards = [];
  const missingArt = [];
  const jobs = [];
  const seen = new Set();

  for (const r of rows) {
    if (!PUBLIC_STATUS.has(r.status)) continue;
    if (seen.has(r.id)) continue;
    seen.add(r.id);

    const type = title(r.card_type);
    const elements = split(r.elements, "/").map(elementName);
    const folder = folderFor(split(r.elements, "/")[0]);
    const slug = slugify(r.id);
    const cost = parseCost(r.cost);
    const card = {
      id: r.id,
      slug,
      name: r.name,
      type,
      typeLine: typeLine(r, type),
      treasure: r.treasure === "yes" || r.card_type === "TREASURE",
      token: r.group === "Token",
      status: r.status,
      group: elementName(r.group),
      elements: elements.length ? elements : ["Neutral"],
      subtypes: split(r.subtypes),
      cost,
      costTotal: costTotal(cost),
      rarity: RARITY[r.rarity] || "",
      limit: r.unlimited === "yes" ? "Unlimited" : num(r.max_copies),
      life: num(r.life), mana: num(r.mana),
      attack: num(r.attack), defense: num(r.defense),
      magic: num(r.magic), resistance: num(r.resistance),
      movement: num(r.movement),
      combat: combatName(r.combat_type),
      keywords: [...new Set(split(r.keywords))],
      text: cleanText(r.ability_text),
      summonSpells: cleanText(r.summon_spells),
      activationCost: parseCost(r.activation_cost),
      workerCost: num(r.worker_cost),
      level: num(r.level),
      duration: num(r.duration),
      image: null,
    };

    const src = findArt(r, art, overrides, folder);
    if (src) {
      card.image = `/cards/${folder}/${slug}.webp`;
      jobs.push({ src, dest: path.join(OUT_IMG, folder, slug + ".webp"), card });
    } else missingArt.push(`${r.id} (${r.status})`);
    cards.push(card);
  }

  cards.sort((a, b) => a.name.localeCompare(b.name));

  // image size (needed so the gallery can reserve space and show landscape cards correctly)
  await Promise.all(jobs.map(async (j) => {
    const m = await sharp(j.src).metadata();
    j.box = m.width > m.height ? { width: IMG_BOX.height, height: IMG_BOX.width } : IMG_BOX;
    const scale = Math.min(j.box.width / m.width, j.box.height / m.height);
    j.card.imageWidth = Math.round(m.width * scale);
    j.card.imageHeight = Math.round(m.height * scale);
  }));

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(cards, null, 1));
  console.log(`cards.json: ${cards.length} cards`);

  // images: only (re)encode when the source PNG is newer than the webp
  let done = 0, skipped = 0;
  const queue = [...jobs];
  async function worker() {
    while (queue.length) {
      const { src, dest, box } = queue.shift();
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) { skipped++; continue; }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(src).resize({ ...box, fit: "inside" }).webp({ quality: 80 }).toFile(dest);
      if (++done % 100 === 0) console.log(`  ${done} images encoded...`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`images: ${done} encoded, ${skipped} unchanged`);

  // remove webps for cards that left the site
  const keep = new Set(jobs.map((j) => path.resolve(j.dest)));
  let removed = 0;
  if (fs.existsSync(OUT_IMG)) for (const d of fs.readdirSync(OUT_IMG)) {
    for (const f of fs.readdirSync(path.join(OUT_IMG, d))) {
      const p = path.resolve(OUT_IMG, d, f);
      if (!keep.has(p)) { fs.unlinkSync(p); removed++; }
    }
  }
  if (removed) console.log(`images: ${removed} removed (card no longer on the site)`);
  if (missingArt.length) console.log(`no art found for ${missingArt.length} cards:\n  ${missingArt.join("\n  ")}`);
}

// ---------- game client: version + patch notes ----------
function syncClient() {
  const out = path.join(SITE, "src/data/client.json");
  const vfile = path.join(REPO, "engine/version.gd");
  const cfile = path.join(REPO, "docs/changelog.md");
  if (!fs.existsSync(vfile) || !fs.existsSync(cfile)) return console.log("client.json: skipped (version.gd or changelog.md not found)");
  const v = fs.readFileSync(vfile, "utf8");
  const c = (name) => (v.match(new RegExp(`const ${name}\\s*:=\\s*"?([^"\\n]*)"?`)) || [])[1]?.trim() ?? "";
  const version = `${c("CHANNEL")} ${c("MAJOR")}.${c("MINOR")}.${c("PATCH")}${c("LETTER")}`;
  const build = Number(c("BUILD"));

  // "## Build 920 — 2026-11-06 — 0.3.138d" followed by bullet points
  const notes = [];
  const parts = fs.readFileSync(cfile, "utf8").split(/^## /m).slice(1);
  for (const part of parts) {
    const [head, ...body] = part.split("\n");
    const m = head.match(/^Build\s+(\d+)\s*[—-]+\s*(\d{4}-\d{2}-\d{2})\s*[—-]+\s*(.+)$/);
    if (!m) continue;
    notes.push({ build: Number(m[1]), date: m[2], version: m[3].trim(), body: body.join("\n").trim() });
    if (notes.length >= 8) break;
  }
  fs.writeFileSync(out, JSON.stringify({ version, build, synced: new Date().toISOString().slice(0, 10), notes }, null, 1));
  console.log(`client.json: ${version} (build ${build}), ${notes.length} patch notes`);
}

main().then(syncClient);
