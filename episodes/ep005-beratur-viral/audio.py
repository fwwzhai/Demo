"""EP005 soundtrack: python3 audio.py out.m4a (uses tools/sfx.py)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from sfx import *
m = Mix(60.0)
m.add('mus', kampung_loop(60), 0, .5)
for t in (10, 17, 20, 28, 36, 45, 53): m.add('fx', whoosh(.35, 600, 4000), t - .15, .5)
m.add('fx', record_scratch(), .3, .8); m.add('fx', slide_whistle(), .6, .4)
for t in (4.0, 5.8, 7.6): m.add('fx', ratchet(), t, .5)
m.add('fx', crickets(2.0), 7.8, .6)
m.add('fx', cha_ching(), 10.3, .7); m.add('fx', pop(), 11.2, .5); m.add('fx', crickets(1.5), 13.0, .7)
m.add('fx', sad_trombone(), 14.6, .8)
m.add('fx', boom(), 17.2, .8); m.add('fx', ding(), 18.0, .4)
for t in (20.2, 28.2, 36.2): m.add('fx', slide_whistle(), t, .45)
m.add('fx', rimshot(), 24.6, .8); m.add('fx', boing(), 32.3, .7); m.add('fx', rimshot(), 33.0, .6)
m.add('fx', whoosh(1.0, 300, 3000), 39.2, .7); m.add('fx', cha_ching(), 41.4, .7)
m.add('fx', record_scratch(), 45.3, .8); m.add('fx', sad_trombone(), 46.6, .7); m.add('fx', rimshot(), 49.6, .7)
m.add('fx', ding(), 53.2, .5); m.add('fx', boom(), 57.6, .7); m.add('fx', cha_ching(), 57.8, .6)
m.render(sys.argv[1])
