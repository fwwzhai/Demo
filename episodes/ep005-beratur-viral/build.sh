#!/bin/bash
# Copies the huashu-art-motion engine to a temp dir, drops in this episode's scene, renders ep005-beratur-viral.mp4.
# Usage: ./build.sh [stills "1,5,12"]
set -e; HERE=$(cd "$(dirname "$0")" && pwd); E=${TMPDIR:-/tmp}/ep005-engine
rm -rf "${E:?}"; cp -R "$HERE/../../.claude/skills/huashu-art-motion/scripts/engine" "$E"
cp "$HERE/scene.js" "$E/scenes/ep005_beratur.js"; cp "$HERE/eras_ep005.js" "$E/eras_ep005.js"
touch "$E/favicon.ico"; CH=${CHROMIUM:-/opt/pw-browsers/chromium}; [ -x "$CH" ] && sed -i "s|chromium.launch(args=\[|chromium.launch(executable_path='$CH', args=['--no-sandbox', |" "$E/render.py"
R="python3 $E/render.py --film ep005 --width 1080 --height 1920 --solo ep005_beratur --no-counter"
if [ "$1" = stills ]; then $R --stills "$2" --out "$HERE/stills"; exit; fi
python3 "$HERE/audio.py" "$HERE/soundtrack.m4a"
$R --fps 30 --from 0 --to 60 --crf 20 --audio "$HERE/soundtrack.m4a" --out "$HERE/ep005-beratur-viral.mp4"
