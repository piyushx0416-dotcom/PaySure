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
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                Stall Notification Center
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live record of payment settlements, fraud alerts, network dropouts, and daily sales summaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-navy-950 rounded-xl text-xs font-bold transition"
              >
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Type:
          </span>
          {(["ALL", "SUCCESS", "PENDING", "FAILED", "FRAUD", "SYSTEM"] as const).map((tp) => (
            <button
              key={tp}
              onClick={() => setFilterType(tp as typeof filterType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                filterType === tp
                  ? "bg-navy-900 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {tp}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredNotifs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No notifications matching current filter.
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition cursor-pointer ${
                  notif.read ? "bg-white hover:bg-slate-50/70" : "bg-emerald-50/30 hover:bg-emerald-50/50"
                }`}
              >
                {/* Icon by type */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-700"
                      : notif.type === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : notif.type === "FAILED"
                      ? "bg-rose-100 text-rose-700"
                      : notif.type === "FRAUD"
                      ? "bg-rose-600 text-white"
                      : "bg-navy-100 text-navy-900"
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
                    <h3 className="font-bold text-navy-950 text-xs sm:text-sm truncate">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {formatTime(notif.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
