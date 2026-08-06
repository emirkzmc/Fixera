export interface FinanceSummary {
  totalRevenue: number;
  pendingRevenue: number;
  totalJobs: number;
}

export interface Payment {
  id: string;
  workshopId: string;
  jobId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface CreatePaymentRequest {
  jobId: string;
  amount: number;
  status: string;
}

export interface UpdatePaymentRequest extends Partial<CreatePaymentRequest> {}
