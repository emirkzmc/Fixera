import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty({ message: 'Müşteri adı boş olamaz' })
  @MaxLength(100)
  customerName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Araç/Cihaz tanımlayıcısı boş olamaz' })
  @MaxLength(50)
  itemIdentifier!: string;

  @IsOptional()
  @IsString()
  issueDescription?: string;
}
