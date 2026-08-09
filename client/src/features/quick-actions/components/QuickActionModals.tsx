"use client";

import React from "react";
import { CreateJobModal } from "@/features/jobs/components/CreateJobModal";
import { CreateCustomerModal } from "@/features/customers/components/CreateCustomerModal";
import { CreateInventoryModal } from "@/features/inventory/components/CreateInventoryModal";
import { CreatePaymentModal } from "@/features/finance/components/CreatePaymentModal";

type ModalType = "newJob" | "newCustomer" | "addStock" | "quickPayment" | null;

interface QuickActionModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export function QuickActionModals({ activeModal, onClose }: QuickActionModalsProps) {
  return (
    <>
      <CreateJobModal isOpen={activeModal === "newJob"} onClose={onClose} />
      <CreateCustomerModal isOpen={activeModal === "newCustomer"} onClose={onClose} />
      <CreateInventoryModal isOpen={activeModal === "addStock"} onClose={onClose} />
      <CreatePaymentModal isOpen={activeModal === "quickPayment"} onClose={onClose} />
    </>
  );
}
