import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@/api/inventoryApi';
import type { CreateInventoryItemRequest, UpdateInventoryItemRequest, UseInventoryRequest } from '@/domains/inventoryDomains';
import { inventoryKeys } from '@/lib/query/keys/inventoryKeys';

export function useCreateInventoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryItemRequest) => inventoryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
  });
}

export function useUpdateInventoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInventoryItemRequest }) => 
      inventoryApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(variables.id) });
    },
  });
}

export function useUseForJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: UseInventoryRequest }) => 
      inventoryApi.useForJob(jobId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(variables.data.itemId) });
    },
  });
}
