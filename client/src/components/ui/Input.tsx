import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg border bg-[#FAFAFA] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all ${
          error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "border-slate-200"
        } ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
