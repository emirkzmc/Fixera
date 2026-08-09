export interface Job {
  id: string;
  workshopId: string;
  customerId?: string;
  customerName?: string;
  itemIdentifier: string;
  issueDescription?: string;
  status: string;
  price: number;
  trackingCode: string;
  estimatedDeliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  customerId?: string;
  customerName?: string;
  itemIdentifier: string;
  issueDescription?: string;
  price?: number;
  estimatedDeliveryDate?: string;
}

export interface UpdateJobRequest {
  customerName?: string;
  itemIdentifier?: string;
  issueDescription?: string;
  status?: string;
  price?: number;
  estimatedDeliveryDate?: string;
}
