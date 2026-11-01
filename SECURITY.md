# Security, Fraud Prevention & Compliance — PaySure

## 1. Threat Model & Mitigation Matrix

| Threat / Attack Vector | Real-World Scenario | PaySure Mitigation |
|---|---|---|
| **Synthetic Screenshot Fraud** | Customer shows green tick screen from spoofing apps (SpoofPay, FakePay). | **Zero-Trust Client Policy**: PaySure never verifies payments via customer screenshots. Settlements require authoritative PSP gateway webhooks. |
| **Replay & UTR Recycling** | Customer shows yesterday's genuine ₹150 screenshot or friend's receipt. | **Idempotency Engine**: Every 12-digit UPI UTR is uniquely registered. Replay attempts trigger immediate `HIGH RISK` fraud alerts. |
| **Amount Tampering** | Customer owes ₹150 for family meal, sends ₹1, and claims order is paid. | **Heuristic Amount Matching**: The engine checks the credited bank value against the required order total. Discrepancies prompt: *"Demanding remaining balance before serving."* |
| **Man-in-the-Middle (MITM)** | Intercepted webhook payloads during merchant cellular transmission. | **Cryptographic Webhook Validation**: HMAC SHA-256 signatures validated against secret vendor signing keys. |
| **Credential Harvesting** | Rogue software demanding vendor UPI PINs or OTPs. | **Strict Zero-PIN Policy**: PaySure NEVER requests, stores, or transmits UPI PINs, ATM PINs, net banking passwords, or OTPs. |

---

## 2. Sensitive Financial Data Handling

PaySure strictly adheres to RBI and NPCI micro-merchant guidelines:
- **No Banking Passwords**: Authentication uses standard bcrypt-hashed passwords or magic tokens.
- **Masked Bank Account Numbers**: Only the last 4 digits (e.g. `••••••••4829`) are rendered in UI views.
- **No Card / CVV Storage**: No cardholder data is collected or persisted.

---

## 3. Row Level Security & Multi-Tenancy

In production environments with Supabase PostgreSQL:
- All tables enforce Row Level Security (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
- Vendors can only read, update, and query their own stall transactions and order records.
- API routes sanitize all input parameters through strict Zod schemas before running business logic.
