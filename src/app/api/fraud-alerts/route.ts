import { NextResponse } from "next/server";
import { initialFraudAlerts } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    alerts: initialFraudAlerts,
    activeCount: initialFraudAlerts.filter((a) => a.status === "ACTIVE").length,
  });
}
