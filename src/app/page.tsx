"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Volume2,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Wifi,
  Sparkles,
  Zap,
  Play,
  HelpCircle,
  TrendingUp,
  FileText,
  Lock,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import { audioEngine } from "@/lib/audio";
import { translations } from "@/lib/translations";
import { usePaySure } from "@/lib/store";

export default function LandingPage() {
  const { language, themeMode, setThemeMode } = usePaySure();
  const t = translations[language];
  const [testAmount, setTestAmount] = useState(150);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const handleTestSoundbox = () => {
    setIsPlayingDemo(true);
    audioEngine.playChime("SUCCESS");
    setTimeout(() => {
      audioEngine.speak(t.voice.success(testAmount), language);
      setIsPlayingDemo(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070e1b] text-navy-950 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Navigation */}
      <nav className="border-b border-slate-100 dark:border-slate-800/80 bg-white/90 dark:bg-[#070e1b]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-navy-950 dark:text-white text-xl tracking-tight leading-none">
                PaySure
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                Fintech Security
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#problem" className="hover:text-navy-950 dark:hover:text-white transition">The Problem</a>
            <a href="#workflow" className="hover:text-navy-950 dark:hover:text-white transition">How It Works</a>
            <a href="#features" className="hover:text-navy-950 dark:hover:text-white transition">Features</a>
            <a href="#soundbox" className="hover:text-navy-950 dark:hover:text-white transition">Voice Soundbox</a>
            <a href="#faq" className="hover:text-navy-950 dark:hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <button
                onClick={() => setThemeMode("dark")}
                title="Dark Mode (Default)"
                className={`p-1.5 rounded-md transition ${themeMode === "dark" ? "bg-navy-950 text-emerald-400 shadow-xs border border-emerald-500/30" : "text-slate-500 hover:text-slate-300"}`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode("light")}
                title="Light Mode"
                className={`p-1.5 rounded-md transition ${themeMode === "light" ? "bg-white text-navy-950 shadow-xs" : "text-slate-500 hover:text-slate-300"}`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Vendor Login
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 bg-navy-900 dark:bg-emerald-600 hover:bg-navy-950 dark:hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition"
            >
              <span>Explore Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#070e1b] dark:via-[#0c1628] dark:to-[#070e1b] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Smart UPI Verification & Soundbox Platform for Street Vendors</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-black text-navy-950 dark:text-white tracking-tight leading-[1.15]">
              Never Miss a Payment.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300">
                Never Trust a Screenshot.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Verify UPI payments, receive instant voice alerts and manage your daily transactions from one simple dashboard — built specifically for busy street food vendors in India.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Get Started with PaySure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/simulation"
                className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-navy-950 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm sm:text-base shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Launch Simulation Lab</span>
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-black text-navy-950 dark:text-white">0.8s</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Instant Voice Alert</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fake Screenshot Rejection</div>
              </div>
              <div>
                <div className="text-2xl font-black text-navy-950 dark:text-white">3 Languages</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">English, Hindi & Kannada</div>
              </div>
              <div>
                <div className="text-2xl font-black text-navy-950 dark:text-white">Offline-Ready</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Local Cache & Auto Sync</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Soundbox Demo Card Section */}
      <section id="soundbox" className="py-16 bg-navy-950 dark:bg-[#050b16] text-white relative border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 dark:from-[#0c1628] dark:to-[#101d36] rounded-3xl p-6 sm:p-10 border border-navy-700 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Real Hardware Soundbox Simulator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Hear the Sound of Verified Trust
                </h2>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  Street food stalls are loud. Ramesh cannot unlock his phone 200 times an evening with flour on his hands. PaySure speaks in his native tongue the moment NPCI clears the funds.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400">Select Amount:</span>
                  {[30, 70, 150, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTestAmount(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                        testAmount === amt
                          ? "bg-emerald-500 text-navy-950 border-emerald-400"
                          : "bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleTestSoundbox}
                    disabled={isPlayingDemo}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-navy-950 font-black rounded-xl text-sm shadow transition flex items-center gap-2 active:scale-98"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Test Voice Announcement</span>
                  </button>
                  <Link
                    href="/monitor"
                    className="px-4 py-3 bg-navy-800 hover:bg-navy-700 text-white rounded-xl text-xs font-bold border border-navy-700 transition"
                  >
                    Open Kiosk Monitor
                  </Link>
                </div>
              </div>

              {/* Visual Soundbox Speaker */}
              <div className="flex flex-col items-center justify-center p-6 bg-navy-950/80 rounded-2xl border border-navy-700/60 text-center">
                <div className="relative">
                  <div className={`w-28 h-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center ${isPlayingDemo ? "animate-pulse" : ""}`}>
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                      <Volume2 className="w-10 h-10" />
                    </div>
                  </div>
                  {isPlayingDemo && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-50" />
                  )}
                </div>

                <div className="mt-4 font-mono font-bold text-emerald-400 text-lg">
                  &ldquo;{t.voice.success(testAmount)}&rdquo;
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Multilingual Web Audio API + Speech Synthesis Queue
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-slate-50 dark:bg-[#070e1b] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Real-World Street Friction
            </h2>
            <h3 className="text-3xl font-black text-navy-950 dark:text-white mt-1">
              Why Indian Street Vendors Lose ₹1,500+ Weekly
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              India&apos;s 10+ million micro-merchants face relentless pain points accepting digital payments at peak hours.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-rose-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Fake Payment APKs & Screenshots</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Fraudulent customers show fake green tick screenshots created with apps like &ldquo;SpoofPay&rdquo;. Vendors glance, trust the customer, and lose food and money.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Delayed Bank SMS & Dead Zones</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Bank telecom SMS often delays by 5-10 minutes. During evening crowds, vendors cannot ask paying customers to wait indefinitely on the roadside.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Crowded Stall Digital Chaos</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Swapping between Google Pay, Paytm, and PhonePe history cards with oily hands slows down order service and causes duplicate transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Verified Workflow */}
      <section id="workflow" className="py-20 bg-white dark:bg-[#091122] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Verification Engine Architecture
            </h2>
            <h3 className="text-3xl font-black text-navy-950 dark:text-white mt-1">
              How PaySure Verifies Every Rupee
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              We eliminate screenshot dependence through authoritative settlement tunnels.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-navy-900 dark:bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-sm">Customer Makes Payment</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Customer scans stall QR via PhonePe, GPay, Paytm, CRED or BHIM and enters PIN.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-navy-900 dark:bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-sm">Authorized Provider Confirms</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Banking switch (NPCI / PSP node) transmits cryptographic settlement packet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-bold text-navy-950 dark:text-white text-sm">PaySure Verifies Status</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Idempotency check runs, UTR replay is audited, and authoritative status is locked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center mb-4">
                4
              </div>
              <h4 className="font-bold text-emerald-950 dark:text-emerald-300 text-sm">Vendor Receives Confirmation</h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-2">
                Loud voice soundbox announces in Ramesh&apos;s language: &ldquo;Payment received. ₹150.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-[#070e1b] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Complete Feature Suite
            </h2>
            <h3 className="text-3xl font-black text-navy-950 dark:text-white mt-1">
              Engineered for Real Street Food Operations
            </h3>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition">
              <Volume2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Multilingual Soundbox</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                English, Hindi, and Kannada voice announcements with Web Audio API chime synthesis. Loud and crystal clear.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition">
              <Lock className="w-6 h-6 text-navy-900 dark:text-emerald-400 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Idempotency & Replay Shield</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Prevents duplicate redemption of previously paid UTRs or screenshot recycling between friends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-500/50 transition">
              <Wifi className="w-6 h-6 text-amber-500 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Offline Local Ledger</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                When mobile data drops, orders are cached locally and marked PENDING. Never falsely marks offline as verified.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-teal-500/50 transition">
              <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Dynamic Daily Analytics</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Track today&apos;s verified revenue, peak tea & snack hours, average order value, and bank reconciliation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">Interactive Simulation Lab</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                8 one-click presets to simulate delayed payments, fake screenshots, network drops, and rapid orders for demonstration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="font-bold text-navy-950 dark:text-white text-base">CSV & Printable Receipts</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Export daily tax reports, customer transaction slips, and reconciliation ledgers with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-[#091122] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Got Questions?
            </h2>
            <h3 className="text-3xl font-black text-navy-950 dark:text-white mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="mt-10 space-y-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Does PaySure verify the payment from customer screenshots?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 pl-6 leading-relaxed">
                No. Never. PaySure completely ignores customer screenshots because they can be forged with prank apps. PaySure only confirms payments when an authoritative settlement notification arrives directly from the banking switch / payment provider.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                What happens when the vendor&apos;s internet disconnects?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 pl-6 leading-relaxed">
                PaySure transitions seamlessly into Offline Mode. Transactions can still be logged locally, but they are clearly marked as &ldquo;OFFLINE PENDING&rdquo;. PaySure never marks an offline transaction as verified until connectivity restores and the banking switch confirms it.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-navy-950 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Can Ramesh use this without technical computer skills?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 pl-6 leading-relaxed">
                Yes! The entire interface is mobile-first, features giant high-contrast buttons, supports Hindi and Kannada, and operates hands-free via loud voice announcements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-[#050b16] text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">PaySure</span>
            <span>— Every Payment. Verified. Every Time.</span>
          </div>
          <div className="text-slate-400">
            Design Thinking College Project • Built for Indian Micro-Vendors • Demo Mode Active
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-emerald-400 hover:underline font-semibold">
              Live Dashboard
            </Link>
            <Link href="/simulation" className="text-amber-400 hover:underline font-semibold">
              Simulation Lab
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
