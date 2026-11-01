"use client";

import React, { useState } from "react";
import { DashboardLayoutWrapper } from "@/components/layout/DashboardLayoutWrapper";
import { usePaySure } from "@/lib/store";
import { translations } from "@/lib/translations";
import { formatINR, formatTime } from "@/lib/utils";
import { exportOrdersToCSV } from "@/lib/exportUtils";
import { OrderItem, OrderStatus } from "@/lib/types";
import {
  UtensilsCrossed,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Link as LinkIcon,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const STALL_MENU = [
  { name: "Special Masala Dosa", price: 60 },
  { name: "Ghee Podi Roast", price: 80 },
  { name: "Rava Idli (2 pcs)", price: 50 },
  { name: "Medu Vada (1 pc)", price: 30 },
  { name: "Filter Coffee", price: 30 },
  { name: "Ginger Tea", price: 15 },
  { name: "Mysore Pak (2 pcs)", price: 40 },
  { name: "Kesar Badam Milk", price: 30 },
];

export default function OrderManagementPage() {
  const {
    orders,
    createOrder,
    updateOrderStatus,
    linkPaymentToOrder,
    transactions,
    language,
    triggerSimulation,
  } = usePaySure();

  const t = translations[language];

  // New order builder state
  const [cart, setCart] = useState<{ [name: string]: number }>({});
  const [customerName, setCustomerName] = useState("");
  const [tableOrToken, setTableOrToken] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Cart helpers
  const addItem = (name: string) => {
    setCart((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const removeItem = (name: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[name] > 1) {
        next[name] -= 1;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const cartItems: OrderItem[] = Object.entries(cart).map(([name, qty]) => {
    const itemDef = STALL_MENU.find((m) => m.name === name);
    return {
      name,
      quantity: qty,
      price: itemDef ? itemDef.price : 50,
    };
  });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    createOrder({
      items: cartItems,
      totalAmount: cartTotal,
      paymentStatus: "PENDING",
      orderStatus: "PENDING",
      customerName: customerName || "Counter Walk-in",
      tableOrToken: tableOrToken || `Token #${Math.floor(10 + Math.random() * 90)}`,
    });

    // Reset form
    setCart({});
    setCustomerName("");
    setTableOrToken("");
    setIsCreating(false);
  };

  // Quick pay and settle for this order
  const handleQuickPayForOrder = async (orderId: string, amount: number) => {
    const txn = await triggerSimulation({
      amount,
      status: "SUCCESSFUL",
      orderId,
      payerName: "Order Customer",
    });
    linkPaymentToOrder(orderId, txn.id);
  };

  return (
    <DashboardLayoutWrapper title={t.nav.orders}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-navy-950">
                {t.ordersSection.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.ordersSection.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportOrdersToCSV(orders)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Orders CSV</span>
            </button>

            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.actions.newOrder}</span>
            </button>
          </div>
        </div>

        {/* Live Orders List & Quick POS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Orders List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-navy-950 text-sm flex items-center justify-between">
              <span>Current Stall Orders ({orders.length})</span>
              <span className="text-xs text-slate-500 font-normal">Auto-links to matching UPI credits</span>
            </h3>

            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-navy-950 text-base">
                      #{ord.orderNumber}
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">
                      {ord.customerName}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {ord.tableOrToken}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ord.paymentStatus === "SUCCESSFUL"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : ord.paymentStatus === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {ord.paymentStatus === "SUCCESSFUL" ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>Payment: {ord.paymentStatus}</span>
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ord.orderStatus === "SERVED"
                          ? "bg-navy-900 text-white"
                          : ord.orderStatus === "PREPARING"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Order: {ord.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="py-3 text-xs space-y-1">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span>
                        {it.quantity}x {it.name}
                      </span>
                      <span className="font-semibold">{formatINR(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Amount</span>
                    <span className="text-lg font-black text-navy-950">{formatINR(ord.totalAmount)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {ord.paymentStatus === "PENDING" && (
                      <button
                        onClick={() => handleQuickPayForOrder(ord.id, ord.totalAmount)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simulate Customer Pay</span>
                      </button>
                    )}

                    {ord.orderStatus !== "SERVED" ? (
                      <button
                        onClick={() => updateOrderStatus(ord.id, "SERVED")}
                        className="px-3 py-1.5 bg-navy-900 hover:bg-navy-950 text-white rounded-lg text-xs font-semibold transition"
                      >
                        {t.ordersSection.markServed}
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Served & Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Counter POS Menu (Fast Tapping) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-fit sticky top-20">
            <h3 className="font-bold text-navy-950 text-sm mb-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Tap Stall Menu to Build Order</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">One-tap items for Ramesh Kumar&apos;s tiffin stall</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {STALL_MENU.map((item) => (
                <button
                  key={item.name}
                  onClick={() => addItem(item.name)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition"
                >
                  <div className="text-xs font-bold text-navy-950 truncate">{item.name}</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-0.5">₹{item.price}</div>
                </button>
              ))}
            </div>

            {/* Current Draft Cart */}
            <div className="pt-3 border-t border-slate-200 text-xs">
              <div className="font-bold text-navy-950 mb-2 flex justify-between">
                <span>Selected Items ({cartItems.length})</span>
                <span className="text-emerald-700">{formatINR(cartTotal)}</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-slate-400 text-center py-4 text-[11px]">
                  No items selected yet. Tap any dish above.
                </div>
              ) : (
                <div className="space-y-1.5 mb-4 max-h-36 overflow-y-auto">
                  {cartItems.map((ci) => (
                    <div key={ci.name} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                      <span className="truncate pr-2">{ci.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(ci.name)}
                          className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-bold">{ci.quantity}</span>
                        <button
                          onClick={() => addItem(ci.name)}
                          className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
                >
                  Create Order & Await UPI ({formatINR(cartTotal)})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
