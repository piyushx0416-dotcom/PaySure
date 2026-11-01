export type TransactionStatus = "SUCCESSFUL" | "PENDING" | "FAILED";

export type PaymentSource = "GOOGLE_PAY" | "PHONEPE" | "PAYTM" | "BHIM" | "CRED" | "OTHER_UPI";

export type VerificationSource =
  | "AUTHORITATIVE_PROVIDER_API"
  | "BANK_WEBHOOK"
  | "SIMULATED_DEMO_PROVIDER"
  | "OFFLINE_LOCAL_RECORD";

export interface Transaction {
  id: string;
  utr: string; // 12-digit UPI reference number
  amount: number;
  timestamp: string;
  source: PaymentSource;
  status: TransactionStatus;
  verificationStatus: TransactionStatus;
  verificationTimestamp: string;
  vendorId: string;
  payerName: string;
  payerVpa: string;
  orderId?: string;
  verificationSource: VerificationSource;
  isSimulated: boolean;
  notes?: string;
  failureReason?: string;
  idempotencyKey: string;
  riskScore: number; // 0 to 100
  isOfflineSynced?: boolean;
}

export interface TransactionStepLog {
  stage: "EVENT_RECEIVED" | "INPUT_VALIDATION" | "IDEMPOTENCY_CHECK" | "FRAUD_SCAN" | "PROVIDER_RESOLUTION" | "STATE_COMMITTED" | "VOICE_ANNOUNCED";
  status: "SUCCESS" | "WARNING" | "FAILED" | "IN_PROGRESS";
  message: string;
  timestamp: string;
}

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface FraudAlert {
  id: string;
  transactionId?: string;
  utr: string;
  riskLevel: RiskLevel;
  reason: string;
  timestamp: string;
  recommendedAction: string;
  customerReportedAmount?: number;
  actualAmount?: number;
  status: "ACTIVE" | "RESOLVED" | "DISMISSED";
  details?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "PENDING" | "PREPARING" | "SERVED" | "CANCELLED";

export interface Order {
  id: string;
  orderNumber: number;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: TransactionStatus;
  orderStatus: OrderStatus;
  transactionId?: string;
  timestamp: string;
  customerName?: string;
  tableOrToken?: string;
}

export type NotificationType = "SUCCESS" | "PENDING" | "FAILED" | "FRAUD" | "SYSTEM" | "NETWORK";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  amount?: number;
  transactionId?: string;
}

export type Language = "en" | "hi" | "kn";

export type ThemeMode = "dark" | "light" | "system";

export type NetworkCondition = "ONLINE" | "SLOW" | "HIGH_LATENCY" | "OFFLINE";

export interface VendorProfile {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  upiVpa: string;
  bankAccount: string;
  bankIfsc: string;
  preferredLanguage: Language;
  themeMode: ThemeMode;
  voiceEnabled: boolean;
  soundboxVolume: number; // 0 - 100
  autoAnnounce: boolean;
  chimeSound: boolean;
  dailyRevenueGoal: number;
}

export interface DashboardSummary {
  todayVerifiedRevenue: number;
  successfulTransactionsCount: number;
  pendingTransactionsCount: number;
  failedTransactionsCount: number;
  totalOrdersCount: number;
  averageTransactionValue: number;
  unresolvedFraudAlertsCount: number;
}
