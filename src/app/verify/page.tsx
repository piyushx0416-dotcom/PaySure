"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatTime } from "@/lib/utils";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  QrCode,
  FileCheck2,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { Transaction } from "@/lib/types";

export default function VerificationCenterPage() {
  const { verifyManualUtr, transactions, language } = usePaySure();
  const t = translations[language];

  const [inputUtr, setInputUtr] = useState("");
  const [inputAmount, setInputAmount] = useState(150);
  const [loading, setLoading] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<{
    valid: boolean;
    transaction?: Transaction;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyManualUtr(inputUtr, inputAmount);
      setVerifiedResult(res);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLookup = (utr: string, amt: number) => {
    setInputUtr(utr);
    setInputAmount(amt);
  };

  const handleCopyUtr = (utr: string) => {
    navigator.clipboard.writeText(utr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayoutWrapper title={t.nav.verify}>
      <div className="space-y-6">
        {/* Verification Engine Hero Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-navy-950">
                  {t.verification.heading}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {t.verification.subheading}
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 self-start">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NPCI Tunnel Active (Demo)</span>
            </div>
          </div>

          {/* Screenshot Warning Callout */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Rule #1 for Street Vendors:</strong> {t.verification.screenshotWarning}
            </span>
          </div>
        </div>

        {/* Verification Input & Live Search Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-navy-950 text-sm mb-4">
              Query Banking Switch by 12-Digit Reference (UTR)
            </h3>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.verification.enterUtr}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. 430198421092"
                      value={inputUtr}
                      onChange={(e) => setInputUtr(e.target.value.replace(/\D/g, ""))}
                      maxLength={12}
                      className="w-full px-3 py-2.5 pl-9 border border-slate-300 rounded-xl text-sm font-mono font-bold text-navy-950 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expected Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(Number(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-navy-950 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{loading ? "Verifying with Switch..." : t.verification.verifyBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const sample = transactions[0];
                    if (sample) handleQuickLookup(sample.utr, sample.amount);
                  }}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Paste Recent UTR
                </button>
              </div>
            </form>

            {/* Verification Result Output */}
            {verifiedResult && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div
                  className={`p-6 rounded-2xl border-2 text-center transition ${
                    verifiedResult.transaction?.status === "SUCCESSFUL"
                      ? "bg-emerald-50/70 border-emerald-500 text-emerald-950"
                      : verifiedResult.transaction?.status === "PENDING"
                      ? "bg-amber-50/70 border-amber-500 text-amber-950"
                      : "bg-rose-50/70 border-rose-500 text-rose-950"
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 text-white shadow-sm">
                    {verifiedResult.transaction?.status === "SUCCESSFUL" ? (
                      <div className="bg-emerald-600 p-3 rounded-full">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                    ) : verifiedResult.transaction?.status === "PENDING" ? (
                      <div className="bg-amber-500 p-3 rounded-full animate-spin">
                        <Clock className="w-8 h-8" />
                      </div>
                    ) : (
                      <div className="bg-rose-600 p-3 rounded-full">
                        <XCircle className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-black tracking-wider uppercase block">
                    {verifiedResult.transaction?.status === "SUCCESSFUL"
                      ? t.status.successful
                      : verifiedResult.transaction?.status === "PENDING"
                      ? t.status.pending
                      : t.status.failed}
                  </span>

                  <div className="text-3xl sm:text-4xl font-black mt-1">
                    {formatINR(verifiedResult.transaction?.amount || inputAmount)}
                  </div>

                  <p className="text-xs mt-2 max-w-md mx-auto font-medium">
                    {verifiedResult.message}
                  </p>

                  {verifiedResult.transaction && (
                    <div className="mt-4 max-w-md mx-auto grid grid-cols-2 gap-2 text-left text-xs bg-white/80 p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Payer</span>
                        <span className="font-bold text-navy-950">{verifiedResult.transaction.payerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">App</span>
                        <span className="font-semibold text-navy-950">{verifiedResult.transaction.source}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Settled At</span>
                        <span className="font-mono text-slate-700">
                          {formatTime(verifiedResult.transaction.timestamp)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Security Score</span>
                        <span className="font-bold text-emerald-600">Risk {verifiedResult.transaction.riskScore}/100</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Verification Pipeline Step Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-navy-950 text-sm mb-3">
                8-Stage Automated Verification Pipeline
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                What happens behind the scenes during every single PaySure verification check:
              </p>

              <ol className="space-y-2.5 text-xs">
                {[
                  { step: 1, title: "Receive Transaction Event", desc: "Webhook or simulated PSP event parsed." },
                  { step: 2, title: "Validate Schema & Amount", desc: "Positive numeric check and 12-digit length." },
                  { step: 3, title: "Idempotency & Replay Audit", desc: "Checks for reused UTRs or screenshot recycling." },
                  { step: 4, title: "Detect Tampering / Heuristics", desc: "Audits reported amount against bank credit." },
                  { step: 5, title: "Retrieve Authoritative Switch Status", desc: "Direct tunnel check to NPCI node." },
                  { step: 6, title: "Commit to Immutable Ledger", desc: "Local database record updated." },
                  { step: 7, title: "Trigger Multilingual Soundbox", desc: "Speaks aloud in vendor language." },
                  { step: 8, title: "Refresh Dashboard Stats", desc: "Verified revenue counter increments." },
                ].map((s) => (
                  <li key={s.step} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <div className="font-bold text-navy-950 text-[11px]">{s.title}</div>
                      <div className="text-[10px] text-slate-500">{s.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
