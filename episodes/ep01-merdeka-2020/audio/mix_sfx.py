"""EP01 SFX-only cut (no voice-over). Times match animatic-sfx.html. Run from repo root."""
import sys, re; sys.path.insert(0, 'tools'); from sfx import *
M = Mix(48)
# talk blips: same talk-duration formula as the animatic
B = [('uk',3.6,6.4,'Right. Congratulations. You are officially independent.'),('amir',6.6,10,'Eh? Macam tu je? Takde stadium? Takde perarakan?'),
     ('uk',10.1,12.4,'SOP, mate. Max 20 people. Cheerio!'),('amir',12.9,14.6,'Dia LEFT meeting?!',1),('mei',14.7,17,'Typical. Merdeka pun boleh WFH.'),
     ('kavi',17.3,20.3,'Bro relax. I dah buat live. 2 juta tengah tengok.'),('mei',26.6,28,'Amir. Kau mute.'),('amir',28.1,29.4,'...sejak bila?'),
     ('mei',29.5,31,'Sejak "M" yang pertama.'),('amir',31.2,33.2,'MERDEK',1),('kavi',33.3,38,'Takpe bro. Muka ni dah jadi sticker WhatsApp. Satu Malaysia guna.'),
     ('din',38.6,42.2,'1957, satu stadium jerit "Merdeka!" tujuh kali.'),('din',42.4,45.5,'2020... satu negara jerit "BANG, KAU MUTE!"',1)]
for i,b in enumerate(B):
    who,t0,t1,txt=b[:4]; loud=len(b)>4
    d=min(t1-t0-0.2, len(txt)*0.055+0.2)
    if txt=='MERDEK': d=0.55
    M.add('talk', blips(who,d,loud,seed=i), t0, 0.9 if loud else 0.75)
fx=lambda x,at,g=1.0: M.add('fx',x,at,g)
# S1 hook
fx(record_scratch(),0.0,.8); fx(whoosh(.9,600,4000),0.3,.4); fx(ratchet(14,1.1),0.4,.5); fx(ding(),1.55,.45)
# S2 zoom handover
fx(chime_join(),2.9,.35); fx(slide_whistle(400,1100,.45),6.5,.35)          # Amir "Eh?"
fx(chime_leave(),12.45,.4); fx(boom(1.6,95,40),12.9,.9)                    # left meeting + boom
fx(pop(600),14.7,.3)
# S3 live
fx(whoosh(.5,800,5000),16.8,.35); fx(cha_ching(),19.4,.45)                 # Kavi: 2 juta views
for p in [20.5,21.28,22.06,22.84,23.62,24.4,25.18]: fx(fwip(),p,.18)      # the 7 silent shouts: only arm swish
for c in [21.2,21.9,22.5,23.2,23.8,24.4,25.0,25.6,27.2]:
    for k in range(3): fx(click(),c+k*.05,.35)
fx(record_scratch(),26.35,.9); fx(crickets(1.6),27.0,.35)                  # "Amir. Kau mute."
fx(slide_whistle(1300,350,.9),28.1,.35)                                    # deflate
fx(sad_trombone(),29.95,.55)
fx(click(),31.0,1.0); fx(tone(1400,.08,.03),31.02,.2)                      # unmute
fx(glitch(.8),31.8,.5); fx(boing(160,.6),32.4,.35)                         # freeze
for i in range(9): fx(pop(700+i*60),35.0+i*.16,.45)                        # sticker pops
fx(cha_ching(),36.6,.35)
# S5 mamak + punchline
M.add('amb',mamak_amb(7.6),38.0)
fx(rimshot(),45.5,.75)
for tt in [46.0,46.25,46.5]: fx(boom(.4,200,110)+noise_hit(.4,1500,6000,.05),tt,.45)
# beds
M.add('amb',room_tone(14),3.0)
m=kampung_loop(17.5); m*=np.minimum(1,np.minimum(t_(17.5)/.3,(17.5-t_(17.5))/.03)); M.add('mus',m,3.0)   # hard cut at first shout
m=kampung_loop(4.7); m*=np.minimum(1,np.minimum(t_(4.7)/1,(4.7-t_(4.7))/.4)); M.add('mus',m,33.3)
m=kampung_loop(2.5); m*=np.minimum(1,(2.5-t_(2.5))/.8); M.add('mus',m,45.5)
M.render(sys.argv[1] if len(sys.argv)>1 else 'soundtrack-sfx.m4a')
print('ok')
