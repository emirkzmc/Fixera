"use client";

import React, { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { QuickActionDropdown } from "@/components/ui/QuickActionDropdown";
import { Menu, Settings, LogOut } from "lucide-react";
import { useGetMe } from "@/hooks/auth/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const { data: user } = useGetMe();
  const pageTitle = getPageTitle(pathname);
  const queryClient = useQueryClient();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef, () => {
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  });

  const handleLogout = () => {
    Cookies.remove("authToken");
    queryClient.clear();
    router.push("/login");
  };

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
          <div className="relative flex items-center ml-1 md:ml-2 pl-2 md:pl-3 border-l border-[var(--border-color)]" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-gradient-to)]
                flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--accent)]/50 transition-all focus:outline-none"
            >
              {user.profilePhoto ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${user.profilePhoto}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.fullName?.charAt(0)?.toUpperCase() ?? "U"
              )}
            </button>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 bg-[var(--card-bg)] shadow-xl 
                    rounded-2xl rounded-tr-none border border-[var(--border-color)] overflow-hidden"
                >
                  <div className="py-2 flex flex-col">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        router.push("/settings");
                      }}
                      className="cursor-pointer group flex items-center gap-3 px-4 py-3 text-sm font-medium 
                        text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-light)] 
                        hover:text-[var(--accent)] w-full text-left focus:outline-none"
                    >
                      <span className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
                        <Settings size={18} />
                      </span>
                      Ayarlar
                    </button>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer group flex items-center gap-3 px-4 py-3 text-sm font-medium 
                        text-red-500 transition-colors hover:bg-red-50 w-full text-left focus:outline-none"
                    >
                      <span className="text-red-400 group-hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                      </span>
                      Çıkış Yap
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
}
