const KEY = "quickforge-sound";

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) !== "off";
}

export function setSoundEnabled(enabled: boolean) {
  window.localStorage.setItem(KEY, enabled ? "on" : "off");
}

let ctx: AudioContext | null = null;

function tone(freq: number, start: number, duration: number, gainValue: number) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.02);
}

function ensureContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playFeedback(kind: "correct" | "wrong") {
  if (!isSoundEnabled()) return;
  if (!ensureContext()) return;
  if (kind === "correct") {
    tone(660, 0, 0.12, 0.12);
    tone(990, 0.1, 0.18, 0.1);
  } else {
    tone(220, 0, 0.18, 0.12);
    tone(160, 0.14, 0.22, 0.1);
  }
}
