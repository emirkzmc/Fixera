import { useQuery } from '@tanstack/react-query';
import { jobApi } from '@/api/jobApi';
import { jobKeys } from '@/lib/query/keys/jobKeys';

export function useGetJobs() {
  return useQuery({
    queryKey: jobKeys.lists(),
    queryFn: () => jobApi.getAll(),
  });
}

export function useGetJobById(id: string | null) {
  return useQuery({
    queryKey: jobKeys.detail(id ?? ''),
    queryFn: () => jobApi.getById(id!),
    enabled: !!id,
  });
}

export function useTrackJob(trackingCode: string | null) {
  return useQuery({
    queryKey: jobKeys.track(trackingCode ?? ''),
    queryFn: () => jobApi.track(trackingCode!),
    enabled: !!trackingCode,
  });
}
