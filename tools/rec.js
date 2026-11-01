// node tools/rec.js <abs html path | http url> out.mp4 [seconds=60] [fps=24]
// 3D (WebGL) pages must be served over http (ES modules): python3 -m http.server 8765 from repo root.
const {chromium}=require('playwright');const {spawn}=require('child_process');(async()=>{
const [src,out,sec='60',fps='24']=process.argv.slice(2);
const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:720,height:1280}});
await p.goto((src.startsWith('http')?src:'file://'+src)+'?render=1');
await p.waitForFunction('typeof window.renderAt==="function"',null,{timeout:60000});await p.waitForTimeout(1000);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',fps,'-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',out]);
for(let i=0;i<+sec*+fps;i++){await p.evaluate(t=>renderAt(t),i/+fps);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
