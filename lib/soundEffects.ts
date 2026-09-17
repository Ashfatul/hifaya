'use client';

// Web Audio API helper for offline gentle sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle wooden prayer bead tap sound
export function playTasbihClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // Subtle low-pitched soft tap frequency
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);

    // Vibration on mobile if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15);
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

// Gentle accomplishment bell chime
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Harmonious chord)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.6);
    });

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 40, 50]);
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

// Calming white-noise generator for baby's sleep
let soothingNode: AudioBufferSourceNode | null = null;
let soothingGain: GainNode | null = null;

export function startSoothingHum(): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (soothingNode) {
      stopSoothingHum();
    }

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    // Brown noise (soothing warm rain / pink hum)
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain adjustment
    }

    soothingNode = ctx.createBufferSource();
    soothingNode.buffer = buffer;
    soothingNode.loop = true;

    soothingGain = ctx.createGain();
    soothingGain.gain.setValueAtTime(0.07, ctx.currentTime);

    // Low-pass filter for cozy softness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    soothingNode.connect(filter);
    filter.connect(soothingGain);
    soothingGain.connect(ctx.destination);

    soothingNode.start();
    return true;
  } catch {
    return false;
  }
}

export function stopSoothingHum() {
  try {
    if (soothingNode) {
      soothingNode.stop();
      soothingNode.disconnect();
      soothingNode = null;
    }
  } catch {
    // Ignore
  }
}
