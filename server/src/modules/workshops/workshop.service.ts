import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IWorkshopService } from './interfaces/workshop.service.interface';
import { WorkshopResponseDto } from './dto/workshop-response.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@Injectable()
export class WorkshopService implements IWorkshopService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getWorkshopById(id: string): Promise<WorkshopResponseDto> {
    const result = await this.databaseService.query(
      'SELECT id, name, theme_color, sms_enabled, whatsapp_enabled, created_at FROM workshops WHERE id = $1',
      [id],
    );

    const workshop = result.rows[0];
    if (!workshop) {
      throw new NotFoundException('Workshop (CV Sayfası) bulunamadı');
    }

    return this.mapToDto(workshop);
  }

  async getMyWorkshop(user: AuthenticatedUser): Promise<WorkshopResponseDto> {
    const tenantId = this.resolveTenantId(user);
    return this.getWorkshopById(tenantId);
  }

  async updateMyWorkshop(user: AuthenticatedUser, dto: UpdateWorkshopDto): Promise<WorkshopResponseDto> {
    const tenantId = this.resolveTenantId(user);

    // Get current workshop to merge updates if needed, or just build dynamic query
    const currentWorkshop = await this.getWorkshopById(tenantId);

    const newName = dto.name !== undefined ? dto.name : currentWorkshop.name;
    const newThemeColor = dto.themeColor !== undefined ? dto.themeColor : currentWorkshop.themeColor;
    const newSmsEnabled = dto.smsEnabled !== undefined ? dto.smsEnabled : currentWorkshop.smsEnabled;
    const newWhatsappEnabled = dto.whatsappEnabled !== undefined ? dto.whatsappEnabled : currentWorkshop.whatsappEnabled;

    const result = await this.databaseService.query(
      'UPDATE workshops SET name = $1, theme_color = $2, sms_enabled = $3, whatsapp_enabled = $4 WHERE id = $5 RETURNING id, name, theme_color, sms_enabled, whatsapp_enabled, created_at',
      [newName, newThemeColor, newSmsEnabled, newWhatsappEnabled, tenantId],
    );

    return this.mapToDto(result.rows[0]);
  }

  private resolveTenantId(authUser: AuthenticatedUser): string {
    if (!authUser.tenantId) {
      throw new UnauthorizedException('Tenant oturumu çözümlenemedi');
    }
    return authUser.tenantId;
  }

  private mapToDto(row: any): WorkshopResponseDto {
    return {
      id: row.id,
      name: row.name,
      themeColor: row.theme_color,
      smsEnabled: row.sms_enabled,
      whatsappEnabled: row.whatsapp_enabled,
      createdAt: row.created_at,
    };
  }
}
