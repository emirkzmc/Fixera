import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Yeni müşteri ekle' })
  @Post()
  async createCustomer(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateCustomerDto) {
    return this.customersService.createCustomer(user, dto);
  }

  @ApiOperation({ summary: 'Dükkanın müşterilerini listele' })
  @Get()
  async getCustomers(@CurrentUser() user: AuthenticatedUser) {
    return this.customersService.getCustomersByWorkshop(user);
  }

  @ApiOperation({ summary: 'Müşteri detayını getir' })
  @Get(':id')
  async getCustomerById(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.customersService.getCustomerById(user, id);
  }

  @ApiOperation({ summary: 'Müşteri bilgilerini güncelle' })
  @Put(':id')
  async updateCustomer(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(user, id, dto);
  }
}
