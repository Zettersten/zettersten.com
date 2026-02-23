#!/usr/bin/env python3
"""
Generate branded 1200x630 OG/share images for blog posts.

- Reads blog post frontmatter from src/content/blog/*.mdx
- Uses `sourceImage` as the source when present, otherwise falls back to `coverImage`
- Writes branded OG images to public/images/blog/og/<slug>-og.jpg
- Updates frontmatter so:
    - sourceImage points at the original local hero image
    - coverImage points at the generated OG image

Design goals:
- Keep source image intact
- Create consistent, branded social previews
- Deterministic output for static builds / GitHub Pages
"""

from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path
from typing import Dict, Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src/content/blog"
PUBLIC_DIR = ROOT / "public"
OG_DIR = PUBLIC_DIR / "images/blog/og"
MANIFEST = ROOT / ".og-image-manifest.json"

CANVAS_W = 1200
CANVAS_H = 630
SAFE_PAD = 44
BRAND_ORANGE = (199, 99, 44)
BRAND_BG = (235, 235, 235)
TEXT_DARK = (20, 20, 20)
TEXT_MUTED = (70, 70, 70)
RENDER_VERSION = "v2"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def parse_frontmatter(doc: str) -> Tuple[str, Dict[str, str], str]:
    m = re.match(r"^---\n(.*?)\n---\n", doc, flags=re.S)
    if not m:
        raise ValueError("Missing frontmatter block")

    raw = m.group(1)
    body = doc[m.end() :]
    data: Dict[str, str] = {}
    for line in raw.splitlines():
        k = re.match(r"^([A-Za-z0-9_]+):\s*'(.*)'\s*$", line)
        if k:
            data[k.group(1)] = k.group(2)
    return raw, data, body


def set_or_replace_line(frontmatter: str, key: str, value: str) -> str:
    line = f"{key}: '{value}'"
    if re.search(rf"^{re.escape(key)}:\s*.*$", frontmatter, flags=re.M):
        return re.sub(rf"^{re.escape(key)}:\s*.*$", line, frontmatter, flags=re.M)

    lines = frontmatter.splitlines()
    insert_at = len(lines)
    for i, l in enumerate(lines):
        if l.startswith("draft:"):
            insert_at = i
            break
    lines.insert(insert_at, line)
    return "\n".join(lines)


def find_font(preferred: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        preferred,
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/SFNS.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for c in candidates:
        if c and os.path.exists(c):
            try:
                return ImageFont.truetype(c, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def fit_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, max_lines: int = 3) -> Tuple[str, ImageFont.ImageFont]:
    size = 58
    while size >= 30:
        font = find_font("/System/Library/Fonts/Supplemental/Arial Bold.ttf", size)
        words = text.split()
        lines = []
        current = []

        for w in words:
            test = " ".join(current + [w]).strip()
            w_box = draw.textbbox((0, 0), test, font=font)
            if (w_box[2] - w_box[0]) <= max_width:
                current.append(w)
            else:
                if current:
                    lines.append(" ".join(current))
                current = [w]

        if current:
            lines.append(" ".join(current))

        if len(lines) <= max_lines:
            return "\n".join(lines), font
        size -= 2

    return text[:90], find_font("", 30)


def create_og(source: Path, title: str, category: str, out_path: Path) -> None:
    base = Image.new("RGB", (CANVAS_W, CANVAS_H), BRAND_BG)

    with Image.open(source) as src:
        src = src.convert("RGB")

        # Full-bleed background with blur for depth
        bg = ImageOps.fit(src, (CANVAS_W, CANVAS_H), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        bg = bg.filter(ImageFilter.GaussianBlur(radius=10))
        bg = Image.blend(bg, Image.new("RGB", (CANVAS_W, CANVAS_H), (18, 18, 18)), alpha=0.42)
        base.paste(bg, (0, 0))

        # Framed image panel
        panel_x, panel_y, panel_w, panel_h = 44, 64, 520, 502
        panel = ImageOps.fit(src, (panel_w, panel_h), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

        frame = Image.new("RGB", (panel_w + 14, panel_h + 14), (244, 244, 244))
        shadow = Image.new("RGBA", (panel_w + 30, panel_h + 30), (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rounded_rectangle((8, 8, panel_w + 20, panel_h + 20), radius=18, fill=(0, 0, 0, 90))
        shadow = shadow.filter(ImageFilter.GaussianBlur(5))
        base.paste(shadow, (panel_x - 10, panel_y - 8), shadow)
        base.paste(frame, (panel_x - 7, panel_y - 7))
        base.paste(panel, (panel_x, panel_y))

    draw = ImageDraw.Draw(base)

    # Right-side text area
    text_x = 600
    title_width = CANVAS_W - text_x - SAFE_PAD - 28

    # Soft text backing plate (fixed, keeps category + title fully inside)
    plate = [text_x - 14, 150, CANVAS_W - SAFE_PAD, 526]
    draw.rounded_rectangle(plate, radius=22, fill=(245, 245, 245), outline=(230, 230, 230), width=1)

    # Brand label
    badge_font = find_font("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
    badge_text = "Erik Zettersten"
    bt = draw.textbbox((0, 0), badge_text, font=badge_font)
    bw, bh = bt[2] - bt[0], bt[3] - bt[1]
    badge_rect = (text_x, 92, text_x + bw + 30, 92 + bh + 16)
    draw.rounded_rectangle(badge_rect, radius=14, fill=BRAND_ORANGE)
    draw.text((text_x + 15, 100), badge_text, font=badge_font, fill=(255, 255, 255))

    # Category (inside the plate)
    cat_font = find_font("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
    cat_text = (category or "AI Strategy").upper()
    draw.text((text_x, 174), cat_text, font=cat_font, fill=TEXT_MUTED)

    # Title (inside the plate, below category)
    wrapped, title_font = fit_text(draw, title, title_width, max_lines=4)
    draw.multiline_text((text_x, 212), wrapped, font=title_font, fill=TEXT_DARK, spacing=8)

    # Footer accent rule
    draw.rounded_rectangle((text_x, 560, CANVAS_W - SAFE_PAD, 568), radius=4, fill=BRAND_ORANGE)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    base.save(out_path, format="JPEG", quality=90, optimize=True)


def main() -> int:
    OG_DIR.mkdir(parents=True, exist_ok=True)

    manifest = {}
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text())
        except Exception:
            manifest = {}

    touched = 0
    generated = 0

    for post_path in sorted(BLOG_DIR.glob("*.mdx")):
        raw_doc = post_path.read_text(encoding="utf-8")
        frontmatter, meta, body = parse_frontmatter(raw_doc)

        title = meta.get("title", post_path.stem.replace("-", " ").title())
        category = meta.get("category", "AI")

        source_rel = meta.get("sourceImage") or meta.get("coverImage")
        if not source_rel or source_rel.startswith("http"):
            # Skip remote-only sources; this pipeline expects local files
            continue

        source_abs = PUBLIC_DIR / source_rel.lstrip("/")
        if not source_abs.exists():
            continue

        og_rel = f"/images/blog/og/{post_path.stem}-og.jpg"
        og_abs = PUBLIC_DIR / og_rel.lstrip("/")

        key = f"{RENDER_VERSION}:{post_path.name}:{source_rel}:{title}:{category}"
        sig = hashlib.sha256((key + sha256_file(source_abs)).encode("utf-8")).hexdigest()

        if manifest.get(post_path.name) != sig or not og_abs.exists():
            create_og(source_abs, title, category, og_abs)
            generated += 1

        new_frontmatter = frontmatter
        new_frontmatter = set_or_replace_line(new_frontmatter, "sourceImage", source_rel)
        new_frontmatter = set_or_replace_line(new_frontmatter, "coverImage", og_rel)

        new_doc = f"---\n{new_frontmatter}\n---\n{body}"
        if new_doc != raw_doc:
            post_path.write_text(new_doc, encoding="utf-8")
            touched += 1

        manifest[post_path.name] = sig

    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"OG images generated: {generated}; posts updated: {touched}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
