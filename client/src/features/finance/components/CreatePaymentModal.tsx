"use client";

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { useCreatePaymentMutation } from '@/hooks/finance/useFinanceMutation';
import { useGetJobs } from '@/hooks/job/useJob';
import { toast } from 'react-hot-toast';

interface CreatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePaymentModal({ isOpen, onClose }: CreatePaymentModalProps) {
  const [jobId, setJobId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed' | 'refunded'>('pending');

  const { data: jobs = [], isLoading: isLoadingJobs } = useGetJobs();
  const createPaymentMutation = useCreatePaymentMutation();

  const handleClose = () => {
    setJobId('');
    setAmount('');
    setStatus('pending');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId || !amount) return;

    createPaymentMutation.mutate(
      {
        jobId,
        amount: parseFloat(amount),
        status,
      },
      {
        onSuccess: () => {
          toast.success('Ödeme başarıyla kaydedildi');
          handleClose();
        },
        onError: () => {
          toast.error('Ödeme kaydedilirken bir hata oluştu');
        },
      }
    );
  };

  const jobOptions = jobs.map((job) => ({
    label: `${job.customerName} - ${job.itemIdentifier}`,
    value: job.id,
  }));

  const statusOptions = [
    { label: 'Bekliyor', value: 'pending' },
    { label: 'Tamamlandı', value: 'completed' },
    { label: 'İade', value: 'refunded' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Hızlı Ödeme Al" maxWidth="sm">
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>İş Seçimi</Label>
          <Select
            options={jobOptions}
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder={isLoadingJobs ? 'İşler yükleniyor...' : 'Bir iş seçin'}
            disabled={isLoadingJobs}
          />
        </div>

        <div className="space-y-2">
          <Label>Tutar (₺)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Durum</Label>
          <Select
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={handleClose}>
            İptal
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={createPaymentMutation.isPending || !jobId || !amount}
          >
            {createPaymentMutation.isPending ? 'Kaydediliyor...' : 'Ödeme Kaydet'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
