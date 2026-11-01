import { NextResponse } from "next/server";
import { initialTransactions } from "@/lib/mockData";

export async function GET() {
  const verified = initialTransactions.filter((t) => t.status === "SUCCESSFUL");
  const failed = initialTransactions.filter((t) => t.status === "FAILED");
  const pending = initialTransactions.filter((t) => t.status === "PENDING");

  const totalCollected = verified.reduce((sum, t) => sum + t.amount, 0);

  return NextResponse.json({
    success: true,
    reportDate: new Date().toISOString().split("T")[0],
    vendor: {
      name: "Ramesh Kumar",
      businessName: "Ramesh South Indian Tiffin & Snacks",
      upiVpa: "ramesh.tiffin@upi",
    },
    metrics: {
      totalCollected,
      verifiedCount: verified.length,
      failedCount: failed.length,
      pendingCount: pending.length,
      reconciliationStatus: "BALANCED",
      discrepancies: 0,
    },
    lineItems: initialTransactions,
  });
}
