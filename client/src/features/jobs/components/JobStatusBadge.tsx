"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

type JobStatus = 'waiting' | 'in_progress' | 'completed' | 'delivered';

const STATUS_MAP: Record<JobStatus, { variant: "success" | "warning" | "info" | "danger" | "neutral", label: string }> = {
  waiting: { variant: "warning", label: "Bekliyor" },
  in_progress: { variant: "info", label: "Devam Ediyor" },
  completed: { variant: "success", label: "Tamamlandı" },
  delivered: { variant: "neutral", label: "Teslim Edildi" },
};

interface JobStatusBadgeProps {
  status: string;
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const config = STATUS_MAP[status as JobStatus] || { variant: "neutral", label: status };
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};
