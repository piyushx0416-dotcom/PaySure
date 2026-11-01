# Testing & Quality Assurance — PaySure

## 1. Automated Verification & Build Verification
The PaySure application undergoes comprehensive compilation and lint checks:
- **TypeScript Static Analysis**: All routes, models, and context providers enforce strict type safety.
- **Next.js Production Build**: All 31 app pages and API endpoints build statically or dynamically with 0 errors.

---

## 2. Test Scenarios & Edge Cases

### Test Case 1: Standard Successful Payment
- **Action**: User clicks Preset 1 or generates ₹150 test payment.
- **Expected Result**:
  - Web Audio dual chime rings.
  - Spoken audio: *"Payment received. Rupees 150."*
  - Today's verified revenue counter increments by ₹150.
  - Green confirmation banner flashes with confetti.

### Test Case 2: Replay UTR Detection (Duplicate Screenshot Prevention)
- **Action**: User inputs an existing UTR reference (e.g. `430198421092`) into verification.
- **Expected Result**:
  - Verification engine flags `isDuplicate = true`.
  - Generates `HIGH RISK` Fraud Alert: *"Duplicate transaction reference reused."*
  - Refuses to credit verified revenue twice.

### Test Case 3: Offline Disconnection & Reconnection Sync
- **Action**: User sets network condition to `OFFLINE` and generates payment.
- **Expected Result**:
  - Warning banner displays: *"STALL NETWORK OFFLINE — BANK VERIFICATION PAUSED"*.
  - Transaction is stored locally as `PENDING` (never falsely marked as verified).
  - User switches to `ONLINE`; `syncOfflineQueue()` flushes items, verifies them, and speaks confirmation.

### Test Case 4: Multilingual Voice Switching
- **Action**: User selects `हिंदी` or `ಕನ್ನಡ`.
- **Expected Result**:
  - Soundbox immediately speaks in selected language (*"पे-श्योर पर 150 रुपये का भुगतान प्राप्त हुआ।""* or *"ಪೇಶ್ಯೂರ್‌ನಲ್ಲಿ 150 ರೂಪಾಯಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ."*).
