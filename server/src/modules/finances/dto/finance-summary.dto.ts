import { ApiProperty } from '@nestjs/swagger';

export class FinanceSummaryDto {
  @ApiProperty({ description: 'Tüm ödemelerin toplamı' })
  totalRevenue!: number;

  @ApiProperty({ description: 'Bekleyen ödemelerin toplamı' })
  pendingRevenue!: number;

  @ApiProperty({ description: 'Toplam iş sayısı' })
  totalJobs!: number;
}
