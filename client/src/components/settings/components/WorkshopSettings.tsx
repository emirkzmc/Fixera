"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetMyWorkshop } from "@/hooks/workshop/useWorkshop";
import { useUpdateMyWorkshopMutation } from "@/hooks/workshop/useWorkshopMutation";

export const WorkshopSettings = () => {
  const { data: workshop, isLoading } = useGetMyWorkshop();
  const updateWorkshop = useUpdateMyWorkshopMutation();
  
  const [name, setName] = useState("");
  const [themeColor, setThemeColor] = useState("#C65D1A");

  useEffect(() => {
    if (workshop) {
      setName(workshop.name || "");
      setThemeColor(workshop.themeColor || "#C65D1A");
    }
  }, [workshop]);

  const handleSave = () => {
    if (!name) {
      toast.error("Atölye adı boş olamaz");
      return;
    }
    
    updateWorkshop.mutate(
      { name, themeColor },
      {
        onSuccess: () => {
          toast.success("Atölye bilgileri güncellendi");
        },
        onError: () => {
          toast.error("Bir hata oluştu");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="workshopName">Atölye Adı</Label>
        <Input 
          id="workshopName" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Atölye adını giriniz" 
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="themeColor">Tema Rengi</Label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            id="themeColor"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="h-10 w-20 rounded-md cursor-pointer border border-[var(--border-color)] bg-[var(--background)] p-1"
          />
          <span className="text-sm text-[var(--text-secondary)] font-mono">
            {themeColor}
          </span>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={updateWorkshop.isPending}
        >
          {updateWorkshop.isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </div>
  );
};
