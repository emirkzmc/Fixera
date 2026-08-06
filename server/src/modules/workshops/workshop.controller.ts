import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkshopService } from './workshop.service';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  // Genel (Public) Erişim - CV görüntüleyen ziyaretçiler için
  @ApiOperation({ summary: 'Herkese açık: CV / Workshop bilgilerini getir' })
  @Get('public/:id')
  async getPublicWorkshop(@Param('id') id: string) {
    return this.workshopService.getWorkshopById(id);
  }

  // Özel (Private) Erişim - Sadece giriş yapmış kullanıcı (CV sahibi) için
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Giriş yapan kullanıcının CV / Workshop bilgilerini getir' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyWorkshop(@CurrentUser() user: AuthenticatedUser) {
    return this.workshopService.getMyWorkshop(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Giriş yapan kullanıcının CV / Workshop ayarlarını (tema vs.) güncelle' })
  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  async updateMyWorkshop(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateWorkshopDto,
  ) {
    return this.workshopService.updateMyWorkshop(user, dto);
  }
}
