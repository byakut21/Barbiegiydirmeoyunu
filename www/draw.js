// Bebek çizimi — tamamen orijinal SVG çizimleri
(function (root) {
  function shade(hex, amt) {
    let c = hex.replace('#', '');
    let r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
  }

  // ---------- ARKA PLANLAR ----------
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
      ${[[30, 480, '#ff5c8a'], [70, 520, '#ffd23f'], [240, 490, '#b36bff'], [275, 530, '#ff8c42'], [210, 540, '#ff5c8a']].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><circle r="6" cx="0" cy="-7" fill="${c}"/><circle r="6" cx="7" cy="0" fill="${c}"/><circle r="6" cx="0" cy="7" fill="${c}"/><circle r="6" cx="-7" cy="0" fill="${c}"/><circle r="5" fill="#fff59d"/></g>`).join('')}`,
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
  };

  // ---------- SAÇ ----------
  function hairBack(s) {
    const c = s.hairColor, d = shade(c, -0.15);
    const cap = `<ellipse cx="150" cy="108" rx="64" ry="66" fill="${c}"/>`;
    switch (s.hair) {
      case 'uzun':
        return `<path d="M86 110 Q78 50 150 42 Q222 50 214 110 L226 300 Q200 318 150 315 Q100 318 74 300 Z" fill="${c}"/>
                <path d="M110 200 L104 300 M190 200 L196 300" stroke="${d}" stroke-width="3" fill="none" opacity=".5"/>`;
      case 'kisa':
        return `<path d="M84 115 Q78 46 150 42 Q222 46 216 115 L220 188 Q150 205 80 188 Z" fill="${c}"/>`;
      case 'atkuyrugu':
        return `${cap}<path d="M195 60 Q260 70 250 160 Q245 220 220 250 Q230 190 215 140 Q205 100 190 85 Z" fill="${c}"/>
                <circle cx="198" cy="66" r="9" fill="${shade(c, -0.3)}"/>`;
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
          for (let i = 0; i < 6; i++) {
            const yy = 160 + i * 24, xx = x + dir * (i * 1.5);
            out += `<ellipse cx="${xx}" cy="${yy}" rx="14" ry="15" fill="${c}" stroke="${d}" stroke-width="2"/>`;
          }
          out += `<circle cx="${x + dir * 9}" cy="300" r="7" fill="#ff5fa2"/>`;
        });
        return out;
      }
    }
    return cap;
  }
  function hairFront(s) {
    const c = s.hairColor;
    return `<path d="M90 122 Q86 50 150 46 Q214 50 210 122 Q204 90 182 80 Q168 98 150 88 Q132 98 118 80 Q96 90 90 122 Z" fill="${c}"/>
            <path d="M120 60 Q150 52 180 60" stroke="#fff" stroke-width="4" opacity=".35" fill="none" stroke-linecap="round"/>`;
  }

  // ---------- TOKA / AKSESUAR ----------
  function clip(s) {
    switch (s.clip) {
      case 'fiyonk':
        return `<g transform="translate(192 70) rotate(15)"><path d="M0 0 L-24 -14 L-24 14Z" fill="#ff4f9a"/><path d="M0 0 L24 -14 L24 14Z" fill="#ff4f9a"/><circle r="7" fill="#ff8cc6"/></g>`;
      case 'cicek':
        return `<g transform="translate(108 70)">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a * Math.PI) / 180) * 10).toFixed(1)}" cy="${(Math.sin((a * Math.PI) / 180) * 10).toFixed(1)}" r="9" fill="#ffffff" stroke="#ffc2e0" stroke-width="2"/>`).join('')}<circle r="7" fill="#ffd23f"/></g>`;
      case 'yildiz':
        return `<g transform="translate(195 68) scale(1.1)"><polygon points="0,-16 4.7,-6.5 15.2,-4.9 7.6,2.5 9.4,13 0,8 -9.4,13 -7.6,2.5 -15.2,-4.9 -4.7,-6.5" fill="#ffd23f" stroke="#f4a300" stroke-width="2"/></g>`;
      case 'kalp':
        return `<g transform="translate(108 66)"><path d="M0 8 C-18 -4 -12 -18 0 -9 C12 -18 18 -4 0 8Z" fill="#ff3b6b" transform="scale(1.3)"/></g>`;
      case 'tac':
        return `<g transform="translate(150 50)"><path d="M-34 6 L-34 -16 L-20 -4 L-8 -24 L0 -6 L8 -24 L20 -4 L34 -16 L34 6Z" fill="#ffd23f" stroke="#e8a200" stroke-width="2"/><circle cx="0" cy="-2" r="5" fill="#ff4f9a"/><circle cx="-20" cy="0" r="3.5" fill="#4fc3ff"/><circle cx="20" cy="0" r="3.5" fill="#4fc3ff"/></g>`;
      case 'bant':
        return `<path d="M92 98 Q150 30 208 98" stroke="#b36bff" stroke-width="10" fill="none" stroke-linecap="round"/>
                ${[110, 130, 150, 170, 190].map((x, i) => `<circle cx="${x}" cy="${[78, 62, 56, 62, 78][i]}" r="3.5" fill="#fff"/>`).join('')}`;
      case 'kelebek':
        return `<g transform="translate(196 72) rotate(-10)"><ellipse cx="-11" cy="-7" rx="11" ry="9" fill="#4fc3ff"/><ellipse cx="11" cy="-7" rx="11" ry="9" fill="#4fc3ff"/><ellipse cx="-8" cy="7" rx="8" ry="6" fill="#b36bff"/><ellipse cx="8" cy="7" rx="8" ry="6" fill="#b36bff"/><rect x="-2" y="-12" width="4" height="24" rx="2" fill="#333"/></g>`;
    }
    return '';
  }

  // ---------- YÜZ / MAKYAJ ----------
  function face(s) {
    let out = '';
    if (s.shadow) out += [127, 173].map((x) => `<ellipse cx="${x}" cy="114" rx="17" ry="10" fill="${s.shadow}" opacity=".6"/>`).join('');
    out += [127, 173].map((x, i) => {
      const dir = i === 0 ? -1 : 1;
      return `<ellipse cx="${x}" cy="125" rx="13" ry="15" fill="#fff"/>
        <circle cx="${x}" cy="128" r="10" fill="${s.eyes || '#6b4226'}"/><circle cx="${x}" cy="128" r="5.5" fill="#1d1d1d"/>
        <circle cx="${x - 3}" cy="124" r="3.5" fill="#fff"/><circle cx="${x + 4}" cy="132" r="1.6" fill="#fff"/>
        <path d="M${x - 14} 118 Q${x} 104 ${x + 14} 118" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M${x + dir * 12} 115 l${dir * 6} -5 M${x + dir * 8} 111 l${dir * 4} -6" stroke="#2b1a10" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M${x - 11} 99 Q${x} 93 ${x + 11} 99" stroke="${shade(s.hairColor, -0.35)}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }).join('');
    out += `<path d="M147 141 Q150 145 153 141" stroke="${shade(s.skin, -0.3)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if (s.blush) out += `<circle cx="110" cy="148" r="11" fill="${s.blush}" opacity=".55"/><circle cx="190" cy="148" r="11" fill="${s.blush}" opacity=".55"/>`;
    if (s.sticker === 'kalp') out += `<path d="M193 160 C186 155 188 149 193 153 C198 149 200 155 193 160Z" fill="#ff3b6b"/>`;
    if (s.sticker === 'yildiz') out += `<polygon transform="translate(194 157) scale(.45)" points="0,-16 4.7,-6.5 15.2,-4.9 7.6,2.5 9.4,13 0,8 -9.4,13 -7.6,2.5 -15.2,-4.9 -4.7,-6.5" fill="#ffd23f"/>`;
    out += `<path d="M136 156 Q150 172 164 156 Q150 162 136 156Z" fill="${s.lip}" stroke="${shade(s.lip, -0.25)}" stroke-width="1.5"/>`;
    return out;
  }

  // ---------- ELBİSELER ----------
  function dress(s) {
    const c = s.dressColor, l = shade(c, 0.45), d = shade(c, -0.18);
    const sleeves = `<ellipse cx="116" cy="207" rx="15" ry="12" fill="${l}"/><ellipse cx="184" cy="207" rx="15" ry="12" fill="${l}"/>`;
    switch (s.dress) {
      case 'prenses':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L176 272 L124 272 Z" fill="${c}"/>
          <path d="M124 268 Q150 262 176 268 Q230 340 248 440 Q150 465 52 440 Q70 340 124 268Z" fill="${c}"/>
          <path d="M52 440 Q68 452 84 442 Q100 455 116 444 Q133 457 150 446 Q167 457 184 444 Q200 455 216 442 Q232 452 248 440" stroke="${l}" stroke-width="7" fill="none"/>
          <path d="M150 270 L150 450 M120 280 Q100 360 90 445 M180 280 Q200 360 210 445" stroke="${d}" stroke-width="2" opacity=".4" fill="none"/>
          <rect x="122" y="262" width="56" height="10" rx="5" fill="${l}"/>
          ${[[100, 380], [150, 350], [200, 385], [125, 420], [178, 420]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" opacity=".85"/>`).join('')}` };
      case 'kisa':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L178 268 Q200 310 206 360 Q150 372 94 360 Q100 310 122 268Z" fill="${c}"/>
          <path d="M94 360 Q150 372 206 360" stroke="${l}" stroke-width="6" fill="none"/>
          ${[[120, 300], [150, 320], [180, 300], [135, 345], [168, 345], [150, 230]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${l}"/>`).join('')}` };
      case 'peri':
        return {
          back: `<g opacity=".75"><path d="M140 215 Q60 130 40 210 Q50 270 140 240Z" fill="${l}" stroke="#fff" stroke-width="3"/><path d="M160 215 Q240 130 260 210 Q250 270 160 240Z" fill="${l}" stroke="#fff" stroke-width="3"/>
                 <path d="M140 240 Q70 260 75 315 Q110 320 145 255Z" fill="${l}" stroke="#fff" stroke-width="3"/><path d="M160 240 Q230 260 225 315 Q190 320 155 255Z" fill="${l}" stroke="#fff" stroke-width="3"/></g>`,
          front: `<path d="M120 200 Q150 192 180 200 L176 270 L124 270Z" fill="${c}"/>
          <path d="M124 266 L88 395 L110 380 L120 400 L135 382 L150 402 L165 382 L180 400 L190 380 L212 395 L176 266Z" fill="${l}" opacity=".85"/>
          <path d="M124 266 L100 370 L118 360 L132 378 L150 362 L168 378 L182 360 L200 370 L176 266Z" fill="${c}"/>
          ${[[115, 330], [150, 300], [185, 330], [150, 345]].map(([x, y]) => `<polygon transform="translate(${x} ${y}) scale(.35)" points="0,-16 4.7,-6.5 15.2,-4.9 7.6,2.5 9.4,13 0,8 -9.4,13 -7.6,2.5 -15.2,-4.9 -4.7,-6.5" fill="#fff"/>`).join('')}`,
        };
      case 'etek':
        return { back: '', front: `
          <path d="M118 200 Q150 192 182 200 L196 222 L182 230 L180 285 L120 285 L118 230 L104 222Z" fill="#ffffff" stroke="#eee" stroke-width="2"/>
          <path d="M140 230 C134 222 137 214 145 219 C151 214 156 222 148 230Z" transform="translate(5 10) scale(1)" fill="${c}"/>
          <path d="M120 280 L180 280 L214 375 Q150 388 86 375Z" fill="${c}"/>
          <path d="M108 300 L192 300 M98 330 L202 330 M90 358 L210 358" stroke="${l}" stroke-width="5"/>
          <rect x="118" y="276" width="64" height="10" rx="4" fill="${d}"/>` };
      case 'denizkizi':
        return { back: '', front: `${sleeves}
          <path d="M120 200 Q150 192 180 200 L178 270 L122 270Z" fill="${l}"/>
          <path d="M122 266 L178 266 Q186 360 168 450 Q160 480 172 500 L150 488 L128 500 Q140 480 132 450 Q114 360 122 266Z" fill="${c}"/>
          <path d="M150 488 Q120 470 95 505 Q125 520 150 500 Q175 520 205 505 Q180 470 150 488Z" fill="${d}"/>
          ${[300, 330, 360, 390, 420].map((y, i) => `<path d="M${130 + (i % 2) * 6} ${y} q8 8 16 0 q8 8 16 0" stroke="${l}" stroke-width="3" fill="none"/>`).join('')}
          ${[[135, 228], [150, 222], [165, 228]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff8d6" stroke="#f0d070"/>`).join('')}` };
      case 'tulum':
        return { back: '', front: `
          <path d="M118 200 Q150 192 182 200 L194 225 L180 232 L178 270 L122 270 L120 232 L106 225Z" fill="#fff3a3"/>
          <path d="M126 230 L174 230 L180 340 L184 470 L156 470 L150 360 L144 470 L116 470 L120 340Z" fill="${c}"/>
          <path d="M130 200 L130 232 M170 200 L170 232" stroke="${c}" stroke-width="7"/>
          <rect x="136" y="244" width="28" height="22" rx="4" fill="${l}"/>
          <circle cx="130" cy="232" r="4" fill="#fff"/><circle cx="170" cy="232" r="4" fill="#fff"/>` };
    }
    return { back: '', front: '' };
  }

  function shoes(s) {
    const c = s.shoes, l = shade(c, 0.5);
    return [134, 166].map((x, i) => `<path d="M${x - 15} 500 Q${x - 15} 488 ${x} 488 Q${x + 15} 488 ${x + 15 + (i ? 4 : -4) * 0} 500 Q${x + 18} 512 ${x} 512 Q${x - 18} 512 ${x - 15} 500Z" fill="${c}"/>
      <circle cx="${x}" cy="492" r="4" fill="${l}"/>`).join('');
  }

  function body(s) {
    const k = s.skin, kd = shade(k, -0.12);
    const mermaid = s.dress === 'denizkizi';
    return `
      ${mermaid ? '' : `<path d="M138 330 L136 495 M162 330 L164 495" stroke="${k}" stroke-width="20" stroke-linecap="round"/>`}
      ${mermaid ? '' : `<g data-part="ayakkabi">${shoes(s)}</g>`}
      <path d="M118 210 Q100 260 92 320 M182 210 Q200 260 208 320" stroke="${k}" stroke-width="17" stroke-linecap="round" fill="none"/>
      <circle cx="91" cy="325" r="11" fill="${k}"/><circle cx="209" cy="325" r="11" fill="${k}"/>
      <rect x="120" y="198" width="60" height="140" rx="22" fill="${k}"/>
      <rect x="141" y="165" width="18" height="40" rx="6" fill="${kd}"/>`;
  }

  function head(s) {
    const k = s.skin;
    return `<circle cx="92" cy="128" r="10" fill="${k}"/><circle cx="208" cy="128" r="10" fill="${k}"/>
            <ellipse cx="150" cy="118" rx="58" ry="62" fill="${k}"/>`;
  }

  function doll(s, opts) {
    opts = opts || {};
    const dr = dress(s);
    return (opts.bg === false ? '' : (BG[s.bg] || BG.oda)()) +
      `<g class="doll"><g data-part="elbise">${dr.back}</g><g data-part="sac">${hairBack(s)}</g><g data-part="beden">${body(s)}</g><g data-part="elbise">${dr.front}</g><g data-part="yuz">${head(s)}${face(s)}</g><g data-part="sac">${hairFront(s)}</g><g data-part="toka">${clip(s)}</g></g>`;
  }

  const api = { doll, shade, BG };
  if (typeof module !== 'undefined') module.exports = api; else root.Draw = api;
})(this);
