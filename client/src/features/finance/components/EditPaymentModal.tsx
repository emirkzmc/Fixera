"use client";

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { useUpdatePaymentMutation } from '@/hooks/finance/useFinanceMutation';
import { toast } from 'react-hot-toast';
import type { Payment } from '@/domains/financeDomains';

interface EditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export function EditPaymentModal({ isOpen, onClose, payment }: EditPaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed' | 'refunded'>('pending');

  const updatePaymentMutation = useUpdatePaymentMutation();

  useEffect(() => {
    if (payment && isOpen) {
      setAmount(payment.amount.toString());
      setStatus(payment.status as any);
    }
  }, [payment, isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment || !amount) return;

    updatePaymentMutation.mutate(
      {
        id: payment.id,
        data: {
          amount: parseFloat(amount),
          status,
        },
      },
      {
        onSuccess: () => {
          toast.success('Ödeme başarıyla güncellendi');
          handleClose();
        },
        onError: () => {
          toast.error('Ödeme güncellenirken bir hata oluştu');
        },
      }
    );
  };

  const statusOptions = [
    { label: 'Bekliyor', value: 'pending' },
    { label: 'Tamamlandı', value: 'completed' },
    { label: 'İade', value: 'refunded' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Ödeme Düzenle" maxWidth="sm">
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        
        <div className="space-y-2">
          <Label>Müşteri / İş</Label>
          <div className="p-3 bg-[var(--background)] rounded-md border border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
            {payment?.customerName || "Bilinmiyor"}
          </div>
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
            disabled={updatePaymentMutation.isPending || !amount}
          >
            {updatePaymentMutation.isPending ? 'Güncelleniyor...' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
