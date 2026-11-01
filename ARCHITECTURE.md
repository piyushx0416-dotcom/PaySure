# System Architecture — PaySure

## 1. Architectural Overview

PaySure is designed around a decoupled, event-driven fintech architecture optimized for low latency, zero false-positives, and offline resilience.

```
                      +---------------------------------------+
                      |       Customer Scans Stall QR         |
                      |  (GPay, PhonePe, Paytm, BHIM, CRED)   |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |         NPCI / UPI Switch / PSP       |
                      |     (Authoritative Settlement Node)   |
                      +-------------------+-------------------+
                                          |
                                  Secure Webhook Tunnel
                                          |
                                          v
+------------------------------------------------------------------------------------+
|                                 PAYSURE BACKEND                                    |
|                                                                                    |
|  +------------------------+      +------------------------+                        |
|  |   Ingestion Webhook    | ---> |  Zod Schema Validator  |                        |
|  | (/api/provider/webhook)|      |   (Schema, Non-zero)   |                        |
|  +------------------------+      +-----------+------------+                        |
|                                              |                                     |
|                                              v                                     |
|                                  +------------------------+                        |
|                                  |   Idempotency Engine   |                        |
|                                  |  (Detect Duplicate UTR)|                        |
|                                  +-----------+------------+                        |
|                                              |                                     |
|                                              v                                     |
|                                  +------------------------+                        |
|                                  |  Fraud Heuristic Scan  |                        |
|                                  | (Amount & App Spoofing)|                        |
|                                  +-----------+------------+                        |
|                                              |                                     |
|                                              v                                     |
|                                  +------------------------+                        |
|                                  |  State & Ledger Commit |                        |
|                                  | (Supabase / In-Memory) |                        |
|                                  +-----------+------------+                        |
+----------------------------------------------|-------------------------------------+
                                               |
                               WebSocket / Reactive Broadcast
                                               |
                                               v
+------------------------------------------------------------------------------------+
|                                PAYSURE CLIENT (VENDOR)                             |
|                                                                                    |
|  +--------------------+   +----------------------+   +--------------------------+  |
|  | Soundbox Audio     |   | Live Kiosk Monitor   |   | Dashboard Ledger Updates |  |
|  | - Web Audio Chime  |   | - Emerald / Amber    |   | - Today's Verified Sum   |  |
|  | - Web Speech Queue |   | - Confetti Burst     |   | - Auto-Linked Orders     |  |
|  +--------------------+   +----------------------+   +--------------------------+  |
+------------------------------------------------------------------------------------+
```

---

## 2. Key Subsystems

### 2.1 Verification & Idempotency Pipeline
1. **Idempotency Keying**: Every incoming transaction is tagged with `IDEMP-<utr>`. If a customer attempts to present the same UTR reference twice within the transaction registry:
   - System flags a `HIGH RISK` alert.
   - Prevents double-crediting of daily sales totals.
   - Instructs vendor: *"Duplicate UTR reused. Request fresh payment."*
2. **Deterministic Settlement Contract**:
   - Only payments originating from an authoritative PSP / NPCI event are marked `SUCCESSFUL`.
   - Customer-submitted screenshots without banking webhooks are automatically quarantined with `riskScore = 90`.

### 2.2 Audio Notification Engine
- **Web Audio API Chime**: Bypasses network latency by synthesizing dual-tone 880Hz frequencies locally in browser memory.
- **Web Speech Synthesis Engine**: Operates a FIFO (First-In, First-Out) sequential queue with a 300ms inter-speech buffer to prevent audio clipping during peak hour rushes.

### 2.3 Offline Mode & Resilient Caching
- Service Worker (`public/sw.js`) caches the application shell and UI assets.
- If `navigator.onLine === false` or `networkCondition === 'OFFLINE'`:
  - New orders and local payments are directed to `offlineQueue`.
  - The status is locked to `PENDING` with the tag `OFFLINE_LOCAL_RECORD`.
  - Upon network restoration, `syncOfflineQueue()` transmits pending items to the verification pipeline and triggers audible voice confirmations.
