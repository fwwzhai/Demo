import ssl,asyncio,json,os,edge_tts,edge_tts.communicate as c,subprocess
c._SSL_CTX=ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
exec(open('script.py').read())
V='en-US-AndrewNeural'
async def main():
    for i,(_,t) in enumerate(S):
        f=f'vo_{i:02d}.mp3'
        if os.path.exists(f) and os.path.getsize(f)>5000: continue
        for k in range(4):
            try: await edge_tts.Communicate(t,V,rate='+6%',proxy=os.environ['HTTPS_PROXY']).save(f);break
            except Exception as e: print(i,k,repr(e)[:80]);await asyncio.sleep(2)
asyncio.run(main())
d=[float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'vo_{i:02d}.mp3'])) for i in range(len(S))]
json.dump(d,open('durs.json','w'));print(sum(d),[round(x,1) for x in d])
