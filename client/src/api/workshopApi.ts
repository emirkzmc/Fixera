import apiClient from '../lib/apiClient';
import { WorkshopApiMethod } from '../constants/MethodNames';
import type { Workshop, UpdateWorkshopRequest } from '../domains/workshopDomains';

export const workshopApi = {
  getPublic: (id: string) => apiClient.get<any, Workshop>(WorkshopApiMethod.GET_PUBLIC.replace(':id', id)),
  getMe: () => apiClient.get<any, Workshop>(WorkshopApiMethod.GET_ME),
  updateMe: (data: UpdateWorkshopRequest) => apiClient.put<any, Workshop>(WorkshopApiMethod.UPDATE_ME, data),
};
