# EP01 — KALAU Malaysia Merdeka Tahun 2020?

**Label (on screen the whole time):** FIKSYEN. The real Merdeka was 31 Ogos 1957. Only real fact we use: the 1957 declaration at Stadium Merdeka, where the crowd shouted "Merdeka!" seven times.
**Length:** 60 s · 9:16 · 5 scenes, 3 backgrounds · **Animatic + voice + SFX:** `merdeka-2020-animatic.mp4` (`animatic.html` plays in sync with `soundtrack.m4a`)

> Timings below are from the silent v1 cut. The voiced v2 cut runs to 60 s; the exact times are the `B` array in `animatic.html` and the `V` list in `audio/mix.py`.

## 1. Hooks (pick one for 0–2 s)
1. **"KALAU Malaysia merdeka tahun 2020?"** with a calendar flipping 1957 → 2020. *(used)*
2. Amir mid-shout, silent, red mute icon pulsing: "Merdeka paling senyap dalam sejarah."
3. A Zoom tile: "UK Official (Guest) telah meninggalkan mesyuarat." Caption: "Ini cara kita dapat merdeka."

## 2. Premise
In this timeline independence comes in 2020, during the SOP era. The handover happens over Zoom, the British official leaves the meeting, and Amir shouts "Merdeka!" seven times live to 2 million viewers while muted. When he unmutes, his face freezes mid-shout and becomes the nation's WhatsApp sticker. Pak Din delivers the verdict at the mamak.

## 3. Script (Manglish)
| t | Who | Line |
|---|---|---|
| 0–3 | CAPTION | KALAU Malaysia merdeka tahun 2020? |
| 3.6 | UK Official (cam off) | Right. Congratulations. You are officially independent. |
| 6.6 | Amir | Eh? Macam tu je? Takde stadium? Takde perarakan? |
| 10.1 | UK Official | SOP, mate. Max 20 people. Cheerio! |
| 12.5 | TOAST | UK Official (Guest) telah meninggalkan mesyuarat |
| 12.9 | Amir | Dia LEFT meeting?! |
| 14.7 | Mei | Typical. Merdeka pun boleh WFH. |
| 17.3 | Kavi | Bro relax. I dah buat live. 2 juta tengah tengok. |
| 20.5–25.9 | Amir | MERDEKA! ×7 (silent, mic is red) |
| 21–27 | COMMENTS | semangat bang!! / bang mute / MUTE WEH / takde bunyi pun / abang unmute la / dah 4 kali jerit senyap / lipsync merdeka ke ni / hantar kat group family |
| 26.6 | Mei | Amir. Kau mute. |
| 28.1 | Amir | ...sejak bila? |
| 29.5 | Mei | Sejak "M" yang pertama. |
| 31.2 | Amir | MERDEK— *(freeze)* "Sambungan internet anda tidak stabil" |
| 33.3 | Kavi | Takpe bro. Muka ni dah jadi sticker WhatsApp. Satu Malaysia guna. |
| 38.6 | Pak Din | 1957, satu stadium jerit "Merdeka!" tujuh kali. |
| 42.4 | Pak Din | 2020... satu negara jerit "BANG, KAU MUTE!" |
| 45.5 | END CARD | KALAU LAH! · Malaysia, but slightly unhinged. · Follow. Episod 2 tengah buffering… |

## 4–9. Storyboard
| # | Time | Scene / BG | Characters (expression) | Camera | Animation |
|---|---|---|---|---|---|
| S1 | 0–3 | Title card, Midnight Blue | none | static | Text pops in (0.25 s), year roll 1957→2020 |
| S2 | 3–17 | **Zoom grid 2×2** (new, reusable) | Amir (normal → wide → frown), Mei (deadpan), Kavi (grin), UK Official = camera-off tile | static, 0.4 s shake on "LEFT meeting" | Mouth flaps 2 frames, blinks, green speaking border, UK tile vanishes + toast |
| S3 | 17–31 | **Live stream** (same Zoom UI, big tile + 2 PIPs) | Amir (shout, arm up ×7), Mei PIP (deadpan), Kavi PIP (grin) | cut in to the big tile | Arm up/down + head bounce per shout, "MERDEKA! ×n" counter, comments slide up, mic icon pulses |
| S4 | 31–38 | Same as S3 | Amir frozen (wide + shout + arm), Kavi | static | Mic turns green, freeze + pixel overlay + lag banner, 3×3 sticker grid pops in staggered |
| S5 | 38–45.5 | **Mamak counter** (new, reusable) | Pak Din (half-lid deadpan), Amir frozen on TV | static | Mouth flaps, teh tarik glass slides (wiping) |
| S6 | 45.5–48 | End card, Mamak Yellow | none | static | Logo pops in |

**Props:** Zoom toolbar + mic icon, LIVE badge, comment pills, 9 sticker frames, wall TV, menu board, teh tarik glass, Pak Din's towel. All flat, thick outlines, 5-colour palette.
**New reusable assets:** Zoom grid/live UI (works for any "online" episode), mamak counter (Pak Din's home base), Amir raised-fist arm, the sticker-grid gag.

## 10. Sound and music
**v2 (built):** Malay TTS voices (Microsoft Edge neural voices, free):
| Character | Voice | Rate / pitch | Treatment |
|---|---|---|---|
| Amir | ms-MY Osman | fast, +8 to 16 Hz | slightly anxious |
| Mei | ms-MY Yasmin | slow, −6 to 8 Hz | flat, deadpan |
| Kavi | ms-MY Osman | fastest, +30 Hz | hyper |
| Pak Din | ms-MY Osman | slow, −22 Hz | no EQ (in the room, not on Zoom) |
| UK Official | en-GB Ryan | normal | laptop-speaker EQ |
The 7× "MERDEKA!" stays **silent** on purpose; the music hard-cuts at the first shout. "MERDEK—" is cut off mid-word at the freeze.
SFX/ambience are all synthesized (no licence issues): title pop+whoosh+thud, Zoom join chime, leave blip, boom on "LEFT meeting", keyboard ticks on comments, crickets, unmute click, glitch freeze, 9 sticker pops, mamak murmur + traffic + spoon clinks + teh tarik pour, punchline drum, 3 kompang-style hits on the end card. The kampung lo-fi music loop (104 bpm) is ducked under voices.
Rebuild: `python3 tools/tts.py <voice> "<text>" out.mp3 <rate> <pitch>` per line in `audio/lines.tsv`, then `python3 audio/mix.py audio soundtrack.m4a`, then `node tools/rec.js $PWD/animatic.html silent.mp4 60` and mux with ffmpeg.

**Original plan (v1):**
- 0 s: record-scratch, then a whoosh on the year roll. 3 s: Zoom join chime.
- 12.5 s: "leave meeting" blip plus a short dramatic sting. 12.9 s: vine-boom.
- 20.5–26 s: crowd-cheer swell that cuts to **dead silence** on each shout (the joke is the missing sound), with keyboard tick SFX as comments land.
- 26.6 s: crickets. 31.8 s: dial-up glitch, then a freeze "bonk". 35 s: rapid pop ×9.
- 38 s: mamak ambience (spoon clink, distant TV). 42.4 s: low drum hit on the punchline.
- Music: royalty-free upbeat kompang/kampung loop at −18 dB, ducked under dialogue and cut at 20.5 s.
- Source: YouTube Audio Library / Pixabay, no cost. Do not use the national anthem or patriotic songs.

## 11. Editing timeline (CapCut or Canva, ~4.5 h total)
| Step | Time |
|---|---|
| Rebuild the 4 bust rigs as layered PNG/SVG (eyes ×4, mouths ×6, Amir arm). One-time, reused in every episode | 1.5 h |
| Zoom UI + mamak backgrounds (screenshot the animatic as a base) | 0.5 h |
| Lay bubbles and captions to the script table timings | 1 h |
| Mouth flaps, blinks, arm bounce, freeze effect (keyframes only) | 1 h |
| SFX + music pass, export 1080×1920 30fps | 0.5 h |
Shortcut: `merdeka-2020-animatic.mp4` is already a 48 s cut, so you can just add sound and post it.

## 12. Publishing caption
> KALAU kita merdeka tahun 2020… semangat ada, unmute takde. 🇲🇾🔇
> 7 kali jerit, 0 desibel. Pak Din dah lama tunggu saat ni.
> *Fiksyen semata-mata. Merdeka sebenar: 31 Ogos 1957.*
> Tag kawan yang selalu lupa unmute 👇
> #KalauLah #Merdeka #MalaysiaBoleh #Manglish #KomediMalaysia #WhatIf #AnimasiMalaysia
