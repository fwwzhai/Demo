import numpy as np, subprocess, sys
SR=48000; DUR=60.0; N=int(SR*DUR); rng=np.random.default_rng(7)
VT=sys.argv[1]; OUT=sys.argv[2]
def load(path, tempo=1.0, cut=None):
    af=f"atempo={tempo}" if tempo!=1 else "anull"
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',path,'-af',af,'-f','f32le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    x=np.frombuffer(raw,np.float32).copy()
    if cut: n=int(cut*SR); x=x[:n]; x[-int(.03*SR):]*=np.linspace(1,0,int(.03*SR))
    return x
def t_(d): return np.arange(int(d*SR))/SR
def env(d,a=.005,dec=.2): t=t_(d); return np.minimum(1,t/a)*np.exp(-t/dec)
def bp(x,lo,hi):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X[(f<lo)|(f>hi)]=0; return np.fft.irfft(X,len(x))
voice=np.zeros(N); sfx=np.zeros(N); amb=np.zeros(N); mus=np.zeros(N)
def add(buf,x,at,g=1.0):
    i=int(at*SR); x=x[:max(0,N-i)]; buf[i:i+len(x)]+=x*g
# ---- VOICES (start times = bubble t0) ----
V=[('uk1',3.2,1.15),('amir1',8.2,1.1),('uk2',13.2,1.15),('amir2',18.1,1.1),('mei1',19.6,1.1),('kavi1',23.8,1.12),
   ('mei2',33.8,1.1),('amir3',36.3,1.1),('mei3',37.5,1.1),('kavi2',41.2,1.12),('din1',46.4,1.05),('din2',52.3,1.05)]
for k,at,tp in V:
    x=load(f'{VT}/{k}.wav',tp); x/=np.abs(x).max()+1e-9
    if k.startswith('uk'): x=bp(x,300,3400)*1.3          # laptop-speaker / Zoom EQ
    if k[:4] in('amir','mei1','kavi','mei2','mei3') and at<45.9: x=bp(x,120,7000)
    add(voice,x,at,0.8)
x=load(f'{VT}/amir4.wav',1.1,cut=0.45); add(voice,x/np.abs(x).max(),39.8,0.95)   # "MERDEK—" cut off
# ---- SFX ----
def tone(f,d,dec=.25,h=(1,.3)): t=t_(d); return sum(a*np.sin(2*np.pi*f*(i+1)*t) for i,a in enumerate(h))*env(d,.003,dec)
def whoosh(d=.6,lo=400,hi=3000):
    n=rng.standard_normal(int(d*SR)); x=bp(n,lo,hi); return x/np.abs(x).max()*np.sin(np.pi*t_(d)/d)**2
def boom(d=1.4,f0=90,f1=38):
    t=t_(d); f=f1+(f0-f1)*np.exp(-t*6); ph=2*np.pi*np.cumsum(f)/SR; return np.tanh(2.5*np.sin(ph))*np.exp(-t/0.45)
def pop(f=900): t=t_(.12); f_=f*np.exp(-t*12); return np.sin(2*np.pi*np.cumsum(f_)/SR)*env(.12,.002,.04)
def click(): return bp(rng.standard_normal(int(.02*SR)),1500,8000)*env(.02,.0005,.004)
add(sfx,pop(500),0.0,.5); add(sfx,whoosh(.9,600,4000),0.35,.35); add(sfx,boom(.6,160,70),1.5,.35)          # title
add(sfx,tone(784,.5,.18),2.85,.25); add(sfx,tone(1175,.6,.25),3.0,.25)                                    # zoom join chime
add(sfx,tone(880,.3,.12),17.8,.25); add(sfx,tone(587,.5,.2),17.95,.25)                                   # left meeting blip
add(sfx,boom(1.6,95,40),18.1,.75)                                                                        # boom on "LEFT meeting?!"
add(sfx,whoosh(.5,800,5000),23.3,.3)                                                                     # cut to live
for c in [28.9,29.5,30.1,30.7,31.3,31.9,32.5,33.1,34.6]:                                                  # comment ticks
    for k in range(3): add(sfx,click(),c+k*.05,.35)
for k in range(10):                                                                                      # crickets (after 7th shout)
    t=t_(.09); ch=np.sin(2*np.pi*4300*t)*(0.5+0.5*np.sin(2*np.pi*60*t))*env(.09,.005,.05); add(sfx,ch,33.6+k*.27+(.13 if k%3==2 else 0),.12)
add(sfx,click(),39.6,1.0); add(sfx,tone(1400,.08,.03),39.62,.15)                                          # unmute
t=t_(.7); g=np.sign(np.sin(2*np.pi*180*t*(1+.3*np.sin(2*np.pi*13*t))))*0.5+bp(rng.standard_normal(len(t)),2000,9000)*.6
g=np.round(g*6)/6*np.repeat(rng.random(len(t)//400+1)>.3,400)[:len(t)]; add(sfx,g*env(.7,.001,.4),40.25,.35)   # freeze glitch
add(sfx,boom(.5,220,120),40.95,.25)
for i in range(9): add(sfx,pop(700+i*60),42.8+i*.16,.4)                                                  # sticker pops
add(sfx,boom(1.8,110,42),54.9,.8)                                                                       # punchline drum
for i,tt in enumerate([57.2,57.45,57.7]): add(sfx,boom(.4,200,110)+bp(rng.standard_normal(int(.4*SR)),1500,6000)*env(.4,.001,.05),tt,.45)  # kompang hits on end card
# ---- AMBIENCE ----
def brown(d): x=np.cumsum(rng.standard_normal(int(d*SR))); x=bp(x,40,900); return x/np.abs(x).max()
add(amb,bp(rng.standard_normal(int(20.7*SR)),80,600)*0.05,2.8)                                           # zoom room tone
a=bp(rng.standard_normal(int(11.3*SR)),250,1800); am=0.6+0.4*np.abs(np.sin(2*np.pi*.7*t_(11.3))*np.sin(2*np.pi*1.9*t_(11.3)))
add(amb,(a/np.abs(a).max()*am*0.22+brown(11.3)*0.25),45.9)                                               # mamak murmur + traffic
for k in range(9):                                                                                       # spoon/glass clinks
    at=46.0+rng.random()*11; f=2200+rng.random()*1800; add(amb,tone(f,.5,.12,(1,.5,.2)),at,.08)
add(amb,bp(rng.standard_normal(int(.25*SR)),3000,9000)*env(.25,.01,.1),47.0,.1)                          # teh tarik pour hiss
# ---- MUSIC BED (synth kampung-lofi loop, 104 bpm) ----
def music(d):
    out=np.zeros(int(d*SR)); beat=60/104; notes=[392,440,523,587,659,784]; seq=[0,2,3,2,4,3,2,1]
    i=0; tt=0
    while tt<d-.5:
        b=i%8
        if b in(0,3,6): add_l(out,boom(.3,120,55)*.6,tt)
        if b in(2,6): add_l(out,bp(rng.standard_normal(int(.15*SR)),800,5000)*env(.15,.001,.04)*.5,tt)
        add_l(out,bp(rng.standard_normal(int(.05*SR)),6000,12000)*env(.05,.001,.01)*.25,tt+beat/2)
        add_l(out,tone(notes[seq[(i//1)%8]],beat*.9,.22,(1,.5,.25,.1))*.35,tt)
        tt+=beat; i+=1
    return out
def add_l(buf,x,at): j=int(at*SR); x=x[:max(0,len(buf)-j)]; buf[j:j+len(x)]+=x
m=music(25.4); m*=np.minimum(1,np.minimum(t_(25.4)/0.3,(25.4-t_(25.4))/0.05)); add(mus,m,2.8)         # hard cut at 28.2 = silence joke
m=music(4.7); m*=np.minimum(1,np.minimum(t_(4.7)/1.0,(4.7-t_(4.7))/0.4)); add(mus,m,41.2)
m=music(2.8); m*=np.minimum(1,(2.8-t_(2.8))/0.8); add(mus,m,57.2)
# duck music + ambience under voice
e=np.convolve(np.abs(voice),np.ones(int(.15*SR))/int(.15*SR),'same'); duck=1-0.65*np.clip(e*12,0,1)
mix=voice+sfx+amb*np.maximum(duck,.55)+mus*0.32*duck
mix/=np.abs(mix).max()/0.89
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-c:a','aac','-b:a','192k',OUT],input=mix.astype(np.float32).tobytes())
print('ok')
