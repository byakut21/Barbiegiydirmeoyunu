// Bebek çizimi — tamamen orijinal SVG çizimleri
(function (root) {
  function shade(hex, amt) {
    if (!hex || hex[0] !== '#') hex = '#ff8cc6';
    let c = hex.replace('#', '');
    let r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
  }
  const STAR = '0,-16 4.7,-6.5 15.2,-4.9 7.6,2.5 9.4,13 0,8 -9.4,13 -7.6,2.5 -15.2,-4.9 -4.7,-6.5';
  const HEART = 'M0 8 C-18 -4 -12 -18 0 -9 C12 -18 18 -4 0 8Z';
  const flower = (x, y, c, r = 6) => `<g transform="translate(${x} ${y})"><circle r="${r}" cy="${-r - 1}" fill="${c}"/><circle r="${r}" cx="${r + 1}" fill="${c}"/><circle r="${r}" cy="${r + 1}" fill="${c}"/><circle r="${r}" cx="${-r - 1}" fill="${c}"/><circle r="${r * 0.8}" fill="#fff59d"/></g>`;

  // ---------- ARKA PLANLAR (12 mekan) ----------
  const BG = {
    oda: () => `
      <defs><linearGradient id="gOda" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd6ec"/><stop offset="1" stop-color="#ffb3d9"/></linearGradient></defs>
      <rect width="300" height="560" fill="url(#gOda)"/>
      <g opacity=".35" fill="#fff">${[30, 90, 150, 210, 270].map((x, i) => `<circle cx="${x}" cy="${60 + (i % 2) * 70}" r="6"/><circle cx="${x + 30}" cy="${130 + (i % 2) * 70}" r="4"/>`).join('')}</g>
      <rect x="200" y="40" width="80" height="100" rx="10" fill="#bfe8ff" stroke="#fff" stroke-width="6"/>
      <line x1="240" y1="40" x2="240" y2="140" stroke="#fff" stroke-width="5"/><line x1="200" y1="90" x2="280" y2="90" stroke="#fff" stroke-width="5"/>
      <rect y="460" width="300" height="100" fill="#e8a0c8"/>
      <ellipse cx="150" cy="515" rx="120" ry="28" fill="#f7c6e0"/>`,
    bahce: () => `
      <rect width="300" height="560" fill="#9be3ff"/>
      <circle cx="255" cy="55" r="32" fill="#ffe066"/>
      <g fill="#fff"><ellipse cx="60" cy="70" rx="35" ry="16"/><ellipse cx="85" cy="60" rx="25" ry="16"/><ellipse cx="190" cy="120" rx="28" ry="12"/></g>
      <path d="M0 420 Q75 380 150 410 Q225 440 300 400 L300 560 L0 560Z" fill="#7ed957"/>
      <path d="M0 470 Q150 440 300 470 L300 560 L0 560Z" fill="#5cc63f"/>
      ${[[30, 480, '#ff5c8a'], [70, 520, '#ffd23f'], [240, 490, '#b36bff'], [275, 530, '#ff8c42'], [210, 540, '#ff5c8a']].map(([x, y, c]) => flower(x, y, c)).join('')}`,
    sato: () => `
      <defs><linearGradient id="gSato" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1f6e"/><stop offset="1" stop-color="#9b5de5"/></linearGradient></defs>
      <rect width="300" height="560" fill="url(#gSato)"/>
      <circle cx="60" cy="60" r="26" fill="#fff6c2"/><circle cx="72" cy="52" r="24" fill="#4a2a80"/>
      <g fill="#fff">${[[120, 40], [200, 30], [260, 90], [30, 150], [240, 170], [160, 100], [90, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
      <g fill="#c9a7ff" opacity=".8"><rect x="10" y="300" width="50" height="200"/><polygon points="5,300 35,250 65,300"/><rect x="240" y="280" width="55" height="220"/><polygon points="235,280 267,225 300,280"/></g>
      <rect y="480" width="300" height="80" fill="#6a3fb5"/>`,
    deniz: () => `
      <rect width="300" height="560" fill="#7fd8ff"/>
      <circle cx="60" cy="70" r="30" fill="#ffd93d"/>
      <rect y="330" width="300" height="130" fill="#2eb8e6"/>
      <path d="M0 340 Q25 330 50 340 T100 340 T150 340 T200 340 T250 340 T300 340" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>
      <path d="M0 400 Q25 390 50 400 T100 400 T150 400 T200 400 T250 400 T300 400" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>
      <path d="M0 450 Q150 420 300 450 L300 560 L0 560Z" fill="#ffe3a3"/>
      <g transform="translate(40 520)"><path d="M0 0 L8 -14 L16 0 L24 -14 L32 0Z" fill="#ff8fab"/></g>
      <circle cx="260" cy="525" r="10" fill="#ffb4a2"/>`,
    gokkusagi: () => `
      <rect width="300" height="560" fill="#fff0fa"/>
      ${['#ff595e', '#ff924c', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'].map((c, i) => `<path d="M${-20 + i * 16} 470 A${170 - i * 16} ${170 - i * 16} 0 0 1 ${320 - i * 16} 470" stroke="${c}" stroke-width="16" fill="none"/>`).join('')}
      <g fill="#fff"><ellipse cx="20" cy="470" rx="45" ry="22"/><ellipse cx="280" cy="470" rx="45" ry="22"/></g>
      <rect y="480" width="300" height="80" fill="#ffd6f0"/>`,
    kis: () => `
      <rect width="300" height="560" fill="#cfeaff"/>
      ${[[20, 30], [80, 90], [140, 40], [200, 110], [260, 50], [40, 200], [120, 170], [230, 220], [270, 300], [30, 330], [180, 280]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`).join('')}
      ${[[30, 430], [270, 410]].map(([x, y]) => `<polygon points="${x},${y - 110} ${x - 32},${y - 30} ${x + 32},${y - 30}" fill="#2e7d5b"/><polygon points="${x},${y - 80} ${x - 40},${y + 10} ${x + 40},${y + 10}" fill="#348f68"/><rect x="${x - 6}" y="${y + 10}" width="12" height="20" fill="#7a5230"/><path d="M${x - 20} ${y - 50} L${x + 18} ${y - 54}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`).join('')}
      <path d="M0 450 Q150 410 300 450 L300 560 L0 560Z" fill="#ffffff"/>
      <g transform="translate(250 470)"><circle r="24" cy="0" fill="#fff" stroke="#dde"/><circle r="16" cy="-34" fill="#fff" stroke="#dde"/><circle cx="-5" cy="-37" r="2" fill="#333"/><circle cx="5" cy="-37" r="2" fill="#333"/><polygon points="0,-33 12,-31 0,-29" fill="#ff8c42"/><rect x="-14" y="-28" width="28" height="5" rx="2" fill="#ff3b6b"/></g>`,
    uzay: () => `
      <rect width="300" height="560" fill="#14123a"/>
      <g fill="#fff">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 73) % 300}" cy="${(i * 131) % 440}" r="${1 + (i % 3) * 0.7}" opacity="${0.5 + (i % 2) * 0.5}"/>`).join('')}</g>
      <circle cx="235" cy="95" r="38" fill="#ff9ecf"/><ellipse cx="235" cy="95" rx="62" ry="13" fill="none" stroke="#ffd23f" stroke-width="6" transform="rotate(-18 235 95)"/>
      <circle cx="55" cy="180" r="16" fill="#4fc3ff"/><path d="M45 175 q8 -8 16 2 q-4 8 -12 4z" fill="#3ddc97"/>
      <g transform="translate(60 330) rotate(-25)"><path d="M0 -30 Q12 -10 10 20 L-10 20 Q-12 -10 0 -30Z" fill="#fff"/><circle cy="-5" r="5" fill="#4fc3ff"/><path d="M-10 20 L-18 30 L-10 12Z M10 20 L18 30 L10 12Z" fill="#ff3b6b"/><path d="M-6 22 Q0 40 6 22Z" fill="#ffd23f"/></g>
      <path d="M0 470 Q150 440 300 470 L300 560 L0 560Z" fill="#a9a3c9"/>
      <g fill="#8d86b5"><ellipse cx="60" cy="500" rx="18" ry="6"/><ellipse cx="230" cy="520" rx="24" ry="7"/><ellipse cx="160" cy="545" rx="12" ry="4"/></g>`,
    seker: () => `
      <rect width="300" height="560" fill="#ffe0f0"/>
      <g fill="#fff">${[[50, 60], [220, 40], [140, 110]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="14"/>`).join('')}</g>
      ${[[40, 380, '#ff6fb5'], [260, 360, '#4fc3ff'], [230, 470, '#ffd23f']].map(([x, y, c]) => `<rect x="${x - 3}" y="${y}" width="6" height="110" fill="#fff" stroke="#eee"/><circle cx="${x}" cy="${y}" r="26" fill="${c}"/><path d="M${x} ${y} m-14 0 a14 14 0 1 1 14 14 a9 9 0 1 1 -9 -9 a4 4 0 1 1 4 4" stroke="#fff" stroke-width="4" fill="none"/>`).join('')}
      <path d="M0 470 Q40 440 80 470 Q120 440 160 470 Q200 440 240 470 Q280 440 300 460 L300 560 L0 560Z" fill="#c98b5a"/>
      <path d="M0 482 Q40 452 80 482 Q120 452 160 482 Q200 452 240 482 Q280 452 300 472 L300 495 L0 495Z" fill="#fff4f9"/>
      ${[[30, 480, '#ff3b6b'], [100, 475, '#3ddc97'], [190, 480, '#b36bff'], [280, 470, '#ffd23f']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="3" fill="${c}"/>`).join('')}
      <g transform="translate(70 540)"><path d="M0 0 L0 -40 Q0 -55 15 -55 Q30 -55 30 -40" stroke="#ff3b6b" stroke-width="7" fill="none" stroke-dasharray="7 6"/></g>`,
    orman: () => `
      <rect width="300" height="560" fill="#bfeec8"/>
      ${[[30, 300, 70], [270, 290, 80], [100, 250, 55], [210, 240, 60]].map(([x, y, r]) => `<rect x="${x - 9}" y="${y}" width="18" height="${470 - y}" fill="#8d5a2b"/><circle cx="${x}" cy="${y - 10}" r="${r}" fill="#3fa34d"/><circle cx="${x - r * 0.4}" cy="${y - r * 0.5}" r="${r * 0.6}" fill="#56c25f"/>`).join('')}
      <rect y="460" width="300" height="100" fill="#4caf50"/>
      ${[[60, 500], [240, 515], [160, 545]].map(([x, y]) => `<rect x="${x - 5}" y="${y - 6}" width="10" height="16" rx="3" fill="#fff8e1"/><path d="M${x - 18} ${y - 4} Q${x} ${y - 30} ${x + 18} ${y - 4}Z" fill="#ff3b3b"/><circle cx="${x - 6}" cy="${y - 14}" r="3" fill="#fff"/><circle cx="${x + 7}" cy="${y - 10}" r="2.5" fill="#fff"/>`).join('')}
      ${[[20, 520, '#ffd23f'], [280, 545, '#ff6fb5'], [110, 525, '#b36bff']].map(([x, y, c]) => flower(x, y, c, 5)).join('')}`,
    sahne: () => `
      <rect width="300" height="560" fill="#2a1240"/>
      <path d="M150 0 L60 470 L240 470Z" fill="#fff6b0" opacity=".22"/>
      ${Array.from({ length: 6 }, (_, i) => `<circle cx="${30 + i * 48}" cy="16" r="9" fill="${['#ff3b6b', '#ffd23f', '#4fc3ff', '#3ddc97', '#b36bff', '#ff924c'][i]}"/>`).join('')}
      <path d="M0 0 L70 0 Q50 200 75 470 L0 470Z" fill="#d81b40"/><path d="M300 0 L230 0 Q250 200 225 470 L300 470Z" fill="#d81b40"/>
      <path d="M20 0 Q30 240 15 470 M45 0 Q55 240 45 470 M280 0 Q270 240 285 470 M255 0 Q245 240 255 470" stroke="#a3122e" stroke-width="4" fill="none"/>
      <path d="M0 0 L300 0 L300 40 Q225 70 150 40 Q75 70 0 40Z" fill="#b5132f"/>
      <rect y="460" width="300" height="100" fill="#b5793f"/>
      ${[480, 505, 530].map((y) => `<line x1="0" y1="${y}" x2="300" y2="${y}" stroke="#9a6533" stroke-width="2"/>`).join('')}`,
    lunapark: () => `
      <defs><linearGradient id="gLuna" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb37a"/><stop offset="1" stop-color="#ff7eb6"/></linearGradient></defs>
      <rect width="300" height="560" fill="url(#gLuna)"/>
      <g transform="translate(70 230)"><circle r="85" fill="none" stroke="#fff" stroke-width="5"/>
        ${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; const x = (Math.cos(a) * 85).toFixed(1), y = (Math.sin(a) * 85).toFixed(1); return `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="#fff" stroke-width="3"/><rect x="${x - 10}" y="${+y}" width="20" height="16" rx="4" fill="${['#ff3b6b', '#ffd23f', '#4fc3ff', '#3ddc97'][i % 4]}"/>`; }).join('')}
        <circle r="10" fill="#fff"/><path d="M0 0 L-40 240 M0 0 L40 240" stroke="#fff" stroke-width="6"/></g>
      ${[[230, 120, '#ff3b6b'], [260, 160, '#4fc3ff'], [205, 175, '#ffd23f']].map(([x, y, c]) => `<path d="M${x} ${y + 26} Q${x + 5} ${y + 60} ${x - 5} ${y + 100}" stroke="#fff" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="18" ry="23" fill="${c}"/><ellipse cx="${x - 6}" cy="${y - 8}" rx="4" ry="7" fill="#fff" opacity=".5"/>`).join('')}
      <rect y="470" width="300" height="90" fill="#8e5bd1"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle cx="${12 + i * 25}" cy="470" r="4" fill="#ffe066"/>`).join('')}`,
    havuz: () => `
      <rect width="300" height="560" fill="#9fe7ff"/>
      <circle cx="250" cy="60" r="28" fill="#ffe066"/>
      <rect y="250" width="300" height="230" fill="#e9f7ff"/>
      ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 30}" y1="250" x2="${i * 30}" y2="480" stroke="#cfe8f5" stroke-width="2"/>`).join('')}
      <rect x="15" y="280" width="270" height="180" rx="14" fill="#33c3f0"/>
      <path d="M25 320 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#bff0ff" stroke-width="4" fill="none"/>
      <path d="M25 390 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#bff0ff" stroke-width="4" fill="none"/>
      <path d="M255 260 L255 330 M275 260 L275 330 M255 285 L275 285 M255 305 L275 305" stroke="#c0c0c0" stroke-width="4"/>
      <g transform="translate(60 520)"><circle r="20" fill="#fff"/><path d="M0 -20 A20 20 0 0 1 20 0 L0 0Z" fill="#ff3b6b"/><path d="M0 20 A20 20 0 0 1 -20 0 L0 0Z" fill="#4fc3ff"/><path d="M-20 0 A20 20 0 0 1 0 -20 L0 0Z" fill="#ffd23f"/></g>
      <rect y="480" width="300" height="80" fill="#f4d7a9"/>`,
  };

  // ---------- SAÇ ----------
  function hc(s) {
    if (s.hairColor === 'gokkusagi') return { c: 'url(#rbHair)', base: '#ff8cc6' };
    return { c: s.hairColor, base: s.hairColor };
  }
  function hairBack(s) {
    const { c, base } = hc(s), d = shade(base, -0.15);
    const cap = `<ellipse cx="150" cy="108" rx="64" ry="66" fill="${c}"/>`;
    switch (s.hair) {
      case 'uzun':
        return `<path d="M86 110 Q78 50 150 42 Q222 50 214 110 L226 300 Q200 318 150 315 Q100 318 74 300 Z" fill="${c}"/>
                <path d="M110 200 L104 300 M190 200 L196 300" stroke="${d}" stroke-width="3" fill="none" opacity=".5"/>`;
      case 'kisa':
        return `<path d="M84 115 Q78 46 150 42 Q222 46 216 115 L220 188 Q150 205 80 188 Z" fill="${c}"/>`;
      case 'atkuyrugu':
        return `${cap}<path d="M195 60 Q260 70 250 160 Q245 220 220 250 Q230 190 215 140 Q205 100 190 85 Z" fill="${c}"/>
                <circle cx="198" cy="66" r="9" fill="${shade(base, -0.3)}"/>`;
      case 'ikikuyruk':
        return `${cap}<path d="M92 92 Q40 110 42 200 Q44 240 62 255 Q58 200 72 160 Q84 125 100 112Z" fill="${c}"/>
                <path d="M208 92 Q260 110 258 200 Q256 240 238 255 Q242 200 228 160 Q216 125 200 112Z" fill="${c}"/>
                <circle cx="95" cy="100" r="9" fill="#ff5fa2"/><circle cx="205" cy="100" r="9" fill="#ff5fa2"/>`;
      case 'topuz':
        return `${cap}<circle cx="98" cy="58" r="28" fill="${c}"/><circle cx="202" cy="58" r="28" fill="${c}"/>
                <path d="M80 50 Q98 40 116 52 M184 52 Q202 40 220 50" stroke="${d}" stroke-width="3" fill="none"/>`;
      case 'kivircik': {
        let out = '';
        for (let i = 0; i < 18; i++) {
          const a = Math.PI * (0.95 + (i / 17) * 1.1) - Math.PI * 0.05;
          const x = 150 + Math.cos(a) * 72, y = 115 + Math.sin(a) * 74;
          out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="24" fill="${c}"/>`;
        }
        out += `<circle cx="82" cy="190" r="22" fill="${c}"/><circle cx="218" cy="190" r="22" fill="${c}"/><circle cx="90" cy="225" r="18" fill="${c}"/><circle cx="210" cy="225" r="18" fill="${c}"/>`;
        return cap + out;
      }
      case 'orgu': {
        let out = cap;
        [[92, -1], [208, 1]].forEach(([x, dir]) => {
          for (let i = 0; i < 6; i++) out += `<ellipse cx="${x + dir * i * 1.5}" cy="${160 + i * 24}" rx="14" ry="15" fill="${c}" stroke="${d}" stroke-width="2"/>`;
          out += `<circle cx="${x + dir * 9}" cy="300" r="7" fill="#ff5fa2"/>`;
        });
        return out;
      }
    }
    return cap;
  }
  function hairFront(s) {
    const { c } = hc(s);
    return `<path d="M90 122 Q86 50 150 46 Q214 50 210 122 Q204 90 182 80 Q168 98 150 88 Q132 98 118 80 Q96 90 90 122 Z" fill="${c}"/>
            <path d="M120 60 Q150 52 180 60" stroke="#fff" stroke-width="4" opacity=".35" fill="none" stroke-linecap="round"/>`;
  }

  // ---------- TOKA / GÖZLÜK / KOLYE ----------
  function clip(s) {
    switch (s.clip) {
      case 'fiyonk': return `<g transform="translate(192 70) rotate(15)"><path d="M0 0 L-24 -14 L-24 14Z" fill="#ff4f9a"/><path d="M0 0 L24 -14 L24 14Z" fill="#ff4f9a"/><circle r="7" fill="#ff8cc6"/></g>`;
      case 'cicek': return `<g transform="translate(108 70)">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a * Math.PI) / 180) * 10).toFixed(1)}" cy="${(Math.sin((a * Math.PI) / 180) * 10).toFixed(1)}" r="9" fill="#ffffff" stroke="#ffc2e0" stroke-width="2"/>`).join('')}<circle r="7" fill="#ffd23f"/></g>`;
      case 'yildiz': return `<g transform="translate(195 68) scale(1.1)"><polygon points="${STAR}" fill="#ffd23f" stroke="#f4a300" stroke-width="2"/></g>`;
      case 'kalp': return `<g transform="translate(108 66) scale(1.3)"><path d="${HEART}" fill="#ff3b6b"/></g>`;
      case 'tac': return `<g transform="translate(150 50)"><path d="M-34 6 L-34 -16 L-20 -4 L-8 -24 L0 -6 L8 -24 L20 -4 L34 -16 L34 6Z" fill="#ffd23f" stroke="#e8a200" stroke-width="2"/><circle cx="0" cy="-2" r="5" fill="#ff4f9a"/><circle cx="-20" cy="0" r="3.5" fill="#4fc3ff"/><circle cx="20" cy="0" r="3.5" fill="#4fc3ff"/></g>`;
      case 'bant': return `<path d="M92 98 Q150 30 208 98" stroke="#b36bff" stroke-width="10" fill="none" stroke-linecap="round"/>${[110, 130, 150, 170, 190].map((x, i) => `<circle cx="${x}" cy="${[78, 62, 56, 62, 78][i]}" r="3.5" fill="#fff"/>`).join('')}`;
      case 'kelebek': return `<g transform="translate(196 72) rotate(-10)"><ellipse cx="-11" cy="-7" rx="11" ry="9" fill="#4fc3ff"/><ellipse cx="11" cy="-7" rx="11" ry="9" fill="#4fc3ff"/><ellipse cx="-8" cy="7" rx="8" ry="6" fill="#b36bff"/><ellipse cx="8" cy="7" rx="8" ry="6" fill="#b36bff"/><rect x="-2" y="-12" width="4" height="24" rx="2" fill="#333"/></g>`;
      case 'cicektaci': return [96, 116, 136, 156, 176, 196].map((x, i) => flower(x + 4, [86, 66, 56, 54, 62, 82][i], ['#ff6fb5', '#ffd23f', '#b36bff', '#4fc3ff', '#ff924c', '#3ddc97'][i], 5)).join('');
      case 'kulak': return `<path d="M100 70 L92 22 L128 52Z" fill="#ff8cc6" stroke="#fff" stroke-width="4"/><path d="M200 70 L208 22 L172 52Z" fill="#ff8cc6" stroke="#fff" stroke-width="4"/>`;
    }
    return '';
  }
  function glasses(s) {
    switch (s.glasses) {
      case 'yuvarlak': return `<g fill="none" stroke="#8e44ad" stroke-width="3.5"><circle cx="127" cy="126" r="17"/><circle cx="173" cy="126" r="17"/><path d="M144 124 Q150 119 156 124 M110 122 L94 118 M190 122 L206 118"/></g>`;
      case 'kalp': return `<g fill="#ff6fb5" fill-opacity=".25" stroke="#ff3b6b" stroke-width="3.5">${[127, 173].map((x) => `<path transform="translate(${x} 127) scale(1.5)" d="M0 10 C-18 -2 -13 -17 0 -8 C13 -17 18 -2 0 10Z"/>`).join('')}<path d="M144 122 Q150 117 156 122" fill="none"/></g>`;
      case 'yildiz': return `<g fill="#ffd23f" fill-opacity=".3" stroke="#f4a300" stroke-width="3">${[127, 173].map((x) => `<polygon transform="translate(${x} 128) scale(1.3)" points="${STAR}"/>`).join('')}</g>`;
      case 'gunes': return `<g><path d="M106 116 L148 116 Q148 142 127 142 Q106 142 106 116Z M152 116 L194 116 Q194 142 173 142 Q152 142 152 116Z" fill="#2b2b3b"/><path d="M104 116 L196 116" stroke="#ff3b6b" stroke-width="4"/><path d="M114 122 L124 122" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M160 122 L170 122" stroke="#fff" stroke-width="3" opacity=".6"/></g>`;
    }
    return '';
  }
  function necklace(s) {
    switch (s.necklace) {
      case 'inci': return Array.from({ length: 11 }, (_, i) => { const t = i / 10, x = 126 + t * 48, y = 200 + Math.sin(t * Math.PI) * 16; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="#fff" stroke="#e7d7e7"/>`; }).join('');
      case 'kalp': return `<path d="M128 200 Q150 222 172 200" stroke="#f4c430" stroke-width="2" fill="none"/><g transform="translate(150 219)"><path d="${HEART}" fill="#ff3b6b"/></g>`;
      case 'yildiz': return `<path d="M128 200 Q150 222 172 200" stroke="#c0c0c0" stroke-width="2" fill="none"/><polygon transform="translate(150 220) scale(.55)" points="${STAR}" fill="#ffd23f"/>`;
    }
    return '';
  }

  // ---------- YÜZ ----------
  function eyes(s) {
    const shape = s.eyeShape || 'yuvarlak', iris = s.eyes || '#6b4226', brow = shade(hc(s).base, -0.35);
    return [127, 173].map((x, i) => {
      const dir = i === 0 ? -1 : 1;
      let e = '';
      if (shape === 'badem') {
        e = `<path d="M${x - 15} 127 Q${x} 113 ${x + 15} 127 Q${x} 139 ${x - 15} 127Z" fill="#fff"/>
          <circle cx="${x}" cy="127" r="8" fill="${iris}"/><circle cx="${x}" cy="127" r="4.5" fill="#1d1d1d"/><circle cx="${x - 3}" cy="124" r="2.6" fill="#fff"/>
          <path d="M${x - 16} 127 Q${x} 110 ${x + 16} 126" stroke="#2b1a10" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path d="M${x + dir * 15} 125 l${dir * 6} -4" stroke="#2b1a10" stroke-width="2.6" stroke-linecap="round"/>`;
      } else if (shape === 'iri') {
        e = `<ellipse cx="${x}" cy="124" rx="15" ry="18" fill="#fff"/>
          <circle cx="${x}" cy="128" r="12.5" fill="${iris}"/><circle cx="${x}" cy="129" r="6.5" fill="#1d1d1d"/>
          <circle cx="${x - 4}" cy="123" r="4.2" fill="#fff"/><circle cx="${x + 5}" cy="134" r="2.2" fill="#fff"/>
          <path d="M${x - 16} 117 Q${x} 101 ${x + 16} 117" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M${x + dir * 13} 112 l${dir * 7} -5 M${x + dir * 8} 108 l${dir * 4} -6" stroke="#2b1a10" stroke-width="2.4" stroke-linecap="round"/>`;
      } else {
        e = `<ellipse cx="${x}" cy="125" rx="13" ry="15" fill="#fff"/>
          <circle cx="${x}" cy="128" r="10" fill="${iris}"/><circle cx="${x}" cy="128" r="5.5" fill="#1d1d1d"/>
          <circle cx="${x - 3}" cy="124" r="3.5" fill="#fff"/><circle cx="${x + 4}" cy="132" r="1.6" fill="#fff"/>
          <path d="M${x - 14} 118 Q${x} 104 ${x + 14} 118" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M${x + dir * 12} 115 l${dir * 6} -5 M${x + dir * 8} 111 l${dir * 4} -6" stroke="#2b1a10" stroke-width="2.4" stroke-linecap="round"/>`;
        if (shape === 'kirpikli') e += `<path d="M${x + dir * 14} 120 l${dir * 9} -3 M${x + dir * 4} 108 l${dir * 2} -8 M${x - dir * 6} 109 l${-dir * 1} -7 M${x + dir * 9} 138 l${dir * 4} 4 M${x + dir * 3} 140 l${dir * 1} 5" stroke="#2b1a10" stroke-width="2.4" stroke-linecap="round"/>`;
      }
      return `<g class="eye">${e}</g><path class="eyeH" d="M${x - 13} 129 Q${x} 113 ${x + 13} 129" stroke="#2b1a10" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${x - 11} 99 Q${x} 93 ${x + 11} 99" stroke="${brow}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }).join('');
  }
  function face(s) {
    let out = '';
    if (s.shadow) out += [127, 173].map((x) => `<ellipse cx="${x}" cy="114" rx="17" ry="10" fill="${s.shadow}" opacity=".6"/>`).join('');
    out += eyes(s);
    out += `<path d="M147 141 Q150 145 153 141" stroke="${shade(s.skin, -0.3)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if (s.blush) out += `<circle cx="110" cy="148" r="11" fill="${s.blush}" opacity=".55"/><circle cx="190" cy="148" r="11" fill="${s.blush}" opacity=".55"/>`;
    if (s.cil) out += [[108, 143], [114, 149], [102, 150], [192, 143], [186, 149], [198, 150], [145, 136], [155, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="${shade(s.skin, -0.35)}"/>`).join('');
    const lip = s.lip || '#ff7aa2';
    out += `<g class="mouthN"><path d="M136 156 Q150 172 164 156 Q150 162 136 156Z" fill="${lip}" stroke="${shade(lip, -0.25)}" stroke-width="1.5"/></g>
            <g class="mouthL"><path d="M132 152 Q150 152 168 152 Q166 176 150 178 Q134 176 132 152Z" fill="#8a1c3c" stroke="${shade(lip, -0.25)}" stroke-width="3"/><path d="M136 153 L164 153 L162 159 L138 159Z" fill="#fff"/><ellipse cx="150" cy="171" rx="9" ry="5" fill="#ff7a9a"/></g>
            <g class="mouthK"><path transform="translate(150 161) scale(.7)" d="${HEART}" fill="${lip}" stroke="${shade(lip, -0.25)}" stroke-width="2"/></g>`;
    return out;
  }

  // ---------- EL İLE MAKYAJ KATMANI ----------
  function paintStroke(st) {
    const p = st.p || [];
    if (st.t && st.t.indexOf('d-') === 0) {
      const [x, y] = p, k = st.t.slice(2);
      if (k === 'kalp') return `<path transform="translate(${x} ${y}) scale(.5)" d="${HEART}" fill="${st.c}"/>`;
      if (k === 'yildiz') return `<polygon transform="translate(${x} ${y}) scale(.4)" points="${STAR}" fill="${st.c}"/>`;
      return flower(x, y, st.c, 2.6);
    }
    if (st.t === 'simli') {
      let o = '';
      for (let i = 0; i < p.length; i += 2) o += `<circle cx="${p[i] + ((i * 7) % 5) - 2}" cy="${p[i + 1] + ((i * 3) % 5) - 2}" r="${0.8 + (i % 3) * 0.5}" fill="${i % 4 ? st.c : '#fff'}"/>`;
      return o;
    }
    let d = `M${p[0]} ${p[1]}`;
    for (let i = 2; i < p.length; i += 2) d += ` L${p[i]} ${p[i + 1]}`;
    if (p.length === 2) d += ` L${p[0] + 0.1} ${p[1]}`;
    const T = { ruj: [4.5, 0.9, ''], allik: [16, 0.33, 'url(#pBlur6)'], far: [8, 0.5, 'url(#pBlur2)'], kalem: [2.4, 1, ''] }[st.t] || [5, 0.8, ''];
    return `<path d="${d}" stroke="${st.c}" stroke-width="${T[0]}" opacity="${T[1]}" ${T[2] ? `filter="${T[2]}"` : ''} fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function paint(s) {
    return `<g class="paint" clip-path="url(#faceClip)">${(s.paint || []).map(paintStroke).join('')}</g>`;
  }

  // ---------- ELBİSELER ----------
  function dress(s) {
    const c = s.dressColor, l = shade(c, 0.45), d = shade(c, -0.18);
    const sleeves = `<ellipse cx="116" cy="207" rx="15" ry="12" fill="${l}"/><ellipse cx="184" cy="207" rx="15" ry="12" fill="${l}"/>`;
    switch (s.dress) {
      case 'prenses':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L176 272 L124 272 Z" fill="${c}"/>
          <g class="skirt"><path d="M124 268 Q150 262 176 268 Q230 340 248 440 Q150 465 52 440 Q70 340 124 268Z" fill="${c}"/>
          <path d="M52 440 Q68 452 84 442 Q100 455 116 444 Q133 457 150 446 Q167 457 184 444 Q200 455 216 442 Q232 452 248 440" stroke="${l}" stroke-width="7" fill="none"/>
          <path d="M150 270 L150 450 M120 280 Q100 360 90 445 M180 280 Q200 360 210 445" stroke="${d}" stroke-width="2" opacity=".4" fill="none"/>
          ${[[100, 380], [150, 350], [200, 385], [125, 420], [178, 420]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" opacity=".85"/>`).join('')}</g>
          <rect x="122" y="262" width="56" height="10" rx="5" fill="${l}"/>` };
      case 'kisa':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L178 268 L122 268Z" fill="${c}"/>
          <g class="skirt"><path d="M122 266 L178 266 Q200 310 206 360 Q150 372 94 360 Q100 310 122 266Z" fill="${c}"/>
          <path d="M94 360 Q150 372 206 360" stroke="${l}" stroke-width="6" fill="none"/>
          ${[[120, 300], [150, 320], [180, 300], [135, 345], [168, 345]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${l}"/>`).join('')}</g>
          <circle cx="150" cy="230" r="5" fill="${l}"/>` };
      case 'peri':
        return {
          back: `<g class="wings" opacity=".75"><path d="M140 215 Q60 130 40 210 Q50 270 140 240Z" fill="${l}" stroke="#fff" stroke-width="3"/><path d="M160 215 Q240 130 260 210 Q250 270 160 240Z" fill="${l}" stroke="#fff" stroke-width="3"/>
                 <path d="M140 240 Q70 260 75 315 Q110 320 145 255Z" fill="${l}" stroke="#fff" stroke-width="3"/><path d="M160 240 Q230 260 225 315 Q190 320 155 255Z" fill="${l}" stroke="#fff" stroke-width="3"/></g>`,
          front: `<path d="M120 200 Q150 192 180 200 L176 270 L124 270Z" fill="${c}"/>
          <g class="skirt"><path d="M124 266 L88 395 L110 380 L120 400 L135 382 L150 402 L165 382 L180 400 L190 380 L212 395 L176 266Z" fill="${l}" opacity=".85"/>
          <path d="M124 266 L100 370 L118 360 L132 378 L150 362 L168 378 L182 360 L200 370 L176 266Z" fill="${c}"/>
          ${[[115, 330], [150, 300], [185, 330], [150, 345]].map(([x, y]) => `<polygon transform="translate(${x} ${y}) scale(.35)" points="${STAR}" fill="#fff"/>`).join('')}</g>`,
        };
      case 'balerin':
        return { back: '', front: `
          <path d="M122 198 Q150 192 178 198 L180 280 L120 280Z" fill="${c}"/>
          <path d="M128 198 L124 186 M172 198 L176 186" stroke="${c}" stroke-width="4"/>
          <g class="skirt">${[0, 1, 2].map((k) => `<path d="M${118 - k * 2} ${268 + k * 6} L${52 + k * 6} ${300 + k * 4} ${Array.from({ length: 13 }, (_, i) => `L${58 + k * 6 + i * (184 - k * 12) / 12} ${(i % 2 ? 312 : 300) + k * 4}`).join(' ')} L${182 + k * 2} ${268 + k * 6}Z" fill="${k === 1 ? l : c}" opacity="${k === 1 ? 0.9 : 0.8}"/>`).join('')}</g>
          <path d="M140 230 l10 -8 l10 8 l-10 8z" fill="${l}"/>` };
      case 'etek':
        return { back: '', front: `
          <path d="M118 200 Q150 192 182 200 L196 222 L182 230 L180 285 L120 285 L118 230 L104 222Z" fill="#ffffff" stroke="#eee" stroke-width="2"/>
          <path d="M140 230 C134 222 137 214 145 219 C151 214 156 222 148 230Z" transform="translate(5 10)" fill="${c}"/>
          <g class="skirt"><path d="M120 280 L180 280 L214 375 Q150 388 86 375Z" fill="${c}"/>
          <path d="M108 300 L192 300 M98 330 L202 330 M90 358 L210 358" stroke="${l}" stroke-width="5"/></g>
          <rect x="118" y="276" width="64" height="10" rx="4" fill="${d}"/>` };
      case 'denizkizi':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L178 270 L122 270Z" fill="${l}"/>
          <g class="skirt"><path d="M122 266 L178 266 Q186 360 168 450 Q160 480 172 500 L150 488 L128 500 Q140 480 132 450 Q114 360 122 266Z" fill="${c}"/>
          <path d="M150 488 Q120 470 95 505 Q125 520 150 500 Q175 520 205 505 Q180 470 150 488Z" fill="${d}"/>
          ${[300, 330, 360, 390, 420].map((y, i) => `<path d="M${130 + (i % 2) * 6} ${y} q8 8 16 0 q8 8 16 0" stroke="${l}" stroke-width="3" fill="none"/>`).join('')}</g>
          ${[[135, 228], [150, 222], [165, 228]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff8d6" stroke="#f0d070"/>`).join('')}` };
      case 'tulum':
        return { back: '', front: `
          <path d="M118 200 Q150 192 182 200 L194 225 L180 232 L178 270 L122 270 L120 232 L106 225Z" fill="#fff3a3"/>
          <path d="M126 230 L174 230 L178 330 L122 330Z" fill="${c}"/>
          <path d="M130 200 L130 232 M170 200 L170 232" stroke="${c}" stroke-width="7"/>
          <rect x="136" y="244" width="28" height="22" rx="4" fill="${l}"/>
          <circle cx="130" cy="232" r="4" fill="#fff"/><circle cx="170" cy="232" r="4" fill="#fff"/>`, legs: c };
    }
    return { back: '', front: '' };
  }

  function shoe(s, x) {
    const c = s.shoes, l = shade(c, 0.5);
    return `<path d="M${x - 15} 500 Q${x - 15} 488 ${x} 488 Q${x + 15} 488 ${x + 15} 500 Q${x + 18} 512 ${x} 512 Q${x - 18} 512 ${x - 15} 500Z" fill="${c}"/>
      <circle cx="${x}" cy="492" r="4" fill="${l}"/>`;
  }

  function body(s, dr) {
    const k = s.skin, kd = shade(k, -0.12);
    const mermaid = s.dress === 'denizkizi';
    const leg = (cls, x1, x2, sx) => `<g class="${cls}"><path d="M${x1} 330 L${x2} 495" stroke="${k}" stroke-width="20" stroke-linecap="round"/>
      ${dr.legs ? `<path d="M${x1} 322 L${x2 - (x2 - x1) * 0.15} 470" stroke="${dr.legs}" stroke-width="26" stroke-linecap="round"/>` : ''}
      <g data-part="ayakkabi">${shoe(s, sx)}</g></g>`;
    return `
      ${mermaid ? '' : leg('legL', 138, 136, 134) + leg('legR', 162, 164, 166)}
      <g class="armL"><path d="M118 210 Q100 260 92 320" stroke="${k}" stroke-width="17" stroke-linecap="round" fill="none"/><circle cx="91" cy="325" r="11" fill="${k}"/></g>
      <g class="armR"><path d="M182 210 Q200 260 208 320" stroke="${k}" stroke-width="17" stroke-linecap="round" fill="none"/><circle cx="209" cy="325" r="11" fill="${k}"/></g>
      <rect x="120" y="198" width="60" height="140" rx="22" fill="${k}"/>
      <rect x="141" y="165" width="18" height="40" rx="6" fill="${kd}"/>`;
  }

  function head(s) {
    const k = s.skin;
    return `<circle cx="92" cy="128" r="10" fill="${k}"/><circle cx="208" cy="128" r="10" fill="${k}"/>
            <ellipse cx="150" cy="118" rx="58" ry="62" fill="${k}"/>`;
  }

  const DEFS = `<style>.mouthK,.mouthL,.eyeH{display:none}</style><defs>
    <clipPath id="faceClip"><ellipse cx="150" cy="118" rx="58" ry="62"/></clipPath>
    <filter id="pBlur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="pBlur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
    <linearGradient id="rbHair" x1="0" y1="0" x2="0" y2="1">${['#ff595e', '#ff924c', '#ffca3a', '#8ac926', '#1982c4', '#b36bff'].map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join('')}</linearGradient>
  </defs>`;

  function doll(s, opts) {
    opts = opts || {};
    const dr = dress(s);
    return DEFS + (opts.bg === false ? '' : (BG[s.bg] || BG.oda)()) +
      `<g class="doll"><ellipse class="shadow" cx="150" cy="512" rx="52" ry="8" fill="#000" opacity=".12"/>
        <g class="bob">
          <g data-part="elbise">${dr.back}</g>
          <g class="headG"><g data-part="sac">${hairBack(s)}</g></g>
          <g data-part="beden">${body(s, dr)}</g>
          <g data-part="elbise">${dr.front}</g>
          <g data-part="kolye">${necklace(s)}</g>
          <g class="headG"><g data-part="yuz">${head(s)}${face(s)}${paint(s)}</g><g data-part="sac">${hairFront(s)}</g><g data-part="yuz">${glasses(s)}</g><g data-part="toka">${clip(s)}</g></g>
        </g></g>`;
  }

  const api = { doll, shade, BG, paintStroke };
  if (typeof module !== 'undefined') module.exports = api; else root.Draw = api;
})(this);
