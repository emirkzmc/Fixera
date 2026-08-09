"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useCreateInventoryMutation } from "@/hooks/inventory/useInventoryMutation";
import toast from "react-hot-toast";

interface CreateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInventoryModal: React.FC<CreateInventoryModalProps> = ({ isOpen, onClose }) => {
  const { mutateAsync: createInventory, isPending } = useCreateInventoryMutation();
  
  const [itemName, setItemName] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [criticalLevel, setCriticalLevel] = useState<number>(5);
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    try {
      await createInventory({
        itemName,
        stockQuantity,
        criticalLevel,
        price
      });
      toast.success("Parça başarıyla eklendi");
      handleClose();
    } catch (error) {
      toast.error("Parça eklenirken bir hata oluştu");
    }
  };

  const handleClose = () => {
    setItemName("");
    setStockQuantity(0);
    setCriticalLevel(5);
    setPrice(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Stoka Parça Ekle">
      <form onSubmit={handleSubmit} className="space-y-5 p-2">
        <div className="space-y-1.5">
          <Label>Parça Adı</Label>
          <Input
            value={itemName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
            placeholder="Örn: Fren Balatası"
            required
            maxLength={255}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Stok Miktarı</Label>
            <Input
              type="number"
              value={stockQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockQuantity(Number(e.target.value))}
              min={0}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Kritik Seviye</Label>
            <Input
              type="number"
              value={criticalLevel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCriticalLevel(Number(e.target.value))}
              min={0}
              required
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Birim Fiyat (₺)</Label>
          <Input
            type="number"
            step="0.01"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
            min={0}
            required
          />
        </div>
        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Ekleniyor..." : "Parça Ekle"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
