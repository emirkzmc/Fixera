import { useQuery } from '@tanstack/react-query';
import { customerApi } from '@/api/customerApi';
import { customerKeys } from '@/lib/query/keys/customerKeys';

export function useGetCustomers() {
  return useQuery({
    queryKey: customerKeys.lists(),
    queryFn: () => customerApi.getAll(),
  });
}

export function useGetCustomerById(id: string | null) {
  return useQuery({
    queryKey: customerKeys.detail(id ?? ''),
    queryFn: () => customerApi.getById(id!),
    enabled: !!id,
  });
}
