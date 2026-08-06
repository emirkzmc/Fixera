import { IsString, IsOptional, MaxLength, IsIn, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  customerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  itemIdentifier?: string;

  @IsOptional()
  @IsString()
  issueDescription?: string;

  @IsOptional()
  @IsString()
  @IsIn(['waiting', 'in_progress', 'completed', 'delivered'], { message: 'Geçersiz durum' })
  status?: string;

  @ApiPropertyOptional({ example: 1500.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
