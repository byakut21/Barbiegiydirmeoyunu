(function () {
  const D = window.Draw;
  const DEF = { dress: 'prenses', dressColor: '#ff6fb5', hair: 'uzun', hairColor: '#f7d36b', clip: 'fiyonk', lip: '#ff7aa2', blush: '#ff9db5', shadow: null, sticker: null, shoes: '#ff4fa0', bg: 'oda', skin: '#ffdcc5', eyes: '#6b4226' };
  let S = Object.assign({}, DEF);
  try { S = Object.assign(S, JSON.parse(localStorage.getItem('bebek') || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem('bebek', JSON.stringify(S)); } catch (e) {} };

  const COLORS = ['#ff6fb5', '#ff3b6b', '#b36bff', '#4fc3ff', '#3ddc97', '#ffd23f', '#ff924c', '#ffffff', '#8e7cc3', '#1e88e5', '#2b2b2b'];
  const HAIR_COLORS = ['#f7d36b', '#8b5a2b', '#3b2416', '#1a1a1a', '#e2582f', '#ff8cc6', '#9b7bff', '#4fc3ff', '#f2f2f2', '#3ddc97'];
  const SKINS = ['#ffe6d5', '#ffdcc5', '#f2c09c', '#d9a07a', '#b07a52', '#7d5236'];
  const EYES = ['#6b4226', '#2e86de', '#27ae60', '#8e44ad', '#1d1d1d'];
  const LIPS = ['#ff7aa2', '#ff3b6b', '#d81b60', '#ff924c', '#b36bff', '#f4a6b8'];
  const BLUSH = [null, '#ff9db5', '#ff7a7a', '#ffb07a', '#d9a0ff'];
  const SHADOW = [null, '#b36bff', '#4fc3ff', '#ff6fb5', '#3ddc97', '#ffd23f'];

  // thumbnail viewBoxes
  const VB = { dress: '30 170 240 345', hair: '40 15 220 310', clip: '75 25 150 110', face: '85 50 130 130', shoes: '108 470 84 50', bg: '0 0 300 560' };

  // Her sekme: [ikon, öğe listesi]. Öğe: {set:{...}, thumb:'tip' | swatch}
  const TABS = [
    { icon: '👗', items: () => [
      ...['prenses', 'kisa', 'peri', 'etek', 'denizkizi', 'tulum'].map((v) => ({ set: { dress: v }, vb: 'dress' })),
      'sep',
      ...COLORS.map((c) => ({ set: { dressColor: c }, swatch: c })),
    ] },
    { icon: '💇', items: () => [
      ...['uzun', 'kisa', 'atkuyrugu', 'topuz', 'kivircik', 'orgu'].map((v) => ({ set: { hair: v }, vb: 'hair' })),
      'sep',
      ...HAIR_COLORS.map((c) => ({ set: { hairColor: c }, swatch: c })),
    ] },
    { icon: '🎀', items: () => ['fiyonk', 'cicek', 'yildiz', 'kalp', 'tac', 'bant', 'kelebek', null].map((v) => ({ set: { clip: v }, vb: 'clip', none: !v })) },
    { icon: '💄', items: () => [
      ...LIPS.map((c) => ({ set: { lip: c }, swatch: c, emo: '💋' })),
      'sep',
      ...BLUSH.map((c) => ({ set: { blush: c }, swatch: c, emo: '😊', none: !c })),
      'sep',
      ...SHADOW.map((c) => ({ set: { shadow: c }, swatch: c, emo: '👁️', none: !c })),
      'sep',
      ...['kalp', 'yildiz', null].map((v) => ({ set: { sticker: v }, vb: 'face', none: !v })),
    ] },
    { icon: '👠', items: () => COLORS.map((c) => ({ set: { shoes: c }, vb: 'shoes' })) },
    { icon: '👧', items: () => [
      ...SKINS.map((c) => ({ set: { skin: c }, vb: 'face' })),
      'sep',
      ...EYES.map((c) => ({ set: { eyes: c }, swatch: c, emo: '👀' })),
    ] },
    { icon: '🏞️', items: () => ['oda', 'bahce', 'sato', 'deniz', 'gokkusagi'].map((v) => ({ set: { bg: v }, vb: 'bg' })) },
  ];

  // ---------- SES ----------
  let ac = null, muted = false;
  const NOTES = [523, 587, 659, 784, 880, 1047, 1175, 1319];
  function tone(f, t = 0.12, type = 'sine', delay = 0, vol = 0.18) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f;
      const st = ac.currentTime + delay;
      g.gain.setValueAtTime(vol, st); g.gain.exponentialRampToValueAtTime(0.001, st + t);
      o.connect(g); g.connect(ac.destination); o.start(st); o.stop(st + t + 0.02);
    } catch (e) {}
  }
  const pop = (i) => { tone(NOTES[i % NOTES.length], 0.18, 'triangle'); tone(NOTES[i % NOTES.length] * 1.5, 0.15, 'sine', 0.06, 0.08); };
  const chime = () => [0, 2, 4, 7].forEach((n, i) => tone(NOTES[n] || 1319, 0.3, 'triangle', i * 0.09));
  const buzz = () => { try { navigator.vibrate && navigator.vibrate(15); } catch (e) {} };

  // ---------- ÇİZİM ----------
  const stage = document.getElementById('stage');
  const bar = document.getElementById('options');
  const tabsEl = document.getElementById('tabs');
  let tab = 0;

  function render() { stage.innerHTML = D.doll(S); }

  function isSel(set) { return Object.keys(set).every((k) => S[k] === set[k]); }

  function buildBar() {
    bar.innerHTML = '';
    let idx = 0;
    TABS[tab].items().forEach((it) => {
      if (it === 'sep') { const s = document.createElement('div'); s.className = 'sep'; bar.appendChild(s); return; }
      const b = document.createElement('button');
      b.className = 'opt' + (isSel(it.set) ? ' sel' : '');
      const i = idx++;
      if (it.none) b.innerHTML = '<span class="none">🚫</span>';
      else if (it.swatch) b.innerHTML = `<span class="sw" style="background:${it.swatch}"></span>${it.emo ? `<span class="emo">${it.emo}</span>` : ''}`;
      else {
        const st = Object.assign({}, S, it.set);
        b.innerHTML = `<svg viewBox="${VB[it.vb]}" preserveAspectRatio="xMidYMid meet">${D.doll(st, { bg: it.vb === 'bg' })}</svg>`;
      }
      b.onclick = (ev) => {
        Object.assign(S, it.set); save(); pop(i); buzz(); render(); buildBar(); sparkle(ev);
        bounce();
      };
      bar.appendChild(b);
    });
    const sel = bar.querySelector('.sel');
    if (sel) sel.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function buildTabs() {
    tabsEl.innerHTML = '';
    TABS.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === tab ? ' on' : '');
      b.textContent = t.icon;
      b.onclick = () => { tab = i; tone(392 + i * 60, 0.1, 'sine'); buzz(); buildTabs(); buildBar(); bar.scrollLeft = 0; };
      tabsEl.appendChild(b);
    });
  }

  // ---------- EFEKTLER ----------
  const fx = document.getElementById('fx');
  function sparkle() {
    const r = stage.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.textContent = ['✨', '⭐', '💖', '🌟'][i % 4];
      s.style.left = r.left + r.width * (0.2 + Math.random() * 0.6) + 'px';
      s.style.top = r.top + r.height * (0.15 + Math.random() * 0.6) + 'px';
      s.style.animationDelay = Math.random() * 0.2 + 's';
      fx.appendChild(s);
      setTimeout(() => s.remove(), 1300);
    }
  }
  function bounce() {
    stage.classList.remove('bounce'); void stage.offsetWidth; stage.classList.add('bounce');
  }

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  document.getElementById('rand').onclick = () => {
    Object.assign(S, {
      dress: pick(['prenses', 'kisa', 'peri', 'etek', 'denizkizi', 'tulum']), dressColor: pick(COLORS),
      hair: pick(['uzun', 'kisa', 'atkuyrugu', 'topuz', 'kivircik', 'orgu']), hairColor: pick(HAIR_COLORS),
      clip: pick(['fiyonk', 'cicek', 'yildiz', 'kalp', 'tac', 'bant', 'kelebek']), lip: pick(LIPS), blush: pick(BLUSH),
      shadow: pick(SHADOW), shoes: pick(COLORS), bg: pick(['oda', 'bahce', 'sato', 'deniz', 'gokkusagi']),
    });
    save(); chime(); buzz(); render(); buildBar(); sparkle(); bounce();
  };
  document.getElementById('dance').onclick = () => {
    stage.classList.remove('dance'); void stage.offsetWidth; stage.classList.add('dance');
    [0, 2, 4, 2, 5, 4, 2, 0].forEach((n, i) => tone(NOTES[n], 0.22, 'triangle', i * 0.2));
    for (let k = 0; k < 4; k++) setTimeout(sparkle, k * 400);
  };
  const muteBtn = document.getElementById('mute');
  muteBtn.onclick = () => { muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊'; };

  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  render(); buildTabs(); buildBar();
})();
