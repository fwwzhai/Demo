import sys,json,subprocess,numpy as np
sys.path.insert(0,'/home/user/Demo/tools');from sfx import SR,click,whoosh,boom,noise_hit,bp,norm,t_
TL=json.load(open('timeline.json'));END=TL['end'];N=int(END*SR)
def load(f):
    r=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-f','f32le','-ac','1','-ar',str(SR),'-'],capture_output=True);return np.frombuffer(r.stdout,np.float32).copy()
vo=np.zeros(N)
for v in TL['vo']:
    a=load(f"vf_{v['i']:02d}.wav");s=int(v['s']*SR);vo[s:s+len(a)]+=a[:N-s]
# ---- music: slow pads + soft arpeggio, original synthesis
rng=np.random.default_rng(3)
def hz(m):return 440*2**((m-69)/12)
CH=[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,66]]  # Am7 Fmaj7 Cmaj7 G(maj7)
BAR=8.0;mus=np.zeros(N)
lp=lambda x,f:bp(x,20,f)
nb=int(np.ceil(END/BAR))
for b in range(nb):
    ch=CH[b%4];s=int(b*BAR*SR);L=int((BAR+2)*SR);t=np.arange(L)/SR
    e=np.minimum(1,t/2.5)*np.minimum(1,np.maximum(0,(BAR+2-t)/2.5))
    pad=sum(np.sin(2*np.pi*hz(m)*t*(1+d))*0.5 for m in ch for d in(-.002,.002))+0.6*np.sin(2*np.pi*hz(ch[0]-12)*t)
    seg=pad*e*0.08
    # arpeggio 8ths at 90bpm feel, only in middle sections
    intens=0.0 if b*BAR<10 or b*BAR>END-14 else 1.0
    step=60/90/2
    for k in range(int(BAR/step)):
        m=ch[[0,2,1,3,2,1,3,2][k%8]]+12;ts=int(k*step*SR);d=int(1.2*SR);tt=np.arange(d)/SR
        n=(np.sin(2*np.pi*hz(m)*tt)+.25*np.sin(4*np.pi*hz(m)*tt))*np.exp(-tt/0.35)*np.minimum(1,tt/.004)
        seg[ts:ts+d]+=n[:max(0,min(d,L-ts))]*0.035*intens*(0.7+0.3*rng.random())
    e2=min(L,N-s)
    if e2>0: mus[s:s+e2]+=seg[:e2]
mus=lp(mus,6000)
fade=np.minimum(1,np.arange(N)/SR/2)*np.minimum(1,(END-np.arange(N)/SR)/4);mus*=fade
# ducking from narration envelope
env=np.abs(vo);k=int(.25*SR);env=np.convolve(env,np.ones(k)/k,'same');env=np.clip(env/0.04,0,1)
duck=1-0.55*env;mus*=duck
# ---- sfx
fx=np.zeros(N)
def put(x,at,g):
    s=int(at*SR);e=min(N,s+len(x));
    if s<N: fx[s:e]+=x[:e-s]*g
def clack(): return norm(noise_hit(.06,800,6000,.012))*.8+norm(np.sin(2*np.pi*140*t_(.06))*np.exp(-t_(.06)/.015))*.5
def bell():
    t=t_(1.6);return sum(a*np.sin(2*np.pi*f*t) for f,a in[(2093,1),(2637,.4),(4186,.2)])*np.exp(-t/.5)*np.minimum(1,t/.002)
sh={s['k']:s for s in TL['shots']}
def pop(): return norm(np.sin(2*np.pi*(900*np.exp(-t_(.12)*10))*t_(.12)))*np.exp(-t_(.12)/.04)
def at(k,f): s=sh[k];return s['s']+s['d']*f
for c in TL['chapters']: put(whoosh(.7),c['s']-.1,.12)
h2=sh['hook2'];put(norm(bp(rng.standard_normal(int(2*SR)),150,900))*np.minimum(1,t_(2)/.3)*np.minimum(1,(2-t_(2))/.3),at('hook2',.35),.05)  # drone hum
put(noise_hit(.25,300,4000,.06),at('hook2',.62),.3)  # poof
put(bell(),at('title',.15),.12)
[put(pop(),at('cams',f),.25) for f in (.35,.55,.75,.87)]
put(whoosh(.5),at('reproject',.3),.12);[put(clack(),at('stitch',f),.3) for f in (.15,.25,.35,.45)]
put(pop(),at('overlay',.3),.3)
put(boom(.5,140,60),at('calib',.55),.2)
[put(clack(),at('target',f),.25) for f in (.3,.4,.5,.6)]
put(boom(.8,110,45),at('park',.45),.4);put(noise_hit(.15,500,5000,.04),at('park',.45),.3)
mix=vo*1.0+mus+fx
st=np.stack([mix,mix],1).astype(np.float32);st.tofile('mix.f32')
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','mix.f32','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-ar','48000','-c:a','aac','-b:a','192k','mix.m4a'],check=True)
print('mix ok',END)
