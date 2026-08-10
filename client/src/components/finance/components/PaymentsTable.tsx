"use client";

import { Payment } from '@/domains/financeDomains';
import { Badge } from '@/components/ui/Badge';
import { Pencil } from 'lucide-react';

interface PaymentsTableProps {
  payments: Payment[];
  onEditClick?: (payment: Payment) => void;
}

const formatTRY = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
};

export function PaymentsTable({ payments, onEditClick }: PaymentsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-color)] text-sm font-medium text-[var(--text-secondary)]">
            <th className="p-4 whitespace-nowrap w-12 text-center"></th>
            <th className="p-4 whitespace-nowrap">İş ID</th>
            <th className="p-4 whitespace-nowrap">Tutar</th>
            <th className="p-4 whitespace-nowrap">Durum</th>
            <th className="p-4 whitespace-nowrap">Tarih</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="hover:bg-[var(--background)]/50 transition-colors"
            >
              <td className="p-4 text-center">
                {onEditClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditClick(payment);
                    }}
                    className="p-1.5 text-slate-400 hover:text-[var(--accent)] hover:bg-orange-50 rounded-md transition-colors"
                    title="Düzenle"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </td>
              <td className="p-4 text-sm text-[var(--text-primary)] font-medium">
                #{payment.jobId.slice(-6)}
              </td>
              <td className="p-4 text-sm font-semibold text-[var(--text-primary)]">
                {formatTRY(payment.amount)}
              </td>
              <td className="p-4">
                {payment.status === 'pending' && <Badge variant="warning">Bekliyor</Badge>}
                {payment.status === 'completed' && <Badge variant="success">Tamamlandı</Badge>}
                {payment.status === 'refunded' && <Badge variant="danger">İade</Badge>}
              </td>
              <td className="p-4 text-sm text-[var(--text-secondary)]">
                {formatDate(payment.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
