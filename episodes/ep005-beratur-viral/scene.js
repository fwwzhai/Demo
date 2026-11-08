// EP005 Beratur Viral: huashu-art-motion engine, paper-cutout style (52 recipe), original characters. 1080x1920, 60 s.
SCENES['ep005_beratur'] = (() => {
  const W = 1080, H = 1920, { clamp, lerp, rng, ss } = U, P = PAINT, TAU = Math.PI * 2, OUT = '#1e1a2b';
  const io = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const pop = (t, d = 0.35) => t < 0 ? 0 : t > d ? 1 : 1 + 0.25 * Math.sin(Math.PI * t / d) * (1 - t / d) - (1 - t / d) * 0.3;
  function paper(c, pts, fill, { seed = 1, lw = 3.4, amp = 2.2, step = 18 } = {}) {
    const p = P.cut(pts, seed, step, amp); c.fillStyle = fill; c.fill(p);
    if (lw) { c.strokeStyle = OUT; c.lineWidth = lw; c.lineJoin = 'round'; c.stroke(p); } return p;
  }
  const circ = (c, x, y, r, f, s, lw = 3.4) => paper(c, Array.from({ length: 28 }, (_, i) => [x + Math.cos(i / 28 * TAU) * r, y + Math.sin(i / 28 * TAU) * r]), f, { seed: s, lw, amp: 1.1, step: 12 });
  const ell = (c, x, y, rx, ry, f, s, lw = 3) => paper(c, Array.from({ length: 24 }, (_, i) => [x + Math.cos(i / 24 * TAU) * rx, y + Math.sin(i / 24 * TAU) * ry]), f, { seed: s, lw, amp: 0.7, step: 10 });
  const rect = (c, x0, y0, x1, y1, f, s, lw = 3.4) => paper(c, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], f, { seed: s, lw });
  const tex = () => P.cached('ep005_paper', W, H, g => {
    g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); const r = rng(5);
    for (let i = 0; i < 7000; i++) { const x = r() * W, y = r() * H, a = r() * TAU, l = 3 + r() * 12; g.strokeStyle = r() < 0.5 ? 'rgba(140,130,115,.16)' : 'rgba(255,255,255,.5)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
  });
  function txt(c, s, x, y, { size = 70, bg = '#fffaf0', fg = OUT, rot = 0, k = 1, font = 'LilitaOne-400' } = {}) {
    if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k);
    c.font = `${size}px "${font}"`; const lines = s.split('\n'), lh = size * 1.12;
    const w = Math.max(...lines.map(l => c.measureText(l).width)) + size * 0.9, h = lines.length * lh + size * 0.5;
    paper(c, [[-w / 2 + 8, -h / 2 + 8], [w / 2 + 8, -h / 2 + 8], [w / 2 + 8, h / 2 + 8], [-w / 2 + 8, h / 2 + 8]], OUT, { seed: 7, lw: 0 });
    paper(c, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], bg, { seed: 9, lw: 5, amp: 2.5, step: 26 });
    c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle';
    lines.forEach((l, i) => c.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + size * 0.05)); c.restore();
  }
  const cap = (c, lt, t0, s, y, o = {}) => { if (lt >= t0) txt(c, s, W / 2, y, { ...o, k: pop(lt - t0) }); };

  // person: o.x, o.y = feet; mood flat|smile|open|frown|dead; hair spiky|bob|bald|curly
  function guy(c, o) {
    const { x, y, s = 1, skin = '#f2c79c', body = '#7d8a4a', hair = 'spiky', hc = '#1e1a2b', mood = 'flat', look = 0.5, glasses = false, armL = 0, armR = 0, hop = 0, seed = 1, beard = 0, tilt = 0, talk = 0 } = o;
    c.save(); c.translate(x, y - hop); c.scale(s, s);
    rect(c, -38, -60, -10, 0, '#263b55', seed + 1, 0); rect(c, 10, -60, 38, 0, '#263b55', seed + 2, 0);
    const arm = (sx, a, k) => { c.save(); c.translate(sx, -180); c.rotate(a); paper(c, [[-13, 0], [13, 0], [12, 92], [-12, 92]], body, { seed: seed + 3 + k, amp: 1.1 }); circ(c, 0, 98, 18, skin, seed + 5 + k, 3); c.restore(); };
    arm(-78, armL, 0); arm(78, armR, 1);
    paper(c, [[-78, -200], [78, -200], [98, -60], [-98, -60]], body, { seed: seed + 6, amp: 1.5 });
    c.save(); c.translate(0, -198); c.rotate(tilt);
    circ(c, 0, -74, 76, skin, seed + 8);
    if (hair === 'spiky') paper(c, [[-76, -80], ...Array.from({ length: 9 }, (_, i) => [-76 + i * 19, -150 - (i % 2) * 34]), [76, -80], [60, -118], [-60, -118]], hc, { seed: seed + 9, amp: 1.2 });
    if (hair === 'bob') paper(c, [[-90, -10], [-86, -110], [-40, -156], [40, -156], [86, -110], [90, -10], [60, -10], [56, -100], [-56, -100], [-60, -10]], hc, { seed: seed + 9, amp: 1.2 });
    if (hair === 'curly') for (let i = 0; i < 7; i++) circ(c, -60 + i * 20, -140 + Math.abs(i - 3) * 8, 26, hc, seed + 20 + i, 2.5);
    if (hair === 'cap') { paper(c, [[-78, -96], [-60, -140], [0, -158], [60, -140], [78, -96]], hc, { seed: seed + 9 }); rect(c, 30, -104, 130, -88, hc, seed + 10); }
    if (beard > 0) paper(c, [[-70, -60], [70, -60], [60, -60 + 70 * beard], [0, -40 + 110 * beard], [-60, -60 + 70 * beard]], '#3a2e2a', { seed: seed + 11, amp: 3 });
    const ex = 22, ey = -82;
    if (mood === 'dead') { c.strokeStyle = OUT; c.lineWidth = 5; [-ex, ex].forEach(xx => { c.beginPath(); c.moveTo(xx - 12, ey - 12); c.lineTo(xx + 12, ey + 12); c.moveTo(xx + 12, ey - 12); c.lineTo(xx - 12, ey + 12); c.stroke(); }); }
    else { ell(c, -ex, ey, 19, 23, '#fff', seed + 12); ell(c, ex, ey, 19, 23, '#fff', seed + 13); const px = (look - 0.5) * 14; c.fillStyle = OUT; [-ex, ex].forEach(xx => { c.beginPath(); c.arc(xx + px, ey + 3, 5, 0, TAU); c.fill(); }); }
    if (mood === 'frown') { c.strokeStyle = OUT; c.lineWidth = 5; [-ex, ex].forEach((xx, i) => { c.beginPath(); c.moveTo(xx - 18, ey - 34 + (i ? 8 : -8) * -1); c.lineTo(xx + 18, ey - 34 + (i ? -8 : 8) * -1); c.stroke(); }); }
    if (glasses) { c.strokeStyle = OUT; c.lineWidth = 5; [-ex, ex].forEach(xx => { c.beginPath(); c.arc(xx, ey, 30, 0, TAU); c.stroke(); }); }
    c.fillStyle = OUT; c.strokeStyle = OUT; c.lineWidth = 6; const my = -28 + (beard > 0.3 ? -6 : 0);
    if (talk > 0.5 || mood === 'open') { c.beginPath(); c.ellipse(0, my, 20, 22, 0, 0, Math.PI); c.fill(); c.fillStyle = '#e76f51'; c.beginPath(); c.ellipse(0, my + 12, 12, 8, 0, 0, Math.PI); c.fill(); }
    else if (mood === 'smile') { c.beginPath(); c.ellipse(0, my, 26, 18, 0, 0, Math.PI); c.fill(); }
    else if (mood === 'frown') { c.beginPath(); c.arc(0, my + 16, 22, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
    else { c.beginPath(); c.moveTo(-18, my + 4); c.lineTo(18, my + 4); c.stroke(); }
    c.restore(); c.restore();
  }
  const CROWD = Array.from({ length: 16 }, (_, i) => { const r = rng(100 + i); return {
    body: ['#e76f51', '#367c68', '#f5b544', '#5a78c8', '#c96a8a', '#8a8f3a', '#d9d2c0', '#6b4a30'][i % 8], skin: ['#f2c79c', '#d9a274', '#b9825a', '#f7d9bd'][i % 4],
    hair: ['spiky', 'bob', 'curly', 'cap', 'bald'][Math.floor(r() * 5)], hc: ['#1e1a2b', '#4a2e1e', '#e76f51', '#263b55'][i % 4], s: 0.9 + r() * 0.2, seed: 300 + i * 40 }; });
  const AMIR = { body: '#7d8a4a', hair: 'spiky', glasses: true, seed: 50 };

  function street(c, dusk = 0) {
    const sky = dusk < 0.5 ? '#9fd3e0' : '#263b55'; c.fillStyle = sky; c.fillRect(0, 0, W, H);
    paper(c, [[-20, 700], [W + 20, 700], [W + 20, 1450], [-20, 1450]], '#f4e9d8', { seed: 11, amp: 3, step: 30 });
    for (let i = 0; i < 3; i++) rect(c, 60 + i * 340, 820, 300 + i * 340, 1060, dusk < 0.5 ? '#bfe0d6' : '#f5b544', 12 + i);
    paper(c, [[-20, 1450], [W + 20, 1450], [W + 20, H + 20], [-20, H + 20]], '#8c8c99', { seed: 15, amp: 3, step: 40 });
    rect(c, -20, 1450, W + 20, 1480, '#b9b2a6', 16);
  }
  function stall(c, x, y, s, label = 'NASI LEMAK\nVIRAL!!', col = '#e76f51', seed = 60) {
    c.save(); c.translate(x, y); c.scale(s, s);
    rect(c, -260, -380, 260, 0, '#f5b544', seed); rect(c, -280, -420, 280, -380, OUT, seed + 1, 0);
    for (let i = 0; i < 7; i++) paper(c, [[-280 + i * 80, -520], [-200 + i * 80, -520], [-200 + i * 80, -420], [-280 + i * 80, -420]], i % 2 ? '#fffaf0' : col, { seed: seed + 2 + i });
    txt(c, label, 0, -640, { size: 64, bg: '#fffaf0', fg: col, rot: -0.04 });
    rect(c, -200, -300, 200, -200, '#bfe0d6', seed + 12); c.restore();
  }
  function plate(c, x, y, s, tiny = 1) {
    c.save(); c.translate(x, y); c.scale(s, s); ell(c, 0, 0, 170, 60, '#fffaf0', 70, 4);
    ell(c, 0, -12, 34 * tiny, 18 * tiny, '#fffaf0', 71, 3); circ(c, 30 * tiny, -14, 9 * tiny, '#e76f51', 72, 2.5); c.restore();
  }

  function draw(c, lt) {
    const T = lt, bob = k => Math.abs(Math.sin(T * 6 + k)) * 6;
    c.save();
    if (T < 10) {                                                     // A+B: the queue
      const pan = T < 4 ? lerp(0, -2300, io(ss(0.3, 3.4, T))) : -2300;
      const dusk = T < 4 ? 0 : ss(5, 9, T); street(c, dusk);
      c.save(); c.translate(pan, 0);
      stall(c, 300, 1460, 1.0);
      CROWD.forEach((p, i) => guy(c, { ...p, x: 620 + i * 190, y: 1520 + (i % 2) * 14, look: 0.1, mood: T > 6 && i % 3 === 0 ? 'dead' : 'flat', tilt: Math.sin(T + i) * 0.05 }));
      guy(c, { ...AMIR, x: 620 + 16 * 190 + 60, y: 1540, s: 1.05, look: 0.1, mood: T < 4 ? 'smile' : 'flat', beard: ss(5, 9.5, T), tilt: T > 6 ? -0.12 : 0 });
      c.restore();
      if (T < 4) cap(c, T, 0.3, 'POV: TikTok cakap\n"WAJIB CUBA"', 260, { size: 80 });
      if (T >= 4) { const hr = Math.min(3, Math.floor((T - 4) / 1.8) + 1); txt(c, `Jam ke-${hr}...`, W / 2, 330, { size: 92, bg: '#263b55', fg: '#f5b544', rot: -0.03, k: pop((T - 4) % 1.8) }); }
      cap(c, T, 7.8, 'orang depan dah\njadi fosil.', 1700, { size: 60 });
    } else if (T < 17) {                                              // C: the bite
      const lt2 = T - 10; c.fillStyle = '#f4e9d8'; c.fillRect(0, 0, W, H); rect(c, -20, 1300, W + 20, H + 20, '#b9825a', 80);
      const zoom = 1 + 0.25 * io(ss(3.0, 4.2, lt2)); c.translate(W / 2, 1100); c.scale(zoom, zoom); c.translate(-W / 2, -1100);
      plate(c, W / 2, 1400, 1.4, 1);
      const chew = lt2 > 2.2 && lt2 < 4.5 ? Math.sin(lt2 * 18) : 0;
      guy(c, { ...AMIR, x: W / 2, y: 1330, s: 1.6, look: 0.5, mood: lt2 < 2.2 ? 'open' : lt2 < 4.5 ? 'flat' : 'frown', beard: 1, armR: lt2 < 2.2 ? -2.2 : -0.2, hop: chew * 6 });
      c.restore(); c.save();
      cap(c, lt2, 0.3, 'Akhirnya dapat.\nRM28.', 260, { size: 76 });
      cap(c, lt2, 1.2, '(nasi dia 3 sudu)', 450, { size: 52, bg: '#f5b544' });
      cap(c, lt2, 3.0, 'Rasa dia...', 1700, { size: 72 });
      cap(c, lt2, 4.6, 'macam air paip\nyang dah sejuk.', 1700, { size: 72, bg: '#e76f51', fg: '#fffaf0' });
    } else if (T < 20) {                                              // D: title
      c.fillStyle = '#e76f51'; c.fillRect(0, 0, W, H);
      txt(c, 'SOLUSI\nTAK PERLU', W / 2, 860, { size: 150, bg: '#f5b544', rot: -0.05, k: pop(T - 17.2, 0.4), font: 'Bangers-400' });
      cap(c, T - 17, 1.0, 'utk masalah beratur viral', 1180, { size: 54 });
    } else if (T < 28) {                                              // E: wakil
      const l = T - 20; street(c, 0); stall(c, -60, 1460, 0.9);
      CROWD.slice(0, 3).forEach((p, i) => guy(c, { ...p, x: 330 + i * 190, y: 1520, look: 0.1 }));
      c.save(); c.translate(900, 1540); c.rotate(Math.sin(l * 2) * 0.02);               // cardboard Amir
      rect(c, -12, -40, 12, 0, '#a2642c', 90); c.translate(0, -40); guy(c, { ...AMIR, x: 0, y: 0, s: 1.0, look: 0.1, mood: l > 5 ? 'frown' : 'smile', seed: 91 });
      paper(c, [[-110, -480], [110, -480], [110, 0], [-110, 0]], 'rgba(162,100,44,.22)', { seed: 92, lw: 5 }); c.restore();
      cap(c, l, 0.2, 'SOLUSI #1', 160, { size: 70, bg: '#e76f51', fg: '#fffaf0', rot: -0.05 });
      cap(c, l, 0.7, 'Hantar wakil beratur.\n(kadbod pun boleh)', 330, { size: 66 });
      cap(c, l, 4.6, 'Wakil pun cakap\ntak sedap.', 1720, { size: 68 });
    } else if (T < 36) {                                              // F: khemah
      const l = T - 28; street(c, ss(3, 6, l)); stall(c, -60, 1460, 0.9);
      paper(c, [[520, 1540], [780, 1080], [1040, 1540]], '#367c68', { seed: 95, lw: 5 }); paper(c, [[730, 1540], [780, 1300], [830, 1540]], OUT, { seed: 96, lw: 0 });
      guy(c, { ...AMIR, x: 360, y: 1560, s: 1.0, beard: clamp(l / 6), look: 0.9, mood: 'smile' });
      rect(c, 200, 1430, 250, 1560, '#8c8c99', 97); rect(c, 170, 1380, 280, 1440, '#e76f51', 98);                // mailbox
      cap(c, l, 0.2, 'SOLUSI #2', 160, { size: 70, bg: '#e76f51', fg: '#fffaf0', rot: -0.05 });
      cap(c, l, 0.7, 'Bawak khemah.\nTerus duduk sini.', 330, { size: 66 });
      cap(c, l, 4.3, 'Bulan ke-3:\ndah ada poskod sendiri.', 1720, { size: 62 });
    } else if (T < 45) {                                              // G: own stall
      const l = T - 36, mv = io(ss(3.2, 5.0, l)); street(c, 0);
      stall(c, 250, 1460, 0.75, 'VIRAL', '#367c68', 60); stall(c, 820, 1460, 0.75, 'LAGI\nVIRAL!!!', '#e76f51', 160);
      guy(c, { ...AMIR, x: 820, y: 1300, s: 0.8, mood: l > 5 ? 'smile' : 'flat', look: 0.2 });
      CROWD.slice(0, 5).forEach((p, i) => guy(c, { ...p, s: p.s * 0.75, x: lerp(450 + i * 120, 600 - i * 120 + 600, mv), y: 1600 + (i % 2) * 20, hop: mv > 0 && mv < 1 ? bob(i) * 3 : 0, look: mv > 0.5 ? 0.5 : 0.1 }));
      cap(c, l, 0.2, 'SOLUSI #3', 160, { size: 70, bg: '#e76f51', fg: '#fffaf0', rot: -0.05 });
      cap(c, l, 0.7, 'Buka stall sebelah.\nTulis LAGI VIRAL.', 330, { size: 66 });
      cap(c, l, 5.4, 'Semua pindah\nqueue kau.', 1750, { size: 68 });
    } else if (T < 53) {                                              // H: twist
      const l = T - 45; c.fillStyle = '#f4e9d8'; c.fillRect(0, 0, W, H); rect(c, -20, 1350, W + 20, H + 20, '#b9825a', 81);
      CROWD.slice(0, 4).forEach((p, i) => { guy(c, { ...p, x: 160 + i * 250, y: 1360, s: 0.85, mood: l > 1.5 ? 'frown' : 'flat', look: 0.5 }); plate(c, 160 + i * 250, 1440, 0.55); });
      cap(c, l, 0.3, 'Masalah:\nkau pun tak reti masak.', 300, { size: 66 });
      cap(c, l, 3.2, 'Tapi tak apa.', 1650, { size: 70 });
      cap(c, l, 4.6, 'Esok queue lagi panjang.', 1800, { size: 64, bg: '#f5b544' });
    } else {                                                          // I: end
      const l = T - 53; c.fillStyle = '#263b55'; c.fillRect(0, 0, W, H);
      guy(c, { ...AMIR, x: W / 2, y: 1500, s: 1.5, mood: 'smile', armL: 2.6 + Math.sin(l * 8) * 0.2, beard: 0.6 });
      cap(c, l, 0.2, 'Sedap tak penting.\nYang penting VIRAL.', 330, { size: 72, bg: '#f5b544' });
      cap(c, l, 3.0, 'tag member yang ajak\nkau beratur hari tu', 1700, { size: 58 });
      cap(c, l, 4.6, 'SOLUSI TAK PERLU', 600, { size: 90, bg: '#e76f51', fg: '#fffaf0', rot: -0.04, font: 'Bangers-400' });
    }
    c.restore();
    c.save(); c.globalCompositeOperation = 'multiply'; c.globalAlpha = 0.5; c.drawImage(tex(), 0, 0); c.restore();
  }
  return { draw };
})();
