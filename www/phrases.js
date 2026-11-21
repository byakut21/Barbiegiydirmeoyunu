// Konuşma metinleri — ses dosyaları bunlardan üretilir (tools/gen_voices.py)
(function (root) {
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

  const TOOLS = [
    { t: 'ruj', emo: '💄', ad: 'Ruj' }, { t: 'allik', emo: '🖌️', ad: 'Allık fırçası' }, { t: 'far', emo: '🎨', ad: 'Göz farı' },
    { t: 'simli', emo: '✨', ad: 'Simli toz' }, { t: 'kalem', emo: '✏️', ad: 'Kalem' },
    { t: 'd-kalp', emo: '❤️', ad: 'Kalp damgası' }, { t: 'd-yildiz', emo: '⭐', ad: 'Yıldız damgası' }, { t: 'd-cicek', emo: '🌸', ad: 'Çiçek damgası' },
  ];

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

  // Diğer cümleler
  const L = {
    hello: (ad) => 'Merhaba! Ben ' + ad + '! Beni giydirir misin?',
    hi: (ad) => 'Merhaba! Ben ' + ad + '!',
    helloShort: ['Merhaba! Beni giydirir misin?'],
    makeupStart: ['Makyaj zamanı! Fırçayı seç, parmağınla boya!'],
    makeupClear: ['Tertemiz oldu! Yeniden boyayalım!'],
    makeupPraise: ['Çok güzel oluyor!', 'Bayıldım! Devam et!', 'Ne kadar güzel boyuyorsun!', 'Ayna ayna, çok güzel oldum!', 'Teşekkür ederim, çok tatlı oldum!'],
    danceStart: ['Hadi dans edelim!', 'Dans zamanı! Ellerini çırp!', 'Müzik başlasın!'],
    danceEnd: ['Yaşasın! Çok eğlendim!', 'Bir daha, bir daha!'],
    walkStart: ['Yürüyüşe çıkıyorum! Tık tık tık!', 'Bak nasıl yürüyorum!', 'Gezmeye gidiyorum!'],
    swimStart: ['Yüzmeye gidiyorum! Şıp şıp şıp!'],
    walkWave: ['El sallıyorum! Merhaba!'],
    walkEnd: ['Geri geldim!'],
    random: ['Sürpriz! Yepyeni kıyafetler!', 'Tadaa! Nasıl oldum?', 'Vay canına, çok güzel!'],
    laugh: ['Hi hi hi! Gıdıklandım!', 'Ha ha ha! Çok komik!', 'Hi hi! Yapma, gıdıklanıyorum!', 'Ha ha! Çok eğleniyorum!', 'Kıkıkı! Bir daha yap!'],
    muah: ['Muaah!'],
    voice: ['Bu benim neşeli sesim!', 'Bu da benim minik sesim!', 'Telefonun sesiyle konuşuyorum.'],
    misc: ['Çilli yanaklar!', 'Çıkardık!', 'Ayakkabı!'],
  };

  // Uygulamanın söyleyebileceği tüm cümleler
  function all() {
    const out = new Set();
    const add = (x) => x && out.add(x);
    GIRLS.forEach((g) => { add(L.hello(g.ad)); add(L.hi(g.ad)); });
    TOOLS.forEach((t) => add(t.ad + '!'));
    Object.values(THANKS).forEach((a) => a.forEach(add));
    PRAISE.forEach(add);
    Object.values(NAMES).forEach((m) => Object.values(m).forEach(add));
    new Set(Object.values(CNAMES)).forEach((c) => { add(c); add(c + '!'); add(c + ' saç!'); add(c + ' ayakkabı!'); add(c + ' gözler!'); });
    Object.entries(L).forEach(([k, v]) => Array.isArray(v) && v.forEach(add));
    return [...out];
  }

  const api = { GIRLS, TOOLS, THANKS, PRAISE, CNAMES, NAMES, L, all };
  if (typeof module !== 'undefined') module.exports = api; else root.P = api;
})(this);
