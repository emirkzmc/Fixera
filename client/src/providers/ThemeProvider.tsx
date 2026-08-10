"use client";

import React, { useEffect } from "react";
import { applyThemeVariables } from "@/utils/colorUtils";
import { useGetMyWorkshop } from "@/hooks/workshop/useWorkshop";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: workshop } = useGetMyWorkshop();

  useEffect(() => {
    if (workshop?.themeColor) {
      applyThemeVariables(workshop.themeColor);
    }
  }, [workshop?.themeColor]);

  return <>{children}</>;
}
