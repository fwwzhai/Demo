"""EP003 360 camera: sparse SFX. Run from repo root: python3 episodes/ep003-360-camera/audio/mix.py <out.m4a>"""
import sys; sys.path.insert(0,'tools'); from sfx import *
M=Mix(33.5); fx=lambda x,at,g=1.0: M.add('fx',x,at,g)
t=0.2; gap=.42                                                   # parking sensor beeps speeding up
while t<3.0: fx(tone(2100,.09,.03,(1,.2)),t,.35); t+=gap; gap=max(.09,gap*.8)
fx(tone(2100,.6,.5,(1,.2)),3.0,.3)                               # solid tone = "dah nak langgar"
fx(boom(.5,180,90),6.0,.6)                                       # TAKDE DRONE stamp
for i in range(4): fx(pop(700+i*90),7.3+i*.5,.45)                # 4 cameras
fx(whoosh(.8,500,3000),9.2,.3)                                   # cones open
fx(slide_whistle(900,500,.5),14.9,.25)                           # dewarp "boing straight"
for i in range(4): fx(fwip(),19.3+i*.35,.35)                     # tiles fly in
fx(pop(500),22.2,.5)                                             # CGI car drops
fx(ding(),27.4,.4)                                               # PERFECT
fx(record_scratch(),28.9,.8); fx(rimshot(),31.0,.6)
for tt in (31.7,31.95,32.2): fx(boom(.4,200,110)+noise_hit(.4,1500,6000,.05),tt,.45)
m=kampung_loop(31.5); m*=np.minimum(1,np.minimum(t_(31.5)/.5,(28.9-t_(31.5)).clip(0,.05)/.05)); M.add('mus',m,0,.8)   # cuts at the record scratch
M.render(sys.argv[1]); print('ok')
