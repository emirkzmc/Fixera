import { IsString, IsNotEmpty, IsOptional, MaxLength, IsUUID, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateJobDto {
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  customerName?: string;

  @IsString()
  @IsNotEmpty({ message: 'Araç/Cihaz tanımlayıcısı boş olamaz' })
  @MaxLength(50)
  itemIdentifier!: string;

  @IsOptional()
  @IsString()
  issueDescription?: string;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
