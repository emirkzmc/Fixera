import { IsString, IsNumber, IsUUID, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-string' })
  @IsUUID()
  jobId!: string;

  @ApiProperty({ example: 500.00 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ example: 'completed', enum: ['pending', 'completed', 'refunded'] })
  @IsString()
  @IsIn(['pending', 'completed', 'refunded'])
  status!: string;
}
