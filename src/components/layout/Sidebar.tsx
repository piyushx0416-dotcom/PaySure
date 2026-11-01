"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import {
  LayoutDashboard,
  Radio,
  ShieldCheck,
  History,
  FlaskConical,
  ShieldAlert,
  UtensilsCrossed,
  BarChart3,
  FileSpreadsheet,
  Bell,
  UserCheck,
  Settings,
  HelpCircle,
  Home,
  Volume2,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { language, vendor, notifications, fraudAlerts } = usePaySure();
  const t = translations[language];

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const activeFrauds = fraudAlerts.filter((f) => f.status === "ACTIVE").length;

  const navItems = [
    {
      label: t.nav.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: t.nav.monitor,
      href: "/monitor",
      icon: Radio,
      highlight: true,
      badge: "LIVE",
    },
    {
      label: t.nav.verify,
      href: "/verify",
      icon: ShieldCheck,
      badge: null,
    },
    {
      label: t.nav.simulation,
      href: "/simulation",
      icon: FlaskConical,
      badge: "DEMO",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      label: t.nav.transactions,
      href: "/transactions",
      icon: History,
      badge: null,
    },
    {
      label: t.nav.fraud,
      href: "/fraud",
      icon: ShieldAlert,
      badge: activeFrauds > 0 ? `${activeFrauds} Risk` : null,
      badgeColor: "bg-rose-100 text-rose-700 font-bold",
    },
    {
      label: t.nav.orders,
      href: "/orders",
      icon: UtensilsCrossed,
      badge: null,
    },
    {
      label: t.nav.analytics,
      href: "/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      label: t.nav.reports,
      href: "/reports",
      icon: FileSpreadsheet,
      badge: null,
    },
    {
      label: t.nav.notifications,
      href: "/notifications",
      icon: Bell,
      badge: unreadNotifs > 0 ? `${unreadNotifs}` : null,
      badgeColor: "bg-emerald-100 text-emerald-800 font-bold",
    },
    {
      label: t.nav.profile,
      href: "/profile",
      icon: UserCheck,
      badge: null,
    },
    {
      label: t.nav.settings,
      href: "/settings",
      icon: Settings,
      badge: null,
    },
    {
      label: t.nav.support,
      href: "/support",
      icon: HelpCircle,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#091122] border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-navy-950 dark:text-white text-lg tracking-tight flex items-center gap-1">
                PaySure
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                UPI Verification Engine
              </p>
            </div>
          </Link>
          <Link
            href="/"
            title="Go to Public Landing Page"
            className="p-1.5 text-slate-400 hover:text-navy-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>

        {/* Vendor Stall Card */}
        <div className="mx-3 my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-900 dark:bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-navy-950 dark:text-white truncate">
                {vendor.businessName}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                <span>{vendor.name}</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Stall #14</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1 font-mono text-slate-700 dark:text-slate-300">
              {vendor.upiVpa}
            </div>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Volume2 className="w-3.5 h-3.5" />
              <span>{vendor.soundboxVolume}% Vol</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-navy-900 dark:bg-emerald-600 text-white shadow-sm"
                    : item.highlight
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/50"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-navy-950 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-emerald-400 dark:text-white"
                        : item.highlight
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] tracking-wide ${
                        item.badgeColor ||
                        (isActive
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-emerald-600 text-white")
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {!isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 opacity-60" />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#070e1b] flex items-center justify-between">
          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch / Logout</span>
          </Link>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">v1.4.0 (Demo)</span>
        </div>
      </aside>
    </>
  );
};
