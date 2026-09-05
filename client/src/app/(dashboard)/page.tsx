"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, Layers, TrendingUp } from "lucide-react";
import { useGetJobs } from "@/hooks/job/useJob";
import { useGetFinanceSummary } from "@/hooks/finance/useFinance";
import { useGetInventory } from "@/hooks/inventory/useInventory";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { HeroScene } from "@/components/dashboard/components/HeroScene";
import { StatCard } from "@/components/dashboard/components/StatCard";
import { RecentJobsTable } from "@/components/dashboard/components/RecentJobsTable";
import { FinanceSummaryWidget } from "@/components/dashboard/components/FinanceSummaryWidget";
import { JobDetailModal } from "@/components/jobs/components/JobDetailModal";

export default function DashboardHome() {
  const { data: jobs = [], isLoading: isJobsLoading } = useGetJobs();
  const { data: financeSummary, isLoading: isFinanceLoading } = useGetFinanceSummary();
  const { data: inventory = [], isLoading: isInventoryLoading } = useGetInventory();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const isLoading = isJobsLoading || isFinanceLoading || isInventoryLoading;

  if (isLoading) {
    return (
      <div className="min-h-125 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Count metrics
  const activeJobs = jobs.filter((j) => j.status === "in_progress" || j.status === "waiting").length;
  const criticalStockItems = inventory.filter((item) => item.stockQuantity <= item.criticalLevel).length;

  const defaultSummary = {
    totalRevenue: 0,
    pendingRevenue: 0,
    totalJobs: 0,
    ...financeSummary,
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* 3D Scene Hero Banner */}
      <HeroScene />

      {/* Top Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          title="Toplam İş Emri"
          value={jobs.length}
          description="Sisteme kayıtlı tüm işler"
          accentClass="text-[var(--info)]"
        />
        <StatCard
          icon={Clock}
          title="Aktif İşler"
          value={activeJobs}
          description="Bekleyen veya yapım aşamasında"
          accentClass="text-[var(--warning)]"
        />
        <StatCard
          icon={TrendingUp}
          title="Toplam Gelir"
          value={formatPrice(defaultSummary.totalRevenue)}
          description="Başarıyla tahsil edilen tutar"
          accentClass="text-emerald-500"
        />
        <StatCard
          icon={Layers}
          title="Kritik Stok"
          value={criticalStockItems}
          description="Eşik seviyenin altındaki parçalar"
          accentClass={
            criticalStockItems > 0
              ? "text-[var(--danger)]"
              : "text-[var(--text-secondary)]"
          }
        />
      </div>

      {/* Secondary Dashboard Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Son işler tablosu */}
        <RecentJobsTable 
          jobs={jobs} 
          onRowClick={(jobId) => setSelectedJobId(jobId)} 
        />

        {/* Finansal Grafik ve Detay widget */}
        <div className="w-full lg:w-100">
          <FinanceSummaryWidget summary={defaultSummary} />
        </div>
      </div>
      
      <JobDetailModal 
        isOpen={!!selectedJobId}
        onClose={() => setSelectedJobId(null)}
        jobId={selectedJobId}
      />
    </motion.div>
  );
}
