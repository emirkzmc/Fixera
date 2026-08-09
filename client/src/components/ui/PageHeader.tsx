import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{title}</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          {description}
        </p>
        {children}
      </div>
      {action && (
        <div className="shrink-0 flex items-center justify-center">
          {action}
        </div>
      )}
    </div>
  );
}
