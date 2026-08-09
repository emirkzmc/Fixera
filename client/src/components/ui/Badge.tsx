import React from "react";

type BadgeVariant = "success" | "warning" | "info" | "danger" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/20",
  warning: "bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]/20",
  info: "bg-[var(--info-light)] text-[var(--info)] border-[var(--info)]/20",
  danger: "bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]/20",
  neutral: "bg-[var(--border-color-light)] text-[var(--text-secondary)] border-[var(--border-color)]",
};

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
