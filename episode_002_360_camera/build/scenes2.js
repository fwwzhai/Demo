// ---------- EP002 components: stickman, cars, cameras, ground composite ----------
const CC={F:P.teal,B:P.red,L:P.brass,R:'#7fa7d6'};
const CAM={F:[0,-188,-Math.PI/2],B:[0,188,Math.PI/2],L:[-98,-62,Math.PI],R:[98,-62,0]};
const dv=a=>[Math.sin(a),Math.cos(a)]; // angle from straight-down
const POSE={stand:[-.25,-.1,.25,.1,-.18,.18],point:[-.25,-.1,1.55,1.55,-.18,.18],scratch:[-.25,-.1,2.3,-2.6,-.18,.18],shrug:[-1.2,-2.4,1.2,2.4,-.2,.2],
 cheer:[-2.6,-2.8,2.6,2.8,-.25,.25],wide:[-1.6,-1.6,1.6,1.6,-.35,.35],push:[1.3,1.4,1.5,1.6,-.45,.25],clip:[-.25,-.1,.9,2.2,-.18,.18],think:[-.25,-.1,.5,-2.9,-.18,.18]};
function stick(x,y,s,o={}){s*=1.55;const A=POSE[o.pose||'stand'].slice(),B=o.to?POSE[o.to]:null,m=o.m??0;if(B)for(let i=0;i<6;i++)A[i]=lerp(A[i],B[i],eio(m));
 if(o.walk){const w=Math.sin(o.walk*9);A[4]=-.45*w;A[5]=.45*w;A[0]=.35*w-.1;A[2]=-.35*w+.1;A[1]=A[0];A[3]=A[2];}
 X.save();X.translate(x,y-(o.bob?Math.abs(Math.sin(o.bob*6))*10:0));X.scale(s*(o.flip?-1:1),s);if(o.rot)X.rotate(o.rot);
 const c=o.col||P.paper;X.strokeStyle=c;X.lineWidth=7;X.lineCap='round';X.lineJoin='round';
 const sh=[0,-112],hip=[0,-48],seg2=(p,a1,a2,l1,l2)=>{const d1=dv(a1),e=[p[0]+d1[0]*l1,p[1]+d1[1]*l1],d2=dv(a2);X.beginPath();X.moveTo(...p);X.lineTo(...e);X.lineTo(e[0]+d2[0]*l2,e[1]+d2[1]*l2);X.stroke();};
 X.beginPath();X.moveTo(0,-126);X.lineTo(...hip);X.stroke();seg2(sh,A[0],A[1],34,32);seg2(sh,A[2],A[3],34,32);seg2(hip,A[4],A[4]*.6,26,24);seg2(hip,A[5],A[5]*.6,26,24);
 const hr=26*(o.head||1);X.beginPath();X.arc(0,-126-hr,hr,0,7);X.fillStyle=P.ink;X.fill();X.stroke();
 const f=o.face||'',ey=-126-hr;X.fillStyle=c;
 if(f==='dizzy'){X.lineWidth=3;for(const ex of[-9,9]){X.beginPath();for(let k=0;k<20;k++){const a=k*.7+(o.t||0)*8,r=k*.35;X.lineTo(ex*(o.head||1)+Math.cos(a)*r,ey+Math.sin(a)*r);}X.stroke();}}
 else{for(const ex of[-9,9]){X.beginPath();X.arc(ex*(o.head||1),ey-3,f==='wide'?6:4,0,7);X.fill();}}
 X.lineWidth=3.5;X.beginPath();if(f==='happy')X.arc(0,ey+6,9,.2,Math.PI-.2);else if(f==='wide'||f==='dizzy')X.arc(0,ey+12,5,0,7);else{X.moveTo(-7,ey+11);X.lineTo(7,ey+10);}X.stroke();
 X.restore();if(o.mark){const q=o.markP??1;txt(o.mark,x+34*s,y-(200+(o.head||1)*20)*s,{s:70*s*q,w:800,f:SERIF,c:o.mark==='!'?P.red:P.brass,al:'center',a:q});}
 if(o.sweat){X.fillStyle='#8ec5e8';X.beginPath();const sx=x-34*s,sy=y-190*s+((o.t||0)*60%30)*s;X.moveTo(sx,sy-12*s);X.quadraticCurveTo(sx+9*s,sy+4*s,sx,sy+8*s);X.quadraticCurveTo(sx-9*s,sy+4*s,sx,sy-12*s);X.fill();}}
function carTop(cx,cy,s,o={}){X.save();X.translate(cx,cy);X.scale(s,s);if(o.rot)X.rotate(o.rot);X.globalAlpha*=o.a??1;
 X.fillStyle='#0d0e12';for(const[wx,wy]of[[-92,-110],[92,-110],[-92,110],[92,110]]){rr(wx-16,wy-34,32,68,8);X.fill();}
 X.save();X.shadowColor='rgba(0,0,0,.5)';X.shadowBlur=30;rr(-88,-185,176,370,58);X.fillStyle=o.col||P.red;X.fill();X.restore();
 rr(-88,-185,176,370,58);X.strokeStyle='rgba(0,0,0,.35)';X.lineWidth=3;X.stroke();
 X.fillStyle='#23262f';X.beginPath();X.moveTo(-70,-70);X.lineTo(70,-70);X.lineTo(58,-20);X.lineTo(-58,-20);X.fill();
 X.beginPath();X.moveTo(-62,110);X.lineTo(62,110);X.lineTo(54,140);X.lineTo(-54,140);X.fill();
 rr(-58,-20,116,130,14);X.fillStyle='rgba(255,255,255,.12)';X.fill();
 X.fillStyle=o.col||P.red;rr(-112,-74,26,20,6);X.fill();rr(86,-74,26,20,6);X.fill();
 X.fillStyle='#f4e7b0';rr(-70,-182,36,10,4);X.fill();rr(34,-182,36,10,4);X.fill();X.fillStyle='#b33';rr(-74,174,34,9,4);X.fill();rr(40,174,34,9,4);X.fill();
 X.restore();}
function camIcon(x,y,s,ang,col,p=1){if(p<=0)return;X.save();X.translate(x,y);X.rotate(ang);X.scale(s*back(p),s*back(p));rr(-16,-13,26,26,6);X.fillStyle=P.ink;X.fill();X.strokeStyle=col;X.lineWidth=3;X.stroke();
 X.beginPath();X.arc(12,0,9,0,7);X.fillStyle=col;X.fill();X.beginPath();X.arc(12,0,4,0,7);X.fillStyle=P.ink;X.fill();X.restore();}
function cams(cx,cy,s,p={F:1,B:1,L:1,R:1}){for(const k in CAM){const[x,y,a]=CAM[k];camIcon(cx+x*s,cy+y*s,s*1.4,a,CC[k],p[k]??0);}}
function fov(cx,cy,s,k,p,R=520,half=1.62){if(p<=0)return;const[x,y,a]=CAM[k];const px=cx+x*s,py=cy+y*s;X.save();X.globalAlpha*=.22*p;X.fillStyle=CC[k];X.beginPath();X.moveTo(px,py);X.arc(px,py,R*s*eo(p),a-half,a+half);X.closePath();X.fill();
 X.globalAlpha=.7*p;X.strokeStyle=CC[k];X.lineWidth=2;X.setLineDash([10,10]);X.stroke();X.restore();}
// ground plan (world units, car centred at 0,0, front = -y)
const SL={F:[[-90,-185],[90,-185],[330,-470],[-330,-470]],B:[[-90,185],[90,185],[330,470],[-330,470]],L:[[-90,-185],[-90,185],[-330,470],[-330,-470]],R:[[90,-185],[90,185],[330,470],[330,-470]]};
function ground(o={}){X.fillStyle='#2a2d36';X.fillRect(-340,-480,680,960);X.strokeStyle='#e9e2d0';X.lineWidth=8;
 for(const lx of[-250,250]){X.beginPath();X.moveTo(lx,-440);X.lineTo(lx,480);X.stroke();}X.beginPath();X.moveTo(-340,-440);X.lineTo(340,-440);X.stroke();
 X.fillStyle='#4a4e5a';X.fillRect(-340,-480,680,36);if(o.extra)o.extra();}
function poly(pts){X.beginPath();pts.forEach((p,i)=>i?X.lineTo(...p):X.moveTo(...p));X.closePath();}
// o: off{k:[dx,dy,rot,scale,alpha]}, tint 0..1, seam 0..1, hole, car(alpha), extra(fn), kerbBend
function composite(cx,cy,s,o={}){s*=.88;cy+=30;X.save();X.translate(cx,cy);X.scale(s,s);
 for(const k of['F','B','L','R']){const of=(o.off&&o.off[k])||[0,0,0,1,1];if(of[4]<=0)continue;X.save();X.globalAlpha*=of[4];X.translate(of[0],of[1]);X.rotate(of[2]);X.scale(of[3],of[3]);
  poly(SL[k]);X.clip();ground(o);if(o.tint){X.fillStyle=CC[k];X.globalAlpha*=.28*o.tint;X.fillRect(-340,-480,680,960);}X.restore();}
 if(o.seam){X.strokeStyle=`rgba(255,255,255,${.6*o.seam})`;X.lineWidth=3;X.setLineDash([12,10]);for(const[a,b]of[[[-90,-185],[-330,-470]],[[90,-185],[330,-470]],[[-90,185],[-330,470]],[[90,185],[330,470]]]){X.beginPath();X.moveTo(...a);X.lineTo(...b);X.stroke();}X.setLineDash([]);}
 if(o.hole){rr(-92,-188,184,376,58);X.fillStyle='#08090c';X.fill();txt('no camera data',0,0,{s:22,w:600,c:P.mute,al:'center',bl:'middle',a:o.hole});}
 if(o.car)carTop(0,o.carY||0,1,{a:o.car});X.restore();}
function screenFrame(x,y,w,h,label){X.save();X.shadowColor='rgba(0,0,0,.6)';X.shadowBlur=40;rr(x-18,y-18,w+36,h+36,26);X.fillStyle='#0b0c10';X.fill();X.restore();rr(x-18,y-18,w+36,h+36,26);X.strokeStyle='#3a3f4c';X.lineWidth=3;X.stroke();
 if(label)txt(label,x+w/2,y+h+70,{s:28,w:600,c:P.mute,al:'center'});}
function carSide(x,y,s,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);const c=o.col||P.red;
 X.fillStyle=c;X.beginPath();X.moveTo(-215,-30);X.lineTo(-205,-80);X.lineTo(-120,-88);X.lineTo(-70,-150);X.lineTo(80,-150);X.lineTo(140,-90);X.lineTo(210,-78);X.lineTo(220,-30);X.quadraticCurveTo(220,-10,200,-10);X.lineTo(-200,-10);X.quadraticCurveTo(-215,-10,-215,-30);X.fill();
 X.fillStyle='#23262f';X.beginPath();X.moveTo(-100,-90);X.lineTo(-62,-138);X.lineTo(0,-138);X.lineTo(0,-90);X.fill();X.beginPath();X.moveTo(12,-90);X.lineTo(12,-138);X.lineTo(74,-138);X.lineTo(122,-90);X.fill();
 if(o.driver){X.save();X.beginPath();X.moveTo(12,-90);X.lineTo(12,-138);X.lineTo(74,-138);X.lineTo(122,-90);X.clip();X.translate(60,-104);X.rotate(o.driver.turn||0);X.beginPath();X.arc(0,0,20,0,7);X.fillStyle=P.ink;X.fill();X.strokeStyle=P.paper;X.lineWidth=5;X.stroke();X.fillStyle=P.paper;X.beginPath();X.arc(8,-3,3.5,0,7);X.fill();X.restore();}
 for(const wx of[-130,130]){X.beginPath();X.arc(wx,-8,38,0,7);X.fillStyle='#0d0e12';X.fill();X.beginPath();X.arc(wx,-8,16,0,7);X.fillStyle='#5a5f6b';X.fill();}
 X.fillStyle=c;rr(110,-104,22,14,4);X.fill();if(o.cam)camIcon(122,-88,1.1,Math.PI/2,CC.R,1);X.restore();}
function drone(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);X.strokeStyle=P.paper;X.lineWidth=5;X.beginPath();X.moveTo(-60,0);X.lineTo(60,0);X.stroke();rr(-26,-12,52,24,8);X.fillStyle=P.ink2;X.fill();X.stroke();
 for(const px of[-60,60]){X.beginPath();X.ellipse(px,-8,36*Math.abs(Math.cos(t*40)),5,0,0,7);X.stroke();}camIcon(0,18,.8,Math.PI/2,P.brass,1);X.restore();}
function puff(x,y,p){if(p<=0||p>=1)return;for(let i=0;i<9;i++){const a=i/9*7,r=20+90*eo(p);X.beginPath();X.arc(x+Math.cos(a)*r,y+Math.sin(a)*r,(30+i%3*8)*(1-p),0,7);X.fillStyle=`rgba(239,230,212,${.8*(1-p)})`;X.fill();}}
function warp(x,y,k){const r2=x*x+y*y,f=1/(1+k*r2);return[x*f,y*f];}
function grid(cx,cy,w,h,k,o={}){X.save();X.beginPath();X.rect(cx-w/2,cy-h/2,w,h);X.clip();X.fillStyle=o.bg||'#20232b';X.fillRect(cx-w/2,cy-h/2,w,h);
 const n=o.n||10,L=(pts,col,lw)=>{X.strokeStyle=col;X.lineWidth=lw;X.beginPath();pts.forEach((p,i)=>{const[u,v]=warp(p[0],p[1],k),px=cx+u*w/2*(1+k*.55),py=cy+v*h/2*(1+k*.55);i?X.lineTo(px,py):X.moveTo(px,py);});X.stroke();};
 for(let i=0;i<=n;i++){const a=-1+2*i/n,pa=[],pb=[];for(let j=0;j<=40;j++){const b=-1+2*j/40;pa.push([a,b]);pb.push([b,a]);}L(pa,'rgba(255,255,255,.14)',2);L(pb,'rgba(255,255,255,.14)',2);}
 for(const lx of(o.lines||[-.5,.5])){const pa=[];for(let j=0;j<=40;j++)pa.push([lx,-1+2*j/40]);L(pa,'#e9e2d0',8);}
 if(o.h!==undefined){const pa=[];for(let j=0;j<=40;j++)pa.push([-1+2*j/40,o.h]);L(pa,'#e9e2d0',8);}
 X.restore();}
function feed(x,y,w,h,k,label,col,p=1){X.save();X.globalAlpha*=p;rr(x,y,w,h,14);X.save();X.clip();grid(x+w/2,y+h/2,w,h,k,{n:8,lines:[-.55,.55],h:-.35});
 X.fillStyle=col;X.globalAlpha*=.18;X.fillRect(x,y,w,h);X.globalAlpha=p;X.beginPath();X.ellipse(x+w/2,y+h+40,w*.62,90,0,0,7);X.fillStyle='#3a1f22';X.fill();
 const g=X.createRadialGradient(x+w/2,y+h/2,h*.3,x+w/2,y+h/2,w*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.85)');X.fillStyle=g;X.fillRect(x,y,w,h);X.restore();
 rr(x,y,w,h,14);X.strokeStyle=col;X.lineWidth=3;X.stroke();txt(label,x+20,y+42,{s:24,w:800,c:col,ls:3});X.restore();}
function bigEye(x,y,s,p,t){if(p<=0)return;X.save();X.translate(x,y);X.scale(s*eo(p),s*eo(p));X.beginPath();X.moveTo(-160,0);X.quadraticCurveTo(0,-120,160,0);X.quadraticCurveTo(0,120,-160,0);X.fillStyle=P.paper;X.fill();X.strokeStyle=P.ink;X.lineWidth=6;X.stroke();
 const lx=Math.sin((t||0)*1.5)*20;X.beginPath();X.arc(lx,0,52,0,7);X.fillStyle=P.brass;X.fill();X.beginPath();X.arc(lx,0,24,0,7);X.fillStyle=P.ink;X.fill();X.beginPath();X.arc(lx+12,-14,9,0,7);X.fillStyle='#fff';X.fill();X.restore();}
function hatch(pts,col){X.save();poly(pts);X.clip();X.strokeStyle=col;X.lineWidth=3;for(let i=-2000;i<2000;i+=18){X.beginPath();X.moveTo(i,-1000);X.lineTo(i+1000,1000);X.stroke();}X.restore();}
// ---------- scenes ----------
const S={
hook(t,D){bg();const p=eio(seg(t,.3,D*.55)),cy=lerp(1400,560,p);X.save();X.translate(560,0);X.scale(.95,.95);X.translate(0,40);
 X.save();X.translate(0,560);ground();X.restore();carTop(0,cy,1,{rot:(1-p)*.25});X.restore();
 const q=eo(seg(t,D*.5,D*.5+.8));if(q>0){X.globalAlpha=q;const sx=1120,sy=210,sw=620,sh=660;screenFrame(sx,sy,sw,sh,'What your screen shows');X.save();rr(sx,sy,sw,sh,10);X.clip();
  composite(sx+sw/2,sy+sh/2,.66,{car:1});X.restore();txt('BIRD’S-EYE VIEW',sx+24,sy+40,{s:22,w:800,c:P.brass,ls:3});X.globalAlpha=1;}
 kicker('PARKING, SOMEHOW FROM ABOVE',120,110);},
hook2(t,D){bg();const gy=820;X.fillStyle='#22252e';X.fillRect(0,gy,W,H-gy);carSide(820,gy,1.5);
 const ph=D*.62,dp=eo(seg(t,D*.12,D*.35)),dy=lerp(-200,330,dp)+Math.sin(t*3)*12;
 if(t<ph){drone(820,dy,1.3,t);if(dp>.9){X.save();X.globalAlpha=.25;X.fillStyle=P.brass;X.beginPath();X.moveTo(820,dy+30);X.lineTo(560,gy-230);X.lineTo(1080,gy-230);X.fill();X.restore();}}
 puff(820,dy,seg(t,ph,ph+.6));
 const nd=eo(seg(t,ph+.1,ph+.6));txt('NO DRONE.',820,260,{s:80,w:800,f:SERIF,al:'center',c:P.red,a:nd});txt('No pole. No camera up there.',820,330,{s:34,w:500,al:'center',a:nd});
 const look=t<ph?'think':'shrug';stick(1500,gy,1.25,{pose:'stand',to:look,m:seg(t,.3,1)+0,face:t>ph?'wide':'',mark:'?',markP:eo(seg(t,D*.7,D*.75))});
 txt('?',1430,560,{s:90,w:800,f:SERIF,c:P.brass,a:eo(seg(t,.5,1))*(t<ph?1:0)});},
title(t,D){bg();txt('THE UNNECESSARY LAB  ·  EPISODE 002',W/2,200,{s:26,w:700,c:P.brass,al:'center',ls:6,a:seg(t,0,1)});
 carTop(W/2,560,.75,{a:eo(seg(t,.2,.8))});const cp={};['F','R','B','L'].forEach((k,i)=>cp[k]=seg(t,.6+i*.3,.9+i*.3));cams(W/2,560,.75,cp);
 X.save();X.translate(W/2,560);X.rotate(t*.4);X.setLineDash([16,14]);X.strokeStyle=P.brass;X.lineWidth=4;X.globalAlpha=eo(seg(t,1.6,2.4));X.beginPath();X.arc(0,0,280,0,7);X.stroke();X.restore();
 txt('360°',W/2+330,420,{s:96,w:800,f:SERIF,c:P.brass,a:eo(seg(t,2,2.6))});
 txt('Cameras that aren’t even there',W/2,960,{s:64,w:700,f:SERIF,al:'center',a:eo(seg(t,1,1.8))});},
cams(t,D){bg();kicker('FOUR CAMERAS, ONE ON EACH SIDE',120,150);const cx=W/2,cy=580,s=1.25;carTop(cx,cy,s);
 const L=[['F','Front · grille or badge',0,-330,.35],['R','Right mirror',420,-80,.87],['B','Rear · plate or tailgate',0,340,.55],['L','Left mirror',-420,-80,.75]],cp={};
 L.forEach(([k,l,dx,dy,f])=>{const q=seg(t,D*f,D*f+.4);cp[k]=q;X.globalAlpha=eo(q);txt(l,cx+dx,cy+dy+(dy<0&&dx==0?-10:0),{s:34,w:700,al:'center',c:CC[k]});X.globalAlpha=1;});cams(cx,cy,s,cp);
 const pk=['F','B','L','R'][Math.min(3,Math.floor(seg(t,D*.35,D)*4))];stick(300,940,.9,{pose:t>D*.3?'point':'stand',bob:t>D*.95?t:0});},
note(t,D){bg();kicker('LAYOUTS VARY',120,150);txt('Not every car does it the same way',120,240,{s:62,w:700,f:SERIF,a:eo(t)});
 const V=[[{F:1,B:1,L:1,R:1},'Four cameras','the classic layout'],[{F:1,B:1,L:1,R:1},'Extra cameras','on some vehicles'],[{F:1,B:1,L:1,R:1},'Different positions','by manufacturer']];
 V.forEach(([c,a,b],i)=>{const q=eo(seg(t,.3+i*D*.2,.9+i*D*.2)),x=W/2+(i-1)*540,y=600;X.globalAlpha=q;carTop(x,y,.7);cams(x,y,.7,c);
  if(i==1){camIcon(x-55,y-128,1,-2.2,P.paper,1);camIcon(x+55,y-128,1,-.9,P.paper,1);}if(i==2){camIcon(x,y-12,1,-Math.PI/2,P.paper,1);}
  txt(a,x,y+330,{s:38,w:700,f:SERIF,al:'center',c:i?P.paper:P.brass});txt(b,x,y+372,{s:26,w:500,al:'center',c:P.mute});X.globalAlpha=1;});
 txt('Illustrative layouts',60,1010,{s:20,c:P.mute,w:500});},
fisheye(t,D){bg();kicker('WIDE-ANGLE (“FISHEYE”) LENSES',120,150);const cx=W/2-150,cy=650,s=.85;
 ['F','R','B','L'].forEach((k,i)=>fov(cx,cy,s,k,seg(t,D*(.1+i*.12),D*(.1+i*.12)+.7),390));carTop(cx,cy,s);cams(cx,cy,s);
 const q=eo(seg(t,D*.3,D*.3+.6));if(q>0){X.save();X.globalAlpha=q;X.strokeStyle=P.paper;X.lineWidth=4;const px=cx,py=cy-188*s;X.beginPath();X.arc(px,py,120,Math.PI,0);X.stroke();txt('≈180°',px,py-140,{s:48,w:800,f:SERIF,al:'center',c:P.teal});X.restore();}
 txt('Four views → a full circle',1500,330,{s:40,w:700,f:SERIF,al:'center',a:eo(seg(t,D*.7,D*.7+.6))});
 stick(1500,900,1.1,{pose:'stand',to:'wide',m:seg(t,D*.5,D*.5+.5),face:'happy'});},
bend(t,D){bg();kicker('THE CATCH: DISTORTION',120,150);const k=lerp(0,.9,eio(seg(t,.5,D*.6)));
 grid(700,600,900,700,k,{lines:[-.6,-.2,.2,.6],h:.5});X.strokeStyle=P.line;X.lineWidth=3;rr(250,250,900,700,6);X.stroke();
 txt(k<.2?'Straight lines…':'…bend.',700,1010,{s:40,w:700,f:SERIF,al:'center',c:k<.2?P.paper:P.brass});
 const hb=1+1.3*eio(seg(t,D*.45,D*.75));stick(1550,880,1.1,{head:hb,face:hb>1.6?'wide':'',sweat:hb>1.8,t});
 txt('lens',1550,300,{s:26,c:P.mute,al:'center',w:500,a:seg(t,D*.4,D*.5)});X.beginPath();X.ellipse(1550,360,70,22,0,0,7);X.strokeStyle=P.teal;X.lineWidth=4;X.globalAlpha=seg(t,D*.4,D*.5);X.stroke();X.globalAlpha=1;},
raw(t,D){bg();kicker('WHAT THE CAMERAS ACTUALLY SEE',120,150);const F=[['FRONT','F'],['RIGHT','R'],['REAR','B'],['LEFT','L']];
 F.forEach(([l,k],i)=>{const x=200+(i%2)*700,y=230+Math.floor(i/2)*380;feed(x,y,640,340,.75,l,CC[k],eo(seg(t,.2+i*.35,.7+i*.35)));});
 stick(1700,900,1,{pose:'stand',to:'scratch',m:seg(t,D*.5,D*.5+.5),mark:'?',markP:eo(seg(t,D*.55,D*.6))});
 txt('Simulated camera views',60,1010,{s:20,c:P.mute,w:500});},
undistort(t,D){bg();kicker('STEP 1 · CORRECT THE DISTORTION',120,150);const m=eio(seg(t,D*.3,D*.75)),k=lerp(.9,0,m);
 grid(W/2-160,590,1000,640,k,{lines:[-.6,-.2,.2,.6],h:.5});X.strokeStyle=P.line;X.lineWidth=3;rr(W/2-660,270,1000,640,6);X.stroke();
 const sx=1500;txt('LENS MODEL',sx,330,{s:26,w:800,c:P.brass,ls:3,a:eo(seg(t,.3,1))});rr(sx,370,300,12,6);X.fillStyle='#232733';X.fill();rr(sx,370,300*(1-m),12,6);X.fillStyle=P.teal;X.fill();
 X.beginPath();X.arc(sx+300*(1-m),376,16,0,7);X.fillStyle=P.paper;X.fill();txt('distortion',sx,420,{s:22,c:P.mute,w:500});
 txt(m<.5?'warped':'straightened',W/2-160,980,{s:40,w:700,f:SERIF,al:'center',c:m<.5?P.paper:P.teal});
 stick(1650,900,1,{pose:'stand',to:'clip',m:seg(t,1,1.5)});},
homography(t,D){bg();kicker('STEP 2 · CHANGE THE POINT OF VIEW',120,150);
 // left: side diagram of camera rays onto flat ground
 const gy=760;X.strokeStyle=P.mute;X.lineWidth=3;X.beginPath();X.moveTo(120,gy);X.lineTo(820,gy);X.stroke();carSide(280,gy,.75,{cam:1});
 const cx=280+122*.75,cy=gy-88*.75,rp=eo(seg(t,.5,D*.35));for(let i=0;i<5;i++){const gx=cx+60+i*120;X.strokeStyle=P.brass;X.lineWidth=2;X.globalAlpha=.8;X.beginPath();X.moveTo(cx,cy);X.lineTo(lerp(cx,gx,rp),lerp(cy,gy,rp));X.stroke();X.globalAlpha=1;if(rp>.98){X.beginPath();X.arc(gx,gy,7,0,7);X.fillStyle=P.brass;X.fill();}}
 txt('assume: the ground is flat',470,840,{s:30,w:600,al:'center',c:P.paper,a:eo(seg(t,D*.15,D*.25))});
 // right: trapezoid -> rectangle
 const m=eio(seg(t,D*.42,D*.75)),ox=1350,oy=560,top=lerp(120,330,m),bot=330,hh=lerp(200,300,m);X.save();X.translate(ox,oy);
 const Q=(u,v)=>{const w=lerp(top,bot,(v+1)/2);return[u*w,v*hh];};X.lineWidth=2;for(let i=0;i<=8;i++){const a=-1+i/4;X.strokeStyle='rgba(255,255,255,.18)';X.beginPath();X.moveTo(...Q(a,-1));X.lineTo(...Q(a,1));X.stroke();
  X.beginPath();X.moveTo(...Q(-1,a));X.lineTo(...Q(1,a));X.stroke();}X.strokeStyle='#e9e2d0';X.lineWidth=8;for(const u of[-.5,.5]){X.beginPath();X.moveTo(...Q(u,-1));X.lineTo(...Q(u,1));X.stroke();}
 X.strokeStyle=P.teal;X.lineWidth=4;X.beginPath();X.moveTo(...Q(-1,-1));X.lineTo(...Q(1,-1));X.lineTo(...Q(1,1));X.lineTo(...Q(-1,1));X.closePath();X.stroke();X.restore();
 txt(m<.5?'camera’s angled view':'as seen from straight above',ox,oy+380,{s:32,w:600,al:'center',c:m<.5?P.paper:P.teal});
 const hq=eo(seg(t,D*.82,D*.82+.6));X.globalAlpha=hq;card(ox-260,170,520,110,{fill:P.ink2,stroke:P.line});txt('homography',ox,240,{s:46,w:700,f:SERIF,al:'center',c:P.brass});X.globalAlpha=1;},
reproject(t,D){bg();kicker('FOUR SLICES OF GROUND',120,150);const off={};
 ['F','R','B','L'].forEach((k,i)=>{const p=eio(seg(t,D*(.12+i*.12),D*(.12+i*.12)+1)),d={F:[0,-1],B:[0,1],L:[-1,0],R:[1,0]}[k];off[k]=[d[0]*400*(1-p),d[1]*300*(1-p),(1-p)*.3*(i%2?1:-1),lerp(.6,1,p),p];});
 composite(W/2-120,580,.9,{off,tint:1,seam:seg(t,D*.6,D*.8),hole:seg(t,D*.6,D*.8)});
 const q=eo(seg(t,D*.5,D*.5+.6));bigEye(1560,330,.55,q,t);X.globalAlpha=q*.5;X.setLineDash([10,10]);X.strokeStyle=P.paper;X.lineWidth=2;X.beginPath();X.moveTo(1560,370);X.lineTo(W/2-120,580);X.stroke();X.setLineDash([]);
 txt('a virtual viewpoint',1560,470,{s:30,w:600,al:'center',c:P.paper});txt('that doesn’t exist',1560,510,{s:30,w:600,al:'center',c:P.brass});X.globalAlpha=1;},
stitch(t,D){bg();kicker('STEP 3 · STITCH AND BLEND',120,150);const tn=1-eio(seg(t,D*.5,D*.8));
 composite(W/2-200,580,.9,{tint:tn,seam:1-seg(t,D*.6,D*.9),hole:1});
 const zq=eo(seg(t,D*.15,D*.35));X.globalAlpha=zq;for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){X.beginPath();X.arc(W/2-200+sx*200,580+sy*300,46,0,7);X.strokeStyle=P.paper;X.lineWidth=3;X.stroke();}txt('overlaps',W/2-200+300,580-370,{s:28,w:600,c:P.paper});X.globalAlpha=1;
 const cz=seg(t,D*.2,D);const st=cz<.33?'stand':cz<.66?'scratch':'shrug';stick(1550,900,1.1,{pose:st,face:cz>.66?'dizzy':cz>.33?'wide':'',sweat:cz>.4,t,mark:cz>.5?'?!':'?',markP:eo(seg(t,D*.25,D*.3))});
 txt('brightness & colour evened out',W/2-200,1010,{s:30,w:600,al:'center',c:P.teal,a:eo(seg(t,D*.55,D*.65))});},
overlay(t,D){bg();kicker('THE CAR? A GRAPHIC.',120,150);const d=seg(t,D*.25,D*.25+.6),cy=lerp(-900,0,back(d));
 composite(W/2-150,580,.9,{hole:1-seg(t,D*.25+.4,D*.25+.6),car:d>0?1:0,carY:cy});
 txt('Not a photo.',1500,430,{s:60,w:700,f:SERIF,al:'center',a:eo(seg(t,D*.45,D*.45+.5))});txt('A picture, pasted in.',1500,510,{s:44,w:600,al:'center',c:P.brass,a:eo(seg(t,D*.55,D*.55+.5))});
 txt('Composite · generated in real time',1500,800,{s:30,w:600,al:'center',c:P.teal,a:eo(seg(t,D*.8,D*.8+.5))});
 stick(1500,1020,.8,{pose:d>0.9?'point':'stand',face:d>.9?'wide':''});},
calib(t,D){bg();kicker('THE CALIBRATION PROBLEM',120,150);const j=seg(t,D*.15,D),wob=k=>[Math.sin(t*2+k)*14*j,Math.cos(t*1.7+k)*12*j,Math.sin(t*1.3+k)*.04*j,1,1];
 const pushed=seg(t,D*.5,D*.6);const off={F:wob(0),B:wob(2),L:wob(4),R:[...wob(1)]};off.R[0]+=60*Math.sin(Math.PI*pushed);off.L[0]-=90*pushed;off.L[2]-=.15*pushed;
 composite(W/2-250,580,.85,{off,hole:1});
 stick(1400,900,1.1,{pose:t>D*.45?'push':'stand',face:t>D*.6?'wide':'',sweat:t>D*.6,t});txt('!',1180,520,{s:120,w:800,f:SERIF,c:P.red,a:seg(t,D*.55,D*.6)});
 txt('Slightly off = nothing lines up',1500,300,{s:38,w:700,f:SERIF,al:'center',a:eo(seg(t,D*.6,D*.6+.6))});},
target(t,D){bg();kicker('CALIBRATION TARGETS',120,150);const cx=W/2-200,cy=580,s=.9;
 ['F','R','B','L'].forEach((k,i)=>fov(cx,cy,s,k,seg(t,D*.15,D*.3),390));carTop(cx,cy,s);cams(cx,cy,s);
 const B=[[-1,-1],[1,-1],[-1,1],[1,1]];B.forEach(([a,b],i)=>{const q=back(seg(t,D*(.3+i*.1),D*(.3+i*.1)+.4));if(q<=0)return;X.save();X.translate(cx+a*260,cy+b*360);X.scale(q,q);
  for(let r=0;r<4;r++)for(let c=0;c<4;c++){X.fillStyle=(r+c)%2?P.paper:P.ink;X.fillRect(-60+c*30,-60+r*30,30,30);}X.strokeStyle=P.paper;X.lineWidth=2;X.strokeRect(-60,-60,120,120);
  if(t>D*.72){X.beginPath();X.arc(48,-48,20,0,7);X.fillStyle=P.teal;X.fill();X.strokeStyle=P.ink;X.lineWidth=5;X.beginPath();X.moveTo(38,-48);X.lineTo(46,-40);X.lineTo(58,-56);X.stroke();}X.restore();});
 const q=eo(seg(t,D*.75,D*.75+.6));X.globalAlpha=q;card(1300,380,520,200,{fill:P.ink2,stroke:P.line});txt('Each camera’s',1340,450,{s:32,w:500});txt('position & angle',1340,500,{s:40,w:700,f:SERIF,c:P.brass});txt('worked out',1340,545,{s:32,w:500});X.globalAlpha=1;
 stick(1560,960,.85,{pose:'clip'});},
recal(t,D){bg();kicker('WHEN IT NEEDS DOING AGAIN',120,150);const I=[['Mirror replaced',.1],['Bumper repaired',.25],['Camera knocked',.4]];
 I.forEach(([s,f],i)=>{const q=eo(seg(t,D*f,D*f+.5));X.globalAlpha=q;card(120,260+i*150,560,110,{fill:P.ink2,stroke:P.line});txt(s,160,328+i*150,{s:38,w:700,f:SERIF});X.globalAlpha=1;});
 // ball knocks camera gag
 const bp=seg(t,D*.4,D*.52),bx=lerp(560,330,bp),by=760-Math.sin(Math.PI*bp)*120;if(t>D*.38&&t<D*.62){X.beginPath();X.arc(bx,by,22,0,7);X.fillStyle=P.paper;X.fill();}
 stick(640,900,.8,{pose:t>D*.38?'stand':'push',face:t>D*.52?'wide':'',flip:1});X.save();X.translate(300,760);X.rotate(t>D*.52?.5:0);camIcon(0,0,1.6,Math.PI,CC.L,1);X.restore();
 const m=eo(seg(t,D*.55,D*.75)),off={F:[0,0,0,1,1],B:[0,0,0,1,1],L:[-30*m,18*m,-.06*m,1,1],R:[0,0,0,1,1]};composite(1350,580,.75,{off,hole:1,car:1});
 txt('lines that don’t meet',1350,1000,{s:32,w:600,al:'center',c:P.red,a:seg(t,D*.75,D*.85)});},
limits(t,D){bg();kicker('THE FLAT-GROUND ASSUMPTION',120,150);const gy=800;X.fillStyle='#22252e';X.fillRect(0,gy,W,H-gy);carSide(420,gy,1.1,{cam:1});
 const cx=420+122*1.1,cy=gy-88*1.1,px=820,ph=62,rp=eo(seg(t,D*.35,D*.7));X.fillStyle=P.brass;rr(px-22,gy-ph,44,ph,10);X.fill();
 const tx=px,ty=gy-ph,gx=cx+(tx-cx)*(gy-cy)/(ty-cy+.001);X.strokeStyle=P.paper;X.lineWidth=3;X.setLineDash([12,10]);X.beginPath();X.moveTo(cx,cy);X.lineTo(lerp(cx,gx,rp),lerp(cy,gy,rp));X.stroke();X.setLineDash([]);
 if(rp>.95){X.fillStyle='rgba(212,168,75,.5)';rr(px,gy-6,gx-px,12,6);X.fill();txt('where the system thinks the top is',(px+gx)/2+80,gy+60,{s:28,w:600,al:'center',c:P.brass});}
 X.beginPath();X.arc(cx,cy,10,0,7);X.fillStyle=CC.R;X.fill();stick(1560,gy,1,{pose:'stand',to:'point',m:seg(t,D*.2,D*.3),flip:1});
 txt('Painted lines ✓   Tall objects ✗',W/2,330,{s:48,w:700,f:SERIF,al:'center',a:eo(seg(t,D*.15,D*.3))});},
stretch(t,D){bg();kicker('STRETCHED, DOUBLED, VANISHED',120,150);const m=eio(seg(t,D*.15,D*.5));
 composite(W/2-250,580,.9,{car:1,extra:()=>{X.save();X.translate(200,-300);X.rotate(-.6);X.fillStyle=P.brass;rr(-18,-18-200*m,36,36+200*m,18);X.fill();X.restore();
  X.save();X.translate(-200,250);X.rotate(.75);X.strokeStyle=P.paper;X.lineWidth=7;X.lineCap='round';const L=60+260*m;X.beginPath();X.moveTo(0,-L);X.lineTo(0,0);X.moveTo(-25,-L*.6);X.lineTo(25,-L*.6);X.stroke();X.beginPath();X.arc(0,-L-14,16,0,7);X.stroke();X.restore();
  const gq=seg(t,D*.6,D*.8);X.globalAlpha=.6*gq;X.fillStyle=P.teal;X.beginPath();X.arc(-210,-280,22,0,7);X.fill();X.globalAlpha=gq*.35;X.beginPath();X.arc(-245,-250,22,0,7);X.fill();X.globalAlpha=1;}});
 txt('bollard',1500,330,{s:38,w:700,f:SERIF,c:P.brass,a:eo(seg(t,D*.3,D*.4))});txt('a person',1500,420,{s:38,w:700,f:SERIF,c:P.paper,a:eo(seg(t,D*.4,D*.5))});txt('object near a seam',1500,510,{s:38,w:700,f:SERIF,c:P.teal,a:eo(seg(t,D*.65,D*.75))});
 txt('Simplified illustration',60,1010,{s:20,c:P.mute,w:500});stick(1600,960,.8,{pose:'stand',face:t>D*.45?'wide':'',mark:t>D*.45?'!':'',markP:1});},
blind(t,D){bg();kicker('BLIND SPOTS & BAD CONDITIONS',120,150);const cx=600,cy=580,s=.95;composite(cx,cy,s,{car:1});
 const q=seg(t,D*.1,D*.3);if(q>0){X.save();X.globalAlpha=q;X.translate(cx,cy);X.scale(s,s);for(const p of[[[-92,-120],[-130,-120],[-130,-30],[-92,-30]],[[92,60],[130,60],[130,180],[92,180]],[[-60,186],[60,186],[50,215],[-50,215]]]){hatch(p,P.red);}X.restore();}
 txt('close to the body',cx+280,cy+150,{s:28,w:600,c:P.red,a:q});
 const I=[['Dirt',.35],['Rain',.47],['Low sun',.59]];I.forEach(([s2,f],i)=>{const qq=eo(seg(t,D*f,D*f+.4)),y=360+i*130;X.globalAlpha=qq;camIcon(1420,y,1.8,0,P.paper,1);
  if(i==0){X.fillStyle='#6b4f2a';X.beginPath();X.arc(1445,y,20,0,7);X.fill();}if(i==1){X.fillStyle='#8ec5e8';for(let k=0;k<5;k++){X.beginPath();X.arc(1400+k*14,y-30+((t*80+k*20)%60),5,0,7);X.fill();}}if(i==2){X.fillStyle='rgba(255,230,150,.8)';X.beginPath();X.arc(1460,y,30,0,7);X.fill();}
  txt(s2,1510,y+14,{s:40,w:700,f:SERIF});X.globalAlpha=1;});
 txt('A reconstruction, not a live view from above',1450,900,{s:36,w:600,al:'center',c:P.brass,a:eo(seg(t,D*.75,D*.85))});txt('Illustrative',60,1050,{s:18,c:P.mute,w:500});},
park(t,D){bg();kicker('REALITY CHECK',120,150);const gy=820;X.fillStyle='#22252e';X.fillRect(0,gy,W,H-gy);const hit=D*.45;
 const rv=eio(seg(t,.3,hit)),sh=t>hit&&t<hit+.5?Math.sin(t*80)*8*(1-(t-hit)/.5):0;X.fillStyle='#e0b13a';rr(320,gy-180,26,180,8);X.fill();
 const turn=t>D*.65?-2.6*eo(seg(t,D*.65,D*.75)):0;carSide(lerp(1100,560,rv)+sh,gy,1.2,{driver:{turn}});
 const sc=eo(seg(t,.3,1))*(t<hit?1:1);X.globalAlpha=sc;screenFrame(1300,230,420,300,'');X.save();rr(1300,230,420,300,8);X.clip();composite(1510,380,.33,{car:1});X.restore();txt('“Looks fine!”',1510,600,{s:36,w:700,f:SERIF,al:'center',c:P.teal});X.globalAlpha=1;
 if(t>hit){const q=seg(t,hit,hit+.3);X.save();X.translate(420,560);X.rotate(-.1);txt('BONK!',0,0,{s:120*back(q),w:800,f:SERIF,c:P.red,al:'center'});X.restore();for(let k=0;k<3;k++){const a=t*4+k*2.1;txt('✦',780+Math.cos(a)*60,620+Math.sin(a)*20,{s:30,c:P.brass,a:1-seg(t,hit+1.5,hit+2.5)});}}
 txt('Turn your head.',W/2+200,330,{s:56,w:700,f:SERIF,al:'center',c:P.brass,a:eo(seg(t,D*.75,D*.85))});},
summary(t,D){bg();kicker('PUTTING IT TOGETHER',120,150);const K=[['Capture','4 wide-angle cameras',P.teal],['Correct','undo lens distortion',P.paper],['Reproject','onto flat virtual ground',P.brass],['Stitch','blend the overlaps',CC.R],['Overlay','add a car graphic',P.red]];
 K.forEach(([a,b,c],i)=>{const st=D*(.12+i*.16),q=back(seg(t,st,st+.5));if(q<=0)return;const x=230+i*365,y=560;X.save();X.translate(x,y);X.scale(q,q);card(-160,-160,320,320,{fill:P.ink2,stroke:c});
  txt(String(i+1),0,-60,{s:90,w:800,f:SERIF,al:'center',c});txt(a,0,40,{s:42,w:700,f:SERIF,al:'center'});txt(b,0,90,{s:22,w:500,al:'center',c:P.mute});X.restore();
  if(i<4)arrow(x+170,y,x+195,y,eo(seg(t,st+.4,st+.7)),P.mute);});
 stick(W/2,1000,.6,{pose:t>D*.9?'cheer':'stand',face:'happy',bob:t>D*.9?t:0});},
end(t,D){bg();const cx=W/2+120,cy=640;carTop(cx,cy,.8);cams(cx,cy,.8);['F','R','B','L'].forEach(k=>fov(cx,cy,.8,k,1,380));
 bigEye(cx,250,.7,seg(t,.3,1.2)*(1-seg(t,D*.25,D*.3))+.001,t);X.globalAlpha=1-seg(t,D*.25,D*.3);strike(cx,250,160,seg(t,D*.2,D*.25));X.globalAlpha=1;
 const L=[['Four cameras',D*.45,P.teal],['some clever mathematics',D*.58,P.brass],['a computer working very hard',D*.72,P.paper]];L.forEach(([s,f,c],i)=>txt(s,120,520+i*80,{s:44,w:700,f:SERIF,c,a:eo(seg(t,f,f+.5))}));
 stick(1650,860,.9,{pose:t>D*.85?'cheer':'stand',face:'happy',bob:t>D*.85?t:0});},
cta(t,D){bg();txt('What everyday tech',W/2,380,{s:84,w:700,f:SERIF,al:'center',a:eo(seg(t,.2,.9))});txt('should we take apart next?',W/2,480,{s:84,w:700,f:SERIF,al:'center',c:P.brass,a:eo(seg(t,.6,1.3))});
 const b=eo(seg(t,D*.15,D*.15+.6));X.globalAlpha=b;rr(W/2-460,570,420,90,45);X.fillStyle=P.red;X.fill();txt('Subscribe',W/2-250,628,{s:36,w:700,al:'center'});rr(W/2+40,570,420,90,45);X.strokeStyle=P.paper;X.lineWidth=3;X.stroke();txt('Tell us in the comments',W/2+250,628,{s:30,w:600,al:'center'});X.globalAlpha=1;
 const c=seg(t,D*.6,D*.6+1);if(c>0){X.globalAlpha=eo(c);X.fillStyle=P.brass;X.fillRect(W/2-40,800,80,4);txt('THE UNNECESSARY LAB',W/2,880,{s:44,w:800,al:'center',ls:10});X.globalAlpha=1;}
 stick(1650,1000,.8,{pose:'stand',to:'point',m:seg(t,D*.15,D*.25),flip:1});},
};
function thumb(){X.setTransform(1,0,0,1,0,0);bg();const cx=1380,cy=650,s=.95;['F','R','B','L'].forEach(k=>fov(cx,cy,s,k,1,430));carTop(cx,cy,s);cams(cx,cy,s);
 X.save();X.globalAlpha=.35;X.setLineDash([14,12]);X.strokeStyle=P.paper;X.lineWidth=4;X.beginPath();X.moveTo(cx,330);X.lineTo(cx,470);X.stroke();X.restore();bigEye(cx,220,1,1,0);
 txt('WHO’S',90,420,{s:200,w:800,f:SANS,c:P.paper});txt('WATCHING?',80,620,{s:170,w:800,f:SERIF,c:P.brass});
 txt('NO CAMERA UP HERE',90,760,{s:44,w:800,c:P.red,ls:6});X.drawImage(G[0],0,0,W,H);}
