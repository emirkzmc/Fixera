"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Briefcase,
  Users,
  Package,
  BarChart2,
  Settings
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_CATEGORIES = [
  {
    id: "main",
    title: "Ana Menü",
    items: [
      { id: "home", label: "Ana Sayfa", icon: LayoutGrid },
      { id: "jobs", label: "İşler", icon: Briefcase },
      { id: "customers", label: "Müşteriler", icon: Users },
      { id: "stock", label: "Stok", icon: Package },
      { id: "finance", label: "Finans", icon: BarChart2 },
    ],
  },
  {
    id: "other",
    title: "Diğer",
    items: [
      { id: "settings", label: "Ayarlar", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <aside className="h-full w-70 rounded-3xl bg-linear-to-br from-[#FF9A5A]/55 via-[#FF7A45] to-[#E8482C] flex flex-col py-6 shrink-0">
      {/* Logo Area */}
      <div className="flex items-center justify-center px-8 mb-6">
        <img src="/logos/logo.png" alt="Logo" width={170} height={40} className="object-contain" />
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
                const isActive = activeItem === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`cursor-pointer relative w-full flex items-center pl-8 py-3.5 transition-colors duration-200 outline-none rounded-r-full
                      ${isActive ? "text-[#E8482C]" : "text-white/80 hover:bg-white/10"}`}
                  >
                    {/* Active Pill Background with Inverted Curves */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white rounded-r-full rounded-bl-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {/* Top Concave Curve */}
                        <div 
                          className="absolute -top-6 left-0 w-6 h-6 pointer-events-none"
                          style={{ background: 'radial-gradient(circle at 100% 0%, transparent 24px, white 24.5px)' }} 
                        />
                      </motion.div>
                    )}

                    {/* Icon and Label */}
                    <div className="relative z-10 flex items-center w-full">
                      <motion.div
                        animate={{ x: isActive ? 4 : 0 }}
                        whileHover={{ x: isActive ? 4 : 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center w-full"
                      >
                        <Icon
                          size={20}
                          className={`mr-4 ${isActive ? "text-[#E8482C]" : "text-white/70"}`}
                        />
                        <span className="font-medium text-[15px]">{item.label}</span>
                      </motion.div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
