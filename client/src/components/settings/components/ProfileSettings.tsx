"use client";

import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useGetMe } from "@/hooks/auth/useAuth";
import { useUpdateProfilePhotoMutation } from "@/hooks/auth/useAuthMutation";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ProfileSettings() {
  const { data: user, isLoading } = useGetMe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updatePhoto, isPending: isUploading } = useUpdateProfilePhotoMutation();

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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Dosya boyutu 5MB'dan küçük olmalıdır.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    updatePhoto(formData, {
      onSuccess: () => {
        toast.success("Profil fotoğrafı güncellendi");
      },
      onError: () => {
        toast.error("Fotoğraf yüklenirken bir hata oluştu");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      {/* Avatar Display */}
      <div className="flex flex-col items-center gap-3">
        <div 
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-gradient-to)] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg overflow-hidden relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {user.profilePhoto ? (
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL}${user.profilePhoto}`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            initialLetter
          )}
          
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium">{isUploading ? "Yükleniyor" : "Değiştir"}</span>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
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
