/* EP003: Macam mana 360 camera kereta berfungsi (relatable hook + explainer). Uses tools/rig2d.js */
const DUR = 33.5;
const RED = '#E76F51', YEL = '#F5B544', GRN = '#367C68', BLU = '#4C6FBF', PUR = '#9B6BD3', ASPH = '#6E7480';
const txt = (x, y, s, size = 44, fill = '#fff', anchor = 'middle', sw = 10) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" text-anchor="${anchor}">${s}</text>`;
const lines = (x, y, arr, size, fill, anchor) => arr.map((s, i) => txt(x, y + i * size * 1.05, s, size, fill, anchor)).join('');
const pop = (t, t0, d = .18) => t < t0 ? 0 : .7 + .3 * ease((t - t0) / d);
const at = (x, y, s, inner) => s <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
function pill(t, t0, label) { const w = label.length * 19 + 50; return at(360, 120, pop(t, t0), `<rect x="${-w / 2}" y="-40" width="${w}" height="72" rx="36" fill="${RED}" stroke="${INK}" stroke-width="6"/>${txt(0, 12, label, 36, '#fff', 'middle', 0)}`); }
function bubble(t, t0, t1, x, y, w, arr, tail, alt) {
  if (t < t0 || t >= t1) return ''; const h = arr.length * 40 + 30, s = pop(t, t0);
  return at(x, y, s, `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="24" fill="${alt ? '#FFF6D8' : '#fff'}" stroke="${INK}" stroke-width="5"/><path d="M${tail - 14} -3 L${tail} 26 L${tail + 16} -3Z" fill="${alt ? '#FFF6D8' : '#fff'}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="${tail - 12}" y="-8" width="26" height="8" fill="${alt ? '#FFF6D8' : '#fff'}"/>`
    + arr.map((l, i) => `<text x="0" y="${-h + 48 + i * 40}" font-size="32" fill="${INK}" text-anchor="middle">${l}</text>`).join(''));
}
function inset(id, who, pose, cx, cy, r = 105) {
  return `<clipPath id="c${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="${who === 'mei' ? '#CFE6F2' : '#FFE1A8'}"/>
    <g clip-path="url(#c${id})">${char(who, { x: cx, y: cy + 214, s: .98, ...pose })}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="7"/>`;
}
/* ---------- car (top-down, front = up) ---------- */
function car(x, y, s, rot, col = RED, ghost) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" ${ghost ? 'opacity=".95"' : ''}>
   ${[[-80, -92], [80, -92], [-80, 92], [80, 92]].map(([a, b]) => `<rect x="${a - 13}" y="${b - 26}" width="26" height="52" rx="8" fill="#2A2A30"/>`).join('')}
   <rect x="-75" y="-152" width="150" height="304" rx="52" fill="${col}" stroke="${INK}" stroke-width="6"/>
   <path d="M-58 -88 Q0 -108 58 -88 L50 -46 Q0 -56 -50 -46Z" fill="#26345A" stroke="${INK}" stroke-width="4"/>
   <rect x="-52" y="-42" width="104" height="112" rx="18" fill="${col}" stroke="${INK}" stroke-width="4" opacity=".9"/>
   <path d="M-50 76 Q0 68 50 76 L56 108 Q0 120 -56 108Z" fill="#26345A" stroke="${INK}" stroke-width="4"/>
   <ellipse cx="-86" cy="-50" rx="12" ry="8" fill="${col}" stroke="${INK}" stroke-width="4"/><ellipse cx="86" cy="-50" rx="12" ry="8" fill="${col}" stroke="${INK}" stroke-width="4"/>
   <ellipse cx="-50" cy="-140" rx="14" ry="7" fill="#FFF2B0" stroke="${INK}" stroke-width="3"/><ellipse cx="50" cy="-140" rx="14" ry="7" fill="#FFF2B0" stroke="${INK}" stroke-width="3"/></g>`;
}
const CAMS = [ // name, x, y (car coords), dir deg, colour
  ['Depan', 0, -154, -90, YEL], ['Belakang', 0, 154, 90, BLU], ['Cermin kiri', -94, -50, 180, GRN], ['Cermin kanan', 94, -50, 0, PUR]];
function cone(px, py, dir, R, col, op = .28) {
  let d = `M${px} ${py}`; for (let a = -97; a <= 97; a += 8) { const r = (dir + a) * D; d += ` L${px + Math.cos(r) * R} ${py + Math.sin(r) * R}`; }
  return `<path d="${d}Z" fill="${col}" opacity="${op}" stroke="${col}" stroke-width="3"/>`;
}
/* ---------- parking lot ---------- */
function lot() {
  let s = `<rect x="-400" y="-400" width="1520" height="2080" fill="${ASPH}"/>`;
  for (const [y0, y1] of [[160, 560], [780, 1180]]) for (let x = -450; x <= 1170; x += 180) s += `<rect x="${x - 5}" y="${y0}" width="10" height="${y1 - y0}" fill="#fff"/>`;
  s += `<rect x="-400" y="${555}" width="1520" height="10" fill="#fff" opacity=".0"/>`;
  s += `<path d="M-400 670 H1120" stroke="${YEL}" stroke-width="8" stroke-dasharray="40 30"/>`;
  for (const [x, y] of [[450, 575], [-90, 575], [990, 575]]) s += `<rect x="${x - 34}" y="${y - 34}" width="68" height="68" fill="#B8BDC4" stroke="${INK}" stroke-width="6"/>`;
  s += car(180, 360, .8, 0, '#4C6FBF') + car(720, 360, .8, 0, '#E8E8E8') + car(0, 980, .8, 180, GRN) + car(540, 980, .8, 180, '#E8A0BF') + car(-180, 360, .8, 0, '#D8B04A');
  return s;
}
/* ---------- camera image panel: k = fisheye bend (1..0), c = perspective (0 = camera view, 1 = top-down) ---------- */
function panel(x, y, w, h, k, c, label) {
  const cx = w / 2; let g = `<rect width="${w}" height="${h}" fill="${ASPH}"/>`;
  const conv = lerp(.35, 1, c);
  for (const xi of [-1, -.34, .34, 1]) {
    const xb = cx + xi * w * .42, xt = cx + xi * w * .42 * conv, ctrl = (xb + xt) / 2 + Math.sign(xi) * k * 70 * Math.abs(xi);
    g += `<path d="M${xb} ${h} Q${ctrl} ${h / 2} ${xt} 0" stroke="#fff" stroke-width="${lerp(5, 9, c)}" fill="none"/>`;
  }
  for (let j = 1; j <= 4; j++) {
    const f = Math.pow(j / 5, lerp(.55, 1, c)), yy = h * (1 - f), wid = w * .42 * lerp(1, conv, f) * 1.25;
    g += `<path d="M${cx - wid} ${yy} Q${cx} ${yy - k * 40 * (yy < h / 2 ? 1 : -1)} ${cx + wid} ${yy}" stroke="#fff" stroke-width="4" fill="none" opacity=".55"/>`;
  }
  if (k > 0) g += `<path d="M0 ${h} Q${cx} ${h - 110 * k} ${w} ${h}Z" fill="${RED}" stroke="${INK}" stroke-width="5" opacity="${k}"/>`
    + `<path fill-rule="evenodd" d="M0 0H${w}V${h}H0Z M${cx - 330} ${h / 2} a330 330 0 1 0 660 0 a330 330 0 1 0 -660 0Z" fill="#111" opacity="${.9 * k}"/>`;
  return `<g transform="translate(${x} ${y})"><clipPath id="pc"><rect width="${w}" height="${h}" rx="26"/></clipPath><g clip-path="url(#pc)">${g}</g><rect width="${w}" height="${h}" rx="26" fill="none" stroke="${INK}" stroke-width="8"/>
    <rect x="18" y="18" width="${label.length * 17 + 30}" height="46" rx="12" fill="${YEL}" stroke="${INK}" stroke-width="4"/><text x="33" y="51" font-size="28" fill="${INK}">${label}</text></g>`;
}
/* ---------- stitched bird's-eye ---------- */
const F = { x0: 150, x1: 570, y0: 250, y1: 1030 }, CAR = { x0: 285, x1: 435, y0: 488, y1: 792 };
const TILES = [
  [`${F.x0},${F.y0} ${F.x1},${F.y0} ${CAR.x1},${CAR.y0} ${CAR.x0},${CAR.y0}`, YEL, 0, -700],
  [`${CAR.x0},${CAR.y1} ${CAR.x1},${CAR.y1} ${F.x1},${F.y1} ${F.x0},${F.y1}`, BLU, 0, 700],
  [`${F.x0},${F.y0} ${CAR.x0},${CAR.y0} ${CAR.x0},${CAR.y1} ${F.x0},${F.y1}`, GRN, -700, 0],
  [`${F.x1},${F.y0} ${CAR.x1},${CAR.y0} ${CAR.x1},${CAR.y1} ${F.x1},${F.y1}`, PUR, 700, 0]];
function stitched(t, t0, seams, carOn, smear) {
  let s = `<rect x="${F.x0 - 14}" y="${F.y0 - 14}" width="${F.x1 - F.x0 + 28}" height="${F.y1 - F.y0 + 28}" rx="30" fill="#1B1D24" stroke="${INK}" stroke-width="8"/>`;
  TILES.forEach(([pts, col, dx, dy], i) => {
    const p = t0 == null ? 1 : ease((t - t0 - i * .35) / .5); if (p <= 0) return;
    s += `<g transform="translate(${dx * (1 - p)} ${dy * (1 - p)})"><clipPath id="tc${i}"><polygon points="${pts}"/></clipPath><g clip-path="url(#tc${i})">
      <rect x="0" y="0" width="720" height="1280" fill="${ASPH}"/><rect x="0" y="0" width="720" height="1280" fill="${col}" opacity=".22"/>
      <rect x="${F.x0}" y="395" width="${F.x1 - F.x0}" height="9" fill="#fff"/><rect x="${F.x0}" y="880" width="${F.x1 - F.x0}" height="9" fill="#fff"/>
      <rect x="196" y="${F.y0}" width="9" height="${F.y1 - F.y0}" fill="#fff"/><rect x="515" y="${F.y0}" width="9" height="${F.y1 - F.y0}" fill="#fff"/></g>
      <polygon points="${pts}" fill="none" stroke="${col}" stroke-width="4"/></g>`;
  });
  if (seams) s += [[F.x0, F.y0, CAR.x0, CAR.y0], [F.x1, F.y0, CAR.x1, CAR.y0], [F.x0, F.y1, CAR.x0, CAR.y1], [F.x1, F.y1, CAR.x1, CAR.y1]]
    .map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="#fff" stroke-width="22" opacity="${.35 * seams}" stroke-linecap="round"/><path d="M${a} ${b} L${c} ${d}" stroke="#fff" stroke-width="4" stroke-dasharray="12 10" opacity="${seams}"/>`).join('');
  if (smear) { const p = smear, ox = 360, oy = CAR.y0 - 4, px = 505, py = 330;
    s += `<path d="M${px - 26} ${py + 26} L${px + 26} ${py - 26} L${lerp(px + 26, 566, p)} ${lerp(py - 26, 256, p)} L${lerp(px - 26, 520, p)} ${lerp(py + 26, 256, p)}Z" fill="#B8BDC4" stroke="${INK}" stroke-width="5" opacity=".95"/>
      <rect x="${px - 30}" y="${py - 30}" width="60" height="60" fill="#B8BDC4" stroke="${INK}" stroke-width="5"/><path d="M${ox} ${oy} L${px} ${py}" stroke="${YEL}" stroke-width="4" stroke-dasharray="10 8"/>`; }
  if (carOn) s += at(360, 640, carOn, car(0, 0, 1, 0, RED));
  return s;
}
/* ---------- RENDER ---------- */
function render(t) {
  let s = '';
  const blink = o => ((t + o) % 3.3) < .12;
  if (t < 6.8) {                                             // HOOK + setup: basement parking
    const wig = t < 3 ? Math.sin(t * 5) : 0;
    const cx = 360 + wig * 40, cy = 700 - Math.max(0, wig) * 30;
    let w = lot() + car(cx, cy, .8, 90 + wig * 14, RED);
    if (t > 4.9) { const d = pop(t, 4.9); w += at(cx, cy - 210 + Math.sin(t * 20) * 6, d, `<rect x="-60" y="-12" width="120" height="24" rx="12" fill="#ddd" stroke="${INK}" stroke-width="5"/>${[-60, 60].map(x => `<ellipse cx="${x}" cy="-14" rx="40" ry="8" fill="#fff" stroke="${INK}" stroke-width="4" opacity=".8"/>`).join('')}<rect x="-24" y="-6" width="48" height="34" rx="10" fill="#555" stroke="${INK}" stroke-width="4"/>${txt(0, -40, '?', 64, YEL)}`); }
    s += cam(lerp(1.25, 1.1, Math.min(1, t / 3)), cx, cy, w);
    s += lines(360, 120, t < 3 ? ['POV: Parking basement mall.', 'Ruang SEMPIT gila.'] : [], 50, '#fff');
    s += inset('a', 'amir', { eyes: t > 4.7 ? 'wide' : 'half', mouth: t > 4.7 ? 'open' : 'wail', talk: t > 4.7 && t < 6.4 ? Math.abs(Math.sin(t * 14)) : .4, brow: 'sad', fx: { sweat: 1, gloom: t < 3 } }, 590, 1080);
    if (t > 3) s += inset('m', 'mei', { eyes: blink(.3) ? 'closed' : 'half', mouth: t < 4.6 ? 'open' : 'flat', talk: t < 4.6 ? Math.abs(Math.sin(t * 13)) : 0 }, 130, 1080);
    s += bubble(t, 3.1, 4.7, 270, 920, 380, ['Guna la 360 camera.'], -120);
    s += bubble(t, 4.7, 6.8, 420, 920, 520, ['Macam mana dia nampak dari', 'atas?? Ada drone ke?'], 160);
    if (t > 6) s += at(360, 560, pop(t, 6), `<g transform="rotate(-8)"><rect x="-230" y="-60" width="460" height="110" rx="16" fill="#fff" stroke="${RED}" stroke-width="10"/><text x="0" y="22" font-size="62" fill="${RED}" text-anchor="middle">TAKDE DRONE</text></g>`);
  } else if (t < 11.2) {                                     // 1. four cameras
    s += `<rect width="720" height="1280" fill="#F4E9D8"/>`;
    const grow = ease((t - 9.2) / 1);
    let g = '';
    if (t > 9.2) CAMS.forEach(([n, x, y, dir, col]) => g += cone(x, y, dir, 330 * grow, col));
    g += car(0, 0, 1, 0, RED);
    CAMS.forEach(([n, x, y, dir, col], i) => { const t0 = 7.3 + i * .5; if (t < t0) return; const p = pop(t, t0);
      const lx = i > 1 ? x + Math.sign(x) * 105 : x, ly = i > 1 ? y + 75 : y + Math.sin(dir * D) * 70;
      g += at(x, y, p, `<circle r="15" fill="${col}" stroke="${INK}" stroke-width="5"/><circle r="5" fill="${INK}"/>`) + at(lx, ly, p, txt(0, 10, n, 30, col, 'middle', 8)); });
    s += at(360, 660, 1.12, g) + pill(t, 6.9, '1. Ada 4 kamera');
    if (t > 9.6) s += lines(360, 1150, ['Setiap satu nampak 180°+', '(lensa fisheye)'], 40, '#fff');
  } else if (t < 19.2) {                                     // 2-3. fisheye, dewarp, top-down
    s += `<rect width="720" height="1280" fill="#F4E9D8"/>`;
    const k = 1 - ease((t - 14.9) / 1.4), c = ease((t - 16.6) / 1.6);
    s += at(360, 330, .55, cone(0, -154, -90, 300, YEL, .35) + car(0, 0, 1, 0, RED) + `<circle cx="0" cy="-154" r="16" fill="${YEL}" stroke="${INK}" stroke-width="5"/>`);
    s += `<path d="M360 430 L360 470" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M340 458 L360 482 L380 458" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    s += panel(60, 500, 600, 560, k, c, c > .5 ? 'Pandangan atas' : 'Kamera depan');
    s += t < 14.6 ? pill(t, 11.3, '2. Gambar fisheye: bengkok') : pill(t, 14.6, '3. Komputer betulkan gambar');
    const cap = t < 14.6 ? ['Garisan lurus jadi melengkung'] : t < 16.5 ? ['Buang bengkok (dewarp)'] : ['Pusing jadi pandangan atas', '(ikut kalibrasi kilang)'];
    s += lines(360, 1130, cap, 40, '#fff');
  } else if (t < 27.2) {                                     // 4. stitch + limitation
    s += `<rect width="720" height="1280" fill="#F4E9D8"/>`;
    const seams = t > 21.1 && t < 23.6 ? Math.min(1, (t - 21.1) / .3) : 0, carOn = t > 22.2 ? pop(t, 22.2, .25) : 0, smear = t > 24.1 ? ease((t - 24.1) / 1) : 0;
    s += stitched(t, 19.3, seams, carOn, smear);
    s += t < 23.7 ? pill(t, 19.2, '4. Cantum 4 gambar') : pill(t, 23.7, 'Kenapa tiang nampak herot?');
    if (t > 21.1 && t < 22.2) s += lines(360, 1130, ['Bahagian bertindih di-blend'], 40, '#fff');
    if (t > 22.3 && t < 23.7) s += lines(360, 1110, ['Kereta tu? Grafik je,', 'bukan gambar sebenar.'], 40, YEL);
    if (t > 24.3) s += lines(360, 1110, ['Komputer anggap semua benda rata.', 'Benda tinggi jadi "tertarik".'], 36, '#fff');
  } else if (t < 28.9) {                                     // payoff: screen looks perfect
    s += `<rect width="720" height="1280" fill="#1B1D24"/>` + at(360, 600, .78, `<g transform="translate(-360 -640)">${stitched(t, null, 0, 1, 0)}</g>`);
    s += lines(360, 140, ['Ikut skrin…'], 50, '#fff');
    s += inset('a2', 'amir', { eyes: 'happy', mouth: 'grin', blush: 1 }, 360, 1080);
    s += bubble(t, 27.4, 28.9, 360, 940, 360, ['PERFECT. ✨'], 0, 1);
  } else if (t < 31.6) {                                     // reveal: two lots
    const z = lerp(1.4, 1.05, ease((t - 28.9) / .6)), sh = t < 29.2 ? Math.sin(t * 120) * 10 : 0;
    s += cam(z, 450 + sh, 420, lot() + car(450, 360, .8, 14, RED));
    s += lines(360, 120, ['Realiti:'], 54, YEL);
    s += inset('m2', 'mei', { eyes: 'half', mouth: t > 29.4 && t < 31 ? 'open' : 'flat', talk: Math.abs(Math.sin(t * 12)) }, 130, 1080);
    s += inset('a3', 'amir', { eyes: 'half', mouth: 'frown', brow: 'sad', fx: { gloom: 1, sweat: 1 } }, 590, 1080);
    s += bubble(t, 29.3, 31.6, 330, 920, 460, ['360 darjah… still', 'ambik dua lot.'], -110);
  } else {                                                   // end card
    s += `<rect width="720" height="1280" fill="${YEL}"/>` + at(360, 560, pop(t, 31.6, .25), `<text x="0" y="-60" font-size="150" fill="${RED}" stroke="${INK}" stroke-width="16" text-anchor="middle">KALAU</text><text x="0" y="90" font-size="150" fill="${RED}" stroke="${INK}" stroke-width="16" text-anchor="middle">LAH!</text>`)
      + `<text x="360" y="790" font-size="40" fill="#263B55" text-anchor="middle">Malaysian everyday life, animated.</text>`
      + `<rect x="130" y="840" width="460" height="76" rx="38" fill="#263B55" stroke="${INK}" stroke-width="5"/><text x="360" y="890" font-size="32" fill="#F4E9D8" text-anchor="middle">Tag kawan parking senget</text>`;
  }
  $('v').innerHTML = s;
}
boot();
