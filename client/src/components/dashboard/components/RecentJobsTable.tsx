"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import type { Job } from "@/domains/jobDomains";
import { JobStatusBadge } from "@/components/jobs/components/JobStatusBadge";

interface RecentJobsTableProps {
  jobs: Job[];
  onRowClick?: (jobId: string) => void;
}

export function RecentJobsTable({ jobs, onRowClick }: RecentJobsTableProps) {
  const recentJobs = jobs.slice(0, 5);

  const formatPrice = (price: number) => {
    return price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] p-6 shadow-xs flex-1 flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
        <h3 className="text-base font-bold text-[var(--text-primary)]">Son İş Emirleri</h3>
        <Link
          href="/jobs"
          className="flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
        >
          <span>Tümünü Gör</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {recentJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center flex-1">
          <div className="w-12 h-12 rounded-xl bg-[var(--border-color-light)] flex items-center justify-center mb-3">
            <Briefcase size={20} className="text-[var(--text-tertiary)]" />
          </div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Kayıt Bulunmuyor</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Aktif iş emriniz bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-primary)]">
            <thead>
              <tr className="text-xs text-[var(--text-secondary)] font-semibold border-b border-[var(--border-color)]">
                <th className="py-3">Takip Kodu</th>
                <th className="py-3">Müşteri</th>
                <th className="py-3">Cihaz</th>
                <th className="py-3">Durum</th>
                <th className="py-3 text-right">Tutar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {recentJobs.map((job) => (
                <tr 
                  key={job.id} 
                  className={`hover:bg-[var(--card-bg-hover)] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick?.(job.id)}
                >
                  <td className="py-3.5 font-mono font-bold text-[var(--accent)]">{job.trackingCode}</td>
                  <td className="py-3.5 font-medium">{job.customerName || "Bilinmeyen Müşteri"}</td>
                  <td className="py-3.5 text-[var(--text-secondary)]">{job.itemIdentifier}</td>
                  <td className="py-3.5">
                    <JobStatusBadge status={job.status} />
                  </td>
                  <td className="py-3.5 text-right font-semibold">{formatPrice(job.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
