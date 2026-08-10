"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useGetMyWorkshop } from "@/hooks/workshop/useWorkshop";
import { useUpdateMyWorkshopMutation } from "@/hooks/workshop/useWorkshopMutation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description: string;
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, label, description, disabled }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-0">
      <div className="flex flex-col gap-1 pr-6">
        <span className="text-sm font-semibold text-[var(--text-primary)]">{label}</span>
        <span className="text-xs text-[var(--text-secondary)]">{description}</span>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 cursor-pointer w-12 h-6 rounded-full p-1   transition-colors duration-200 outline-none flex items-center
          ${checked ? "bg-[var(--accent)]" : "bg-[var(--border-color)]"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <motion.div
          layout
          className="w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

export function NotificationSettings() {
  const { data: workshop, isLoading } = useGetMyWorkshop();
  const updateWorkshop = useUpdateMyWorkshopMutation();

  if (isLoading) {
    return <LoadingSpinner size="md" />;
  }

  if (!workshop) {
    return (
      <div className="text-center text-sm text-[var(--text-secondary)] py-6">
        Atölye ayarları yüklenemedi.
      </div>
    );
  }

  const handleToggle = (field: "smsEnabled" | "whatsappEnabled", value: boolean) => {
    updateWorkshop.mutate(
      { [field]: value },
      {
        onSuccess: () => {
          toast.success("Bildirim tercihleri güncellendi");
        },
        onError: () => {
          toast.error("Bir hata oluştu");
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <ToggleSwitch
        label="SMS Bildirimleri"
        description="İş emri güncellemelerinde müşterilere otomatik SMS bildirimi gönderir."
        checked={workshop.smsEnabled}
        onChange={(val) => handleToggle("smsEnabled", val)}
        disabled={updateWorkshop.isPending}
      />
      <ToggleSwitch
        label="WhatsApp Bildirimleri"
        description="İş emri güncellemelerinde müşterilere otomatik WhatsApp mesajı gönderir."
        checked={workshop.whatsappEnabled}
        onChange={(val) => handleToggle("whatsappEnabled", val)}
        disabled={updateWorkshop.isPending}
      />
    </div>
  );
}
