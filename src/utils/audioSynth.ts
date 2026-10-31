/**
 * Web Audio API synthesizer for hospital relaxation and timer cues
 * 100% self-contained: works offline and in sandbox without external audio assets.
 */

let audioCtx: AudioContext | null = null;
let ambientGainNode: GainNode | null = null;
let ambientSource: AudioNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a resonant, warm relaxation chime (Tibetan singing bowl chord)
 */
export function playChime(pitch: number = 440, duration: number = 2.5): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    masterGain.connect(ctx.destination);

    // Fundamental and 2 soothing overtones (harmonic singing bowl effect)
    const freqs = [pitch, pitch * 1.5, pitch * 2.76];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Detune slightly for warm acoustic chorusing
      if (idx > 0) {
        osc.detune.setValueAtTime((idx % 2 === 0 ? 4 : -4), now);
      }

      gain.gain.setValueAtTime(idx === 0 ? 0.7 : 0.3 / idx, now);
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  } catch {
    // Audio might be blocked if user hasn't interacted yet
  }
}

/**
 * Play gentle transition tick/bell for countdown
 */
export function playGentleClick(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now); // D5 note
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // fallback
  }
}

/**
 * Synthesizes continuous pink/brown soothing noise with slow dynamic filtering
 * mimicking gentle oceanic swells to mask stressful hospital alarm chirps.
 */
export function startAmbientSwellingSound(volume: number = 0.2): void {
  if (isAmbientPlaying) return;

  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate brown-like noise (softer on ears than white noise)
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    const whiteNoiseSource = ctx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Filter to sound like soft breathing / ocean tide
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, ctx.currentTime);

    // LFO for ocean wave modulation
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 1 cycle every ~8 seconds

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(120, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Volume gain node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), ctx.currentTime + 1.5);

    whiteNoiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoiseSource.start();

    ambientGainNode = gainNode;
    ambientSource = whiteNoiseSource;
    isAmbientPlaying = true;
  } catch {
    isAmbientPlaying = false;
  }
}

export function stopAmbientSound(): void {
  if (!isAmbientPlaying || !ambientGainNode || !audioCtx) {
    isAmbientPlaying = false;
    return;
  }

  try {
    const now = audioCtx.currentTime;
    ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    setTimeout(() => {
      if (ambientSource) {
        try {
          (ambientSource as AudioBufferSourceNode).stop();
          ambientSource.disconnect();
        } catch {
          // ignore
        }
      }
      ambientSource = null;
      ambientGainNode = null;
      isAmbientPlaying = false;
    }, 850);
  } catch {
    isAmbientPlaying = false;
  }
}

export function setAmbientVolume(vol: number): void {
  if (ambientGainNode && audioCtx) {
    ambientGainNode.gain.setValueAtTime(Math.max(0.001, vol), audioCtx.currentTime);
  }
}

export function getIsAmbientPlaying(): boolean {
  return isAmbientPlaying;
}
