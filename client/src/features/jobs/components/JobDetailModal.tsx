"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useGetJobById } from "@/hooks/job/useJob";
import { useDeleteJobMutation } from "@/hooks/job/useJobMutation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Trash2, Calendar, FileText, Smartphone, User, Hash, CreditCard } from "lucide-react";
import { toast } from "react-hot-toast";
import { JobStatusBadge } from "./JobStatusBadge";

interface JobDetailModalProps {
  jobId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailModal({ jobId, isOpen, onClose }: JobDetailModalProps) {
  const { data: job, isLoading } = useGetJobById(jobId || "");
  const deleteMutation = useDeleteJobMutation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmDelete(false);
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  const handleDelete = () => {
    if (!jobId) return;
    deleteMutation.mutate(jobId, {
      onSuccess: () => {
        toast.success("İş emri silindi");
        onClose();
      },
      onError: () => {
        toast.error("İş emri silinirken hata oluştu");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="İş Emri Detayları" maxWidth="2xl">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : !job ? (
        <div className="text-center py-10 text-[var(--text-secondary)]">
          İş emri bulunamadı.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono font-bold text-lg text-[var(--accent)]">{job.trackingCode}</span>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">
                Oluşturulma: {formatDate(job.createdAt)}
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <JobStatusBadge status={job.status} />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Müşteri</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{job.customerName || "Bilinmiyor"}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Cihaz / Ürün</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{job.itemIdentifier}</span>
                </div>
              </div>
              {job.price !== undefined && job.price > 0 && (
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Tutar / Fiyat</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{formatPrice(job.price)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Tahmini Teslim</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {job.estimatedDeliveryDate ? formatDate(job.estimatedDeliveryDate) : "Belirtilmedi"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Arıza Açıklaması</span>
                  <span className="text-sm text-[var(--text-primary)] mt-1 whitespace-pre-wrap">
                    {job.issueDescription || "Açıklama girilmedi."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-2 border-t border-[var(--border-color)] flex justify-between items-center">
            {showConfirmDelete ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-500 font-medium">Emin misiniz?</span>
                <Button variant="outline" onClick={() => setShowConfirmDelete(false)}>İptal</Button>
                <Button 
                  variant="primary" 
                  className="bg-red-500 hover:bg-red-600 border-red-500 text-white"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Siliniyor..." : "Evet, Sil"}
                </Button>
              </div>
            ) : (
              <button 
                onClick={() => setShowConfirmDelete(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
                <span>İş Emrini Sil</span>
              </button>
            )}
            
            <Button variant="outline" onClick={onClose}>
              Kapat
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
