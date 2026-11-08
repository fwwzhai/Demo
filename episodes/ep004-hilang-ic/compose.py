"""EP004 Hilang IC: animate art/*.png + captions -> ep004-hilang-ic.mp4 (60 s, 24 fps, 1080x1920) with SFX/music.
python3 compose.py"""
import os, sys, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
sys.path.insert(0, os.path.join(ROOT, 'tools'))
from sfx import *

W, H, FPS, DUR = 1080, 1920, 24, 60.0
INK, RED_, YEL_, CRM = '#1e1a2b', '#e76f51', '#f5b544', '#f4e9d8'
FB = '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
CUTS = [0, 5, 12, 20, 28, 36, 45, 52, 60]
ART = [[Image.open(f'{HERE}/art/s{i}_b{b}.png').convert('RGB') for b in range(3)] for i in range(1, 9)]

# (start, end, text, style, y)   style: hook | tag | cap | bub | end
CAPS = [
    (0.2, 5, 'POV: IC hilang.\nLAGI.', 'hook', 230), (2.4, 5, 'kali ke-4 bulan ni.', 'cap', 1760),
    (5.2, 12, 'Punca sebenar:', 'cap', 170), (6.6, 12, 'IC kau ada kaki.', 'hook', 300), (9.0, 12, 'WEH JAP!!', 'bub', 760),
    (12.2, 20, 'SOLUSI #1', 'tag', 150), (12.8, 20, 'IC saiz A3.\nGantung kat leher.', 'cap', 300),
    (16.4, 20, 'Hilang? Mustahil.', 'cap', 1740), (18.2, 20, 'Malu? Sikit.', 'cap', 1840),
    (20.2, 28, 'SOLUSI #2', 'tag', 150), (20.8, 28, 'Gam gajah.\nTerus kat dahi.', 'cap', 300),
    (24.6, 28, 'IC selamat. Kening tak.', 'cap', 1790),
    (28.2, 36, 'SOLUSI #3', 'tag', 150), (28.8, 36, 'Upah bodyguard.\nUntuk IC.', 'cap', 300),
    (32.2, 36, 'Gaji dia RM3,500.', 'cap', 1700), (34.0, 36, 'Lagi tinggi dari gaji kau.', 'cap', 1820),
    (36.2, 45, 'SOLUSI #4 (FINAL)', 'tag', 150), (36.8, 45, 'IC saiz pintu.', 'hook', 300),
    (40.5, 45, 'Kaunter: "Encik...\nmacam mana nak scan ni?"', 'cap', 1690),
    (45.3, 52, '...eh jap.', 'cap', 260), (47.0, 52, 'IC dalam casing phone.', 'cap', 1700), (49.6, 52, 'SELAMA NI.', 'hook', 1830),
    (52.2, 60, 'SOLUSI #5', 'tag', 150), (52.8, 60, 'Buang phone.', 'hook', 300),
    (54.8, 57.6, 'Takde phone, takde casing,\ntakde masalah.', 'cap', 1760),
    (57.6, 60, 'SOLUSI TAK PERLU', 'end', 760), (58.2, 60, 'masalah kecik. solusi besar.\nfollow utk lagi.', 'cap', 1000),
]
SHAKE = [(0.2, 0.8), (6.6, 7.1), (9.0, 9.6), (36.8, 37.6), (49.6, 50.3)]

def card(text, style):
    size = {'hook': 92, 'tag': 64, 'cap': 58, 'bub': 80, 'end': 96}[style]
    f = ImageFont.truetype(FB, size)
    d0 = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    bb = d0.multiline_textbbox((0, 0), text, font=f, align='center', spacing=10)
    tw, th = int(bb[2] - bb[0]), int(bb[3] - bb[1])
    px, py = 36, 26
    bg, fg = {'hook': (CRM, INK), 'tag': (RED_, CRM), 'cap': ('#ffffff', INK), 'bub': ('#ffffff', RED_), 'end': (YEL_, INK)}[style]
    im = Image.new('RGBA', (tw + 2 * px + 16, th + 2 * py + 16), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((8, 8, im.width - 2, im.height - 2), 28, fill=INK)                      # drop shadow
    d.rounded_rectangle((0, 0, im.width - 10, im.height - 10), 28, fill=bg, outline=INK, width=7)
    d.multiline_text((px - int(bb[0]), py - int(bb[1])), text, font=f, fill=fg, align='center', spacing=10)
    return im
CARDS = [card(t, s) for _, _, t, s, _ in CAPS]

def ease_pop(x):                                    # 0..1 -> overshoot scale
    x = min(max(x, 0), 1); return 1 + 0.18 * np.sin(np.pi * x) * (1 - x) if x < 1 else 1.0

def frame(t):
    i = max(k for k in range(8) if CUTS[k] <= t); lt = t - CUTS[i]; sl = CUTS[i + 1] - CUTS[i]
    img = ART[i][int(t * 8) % 3]
    z = 1.0 + 0.06 * lt / sl + (0.08 * max(0, 1 - lt / 0.25))                           # push-in + cut pop
    dx = dy = 0
    if any(a <= t < b for a, b in SHAKE): dx, dy = np.random.randint(-18, 19, 2)
    w, h = int(W * z), int(H * z)
    im = img.resize((w, h), Image.BILINEAR).crop(((w - W) // 2 + dx, (h - H) // 2 + dy, (w - W) // 2 + dx + W, (h - H) // 2 + dy + H))
    for (a, b, _, st, y), cd in zip(CAPS, CARDS):
        if a <= t < b:
            s = min(1, (t - a) / 0.12) * 0.85 + 0.15 if (t - a) < 0.12 else ease_pop((t - a) / 0.3)
            c2 = cd.resize((max(1, int(cd.width * s)), max(1, int(cd.height * s))))
            rot = {'tag': -4, 'bub': 5, 'end': -3}.get(st, 0)
            if rot: c2 = c2.rotate(rot, expand=True, resample=Image.BICUBIC)
            im.paste(c2, ((W - c2.width) // 2, y - c2.height // 2), c2)
    if lt < 0.06 and i: im = Image.blend(im, Image.new('RGB', (W, H), 'white'), 0.6)    # cut flash
    return im

def audio(out):
    m = Mix(DUR)
    m.add('mus', kampung_loop(DUR), 0, 0.5)
    for c in CUTS[1:-1]: m.add('fx', whoosh(.35, 600, 4000), c - .15, .5)
    for a, _, _, st, _ in CAPS:
        if st == 'tag': m.add('fx', slide_whistle(), a, .45)
        elif st in ('hook', 'cap'): m.add('fx', pop(), a, .35)
    m.add('fx', record_scratch(), .2, .9); m.add('talk', blips('amir', 1.6, loud=True, seed=1), .4)
    m.add('fx', boing(), 6.6, .8); m.add('talk', blips('amir', .9, loud=True, seed=2), 9.0)
    m.add('fx', ding(), 16.4, .5); m.add('fx', crickets(1.6), 18.2, .6)
    m.add('fx', click(), 24.6, .8); m.add('fx', sad_trombone(), 25.0, .45)
    m.add('fx', cha_ching(), 32.2, .7); m.add('fx', rimshot(), 34.0, .8)
    m.add('fx', boom(), 36.8, .9); m.add('fx', crickets(2.5), 41.2, .6)
    m.add('fx', record_scratch(), 45.3, .9); m.add('fx', boom(1.0), 49.6, .7); m.add('fx', sad_trombone(), 50.0, .7)
    m.add('fx', whoosh(.8, 300, 3000), 52.9, .8); m.add('fx', glitch(.5), 53.6, .5); m.add('fx', rimshot(), 55.4, .8)
    m.add('fx', cha_ching(), 57.6, .7)
    m.render(out)

if __name__ == '__main__':
    aud = f'{HERE}/soundtrack.m4a'; audio(aud)
    out = f'{HERE}/ep004-hilang-ic.mp4'
    p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-i', aud, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-shortest',
                          '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    np.random.seed(3)
    for n in range(int(DUR * FPS)): p.stdin.write(frame(n / FPS).tobytes())
    p.stdin.close(); p.wait(); print(out)
