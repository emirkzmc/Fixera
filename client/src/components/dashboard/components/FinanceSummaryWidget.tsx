"use client";

import React from "react";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";
import type { FinanceSummary } from "@/domains/financeDomains";

interface FinanceSummaryWidgetProps {
  summary: FinanceSummary;
}

export function FinanceSummaryWidget({ summary }: FinanceSummaryWidgetProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  };

  const total = summary.totalRevenue + summary.pendingRevenue;
  const collectedPercentage = total > 0 ? (summary.totalRevenue / total) * 100 : 0;
  const pendingPercentage = total > 0 ? (summary.pendingRevenue / total) * 100 : 0;

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] p-6 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
        <h3 className="text-base font-bold text-[var(--text-primary)]">Finansal Özet</h3>
      </div>

      <div className="flex-1 flex flex-col gap-6 justify-center">
        {/* Total revenue container */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--text-secondary)] uppercase font-semibold">Toplam Potansiyel Ciro</span>
          <span className="text-3xl font-black text-[var(--text-primary)]">{formatPrice(total)}</span>
        </div>

        {/* Custom progress bar representing collections vs pending */}
        <div className="flex flex-col gap-2">
          <div className="h-3.5 w-full bg-[var(--background)] rounded-full overflow-hidden flex">
            <div
              style={{ width: `${collectedPercentage}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Tahsil Edilen: %${collectedPercentage.toFixed(1)}`}
            />
            <div
              style={{ width: `${pendingPercentage}%` }}
              className="bg-amber-500 transition-all duration-500"
              title={`Bekleyen: %${pendingPercentage.toFixed(1)}`}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-500 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Tahsil Edilen (%{collectedPercentage.toFixed(0)})
            </span>
            <span className="text-amber-500 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Bekleyen (%{pendingPercentage.toFixed(0)})
            </span>
          </div>
        </div>

        {/* Detailed items list */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-emerald-500">
              <TrendingUp size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Tahsil Edilen</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">{formatPrice(summary.totalRevenue)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-amber-500">
              <Clock size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Bekleyen Ödeme</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">{formatPrice(summary.pendingRevenue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
