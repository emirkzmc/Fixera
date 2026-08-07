import apiClient from '../lib/apiClient';
import { CustomerApiMethod } from '../constants/MethodNames';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../domains/customerDomains';

export const customerApi = {
  getAll: () => apiClient.get<any, Customer[]>(CustomerApiMethod.GET_ALL),
  create: (data: CreateCustomerRequest) => apiClient.post<any, Customer>(CustomerApiMethod.CREATE, data),
  getById: (id: string) => apiClient.get<any, Customer>(CustomerApiMethod.GET_BY_ID.replace(':id', id)),
  update: (id: string, data: UpdateCustomerRequest) => apiClient.put<any, Customer>(CustomerApiMethod.UPDATE.replace(':id', id), data),
};
