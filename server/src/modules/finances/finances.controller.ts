import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinancesService } from './finances.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@ApiTags('Finances')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @ApiOperation({ summary: 'Dükkan finansal özetini getir' })
  @Get('summary')
  async getSummary(@CurrentUser() user: AuthenticatedUser) {
    return this.financesService.getWorkshopSummary(user);
  }

  @ApiOperation({ summary: 'Yeni ödeme/tahsilat ekle' })
  @Post('payments')
  async addPayment(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreatePaymentDto) {
    return this.financesService.addPayment(user, dto);
  }

  @ApiOperation({ summary: 'Tüm ödemeleri listele' })
  @Get('payments')
  async getPayments(@CurrentUser() user: AuthenticatedUser) {
    return this.financesService.getPayments(user);
  }

  @ApiOperation({ summary: 'Ödemeyi güncelle (ör: Bekleyenden tamamlandıya)' })
  @Put('payments/:id')
  async updatePayment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ) {
    return this.financesService.updatePayment(user, id, dto);
  }
}
