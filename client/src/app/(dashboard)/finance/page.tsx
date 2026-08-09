"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ReceiptText } from 'lucide-react';
import { useGetFinanceSummary, useGetPayments } from '@/hooks/finance/useFinance';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { FinanceOverviewCards } from '@/features/finance/components/FinanceOverviewCards';
import { PaymentsTable } from '@/features/finance/components/PaymentsTable';
import { CreatePaymentModal } from '@/features/finance/components/CreatePaymentModal';

export default function FinancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: summary, isLoading: isLoadingSummary } = useGetFinanceSummary();
  const { data: payments = [], isLoading: isLoadingPayments } = useGetPayments();

  if (isLoadingSummary || isLoadingPayments) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Finans</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Gelir ve ödemelerinizi takip edin</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ödeme Al
        </Button>
      </div>

      {summary && <FinanceOverviewCards summary={summary} />}

      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Son Ödemeler</h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={ReceiptText}
              title="Henüz ödeme yok"
              description="Sisteme kaydedilmiş herhangi bir ödeme bulunamadı."
              actionLabel="İlk Ödemeyi Al"
              onAction={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <PaymentsTable payments={payments} />
        )}
      </div>

      <CreatePaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}
