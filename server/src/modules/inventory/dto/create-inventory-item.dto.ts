import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventoryItemDto {
  @ApiProperty({ example: 'Motor Yağı 5W-30' })
  @IsString()
  @MaxLength(255)
  itemName!: string;

  @ApiPropertyOptional({ example: 10, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @ApiPropertyOptional({ example: 5, default: 5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  criticalLevel?: number;

  @ApiPropertyOptional({ example: 150.50, default: 0.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
