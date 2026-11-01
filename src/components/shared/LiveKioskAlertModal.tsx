"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  XCircle,
  ShieldAlert,
  Volume2,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export const LiveKioskAlertModal: React.FC = () => {
  const { activeAlertModal, setActiveAlertModal, language } = usePaySure();
  const t = translations[language];

  useEffect(() => {
    if (activeAlertModal) {
      if (activeAlertModal.status === "SUCCESSFUL" && activeAlertModal.riskScore < 50) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#10b981", "#059669", "#34d399", "#3b82f6"],
          });
        } catch {
          // ignore if canvas blocked
        }
      }

      // Auto dismiss after 7 seconds so counter isn't permanently blocked
      const timer = setTimeout(() => {
        setActiveAlertModal(null);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [activeAlertModal, setActiveAlertModal]);

  if (!activeAlertModal) return null;

  const isSuccess = activeAlertModal.status === "SUCCESSFUL";
  const isPending = activeAlertModal.status === "PENDING";
  const isHighRisk = activeAlertModal.riskScore >= 70;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 text-center animate-in zoom-in-95 duration-200 ${
          isHighRisk
            ? "bg-rose-950 text-white border-rose-500 shadow-rose-900/50"
            : isSuccess
            ? "bg-gradient-to-b from-emerald-950 via-slate-900 to-navy-950 text-white border-emerald-500/80 shadow-emerald-900/50"
            : isPending
            ? "bg-gradient-to-b from-amber-950 via-slate-900 to-navy-950 text-white border-amber-500/80 shadow-amber-900/50"
            : "bg-gradient-to-b from-rose-950 via-slate-900 to-navy-950 text-white border-rose-500/80 shadow-rose-900/50"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveAlertModal(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon */}
        <div className="mx-auto my-3 flex items-center justify-center">
          {isHighRisk ? (
            <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border-4 border-rose-500/50 animate-bounce">
              <ShieldAlert className="w-12 h-12" />
            </div>
          ) : isSuccess ? (
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-4 border-emerald-400 animate-pulse">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          ) : isPending ? (
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border-4 border-amber-400 animate-spin">
              <Clock className="w-12 h-12" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border-4 border-rose-400 animate-pulse">
              <XCircle className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Big Status Heading */}
        <div className="mt-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-2 ${
              isHighRisk
                ? "bg-rose-500 text-white"
                : isSuccess
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/40"
                : isPending
                ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
                : "bg-rose-500/30 text-rose-300 border border-rose-400/40"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            {isHighRisk
              ? "SECURITY RISK DETECTED"
              : isSuccess
              ? t.status.successful
              : isPending
              ? t.status.pending
              : t.status.failed}
          </span>

          {/* Amount Display */}
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
            {formatINR(activeAlertModal.amount)}
          </div>
        </div>

        {/* Explanatory banner */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200">
          {isHighRisk ? (
            <div className="text-rose-300 font-bold">
              ⚠️ {activeAlertModal.failureReason || "Unverified claim or duplicate reference. Do not serve order."}
            </div>
          ) : isSuccess ? (
            <div className="text-emerald-200">
              Verified by NPCI Banking Node • Paid by{" "}
              <strong>{activeAlertModal.payerName}</strong> via{" "}
              <strong>{activeAlertModal.source}</strong>
            </div>
          ) : isPending ? (
            <div className="text-amber-200">
              Transaction awaiting settlement. Ask customer to wait 30 seconds for voice confirmation.
            </div>
          ) : (
            <div className="text-rose-200">
              Bank declined payment ({activeAlertModal.failureReason || "Issuer error"}). Ask for cash or retry.
            </div>
          )}
        </div>

        {/* Reference details */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-left text-xs bg-black/30 p-3 rounded-xl border border-white/5">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">UPI UTR Ref:</span>
            <span className="font-mono font-bold text-slate-200">{activeAlertModal.utr}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Source / App:</span>
            <span className="font-semibold text-slate-200">{activeAlertModal.source}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveAlertModal(null)}
            className="px-6 py-2.5 rounded-xl bg-white text-navy-950 font-bold text-xs hover:bg-slate-200 transition shadow"
          >
            Dismiss / Next Order
          </button>
          <Link
            href="/monitor"
            onClick={() => setActiveAlertModal(null)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition flex items-center gap-1.5"
          >
            <span>Live Monitor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
