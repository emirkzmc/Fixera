import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mb-5">
        <Icon size={28} className="text-[var(--accent)]" />
      </div>

      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="cursor-pointer px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
            hover:bg-[var(--accent-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
