import { NextResponse } from "next/server";
import { initialTransactions, initialOrders, initialFraudAlerts } from "@/lib/mockData";

export async function GET() {
  const successful = initialTransactions.filter((t) => t.status === "SUCCESSFUL");
  const pending = initialTransactions.filter((t) => t.status === "PENDING");
  const failed = initialTransactions.filter((t) => t.status === "FAILED");

  const todayVerifiedRevenue = successful.reduce((sum, t) => sum + t.amount, 0);
  const averageTransactionValue =
    successful.length > 0 ? Math.round(todayVerifiedRevenue / successful.length) : 0;

  return NextResponse.json({
    success: true,
    summary: {
      todayVerifiedRevenue,
      successfulTransactionsCount: successful.length,
      pendingTransactionsCount: pending.length,
      failedTransactionsCount: failed.length,
      totalOrdersCount: initialOrders.length,
      averageTransactionValue,
      unresolvedFraudAlertsCount: initialFraudAlerts.filter((a) => a.status === "ACTIVE").length,
    },
  });
}
