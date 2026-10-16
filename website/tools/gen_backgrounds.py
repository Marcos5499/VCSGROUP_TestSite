"""Generate the homepage background images for the VCS Group website.

Each image is an atmospheric, photo-like scene in the brand's blues, made in code
because no photo library could be reached from the build machine. They are ordinary
JPEGs in assets/img/, so any of them can be swapped for real photography later.

    python3 tools/gen_backgrounds.py            # all
    python3 tools/gen_backgrounds.py tourism    # one
"""
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2000, 1250
OUT = Path(__file__).resolve().parent.parent / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------- helpers
def hexc(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)], dtype=np.float32)


def noise(h, w, cell, rng):
    gh, gw = max(2, h // cell + 2), max(2, w // cell + 2)
    g = rng.random((gh, gw)).astype(np.float32)
    im = Image.fromarray(g, "F").resize((w + cell * 2, h + cell * 2), Image.BICUBIC)
    a = np.asarray(im)[cell:cell + h, cell:cell + w]
    return a


def fbm(h, w, cell, rng, octaves=5, gain=0.5):
    total, amp, norm = np.zeros((h, w), np.float32), 1.0, 0.0
    for o in range(octaves):
        c = max(2, int(cell / (2 ** o)))
        total += amp * noise(h, w, c, rng)
        norm += amp
        amp *= gain
    return total / norm


def _box(a, r, axis):
    if r < 1:
        return a
    pad = [(0, 0)] * a.ndim
    pad[axis] = (r + 1, r)
    c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis, dtype=np.float64)
    n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return ((hi - lo) / (2 * r + 1)).astype(np.float32)


def blur(a, r):
    """Gaussian-like blur: three box passes along each axis."""
    a = a.astype(np.float32)
    b = max(0, int(round(r * 0.8)))
    if b == 0:
        return a
    for _ in range(3):
        a = _box(_box(a, b, 0), b, 1)
    return a


def vgrad(top, bottom, h=H, w=W, curve=1.0):
    t = (np.linspace(0, 1, h, dtype=np.float32) ** curve)[:, None, None]
    return np.broadcast_to(top * (1 - t) + bottom * t, (h, w, 3)).copy()


def finish(img, name, grain=0.025, vignette=0.35, seed=0):
    rng = np.random.default_rng(seed + 999)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    img = img * (1 - vignette * np.clip(d - 0.35, 0, 1)[..., None] ** 1.5)
    img = img + (rng.standard_normal((H, W, 1)).astype(np.float32) * grain)
    img = np.clip(img, 0, 1)
    out = Image.fromarray((img * 255).astype(np.uint8), "RGB")
    path = OUT / f"{name}.jpg"
    out.save(path, quality=80, optimize=True, progressive=True)
    print(f"{path.name}  {path.stat().st_size // 1024} KB")


def mask_from_draw(fn, blur_r=0):
    m = Image.new("L", (W, H), 0)
    fn(ImageDraw.Draw(m))
    if blur_r:
        m = m.filter(ImageFilter.GaussianBlur(blur_r))
    return np.asarray(m, np.float32)[..., None] / 255


def ridge(rng, base, amp, cell, x0=0, x1=W):
    """A mountain silhouette profile: y for each x."""
    xs = np.arange(W)
    n = fbm(1, W, cell, rng, octaves=5)[0]
    prof = base - amp * n
    return xs, prof


# ---------------------------------------------------------------- scenes
def bumps(peaks, rng, detail=18, cell=60):
    """A skyline of rounded granite domes: y for each x (smaller y = higher)."""
    x = np.arange(W, dtype=np.float32)
    h = np.zeros(W, np.float32)
    for cx, height, width in peaks:
        h = np.maximum(h, height * np.exp(-((x - cx) / width) ** 2) ** 0.8)
    h += detail * (fbm(1, W, cell, rng, 4)[0] - 0.5) * (h > 4)
    return h


def seascape(name, seed, sun_x=0.70, warm=0.75):
    """Mahé at dusk: rounded granite peaks, a low sun, a path of light on the water."""
    rng = np.random.default_rng(seed)
    hz = int(H * 0.62)
    yy, xx = np.mgrid[0:hz, 0:W].astype(np.float32)
    sky = vgrad(hexc("#0A1430"), hexc("#46658F"), h=hz, curve=1.1)
    sx, sy = W * sun_x, hz - 70
    r = np.sqrt((xx - sx) ** 2 + ((yy - sy) * 1.8) ** 2)
    sky = sky + np.exp(-r / 520)[..., None] * hexc("#F0B488") * 0.75 * warm
    sky = sky + np.exp(-r / 160)[..., None] * hexc("#FFE2C2") * 0.5 * warm
    sky = sky + np.exp(-(r / 34) ** 4)[..., None] * 1.3
    c = fbm(hz, W, 420, rng, 6)
    band = np.exp(-((yy - hz * 0.42) / (hz * 0.22)) ** 2)
    c = np.clip((c - 0.5) * 3.0, 0, 1) * band
    lit = np.exp(-r / 650)[..., None]
    cloud_col = hexc("#22355E") * (1 - lit) + hexc("#E7AE86") * lit * warm
    sky = sky * (1 - 0.7 * c[..., None]) + cloud_col * 0.7 * c[..., None]

    sh = H - hz
    wy, wx = np.mgrid[0:sh, 0:W].astype(np.float32)
    sea = vgrad(hexc("#2A4A75"), hexc("#050B1C"), h=sh, curve=0.5)
    ripples = noise(sh, W, 4, rng)
    ripples = np.asarray(Image.fromarray(ripples, "F").resize((W // 6, sh), Image.BILINEAR).resize((W, sh), Image.BICUBIC))
    sea = sea * (0.88 + 0.24 * ripples[..., None])
    width = 40 + wy * 1.1
    path = np.exp(-((wx - sx) / width) ** 2)
    glints = np.clip((ripples - 0.55) * 5, 0, 1) * path * np.exp(-wy / (sh * 0.9))
    sea = sea + _box(glints[..., None], 1, 1) * hexc("#FFE6C8") * 1.3 * warm + path[..., None] * hexc("#E9AC7E") * 0.12 * warm
    img = np.concatenate([sky, sea], axis=0)

    ys = np.arange(H, dtype=np.float32)[:, None]
    ranges = [
        ([(W * 0.08, 300, 260), (W * 0.30, 360, 230), (W * 0.47, 250, 200)], "#3B5A86", 0.55),
        ([(W * 0.0, 210, 300), (W * 0.20, 260, 220), (W * 0.38, 180, 160), (W * 0.93, 120, 160)], "#20345C", 0.25),
        ([(W * 0.86, 70, 120), (W * 0.62, 34, 70)], "#0E1A38", 0.08),
    ]
    for i, (peaks, colr, haze) in enumerate(ranges):
        prof = hz - bumps(peaks, np.random.default_rng(seed * 7 + i))
        m = (ys >= prof[None, :]) & (ys <= hz + 1)
        top = hexc(colr)
        img[m] = top * (1 - haze) + img[m] * haze
        # rim of evening light on the near ranges
        if i == 1:
            rim = (ys >= prof[None, :]) & (ys <= prof[None, :] + 3)
            img[rim] = img[rim] + hexc("#E7AE86") * 0.25 * warm
    # granite boulders in the foreground, lit from the sun side
    def boulders(d):
        d.ellipse([-260, H - 330, 420, H + 260], fill=255)
        d.ellipse([300, H - 230, 700, H + 160], fill=255)
        d.ellipse([620, H - 120, 860, H + 100], fill=255)
        d.ellipse([W - 300, H - 140, W + 200, H + 220], fill=255)
    m = mask_from_draw(boulders, 2)
    shade = vgrad(hexc("#101A33"), hexc("#04070F"))
    lightside = mask_from_draw(lambda d: (d.ellipse([-120, H - 320, 440, H + 120], fill=255), d.ellipse([360, H - 225, 720, H + 60], fill=255)), 60)
    stone = shade + lightside * hexc("#C79A7E") * 0.22 * warm + fbm(H, W, 30, rng, 3)[..., None] * 0.05
    img = img * (1 - m) + stone * m
    finish(img, name, seed=seed)


def light_trails(name="automobile", seed=7):
    """Long-exposure headlights and tail-lights on a coastal road at night."""
    rng = np.random.default_rng(seed)
    img = vgrad(hexc("#0B1736"), hexc("#050914"), curve=1.2)
    # distant hill and street lamps
    xs, prof = ridge(rng, H * 0.42, 140, 700)
    ys = np.arange(H)[:, None]
    img[(ys >= prof[None, :])] *= 0.55
    trails = np.zeros((H, W, 3), np.float32)
    vp = (W * 0.86, H * 0.47)
    layer = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(layer)
    for k in range(46):
        side = rng.random()
        warm = side < 0.5
        y0 = H * (0.70 + 0.55 * rng.random()) if warm else H * (0.88 + 0.5 * rng.random())
        bend = rng.normal(0, 80)
        pts = []
        for t in np.linspace(0, 1, 120):
            x = -200 + (vp[0] + 200) * t
            y = y0 + (vp[1] - y0) * (t ** 0.85) + bend * math.sin(t * math.pi)
            pts.append((x, y))
        w = int(1 + 5 * (1 - abs(rng.normal(0, 0.5))))
        colr = (255, 120 + int(rng.random() * 60), 70) if warm else (230, 245, 255)
        if not warm and rng.random() < 0.35:
            colr = (124, 198, 218)
        d.line(pts, fill=colr, width=w)
    core = np.asarray(layer, np.float32) / 255
    trails = core * 0.9 + blur(core, 6) * 1.4 + blur(core, 24) * 1.2
    img = img + trails
    # lamps along the road
    for i in range(14):
        t = i / 13
        x = 60 + (vp[0] - 60) * t ** 0.9
        y = H * 0.30 + (vp[1] - 80 - H * 0.30) * t
        m = mask_from_draw(lambda d, x=x, y=y, s=(1 - t) * 14 + 3: d.ellipse([x - s, y - s, x + s, y + s], fill=255), 2)
        img = img + m * hexc("#FFD9A8") * 1.2 + blur(m[..., 0], 40)[..., None] * hexc("#FFB878") * 0.9
    road = fbm(H, W, 4, rng, 3)[..., None]
    img = img * (0.92 + 0.12 * road)
    finish(img, name, vignette=0.45, seed=seed)


def bokeh(name="distribution", seed=11):
    """Warm lights out of focus behind a row of backlit bottles."""
    rng = np.random.default_rng(seed)
    img = vgrad(hexc("#0F1D3B"), hexc("#050A16"))
    lay = np.zeros((H, W, 3), np.float32)
    for size, count, alpha in [(150, 9, 0.22), (90, 22, 0.26), (46, 50, 0.32)]:
        L = Image.new("RGB", (W, H))
        d = ImageDraw.Draw(L)
        for _ in range(count):
            x, y = rng.random() * W, H * (0.08 + rng.random() * 0.55)
            r = size * (0.6 + rng.random() * 0.6)
            c = [(255, 196, 120), (255, 214, 160), (255, 176, 96), (124, 198, 218)][min(3, int(rng.random() * 4.6))]
            k = 0.45 + rng.random() * 0.55
            d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(int(v * k) for v in c))
        a = blur(np.asarray(L, np.float32) / 255, size * 0.05)
        lay = lay + a * alpha
    img = img + lay
    def bottles(d):
        x = 60
        while x < W - 80:
            kind = rng.integers(0, 3)
            h = 560 + rng.random() * 280
            w = (120 if kind == 0 else 150 if kind == 1 else 130) + rng.random() * 30
            top = H - h
            if kind == 2:  # spirits: square shoulders
                d.rounded_rectangle([x, top + h * 0.30, x + w, H + 40], radius=18, fill=255)
                d.rectangle([x + w * 0.36, top + h * 0.08, x + w * 0.64, top + h * 0.32], fill=255)
                d.rectangle([x + w * 0.33, top, x + w * 0.67, top + h * 0.09], fill=255)
            else:  # wine and champagne: long shoulders
                sh = 0.42 if kind == 0 else 0.5
                d.rounded_rectangle([x, top + h * sh, x + w, H + 40], radius=int(w * 0.3), fill=255)
                d.polygon([(x + 2, top + h * (sh + 0.04)), (x + w * 0.36, top + h * 0.17), (x + w * 0.64, top + h * 0.17), (x + w - 2, top + h * (sh + 0.04))], fill=255)
                d.rectangle([x + w * 0.36, top, x + w * 0.64, top + h * 0.18], fill=255)
            x += w + 30 + rng.random() * 90
    m = mask_from_draw(bottles, 1)
    inner = np.clip(blur(m, 7) * 1.6 - 0.6, 0, 1)
    rim = np.clip(m - inner, 0, 1) * np.clip(blur(lay, 40).mean(-1, keepdims=True) * 6, 0, 1)
    rim = blur(rim, 2) * 1.1
    glass = vgrad(hexc("#0C1830"), hexc("#03060D"))
    img = img * (1 - m) + (glass + blur(lay, 30) * 0.35) * m + rim * hexc("#F5C892") * 0.55
    finish(img, name, vignette=0.45, seed=seed)


def plexus(name="ict", seed=21):
    """A network of connected nodes with depth of field, after the profile cover."""
    rng = np.random.default_rng(seed)
    img = vgrad(hexc("#0A1A44"), hexc("#04091C"))
    img = img + np.exp(-(((np.mgrid[0:H, 0:W][1] - W * 0.65) / 700) ** 2 + ((np.mgrid[0:H, 0:W][0] - H * 0.5) / 500) ** 2))[..., None] * hexc("#1F6FD1") * 0.6
    near = Image.new("RGB", (W, H)); far = Image.new("RGB", (W, H))
    for L, n, z in [(far, 260, 0), (near, 120, 1)]:
        d = ImageDraw.Draw(L)
        xs = rng.random(n) * W
        ys = H * 0.5 + np.sin(xs / W * math.pi * 1.6 + z) * H * 0.18 + rng.normal(0, H * (0.12 if z else 0.2), n)
        for i in range(n):
            for j in range(i + 1, n):
                dd = math.hypot(xs[i] - xs[j], ys[i] - ys[j])
                if dd < (150 if z else 110):
                    a = int(255 * (1 - dd / 150) * (0.45 if z else 0.3))
                    d.line([(xs[i], ys[i]), (xs[j], ys[j])], fill=(int(a * 0.55), int(a * 0.8), a), width=1 + z)
        for i in range(n):
            r = (rng.random() * 3 + 1.5) * (1.8 if z else 1)
            c = (210, 240, 255) if rng.random() < 0.8 else (124, 198, 218)
            d.ellipse([xs[i] - r, ys[i] - r, xs[i] + r, ys[i] + r], fill=c)
    f = np.asarray(far, np.float32) / 255
    nr = np.asarray(near, np.float32) / 255
    img = img + blur(f, 2.2) * 0.9 + blur(f, 10) * 0.6 + nr + blur(nr, 8) * 0.9
    # a few large out-of-focus nodes in front
    for _ in range(10):
        x, y, r = rng.random() * W, rng.random() * H, 20 + rng.random() * 50
        m = mask_from_draw(lambda d, x=x, y=y, r=r: d.ellipse([x - r, y - r, x + r, y + r], fill=255), r * 0.4)
        img = img + m * hexc("#7CC6DA") * 0.35
    finish(img, name, vignette=0.4, seed=seed)


def halftone(name="printing", seed=31):
    """A two-ink halftone, navy and teal, seen up close like a press sheet under a loupe."""
    rng = np.random.default_rng(seed)
    src = Path(__file__).resolve().parent / "cover-network.jpg"
    lum = np.asarray(Image.open(src).convert("L").resize((W, H), Image.LANCZOS), np.float32) / 255
    paper = np.ones((H, W, 3), np.float32) * hexc("#EEF0F1")
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    img = paper.copy()
    for ang, cell, ink, cov in [(45, 22, hexc("#1D2A51"), 1 - lum), (15, 22, hexc("#3790AB"), np.clip(lum * 1.2, 0, 1) * 0.55)]:
        a = math.radians(ang)
        u = xx * math.cos(a) + yy * math.sin(a)
        v = -xx * math.sin(a) + yy * math.cos(a)
        fu = (u / cell) % 1 - 0.5
        fv = (v / cell) % 1 - 0.5
        dist = np.sqrt(fu ** 2 + fv ** 2)
        cv = np.clip(cov * 0.85 + 0.03, 0, 0.9)
        dot = np.clip((np.sqrt(cv / math.pi) - dist) * 26, 0, 1)
        img = img * (1 - dot[..., None] * (1 - ink))
    img = img * (0.965 + 0.05 * fbm(H, W, 3, rng, 3)[..., None])
    focus = np.clip(np.abs(yy - H * 0.5) / (H * 0.5), 0, 1)[..., None] ** 1.6
    img = img * (1 - focus) + blur(img, 8) * focus
    finish(img, name, grain=0.015, vignette=0.5, seed=seed)


def waveform(name="media", seed=41):
    """Broadcast lines: a radio signal drawn as glowing waves."""
    rng = np.random.default_rng(seed)
    img = vgrad(hexc("#0B1838"), hexc("#050A18"))
    L = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(L)
    for k in range(70):
        ph = rng.random() * 6.28
        fr = 2.2 + rng.random() * 3
        amp = 60 + rng.random() * 260
        cy = H * 0.52 + rng.normal(0, 30)
        pts = []
        for x in range(-20, W + 20, 6):
            t = x / W
            env = math.exp(-((t - 0.55) / 0.22) ** 2)
            y = cy + math.sin(t * fr * 6.28 + ph) * amp * env + math.sin(t * 31 + ph * 2) * 10 * env
            pts.append((x, y))
        c = [(124, 198, 218), (58, 133, 181), (230, 245, 255), (31, 111, 209)][rng.integers(0, 4)]
        a = 0.25 + rng.random() * 0.6
        d.line(pts, fill=tuple(int(v * a) for v in c), width=1 + int(rng.random() * 2))
    core = np.asarray(L, np.float32) / 255
    img = img + core * 1.1 + blur(core, 5) * 1.0 + blur(core, 30) * 0.9
    # dust in the air
    for _ in range(300):
        x, y = rng.random() * W, rng.random() * H
        r = rng.random() * 2.5
        m = mask_from_draw(lambda d, x=x, y=y, r=r: d.ellipse([x - r, y - r, x + r, y + r], fill=255))
        img = img + m * 0.25
    finish(img, name, vignette=0.45, seed=seed)


def harbour_night(name="investment", seed=51):
    """Victoria from the water at night: house lights up the hillside, the harbour reflecting them."""
    rng = np.random.default_rng(seed)
    hz = int(H * 0.64)
    sky = vgrad(hexc("#040917"), hexc("#1C315C"), h=hz, curve=1.6)
    stars = (rng.random((hz, W)) > 0.9994).astype(np.float32)[..., None]
    sky = sky + blur(stars, 0.8) * 2.0
    water = vgrad(hexc("#0D1A38"), hexc("#02050D"), h=H - hz, curve=0.6)
    img = np.concatenate([sky, water], axis=0)
    ys = np.arange(H, dtype=np.float32)[:, None]
    L = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(L)
    for i, (peaks, colr, n) in enumerate([
        ([(W * 0.25, 430, 330), (W * 0.55, 470, 300), (W * 0.82, 360, 260)], "#142343", 260),
        ([(W * 0.10, 230, 260), (W * 0.40, 260, 300), (W * 0.70, 210, 240), (W * 0.98, 180, 200)], "#0A1430", 620),
    ]):
        prof = hz - bumps(peaks, np.random.default_rng(seed + i), detail=24)
        m = (ys >= prof[None, :]) & (ys <= hz)
        img[m] = hexc(colr)
        for _ in range(n):
            x = int(rng.random() * (W - 1))
            top = prof[x]
            t = rng.random() ** (0.5 if i else 0.8)
            y = top + 10 + (hz - top - 14) * t
            r = 1.2 + rng.random() * (1.6 if i else 1.0)
            c = (255, 214, 150) if rng.random() < 0.8 else (220, 236, 255)
            k = 0.55 + rng.random() * 0.45
            d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(int(v * k) for v in c))
    for x in range(10, W, 14):  # the waterfront
        if rng.random() < 0.75:
            y = hz - 6 - rng.random() * 8
            d.ellipse([x - 2, y - 2, x + 2, y + 2], fill=(255, 220, 165))
    pts = np.asarray(L, np.float32) / 255
    glow = pts * 1.4 + blur(pts, 4) * 2.2 + blur(pts, 22) * 1.6
    img = img + glow
    # reflections: the lit band, flipped, smeared down the water and broken by ripples
    band = glow[hz - 260:hz][::-1]
    refl = np.zeros_like(img)
    refl[hz:hz + 260] = band
    for _ in range(3):
        refl = _box(refl, 14, 0)
    ripple = noise(H, W, 3, rng)
    ripple = np.asarray(Image.fromarray(ripple, "F").resize((W // 10, H), Image.BILINEAR).resize((W, H), Image.BICUBIC))
    fade = np.clip(1 - (ys - hz) / 380, 0, 1)[..., None] * (ys >= hz)[..., None]
    img = img + refl * (0.5 + 0.9 * ripple[..., None]) * fade * 1.4
    finish(img, name, vignette=0.4, seed=seed)


def underwater(name="values", seed=61):
    """Light falling through deep water: the Deep Ocean of the concept's name."""
    rng = np.random.default_rng(seed)
    img = vgrad(hexc("#1E6F92"), hexc("#040A1C"), curve=0.7)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    src = (W * 0.42, -300)
    ang = np.arctan2(xx - src[0], yy - src[1])
    rays = noise(1, 4000, 18, rng)[0]
    idx = np.clip(((ang + 1.2) / 2.4 * 3999).astype(int), 0, 3999)
    r = np.clip((rays[idx] - 0.45) * 2.5, 0, 1) * np.exp(-yy / (H * 0.75))
    img = img + blur(r, 6)[..., None] * hexc("#9FDCEB") * 0.55
    caustic = np.clip(1 - np.abs(fbm(H, W, 90, rng, 3) - 0.5) * 9, 0, 1) * np.exp(-yy / (H * 0.25))
    img = img + caustic[..., None] * hexc("#BFEAF4") * 0.25
    for _ in range(500):
        x, y = rng.random() * W, rng.random() * H
        rr = rng.random() * 2.2 + 0.4
        m = mask_from_draw(lambda d, x=x, y=y, rr=rr: d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=255), 0.6)
        img = img + m * 0.22 * (1 - y / H)
    finish(img, name, vignette=0.5, seed=seed)


def hero_from_cover(src):
    """The network image from the profile cover, the Group's own picture, at full size."""
    im = Image.open(src).convert("RGB")
    im = im.resize((2000, int(2000 * im.height / im.width)), Image.LANCZOS)
    top = (im.height - 1250) // 2
    im = im.crop((0, top, 2000, top + 1250))
    path = OUT / "hero.jpg"
    im.save(path, quality=80, optimize=True, progressive=True)
    print(f"{path.name}  {path.stat().st_size // 1024} KB")


SCENES = {
    "tourism": lambda: seascape("tourism", 3),
    "cta": lambda: seascape("cta", 8, sun_x=0.36, warm=0.55),
    "automobile": light_trails,
    "distribution": bokeh,
    "ict": plexus,
    "printing": halftone,
    "media": waveform,
    "investment": harbour_night,
    "values": underwater,
}

if __name__ == "__main__":
    names = sys.argv[1:] or list(SCENES) + ["hero"]
    for n in names:
        if n == "hero":
            cover = Path(__file__).resolve().parent / "cover-network.jpg"
            if cover.exists():
                hero_from_cover(cover)
            continue
        SCENES[n]()
