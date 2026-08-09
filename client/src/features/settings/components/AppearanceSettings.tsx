"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/providers/ThemeProvider";

const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Açık", icon: <Sun size={18} /> },
  { value: "system", label: "Sistem", icon: <Monitor size={18} /> },
  { value: "dark", label: "Koyu", icon: <Moon size={18} /> },
];

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--background)]/50 border border-[var(--border-color)] transition-colors duration-300">
      <div>
        <h3 className="font-semibold text-[var(--text-primary)] mb-1 transition-colors duration-300">Uygulama Teması</h3>
        <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">Koyu, açık veya sistem teması tercihini belirle.</p>
      </div>

      {/* Apple-style Glassmorphism Container */}
      {mounted && (
        <div 
          className="flex items-center p-1 rounded-full backdrop-blur-2xl transition-all duration-300
            bg-white/30 dark:bg-[#1A1D27]/40 
            border border-white/50 dark:border-white/10
            shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] 
            dark:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          {options.map((option) => {
            const isActive = theme === option.value;
            const activeTextColor = resolvedTheme === "dark" ? "text-slate-900" : "text-white";
            
            const activeGlow = isActive
              ? (resolvedTheme === "dark" 
                  ? "drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]" 
                  : "drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]")
              : "";
            
            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                title={option.label}
                aria-label={option.label}
                className={`relative flex items-center justify-center p-2.5 rounded-full transition-all z-10 duration-300 ${
                  isActive ? activeTextColor : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-theme-pill-full"
                    className="absolute inset-0 rounded-full -z-10 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/10"
                    style={{
                      backgroundColor: resolvedTheme === "dark" ? "#F1F5F9" : "#171717",
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 transition-all duration-300 ${activeGlow}`}>{option.icon}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
