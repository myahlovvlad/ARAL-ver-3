#!/usr/bin/env python3
"""Assemble the public R12 release from an explicit allowlist."""
import argparse
import hashlib
import html
import json
from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
HERO_DIR = "design/hero/prototypes/hero-4s-k-views"
HOME = f"{HERO_DIR}/ARAL_home_employer_feedback_r12_preview.html"
COMPANY = "index-employer-feedback-r12-preview.html"
SECTIONS = {
    "products-r15": "products",
    "drivers-08": "drivers",
    "partners-11": "partners",
    "advantages-04": "advantages",
    "contacts-03": "contacts",
}
ASSETS = (
    "aral-contour-preview.css",
    "aral-contour-targeted-plus20.css",
    "aral-contour-stream-home.svg",
    "aral-contour-stream-home-targeted20.svg",
    "aral-contour-stream-home-visible.svg",
    "aral-contour-stream-product.svg",
    "aral-contour-stream-product-targeted20.svg",
    "aral-contour-stream-product-visible.svg",
    "aral-employer-feedback-r12.css",
    "aral-employer-feedback-r12.js",
    "aral-footer-preview.css",
    "aral-footer-preview-r12.js",
    "aral-line-sidebar-preview.css",
    "aral-line-sidebar-preview.js",
    "aral-logo-header-r9.svg",
    "aral-markup-footer-links.js",
    "aral-pds-publication-r7.js",
    "aral-r12-design.css",
    "aral-purchase-r12.js",
    "contact-max-chat-r12.svg",
    "contact-vk-r12.svg",
    "contact-whatsapp-r12.svg",
    "favicon.svg",
    "fonts/nunito-r12.woff2",
    "fonts/OFL-Nunito.txt",
)
HERO_ASSETS = (
    "review.css",
    "review.js",
    "assets/barrel.svg",
    "assets/main-1l.svg",
    "assets/pack-20l.svg",
    "assets/pack-5l.svg",
    "assets/second-1l.svg",
    "assets/third-1l.svg",
    "assets/k-views/K_34_right.svg",
    "assets/k-views/K_front.svg",
    "assets/k-views/K_side.png",
)
HERO_PHOTOS = (
    "main-1l-original.png",
    "second-1l-original.png",
    "third-1l-original.png",
)
APPROVED_PDFS = {
    "assets/pds-r7/ARAL-008_2025-06-02_EN.pdf": "e36f4fd0d7a8c3d4a21bbc6888a538e3f66ed5a67f5d359881e5111e34315498",
    "assets/pds-r7/ARAL-016_2025-03-31_DE.pdf": "c3acf7c3ff785cba20f23f4289d81b0ff8163dc18e1febcaf54e7c6827141db3",
    "assets/pds-r12/ARAL-013_2025-03-25_DE.pdf": "09ca801a6782df9b75a1794e159c079917fa683d5126fe5d5e2dd74c0c6527e9",
}
MEDIA_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def section_page(section):
    return f"pages/{section}-employer-feedback-r12-preview.html"


def media_paths():
    for directory in ("media/editorial", "media/production"):
        for item in sorted((ROOT / directory).iterdir()):
            if item.is_file() and item.suffix.lower() in MEDIA_EXTENSIONS:
                yield item.relative_to(ROOT).as_posix()


def write_entry(path, default, old_home=False):
    link = html.escape(default, quote=True)
    fallback = json.dumps(default)
    redirect = (
        f'const target = ["#company", "#interesting"].includes(location.hash)'
        f" ? {json.dumps(COMPANY)} : {fallback};\n"
        f"location.replace(target + location.search + (target === {json.dumps(COMPANY)} ? location.hash : ''));"
        if old_home
        else f"location.replace({fallback} + location.search + location.hash);"
    )
    path.write_text(
        '<!doctype html>\n<html lang="ru"><meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>ARAL</title><script>{redirect}</script>\n'
        f'<a href="{link}">Открыть сайт ARAL</a></html>\n',
        encoding="utf-8",
    )


def build(output):
    sources = [
        HOME, COMPANY, "catalog.json",
        *(section_page(section) for section in SECTIONS.values()),
        *(f"assets/{asset}" for asset in ASSETS),
        *(f"{HERO_DIR}/{asset}" for asset in HERO_ASSETS),
        *(f"design/hero/ARAL_HERO_MOTION_01A1556A/sources/{photo}" for photo in HERO_PHOTOS),
        *APPROVED_PDFS,
        *media_paths(),
    ]
    for source in sources:
        if not (ROOT / source).is_file():
            raise FileNotFoundError(f"Missing release file: {source}")
    for source, expected in APPROVED_PDFS.items():
        if hashlib.sha256((ROOT / source).read_bytes()).hexdigest() != expected:
            raise ValueError(f"Unexpected approved PDF checksum: {source}")

    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        raise ValueError(f"Use an empty output directory: {output}")
    for source in sources:
        destination = output / source
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / source, destination)

    write_entry(output / "index.html", HOME, old_home=True)
    for legacy, section in SECTIONS.items():
        write_entry(output / f"pages/{legacy}.html", Path(section_page(section)).name)
    (output / ".nojekyll").touch()
    print(f"Built ARAL R12 in {output} ({len(sources)} source files, {len(APPROVED_PDFS)} approved PDFs)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "_site")
    args = parser.parse_args()
    build(args.output.resolve())
