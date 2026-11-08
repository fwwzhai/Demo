"""EP004 Hilang IC: 8 vertical scenes drawn with the claude-drawing cartoon lib, 3 boil frames each.
python3 draw.py [scene ...]  -> art/sN_bK.png"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '.claude', 'skills', 'claude-drawing', 'lib'))
import numpy as np
from cartoon import Cartoon, WHITE, RED, YELLOW

W, H = 1080, 1920
E, R, P = Cartoon.ellipse_pts, Cartoon.rrect_pts, Cartoon.place
SKIN, SKIN_D, HAIR, OLIVE, OLIVE_D, PANTS = '#f2c79c', '#d9a274', '#1e1a2b', '#7d8a4a', '#5f6b36', '#263b55'
CREAM, CREAM_D, GREEN, GREEN_D, YEL, YEL_D, BLUE, BLUE_D = '#f4e9d8', '#e0cfb4', '#367c68', '#28604f', '#f5b544', '#d99a2b', '#263b55', '#1a2a3e'
CARD, CARD_D, SWEAT, SUIT = '#cfe6f2', '#9fc4d8', '#8fd3f0', '#2b2b33'

def room(c, wall=CREAM, wall_d=CREAM_D, floor=GREEN, floor_d=GREEN_D, fy=1500):
    c.shape(R(-40, -40, W + 40, fy + 10, 0), wall, width=0.1)
    c.crayon(R(-40, -40, W + 40, fy, 0), wall_d, pressure=0.25)
    c.shape(R(-40, fy, W + 40, H + 40, 0), floor, shade=(floor_d, 0, 30), width=7)

def sweat(c, x, y, s=1.0):
    c.shape(P([(0, -40), (22, 0), (18, 22), (0, 32), (-18, 22), (-22, 0)], x, y, s), SWEAT, width=5)

def ic(c, x, y, w, h, rot=0, face=None):
    sc = w / 400
    c.shape(P(R(-200, -125, 200, 125, 26), x, y, sc, rot), CARD, shade=(CARD_D, 8, 10), width=6)
    c.shape(P(R(-170, -70, -60, 70, 10), x, y, sc, rot), '#f7e0c4', width=4)      # photo
    c.shape(P(E(-115, -20, 28, 30), x, y, sc, rot), SKIN_D, width=3)
    c.shape(P(R(-30, -95, 30, -55, 6), x, y, sc, rot), YEL, width=4)               # chip
    for k, yy in enumerate((10, 40, 70)):
        c.line(P([(-20, yy), (150 - 40 * k, yy)], x, y, sc, rot), 5, taper=(4, 4))
    if face: c.face(*P([(120, -40)], x, y, sc, rot)[0], 90 * sc, face, rot=rot)

def amir(c, x, y, s=1.0, mood='smile', hands=None, glasses=True, legs=True):
    """(x, y) = neck. hands: list of hand points (default arms down)."""
    u = lambda pts: P(pts, x, y, s)
    if legs:
        for dx in (-55, 55):
            c.shape(u(R(dx - 38, 300, dx + 38, 470, 16)), PANTS, width=6)
            c.shape(u(E(dx + (12 if dx > 0 else -12), 480, 52, 24)), '#3a2e2a', width=6)
    c.shape(u(R(-120, 0, 120, 330, 60)), OLIVE, shade=(OLIVE_D, 14, 12), width=7)
    c.shape(u([(-40, 0), (0, 50), (40, 0)]), '#f4e9d8', width=5)                    # collar
    for hp in (hands or [u([(-200, 300)])[0], u([(200, 300)])[0]]):
        sx = -1 if hp[0] < x else 1
        c.arm(u([(sx * 105, 70)])[0], hp, bend=0.2 * sx, width=7 * s, hand=34 * s, glove=SKIN, thumb=sx)
    c.shape(u(E(0, -170, 175, 165)), SKIN, shade=(SKIN_D, 10, 14), width=7)
    spikes = [(-180, -170)] + [(-180 + 36 * i, -300 - (60 if i % 2 else 0) + (25 if i in (0, 10) else 0)) for i in range(11)] + [(180, -170), (150, -230), (0, -255), (-150, -230)]
    c.shape(u(spikes), HAIR, width=6)
    c.face(x, y - 140 * s, 175 * s, mood, blush=True)
    if glasses:
        for gx in (-58, 58):
            c.outline(u(E(gx, -160, 52, 50)), 7 * s)
        c.line(u([(-8, -165), (8, -165)]), 6 * s)

def burst_text(c, x, y, txt, size=120, col=YEL, rot=-6, rx=230, ry=140):
    c.burst(x, y, rx, ry, colour=RED, spikes=16, rot=rot)
    c.letter(txt, x, y + size * 0.35, size, fill=col, anchor='m', rot=rot)

def s1(c):
    room(c)
    c.shape(R(160, 1560, 420, 1720, 20), '#8a5a3c', shade=('#6b4430', 0, 14), width=6)   # empty wallet
    c.shape(R(175, 1575, 405, 1640, 12), '#3a2620', width=4)
    amir(c, 560, 900, 1.25, 'wow', hands=[(250, 640), (870, 640)])
    for dx in (-140, 140):                                                              # pockets out
        c.shape(P(R(-45, 0, 45, 110, 20), 560 + dx, 1290, 1), WHITE, width=5)
    for p in ((330, 560, 1.2), (800, 520, 1.0), (850, 760, 0.8)): sweat(c, *p)
    c.pop_lines(560, 540, 300, 380, [200, 230, 260, 290, 320, 350])

def s2(c):
    room(c, YEL, YEL_D, BLUE, BLUE_D)
    amir(c, 260, 1000, 0.85, 'wow', hands=[(560, 1050), (80, 1200)])
    for dx, a in ((-50, -30), (50, 25)):                                                # IC legs running
        c.line([(800 + dx * 0.6, 1100), (800 + dx + a, 1260), (800 + dx + a + 40, 1270)], 9)
    ic(c, 800, 1000, 340, 214, rot=-12, face='happy')
    c.arm((680, 1000), (600, 880), bend=-0.3, width=6, hand=26, glove=WHITE, thumb=-1)
    c.arm((930, 980), (1010, 860), bend=0.3, width=6, hand=26, glove=WHITE, thumb=1)
    c.speed_lines((980, 900), (980, 1200), angle=180, n=6)
    for p in ((120, 700), (420, 660)): sweat(c, *p, 0.8)

def s3(c):
    room(c, '#bfe0d6', '#9ccbbd', '#c9803c', '#a2642c')
    amir(c, 540, 760, 1.05, 'happy', hands=[(250, 1250), (830, 1250)])
    c.line([(400, 760), (300, 990)], 6); c.line([(680, 760), (780, 990)], 6)              # lanyard
    ic(c, 540, 1180, 640, 402)
    c.sparkle(170, 900, 40); c.sparkle(930, 860, 34); c.sparkle(880, 1500, 28)

def s4(c):
    room(c, '#f7d9c4', '#e9bfa3', GREEN, GREEN_D)
    amir(c, 540, 1000, 1.15, 'smile', hands=[(300, 780), (790, 1350)])
    ic(c, 540, 650, 280, 176, rot=4)                                                     # glued to forehead
    for gx in (380, 700): c.shape(E(gx, 830, 18, 40), '#fff6d8', width=4)               # glue drips
    c.shape(R(720, 1330, 860, 1540, 24), WHITE, shade=('#dcdbe3', 10, 0), width=6)       # glue bottle
    c.shape(R(760, 1270, 820, 1330, 8), RED, width=5)
    c.letter('GAM', 790, 1460, 46, fill=YEL, anchor='m')
    for p in ((240, 600), (860, 640)): sweat(c, *p, 0.9)

def s5(c):
    room(c, '#d6d0e8', '#bcb4d6', '#8c8c99', '#6f6f7c')
    gx, gy = 330, 700                                                                    # bodyguard
    for dx in (-80, 80): c.shape(R(gx + dx - 55, gy + 620, gx + dx + 55, gy + 900, 16), SUIT, width=7)
    c.shape(R(gx - 230, gy + 60, gx + 230, gy + 660, 80), SUIT, shade=('#17171c', 16, 12), width=8)
    c.shape([(gx - 30, gy + 60), (gx, gy + 200), (gx + 30, gy + 60)], WHITE, width=5)
    c.shape(R(gx - 120, gy - 230, gx + 120, gy + 70, 70), '#c99a73', shade=('#a77955', 10, 12), width=8)
    c.shape(R(gx - 100, gy - 140, gx + 100, gy - 80, 20), '#111111', width=6)              # shades
    c.line([(gx - 40, gy + 10), (gx + 40, gy + 10)], 7)
    c.line([(gx + 120, gy - 120), (gx + 170, gy - 40), (gx + 140, gy + 40)], 5)          # earpiece
    c.shape(R(620, 1300, 960, 1520, 30), RED, shade=('#b3342a', 0, 16), width=7)          # cushion
    ic(c, 790, 1220, 280, 176, rot=6, face='smile')
    c.shape(R(840, 1172, 925, 1200, 8), '#111111', width=4)                              # tiny IC shades
    c.sparkle(940, 1050, 36); c.sparkle(640, 1100, 26)

def s6(c):
    room(c, '#f4e9d8', CREAM_D, '#b9b2a6', '#9c9588', fy=1450)
    c.shape(R(-20, 1150, 1100, 1460, 0), '#a2642c', shade=('#7f4d22', 0, 20), width=7)   # counter
    ic(c, 600, 820, 1000, 628, rot=-75)                                                  # door-size IC
    amir(c, 330, 1180, 0.6, 'wow', hands=[(200, 1020), (470, 990)])
    for p in ((190, 900), (470, 880), (330, 850)): sweat(c, *p, 0.7)

def s7(c):
    room(c, CREAM, CREAM_D, BLUE, BLUE_D)
    c.shape(R(80, 1250, 1000, 1560, 60), '#c9803c', shade=('#a2642c', 0, 24), width=7)    # sofa
    amir(c, 540, 950, 1.0, 'wow', hands=[(420, 1160), (700, 1120)], legs=False)
    c.shape(R(560, 1060, 760, 1180, 22), '#2b2b33', width=6)                              # phone, case open
    ic(c, 760, 1330, 220, 138, rot=-25)
    c.speed_lines((700, 1180), (820, 1180), angle=-90, n=4, length=(40, 90))
    burst_text(c, 820, 640, '!!', 150, rx=150, ry=130)

def s8(c):
    room(c, '#bfe0d6', '#9ccbbd', GREEN, GREEN_D)
    amir(c, 520, 1000, 1.05, 'happy', hands=[(260, 660), (820, 1100)])
    c.shape(R(150, 330, 290, 560, 24), '#2b2b33', width=6)                                # flung phone
    c.speed_lines((300, 600), (420, 700), angle=-130, n=5)
    ic(c, 860, 1120, 220, 138, rot=10)
    c.sparkle(950, 900, 44); c.sparkle(120, 1300, 30); c.sparkle(700, 500, 34)

SCENES = [s1, s2, s3, s4, s5, s6, s7, s8]
if __name__ == '__main__':
    os.makedirs(f'{HERE}/art', exist_ok=True)
    for i in [int(a) for a in sys.argv[1:]] or range(1, 9):
        c = Cartoon(W, H, seed=40 + i, boil=2.2)
        SCENES[i - 1](c)
        for b in range(3): c.composite(boil=b).save(f'{HERE}/art/s{i}_b{b}.png')
        print('scene', i)
