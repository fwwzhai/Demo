# EP003: Macam mana 360 camera kereta berfungsi
Pillar 8 (traffic/daily) + explainer · 33.5 s · 2D anime style (`animatic.html` + `scene.js`, shared rig `tools/rig2d.js`) · Cast: Amir, Mei (insets)

**Hooks:** 1) *(used)* POV: Parking basement mall, ruang SEMPIT gila (sensor beeping faster) · 2) "Kereta kau ada drone ke?" · 3) "Skrin kata perfect. Realiti kata 2 lot."

| t | Beat | On screen | SFX |
|---|---|---|---|
| 0–3 | Hook | Car wiggling in a tight slot, Amir sweating | parking beeps speeding up |
| 3–6.8 | Setup | Mei: "Guna la 360 camera." Amir: "Ada drone ke?" Stamp: TAKDE DRONE | stamp thud |
| 6.8–11.2 | 1. Ada 4 kamera | Front grille, rear, under each side mirror; 180°+ fisheye coverage cones overlap | 4 pops, whoosh |
| 11.2–14.6 | 2. Fisheye | Raw front view: straight lines curve, own bumper visible | |
| 14.6–19.2 | 3. Betulkan | Dewarp (lines straighten), then perspective → top-down (factory calibration) | slide whistle |
| 19.2–23.7 | 4. Cantum | 4 tiles fly in, overlap seams blended; car in the middle = graphic, not real footage | 4 swishes, pop |
| 23.7–27.2 | Limitation | Assumes flat ground → tall pillar looks stretched away from the camera | |
| 27.2–28.9 | Payoff | Screen: "PERFECT. ✨" | ding |
| 28.9–31.6 | Twist | Real view: parked across two lots. Mei: "360 darjah… still ambik dua lot." | record scratch, rimshot |
| 31.6–33.5 | End card | Tag kawan parking senget | kompang |

**Facts used (generic, true for typical surround-view systems):** 4 wide-angle cameras · fisheye distortion corrected in software · each view projected to a top-down plane using factory calibration · overlaps blended · the car image is a stored graphic · flat-ground assumption makes tall objects stretch near the edges.
**Caption:** *Kereta ada 360 camera, tapi skill parking masih 90 darjah 😭 Tag kawan yang parking senget 👇 #KalauLah #360Camera #Parking #MalaysianTikTok #Kereta*
**Rebuild:** serve the repo root over http, then `python3 episodes/ep003-360-camera/audio/mix.py episodes/ep003-360-camera/soundtrack.m4a`, then `node tools/rec.js http://localhost:8765/episodes/ep003-360-camera/animatic.html silent.mp4 33.5`, then mux.
