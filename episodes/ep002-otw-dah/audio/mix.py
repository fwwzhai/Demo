"""EP002 Otw Dah: sparse SFX (only where it lands the beat). Run from repo root."""
import sys; sys.path.insert(0,'tools'); from sfx import *
M=Mix(37); fx=lambda x,at,g=1.0: M.add('fx',x,at,g)
fx(crickets(2.5),0.05,.35)                                   # hook: dead silence + crickets
for t in (3.2,9.2,15.2): fx(chime_join(),t,.4)               # Kavi texts
fx(record_scratch(),5.55,.7)                                 # first REALITI cut
fx(boom(.5,140,60),27.85,.8)                                 # tray slam
fx(sad_trombone(),33.2,.6)                                   # wallet punchline + faceplant
for tt in (34.6,34.85,35.1): fx(boom(.4,200,110)+noise_hit(.4,1500,6000,.05),tt,.45)
m=kampung_loop(30.6); m*=np.minimum(1,np.minimum(t_(30.6)/.5,(30.6-t_(30.6))/.05)); M.add('mus',m,2.6)   # cuts dead at the wallet line
for a,b in ((0,5.6),(9,11.6),(15,17.6),(21,34.5)): x=mamak_amb(b-a); x*=np.minimum(1,np.minimum(t_(b-a)/.1,(b-a-t_(b-a))/.1)); M.add('amb',x,a,.5)   # mamak scenes only
M.render(sys.argv[1]); print('ok')
