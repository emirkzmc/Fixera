import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { UsePartDto } from './dto/use-part.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Envantere yeni parça ekle' })
  @Post()
  async addItem(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateInventoryItemDto) {
    return this.inventoryService.addItem(user, dto);
  }

  @ApiOperation({ summary: 'Dükkanın envanterini listele' })
  @Get()
  async getItems(@CurrentUser() user: AuthenticatedUser) {
    return this.inventoryService.getItems(user);
  }

  @ApiOperation({ summary: 'Parça stok veya detaylarını güncelle' })
  @Put(':id')
  async updateItem(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateInventoryItemDto,
  ) {
    return this.inventoryService.updateItem(user, id, dto);
  }

  @ApiOperation({ summary: 'İş emri için parça kullan (Stoktan düşer ve iş fiyatına ekler)' })
  @Post('use-for-job/:jobId')
  async usePartForJob(
    @CurrentUser() user: AuthenticatedUser,
    @Param('jobId') jobId: string,
    @Body() dto: UsePartDto,
  ) {
    await this.inventoryService.usePartForJob(user, jobId, dto);
    return { success: true, message: 'Parça başarıyla iş emrine eklendi ve stoktan düşüldü.' };
  }
}
