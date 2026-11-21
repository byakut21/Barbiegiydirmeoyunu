"""Doğal Türkçe ses paketlerini üretir (GitHub Actions'ta çalışır).
Girdi : phrases.json (node tools/list_phrases.js ile)
Çıktı : www/ses/<paket>/<fnv1a>.mp3 ve www/ses/manifest.json
"""
import asyncio, json, os, sys
import edge_tts

PACKS = {
    # paket: (ses, perde, hız) — neşeli kız çocuğu tonu için inceltilmiş
    'nese': ('tr-TR-EmelNeural', '+40Hz', '+8%'),
    'minik': ('tr-TR-EmelNeural', '+75Hz', '+14%'),
}
ROOT = os.path.join(os.path.dirname(__file__), '..', 'www', 'ses')


def fnv(text):
    x = 0x811C9DC5
    for b in text.encode('utf-8'):
        x ^= b
        x = (x * 0x01000193) & 0xFFFFFFFF
    return f'{x:08x}'


async def one(sem, text, voice, pitch, rate, path):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return True
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, pitch=pitch, rate=rate).save(path)
                return os.path.getsize(path) > 0
            except Exception as e:  # ağ hatası olursa tekrar dene
                print('tekrar', attempt, text, e, file=sys.stderr)
                await asyncio.sleep(2 + attempt * 2)
    return False


async def main():
    phrases = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'phrases.json', encoding='utf-8'))
    sem = asyncio.Semaphore(6)
    manifest = {}
    for pack, (voice, pitch, rate) in PACKS.items():
        d = os.path.join(ROOT, pack)
        os.makedirs(d, exist_ok=True)
        hs = [fnv(t) for t in phrases]
        res = await asyncio.gather(*[one(sem, t, voice, pitch, rate, os.path.join(d, h + '.mp3')) for t, h in zip(phrases, hs)])
        manifest[pack] = [h for h, ok in zip(hs, res) if ok]
        # artık kullanılmayan dosyaları sil
        for f in os.listdir(d):
            if f[:-4] not in set(hs):
                os.remove(os.path.join(d, f))
        print(pack, len(manifest[pack]), '/', len(phrases))
    json.dump(manifest, open(os.path.join(ROOT, 'manifest.json'), 'w'))


asyncio.run(main())
