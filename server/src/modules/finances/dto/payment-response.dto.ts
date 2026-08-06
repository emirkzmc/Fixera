import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  workshopId!: string;

  @ApiProperty()
  jobId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: Date;
}
