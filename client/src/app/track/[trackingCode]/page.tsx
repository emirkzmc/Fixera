"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { jobApi } from "@/api/jobApi";
import type { Job } from "@/domains/jobDomains";
import { Package, Smartphone, Calendar, AlertCircle } from "lucide-react";

export default function TrackJobPage() {
  const { trackingCode } = useParams<{ trackingCode: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trackingCode) {
      jobApi.track(trackingCode)
        .then((data) => {
          setJob(data);
          setError(null);
        })
        .catch(() => {
          setError("Takip kodu geçersiz veya iş emri bulunamadı.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [trackingCode]);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "waiting": return { text: "Bekliyor", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
      case "in_progress": return { text: "Devam Ediyor", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
      case "completed": return { text: "Tamamlandı", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
      case "delivered": return { text: "Teslim Edildi", color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" };
      default: return { text: status, color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
        <div className="max-w-md w-full bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--border-color)] shadow-2xl text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Bulunamadı</h2>
          <p className="text-[var(--text-secondary)]">{error}</p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusDisplay(job.status);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--accent)]/10 px-8 py-10 border-b border-[var(--accent)]/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent pointer-events-none" />
          <Package className="w-16 h-16 text-[var(--accent)] mx-auto mb-4 relative z-10" />
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] relative z-10 mb-2">Cihaz Takip</h1>
          <p className="text-[var(--text-secondary)] font-mono font-medium text-lg relative z-10">
            KOD: <span className="text-[var(--accent)]">{job.trackingCode}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className={`rounded-2xl p-6 border ${statusConfig.border} ${statusConfig.bg} text-center mb-8`}>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Güncel Durum</h3>
            <p className={`text-3xl font-bold ${statusConfig.color}`}>{statusConfig.text}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--background)] p-6 rounded-2xl border border-[var(--border-color)]">
              <div className="flex items-center text-[var(--text-secondary)] mb-3">
                <Smartphone className="w-5 h-5 mr-2" />
                <span className="font-medium text-sm">Cihaz / Ürün</span>
              </div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{job.itemIdentifier}</p>
            </div>

            <div className="bg-[var(--background)] p-6 rounded-2xl border border-[var(--border-color)]">
              <div className="flex items-center text-[var(--text-secondary)] mb-3">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium text-sm">Kayıt Tarihi</span>
              </div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {new Date(job.createdAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {job.issueDescription && (
            <div className="mt-6 bg-[var(--background)] p-6 rounded-2xl border border-[var(--border-color)]">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Şikayet / Açıklama</h3>
              <p className="text-[var(--text-primary)]">{job.issueDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
