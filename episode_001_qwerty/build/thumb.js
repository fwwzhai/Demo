const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/doc.html?render=1');await p.waitForFunction('typeof thumb==="function"');await p.waitForTimeout(400);await p.evaluate(()=>thumb());
await p.screenshot({path:process.argv[2]});await b.close();})();
