"use client";

import React from "react";
import { Customer } from "@/domains/customerDomains";
import { Pencil } from "lucide-react";

interface CustomersTableProps {
  customers: Customer[];
  onRowClick?: (customer: Customer) => void;
  onEditClick?: (customer: Customer) => void;
}

export function CustomersTable({ customers, onRowClick, onEditClick }: CustomersTableProps) {
  if (!customers.length) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm">
      <table className="w-full text-left text-sm text-[var(--text-secondary)]">
        <thead className="border-b border-[var(--border-color)] bg-[var(--background)] text-xs uppercase text-[var(--text-primary)]">
          <tr>
            <th scope="col" className="px-6 py-4 w-12 text-center"></th>
            <th scope="col" className="px-6 py-4 font-medium">Ad Soyad</th>
            <th scope="col" className="px-6 py-4 font-medium">Telefon</th>
            <th scope="col" className="px-6 py-4 font-medium">E-Posta</th>
            <th scope="col" className="px-6 py-4 font-medium">Kayıt Tarihi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => onRowClick?.(customer)}
              className={`transition-colors hover:bg-[var(--background)] ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              <td className="px-6 py-4 text-center">
                {onEditClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditClick(customer);
                    }}
                    className="p-1.5 text-slate-400 hover:text-[var(--accent)] hover:bg-[var(--accent-light)] rounded-md transition-colors"
                    title="Düzenle"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                {customer.fullName}
              </td>
              <td className="px-6 py-4">
                {customer.phone || "-"}
              </td>
              <td className="px-6 py-4">
                {customer.email || "-"}
              </td>
              <td className="px-6 py-4">
                {customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString("tr-TR")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
