import apiClient from '../lib/apiClient';
import { FinanceApiMethod } from '../constants/MethodNames';
import type { FinanceSummary, Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../domains/financeDomains';

export const financeApi = {
  getSummary: () => apiClient.get<any, FinanceSummary>(FinanceApiMethod.GET_SUMMARY),
  getPayments: () => apiClient.get<any, Payment[]>(FinanceApiMethod.GET_PAYMENTS),
  createPayment: (data: CreatePaymentRequest) => apiClient.post<any, Payment>(FinanceApiMethod.CREATE_PAYMENT, data),
  updatePayment: (id: string, data: UpdatePaymentRequest) => apiClient.put<any, Payment>(FinanceApiMethod.UPDATE_PAYMENT.replace(':id', id), data),
};
