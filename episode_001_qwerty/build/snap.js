// node snap.js out_dir t1 t2 ... : stills at 1920x1080
const {chromium}=require('playwright');(async()=>{const [dir,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+__dirname+'/doc.html?render=1');await p.waitForFunction('typeof renderAt==="function"');await p.waitForTimeout(500);
for(const t of ts){await p.evaluate(t=>renderAt(t),+t);await p.screenshot({path:`${dir}/s_${t}.jpg`,quality:70});}console.log(errs.join('\n')||'no errors');await b.close();})();
