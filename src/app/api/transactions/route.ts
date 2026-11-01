import { NextResponse } from "next/server";
import { initialTransactions } from "@/lib/mockData";
import { generateUtr } from "@/lib/verificationEngine";

// Global in-memory list for server side requests
const transactionsStore = [...initialTransactions];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const query = searchParams.get("q")?.toLowerCase();

  let filtered = transactionsStore;

  if (status && status !== "ALL") {
    filtered = filtered.filter((t) => t.status === status);
  }

  if (query) {
    filtered = filtered.filter(
      (t) =>
        t.utr.includes(query) ||
        t.payerName.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    transactions: filtered,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid amount required" },
        { status: 400 }
      );
    }

    const newTxn = {
      id: `TXN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      utr: body.utr || generateUtr(),
      amount,
      timestamp: new Date().toISOString(),
      source: body.source || "PHONEPE",
      status: body.status || "SUCCESSFUL",
      verificationStatus: body.status || "SUCCESSFUL",
      verificationTimestamp: new Date().toISOString(),
      vendorId: "VEN-RAMESH-01",
      payerName: body.payerName || "Demo Payer",
      payerVpa: body.payerVpa || "payer@upi",
      orderId: body.orderId,
      verificationSource: "SIMULATED_DEMO_PROVIDER" as const,
      isSimulated: true,
      idempotencyKey: `IDEMP-${Date.now()}`,
      riskScore: 5,
    };

    transactionsStore.unshift(newTxn);

    return NextResponse.json({
      success: true,
      transaction: newTxn,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
