import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IFinancesService } from './interfaces/finances.service.interface';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { FinanceSummaryDto } from './dto/finance-summary.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@Injectable()
export class FinancesService implements IFinancesService {
  constructor(private readonly databaseService: DatabaseService) {}

  private mapToDto(row: any): PaymentResponseDto {
    return {
      id: row.id,
      workshopId: row.workshop_id,
      jobId: row.job_id,
      amount: parseFloat(row.amount),
      status: row.status,
      createdAt: row.created_at,
    };
  }

  async addPayment(user: AuthenticatedUser, dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    // 1. İş emrinin bu dükkana ait olduğunu doğrula
    const jobResult = await this.databaseService.query('SELECT * FROM jobs WHERE id = $1 AND workshop_id = $2', [dto.jobId, user.tenantId]);
    if (jobResult.rows.length === 0) {
      throw new NotFoundException('İş emri bulunamadı');
    }

    const result = await this.databaseService.query(
      `INSERT INTO payments (workshop_id, job_id, amount, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user.tenantId, dto.jobId, dto.amount, dto.status]
    );
    return this.mapToDto(result.rows[0]);
  }

  async getPayments(user: AuthenticatedUser): Promise<PaymentResponseDto[]> {
    const result = await this.databaseService.query(
      `SELECT * FROM payments WHERE workshop_id = $1 ORDER BY created_at DESC`,
      [user.tenantId]
    );
    return result.rows.map(this.mapToDto);
  }

  async getWorkshopSummary(user: AuthenticatedUser): Promise<FinanceSummaryDto> {
    const revenueResult = await this.databaseService.query(
      `SELECT 
         COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_revenue,
         COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_revenue
       FROM payments 
       WHERE workshop_id = $1`,
      [user.tenantId]
    );

    const jobsResult = await this.databaseService.query(
      `SELECT COUNT(*) as total_jobs FROM jobs WHERE workshop_id = $1`,
      [user.tenantId]
    );

    return {
      totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
      pendingRevenue: parseFloat(revenueResult.rows[0].pending_revenue),
      totalJobs: parseInt(jobsResult.rows[0].total_jobs, 10),
    };
  }

  async updatePayment(user: AuthenticatedUser, paymentId: string, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const existingResult = await this.databaseService.query(
      `SELECT * FROM payments WHERE id = $1 AND workshop_id = $2`,
      [paymentId, user.tenantId]
    );
    
    if (existingResult.rows.length === 0) {
      throw new NotFoundException('Ödeme bulunamadı');
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.amount !== undefined) {
      updates.push(`amount = $${paramIndex++}`);
      values.push(dto.amount);
    }
    if (dto.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(dto.status);
    }

    if (updates.length === 0) {
      return this.mapToDto(existingResult.rows[0]);
    }

    const query = `UPDATE payments SET ${updates.join(', ')} WHERE id = $${paramIndex++} AND workshop_id = $${paramIndex} RETURNING *`;
    values.push(paymentId, user.tenantId);

    const result = await this.databaseService.query(query, values);
    return this.mapToDto(result.rows[0]);
  }
}
