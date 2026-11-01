"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Language, ThemeMode } from "@/lib/types";
import {
  Menu,
  Bell,
  Volume2,
  VolumeX,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Radio,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, title }) => {
  const {
    vendor,
    updateVendor,
    notifications,
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    effectiveTheme,
    toggleTheme,
    testSoundbox,
    triggerSimulation,
  } = usePaySure();

  const [isQuickPayOpen, setIsQuickPayOpen] = useState(false);
  const [quickAmount, setQuickAmount] = useState(150);
  const [quickStatus, setQuickStatus] = useState<"SUCCESSFUL" | "PENDING" | "FAILED">("SUCCESSFUL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[language];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleQuickPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await triggerSimulation({
        amount: quickAmount,
        status: quickStatus,
        payerName: "Counter Customer",
      });
      setIsQuickPayOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0c1628]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between gap-3 shadow-xs transition-colors duration-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-1 text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base font-bold text-navy-950 dark:text-white flex items-center gap-2">
              {title || t.brand}
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Live Node
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Mode Switcher (Dark Default, Light, System) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <button
              onClick={() => setThemeMode("dark")}
              title="Dark Mode (Default)"
              className={`p-1.5 rounded-md transition flex items-center gap-1 ${
                themeMode === "dark"
                  ? "bg-navy-950 text-emerald-400 shadow-xs border border-emerald-500/30"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px] font-bold">Dark</span>
            </button>

            <button
              onClick={() => setThemeMode("light")}
              title="Light Mode"
              className={`p-1.5 rounded-md transition flex items-center gap-1 ${
                themeMode === "light"
                  ? "bg-white text-navy-950 shadow-xs border border-slate-300 font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px] font-bold">Light</span>
            </button>

            <button
              onClick={() => setThemeMode("system")}
              title="System Mode (Auto OS)"
              className={`p-1.5 rounded-md transition flex items-center gap-1 ${
                themeMode === "system"
                  ? "bg-white dark:bg-navy-950 text-sky-500 dark:text-sky-400 shadow-xs border border-sky-500/30 font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px] font-bold">Auto</span>
            </button>
          </div>

          {/* Language selector chips */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60 text-xs">
            {(["en", "hi", "kn"] as Language[]).map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                className={`px-2 py-1 rounded-md font-semibold transition ${
                  language === lng
                    ? "bg-white dark:bg-navy-950 text-navy-950 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
                }`}
              >
                {lng === "en" ? "EN" : lng === "hi" ? "हिंदी" : "ಕನ್ನಡ"}
              </button>
            ))}
          </div>

          {/* Soundbox Mute Toggle & Test */}
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg p-0.5">
            <button
              onClick={() => updateVendor({ voiceEnabled: !vendor.voiceEnabled })}
              title={vendor.voiceEnabled ? "Mute Voice Soundbox" : "Unmute Voice Soundbox"}
              className={`p-1.5 rounded-md transition ${
                vendor.voiceEnabled
                  ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40"
                  : "text-rose-500 hover:bg-rose-100/50 dark:hover:bg-rose-950/40"
              }`}
            >
              {vendor.voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={testSoundbox}
              title="Test Soundbox Bell"
              className="text-[11px] font-semibold px-2 py-1 text-slate-700 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-md transition"
            >
              Chime
            </button>
          </div>

          {/* Quick Payment Button */}
          <button
            onClick={() => setIsQuickPayOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-navy-950 rounded-lg text-xs font-bold shadow-sm transition active:scale-98"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.actions.generatePayment}</span>
            <span className="sm:hidden">Pay</span>
          </button>

          {/* Soundbox Monitor Kiosk Direct Shortcut */}
          <Link
            href="/monitor"
            title="Open Fullscreen Soundbox Kiosk"
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60 transition hidden md:flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400"
          >
            <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>Kiosk</span>
          </Link>

          {/* Notifications Bell */}
          <Link
            href="/notifications"
            className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-slight">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User Profile avatar */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-navy-900 dark:bg-emerald-500 text-white dark:text-navy-950 font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/20 hover:opacity-90 transition"
          >
            RK
          </Link>
        </div>
      </header>

      {/* Quick Payment Modal */}
      {isQuickPayOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0c1628] rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 dark:text-white text-base">Generate Payment Event</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fast simulation for counter testing</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickPayOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleQuickPayment} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Amount (₹ INR)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[40, 70, 150, 300].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setQuickAmount(amt)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                        quickAmount === amt
                          ? "bg-navy-900 dark:bg-emerald-600 text-white border-navy-900 dark:border-emerald-500"
                          : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm font-bold text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Verification Outcome
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickStatus("SUCCESSFUL")}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                      quickStatus === "SUCCESSFUL"
                        ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-600 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Successful</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickStatus("PENDING")}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                      quickStatus === "PENDING"
                        ? "bg-amber-50 dark:bg-amber-950/70 border-amber-600 text-amber-800 dark:text-amber-300 ring-2 ring-amber-500/20"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Radio className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
                    <span>Pending</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickStatus("FAILED")}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                      quickStatus === "FAILED"
                        ? "bg-rose-50 dark:bg-rose-950/70 border-rose-600 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/20"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Failed</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsQuickPayOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
                >
                  {isSubmitting ? "Verifying..." : "Dispatch & Announce"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
