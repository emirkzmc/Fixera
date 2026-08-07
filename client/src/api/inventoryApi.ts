import apiClient from '../lib/apiClient';
import { InventoryApiMethod } from '../constants/MethodNames';
import type { InventoryItem, CreateInventoryItemRequest, UpdateInventoryItemRequest, UseInventoryRequest } from '../domains/inventoryDomains';

export const inventoryApi = {
  getAll: () => apiClient.get<any, InventoryItem[]>(InventoryApiMethod.GET_ALL),
  create: (data: CreateInventoryItemRequest) => apiClient.post<any, InventoryItem>(InventoryApiMethod.CREATE, data),
  update: (id: string, data: UpdateInventoryItemRequest) => apiClient.put<any, InventoryItem>(InventoryApiMethod.UPDATE.replace(':id', id), data),
  useForJob: (jobId: string, data: UseInventoryRequest) => apiClient.post<any, any>(InventoryApiMethod.USE_FOR_JOB.replace(':jobId', jobId), data),
};
