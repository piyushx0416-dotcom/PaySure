# Live Demonstration Guide & Evaluator Walkthrough — PaySure

## Executive Demo Script for College Project Showcase

This guide provides the exact step-by-step walkthrough for demonstrating PaySure to college professors, evaluators, and fintech judges.

---

### Phase 1: Context & The Street Vendor Problem (1 Minute)
1. **Open Landing Page** (`http://localhost:3000`):
   - Highlight the hero heading: *"Never Miss a Payment. Never Trust a Screenshot."*
   - Point to the **4-step verification workflow**: Customer Pays → Authorized Provider Confirms → PaySure Verifies → Vendor Hears Confirmation.
   - Explain Ramesh's dilemma: 42-year-old Bangalore street food vendor who loses ₹1,500+ weekly from fake payment screenshots shown during peak dinner rush.

2. **Login with 1-Click Demo Access**:
   - Click **"Vendor Login"** in the top navigation.
   - Click the green button: **"1-Click Demo Login as Ramesh Kumar"**.
   - Show how Ramesh's profile, stall details (Stall #14), and SBI settlement account immediately load.

---

### Phase 2: The Core Scenario — ₹150 Verified Payment (2 Minutes)
1. **Navigate to "Order Management"** (`/orders`):
   - Note Order #1024 or create a new order by tapping **"Special Masala Dosa"** (₹60) and **"Filter Coffee"** (₹30) or custom items totaling ₹150.
   - Click **"Simulate Customer Pay"** (or use the quick "+ Generate Payment" button in the top header).

2. **Observe the Live Verification Pipeline**:
   - The Soundbox emits a dual-tone bell chime.
   - The browser speaks aloud in crisp audio:
     > *"Payment received. Rupees 150."*
   - A prominent emerald green modal flashes: **PAYMENT RECEIVED — ₹150** with celebration confetti.
   - The order status automatically switches to **SERVED & COMPLETED**.

3. **Verify Dashboard Revenue Counter** (`/dashboard`):
   - Show that **"Today's Verified Revenue"** has dynamically increased by ₹150.
   - Point out that average ticket size and success rates update in real time.

---

### Phase 3: The Edge Cases & Fraud Defenses (3 Minutes)
Navigate to the **"Simulation Lab"** (`/simulation`):

1. **Demonstrate Fake Screenshot Attempt (Preset 5)**:
   - Click **"5. Fake Screenshot"** (₹350 Spoof APK).
   - Show the live console: The customer presented a phone screenshot, but no banking settlement event arrived at the switch!
   - System refuses to credit revenue, issues an alert buzzer, and creates a **HIGH RISK** fraud record warning: *"Do not release food."*

2. **Demonstrate Duplicate UTR Replay Attack (Preset 4)**:
   - Click **"4. Duplicate UTR Replay"**.
   - The idempotency engine flags that UTR `430198421092` was already redeemed earlier.
   - High-risk alert is triggered, preventing double crediting.

3. **Demonstrate Delayed / Pending Payment (Preset 2)**:
   - Click **"2. Delayed Payment"**.
   - The status changes to amber **PENDING**.
   - Voice announces: *"Payment is still pending. Please wait for confirmation."*
   - Note that pending money is **NEVER** included in verified revenue.

4. **Demonstrate Network Outage & Auto-Sync (Presets 6 & 7)**:
   - Click **"6. Network Drop"**: The stall disconnects from the internet. The prominent yellow warning banner appears.
   - Generate a payment while offline: It is safely marked as an **unverified local record**.
   - Click **"7. Network Restored"**: The system syncs the offline queue, contacts the banking node, verifies the payment, and announces it aloud.

---

### Phase 4: Multilingual Accessibility (1 Minute)
1. Switch the language selector in the top bar to **हिंदी (Hindi)** or **ಕನ್ನಡ (Kannada)**.
2. Click the **"Chime"** test button or generate a payment:
   - Hindi speech: *"पे-श्योर पर 150 रुपये का भुगतान प्राप्त हुआ।"*
   - Kannada speech: *"ಪೇಶ್ಯೂರ್‌ನಲ್ಲಿ 150 ರೂಪಾಯಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ."*
3. Show the **"Live Soundbox Kiosk Monitor"** (`/monitor`) in fullscreen mode, demonstrating how Ramesh places an old smartphone on his cart counter for hands-free operation.

---

### Phase 5: Audit & Accounting Reports (1 Minute)
1. Open **"Reports & Exports"** (`/reports`).
2. Demonstrate **"Print Audit Sheet"** and **"Export CSV"**.
3. Highlight that all collections reconcile with Ramesh's bank account with zero discrepancies.
