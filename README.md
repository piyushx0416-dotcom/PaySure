# PaySure — Every Payment. Verified. Every Time.
## Smart UPI Payment Verification & Vendor Management Platform

[![Live Demo](https://img.shields.io/badge/GitHub%20Pages-Permanent%20HTTPS-success?style=for-the-badge&logo=github)](https://piyushx0416-dotcom.github.io/PaySure/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Dark Mode](https://img.shields.io/badge/Theme-Default%20Dark%20%7C%20System-070e1b?style=for-the-badge)](https://piyushx0416-dotcom.github.io/PaySure/)

---

### 🌐 Permanent Live Public Website (Never Expires)

PaySure is hosted 24/7 on **GitHub Pages** with permanent HTTPS encryption. Anyone can evaluate the platform on any smartphone, tablet, or PC without installing any software or running local tunnels:

- 🚀 **Main Application Portal**: **[https://piyushx0416-dotcom.github.io/PaySure/](https://piyushx0416-dotcom.github.io/PaySure/)**
- 🔊 **Live Soundbox Kiosk Screen**: **[https://piyushx0416-dotcom.github.io/PaySure/monitor/](https://piyushx0416-dotcom.github.io/PaySure/monitor/)**
- 🧪 **Interactive Simulation Lab**: **[https://piyushx0416-dotcom.github.io/PaySure/simulation/](https://piyushx0416-dotcom.github.io/PaySure/simulation/)**
- 🛡️ **Fraud Detection Center**: **[https://piyushx0416-dotcom.github.io/PaySure/fraud/](https://piyushx0416-dotcom.github.io/PaySure/fraud/)**
- 📊 **Stall Sales Analytics**: **[https://piyushx0416-dotcom.github.io/PaySure/analytics/](https://piyushx0416-dotcom.github.io/PaySure/analytics/)**

*Hosted permanently by GitHub. Built with Next.js 14, default dark mode, offline caching, and multilingual voice synthesis (English, Hindi, Kannada).*

---

## 🌟 Executive Summary & Problem Solved

Street food vendors like **Ramesh Kumar** (42, street-food vendor operating a busy South Indian tiffin stall in Bangalore) face daily chaos accepting digital UPI payments:
- **Fake UPI payment screenshots**: Fraudulent customers display synthetic green-tick payment screens created with spoofing apps like FakePay without transferring any money.
- **Delayed payment SMS notifications**: Bank telecom SMS often takes 5–10 minutes to arrive during peak hours.
- **Crowded stall friction**: Vendors cannot wipe oily batter from their hands to unlock smartphones 200+ times an evening.
- **Poor mobile internet & dead zones**: Stalls frequently experience dropped connections.
- **Language barriers & digital literacy**: Complex accounting apps fail street vendors who need simple audio confirmation in their native language (English, Hindi, Kannada).

PaySure completely resolves these issues through **authoritative cryptographic settlement verification**, a **multilingual voice soundbox engine**, an **idempotent anti-replay shield**, and an **offline-aware ledger**.

---

## 🚀 Key Highlights & Architectural Features

1. **Deterministic Verification Engine**:
   - Strictly ignores customer phone screenshots.
   - Requires authoritative PSP / NPCI banking settlement events before marking any transaction as verified.
   - Enforces 12-digit UPI UTR idempotency to prevent screenshot replay attacks.

2. **Multilingual Soundbox Voice Engine**:
   - Dual-tone 880Hz fintech bell chime synthesized via **Web Audio API**.
   - Crystal-clear voice announcements in **English**, **Hindi (हिंदी)**, and **Kannada (ಕನ್ನಡ)** via the **Web Speech API**.
   - Sequential speech queue to handle rapid burst payments without overlapping audio.

3. **Dark Mode as Default & System Mode**:
   - Default deep obsidian fintech dark palette (`#070e1b`) tailored for outdoor street stalls and low glare.
   - 3-way toggle (Dark, Light, System Auto) adhering to OS preferences.

4. **Offline-Resilient Architecture**:
   - When network drops, PaySure transitions to Offline Mode.
   - Strictly observes the core safety rule: **Never mark an offline payment as authoritatively verified.**
   - Queues offline transactions locally as `OFFLINE_LOCAL_RECORD (Pending)` and automatically synchronizes and announces them upon reconnection.

5. **15 Fully Functional SaaS Pages**:
   - Landing Page, Vendor Dashboard, Live Soundbox Kiosk Monitor, Payment Verification Center, Transaction History, Simulation Lab, Fraud Detection Center, Order Management, Sales Analytics, Reports, Notifications Center, Vendor Profile, Settings, and Help & Support.

6. **Interactive College Demo Simulation Lab**:
   - 8 one-click presets simulating delayed payments, failed issuer responses, duplicate UTRs, fake screenshots, offline dropouts, network restoration, and rapid order bursts.
   - Live step-by-step pipeline execution console with millisecond timestamps.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Static Export to GitHub Pages)
- **Language**: TypeScript (Strict typing, Zod schema validation)
- **Styling**: Tailwind CSS (Fintech design inspired by Razorpay, Stripe, and Linear)
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Hourly sales, weekly trends, UPI app distribution, health ratios)
- **Audio & Voice**: Web Audio API (Synthesized chimes) & Web Speech API (Multilingual TTS)
- **Micro-Interactions**: Canvas-Confetti & Framer Motion transitions
- **Database Layer**: Supabase PostgreSQL schemas & RLS policies with automated fallback to persistent client-side local demo storage.

---

## 🏁 Quickstart & Setup Guide

### Prerequisites
- Node.js v18 or higher
- npm, yarn, or pnpm

### Installation
```bash
# Clone or navigate to the repository
git clone https://github.com/piyushx0416-dotcom/PaySure.git
cd PaySure

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/PaySure/](http://localhost:3000/PaySure/) in your browser.

### 1-Click Demo Evaluation Mode
- Click **"Vendor Login"** or **"Explore Live Demo"** on the landing page.
- Use the **"1-Click Demo Login as Ramesh Kumar"** button to enter the authenticated vendor environment instantly without typing credentials.
- Test the voice soundbox anytime using the **"Chime"** button in the top navigation or demo banner.

---

## 📂 Documentation Directory

Detailed specifications are maintained across dedicated documentation files:
- [PRD.md](PRD.md) — Product Requirements Document & Design Thinking User Journey
- [ARCHITECTURE.md](ARCHITECTURE.md) — System Architecture, Data Flow, and Idempotency Pipeline
- [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) — Supabase PostgreSQL Schema, RLS, and ER Diagrams
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) — Complete REST API & Webhook Specifications
- [SECURITY.md](SECURITY.md) — Fraud Prevention, Webhook Signatures, and Threat Models
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — UI/UX Typography, Palette, and Soundbox Ergonomics
- [TESTING.md](TESTING.md) — Test Suites, Edge Cases, and Offline Validation
- [DEPLOYMENT.md](DEPLOYMENT.md) — Production Deployment & PWA Configuration
- [DEMO_GUIDE.md](DEMO_GUIDE.md) — Step-by-Step Script for College Project Evaluation
