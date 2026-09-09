#!/usr/bin/env python3
"""Turn a photo into a site-ready avatar.

Google Drive links can't be used directly on the site (see README), so photos
get copied into the repo instead. This does the boring part: square crop from
the centre, resize to 320x320, strip EXIF, and save as an optimised JPEG.

    python tools/add_photo.py ~/Downloads/some-photo.jpg "Jane Doe"

writes img/people/jane-doe.jpg and prints the line to paste into the data file.

Requires Pillow:  pip install Pillow
"""

import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install Pillow")

SIZE = 320
OUT_DIR = Path(__file__).resolve().parent.parent / "img" / "people"


def slugify(name):
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "member"


def main():
    if len(sys.argv) < 3:
        sys.exit("Usage: python tools/add_photo.py <image-file> <person's name>")

    src = Path(sys.argv[1]).expanduser()
    name = " ".join(sys.argv[2:])

    if not src.is_file():
        sys.exit("No such file: %s" % src)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / (slugify(name) + ".jpg")

    with Image.open(src) as im:
        # Phone photos carry an orientation flag; without this, some come out
        # rotated 90 degrees.
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        # Centre crop to a square, then resize. ImageOps.fit does both, and
        # picks a decent resampling filter.
        im = ImageOps.fit(im, (SIZE, SIZE), method=Image.LANCZOS, centering=(0.5, 0.4))
        # centering favours slightly above middle, which is where faces are.
        im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)

    kb = dest.stat().st_size / 1024
    rel = "img/people/" + dest.name
    print("Saved %s  (%.0f KB, %dx%d)" % (rel, kb, SIZE, SIZE))
    print()
    print("Add this to the member's entry:")
    print('    photo: "%s",' % rel)


if __name__ == "__main__":
    main()
