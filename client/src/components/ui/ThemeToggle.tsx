"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-full cursor-pointer
        bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]
        shadow-sm hover:shadow-md transition-shadow duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun size={20} className="text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon size={20} className="text-blue-300" />
      </motion.div>
    </motion.button>
  );
}
