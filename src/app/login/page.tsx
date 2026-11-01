"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, UserCheck, KeyRound, Sparkles } from "lucide-react";
import { usePaySure } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { vendor, updateVendor } = usePaySure();
  const [identifier, setIdentifier] = useState("ramesh.tiffin@paysure.in");
  const [password, setPassword] = useState("vendor123");
  const [loading, setLoading] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    updateVendor({
      name: "Ramesh Kumar",
      businessName: "Ramesh South Indian Tiffin & Snacks",
      phone: "+91 98450 12345",
      email: "ramesh.tiffin@paysure.in",
    });
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070e1b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-navy-950 dark:text-white tracking-tight">PaySure</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-navy-950 dark:text-white">Vendor Portal Login</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Access your verified UPI soundbox dashboard and daily ledger.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#0c1628] py-8 px-6 shadow-xl dark:shadow-black/50 rounded-2xl border border-slate-200 dark:border-slate-800 sm:px-10 transition-colors">
          {/* Quick Demo Login Pill Button */}
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>College Evaluator Quick Access</span>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
              One-click login as Ramesh Kumar (Street Food Stall #14)
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="mt-3 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserCheck className="w-4 h-4" />
              <span>1-Click Demo Login as Ramesh Kumar</span>
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#0c1628] px-2 text-slate-400 dark:text-slate-500 font-semibold">
                Or enter credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Registered Mobile or Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setResetModal(true)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-navy-900 dark:bg-emerald-600 hover:bg-navy-950 dark:hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{loading ? "Verifying..." : "Sign In to Stall"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have a vendor account?{" "}
            <Link href="/register" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Register Street Stall
            </Link>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {resetModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0c1628] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-navy-950 dark:text-white font-bold mb-2">
              <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Password Recovery</span>
            </div>
            {resetSent ? (
              <div className="text-center py-4">
                <div className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                  OTP Sent via SMS!
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  A 6-digit recovery code has been sent to +91 98450 12345.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setResetModal(false);
                  }}
                  className="mt-4 px-4 py-2 bg-navy-900 dark:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  Enter your mobile number to receive a verification OTP.
                </p>
                <input
                  type="text"
                  placeholder="+91 98450 12345"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-lg text-xs mb-3 focus:outline-hidden"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setResetModal(false)}
                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setResetSent(true)}
                    className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
