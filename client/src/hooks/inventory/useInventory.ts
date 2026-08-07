import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '@/api/inventoryApi';
import { inventoryKeys } from '@/lib/query/keys/inventoryKeys';

export function useGetInventory() {
  return useQuery({
    queryKey: inventoryKeys.lists(),
    queryFn: () => inventoryApi.getAll(),
  });
}
