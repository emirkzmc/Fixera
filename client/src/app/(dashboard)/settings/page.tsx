"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProfileSettings } from "@/components/settings/components/ProfileSettings";
import { WorkshopSettings } from "@/components/settings/components/WorkshopSettings";

import { PageHeader } from "@/components/ui/PageHeader";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6">
      <div className="mb-5 pb-4 border-b border-[var(--border-color)]">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">{title}</h2>
        {description && (
          <p className="text-xs text-[var(--text-secondary)] mt-1">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col"
    >
      <PageHeader 
        title="Ayarlar"
        description="Kullanıcı profilinizi, atölye ayarlarınızı ve sistem bildirim tercihlerini buradan yönetin."
      />

      <SettingsSection
        title="Profil Bilgileri"
        description="Kişisel hesabınıza ait temel e-posta ve iletişim bilgileri."
      >
        <ProfileSettings />
      </SettingsSection>



      <SettingsSection
        title="Atölye Ayarları"
        description="Atölye adı ve sistem genelinde uygulanacak marka tema rengi."
      >
        <WorkshopSettings />
      </SettingsSection>
    </motion.div>
  );
}
