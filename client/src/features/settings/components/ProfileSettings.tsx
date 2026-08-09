"use client";

import React from "react";
import { useGetMe } from "@/hooks/auth/useAuth";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ProfileSettings() {
  const { data: user, isLoading } = useGetMe();

  if (isLoading) {
    return <LoadingSpinner size="md" />;
  }

  if (!user) {
    return (
      <div className="text-center text-sm text-[var(--text-secondary)] py-6">
        Kullanıcı bilgileri yüklenemedi.
      </div>
    );
  }

  const initialLetter = user.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      {/* Avatar Display */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-gradient-to)] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
          {initialLetter}
        </div>
        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">
          Kullanıcı Profili
        </span>
      </div>

      {/* Info Display Fields */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="profileName">Ad Soyad</Label>
          <Input
            id="profileName"
            value={user.fullName}
            readOnly
            className="cursor-not-allowed opacity-75 border-[var(--border-color)] bg-[var(--background)]"
          />
          <span className="text-xs text-[var(--text-tertiary)]">
            Ad soyad düzenleme yetkisi geçici olarak kilitlidir.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="profileEmail">E-posta Adresi</Label>
          <Input
            id="profileEmail"
            type="email"
            value={user.email}
            readOnly
            className="cursor-not-allowed opacity-75 border-[var(--border-color)] bg-[var(--background)]"
          />
          <span className="text-xs text-[var(--text-tertiary)]">
            E-posta adresi değiştirilemez.
          </span>
        </div>
      </div>
    </div>
  );
}
