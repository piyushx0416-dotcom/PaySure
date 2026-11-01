import { NextResponse } from "next/server";
import { initialNotifications } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    notifications: initialNotifications,
    unreadCount: initialNotifications.filter((n) => !n.read).length,
  });
}
