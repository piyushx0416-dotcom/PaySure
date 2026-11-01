"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatTime } from "@/lib/utils";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag,
  ArrowUpRight,
  ShieldAlert,
  PlusCircle,
  Search,
  FileText,
  FlaskConical,
  Radio,
  History,
  Volume2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const {
    vendor,
    summary,
    transactions,
    orders,
    notifications,
    fraudAlerts,
    language,
    triggerSimulation,
  } = usePaySure();

  const t = translations[language];

  // Dynamic hourly revenue based on today's transactions
  const chartData = [
    { time: "08 AM", revenue: 450 },
    { time: "10 AM", revenue: 980 },
    { time: "12 PM", revenue: 840 },
    { time: "02 PM", revenue: 1250 },
    { time: "04 PM", revenue: 1680 },
    { time: "06 PM", revenue: summary.todayVerifiedRevenue > 0 ? summary.todayVerifiedRevenue : 2150 },
  ];

  // Status breakdown data
  const statusPieData = [
    { name: "Successful", value: summary.successfulTransactionsCount || 1, color: "#10b981" },
    { name: "Pending", value: summary.pendingTransactionsCount, color: "#f59e0b" },
    { name: "Failed", value: summary.failedTransactionsCount, color: "#f43f5e" },
  ].filter((d) => d.value > 0);

  const activeFraudCount = fraudAlerts.filter((a) => a.status === "ACTIVE").length;

  return (
    <DashboardLayoutWrapper title={t.nav.dashboard}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-navy-950">
                {t.greeting}
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.greetingSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/simulation"
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition"
            >
              <FlaskConical className="w-4 h-4 text-amber-600" />
              <span>Simulation Lab</span>
            </Link>
            <Link
              href="/monitor"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
            >
              <Radio className="w-4 h-4 text-emerald-100 animate-pulse" />
              <span>Soundbox Kiosk Monitor</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Today's Verified Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">{t.stats.verifiedRevenue}</span>
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-navy-950">
                {formatINR(summary.todayVerifiedRevenue)}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Bank Node Cleared</span>
              </div>
            </div>
          </div>

          {/* Successful Transactions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">{t.stats.successCount}</span>
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                {summary.successfulTransactionsCount}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Avg. Ticket: <strong>{formatINR(summary.averageTransactionValue)}</strong>
              </div>
            </div>
          </div>

          {/* Pending Transactions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">{t.stats.pendingCount}</span>
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600">
                {summary.pendingTransactionsCount}
              </div>
              <div className="mt-1 text-[11px] text-amber-700 font-medium">
                {summary.pendingTransactionsCount > 0 ? "Awaiting bank clearance" : "All cleared"}
              </div>
            </div>
          </div>

          {/* Failed / At-Risk */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Failed / Fraud Blocks</span>
              <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600">
                {summary.failedTransactionsCount}
              </div>
              <div className="mt-1 text-[11px] text-rose-700 font-medium">
                {activeFraudCount > 0 ? `${activeFraudCount} active fraud warnings` : "0 losses today"}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons Row */}
        <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2">
          <button
            onClick={() => triggerSimulation({ amount: 150, status: "SUCCESSFUL" })}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Generate ₹150 Test</span>
          </button>

          <Link
            href="/verify"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 rounded-xl text-xs font-bold transition"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.actions.verifyTransaction}</span>
          </Link>

          <Link
            href="/transactions"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 rounded-xl text-xs font-bold transition"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.actions.viewHistory}</span>
          </Link>

          <Link
            href="/reports"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 rounded-xl text-xs font-bold transition"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.actions.generateReport}</span>
          </Link>

          <Link
            href="/simulation"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-navy-950 border border-slate-300 rounded-xl text-xs font-bold transition ml-auto"
          >
            <FlaskConical className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.actions.openSimulation}</span>
          </Link>
        </div>

        {/* Charts & Status Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-navy-950 text-sm">Today&apos;s Revenue Velocity</h3>
                <p className="text-xs text-slate-500">Verified UPI credits received throughout stall hours</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                Peak: 05-06 PM
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    formatter={(val: number) => [`₹${val}`, "Verified Revenue"]}
                    contentStyle={{ backgroundColor: "#0b1c3d", color: "#fff", borderRadius: "8px", border: "none" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Status Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-navy-950 text-sm">Payment Health Ratio</h3>
              <p className="text-xs text-slate-500">Distribution of all transactions received today</p>
            </div>

            <div className="h-44 w-full my-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Successful ({summary.successfulTransactionsCount})
                </span>
                <span className="font-bold text-emerald-700">
                  {summary.successfulTransactionsCount + summary.pendingTransactionsCount + summary.failedTransactionsCount > 0
                    ? Math.round(
                        (summary.successfulTransactionsCount /
                          (summary.successfulTransactionsCount +
                            summary.pendingTransactionsCount +
                            summary.failedTransactionsCount)) *
                          100
                      )
                    : 100}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Pending ({summary.pendingTransactionsCount})
                </span>
                <span className="font-bold text-amber-600">{summary.pendingTransactionsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Failed ({summary.failedTransactionsCount})
                </span>
                <span className="font-bold text-rose-600">{summary.failedTransactionsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Transaction Feed & Recent Notifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Transaction Feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                  <span>Live Transaction Stream</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Auto-Refreshing
                  </span>
                </h3>
                <p className="text-xs text-slate-500">Real-time settlements from UPI provider network</p>
              </div>
              <Link
                href="/transactions"
                className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
              >
                <span>View All ({transactions.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {transactions.slice(0, 6).map((txn) => (
                <div
                  key={txn.id}
                  className="p-4 hover:bg-slate-50/80 transition flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        txn.status === "SUCCESSFUL"
                          ? "bg-emerald-100 text-emerald-700"
                          : txn.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {txn.status === "SUCCESSFUL" ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : txn.status === "PENDING" ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-navy-950 flex items-center gap-2">
                        <span>{txn.payerName}</span>
                        <span className="font-mono text-[10px] text-slate-400 font-normal">
                          UTR: {txn.utr}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{txn.source}</span>
                        <span>•</span>
                        <span>{formatTime(txn.timestamp)}</span>
                        {txn.orderId && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">{txn.orderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-sm font-black ${
                        txn.status === "SUCCESSFUL"
                          ? "text-emerald-600"
                          : txn.status === "PENDING"
                          ? "text-amber-600"
                          : "text-rose-600 line-through"
                      }`}
                    >
                      {formatINR(txn.amount)}
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        txn.status === "SUCCESSFUL"
                          ? "bg-emerald-50 text-emerald-700"
                          : txn.status === "PENDING"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notifications & Fraud Warnings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                  <span>Recent System Events</span>
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </h3>
                <Link
                  href="/notifications"
                  className="text-xs text-slate-500 hover:text-navy-950 font-semibold"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3 space-y-3">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl border text-xs transition ${
                      notif.type === "FRAUD"
                        ? "bg-rose-50/60 border-rose-200 text-rose-950"
                        : notif.type === "SUCCESS"
                        ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {formatTime(notif.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro soundbox status card */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-navy-950">Soundbox Voice:</span>
                <span className="text-slate-500 uppercase">{vendor.preferredLanguage}</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded text-[10px]">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
