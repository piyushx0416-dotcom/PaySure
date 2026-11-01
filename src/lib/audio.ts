// Audio & Voice Engine for PaySure
// Features Web Audio API Chime Synthesis and Web Speech API Queue with Strict Voice Matching

export type VoiceLanguage = "en" | "hi" | "kn";

interface QueueItem {
  text: string;
  lang: VoiceLanguage;
}

// Convert numbers to natural English words for unambiguous TTS pronunciation
export function numberToWordsEnglish(num: number): string {
  if (num === 0) return "zero";
  if (!Number.isFinite(num) || num < 0) return String(num);

  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const convertLessThanOneThousand = (n: number): string => {
    let res = "";
    if (n >= 100) {
      res += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
      if (n > 0) res += "and ";
    }
    if (n >= 20) {
      res += tens[Math.floor(n / 10)];
      if (n % 10 > 0) res += " " + ones[n % 10];
    } else if (n > 0) {
      res += ones[n];
    }
    return res.trim();
  };

  let remainder = Math.floor(num);
  let words = "";

  if (remainder >= 10000000) {
    const crore = Math.floor(remainder / 10000000);
    words += convertLessThanOneThousand(crore) + " crore ";
    remainder %= 10000000;
  }
  if (remainder >= 100000) {
    const lakh = Math.floor(remainder / 100000);
    words += convertLessThanOneThousand(lakh) + " lakh ";
    remainder %= 100000;
  }
  if (remainder >= 1000) {
    const thousand = Math.floor(remainder / 1000);
    words += convertLessThanOneThousand(thousand) + " thousand ";
    remainder %= 1000;
  }
  if (remainder > 0) {
    words += convertLessThanOneThousand(remainder);
  }

  return words.trim() || String(num);
}

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private speechQueue: QueueItem[] = [];
  private isSpeaking = false;
  private volume = 1.0;
  private isMuted = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        this.cachedVoices = v;
      }
    } catch {
      // Ignore voice enumeration errors
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    if (muted) {
      this.stopAll();
    }
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
      console.warn("Web Audio chime error:", e);
    }
  }

  // Strictly select the voice matching the requested language
  private getBestVoice(lang: VoiceLanguage): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

    let voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      this.cachedVoices = voices;
    }

    if (!voices || voices.length === 0) return null;

    if (lang === "en") {
      // STRICT FILTER FOR ENGLISH:
      // Must start with "en" AND must NOT be a Hindi or regional non-English voice
      const strictlyEnglish = voices.filter((v) => {
        const vLang = (v.lang || "").toLowerCase();
        const vName = (v.name || "").toLowerCase();
        if (
          vLang.startsWith("hi") ||
          vLang.startsWith("kn") ||
          vLang.startsWith("mr") ||
          vLang.startsWith("ta") ||
          vLang.startsWith("te") ||
          vName.includes("hindi") ||
          vName.includes("kalpana") ||
          vName.includes("hemant") ||
          vName.includes("swara") ||
          vName.includes("madhav") ||
          vName.includes("kannada")
        ) {
          return false;
        }
        return vLang.startsWith("en");
      });

      if (strictlyEnglish.length > 0) {
        // 1. Prefer English (India) voices (e.g. Microsoft Ravi, Microsoft Heera, Google English India)
        const inVoice = strictlyEnglish.find(
          (v) =>
            v.lang.toLowerCase() === "en-in" ||
            (v.name.toLowerCase().includes("india") && v.lang.toLowerCase().startsWith("en"))
        );
        if (inVoice) return inVoice;

        // 2. Prefer Natural / Online English voices
        const naturalVoice = strictlyEnglish.find(
          (v) => v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("online")
        );
        if (naturalVoice) return naturalVoice;

        // 3. Fallback to any en-US or en-GB voice
        const usVoice = strictlyEnglish.find((v) => v.lang.toLowerCase().startsWith("en-us"));
        if (usVoice) return usVoice;

        const gbVoice = strictlyEnglish.find((v) => v.lang.toLowerCase().startsWith("en-gb"));
        if (gbVoice) return gbVoice;

        return strictlyEnglish[0];
      }

      // General fallback if no strict match
      return voices.find((v) => v.lang.toLowerCase().startsWith("en")) || null;
    }

    if (lang === "hi") {
      // Find dedicated Hindi voice
      const hindiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("hi") ||
          v.name.toLowerCase().includes("hindi") ||
          v.name.toLowerCase().includes("kalpana") ||
          v.name.toLowerCase().includes("hemant") ||
          v.name.toLowerCase().includes("swara")
      );
      return hindiVoice || null;
    }

    if (lang === "kn") {
      // Find dedicated Kannada voice
      const kannadaVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("kn") ||
          v.name.toLowerCase().includes("kannada") ||
          v.name.toLowerCase().includes("sapna")
      );
      return kannadaVoice || null;
    }

    return null;
  }

  // Web Speech API Voice synthesis with sequential queue and language pinning
  public speak(text: string, lang: VoiceLanguage = "en") {
    if (this.isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Push item with its pinned language into queue
    this.speechQueue.push({ text, lang });

    if (!this.isSpeaking) {
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.speechQueue.length === 0) {
      this.isSpeaking = false;
      this.activeUtterance = null;
      if (this.watchdogTimer) {
        clearTimeout(this.watchdogTimer);
        this.watchdogTimer = null;
      }
      return;
    }

    this.isSpeaking = true;
    const item = this.speechQueue.shift();
    if (!item || !item.text) {
      this.processQueue();
      return;
    }

    const { text, lang } = item;

    try {
      // Reset any stuck speech synthesizer before starting
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      this.activeUtterance = utterance;

      utterance.volume = this.volume;
      utterance.rate = 0.95; // slightly deliberate for maximum vendor soundbox clarity
      utterance.pitch = 1.0;

      const matchedVoice = this.getBestVoice(lang);

      if (lang === "en") {
        utterance.lang = matchedVoice ? matchedVoice.lang : "en-IN";
      } else if (lang === "hi") {
        utterance.lang = matchedVoice ? matchedVoice.lang : "hi-IN";
      } else if (lang === "kn") {
        utterance.lang = matchedVoice ? matchedVoice.lang : "kn-IN";
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      const advanceQueue = () => {
        if (this.watchdogTimer) {
          clearTimeout(this.watchdogTimer);
          this.watchdogTimer = null;
        }
        this.activeUtterance = null;
        setTimeout(() => {
          this.processQueue();
        }, 200);
      };

      utterance.onend = () => {
        advanceQueue();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        advanceQueue();
      };

      // Watchdog timer: prevent Chrome background bug from locking the queue
      this.watchdogTimer = setTimeout(() => {
        if (this.isSpeaking) {
          console.warn("Speech synthesis watchdog triggered, advancing queue.");
          advanceQueue();
        }
      }, 7000);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech execution error:", e);
      this.isSpeaking = false;
      this.activeUtterance = null;
    }
  }

  public stopAll() {
    this.speechQueue = [];
    this.isSpeaking = false;
    this.activeUtterance = null;
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore cancel errors
      }
    }
  }
}

export const audioEngine = new AudioEngine();
