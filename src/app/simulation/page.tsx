"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import { TransactionStatus, PaymentSource, NetworkCondition } from "@/lib/types";
import {
  FlaskConical,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
  Layers,
  Terminal,
  Volume2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function SimulationLabPage() {
  const {
    triggerSimulation,
    recentLogs,
    networkCondition,
    setNetworkCondition,
    resetDemoData,
    language,
    transactions,
    syncOfflineQueue,
  } = usePaySure();

  const t = translations[language];

  // Custom simulation state
  const [amount, setAmount] = useState(150);
  const [status, setStatus] = useState<TransactionStatus>("SUCCESSFUL");
  const [source, setSource] = useState<PaymentSource>("PHONEPE");
  const [customUtr, setCustomUtr] = useState("");
  const [payerName, setPayerName] = useState("Kiran Kumar");
  const [isFakeScreenshot, setIsFakeScreenshot] = useState(false);
  const [isAmountMismatch, setIsAmountMismatch] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Run Custom Simulation
  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await triggerSimulation({
        amount,
        status,
        source,
        utr: customUtr || undefined,
        payerName,
        isFakeScreenshotAttempt: isFakeScreenshot,
        reportedAmountMismatch: isAmountMismatch,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // 8 ONE-CLICK PRESETS
  const runPreset = async (presetId: number) => {
    setIsExecuting(true);
    try {
      switch (presetId) {
        case 1: // 1. Normal Successful Payment
          setNetworkCondition("ONLINE");
          await triggerSimulation({
            amount: 150,
            status: "SUCCESSFUL",
            source: "PHONEPE",
            payerName: "Amit Sharma",
          });
          break;

        case 2: // 2. Delayed Payment
          setNetworkCondition("SLOW");
          await triggerSimulation({
            amount: 80,
            status: "PENDING",
            source: "GOOGLE_PAY",
            payerName: "Deepak Verma",
          });
          break;

        case 3: // 3. Failed Payment
          setNetworkCondition("ONLINE");
          await triggerSimulation({
            amount: 200,
            status: "FAILED",
            source: "BHIM",
            payerName: "Venkatesh Murthy",
          });
          break;

        case 4: // 4. Duplicate Payment (Replay Attack)
          setNetworkCondition("ONLINE");
          const existingUtr = transactions[0]?.utr || "430198421092";
          await triggerSimulation({
            amount: 150,
            status: "SUCCESSFUL",
            utr: existingUtr, // Reusing existing UTR
            payerName: "Suspicious Customer #42",
          });
          break;

        case 5: // 5. Fake Screenshot Attempt
          setNetworkCondition("ONLINE");
          await triggerSimulation({
            amount: 350,
            status: "FAILED",
            payerName: "Spoof App Presenter",
            isFakeScreenshotAttempt: true,
          });
          break;

        case 6: // 6. Network Disconnection
          setNetworkCondition("OFFLINE");
          await triggerSimulation({
            amount: 60,
            status: "PENDING",
            payerName: "Offline Walk-in Customer",
          });
          break;

        case 7: // 7. Network Restoration
          setNetworkCondition("ONLINE");
          syncOfflineQueue();
          break;

        case 8: // 8. Multiple Rapid Payments
          setNetworkCondition("ONLINE");
          await triggerSimulation({ amount: 40, status: "SUCCESSFUL", payerName: "Rush Customer #1 (Tea)" });
          await triggerSimulation({ amount: 70, status: "SUCCESSFUL", payerName: "Rush Customer #2 (Idli)" });
          await triggerSimulation({ amount: 150, status: "SUCCESSFUL", payerName: "Rush Customer #3 (Dosa)" });
          break;
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <DashboardLayoutWrapper title={t.nav.simulation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                {t.simulationLab.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.simulationLab.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm("Reset demo data and restore initial clean stall transactions?")) {
                  resetDemoData();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* 8 ONE-CLICK DEMO PRESETS (Essential for College Showcase) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>One-Click College Demonstration Presets</span>
              </h3>
              <p className="text-xs text-slate-500">
                Trigger realistic edge cases to observe immediate voice announcements, fraud alerts, and dashboard updates.
              </p>
            </div>
            <span className="text-[10px] font-bold text-navy-900 bg-navy-100 px-2.5 py-1 rounded-full uppercase">
              8 Scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Preset 1 */}
            <button
              onClick={() => runPreset(1)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>1. Normal Success</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">₹150 Masala Dosa Combo</div>
              <p className="text-[11px] text-emerald-700 mt-1 leading-snug">
                Verified by NPCI. Loud voice alert & green modal.
              </p>
            </button>

            {/* Preset 2 */}
            <button
              onClick={() => runPreset(2)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                <span>2. Delayed Payment</span>
                <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">₹80 Rava Idli Timeout</div>
              <p className="text-[11px] text-amber-700 mt-1 leading-snug">
                Bank delay. Amber pending status with chime warning.
              </p>
            </button>

            {/* Preset 3 */}
            <button
              onClick={() => runPreset(3)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                <span>3. Failed Payment</span>
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">₹200 Declined Funds</div>
              <p className="text-[11px] text-rose-700 mt-1 leading-snug">
                Issuer error. Cautionary double buzzer & voice: &ldquo;Payment not received.&rdquo;
              </p>
            </button>

            {/* Preset 4 */}
            <button
              onClick={() => runPreset(4)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                <span>4. Duplicate UTR Replay</span>
                <ShieldAlert className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">Replay Attack</div>
              <p className="text-[11px] text-purple-700 mt-1 leading-snug">
                Customer reuses previously paid UTR. Caught by Idempotency engine.
              </p>
            </button>

            {/* Preset 5 */}
            <button
              onClick={() => runPreset(5)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-rose-300 bg-rose-100/60 hover:bg-rose-200/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                <span>5. Fake Screenshot</span>
                <AlertTriangle className="w-4 h-4 text-rose-700" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">₹350 Spoof APK App</div>
              <p className="text-[11px] text-rose-800 mt-1 leading-snug">
                Customer claims green tick. PaySure blocks: &ldquo;Do not release food.&rdquo;
              </p>
            </button>

            {/* Preset 6 */}
            <button
              onClick={() => runPreset(6)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-amber-300 bg-amber-100/60 hover:bg-amber-200/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>6. Network Drop</span>
                <WifiOff className="w-4 h-4 text-amber-800" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">Stall Internet Offline</div>
              <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                Simulates dead zone. Caches locally; refuses to mark as verified.
              </p>
            </button>

            {/* Preset 7 */}
            <button
              onClick={() => runPreset(7)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-teal-800">
                <span>7. Network Restored</span>
                <Wifi className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">Reconnect & Flush Queue</div>
              <p className="text-[11px] text-teal-700 mt-1 leading-snug">
                Re-establishes NPCI tunnel. Offline payments sync & announce.
              </p>
            </button>

            {/* Preset 8 */}
            <button
              onClick={() => runPreset(8)}
              disabled={isExecuting}
              className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left transition group active:scale-98"
            >
              <div className="flex items-center justify-between text-xs font-bold text-blue-800">
                <span>8. Rapid Fire Rush</span>
                <Layers className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xs font-black text-navy-950 mt-1">3 Customers at Once</div>
              <p className="text-[11px] text-blue-700 mt-1 leading-snug">
                Sequential audio speech queue tests non-overlapping announcements.
              </p>
            </button>
          </div>
        </div>

        {/* Custom Simulator Console & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simulation Config Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-navy-950 text-sm mb-4 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>Custom Payment Scenario Builder</span>
            </h3>

            <div className="space-y-4 text-xs">
              {/* Amount */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t.simulationLab.amountLabel}
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {[10, 50, 100, 150, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      className={`py-1.5 rounded-lg font-bold border transition ${
                        amount === amt
                          ? "bg-navy-900 text-white border-navy-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-navy-950"
                />
              </div>

              {/* Status Outcome */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {t.simulationLab.statusLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["SUCCESSFUL", "PENDING", "FAILED"] as TransactionStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatus(st)}
                      className={`py-2 rounded-lg font-bold border transition ${
                        status === st
                          ? "bg-navy-900 text-white border-navy-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* App Source */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Payment App Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as PaymentSource)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-navy-950"
                >
                  <option value="PHONEPE">PhonePe</option>
                  <option value="GOOGLE_PAY">Google Pay</option>
                  <option value="PAYTM">Paytm</option>
                  <option value="BHIM">BHIM UPI</option>
                  <option value="CRED">CRED Pay</option>
                </select>
              </div>

              {/* Edge Case Toggles */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFakeScreenshot}
                    onChange={(e) => setIsFakeScreenshot(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span className="font-semibold text-rose-800">
                    Simulate Fake Screenshot Attempt (Customer shows spoof app tick)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAmountMismatch}
                    onChange={(e) => setIsAmountMismatch(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span className="font-semibold text-amber-800">
                    Simulate Amount Tampering (Customer claims ₹150, bank credited ₹1)
                  </span>
                </label>
              </div>

              {/* Trigger Button */}
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isExecuting ? "Processing Scenario..." : t.simulationLab.generateBtn}</span>
              </button>
            </div>
          </div>

          {/* Live Step-by-Step Execution Console */}
          <div className="bg-navy-950 text-slate-200 p-6 rounded-2xl border border-navy-800 shadow-xl flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white uppercase text-[11px]">
                    Live Verification Console
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  REAL-TIME TRACE
                </span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                {recentLogs.length === 0 ? (
                  <div className="text-slate-500 py-10 text-center">
                    Console ready. Click any preset or generate payment above to watch the pipeline execute in real time.
                  </div>
                ) : (
                  recentLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg border transition ${
                        log.status === "SUCCESS"
                          ? "bg-navy-900/80 border-emerald-900/60 text-emerald-300"
                          : log.status === "WARNING"
                          ? "bg-amber-950/40 border-amber-900/60 text-amber-300"
                          : "bg-rose-950/50 border-rose-900/60 text-rose-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-white">{log.stage}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-[11px] leading-relaxed">{log.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>NPCI Verification Node Protocol v2.4</span>
              <span className="text-emerald-400 font-bold">100% Deterministic</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
