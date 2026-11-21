"""Kız çocuğu kahkahası sentezleyici (formant sentezi, tamamen özgün).
Çıktı: www/ses/kahkaha/k1..k5.mp3  — kullanım: python3 tools/make_laughs.py
"""
import os, subprocess, tempfile
import numpy as np
from scipy.signal import butter, lfilter
from scipy.io import wavfile

SR = 44100
rng = np.random.default_rng(7)

VOWELS = {  # çocuk sesi formantları (F1, F2, F3)
    'i': (420, 3000, 3900),
    'e': (620, 2550, 3600),
    'a': (950, 1750, 3500),
    'ı': (480, 1600, 3300),
}
BW = (90, 140, 220)


def bp(x, f, bw):
    lo, hi = max(40, f - bw), min(SR / 2 - 100, f + bw)
    b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], btype='band')
    return lfilter(b, a, x)


def formant(x, v, gains=(1.0, 0.55, 0.3)):
    return sum(g * bp(x, f, bw) for f, bw, g in zip(VOWELS[v], BW, gains))


def voiced(dur, f0a, f0b, breath=0.12):
    n = int(dur * SR)
    t = np.arange(n) / SR
    # hafif titreşimli perde eğrisi
    f0 = np.linspace(f0a, f0b, n) * (1 + 0.012 * np.sin(2 * np.pi * 6 * t)) * (1 + 0.004 * rng.standard_normal(n).cumsum() / np.sqrt(n))
    ph = 2 * np.pi * np.cumsum(f0) / SR
    src = np.zeros(n)
    for k in range(1, 20):
        if f0a * k > 6000:
            break
        src += np.sin(k * ph) / k ** 1.15
    src += breath * rng.standard_normal(n)
    return src


def env(n, att=0.012, rel=0.05):
    e = np.ones(n)
    a, r = int(att * SR), int(rel * SR)
    e[:a] = np.linspace(0, 1, a) ** 1.5
    e[-r:] *= np.linspace(1, 0, r) ** 1.3
    return e


def syllable(v, dur, f0a, f0b, h=0.03, amp=1.0):
    # "h" nefes başı + ünlü
    hn = int(h * SR)
    hiss = formant(rng.standard_normal(hn + 400) * 0.6, v)[400:] * np.linspace(0, 1, hn) ** 2
    pre = int(0.01 * SR)
    vo = formant(voiced(dur + pre / SR, f0a, f0b), v)[pre:]
    vo *= env(len(vo))
    w = np.linspace(0, 1, hn)
    hiss *= np.sin(np.pi * np.minimum(1, w / 0.7) / 2) ** 2 * np.where(w > 0.7, np.cos((w - 0.7) / 0.3 * np.pi / 2) ** 2, 1)
    ov = int(0.012 * SR)
    out = np.zeros(hn - ov + len(vo))
    out[:hn] += hiss * 0.35
    out[hn - ov:] += vo
    return out * amp


def inhale(dur=0.28):
    n = int(dur * SR)
    x = formant(rng.standard_normal(n), 'a', (0.6, 0.6, 0.5)) * 0.18
    return x * np.sin(np.linspace(0, np.pi, n)) ** 1.5


def laugh(v, count, f0_start, f0_end, syl=0.085, gap=0.055, end_inhale=True, start_amp=1.0):
    parts = []
    for i in range(count):
        k = i / max(1, count - 1)
        f0 = f0_start + (f0_end - f0_start) * k + rng.uniform(-15, 15)
        d = syl * rng.uniform(0.85, 1.2) * (1.3 if i == 0 else 1)
        amp = start_amp * (1 - 0.45 * k) * rng.uniform(0.85, 1.05)
        parts.append(syllable(v, d, f0 * 1.04, f0 * 0.93, amp=amp))
        parts.append(np.zeros(int(gap * rng.uniform(0.8, 1.25) * SR)))
    if end_inhale:
        parts.append(np.zeros(int(0.05 * SR)))
        parts.append(inhale())
    return np.concatenate(parts)


def room(x):
    ir_n = int(0.09 * SR)
    ir = rng.standard_normal(ir_n) * np.exp(-np.linspace(0, 9, ir_n))
    ir[0] = 1
    wet = np.convolve(x, ir)[: len(x)]
    return 0.8 * x + 0.2 * wet / (np.max(np.abs(wet)) + 1e-9) * np.max(np.abs(x))


def save(x, name, outdir):
    x = room(x)
    hp_b, hp_a = butter(2, 120 / (SR / 2), btype='high')
    x = lfilter(hp_b, hp_a, x)
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.89
    x = np.concatenate([np.zeros(int(0.02 * SR)), x, np.zeros(int(0.05 * SR))])
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wavfile.write(f.name, SR, (x * 32767).astype(np.int16))
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f.name, '-ac', '1', '-b:a', '64k', os.path.join(outdir, name + '.mp3')], check=True)
        os.unlink(f.name)


if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'www', 'ses', 'kahkaha')
    os.makedirs(out, exist_ok=True)
    save(laugh('i', 6, 560, 430), 'k1', out)                                  # hi hi hi hi
    save(laugh('e', 5, 500, 380, syl=0.095), 'k2', out)                       # he he he
    save(laugh('a', 7, 470, 330, syl=0.1, gap=0.06), 'k3', out)               # ha ha ha (kahkaha)
    save(laugh('i', 3, 620, 560, end_inhale=False), 'k4', out)                # kısa kıkırdama
    save(np.concatenate([laugh('ı', 4, 600, 520, syl=0.07, gap=0.045, end_inhale=False), np.zeros(int(0.08 * SR)), laugh('a', 5, 520, 360, syl=0.09)]), 'k5', out)
    print('ok')
