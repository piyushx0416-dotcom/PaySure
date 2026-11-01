# Design System & UI/UX Guidelines — PaySure

## 1. Design Philosophy
Inspired by premier fintech SaaS applications (**Razorpay, Stripe, Linear**), PaySure combines minimalist, professional desktop management with a **mobile-first, high-contrast street stall interface**.

### 1.1 Core Principles
- **Clarity over Complexity**: Street food vendors work in harsh sunlight, steam, and ambient street noise. Typography and contrast must remain legible from 3 feet away.
- **Color-Coded Status Language**:
  - **Emerald Green (`#10b981`)**: Authoritatively verified payments.
  - **Amber Gold (`#f59e0b`)**: Pending bank clearance or offline queue item.
  - **Rose / Crimson Red (`#f43f5e`)**: Declined transactions or fraud risk warnings.
  - **Deep Navy (`#0b1c3d`)**: Dominant typography and header backgrounds.
  - **Slate Grey (`#f8fafc`)**: Neutral background surfaces minimizing vendor eye strain.
- **Ergonomic Touch Targets**: Minimum 44px by 44px tap targets for rapid counter operation with greasy or flour-covered fingers.

---

## 2. Typography & Hierarchy
- **Primary Font**: Clean modern system sans-serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`).
- **Monospace Font**: Used exclusively for monetary amounts (`₹150`), UTR references (`430198421092`), and timestamps.

---

## 3. Soundbox Audio Ergonomics
- **Dual-tone Chime**: 659.25 Hz (E5) ascending to 1318.51 Hz (E6) generates a universally recognizable, pleasant confirmation bell.
- **Decline Double Buzz**: 220 Hz sawtooth waveform ensures immediate acoustic awareness without vendor panic.
- **Voice Pacing**: Rate set to `0.95` (slightly deliberate) for maximum intelligibility in noisy roadside environments.
