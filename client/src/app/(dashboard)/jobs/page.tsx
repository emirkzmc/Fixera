"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";
import { useGetJobs } from "@/hooks/job/useJob";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { JobsTable } from "@/components/jobs/components/JobsTable";
import { CreateJobModal } from "@/components/jobs/components/CreateJobModal";
import { JobDetailModal } from "@/components/jobs/components/JobDetailModal";
import type { Job } from "@/domains/jobDomains";

type FilterStatus = "all" | "waiting" | "in_progress" | "completed" | "delivered";

const TABS: { label: string; value: FilterStatus }[] = [
  { label: "Tümü", value: "all" },
  { label: "Bekleyen", value: "waiting" },
  { label: "Devam Eden", value: "in_progress" },
  { label: "Tamamlanan", value: "completed" },
  { label: "Teslim Edilen", value: "delivered" },
];

export default function JobsPage() {
  const { data: jobs = [], isLoading } = useGetJobs();
  const [activeTab, setActiveTab] = useState<FilterStatus>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    return job.status === activeTab;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col"
    >
      {/* Top Header Section */}
      <PageHeader
        title="İş Emirleri"
        description="Atölyenizdeki tüm servis ve iş emri süreçlerini buradan yönetebilirsiniz."
        action={
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Yeni İş Emri Başlat</span>
          </Button>
        }
      />

      {/* Tabs Filter */}
      <div className="flex border-b border-[var(--border-color)] overflow-x-auto scrollbar-hide gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`cursor-pointer px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap outline-none
                ${
                  isActive
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 min-h-[400px] flex flex-col justify-center">
        {isLoading ? (
          <LoadingSpinner size="lg" />
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={
              activeTab === "all"
                ? "Henüz iş emri bulunmuyor"
                : "Bu durumda iş emri bulunamadı"
            }
            description={
              activeTab === "all"
                ? "Atölyenize gelen işleri takip etmek için ilk iş emrini hemen oluşturun."
                : "Seçili duruma ait herhangi bir kayıt bulunmamaktadır."
            }
            actionLabel={activeTab === "all" ? "İlk İş Emrini Oluştur" : undefined}
            onAction={activeTab === "all" ? () => setIsModalOpen(true) : undefined}
          />
        ) : (
          <div className="flex-1 flex flex-col">
            <JobsTable 
              jobs={filteredJobs} 
              onRowClick={(job) => setSelectedJobId(job.id)}
            />
          </div>
        )}
      </div>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <JobDetailModal 
        isOpen={!!selectedJobId} 
        onClose={() => setSelectedJobId(null)} 
        jobId={selectedJobId} 
      />
    </motion.div>
  );
}
