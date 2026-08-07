import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workshopApi } from '@/api/workshopApi';
import type { UpdateWorkshopRequest } from '@/domains/workshopDomains';
import { workshopKeys } from '@/lib/query/keys/workshopKeys';

export function useUpdateMyWorkshopMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateWorkshopRequest) => workshopApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workshopKeys.me() });
    },
  });
}
