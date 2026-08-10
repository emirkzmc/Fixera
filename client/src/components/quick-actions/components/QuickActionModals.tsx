"use client";

import React from "react";
import { CreateJobModal } from "@/components/jobs/components/CreateJobModal";
import { CreateCustomerModal } from "@/components/customers/components/CreateCustomerModal";
import { CreateInventoryModal } from "@/components/inventory/components/CreateInventoryModal";
import { CreatePaymentModal } from "@/components/finance/components/CreatePaymentModal";

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
