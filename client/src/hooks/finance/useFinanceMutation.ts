import { useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '@/api/financeApi';
import type { CreatePaymentRequest, UpdatePaymentRequest } from '@/domains/financeDomains';
import { financeKeys } from '@/lib/query/keys/financeKeys';

export function useCreatePaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentRequest) => financeApi.createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.payments() });
      queryClient.invalidateQueries({ queryKey: financeKeys.summary() });
    },
  });
}

export function useUpdatePaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePaymentRequest }) => 
      financeApi.updatePayment(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: financeKeys.payments() });
      queryClient.invalidateQueries({ queryKey: financeKeys.paymentDetail(variables.id) });
      queryClient.invalidateQueries({ queryKey: financeKeys.summary() });
    },
  });
}
