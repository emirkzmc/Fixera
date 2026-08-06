import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ICustomersService } from './interfaces/customer.service.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private mapToDto(row: any): CustomerResponseDto {
    return {
      id: row.id,
      workshopId: row.workshop_id,
      fullName: row.full_name,
      phone: row.phone,
      createdAt: row.created_at,
    };
  }

  async createCustomer(user: AuthenticatedUser, dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    const result = await this.databaseService.query(
      `INSERT INTO customers (workshop_id, full_name, phone) 
       VALUES ($1, $2, $3) RETURNING *`,
      [user.tenantId, dto.fullName, dto.phone || null]
    );
    return this.mapToDto(result.rows[0]);
  }

  async getCustomersByWorkshop(user: AuthenticatedUser): Promise<CustomerResponseDto[]> {
    const result = await this.databaseService.query(
      `SELECT * FROM customers WHERE workshop_id = $1 ORDER BY created_at DESC`,
      [user.tenantId]
    );
    return result.rows.map(this.mapToDto);
  }

  async getCustomerById(user: AuthenticatedUser, customerId: string): Promise<CustomerResponseDto> {
    const result = await this.databaseService.query(
      `SELECT * FROM customers WHERE id = $1 AND workshop_id = $2`,
      [customerId, user.tenantId]
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Müşteri bulunamadı');
    }
    return this.mapToDto(result.rows[0]);
  }

  async updateCustomer(user: AuthenticatedUser, customerId: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    await this.getCustomerById(user, customerId);

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.fullName !== undefined) {
      updates.push(`full_name = $${paramIndex++}`);
      values.push(dto.fullName);
    }
    if (dto.phone !== undefined) {
      updates.push(`phone = $${paramIndex++}`);
      values.push(dto.phone);
    }

    if (updates.length === 0) {
      return this.getCustomerById(user, customerId);
    }

    const query = `UPDATE customers SET ${updates.join(', ')} WHERE id = $${paramIndex++} AND workshop_id = $${paramIndex} RETURNING *`;
    values.push(customerId, user.tenantId);

    const result = await this.databaseService.query(query, values);
    return this.mapToDto(result.rows[0]);
  }
}
