import { Module } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CustomersController } from './customer.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
