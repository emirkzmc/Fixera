import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IJobService } from './interfaces/job.service.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobResponseDto } from './dto/job-response.dto';
import { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';
import { EventsGateway } from '../events/events.gateway';
import type { INotificationsService } from '../notifications/interfaces/notifications.service.interface';

@Injectable()
export class JobService implements IJobService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly eventsGateway: EventsGateway,
    @Inject('INotificationsService') private readonly notificationsService: INotificationsService,
  ) {}

  async createJob(user: AuthenticatedUser, dto: CreateJobDto): Promise<JobResponseDto> {
    const tenantId = this.resolveTenantId(user);
    const trackingCode = this.generateTrackingCode();

    const result = await this.databaseService.query(
      `INSERT INTO jobs (workshop_id, customer_id, customer_name, item_identifier, issue_description, price, tracking_code, estimated_delivery_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, workshop_id, customer_id, customer_name, item_identifier, issue_description, status, price, tracking_code, estimated_delivery_date, created_at, updated_at`,
      [tenantId, dto.customerId || null, dto.customerName || null, dto.itemIdentifier, dto.issueDescription || null, dto.price || 0, trackingCode, dto.estimatedDeliveryDate || null],
    );

    return this.mapToDto(result.rows[0]);
  }

  async getJobsByWorkshop(user: AuthenticatedUser): Promise<JobResponseDto[]> {
    const tenantId = this.resolveTenantId(user);
    const result = await this.databaseService.query(
      `SELECT id, workshop_id, customer_id, customer_name, item_identifier, issue_description, status, price, tracking_code, estimated_delivery_date, created_at, updated_at 
       FROM jobs 
       WHERE workshop_id = $1 
       ORDER BY created_at DESC`,
      [tenantId],
    );

    return result.rows.map(this.mapToDto);
  }

  async getJobById(user: AuthenticatedUser, jobId: string): Promise<JobResponseDto> {
    const tenantId = this.resolveTenantId(user);
    const result = await this.databaseService.query(
      `SELECT id, workshop_id, customer_id, customer_name, item_identifier, issue_description, status, price, tracking_code, estimated_delivery_date, created_at, updated_at 
       FROM jobs 
       WHERE id = $1 AND workshop_id = $2`,
      [jobId, tenantId],
    );

    const job = result.rows[0];
    if (!job) {
      throw new NotFoundException('İş emri bulunamadı');
    }

    return this.mapToDto(job);
  }

  async updateJob(user: AuthenticatedUser, jobId: string, dto: UpdateJobDto): Promise<JobResponseDto> {
    const tenantId = this.resolveTenantId(user);
    
    // Check if exists and belongs to workshop
    const existingJob = await this.getJobById(user, jobId);

    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.customerName !== undefined) {
      updates.push(`customer_name = $${paramIndex++}`);
      values.push(dto.customerName);
    }
    if (dto.itemIdentifier !== undefined) {
      updates.push(`item_identifier = $${paramIndex++}`);
      values.push(dto.itemIdentifier);
    }
    if (dto.issueDescription !== undefined) {
      updates.push(`issue_description = $${paramIndex++}`);
      values.push(dto.issueDescription);
    }
    if (dto.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(dto.status);
    }
    if (dto.price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(dto.price);
    }
    if (dto.estimatedDeliveryDate !== undefined) {
      updates.push(`estimated_delivery_date = $${paramIndex++}`);
      values.push(dto.estimatedDeliveryDate);
    }

    if (updates.length === 0) {
      return existingJob; // Nothing to update
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    
    const query = `UPDATE jobs SET ${updates.join(', ')} WHERE id = $${paramIndex++} AND workshop_id = $${paramIndex} RETURNING id, workshop_id, customer_id, customer_name, item_identifier, issue_description, status, price, tracking_code, estimated_delivery_date, created_at, updated_at`;
    values.push(jobId, tenantId);

    const result = await this.databaseService.query(query, values);
    const updatedJob = this.mapToDto(result.rows[0]);

    // O SİHİRLİ AN: Kullanıcıya anlık bildirim fırlatıyoruz
    this.eventsGateway.emitJobUpdated(updatedJob.trackingCode, updatedJob);

    // EĞER STATÜ DEĞİŞTİYSE BİLDİRİM GÖNDERİMİ (SMS/WhatsApp/Email)
    if (dto.status !== undefined && dto.status !== existingJob.status) {
      // Dükkan ayarlarını al
      const workshopResult = await this.databaseService.query(
        'SELECT name, sms_enabled, whatsapp_enabled FROM workshops WHERE id = $1',
        [tenantId]
      );
      
      const workshop = workshopResult.rows[0];
      
      // Eğer müşterinin ID'si varsa, telefon numarasını ve emailini bulmak için customer tablosuna bak
      let phone = null;
      let email = null;
      if (updatedJob.customerId) {
        const customerResult = await this.databaseService.query('SELECT phone, email FROM customers WHERE id = $1', [updatedJob.customerId]);
        if (customerResult.rows[0]) {
          phone = customerResult.rows[0].phone;
          email = customerResult.rows[0].email;
        }
      }

      const trackingUrl = `http://localhost:3000/track/${updatedJob.trackingCode}`; // Production'da gerçek domain olacak
      const customerName = updatedJob.customerName || 'Müşterimiz';
      const statusText = this.getStatusText(updatedJob.status);

      // E-Posta Gönderimi
      if (email) {
        const subject = `${workshop.name} - İş Emri Güncellemesi (${updatedJob.itemIdentifier})`;
        const html = `
          <div style="font-family: sans-serif; max-w-md; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333;">İş Emri Durumu Güncellendi</h2>
            <p>Sayın <b>${customerName}</b>,</p>
            <p><b>${updatedJob.itemIdentifier}</b> kayıtlı cihazınızın/aracınızın durumu <b>${statusText}</b> olarak güncellenmiştir.</p>
            <div style="margin: 30px 0;">
              <a href="${trackingUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Süreci Canlı Takip Et</a>
            </div>
            <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
              Bizi tercih ettiğiniz için teşekkür ederiz.<br>
              <b>${workshop.name}</b>
            </p>
          </div>
        `;
        await this.notificationsService.sendEmail(email, subject, html);
      }
    }

    return updatedJob;
  }

  async deleteJob(user: AuthenticatedUser, jobId: string): Promise<void> {
    const tenantId = this.resolveTenantId(user);
    const result = await this.databaseService.query(
      'DELETE FROM jobs WHERE id = $1 AND workshop_id = $2 RETURNING id',
      [jobId, tenantId],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('İş emri bulunamadı veya silmeye yetkiniz yok');
    }
  }

  async getPublicJobByTrackingCode(trackingCode: string): Promise<JobResponseDto> {
    const result = await this.databaseService.query(
      `SELECT id, workshop_id, customer_id, customer_name, item_identifier, issue_description, status, price, tracking_code, estimated_delivery_date, created_at, updated_at 
       FROM jobs 
       WHERE tracking_code = $1`,
      [trackingCode],
    );

    const job = result.rows[0];
    if (!job) {
      throw new NotFoundException('Geçersiz takip kodu');
    }

    return this.mapToDto(job);
  }

  private resolveTenantId(authUser: AuthenticatedUser): string {
    if (!authUser.tenantId) {
      throw new UnauthorizedException('Tenant oturumu çözümlenemedi');
    }
    return authUser.tenantId;
  }

  private generateTrackingCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  private mapToDto(row: any): JobResponseDto {
    return {
      id: row.id,
      workshopId: row.workshop_id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      itemIdentifier: row.item_identifier,
      issueDescription: row.issue_description,
      status: row.status,
      price: parseFloat(row.price),
      trackingCode: row.tracking_code,
      estimatedDeliveryDate: row.estimated_delivery_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private getStatusText(status: string): string {
    const map: Record<string, string> = {
      waiting: 'Bekliyor',
      in_progress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      delivered: 'Teslim Edildi'
    };
    return map[status] || status;
  }
}
