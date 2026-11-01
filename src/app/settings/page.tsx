"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Language, ThemeMode } from "@/lib/types";
import {
  Settings,
  Volume2,
  Globe,
  Wifi,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Moon,
  Sun,
  Laptop,
  Palette,
} from "lucide-react";

export default function SettingsPage() {
  const {
    vendor,
    updateVendor,
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    effectiveTheme,
    resetDemoData,
    testSoundbox,
    networkCondition,
    setNetworkCondition,
  } = usePaySure();

  const t = translations[language];
  const [savedBanner, setSavedBanner] = useState(false);

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  return (
    <DashboardLayoutWrapper title={t.nav.settings}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-navy-100 dark:bg-emerald-950/80 text-navy-900 dark:text-emerald-400 rounded-xl">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950 dark:text-white">
                Stall & Soundbox Settings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Configure appearance mode, voice announcement volume, language preferences, and offline policies.
            </p>
          </div>

          {savedBanner && (
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Settings Saved</span>
            </div>
          )}
        </div>

        {/* SECTION 1: SYSTEM & APPEARANCE MODE (DARK MODE DEFAULT) */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-500" />
              <span>Appearance & Theme Mode</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
              Active: {themeMode.toUpperCase()} ({effectiveTheme})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose your preferred display theme. <strong>Dark mode is enabled by default</strong> to provide maximum high-contrast visibility and protect vendor eyes during evening hours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* 1. Dark Mode (Default) */}
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className={`p-4 rounded-2xl border text-left transition relative overflow-hidden group ${
                themeMode === "dark"
                  ? "bg-slate-900 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 text-white"
                  : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center border border-slate-800">
                  <Moon className="w-5 h-5" />
                </div>
                {themeMode === "dark" ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-navy-950">
                    Active Default
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800">
                    Default
                  </span>
                )}
              </div>
              <div className="font-black text-sm text-navy-950 dark:text-white">Dark Mode</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Deep navy & obsidian surfaces with neon emerald verified accents.
              </p>
            </button>

            {/* 2. Light Mode */}
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className={`p-4 rounded-2xl border text-left transition relative overflow-hidden group ${
                themeMode === "light"
                  ? "bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20 text-navy-950"
                  : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Sun className="w-5 h-5" />
                </div>
                {themeMode === "light" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                    Active
                  </span>
                )}
              </div>
              <div className="font-black text-sm text-navy-950 dark:text-white">Light Mode</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Crisp white cards and light slate backgrounds for bright daytime sunlight.
              </p>
            </button>

            {/* 3. System Mode (Auto OS Sync) */}
            <button
              type="button"
              onClick={() => handleThemeChange("system")}
              className={`p-4 rounded-2xl border text-left transition relative overflow-hidden group ${
                themeMode === "system"
                  ? "bg-white dark:bg-slate-900 border-sky-500 shadow-md ring-2 ring-sky-500/20 text-navy-950 dark:text-white"
                  : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-200 dark:border-sky-800">
                  <Laptop className="w-5 h-5" />
                </div>
                {themeMode === "system" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-600 text-white">
                    Auto Active
                  </span>
                )}
              </div>
              <div className="font-black text-sm text-navy-950 dark:text-white">System Mode</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Automatically adjusts to your computer or smartphone OS preference.
              </p>
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 2: Voice Soundbox Configuration */}
          <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-500" />
              <span>Voice Soundbox Hardware Simulator</span>
            </h3>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Spoken Voice Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "en", label: "English" },
                  { id: "hi", label: "हिंदी (Hindi)" },
                  { id: "kn", label: "ಕನ್ನಡ (Kannada)" },
                ].map((lng) => (
                  <button
                    key={lng.id}
                    type="button"
                    onClick={() => setLanguage(lng.id as Language)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      language === lng.id
                        ? "bg-navy-900 dark:bg-emerald-600 text-white border-navy-900 dark:border-emerald-500 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Soundbox Speaker Volume</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">{vendor.soundboxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vendor.soundboxVolume}
                onChange={(e) => updateVendor({ soundboxVolume: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-navy-950 dark:text-white block">Voice Announcements</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Speak aloud: &ldquo;Payment received. Rupees 150.&rdquo;</span>
                </div>
                <input
                  type="checkbox"
                  checked={vendor.voiceEnabled}
                  onChange={(e) => updateVendor({ voiceEnabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-navy-950 dark:text-white block">Fintech Bell Chime</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Dual-tone 880Hz harmony chime before speech</span>
                </div>
                <input
                  type="checkbox"
                  checked={vendor.chimeSound}
                  onChange={(e) => updateVendor({ chimeSound: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>
            </div>

            {/* Test Voice Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={testSoundbox}
                className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Trigger Test Announcement Now</span>
              </button>
            </div>
          </div>

          {/* Section 3: Network & Demo Lab Controls */}
          <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h3 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
              <Wifi className="w-4 h-4 text-amber-500" />
              <span>Offline Resilience & Network Environment</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Simulated Connectivity Condition
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "ONLINE", label: "Fast 4G / 5G (Normal)" },
                  { id: "SLOW", label: "Slow 3G Network (2.2s)" },
                  { id: "HIGH_LATENCY", label: "High Latency (4.5s)" },
                  { id: "OFFLINE", label: "Disconnected (Offline)" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setNetworkCondition(c.id as typeof networkCondition)}
                    className={`py-2 px-3 rounded-xl font-bold border text-left transition ${
                      networkCondition === c.id
                        ? "bg-navy-900 dark:bg-emerald-600 text-white border-navy-900 dark:border-emerald-500 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <strong>Offline Policy Rule:</strong> When disconnected, payments are queued locally and tagged as <em>OFFLINE_LOCAL_RECORD (Pending)</em>. PaySure will never indicate verified status until connectivity is restored.
            </div>

            {/* Reset Data Danger Zone */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-rose-700 dark:text-rose-400 text-xs mb-2">Reset Demo Environment</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                Clear all custom simulated transactions, orders, and fraud alerts to reload initial Ramesh Kumar demo state.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Reset all demo data and restore initial clean stall transactions?")) {
                    resetDemoData();
                  }
                }}
                className="w-full py-2.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
