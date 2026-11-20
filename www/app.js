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
  // ---------- TÜRKÇE KONUŞMA ----------
  const TTS = () => window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() && window.Capacitor.Plugins.TextToSpeech;
  let lastSay = 0;
  function say(text) {
    if (muted) return;
    lastSay = Date.now();
    try {
      const n = TTS();
      if (n) { n.stop().catch(() => {}); n.speak({ text, lang: 'tr-TR', rate: 1.0, pitch: 1.5, volume: 1.0 }).catch(() => {}); return; }
      if (window.speechSynthesis) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'tr-TR'; u.pitch = 1.6; u.rate = 1;
        const v = speechSynthesis.getVoices().find((x) => /^tr/i.test(x.lang)); if (v) u.voice = v;
        speechSynthesis.speak(u);
      }
    } catch (e) {}
  }
  const pickS = (a) => a[Math.floor(Math.random() * a.length)];
  const THANKS = {
    sac: ['Saçlarımı çok sevdim, teşekkür ederim!', 'Ne güzel saçlarım var! Teşekkürler!', 'Saçımı taradın mı? Çok teşekkür ederim!', 'Hi hi, saçlarım gıdıklandı!'],
    yuz: ['Makyajım çok güzel olmuş, teşekkür ederim!', 'Cik cik! Yanaklarım pembe pembe!', 'Teşekkürler, çok güzel oldum!', 'Hi hi hi, burnum gıdıklandı!'],
    toka: ['Tokamı çok sevdim, teşekkür ederim!', 'Ne güzel bir toka! Teşekkürler!'],
    elbise: ['Elbisem çok güzel, teşekkür ederim!', 'Dönüp dönüp dans edeyim mi?', 'Bu elbiseye bayıldım!'],
    ayakkabi: ['Ayakkabılarımla zıp zıp zıplıyorum!', 'Çok güzel ayakkabılar, teşekkürler!'],
    beden: ['Hi hi hi, gıdıklandım!', 'Sarılalım mı? Seni seviyorum!', 'Merhaba arkadaşım!'],
  };
  const PRAISE = ['Harika!', 'Çok güzel!', 'Süper!', 'Bayıldım!', 'Muhteşem!', 'Ne kadar şık!'];
  const CNAMES = { '#ff6fb5': 'Pembe', '#ff3b6b': 'Kırmızı', '#b36bff': 'Mor', '#4fc3ff': 'Mavi', '#3ddc97': 'Yeşil', '#ffd23f': 'Sarı', '#ff924c': 'Turuncu', '#ffffff': 'Beyaz', '#8e7cc3': 'Lila', '#1e88e5': 'Lacivert', '#2b2b2b': 'Siyah',
    '#f7d36b': 'Sarı', '#8b5a2b': 'Kahverengi', '#3b2416': 'Koyu kahve', '#1a1a1a': 'Siyah', '#e2582f': 'Kızıl', '#ff8cc6': 'Pembe', '#9b7bff': 'Mor', '#f2f2f2': 'Beyaz',
    '#ff7aa2': 'Pembe ruj', '#d81b60': 'Fuşya', '#f4a6b8': 'Açık pembe', '#6b4226': 'Kahverengi', '#2e86de': 'Mavi', '#27ae60': 'Yeşil', '#8e44ad': 'Mor', '#1d1d1d': 'Siyah' };
  const NAMES = {
    dress: { prenses: 'Prenses elbisesi!', kisa: 'Puantiyeli elbise!', peri: 'Peri elbisesi! Kanatlarım var!', etek: 'Etek ve tişört!', denizkizi: 'Deniz kızı oldum!', tulum: 'Tulum!' },
    hair: { uzun: 'Uzun saç!', kisa: 'Kısa saç!', atkuyrugu: 'At kuyruğu!', topuz: 'İki topuz!', kivircik: 'Kıvırcık saç!', orgu: 'Örgülü saç!' },
    clip: { fiyonk: 'Fiyonk!', cicek: 'Çiçek toka!', yildiz: 'Yıldız toka!', kalp: 'Kalp toka!', tac: 'Taç! Prenses oldum!', bant: 'Saç bandı!', kelebek: 'Kelebek toka!' },
    bg: { oda: 'Odam!', bahce: 'Bahçe!', sato: 'Şato!', deniz: 'Deniz!', gokkusagi: 'Gökkuşağı!' },
    sticker: { kalp: 'Kalp çıkartması!', yildiz: 'Yıldız çıkartması!' },
  };
  function describe(set) {
    const k = Object.keys(set)[0], v = set[k];
    if (v === null) return 'Çıkardık!';
    if (NAMES[k] && NAMES[k][v]) return NAMES[k][v];
    const c = CNAMES[v];
    if (k === 'blush') return 'Allık! ' + pickS(PRAISE);
    if (k === 'shadow') return 'Göz farı! ' + pickS(PRAISE);
    if (k === 'skin') return pickS(PRAISE);
    if (k === 'lip') return 'Ruj! ' + pickS(PRAISE);
    if (k === 'shoes') return (c ? c + ' ayakkabı!' : 'Ayakkabı!');
    if (k === 'hairColor') return (c ? c + ' saç!' : pickS(PRAISE));
    if (k === 'eyes') return (c ? c + ' gözler!' : pickS(PRAISE));
    return c ? c + '!' : pickS(PRAISE);
  }

  // ---------- MÜZİK (orijinal, kendi bestemiz) ----------
  // Basit, neşeli bir döngü: [nota (yarım ton, C5=0), süre(vuruş)]
  const MEL = [[0, 1], [4, 1], [7, 1], [4, 1], [5, 1], [9, 1], [7, 2], [2, 1], [5, 1], [9, 1], [7, 1], [4, 1], [2, 1], [0, 2],
    [7, 1], [9, 1], [12, 1], [9, 1], [7, 1], [4, 1], [5, 2], [4, 1], [2, 1], [4, 1], [7, 1], [2, 1], [4, 1], [0, 2]];
  const BASS = [0, 0, 5, 7, 0, 5, 7, 0];
  let musicOn = true, musicTimer = null, musicT = 0, mi = 0, beat = 0;
  const BPM = 0.32;
  const mf = (st) => 523.25 * Math.pow(2, st / 12);
  function musicTick() {
    if (!ac || !musicOn || muted) return;
    while (musicT < ac.currentTime + 0.4) {
      const [n, d] = MEL[mi % MEL.length];
      noteAt(mf(n), musicT, d * BPM * 0.9, 'triangle', 0.05);
      if (beat % 2 === 0) noteAt(mf(BASS[(beat / 2) % BASS.length] - 24), musicT, BPM * 1.8, 'sine', 0.06);
      musicT += d * BPM; beat += d; mi++;
    }
  }
  function noteAt(f, t, dur, type, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function startMusic() {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { return; }
    if (musicTimer) return;
    musicT = ac.currentTime + 0.1;
    musicTimer = setInterval(musicTick, 150);
  }
  function stopMusic() { clearInterval(musicTimer); musicTimer = null; }
  document.addEventListener('pointerdown', function first() { if (musicOn) startMusic(); document.removeEventListener('pointerdown', first); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMusic(); else if (musicOn && !muted) startMusic(); });

  // Kıkırdama sesi
  const giggle = () => [0, 1, 2, 3].forEach((i) => tone(1100 + (i % 2) * 250 - i * 40, 0.09, 'sine', i * 0.1, 0.12));
  const boing = () => { if (muted || !ac) return; const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(300, ac.currentTime); o.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.25); g.gain.setValueAtTime(0.15, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3); o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.32); };

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
        say(describe(it.set));
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
    say(pickS(['Sürpriz! Yepyeni kıyafetler!', 'Tadaa! Nasıl oldum?', 'Vay canına, çok güzel!']));
  };

  // Bebeğe dokununca: ses + teşekkür
  const partFx = { sac: 'wiggle', yuz: 'wiggle', toka: 'bounce', elbise: 'twirl', ayakkabi: 'hop', beden: 'wiggle' };
  stage.addEventListener('click', (ev) => {
    const g = ev.target.closest && ev.target.closest('[data-part]');
    if (!g) return;
    const part = g.getAttribute('data-part');
    if (part === 'sac' || part === 'yuz' || part === 'beden') giggle(); else if (part === 'ayakkabi') boing(); else chime();
    buzz(); sparkle(); hearts(ev);
    const cls = partFx[part] || 'bounce';
    anim(cls, 900);
    setTimeout(() => say(pickS(THANKS[part] || THANKS.beden)), 250);
  });
  function hearts(ev) {
    for (let i = 0; i < 5; i++) {
      const s = document.createElement('span');
      s.className = 'spark'; s.textContent = pickS(['💖', '💕', '💗', '😘']);
      s.style.left = ev.clientX - 15 + (Math.random() * 60 - 30) + 'px';
      s.style.top = ev.clientY - 15 + (Math.random() * 30 - 15) + 'px';
      s.style.animationDelay = i * 0.08 + 's';
      fx.appendChild(s); setTimeout(() => s.remove(), 1500);
    }
  }
  const musicBtn = document.getElementById('music');
  musicBtn.onclick = () => {
    musicOn = !musicOn; musicBtn.classList.toggle('off', !musicOn);
    if (musicOn) startMusic(); else stopMusic();
  };
  setTimeout(() => say('Merhaba! Beni giydirir misin?'), 800);
  document.addEventListener('pointerdown', function hi() { document.removeEventListener('pointerdown', hi); if (Date.now() - lastSay > 5000) say('Merhaba! Beni giydirir misin?'); });
  // ---------- DANS & YÜRÜYÜŞ ----------
  let animTimer = null;
  function anim(cls, ms) {
    stage.classList.remove('dance', 'walk', 'wiggle', 'twirl', 'hop', 'bounce'); void stage.offsetWidth;
    stage.classList.add(cls);
    clearTimeout(animTimer); animTimer = setTimeout(() => stage.classList.remove(cls), ms);
  }
  // Orijinal, hareketli dans ezgisi (yarım ton, C5=0)
  const DANCE = [0, 4, 7, 12, 7, 4, 9, 7, 5, 9, 12, 9, 7, 4, 2, 0];
  document.getElementById('dance').onclick = () => {
    anim('dance', 4000); buzz();
    say(pickS(['Hadi dans edelim!', 'Dans zamanı! Ellerini çırp!', 'Dönelim, zıplayalım!']));
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    DANCE.forEach((n, i) => {
      tone(mf(n), 0.2, 'square', 0.4 + i * 0.22, 0.05);
      if (i % 2 === 0) tone(mf(n - 24), 0.18, 'triangle', 0.4 + i * 0.22, 0.12);
      if (i % 4 === 2) tone(2400, 0.04, 'square', 0.4 + i * 0.22, 0.04); // alkış tıkı
    });
    for (let k = 0; k < 8; k++) setTimeout(sparkle, k * 450);
  };
  document.getElementById('walk').onclick = () => {
    anim('walk', 6000); buzz();
    const mermaid = S.dress === 'denizkizi';
    say(mermaid ? 'Yüzmeye gidiyorum! Şıp şıp şıp!' : pickS(['Yürüyüşe çıkıyorum! Tık tık tık!', 'Bak nasıl yürüyorum!', 'Gezmeye gidiyorum!']));
    for (let i = 0; i < 12; i++) {
      setTimeout(() => { if (mermaid) tone(700 + Math.random() * 300, 0.08, 'sine', 0, 0.1); else { tone(i % 2 ? 320 : 260, 0.07, 'triangle', 0, 0.2); } }, 300 + i * 500);
    }
    setTimeout(() => say('Geri geldim! Merhaba!'), 5600);
  };
  const muteBtn = document.getElementById('mute');
  muteBtn.onclick = () => {
    muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
    if (muted) { stopMusic(); try { speechSynthesis.cancel(); } catch (e) {} } else if (musicOn) startMusic();
  };

  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  render(); buildTabs(); buildBar();
})();
