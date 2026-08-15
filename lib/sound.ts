let sharedCtx: AudioContext | null = null;
let lofiNodes: {
  oscillators: OscillatorNode[];
  gains: GainNode[];
} | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    const AC =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    if (!AC) return null;

    if (!sharedCtx || sharedCtx.state === "closed") {
      sharedCtx = new AC();
    }

    return sharedCtx;
  } catch {
    return null;
  }
}

// Unlock browser audio after the user clicks an egg
export function unlockAudio(): void {
  const ctx = getCtx();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

// --------------------------------------------------
// LOFI BACKGROUND
// --------------------------------------------------

export function startLofi(): void {
  const ctx = getCtx();

  if (!ctx || lofiNodes) return;

  const master = ctx.createGain();
  master.gain.value = 0.025;
  master.connect(ctx.destination);

  // Soft chord: Cmaj7-ish
  const frequencies = [130.81, 164.81, 196.0, 246.94];

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  frequencies.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = index % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = frequency;

    // Tiny detune gives a warmer lofi feeling
    osc.detune.value = index % 2 === 0 ? -4 : 4;

    gain.gain.value = 0.12;

    osc.connect(gain);
    gain.connect(master);

    osc.start();

    oscillators.push(osc);
    gains.push(gain);
  });

  lofiNodes = {
    oscillators,
    gains: [...gains, master],
  };
}

export function stopLofi(): void {
  if (!lofiNodes) return;

  for (const osc of lofiNodes.oscillators) {
    try {
      osc.stop();
    } catch {
      // Already stopped
    }
  }

  for (const gain of lofiNodes.gains) {
    try {
      gain.disconnect();
    } catch {
      // Already disconnected
    }
  }

  lofiNodes = null;
}

// --------------------------------------------------
// CLOCK TICK
// --------------------------------------------------

export function playTick(stronger = false): void {
  const ctx = getCtx();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";

    osc.frequency.setValueAtTime(
      stronger ? 1350 : 1050,
      now
    );

    gain.gain.setValueAtTime(
      stronger ? 0.055 : 0.025,
      now
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.035
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore audio errors
  }
}

// --------------------------------------------------
// FINAL DING
// --------------------------------------------------

export async function playDing(): Promise<void> {
  const ctx = getCtx();
  if (!ctx) return;

  try {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const now = ctx.currentTime;

    const tones = [
      { freq: 659.25, start: 0, dur: 0.45, gain: 0.20 },
      { freq: 880, start: 0.10, dur: 0.65, gain: 0.18 },
      { freq: 1174.66, start: 0.22, dur: 0.90, gain: 0.14 },
      { freq: 1318.51, start: 0.35, dur: 1.10, gain: 0.10 },
    ];

    for (const tone of tones) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(
        tone.freq,
        now + tone.start
      );

      gain.gain.setValueAtTime(
        0.0001,
        now + tone.start
      );

      gain.gain.exponentialRampToValueAtTime(
        tone.gain,
        now + tone.start + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + tone.start + tone.dur
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + tone.start);
      osc.stop(now + tone.start + tone.dur + 0.05);
    }
  } catch {
    // Ignore audio permission errors
  }
}