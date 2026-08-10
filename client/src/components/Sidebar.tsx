"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Briefcase,
  Users,
  Package,
  BarChart2,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const NAV_CATEGORIES = [
  {
    id: "main",
    title: "Ana Menü",
    items: [
      { id: "home", label: "Ana Sayfa", icon: LayoutGrid, href: "/" },
      { id: "jobs", label: "İşler", icon: Briefcase, href: "/jobs" },
      { id: "customers", label: "Müşteriler", icon: Users, href: "/customers" },
      { id: "stock", label: "Stok", icon: Package, href: "/stock" },
      { id: "finance", label: "Finans", icon: BarChart2, href: "/finance" },
    ],
  },
  {
    id: "other",
    title: "Diğer",
    items: [
      { id: "settings", label: "Ayarlar", icon: Settings, href: "/settings" },
    ],
  },
];

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useLogout();

  // Handle escape key on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const SidebarContent = (
    <div className="h-full w-[280px] rounded-r-3xl md:rounded-3xl bg-linear-to-br from-[var(--sidebar-from)] via-[var(--sidebar-via)] to-[var(--sidebar-to)] flex flex-col py-6 shadow-2xl md:shadow-none">
      {/* Logo Area */}
      <div className="flex items-center justify-between px-8 mb-6">
        <Image src="/logos/logo.png" alt="Logo" width={170} height={40} className="object-contain w-auto h-auto" priority />
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-2">
        {NAV_CATEGORIES.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="px-8 mb-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
              {category.title}
            </h3>
            <div className="pr-6 pl-0 flex flex-col space-y-1">
              {category.items.map((item) => {
                const isActive = isItemActive(pathname, item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768 && onClose) {
                        onClose();
                      }
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`cursor-pointer relative w-full flex items-center pl-8 py-3.5 transition-colors duration-200 outline-none rounded-r-full
                      ${isActive ? "text-[var(--accent-gradient-to)]" : "text-white/80 hover:bg-white/10"}`}
                  >
                    {/* Active Pill Background with Inverted Curves */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-[var(--card-bg)] rounded-r-full rounded-bl-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {/* Top Concave Curve */}
                        <div
                          className="absolute -top-6 left-0 w-6 h-6 pointer-events-none hidden md:block"
                          style={{ background: `radial-gradient(circle at 100% 0%, transparent 24px, var(--card-bg) 24.5px)` }}
                        />
                      </motion.div>
                    )}

                    {/* Icon and Label */}
                    <div className="relative z-10 flex items-center w-full">
                      <motion.div
                        animate={{ x: isActive ? 4 : 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center w-full"
                      >
                        <Icon
                          size={20}
                          className={`mr-4 ${isActive ? "text-[var(--accent-gradient-to)]" : "text-white/70"}`}
                        />
                        <span className="font-medium text-[15px]">{item.label}</span>
                      </motion.div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-6 mt-auto mb-6">
        <button
          onClick={logout}
          className="flex items-center w-full text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors outline-none"
        >
          <LogOut size={20} className="mr-4" />
          <span className="font-medium text-[15px]">Çıkış Yap</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 md:hidden flex"
          >
            {SidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Static Sidebar */}
      <aside className="hidden md:flex shrink-0 h-full">
        {SidebarContent}
      </aside>
    </>
  );
}
