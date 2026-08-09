"use client";

import React from "react";
import { InventoryItem } from "@/domains/inventoryDomains";
import { Pencil, Wrench } from "lucide-react";

interface InventoryTableProps {
  items: InventoryItem[];
  onRowClick?: (item: InventoryItem) => void;
  onEditClick?: (item: InventoryItem) => void;
  onUseClick?: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, onRowClick, onEditClick, onUseClick }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
            <th className="py-4 px-6 w-20 text-center">İşlem</th>
            <th className="py-4 px-6 font-medium">Parça Adı</th>
            <th className="py-4 px-6 font-medium text-right">Stok Miktarı</th>
            <th className="py-4 px-6 font-medium text-right">Kritik Seviye</th>
            <th className="py-4 px-6 font-medium text-right">Birim Fiyat</th>
          </tr>
        </thead>
        <tbody className="text-[var(--text-primary)]">
          {items.map((item) => {
            const isCritical = item.stockQuantity <= item.criticalLevel;
            return (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-[var(--border-color)] transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-[var(--card-bg)]/80" : ""
                } ${isCritical ? "bg-red-500/10 hover:bg-red-500/20" : ""}`}
              >
                <td className="py-4 px-6 flex items-center justify-center gap-2">
                  {onEditClick && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(item);
                      }}
                      className="p-1.5 text-slate-400 hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-md transition-colors"
                      title="Düzenle"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  {onUseClick && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUseClick(item);
                      }}
                      className="p-1.5 text-slate-400 hover:text-[var(--info)] hover:bg-[var(--info)]/10 rounded-md transition-colors"
                      title="İş Emrinde Kullan"
                    >
                      <Wrench size={16} />
                    </button>
                  )}
                </td>
                <td className="py-4 px-6 font-medium flex items-center">
                  {item.itemName}
                  {isCritical && (
                    <span className="ml-3 text-xs font-semibold text-red-500 bg-red-500/20 px-2 py-0.5 rounded-full">
                      Kritik
                    </span>
                  )}
                </td>
                <td className={`py-4 px-6 text-right font-semibold ${isCritical ? "text-red-500" : ""}`}>
                  {item.stockQuantity}
                </td>
                <td className="py-4 px-6 text-right text-[var(--text-secondary)]">
                  {item.criticalLevel}
                </td>
                <td className="py-4 px-6 text-right font-medium text-[var(--text-primary)]">
                  {formatCurrency(item.price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
