"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({
  children,
  title,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex min-h-[calc(100vh-33px)] bg-slate-50 dark:bg-[#070e1b] transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          title={title}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto text-slate-900 dark:text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
};
