import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FinancesController],
  providers: [FinancesService],
  exports: [FinancesService],
})
export class FinancesModule {}
