const {chromium}=require('playwright');const {spawn}=require('child_process');(async()=>{
const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});
await p.goto('file://'+process.argv[2]+'?render=1');await p.waitForTimeout(1000);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate','24','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',process.argv[3]]);
for(let i=0;i<(+process.argv[4]||60)*24;i++){await p.evaluate(t=>renderAt(t),i/24);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
