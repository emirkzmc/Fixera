"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateCustomerMutation } from "@/hooks/customer/useCustomerMutation";

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCustomerModal({ isOpen, onClose }: CreateCustomerModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate: createCustomer, isPending } = useCreateCustomerMutation();

  const handleClose = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setError("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Ad soyad zorunludur.");
      return;
    }

    createCustomer(
      { fullName, phone: phone || undefined, email: email || undefined },
      {
        onSuccess: () => {
          toast.success("Müşteri başarıyla eklendi");
          handleClose();
        },
        onError: () => {
          toast.error("Müşteri eklenirken bir hata oluştu");
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Yeni Müşteri" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              Ad Soyad
            </label>
            <Input
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFullName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Örn: Ahmet Yılmaz"
              maxLength={100}
              error={!!error}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              Telefon (Opsiyonel)
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              placeholder="Örn: 0555 555 5555"
              maxLength={20}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              E-Posta (Opsiyonel)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Örn: musteri@gmail.com"
              maxLength={255}
            />
            <p className="mt-1.5 text-xs text-[var(--text-secondary)] italic">
              * İşlem durumlarını anında öğrenmek için e-posta adresi yazmanızı öneririz.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
          <Button type="button" variant="outline" onClick={handleClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Ekleniyor..." : "Müşteri Ekle"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
