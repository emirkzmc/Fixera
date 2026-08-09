"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { QuickActionDropdown } from "@/components/ui/QuickActionDropdown";
import { Menu } from "lucide-react";
import { useGetMe } from "@/hooks/auth/useAuth";

const PAGE_TITLES: Record<string, string> = {
  "/": "Ana Sayfa",
  "/jobs": "İşler",
  "/customers": "Müşteriler",
  "/stock": "Stok",
  "/finance": "Finans",
  "/settings": "Ayarlar",
};

interface HeaderProps {
  onQuickAction: (action: string) => void;
  onToggleMenu?: () => void;
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];

  const matchedKey = Object.keys(PAGE_TITLES).find(
    (key) => key !== "/" && pathname.startsWith(key)
  );
  return matchedKey ? PAGE_TITLES[matchedKey] : "Fixera";
}

export function Header({ onQuickAction, onToggleMenu }: HeaderProps) {
  const pathname = usePathname();
  const { data: user } = useGetMe();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 mb-4 rounded-2xl
      bg-[var(--header-bg)] backdrop-blur-xl border border-[var(--glass-border)] sticky top-0 z-30">
      
      {/* Left — Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        {onToggleMenu && (
          <button 
            onClick={onToggleMenu}
            className="md:hidden p-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--card-bg-hover)] transition-colors"
            aria-label="Menüyü aç"
          >
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{pageTitle}</h1>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <QuickActionDropdown
          onNewJobOrder={() => onQuickAction("newJob")}
          onAddNewCustomer={() => onQuickAction("newCustomer")}
          onAddStock={() => onQuickAction("addStock")}
          onQuickPayment={() => onQuickAction("quickPayment")}
        />

        {/* User Avatar */}
        {user && (
          <div className="flex items-center gap-3 ml-1 md:ml-2 pl-2 md:pl-3 border-l border-[var(--border-color)]">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-gradient-to)]
              flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              {user.fullName?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight whitespace-nowrap">
                {user.fullName}
              </p>
              <p className="text-xs text-[var(--text-secondary)] whitespace-nowrap">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
