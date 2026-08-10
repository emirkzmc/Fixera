"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { useUseForJobMutation } from "@/hooks/inventory/useInventoryMutation";
import { useGetJobs } from "@/hooks/job/useJob";
import toast from "react-hot-toast";
import type { InventoryItem } from "@/domains/inventoryDomains";

interface UseInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export const UseInventoryModal: React.FC<UseInventoryModalProps> = ({ isOpen, onClose, item }) => {
  const { mutateAsync: useForJob, isPending } = useUseForJobMutation();
  const { data: jobs = [], isLoading: isLoadingJobs } = useGetJobs();
  
  const [jobId, setJobId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId || !item || quantity <= 0) return;

    if (quantity > item.stockQuantity) {
      toast.error("Yetersiz stok!");
      return;
    }

    try {
      await useForJob({
        jobId,
        data: {
          inventoryId: item.id,
          quantity
        }
      });
      toast.success("Parça iş emrinde kullanıldı");
      handleClose();
    } catch (error) {
      toast.error("Parça kullanılırken bir hata oluştu");
    }
  };

  const handleClose = () => {
    setJobId("");
    setQuantity(1);
    onClose();
  };

  const jobOptions = jobs
    .filter(j => j.status === 'in_progress' || j.status === 'waiting')
    .map(job => ({
      label: `${job.trackingCode} - ${job.customerName || 'Bilinmiyor'} (${job.itemIdentifier})`,
      value: job.id
    }));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Parçayı İş Emrinde Kullan">
      <form onSubmit={handleSubmit} className="space-y-5 p-2">
        <div className="p-3 bg-[var(--info-light)] text-[var(--info)] rounded-lg text-sm border border-[var(--info)]/20">
          <strong>{item?.itemName}</strong> adlı parçadan kullanacaksınız. Mevcut stok: <strong>{item?.stockQuantity}</strong>
        </div>

        <div className="space-y-1.5">
          <Label>İş Emri Seçin</Label>
          <Select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            options={jobOptions}
            placeholder={isLoadingJobs ? "İş emirleri yükleniyor..." : "Bir iş emri seçin"}
            disabled={isLoadingJobs}
          />
          {jobOptions.length === 0 && !isLoadingJobs && (
            <p className="text-xs text-[var(--warning)] mt-1">Aktif bir iş emri bulunamadı.</p>
          )}
        </div>
        
        <div className="space-y-1.5">
          <Label>Kullanılacak Miktar</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
            min={1}
            max={item?.stockQuantity || 1}
            required
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending || !jobId || quantity <= 0}>
            {isPending ? "İşleniyor..." : "Kullan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
