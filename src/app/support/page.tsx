"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import {
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  AlertTriangle,
  Wifi,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function HelpAndSupportPage() {
  const { language } = usePaySure();
  const t = translations[language];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callHelpline, setCallHelpline] = useState(false);

  const faqs = [
    {
      q: "A customer showed me a green tick screenshot on their phone, but PaySure did not announce. What should I do?",
      a: "DO NOT HAND OVER THE FOOD YET. Explain politely to the customer: 'Sir/Madam, my PaySure soundbox has not received the bank confirmation. Please wait 30 seconds.' Never trust a customer's phone screen, as fake screenshot apps (e.g. Paytm Spoof / FakePay) can fabricate green tick screens in seconds without sending any money.",
    },
    {
      q: "My mobile internet died in the evening rush. Can I still use PaySure?",
      a: "Yes. PaySure automatically enters Offline Mode. You can log orders locally. However, offline transactions are strictly marked as 'PENDING VERIFICATION'. For large takeaway orders, ask the customer for cash or wait until you connect to mobile data.",
    },
    {
      q: "A customer claims money was deducted from their bank account, but PaySure says 'Payment Failed'. Why?",
      a: "Sometimes the customer's bank initiates a temporary hold that fails NPCI settlement. The money is automatically reversed to the customer's bank account within 24 to 48 hours according to RBI guidelines. Ramesh has not received the funds, so do not deliver without payment.",
    },
    {
      q: "How do I print my daily tax or sales summary at night?",
      a: "Go to the 'Reports & Exports' page from the left sidebar and click 'Print Audit Sheet' or 'Export CSV'. It lists all verified collections with SBI account reconciliation.",
    },
    {
      q: "Can I change the voice language from English to Hindi or Kannada?",
      a: "Yes! At the top bar of any page or in the Settings page, tap 'हिंदी' or 'ಕನ್ನಡ'. The voice soundbox will immediately announce in your chosen language.",
    },
  ];

  return (
    <DashboardLayoutWrapper title={t.nav.support}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950 dark:text-white">
                Vendor Support & Field Guide
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Field guides, fraud prevention rules, and 24/7 street vendor emergency support.
            </p>
          </div>

          <button
            onClick={() => setCallHelpline(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Simulate Helpline Call (1800-PAYSURE)</span>
          </button>
        </div>

        {/* 3 Golden Security Rules for Food Stall Vendors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 dark:text-white text-sm">Rule 1: No Sound = No Food</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              If the PaySure Voice Soundbox does not announce the exact amount, the transaction has not cleared. Do not rely on customer screens.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 dark:text-white text-sm">Rule 2: Check Offline Warning</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              When the yellow Offline banner appears, the stall network is down. Wait for reconnection before verifying large ₹500+ party orders.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1628] border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-950 dark:text-white text-sm">Rule 3: Match the Amount</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Ensure the spoken amount matches the order. If the customer ordered ₹150 of Dosas, verify the soundbox says &ldquo;Rupees 150&rdquo;, not ₹15.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white dark:bg-[#0c1628] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <h3 className="font-bold text-navy-950 dark:text-white text-sm mb-4 flex items-center gap-2">
            <FileQuestion className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Street Vendor Operational FAQs</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-bold text-navy-950 dark:text-white bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white dark:bg-[#0c1628] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Toll-free simulated helpline modal */}
        {callHelpline && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0c1628] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-in zoom-in-95">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-navy-950 dark:text-white text-base">Calling PaySure Helpline...</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">1800-729-7873 (Toll Free)</p>
              <div className="my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                &ldquo;Namaste Ramesh ji! Welcome to PaySure Vendor Care. All systems operational. Your last verified settlement was ₹150 at 06:12 PM.&rdquo;
              </div>
              <button
                onClick={() => setCallHelpline(false)}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs"
              >
                End Call
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayoutWrapper>
  );
}
