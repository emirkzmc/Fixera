"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { useGetInventory } from "@/hooks/inventory/useInventory";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { CreateInventoryModal } from "@/features/inventory/components/CreateInventoryModal";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

export default function StockPage() {
  const { data: inventory = [], isLoading, error } = useGetInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const criticalCount = useMemo(() => {
    return inventory.filter(item => item.stockQuantity <= item.criticalLevel).length;
  }, [inventory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Stok Yönetimi</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Atölyenizdeki tüm yedek parça ve malzemeleri buradan takip edebilirsiniz.
          </p>
          {criticalCount > 0 && (
            <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              {criticalCount} parça kritik seviyenin altında!
            </div>
          )}
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Parça Ekle
        </Button>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">Stok bilgileri yüklenirken bir hata oluştu.</div>
        ) : inventory.length === 0 ? (
          <div className="p-12">
            <EmptyState
              icon={Package}
              title="Stokta hiç parça yok"
              description="Sisteme henüz bir yedek parça veya malzeme eklenmemiş."
              actionLabel="Parça Ekle"
              onAction={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <InventoryTable items={inventory} />
        )}
      </div>

      <CreateInventoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.div>
  );
}
