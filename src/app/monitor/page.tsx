"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatTime } from "@/lib/utils";
import {
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Clock,
  XCircle,
  Radio,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function LiveMonitorPage() {
  const {
    transactions,
    vendor,
    updateVendor,
    language,
    triggerSimulation,
    testSoundbox,
  } = usePaySure();

  const t = translations[language];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customAmt, setCustomAmt] = useState("");

  const latestTxn = transactions[0] || null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSimulate = async (amt: number, status: "SUCCESSFUL" | "PENDING" | "FAILED" = "SUCCESSFUL") => {
    await triggerSimulation({
      amount: amt,
      status,
      payerName: "Counter Walk-in",
    });
  };

  return (
    <DashboardLayoutWrapper title={t.nav.monitor}>
      <div className="space-y-6">
        {/* Top bar controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <span>Stall Counter Soundbox Kiosk</span>
                <span className="text-[10px] bg-navy-900 text-white font-mono px-2 py-0.5 rounded">
                  PORT: LIVE
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Optimized for hands-free counter placement during busy customer rushes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={testSoundbox}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-950 rounded-xl text-xs font-bold transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Chime</span>
            </button>

            <button
              onClick={() => updateVendor({ voiceEnabled: !vendor.voiceEnabled })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                vendor.voiceEnabled
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-rose-50 text-rose-800 border-rose-300"
              }`}
            >
              {vendor.voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{vendor.voiceEnabled ? "Voice Enabled" : "Voice Muted"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-600 hover:text-navy-950 bg-slate-100 rounded-xl transition"
              title="Toggle Fullscreen Counter Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Soundbox Screen Container */}
        <div
          className={`rounded-3xl p-6 sm:p-12 text-center transition-all shadow-xl relative overflow-hidden border-4 ${
            !latestTxn || latestTxn.status === "SUCCESSFUL"
              ? "bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 border-emerald-500/60 shadow-emerald-950/40 text-white"
              : latestTxn.status === "PENDING"
              ? "bg-gradient-to-b from-amber-950 via-slate-900 to-navy-900 border-amber-500/60 shadow-amber-950/40 text-white"
              : "bg-gradient-to-b from-rose-950 via-slate-900 to-navy-900 border-rose-500/60 shadow-rose-950/40 text-white"
          }`}
        >
          {/* Animated sound ripples */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-96 h-96 rounded-full border-4 border-emerald-400 animate-ping" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>
                {latestTxn
                  ? latestTxn.status === "SUCCESSFUL"
                    ? t.status.successful
                    : latestTxn.status === "PENDING"
                    ? t.status.pending
                    : t.status.failed
                  : "WAITING FOR UPI PAYMENT"}
              </span>
            </div>

            {/* Giant Big Amount Display */}
            <div className="py-2">
              <span className="text-6xl sm:text-8xl font-black tracking-tight drop-shadow-md">
                {latestTxn ? formatINR(latestTxn.amount) : "₹0"}
              </span>
            </div>

            {/* Audio Waveform Graphic */}
            <div className="flex items-center justify-center gap-1.5 h-10 py-2">
              {[40, 75, 100, 60, 90, 45, 80, 100, 70, 35].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    latestTxn?.status === "SUCCESSFUL"
                      ? "bg-emerald-400"
                      : latestTxn?.status === "PENDING"
                      ? "bg-amber-400"
                      : "bg-rose-400"
                  }`}
                />
              ))}
            </div>

            {/* Customer & UTR Metadata */}
            {latestTxn && (
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left bg-black/30 p-4 rounded-2xl backdrop-blur-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Payer</span>
                  <span className="text-xs font-bold text-white truncate block">{latestTxn.payerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Source App</span>
                  <span className="text-xs font-bold text-emerald-400">{latestTxn.source}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">UPI UTR</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{latestTxn.utr}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Counter Fast-Billing Keypad for Ramesh */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-950 text-sm">Stall Quick Payment Simulator</h3>
              <p className="text-xs text-slate-500">Tap standard street stall ticket sizes to test voice audio instantly</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Interactive Test
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Filter Coffee", amt: 30 },
              { label: "Idli Vada Combo", amt: 70 },
              { label: "Masala Dosa Meal", amt: 150 },
              { label: "Family Parcel", amt: 320 },
            ].map((preset) => (
              <button
                key={preset.amt}
                onClick={() => handleSimulate(preset.amt, "SUCCESSFUL")}
                className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition text-left group"
              >
                <div className="text-xs font-semibold text-slate-500 group-hover:text-emerald-700">
                  {preset.label}
                </div>
                <div className="text-2xl font-black text-navy-950 group-hover:text-emerald-700 mt-1">
                  ₹{preset.amt}
                </div>
                <div className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Tap to Pay & Announce</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-600">Simulate Edge Cases:</span>
            <button
              onClick={() => handleSimulate(80, "PENDING")}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Simulate Pending (₹80)</span>
            </button>

            <button
              onClick={() => handleSimulate(200, "FAILED")}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Simulate Failed (₹200)</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
