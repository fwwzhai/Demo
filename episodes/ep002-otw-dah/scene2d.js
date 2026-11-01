/* EP002 Otw Dah: 2D anime-cartoon rigs (Doraemon / Shin-chan-ish proportions). render(t) rebuilds SVG each frame. */
const DUR = 37, INK = '#222', OW = 5;
const $ = id => document.getElementById(id);
const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const lerp = (a, b, x) => a + (b - a) * x;
const D = Math.PI / 180;

/* ---------- CHARACTERS ---------- */
const CH = {
  amir: { skin: '#F2C9A0', shirt: '#7A8450', pants: '#3B4256', shoe: '#F4F4F4' },
  kavi: { skin: '#B5784A', shirt: '#F5D35E', pants: '#3B4256', shoe: '#E76F51', tee: '#8EC5E8' },
  din:  { skin: '#A86C42', shirt: '#FFFFFF', pants: '#2E3A33', shoe: '#444' },
  npc:  { skin: '#EBC09A', shirt: '#367C68', pants: '#263B55', shoe: '#333' },
};
function limb(x, y, ang, len, w, col, side, end) {
  const ex = x + side * Math.sin(ang * D) * len, ey = y + Math.cos(ang * D) * len;
  const mx = (x + ex) / 2 - side * 6 * Math.cos(ang * D), my = (y + ey) / 2;
  const d = `M${x} ${y} Q${mx} ${my} ${ex} ${ey}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="${w + OW * 2}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` + (end ? end(ex, ey) : '');
}
function face(o, c) {
  const e = o.eyes || 'n', m = o.mouth || 'smile', ex = o.look || 0;
  let s = '';
  for (const x of [-26, 26]) {
    const X = x + ex;
    if (e === 'n') s += `<ellipse cx="${X}" cy="-4" rx="8" ry="12" fill="${INK}"/><circle cx="${X + 2}" cy="-8" r="3" fill="#fff"/>`;
    if (e === 'half') s += `<path d="M${X - 11} -2 Q${X} 10 ${X + 11} -2Z" fill="${INK}"/><path d="M${X - 13} -3 L${X + 13} -3" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    if (e === 'wide') s += `<circle cx="${X}" cy="-6" r="15" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="${X}" cy="-6" r="3.5" fill="${INK}"/>`;
    if (e === 'closed') s += `<path d="M${X - 11} -2 Q${X} 6 ${X + 11} -2" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    if (e === 'happy') s += `<path d="M${X - 11} 0 Q${X} -14 ${X + 11} 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  }
  if (o.brow === 'sad') s += `<path d="M-38 -26 L-16 -20 M38 -26 L16 -20" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  if (o.brow === 'mad') s += `<path d="M-38 -24 L-16 -16 M38 -24 L16 -16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  if (o.blush) s += `<ellipse cx="-42" cy="18" rx="12" ry="6" fill="#F28B82" opacity=".7"/><ellipse cx="42" cy="18" rx="12" ry="6" fill="#F28B82" opacity=".7"/>`;
  const my = 34;
  if (m === 'smile') s += `<path d="M-14 ${my - 4} Q0 ${my + 8} 14 ${my - 4}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (m === 'frown') s += `<path d="M-14 ${my + 4} Q0 ${my - 8} 14 ${my + 4}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (m === 'flat') s += `<path d="M-12 ${my} L12 ${my}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  if (m === 'open') { const h = 8 + (o.talk || 0) * 10; s += `<path d="M-14 ${my - 4} Q0 ${my + h * 2} 14 ${my - 4}Z" fill="#8B2E2E" stroke="${INK}" stroke-width="3.5"/><path d="M-7 ${my + h * .8} Q0 ${my + h * .4} 7 ${my + h * .8}" fill="#E76F51"/>`; }
  if (m === 'grin') s += `<path d="M-24 ${my - 8} Q0 ${my + 26} 24 ${my - 8}Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M-21 ${my - 2} L21 ${my - 2}" stroke="${INK}" stroke-width="2"/>`;
  if (m === 'wail') s += `<path d="M-22 ${my - 6} L22 ${my - 6} L14 ${my + 22} L-14 ${my + 22}Z" fill="#8B2E2E" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  return s;
}
function hair(who, c) {
  if (who === 'amir') return `<path d="M-80 -6 Q-86 -78 -10 -88 Q70 -92 82 -10 L68 -30 L58 -16 L50 -46 L34 -26 L22 -54 L8 -30 L-8 -56 L-20 -30 L-36 -52 L-48 -26 L-62 -40Z" fill="${INK}"/>`
    + `<g fill="none" stroke="${INK}" stroke-width="4"><circle cx="-26" cy="-4" r="20"/><circle cx="26" cy="-4" r="20"/><path d="M-6 -6 Q0 -10 6 -6 M-46 -8 L-74 -14 M46 -8 L74 -14"/></g>`;
  if (who === 'kavi') { let s = ''; [[-70, -30], [-58, -64], [-30, -86], [4, -94], [38, -86], [64, -62], [74, -28], [-40, -60], [10, -66], [44, -52]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="24"/>`); return `<g fill="#1A1620" stroke="${INK}" stroke-width="4">${s}</g>`; }
  if (who === 'din') return `<path d="M-80 -10 Q-82 -84 0 -88 Q82 -86 80 -12 Q66 -50 20 -54 Q-30 -56 -56 -38 Q-70 -28 -80 -10Z" fill="${INK}"/><path d="M-30 20 Q-14 8 0 16 Q14 8 30 20 Q16 28 0 22 Q-16 28 -30 20Z" fill="${INK}"/>`;
  if (who === 'npc') return `<path d="M-82 10 Q-90 -84 0 -88 Q90 -84 82 10 L70 10 Q66 -40 0 -46 Q-66 -40 -70 10Z" fill="#5A3A28" stroke="${INK}" stroke-width="4"/>`;
  return '';
}
/* o: x,y (feet), s scale, aL,aR arm angles (0 down, 180 up), lL,lR leg angles, lean, tilt, eyes, mouth, talk, towel, fx {gloom,sweat,vein}, hold:'phone'|'twisties'|'tray' */
function char(who, o) {
  const c = CH[who], s = o.s || 1, k = o.towel;
  const bodyCol = k ? c.skin : c.shirt, legCol = k ? c.skin : c.pants;
  const hand = col => (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="${col}" stroke="${INK}" stroke-width="${OW - 1}"/>` + (o.holdAt === 'R' && x > 0 || o.holdAt === 'L' && x < 0 ? hold(o.hold, x, y) : '');
  const shoe = (x, y) => `<ellipse cx="${x}" cy="${y + 4}" rx="22" ry="12" fill="${c.shoe}" stroke="${INK}" stroke-width="${OW - 1}"/>`;
  let g = '';
  g += `<ellipse cx="0" cy="4" rx="70" ry="12" fill="#000" opacity=".12"/>`;
  g += limb(-18, -62, o.lL || 0, 50, 28, legCol, -1, shoe) + limb(18, -62, o.lR || 0, 50, 28, legCol, 1, shoe);
  let torso = `<path d="M-50 -60 Q-56 -150 0 -152 Q56 -150 50 -60 Q0 -48 -50 -60Z" fill="${bodyCol}" stroke="${INK}" stroke-width="${OW}"/>`;
  if (who === 'kavi' && !k) torso += `<path d="M-20 -148 L0 -116 L20 -148Z" fill="${c.tee}" stroke="${INK}" stroke-width="3"/><path d="M-30 -150 Q0 -128 30 -150" fill="none" stroke="${INK}" stroke-width="4"/><path d="M-10 -120 L-12 -92 M10 -120 L12 -92" stroke="${INK}" stroke-width="3"/>`;
  if (who === 'amir') torso += `<path d="M-22 -150 L0 -128 L22 -150 L12 -152 L0 -140 L-12 -152Z" fill="#646D3F" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="-110" r="3" fill="${INK}"/><circle cx="0" cy="-88" r="3" fill="${INK}"/>`;
  if (who === 'din') torso += `<path d="M-34 -124 L34 -124 L40 -58 Q0 -50 -40 -58Z" fill="#367C68" stroke="${INK}" stroke-width="4"/><path d="M-30 -124 L-24 -150 M30 -124 L24 -150" stroke="#367C68" stroke-width="7"/><path d="M26 -152 Q60 -150 62 -108 L46 -104 Q44 -134 22 -140Z" fill="#F4E9D8" stroke="${INK}" stroke-width="4"/>`;
  if (who === 'npc') torso += `<rect x="-14" y="-140" width="28" height="18" rx="4" fill="#F5B544" stroke="${INK}" stroke-width="3"/>`;
  if (k) torso += `<path d="M-54 -86 Q0 -72 54 -86 L58 -40 Q0 -28 -58 -40Z" fill="#FFFFFF" stroke="${INK}" stroke-width="${OW}"/><path d="M30 -82 L36 -40" stroke="${INK}" stroke-width="3"/>`;
  g += torso;
  const armCol = k ? c.skin : c.shirt;
  g += limb(-44, -136, o.aL || 15, 62, 24, armCol, -1, hand(c.skin)) + limb(44, -136, o.aR || 15, 62, 24, armCol, 1, hand(c.skin));
  // head
  let h = `<ellipse cx="-82" cy="6" rx="12" ry="16" fill="${c.skin}" stroke="${INK}" stroke-width="4"/><ellipse cx="82" cy="6" rx="12" ry="16" fill="${c.skin}" stroke="${INK}" stroke-width="4"/>`;
  h += `<ellipse cx="0" cy="0" rx="82" ry="78" fill="${c.skin}" stroke="${INK}" stroke-width="${OW}"/>`;
  h += face(o, c) + hair(who, c);
  if (o.fx?.gloom) { let gl = ''; for (let i = 0; i < 9; i++) gl += `<path d="M${-60 + i * 15} -70 L${-60 + i * 15} ${-30 + (i % 3) * 10}" stroke="#4C6FBF" stroke-width="4" opacity=".75"/>`; h += gl; }
  if (o.fx?.sweat) h += `<path d="M78 -40 Q96 -14 86 0 Q70 4 70 -14 Q72 -28 78 -40Z" fill="#9FD3F5" stroke="${INK}" stroke-width="3"/>`;
  if (o.fx?.vein) h += `<path d="M44 -60 l10 10 m-10 0 l10 -10 M50 -66 v22 M40 -55 h22" stroke="#E5383B" stroke-width="5" stroke-linecap="round"/>`;
  const hy = -152 - 70;
  g += `<g transform="translate(${o.hx || 0} ${hy + (o.hy || 0)}) rotate(${o.tilt || 0})">${h}</g>`;
  return `<g transform="translate(${o.x} ${o.y}) scale(${(o.flip ? -1 : 1) * s} ${s}) rotate(${o.lean || 0} 0 -60)">${g}</g>`;
}
function hold(what, x, y) {
  if (what === 'phone') return `<rect x="${x - 12}" y="${y - 34}" width="26" height="44" rx="5" fill="#222" stroke="${INK}" stroke-width="3"/><rect x="${x - 8}" y="${y - 30}" width="18" height="32" rx="2" fill="#8EC5E8"/>`;
  if (what === 'twisties') return `<path d="M${x - 22} ${y - 50} L${x + 24} ${y - 50} L${x + 20} ${y + 10} L${x - 18} ${y + 10}Z" fill="#F28C28" stroke="${INK}" stroke-width="4"/><text x="${x + 1}" y="${y - 14}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" font-family="Baloo 2,sans-serif">CRUNCH</text>`;
  return '';
}
/* ---------- PROPS + SETS ---------- */
const table = () => `<rect x="342" y="905" width="36" height="230" fill="#9AA0A6" stroke="${INK}" stroke-width="5"/><ellipse cx="360" cy="1140" rx="110" ry="20" fill="#9AA0A6" stroke="${INK}" stroke-width="5"/>
  <path d="M110 880 Q360 940 610 880 L610 900 Q360 965 110 900Z" fill="#D8D8D2" stroke="${INK}" stroke-width="5"/><ellipse cx="360" cy="880" rx="250" ry="44" fill="#F7F7F2" stroke="${INK}" stroke-width="5"/>`;
const stool = (x, y) => `<path d="M${x - 50} ${y} L${x + 50} ${y} L${x + 60} ${y + 110} L${x - 60} ${y + 110}Z" fill="#E5383B" stroke="${INK}" stroke-width="5"/><ellipse cx="${x}" cy="${y}" rx="50" ry="12" fill="#F26B6E" stroke="${INK}" stroke-width="5"/>`;
function glass(melt, x = 470, y = 880) {
  const lvl = 0.72 + 0.28 * melt, col = melt > .5 ? '#C7864A' : melt > .1 ? '#D49B66' : '#E2BC8F';
  let ice = ''; if (melt > .05) for (let i = 0; i < 3; i++) { const sz = 10 + 12 * melt; ice += `<rect x="${x - 18 + i * 12}" y="${y - 96 + i * 7}" width="${sz}" height="${sz}" rx="3" fill="#fff" stroke="#9fc4e0" stroke-width="2" opacity=".95"/>`; }
  const top = y - 110 * lvl;
  return `<path d="M${x - 30} ${y - 116} L${x + 30} ${y - 116} L${x + 24} ${y} L${x - 24} ${y}Z" fill="#EAF6FF" stroke="${INK}" stroke-width="4" opacity=".9"/>
    <path d="M${x - 28 + (1 - lvl) * 4} ${top} L${x + 28 - (1 - lvl) * 4} ${top} L${x + 23} ${y - 3} L${x - 23} ${y - 3}Z" fill="${col}"/>${ice}
    <path d="M${x + 8} ${y - 150} L${x + 2} ${y - 20}" stroke="#E76F51" stroke-width="6" stroke-linecap="round"/>`;
}
function tray(x, y) {
  return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="120" ry="26" fill="#C4CAD0" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="-40" cy="-16" rx="56" ry="22" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/><path d="M-80 -18 Q-40 -66 0 -18Z" fill="#FFF3D6" stroke="${INK}" stroke-width="4"/><path d="M-88 -14 Q-40 -34 4 -14 Q-40 6 -88 -14Z" fill="#C0602A" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="54" cy="-10" rx="40" ry="12" fill="#E9C27A" stroke="${INK}" stroke-width="4"/><ellipse cx="54" cy="-20" rx="40" ry="12" fill="#F0CF8A" stroke="${INK}" stroke-width="4"/>
    <path d="M70 -74 L104 -74 L100 -20 L74 -20Z" fill="#7A4A25" stroke="${INK}" stroke-width="4"/><ellipse cx="87" cy="-78" rx="24" ry="14" fill="#5A3518" stroke="${INK}" stroke-width="4"/></g>`;
}
function web(op) {
  let s = ''; const cx = 120, cy = 160;
  for (let a = 0; a < 7; a++) { const an = (a / 7) * Math.PI * .5 + .05; s += `<path d="M0 0 L${Math.cos(an) * 330} ${Math.sin(an) * 330}"/>`; }
  for (let r = 1; r <= 5; r++) { let d = ''; for (let a = 0; a < 7; a++) { const an = (a / 7) * Math.PI * .5 + .05, rr = r * 60; d += (a ? ' L' : 'M') + `${Math.cos(an) * rr} ${Math.sin(an) * rr}`; } s += `<path d="${d}"/>`; }
  return `<g transform="translate(600 520) scale(-1 1)" stroke="#fff" stroke-width="2.5" fill="none" opacity="${op}">${s}</g>`;
}
const MAMAK = `<rect width="720" height="1280" fill="#FFF1D6"/><rect y="0" width="720" height="70" fill="#F5B544"/>
  <rect y="640" width="720" height="260" fill="#43A08A"/><path d="${Array.from({ length: 13 }, (_, i) => `M${i * 60} 640 V900`).join(' ')} M0 700 H720 M0 770 H720 M0 840 H720" stroke="#2F7F6A" stroke-width="3"/>
  <rect y="900" width="720" height="560" fill="#E8DCC6"/><path d="${Array.from({ length: 8 }, (_, i) => `M${-200 + i * 140} 1280 L${100 + i * 90} 900`).join(' ')} M0 1000 H720 M0 1120 H720" stroke="#D3C4A8" stroke-width="3"/>
  <g transform="translate(20 230) scale(.8)"><rect x="40" y="130" width="250" height="170" rx="14" fill="#2B2B33" stroke="${INK}" stroke-width="6"/><text x="165" y="175" text-anchor="middle" font-size="30" font-weight="800" fill="#F5B544" font-family="Baloo 2,sans-serif">MAMAK PAK DIN</text>
  <text x="62" y="215" font-size="22" fill="#fff" font-family="Baloo 2,sans-serif">Roti Canai ...... 1.50</text><text x="62" y="245" font-size="22" fill="#fff" font-family="Baloo 2,sans-serif">Teh Ais .......... 2.50</text><text x="62" y="275" font-size="22" fill="#fff" font-family="Baloo 2,sans-serif">Nasi Kandar .... ??</text></g>
  <rect x="470" y="96" width="200" height="20" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/>
  <rect x="520" y="520" width="200" height="140" fill="#B07A4A" stroke="${INK}" stroke-width="5"/><path d="M560 520 l10 -50 h30 l10 50Z M630 520 l8 -40 h26 l8 40Z" fill="#C9CED3" stroke="${INK}" stroke-width="4"/>`;
const ROOM = `<rect width="720" height="1280" fill="#CFE6F2"/><rect y="880" width="720" height="580" fill="#E0B07E"/><path d="M0 960 H720 M0 1060 H720 M0 1180 H720" stroke="#C99766" stroke-width="4"/>
  <rect x="440" y="220" width="200" height="170" rx="10" fill="#26345A" stroke="${INK}" stroke-width="6"/><circle cx="590" cy="270" r="22" fill="#FFF2B0"/><path d="M540 220 V390 M440 305 H640" stroke="${INK}" stroke-width="6"/>
  <rect x="80" y="230" width="150" height="200" rx="8" fill="#E76F51" stroke="${INK}" stroke-width="5"/><text x="155" y="345" text-anchor="middle" font-size="40" font-weight="800" fill="#fff" font-family="Baloo 2,sans-serif">GYM</text>
  <rect x="40" y="700" width="640" height="190" rx="40" fill="#5577A8" stroke="${INK}" stroke-width="6"/><rect x="70" y="800" width="580" height="80" rx="20" fill="#6A8CBD" stroke="${INK}" stroke-width="5"/>`;
const KIOSK = `<rect width="720" height="1280" fill="#F7F7F7"/><rect y="80" width="720" height="50" fill="#367C68"/><text x="360" y="118" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Baloo 2,sans-serif">KEDAI STESEN MINYAK 24 JAM</text>
  ${[0, 1, 2].map(r => `<rect x="380" y="${330 + r * 150}" width="320" height="12" fill="#BFC5CC" stroke="${INK}" stroke-width="3"/>` + Array.from({ length: 6 }, (_, k) => `<rect x="${392 + k * 50}" y="${262 + r * 150}" width="40" height="68" rx="6" fill="${['#E76F51', '#F5B544', '#367C68', '#263B55', '#E8A0BF', '#8EC5E8'][(k + r) % 6]}" stroke="${INK}" stroke-width="3"/>`).join('')).join('')}
  <rect y="980" width="720" height="480" fill="#DDE3E8"/>`;
const KIOSK_COUNTER = `<rect x="0" y="830" width="420" height="200" fill="#E76F51" stroke="${INK}" stroke-width="6"/><rect x="-10" y="815" width="440" height="26" fill="#F4F4F4" stroke="${INK}" stroke-width="5"/>`;

/* ---------- OVERLAY DATA (same timing as soundtrack) ---------- */
const BUBS = [
  [21.6, 24.3, 'Sorry bro, jem gila tadi!', 330, 400, 360, '250px'],
  [24.6, 27.3, 'Korang dah order? Aku tak lapar sangat.', 300, 390, 400, '260px'],
  [27.9, 29.8, 'Biasa kan, Kavi?', 30, 420, 320, '70px'],
  [30.1, 33.0, 'Eh bro… wallet aku tertinggal la.', 300, 390, 400, '260px'],
];
const BANS = [[3.2, 5.4, 'otw dah bro 🔥'], [9.2, 11.5, 'dah dekat ni 🚗💨'], [15.2, 17.5, '5 min sampai 🙏']];
const show = (id, on, t0, t) => { const e = $(id); e.style.display = on ? 'block' : 'none'; if (on && t0 != null) { const p = ease((t - t0) / .18); e.style.transform = (e.dataset.rot || '') + ` scale(${.7 + .3 * p})`; e.style.opacity = p; } };

/* ---------- RENDER ---------- */
function cam(z, cx, cy, inner) { return `<g transform="translate(360 640) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`; }
function render(t) {
  const sc = t < 2.6 ? 'hook' : t < 5.6 ? 'm1' : t < 9 ? 'r1' : t < 11.6 ? 'm2' : t < 15 ? 'r2' : t < 17.6 ? 'm3' : t < 21 ? 'k1' : t < 34.5 ? 'm4' : 'end';
  const blink = o => ((t + o) % 3.3) < .12;
  const talk = (a, b) => t > a && t < b ? Math.abs(Math.sin(t * 14)) : -1;
  let svg = '';
  const amirBase = { x: 360, y: 1010, s: 1.25, aL: 30, aR: 30 };
  if (sc === 'hook' || sc[0] === 'm') {
    const melt = sc === 'hook' || sc === 'm4' ? 0 : sc === 'm1' ? 1 : sc === 'm2' ? .55 : .2;
    let back = MAMAK + stool(600, 1060) + stool(120, 1060), front = '';
    let A = { ...amirBase };
    if (sc === 'hook' || (sc === 'm4' && t < 21.6)) Object.assign(A, { eyes: 'half', mouth: 'frown', brow: 'sad', fx: { gloom: 1 }, aL: 20, aR: 20 });
    if (sc === 'm1') { const up = t > 3.6; Object.assign(A, { eyes: blink(0) ? 'closed' : up ? 'happy' : 'n', mouth: t > 3.4 ? 'grin' : 'smile', aR: up ? 160 : 40, hold: 'phone', holdAt: 'R', blush: up }); }
    if (sc === 'm2') Object.assign(A, { eyes: blink(.5) ? 'closed' : 'n', mouth: 'smile', aR: 70, hold: 'phone', holdAt: 'R', look: 6 });
    if (sc === 'm3') Object.assign(A, { eyes: 'half', mouth: 'flat', brow: 'sad', aR: 70, hold: 'phone', holdAt: 'R', tilt: 10, fx: { sweat: 1 } });
    let K = null, P = null, tr = '';
    if (sc === 'm2') P = { x: 610, y: 1000, s: 1.15, flip: 1, eyes: 'half', mouth: 'flat', aR: 120 + Math.sin(t * 6) * 25, aL: 20 };
    if (sc === 'm3') P = { x: 150, y: 1010, s: 1.2, eyes: 'half', mouth: 'frown', brow: 'sad', aR: 110, aL: 15 };
    if (sc === 'm4' && t >= 21.6) {
      const walk = Math.min(1, (t - 21.6) / 1.2), w = Math.sin(t * 13) * (walk < 1 ? 1 : 0), kt = talk(21.6, 23.6) > -1 ? talk(21.6, 23.6) : talk(24.6, 26.8) > -1 ? talk(24.6, 26.8) : talk(30.1, 32.4);
      K = { x: lerp(860, 590, walk), y: 1010, s: 1.2, flip: 1, lL: w * 25, lR: -w * 25, aL: 20 + w * 25, aR: walk < 1 ? 150 : 30, eyes: blink(2) ? 'closed' : t > 30 ? 'closed' : 'n', mouth: kt > -1 ? 'open' : 'grin', talk: kt, fx: t > 30 ? { sweat: 1 } : null, blush: t > 30 };
      if (t > 27.6 && t < 30) Object.assign(K, { eyes: 'happy', mouth: 'grin', aL: 160, aR: 160 });
      const plant = t > 33.2, pk = ease((t - 33.2) / .2);
      Object.assign(A, { eyes: t > 27.8 && t < 30 ? 'wide' : 'half', mouth: t > 27.8 && t < 30 ? 'wail' : 'flat', brow: t > 30 ? 'mad' : '', fx: { vein: t > 24.6 && t < 33.2 }, look: t < 24.4 ? 10 : 0 });
      if (plant) Object.assign(A, { hy: pk * 120, tilt: 0, eyes: 'closed', mouth: 'flat', fx: {} });
      if (t > 27.6) { const dk = ease((t - 27.6) / .35); P = { x: lerp(-120, 130, dk), y: 1010, s: 1.2, eyes: 'half', mouth: talk(27.9, 29.2) > -1 ? 'open' : 'smile', talk: talk(27.9, 29.2), aR: dk < 1 ? 100 : 60, aL: 30 }; tr = tray(lerp(140, 235, dk), lerp(840, 905, dk)); }
      if (plant) front += `<text x="${360}" y="${720 - 40 * Math.sin(Math.min(1, (t - 33.3) * 3) * Math.PI / 2)}" font-size="70" text-anchor="middle" font-weight="800" fill="${INK}" font-family="Baloo 2,sans-serif">BUK!</text>`;
      if (t > 33.6) { const sk = (t - 33.6); front += `<g transform="translate(${360 + Math.sin(sk * 4) * 20} ${760 - sk * 160})" opacity="${Math.max(0, 1 - sk / 1.2)}"><path d="M-40 0 Q-44 -80 0 -84 Q44 -80 40 0 L30 20 L18 4 L0 24 L-18 4 L-30 20Z" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="-14" cy="-44" r="10" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="14" cy="-44" r="10" fill="none" stroke="${INK}" stroke-width="3"/></g>`; }
    }
    svg = back + (P && P.x < 360 ? char('din', P) : '') + char('amir', A) + (K ? char('kavi', K) : '') + (P && P.x >= 360 ? char('din', P) : '') + table() + glass(melt) + tr + front;
    if (sc === 'hook' || (sc === 'm4' && t < 24.6)) svg += web(sc === 'hook' ? .9 : Math.max(0, 1 - (t - 23.6)));
    const z = sc === 'hook' ? lerp(1.05, 1.15, t / 2.6) : sc === 'm4' && t > 33.2 ? lerp(1, 1.25, ease((t - 33.2) / 1)) : 1;
    let shake = sc === 'm4' && t > 27.75 && t < 28.1 ? Math.sin(t * 120) * 8 : sc === 'm4' && t > 33.2 && t < 33.5 ? Math.sin(t * 140) * 10 : 0;
    svg = cam(z, 360 + shake, 700, svg);
  }
  if (sc === 'r1') {
    const d = Math.sin(t * 7), z = lerp(1, 1.08, (t - 5.6) / 3.4);
    svg = cam(z, 360, 700, ROOM + char('kavi', { x: 360, y: 1130 - Math.abs(d) * 14, s: 1.6, towel: 1, lean: d * 6, aR: 165, aL: 110 + d * 30, lL: d * 18, lR: -d * 18, eyes: blink(1) ? 'closed' : 'happy', mouth: 'open', talk: .6 + .4 * Math.abs(d), hold: 'phone', holdAt: 'R', tilt: d * 6 }));
    svg += `<text x="560" y="560" font-size="56" font-family="sans-serif" opacity="${.5 + .5 * Math.abs(d)}">🎵</text>`;
  }
  if (sc === 'r2') {
    let cush = '';
    [0, 1, 2].forEach(i => { const tt = t - (12 + i * .5); let x = 150 + i * 180, y = 770, r = 0;
      if (tt > 0) { const ph = tt % 1.6; x += (i - 1) * 260 * ph + 40; y = 770 - 700 * ph + 520 * ph * ph; r = ph * 400; }
      cush += `<rect x="-55" y="-45" width="110" height="90" rx="22" fill="${['#F5B544', '#E76F51', '#F4E9D8'][i]}" stroke="${INK}" stroke-width="5" transform="translate(${x} ${y}) rotate(${r})"/>`; });
    const dig = Math.sin(t * 16);
    svg = cam(1, 360, 640, ROOM + char('kavi', { x: 430, y: 1060, s: 1.5, lean: -55, aL: 170 + dig * 25, aR: 170 - dig * 25, lL: 8, lR: -8, eyes: 'wide', mouth: 'wail', fx: { sweat: 1 } }) + cush);
  }
  if (sc === 'k1') {
    const l = Math.abs(Math.sin(t * 9));
    svg = cam(lerp(1, 1.06, (t - 17.6) / 3.4), 360, 680, KIOSK + char('npc', { x: 190, y: 1000, s: 1.2, eyes: l > .7 ? 'happy' : 'n', mouth: 'open', talk: Math.abs(Math.sin(t * 8 + 1)), aL: 20, aR: 30, look: 8 })
      + KIOSK_COUNTER + char('kavi', { x: 520, y: 1150, s: 1.45, eyes: 'happy', mouth: 'open', talk: l, lean: -4 * l, aR: 110, aL: 130 - 40 * l, hold: 'twisties', holdAt: 'R', look: -8, blush: 1 }));
  }
  if (sc === 'end') svg = '';
  $('v').innerHTML = svg;
  // overlays
  show('pov', t < 2.6 || (sc === 'm1' && t < 3.1), t < 2.6 ? 0 : null, t);
  const capTx = t < 2.6 ? '1 jam 47 minit kemudian…' : (t >= 2.6 && t < 3.1) ? '8:00 PM' : '';
  $('cap').textContent = capTx; show('cap', !!capTx, t < 2.6 ? .15 : null, t);
  const clk = sc === 'hook' || sc === 'm4' ? '9:47 PM' : sc === 'm1' ? '8:00 PM' : sc === 'm2' ? '8:40 PM' : sc === 'm3' ? '9:15 PM' : '';
  $('clock').textContent = clk; show('clock', !!clk);
  const real = sc === 'r1' ? 'baru siap mandi' : sc === 'r2' ? 'cari kunci kereta' : sc === 'k1' ? 'beli Twisties. Borak dengan cashier.' : '';
  $('realtx').textContent = real; $('real').dataset.rot = 'rotate(-3deg)'; show('real', !!real, sc === 'r1' ? 5.6 : sc === 'r2' ? 11.6 : 17.6, t);
  const bn = BANS.find(b => t >= b[0] && t < b[1]); if (bn) $('bantx').textContent = bn[2]; const be = $('ban'); be.style.display = bn ? 'flex' : 'none'; if (bn) { const p = ease((t - bn[0]) / .25); be.style.transform = `translateY(${(1 - p) * -220}px)`; }
  const bb = BUBS.find(b => t >= b[0] && t < b[1]); const bu = $('bub'); if (bb) { bu.textContent = bb[2]; Object.assign(bu.style, { left: bb[3] + 'px', top: bb[4] + 'px', width: bb[5] + 'px' }); bu.style.setProperty('--tx', bb[6]); } show('bub', !!bb, bb ? bb[0] : null, t);
  show('end', sc === 'end', 34.5, t);
}
/* ---------- PLAYER ---------- */
const stage = $('stage'), wrap = $('wrap'), snd = $('snd');
function fit() { if (!document.body.classList.contains('render')) stage.style.transform = `scale(${wrap.clientWidth / 720})`; }
addEventListener('resize', fit);
let T = 0, playing = false, last = 0;
function sync() { try { snd.currentTime = T; playing ? snd.play().catch(() => {}) : snd.pause(); } catch (e) {} }
function tick(now) { if (playing) { T = (!snd.paused && snd.readyState > 2) ? snd.currentTime : T + (now - last) / 1000; if (T >= DUR) { T = DUR; playing = false; snd.pause(); $('play').textContent = '▶'; } } last = now; render(T); $('seek').value = T; requestAnimationFrame(tick); }
$('play').onclick = () => { if (T >= DUR) T = 0; playing = !playing; $('play').textContent = playing ? '❚❚' : '▶'; sync(); };
$('rew').onclick = () => { T = 0; playing = true; $('play').textContent = '❚❚'; sync(); };
$('seek').oninput = e => { T = +e.target.value; sync(); };
if (new URLSearchParams(location.search).has('render')) { document.body.classList.add('render'); window.renderAt = render; render(0); window.ready = true; }
else { fit(); requestAnimationFrame(n => { last = n; tick(n); }); }
