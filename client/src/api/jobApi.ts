import apiClient from '../lib/apiClient';
import { JobApiMethod } from '../constants/MethodNames';
import type { Job, CreateJobRequest, UpdateJobRequest } from '../domains/jobDomains';

export const jobApi = {
  getAll: () => apiClient.get<any, Job[]>(JobApiMethod.GET_ALL),
  create: (data: CreateJobRequest) => apiClient.post<any, Job>(JobApiMethod.CREATE, data),
  getById: (id: string) => apiClient.get<any, Job>(JobApiMethod.GET_BY_ID.replace(':id', id)),
  update: (id: string, data: UpdateJobRequest) => apiClient.put<any, Job>(JobApiMethod.UPDATE.replace(':id', id), data),
  delete: (id: string) => apiClient.delete<any, any>(JobApiMethod.DELETE.replace(':id', id)),
  track: (trackingCode: string) => apiClient.get<any, Job>(JobApiMethod.TRACK.replace(':trackingCode', trackingCode)),
};
