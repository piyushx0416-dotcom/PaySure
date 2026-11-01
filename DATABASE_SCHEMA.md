# Database Schema & Entity Relationships — PaySure

## 1. Overview
PaySure uses Supabase PostgreSQL with Row Level Security (RLS) to enforce strict multi-tenant vendor isolation. In demo mode without external cloud credentials, an in-memory & LocalStorage adapter satisfies all contracts.

---

## 2. Table Definitions & SQL DDL

### 2.1 `users`
Represents authenticated application users and stall operators.
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 `vendor_profiles`
Stores stall-specific business details, settlement accounts, and soundbox preferences.
```sql
CREATE TABLE vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(150) NOT NULL,
  category VARCHAR(100) DEFAULT 'Street Food',
  upi_vpa VARCHAR(100) NOT NULL,
  bank_account VARCHAR(50) NOT NULL,
  bank_ifsc VARCHAR(20) NOT NULL,
  preferred_language VARCHAR(5) DEFAULT 'en', -- 'en', 'hi', 'kn'
  voice_enabled BOOLEAN DEFAULT TRUE,
  soundbox_volume INTEGER DEFAULT 90,
  auto_announce BOOLEAN DEFAULT TRUE,
  chime_sound BOOLEAN DEFAULT TRUE,
  daily_revenue_goal NUMERIC(10, 2) DEFAULT 4500.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 `transactions`
Immutable ledger of all incoming payment events.
```sql
CREATE TABLE transactions (
  id VARCHAR(64) PRIMARY KEY,
  vendor_id UUID REFERENCES vendor_profiles(id),
  utr VARCHAR(12) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  source VARCHAR(30) NOT NULL, -- 'PHONEPE', 'GOOGLE_PAY', 'PAYTM', etc.
  status VARCHAR(20) NOT NULL, -- 'SUCCESSFUL', 'PENDING', 'FAILED'
  verification_status VARCHAR(20) NOT NULL,
  verification_source VARCHAR(40) NOT NULL, -- 'AUTHORITATIVE_PROVIDER_API', 'OFFLINE_LOCAL_RECORD'
  payer_name VARCHAR(100),
  payer_vpa VARCHAR(100),
  order_id VARCHAR(64),
  idempotency_key VARCHAR(128) UNIQUE NOT NULL,
  risk_score INTEGER DEFAULT 0, -- 0 to 100
  failure_reason TEXT,
  is_simulated BOOLEAN DEFAULT FALSE,
  is_offline_synced BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_vendor_created ON transactions(vendor_id, created_at DESC);
CREATE INDEX idx_transactions_utr ON transactions(utr);
```

### 2.4 `orders`
Stall POS food orders linked to verified settlements.
```sql
CREATE TABLE orders (
  id VARCHAR(64) PRIMARY KEY,
  vendor_id UUID REFERENCES vendor_profiles(id),
  order_number INTEGER NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'PENDING',
  order_status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'PREPARING', 'SERVED', 'CANCELLED'
  transaction_id VARCHAR(64) REFERENCES transactions(id),
  customer_name VARCHAR(100),
  table_or_token VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.5 `fraud_alerts`
Heuristic security warnings triggered by tampered screenshots or reused references.
```sql
CREATE TABLE fraud_alerts (
  id VARCHAR(64) PRIMARY KEY,
  vendor_id UUID REFERENCES vendor_profiles(id),
  transaction_id VARCHAR(64),
  utr VARCHAR(12) NOT NULL,
  risk_level VARCHAR(10) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH'
  reason TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  customer_reported_amount NUMERIC(10, 2),
  actual_amount NUMERIC(10, 2),
  status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'RESOLVED', 'DISMISSED'
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS across tables
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE fraud_alerts ENABLE ROW LEVEL SECURITY;

-- Restrict access so vendors can only view and update their own stall data
CREATE POLICY "Vendor isolation policy for transactions"
  ON transactions FOR ALL
  USING (vendor_id = auth.uid());

CREATE POLICY "Vendor isolation policy for orders"
  ON orders FOR ALL
  USING (vendor_id = auth.uid());
```
