import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IInventoryService } from './interfaces/inventory.service.interface';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { InventoryItemResponseDto } from './dto/inventory-item-response.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { UsePartDto } from './dto/use-part.dto';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  private mapToDto(row: any): InventoryItemResponseDto {
    return {
      id: row.id,
      workshopId: row.workshop_id,
      itemName: row.item_name,
      stockQuantity: row.stock_quantity,
      criticalLevel: row.critical_level,
      price: parseFloat(row.price),
      createdAt: row.created_at,
    };
  }

  async addItem(user: AuthenticatedUser, dto: CreateInventoryItemDto): Promise<InventoryItemResponseDto> {
    const result = await this.databaseService.query(
      `INSERT INTO inventory (workshop_id, item_name, stock_quantity, critical_level, price) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        user.tenantId, 
        dto.itemName, 
        dto.stockQuantity ?? 0, 
        dto.criticalLevel ?? 5, 
        dto.price ?? 0.00
      ]
    );
    return this.mapToDto(result.rows[0]);
  }

  async getItems(user: AuthenticatedUser): Promise<InventoryItemResponseDto[]> {
    const result = await this.databaseService.query(
      `SELECT * FROM inventory WHERE workshop_id = $1 ORDER BY item_name ASC`,
      [user.tenantId]
    );
    return result.rows.map(this.mapToDto);
  }

  async getItemById(user: AuthenticatedUser, itemId: string): Promise<InventoryItemResponseDto> {
    const result = await this.databaseService.query(
      `SELECT * FROM inventory WHERE id = $1 AND workshop_id = $2`,
      [itemId, user.tenantId]
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Parça bulunamadı');
    }
    return this.mapToDto(result.rows[0]);
  }

  async updateItem(user: AuthenticatedUser, itemId: string, dto: UpdateInventoryItemDto): Promise<InventoryItemResponseDto> {
    await this.getItemById(user, itemId);

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.itemName !== undefined) {
      updates.push(`item_name = $${paramIndex++}`);
      values.push(dto.itemName);
    }
    if (dto.stockQuantity !== undefined) {
      updates.push(`stock_quantity = $${paramIndex++}`);
      values.push(dto.stockQuantity);
    }
    if (dto.criticalLevel !== undefined) {
      updates.push(`critical_level = $${paramIndex++}`);
      values.push(dto.criticalLevel);
    }
    if (dto.price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(dto.price);
    }

    if (updates.length === 0) {
      return this.getItemById(user, itemId);
    }

    const query = `UPDATE inventory SET ${updates.join(', ')} WHERE id = $${paramIndex++} AND workshop_id = $${paramIndex} RETURNING *`;
    values.push(itemId, user.tenantId);

    const result = await this.databaseService.query(query, values);
    return this.mapToDto(result.rows[0]);
  }

  async usePartForJob(user: AuthenticatedUser, jobId: string, dto: UsePartDto): Promise<void> {
    const client = await this.databaseService.getClient();
    try {
      await client.query('BEGIN');

      // 1. İş emrinin bu dükkana ait olduğunu doğrula
      const jobResult = await client.query('SELECT * FROM jobs WHERE id = $1 AND workshop_id = $2', [jobId, user.tenantId]);
      if (jobResult.rows.length === 0) {
        throw new NotFoundException('İş emri bulunamadı');
      }

      // 2. Parçayı getir ve stoğu kontrol et
      const itemResult = await client.query('SELECT * FROM inventory WHERE id = $1 AND workshop_id = $2 FOR UPDATE', [dto.inventoryId, user.tenantId]);
      if (itemResult.rows.length === 0) {
        throw new NotFoundException('Kullanılacak parça envanterde bulunamadı');
      }
      
      const item = itemResult.rows[0];
      if (item.stock_quantity < dto.quantity) {
        throw new BadRequestException('Yetersiz stok');
      }

      // 3. Stoktan düş
      await client.query('UPDATE inventory SET stock_quantity = stock_quantity - $1 WHERE id = $2', [dto.quantity, dto.inventoryId]);

      // 4. job_parts tablosuna ekle
      await client.query(
        'INSERT INTO job_parts (job_id, inventory_id, quantity_used, price_at_time) VALUES ($1, $2, $3, $4)',
        [jobId, dto.inventoryId, dto.quantity, item.price]
      );

      // 5. İş emrinin toplam fiyatına ekle
      const additionalCost = parseFloat(item.price) * dto.quantity;
      await client.query('UPDATE jobs SET price = price + $1 WHERE id = $2', [additionalCost, jobId]);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
