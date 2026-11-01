# API Documentation — PaySure REST Endpoints & Webhooks

## 1. Overview
All PaySure API endpoints reside under `/api` and validate payloads using Zod schemas.

---

## 2. Authentication

### `POST /api/auth/register`
Registers a new street vendor account.
- **Request Body**:
```json
{
  "fullName": "Ramesh Kumar",
  "businessName": "Ramesh South Indian Tiffin & Snacks",
  "mobile": "9845012345",
  "email": "ramesh.tiffin@paysure.in",
  "password": "securePassword123",
  "businessCategory": "Street Food",
  "preferredLanguage": "en"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Vendor account registered successfully.",
  "vendor": {
    "id": "VEN-1730462981",
    "name": "Ramesh Kumar",
    "businessName": "Ramesh South Indian Tiffin & Snacks"
  }
}
```

---

## 3. Transactions & Verification

### `GET /api/transactions`
Retrieves vendor transactions with optional status or query filtering.
- **Query Params**: `status` (e.g. `SUCCESSFUL`), `q` (search string)
- **Response `200 OK`**:
```json
{
  "success": true,
  "count": 6,
  "transactions": [ ... ]
}
```

### `POST /api/transactions/verify`
Directly verifies a 12-digit UTR against the authoritative banking switch.
- **Request Body**:
```json
{
  "utr": "430198421092",
  "amount": 150
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "verified": true,
  "transaction": {
    "id": "TXN-1730462001-101",
    "status": "SUCCESSFUL",
    "utr": "430198421092",
    "amount": 150
  },
  "message": "Authoritative payment verification confirmed by NPCI."
}
```

---

## 4. Simulation Lab

### `POST /api/simulation/generate`
Generates a deterministic payment simulation for demonstrations.
- **Request Body**:
```json
{
  "amount": 150,
  "status": "SUCCESSFUL",
  "source": "PHONEPE",
  "networkCondition": "ONLINE",
  "isFakeScreenshotAttempt": false
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "transaction": { ... },
  "logs": [
    {
      "stage": "EVENT_RECEIVED",
      "status": "SUCCESS",
      "message": "Payment event packet received for ₹150 via PHONEPE."
    },
    {
      "stage": "IDEMPOTENCY_CHECK",
      "status": "SUCCESS",
      "message": "Idempotency verification confirmed."
    }
  ],
  "isDuplicate": false
}
```

---

## 5. Webhooks & Ingestion

### `POST /api/provider/webhook`
Receives asynchronous settlement callbacks from authorized payment service providers (PSP).
- **Request Body**:
```json
{
  "event": "payment.settled",
  "utr": "430198421092",
  "amount": 150,
  "currency": "INR",
  "sender_vpa": "customer@oksbi",
  "status": "SUCCESS",
  "signature": "hmac_sha256_hash_here"
}
```
- **Response `200 OK`**:
```json
{
  "received": true,
  "processed": true,
  "idempotencyCheck": "COMMITTED",
  "finalStatus": "SUCCESSFUL"
}
```
