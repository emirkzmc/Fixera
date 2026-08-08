import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", fullWidth = false, children, ...props }, ref) => {
    
    let variantStyles = "";
    if (variant === "primary") {
      variantStyles = "bg-[#C65D1A] hover:bg-[#B34F12] text-white focus:ring-[#C65D1A]";
    } else if (variant === "secondary") {
      variantStyles = "bg-slate-100 hover:bg-slate-200 text-slate-900 focus:ring-slate-500";
    } else if (variant === "outline") {
      variantStyles = "border-2 border-slate-200 hover:border-slate-300 text-slate-700 focus:ring-slate-500 bg-transparent";
    }

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`font-medium py-3.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantStyles} ${widthStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
