import { NextResponse } from "next/server";

export async function GET() {
  const currentMonth = new Date().toLocaleString("en-IN", { month: "long", year: "numeric" });

  return NextResponse.json({
    success: true,
    month: currentMonth,
    vendorId: "VEN-RAMESH-01",
    grossRevenue: 142850,
    totalTransactions: 1140,
    successfulVolume: 1115,
    failedVolume: 25,
    successRate: "97.8%",
    averageDailyRevenue: 4761,
    topPaymentMethod: "PhonePe (44%)",
    preventedFraudLoss: 3850, // amount prevented through fake screenshot detection
  });
}
