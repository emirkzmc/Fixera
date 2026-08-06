import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Ahmet Yılmaz', description: 'Müşterinin tam adı' })
  @IsString()
  @MaxLength(100)
  fullName!: string;

  @ApiPropertyOptional({ example: '05554443322', description: 'Telefon numarası' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
