"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { jobApi } from "@/api/jobApi";
import type { Job } from "@/domains/jobDomains";
import { Package, Smartphone, Calendar, AlertCircle, Clock, CreditCard } from "lucide-react";

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
      case "waiting": return { text: "Bekliyor", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
      case "in_progress": return { text: "Devam Ediyor", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
      case "completed": return { text: "Tamamlandı", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
      case "delivered": return { text: "Teslim Edildi", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" };
      default: return { text: status, color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800 mb-1">Bulunamadı</h2>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusDisplay(job.status);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center items-start font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-orange-50 to-white px-6 py-8 border-b border-orange-100/50 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-1">Cihaz Takip</h1>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {job.trackingCode}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`rounded-xl p-4 border ${statusConfig.border} ${statusConfig.bg} text-center mb-6`}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Durum</p>
            <p className={`text-xl font-bold ${statusConfig.color}`}>{statusConfig.text}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center text-slate-500">
                <Smartphone className="w-4 h-4 mr-2" />
                <span className="text-sm">Cihaz / Ürün</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">{job.itemIdentifier}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center text-slate-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Kayıt Tarihi</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">
                {new Date(job.createdAt).toLocaleDateString("tr-TR")}
              </span>
            </div>

            {job.estimatedDeliveryDate && (
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center text-orange-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Tahmini Teslim</span>
                </div>
                <span className="text-sm font-bold text-orange-600">
                  {new Date(job.estimatedDeliveryDate).toLocaleDateString("tr-TR")}
                </span>
              </div>
            )}

            {job.price !== undefined && job.price > 0 && (
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center text-slate-500">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="text-sm">Tutar</span>
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(job.price)}
                </span>
              </div>
            )}
          </div>

          {job.issueDescription && (
            <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600">
              <span className="font-semibold text-slate-700 block mb-1">Açıklama:</span>
              {job.issueDescription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
