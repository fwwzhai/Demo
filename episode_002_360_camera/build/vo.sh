for k in 1 2 3 4 5 6 7 8; do timeout 600 python3 tts.py > tts.log 2>&1 && break; for f in vo_*.mp3; do [ -s "$f" ] || rm -f "$f"; done; sleep 30; done
for i in $(seq -w 0 22); do ffmpeg -loglevel error -y -i vo_$i.mp3 -af atempo=1.1 -ar 48000 -ac 1 vf_$i.wav; done
python3 -c "
import json,subprocess
d=[float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'vf_{i:02d}.wav'])) for i in range(23)]
json.dump(d,open('durs.json','w'));print('VO',round(sum(d),1))"
