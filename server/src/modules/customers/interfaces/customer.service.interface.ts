import type { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export interface ICustomersService {
  createCustomer(user: AuthenticatedUser, dto: CreateCustomerDto): Promise<CustomerResponseDto>;
  getCustomersByWorkshop(user: AuthenticatedUser): Promise<CustomerResponseDto[]>;
  getCustomerById(user: AuthenticatedUser, customerId: string): Promise<CustomerResponseDto>;
  updateCustomer(user: AuthenticatedUser, customerId: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
