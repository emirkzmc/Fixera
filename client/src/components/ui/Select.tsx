import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  error?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", options, error, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] 
          placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 
          focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all appearance-none
          bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M7%207l3%203%203-3%22%2F%3E%3C%2Fsvg%3E')]
          bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]
          ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "border-[var(--border-color)]"} 
          ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";
