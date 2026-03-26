// src/utils/soundEffects.ts
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSuccessChime = () => {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  
  // Triumphant Trumpet Sound (Fanfare)
  // C4, F4, G4, C5
  const notes = [
    { freq: 261.63, time: 0, duration: 0.15 },
    { freq: 349.23, time: 0.15, duration: 0.15 },
    { freq: 392.00, time: 0.3, duration: 0.15 },
    { freq: 523.25, time: 0.45, duration: 0.6 }
  ];
  
  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth'; // Brass-like
    osc.frequency.value = note.freq;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, t + note.time);
    filter.frequency.exponentialRampToValueAtTime(500, t + note.time + note.duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // 30% volume = 0.3 of previous max (which was around 0.1 to 0.4, let's use 0.05 for brass)
    gain.gain.setValueAtTime(0, t + note.time);
    gain.gain.linearRampToValueAtTime(0.05, t + note.time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + note.time + note.duration);
    
    osc.start(t + note.time);
    osc.stop(t + note.time + note.duration);
  });
};

export const playSpinSound = () => {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  
  // A rising magical arpeggio
  const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const startTime = t + i * 0.1;
    gain.gain.setValueAtTime(0, startTime);
    // 30% volume
    gain.gain.linearRampToValueAtTime(0.015, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
    
    osc.start(startTime);
    osc.stop(startTime + 0.5);
  });
};

export const playErrorSound = () => {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine'; // Softer than sawtooth
  osc.frequency.setValueAtTime(200, t);
  osc.frequency.exponentialRampToValueAtTime(150, t + 0.2);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.05, t + 0.02); // Lower volume
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  
  osc.start(t);
  osc.stop(t + 0.2);
};

export const playHoverSound = () => {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.00455, t + 0.01); // 65% of 0.007
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  
  osc.start(t);
  osc.stop(t + 0.1);
};

export const playTwinkleSound = () => {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  
  const freqs = [1046.50, 1318.51, 1567.98, 2093.00]; // C6, E6, G6, C7
  
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const startTime = t + i * 0.08;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
    
    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
};
