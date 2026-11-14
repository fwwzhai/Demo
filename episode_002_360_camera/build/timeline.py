import json
exec(open('script.py').read());d=json.load(open('durs.json'))
CH={'cams':('01','The cameras'),'undistort':('02','The magic trick'),'calib':('03','The calibration problem'),'limits':('04','What it can\'t do'),'summary':('05','Putting it together')}
t=0.8;shots=[];chap=[];vo=[]
for i,((k,txt),du) in enumerate(zip(S,d)):
    if k in CH: t+=1.0; chap.append({'n':CH[k][0],'t':CH[k][1],'s':round(t-0.2,3)})
    if k=='title': pass
    vo.append({'i':i,'s':round(t,3),'d':du,'k':k});t+=du+0.75
    if k=='title': t+=0.6
end=t+4.0
for j,v in enumerate(vo):
    s=0 if j==0 else v['s']-0.25
    nxt=vo[j+1]['s']-0.25 if j+1<len(vo) else end
    shots.append({'k':v['k'],'s':round(s,3),'d':round(nxt-s,3)})
for c in chap: c['s']=[s['s'] for s in shots if abs(s['s']-c['s'])<1.5][0]+0.3
TL={'shots':shots,'chapters':chap,'vo':vo,'end':round(end,3)}
open('timeline.js','w').write('window.TL='+json.dumps(TL)+';');json.dump(TL,open('timeline.json','w'));print('end',end)
