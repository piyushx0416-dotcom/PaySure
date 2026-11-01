import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PaySureProvider } from "@/lib/store";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import { LiveKioskAlertModal } from "@/components/shared/LiveKioskAlertModal";

export const metadata: Metadata = {
  title: "PaySure — Every Payment. Verified. Every Time.",
  description:
    "Smart UPI Payment Verification & Vendor Management Platform for Indian street-food vendors. Instant voice soundbox, fake screenshot prevention, and offline-aware ledger.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1c3d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <PaySureProvider>
          <DemoBanner />
          <OfflineBanner />
          <div className="flex-1 flex flex-col">{children}</div>
          <LiveKioskAlertModal />
        </PaySureProvider>
      </body>
    </html>
  );
}
