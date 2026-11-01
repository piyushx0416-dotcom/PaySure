"use client";

import React from "react";
import { usePaySure } from "@/lib/store";
import { NetworkCondition, Language } from "@/lib/types";
import { Wifi, WifiOff, Globe, RotateCcw, Volume2, ShieldCheck } from "lucide-react";

export const DemoBanner: React.FC = () => {
  const {
    networkCondition,
    setNetworkCondition,
    language,
    setLanguage,
    resetDemoData,
    testSoundbox,
  } = usePaySure();

  return (
    <div className="bg-navy-900 text-white text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-navy-800">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          DEMO SIMULATION ACTIVE
        </span>
        <span className="hidden sm:inline text-slate-300">
          Design Thinking Project for Indian Street-Food Vendors
        </span>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Network Switcher */}
        <div className="flex items-center gap-1.5 bg-navy-800/80 px-2 py-1 rounded border border-navy-700">
          {networkCondition === "OFFLINE" ? (
            <WifiOff className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          ) : (
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span className="text-slate-400 hidden xs:inline">Network:</span>
          <select
            value={networkCondition}
            onChange={(e) => setNetworkCondition(e.target.value as NetworkCondition)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="ONLINE" className="bg-navy-900 text-white">Online (Fast)</option>
            <option value="SLOW" className="bg-navy-900 text-white">Slow 3G (2.2s)</option>
            <option value="HIGH_LATENCY" className="bg-navy-900 text-white">High Latency (4.5s)</option>
            <option value="OFFLINE" className="bg-navy-900 text-rose-300">Offline (Simulate Outage)</option>
          </select>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-navy-800/80 px-2 py-1 rounded border border-navy-700">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-navy-900 text-white">English</option>
            <option value="hi" className="bg-navy-900 text-white">हिंदी (Hindi)</option>
            <option value="kn" className="bg-navy-900 text-white">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>

        {/* Soundbox Test */}
        <button
          onClick={testSoundbox}
          title="Test Voice Soundbox Chime & Speech"
          className="flex items-center gap-1 px-2 py-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 transition"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Test Soundbox</span>
        </button>

        {/* Reset Demo Data */}
        <button
          onClick={() => {
            if (confirm("Reset demo transactions and reload initial stall data?")) {
              resetDemoData();
            }
          }}
          className="flex items-center gap-1 px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800/40 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
