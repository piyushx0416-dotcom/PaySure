import { NextResponse } from "next/server";

export async function GET() {
  const hourlyData = [
    { hour: "08:00 AM", amount: 480, count: 6 },
    { hour: "09:00 AM", amount: 1250, count: 14 },
    { hour: "10:00 AM", amount: 940, count: 11 },
    { hour: "11:00 AM", amount: 350, count: 4 },
    { hour: "12:00 PM", amount: 820, count: 9 },
    { hour: "01:00 PM", amount: 1680, count: 18 },
    { hour: "02:00 PM", amount: 1100, count: 12 },
    { hour: "03:00 PM", amount: 420, count: 5 },
    { hour: "04:00 PM", amount: 980, count: 10 },
    { hour: "05:00 PM", amount: 2150, count: 24 }, // Peak tea/snack time!
    { hour: "06:00 PM", amount: 1950, count: 21 },
    { hour: "07:00 PM", amount: 1400, count: 15 },
  ];

  const weeklyTrend = [
    { day: "Mon", revenue: 5400, successRate: 98 },
    { day: "Tue", revenue: 4950, successRate: 96 },
    { day: "Wed", revenue: 6200, successRate: 99 },
    { day: "Thu", revenue: 5800, successRate: 97 },
    { day: "Fri", revenue: 7100, successRate: 98 },
    { day: "Sat", revenue: 8900, successRate: 99 },
    { day: "Sun", revenue: 9450, successRate: 99 },
  ];

  const providerBreakdown = [
    { name: "PhonePe", value: 42, color: "#5f259f" },
    { name: "Google Pay", value: 34, color: "#1a73e8" },
    { name: "Paytm", value: 16, color: "#00b9f5" },
    { name: "BHIM / Others", value: 8, color: "#00833d" },
  ];

  return NextResponse.json({
    success: true,
    hourlyData,
    weeklyTrend,
    providerBreakdown,
    metrics: {
      successRate: 97.8,
      peakHour: "05:00 PM - 06:00 PM (Snacks Rush)",
      avgWaitVerificationSec: 1.4,
    },
  });
}
