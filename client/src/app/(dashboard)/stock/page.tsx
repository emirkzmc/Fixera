"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { useGetInventory } from "@/hooks/inventory/useInventory";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { CreateInventoryModal } from "@/features/inventory/components/CreateInventoryModal";
import { EditInventoryModal } from "@/features/inventory/components/EditInventoryModal";
import { UseInventoryModal } from "@/features/inventory/components/UseInventoryModal";
import { Button } from "@/components/ui/Button";
import type { InventoryItem } from "@/domains/inventoryDomains";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";

export default function StockPage() {
  const { data: inventory = [], isLoading, error } = useGetInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [usingItem, setUsingItem] = useState<InventoryItem | null>(null);

  const criticalCount = useMemo(() => {
    return inventory.filter(item => item.stockQuantity <= item.criticalLevel).length;
  }, [inventory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col"
    >
      <PageHeader 
        title="Stok Yönetimi" 
        description="Atölyenizdeki tüm yedek parça ve malzemeleri buradan takip edebilirsiniz."
        action={
          <Button className="flex items-center justify-center" variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Parça Ekle
          </Button>
        }
      >
        {criticalCount > 0 && (
          <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
            {criticalCount} parça kritik seviyenin altında!
          </div>
        )}
      </PageHeader>

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
          <InventoryTable 
            items={inventory} 
            onEditClick={(item) => setEditingItem(item)}
            onUseClick={(item) => setUsingItem(item)}
          />
        )}
      </div>

      <CreateInventoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <EditInventoryModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
      />
      
      <UseInventoryModal
        isOpen={!!usingItem}
        onClose={() => setUsingItem(null)}
        item={usingItem}
      />
    </motion.div>
  );
}
