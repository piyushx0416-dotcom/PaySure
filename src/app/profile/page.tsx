"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  UserCheck,
  QrCode,
  Download,
  Building,
  Phone,
  Mail,
  CreditCard,
  CheckCircle2,
  Save,
  Volume2,
} from "lucide-react";

export default function VendorProfilePage() {
  const { vendor, updateVendor, language } = usePaySure();
  const t = translations[language];

  const [form, setForm] = useState({
    name: vendor.name,
    businessName: vendor.businessName,
    phone: vendor.phone,
    email: vendor.email,
    category: vendor.category,
    upiVpa: vendor.upiVpa,
    dailyRevenueGoal: vendor.dailyRevenueGoal,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendor(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayoutWrapper title={t.nav.profile}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 rounded-xl">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950 dark:text-white">
                Stall & Merchant Profile
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Registered credentials, banking settlement account, and official stall QR code.
            </p>
          </div>

          {saved && (
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Profile Updated Successfully</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stall QR Code Card */}
          <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center text-center justify-between transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Official UPI Merchant QR
              </span>

              <h3 className="font-black text-navy-950 dark:text-white text-base mt-3">
                {vendor.businessName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{vendor.upiVpa}</p>

              {/* Simulated QR Code Graphic */}
              <div className="my-6 p-4 bg-white rounded-2xl border-2 border-dashed border-emerald-500 shadow-md inline-block">
                <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white relative">
                  <QrCode className="w-36 h-36 text-white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-navy-950 font-black text-xs shadow-md">
                      ₹
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                Scan with any app: GPay, PhonePe, Paytm, BHIM, CRED
              </div>
            </div>

            <button
              onClick={() => alert("QR Code download initiated for stall printing.")}
              className="mt-4 w-full py-2.5 px-4 bg-navy-900 dark:bg-emerald-600 hover:bg-navy-950 dark:hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>Download Printable QR Standee</span>
            </button>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            <h3 className="font-bold text-navy-950 dark:text-white text-sm mb-4">
              Merchant Information & Settlement Account
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stall Name</label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Registered Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Stall Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-white rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Merchant UPI VPA</label>
                  <input
                    type="text"
                    value={form.upiVpa}
                    onChange={(e) => setForm({ ...form, upiVpa: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-navy-950 dark:text-emerald-400 font-mono font-bold rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Settlement Bank Details (Read-only security) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2">
                  Authoritative Settlement Account (NPCI Direct Credit)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Bank & Account Number</span>
                    <span className="font-bold text-navy-950 dark:text-white">{vendor.bankAccount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px]">IFSC Code</span>
                    <span className="font-mono font-bold text-navy-950 dark:text-white">{vendor.bankIfsc}</span>
                  </div>
                </div>
              </div>

              {/* Daily Revenue Target Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Daily Revenue Target</label>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">
                    {formatINR(form.dailyRevenueGoal)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={form.dailyRevenueGoal}
                  onChange={(e) => setForm({ ...form, dailyRevenueGoal: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow transition flex items-center gap-1.5 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Merchant Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
