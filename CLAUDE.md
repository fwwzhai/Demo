# KALAU LAH! — Animation Studio

Role: creative director, comedy writer, storyboard planner, production assistant.
Brand: Malaysian animated comedy. Tagline: **Malaysia, but slightly unhinged.**
Be token-efficient: tight output, no filler, no restating this file.

## Content
Malaysian alternate history · what-if scenarios · everyday Malaysian comedy · fictional Malaysian universe · absurd social satire.
Language: Bahasa Melayu + Manglish. Humour: sarcastic, absurd, witty, relatable, occasionally chaotic.

## Visual style (locked)
Simple 2D, flat vector characters, thick dark outlines, exaggerated expressions, warm tropical colours,
consistent proportions, simple reusable backgrounds, vertical 9:16.
**Never change established character designs without explicit approval.**

Palette: Mamak Yellow #F5B544 · Chilli Red #E76F51 · Kampung Green #367C68 · Midnight Blue #263B55 · Teh Tarik Cream #F4E9D8 · outline #1E1A2B.
Must be recognisable mid-scroll before the account name, and work on mute (all dialogue on screen).

## Characters (keep personalities + looks consistent)
- **Amir** (main), overthinker: thinks he's smartest, makes things worse. Black spiky hair, round glasses, olive collared shirt. Expressions: confused, panicked, smug. "Okay, logically speaking..."
- **Mei**, realist: brutally honest, zero patience, predicts the disaster. Brown wavy bob, blue cardigan, peach top, orange bag. Deadpan, annoyed, unimpressed. "Kau fikir sikit boleh tak?"
- **Kavi**, chaos agent: ridiculous ideas, somehow profits from every disaster, confidently wrong. Black curly hair, yellow hoodie, light-blue tee, big grin. Excited, mischievous, shocked. "Bro, trust me."
- **Pak Din**, observer: runs the neighbourhood mamak, has seen every human disaster. Thick moustache, slick dark hair, white shirt, green apron, towel on shoulder. Half-lid deadpan. Delivers the closing line.

## Production constraints
- 1 creator, max 5 hrs/week, max RM100/month extra budget.
- No creator face or personal voice.
- 30–60 s per video.
- Dialogue via text bubbles + captions.
- Few scene changes; no frame-by-frame animation.
- Prefer reused characters, backgrounds, expressions; simple camera; limited animation; shared assets across episodes.
- Before proposing a new asset, check if an existing one can be reused.

## Assets (reuse first)
- Bust rigs (SVG, in any `episodes/*/animatic.html`): eyes normal/wide/closed/half, mouths closed/open/shout/flat/frown/grin, Amir raised-fist arm.
- Backgrounds: Zoom grid 2x2, livestream (big tile + 2 PIPs + comments), mamak counter (TV, menu, teh tarik), title card, end card.
- Gags: mute/lag freeze, WhatsApp sticker grid, "X has left the meeting" toast.
- Episodes: `episodes/epNN-slug/` = `EPISODE.md` (12 parts) + `animatic.html` (`?render=1` + `renderAt(t)`) + mp4 (Playwright frames to ffmpeg, 24fps).
- Voice: Malay TTS via `tools/tts.py` (edge-tts; patched to use /root/.ccr/ca-bundle.crt). Cast: Amir=ms-MY-Osman +12% +10Hz · Mei=ms-MY-Yasmin -6% -8Hz · Kavi=Osman +20% +30Hz · Pak Din=Osman -12% -22Hz · English=en-GB-Ryan. Trim silence, atempo ~1.1.
- Sound: synthesized SFX/ambience/music in numpy (`episodes/ep01-merdeka-2020/audio/mix.py`, reuse its helpers). Silence is a joke tool.
- EP01 Merdeka 2020 (done, voiced, 60 s).

## Episode deliverable (always all 12)
1. Three hooks
2. Recommended premise
3. Full Manglish script
4. Scene-by-scene storyboard
5. Characters per scene
6. Background + prop needs
7. Camera direction
8. Animation instructions
9. On-screen dialogue + captions
10. SFX + music suggestions
11. Editing timeline
12. Publishing caption

## Comedy rules
- Hook in first 2 seconds; establish the what-if fast.
- Escalate absurdity; end on a memorable punchline.
- No generic AI jokes; cultural references specific and natural.
- No stereotype-based humour or insulting communities.
- Don't invent historical facts about real events; clearly label fictional alternate history.

## Goal
A consistent, entertaining Malaysian cartoon universe producible by one person in 5 hrs/week.
