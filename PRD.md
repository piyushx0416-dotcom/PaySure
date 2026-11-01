# Product Requirements Document (PRD) — PaySure
## Every Payment. Verified. Every Time.

### 1. Document Overview
- **Project Name**: PaySure
- **Product Type**: Web & PWA Micro-Merchant Payment Verification SaaS
- **Target Audience**: Indian street-food vendors, chai stall owners, quick-service carts (QSR)
- **Primary Persona**: Ramesh Kumar, 42-year-old street food vendor in Bangalore running a busy South Indian tiffin cart (daily footfall: ~250 customers, 90% UPI transactions).

---

## 2. Problem Statement & Design Thinking Research

### 2.1 Empathy & User Research Insights
Small street food vendors operate in fast-paced, high-stress environments. During peak rush hours (8:00 AM–10:30 AM breakfast and 5:00 PM–7:00 PM evening snacks):
1. **Physical Obstacles**: Vendors handle food, oil, batter, and hot cookware. They cannot repeatedly unlock biometric phone screens or swipe notifications.
2. **Asymmetric Verification**: Fraudulent customers exploit this busy window by displaying fabricated UPI screenshots (via APK apps such as SpoofPay, FakePay) that show authentic-looking green tick marks, payer names, and amounts.
3. **SMS Latency**: Banking SMS via telecom gateways experiences jitter (delays of 3 to 10 minutes), leaving vendors uncertain whether to release hot food.
4. **Network Dropouts**: Street corners suffer from cellular congestion and dead spots.
5. **Language & Literacy**: Complex English SaaS bookkeeping applications alienate vendors who speak and comprehend spoken Hindi or Kannada.

---

## 3. Goals & Success Metrics

| Goal | Success Metric | PaySure Implementation |
|---|---|---|
| Zero Fake Screenshot Losses | 100% rejection of unverified customer phone proofs | Deterministic backend verification requiring authoritative settlement |
| Instant Audio Feedback | < 1.2s announcement latency upon credit confirmation | Web Audio API dual-tone chime + Web Speech API voice announcements in 3 languages |
| Hands-Free Stall Operation | 0 phone screen unlocks required during peak rush | Dedicated Soundbox Kiosk screen with massive visual feedback |
| Offline Graceful Degradation | Zero false verifications during cellular dropouts | Local offline queue marking transactions as `PENDING_VERIFICATION` |
| Effortless Daily Reconciliation | < 30 seconds for nightly sales calculation | One-click daily sales reports and CSV downloads |

---

## 4. Product Modules & Functional Specifications

### 4.1 Authentication & Onboarding
- Low-friction registration requiring vendor name, stall name, 10-digit mobile number, email, and preferred language.
- Convenient **1-Click Demo Login** as Ramesh Kumar for live college evaluations.

### 4.2 Real-Time Payment Verification Engine
- Evaluates transactions through an 8-stage pipeline: Event Ingestion → Format Validation → Idempotency Replay Audit → Heuristic Fraud Scan → Authoritative Node Tunneling → Ledger Commitment → Voice Soundbox Dispatch → Dashboard Broadcast.
- Three deterministic states:
  - `SUCCESSFUL`: Emerald green banner, "PAYMENT RECEIVED", cash chime, spoken amount.
  - `PENDING`: Amber spinner, "PAYMENT IS BEING VERIFIED", soft warning chime, spoken wait prompt.
  - `FAILED`: Red alert, "PAYMENT NOT RECEIVED", double buzz, spoken decline prompt.

### 4.3 Multilingual Voice Soundbox Engine
- Spoken announcements supported in:
  - English: *"Payment received. Rupees 150."*
  - Hindi (हिंदी): *"पे-श्योर पर 150 रुपये का भुगतान प्राप्त हुआ।"*
  - Kannada (ಕನ್ನಡ): *"ಪೇಶ್ಯೂರ್‌ನಲ್ಲಿ 150 ರೂಪಾಯಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ."*
- Dual-tone harmonious chime (659.25 Hz & 1318.51 Hz) synthesized via Web Audio API.

### 4.4 Simulation Lab
- 8 one-click presets simulating every critical operational scenario for evaluator demonstrations.
- Interactive terminal console providing transparent, millisecond-stamped execution logs.

### 4.5 Fraud & Tampering Defense Center
- Rule-based detection of:
  - Duplicate UTR reuse (Replay attacks)
  - Amount tampering (Customer claimed ₹150; gateway settled ₹1)
  - Synthetic screenshots without gateway webhooks
  - Rapid repeated attempts

### 4.6 Stall Order Management & Quick POS
- Rapid item builder for typical stall items (Masala Dosa, Filter Coffee, Idli Vada, Ginger Tea).
- Automatic matching and linking of incoming verified payments to open pending orders.

### 4.7 Sales Intelligence & Reporting
- Recharts-powered analytics for hourly sales, weekly revenue, and payment method distribution.
- One-click CSV and printable reconciliation slips.
