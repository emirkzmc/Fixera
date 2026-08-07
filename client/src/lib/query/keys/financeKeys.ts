export const financeKeys = {
  all: ['finances'] as const,
  summary: () => [...financeKeys.all, 'summary'] as const,
  payments: () => [...financeKeys.all, 'payments'] as const,
  paymentDetails: () => [...financeKeys.payments(), 'detail'] as const,
  paymentDetail: (id: string) => [...financeKeys.paymentDetails(), id] as const,
};
