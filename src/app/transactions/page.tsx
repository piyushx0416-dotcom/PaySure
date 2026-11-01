"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatDate, formatTime } from "@/lib/utils";
import { exportTransactionsToCSV } from "@/lib/exportUtils";
import { Transaction, TransactionStatus } from "@/lib/types";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  Check,
  Printer,
  X,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function TransactionsPage() {
  const { transactions, language } = usePaySure();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TransactionStatus>("ALL");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [receiptTxn, setReceiptTxn] = useState<Transaction | null>(null);
  const [copiedUtr, setCopiedUtr] = useState<string | null>(null);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.utr.toLowerCase().includes(q) ||
        t.payerName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.amount.toString().includes(q) ||
        t.source.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [transactions, statusFilter, searchQuery]);

  const handleCopy = (utr: string) => {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(utr);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayoutWrapper title={t.nav.transactions}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <h2 className="text-xl font-black text-navy-950 dark:text-white">Verified Transaction Ledger</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete historical record of incoming UPI credits with cryptographic reference logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportTransactionsToCSV(filteredTransactions)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs active:scale-98"
            >
              <Download className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>{t.actions.exportCsv}</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-[#0c1628] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 transition-colors">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder={t.actions.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-9 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl text-xs text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {(["ALL", "SUCCESSFUL", "PENDING", "FAILED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  statusFilter === st
                    ? "bg-navy-900 dark:bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {st === "ALL" ? t.actions.filterAll : st === "SUCCESSFUL" ? t.actions.filterSuccess : st === "PENDING" ? t.actions.filterPending : t.actions.filterFailed}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-[#0c1628] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-4">Transaction / UTR</th>
                  <th className="p-4">Payer / Source</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification Node</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No matching transactions found. Try adjusting your search query or filter.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition">
                      <td className="p-4">
                        <div className="font-bold text-navy-950 dark:text-white">{t.id}</div>
                        <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <span>UTR: {t.utr}</span>
                          <button
                            onClick={() => handleCopy(t.utr)}
                            title="Copy UTR Reference"
                            className="text-slate-400 hover:text-navy-900 dark:hover:text-white p-0.5 rounded"
                          >
                            {copiedUtr === t.utr ? (
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-navy-950 dark:text-white">{t.payerName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.source}</div>
                      </td>

                      <td className="p-4">
                        <div className="text-slate-900 dark:text-slate-200">{formatDate(t.timestamp)}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{formatTime(t.timestamp)}</div>
                      </td>

                      <td className="p-4">
                        <div
                          className={`text-sm font-black ${
                            t.status === "SUCCESSFUL"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : t.status === "PENDING"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-rose-600 dark:text-rose-400 line-through"
                          }`}
                        >
                          {formatINR(t.amount)}
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            t.status === "SUCCESSFUL"
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                              : t.status === "PENDING"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
                              : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40"
                          }`}
                        >
                          {t.status === "SUCCESSFUL" ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          ) : t.status === "PENDING" ? (
                            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                          )}
                          <span>{t.status}</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                          {t.verificationSource === "AUTHORITATIVE_PROVIDER_API"
                            ? "NPCI Tunnel"
                            : t.verificationSource === "OFFLINE_LOCAL_RECORD"
                            ? "Offline Cache"
                            : "Simulated Provider"}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedTxn(t)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-semibold transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => setReceiptTxn(t)}
                            title="Generate Customer Receipt"
                            className="p-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Details Modal */}
        {selectedTxn && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c1628] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 text-slate-900 dark:text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 dark:text-white text-sm">Transaction Audit Record</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{selectedTxn.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Amount Settled</span>
                    <span className="text-2xl font-black text-navy-950 dark:text-white">{formatINR(selectedTxn.amount)}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      selectedTxn.status === "SUCCESSFUL"
                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                        : selectedTxn.status === "PENDING"
                        ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300"
                        : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {selectedTxn.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">12-Digit UTR</span>
                    <span className="font-mono font-bold text-navy-950 dark:text-white">{selectedTxn.utr}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Payer Name</span>
                    <span className="font-bold text-navy-950 dark:text-white">{selectedTxn.payerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Payer VPA</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{selectedTxn.payerVpa}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Payment App</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedTxn.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Timestamp</span>
                    <span className="text-slate-700 dark:text-slate-300">{new Date(selectedTxn.timestamp).toLocaleString("en-IN")}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Security Score</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Risk {selectedTxn.riskScore}/100</span>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div>
                  <h4 className="font-bold text-navy-950 dark:text-white text-xs mb-2">Verification Audit Log</h4>
                  <div className="space-y-1.5 pl-2 border-l-2 border-emerald-500">
                    <div className="text-[11px] text-slate-700 dark:text-slate-300">
                      <strong>0.00s:</strong> Packet received from {selectedTxn.source}
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300">
                      <strong>0.14s:</strong> Idempotency check verified (Key: {selectedTxn.idempotencyKey})
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300">
                      <strong>0.42s:</strong> NPCI Switch status resolved: {selectedTxn.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setReceiptTxn(selectedTxn)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="px-4 py-2 bg-navy-900 dark:bg-emerald-600 hover:bg-navy-950 dark:hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Customer Receipt Modal */}
        {receiptTxn && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c1628] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-white">
              <div className="text-center border-b dark:border-slate-800 pb-3 mb-3">
                <h3 className="font-bold text-base text-navy-950 dark:text-white">RAMESH SOUTH INDIAN TIFFIN</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Stall #14, Food Street, Bangalore</p>
                <p className="text-[10px] text-slate-400">UPI VPA: ramesh.tiffin@upi</p>
              </div>

              <div className="space-y-1.5 border-b dark:border-slate-800 pb-3 mb-3 text-[11px]">
                <div className="flex justify-between">
                  <span>RECEIPT NO:</span>
                  <span className="font-bold">{receiptTxn.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>UPI REF (UTR):</span>
                  <span className="font-bold">{receiptTxn.utr}</span>
                </div>
                <div className="flex justify-between">
                  <span>DATE & TIME:</span>
                  <span>{new Date(receiptTxn.timestamp).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>PAYER:</span>
                  <span className="font-bold">{receiptTxn.payerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>METHOD:</span>
                  <span>UPI ({receiptTxn.source})</span>
                </div>
              </div>

              <div className="text-center py-2 bg-slate-50 dark:bg-slate-900/80 rounded-lg mb-3 border dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-sans">Verified Amount Received</span>
                <span className="text-2xl font-black text-navy-950 dark:text-white font-sans">{formatINR(receiptTxn.amount)}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1 font-sans">
                  STATUS: {receiptTxn.status}
                </span>
              </div>

              <div className="text-center text-[10px] text-slate-400 mb-4">
                Powered by PaySure Verification Engine<br />
                Every Payment. Verified. Every Time.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t dark:border-slate-800">
                <button
                  onClick={() => setReceiptTxn(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 bg-navy-900 dark:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayoutWrapper>
  );
}
