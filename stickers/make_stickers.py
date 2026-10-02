"""Generate three (CSS)² member stickers as outlined SVG + 300 dpi PNG."""
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import resvg_py

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

CARDINAL, CARDINAL_DEEP = "#8C1515", "#6D1010"
BUTTER, MINT, BLUSH, SKY = "#FFE6A3", "#C5E9D5", "#FBD3DA", "#CFE2F8"
PAGE, INK, WHITE = "#FFF9F3", "#2C2724", "#FFFFFF"

_fonts = {}
def font(name, **axes):
    key = (name, tuple(sorted(axes.items())))
    if key not in _fonts:
        f = TTFont(os.path.join(HERE, name))
        f = instantiateVariableFont(f, axes)
        _fonts[key] = f
    return _fonts[key]

def brico(w=700, opsz=96):
    return font("brico.ttf", wght=w, opsz=opsz, wdth=100)

def jakarta(w=700):
    return font("jakarta.ttf", wght=w)

def text_width(f, s, size, track=0.0):
    upm = f["head"].unitsPerEm
    cmap, hmtx = f.getBestCmap(), f["hmtx"]
    w = sum(hmtx[cmap[ord(c)]][0] for c in s) * size / upm
    return w + track * size * (len(s) - 1)

def text_path(f, s, x, y, size, anchor="start", track=0.0):
    """Outline a string; (x, y) is the baseline point."""
    upm = f["head"].unitsPerEm
    cmap, gs, hmtx = f.getBestCmap(), f.getGlyphSet(), f["hmtx"]
    w = text_width(f, s, size, track)
    x -= {"start": 0, "middle": w / 2, "end": w}[anchor]
    k = size / upm
    pen = SVGPathPen(gs)
    for c in s:
        g = cmap[ord(c)]
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x, y)))
        x += hmtx[g][0] * k + track * size
    return pen.getCommands()

def arc_text(f, s, cx, cy, r, size, start_deg, bottom=False, track=0.0):
    """Glyphs centred on an arc. start_deg = angle of the string's midpoint
    (0 = top, clockwise). bottom=True reads left-to-right along the bottom."""
    upm = f["head"].unitsPerEm
    cmap, gs, hmtx = f.getBestCmap(), f.getGlyphSet(), f["hmtx"]
    k = size / upm
    total = text_width(f, s, size, track)
    span = total / r  # radians
    a = math.radians(start_deg) + (span / 2 if bottom else -span / 2)
    out = []
    for c in s:
        g = cmap[ord(c)]
        adv = hmtx[g][0] * k
        mid = a + (-1 if bottom else 1) * (adv / 2) / r
        px, py = cx + r * math.sin(mid), cy - r * math.cos(mid)
        rot = mid + (math.pi if bottom else 0)
        cs, sn = math.cos(rot), math.sin(rot)
        # glyph-local: shift so glyph centre sits on the arc point
        pen = SVGPathPen(gs)
        ox = -adv / 2
        oy = size * 0.35 if bottom else 0  # bottom text: hang below the circle line
        m = (k * cs, k * sn, k * sn, -k * cs,
             px + cs * ox - sn * oy, py + sn * ox + cs * oy)
        gs[g].draw(TransformPen(pen, m))
        out.append(pen.getCommands())
        a += (-1 if bottom else 1) * (adv + track * size) / r
    return " ".join(out)

def mark(x, y, s, front_stroke):
    """The two overlapping rounded squares; s = scale (mark is 46x30)."""
    return (f'<g transform="translate({x} {y}) scale({s})">'
            f'<rect x="0" y="5" width="25" height="25" rx="8.5" fill="{BUTTER}"/>'
            f'<rect x="21" y="0" width="25" height="25" rx="8.5" fill="{CARDINAL}" '
            f'stroke="{front_stroke}" stroke-width="2.5"/></g>')

def wordmark(x, y, size, fill, anchor="start"):
    """(CSS)² with a raised small 2. Returns (svg, width)."""
    f = brico(800)
    w_main = text_width(f, "(CSS)", size, -0.02)
    w_sup = text_width(f, "2", size * 0.55)
    total = w_main + size * 0.04 + w_sup
    x0 = x - {"start": 0, "middle": total / 2, "end": total}[anchor]
    d = text_path(f, "(CSS)", x0, y, size, track=-0.02)
    d += text_path(f, "2", x0 + w_main + size * 0.04, y - size * 0.38, size * 0.55)
    return f'<path d="{d}" fill="{fill}"/>', total

def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w/300}in" '
            f'height="{h/300}in" viewBox="0 0 {w} {h}">{body}</svg>')

def save(name, s, w):
    with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as fh:
        fh.write(s)
    png = resvg_py.svg_to_bytes(svg_string=s, dpi=300)
    with open(os.path.join(OUT, name + ".png"), "wb") as fh:
        fh.write(bytes(png))

# ---------------------------------------------------------------------------
# 1. Logo — 3 x 2 in rounded rectangle, horizontal lockup + tagline.
W, H = 900, 600
body = f'<rect x="0" y="0" width="{W}" height="{H}" rx="120" fill="{WHITE}"/>'
body += f'<rect x="24" y="24" width="{W-48}" height="{H-48}" rx="100" fill="{PAGE}"/>'
wsize = 150
_, ww = wordmark(0, 0, wsize, INK)
mw = 46 * 4.4
gap = 40
x0 = (W - (mw + gap + ww)) / 2
body += mark(x0, 190, 4.4, PAGE)  # 202 x 132
wm, _ = wordmark(x0 + mw + gap, 322, wsize, INK)
body += wm
f = jakarta(700)
body += (f'<path d="{text_path(f, "COMPUTATIONAL SOCIAL SCIENCE", W/2, 420, 30, "middle", track=0.14)}" '
         f'fill="{CARDINAL}"/>')
body += (f'<path d="{text_path(f, "COMMUNITY SPACE AT STANFORD", W/2, 466, 30, "middle", track=0.14)}" '
         f'fill="{CARDINAL}"/>')
logo = svg(W, H, body)

# ---------------------------------------------------------------------------
# 2. Seal — 3 in circle, cardinal, text around the rim.
W = H = 900
cx = cy = 450
body = f'<circle cx="{cx}" cy="{cy}" r="450" fill="{WHITE}"/>'
body += f'<circle cx="{cx}" cy="{cy}" r="426" fill="{CARDINAL}"/>'
body += (f'<circle cx="{cx}" cy="{cy}" r="292" fill="none" stroke="{BUTTER}" '
         f'stroke-width="5" stroke-dasharray="2 16" stroke-linecap="round"/>')
f = jakarta(800)
body += (f'<path d="{arc_text(f, "COMPUTATIONAL SOCIAL SCIENCE", cx, cy, 335, 44, 0, track=0.08)}" '
         f'fill="{BUTTER}"/>')
body += (f'<path d="{arc_text(f, "COMMUNITY SPACE AT STANFORD", cx, cy, 349, 44, 180, bottom=True, track=0.08)}" '
         f'fill="{BUTTER}"/>')
# little dots between the two rim phrases
for ang in (90, 270):
    a = math.radians(ang)
    body += (f'<circle cx="{cx + 347*math.sin(a):.1f}" cy="{cy - 347*math.cos(a):.1f}" '
             f'r="9" fill="{BLUSH}"/>')
body += mark(cx - 115, 270, 5.0, PAGE)  # 230 x 150
wm, _ = wordmark(cx, 580, 118, PAGE, "middle")
body += wm
seal = svg(W, H, body)

# ---------------------------------------------------------------------------
# 3. Checklist — 3 x 3.4 in, "I have…" from the home page stickers.
W, H = 900, 1020
body = f'<rect x="0" y="0" width="{W}" height="{H}" rx="130" fill="{WHITE}"/>'
body += f'<rect x="24" y="24" width="{W-48}" height="{H-48}" rx="110" fill="{PAGE}"/>'
fb = brico(800)
body += f'<path d="{text_path(fb, "I have…", 100, 205, 120, track=-0.02)}" fill="{INK}"/>'
items = [("data", BUTTER, False, -2.5), ("methods", MINT, False, 2.0),
         ("a research question", BLUSH, False, -1.5), ("snacks", SKY, True, 2.5)]
fj = brico(650, 36)
y = 270
for label, col, ticked, rot in items:
    size = 54
    tw = text_width(fj, label, size)
    pw, ph = 120 + tw + 46, 116
    gx, gy = 96, y
    body += f'<g transform="rotate({rot} {gx + pw/2} {gy + ph/2})">'
    body += f'<rect x="{gx}" y="{gy}" width="{pw}" height="{ph}" rx="{ph/2}" fill="{col}"/>'
    bx, by = gx + 34, gy + ph / 2 - 28
    body += (f'<rect x="{bx}" y="{by}" width="56" height="56" rx="14" fill="{WHITE}" '
             f'stroke="{INK}" stroke-width="5"/>')
    if ticked:
        body += (f'<path d="M{bx+12} {by+29} L{bx+25} {by+42} L{bx+46} {by+12}" fill="none" '
                 f'stroke="{CARDINAL}" stroke-width="9" stroke-linecap="round" '
                 f'stroke-linejoin="round"/>')
    body += (f'<path d="{text_path(fj, label, bx + 84, gy + ph/2 + size*0.34, size)}" '
             f'fill="{INK}"/>')
    body += '</g>'
    y += 142
body += mark(100, 880, 2.6, PAGE)
wm, _ = wordmark(800, 935, 64, CARDINAL, "end")
body += wm
check = svg(W, H, body)

# ---------------------------------------------------------------------------
# 4. Name tag — 3.5 x 2.4 in, "HELLO my method is ____" for socials.
W, H = 1050, 720
body = f'<rect x="0" y="0" width="{W}" height="{H}" rx="90" fill="{WHITE}"/>'
body += f'<clipPath id="tag"><rect x="24" y="24" width="{W-48}" height="{H-48}" rx="70"/></clipPath>'
body += f'<g clip-path="url(#tag)"><rect x="0" y="0" width="{W}" height="{H}" fill="{PAGE}"/>'
body += f'<rect x="0" y="0" width="{W}" height="250" fill="{CARDINAL}"/>'
body += f'<rect x="0" y="{H-80}" width="{W}" height="80" fill="{CARDINAL}"/></g>'
fb = brico(800)
body += f'<path d="{text_path(fb, "HELLO", W/2, 158, 140, "middle", track=0.04)}" fill="{PAGE}"/>'
fj = jakarta(700)
body += (f'<path d="{text_path(fj, "my method is", W/2, 222, 44, "middle", track=0.02)}" '
         f'fill="{BUTTER}"/>')
# writing line
body += (f'<line x1="110" y1="530" x2="{W-110}" y2="530" stroke="{INK}" stroke-width="4" '
         f'stroke-dasharray="2 14" stroke-linecap="round" opacity="0.35"/>')
fs = jakarta(700)
tagline = "COMPUTATIONAL SOCIAL SCIENCE COMMUNITY SPACE AT STANFORD"
body += (f'<path d="{text_path(fs, tagline, W/2, 677, 20, "middle", track=0.1)}" fill="{BUTTER}"/>')
nametag = svg(W, H, body)

# ---------------------------------------------------------------------------
# 5. Findings — 3 in rounded square, a scatter plot with a suspiciously good fit.
import random
random.seed(7)
W = H = 900
body = f'<rect x="0" y="0" width="{W}" height="{H}" rx="120" fill="{WHITE}"/>'
body += f'<rect x="24" y="24" width="{W-48}" height="{H-48}" rx="100" fill="{PAGE}"/>'
fb = brico(800)
body += f'<path d="{text_path(fb, "r = 0.98", 130, 185, 110, track=-0.01)}" fill="{CARDINAL}"/>'
# axes
ox, oy, ax, ay = 150, 720, 770, 250   # origin and far ends
body += (f'<path d="M{ox} {ay} L{ox} {oy} L{ax} {oy}" fill="none" stroke="{INK}" '
         f'stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')
cols = [BUTTER, MINT, BLUSH, SKY]
pts = []
for i in range(22):
    t = (i + 0.5) / 22
    x = ox + 40 + t * (ax - ox - 70)
    y = oy - 40 - t * (oy - ay - 80) + random.uniform(-38, 38)
    pts.append((x, y, cols[i % 4]))
body += (f'<line x1="{ox+30}" y1="{oy-30}" x2="{ax-10}" y2="{ay+20}" stroke="{CARDINAL}" '
         f'stroke-width="9" stroke-linecap="round"/>')
for x, y, c in pts:
    body += (f'<circle cx="{x:.1f}" cy="{y:.1f}" r="19" fill="{c}" stroke="{INK}" '
             f'stroke-width="4"/>')
fj = jakarta(700)
body += (f'<path d="{text_path(fj, "SNACKS PROVIDED", (ox+ax)/2, 790, 34, "middle", track=0.12)}" '
         f'fill="{INK}"/>')
body += (f'<g transform="rotate(-90 95 {(oy+ay)/2})"><path d="'
         f'{text_path(fj, "COLLABORATIONS", 95, (oy+ay)/2 + 12, 34, "middle", track=0.12)}" '
         f'fill="{INK}"/></g>')
wm, _ = wordmark(770, 185, 56, INK, "end")
body += wm
findings = svg(W, H, body)

# ---------------------------------------------------------------------------
# 6. Stamp — 2.6 x 3.2 in perforated postage stamp, good in every school.
W, H = 780, 960
holes = ""
step = 52
for x in range(0, W + 1, step):
    holes += f'<circle cx="{x}" cy="0" r="17"/><circle cx="{x}" cy="{H}" r="17"/>'
for y in range(0, H + 1, step):
    holes += f'<circle cx="0" cy="{y}" r="17"/><circle cx="{W}" cy="{y}" r="17"/>'
body = (f'<mask id="perf"><rect width="{W}" height="{H}" fill="white"/>'
        f'<g fill="black">{holes}</g></mask>')
body += f'<rect width="{W}" height="{H}" fill="{WHITE}" mask="url(#perf)"/>'
ix, iy, iw, ih = 62, 62, W - 124, H - 124
body += f'<rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" rx="18" fill="{MINT}"/>'
body += (f'<rect x="{ix+22}" y="{iy+22}" width="{iw-44}" height="{ih-44}" rx="10" fill="none" '
         f'stroke="{CARDINAL}" stroke-width="4"/>')
wm, _ = wordmark(W/2, iy + 170, 92, CARDINAL, "middle")
body += wm
body += mark(W/2 - 150, 330, 6.5, MINT)  # 299 x 195
fj = jakarta(800)
body += (f'<path d="{text_path(fj, "VALID IN ALL", W/2, 660, 40, "middle", track=0.16)}" '
         f'fill="{CARDINAL}"/>')
body += (f'<path d="{text_path(fj, "SEVEN SCHOOLS", W/2, 712, 40, "middle", track=0.16)}" '
         f'fill="{CARDINAL}"/>')
fs = jakarta(700)
body += (f'<path d="{text_path(fs, "COMPUTATIONAL SOCIAL SCIENCE", W/2, 790, 21, "middle", track=0.12)}" '
         f'fill="{INK}"/>')
body += (f'<path d="{text_path(fs, "COMMUNITY SPACE AT STANFORD", W/2, 822, 21, "middle", track=0.12)}" '
         f'fill="{INK}"/>')
stamp = svg(W, H, body)

save("sticker-4-hello", nametag, W)
save("sticker-5-findings", findings, W)
save("sticker-6-stamp", stamp, W)
# ---------------------------------------------------------------------------
# 7. Methods stamp — the stamp, with a few method tags scattered round the
#    logo the way the Partiful cover and join flyer do it.
import base64
def emoji(name, x, y, size):
    raw = open(os.path.join(HERE, "emoji", name + "_color.svg"), "rb").read()
    uri = "data:image/svg+xml;base64," + base64.b64encode(raw).decode()
    return f'<image href="{uri}" x="{x:.1f}" y="{y:.1f}" width="{size}" height="{size}"/>'

def tag(label, icon, bg, cx, cy, rot, size=30):
    """Pill centred at (cx, cy) with an emoji, soft shadow, slight tilt."""
    f = jakarta(700)
    ph, pad, ic, gap = size * 2.1, size * 0.8, size * 1.15, size * 0.35
    pw = pad + ic + gap + text_width(f, label, size) + pad
    x, y = cx - pw / 2, cy - ph / 2
    out = f'<g transform="rotate({rot} {cx} {cy})">'
    out += (f'<rect x="{x:.1f}" y="{y + 6:.1f}" width="{pw:.1f}" height="{ph:.1f}" rx="{ph/2}" '
            f'fill="#8C5A3C" opacity="0.16" filter="url(#soft)"/>')
    out += f'<rect x="{x:.1f}" y="{y:.1f}" width="{pw:.1f}" height="{ph:.1f}" rx="{ph/2}" fill="{bg}"/>'
    out += emoji(icon, x + pad, cy - ic / 2, ic)
    out += (f'<path d="{text_path(f, label, x + pad + ic + gap, cy + size * 0.36, size)}" '
            f'fill="{INK}"/></g>')
    return out

W, H = 820, 1080
holes = ""
for x in range(0, W + 1, 52):
    holes += f'<circle cx="{x}" cy="0" r="17"/><circle cx="{x}" cy="{H}" r="17"/>'
for y in range(0, H + 1, 52):
    holes += f'<circle cx="0" cy="{y}" r="17"/><circle cx="{W}" cy="{y}" r="17"/>'
ix, iy, iw, ih = 62, 62, W - 124, H - 124
defs = (f'<defs><mask id="perf"><rect width="{W}" height="{H}" fill="white"/>'
        f'<g fill="black">{holes}</g></mask>'
        f'<filter id="soft" x="-20%" y="-50%" width="140%" height="200%">'
        f'<feGaussianBlur stdDeviation="9"/></filter>'
        f'<clipPath id="panel"><rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" rx="18"/></clipPath>')
# the flyer's soft pastel corner washes
washes = [("w1", BLUSH, ix, iy), ("w2", SKY, ix + iw, iy + ih * 0.4),
          ("w3", MINT, ix, iy + ih), ("w4", BUTTER, ix + iw, iy + ih)]
for wid, col, _, _ in washes:
    defs += (f'<radialGradient id="{wid}"><stop offset="0" stop-color="{col}" stop-opacity="0.85"/>'
             f'<stop offset="1" stop-color="{col}" stop-opacity="0"/></radialGradient>')
defs += '</defs>'
body = defs
body += f'<rect width="{W}" height="{H}" fill="{WHITE}" mask="url(#perf)"/>'
body += f'<g clip-path="url(#panel)"><rect x="{ix}" y="{iy}" width="{iw}" height="{ih}" fill="{PAGE}"/>'
for wid, _, wx, wy in washes:
    body += f'<circle cx="{wx}" cy="{wy}" r="380" fill="url(#{wid})"/>'
body += '</g>'
body += (f'<rect x="{ix+22}" y="{iy+22}" width="{iw-44}" height="{ih-44}" rx="10" fill="none" '
         f'stroke="{CARDINAL}" stroke-width="4"/>')
# centre: mark over wordmark
body += mark(W/2 - 92, 372, 4.0, PAGE)  # 184 x 120
wm, _ = wordmark(W/2, 600, 92, INK, "middle")
body += wm
# the methods members listed, scattered round the logo
ts = 26
body += tag("NLP & LLMs", "brain", MINT, 240, 168, -6, ts)
body += tag("Networks", "spider_web", SKY, 580, 196, 5, ts)
body += tag("Images & video", "framed_picture", "#FFD9C2", 330, 292, 3, ts)
body += tag("Experiments", "test_tube", BLUSH, 565, 700, -4, ts)
body += tag("Agent-based models", "robot", BUTTER, 300, 792, 3, ts)
body += tag("Data science & stats", "bar_chart", "#E1D8F7", 500, 882, -3, ts)
fs = jakarta(700)
body += (f'<path d="{text_path(fs, "COMPUTATIONAL SOCIAL SCIENCE", W/2, 950, 20, "middle", track=0.12)}" '
         f'fill="{CARDINAL}"/>')
body += (f'<path d="{text_path(fs, "COMMUNITY SPACE AT STANFORD", W/2, 980, 20, "middle", track=0.12)}" '
         f'fill="{CARDINAL}"/>')
save("sticker-7-stamp-methods", svg(W, H, body), W)

save("sticker-1-logo", logo, 900)
save("sticker-2-seal", seal, 900)
save("sticker-3-i-have", check, 900)
print("done")
