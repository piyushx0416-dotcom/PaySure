"use client";

import React from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function SalesAnalyticsPage() {
  const { summary, language } = usePaySure();
  const t = translations[language];

  const hourlyData = [
    { hour: "08 AM", sales: 480, orders: 6 },
    { hour: "09 AM", sales: 1250, orders: 14 },
    { hour: "10 AM", sales: 940, orders: 11 },
    { hour: "11 AM", sales: 350, orders: 4 },
    { hour: "12 PM", sales: 820, orders: 9 },
    { hour: "01 PM", sales: 1680, orders: 18 },
    { hour: "02 PM", sales: 1100, orders: 12 },
    { hour: "03 PM", sales: 420, orders: 5 },
    { hour: "04 PM", sales: 980, orders: 10 },
    { hour: "05 PM", sales: 2150, orders: 24 }, // Peak Tea/Snacks Hour
    { hour: "06 PM", sales: 1950, orders: 21 },
    { hour: "07 PM", sales: 1400, orders: 15 },
  ];

  const weeklyTrend = [
    { day: "Mon", revenue: 5400, orders: 68 },
    { day: "Tue", revenue: 4950, orders: 62 },
    { day: "Wed", revenue: 6200, orders: 74 },
    { day: "Thu", revenue: 5800, orders: 70 },
    { day: "Fri", revenue: 7100, orders: 86 },
    { day: "Sat", revenue: 8900, orders: 104 },
    { day: "Sun", revenue: 9450, orders: 112 },
  ];

  const appsBreakdown = [
    { name: "PhonePe", value: 44, color: "#5f259f" },
    { name: "Google Pay", value: 32, color: "#1a73e8" },
    { name: "Paytm", value: 16, color: "#00b9f5" },
    { name: "BHIM / Others", value: 8, color: "#00833d" },
  ];

  return (
    <DashboardLayoutWrapper title={t.nav.analytics}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                Vendor Sales Intelligence
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hourly rush insights, settlement success rates, and customer payment app distribution.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Cycle: Current Week</span>
          </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Verified Success Rate</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">97.8%</div>
            <p className="text-[11px] text-slate-500 mt-1">Industry avg: 92.4%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Peak Rush Window</span>
            <div className="text-2xl font-black text-navy-950 mt-1">05 PM – 06 PM</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Evening Snacks & Tea Rush</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Average Ticket Size</span>
            <div className="text-3xl font-black text-navy-950 mt-1">
              {formatINR(summary.averageTransactionValue || 112)}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Dosa combos & coffee top sellers</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Fraud Prevention Saved</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">₹3,850</div>
            <p className="text-[11px] text-slate-500 mt-1">11 fake screenshot attempts stopped</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Business Rush */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-navy-950 text-sm">Hourly Sales Volume</h3>
                <p className="text-xs text-slate-500">Identify exact rush times to prepare chutney and batter</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Peak: 05:00 PM
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    formatter={(val: number) => [`₹${val}`, "Hourly Sales"]}
                    contentStyle={{ backgroundColor: "#0b1c3d", color: "#fff", borderRadius: "8px" }}
                  />
                  <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Revenue Trend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-navy-950 text-sm">7-Day Revenue Progression</h3>
                <p className="text-xs text-slate-500">Consistent weekend uplift during Saturday and Sunday</p>
              </div>
              <span className="text-[10px] font-bold text-navy-900 bg-navy-100 px-2.5 py-1 rounded-md">
                Weekly Total: ₹47,800
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    formatter={(val: number) => [`₹${val}`, "Day Revenue"]}
                    contentStyle={{ backgroundColor: "#0b1c3d", color: "#fff", borderRadius: "8px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0b1c3d"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* UPI Apps Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-navy-950 text-sm mb-1">
            Customer UPI Applications Share
          </h3>
          <p className="text-xs text-slate-500 mb-4">Which payment applications are used most at Ramesh&apos;s stall</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {appsBreakdown.map((app) => (
              <div key={app.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{app.name}</span>
                  <span className="text-base font-black text-navy-950">{app.value}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${app.value}%`, backgroundColor: app.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
