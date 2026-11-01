"use client";

import React from "react";
import { usePaySure } from "@/lib/store";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";

export const OfflineBanner: React.FC = () => {
  const { networkCondition, setNetworkCondition, offlineQueue } = usePaySure();

  if (networkCondition !== "OFFLINE") return null;

  return (
    <div className="bg-amber-500 text-navy-950 px-4 py-2.5 font-medium flex flex-wrap items-center justify-between gap-3 shadow-md animate-pulse">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-amber-600/30 rounded-full">
          <WifiOff className="w-5 h-5 text-navy-950" />
        </div>
        <div>
          <div className="text-sm font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            STALL NETWORK OFFLINE — AUTHORITATIVE BANK VERIFICATION PAUSED
          </div>
          <div className="text-xs text-navy-900 font-normal">
            Transactions will be recorded locally as unverified.{" "}
            <strong>Never serve high-value orders until connection is restored and voice announces.</strong>
            {offlineQueue.length > 0 && ` (${offlineQueue.length} payments queued locally)`}
          </div>
        </div>
      </div>

      <button
        onClick={() => setNetworkCondition("ONLINE")}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-950 text-white rounded-md text-xs font-semibold hover:bg-navy-900 transition shadow"
      >
        <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
        Simulate Reconnect & Sync Queue
      </button>
    </div>
  );
};
