import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';

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
}
