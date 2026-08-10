"use client";

import { FinanceSummary } from '@/domains/financeDomains';
import { TrendingUp, Clock, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinanceOverviewCardsProps {
  summary: FinanceSummary;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

const formatTRY = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

export function FinanceOverviewCards({ summary }: FinanceOverviewCardsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={cardVariants} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Toplam Ciro</p>
          <p className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{formatTRY(summary.totalRevenue)}</p>
        </div>
      </motion.div>

      <motion.div variants={cardVariants} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Bekleyen Gelir</p>
          <p className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{formatTRY(summary.pendingRevenue)}</p>
        </div>
      </motion.div>

      <motion.div variants={cardVariants} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <Briefcase className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Toplam İş</p>
          <p className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{summary.totalJobs}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
