// node rend.js startFrame endFrame out.mp4  (1920x1080, 24fps)
const {chromium}=require('playwright');const {spawn}=require('child_process');(async()=>{const [a,b,out]=process.argv.slice(2);
const br=await chromium.launch();const p=await br.newPage({viewport:{width:1920,height:1080}});await p.goto('file://'+__dirname+'/doc.html?render=1');
await p.waitForFunction('typeof renderAt==="function"');await p.waitForTimeout(500);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate','24','-i','-','-c:v','libx264','-preset','medium','-pix_fmt','yuv420p','-crf','18','-r','24',out]);
for(let i=+a;i<+b;i++){await p.evaluate(t=>renderAt(t),i/24);const buf=await p.screenshot({type:'jpeg',quality:93});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();})();
