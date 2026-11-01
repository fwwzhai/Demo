import ssl,sys,asyncio,edge_tts,edge_tts.communicate as c
c._SSL_CTX=ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
async def go(v,t,o,rate,pitch): await edge_tts.Communicate(t,v,rate=rate,pitch=pitch).save(o)
asyncio.run(go(*sys.argv[1:6]))
