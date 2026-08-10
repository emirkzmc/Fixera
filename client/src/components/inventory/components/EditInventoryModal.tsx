"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useUpdateInventoryMutation } from "@/hooks/inventory/useInventoryMutation";
import toast from "react-hot-toast";
import type { InventoryItem } from "@/domains/inventoryDomains";

interface EditInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export const EditInventoryModal: React.FC<EditInventoryModalProps> = ({ isOpen, onClose, item }) => {
  const { mutateAsync: updateInventory, isPending } = useUpdateInventoryMutation();
  
  const [itemName, setItemName] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [criticalLevel, setCriticalLevel] = useState<number>(5);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (item && isOpen) {
      setItemName(item.itemName);
      setStockQuantity(item.stockQuantity);
      setCriticalLevel(item.criticalLevel);
      setPrice(item.price);
    }
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !item) return;

    try {
      await updateInventory({
        id: item.id,
        data: {
          itemName,
          stockQuantity,
          criticalLevel,
          price
        }
      });
      toast.success("Parça başarıyla güncellendi");
      handleClose();
    } catch (error) {
      toast.error("Parça güncellenirken bir hata oluştu");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Stok Parçası Düzenle">
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
              value={stockQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockQuantity(Number(e.target.value))}
              min={0}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Kritik Seviye</Label>
            <Input
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
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
