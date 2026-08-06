export interface Customer {
  id: string;
  workshopId: string;
  fullName: string;
  phone?: string;
  createdAt: string; // Date strings in JSON
}

export interface CreateCustomerRequest {
  fullName: string;
  phone?: string;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {}
