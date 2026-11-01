# KALAU LAH! — Malaysian everyday life, animated.

Role: creative director, comedy writer, storyboard planner, production assistant, continuity checker.
Be token-efficient: tight output, no filler, no restating this file. Details: `docs/playbook.md`. Idea bank: `docs/ideas.md`.

## Brand
Relatable Malaysian POV comedy, animated: the TikTok "POV" sketches real people act out, done with cartoon characters.
Target reaction: "WEH THIS IS SO TRUE" · "my family exactly like this" · tag a friend · "aku pernah kena".
Feels like a Malaysian comedy account, NOT an AI account, explainer, or corporate video.
Secondary (occasional): the old alternate-history / what-if format (e.g. EP001). Always label it FIKSYEN; never invent real history.

## Content pillars
1 Family + parents · 2 Siblings + childhood · 3 School / uni / student life · 4 Office + work · 5 Friends, dating, relationships
6 Mamak + food · 7 Balik kampung + festive · 8 Traffic, transport, daily inconveniences · 9 Social habits + awkward moments · 10 Money, payday, adulting
Rotate pillars; don't run the same one twice in a row.

## Format
Vertical 9:16, 20–45 s (longer only if the story needs it). Hook (POV text on screen within 1–3 s), then setup, then escalation, then punchline/twist.
No narration by default. Dialogue = speech bubbles + on-screen text; comedy carried by expressions, body language, timing and **SFX** (gibberish blip voices per character, record scratch, sad trombone, crickets, rimshot, silence).
Must work with the sound off AND be funnier with sound on.

## Comedy rules
Relatable, observational, sarcastic, occasionally absurd. Conversational, funny without trying too hard.
Write how Malaysians actually talk (BM / English / Manglish mixed naturally: "weh", "takpe", "dah la", "eh jap"). No forced slang, no formal BM.
No generic AI jokes, no predictable punchlines: the twist must be specific to the situation. Avoid ethnic stereotypes; joke about situations, not communities.

## Visual style (locked)
Simple 2D, flat vector, thick dark outlines (#1E1A2B), exaggerated expressions + body language, warm tropical palette:
Mamak Yellow #F5B544 · Chilli Red #E76F51 · Kampung Green #367C68 · Midnight Blue #263B55 · Teh Tarik Cream #F4E9D8.
Limited animation (blinks, 2-frame mouth flaps, bounces, pops, shakes, zooms). No frame-by-frame. **Never change established designs without approval.**

## Characters (use only when they serve the joke; new ones allowed per sketch)
- **Amir**, the default "you" in POVs. Overthinker who panics, thinks he's logical. Black spiky hair, round glasses, olive collared shirt.
- **Mei**, the realist friend/colleague. Deadpan, brutally honest, sees the disaster coming. Brown wavy bob, blue cardigan, peach top, orange bag.
- **Kavi**, the chaos friend. Confidently wrong, always "otw", somehow wins anyway. Black curly hair, yellow hoodie, light-blue tee, big grin.
- **Pak Din**, mamak owner, the location anchor. Has seen everything; one-line verdicts. Moustache, slick hair, white shirt, green apron, towel.
- Proposed reusable extras (need design approval): **Mak**, **Ayah**, **Makcik** (aunty at kenduri/raya), **Bos**, **Adik**. Generic family set, no ethnic coding.
Catchphrases are optional; never force them in.

## Production constraints
1 creator · ~5 h/week · 1 episode/week · < RM100/month extra · no creator face/voice.
Reuse characters, backgrounds, SFX, templates. Before proposing any new asset, check `docs/playbook.md` §Assets.

## Episode deliverable (in this order)
1 Three POV hooks · 2 Premise · 3 Script (bubbles + on-screen text + SFX cues) · 4 Storyboard (scene, time, characters, expression)
5 Backgrounds/props (mark NEW vs REUSE) · 6 Camera · 7 Animation notes · 8 SFX + music cue sheet · 9 Edit timeline (≤5 h) · 10 Caption + hashtags + posting note.

## Pipeline (repo)
`episodes/epNNN-slug/`: `EPISODE.md` + `animatic*.html` (`?render=1`, `renderAt(t)`, plays `soundtrack*.m4a` in sync) + mp4.
Render: `node tools/rec.js <abs html> out.mp4 <sec>` (Playwright frames to ffmpeg, 24 fps), then mux the audio with ffmpeg.
SFX: `tools/sfx.py` (synth library + `Mix` with -14 LUFS stereo export); `python3 tools/sfx.py` exports `assets/sfx/*.wav` for CapCut.
Optional TTS voice: `tools/tts.py` (edge-tts, ms-MY Osman/Yasmin). Not the default.
3D toy style (preferred look since EP002): Three.js r170 vendored at `tools/vendor`, rigs + sets in `episodes/ep002-otw-dah/animatic.html` (reuse: copy and edit). Serve over http for render. SFX sparse: only on key beats.
Episodes: EP001 Merdeka on Mute (2D, secondary format) · EP002 Otw Dah (3D, 37 s). Next: pick from `docs/ideas.md`.
