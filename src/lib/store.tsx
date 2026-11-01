"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  Transaction,
  Order,
  FraudAlert,
  NotificationItem,
  VendorProfile,
  Language,
  NetworkCondition,
  DashboardSummary,
  TransactionStatus,
  PaymentSource,
  TransactionStepLog,
} from "./types";
import {
  initialVendorProfile,
  initialTransactions,
  initialOrders,
  initialFraudAlerts,
  initialNotifications,
} from "./mockData";
import { runVerificationPipeline, generateUtr } from "./verificationEngine";
import { audioEngine } from "./audio";
import { translations } from "./translations";

interface SimulationPayload {
  amount: number;
  status: TransactionStatus;
  source?: PaymentSource;
  utr?: string;
  payerName?: string;
  payerVpa?: string;
  orderId?: string;
  isFakeScreenshotAttempt?: boolean;
  reportedAmountMismatch?: boolean;
  notes?: string;
}

interface PaySureContextType {
  vendor: VendorProfile;
  updateVendor: (updates: Partial<VendorProfile>) => void;
  transactions: Transaction[];
  orders: Order[];
  fraudAlerts: FraudAlert[];
  notifications: NotificationItem[];
  language: Language;
  setLanguage: (lang: Language) => void;
  networkCondition: NetworkCondition;
  setNetworkCondition: (cond: NetworkCondition) => void;
  offlineQueue: Transaction[];
  summary: DashboardSummary;
  recentLogs: TransactionStepLog[];
  activeAlertModal: Transaction | null;
  setActiveAlertModal: (txn: Transaction | null) => void;
  
  // Actions
  triggerSimulation: (payload: SimulationPayload) => Promise<Transaction>;
  verifyManualUtr: (utr: string, amount: number) => Promise<{ transaction?: Transaction; valid: boolean; message: string }>;
  createOrder: (order: Omit<Order, "id" | "timestamp" | "orderNumber">) => Order;
  updateOrderStatus: (orderId: string, status: Order["orderStatus"]) => void;
  linkPaymentToOrder: (orderId: string, transactionId: string) => void;
  resolveFraudAlert: (alertId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetDemoData: () => void;
  testSoundbox: () => void;
  syncOfflineQueue: () => void;
}

const PaySureContext = createContext<PaySureContextType | undefined>(undefined);

const STORAGE_KEY = "paysure_demo_state_v1";

export const PaySureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendor, setVendor] = useState<VendorProfile>(initialVendorProfile);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>(initialFraudAlerts);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [language, setLanguageState] = useState<Language>("en");
  const [networkCondition, setNetworkConditionState] = useState<NetworkCondition>("ONLINE");
  const [offlineQueue, setOfflineQueue] = useState<Transaction[]>([]);
  const [recentLogs, setRecentLogs] = useState<TransactionStepLog[]>([]);
  const [activeAlertModal, setActiveAlertModal] = useState<Transaction | null>(null);

  // Sync state with localStorage for persistence across reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.vendor) setVendor(parsed.vendor);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.fraudAlerts) setFraudAlerts(parsed.fraudAlerts);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.language) setLanguageState(parsed.language);
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          vendor,
          transactions,
          orders,
          fraudAlerts,
          notifications,
          language,
        })
      );
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [vendor, transactions, orders, fraudAlerts, notifications, language]);

  useEffect(() => {
    saveToStorage();
  }, [saveToStorage]);

  // Audio setup updates
  useEffect(() => {
    audioEngine.setVolume(vendor.soundboxVolume);
    audioEngine.setMuted(!vendor.voiceEnabled);
  }, [vendor.soundboxVolume, vendor.voiceEnabled]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setVendor((prev) => ({ ...prev, preferredLanguage: lang }));
  };

  const updateVendor = (updates: Partial<VendorProfile>) => {
    setVendor((prev) => ({ ...prev, ...updates }));
  };

  // Dynamic Dashboard Summary
  const summary: DashboardSummary = useMemo(() => {
    const today = new Date().toDateString();

    const todayTxns = transactions.filter(
      (t) => new Date(t.timestamp).toDateString() === today
    );

    const successful = todayTxns.filter((t) => t.status === "SUCCESSFUL");
    const pending = todayTxns.filter((t) => t.status === "PENDING");
    const failed = todayTxns.filter((t) => t.status === "FAILED");

    const todayVerifiedRevenue = successful.reduce((sum, t) => sum + t.amount, 0);
    const successfulTransactionsCount = successful.length;
    const pendingTransactionsCount = pending.length;
    const failedTransactionsCount = failed.length;
    const totalOrdersCount = orders.length;

    const averageTransactionValue =
      successfulTransactionsCount > 0
        ? Math.round(todayVerifiedRevenue / successfulTransactionsCount)
        : 0;

    const unresolvedFraudAlertsCount = fraudAlerts.filter(
      (a) => a.status === "ACTIVE"
    ).length;

    return {
      todayVerifiedRevenue,
      successfulTransactionsCount,
      pendingTransactionsCount,
      failedTransactionsCount,
      totalOrdersCount,
      averageTransactionValue,
      unresolvedFraudAlertsCount,
    };
  }, [transactions, orders, fraudAlerts]);

  // Play voice soundbox announcement
  const announcePayment = useCallback(
    (txn: Transaction, isAlert = false) => {
      if (!vendor.voiceEnabled) return;

      const t = translations[language];

      if (vendor.chimeSound) {
        if (isAlert) {
          audioEngine.playChime("ALERT");
        } else if (txn.status === "SUCCESSFUL") {
          audioEngine.playChime("SUCCESS");
        } else if (txn.status === "PENDING") {
          audioEngine.playChime("PENDING");
        } else {
          audioEngine.playChime("FAILED");
        }
      }

      if (vendor.autoAnnounce) {
        setTimeout(() => {
          let text = "";
          if (isAlert) {
            text = t.voice.fakeAlert();
          } else if (networkCondition === "OFFLINE") {
            text = t.voice.offlineAlert();
          } else if (txn.status === "SUCCESSFUL") {
            text = t.voice.success(txn.amount);
          } else if (txn.status === "PENDING") {
            text = t.voice.pending();
          } else {
            text = t.voice.failed();
          }
          audioEngine.speak(text, language);
        }, 350);
      }
    },
    [vendor.voiceEnabled, vendor.chimeSound, vendor.autoAnnounce, language, networkCondition]
  );

  // Trigger Payment Simulation Pipeline
  const triggerSimulation = useCallback(
    async (payload: SimulationPayload): Promise<Transaction> => {
      // Simulate network latency if configured
      if (networkCondition === "SLOW") {
        await new Promise((r) => setTimeout(r, 2200));
      } else if (networkCondition === "HIGH_LATENCY") {
        await new Promise((r) => setTimeout(r, 4500));
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }

      const result = runVerificationPipeline({
        amount: payload.amount,
        status: payload.status,
        source: payload.source,
        utr: payload.utr,
        payerName: payload.payerName,
        payerVpa: payload.payerVpa,
        orderId: payload.orderId,
        networkCondition,
        existingTransactions: transactions,
        isFakeScreenshotAttempt: payload.isFakeScreenshotAttempt,
        reportedAmountMismatch: payload.reportedAmountMismatch,
      });

      const { transaction, logs, fraudAlert } = result;

      // Update state
      setRecentLogs(logs);
      setTransactions((prev) => [transaction, ...prev]);

      // If offline, queue for later sync
      if (networkCondition === "OFFLINE") {
        setOfflineQueue((prev) => [...prev, transaction]);
      }

      // If fraud alert generated
      if (fraudAlert) {
        setFraudAlerts((prev) => [fraudAlert, ...prev]);
        setNotifications((prev) => [
          {
            id: `NOTIF-${Date.now()}`,
            title: `High Risk Fraud Alert!`,
            message: `${fraudAlert.reason} (Ref: ${fraudAlert.utr})`,
            type: "FRAUD",
            timestamp: new Date().toISOString(),
            read: false,
          },
          ...prev,
        ]);
      }

      // Link to order if specified or find open pending order with matching amount
      if (payload.orderId) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === payload.orderId
              ? {
                  ...o,
                  paymentStatus: transaction.status,
                  transactionId: transaction.id,
                  orderStatus: transaction.status === "SUCCESSFUL" ? "SERVED" : o.orderStatus,
                }
              : o
          )
        );
      } else if (transaction.status === "SUCCESSFUL") {
        // Auto-match first pending order with exact or approximate amount
        setOrders((prev) => {
          let matched = false;
          return prev.map((o) => {
            if (!matched && o.paymentStatus === "PENDING" && o.totalAmount === transaction.amount) {
              matched = true;
              return {
                ...o,
                paymentStatus: "SUCCESSFUL",
                transactionId: transaction.id,
                orderStatus: "SERVED",
              };
            }
            return o;
          });
        });
      }

      // Create notification
      const notifType =
        transaction.status === "SUCCESSFUL"
          ? "SUCCESS"
          : transaction.status === "PENDING"
          ? "PENDING"
          : "FAILED";

      setNotifications((prev) => [
        {
          id: `NOTIF-${Date.now()}`,
          title: `Payment ${transaction.status}: ₹${transaction.amount}`,
          message:
            transaction.status === "SUCCESSFUL"
              ? `Verified credit from ${transaction.payerName} via ${transaction.source}. UTR: ${transaction.utr}`
              : `Payment of ₹${transaction.amount} is currently ${transaction.status.toLowerCase()}.`,
          type: notifType,
          timestamp: new Date().toISOString(),
          read: false,
          amount: transaction.amount,
          transactionId: transaction.id,
        },
        ...prev,
      ]);

      // Trigger audio & voice
      announcePayment(transaction, Boolean(fraudAlert));

      // Trigger alert modal popup for live counter display
      setActiveAlertModal(transaction);

      return transaction;
    },
    [networkCondition, transactions, announcePayment]
  );

  // Sync Offline Queue when network restores
  const syncOfflineQueue = useCallback(() => {
    if (offlineQueue.length === 0) return;

    setTransactions((prev) =>
      prev.map((t) => {
        const inQueue = offlineQueue.find((q) => q.id === t.id);
        if (inQueue) {
          return {
            ...t,
            status: "SUCCESSFUL",
            verificationStatus: "SUCCESSFUL",
            verificationSource: "AUTHORITATIVE_PROVIDER_API",
            notes: "Synchronized & verified post-network restoration.",
            isOfflineSynced: true,
          };
        }
        return t;
      })
    );

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Network Restored & Synced",
        message: `Successfully synchronized ${offlineQueue.length} offline payments with NPCI network.`,
        type: "SYSTEM",
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);

    audioEngine.playChime("SUCCESS");
    audioEngine.speak(
      language === "hi"
        ? "इंटरनेट बहाल हो गया है। ऑफ़लाइन भुगतान सत्यापित हो गए हैं।"
        : language === "kn"
        ? "ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಪುನಃ ಸ್ಥಾಪಿಸಲಾಗಿದೆ. ಆಫ್‌ಲೈನ್ ಪಾವತಿಗಳು ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿವೆ."
        : "Network restored. Offline payments have been authoritatively verified.",
      language
    );

    setOfflineQueue([]);
  }, [offlineQueue, language]);

  const setNetworkCondition = (cond: NetworkCondition) => {
    const wasOffline = networkCondition === "OFFLINE";
    setNetworkConditionState(cond);

    if (wasOffline && cond !== "OFFLINE") {
      syncOfflineQueue();
    }
  };

  // Manual UTR Verification
  const verifyManualUtr = async (utr: string, amount: number) => {
    const cleanUtr = utr.trim();
    if (!cleanUtr || cleanUtr.length < 10) {
      return { valid: false, message: "Please enter a valid 12-digit UPI UTR number." };
    }

    const existing = transactions.find((t) => t.utr === cleanUtr);
    if (existing) {
      return {
        valid: true,
        transaction: existing,
        message: `Found record: ₹${existing.amount} (${existing.status}) verified at ${new Date(
          existing.timestamp
        ).toLocaleTimeString()}`,
      };
    }

    // In demo mode, if not found, we can query simulated banking node
    const simulated = await triggerSimulation({
      amount: amount > 0 ? amount : 150,
      status: "SUCCESSFUL",
      utr: cleanUtr,
      payerName: "Manual Verified Customer",
    });

    return {
      valid: true,
      transaction: simulated,
      message: "Fetched live authoritative status from NPCI banking switch.",
    };
  };

  // Orders
  const createOrder = (orderData: Omit<Order, "id" | "timestamp" | "orderNumber">) => {
    const nextOrderNumber =
      orders.length > 0 ? Math.max(...orders.map((o) => o.orderNumber)) + 1 : 1025;

    const newOrder: Order = {
      ...orderData,
      id: `ORD-${nextOrderNumber}`,
      orderNumber: nextOrderNumber,
      timestamp: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["orderStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const linkPaymentToOrder = (orderId: string, transactionId: string) => {
    const txn = transactions.find((t) => t.id === transactionId);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              transactionId,
              paymentStatus: txn ? txn.status : o.paymentStatus,
              orderStatus: txn?.status === "SUCCESSFUL" ? "SERVED" : o.orderStatus,
            }
          : o
      )
    );
  };

  // Fraud
  const resolveFraudAlert = (alertId: string) => {
    setFraudAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: "RESOLVED" } : a))
    );
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setVendor(initialVendorProfile);
    setTransactions(initialTransactions);
    setOrders(initialOrders);
    setFraudAlerts(initialFraudAlerts);
    setNotifications(initialNotifications);
    setLanguageState("en");
    setNetworkConditionState("ONLINE");
    setOfflineQueue([]);
    setRecentLogs([]);
    setActiveAlertModal(null);
  };

  // Test Soundbox
  const testSoundbox = () => {
    const t = translations[language];
    audioEngine.playChime("SUCCESS");
    setTimeout(() => {
      audioEngine.speak(t.voice.testVoice(), language);
    }, 400);
  };

  return (
    <PaySureContext.Provider
      value={{
        vendor,
        updateVendor,
        transactions,
        orders,
        fraudAlerts,
        notifications,
        language,
        setLanguage,
        networkCondition,
        setNetworkCondition,
        offlineQueue,
        summary,
        recentLogs,
        activeAlertModal,
        setActiveAlertModal,
        triggerSimulation,
        verifyManualUtr,
        createOrder,
        updateOrderStatus,
        linkPaymentToOrder,
        resolveFraudAlert,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetDemoData,
        testSoundbox,
        syncOfflineQueue,
      }}
    >
      {children}
    </PaySureContext.Provider>
  );
};

export const usePaySure = () => {
  const context = useContext(PaySureContext);
  if (!context) {
    throw new Error("usePaySure must be used within a PaySureProvider");
  }
  return context;
};
