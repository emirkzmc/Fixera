import { useQuery } from '@tanstack/react-query';
import { workshopApi } from '@/api/workshopApi';
import { workshopKeys } from '@/lib/query/keys/workshopKeys';

export function useGetPublicWorkshop(id: string | null) {
  return useQuery({
    queryKey: workshopKeys.publicDetail(id ?? ''),
    queryFn: () => workshopApi.getPublic(id!),
    enabled: !!id,
  });
}

export function useGetMyWorkshop() {
  return useQuery({
    queryKey: workshopKeys.me(),
    queryFn: () => workshopApi.getMe(),
  });
}
