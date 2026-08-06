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
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  customerId?: string;
  customerName?: string;
  itemIdentifier: string;
  issueDescription?: string;
}

export interface UpdateJobRequest {
  customerName?: string;
  itemIdentifier?: string;
  issueDescription?: string;
  status?: string;
  price?: number;
}
