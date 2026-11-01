import {
  Transaction,
  TransactionStatus,
  PaymentSource,
  VerificationSource,
  FraudAlert,
  TransactionStepLog,
  NetworkCondition,
} from "./types";

export interface VerificationResult {
  transaction: Transaction;
  logs: TransactionStepLog[];
  fraudAlert?: FraudAlert;
  isDuplicate: boolean;
}

export function generateUtr(): string {
  // 12 digit realistic Indian UPI UTR (e.g., 430129847192)
  const prefix = "4" + Math.floor(100 + Math.random() * 900);
  const suffix = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${suffix}`;
}

export function runVerificationPipeline(
  params: {
    amount: number;
    status: TransactionStatus;
    source?: PaymentSource;
    utr?: string;
    payerName?: string;
    payerVpa?: string;
    orderId?: string;
    networkCondition?: NetworkCondition;
    existingTransactions: Transaction[];
    isFakeScreenshotAttempt?: boolean;
    reportedAmountMismatch?: boolean;
    latencyMs?: number;
  }
): VerificationResult {
  const logs: TransactionStepLog[] = [];
  const now = new Date().toISOString();
  const network = params.networkCondition || "ONLINE";
  const utr = params.utr || generateUtr();
  const source = params.source || "PHONEPE";
  const payerName = params.payerName || "Suresh Patel";
  const payerVpa = params.payerVpa || `${payerName.toLowerCase().replace(/\s+/g, "")}@oksbi`;

  // Step 1: Event Received
  logs.push({
    stage: "EVENT_RECEIVED",
    status: "SUCCESS",
    message: `Payment event packet received for ₹${params.amount} via ${source}. Source UTR: ${utr}`,
    timestamp: new Date().toISOString(),
  });

  // Step 2: Input Validation
  if (params.amount <= 0) {
    logs.push({
      stage: "INPUT_VALIDATION",
      status: "FAILED",
      message: `Invalid amount ₹${params.amount}. Must be strictly positive.`,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Invalid transaction amount");
  }

  logs.push({
    stage: "INPUT_VALIDATION",
    status: "SUCCESS",
    message: `Format validation passed. Amount: ₹${params.amount}, UPI Reference UTR length: ${utr.length} digits.`,
    timestamp: new Date().toISOString(),
  });

  // Step 3: Idempotency & Replay Check
  const duplicateMatch = params.existingTransactions.find(
    (t) => t.utr === utr || (t.amount === params.amount && t.payerVpa === payerVpa && Math.abs(new Date(t.timestamp).getTime() - Date.now()) < 5000)
  );

  let isDuplicate = false;
  let fraudAlert: FraudAlert | undefined;

  if (duplicateMatch) {
    isDuplicate = true;
    logs.push({
      stage: "IDEMPOTENCY_CHECK",
      status: "WARNING",
      message: `REPLAY DETECTED: UTR ${utr} was already processed previously (ID: ${duplicateMatch.id}).`,
      timestamp: new Date().toISOString(),
    });

    fraudAlert = {
      id: `FA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      transactionId: duplicateMatch.id,
      utr,
      riskLevel: "HIGH",
      reason: `Duplicate transaction reference reused. Customer presented a previously redeemed payment.`,
      timestamp: new Date().toISOString(),
      recommendedAction: "Reject order. Request customer to initiate a fresh live payment or show active bank SMS.",
      actualAmount: duplicateMatch.amount,
      customerReportedAmount: params.amount,
      status: "ACTIVE",
    };
  } else {
    logs.push({
      stage: "IDEMPOTENCY_CHECK",
      status: "SUCCESS",
      message: `Idempotency verification confirmed. UTR ${utr} is unique in current registry.`,
      timestamp: new Date().toISOString(),
    });
  }

  // Step 4: Fraud & Tampering Heuristics
  if (params.isFakeScreenshotAttempt) {
    logs.push({
      stage: "FRAUD_SCAN",
      status: "FAILED",
      message: `ALERT: Customer photo/screenshot presented without corresponding banking switch webhook!`,
      timestamp: new Date().toISOString(),
    });

    fraudAlert = {
      id: `FA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      utr,
      riskLevel: "HIGH",
      reason: "Synthetic/Edited Screenshot Detected: No authoritative PSP settlement event matched this reference.",
      timestamp: new Date().toISOString(),
      recommendedAction: "DO NOT HAND OVER FOOD. Instruct customer to wait until PaySure Voice Soundbox confirms.",
      actualAmount: 0,
      customerReportedAmount: params.amount,
      status: "ACTIVE",
    };
  } else if (params.reportedAmountMismatch) {
    logs.push({
      stage: "FRAUD_SCAN",
      status: "FAILED",
      message: `AMOUNT MISMATCH: Customer claimed ₹${params.amount}, but banking gateway received only ₹1.`,
      timestamp: new Date().toISOString(),
    });

    fraudAlert = {
      id: `FA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      utr,
      riskLevel: "HIGH",
      reason: `Amount Tampering: Order total was ₹${params.amount}, but settled credit is ₹1.00.`,
      timestamp: new Date().toISOString(),
      recommendedAction: "Demand remaining balance before serving order.",
      actualAmount: 1,
      customerReportedAmount: params.amount,
      status: "ACTIVE",
    };
  } else {
    logs.push({
      stage: "FRAUD_SCAN",
      status: "SUCCESS",
      message: `Heuristic security scan passed. No APK spoofing or tampering signatures detected.`,
      timestamp: new Date().toISOString(),
    });
  }

  // Step 5: Provider Resolution & Network Check
  let resolvedStatus: TransactionStatus = params.status;
  let verificationSource: VerificationSource = "SIMULATED_DEMO_PROVIDER";

  if (network === "OFFLINE") {
    // CRITICAL REQUIREMENT: Never mark offline transaction as verified!
    resolvedStatus = "PENDING";
    verificationSource = "OFFLINE_LOCAL_RECORD";

    logs.push({
      stage: "PROVIDER_RESOLUTION",
      status: "WARNING",
      message: `DEVICE OFFLINE: Cannot contact NPCI switch. Recorded locally as unverified PENDING queue item.`,
      timestamp: new Date().toISOString(),
    });
  } else if (isDuplicate || params.isFakeScreenshotAttempt) {
    resolvedStatus = "FAILED";
    logs.push({
      stage: "PROVIDER_RESOLUTION",
      status: "FAILED",
      message: `PSP Gateway rejected transaction due to security validation failure.`,
      timestamp: new Date().toISOString(),
    });
  } else {
    logs.push({
      stage: "PROVIDER_RESOLUTION",
      status: resolvedStatus === "SUCCESSFUL" ? "SUCCESS" : resolvedStatus === "PENDING" ? "WARNING" : "FAILED",
      message: `Authoritative NPCI UPI switch responded with code: ${resolvedStatus}. Verified via secure API tunnel.`,
      timestamp: new Date().toISOString(),
    });
  }

  // Step 6: Commit state
  logs.push({
    stage: "STATE_COMMITTED",
    status: "SUCCESS",
    message: `Transaction committed to ledger. Final Status: ${resolvedStatus}.`,
    timestamp: new Date().toISOString(),
  });

  const transaction: Transaction = {
    id: `TXN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    utr,
    amount: params.amount,
    timestamp: now,
    source,
    status: resolvedStatus,
    verificationStatus: resolvedStatus,
    verificationTimestamp: new Date().toISOString(),
    vendorId: "VEN-RAMESH-01",
    payerName,
    payerVpa,
    orderId: params.orderId,
    verificationSource,
    isSimulated: true,
    idempotencyKey: `IDEMP-${utr}`,
    riskScore: fraudAlert ? (fraudAlert.riskLevel === "HIGH" ? 90 : 50) : 5,
    failureReason: resolvedStatus === "FAILED" ? (fraudAlert ? fraudAlert.reason : "Bank server timeout / Insufficient funds") : undefined,
    notes: network === "OFFLINE" ? "Offline record - pending sync" : undefined,
    isOfflineSynced: network !== "OFFLINE",
  };

  // Step 7: Voice announcement readiness
  logs.push({
    stage: "VOICE_ANNOUNCED",
    status: "SUCCESS",
    message: `Voice Soundbox trigger generated for ${resolvedStatus} state.`,
    timestamp: new Date().toISOString(),
  });

  return {
    transaction,
    logs,
    fraudAlert,
    isDuplicate,
  };
}
