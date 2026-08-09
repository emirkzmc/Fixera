"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, Plus } from "lucide-react";
import { useGetCustomers } from "@/hooks/customer/useCustomer";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { CreateCustomerModal } from "@/features/customers/components/CreateCustomerModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: customers = [], isLoading } = useGetCustomers();

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return customers;
    const lowerQuery = search.toLowerCase();
    return customers.filter((c) =>
      c.fullName.toLowerCase().includes(lowerQuery)
    );
  }, [customers, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Müşteriler</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Atölyenize kayıtlı tüm müşterileri görüntüleyin ve yönetin.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
        <div className="mb-6 max-w-md">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-[var(--text-secondary)]" />
            </div>
            <div className="pl-10">
              <Input
                type="text"
                placeholder="Müşteri ara..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredCustomers.length > 0 ? (
          <CustomersTable customers={filteredCustomers} />
        ) : (
          <EmptyState
            icon={Users}
            title="Müşteri Bulunamadı"
            description={
              search
                ? `"${search}" aramasına uygun müşteri bulunamadı.`
                : "Henüz hiç müşteri eklenmemiş. Yeni müşteri ekleyerek başlayabilirsiniz."
            }
            actionLabel={search ? "Aramayı Temizle" : "Yeni Müşteri Ekle"}
            onAction={() => {
              if (search) setSearch("");
              else setIsModalOpen(true);
            }}
          />
        )}
      </div>

      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
