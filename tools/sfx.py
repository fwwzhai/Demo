"""KALAU LAH! synthesized SFX library (numpy only, no licences needed).
Import: sys.path.insert(0,'tools'); from sfx import *
Run directly to export every SFX to assets/sfx/*.wav for CapCut use."""
import numpy as np, subprocess
SR = 48000
rng = np.random.default_rng(7)

def t_(d): return np.arange(int(d*SR))/SR
def env(d, a=.005, dec=.2): t = t_(d); return np.minimum(1, t/a)*np.exp(-t/dec)
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1/SR); X[(f<lo)|(f>hi)] = 0; return np.fft.irfft(X, len(x))
def norm(x, g=1.0): return x/(np.abs(x).max()+1e-9)*g
def glide(f0, f1, d, curve=1.0): t = t_(d)/d; return f0+(f1-f0)*t**curve
def osc(freqs, kind='sine'):
    ph = 2*np.pi*np.cumsum(freqs)/SR
    if kind == 'square': return np.sign(np.sin(ph))*.6
    if kind == 'saw': return 2*((ph/(2*np.pi)) % 1)-1
    if kind == 'tri': return 2*np.abs(2*((ph/(2*np.pi)) % 1)-1)-1
    return np.sin(ph)

# --- basics
def tone(f, d, dec=.25, h=(1, .3)): t = t_(d); return sum(a*np.sin(2*np.pi*f*(i+1)*t) for i, a in enumerate(h))*env(d, .003, dec)
def click(): return bp(rng.standard_normal(int(.02*SR)), 1500, 8000)*env(.02, .0005, .004)
def pop(f=900): t = t_(.12); return osc(f*np.exp(-t*12))*env(.12, .002, .04)
def whoosh(d=.6, lo=400, hi=3000): return norm(bp(rng.standard_normal(int(d*SR)), lo, hi))*np.sin(np.pi*t_(d)/d)**2
def boom(d=1.4, f0=90, f1=38):
    t = t_(d); f = f1+(f0-f1)*np.exp(-t*6); return np.tanh(2.5*osc(f))*np.exp(-t/0.45)
def noise_hit(d, lo, hi, dec): return bp(rng.standard_normal(int(d*SR)), lo, hi)*env(d, .001, dec)

# --- comedy
def slide_whistle(f0=500, f1=1500, d=.6):
    f = glide(f0, f1, d, 1.3)*(1+.012*np.sin(2*np.pi*7*t_(d))); return osc(f)*np.minimum(1, t_(d)/.03)*np.minimum(1, (d-t_(d))/.05)
def record_scratch():
    d = .45; t = t_(d); f = 300+900*np.abs(np.sin(2*np.pi*3.3*t))
    return norm(bp(osc(f, 'saw')*.6+rng.standard_normal(len(t))*.5, 200, 5000))*env(d, .002, .25)
def sad_trombone():
    out = []
    for f, d in [(233, .32), (220, .32), (208, .32), (196, 1.0)]:
        t = t_(d); v = 1+(.025*np.sin(2*np.pi*5.5*t)*(t > .3) if d > .5 else 0)
        x = bp(osc(f*v, 'saw'), 150, 1800)*np.minimum(1, t/.04)*np.minimum(1, (d-t)/.06); out.append(x)
    return norm(np.concatenate(out))
def rimshot():
    out = np.zeros(int(1.4*SR))
    def at(x, s): i = int(s*SR); out[i:i+len(x)] += x[:len(out)-i]
    at(boom(.25, 220, 140)*.7, 0); at(noise_hit(.2, 1500, 8000, .05)*1.2, .18); at(boom(.25, 160, 100)*.6, .18)
    at(noise_hit(1.1, 5000, 14000, .35)*.5, .36); at(noise_hit(.2, 1500, 8000, .05), .36)
    return norm(out)
def cha_ching():
    out = np.zeros(int(1.0*SR)); i = int(.12*SR)
    out[:int(.1*SR)] += noise_hit(.1, 2000, 9000, .02)
    b = tone(2637, .85, .3, (1, .4, .2))+tone(3520, .85, .25, (1, .3)); out[i:i+len(b)] += b[:len(out)-i]
    return norm(out)
def boing(f=180, d=.5):
    t = t_(d); f_ = f*(1+.5*np.exp(-t*8)*np.sin(2*np.pi*14*t)); return osc(f_, 'tri')*env(d, .002, .2)
def crickets(d=2.0):
    out = np.zeros(int(d*SR)); k = 0
    while (s := .05+k*.27+(.13 if k % 3 == 2 else 0)) < d-.1:
        t = t_(.09); ch = osc(np.full(len(t), 4300.))*(.5+.5*np.sin(2*np.pi*60*t))*env(.09, .005, .05)
        i = int(s*SR); out[i:i+len(ch)] += ch; k += 1
    return out
def glitch(d=.7):
    t = t_(d); g = np.sign(np.sin(2*np.pi*180*t*(1+.3*np.sin(2*np.pi*13*t))))*.5+bp(rng.standard_normal(len(t)), 2000, 9000)*.6
    return np.round(g*6)/6*np.repeat(rng.random(len(t)//400+1) > .3, 400)[:len(t)]*env(d, .001, .4)
def ratchet(n=12, d=1.1):
    out = np.zeros(int(d*SR))
    for k in range(n): s = d*(k/n)**.6; i = int(s*SR); c = click(); out[i:i+len(c)] += c
    return out
def ding(): return tone(1568, 1.2, .5, (1, .5, .25))
def chime_join(): out = np.zeros(int(.8*SR)); a = tone(784, .5, .18); b = tone(1175, .6, .25); out[:len(a)] += a; i = int(.15*SR); out[i:i+len(b)] += b; return out
def chime_leave(): out = np.zeros(int(.7*SR)); a = tone(880, .3, .12); b = tone(587, .5, .2); out[:len(a)] += a; i = int(.15*SR); out[i:i+len(b)] += b; return out
def fwip(): return whoosh(.18, 1500, 7000)

# --- gibberish "blip" voices (speech-bubble talk, no voice-over)
BLIP = {  # base Hz, wave, syllable sec, spread, lowpass
    'amir': (330, 'square', .075, .35, 4000),
    'mei':  (250, 'tri',    .095, .08, 2500),   # flat, monotone = deadpan
    'kavi': (480, 'saw',    .055, .5,  5000),
    'din':  (150, 'saw',    .11,  .2,  1500),
    'uk':   (200, 'saw',    .10,  .25, 900),    # muffled "wah-wah" laptop speaker
    'makcik': (420, 'tri',  .07,  .45, 3500),
}
def blips(who, d, loud=False, seed=0):
    base, kind, syl, spread, lp = BLIP[who]; r = np.random.default_rng(seed)
    out = np.zeros(int(d*SR)); s = 0.0
    while s < d-syl:
        L = syl*r.uniform(.7, 1.3); f = base*2**(r.uniform(-spread, spread))*(1.25 if loud else 1)
        t = t_(L); fz = f*(1+.15*np.sin(np.pi*t/L)) if who == 'uk' else np.full(len(t), f)
        x = osc(fz, kind)*np.sin(np.pi*t/L)**.7; i = int(s*SR); out[i:i+len(x)] += x[:len(out)-i]
        s += L+r.uniform(.01, .05)+(.12 if r.random() < .12 else 0)
    return norm(bp(out, 90, lp))*(1 if loud else .8)

# --- ambience + music
def brown(d): return norm(bp(np.cumsum(rng.standard_normal(int(d*SR))), 40, 900))
def mamak_amb(d):
    a = bp(rng.standard_normal(int(d*SR)), 250, 1800); am = .6+.4*np.abs(np.sin(2*np.pi*.7*t_(d))*np.sin(2*np.pi*1.9*t_(d)))
    out = norm(a)*am*.22+brown(d)*.25
    for _ in range(int(d*.8)):
        s = rng.random()*(d-.6); x = tone(2200+rng.random()*1800, .5, .12, (1, .5, .2))*.08; i = int(s*SR); out[i:i+len(x)] += x
    return out
def room_tone(d): return bp(rng.standard_normal(int(d*SR)), 80, 600)*.05
def kampung_loop(d, bpm=104):
    out = np.zeros(int(d*SR)); beat = 60/bpm; notes = [392, 440, 523, 587, 659, 784]; seq = [0, 2, 3, 2, 4, 3, 2, 1]; i = 0; tt = 0
    def a(x, s): j = int(s*SR); x = x[:max(0, len(out)-j)]; out[j:j+len(x)] += x
    while tt < d-.5:
        b = i % 8
        if b in (0, 3, 6): a(boom(.3, 120, 55)*.6, tt)
        if b in (2, 6): a(noise_hit(.15, 800, 5000, .04)*.5, tt)
        a(noise_hit(.05, 6000, 12000, .01)*.25, tt+beat/2)
        a(tone(notes[seq[i % 8]], beat*.9, .22, (1, .5, .25, .1))*.35, tt); tt += beat; i += 1
    return out

class Mix:
    def __init__(self, dur): self.N = int(dur*SR); self.bus = {k: np.zeros(self.N) for k in ('fx', 'talk', 'amb', 'mus')}
    def add(self, bus, x, at, g=1.0):
        i = int(at*SR); x = x[:max(0, self.N-i)]; self.bus[bus][i:i+len(x)] += x*g
    def render(self, out, lufs=-14):
        b = self.bus; e = np.convolve(np.abs(b['talk']+b['fx']*.5), np.ones(int(.15*SR))/int(.15*SR), 'same'); duck = 1-.55*np.clip(e*8, 0, 1)
        m = b['fx']+b['talk']*.55+b['amb']*np.maximum(duck, .6)+b['mus']*.3*duck; m = norm(m, .89).astype(np.float32)
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-af', f'loudnorm=I={lufs}:TP=-1:LRA=11,aresample=44100',
                        '-ac', '2', '-c:a', 'aac', '-b:a', '192k', out], input=m.tobytes(), check=True)

if __name__ == '__main__':
    import os, wave; os.makedirs('assets/sfx', exist_ok=True)
    lib = dict(click=click(), pop=pop(), whoosh=whoosh(), boom=boom(), slide_up=slide_whistle(), slide_down=slide_whistle(1400, 300, .9),
               record_scratch=record_scratch(), sad_trombone=sad_trombone(), rimshot=rimshot(), cha_ching=cha_ching(), boing=boing(),
               crickets=crickets(), glitch=glitch(), ratchet=ratchet(), ding=ding(), zoom_join=chime_join(), zoom_leave=chime_leave(), fwip=fwip(),
               mamak_ambience_10s=mamak_amb(10), kampung_loop_20s=kampung_loop(20), **{f'blip_{k}': blips(k, 2.0) for k in BLIP})
    for k, x in lib.items():
        with wave.open(f'assets/sfx/{k}.wav', 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((norm(x, .9)*32767).astype(np.int16).tobytes())
    print(len(lib), 'sfx exported')
