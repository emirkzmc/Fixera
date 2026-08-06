import type { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { FinanceSummaryDto } from '../dto/finance-summary.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

export interface IFinancesService {
  addPayment(user: AuthenticatedUser, dto: CreatePaymentDto): Promise<PaymentResponseDto>;
  getPayments(user: AuthenticatedUser): Promise<PaymentResponseDto[]>;
  getWorkshopSummary(user: AuthenticatedUser): Promise<FinanceSummaryDto>;
  updatePayment(user: AuthenticatedUser, paymentId: string, dto: UpdatePaymentDto): Promise<PaymentResponseDto>;
}
