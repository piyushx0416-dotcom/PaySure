"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatTime } from "@/lib/utils";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileWarning,
  Eye,
  Check,
  Smartphone,
  Copy,
} from "lucide-react";
import { FraudAlert, RiskLevel } from "@/lib/types";

export default function FraudDetectionPage() {
  const { fraudAlerts, resolveFraudAlert, language } = usePaySure();
  const t = translations[language];

  const [filterRisk, setFilterRisk] = useState<"ALL" | RiskLevel>("ALL");
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  const filteredAlerts = fraudAlerts.filter((a) => {
    if (filterRisk === "ALL") return true;
    return a.riskLevel === filterRisk;
  });

  return (
    <DashboardLayoutWrapper title={t.nav.fraud}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-400 rounded-xl">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950 dark:text-white">
                {t.fraudSection.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.fraudSection.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterRisk(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterRisk === lvl
                    ? "bg-navy-900 dark:bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Explainability Educational Card for Street Vendors */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
          <div className="font-bold flex items-center gap-2 mb-1">
            <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span>Why Do Street Vendors See Fraud Alerts?</span>
          </div>
          <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
            PaySure scans incoming payment claims against authoritative banking switch settlements. A warning is triggered when a customer displays a screenshot with a recycled UTR reference, an unverified payment screenshot app, or when the amount claimed differs from the actual amount credited to Ramesh&apos;s account.
          </p>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.length === 0 ? (
            <div className="col-span-2 bg-white dark:bg-[#0c1628] p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs transition-colors">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <div className="font-bold text-navy-950 dark:text-white text-sm">All Clear! No Active Risk Alerts</div>
              <p className="mt-1">All processed transactions have passed multi-factor verification checks.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border shadow-xs flex flex-col justify-between transition ${
                  alert.riskLevel === "HIGH"
                    ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50"
                    : alert.riskLevel === "MEDIUM"
                    ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                    : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                        alert.riskLevel === "HIGH"
                          ? "bg-rose-600 text-white"
                          : alert.riskLevel === "MEDIUM"
                          ? "bg-amber-500 text-navy-950"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {alert.riskLevel} RISK ALERT
                    </span>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>

                  <h3 className="font-bold text-navy-950 dark:text-white text-sm mb-1.5 flex items-start gap-1.5">
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        alert.riskLevel === "HIGH" ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"
                      }`}
                    />
                    <span>{alert.reason}</span>
                  </h3>

                  <div className="my-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Ref / UTR:</span>
                      <span className="font-mono font-bold text-navy-950 dark:text-white">{alert.utr}</span>
                    </div>
                    {alert.customerReportedAmount !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Customer Claim:</span>
                        <span className="font-bold text-navy-950 dark:text-white">
                          {formatINR(alert.customerReportedAmount)}
                        </span>
                      </div>
                    )}
                    {alert.actualAmount !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Bank Settlement:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatINR(alert.actualAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-navy-900 dark:bg-slate-950 text-white text-xs font-semibold border dark:border-slate-800">
                    <span className="text-amber-400 text-[10px] uppercase block font-bold">
                      {t.fraudSection.actionRecommended}:
                    </span>
                    <p className="mt-0.5 text-[11px] leading-snug">{alert.recommendedAction}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span
                    className={`font-bold text-[11px] ${
                      alert.status === "ACTIVE" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    Status: {alert.status}
                  </span>

                  {alert.status === "ACTIVE" && (
                    <button
                      onClick={() => resolveFraudAlert(alert.id)}
                      className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-navy-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg font-bold text-[11px] transition"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
