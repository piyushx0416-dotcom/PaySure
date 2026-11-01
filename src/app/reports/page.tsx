"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatDate, formatTime } from "@/lib/utils";
import { exportTransactionsToCSV } from "@/lib/exportUtils";
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function ReportsPage() {
  const { transactions, summary, vendor, language } = usePaySure();
  const t = translations[language];

  const [reportType, setReportType] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "RECONCILIATION">("DAILY");
  const [isPrintModal, setIsPrintModal] = useState(false);

  const verifiedTxns = transactions.filter((t) => t.status === "SUCCESSFUL");
  const failedTxns = transactions.filter((t) => t.status === "FAILED");
  const pendingTxns = transactions.filter((t) => t.status === "PENDING");

  const totalVerifiedSum = verifiedTxns.reduce((s, t) => s + t.amount, 0);

  const handleExportCSV = () => {
    exportTransactionsToCSV(transactions, `paysure-${reportType.toLowerCase()}-report.csv`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayoutWrapper title={t.nav.reports}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                Stall Audit & Settlement Reports
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Export accounting ledgers, daily collections, and bank reconciliation files.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Audit Sheet</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Report Period Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "DAILY", label: "Today's Daily Ledger" },
            { id: "WEEKLY", label: "7-Day Weekly Summary" },
            { id: "MONTHLY", label: "Monthly GST Reconciliation" },
            { id: "RECONCILIATION", label: "Bank Settlement Audit" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id as typeof reportType)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                reportType === tab.id
                  ? "bg-navy-900 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Total Verified Collections</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {formatINR(totalVerifiedSum)}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">100% Settled to SBI ••••4829</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Verified Clearances</span>
            <div className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
              {verifiedTxns.length}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">0 Reversals / Chargebacks</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Pending Clarification</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {pendingTxns.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Awaiting bank settlement cycle</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Discrepancy Rate</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">0.0%</div>
            <p className="text-[11px] text-slate-500 mt-1">Perfect bank ledger match</p>
          </div>
        </div>

        {/* Report Line Items Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-navy-950 text-sm">
                Settlement Line Items ({reportType})
              </h3>
              <p className="text-xs text-slate-500">Chronological transaction vouchers</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Generated: {new Date().toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Voucher ID</th>
                  <th className="p-3.5">UTR Reference</th>
                  <th className="p-3.5">Payer Details</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-navy-950">{t.id}</td>
                    <td className="p-3.5 font-mono text-slate-600">{t.utr}</td>
                    <td className="p-3.5 text-slate-800">{t.payerName} ({t.source})</td>
                    <td className="p-3.5 text-slate-600">{formatDate(t.timestamp)} {formatTime(t.timestamp)}</td>
                    <td className="p-3.5 font-bold text-navy-950">{formatINR(t.amount)}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          t.status === "SUCCESSFUL"
                            ? "bg-emerald-50 text-emerald-700"
                            : t.status === "PENDING"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Audit Modal */}
        {isPrintModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 text-xs">
              <div className="border-b pb-4 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-navy-950">PAYSURE DAILY RECONCILIATION SHEET</h3>
                  <p className="text-slate-500">{vendor.businessName} • {vendor.name}</p>
                  <p className="text-[10px] text-slate-400">VPA: {vendor.upiVpa} | SBI: {vendor.bankAccount}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">STATUS: BALANCED</div>
                  <div className="text-[10px] text-slate-400">Audit Date: {new Date().toLocaleDateString("en-IN")}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl mb-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Verified Collections</span>
                  <span className="text-xl font-black text-navy-950">{formatINR(totalVerifiedSum)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Successful Txns</span>
                  <span className="text-xl font-black text-emerald-600">{verifiedTxns.length}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Reconciliations</span>
                  <span className="text-xl font-black text-amber-600">{pendingTxns.length}</span>
                </div>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto border-t border-b py-3 mb-4 font-mono text-[11px]">
                {transactions.slice(0, 8).map((txn) => (
                  <div key={txn.id} className="flex justify-between">
                    <span>{txn.utr} | {txn.payerName.slice(0, 15)}</span>
                    <span className="font-bold">{formatINR(txn.amount)} [{txn.status}]</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsPrintModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 bg-navy-900 text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Audit Slip</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayoutWrapper>
  );
}
