// Audio & Voice Engine for PaySure
// Features Web Audio API Chime Synthesis and Web Speech API Queue

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private speechQueue: string[] = [];
  private isSpeaking = false;
  private volume = 1.0;
  private isMuted = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setVolume(volPercent: number) {
    this.volume = Math.max(0, Math.min(1, volPercent / 100));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  // Play realistic fintech soundbox chime using Web Audio API synthesis
  public playChime(type: "SUCCESS" | "PENDING" | "FAILED" | "ALERT" = "SUCCESS") {
    if (this.isMuted || typeof window === "undefined") return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(this.volume * 0.35, now);
      gainNode.connect(ctx.destination);

      if (type === "SUCCESS") {
        // High-low cheerful dual-tone chime (Paytm/PhonePe soundbox bell ding-dong)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(659.25, now); // E5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1318.51, now + 0.15); // E6

        gainNode.gain.setValueAtTime(this.volume * 0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc1.connect(gainNode);
        osc2.connect(gainNode);

        osc1.start(now);
        osc1.stop(now + 0.2);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.7);
      } else if (type === "PENDING") {
        // Amber soft triple pulse
        [0, 0.14, 0.28].forEach((offset) => {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          pGain.gain.setValueAtTime(this.volume * 0.25, now + offset);
          pGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);

          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now + offset); // C5
          osc.connect(pGain);
          pGain.connect(ctx.destination);

          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else if (type === "FAILED") {
        // Low cautionary double buzz
        [0, 0.2].forEach((offset) => {
          const osc = ctx.createOscillator();
          const fGain = ctx.createGain();
          fGain.gain.setValueAtTime(this.volume * 0.4, now + offset);
          fGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, now + offset); // A3
          osc.connect(fGain);
          fGain.connect(ctx.destination);

          osc.start(now + offset);
          osc.stop(now + offset + 0.18);
        });
      } else {
        // High alert siren
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn("Web Audio chime could not play:", e);
    }
  }

  // Web Speech API Voice synthesis with sequential queue
  public speak(text: string, lang: "en" | "hi" | "kn" = "en") {
    if (this.isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    this.speechQueue.push(text);
    if (!this.isSpeaking) {
      this.processQueue(lang);
    }
  }

  private processQueue(lang: "en" | "hi" | "kn") {
    if (this.speechQueue.length === 0) {
      this.isSpeaking = false;
      return;
    }

    this.isSpeaking = true;
    const textToSpeak = this.speechQueue.shift();
    if (!textToSpeak) {
      this.isSpeaking = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.volume = this.volume;
    utterance.rate = 0.95; // slightly slower for maximum clarity in noisy street food stall
    utterance.pitch = 1.0;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    let matchedVoice: SpeechSynthesisVoice | undefined;

    if (lang === "hi") {
      utterance.lang = "hi-IN";
      matchedVoice = voices.find((v) => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi"));
    } else if (lang === "kn") {
      utterance.lang = "kn-IN";
      matchedVoice = voices.find((v) => v.lang.startsWith("kn") || v.name.toLowerCase().includes("kannada"));
    } else {
      utterance.lang = "en-IN";
      matchedVoice = voices.find((v) => v.lang.startsWith("en-IN") || v.name.toLowerCase().includes("india"));
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      setTimeout(() => {
        this.processQueue(lang);
      }, 300);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isSpeaking = false;
      this.processQueue(lang);
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopAll() {
    this.speechQueue = [];
    this.isSpeaking = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioEngine = new AudioEngine();
