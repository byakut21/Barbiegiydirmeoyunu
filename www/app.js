(function () {
  const D = window.Draw;

  // ---------- RENKLER ----------
  const COLORS = ['#ff6fb5', '#ff3b6b', '#e91e63', '#ffb3d9', '#b36bff', '#7e57c2', '#d9c2ff', '#4fc3ff', '#1e88e5', '#80deea', '#3ddc97', '#2e7d32', '#c5e1a5', '#ffd23f', '#ffe9a8', '#ff924c', '#ff7043', '#ffffff', '#bdbdbd', '#2b2b2b', '#8d6e63', '#c9a227'];
  const HAIR_COLORS = ['#f7d36b', '#fff1b0', '#c9a14a', '#8b5a2b', '#a0522d', '#3b2416', '#1a1a1a', '#e2582f', '#ff8cc6', '#ff3d9a', '#9b7bff', '#d9c2ff', '#4fc3ff', '#2ec4b6', '#3ddc97', '#f2f2f2', 'gokkusagi'];
  const SKINS = ['#ffeee2', '#ffe6d5', '#ffdcc5', '#f6cba8', '#f2c09c', '#e0aa80', '#d9a07a', '#c18a5f', '#b07a52', '#8f5f3e', '#7d5236', '#5e3b24'];
  const EYES = ['#6b4226', '#a0682a', '#2e86de', '#7ec8ff', '#27ae60', '#8fbc5a', '#8e44ad', '#808b96', '#1d1d1d'];
  const MAKEUP = ['#ff3b6b', '#d81b60', '#ff6fb5', '#ffb3d9', '#f4a6b8', '#c2185b', '#ff924c', '#ff7043', '#ffd23f', '#c9a227', '#b36bff', '#7e57c2', '#4fc3ff', '#1e88e5', '#3ddc97', '#8d6e63', '#2b2b2b', '#ffffff'];

  const GIRLS = [
    { ad: 'Elif', skin: '#ffdcc5', hair: 'uzun', hairColor: '#f7d36b', eyes: '#2e86de', eyeShape: 'yuvarlak', cil: false, glasses: null, lip: '#ff7aa2' },
    { ad: 'Zeynep', skin: '#f2c09c', hair: 'orgu', hairColor: '#3b2416', eyes: '#6b4226', eyeShape: 'kirpikli', cil: true, glasses: null, lip: '#f4a6b8' },
    { ad: 'Defne', skin: '#7d5236', hair: 'kivircik', hairColor: '#1a1a1a', eyes: '#6b4226', eyeShape: 'iri', cil: false, glasses: null, lip: '#d81b60' },
    { ad: 'Ada', skin: '#ffe6d5', hair: 'kisa', hairColor: '#e2582f', eyes: '#27ae60', eyeShape: 'yuvarlak', cil: true, glasses: null, lip: '#ff924c' },
    { ad: 'Mina', skin: '#d9a07a', hair: 'topuz', hairColor: '#1a1a1a', eyes: '#1d1d1d', eyeShape: 'badem', cil: false, glasses: null, lip: '#ff6fb5' },
    { ad: 'Lara', skin: '#b07a52', hair: 'atkuyrugu', hairColor: '#8b5a2b', eyes: '#a0682a', eyeShape: 'iri', cil: false, glasses: 'yuvarlak', lip: '#e91e63' },
    { ad: 'Nil', skin: '#ffeee2', hair: 'uzun', hairColor: '#ff8cc6', eyes: '#8e44ad', eyeShape: 'kirpikli', cil: false, glasses: null, lip: '#ff3b6b' },
    { ad: 'Duru', skin: '#f6cba8', hair: 'ikikuyruk', hairColor: '#c9a14a', eyes: '#7ec8ff', eyeShape: 'iri', cil: true, glasses: null, lip: '#ffb3d9' },
    { ad: 'Asya', skin: '#e0aa80', hair: 'kisa', hairColor: '#1a1a1a', eyes: '#6b4226', eyeShape: 'badem', cil: false, glasses: null, lip: '#c2185b' },
    { ad: 'Melek', skin: '#5e3b24', hair: 'ikikuyruk', hairColor: '#1a1a1a', eyes: '#6b4226', eyeShape: 'kirpikli', cil: false, glasses: null, lip: '#ff6fb5' },
    { ad: 'Ela', skin: '#ffdcc5', hair: 'kivircik', hairColor: '#f2f2f2', eyes: '#808b96', eyeShape: 'yuvarlak', cil: false, glasses: 'kalp', lip: '#b36bff' },
    { ad: 'Su', skin: '#c18a5f', hair: 'orgu', hairColor: '#9b7bff', eyes: '#2e86de', eyeShape: 'iri', cil: true, glasses: null, lip: '#ff3b6b' },
  ];
  const DEF = Object.assign({ girl: 0, dress: 'prenses', dressColor: '#ff6fb5', clip: 'fiyonk', necklace: null, shoes: '#ff3b6b', bg: 'oda', paint: [] }, GIRLS[0]);
  let S = Object.assign({}, DEF);
  try { S = Object.assign(S, JSON.parse(localStorage.getItem('bebek2') || '{}')); } catch (e) {}
  if (!Array.isArray(S.paint)) S.paint = [];
  const save = () => { try { localStorage.setItem('bebek2', JSON.stringify(S)); } catch (e) {} };

  const DRESSES = ['prenses', 'kisa', 'peri', 'balerin', 'etek', 'denizkizi', 'tulum'];
  const HAIRS = ['uzun', 'kisa', 'atkuyrugu', 'ikikuyruk', 'topuz', 'kivircik', 'orgu'];
  const CLIPS = ['fiyonk', 'cicek', 'yildiz', 'kalp', 'tac', 'cicektaci', 'bant', 'kelebek', 'kulak'];
  const BGS = ['oda', 'bahce', 'sato', 'deniz', 'gokkusagi', 'kis', 'uzay', 'seker', 'orman', 'sahne', 'lunapark', 'havuz'];

  const VB = { dress: '30 170 240 345', hair: '30 15 240 300', clip: '75 18 150 120', face: '62 30 176 176', eye: '100 95 100 60', glass: '95 95 110 60', neck: '115 180 70 55', shoes: '108 470 84 50', bg: '0 0 300 560' };

  const TOOLS = [
    { t: 'ruj', emo: '💄', ad: 'Ruj' }, { t: 'allik', emo: '🖌️', ad: 'Allık fırçası' }, { t: 'far', emo: '🎨', ad: 'Göz farı' },
    { t: 'simli', emo: '✨', ad: 'Simli toz' }, { t: 'kalem', emo: '✏️', ad: 'Kalem' },
    { t: 'd-kalp', emo: '❤️', ad: 'Kalp damgası' }, { t: 'd-yildiz', emo: '⭐', ad: 'Yıldız damgası' }, { t: 'd-cicek', emo: '🌸', ad: 'Çiçek damgası' },
  ];
  let tool = 'ruj', toolColor = '#ff3b6b';

  // Sekmeler
  const TABS = [
    { icon: '👧', items: () => [
      ...GIRLS.map((g, i) => ({ girl: i, vb: 'face' })), 'sep',
      ...SKINS.map((c) => ({ set: { skin: c }, swatch: c, emo: '✋' })), 'sep',
      ...['yuvarlak', 'iri', 'badem', 'kirpikli'].map((v) => ({ set: { eyeShape: v }, vb: 'eye' })), 'sep',
      ...EYES.map((c) => ({ set: { eyes: c }, swatch: c, emo: '👀' })), 'sep',
      ...[true, false].map((v) => ({ set: { cil: v }, vb: 'face', none: !v })),
    ] },
    { icon: '👗', items: () => [...DRESSES.map((v) => ({ set: { dress: v }, vb: 'dress' })), 'sep', ...COLORS.map((c) => ({ set: { dressColor: c }, swatch: c }))] },
    { icon: '💇', items: () => [...HAIRS.map((v) => ({ set: { hair: v }, vb: 'hair' })), 'sep', ...HAIR_COLORS.map((c) => ({ set: { hairColor: c }, swatch: c === 'gokkusagi' ? 'linear-gradient(#ff595e,#ffca3a,#8ac926,#1982c4,#b36bff)' : c }))] },
    { icon: '🎀', items: () => [
      ...[...CLIPS, null].map((v) => ({ set: { clip: v }, vb: 'clip', none: !v })), 'sep',
      ...['yuvarlak', 'kalp', 'yildiz', 'gunes', null].map((v) => ({ set: { glasses: v }, vb: 'glass', none: !v })), 'sep',
      ...['inci', 'kalp', 'yildiz', null].map((v) => ({ set: { necklace: v }, vb: 'neck', none: !v })),
    ] },
    { icon: '💄', makeup: true, items: () => [
      ...TOOLS.map((x) => ({ tool: x.t, emoji: x.emo })), 'sep',
      ...MAKEUP.map((c) => ({ color: c, swatch: c })), 'sep',
      { undo: true, emoji: '↩️' }, { clear: true, emoji: '🧽' },
    ] },
    { icon: '👠', items: () => COLORS.map((c) => ({ set: { shoes: c }, vb: 'shoes' })) },
    { icon: '🏞️', items: () => BGS.map((v) => ({ set: { bg: v }, vb: 'bg' })) },
  ];
  const MAKEUP_TAB = 4;

  // ---------- SES ----------
  let ac = null, muted = false;
  const getAC = () => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) {} return ac; };
  const NOTES = [523, 587, 659, 784, 880, 1047, 1175, 1319];
  function tone(f, t = 0.12, type = 'sine', delay = 0, vol = 0.18) {
    if (muted || !getAC()) return;
    try {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f;
      const st = ac.currentTime + delay;
      g.gain.setValueAtTime(vol, st); g.gain.exponentialRampToValueAtTime(0.001, st + t);
      o.connect(g); g.connect(ac.destination); o.start(st); o.stop(st + t + 0.02);
    } catch (e) {}
  }
  function sweep(f1, f2, dur, type = 'sine', vol = 0.15, delay = 0) {
    if (muted || !getAC()) return;
    const t = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  let noiseBuf = null;
  function brushSound(vol = 0.08) {
    if (muted || !getAC()) return;
    if (!noiseBuf) { noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.2, ac.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    src.buffer = noiseBuf; f.type = 'bandpass'; f.frequency.value = 2500 + Math.random() * 1500;
    g.gain.setValueAtTime(vol, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    src.connect(f); f.connect(g); g.connect(ac.destination); src.start(); src.stop(ac.currentTime + 0.18);
  }
  const pop = (i) => { tone(NOTES[i % NOTES.length], 0.18, 'triangle'); tone(NOTES[i % NOTES.length] * 1.5, 0.15, 'sine', 0.06, 0.08); };
  const chime = () => [0, 2, 4, 7].forEach((n, i) => tone(NOTES[n] || 1319, 0.3, 'triangle', i * 0.09));
  const giggle = () => [0, 1, 2, 3].forEach((i) => tone(1100 + (i % 2) * 250 - i * 40, 0.09, 'sine', i * 0.1, 0.12));
  const muah = () => { sweep(250, 520, 0.18, 'sine', 0.2); sweep(900, 1800, 0.06, 'triangle', 0.15, 0.2); tone(1400, 0.05, 'square', 0.22, 0.05); };
  const buzz = () => { try { navigator.vibrate && navigator.vibrate(15); } catch (e) {} };

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
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const THANKS = {
    sac: ['Saçlarımı çok sevdim, teşekkür ederim!', 'Ne güzel saçlarım var! Teşekkürler!', 'Hi hi, saçlarım gıdıklandı!'],
    yuz: ['Makyajım çok güzel olmuş, teşekkür ederim!', 'Yanaklarım pembe pembe! Teşekkürler!', 'Hi hi hi, burnum gıdıklandı!', 'Çok güzel oldum, teşekkür ederim!'],
    toka: ['Tokamı çok sevdim, teşekkür ederim!', 'Ne güzel bir toka! Teşekkürler!'],
    kolye: ['Kolyem parıl parıl! Teşekkürler!'],
    elbise: ['Elbisem çok güzel, teşekkür ederim!', 'Bu elbiseye bayıldım!'],
    ayakkabi: ['Ayakkabılarımla zıp zıp zıplıyorum!', 'Çok güzel ayakkabılar, teşekkürler!'],
    beden: ['Seni seviyorum!', 'Sarılalım mı? Seni seviyorum!', 'Sen benim en iyi arkadaşımsın!'],
  };
  const PRAISE = ['Harika!', 'Çok güzel!', 'Süper!', 'Bayıldım!', 'Muhteşem!', 'Ne kadar şık!'];
  const CNAMES = {
    '#ff6fb5': 'Pembe', '#ff3b6b': 'Kırmızı', '#e91e63': 'Fuşya', '#ffb3d9': 'Açık pembe', '#b36bff': 'Mor', '#7e57c2': 'Koyu mor', '#d9c2ff': 'Lila', '#4fc3ff': 'Mavi', '#1e88e5': 'Lacivert', '#80deea': 'Turkuaz', '#3ddc97': 'Yeşil', '#2e7d32': 'Koyu yeşil', '#c5e1a5': 'Açık yeşil', '#ffd23f': 'Sarı', '#ffe9a8': 'Krem', '#ff924c': 'Turuncu', '#ff7043': 'Mercan', '#ffffff': 'Beyaz', '#bdbdbd': 'Gri', '#2b2b2b': 'Siyah', '#8d6e63': 'Kahverengi', '#c9a227': 'Altın',
    '#f7d36b': 'Sarı', '#fff1b0': 'Açık sarı', '#c9a14a': 'Bal rengi', '#8b5a2b': 'Kahverengi', '#a0522d': 'Kestane', '#3b2416': 'Koyu kahve', '#1a1a1a': 'Siyah', '#e2582f': 'Kızıl', '#ff8cc6': 'Pembe', '#ff3d9a': 'Fuşya', '#9b7bff': 'Mor', '#2ec4b6': 'Turkuaz', '#f2f2f2': 'Beyaz', gokkusagi: 'Gökkuşağı',
    '#d81b60': 'Koyu pembe', '#f4a6b8': 'Gül kurusu', '#c2185b': 'Vişne', '#6b4226': 'Kahverengi', '#a0682a': 'Ela', '#2e86de': 'Mavi', '#7ec8ff': 'Açık mavi', '#27ae60': 'Yeşil', '#8fbc5a': 'Fıstık yeşili', '#8e44ad': 'Mor', '#808b96': 'Gri', '#1d1d1d': 'Siyah',
  };
  const NAMES = {
    dress: { prenses: 'Prenses elbisesi!', kisa: 'Puantiyeli elbise!', peri: 'Peri elbisesi! Kanatlarım var!', balerin: 'Balerin eteği! Parmak ucunda dans!', etek: 'Etek ve tişört!', denizkizi: 'Deniz kızı oldum!', tulum: 'Tulum!' },
    hair: { uzun: 'Uzun saç!', kisa: 'Kısa saç!', atkuyrugu: 'At kuyruğu!', ikikuyruk: 'İki kuyruk!', topuz: 'İki topuz!', kivircik: 'Kıvırcık saç!', orgu: 'Örgülü saç!' },
    clip: { fiyonk: 'Fiyonk!', cicek: 'Çiçek toka!', yildiz: 'Yıldız toka!', kalp: 'Kalp toka!', tac: 'Taç! Prenses oldum!', cicektaci: 'Çiçek tacı!', bant: 'Saç bandı!', kelebek: 'Kelebek toka!', kulak: 'Kedi kulakları! Miyav!' },
    glasses: { yuvarlak: 'Yuvarlak gözlük!', kalp: 'Kalp gözlük!', yildiz: 'Yıldız gözlük!', gunes: 'Güneş gözlüğü! Havalı!' },
    necklace: { inci: 'İnci kolye!', kalp: 'Kalp kolye!', yildiz: 'Yıldız kolye!' },
    eyeShape: { yuvarlak: 'Yuvarlak gözler!', iri: 'Kocaman gözler!', badem: 'Badem gözler!', kirpikli: 'Uzun kirpikler!' },
    bg: { oda: 'Odam!', bahce: 'Bahçe!', sato: 'Şato!', deniz: 'Deniz!', gokkusagi: 'Gökkuşağı!', kis: 'Kar yağıyor! Kardan adam!', uzay: 'Uzaya gittik!', seker: 'Şeker diyarı!', orman: 'Orman!', sahne: 'Sahnedeyim!', lunapark: 'Lunapark!', havuz: 'Havuz! Şıpır şıpır!' },
  };
  function describe(set) {
    const k = Object.keys(set)[0], v = set[k];
    if (k === 'cil') return v ? 'Çilli yanaklar!' : pick(PRAISE);
    if (v === null) return 'Çıkardık!';
    if (NAMES[k] && NAMES[k][v]) return NAMES[k][v];
    const c = CNAMES[v];
    if (k === 'skin') return pick(PRAISE);
    if (k === 'shoes') return c ? c + ' ayakkabı!' : 'Ayakkabı!';
    if (k === 'hairColor') return c ? c + ' saç!' : pick(PRAISE);
    if (k === 'eyes') return c ? c + ' gözler!' : pick(PRAISE);
    return c ? c + '!' : pick(PRAISE);
  }

  // ---------- MÜZİK (orijinal, kendi bestemiz) ----------
  const MEL = [[0, 1], [4, 1], [7, 1], [4, 1], [5, 1], [9, 1], [7, 2], [2, 1], [5, 1], [9, 1], [7, 1], [4, 1], [2, 1], [0, 2],
    [7, 1], [9, 1], [12, 1], [9, 1], [7, 1], [4, 1], [5, 2], [4, 1], [2, 1], [4, 1], [7, 1], [2, 1], [4, 1], [0, 2]];
  const BASS = [0, 0, 5, 7, 0, 5, 7, 0];
  let musicOn = true, musicTimer = null, musicT = 0, mi = 0, beat = 0, musicPause = 0;
  const BPM = 0.32;
  const mf = (st) => 523.25 * Math.pow(2, st / 12);
  function noteAt(f, t, dur, type, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function musicTick() {
    if (!ac || !musicOn || muted) return;
    if (Date.now() < musicPause) { musicT = ac.currentTime + 0.2; return; }
    while (musicT < ac.currentTime + 0.4) {
      const [n, d] = MEL[mi % MEL.length];
      noteAt(mf(n), musicT, d * BPM * 0.9, 'triangle', 0.045);
      if (beat % 2 === 0) noteAt(mf(BASS[(beat / 2) % BASS.length] - 24), musicT, BPM * 1.8, 'sine', 0.055);
      musicT += d * BPM; beat += d; mi++;
    }
  }
  function startMusic() { if (!getAC() || musicTimer) return; musicT = ac.currentTime + 0.1; musicTimer = setInterval(musicTick, 150); }
  function stopMusic() { clearInterval(musicTimer); musicTimer = null; }
  document.addEventListener('pointerdown', function first() { if (musicOn) startMusic(); document.removeEventListener('pointerdown', first); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMusic(); else if (musicOn && !muted) startMusic(); });

  // ---------- ÇİZİM ----------
  const stage = document.getElementById('stage');
  const bar = document.getElementById('options');
  const tabsEl = document.getElementById('tabs');
  const fx = document.getElementById('fx');
  let tab = 1;

  function render() { stage.innerHTML = D.doll(S); }
  function isSel(it) {
    if (it.girl !== undefined) return S.girl === it.girl;
    if (it.tool) return tool === it.tool;
    if (it.color) return toolColor === it.color;
    if (!it.set) return false;
    return Object.keys(it.set).every((k) => (S[k] === undefined ? null : S[k]) === it.set[k]);
  }

  function buildBar() {
    bar.innerHTML = '';
    let idx = 0;
    TABS[tab].items().forEach((it) => {
      if (it === 'sep') { const s = document.createElement('div'); s.className = 'sep'; bar.appendChild(s); return; }
      const b = document.createElement('button');
      b.className = 'opt' + (isSel(it) ? ' sel' : '');
      const i = idx++;
      if (it.none) b.innerHTML = '<span class="none">🚫</span>';
      else if (it.emoji) b.innerHTML = `<span class="big">${it.emoji}</span>` + (it.tool ? `<span class="dot" style="background:${toolColor}"></span>` : '');
      else if (it.swatch) b.innerHTML = `<span class="sw" style="background:${it.swatch}"></span>${it.emo ? `<span class="emo">${it.emo}</span>` : ''}`;
      else {
        const st = Object.assign({}, S, it.girl !== undefined ? GIRLS[it.girl] : it.set, { paint: [] });
        b.innerHTML = `<svg viewBox="${VB[it.vb]}" preserveAspectRatio="xMidYMid meet">${D.doll(st, { bg: it.vb === 'bg' })}</svg>`;
        if (it.girl !== undefined) b.innerHTML += `<span class="name">${GIRLS[it.girl].ad}</span>`;
      }
      b.onclick = (ev) => choose(it, i, ev);
      bar.appendChild(b);
    });
    const sel = bar.querySelector('.sel');
    if (sel) sel.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function choose(it, i, ev) {
    buzz();
    if (it.tool) { tool = it.tool; pop(i); say(TOOLS.find((x) => x.t === tool).ad + '!'); buildBar(); return; }
    if (it.color) { toolColor = it.color; pop(i); say(CNAMES[it.color] || pick(PRAISE)); buildBar(); return; }
    if (it.undo) { S.paint.pop(); save(); render(); sweep(800, 400, 0.15, 'triangle'); return; }
    if (it.clear) { S.paint = []; save(); render(); brushSound(0.2); setTimeout(() => brushSound(0.2), 120); say('Tertemiz oldu! Yeniden boyayalım!'); return; }
    if (it.girl !== undefined) {
      Object.assign(S, GIRLS[it.girl], { girl: it.girl, paint: [] });
      save(); render(); buildBar(); chime(); sparkle(); bounce();
      say('Merhaba! Ben ' + GIRLS[it.girl].ad + '!');
      return;
    }
    Object.assign(S, it.set); save(); pop(i); render(); buildBar(); sparkle(); bounce();
    say(describe(it.set));
  }

  function buildTabs() {
    tabsEl.innerHTML = '';
    TABS.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === tab ? ' on' : '');
      b.textContent = t.icon;
      b.onclick = () => setTab(i);
      tabsEl.appendChild(b);
    });
  }
  function setTab(i) {
    const was = tab; tab = i;
    tone(392 + i * 60, 0.1, 'sine'); buzz(); buildTabs(); buildBar(); bar.scrollLeft = 0;
    if (i === MAKEUP_TAB && was !== MAKEUP_TAB) { zoom(true); say('Makyaj zamanı! Fırçayı seç, parmağınla boya!'); }
    if (i !== MAKEUP_TAB && was === MAKEUP_TAB) zoom(false);
  }

  // ---------- YAKINLAŞTIRMA (makyaj için yüze zoom) ----------
  const FULL = [0, 0, 300, 560], FACE = [78, 26, 144, 269];
  let vb = FULL.slice(), zoomed = false, zAnim = null;
  function zoom(on) {
    zoomed = on; document.body.classList.toggle('makeup', on);
    const from = vb.slice(), to = on ? FACE : FULL, t0 = performance.now();
    cancelAnimationFrame(zAnim);
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 450), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      vb = from.map((v, j) => v + (to[j] - v) * e);
      stage.setAttribute('viewBox', vb.map((v) => v.toFixed(2)).join(' '));
      if (k < 1) zAnim = requestAnimationFrame(step);
    };
    zAnim = requestAnimationFrame(step);
  }

  // ---------- EL İLE MAKYAJ ----------
  const brushEl = document.getElementById('brush');
  let drawing = null, lastBrush = 0, strokesSinceTalk = 0;
  function svgPt(ev) {
    const p = stage.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
    const q = p.matrixTransform(stage.getScreenCTM().inverse());
    return [Math.round(q.x * 10) / 10, Math.round(q.y * 10) / 10];
  }
  function showBrush(ev) {
    brushEl.textContent = (TOOLS.find((x) => x.t === tool) || {}).emo || '🖌️';
    brushEl.style.left = ev.clientX + 'px'; brushEl.style.top = ev.clientY + 'px';
    brushEl.style.display = 'block';
  }
  stage.addEventListener('pointerdown', (ev) => {
    if (!zoomed) return;
    ev.preventDefault();
    const [x, y] = svgPt(ev);
    showBrush(ev);
    const layer = stage.querySelector('.paint');
    if (tool.indexOf('d-') === 0) {
      S.paint.push({ t: tool, c: toolColor, p: [x, y] }); save();
      layer.insertAdjacentHTML('beforeend', D.paintStroke(S.paint[S.paint.length - 1]));
      pop(Math.floor(Math.random() * 8)); sparkleAt(ev.clientX, ev.clientY, 3);
      talkMaybe(); return;
    }
    try { stage.setPointerCapture(ev.pointerId); } catch (e) {}
    drawing = { t: tool, c: toolColor, p: [x, y] };
    layer.insertAdjacentHTML('beforeend', '<g class="live"></g>');
    drawLive(); brushSound();
  });
  stage.addEventListener('pointermove', (ev) => {
    if (!zoomed) return;
    if (!drawing) return;
    showBrush(ev);
    const [x, y] = svgPt(ev), p = drawing.p, lx = p[p.length - 2], ly = p[p.length - 1];
    if (Math.hypot(x - lx, y - ly) < 1.2) return;
    p.push(x, y); drawLive();
    if (Date.now() - lastBrush > 140) { lastBrush = Date.now(); brushSound(0.05); }
    if (drawing.t === 'simli' && Math.random() < 0.15) sparkleAt(ev.clientX, ev.clientY, 1);
  });
  function endStroke() {
    brushEl.style.display = 'none';
    if (!drawing) return;
    S.paint.push(drawing); if (S.paint.length > 400) S.paint.shift();
    drawing = null; save();
    const live = stage.querySelector('.paint .live'); if (live) live.classList.remove('live');
    talkMaybe();
  }
  stage.addEventListener('pointerup', endStroke);
  stage.addEventListener('pointercancel', endStroke);
  function drawLive() { const g = stage.querySelector('.paint .live'); if (g) g.innerHTML = D.paintStroke(drawing); }
  function talkMaybe() {
    strokesSinceTalk++;
    if (strokesSinceTalk >= 4 && Date.now() - lastSay > 4000) {
      strokesSinceTalk = 0;
      say(pick(['Çok güzel oluyor!', 'Bayıldım! Devam et!', 'Ne kadar güzel boyuyorsun!', 'Ayna ayna, çok güzel oldum!', 'Teşekkür ederim, çok tatlı oldum!']));
    }
  }

  // ---------- EFEKTLER ----------
  function sparkleAt(x, y, n) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'spark'; s.textContent = pick(['✨', '⭐', '💫']);
      s.style.left = x - 15 + (Math.random() * 40 - 20) + 'px'; s.style.top = y - 15 + (Math.random() * 30 - 15) + 'px';
      fx.appendChild(s); setTimeout(() => s.remove(), 1300);
    }
  }
  function sparkle(n = 8, set) {
    const r = stage.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.textContent = (set || ['✨', '⭐', '💖', '🌟'])[i % (set || [1, 2, 3, 4]).length];
      s.style.left = r.left + r.width * (0.15 + Math.random() * 0.7) + 'px';
      s.style.top = r.top + r.height * (0.1 + Math.random() * 0.65) + 'px';
      s.style.animationDelay = Math.random() * 0.2 + 's';
      fx.appendChild(s); setTimeout(() => s.remove(), 1400);
    }
  }
  function bounce() { stage.classList.remove('bounce'); void stage.offsetWidth; stage.classList.add('bounce'); }

  let animTimer = null;
  function anim(cls, ms) {
    stage.classList.remove('dance', 'walk', 'wiggle', 'twirl', 'hop', 'bounce', 'kissing', 'waving'); void stage.offsetWidth;
    stage.classList.add(cls);
    clearTimeout(animTimer); animTimer = setTimeout(() => stage.classList.remove(cls), ms);
  }

  // Öpücük: ağızdan uçan öpücükler
  function mouthScreen() {
    const p = stage.createSVGPoint(); p.x = 150; p.y = 160;
    const q = p.matrixTransform(stage.getScreenCTM()); return [q.x, q.y];
  }
  function blowKisses(n = 6) {
    const [mx, my] = mouthScreen();
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'kiss'; s.textContent = pick(['💋', '💋', '😘', '💕', '💖']);
      s.style.left = mx - 20 + 'px'; s.style.top = my - 20 + 'px';
      s.style.setProperty('--dx', (Math.random() * 260 - 130).toFixed(0) + 'px');
      s.style.setProperty('--dy', (-60 - Math.random() * 200).toFixed(0) + 'px');
      s.style.animationDelay = 0.35 + i * 0.12 + 's';
      fx.appendChild(s); setTimeout(() => s.remove(), 2600);
    }
  }
  stage.addEventListener('click', (ev) => {
    if (zoomed) return;
    const g = ev.target.closest && ev.target.closest('[data-part]');
    if (!g) return;
    const part = g.getAttribute('data-part');
    anim('kissing', 1400); buzz();
    if (part === 'sac' || part === 'yuz') giggle();
    setTimeout(muah, 300); setTimeout(muah, 700);
    blowKisses(7);
    musicPause = Date.now() + 2500;
    setTimeout(() => say('Muah! ' + pick(THANKS[part] || THANKS.beden)), 900);
  });

  // ---------- DANS & YÜRÜYÜŞ ----------
  function leaveMakeup() { if (tab === MAKEUP_TAB) setTab(1); }
  // Orijinal dans ezgisi: [yarım ton, uzunluk(8'lik)]
  const DANCE = [0, 4, 7, 4, 9, 7, 4, 2, 0, 4, 7, 12, 11, 9, 7, 7, 5, 9, 12, 9, 7, 4, 2, 4, 0, 4, 7, 4, 9, 12, 14, 12];
  const DBASS = [0, 0, 7, 7, 5, 5, 7, 7];
  document.getElementById('dance').onclick = () => {
    leaveMakeup();
    anim('dance', 8000); buzz(); musicPause = Date.now() + 8300;
    document.body.classList.add('disco'); setTimeout(() => document.body.classList.remove('disco'), 8000);
    say(pick(['Hadi dans edelim!', 'Dans zamanı! Ellerini çırp!', 'Müzik başlasın!']));
    const st = 0.6, e = 0.25;
    DANCE.forEach((n, i) => {
      const t = st + i * e;
      tone(mf(n), 0.2, 'square', t, 0.04);
      tone(mf(n + 12), 0.12, 'sine', t, 0.03);
      if (i % 2 === 0) tone(mf(DBASS[(i / 4 | 0) % 8] - 24), 0.22, 'triangle', t, 0.13);
      if (i % 4 === 0) sweep(160, 50, 0.12, 'sine', 0.25, t); // davul
      if (i % 4 === 2) tone(3000, 0.04, 'square', t, 0.03); // zil
      if (i >= 12 && i < 20 && i % 2 === 1) tone(2200, 0.03, 'square', t, 0.06); // alkış
    });
    for (let k = 0; k < 14; k++) setTimeout(() => sparkle(4, ['🎵', '🎶', '✨', '💖']), k * 550);
    setTimeout(() => say('Yaşasın! Çok eğlendim!'), 8000);
  };
  document.getElementById('walk').onclick = () => {
    leaveMakeup();
    anim('walk', 8000); buzz(); musicPause = Date.now() + 8200;
    const mermaid = S.dress === 'denizkizi';
    say(mermaid ? 'Yüzmeye gidiyorum! Şıp şıp şıp!' : pick(['Yürüyüşe çıkıyorum! Tık tık tık!', 'Bak nasıl yürüyorum!', 'Gezmeye gidiyorum! El sallıyorum!']));
    const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    steps.forEach((i) => setTimeout(() => {
      if (mermaid) tone(700 + Math.random() * 300, 0.08, 'sine', 0, 0.1); else { tone(i % 2 ? 330 : 262, 0.07, 'triangle', 0, 0.2); tone(i % 2 ? 660 : 523, 0.05, 'sine', 0.02, 0.05); }
    }, 400 + i * 450));
    // yürürken neşeli ıslık
    [0, 4, 7, 9, 7, 4, 0, 2, 4, 2, 0].forEach((n, i) => tone(mf(n + 12), 0.25, 'sine', 0.8 + i * 0.45, 0.04));
    setTimeout(() => { say('El sallıyorum! Merhaba!'); stage.classList.add('waving'); }, 3300);
    setTimeout(() => stage.classList.remove('waving'), 5200);
    setTimeout(() => say('Geri geldim!'), 7600);
  };

  const pickA = (a) => a[Math.floor(Math.random() * a.length)];
  document.getElementById('rand').onclick = () => {
    Object.assign(S, {
      dress: pickA(DRESSES), dressColor: pickA(COLORS), hair: pickA(HAIRS), hairColor: pickA(HAIR_COLORS),
      clip: pickA(CLIPS), necklace: pickA(['inci', 'kalp', 'yildiz', null, null]), glasses: pickA([null, null, null, 'yuvarlak', 'kalp', 'yildiz', 'gunes']),
      shoes: pickA(COLORS), bg: pickA(BGS),
    });
    save(); chime(); buzz(); render(); buildBar(); sparkle(); bounce();
    say(pick(['Sürpriz! Yepyeni kıyafetler!', 'Tadaa! Nasıl oldum?', 'Vay canına, çok güzel!']));
  };

  const muteBtn = document.getElementById('mute');
  muteBtn.onclick = () => {
    muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
    if (muted) { stopMusic(); try { speechSynthesis.cancel(); } catch (e) {} } else if (musicOn) startMusic();
  };
  const musicBtn = document.getElementById('music');
  musicBtn.onclick = () => { musicOn = !musicOn; musicBtn.classList.toggle('off', !musicOn); if (musicOn) startMusic(); else stopMusic(); };

  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  render(); buildTabs(); buildBar();
  setTimeout(() => say('Merhaba! Ben ' + (GIRLS[S.girl] || GIRLS[0]).ad + '! Beni giydirir misin?'), 800);
  document.addEventListener('pointerdown', function hi() { document.removeEventListener('pointerdown', hi); if (Date.now() - lastSay > 5000) say('Merhaba! Beni giydirir misin?'); });
})();
