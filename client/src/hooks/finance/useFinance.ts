import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/api/financeApi';
import { financeKeys } from '@/lib/query/keys/financeKeys';

export function useGetFinanceSummary() {
  return useQuery({
    queryKey: financeKeys.summary(),
    queryFn: () => financeApi.getSummary(),
  });
}

export function useGetPayments() {
  return useQuery({
    queryKey: financeKeys.payments(),
    queryFn: () => financeApi.getPayments(),
  });
}
