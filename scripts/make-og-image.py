"""Builds public/images/og-default.jpg, the link-preview image (Discord, socials).
Run: python scripts/make-og-image.py   (needs Pillow; reads fonts from the game repo)"""
import json, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

REPO = os.environ.get("GUARDIAN_REPO", "C:/Users/otan/Documents/guardian-cg")
FONTS = os.path.join(REPO, "assets/fonts")
W, H = 1200, 630

bg = Image.open("public/images/hero/hero-1.webp").convert("RGB")
s = max(W / bg.width, H / bg.height)
bg = bg.resize((round(bg.width * s), round(bg.height * s)), Image.LANCZOS)
x0 = (bg.width - W) // 2; y0 = int((bg.height - H) * 0.3)
bg = bg.crop((x0, y0, x0 + W, y0 + H)).convert("RGBA")
dark = Image.new("RGBA", (W, H), (9, 11, 14, 255))
gh = Image.new("L", (W, 1)); [gh.putpixel((x, 0), int(240 * max(0, 1 - x / (W * 0.68)) ** 1.1)) for x in range(W)]
bg = Image.composite(dark, bg, gh.resize((W, H)))
gv = Image.new("L", (1, H)); [gv.putpixel((0, y), int(170 * max(0, (y - H * 0.6) / (H * 0.4)))) for y in range(H)]
bg = Image.composite(dark, bg, gv.resize((W, H)))

cards = {c["name"]: c for c in json.load(open("src/data/cards.json", encoding="utf-8"))}
fan = ["Elmyst, Gliding Presence", "Moryrak, the Enforcer", "Volthra, the Gathered Storm"]
cw = 205
for i in (0, 2, 1):
    c = cards[fan[i]]; ang = (12, 0, -12)[i]; dx = (-130, 0, 130)[i]; dy = (36, 0, 36)[i]
    im = Image.open("public" + c["image"]).convert("RGBA")
    im = im.resize((cw, round(im.height * cw / im.width)), Image.LANCZOS)
    m = Image.new("L", im.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), 11, fill=255); im.putalpha(m)
    sh = Image.new("RGBA", (im.width + 80, im.height + 80), (0, 0, 0, 0))
    sm = Image.new("L", sh.size, 0); sm.paste(m, (40, 52)); sh.putalpha(sm.filter(ImageFilter.GaussianBlur(18)).point(lambda v: int(v * 0.75)))
    sh.alpha_composite(im, (40, 40)); r = sh.rotate(ang, resample=Image.BICUBIC, expand=True)
    bg.alpha_composite(r, (930 + dx - r.width // 2, H // 2 + dy + 10 - r.height // 2))

logo = Image.open("public/images/brand/logo.webp").convert("RGBA"); lw = 470
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
glow = Image.new("RGBA", (logo.width + 60, logo.height + 60), (0, 0, 0, 0))
sm = Image.new("L", glow.size, 0); sm.paste(logo.split()[3], (30, 34)); glow.putalpha(sm.filter(ImageFilter.GaussianBlur(10)).point(lambda v: int(v * 0.8)))
bg.alpha_composite(glow, (40, 150)); bg.alpha_composite(logo, (70, 180))

d = ImageDraw.Draw(bg)
f1 = ImageFont.truetype(os.path.join(FONTS, "Fontin-SmallCaps.ttf"), 40)
f2 = ImageFont.truetype(os.path.join(FONTS, "Fontin-Regular.otf"), 26)
f3 = ImageFont.truetype(os.path.join(FONTS, "Fontin-Bold.otf"), 22)
y = 180 + logo.height + 22
d.text((74, y), "The tactical card game", font=f1, fill=(246, 226, 180))
d.text((74, y + 56), "Grid combat meets collectible cards.", font=f2, fill=(220, 224, 230))
d.text((74, y + 90), "Command a Guardian. Win the board.", font=f2, fill=(220, 224, 230))
t = "FREE ALPHA ON ITCH.IO"; pw = d.textbbox((0, 0), t, font=f3)[2] + 44; py = y + 150
d.rounded_rectangle((74, py, 74 + pw, py + 46), 6, fill=(242, 170, 40), outline=(255, 226, 150), width=2)
d.text((96, py + 11), t, font=f3, fill=(40, 22, 6))
bg.convert("RGB").save("public/images/og-default.jpg", "JPEG", quality=86, optimize=True)
print("wrote public/images/og-default.jpg")
