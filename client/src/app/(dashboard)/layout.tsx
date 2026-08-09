"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/shared/Header";
import { QuickActionModals } from "@/features/quick-actions/components/QuickActionModals";
import { usePathname } from "next/navigation";

type ModalType = "newJob" | "newCustomer" | "addStock" | "quickPayment" | null;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-row h-full p-2 md:p-4 overflow-hidden bg-[var(--background)]">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 flex flex-col h-full md:ml-4 overflow-hidden w-full">
        <Header 
          onQuickAction={(action) => setActiveModal(action as ModalType)} 
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0">
          {children}
        </main>
      </div>

      <QuickActionModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
