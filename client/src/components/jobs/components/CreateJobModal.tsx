"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/Modal";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useGetCustomers } from "@/hooks/customer/useCustomer";
import { useCreateJobMutation } from "@/hooks/job/useJobMutation";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateJobModal({ isOpen, onClose }: CreateJobModalProps) {
  const { data: customers = [] } = useGetCustomers();
  const createJob = useCreateJobMutation();

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [itemIdentifier, setItemIdentifier] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleClose = () => {
    setCustomerId("");
    setCustomerName("");
    setItemIdentifier("");
    setIssueDescription("");
    setPrice("");
    onClose();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemIdentifier.trim()) {
      toast.error("Cihaz / Ürün tanımlayıcı boş olamaz");
      return;
    }

    // If customerId is selected, customerName is optional/ignored by backend
    // but we can pass customerName as well or let backend handle it.
    const selectedCustomer = customers.find((c) => c.id === customerId);
    const resolvedCustomerName = selectedCustomer ? selectedCustomer.fullName : customerName;

    createJob.mutate(
      {
        customerId: customerId || undefined,
        customerName: resolvedCustomerName || undefined,
        itemIdentifier,
        issueDescription: issueDescription || undefined,
        price: price ? parseFloat(price) : undefined,
      },
      {
        onSuccess: () => {
          toast.success("İş emri başarıyla oluşturuldu");
          handleClose();
        },
      }
    );
  };

  const customerOptions = [
    { label: "Mevcut Müşterilerden Seçin...", value: "" },
    ...customers.map((c) => ({ label: c.fullName, value: c.id })),
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Yeni İş Emri Başlat">
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="customerId">Müşteri Seçin (İsteğe Bağlı)</Label>
          <Select
            id="customerId"
            options={customerOptions}
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value);
              if (e.target.value) setCustomerName("");
            }}
          />
        </div>

        {!customerId && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="customerName">Müşteri Adı</Label>
            <Input
              id="customerName"
              placeholder="Yeni müşteri adı giriniz"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="itemIdentifier">Cihaz / Ürün Tanımlayıcı *</Label>
          <Input
            id="itemIdentifier"
            placeholder="Örn: iPhone 13, 34ABC123"
            value={itemIdentifier}
            onChange={(e) => setItemIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Tahmini Tutar / Fiyat (₺) (İsteğe Bağlı)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Örn: 1500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="issueDescription">Arıza Açıklaması</Label>
          <textarea
            id="issueDescription"
            placeholder="Arıza detaylarını yazınız..."
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all min-h-[100px] resize-y"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-[var(--border-color)]">
          <Button type="button" variant="secondary" onClick={handleClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" disabled={createJob.isPending}>
            {createJob.isPending ? "Oluşturuluyor..." : "İş Emri Oluştur"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
