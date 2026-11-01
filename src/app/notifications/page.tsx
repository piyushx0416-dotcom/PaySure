"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatTime, formatDate } from "@/lib/utils";
import { NotificationType } from "@/lib/types";
import {
  Bell,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldAlert,
  Wifi,
  WifiOff,
  CheckCheck,
  Filter,
} from "lucide-react";

export default function NotificationsCenterPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    language,
  } = usePaySure();

  const t = translations[language];
  const [filterType, setFilterType] = useState<"ALL" | NotificationType>("ALL");

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === "ALL") return true;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayoutWrapper title={t.nav.notifications}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950 dark:text-white">
                Stall Notification Center
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Live record of payment settlements, fraud alerts, network dropouts, and daily sales summaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-navy-950 dark:text-white rounded-xl text-xs font-bold transition"
              >
                <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Type:
          </span>
          {(["ALL", "SUCCESS", "PENDING", "FAILED", "FRAUD", "SYSTEM"] as const).map((tp) => (
            <button
              key={tp}
              onClick={() => setFilterType(tp as typeof filterType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                filterType === tp
                  ? "bg-navy-900 dark:bg-emerald-600 text-white shadow-xs"
                  : "bg-white dark:bg-[#0c1628] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tp}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-[#0c1628] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800/70 overflow-hidden transition-colors">
          {filteredNotifs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
              No notifications matching current filter.
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition cursor-pointer ${
                  notif.read
                    ? "bg-white dark:bg-[#0c1628] hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                    : "bg-emerald-50/30 dark:bg-emerald-950/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40"
                }`}
              >
                {/* Icon by type */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === "SUCCESS"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-700/40"
                      : notif.type === "PENDING"
                      ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/40"
                      : notif.type === "FAILED"
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300/40 dark:border-rose-700/40"
                      : notif.type === "FRAUD"
                      ? "bg-rose-600 text-white"
                      : "bg-navy-100 dark:bg-slate-800 text-navy-900 dark:text-cyan-400"
                  }`}
                >
                  {notif.type === "SUCCESS" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : notif.type === "PENDING" ? (
                    <Clock className="w-5 h-5" />
                  ) : notif.type === "FAILED" ? (
                    <XCircle className="w-5 h-5" />
                  ) : notif.type === "FRAUD" ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : (
                    <Wifi className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-navy-950 dark:text-white text-xs sm:text-sm truncate">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-mono">
                      {formatTime(notif.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
