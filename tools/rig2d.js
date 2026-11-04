/* KALAU LAH! shared 2D rig (anime-cartoon look). Load before an episode's scene script. */
const INK = '#222', OW = 5;
const $ = id => document.getElementById(id);
const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const lerp = (a, b, x) => a + (b - a) * x;
const D = Math.PI / 180;

/* ---------- CHARACTERS ---------- */
const CH = {
  amir: { skin: '#F2C9A0', shirt: '#7A8450', pants: '#3B4256', shoe: '#F4F4F4' },
  kavi: { skin: '#B5784A', shirt: '#F5D35E', pants: '#3B4256', shoe: '#E76F51', tee: '#8EC5E8' },
  din:  { skin: '#A86C42', shirt: '#FFFFFF', pants: '#2E3A33', shoe: '#444' },
  mei:  { skin: '#E8B48C', shirt: '#7E9CBF', pants: '#E2C9A0', shoe: '#F4F4F4', top: '#F2B48C' },
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
  if (who === 'mei') return `<path d="M-92 70 Q-104 -10 -82 -50 Q-60 -94 0 -94 Q60 -94 82 -50 Q104 -10 92 70 Q80 60 72 74 Q70 20 66 -20 Q40 -50 0 -50 Q-30 -48 -50 -60 Q-62 -30 -66 -20 Q-70 20 -72 74 Q-80 60 -92 70Z" fill="#6B3E1F" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
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
  if (who === 'mei') torso += `<path d="M-26 -150 L0 -104 L26 -150Z" fill="${c.top}" stroke="${INK}" stroke-width="3"/><path d="M-26 -150 L-20 -60 M26 -150 L20 -60" stroke="${INK}" stroke-width="3" opacity=".5"/>`;
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

/* camera helper + boot (expects DUR, render(t) and #stage/#wrap/#snd/#play/#rew/#seek in the page) */
function cam(z, cx, cy, inner) { return `<g transform="translate(360 640) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`; }
function boot() {
  const stage = $('stage'), wrap = $('wrap'), snd = $('snd');
  const fit = () => { if (!document.body.classList.contains('render')) stage.style.transform = `scale(${wrap.clientWidth / 720})`; };
  addEventListener('resize', fit);
  let T = 0, playing = false, last = 0;
  const sync = () => { try { snd.currentTime = T; playing ? snd.play().catch(() => {}) : snd.pause(); } catch (e) {} };
  const tick = now => { if (playing) { T = (!snd.paused && snd.readyState > 2) ? snd.currentTime : T + (now - last) / 1000; if (T >= DUR) { T = DUR; playing = false; snd.pause(); $('play').textContent = '▶'; } } last = now; render(T); $('seek').value = T; requestAnimationFrame(tick); };
  $('play').onclick = () => { if (T >= DUR) T = 0; playing = !playing; $('play').textContent = playing ? '❚❚' : '▶'; sync(); };
  $('rew').onclick = () => { T = 0; playing = true; $('play').textContent = '❚❚'; sync(); };
  $('seek').max = DUR; $('seek').oninput = e => { T = +e.target.value; sync(); };
  if (new URLSearchParams(location.search).has('render')) { document.body.classList.add('render'); window.renderAt = render; render(0); window.ready = true; }
  else { fit(); requestAnimationFrame(n => { last = n; tick(n); }); }
}
