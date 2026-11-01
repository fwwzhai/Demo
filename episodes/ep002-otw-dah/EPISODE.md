# EP002: POV: Kawan kau kata "otw dah"
Pillar 5 (friends) · 37 s · **3D toy style** (Three.js, `animatic.html`, serve over http) · Cast: Amir, Kavi, Pak Din, Cashier (extra) · BG: mamak (3D), Kavi's room, petrol kiosk

**Hook options:** 1) *(used)* open on the END: Amir covered in cobwebs, melted teh ais, "1 jam 47 minit kemudian…" + 9:47 PM · 2) Phone banner "otw dah bro 🔥" over Kavi still in his towel · 3) "Dia kata 5 minit." with the clock fast-forwarding.

| t | Scene | Beat | SFX |
|---|---|---|---|
| 0–2.6 | Mamak 9:47 | HOOK: cobweb Amir, POV text, "1 jam 47 minit kemudian…" | crickets |
| 2.6–5.6 | Mamak 8:00 | Fresh Amir, full-ice teh ais. Banner: "otw dah bro 🔥". Thumbs up | ding |
| 5.6–9 | Room | REALITI: baru siap mandi (towel dance with phone) | record scratch |
| 9–11.6 | Mamak 8:40 | "dah dekat ni 🚗💨", ice half melted, Pak Din wiping | ding |
| 11.6–15 | Room | REALITI: cari kunci kereta (cushions flying) | |
| 15–17.6 | Mamak 9:15 | "5 min sampai 🙏", Amir slumps, Pak Din's sympathy hand | ding |
| 17.6–21 | Kiosk | REALITI: beli Twisties, borak dengan cashier | |
| 21–24.4 | Mamak 9:47 | Kavi walks in: "Sorry bro, jem gila tadi!" Amir dead stare | |
| 24.4–27.6 | Mamak | "Korang dah order? Aku tak lapar sangat." | |
| 27.6–30 | Mamak | Pak Din slams the full tray (nasi kandar banjir, roti ×2, milo dinosaur) unasked: "Biasa kan, Kavi?" | thud |
| 30–34.5 | Mamak | "Eh bro… wallet aku tertinggal la." Music cuts. Amir faceplants | sad trombone |
| 34.5–37 | End card | "Tag kawan 'otw' kau" | 3 kompang hits |

**Caption:** *"Otw" = baru nak cari tuala. Tag kawan yang 5 minit dia = 2 jam 👇 #KalauLah #POV #Otw #MalaysianTikTok #Mamak #LawakMalaysia*
**Post:** Fri 8–10 pm MYT (it's lepak night). Pin comment: "Kawan kau yang mana satu? 😭"
**Rebuild:** `python3 -m http.server 8765` (repo root) → `python3 episodes/ep002-otw-dah/audio/mix.py episodes/ep002-otw-dah/soundtrack.m4a` → `node tools/rec.js http://localhost:8765/episodes/ep002-otw-dah/animatic.html silent.mp4 37` → mux.
New reusable 3D assets: toy rigs (Amir, Kavi, Kavi-towel, Pak Din, NPC), mamak 3D set, bedroom + sofa, petrol kiosk, teh ais glass w/ melt state, food tray, cobweb.
