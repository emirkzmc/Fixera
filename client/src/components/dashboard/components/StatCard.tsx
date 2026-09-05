"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  accentClass?: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  description,
  accentClass = "text-[var(--accent)]",
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border-color)] shadow-xs flex items-center justify-between"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-black text-[var(--text-primary)]">
          {value}
        </span>
        {description && (
          <span className="text-xs text-[var(--text-tertiary)] mt-1">
            {description}
          </span>
        )}
      </div>

      <div className={`flex items-center justify-center ${accentClass} shrink-0 ml-4`}>
        <Icon size={26} />
      </div>
    </motion.div>
  );
}
