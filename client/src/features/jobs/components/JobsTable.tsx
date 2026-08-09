"use client";

import React from "react";
import type { Job } from "@/domains/jobDomains";
import { JobStatusBadge } from "./JobStatusBadge";
import { useUpdateJobMutation } from "@/hooks/job/useJobMutation";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface JobsTableProps {
  jobs: Job[];
  onRowClick?: (job: Job) => void;
}

export function JobsTable({ jobs, onRowClick }: JobsTableProps) {
  const updateJobMutation = useUpdateJobMutation();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, jobId: string) => {
    e.stopPropagation(); // prevent row click
    updateJobMutation.mutate({ id: jobId, data: { status: e.target.value } });
  };

  const copyTrackingLink = (e: React.MouseEvent, trackingCode: string, jobId: string) => {
    e.stopPropagation();
    const link = `${window.location.origin}/track/${trackingCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(jobId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-color)]">
      <table className="w-full text-left border-collapse bg-[var(--card-bg)] text-[var(--text-primary)]">
        <thead>
          <tr className="border-b border-[var(--border-color)] bg-[var(--background)]/30 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            <th className="px-6 py-4">Takip Kodu</th>
            <th className="px-6 py-4">Müşteri</th>
            <th className="px-6 py-4">Cihaz / Ürün</th>
            <th className="px-6 py-4">Durum</th>
            <th className="px-6 py-4">Fiyat</th>
            <th className="px-6 py-4">Tarih</th>
            <th className="px-6 py-4 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)] text-sm">
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => onRowClick?.(job)}
              className={`transition-colors duration-150 hover:bg-[var(--card-bg-hover)] ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              <td className="px-6 py-4 font-mono font-bold text-[var(--accent)]">
                {job.trackingCode}
              </td>
              <td className="px-6 py-4 font-medium">
                {job.customerName || "Bilinmeyen Müşteri"}
              </td>
              <td className="px-6 py-4 text-[var(--text-secondary)]">
                {job.itemIdentifier}
              </td>
              <td className="px-6 py-4">
                <JobStatusBadge status={job.status} />
              </td>
              <td className="px-6 py-4 font-semibold text-[var(--text-primary)]">
                {formatPrice(job.price)}
              </td>
              <td className="px-6 py-4 text-[var(--text-secondary)]">
                {formatDate(job.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(e, job.id)}
                    className="px-2 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 appearance-none cursor-pointer"
                  >
                    <option value="waiting">Bekliyor</option>
                    <option value="in_progress">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="delivered">Teslim Edildi</option>
                  </select>
                  <button
                    onClick={(e) => copyTrackingLink(e, job.trackingCode, job.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors tooltip-trigger"
                    title="Takip Linkini Kopyala"
                  >
                    {copiedId === job.id ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
