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

  const handleAction = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const menuItems = [
    {
      label: "Yeni İş Emri Başlat",
      icon: <FileText size={18} />,
      onClick: () => handleAction(onNewJobOrder),
    },
    {
      label: "Yeni Müşteri Ekle",
      icon: <UserPlus size={18} />,
      onClick: () => handleAction(onAddNewCustomer),
    },
    {
      label: "Stoka Parça Ekle",
      icon: <PackagePlus size={18} />,
      onClick: () => handleAction(onAddStock),
    },
    {
      label: "Hızlı Ödeme Al",
      icon: <CreditCard size={18} />,
      onClick: () => handleAction(onQuickPayment),
    },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Primary Button */}
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-orange-500 text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 overflow-hidden"
        style={{ borderRadius: "9999px" }}
        initial={{ width: 48, height: 48 }}
        animate={{
          width: isHovered || isOpen ? 120 : 48,
          height: 48,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="flex items-center justify-center whitespace-nowrap"
          initial={false}
          animate={{
            x: isHovered || isOpen ? 0 : 0,
          }}
        >
          <AnimatePresence mode="wait">
            {(isHovered || isOpen) && (
              <motion.span
                key="text"
                initial={{ opacity: 0, width: 0, paddingRight: 0 }}
                animate={{ opacity: 1, width: "auto", paddingRight: 6 }}
                exit={{ opacity: 0, width: 0, paddingRight: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-sm"
              >
                Yeni
              </motion.span>
            )}
          </AnimatePresence>
          <Plus size={24} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+8px)] z-50 w-56 bg-white shadow-lg rounded-2xl rounded-tl-none border border-gray-100 overflow-hidden"
          >
            <div className="py-2 flex flex-col">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600 focus:outline-none w-full text-left"
                >
                  <span className="text-gray-400 group-hover:text-orange-500 transition-colors shrink-0">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
