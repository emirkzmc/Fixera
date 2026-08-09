"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, UserPlus, PackagePlus, FileText, CreditCard } from "lucide-react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface QuickActionDropdownProps {
  onNewJobOrder: () => void;
  onAddNewCustomer: () => void;
  onAddStock: () => void;
  onQuickPayment: () => void;
}

const MENU_ITEMS = [
  { key: "newJob", label: "Yeni İş Emri Başlat", icon: FileText },
  { key: "newCustomer", label: "Yeni Müşteri Ekle", icon: UserPlus },
  { key: "addStock", label: "Stoka Parça Ekle", icon: PackagePlus },
  { key: "quickPayment", label: "Hızlı Ödeme Al", icon: CreditCard },
] as const;

export function QuickActionDropdown({
  onNewJobOrder,
  onAddNewCustomer,
  onAddStock,
  onQuickPayment,
}: QuickActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const actionMap: Record<string, () => void> = {
    newJob: onNewJobOrder,
    newCustomer: onAddNewCustomer,
    addStock: onAddStock,
    quickPayment: onQuickPayment,
  };

  const handleAction = (key: string) => {
    setIsOpen(false);
    actionMap[key]?.();
  };

  const isExpanded = isHovered || isOpen;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Primary Button — expands right, "Yeni" left + "+" right */}
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-center bg-[var(--accent)] text-white shadow-md 
          hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 
          focus:ring-offset-2 overflow-hidden"
        style={{ borderRadius: "9999px" }}
        initial={{ width: 48, height: 48 }}
        animate={{
          width: isExpanded ? 128 : 48,
          height: 48,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="flex items-center justify-center whitespace-nowrap"
          initial={false}
        >
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                key="text"
                initial={{ opacity: 0, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, width: "auto", marginRight: 6 }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-sm"
              >
                Yeni
              </motion.span>
            )}
          </AnimatePresence>
          <Plus size={22} strokeWidth={2.5} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu — rounded except top-left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 bg-[var(--card-bg)] shadow-xl 
              rounded-2xl rounded-tr-none border border-[var(--border-color)] overflow-hidden"
          >
            <div className="py-2 flex flex-col">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleAction(item.key)}
                    className="cursor-pointer group flex items-center gap-3 px-4 py-3 text-sm font-medium 
                      text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-light)] 
                      hover:text-[var(--accent)] focus:bg-[var(--accent-light)] focus:text-[var(--accent)] 
                      focus:outline-none w-full text-left"
                  >
                    <span className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                      <Icon size={18} />
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
