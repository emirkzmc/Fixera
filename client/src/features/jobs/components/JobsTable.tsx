"use client";

import React from "react";
import type { Job } from "@/domains/jobDomains";
import { JobStatusBadge } from "./JobStatusBadge";
import { useUpdateJobMutation } from "@/hooks/job/useJobMutation";
import { Copy, CheckCircle2, Pencil, Calendar } from "lucide-react";
import { useState } from "react";

interface JobsTableProps {
  jobs: Job[];
  onRowClick?: (job: Job) => void;
}

export function JobsTable({ jobs, onRowClick }: JobsTableProps) {
  const updateJobMutation = useUpdateJobMutation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [tempDate, setTempDate] = useState<string>("");

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

  const handleDateSubmit = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (tempDate) {
      updateJobMutation.mutate({ id: jobId, data: { estimatedDeliveryDate: new Date(tempDate).toISOString() } });
    }
    setEditingDateId(null);
  };

  const startEditingDate = (jobId: string, currentDate?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingDateId(jobId);
    setTempDate(currentDate ? new Date(currentDate).toISOString().split('T')[0] : "");
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
            <th className="px-6 py-4 text-right">Teslim & İşlemler</th>
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
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(e, job.id)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 appearance-none cursor-pointer"
                >
                  <option value="waiting">Bekliyor</option>
                  <option value="in_progress">Devam Ediyor</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="delivered">Teslim Edildi</option>
                </select>
              </td>
              <td className="px-6 py-4 font-semibold text-[var(--text-primary)]">
                {formatPrice(job.price)}
              </td>
              <td className="px-6 py-4 text-[var(--text-secondary)]">
                {formatDate(job.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Delivery Date / Edit */}
                  {editingDateId === job.id ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="date"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="px-2 py-1 text-xs rounded border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                      <button 
                        onClick={(e) => handleDateSubmit(job.id, e)}
                        className="p-1 rounded bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                      >
                        <CheckCircle2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 group cursor-pointer" onClick={(e) => startEditingDate(job.id, job.estimatedDeliveryDate, e)}>
                      <Calendar size={14} className="text-[var(--text-tertiary)]" />
                      <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {job.estimatedDeliveryDate ? formatDate(job.estimatedDeliveryDate) : "Tarih Yok"}
                      </span>
                      <Pencil size={12} className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  {/* Copy Link */}
                  <button
                    onClick={(e) => copyTrackingLink(e, job.trackingCode, job.id)}
                    className="p-1.5 ml-2 rounded-lg bg-[var(--accent-light)]/50 text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors tooltip-trigger"
                    title="Takip Linkini Kopyala"
                  >
                    {copiedId === job.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
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
