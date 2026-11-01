"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePaySure } from "@/lib/store";
import { Language } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const { updateVendor, setLanguage } = usePaySure();

  const [form, setForm] = useState({
    fullName: "Ramesh Kumar",
    businessName: "Ramesh South Indian Tiffin & Snacks",
    mobile: "9845012345",
    email: "ramesh.tiffin@paysure.in",
    password: "securePassword123",
    businessCategory: "Street Food & Fast Bites",
    preferredLanguage: "en" as Language,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      updateVendor({
        name: form.fullName,
        businessName: form.businessName,
        phone: `+91 ${form.mobile}`,
        email: form.email,
        category: form.businessCategory,
        preferredLanguage: form.preferredLanguage,
      });
      setLanguage(form.preferredLanguage);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 600);
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
        <h2 className="mt-4 text-2xl font-bold text-navy-950 dark:text-white">Register New Street Vendor</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Set up your digital UPI soundbox and start verifying transactions instantly.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white dark:bg-[#0c1628] py-8 px-6 shadow-xl dark:shadow-black/50 rounded-2xl border border-slate-200 dark:border-slate-800 sm:px-10 transition-colors">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">Registration Complete!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Setting up Ramesh Kumar&apos;s stall soundbox profile and loading dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Vendor Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Business / Stall Name</label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Number (10 Digits)</label>
                  <div className="mt-1 flex rounded-lg shadow-xs">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      pattern="[6-9][0-9]{9}"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-r-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Business Category</label>
                  <select
                    value={form.businessCategory}
                    onChange={(e) => setForm({ ...form, businessCategory: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white dark:bg-slate-900"
                  >
                    <option value="Street Food & Fast Bites">Street Food & Fast Bites</option>
                    <option value="Tea & Snacks Stall">Tea & Snacks Stall</option>
                    <option value="Fresh Fruit & Juices">Fresh Fruit & Juices</option>
                    <option value="Bakery & Sweets">Bakery & Sweets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Soundbox Language</label>
                  <select
                    value={form.preferredLanguage}
                    onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value as Language })}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white dark:bg-slate-900"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Create Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-navy-950 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{loading ? "Activating Stall..." : "Register Stall & Launch Soundbox"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            Already registered with PaySure?{" "}
            <Link href="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Vendor Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
