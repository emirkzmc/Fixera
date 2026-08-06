import { IsString, IsOptional, Length, Matches, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkshopDto {
  @IsOptional()
  @IsString()
  @Length(2, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { message: 'Geçerli bir HEX renk kodu giriniz' })
  themeColor?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  smsEnabled?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  whatsappEnabled?: boolean;
}
