"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Language } from "@/lib/types";
import {
  Settings,
  Volume2,
  Globe,
  Wifi,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function SettingsPage() {
  const {
    vendor,
    updateVendor,
    language,
    setLanguage,
    resetDemoData,
    testSoundbox,
    networkCondition,
    setNetworkCondition,
  } = usePaySure();

  const t = translations[language];
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  return (
    <DashboardLayoutWrapper title={t.nav.settings}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-navy-100 text-navy-900 rounded-xl">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                Stall & Soundbox Settings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure voice announcement volume, language preferences, offline policies, and hardware chimes.
            </p>
          </div>

          {savedBanner && (
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Settings Saved</span>
            </div>
          )}
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Voice Soundbox Configuration */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Voice Soundbox Hardware Simulator</span>
            </h3>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                        ? "bg-navy-900 text-white border-navy-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
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
                <span className="font-bold text-slate-700">Soundbox Speaker Volume</span>
                <span className="font-black text-emerald-700">{vendor.soundboxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vendor.soundboxVolume}
                onChange={(e) => updateVendor({ soundboxVolume: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-3 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-navy-950 block">Voice Announcements</span>
                  <span className="text-slate-500 text-[11px]">Speak aloud: &ldquo;Payment received. Rupees 150.&rdquo;</span>
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
                  <span className="font-bold text-navy-950 block">Fintech Bell Chime</span>
                  <span className="text-slate-500 text-[11px]">Dual-tone 880Hz harmony chime before speech</span>
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
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={testSoundbox}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Trigger Test Announcement Now</span>
              </button>
            </div>
          </div>

          {/* Section 2: Network & Demo Lab Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
              <Wifi className="w-4 h-4 text-amber-500" />
              <span>Offline Resilience & Network Environment</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                        ? "bg-navy-900 text-white border-navy-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong>Offline Policy Rule:</strong> When disconnected, payments are queued locally and tagged as <em>OFFLINE_LOCAL_RECORD (Pending)</em>. PaySure will never indicate verified status until connectivity is restored.
            </div>

            {/* Reset Data Danger Zone */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-rose-700 text-xs mb-2">Reset Demo Environment</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Clear all custom simulated transactions, orders, and fraud alerts to reload initial Ramesh Kumar demo state.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Reset all demo data and restore initial clean stall transactions?")) {
                    resetDemoData();
                  }
                }}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
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
